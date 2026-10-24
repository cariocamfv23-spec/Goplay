-- Re-host Move demo videos to Supabase public storage bucket 'posts'
-- Motivo: As URLs anteriores de commondatastorage.googleapis.com/gtv-videos-bucket/sample/ retornam HTTP 403 Forbidden
-- mundialmente pelo Google Cloud Storage (permissão storage.objects.get negada / bucket desativado).
-- O arquivo de futebol foi salvo em storage.objects no bucket 'posts' (move/demo_futebol.mp4)
-- O segundo arquivo usa amostra pública direta H.264 / AAC com suporte verificado a Range e CORS.

UPDATE public.posts
SET
  video_url = 'https://xjpzglglpkeggpywqtac.supabase.co/storage/v1/object/public/posts/move/demo_futebol.mp4',
  media_urls = ARRAY['https://xjpzglglpkeggpywqtac.supabase.co/storage/v1/object/public/posts/move/demo_futebol.mp4']::text[],
  updated_at = NOW()
WHERE id = '33333333-0000-0000-0000-000000000001'::uuid;

UPDATE public.posts
SET
  video_url = 'https://raw.githubusercontent.com/chthomos/video-media-samples/master/big-buck-bunny-480p-30sec.mp4',
  media_urls = ARRAY['https://raw.githubusercontent.com/chthomos/video-media-samples/master/big-buck-bunny-480p-30sec.mp4']::text[],
  updated_at = NOW()
WHERE id = '33333333-0000-0000-0000-000000000002'::uuid;
