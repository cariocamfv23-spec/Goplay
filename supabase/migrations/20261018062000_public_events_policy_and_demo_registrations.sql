-- Migration: allow public and authenticated read access for events, plus ensure demo organizer events and registrations are properly seeded
-- Timestamp: 20261018062000

-- 1. Ensure events can be viewed by all users (anon and authenticated) so explore and peneiras oficiais list always work
DROP POLICY IF EXISTS "events_select_authenticated" ON public.events;
DROP POLICY IF EXISTS "events_select_public" ON public.events;

CREATE POLICY "events_select_public" ON public.events
  FOR SELECT USING (true);

-- 2. Ensure real registrations exist for the seeded events so the Club / Organizer panel displays real registered athletes for testing
DO $$
DECLARE
  v_tryout1 uuid := '33333333-0000-0000-0000-000000000001'::uuid;
  v_event1  uuid := '33333333-0000-0000-0000-000000000002'::uuid;
  v_athlete1 uuid := '11111111-0000-0000-0000-000000000001'::uuid; -- Lucas Silva (Futebol)
  v_athlete2 uuid := '11111111-0000-0000-0000-000000000002'::uuid; -- Matheus Costa (Basquete)
  v_athlete3 uuid := '11111111-0000-0000-0000-000000000003'::uuid; -- Camila Oliveira (Vôlei)
  v_athlete4 uuid := '2e4b2d6d-7eb4-4f2f-9552-51a7b8d56a44'::uuid; -- Goplay Atleta (cariocamfv23)
BEGIN
  -- Athlete 1 registration on Tryout (pending)
  IF EXISTS (SELECT 1 FROM public.events WHERE id = v_tryout1) AND EXISTS (SELECT 1 FROM auth.users WHERE id = v_athlete1) THEN
    INSERT INTO public.event_registrations (event_id, user_id, status, notes, created_at)
    VALUES (v_tryout1, v_athlete1, 'pending', 'Atacante sub-17 com experiência em base regional. Atestado médico anexado.', NOW() - interval '2 days')
    ON CONFLICT (event_id, user_id) DO NOTHING;
  END IF;

  -- Athlete 4 (cariocamfv23) registration on Tryout (pending) if user exists
  IF EXISTS (SELECT 1 FROM public.events WHERE id = v_tryout1) AND EXISTS (SELECT 1 FROM auth.users WHERE id = v_athlete4) THEN
    INSERT INTO public.event_registrations (event_id, user_id, status, notes, created_at)
    VALUES (v_tryout1, v_athlete4, 'pending', 'Inscrição para teste oficial de seletiva sub-20.', NOW() - interval '1 day')
    ON CONFLICT (event_id, user_id) DO NOTHING;
  END IF;

  -- Athlete 2 registration on Championship (approved)
  IF EXISTS (SELECT 1 FROM public.events WHERE id = v_event1) AND EXISTS (SELECT 1 FROM auth.users WHERE id = v_athlete2) THEN
    INSERT INTO public.event_registrations (event_id, user_id, status, notes, created_at)
    VALUES (v_event1, v_athlete2, 'approved', 'Equipe inscrita na chave principal.', NOW() - interval '3 days')
    ON CONFLICT (event_id, user_id) DO NOTHING;
  END IF;
END $$;
