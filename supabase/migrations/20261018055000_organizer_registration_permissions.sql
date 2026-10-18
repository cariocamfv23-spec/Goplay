-- Migration: 20261018055000_organizer_registration_permissions.sql
-- Enables event organizers to securely update status of registrations for events they created,
-- while athletes can only cancel their own registrations and cannot approve/reject their own or other registrations.

-- 1. Ensure event_registrations default status can be 'pending' for tryouts/events if not specified
ALTER TABLE public.event_registrations
  ALTER COLUMN status SET DEFAULT 'pending';

-- 2. Drop existing update policy on event_registrations
DROP POLICY IF EXISTS "registrations_update_own" ON public.event_registrations;
DROP POLICY IF EXISTS "registrations_update_athlete" ON public.event_registrations;
DROP POLICY IF EXISTS "registrations_update_organizer" ON public.event_registrations;

-- 3. Policy for athletes: can only cancel their own registration, or update their own notes
CREATE POLICY "registrations_update_athlete" ON public.event_registrations
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND (
      -- Athlete can change status to 'canceled', or keep status unchanged (e.g. updating notes)
      status = 'canceled' OR status = (SELECT r.status FROM public.event_registrations r WHERE r.id = event_registrations.id)
    )
  );

-- 4. Policy for organizers: can update status (pending, approved, rejected, confirmed) of registrations
-- strictly for events created by the authenticated organizer
CREATE POLICY "registrations_update_organizer" ON public.event_registrations
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.events e
      WHERE e.id = event_registrations.event_id
        AND e.creator_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.events e
      WHERE e.id = event_registrations.event_id
        AND e.creator_id = auth.uid()
    )
    AND status IN ('pending', 'approved', 'rejected', 'confirmed', 'waitlist')
  );

-- 5. Helper function for atomic decision updates with security checks
CREATE OR REPLACE FUNCTION public.decide_event_registration(
  p_registration_id UUID,
  p_new_status TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_reg RECORD;
  v_event RECORD;
  v_caller UUID;
BEGIN
  v_caller := auth.uid();
  IF v_caller IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Usuário não autenticado');
  END IF;

  IF p_new_status NOT IN ('approved', 'rejected', 'pending') THEN
    RETURN jsonb_build_object('success', false, 'error', 'Status de decisão inválido');
  END IF;

  SELECT * INTO v_reg FROM public.event_registrations WHERE id = p_registration_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Inscrição não encontrada');
  END IF;

  IF v_reg.status = 'canceled' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Inscrição cancelada não pode ser alterada');
  END IF;

  IF v_reg.user_id = v_caller THEN
    RETURN jsonb_build_object('success', false, 'error', 'O atleta não pode aprovar ou recusar a própria inscrição');
  END IF;

  SELECT * INTO v_event FROM public.events WHERE id = v_reg.event_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Evento não encontrado');
  END IF;

  IF v_event.creator_id != v_caller THEN
    RETURN jsonb_build_object('success', false, 'error', 'Permissão negada: você não é o organizador deste evento');
  END IF;

  IF v_reg.status = p_new_status THEN
    RETURN jsonb_build_object('success', false, 'error', 'Esta inscrição já está com o status ' || p_new_status);
  END IF;

  UPDATE public.event_registrations
  SET status = p_new_status
  WHERE id = p_registration_id;

  RETURN jsonb_build_object(
    'success', true,
    'registration_id', p_registration_id,
    'new_status', p_new_status,
    'event_id', v_reg.event_id,
    'user_id', v_reg.user_id,
    'event_title', v_event.title
  );
END;
$$;
