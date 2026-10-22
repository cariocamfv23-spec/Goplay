-- ============================================================================
-- ETAPA 2: Mensagens Clube <-> Atleta no Goplay App
-- Criação de conversas 1:1, mensagens, RLS estrita, índices e realtime
-- ============================================================================

-- 1. Tabela de conversas privadas (1:1 entre participantes)
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant1_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  participant2_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  last_message_text TEXT DEFAULT '',
  last_message_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_different_participants CHECK (participant1_id <> participant2_id),
  CONSTRAINT chk_canonical_participant_order CHECK (participant1_id < participant2_id),
  CONSTRAINT uq_conversation_participants UNIQUE (participant1_id, participant2_id)
);

-- 2. Tabela de mensagens individuais da conversa
CREATE TABLE IF NOT EXISTS public.direct_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL DEFAULT '',
  message_type TEXT NOT NULL DEFAULT 'text',
  media_url TEXT,
  file_name TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Índices para performance e listagem rápida
CREATE INDEX IF NOT EXISTS idx_conversations_p1 ON public.conversations(participant1_id);
CREATE INDEX IF NOT EXISTS idx_conversations_p2 ON public.conversations(participant2_id);
CREATE INDEX IF NOT EXISTS idx_conversations_last_msg_at ON public.conversations(last_message_at DESC);

CREATE INDEX IF NOT EXISTS idx_direct_messages_conversation_id ON public.direct_messages(conversation_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_direct_messages_sender_id ON public.direct_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_direct_messages_unread ON public.direct_messages(conversation_id, read_at) WHERE read_at IS NULL;

-- 4. Função auxiliar: obter ou criar conversa canônica entre dois usuários
CREATE OR REPLACE FUNCTION public.get_or_create_conversation(other_user_id UUID)
RETURNS UUID AS $$
DECLARE
  current_uid UUID;
  p1 UUID;
  p2 UUID;
  conv_id UUID;
BEGIN
  current_uid := auth.uid();
  IF current_uid IS NULL THEN
    RAISE EXCEPTION 'Usuário não autenticado';
  END IF;

  IF other_user_id IS NULL OR current_uid = other_user_id THEN
    RAISE EXCEPTION 'Usuário parceiro inválido';
  END IF;

  -- Ordenação canônica (participant1_id < participant2_id)
  IF current_uid < other_user_id THEN
    p1 := current_uid;
    p2 := other_user_id;
  ELSE
    p1 := other_user_id;
    p2 := current_uid;
  END IF;

  -- Verifica se existe bloqueio entre os usuários
  IF EXISTS (
    SELECT 1 FROM public.user_blocks
    WHERE (blocker_id = current_uid AND blocked_id = other_user_id)
       OR (blocker_id = other_user_id AND blocked_id = current_uid)
  ) THEN
    RAISE EXCEPTION 'Não é possível iniciar conversa com usuário bloqueado.';
  END IF;

  -- Busca conversa existente
  SELECT id INTO conv_id
  FROM public.conversations
  WHERE participant1_id = p1 AND participant2_id = p2;

  IF conv_id IS NOT NULL THEN
    RETURN conv_id;
  END IF;

  -- Cria nova conversa se não existir
  INSERT INTO public.conversations (participant1_id, participant2_id, last_message_at)
  VALUES (p1, p2, NOW())
  ON CONFLICT (participant1_id, participant2_id) DO UPDATE
    SET updated_at = NOW()
  RETURNING id INTO conv_id;

  RETURN conv_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 5. Trigger para atualizar conversations.last_message_* a cada nova mensagem
CREATE OR REPLACE FUNCTION public.handle_new_direct_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.conversations
  SET
    last_message_text = CASE
      WHEN NEW.message_type = 'image' THEN '📷 Imagem'
      WHEN NEW.message_type = 'video' THEN '🎥 Vídeo'
      WHEN NEW.message_type = 'audio' THEN '🎙️ Áudio'
      WHEN NEW.message_type = 'document' THEN '📄 Documento'
      ELSE COALESCE(NULLIF(NEW.content, ''), 'Nova mensagem')
    END,
    last_message_at = NEW.created_at,
    updated_at = NOW()
  WHERE id = NEW.conversation_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS trg_direct_messages_insert ON public.direct_messages;
CREATE TRIGGER trg_direct_messages_insert
  AFTER INSERT ON public.direct_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_direct_message();

-- 6. Habilitar RLS em ambas as tabelas
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.direct_messages ENABLE ROW LEVEL SECURITY;

-- 7. Políticas de RLS para conversations
-- Somente participantes podem visualizar suas conversas
DROP POLICY IF EXISTS "conversations_select_participant" ON public.conversations;
CREATE POLICY "conversations_select_participant" ON public.conversations
  FOR SELECT TO authenticated
  USING (
    auth.uid() = participant1_id OR auth.uid() = participant2_id
  );

-- Criação direta permitida se auth.uid() for um dos participantes
DROP POLICY IF EXISTS "conversations_insert_participant" ON public.conversations;
CREATE POLICY "conversations_insert_participant" ON public.conversations
  FOR INSERT TO authenticated
  WITH CHECK (
    (auth.uid() = participant1_id OR auth.uid() = participant2_id)
    AND participant1_id < participant2_id
  );

-- Atualização permitida para participantes (ex: atualizar last_message)
DROP POLICY IF EXISTS "conversations_update_participant" ON public.conversations;
CREATE POLICY "conversations_update_participant" ON public.conversations
  FOR UPDATE TO authenticated
  USING (
    auth.uid() = participant1_id OR auth.uid() = participant2_id
  )
  WITH CHECK (
    auth.uid() = participant1_id OR auth.uid() = participant2_id
  );

-- 8. Políticas de RLS para direct_messages
-- Leitura: somente participantes da conversa
DROP POLICY IF EXISTS "direct_messages_select_participant" ON public.direct_messages;
CREATE POLICY "direct_messages_select_participant" ON public.direct_messages
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = direct_messages.conversation_id
        AND (c.participant1_id = auth.uid() OR c.participant2_id = auth.uid())
    )
  );

-- Inserção: sender_id OBRIGATORIAMENTE igual ao auth.uid(), e deve ser participante da conversa
DROP POLICY IF EXISTS "direct_messages_insert_sender" ON public.direct_messages;
CREATE POLICY "direct_messages_insert_sender" ON public.direct_messages
  FOR INSERT TO authenticated
  WITH CHECK (
    sender_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = direct_messages.conversation_id
        AND (c.participant1_id = auth.uid() OR c.participant2_id = auth.uid())
    )
  );

-- Atualização: participante pode atualizar 'read_at' de mensagens recebidas
DROP POLICY IF EXISTS "direct_messages_update_reader" ON public.direct_messages;
CREATE POLICY "direct_messages_update_reader" ON public.direct_messages
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = direct_messages.conversation_id
        AND (c.participant1_id = auth.uid() OR c.participant2_id = auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = direct_messages.conversation_id
        AND (c.participant1_id = auth.uid() OR c.participant2_id = auth.uid())
    )
  );

-- 9. Concessões de permissões para authenticated e anon
GRANT SELECT, INSERT, UPDATE ON public.conversations TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.direct_messages TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_or_create_conversation(UUID) TO authenticated;

-- 10. Habilitar Supabase Realtime nas tabelas de chat
ALTER PUBLICATION supabase_realtime ADD TABLE public.conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.direct_messages;
