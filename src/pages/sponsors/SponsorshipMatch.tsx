import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  ArrowLeft,
  Search,
  Handshake,
  TrendingUp,
  Filter,
  Info,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockTalents, ProfileData } from '@/lib/data'
import { CriteriaSelector } from '@/components/sponsors/CriteriaSelector'
import { ProfileMatchCard } from '@/components/sponsors/ProfileMatchCard'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function SponsorshipMatch() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  // Filter and Sort Logic for "Elite" Profiles
  const eliteProfiles = mockTalents
    .filter((p) => {
      // Basic Search Filter
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sport?.toLowerCase().includes(search.toLowerCase())

      // "Elite" Threshold (e.g., has ranking or high views)
      const isElite =
        (p.ranking && p.ranking <= 100) || (p.totalViews && p.totalViews > 1000)

      return matchesSearch && isElite
    })
    .sort((a, b) => {
      // Sort by Ranking (Ascending) then Views (Descending)
      if (a.ranking && b.ranking) return a.ranking - b.ranking
      if (a.ranking) return -1
      if (b.ranking) return 1
      return (b.totalViews || 0) - (a.totalViews || 0)
    })

  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 pt-4 pb-4 px-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="-ml-2 hover:bg-secondary/50 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-full">
              <Handshake className="h-4 w-4 text-primary" />
            </div>
            <span className="font-bold text-lg">Sponsorship Match</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <Info className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Como funciona?</DialogTitle>
                <DialogDescription className="space-y-2 pt-2">
                  <p>
                    O <strong>Sponsorship Match</strong> conecta sua marca aos
                    atletas e times de maior destaque na plataforma.
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Defina o que você espera em troca (Contrapartidas).</li>
                    <li>Navegue pelos perfis de elite (Rankeados).</li>
                    <li>Envie propostas de conexão direta.</li>
                  </ul>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar atleta, time ou esporte..."
            className="pl-9 bg-secondary border-none rounded-xl h-11"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Section: Criteria */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Filter className="w-3.5 h-3.5" /> Contrapartidas Desejadas
              </h2>
            </div>
            <p className="text-xs text-muted-foreground -mt-2 mb-2">
              Selecione o que sua marca busca nestas parcerias.
            </p>
            <CriteriaSelector />
          </section>

          {/* Section: Recommendations */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5" /> Perfis em Alta
              </h2>
              <span className="text-[10px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                Top Ranking & Engajamento
              </span>
            </div>

            <div className="space-y-3">
              {eliteProfiles.length > 0 ? (
                eliteProfiles.map((profile) => (
                  <ProfileMatchCard key={profile.id} profile={profile} />
                ))
              ) : (
                <div className="text-center py-10 bg-secondary/20 rounded-xl border border-dashed border-border/50">
                  <p className="text-muted-foreground text-sm">
                    Nenhum perfil encontrado com estes filtros.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
