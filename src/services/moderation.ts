import { supabase } from '@/lib/supabase/client'
import { analyticsService } from '@/services/analytics'

export type ReportContentType =
  | 'profile'
  | 'post'
  | 'comment'
  | 'event'
  | 'passport'

export type ReportReason =
  | 'harassment'
  | 'offensive_content'
  | 'fraud'
  | 'spam'
  | 'minor_safety'
  | 'other'

export type ReportStatus =
  | 'pending'
  | 'investigating'
  | 'resolved'
  | 'dismissed'

export interface CreateReportParams {
  reporterId: string
  reportedUserId?: string | null
  contentType: ReportContentType
  contentId?: string | null
  reason: ReportReason
  description?: string
}

export interface ReportItem {
  id: string
  reporterId: string
  reportedUserId?: string | null
  contentType: ReportContentType
  contentId?: string | null
  reason: ReportReason
  description?: string | null
  status: ReportStatus
  resolvedAt?: string | null
  resolvedBy?: string | null
  createdAt: string
  reporterName?: string
  reporterEmail?: string
  reportedUserName?: string
}

export interface UserBlockItem {
  id: string
  blockerId: string
  blockedId: string
  createdAt: string
}

export const REPORT_REASONS: Array<{
  value: ReportReason
  label: string
  description: string
}> = [
  {
    value: 'harassment',
    label: 'Assédio ou Perseguição',
    description: 'Comportamento abusivo, ofensas direcionadas ou intimidação.',
  },
  {
    value: 'offensive_content',
    label: 'Conteúdo Ofensivo ou Inapropriado',
    description: 'Discurso de ódio, violência ou linguagem discriminatória.',
  },
  {
    value: 'fraud',
    label: 'Fraude ou Falsidade Ideológica',
    description:
      'Perfil falso, informações esportivas enganosas ou golpe financeiro.',
  },
  {
    value: 'spam',
    label: 'Spam ou Divulgação Não Autorizada',
    description:
      'Mensagens repetitivas, links suspeitos ou propaganda não solicitada.',
  },
  {
    value: 'minor_safety',
    label: 'Menor de Idade sem Responsável / Risco',
    description:
      'Violação de regras de proteção à infância ou abordagem indevida a atletas menores.',
  },
  {
    value: 'other',
    label: 'Outro Motivo',
    description: 'Outra violação das regras de conduta do Goplay App.',
  },
]

