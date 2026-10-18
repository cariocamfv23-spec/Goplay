-- FASE 3 SCHEMA: Feed (posts, post_likes, post_comments), Connections (user_follows), Events & Tryouts (events, event_registrations), Notifications
-- All with RLS enabled, indexes and foreign keys

-- 1. POSTS TABLE
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL DEFAULT '',
  media_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  post_type TEXT NOT NULL DEFAULT 'text', -- 'text' | 'image' | 'video' | 'article'
  video_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_posts_user_id ON public.posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "posts_select_authenticated" ON public.posts;
CREATE POLICY "posts_select_authenticated" ON public.posts
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "posts_insert_own" ON public.posts;
CREATE POLICY "posts_insert_own" ON public.posts
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "posts_update_own" ON public.posts;
CREATE POLICY "posts_update_own" ON public.posts
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "posts_delete_own" ON public.posts;
CREATE POLICY "posts_delete_own" ON public.posts
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 2. POST LIKES TABLE (Prevent duplicates via UNIQUE)
CREATE TABLE IF NOT EXISTS public.post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_post_user_like UNIQUE (post_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON public.post_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_user_id ON public.post_likes(user_id);

ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "post_likes_select_authenticated" ON public.post_likes;
CREATE POLICY "post_likes_select_authenticated" ON public.post_likes
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "post_likes_insert_own" ON public.post_likes;
CREATE POLICY "post_likes_insert_own" ON public.post_likes
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "post_likes_delete_own" ON public.post_likes;
CREATE POLICY "post_likes_delete_own" ON public.post_likes
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 3. POST COMMENTS TABLE
CREATE TABLE IF NOT EXISTS public.post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_post_comments_post_id ON public.post_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_post_comments_user_id ON public.post_comments(user_id);

ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "post_comments_select_authenticated" ON public.post_comments;
CREATE POLICY "post_comments_select_authenticated" ON public.post_comments
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "post_comments_insert_own" ON public.post_comments;
CREATE POLICY "post_comments_insert_own" ON public.post_comments
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "post_comments_delete_own" ON public.post_comments;
CREATE POLICY "post_comments_delete_own" ON public.post_comments
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 4. USER FOLLOWS / CONNECTIONS TABLE (Etapa 3C)
CREATE TABLE IF NOT EXISTS public.user_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_follower_following UNIQUE (follower_id, following_id),
  CONSTRAINT chk_no_self_follow CHECK (follower_id <> following_id)
);

CREATE INDEX IF NOT EXISTS idx_follows_follower ON public.user_follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON public.user_follows(following_id);

ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "follows_select_authenticated" ON public.user_follows;
CREATE POLICY "follows_select_authenticated" ON public.user_follows
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "follows_insert_own" ON public.user_follows;
CREATE POLICY "follows_insert_own" ON public.user_follows
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = follower_id);

DROP POLICY IF EXISTS "follows_delete_own" ON public.user_follows;
CREATE POLICY "follows_delete_own" ON public.user_follows
  FOR DELETE TO authenticated USING (auth.uid() = follower_id);

-- 5. EVENTS AND TRYOUTS TABLE (Etapa 3D)
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'event', -- 'event' | 'tryout' (peneira) | 'championship'
  sport TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Livre',
  event_date DATE NOT NULL,
  event_time TEXT NOT NULL DEFAULT '09:00',
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  location_name TEXT NOT NULL,
  address TEXT,
  banner_url TEXT,
  requirements TEXT,
  instructions TEXT,
  registration_deadline DATE,
  max_participants INTEGER,
  price NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'open', -- 'open' | 'closed' | 'canceled'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_creator ON public.events(creator_id);
CREATE INDEX IF NOT EXISTS idx_events_sport ON public.events(sport);
CREATE INDEX IF NOT EXISTS idx_events_type ON public.events(type);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "events_select_authenticated" ON public.events;
CREATE POLICY "events_select_authenticated" ON public.events
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "events_insert_own" ON public.events;
CREATE POLICY "events_insert_own" ON public.events
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = creator_id);

DROP POLICY IF EXISTS "events_update_own" ON public.events;
CREATE POLICY "events_update_own" ON public.events
  FOR UPDATE TO authenticated USING (auth.uid() = creator_id) WITH CHECK (auth.uid() = creator_id);

DROP POLICY IF EXISTS "events_delete_own" ON public.events;
CREATE POLICY "events_delete_own" ON public.events
  FOR DELETE TO authenticated USING (auth.uid() = creator_id);

