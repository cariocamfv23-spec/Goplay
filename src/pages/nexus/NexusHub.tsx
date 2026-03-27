import { useState, useMemo } from 'react'
import { Orbit } from 'lucide-react'
import { CreateTribeDialog } from '@/components/nexus/CreateTribeDialog'
import { useNexusStore } from '@/stores/useNexusStore'
import { mockUser } from '@/lib/data'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { TribeCard } from '@/components/nexus/TribeCard'
import { NexusRankingTab } from './tabs/NexusRankingTab'

const CATEGORIES = [
  'Todos',
  'Futebol',
  'Skate',
  'Bike',
  'Basquete',
  'Surf',
  'Tênis',
  'Corrida',
  'E-Sports',
]

export default function NexusHub() {
  const { tribes } = useNexusStore()
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [mainTab, setMainTab] = useState('explore')

  const exploreTribes = useMemo(() => {
    if (activeFilter === 'Todos') return tribes
    return tribes.filter((t) => t.category === activeFilter)
  }, [tribes, activeFilter])

  const myTribes = useMemo(() => {
    return tribes.filter((t) => t.members.includes(mockUser.id))
  }, [tribes])

  const renderEmptyState = (message: string) => (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-card/50 backdrop-blur-xl rounded-3xl border border-border/50 shadow-sm mt-8 animate-fade-in-up">
      <Orbit className="w-16 h-16 text-primary/30 mb-5 animate-float" />
      <h3 className="text-xl font-black text-foreground mb-2">
        Nenhuma tribo encontrada
      </h3>
      <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
        {message}
      </p>
      {mainTab === 'explore' && activeFilter !== 'Todos' && (
        <Button
          onClick={() => setActiveFilter('Todos')}
          variant="outline"
          className="mt-8 rounded-full h-11 px-6 font-bold"
        >
          Limpar Filtros
        </Button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background pb-24 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none" />

      <div className="relative z-10 p-4 pt-6 space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-2 text-foreground drop-shadow-sm">
              <Orbit className="w-8 h-8 text-primary" />
              Nexus
            </h1>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              Descubra, conecte-se e compita com sua tribo ideal.
            </p>
          </div>
          <CreateTribeDialog />
        </div>

        <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
          <TabsList className="w-full h-auto bg-secondary/50 rounded-2xl p-1.5 flex mb-6 shadow-inner">
            <TabsTrigger
              value="explore"
              className="flex-1 rounded-xl font-bold py-2.5 data-[state=active]:shadow-md"
            >
              Explorar
            </TabsTrigger>
            <TabsTrigger
              value="my-tribes"
              className="flex-1 rounded-xl font-bold py-2.5 data-[state=active]:shadow-md"
            >
              Minhas Tribos
            </TabsTrigger>
            <TabsTrigger
              value="ranking"
              className="flex-1 rounded-xl font-bold py-2.5 data-[state=active]:shadow-md data-[state=active]:text-yellow-600 dark:data-[state=active]:text-yellow-500"
            >
              Ranking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="space-y-6 m-0 outline-none">
            <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
              <div className="w-max flex bg-secondary/30 p-1 rounded-xl h-auto border border-border/50">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      activeFilter === cat
                        ? 'bg-background text-primary shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {exploreTribes.length === 0 ? (
              renderEmptyState(
                `Não encontramos nenhuma comunidade para a categoria "${activeFilter}". Seja o primeiro a criar um espaço para este esporte!`,
              )
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {exploreTribes.map((tribe) => (
                  <TribeCard key={tribe.id} tribe={tribe} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-tribes" className="m-0 outline-none">
            {myTribes.length === 0 ? (
              renderEmptyState(
                'Você ainda não faz parte de nenhuma tribo. Explore as opções e junte-se a uma comunidade!',
              )
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {myTribes.map((tribe) => (
                  <TribeCard key={tribe.id} tribe={tribe} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="ranking" className="m-0 outline-none">
            <NexusRankingTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
