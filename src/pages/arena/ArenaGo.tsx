import { useState, useMemo } from 'react'
import { Search, Tv, Info, Activity, User, CheckCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const mockPosts = [
  {
    id: 1,
    title: 'Agachamento Perfeito',
    trainer: 'Carlos Mendes',
    modality: 'Musculação',
    intensity: 'Média',
    tip: 'Mantenha a coluna neutra e os joelhos alinhados com as pontas dos pés. Desça até que as coxas fiquem paralelas ao chão.',
    videoUrl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    poster:
      'https://img.usecurling.com/p/800/600?q=squat%20exercise&color=purple',
  },
  {
    id: 2,
    title: 'Circuito Queima Gordura',
    trainer: 'Ana Silva',
    modality: 'CrossFit',
    intensity: 'Alta',
    tip: 'Faça os movimentos de forma contínua, focando na respiração. Não sacrifique a técnica pela velocidade.',
    videoUrl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    poster:
      'https://img.usecurling.com/p/800/600?q=crossfit%20workout&color=purple',
  },
  {
    id: 3,
    title: 'Saudação ao Sol',
    trainer: 'Marta Lima',
    modality: 'Yoga',
    intensity: 'Baixa',
    tip: 'Sincronize cada movimento com a respiração. Inspire ao expandir e expire ao flexionar.',
    videoUrl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster: 'https://img.usecurling.com/p/800/600?q=yoga%20pose&color=purple',
  },
  {
    id: 4,
    title: 'Técnica de Passada',
    trainer: 'Beto Costa',
    modality: 'Corrida',
    intensity: 'Média',
    tip: 'Aterrisse com o meio do pé para reduzir o impacto nas articulações. Mantenha os braços num ângulo de 90 graus.',
    videoUrl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster:
      'https://img.usecurling.com/p/800/600?q=running%20track&color=purple',
  },
  {
    id: 5,
    title: 'Mobilidade Articular',
    trainer: 'Lucas Souza',
    modality: 'Funcional',
    intensity: 'Baixa',
    tip: 'Realize os movimentos de forma lenta e controlada para explorar o máximo de amplitude de cada articulação.',
    videoUrl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    poster: 'https://img.usecurling.com/p/800/600?q=stretching&color=purple',
  },
  {
    id: 6,
    title: 'Levantamento Terra',
    trainer: 'Carlos Mendes',
    modality: 'Musculação',
    intensity: 'Alta',
    tip: 'O movimento deve partir dos quadris. Contraia o abdômen e mantenha a barra próxima ao corpo durante toda a execução.',
    videoUrl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    poster: 'https://img.usecurling.com/p/800/600?q=deadlift&color=purple',
  },
]

const categories = [
  'Todos',
  'Musculação',
  'CrossFit',
  'Yoga',
  'Corrida',
  'Funcional',
]

export default function ArenaGo() {
  const [search, setSearch] = useState('')
  const [activeModality, setActiveModality] = useState('Todos')

  const filteredPosts = useMemo(() => {
    return mockPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.tip.toLowerCase().includes(search.toLowerCase())
      const matchesModality =
        activeModality === 'Todos' || post.modality === activeModality
      return matchesSearch && matchesModality
    })
  }, [search, activeModality])

  return (
    <div className="min-h-screen bg-background pb-24 animate-in fade-in duration-500">
      <div className="px-5 pt-6 pb-2 sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border/40">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-purple-600/10 text-purple-600">
            <Tv className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              GoArena
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              Treinos, dicas e vídeos em um só lugar
            </p>
          </div>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por treinos, dicas..."
            className="pl-9 bg-secondary/50 border-none rounded-xl h-11 focus-visible:ring-purple-600/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mb-1 text-sm font-semibold text-foreground/90">
          Filtros
        </div>
        <ScrollArea className="w-full whitespace-nowrap -mx-5 px-5">
          <div className="flex w-max space-x-2 pb-3 pt-2">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={activeModality === cat ? 'default' : 'secondary'}
                className={cn(
                  'cursor-pointer px-4 py-1.5 rounded-full text-xs transition-all',
                  activeModality === cat
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md'
                    : 'hover:bg-secondary/80 text-muted-foreground',
                )}
                onClick={() => setActiveModality(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      <div className="px-5 pt-6 space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-inner">
              <Activity className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-bold">Nenhum treino encontrado</h3>
            <p className="text-sm text-muted-foreground max-w-[250px] leading-relaxed">
              Não encontramos resultados para sua busca. Tente buscar por outros
              termos ou categorias.
            </p>
            <Button
              variant="outline"
              className="mt-2 rounded-xl text-purple-600 border-purple-600/30 hover:bg-purple-600/10"
              onClick={() => {
                setSearch('')
                setActiveModality('Todos')
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden border-border/50 shadow-sm bg-card hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video w-full bg-black group">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster={post.poster}
                    preload="none"
                  >
                    <source src={post.videoUrl} type="video/mp4" />
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                  <div className="absolute top-3 left-3 flex gap-2 pointer-events-none">
                    <Badge className="bg-purple-600/90 hover:bg-purple-600 text-white border-none shadow-sm text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      {post.modality}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-black/60 text-white border-none backdrop-blur-md shadow-sm text-[10px]"
                    >
                      Intensidade: {post.intensity}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold leading-tight line-clamp-1">
                      {post.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <User className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{post.trainer}</p>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-500" />{' '}
                        Treinador Verificado
                      </p>
                    </div>
                  </div>

                  <div className="bg-purple-600/5 rounded-xl p-4 border border-purple-600/10 mb-4 flex-1">
                    <h4 className="flex items-center gap-1.5 text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider mb-2">
                      <Info className="w-3.5 h-3.5" />
                      Dica do Expert
                    </h4>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {post.tip}
                    </p>
                  </div>

                  <Button className="w-full mt-auto bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-11 font-semibold">
                    Ver mais
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
