import { useState, useMemo } from 'react'
import {
  Search,
  Info,
  Activity,
  User,
  CheckCircle,
  Dumbbell,
  ShieldAlert,
  X,
  Play,
} from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
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
    intensity: 'Avançado',
    tip: 'Mantenha a coluna neutra e os joelhos alinhados com as pontas dos pés. Desça até que as coxas fiquem paralelas ao chão.',
    videoUrl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    poster:
      'https://img.usecurling.com/p/800/600?q=squat%20exercise&color=purple',
    steps: [
      'Posicione os pés na largura dos ombros',
      'Desça o quadril como se fosse sentar numa cadeira',
      'Mantenha o peito estufado e olhar à frente',
      'Retorne à posição inicial contraindo os glúteos',
    ],
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
    steps: [
      'Faça 10 burpees rapidamente',
      'Pule na caixa (box jump) 15 vezes',
      'Balance kettlebell (kettlebell swing) 20 vezes',
      'Descanse 1 minuto e repita o circuito',
    ],
  },
  {
    id: 3,
    title: 'Saudação ao Sol',
    trainer: 'Marta Lima',
    modality: 'Yoga',
    intensity: 'Iniciante',
    tip: 'Sincronize cada movimento com a respiração. Inspire ao expandir e expire ao flexionar.',
    videoUrl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster: 'https://img.usecurling.com/p/800/600?q=yoga%20pose&color=purple',
    steps: [
      'Comece na postura da montanha (Tadasana)',
      'Inspire e levante os braços (Urdhva Hastasana)',
      'Expire e dobre-se para a frente (Uttanasana)',
      'Inspire, alongue a coluna e olhe para frente',
    ],
  },
  {
    id: 4,
    title: 'Técnica de Passada',
    trainer: 'Beto Costa',
    modality: 'Corrida',
    intensity: 'Intermediário',
    tip: 'Aterrisse com o meio do pé para reduzir o impacto nas articulações. Mantenha os braços num ângulo de 90 graus.',
    videoUrl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster:
      'https://img.usecurling.com/p/800/600?q=running%20track&color=purple',
    steps: [
      'Aqueça com uma caminhada de 5 minutos',
      'Acelere aos poucos, mantendo o tronco levemente inclinado',
      'Mantenha a cadência em torno de 170-180 passos por minuto',
      'Relaxe os ombros e controle a respiração',
    ],
  },
  {
    id: 5,
    title: 'Mobilidade Articular',
    trainer: 'Lucas Souza',
    modality: 'Funcional',
    intensity: 'Iniciante',
    tip: 'Realize os movimentos de forma lenta e controlada para explorar o máximo de amplitude de cada articulação.',
    videoUrl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    poster: 'https://img.usecurling.com/p/800/600?q=stretching&color=purple',
    steps: [
      'Gire os ombros para trás e para frente 10 vezes',
      'Faça rotações de quadril amplas',
      'Estenda as pernas e alongue os isquiotibiais',
      'Mantenha cada alongamento por 30 segundos',
    ],
  },
  {
    id: 6,
    title: 'Levantamento Terra',
    trainer: 'Carlos Mendes',
    modality: 'Musculação',
    intensity: 'Avançado',
    tip: 'O movimento deve partir dos quadris. Contraia o abdômen e mantenha a barra próxima ao corpo durante toda a execução.',
    videoUrl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    poster: 'https://img.usecurling.com/p/800/600?q=deadlift&color=purple',
    steps: [
      'Fique próximo à barra com os pés na largura dos ombros',
      'Segure a barra e abaixe o quadril',
      'Puxe a barra mantendo as costas retas e o core ativado',
      'Estenda completamente os quadris e joelhos no topo',
    ],
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

export default function InfinityHub() {
  const [search, setSearch] = useState('')
  const [activeModality, setActiveModality] = useState('Todos')
  const [selectedWorkout, setSelectedWorkout] = useState<
    (typeof mockPosts)[0] | null
  >(null)

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
    <div className="min-h-[calc(100vh-8rem)] bg-background pb-24 animate-in fade-in duration-500">
      <div className="px-5 pt-6 pb-2 sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border/40">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-purple-600/10 text-purple-600">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Infinity Hub
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              Treinos exclusivos, vídeos e dicas passo a passo
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
          Modalidades
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
              termos ou modalidades.
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
                className="overflow-hidden border-border/50 shadow-sm bg-card hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => setSelectedWorkout(post)}
              >
                <div className="relative aspect-video w-full bg-black">
                  <img
                    src={post.poster}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 p-3 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 ml-1 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 flex gap-2 pointer-events-none">
                    <Badge className="bg-purple-600/90 text-white border-none shadow-sm text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      {post.modality}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-black/60 text-white border-none backdrop-blur-md shadow-sm text-[10px] font-semibold"
                    >
                      {post.intensity}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold leading-tight line-clamp-1 group-hover:text-purple-600 transition-colors">
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

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                    {post.tip}
                  </p>

                  <Button className="w-full mt-auto bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-11 font-semibold group-hover:shadow-md transition-shadow">
                    Assistir Treino
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog.Root
        open={!!selectedWorkout}
        onOpenChange={(open) => !open && setSelectedWorkout(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-[50%] w-[95%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-card border border-border/50 rounded-3xl p-0 overflow-hidden z-[100] shadow-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 flex flex-col max-h-[90vh]">
            {selectedWorkout && (
              <>
                <div className="relative aspect-video w-full bg-black group">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster={selectedWorkout.poster}
                    preload="metadata"
                    autoPlay
                  >
                    <source src={selectedWorkout.videoUrl} type="video/mp4" />
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                  <Dialog.Close asChild>
                    <button className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-sm text-white transition-colors z-20">
                      <X className="w-5 h-5" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="p-5 overflow-y-auto no-scrollbar">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-purple-600 text-white text-[10px] uppercase font-bold tracking-wider">
                      {selectedWorkout.modality}
                    </Badge>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {selectedWorkout.intensity}
                    </span>
                  </div>

                  <Dialog.Title className="text-2xl font-bold mb-4 tracking-tight">
                    {selectedWorkout.title}
                  </Dialog.Title>

                  <div className="flex items-center gap-2 mb-6 p-3 bg-secondary/50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center">
                      <User className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {selectedWorkout.trainer}
                      </p>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-500" />{' '}
                        Treinador Verificado
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-purple-600/5 border border-purple-600/10 rounded-2xl p-4">
                      <h4 className="flex items-center gap-2 font-bold text-purple-700 dark:text-purple-400 mb-2">
                        <Info className="w-4 h-4" /> Dica do Especialista
                      </h4>
                      <Dialog.Description className="text-sm text-foreground/80 leading-relaxed">
                        {selectedWorkout.tip}
                      </Dialog.Description>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-foreground mb-4">
                        <ShieldAlert className="w-4 h-4 text-purple-600" />{' '}
                        Passo a Passo
                      </h4>
                      <ol className="space-y-4 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-secondary">
                        {selectedWorkout.steps.map((step, idx) => (
                          <li
                            key={idx}
                            className="relative pl-8 flex items-start"
                          >
                            <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-background border-2 border-purple-600 flex items-center justify-center text-[10px] font-bold text-purple-600 z-10">
                              {idx + 1}
                            </div>
                            <span className="text-sm text-muted-foreground pt-0.5 leading-relaxed font-medium">
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border/50">
                    <Dialog.Close asChild>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-base h-12 rounded-xl">
                        Começar Treino
                      </Button>
                    </Dialog.Close>
                  </div>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
