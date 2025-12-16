import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  ArrowLeft,
  Search,
  Dumbbell,
  Trophy,
  Activity,
  Flame,
  PlayCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Exercise {
  id: string
  name: string
  category: 'fitness' | 'futebol' | 'basquete' | 'yoga'
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado'
  image: string
  description: string
  duration: string
  calories: number
}

const exercises: Exercise[] = [
  // Fitness
  {
    id: 'fit1',
    name: 'Agachamento Livre',
    category: 'fitness',
    difficulty: 'Iniciante',
    image: 'https://img.usecurling.com/p/400/300?q=squat%20exercise&color=blue',
    description:
      'Exercício fundamental para pernas e glúteos. Mantenha a postura ereta.',
    duration: '10 min',
    calories: 80,
  },
  {
    id: 'fit2',
    name: 'Flexão de Braço',
    category: 'fitness',
    difficulty: 'Intermediário',
    image: 'https://img.usecurling.com/p/400/300?q=pushup%20exercise&color=red',
    description:
      'Fortalece peitoral, ombros e tríceps. Mantenha o corpo alinhado.',
    duration: '5 min',
    calories: 45,
  },
  {
    id: 'fit3',
    name: 'Burpees',
    category: 'fitness',
    difficulty: 'Avançado',
    image:
      'https://img.usecurling.com/p/400/300?q=burpee%20exercise&color=orange',
    description: 'Exercício de corpo total de alta intensidade.',
    duration: '8 min',
    calories: 120,
  },
  // Futebol
  {
    id: 'soc1',
    name: 'Controle de Bola',
    category: 'futebol',
    difficulty: 'Iniciante',
    image:
      'https://img.usecurling.com/p/400/300?q=soccer%20dribbling&color=green',
    description: 'Melhore seu domínio e toque curto com a bola.',
    duration: '15 min',
    calories: 110,
  },
  {
    id: 'soc2',
    name: 'Chute de Precisão',
    category: 'futebol',
    difficulty: 'Intermediário',
    image: 'https://img.usecurling.com/p/400/300?q=soccer%20kick&color=green',
    description: 'Treino focado em acertar alvos específicos no gol.',
    duration: '20 min',
    calories: 140,
  },
  // Basquete
  {
    id: 'bas1',
    name: 'Arremesso Livre',
    category: 'basquete',
    difficulty: 'Iniciante',
    image:
      'https://img.usecurling.com/p/400/300?q=basketball%20shot&color=orange',
    description: 'Mecânica básica de arremesso para lances livres.',
    duration: '15 min',
    calories: 90,
  },
  {
    id: 'bas2',
    name: 'Drible Cruzado',
    category: 'basquete',
    difficulty: 'Avançado',
    image:
      'https://img.usecurling.com/p/400/300?q=basketball%20dribble&color=orange',
    description: 'Cross-over dribble para superar adversários.',
    duration: '12 min',
    calories: 130,
  },
  // Yoga
  {
    id: 'yog1',
    name: 'Saudação ao Sol',
    category: 'yoga',
    difficulty: 'Iniciante',
    image:
      'https://img.usecurling.com/p/400/300?q=yoga%20sun%20salutation&color=purple',
    description: 'Sequência clássica para aquecer e alongar o corpo.',
    duration: '10 min',
    calories: 50,
  },
  {
    id: 'yog2',
    name: 'Postura do Guerreiro',
    category: 'yoga',
    difficulty: 'Intermediário',
    image: 'https://img.usecurling.com/p/400/300?q=yoga%20warrior&color=purple',
    description: 'Fortalece pernas e melhora o equilíbrio.',
    duration: '8 min',
    calories: 40,
  },
]

export default function ExerciseLibrary() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('todos')

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === 'todos' || exercise.category === activeTab
    return matchesSearch && matchesTab
  })

  const categories = [
    { id: 'todos', label: 'Todos', icon: Activity },
    { id: 'fitness', label: 'Fitness', icon: Dumbbell },
    { id: 'futebol', label: 'Futebol', icon: Trophy },
    { id: 'basquete', label: 'Basquete', icon: Flame },
    { id: 'yoga', label: 'Yoga', icon: Activity }, // Reusing Activity icon for Yoga as placeholder
  ]

  const handleSelectExercise = (exercise: Exercise) => {
    navigate('/ai/motion-analysis', { state: { exercise } })
  }

  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50 p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full hover:bg-secondary"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Biblioteca de Exercícios</h1>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar exercício..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-secondary/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="flex-1 p-4">
        <Tabs
          defaultValue="todos"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full justify-start overflow-x-auto bg-transparent p-0 mb-4 h-auto gap-2 no-scrollbar">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="rounded-full border border-border/50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 h-auto shrink-0"
              >
                <cat.icon className="w-4 h-4 mr-2" />
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <ScrollArea className="h-[calc(100vh-200px)] pb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
                {filteredExercises.map((exercise) => (
                  <Card
                    key={exercise.id}
                    className="overflow-hidden border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all cursor-pointer group"
                    onClick={() => handleSelectExercise(exercise)}
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                      <img
                        src={exercise.image}
                        alt={exercise.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-end">
                        <Badge
                          variant="secondary"
                          className="font-semibold backdrop-blur-md bg-black/40 text-white border-none"
                        >
                          {exercise.difficulty}
                        </Badge>
                        <div className="flex flex-col items-end text-white text-xs font-medium">
                          <span className="flex items-center gap-1">
                            <Activity className="w-3 h-3 text-primary" />{' '}
                            {exercise.calories} kcal
                          </span>
                          <span className="opacity-80">
                            {exercise.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                        {exercise.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {exercise.description}
                      </p>
                      <Button className="w-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground font-semibold group-hover:shadow-md transition-all">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Iniciar Análise
                      </Button>
                    </CardContent>
                  </Card>
                ))}

                {filteredExercises.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <Dumbbell className="h-12 w-12 mb-3 opacity-20" />
                    <p>Nenhum exercício encontrado.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
