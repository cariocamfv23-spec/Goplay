-- Migration: Grant table privileges to authenticated and anon roles for events, event_registrations, notifications, posts, comments, likes, follows and analytics
-- Timestamp: 2026-10-18T07:15:00.000Z

-- 1. Ensure schema usage privileges
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- 2. Grant table privileges on public.events
GRANT SELECT ON TABLE public.events TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.events TO authenticated;

-- 3. Grant table privileges on public.event_registrations
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.event_registrations TO authenticated;

-- 4. Grant table privileges on public.notifications
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.notifications TO authenticated;

-- 5. Grant table privileges on feed and interaction tables
GRANT SELECT ON TABLE public.posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.posts TO authenticated;

GRANT SELECT ON TABLE public.post_likes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.post_likes TO authenticated;

GRANT SELECT ON TABLE public.post_comments TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.post_comments TO authenticated;

GRANT SELECT ON TABLE public.user_follows TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.user_follows TO authenticated;

-- 6. Grant table privileges on analytics_events
GRANT SELECT, INSERT, DELETE ON TABLE public.analytics_events TO authenticated;
GRANT INSERT ON TABLE public.analytics_events TO anon;

-- 7. Ensure sequences access (if any serial/identity sequences are used)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- 8. Confirm events RLS policies are clean and allow authenticated creators to insert their events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "events_select_public" ON public.events;
CREATE POLICY "events_select_public" ON public.events
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "events_insert_own" ON public.events;
CREATE POLICY "events_insert_own" ON public.events
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = creator_id);

DROP POLICY IF EXISTS "events_update_own" ON public.events;
CREATE POLICY "events_update_own" ON public.events
  FOR UPDATE TO authenticated
  USING (auth.uid() = creator_id)
  WITH CHECK (auth.uid() = creator_id);

DROP POLICY IF EXISTS "events_delete_own" ON public.events;
CREATE POLICY "events_delete_own" ON public.events
  FOR DELETE TO authenticated
  USING (auth.uid() = creator_id);
