import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Filter, Camera, Star } from 'lucide-react'
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

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 px-4 py-4">
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
            className="rounded-full px-4 shadow-sm"
            onClick={() => setSelectedCategory(null)}
          >
            Todos
          </Button>
          {photographerCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'secondary'}
              size="sm"
              className="rounded-full px-4 shadow-sm whitespace-nowrap"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          Fotógrafos Profissionais
        </h2>

        {filteredPhotographers.map((photographer) => (
          <Card
            key={photographer.id}
            className="overflow-hidden border-none shadow-md cursor-pointer hover:shadow-lg transition-all"
            onClick={() => navigate(`/profile/${photographer.id}`)}
          >
            <div className="h-24 bg-muted relative">
              <img
                src={photographer.cover}
                className="w-full h-full object-cover"
                alt="Cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <CardContent className="p-4 relative pt-0">
              <div className="flex justify-between items-start">
                <div className="-mt-10 mb-3">
                  <Avatar className="h-20 w-20 border-4 border-background shadow-md">
                    <AvatarImage src={photographer.avatar} />
                    <AvatarFallback>{photographer.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="mt-2 flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-full text-xs font-bold">
                  <Star className="h-3 w-3 fill-gold text-gold" />
                  {photographer.rating}
                </div>
              </div>

              <div className="mb-3">
                <h3 className="font-bold text-lg">{photographer.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {photographer.bio}
                </p>
                <div className="flex flex-wrap gap-2">
                  {photographer.categories?.map((cat) => (
                    <Badge
                      key={cat}
                      variant="outline"
                      className="text-[10px] border-primary/20 text-primary bg-primary/5"
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1 h-16 rounded-lg overflow-hidden">
                {photographer.portfolio?.slice(0, 3).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="w-full h-full object-cover"
                    alt="Portfolio"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPhotographers.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            <Camera className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>Nenhum fotógrafo encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
