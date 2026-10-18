-- Migration: Create profiles table, trigger on auth.users and RLS policies
-- Current Timestamp: 2026-10-18T00:30:00.000Z

-- 1. Create enum for account_type if it doesn't already exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'account_type_enum') THEN
    CREATE TYPE public.account_type_enum AS ENUM ('athlete', 'club', 'coach');
  END IF;
END $$;

-- 2. Create public.profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  account_type public.account_type_enum NOT NULL DEFAULT 'athlete',
  sport TEXT,
  position TEXT,
  birth_date DATE,
  city TEXT,
  state TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. Idempotent RLS Policies
-- Authenticated users can view all profiles
DROP POLICY IF EXISTS "profiles_select_authenticated" ON public.profiles;
CREATE POLICY "profiles_select_authenticated"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can only insert their own profile
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Users can only update their own profile
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can only delete their own profile
DROP POLICY IF EXISTS "profiles_delete_own" ON public.profiles;
CREATE POLICY "profiles_delete_own"
  ON public.profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- 5. Helper function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_profiles_updated ON public.profiles;
CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 6. Trigger to automatically create a profile on auth.users insertion
-- Validates metadata, safely coalesces account_type to 'athlete' if invalid or missing,
-- rejects any role/admin privilege escalations, handles optional fields safely.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_raw_account_type TEXT;
  v_account_type public.account_type_enum;
  v_full_name TEXT;
  v_avatar_url TEXT;
  v_sport TEXT;
  v_position TEXT;
  v_city TEXT;
  v_state TEXT;
  v_birth_date DATE;
  v_raw_birth_date TEXT;
BEGIN
  -- Safe extraction of full_name from metadata or defaults
  v_full_name := NULLIF(TRIM(COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    ''
  )), '');

  -- Avatar extraction
  v_avatar_url := NULLIF(TRIM(COALESCE(
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'avatar',
    ''
  )), '');

  -- Safe extraction of account_type: MUST be 'athlete', 'club', or 'coach'
  v_raw_account_type := LOWER(TRIM(COALESCE(NEW.raw_user_meta_data->>'account_type', 'athlete')));
  IF v_raw_account_type IN ('athlete', 'club', 'coach') THEN
    v_account_type := v_raw_account_type::public.account_type_enum;
  ELSE
    v_account_type := 'athlete'::public.account_type_enum;
  END IF;

  -- Sport and position
  v_sport := NULLIF(TRIM(COALESCE(NEW.raw_user_meta_data->>'sport', '')), '');
  v_position := NULLIF(TRIM(COALESCE(NEW.raw_user_meta_data->>'position', '')), '');

  -- City and State
  v_city := NULLIF(TRIM(COALESCE(NEW.raw_user_meta_data->>'city', '')), '');
  v_state := NULLIF(TRIM(COALESCE(NEW.raw_user_meta_data->>'state', '')), '');

  -- Safe parse of birth_date if provided
  v_raw_birth_date := NULLIF(TRIM(COALESCE(NEW.raw_user_meta_data->>'birth_date', '')), '');
  IF v_raw_birth_date IS NOT NULL THEN
    BEGIN
      v_birth_date := v_raw_birth_date::DATE;
    EXCEPTION WHEN OTHERS THEN
      v_birth_date := NULL;
    END;
  ELSE
    v_birth_date := NULL;
  END IF;

  -- Insert profile for the new user (idempotent via ON CONFLICT)
  INSERT INTO public.profiles (
    id,
    full_name,
    avatar_url,
    account_type,
    sport,
    position,
    birth_date,
    city,
    state,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    v_full_name,
    v_avatar_url,
    v_account_type,
    v_sport,
    v_position,
    v_birth_date,
    v_city,
    v_state,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
    account_type = COALESCE(EXCLUDED.account_type, public.profiles.account_type),
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 7. Seed current developer/user test account if needed (from instructions)
DO $$
DECLARE
  v_seed_user_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'cariocamfv23@gmail.com') THEN
    v_seed_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      v_seed_user_id,
      '00000000-0000-0000-0000-000000000000',
      'cariocamfv23@gmail.com',
      crypt('Skip@Pass', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"full_name": "Goplay Atleta", "account_type": "athlete"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '',
      NULL,
      '', '', ''
    );
  END IF;
END $$;
