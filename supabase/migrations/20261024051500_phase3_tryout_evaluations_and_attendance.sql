-- Migration: 20261024051500_phase3_tryout_evaluations_and_attendance.sql
-- Description: Adds attendance, athlete_status and status_updated_at to event_registrations.
--              Creates event_evaluations table with strict RLS policies.
--              Updates RLS policies on event_registrations for organizers to manage attendance and athlete_status.

-- 1. Alter table event_registrations
ALTER TABLE public.event_registrations
  ADD COLUMN IF NOT EXISTS attendance text,
  ADD COLUMN IF NOT EXISTS athlete_status text,
  ADD COLUMN IF NOT EXISTS status_updated_at timestamptz;

-- Add check constraint for attendance if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'check_attendance_values'
  ) THEN
    ALTER TABLE public.event_registrations
      ADD CONSTRAINT check_attendance_values
      CHECK (attendance IS NULL OR attendance IN ('present', 'absent'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'check_athlete_status_values'
  ) THEN
    ALTER TABLE public.event_registrations
      ADD CONSTRAINT check_athlete_status_values
      CHECK (athlete_status IS NULL OR athlete_status IN ('inscrito', 'compareceu', 'aprovado', 'convocado', 'nao_selecionado'));
  END IF;
END $$;

-- 2. Create table event_evaluations
CREATE TABLE IF NOT EXISTS public.event_evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  athlete_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  club_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 10),
  strengths text,
  improvements text,
  internal_notes text,
  visible_to_athlete boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT uq_event_athlete_evaluation UNIQUE (event_id, athlete_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_eval_event_id ON public.event_evaluations (event_id);
CREATE INDEX IF NOT EXISTS idx_eval_athlete_id ON public.event_evaluations (athlete_id);
CREATE INDEX IF NOT EXISTS idx_eval_club_id ON public.event_evaluations (club_id);

-- Updated_at trigger for event_evaluations
DROP TRIGGER IF EXISTS trg_event_evaluations_updated_at ON public.event_evaluations;
CREATE TRIGGER trg_event_evaluations_updated_at
  BEFORE UPDATE ON public.event_evaluations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS on event_evaluations
ALTER TABLE public.event_evaluations ENABLE ROW LEVEL SECURITY;

-- Grant permissions to authenticated role
GRANT SELECT, INSERT, UPDATE, DELETE ON public.event_evaluations TO authenticated;

-- Policies for event_evaluations:
-- a) Admin total access
DROP POLICY IF EXISTS "evaluations_admin_all" ON public.event_evaluations;
CREATE POLICY "evaluations_admin_all" ON public.event_evaluations
  FOR ALL TO authenticated
  USING (public.is_current_user_admin())
  WITH CHECK (public.is_current_user_admin());

-- b) Club (creator of the event) SELECT
DROP POLICY IF EXISTS "evaluations_club_select" ON public.event_evaluations;
CREATE POLICY "evaluations_club_select" ON public.event_evaluations
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.events e
      WHERE e.id = event_evaluations.event_id AND e.creator_id = auth.uid()
    )
  );

-- c) Club (creator of the event) INSERT
DROP POLICY IF EXISTS "evaluations_club_insert" ON public.event_evaluations;
CREATE POLICY "evaluations_club_insert" ON public.event_evaluations
  FOR INSERT TO authenticated
  WITH CHECK (
    club_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.events e
      WHERE e.id = event_evaluations.event_id AND e.creator_id = auth.uid()
    )
  );

-- d) Club (creator of the event) UPDATE
DROP POLICY IF EXISTS "evaluations_club_update" ON public.event_evaluations;
CREATE POLICY "evaluations_club_update" ON public.event_evaluations
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.events e
      WHERE e.id = event_evaluations.event_id AND e.creator_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.events e
      WHERE e.id = event_evaluations.event_id AND e.creator_id = auth.uid()
    )
  );

-- e) Club (creator of the event) DELETE
DROP POLICY IF EXISTS "evaluations_club_delete" ON public.event_evaluations;
CREATE POLICY "evaluations_club_delete" ON public.event_evaluations
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.events e
      WHERE e.id = event_evaluations.event_id AND e.creator_id = auth.uid()
    )
  );

-- f) Athlete SELECT (visible_to_athlete = true AND athlete_id = auth.uid())
DROP POLICY IF EXISTS "evaluations_athlete_select" ON public.event_evaluations;
CREATE POLICY "evaluations_athlete_select" ON public.event_evaluations
  FOR SELECT TO authenticated
  USING (
    athlete_id = auth.uid() AND visible_to_athlete = true
  );

-- 3. Update RLS policies on event_registrations
-- Replace registrations_update_organizer to also allow updating attendance and athlete_status
DROP POLICY IF EXISTS "registrations_update_organizer" ON public.event_registrations;
CREATE POLICY "registrations_update_organizer" ON public.event_registrations
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.events e
      WHERE e.id = event_registrations.event_id AND e.creator_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.events e
      WHERE e.id = event_registrations.event_id AND e.creator_id = auth.uid()
    )
  );
