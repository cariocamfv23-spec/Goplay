-- FASE 3 SCHEMA: Cover Framing, Test Profiles, Feed, Connections, Events/Tryouts, Notifications
-- Idempotent non-destructive migration

-- 1. ADD COVER FRAMING COLUMNS TO PROFILES (Etapa 3A)
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS cover_position_x NUMERIC DEFAULT 50,
  ADD COLUMN IF NOT EXISTS cover_position_y NUMERIC DEFAULT 50,
  ADD COLUMN IF NOT EXISTS cover_zoom NUMERIC DEFAULT 1;

-- 2. CREATE VALID AUTH TEST PROFILES (Etapa 3A)
-- 5 Athletes (Futebol, Basquete, Vôlei, Natação, Luta/Judô), 1 Club, 1 Coach
-- Password for all test demo accounts: Skip@Pass (or Goplay@2025!) using pgcrypto crypt
DO $$
DECLARE
  v_salt text := gen_salt('bf');
  v_pwd text := crypt('Skip@Pass', v_salt);
  v_u_fut uuid := '11111111-0000-0000-0000-000000000001'::uuid;
  v_u_basq uuid := '11111111-0000-0000-0000-000000000002'::uuid;
  v_u_vol uuid := '11111111-0000-0000-0000-000000000003'::uuid;
  v_u_nat uuid := '11111111-0000-0000-0000-000000000004'::uuid;
  v_u_lut uuid := '11111111-0000-0000-0000-000000000005'::uuid;
  v_u_club uuid := '11111111-0000-0000-0000-000000000006'::uuid;
  v_u_coa uuid := '11111111-0000-0000-0000-000000000007'::uuid;