export const moderationService = {
  /**
   * Registra uma nova denúncia real no Supabase.
   */
  async createReport(
    params: CreateReportParams,
  ): Promise<{ data: ReportItem | null; error: Error | null }> {
    try {
      const {
        reporterId,
        reportedUserId = null,
        contentType,
        contentId = null,
        reason,
        description = '',
      } = params

      if (!reporterId) {
        throw new Error('Usuário não autenticado para enviar denúncia.')
      }

      const { data, error } = await (supabase as any)
        .from('reports')
        .insert({
          reporter_id: reporterId,
          reported_user_id: reportedUserId,
          content_type: contentType,
          content_id: contentId ? String(contentId) : null,
          reason,
          description: description?.trim() || null,
          status: 'pending',
        })
        .select()
        .single()

      if (error) throw error

      // Registro analítico leve
      analyticsService.trackEvent({
        eventName: 'report_created',
        userId: reporterId,
        targetId: reportedUserId || contentId || undefined,
        metadata: {
          contentType,
          reason,
        },
      })

      return {
        data: {
          id: data.id,
          reporterId: data.reporter_id,
          reportedUserId: data.reported_user_id,
          contentType: data.content_type,
          contentId: data.content_id,
          reason: data.reason,
          description: data.description,
          status: data.status,
          createdAt: data.created_at,
        },
        error: null,
      }
    } catch (err: any) {
      return {
        data: null,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Bloqueia um usuário (mútuo).
   */
  async blockUser(
    blockerId: string,
    blockedId: string,
  ): Promise<{ error: Error | null }> {
    try {
      if (!blockerId || !blockedId) {
        throw new Error('Identificadores de usuário inválidos.')
      }
      if (blockerId === blockedId) {
        throw new Error('Você não pode bloquear a si próprio.')
      }

      const { error } = await (supabase as any).from('user_blocks').insert({
        blocker_id: blockerId,
        blocked_id: blockedId,
      })

      if (error && error.code !== '23505') {
        throw error
      }

      analyticsService.trackEvent({
        eventName: 'user_blocked',
        userId: blockerId,
        targetId: blockedId,
      })

      return { error: null }
    } catch (err: any) {
      return {
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Desbloqueia um usuário previamente bloqueado pelo usuário logado.
   */
  async unblockUser(
    blockerId: string,
    blockedId: string,
  ): Promise<{ error: Error | null }> {
    try {
      const { error } = await (supabase as any)
        .from('user_blocks')
        .delete()
        .eq('blocker_id', blockerId)
        .eq('blocked_id', blockedId)

      if (error) throw error

      analyticsService.trackEvent({
        eventName: 'user_unblocked',
        userId: blockerId,
        targetId: blockedId,
      })

      return { error: null }
    } catch (err: any) {
      return {
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Verifica se existe bloqueio ativo entre dois usuários (em qualquer direção).
   */
  async checkMutualBlock(
    currentUserId: string,
    targetUserId: string,
  ): Promise<{ isBlockedByMe: boolean; isBlockingMe: boolean }> {
    try {
      if (!currentUserId || !targetUserId || currentUserId === targetUserId) {
        return { isBlockedByMe: false, isBlockingMe: false }
      }

      const { data, error } = await (supabase as any)
        .from('user_blocks')
        .select('blocker_id, blocked_id')
        .or(
          `and(blocker_id.eq.${currentUserId},blocked_id.eq.${targetUserId}),and(blocker_id.eq.${targetUserId},blocked_id.eq.${currentUserId})`,
        )

      if (error || !data) {
        return { isBlockedByMe: false, isBlockingMe: false }
      }

      const isBlockedByMe = data.some(
        (b: any) =>
          b.blocker_id === currentUserId && b.blocked_id === targetUserId,
      )
      const isBlockingMe = data.some(
        (b: any) =>
          b.blocker_id === targetUserId && b.blocked_id === currentUserId,
      )

      return { isBlockedByMe, isBlockingMe }
    } catch {
      return { isBlockedByMe: false, isBlockingMe: false }
    }
  },

  /**
   * Retorna o conjunto de IDs de usuários com quem o usuário atual tem bloqueio mútuo.
   * Usado para filtrar feeds, listas e interações no frontend.
   */
  async getBlockedUserIds(currentUserId: string): Promise<Set<string>> {
    const blockedSet = new Set<string>()
    if (!currentUserId) return blockedSet

    try {
      const { data, error } = await (supabase as any)
        .from('user_blocks')
        .select('blocker_id, blocked_id')
        .or(`blocker_id.eq.${currentUserId},blocked_id.eq.${currentUserId}`)

      if (!error && Array.isArray(data)) {
        for (const row of data) {
          if (row.blocker_id === currentUserId && row.blocked_id) {
            blockedSet.add(row.blocked_id)
          } else if (row.blocked_id === currentUserId && row.blocker_id) {
            blockedSet.add(row.blocker_id)
          }
        }
      }
    } catch (err) {
      console.warn('Erro ao carregar lista de bloqueios:', err)
    }

    return blockedSet
  },

  /**
   * Lista todas as denúncias para moderadores/admins.
   */
  async listAdminReports(
    statusFilter?: ReportStatus,
  ): Promise<{ data: ReportItem[]; error: Error | null }> {
    try {
      let query = (supabase as any)
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false })

      if (statusFilter) {
        query = query.eq('status', statusFilter)
      }

      const { data: rawReports, error } = await query
      if (error) throw error
      if (!rawReports || rawReports.length === 0)
        return { data: [], error: null }

      // Coletar IDs para trazer nomes amigáveis
      const userIds = Array.from(
        new Set(
          rawReports
            .flatMap((r: any) => [r.reporter_id, r.reported_user_id])
            .filter(Boolean),
        ),
      )

      let profileMap = new Map<string, string>()
      if (userIds.length > 0) {
        const { data: profs } = await (supabase as any)
          .from('profiles')
          .select('id, full_name')
          .in('id', userIds)
        if (profs) {
          for (const p of profs) {
            profileMap.set(p.id, p.full_name || 'Sem nome')
          }
        }
      }

      const mapped: ReportItem[] = rawReports.map((r: any) => ({
        id: r.id,
        reporterId: r.reporter_id,
        reportedUserId: r.reported_user_id,
        contentType: r.content_type,
        contentId: r.content_id,
        reason: r.reason,
        description: r.description,
        status: r.status,
        resolvedAt: r.resolved_at,
        resolvedBy: r.resolved_by,
        createdAt: r.created_at,
        reporterName: profileMap.get(r.reporter_id) || 'Usuário',
        reportedUserName: r.reported_user_id
          ? profileMap.get(r.reported_user_id) || 'Perfil do App'
          : undefined,
      }))

      return { data: mapped, error: null }
    } catch (err: any) {
      return {
        data: [],
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Atualiza o status de uma denúncia (admin).
   */
  async updateReportStatus(
    reportId: string,
    status: ReportStatus,
    adminUserId: string,
  ): Promise<{ error: Error | null }> {
    try {
      const isResolved = status === 'resolved' || status === 'dismissed'
      const { error } = await (supabase as any)
        .from('reports')
        .update({
          status,
          resolved_at: isResolved ? new Date().toISOString() : null,
          resolved_by: isResolved ? adminUserId : null,
        })
        .eq('id', reportId)

      if (error) throw error
      return { error: null }
    } catch (err: any) {
      return { error: err instanceof Error ? err : new Error(String(err)) }
    }
  },
}
