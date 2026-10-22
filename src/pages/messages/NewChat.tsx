import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Search,
  Loader2,
  Building2,
  User,
  Trophy,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'
import { chatService } from '@/services/chat'
import { toast } from 'sonner'

interface ContactProfile {
  id: string
  fullName: string
  avatarUrl: string
  accountType: 'athlete' | 'club' | 'coach'
  sport?: string
  position?: string
  city?: string
  state?: string
  clubName?: string
}

export default function NewChat() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [profiles, setProfiles] = useState<ContactProfile[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [startingChatWith, setStartingChatWith] = useState<string | null>(null)

  useEffect(() => {
    async function loadProfiles() {
      try {
        setLoading(true)
        const { data, error } = await (supabase as any)
          .from('profiles')
          .select(
            'id, full_name, avatar_url, account_type, sport, position, city, state, club_name',
          )
          .order('account_type', { ascending: false })
          .limit(60)

        if (error) throw error

        const mapped: ContactProfile[] = (data || [])
          .filter((p: any) => p.id !== user?.id)
          .map((p: any) => ({
            id: p.id,
            fullName: p.club_name || p.full_name || 'Usuário Goplay',
            avatarUrl:
              p.avatar_url ||
              `https://img.usecurling.com/ppl/medium?gender=male&seed=${p.id}`,
            accountType: p.account_type || 'athlete',
            sport: p.sport,
            position: p.position,
            city: p.city,
            state: p.state,
            clubName: p.club_name,
          }))

        setProfiles(mapped)
      } catch (err) {
        console.error('Erro ao buscar contatos:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProfiles()
  }, [user?.id])

  const filtered = useMemo(() => {
    if (!search.trim()) return profiles
    const q = search.toLowerCase().trim()
    return profiles.filter(
      (p) =>
        p.fullName.toLowerCase().includes(q) ||
        (p.sport && p.sport.toLowerCase().includes(q)) ||
        (p.position && p.position.toLowerCase().includes(q)) ||
        (p.city && p.city.toLowerCase().includes(q)),
    )
  }, [profiles, search])

  const handleStartChat = async (targetUserId: string) => {
    if (!user) {
      toast.error('Você precisa estar logado para iniciar uma conversa.')
      navigate('/login')
      return
    }

    try {
      setStartingChatWith(targetUserId)
      const { conversationId, error } =
        await chatService.getOrCreateConversation(targetUserId)

      if (error || !conversationId) {
        toast.error(error?.message || 'Não foi possível iniciar a conversa.')
        return
      }

      navigate(`/messages/${conversationId}`)
    } catch (err: any) {
      toast.error(err?.message || 'Falha ao abrir conversa.')
    } finally {
      setStartingChatWith(null)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-12 animate-fade-in">
      <div className="sticky top-0 bg-background/95 backdrop-blur z-20 p-4 border-b border-border/50 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Nova Conversa</h1>
          <p className="text-xs text-muted-foreground">
            Conecte-se diretamente com clubes e atletas
          </p>
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, esporte, cidade ou clube..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-secondary border-none rounded-xl"
            autoFocus
          />
        </div>

        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {search ? 'Resultados' : 'Clubes & Atletas Disponíveis'}
          </h3>
          <span className="text-[11px] text-muted-foreground">
            {filtered.length} contatos
          </span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
            <p className="text-xs">Carregando contatos...</p>
          </div>
        ) : filtered.length === 0 ? (
          <Card className="border-dashed bg-transparent p-6 text-center">
            <p className="text-sm font-semibold text-foreground mb-1">
              Nenhum perfil encontrado
            </p>
            <p className="text-xs text-muted-foreground">
              Tente buscar por outro termo ou nome.
            </p>
          </Card>
        ) : (
          <div className="space-y-2">
            {filtered.map((profile) => {
              const isStarting = startingChatWith === profile.id
              const isClub = profile.accountType === 'club'

              return (
                <Card
                  key={profile.id}
                  className="border border-border/40 hover:border-border hover:bg-secondary/40 transition-all cursor-pointer shadow-none rounded-xl"
                  onClick={() => !isStarting && handleStartChat(profile.id)}
                >
                  <CardContent className="p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative">
                        <Avatar className="h-11 w-11 border border-border">
                          <AvatarImage src={profile.avatarUrl} />
                          <AvatarFallback>
                            {profile.fullName[0] || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        {isClub && (
                          <div className="absolute -bottom-1 -right-1 bg-primary text-white p-0.5 rounded-full">
                            <Building2 className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-sm truncate">
                            {profile.fullName}
                          </p>
                          <Badge
                            variant="secondary"
                            className={`text-[9px] px-1 py-0 border-none ${
                              isClub
                                ? 'bg-primary/10 text-primary font-bold'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {isClub ? 'Clube' : 'Atleta'}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {profile.sport || 'Esportes'}
                          {profile.position ? ` • ${profile.position}` : ''}
                          {profile.city ? ` • ${profile.city}` : ''}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isStarting ? (
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 text-xs text-primary font-semibold hover:bg-primary/10 rounded-full"
                        >
                          Conversar
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