BEGIN
  -- Seed athlete 1: Futebol
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'demo.futebol@goplay.test') THEN
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      v_u_fut, '00000000-0000-0000-0000-000000000000', 'demo.futebol@goplay.test',
      v_pwd, NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}', '{"name": "Lucas Silva (Demo)"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );
  END IF;

  INSERT INTO public.profiles (
    id, full_name, account_type, sport, position, city, state, bio, experience, previous_clubs, sports_goals, avatar_url, cover_url, cover_type, cover_position_x, cover_position_y, cover_zoom
  ) VALUES (
    v_u_fut, 'Lucas Silva', 'athlete', 'Futebol', 'Atacante', 'São Paulo', 'SP',
    'Atacante veloz, especialista em finalização e drible curto. Conta de demonstração oficial Goplay.',
    '7 anos de categorias de base', 'Nacional Atlético Clube, Juventus-SP', 'Chegar ao profissional e atuar na Série A',
    'https://img.usecurling.com/ppl/medium?gender=male&seed=101',
    'https://img.usecurling.com/p/800/400?q=soccer%20stadium&color=green',
    'image', 50, 50, 1
  ) ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    sport = EXCLUDED.sport,
    position = EXCLUDED.position;

  -- Seed athlete 2: Basquete
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'demo.basquete@goplay.test') THEN
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      v_u_basq, '00000000-0000-0000-0000-000000000000', 'demo.basquete@goplay.test',
      v_pwd, NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}', '{"name": "Matheus Costa (Demo)"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );
  END IF;

  INSERT INTO public.profiles (
    id, full_name, account_type, sport, position, city, state, bio, experience, sports_goals, avatar_url, cover_url, cover_type
  ) VALUES (
    v_u_basq, 'Matheus Costa', 'athlete', 'Basquete', 'Armador', 'Franca', 'SP',
    'Armador com visão apurada de quadra e alto aproveitamento em arremessos de 3 pontos. Conta demo.',
    '5 anos em ligas universitárias e LDB', 'Disputar o NBB e representar a seleção brasileira',
    'https://img.usecurling.com/ppl/medium?gender=male&seed=102',
    'https://img.usecurling.com/p/800/400?q=basketball%20court&color=orange',
    'image'
  ) ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, sport = EXCLUDED.sport;

  -- Seed athlete 3: Vôlei
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'demo.volei@goplay.test') THEN
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      v_u_vol, '00000000-0000-0000-0000-000000000000', 'demo.volei@goplay.test',
      v_pwd, NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}', '{"name": "Camila Oliveira (Demo)"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );
  END IF;

  INSERT INTO public.profiles (
    id, full_name, account_type, sport, position, city, state, bio, experience, sports_goals, avatar_url, cover_url, cover_type
  ) VALUES (
    v_u_vol, 'Camila Oliveira', 'athlete', 'Vôlei', 'Ponteira', 'Belo Horizonte', 'MG',
    'Ponteira passadora com liderança e alcance de ataque potente. Conta demo Goplay.',
    '4 temporadas na Superliga B e campeonatos estaduais', 'Disputar a Superliga A e circuito internacional',
    'https://img.usecurling.com/ppl/medium?gender=female&seed=103',
    'https://img.usecurling.com/p/800/400?q=volleyball%20net&color=blue',
    'image'
  ) ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, sport = EXCLUDED.sport;

  -- Seed athlete 4: Natação
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'demo.natacao@goplay.test') THEN
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      v_u_nat, '00000000-0000-0000-0000-000000000000', 'demo.natacao@goplay.test',
      v_pwd, NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}', '{"name": "Gabriel Rocha (Demo)"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );
  END IF;

  INSERT INTO public.profiles (
    id, full_name, account_type, sport, position, city, state, bio, experience, sports_goals, avatar_url, cover_url, cover_type
  ) VALUES (
    v_u_nat, 'Gabriel Rocha', 'athlete', 'Natação', '100m Livre / Borboleta', 'Rio de Janeiro', 'RJ',
    'Nadador velocista, foco em provas de 50m e 100m nado livre e costas. Conta demo Goplay.',
    'Medalhista no Troféu Maria Lenk juvenil', 'Índice olímpico para o ciclo 2028',
    'https://img.usecurling.com/ppl/medium?gender=male&seed=104',
    'https://img.usecurling.com/p/800/400?q=swimming%20pool&color=cyan',
    'image'
  ) ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, sport = EXCLUDED.sport;

  -- Seed athlete 5: Luta (Judô)
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'demo.judo@goplay.test') THEN
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      v_u_lut, '00000000-0000-0000-0000-000000000000', 'demo.judo@goplay.test',
      v_pwd, NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}', '{"name": "Beatriz Mendes (Demo)"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );
  END IF;

  INSERT INTO public.profiles (
    id, full_name, account_type, sport, position, city, state, bio, experience, sports_goals, avatar_url, cover_url, cover_type
  ) VALUES (
    v_u_lut, 'Beatriz Mendes', 'athlete', 'Judô', 'Meio-Pesado (-78kg)', 'Curitiba', 'PR',
    'Faixa preta 1º Dan, especialista em técnicas de chão e contra-ataque. Conta demo Goplay.',
    'Campeã Brasileira Sub-21 e Pan-Americana Open', 'Conquistar vaga na seleção principal e ciclo Pan 2027',
    'https://img.usecurling.com/ppl/medium?gender=female&seed=105',
    'https://img.usecurling.com/p/800/400?q=martial%20arts%20tatami&color=yellow',
    'image'
  ) ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, sport = EXCLUDED.sport;

  -- Seed Club: Clube Atlético Paulista
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'demo.clube@goplay.test') THEN
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      v_u_club, '00000000-0000-0000-0000-000000000000', 'demo.clube@goplay.test',
      v_pwd, NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}', '{"name": "Clube Atlético Paulista"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );
  END IF;

  INSERT INTO public.profiles (
    id, full_name, club_name, account_type, sport, city, state, institutional_description, categories, contact_info, avatar_url, cover_url, cover_type
  ) VALUES (
    v_u_club, 'Clube Atlético Paulista', 'Clube Atlético Paulista', 'club', 'Futebol', 'Campinas', 'SP',
    'Instituição centenária de formação de novos talentos e peneiras oficiais no interior paulista.',
    'Sub-15, Sub-17, Sub-20, Feminino Principal', 'contato@capaulista.demo.br | (19) 3322-1000',
    'https://img.usecurling.com/i?q=shield&color=gold',
    'https://img.usecurling.com/p/800/400?q=soccer%20training%20camp&color=green',
    'image'
  ) ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, club_name = EXCLUDED.club_name, account_type = EXCLUDED.account_type;

  -- Seed Coach: Treinador Marcelo Prado
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'demo.treinador@goplay.test') THEN
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      v_u_coa, '00000000-0000-0000-0000-000000000000', 'demo.treinador@goplay.test',
      v_pwd, NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}', '{"name": "Prof. Marcelo Prado"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );
  END IF;

  INSERT INTO public.profiles (
    id, full_name, account_type, sport, position, city, state, bio, experience, specialties, certifications, avatar_url, cover_url, cover_type
  ) VALUES (
    v_u_coa, 'Prof. Marcelo Prado', 'coach', 'Futebol', 'Treinador de Alto Rendimento', 'Santos', 'SP',
    'Preparador físico e treinador tático UEFA/CBF PRO, mentor de atletas de base rumo ao profissional.',
    '15 anos em centros de excelência esportiva e comissões técnicas',
    'Transição ofensiva, periodização tática, scouting de talentos',
    'Licença A CBF Academy, CREF 049821-G/SP',
    'https://img.usecurling.com/ppl/medium?gender=male&seed=107',
    'https://img.usecurling.com/p/800/400?q=coach%20tactics%20board&color=blue',
    'image'
  ) ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, account_type = EXCLUDED.account_type;

END $$;