-- 6. EVENT REGISTRATIONS TABLE (Etapa 3D)
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'confirmed', -- 'confirmed' | 'canceled' | 'waitlist'
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_event_user_reg UNIQUE (event_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_reg_event_id ON public.event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_reg_user_id ON public.event_registrations(user_id);

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- Select: either the participant sees their own registration OR the organizer of the event sees it
DROP POLICY IF EXISTS "registrations_select_authorized" ON public.event_registrations;
CREATE POLICY "registrations_select_authorized" ON public.event_registrations
  FOR SELECT TO authenticated USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.events e WHERE e.id = event_id AND e.creator_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "registrations_insert_own" ON public.event_registrations;
CREATE POLICY "registrations_insert_own" ON public.event_registrations
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "registrations_update_own" ON public.event_registrations;
CREATE POLICY "registrations_update_own" ON public.event_registrations
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "registrations_delete_own" ON public.event_registrations;
CREATE POLICY "registrations_delete_own" ON public.event_registrations
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 7. NOTIFICATIONS TABLE (Etapa 3E)
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  type TEXT NOT NULL, -- 'like' | 'comment' | 'follow' | 'event_registration' | 'registration_received' | 'system'
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "notifications_select_own" ON public.notifications;
CREATE POLICY "notifications_select_own" ON public.notifications
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "notifications_insert_any" ON public.notifications;
CREATE POLICY "notifications_insert_any" ON public.notifications
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "notifications_update_own" ON public.notifications;
CREATE POLICY "notifications_update_own" ON public.notifications
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "notifications_delete_own" ON public.notifications;
CREATE POLICY "notifications_delete_own" ON public.notifications
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 8. STORAGE BUCKET FOR POST MEDIA (posts)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'posts',
  'posts',
  true,
  20971520, -- 20MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 20971520,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm'];

-- Storage policies for 'posts' bucket
DROP POLICY IF EXISTS "posts_storage_public_select" ON storage.objects;
CREATE POLICY "posts_storage_public_select" ON storage.objects
  FOR SELECT USING (bucket_id = 'posts');

DROP POLICY IF EXISTS "posts_storage_auth_insert" ON storage.objects;
CREATE POLICY "posts_storage_auth_insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'posts' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "posts_storage_auth_update" ON storage.objects;
CREATE POLICY "posts_storage_auth_update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'posts' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "posts_storage_auth_delete" ON storage.objects;
CREATE POLICY "posts_storage_auth_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'posts' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- 9. SEED INITIAL REAL POSTS, TRYOUTS AND EVENTS FOR DEMO PROFILES
DO $$
DECLARE
  v_u_fut uuid := '11111111-0000-0000-0000-000000000001'::uuid;
  v_u_club uuid := '11111111-0000-0000-0000-000000000006'::uuid;
  v_u_coa uuid := '11111111-0000-0000-0000-000000000007'::uuid;
  v_post1 uuid := '22222222-0000-0000-0000-000000000001'::uuid;
  v_post2 uuid := '22222222-0000-0000-0000-000000000002'::uuid;
  v_tryout1 uuid := '33333333-0000-0000-0000-000000000001'::uuid;
  v_event1 uuid := '33333333-0000-0000-0000-000000000002'::uuid;
BEGIN
  -- Seed post 1 from Lucas Silva
  IF NOT EXISTS (SELECT 1 FROM public.posts WHERE id = v_post1) THEN
    INSERT INTO public.posts (
      id, user_id, content, media_urls, post_type, created_at
    ) VALUES (
      v_post1, v_u_fut,
      'Treino intenso de finalizações e arranque hoje pela manhã! Foco total na próxima temporada. ⚽🔥',
      ARRAY['https://img.usecurling.com/p/800/500?q=soccer%20training&color=green'],
      'image', NOW() - interval '2 hours'
    );
  END IF;

  -- Seed post 2 from Coach Marcelo Prado
  IF NOT EXISTS (SELECT 1 FROM public.posts WHERE id = v_post2) THEN
    INSERT INTO public.posts (
      id, user_id, content, media_urls, post_type, created_at
    ) VALUES (
      v_post2, v_u_coa,
      'Abertas as inscrições para a mentoria tática de jovens atletas sub-17 e sub-20. Desenvolvimento esportivo com metodologia de ponta!',
      ARRAY['https://img.usecurling.com/p/800/500?q=tactics%20board&color=blue'],
      'image', NOW() - interval '5 hours'
    );
  END IF;

  -- Seed Official Tryout (Peneira) from Clube Atlético Paulista
  IF NOT EXISTS (SELECT 1 FROM public.events WHERE id = v_tryout1) THEN
    INSERT INTO public.events (
      id, creator_id, title, description, type, sport, category,
      event_date, event_time, city, state, location_name, address,
      banner_url, requirements, instructions, registration_deadline, max_participants, price, status
    ) VALUES (
      v_tryout1, v_u_club,
      'Peneira Oficial 2025 — Categorias Sub-17 e Sub-20',
      'Grande seletiva aberta para atletas nascidos entre 2005 e 2009. Avaliação técnica e tática conduzida por avaliadores oficiais do Clube Atlético Paulista.',
      'tryout', 'Futebol', 'Sub-17 / Sub-20',
      (CURRENT_DATE + interval '14 days')::date, '08:30',
      'Campinas', 'SP', 'Centro de Treinamento Ninho das Águias', 'Av. dos Esportes, 1200 - Jd. Esplanada',
      'https://img.usecurling.com/p/800/400?q=soccer%20match&color=green',
      'Atestado médico de aptidão física recente (últimos 6 meses), documento oficial com foto e chuteira society/campo.',
      'Apresentar-se com 30 minutos de antecedência munido de comprovante de inscrição no Goplay.',
      (CURRENT_DATE + interval '10 days')::date, 120, 0, 'open'
    );
  END IF;

  -- Seed Championship / Event from Coach Marcelo Prado
  IF NOT EXISTS (SELECT 1 FROM public.events WHERE id = v_event1) THEN
    INSERT INTO public.events (
      id, creator_id, title, description, type, sport, category,
      event_date, event_time, city, state, location_name, address,
      banner_url, requirements, instructions, registration_deadline, max_participants, price, status
    ) VALUES (
      v_event1, v_u_coa,
      'Torneio Metropolitano de Verão Goplay 2025',
      'Campeonato integrador de equipes de base e projetos sociais com premiação de troféus, medalhas e scouts presentes.',
      'championship', 'Futebol', 'Principal Aberto',
      (CURRENT_DATE + interval '21 days')::date, '14:00',
      'Santos', 'SP', 'Arena Poliesportiva Praiana', 'Rua da Praia, 450 - Ponta da Praia',
      'https://img.usecurling.com/p/800/400?q=championship%20trophy&color=gold',
      'Documento de identidade e uniforme numerado.',
      'Regulamento geral disponível na comissão técnica antes do pontapé inicial.',
      (CURRENT_DATE + interval '15 days')::date, 16, 50.00, 'open'
    );
  END IF;
END $$;
