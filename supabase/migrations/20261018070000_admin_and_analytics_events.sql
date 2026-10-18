-- Migration: 20261018070000_admin_and_analytics_events.sql
-- Description: Adds is_admin flag to public.profiles, marks existing demo admin account,
-- and creates public.analytics_events with strict RLS for event tracking (MVP beta metrics).

-- 1. Add is_admin column to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT false;

-- Create index for admin check efficiency
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON public.profiles(is_admin);

-- Grant admin to primary administrator cariocamfv23@gmail.com and demo club / coach for testing
UPDATE public.profiles
SET is_admin = true
WHERE id IN (
  SELECT id FROM auth.users WHERE email IN ('cariocamfv23@gmail.com', 'demo.clube@goplay.test')
);

-- Helper function to check if current user is an admin without recursion in RLS
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- 2. Create analytics_events table
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  target_id TEXT,
  session_id TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for metrics queries
CREATE INDEX IF NOT EXISTS idx_analytics_event_name ON public.analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON public.analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON public.analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_target_id ON public.analytics_events(target_id);

-- Enable RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies on analytics_events
-- Insert: authenticated and anon visitors can record legitimate telemetry events
DROP POLICY IF EXISTS "analytics_events_insert_all" ON public.analytics_events;
CREATE POLICY "analytics_events_insert_all" ON public.analytics_events
  FOR INSERT TO authenticated, anon
  WITH CHECK (true);

-- Select: STRICTLY authorized administrators can query global analytics events
DROP POLICY IF EXISTS "analytics_events_select_admin" ON public.analytics_events;
CREATE POLICY "analytics_events_select_admin" ON public.analytics_events
  FOR SELECT TO authenticated
  USING (public.is_current_user_admin());

-- Disallow updates and deletes on analytics events to preserve audit trail integrity
DROP POLICY IF EXISTS "analytics_events_delete_admin" ON public.analytics_events;
CREATE POLICY "analytics_events_delete_admin" ON public.analytics_events
  FOR DELETE TO authenticated
  USING (public.is_current_user_admin());
