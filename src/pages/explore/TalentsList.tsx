import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Search,
  Filter,
  Trophy,
  Star,
  Users,
  Loader2,
  MapPin,
} from "lucide-react"
import { mockTalents, ProfileData } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { TalentUnlockDrawer } from "@/components/TalentUnlockDrawer"
import { searchService } from "@/services/search"
import type { PublicProfileItem } from "@/services/profiles"
import { useNavigate } from "react-router-dom"

export default function TalentsList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [selectedTalent, setSelectedTalent] = useState<ProfileData | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [realProfiles, setRealProfiles] = useState<PublicProfileItem[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch real talent profiles from Supabase
  const loadTalents = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await searchService.searchProfiles({
        query: search,
        accountType: "all",
        pageSize: 20,
      })
      setRealProfiles(data)
    } catch {
      // Graceful fallback
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    const timer = setTimeout(() => {
      loadTalents()
    }, 300)
    return () => clearTimeout(timer)
  }, [loadTalents])

  // Adapt real profiles into displayable cards
  const realTalentCards: ProfileData[] = realProfiles.map((p) => {
    const name = p.full_name || "Usuário Goplay"
    const username = name.toLowerCase().replace(/\s+/g, "")
    return {
      id: p.id,
      name,
      username,
      avatar:
        p.avatar_url ||
        `https://img.usecurling.com/ppl/medium?seed=${p.id.slice(0, 4)}`,
      cover: "https://img.usecurling.com/p/800/300?q=sports%20stadium",
      sport:
        p.sport || (p.account_type === "club" ? "Clube Esportivo" : "Atleta"),
      position:
        p.position || (p.account_type === "coach" ? "Treinador" : "Goplay"),
      location: [p.city, p.state].filter(Boolean).join(", ") || "Brasil",
      bio: p.bio || "",
      type: p.account_type,
      rating: 4.9,
      stats: { matches: 0, mvp: 0 },
    }
  })

  // Combined list showing real profiles first, then fallback curated talents if search is empty
  const displayTalents =
    realTalentCards.length > 0
      ? realTalentCards
      : mockTalents.filter(
          (t) =>
            t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.sport?.toLowerCase().includes(search.toLowerCase()) ||
            t.position?.toLowerCase().includes(search.toLowerCase()),
        )

  const handleTalentClick = (talent: ProfileData) => {
    // If it's a real user or has a valid ID, navigate directly to public profile
    if (talent.id) {
      navigate(`/profile/${talent.id}`)
    } else {
      setSelectedTalent(talent)
      setIsDrawerOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" /> Scouts & Talentos
          </h1>
          <Button variant="ghost" size="icon">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, esporte ou posição..."
            className="pl-9 bg-secondary border-none rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Intro Banner */}
        <div className="bg-gradient-to-r from-indigo-900 to-primary rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-bold text-lg mb-1">
              Área do Recrutador & Talentos
            </h2>
            <p className="text-xs text-white/80 max-w-[80%]">
              Encontre atletas, clubes e treinadores cadastrados na plataforma.
              Clique para abrir o perfil público.
            </p>
          </div>
          <Trophy className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Atletas em Destaque</h2>
            {realTalentCards.length > 0 && (
              <Badge
                variant="outline"
                className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
              >
                Perfis ao Vivo
              </Badge>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : displayTalents.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground bg-secondary/30 rounded-xl border border-dashed border-border p-6">
              Nenhum talento encontrado para a busca "{search}".
            </div>
          ) : (
            <div className="space-y-3">
              {displayTalents.map((talent) => (
                <Card
                  key={talent.id}
                  className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.99]"
                  onClick={() => handleTalentClick(talent)}
                >
                  <CardContent className="p-0 flex">
                    {/* Left Side Image */}
                    <div className="w-28 relative">
                      <img
                        src={talent.avatar}
                        alt={talent.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-black/60 hover:bg-black/70 backdrop-blur-sm border-none text-[10px] h-5">
                          {talent.sport}
                        </Badge>
                      </div>
                    </div>

                    {/* Right Side Content */}
                    <div className="flex-1 p-3 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-sm leading-tight">
                            {talent.name}
                          </h3>
                          <div className="flex items-center gap-1 text-xs font-bold text-gold">
                            <Star className="h-3 w-3 fill-current" />
                            {talent.rating}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {talent.position}{" "}
                          {talent.age ? `• ${talent.age} anos` : ""}
                        </p>
                        <div className="flex gap-2 mt-2 text-[10px] text-muted-foreground">
                          {talent.height && (
                            <span className="bg-secondary px-1.5 py-0.5 rounded">
                              {talent.height}
                            </span>
                          )}
                          {talent.weight && (
                            <span className="bg-secondary px-1.5 py-0.5 rounded">
                              {talent.weight}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/50">
                        <div className="text-[10px]">
                          <span className="font-bold">
                            {talent.stats?.matches || 0}
                          </span>{" "}
                          Jogos
                        </div>
                        <Button
                          size="sm"
                          className="h-7 text-xs px-3 bg-indigo-600 hover:bg-indigo-700"
                        >
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <TalentUnlockDrawer
        athlete={selectedTalent}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  )
}
