import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Filter, Camera, Star, ChevronRight } from 'lucide-react'
import { mockProfiles, photographerCategories, ProfileData } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function PhotographersList() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const photographers = mockProfiles.filter(
    (p) => p.type === 'photographer',
  ) as ProfileData[]

  const filteredPhotographers = photographers.filter((p) => {
    const matchesCategory = selectedCategory
      ? p.categories?.includes(selectedCategory)
      : true
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Helper to find the lowest price
  const getStartingPrice = (profile: ProfileData) => {
    if (!profile.packages || profile.packages.length === 0) return null
    // Simple heuristic: take the first one or try to parse if needed.
    // For now, let's just assume the first package is the "starting" one or use the lowest value string found.
    return profile.packages[0].price
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 px-4 py-4 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar fotógrafos..."
              className="pl-9 bg-secondary border-none rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 rounded-xl">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Button
            variant={selectedCategory === null ? 'default' : 'secondary'}
            size="sm"
            className="rounded-full px-4 shadow-sm h-8"
            onClick={() => setSelectedCategory(null)}
          >
            Todos
          </Button>
          {photographerCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'secondary'}
              size="sm"
              className="rounded-full px-4 shadow-sm whitespace-nowrap h-8"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Fotógrafos Profissionais
          </h2>
          <span className="text-xs text-muted-foreground">
            {filteredPhotographers.length} encontrados
          </span>
        </div>

        {filteredPhotographers.map((photographer) => {
          const startPrice = getStartingPrice(photographer)

          return (
            <Card
              key={photographer.id}
              className="overflow-hidden border-none shadow-md cursor-pointer hover:shadow-lg transition-all group"
              onClick={() => navigate(`/profile/${photographer.id}`)}
            >
              <div className="h-28 bg-muted relative">
                <img
                  src={photographer.cover}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-2 right-2 flex gap-1">
                  {photographer.categories?.slice(0, 2).map((cat) => (
                    <Badge
                      key={cat}
                      className="bg-black/50 text-white backdrop-blur-md border-0"
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>

              <CardContent className="p-4 relative pt-0">
                <div className="flex justify-between items-end -mt-8 mb-3 px-1">
                  <div className="relative">
                    <Avatar className="h-16 w-16 border-4 border-background shadow-md">
                      <AvatarImage src={photographer.avatar} />
                      <AvatarFallback>{photographer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1 shadow-sm">
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 text-[10px] h-5 px-1.5 bg-secondary text-foreground whitespace-nowrap shadow-none"
                      >
                        <Star className="h-3 w-3 fill-gold text-gold" />
                        {photographer.rating}
                      </Badge>
                    </div>
                  </div>
                  {startPrice && (
                    <div className="text-right mb-1">
                      <p className="text-[10px] text-white/90 font-medium drop-shadow-md">
                        A partir de
                      </p>
                      <p className="text-lg font-bold text-white drop-shadow-md leading-none">
                        {startPrice}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                    {photographer.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {photographer.bio}
                  </p>
                </div>

                {photographer.portfolio &&
                  photographer.portfolio.length > 0 && (
                    <div className="grid grid-cols-3 gap-1.5 h-20 rounded-lg overflow-hidden">
                      {photographer.portfolio.slice(0, 3).map((img, i) => (
                        <div key={i} className="relative w-full h-full">
                          <img
                            src={img}
                            className="w-full h-full object-cover"
                            alt="Portfolio"
                          />
                          {i === 2 &&
                            photographer.portfolio &&
                            photographer.portfolio.length > 3 && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  +{photographer.portfolio.length - 3}
                                </span>
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}

                <Button
                  variant="ghost"
                  className="w-full mt-3 h-8 text-xs text-muted-foreground hover:text-primary"
                >
                  Ver Perfil Completo <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          )
        })}

        {filteredPhotographers.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            <div className="bg-secondary/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="h-10 w-10 opacity-20" />
            </div>
            <h3 className="font-bold text-lg mb-1">Nenhum fotógrafo</h3>
            <p className="text-sm max-w-[200px] mx-auto">
              Tente mudar os filtros ou busque por outro termo.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearch('')
                setSelectedCategory(null)
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
