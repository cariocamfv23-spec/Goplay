-- Phase 4 Helper functions for resolving target audience recipients securely
-- Organizers/admins can query recipient count and prepare audience rows

CREATE OR REPLACE FUNCTION public.get_audience_count(
  p_audience TEXT,
  p_target_event_id UUID DEFAULT NULL,
  p_target_user_id UUID DEFAULT NULL
)
RETURNS INTEGER
LANGUAGE plpgsql
STABLE SECURITY DEFINER
AS $$
DECLARE
  v_count INTEGER := 0;
BEGIN
  -- Security check: caller must be admin or club/coach
  IF NOT (
    public.is_current_user_admin() = true
    OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND account_type IN ('club', 'coach')
    )
  ) THEN
    RETURN 0;
  END IF;

  IF p_audience = 'all' THEN
    SELECT COUNT(u.id) INTO v_count
    FROM auth.users u
    JOIN public.profiles p ON p.id = u.id
    WHERE COALESCE(p.email_unsubscribed, false) = false
      AND u.email IS NOT NULL AND u.email != '';

  ELSIF p_audience = 'athletes' THEN
    SELECT COUNT(u.id) INTO v_count
    FROM auth.users u
    JOIN public.profiles p ON p.id = u.id
    WHERE p.account_type = 'athlete'
      AND COALESCE(p.email_unsubscribed, false) = false
      AND u.email IS NOT NULL AND u.email != '';

  ELSIF p_audience = 'clubs' THEN
    SELECT COUNT(u.id) INTO v_count
    FROM auth.users u
    JOIN public.profiles p ON p.id = u.id
    WHERE p.account_type IN ('club', 'coach')
      AND COALESCE(p.email_unsubscribed, false) = false
      AND u.email IS NOT NULL AND u.email != '';

  ELSIF p_audience = 'event_attendees' AND p_target_event_id IS NOT NULL THEN
    SELECT COUNT(DISTINCT u.id) INTO v_count
    FROM auth.users u
    JOIN public.profiles p ON p.id = u.id
    JOIN public.event_registrations r ON r.user_id = u.id
    WHERE r.event_id = p_target_event_id
      AND COALESCE(p.email_unsubscribed, false) = false
      AND u.email IS NOT NULL AND u.email != '';

  ELSIF p_audience = 'followers' THEN
    SELECT COUNT(DISTINCT u.id) INTO v_count
    FROM auth.users u
    JOIN public.profiles p ON p.id = u.id
    JOIN public.user_follows f ON f.follower_id = u.id
    WHERE f.following_id = COALESCE(p_target_user_id, auth.uid())
      AND COALESCE(p.email_unsubscribed, false) = false
      AND u.email IS NOT NULL AND u.email != '';

  ELSE
    v_count := 0;
  END IF;

  RETURN v_count;
END;
$$;

-- Function to populate campaign recipients when creating/preparing a campaign
CREATE OR REPLACE FUNCTION public.populate_campaign_recipients(p_campaign_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_campaign RECORD;
  v_inserted INTEGER := 0;
BEGIN
  -- Fetch campaign and verify permission
  SELECT * INTO v_campaign
  FROM public.email_campaigns
  WHERE id = p_campaign_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Campanha não encontrada.');
  END IF;

  IF NOT (
    v_campaign.sender_id = auth.uid()
    OR public.is_current_user_admin() = true
  ) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Permissão negada.');
  END IF;

  -- Delete existing recipients for this campaign if re-populating draft
  DELETE FROM public.email_campaign_recipients WHERE campaign_id = p_campaign_id;

  -- Populate based on target_audience
  IF v_campaign.target_audience = 'all' THEN
    INSERT INTO public.email_campaign_recipients (campaign_id, recipient_id, recipient_email, recipient_name, status)
    SELECT
      p_campaign_id,
      u.id,
      u.email,
      p.full_name,
      'pending'
    FROM auth.users u
    JOIN public.profiles p ON p.id = u.id
    WHERE COALESCE(p.email_unsubscribed, false) = false
      AND u.email IS NOT NULL AND u.email != ''
    ON CONFLICT (campaign_id, recipient_id) DO NOTHING;

  ELSIF v_campaign.target_audience = 'athletes' THEN
    INSERT INTO public.email_campaign_recipients (campaign_id, recipient_id, recipient_email, recipient_name, status)
    SELECT
      p_campaign_id,
      u.id,
      u.email,
      p.full_name,
      'pending'
    FROM auth.users u
    JOIN public.profiles p ON p.id = u.id
    WHERE p.account_type = 'athlete'
      AND COALESCE(p.email_unsubscribed, false) = false
      AND u.email IS NOT NULL AND u.email != ''
    ON CONFLICT (campaign_id, recipient_id) DO NOTHING;

  ELSIF v_campaign.target_audience = 'clubs' THEN
    INSERT INTO public.email_campaign_recipients (campaign_id, recipient_id, recipient_email, recipient_name, status)
    SELECT
      p_campaign_id,
      u.id,
      u.email,
      p.full_name,
      'pending'
    FROM auth.users u
    JOIN public.profiles p ON p.id = u.id
    WHERE p.account_type IN ('club', 'coach')
      AND COALESCE(p.email_unsubscribed, false) = false
      AND u.email IS NOT NULL AND u.email != ''
    ON CONFLICT (campaign_id, recipient_id) DO NOTHING;

  ELSIF v_campaign.target_audience = 'event_attendees' AND v_campaign.target_event_id IS NOT NULL THEN
    INSERT INTO public.email_campaign_recipients (campaign_id, recipient_id, recipient_email, recipient_name, status)
    SELECT DISTINCT ON (u.id)
      p_campaign_id,
      u.id,
      u.email,
      p.full_name,
      'pending'
    FROM auth.users u
    JOIN public.profiles p ON p.id = u.id
    JOIN public.event_registrations r ON r.user_id = u.id
    WHERE r.event_id = v_campaign.target_event_id
      AND COALESCE(p.email_unsubscribed, false) = false
      AND u.email IS NOT NULL AND u.email != ''
    ON CONFLICT (campaign_id, recipient_id) DO NOTHING;

  ELSIF v_campaign.target_audience = 'followers' THEN
    INSERT INTO public.email_campaign_recipients (campaign_id, recipient_id, recipient_email, recipient_name, status)
    SELECT DISTINCT ON (u.id)
      p_campaign_id,
      u.id,
      u.email,
      p.full_name,
      'pending'
    FROM auth.users u
    JOIN public.profiles p ON p.id = u.id
    JOIN public.user_follows f ON f.follower_id = u.id
    WHERE f.following_id = COALESCE(v_campaign.target_user_id, v_campaign.sender_id)
      AND COALESCE(p.email_unsubscribed, false) = false
      AND u.email IS NOT NULL AND u.email != ''
    ON CONFLICT (campaign_id, recipient_id) DO NOTHING;
  END IF;

  GET DIAGNOSTICS v_inserted = ROW_COUNT;

  -- Update total_recipients in email_campaigns
  UPDATE public.email_campaigns
  SET total_recipients = v_inserted,
      updated_at = NOW()
  WHERE id = p_campaign_id;

  RETURN jsonb_build_object(
    'success', true,
    'total_recipients', v_inserted,
    'campaign_id', p_campaign_id
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_audience_count(TEXT, UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.populate_campaign_recipients(UUID) TO authenticated;
