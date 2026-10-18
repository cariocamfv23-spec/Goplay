-- Migration: Add cover_url and cover_type to public.profiles and configure storage bucket for covers
-- Date: 2026-10-18
-- Author: Goplay App Phase 2 Finalization

-- 1. Add cover_url and cover_type columns to public.profiles safely
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS cover_url text,
ADD COLUMN IF NOT EXISTS cover_type text DEFAULT 'image';

-- 2. Create the 'covers' storage bucket if it does not already exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'covers',
  'covers',
  true,
  15728640, -- 15MB limit to allow images and reasonable webm/mp4 short loop previews if needed
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 15728640,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm'];

-- 3. Storage policies for covers bucket
DROP POLICY IF EXISTS "Public cover access" ON storage.objects;
CREATE POLICY "Public cover access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'covers');

DROP POLICY IF EXISTS "Authenticated users can upload own cover" ON storage.objects;
CREATE POLICY "Authenticated users can upload own cover"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'covers'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Authenticated users can update own cover" ON storage.objects;
CREATE POLICY "Authenticated users can update own cover"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'covers'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Authenticated users can delete own cover" ON storage.objects;
CREATE POLICY "Authenticated users can delete own cover"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'covers'
  AND (storage.foldername(name))[1] = auth.uid()::text
);
