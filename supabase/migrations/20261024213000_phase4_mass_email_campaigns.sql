-- Phase 4: Mass Email Campaign System (E-mails em massa)
-- 1. LGPD Unsubscribe flag on profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS email_unsubscribed BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS email_unsubscribed_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_profiles_email_unsubscribed ON public.profiles(email_unsubscribed);

-- 2. Campaign Table
CREATE TABLE IF NOT EXISTS public.email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  body_text TEXT NOT NULL DEFAULT '',
  body_html TEXT NOT NULL DEFAULT '',
  target_audience TEXT NOT NULL, -- 'all', 'athletes', 'clubs', 'event_attendees', 'followers'
  target_event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
  target_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'ready_for_sending', 'sending', 'sent', 'partial_failure', 'failed'
  total_recipients INTEGER NOT NULL DEFAULT 0,
  sent_count INTEGER NOT NULL DEFAULT 0,
  failed_count INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_campaigns_sender ON public.email_campaigns(sender_id);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_created_at ON public.email_campaigns(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_status ON public.email_campaigns(status);

-- 3. Recipients Table
CREATE TABLE IF NOT EXISTS public.email_campaign_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.email_campaigns(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'sent', 'failed', 'unsubscribed', 'skipped'
  error_message TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_campaign_recipients_camp_id ON public.email_campaign_recipients(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_recipients_user_id ON public.email_campaign_recipients(recipient_id);
CREATE INDEX IF NOT EXISTS idx_campaign_recipients_status ON public.email_campaign_recipients(status);
CREATE UNIQUE INDEX IF NOT EXISTS uq_campaign_recipient ON public.email_campaign_recipients(campaign_id, recipient_id);

-- 4. Enable RLS
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_campaign_recipients ENABLE ROW LEVEL SECURITY;

-- 5. Helper function to check if caller is organizer or admin
CREATE OR REPLACE FUNCTION public.can_manage_email_campaigns()
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND (is_admin = true OR account_type IN ('club', 'coach'))
  );
END;
$$;

-- 6. RLS Policies for email_campaigns
-- Admins can do everything, organizers can manage their own campaigns
DROP POLICY IF EXISTS "campaigns_select_authorized" ON public.email_campaigns;
CREATE POLICY "campaigns_select_authorized" ON public.email_campaigns
  FOR SELECT TO authenticated
  USING (
    sender_id = auth.uid()
    OR public.is_current_user_admin() = true
  );

DROP POLICY IF EXISTS "campaigns_insert_authorized" ON public.email_campaigns;
CREATE POLICY "campaigns_insert_authorized" ON public.email_campaigns
  FOR INSERT TO authenticated
  WITH CHECK (
    sender_id = auth.uid()
    AND public.can_manage_email_campaigns() = true
  );

DROP POLICY IF EXISTS "campaigns_update_authorized" ON public.email_campaigns;
CREATE POLICY "campaigns_update_authorized" ON public.email_campaigns
  FOR UPDATE TO authenticated
  USING (
    sender_id = auth.uid()
    OR public.is_current_user_admin() = true
  )
  WITH CHECK (
    sender_id = auth.uid()
    OR public.is_current_user_admin() = true
  );

DROP POLICY IF EXISTS "campaigns_delete_authorized" ON public.email_campaigns;
CREATE POLICY "campaigns_delete_authorized" ON public.email_campaigns
  FOR DELETE TO authenticated
  USING (
    sender_id = auth.uid()
    OR public.is_current_user_admin() = true
  );

-- 7. RLS Policies for email_campaign_recipients
DROP POLICY IF EXISTS "recipients_select_authorized" ON public.email_campaign_recipients;
CREATE POLICY "recipients_select_authorized" ON public.email_campaign_recipients
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.email_campaigns c
      WHERE c.id = email_campaign_recipients.campaign_id
        AND (c.sender_id = auth.uid() OR public.is_current_user_admin() = true)
    )
  );

DROP POLICY IF EXISTS "recipients_insert_authorized" ON public.email_campaign_recipients;
CREATE POLICY "recipients_insert_authorized" ON public.email_campaign_recipients
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.email_campaigns c
      WHERE c.id = email_campaign_recipients.campaign_id
        AND (c.sender_id = auth.uid() OR public.is_current_user_admin() = true)
    )
  );

DROP POLICY IF EXISTS "recipients_update_authorized" ON public.email_campaign_recipients;
CREATE POLICY "recipients_update_authorized" ON public.email_campaign_recipients
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.email_campaigns c
      WHERE c.id = email_campaign_recipients.campaign_id
        AND (c.sender_id = auth.uid() OR public.is_current_user_admin() = true)
    )
  );

DROP POLICY IF EXISTS "recipients_delete_authorized" ON public.email_campaign_recipients;
CREATE POLICY "recipients_delete_authorized" ON public.email_campaign_recipients
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.email_campaigns c
      WHERE c.id = email_campaign_recipients.campaign_id
        AND (c.sender_id = auth.uid() OR public.is_current_user_admin() = true)
    )
  );

-- 8. Public unsubscribe function (callable by anyone with user_id)
-- Allows a user to click their unsubscribe link and set email_unsubscribed = true
CREATE OR REPLACE FUNCTION public.unsubscribe_user_email(target_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_updated INT;
BEGIN
  UPDATE public.profiles
  SET email_unsubscribed = true,
      email_unsubscribed_at = NOW()
  WHERE id = target_user_id;

  GET DIAGNOSTICS v_updated = ROW_COUNT;

  IF v_updated > 0 THEN
    RETURN jsonb_build_object('success', true, 'message', 'Descadastro realizado com sucesso.');
  ELSE
    RETURN jsonb_build_object('success', false, 'message', 'Usuário não encontrado.');
  END IF;
END;
$$;

-- Grant execute on public.unsubscribe_user_email to anon & authenticated
GRANT EXECUTE ON FUNCTION public.unsubscribe_user_email(UUID) TO anon, authenticated;
