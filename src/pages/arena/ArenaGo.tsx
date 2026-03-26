import { useState, useMemo } from 'react'
import {
  Flame,
  Search,
  Clock,
  ArrowRight,
  BookOpen,
  Newspaper,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { DepthContainer } from '@/components/DepthContainer'
import { Button } from '@/components/ui/button'

const mockNews = [
  {
    id: 1,
    title: 'Transferência Histórica: Astro do Futebol assina por valor recorde',
    excerpt:
      'O mercado da bola está em chamas após a confirmação da maior transferência da década. O acordo surpreendeu especialistas e fãs do esporte.',
    category: 'Mercado da Bola',
    sport: 'Futebol',
    image:
      'https://img.usecurling.com/p/800/600?q=soccer%20stadium&color=blue&dpr=2',
    time: '2h atrás',
    readTime: '3 min',
    featured: true,
  },
  {
    id: 2,
    title: 'Finais da NBA: O jogo que parou o mundo',
    excerpt:
      'Com uma cesta no último segundo, a equipe garante o campeonato em uma partida inesquecível e consagra nova lenda.',
    category: 'Match Recap',
    sport: 'Basquete',
    image:
      'https://img.usecurling.com/p/800/600?q=basketball%20dunk&color=orange&dpr=2',
    time: '4h atrás',
    readTime: '5 min',
    featured: false,
  },
  {
    id: 3,
    title: 'Nova Promessa do Tênis vence Grand Slam',
    excerpt:
      'Aos 19 anos, o jovem talento surpreende veteranos e leva o troféu para casa em uma exibição de técnica pura.',
    category: 'Exclusivo',
    sport: 'Tênis',
    image:
      'https://img.usecurling.com/p/800/600?q=tennis%20player&color=green&dpr=2',
    time: 'Ontem',
    readTime: '4 min',
    featured: false,
  },
  {
    id: 4,
    title: 'Escândalo no Surfe: Mudanças nas regras geram polêmica',
    excerpt:
      'A nova pontuação da liga mundial está causando divisões entre os atletas de elite, que ameaçam boicote na próxima etapa.',
    category: 'Polêmica',
    sport: 'Surfe',
    image:
      'https://img.usecurling.com/p/800/600?q=surfing%20wave&color=cyan&dpr=2',
    time: 'Ontem',
    readTime: '6 min',
    featured: false,
  },
  {
    id: 5,
    title: 'Renovação Contratual: Piloto campeão garante mais 3 anos',
    excerpt:
      'Após semanas de intensas negociações, o anúncio oficial veio nesta manhã para a alegria da torcida.',
    category: 'Mercado',
    sport: 'Motorsport',
    image: 'https://img.usecurling.com/p/800/600?q=race%20car&color=red&dpr=2',
    time: '2 dias atrás',
    readTime: '2 min',
    featured: false,
  },
  {
    id: 6,
    title: 'Ascensão do E-Sports: Torneio bate recorde de audiência',
    excerpt:
      'A grande final do mundial atraiu mais de 10 milhões de espectadores simultâneos, consolidando o cenário competitivo.',
    category: 'Trending',
    sport: 'E-Sports',
    image:
      'https://img.usecurling.com/p/800/600?q=esports%20gaming&color=purple&dpr=2',
    time: '2 dias atrás',
    readTime: '4 min',
    featured: false,
  },
]

export default function ArenaGo() {
  const [search, setSearch] = useState('')
  const [activeSport, setActiveSport] = useState('Todos')

  const categories = [
    'Todos',
    ...Array.from(new Set(mockNews.map((n) => n.sport))),
  ]

  const filteredNews = useMemo(() => {
    return mockNews.filter((news) => {
      const matchesSearch =
        news.title.toLowerCase().includes(search.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(search.toLowerCase())
      const matchesSport = activeSport === 'Todos' || news.sport === activeSport
      return matchesSearch && matchesSport
    })
  }, [search, activeSport])

  const featuredItem = filteredNews.find((n) => n.featured) || filteredNews[0]
  const regularItems = filteredNews.filter((n) => n.id !== featuredItem?.id)

  return (
    <div className="min-h-screen bg-background pb-24 animate-in fade-in duration-500">
      <div className="px-5 pt-6 pb-2 sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border/40">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">
              Arena Go
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              Tudo o que acontece no mundo dos esportes
            </p>
          </div>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar notícias, atletas ou esportes..."
            className="pl-9 bg-secondary/50 border-none rounded-xl h-11 focus-visible:ring-orange-500/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ScrollArea className="w-full whitespace-nowrap -mx-5 px-5">
          <div className="flex w-max space-x-2 pb-3">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={activeSport === cat ? 'default' : 'secondary'}
                className={`cursor-pointer px-4 py-1.5 rounded-full text-xs transition-all ${
                  activeSport === cat
                    ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md'
                    : 'hover:bg-secondary/80'
                }`}
                onClick={() => setActiveSport(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      <div className="px-5 pt-6 space-y-6">
        {filteredNews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-inner">
              <Newspaper className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-bold">Nenhuma notícia encontrada</h3>
            <p className="text-sm text-muted-foreground max-w-[250px] leading-relaxed">
              Não encontramos resultados para sua busca. Tente buscar por outros
              termos ou categorias.
            </p>
            <Button
              variant="outline"
              className="mt-2 rounded-xl"
              onClick={() => {
                setSearch('')
                setActiveSport('Todos')
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featuredItem && (
              <DepthContainer maxRotation={2}>
                <Card className="overflow-hidden border-none shadow-lg cursor-pointer group bg-card">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                    <img
                      src={featuredItem.image}
                      alt={featuredItem.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-red-500 hover:bg-red-600 border-none shadow-sm text-[10px] font-bold uppercase tracking-wider">
                        HOT
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md shadow-sm text-[10px]"
                      >
                        {featuredItem.sport}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h2 className="text-xl font-bold leading-tight mb-2 drop-shadow-md">
                        {featuredItem.title}
                      </h2>
                      <div className="flex items-center gap-3 text-[10px] font-medium opacity-90">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {featuredItem.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />{' '}
                          {featuredItem.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </DepthContainer>
            )}

            {/* List of other articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {regularItems.map((news) => (
                <DepthContainer key={news.id} maxRotation={2}>
                  <Card className="overflow-hidden border-border/50 shadow-sm cursor-pointer group hover:border-orange-500/30 hover:shadow-md transition-all flex flex-col h-full bg-card">
                    <div className="relative h-40 w-full overflow-hidden bg-muted">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 left-3">
                        <Badge
                          variant="secondary"
                          className="bg-background/80 hover:bg-background text-foreground border-none backdrop-blur-md shadow-sm text-[10px] font-medium"
                        >
                          {news.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">
                          {news.sport}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {news.time}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-base font-bold leading-snug mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                        {news.excerpt}
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/50">
                        <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                          Ler notícia completa
                        </span>
                        <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all group-hover:scale-110 shadow-sm">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DepthContainer>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
