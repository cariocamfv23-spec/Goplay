import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Loader2, AtSign, X } from 'lucide-react'
import type { PostMention } from '@/services/feed'

interface MentionAutocompleteProps {
  query: string
  isOpen: boolean
  onSelect: (mention: PostMention) => void
  onClose: () => void
  currentUserId?: string
  existingMentions?: PostMention[]
}

interface ProfileCandidate {
  id: string
  full_name: string | null
  avatar_url: string | null
  account_type: string | null
  sport: string | null
}

export function MentionAutocomplete({
  query,
  isOpen,
  onSelect,
  onClose,
  currentUserId,
  existingMentions = [],
}: MentionAutocompleteProps) {
  const [candidates, setCandidates] = useState<ProfileCandidate[]>([])
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      setCandidates([])
      return
    }

    let isCancelled = false
    setLoading(true)

    const fetchProfiles = async () => {
      try {
        let req = supabase
          .from('profiles')
          .select('id, full_name, avatar_url, account_type, sport')
          .limit(8)

        const trimmed = query.trim()
        if (trimmed) {
          req = req.ilike('full_name', `%${trimmed}%`)
        } else {
          req = req.order('created_at', { ascending: false })
        }

        const { data, error } = await req
        if (isCancelled) return

        if (!error && data) {
          // Filter out current user and already selected mentions
          const existingIds = new Set(existingMentions.map((m) => m.id))
          const filtered = (data as ProfileCandidate[]).filter(
            (p) => p.id !== currentUserId && !existingIds.has(p.id),
          )
          setCandidates(filtered)
        } else {
          setCandidates([])
        }
      } catch {
        if (!isCancelled) setCandidates([])
      } finally {
        if (!isCancelled) setLoading(false)
      }
    }

    const timer = setTimeout(fetchProfiles, 150)
    return () => {
      isCancelled = true
      clearTimeout(timer)
    }
  }, [query, isOpen, currentUserId, existingMentions])

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const formatAccountType = (type?: string | null) => {
    if (type === 'club') return 'Clube'
    if (type === 'coach') return 'Treinador'
    return 'Atleta'
  }

  return (
    <div
      ref={containerRef}
      className="absolute z-50 left-0 right-0 -top-2 -translate-y-full mb-1 bg-popover/95 backdrop-blur-md border border-border/80 rounded-xl shadow-xl p-2 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="flex items-center justify-between px-2 py-1 mb-1 border-b border-border/40 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
        <span className="flex items-center gap-1">
          <AtSign className="w-3 h-3 text-primary" />
          Marcar perfil ({query ? `"${query}"` : 'sugestões'})
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground p-0.5 rounded"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-4 text-xs text-muted-foreground gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
          <span>Buscando usuários...</span>
        </div>
      )}

      {!loading && candidates.length === 0 && (
        <div className="py-4 text-center text-xs text-muted-foreground">
          {query
            ? `Nenhum usuário encontrado para "@${query}"`
            : 'Nenhum usuário disponível para marcação'}
        </div>
      )}

      {!loading && candidates.length > 0 && (
        <div className="space-y-1">
          {candidates.map((cand) => (
            <button
              key={cand.id}
              type="button"
              onClick={() => {
                onSelect({
                  id: cand.id,
                  name: cand.full_name || 'Usuário',
                  avatar: cand.avatar_url || null,
                  accountType: cand.account_type || 'athlete',
                  sport: cand.sport || null,
                })
              }}
              className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-secondary/70 transition-colors text-left group"
            >
              <Avatar className="h-8 w-8 border border-border/60 shrink-0">
                <AvatarImage
                  src={
                    cand.avatar_url ||
                    `https://img.usecurling.com/ppl/thumbnail?seed=${cand.id.slice(0, 4)}`
                  }
                />
                <AvatarFallback>
                  {(cand.full_name || 'U').substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-foreground group-hover:text-primary truncate">
                    {cand.full_name || 'Usuário Goplay'}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-[9px] px-1 py-0 h-4 border-primary/20 text-primary font-normal"
                  >
                    {formatAccountType(cand.account_type)}
                  </Badge>
                </div>
                {cand.sport && (
                  <span className="text-[10px] text-muted-foreground block truncate">
                    {cand.sport}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
