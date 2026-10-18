import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Users,
  Trophy,
  ShieldCheck,
  Briefcase,
  ChevronRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import { profileService, type ProfileRow } from '@/services/profiles'

export function DemoProfilesBanner() {
  const navigate = useNavigate()
  const [demoProfiles, setDemoProfiles] = useState<ProfileRow[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    profileService.getDemoProfiles().then(({ data }) => {
      setDemoProfiles(data || [])
    })
  }, [])

  if (demoProfiles.length === 0) return null

  return (
    <Card className="border border-primary/20 bg-gradient-to-r from-primary/5 via-primary/10 to-transparent shadow-sm mb-4">
      <CardContent className="p-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/20 text-primary">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-foreground">
                  Perfis de Demonstração (Fase 3)
                </span>
                <Badge
                  variant="secondary"
                  className="text-[10px] h-4 px-1 bg-primary/20 text-primary border-none"
                >
                  Contas Reais
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Navegue com segurança entre atletas de diversas modalidades,
                clube e treinador.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs border-primary/30 text-primary hover:bg-primary/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Ocultar' : 'Ver Perfis'}
          </Button>
        </div>

        {isOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-3 pt-3 border-t border-border/50 animate-in fade-in">
            {demoProfiles.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/profile/${p.id}`)}
                className="flex items-center justify-between p-2 rounded-lg bg-background/80 hover:bg-background border border-border/40 cursor-pointer transition-colors shadow-xs group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Avatar className="w-8 h-8 border border-border">
                    <AvatarImage src={p.avatar_url || ''} />
                    <AvatarFallback>{p.full_name?.[0] || 'D'}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate group-hover:text-primary transition-colors">
                      {p.full_name}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {p.account_type === 'club'
                        ? 'Clube Oficial'
                        : p.account_type === 'coach'
                          ? 'Treinador'
                          : `${p.sport || 'Atleta'} • ${p.position || 'Goplay'}`}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
