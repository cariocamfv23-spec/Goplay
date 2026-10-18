-- Add mentions, audio_url and music_link to public.posts
ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS mentions JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS audio_url TEXT,
  ADD COLUMN IF NOT EXISTS music_link JSONB;

-- Comment for documentation
COMMENT ON COLUMN public.posts.mentions IS 'List of tagged profiles: [{ id, name, username, avatar_url, account_type, sport }]';
COMMENT ON COLUMN public.posts.audio_url IS 'Direct URL to uploaded audio track in posts storage';
COMMENT ON COLUMN public.posts.music_link IS 'Optional external music link: { platform: spotify|youtube|applemusic|other, url, title, artist, coverUrl }';

-- Index for searching posts that mention a specific user ID
CREATE INDEX IF NOT EXISTS idx_posts_mentions ON public.posts USING gin (mentions);
