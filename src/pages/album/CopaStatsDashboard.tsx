import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ChevronDown,
  Activity,
  Star,
  Users,
  TrendingUp,
  Target,
  Calendar,
  Trophy,
  Map,
  PlayCircle,
  Medal,
  Flame,
  Crosshair,
  Info,
  Gift,
  CheckCircle,
  Ticket,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Cell,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'

type PlayerStat = {
  id: string
  name: string
  image: string
  stats: {
    'Velocidade Máxima': string
    'Precisão de Passe': string
    Gols: number
    Assistências: number
  }
  impactAnalysis: string
}

type TeamStat = {
  id: string
  name: string
  probability: number
  strength: number
  athleteLevel: number
  stats: {
    Tático: number
    Físico: number
    Mental: number
    Técnico: number
    Velocidade: number
  }
  keyPlayers: PlayerStat[]
  description: string
  color: string
}

const SUMMARY_SCHEDULE = [
  {
    id: 'm1',
    date: '11 Jun 2026',
    time: '15:00',
    team1: {
      name: 'México',
      flag: 'https://img.usecurling.com/p/100/100?q=mexico%20flag',
    },
    team2: {
      name: 'Catar',
      flag: 'https://img.usecurling.com/p/100/100?q=qatar%20flag',
    },
    stadium: 'Estádio Azteca',
  },
  {
    id: 'm2',
    date: '12 Jun 2026',
    time: '16:00',
    team1: {
      name: 'EUA',
      flag: 'https://img.usecurling.com/p/100/100?q=usa%20flag',
    },
    team2: {
      name: 'País de Gales',
      flag: 'https://img.usecurling.com/p/100/100?q=wales%20flag',
    },
    stadium: 'SoFi Stadium',
  },
  {
    id: 'm3',
    date: '15 Jun 2026',
    time: '13:00',
    team1: {
      name: 'Brasil',
      flag: 'https://img.usecurling.com/p/100/100?q=brazil%20flag',
    },
    team2: {
      name: 'Sérvia',
      flag: 'https://img.usecurling.com/p/100/100?q=serbia%20flag',
    },
    stadium: 'MetLife Stadium',
  },
]

const COMPLETED_MATCHES = [
  {
    id: 'c1',
    date: '10 Jun 2026',
    stage: 'Abertura',
    team1: {
      name: 'México',
      flag: 'https://img.usecurling.com/p/100/100?q=mexico%20flag',
      score: 3,
    },
    team2: {
      name: 'Catar',
      flag: 'https://img.usecurling.com/p/100/100?q=qatar%20flag',
      score: 1,
    },
    motm: {
      name: 'S. Giménez',
      image:
        'https://img.usecurling.com/p/100/100?q=santiago%20gimenez%20realistic%20portrait%20face',
    },
  },
  {
    id: 'c2',
    date: '11 Jun 2026',
    stage: 'Fase de Grupos',
    team1: {
      name: 'EUA',
      flag: 'https://img.usecurling.com/p/100/100?q=usa%20flag',
      score: 2,
    },
    team2: {
      name: 'P. de Gales',
      flag: 'https://img.usecurling.com/p/100/100?q=wales%20flag',
      score: 2,
    },
    motm: {
      name: 'C. Pulisic',
      image:
        'https://img.usecurling.com/p/100/100?q=christian%20pulisic%20realistic%20portrait%20face',
    },
  },
  {
    id: 'c3',
    date: '12 Jun 2026',
    stage: 'Fase de Grupos',
    team1: {
      name: 'Brasil',
      flag: 'https://img.usecurling.com/p/100/100?q=brazil%20flag',
      score: 2,
    },
    team2: {
      name: 'Sérvia',
      flag: 'https://img.usecurling.com/p/100/100?q=serbia%20flag',
      score: 0,
    },
    motm: {
      name: 'Neymar Jr.',
      image:
        'https://img.usecurling.com/p/256/256?q=neymar%20jr%20realistic%20portrait%20face&dpr=2',
    },
  },
]

const BOLAO_MATCHES = [
  {
    id: 'b1',
    date: '15 Jun 2026',
    time: '16:00',
    team1: {
      name: 'Brasil',
      flag: 'https://img.usecurling.com/p/100/100?q=brazil%20flag',
    },
    team2: {
      name: 'França',
      flag: 'https://img.usecurling.com/p/100/100?q=france%20flag',
    },
    stadium: 'Maracanã',
    mockResult: { t1: 2, t2: 0, scorer: 'Neymar Jr.' },
  },
  {
    id: 'b2',
    date: '16 Jun 2026',
    time: '20:00',
    team1: {
      name: 'Argentina',
      flag: 'https://img.usecurling.com/p/100/100?q=argentina%20flag',
    },
    team2: {
      name: 'Inglaterra',
      flag: 'https://img.usecurling.com/p/100/100?q=england%20flag',
    },
    stadium: 'Wembley',
    mockResult: { t1: 1, t2: 2, scorer: 'Harry Kane' },
  },
]

const RANKINGS = {
  scorers: [
    { id: '1', name: 'Neymar Jr.', team: 'Brasil', value: 6, subtitle: 'Gols' },
    {
      id: '2',
      name: 'Kylian Mbappé',
      team: 'França',
      value: 5,
      subtitle: 'Gols',
    },
    {
      id: '3',
      name: 'Harry Kane',
      team: 'Inglaterra',
      value: 4,
      subtitle: 'Gols',
    },
    {
      id: '4',
      name: 'Lamine Yamal',
      team: 'Espanha',
      value: 3,
      subtitle: 'Gols',
    },
    {
      id: '5',
      name: 'Jude Bellingham',
      team: 'Inglaterra',
      value: 3,
      subtitle: 'Gols',
    },
  ],
  tactical: [
    { id: '4', name: 'Rodri', team: 'Espanha', value: 9.8, subtitle: 'Rating' },
    {
      id: '5',
      name: 'Jude Bellingham',
      team: 'Inglaterra',
      value: 9.6,
      subtitle: 'Rating',
    },
    {
      id: '6',
      name: 'Jamal Musiala',
      team: 'Alemanha',
      value: 9.4,
      subtitle: 'Rating',
    },
    {
      id: '7',
      name: 'Lionel Messi',
      team: 'Argentina',
      value: 9.2,
      subtitle: 'Rating',
    },
    {
      id: '8',
      name: 'Bruno Fernandes',
      team: 'Portugal',
      value: 9.1,
      subtitle: 'Rating',
    },
  ],
  goals: [
    {
      id: '7',
      name: 'Vini Jr.',
      team: 'Brasil',
      desc: 'Voleio de fora da área vs Sérvia',
      value: '1º',
      subtitle: 'Lugar',
    },
    {
      id: '8',
      name: 'Lamine Yamal',
      team: 'Espanha',
      desc: 'Chute colocado no ângulo vs Itália',
      value: '2º',
      subtitle: 'Lugar',
    },
    {
      id: '9',
      name: 'Lionel Messi',
      team: 'Argentina',
      desc: 'Falta na gaveta vs Uruguai',
      value: '3º',
      subtitle: 'Lugar',
    },
    {
      id: '10',
      name: 'Kylian Mbappé',
      team: 'França',
      desc: 'Arrancada do meio campo vs Holanda',
      value: '4º',
      subtitle: 'Lugar',
    },
  ],
}

const TEAMS: TeamStat[] = [
  {
    id: 'br',
    name: 'Brasil',
    probability: 18.5,
    strength: 94,
    athleteLevel: 96,
    stats: { Tático: 88, Físico: 90, Mental: 85, Técnico: 98, Velocidade: 92 },
    keyPlayers: [
      {
        id: 'neymar',
        name: 'Neymar Jr.',
        image:
          'https://img.usecurling.com/p/256/256?q=neymar%20jr%20realistic%20portrait%20face&dpr=2',
        stats: {
          'Velocidade Máxima': '31.2 km/h',
          'Precisão de Passe': '89%',
          Gols: 79,
          Assistências: 59,
        },
        impactAnalysis:
          'Recém-convocado, Neymar traz sua genialidade, drible desconcertante e capacidade de decisão incomparável. É a referência técnica e o maestro que dita o ritmo do ataque brasileiro na busca pelo cobiçado hexacampeonato.',
      },
      {
        id: 'vini',
        name: 'Vini Jr.',
        image:
          'https://img.usecurling.com/p/256/256?q=vinicius%20junior%20realistic%20portrait%20face&dpr=2',
        stats: {
          'Velocidade Máxima': '36.5 km/h',
          'Precisão de Passe': '82%',
          Gols: 24,
          Assistências: 18,
        },
        impactAnalysis:
          'Sua velocidade explosiva e drible desequilibrante pelas pontas quebram as defesas adversárias, criando os espaços necessários para o ataque brasileiro prosperar rumo ao título mundial.',
      },
      {
        id: 'rodrygo',
        name: 'Rodrygo',
        image:
          'https://img.usecurling.com/p/256/256?q=rodrygo%20goes%20realistic%20portrait%20face&dpr=2',
        stats: {
          'Velocidade Máxima': '33.8 km/h',
          'Precisão de Passe': '87%',
          Gols: 15,
          Assistências: 12,
        },
        impactAnalysis:
          'Extremamente inteligente taticamente, atua em diversas posições do ataque, oferecendo fluidez e precisão no terço final do campo. Seu faro de gol em momentos decisivos é um trunfo indispensável.',
      },
    ],
    description:
      'A quintessência do talento futebolístico. Alta habilidade técnica e enorme poder ofensivo.',
    color: '#009c3b',
  },
  {
    id: 'fr',
    name: 'França',
    probability: 17.2,
    strength: 95,
    athleteLevel: 94,
    stats: { Tático: 90, Físico: 95, Mental: 88, Técnico: 92, Velocidade: 94 },
    keyPlayers: [
      {
        id: 'mbappe',
        name: 'Mbappé',
        image:
          'https://img.usecurling.com/p/256/256?q=kylian%20mbappe%20realistic%20portrait%20face&dpr=2',
        stats: {
          'Velocidade Máxima': '38.0 km/h',
          'Precisão de Passe': '83%',
          Gols: 46,
          Assistências: 31,
        },
        impactAnalysis:
          'Sua velocidade alucinante em transições e capacidade de finalização letal o tornam praticamente imparável. É o ponto focal do ataque francês e a principal arma para a conquista de mais um título.',
      },
      {
        id: 'griezmann',
        name: 'Griezmann',
        image:
          'https://img.usecurling.com/p/256/256?q=antoine%20griezmann%20realistic%20portrait%20face&dpr=2',
        stats: {
          'Velocidade Máxima': '31.5 km/h',
          'Precisão de Passe': '91%',
          Gols: 44,
          Assistências: 38,
        },
        impactAnalysis:
          'O cérebro tático do time. Dita o ritmo de jogo, conecta magistralmente o meio ao ataque e é incansável na recomposição defensiva. Sua visão de jogo refinada cria inúmeras chances de gol.',
      },
      {
        id: 'camavinga',
        name: 'Camavinga',
        image:
          'https://img.usecurling.com/p/256/256?q=eduardo%20camavinga%20realistic%20portrait%20face&dpr=2',
        stats: {
          'Velocidade Máxima': '34.2 km/h',
          'Precisão de Passe': '89%',
          Gols: 2,
          Assistências: 6,
        },
        impactAnalysis:
          'Traz enorme dinamismo e versatilidade ao meio-campo francês. Capaz de quebrar linhas defensivas com passes verticais e recuperar posses de bola cruciais. Vital para a estabilidade da equipe.',
      },
    ],
    description:
      'Uma potência de atleticismo e disciplina tática, com atacantes explosivos.',
    color: '#002395',
  },
  {
    id: 'ar',
    name: 'Argentina',
    probability: 15.8,
    strength: 92,
    athleteLevel: 91,
    stats: { Tático: 92, Físico: 85, Mental: 95, Técnico: 90, Velocidade: 84 },
    keyPlayers: [
      {
        id: 'messi',
        name: 'Messi',
        image:
          'https://img.usecurling.com/p/256/256?q=lionel%20messi%20realistic%20portrait%20face&dpr=2',
        stats: {
          'Velocidade Máxima': '30.1 km/h',
          'Precisão de Passe': '92%',
          Gols: 109,
          Assistências: 57,
        },
        impactAnalysis:
          'Líder e principal criador de jogadas da seleção. Sua visão de jogo ímpar e passes cirúrgicos encontram espaços onde não existem, sendo a bússola moral e técnica da equipe rumo a mais um título.',
      },
      {
        id: 'alvarez',
        name: 'Julian Alvarez',
        image:
          'https://img.usecurling.com/p/256/256?q=julian%20alvarez%20realistic%20portrait%20face&dpr=2',
        stats: {
          'Velocidade Máxima': '34.8 km/h',
          'Precisão de Passe': '82%',
          Gols: 14,
          Assistências: 7,
        },
        impactAnalysis:
          'Intensa pressão pós-perda e movimentação extremamente inteligente criam oportunidades constantes e incomodam as defesas rivais. Vital para a dinâmica e sufoco ofensivo no terço final.',
      },
      {
        id: 'macallister',
        name: 'Mac Allister',
        image:
          'https://img.usecurling.com/p/256/256?q=alexis%20mac%20allister%20realistic%20portrait%20face&dpr=2',
        stats: {
          'Velocidade Máxima': '32.4 km/h',
          'Precisão de Passe': '88%',
          Gols: 8,
          Assistências: 11,
        },
        impactAnalysis:
          'Motor incansável do meio-campo argentino, dita o tempo de jogo e aparece frequentemente como elemento surpresa na área para finalizar. Garante transição rápida, sólida e muito eficiente.',
      },
    ],
    description:
      'Atuais campeões do mundo com uma coesão de equipe inigualável e resiliência mental.',
    color: '#74acdf',
  },
  {
    id: 'en',
    name: 'Inglaterra',
    probability: 14.0,
    strength: 90,
    athleteLevel: 92,
    stats: { Tático: 87, Físico: 88, Mental: 82, Técnico: 89, Velocidade: 90 },
    keyPlayers: [
      {
        id: 'bellingham',
        name: 'Jude Bellingham',
        image:
          'https://img.usecurling.com/p/256/256?q=jude%20bellingham%20realistic%20portrait%20face&dpr=2',
        stats: {
          'Velocidade Máxima': '33.9 km/h',
          'Precisão de Passe': '89%',
          Gols: 22,
          Assistências: 14,
        },
        impactAnalysis:
          'Um meio-campista absurdamente completo que avança com força física rara, criando jogadas e finalizando com precisão. É o pilar da nova geração inglesa para tentar romper o longo jejum.',
      },
      {
        id: 'kane',
        name: 'Harry Kane',
        image:
          'https://img.usecurling.com/p/256/256?q=harry%20kane%20realistic%20portrait%20face&dpr=2',
        stats: {
          'Velocidade Máxima': '31.2 km/h',
          'Precisão de Passe': '84%',
          Gols: 68,
          Assistências: 21,
        },
        impactAnalysis:
          'Atacante letal e capitão experiente que também atua como exímio armador recuado. Sua capacidade de reter a bola de costas, atrair a marcação e distribuir o jogo é fundamental para o sucesso.',
      },
      {
        id: 'saka',
        name: 'Bukayo Saka',
        image:
          'https://img.usecurling.com/p/256/256?q=bukayo%20saka%20realistic%20portrait%20face&dpr=2',
        stats: {
          'Velocidade Máxima': '35.4 km/h',
          'Precisão de Passe': '86%',
          Gols: 18,
          Assistências: 15,
        },
        impactAnalysis:
          'Pura alegria e criatividade imprevisível na ponta direita. Seus dribles curtos venenosos, cortes rápidos para o meio e capacidade de finalização desmontam totalmente as defesas rivais fechadas.',
      },
    ],
    description:
      'Uma geração de ouro formidável que mistura energia jovem com liderança experiente.',
    color: '#ce1124',
  },
  {
    id: 'es',
    name: 'Espanha',
    probability: 12.5,
    strength: 89,
    athleteLevel: 90,
    stats: { Tático: 95, Físico: 82, Mental: 85, Técnico: 94, Velocidade: 86 },
    keyPlayers: [
      {
        id: 'pedri',
        name: 'Pedri',
        image:
          'https://img.usecurling.com/p/256/256?q=pedri%20gonzalez%20realistic%20portrait%20face&dpr=2',
        stats: {
          'Velocidade Máxima': '31.8 km/h',
          'Precisão de Passe': '93%',
          Gols: 10,
          Assistências: 19,
        },
        impactAnalysis:
          'Controle absoluto e sublime no meio-campo. Sua posse de bola colada aos pés, giros extremamente rápidos e passes verticais incisivos geram estabilidade, ditando perfeitamente o ritmo espanhol.',
      },
      {
        id: 'yamal',
        name: 'Lamine Yamal',
        image:
          'https://img.usecurling.com/p/256/256?q=lamine%20yamal%20realistic%20portrait%20face&dpr=2',
        stats: {
          'Velocidade Máxima': '34.7 km/h',
          'Precisão de Passe': '84%',
          Gols: 11,
          Assistências: 14,
        },
        impactAnalysis:
          'Jovem prodígio mágico com extrema e abusada habilidade no 1 contra 1. Quebra com naturalidade sistemas defensivos muito retrancados, oferecendo uma arma aguda e super veloz na ponta.',
      },
      {
        id: 'rodri',
        name: 'Rodri',
        image:
          'https://img.usecurling.com/p/256/256?q=rodri%20hernandez%20realistic%20portrait%20face&dpr=2',
        stats: {
          'Velocidade Máxima': '30.5 km/h',
          'Precisão de Passe': '94%',
          Gols: 12,
          Assistências: 8,
        },
        impactAnalysis:
          'O grande pivô tático da equipe e mestre de sua posição. Garante segurança defensiva primorosa e é a primeira peça indispensável na construção paciente de envolventes jogadas ofensivas.',
      },
    ],
    description:
      'Mestres absolutos da posse de bola e do refinado jogo posicional, dominando adversários.',
    color: '#aa151b',
  },
  {
    id: 'de',
    name: 'Alemanha',
    probability: 10.0,
    strength: 88,
    athleteLevel: 89,
    stats: { Tático: 89, Físico: 87, Mental: 90, Técnico: 88, Velocidade: 85 },
    keyPlayers: [
      {
        id: 'musiala',
        name: 'Jamal Musiala',
        image:
          'https://img.usecurling.com/p/256/256?q=jamal%20musiala%20realistic%20portrait%20face&dpr=2',
        stats: {
          'Velocidade Máxima': '34.2 km/h',
          'Precisão de Passe': '87%',
          Gols: 16,
          Assistências: 14,
        },
        impactAnalysis:
          'Drible em espaços minúsculos excepcional e pura imprevisibilidade. Ele arrasta marcações duplas e cria oportunidades cristalinas onde a olho nu parece não haver qualquer espaço disponível.',
      },
      {
        id: 'wirtz',
        name: 'Florian Wirtz',
        image:
          'https://img.usecurling.com/p/256/256?q=florian%20wirtz%20realistic%20portrait%20face&dpr=2',
        stats: {
          'Velocidade Máxima': '33.5 km/h',
          'Precisão de Passe': '89%',
          Gols: 14,
          Assistências: 18,
        },
        impactAnalysis:
          'Visão de jogo periférica impressionante e rápida agilidade mental. Seus passes venenosos rompem linhas defensivas sólidas e aceleram drasticamente a mortal transição ofensiva germânica.',
      },
      {
        id: 'kimmich',
        name: 'Joshua Kimmich',
        image:
          'https://img.usecurling.com/p/256/256?q=joshua%20kimmich%20realistic%20portrait%20face&dpr=2',
        stats: {
          'Velocidade Máxima': '31.1 km/h',
          'Precisão de Passe': '91%',
          Gols: 10,
          Assistências: 42,
        },
        impactAnalysis:
          'Versatilidade de classe mundial, liderança técnica e garra inabaláveis. Atuando na lateral ou organizando pelo meio, é essencial na criação de jogadas com seus cruzamentos milimétricos.',
      },
    ],
    description:
      'Taticamente versátil e extremamente eficiente, passando por um poderoso renascimento.',
    color: '#ffce00',
  },
]

const goldPlayerIds = [
  { id: 'neymar', rating: 9.9 },
  { id: 'mbappe', rating: 9.7 },
  { id: 'messi', rating: 9.5 },
  { id: 'bellingham', rating: 9.3 },
  { id: 'kane', rating: 9.0 },
  { id: 'vini', rating: 8.8 },
  { id: 'yamal', rating: 8.6 },
  { id: 'musiala', rating: 8.5 },
]

const getPlayerFromTeams = (playerId: string) => {
  for (const team of TEAMS) {
    const p = team.keyPlayers.find((p) => p.id === playerId)
    if (p) return { player: p, team }
  }
  return null
}

const getGoldPos = (index: number, total: number, rating: number) => {
  const maxDistance = 42
  const minDistance = 16
  const maxRating = 9.9
  const minRating = 8.5

  let distance = 0
  if (rating >= maxRating) distance = minDistance
  else if (rating <= minRating) distance = maxDistance
  else {
    const ratio = (maxRating - rating) / (maxRating - minRating)
    distance = minDistance + ratio * (maxDistance - minDistance)
  }

  const angle = (index * (360 / total) - 90) * (Math.PI / 180)

  return {
    left: 50 + distance * Math.cos(angle),
    top: 50 + distance * Math.sin(angle),
  }
}

function PlayerStatsDialog({
  player,
  team,
  children,
}: {
  player: PlayerStat
  team: Pick<TeamStat, 'name' | 'color'>
  children: React.ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-secondary/95 border-border/50 backdrop-blur-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <div
              className="w-24 h-24 rounded-full overflow-hidden border-[3px] shadow-lg shrink-0"
              style={{ borderColor: team.color }}
            >
              <img
                src={player.image}
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <span className="text-2xl font-black tracking-tight text-foreground">
                {player.name}
              </span>
              <Badge
                variant="outline"
                className="text-[11px] uppercase font-bold tracking-widest px-2 py-0.5 border-border/50 bg-background/40"
                style={{ color: team.color }}
              >
                {team.name}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              Estatísticas Técnicas
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(player.stats).map(([statName, value]) => (
                <div
                  key={statName}
                  className="bg-background/40 backdrop-blur-sm p-4 rounded-xl border border-border/20 flex flex-col items-center justify-center gap-1.5 shadow-sm hover:border-border/40 transition-colors"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-center">
                    {statName}
                  </span>
                  <span
                    className="text-2xl font-black tabular-nums tracking-tighter"
                    style={{ color: team.color }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/20">
            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <Map className="w-3.5 h-3.5" /> Análise Tática e Lances
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl overflow-hidden border border-border/20 relative aspect-[4/3] group cursor-pointer">
                <img
                  src={`https://img.usecurling.com/p/300/200?q=heat%20map%20soccer&color=red&seed=${player.name.length}`}
                  alt="Heatmap"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                    Heatmap Tático
                  </span>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-border/20 relative aspect-[4/3] group cursor-pointer">
                <img
                  src={`https://img.usecurling.com/p/300/200?q=soccer%20stadium%20night&seed=${player.name.length}`}
                  alt="Highlight"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <PlayCircle className="w-8 h-8 text-white/90 drop-shadow-lg group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                    Ver Destaques
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-background/40 backdrop-blur-sm border border-[hsl(var(--gold)/0.3)] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-20 blur-2xl pointer-events-none rounded-full bg-[hsl(var(--gold))]" />
            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5 relative z-10">
              <Trophy className="w-3.5 h-3.5 text-[hsl(var(--gold))]" />
              Impacto para o Título (Gold Profile)
            </h4>
            <p className="text-sm leading-relaxed text-foreground/90 font-medium relative z-10">
              {player.impactAnalysis}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function TeamCard({ team, rank }: { team: TeamStat; rank: number }) {
  const [isOpen, setIsOpen] = useState(false)

  const radarData = Object.entries(team.stats).map(([subject, value]) => ({
    subject,
    value,
  }))

  const chartConfig = {
    value: { label: 'Pontuação', color: team.color },
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card
        className={cn(
          'border-border/30 bg-secondary/10 backdrop-blur-md overflow-hidden relative group transition-all duration-300',
          isOpen
            ? 'border-border/60 shadow-lg shadow-black/20'
            : 'hover:border-border/50',
        )}
      >
        <div
          className="absolute inset-0 opacity-[0.03] transition-opacity duration-500 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, transparent, ${team.color})`,
          }}
        />

        <CollapsibleTrigger asChild>
          <div className="p-4 flex items-center justify-between cursor-pointer select-none">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-black text-muted-foreground/30 w-6 text-center tabular-nums">
                {rank}
              </span>
              <div
                className="relative w-12 h-12 rounded-full overflow-hidden border-2 shadow-sm"
                style={{ borderColor: team.color }}
              >
                <img
                  src={`https://img.usecurling.com/p/100/100?q=${encodeURIComponent(
                    team.name,
                  )}%20flag`}
                  alt={`Bandeira de ${team.name}`}
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-bold uppercase tracking-wider text-foreground leading-tight">
                  {team.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Badge
                    variant="secondary"
                    className="px-1.5 py-0 text-[10px] bg-background/50 text-muted-foreground border-border/50 font-medium"
                  >
                    TPI:{' '}
                    <span className="text-foreground ml-1 font-bold">
                      {team.strength}
                    </span>
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Impacto no Título
                </span>
                <span
                  className="text-lg font-black tabular-nums tracking-tighter"
                  style={{ color: team.color }}
                >
                  {team.probability.toFixed(1)}%
                </span>
              </div>
              <div
                className={cn(
                  'p-1.5 rounded-full bg-secondary/50 transition-transform duration-300',
                  isOpen && 'rotate-180',
                )}
              >
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-4 pt-0 border-t border-border/10 bg-black/20 grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col gap-2 pt-4">
              <h4 className="text-[10px] font-bold flex items-center gap-1.5 uppercase tracking-widest text-muted-foreground">
                <Activity className="w-3.5 h-3.5" /> Perfil Técnico
              </h4>
              <div className="h-[200px] w-full -ml-4">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <RadarChart
                    data={radarData}
                    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                  >
                    <PolarGrid
                      stroke="hsl(var(--border))"
                      strokeDasharray="3 3"
                    />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{
                        fill: 'hsl(var(--muted-foreground))',
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    />
                    <Radar
                      name={team.name}
                      dataKey="value"
                      stroke={team.color}
                      strokeWidth={2}
                      fill={team.color}
                      fillOpacity={0.25}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent indicator="line" />}
                    />
                  </RadarChart>
                </ChartContainer>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-5 pb-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5" /> Nível Geral do Elenco
                  </h4>
                  <span className="text-xs font-black">
                    {team.athleteLevel}/100
                  </span>
                </div>
                <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-1000 ease-out relative"
                    style={{
                      width: `${team.athleteLevel}%`,
                      backgroundColor: team.color,
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Principais Jogadores
                </h4>
                <div className="flex flex-wrap gap-4 mt-2">
                  {team.keyPlayers.map((player) => (
                    <PlayerStatsDialog
                      key={player.id}
                      player={player}
                      team={team}
                    >
                      <button className="flex flex-col items-center gap-1.5 group hover:opacity-80 transition-opacity outline-none">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-[2.5px] border-border/50 group-hover:border-[hsl(var(--gold))] transition-colors shadow-sm">
                          <img
                            src={player.image}
                            alt={player.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground group-hover:text-foreground transition-colors max-w-[65px] text-center truncate leading-tight">
                          {player.name}
                        </span>
                      </button>
                    </PlayerStatsDialog>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p
                  className="text-xs text-muted-foreground leading-relaxed italic border-l-2 pl-3 py-1"
                  style={{ borderColor: team.color }}
                >
                  "{team.description}"
                </p>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

export default function CopaStatsDashboard() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [sortBy, setSortBy] = useState<'probability' | 'strength' | 'name'>(
    'probability',
  )
  const [rankingTab, setRankingTab] = useState<
    'scorers' | 'tactical' | 'goals'
  >('scorers')

  // Bolão States
  const [predictions, setPredictions] = useState<
    Record<
      string,
      {
        t1Score: number
        t2Score: number
        scorer: string
        status: 'pending' | 'won' | 'lost'
      }
    >
  >({})
  const [selectedMatch, setSelectedMatch] = useState<any>(null)
  const [showVoucher, setShowVoucher] = useState<any>(null)

  const [t1, setT1] = useState(0)
  const [t2, setT2] = useState(0)
  const [scorer, setScorer] = useState('')

  const sortedTeams = useMemo(() => {
    return [...TEAMS].sort((a, b) => {
      if (sortBy === 'probability') return b.probability - a.probability
      if (sortBy === 'strength') return b.strength - a.strength
      return a.name.localeCompare(b.name)
    })
  }, [sortBy])

  const top5Teams = [...TEAMS]
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 5)

  const elitePlayersData = useMemo(() => {
    const eliteIds = [
      { teamId: 'br', playerId: 'neymar' },
      { teamId: 'ar', playerId: 'messi' },
      { teamId: 'fr', playerId: 'mbappe' },
      { teamId: 'en', playerId: 'bellingham' },
      { teamId: 'es', playerId: 'yamal' },
    ]
    return eliteIds.map((ep) => {
      const team = TEAMS.find((t) => t.id === ep.teamId)!
      const player = team.keyPlayers.find((p) => p.id === ep.playerId)!
      return { team, player }
    })
  }, [])

  const handlePredict = (match: any) => {
    setSelectedMatch(match)
    setT1(0)
    setT2(0)
    setScorer('')
  }

  const submitPrediction = () => {
    if (!selectedMatch) return

    const isPerfect =
      t1 === selectedMatch.mockResult.t1 &&
      t2 === selectedMatch.mockResult.t2 &&
      scorer.trim().toLowerCase() ===
        selectedMatch.mockResult.scorer.toLowerCase()

    const newPrediction = {
      t1Score: t1,
      t2Score: t2,
      scorer,
      status: isPerfect ? 'won' : 'pending',
    } as const

    setPredictions((prev) => ({
      ...prev,
      [selectedMatch.id]: newPrediction,
    }))

    if (isPerfect) {
      setShowVoucher(selectedMatch)
    } else {
      toast({
        title: 'Palpite Registrado!',
        description:
          'Seu palpite foi salvo. (Como é uma simulação, apenas acertos exatos disparam o prêmio agora).',
      })
    }
    setSelectedMatch(null)
  }

  return (
    <div className="min-h-screen bg-background pb-32 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-[hsl(var(--gold)/0.1)] rounded-full blur-[120px]" />
      </div>

      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/30 shadow-sm">
        <div className="flex items-center justify-between p-4 px-4 pt-safe-top">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full shrink-0 hover:bg-secondary/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-primary to-[hsl(var(--gold))]">
              Copa 26 Stats
            </h1>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
              Dashboard de Torneio
            </span>
          </div>
          <div className="w-10 shrink-0" />
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="px-4 mt-6 animate-in fade-in duration-700">
          <Card className="border-[hsl(var(--gold)/0.4)] bg-black/40 overflow-hidden relative shadow-[0_0_20px_hsl(var(--gold)/0.1)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--gold)/0.15),transparent_70%)] pointer-events-none" />

            <div className="p-6 flex flex-col items-center relative z-10">
              <div className="flex flex-col items-center text-center mb-6">
                <h2 className="text-xl font-black uppercase tracking-widest text-[hsl(var(--gold))] flex items-center gap-2">
                  <Trophy className="w-5 h-5" /> Gold Profile
                </h2>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                  Road to Glory - Top Performers
                </p>
              </div>

              <div className="relative w-full max-w-[300px] aspect-square mx-auto">
                <div className="absolute inset-[15%] rounded-full border-[1.5px] border-[hsl(var(--gold)/0.4)] border-dashed" />
                <div className="absolute inset-[30%] rounded-full border-[1.5px] border-[hsl(var(--gold)/0.25)] border-dashed" />
                <div className="absolute inset-[45%] rounded-full border-[1.5px] border-[hsl(var(--gold)/0.15)] border-dashed" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#ffd700] to-[#b8860b] p-4 rounded-full shadow-[0_0_40px_hsl(var(--gold)/0.6)] z-20 border-2 border-yellow-300">
                  <Trophy className="w-10 h-10 text-black drop-shadow-md" />
                </div>

                {goldPlayerIds.map((p, i) => {
                  const pos = getGoldPos(i, goldPlayerIds.length, p.rating)
                  const data = getPlayerFromTeams(p.id)
                  if (!data) return null

                  return (
                    <div
                      key={p.id}
                      className="absolute z-30 transition-all duration-500 hover:scale-125 hover:z-40"
                      style={{
                        top: `${pos.top}%`,
                        left: `${pos.left}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <PlayerStatsDialog player={data.player} team={data.team}>
                        <button className="relative w-12 h-12 rounded-full p-[2px] bg-gradient-to-br from-[hsl(var(--gold))] to-amber-700 shadow-lg outline-none">
                          <div className="w-full h-full rounded-full overflow-hidden bg-black">
                            <img
                              src={data.player.image}
                              alt={data.player.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black/90 border border-[hsl(var(--gold))] px-1.5 py-0.5 rounded text-[8px] font-black text-[hsl(var(--gold))] shadow-sm whitespace-nowrap">
                            {p.rating}
                          </div>
                        </button>
                      </PlayerStatsDialog>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>
        </div>

        <div className="px-4 mt-8 animate-in fade-in duration-700 delay-150">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-xl font-black uppercase tracking-wider text-foreground">
                Resultados
              </h2>
              <p className="text-xs text-muted-foreground font-medium">
                Últimas partidas encerradas
              </p>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
            {COMPLETED_MATCHES.map((match) => (
              <Card
                key={match.id}
                className="min-w-[280px] shrink-0 snap-center border-border/30 bg-secondary/10 backdrop-blur-md"
              >
                <div className="p-4">
                  <div className="text-[10px] text-muted-foreground font-bold uppercase mb-3 flex justify-between">
                    <span>{match.stage}</span>
                    <span>{match.date}</span>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col items-center gap-1.5 w-[35%]">
                      <img
                        src={match.team1.flag}
                        className="w-10 h-10 rounded-full border-2 border-border/50 object-cover shadow-sm"
                        alt={match.team1.name}
                      />
                      <span className="text-xs font-bold truncate w-full text-center">
                        {match.team1.name}
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center w-[30%]">
                      <span className="text-3xl font-black text-foreground tabular-nums">
                        {match.team1.score} - {match.team2.score}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-[9px] mt-1 bg-green-500/10 text-green-500 border-green-500/20 px-1.5"
                      >
                        FINAL
                      </Badge>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 w-[35%]">
                      <img
                        src={match.team2.flag}
                        className="w-10 h-10 rounded-full border-2 border-border/50 object-cover shadow-sm"
                        alt={match.team2.name}
                      />
                      <span className="text-xs font-bold truncate w-full text-center">
                        {match.team2.name}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-[hsl(var(--gold))]" />
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">
                        Man of the Match
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black">
                        {match.motm.name}
                      </span>
                      <img
                        src={match.motm.image}
                        className="w-7 h-7 rounded-full border border-border/30 object-cover"
                        alt={match.motm.name}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* BOLÃO GOPLAY SECTION */}
        <div className="px-4 mt-8 animate-in fade-in duration-700 delay-300">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-xl font-black uppercase tracking-wider text-foreground flex items-center gap-2">
                <Target className="w-5 h-5 text-[hsl(var(--gold))]" />
                Bolão GoPlay
              </h2>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                Acerte o placar e ganhe prêmios exclusivos
              </p>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 mb-4 flex items-start gap-3">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-[10px] text-primary/80 leading-relaxed font-medium">
              <strong>Nota de Sistema:</strong> A verificação em tempo real de
              resultados e o ranking global persistente do Bolão requerem
              conexão com backend (Supabase ou Skip Cloud). Atualmente rodando
              em modo simulação.
            </p>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
            {BOLAO_MATCHES.map((match) => (
              <Card
                key={match.id}
                className="min-w-[280px] shrink-0 snap-center border-border/30 bg-secondary/10 backdrop-blur-md relative overflow-hidden"
              >
                {predictions[match.id]?.status === 'won' && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-bl-lg z-10 shadow-sm">
                    Na Mosca!
                  </div>
                )}
                <div className="p-4">
                  <div className="text-[10px] text-muted-foreground font-bold uppercase mb-3 flex justify-between">
                    <span>{match.date}</span>
                    <span>{match.stadium}</span>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col items-center gap-1.5 w-[35%]">
                      <img
                        src={match.team1.flag}
                        className="w-10 h-10 rounded-full border-2 border-border/50 object-cover shadow-sm"
                        alt={match.team1.name}
                      />
                      <span className="text-xs font-bold truncate w-full text-center">
                        {match.team1.name}
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center w-[30%]">
                      {predictions[match.id] ? (
                        <span className="text-2xl font-black text-foreground tabular-nums">
                          {predictions[match.id].t1Score} -{' '}
                          {predictions[match.id].t2Score}
                        </span>
                      ) : (
                        <span className="text-xl font-black text-muted-foreground/50">
                          VS
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col items-center gap-1.5 w-[35%]">
                      <img
                        src={match.team2.flag}
                        className="w-10 h-10 rounded-full border-2 border-border/50 object-cover shadow-sm"
                        alt={match.team2.name}
                      />
                      <span className="text-xs font-bold truncate w-full text-center">
                        {match.team2.name}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/10">
                    {predictions[match.id] ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground font-semibold">
                            Palpite de gol:
                          </span>
                          <span className="font-bold">
                            {predictions[match.id].scorer}
                          </span>
                        </div>
                        <Badge
                          variant={
                            predictions[match.id].status === 'won'
                              ? 'default'
                              : 'secondary'
                          }
                          className={cn(
                            'w-full justify-center py-1',
                            predictions[match.id].status === 'won' &&
                              'bg-green-500 hover:bg-green-600 text-white shadow-sm',
                          )}
                        >
                          {predictions[match.id].status === 'won'
                            ? 'Prêmio Desbloqueado'
                            : 'Aguardando Resultado'}
                        </Badge>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handlePredict(match)}
                        size="sm"
                        className="w-full text-xs font-black uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Fazer Palpite
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="px-4 mt-8 animate-in fade-in duration-700 delay-300">
          <div className="mb-4">
            <h2 className="text-xl font-black uppercase tracking-wider text-foreground">
              Rankings
            </h2>
            <p className="text-xs text-muted-foreground font-medium">
              Destaques individuais do torneio
            </p>
          </div>

          <div className="flex gap-2 bg-secondary/30 p-1.5 rounded-xl mb-4 border border-border/20">
            <button
              onClick={() => setRankingTab('scorers')}
              className={cn(
                'flex-1 text-[11px] font-black uppercase tracking-wider py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5',
                rankingTab === 'scorers'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Target className="w-3.5 h-3.5" />
              Artilharia
            </button>
            <button
              onClick={() => setRankingTab('tactical')}
              className={cn(
                'flex-1 text-[11px] font-black uppercase tracking-wider py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5',
                rankingTab === 'tactical'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Crosshair className="w-3.5 h-3.5" />
              Tático
            </button>
            <button
              onClick={() => setRankingTab('goals')}
              className={cn(
                'flex-1 text-[11px] font-black uppercase tracking-wider py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5',
                rankingTab === 'goals'
                  ? 'bg-[hsl(var(--gold))] text-black shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Flame className="w-3.5 h-3.5" />
              Pinturas
            </button>
          </div>

          <Card className="border-border/30 bg-secondary/10 backdrop-blur-md overflow-hidden shadow-lg">
            <div className="divide-y divide-border/20">
              {RANKINGS[rankingTab].map((item, i) => (
                <div
                  key={item.id}
                  className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 text-center text-lg font-black text-muted-foreground/40">
                      {i + 1}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{item.name}</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">
                          {item.team}
                        </span>
                        {item.desc && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span className="text-[10px] text-muted-foreground italic truncate max-w-[120px]">
                              {item.desc}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={cn(
                        'text-lg font-black',
                        rankingTab === 'goals'
                          ? 'text-[hsl(var(--gold))]'
                          : 'text-primary',
                      )}
                    >
                      {item.value}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-muted-foreground">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="px-4 mt-12 animate-in fade-in duration-700 delay-500">
          <Card className="border-border/30 bg-secondary/10 backdrop-blur-md overflow-hidden relative shadow-lg">
            <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <CardHeader className="pb-0 pt-5">
              <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Favoritos ao Título
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[220px] w-full">
                <ChartContainer
                  config={{ value: { label: 'Probabilidade %' } }}
                  className="h-full w-full"
                >
                  <BarChart
                    data={top5Teams}
                    layout="vertical"
                    margin={{ left: 0, right: 30, top: 0, bottom: 0 }}
                  >
                    <XAxis type="number" hide domain={[0, 25]} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 11,
                        fill: 'hsl(var(--foreground))',
                        fontWeight: 600,
                      }}
                      width={70}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent indicator="line" />}
                      cursor={{ fill: 'hsl(var(--secondary)/0.3)' }}
                    />
                    <Bar
                      dataKey="probability"
                      radius={[0, 4, 4, 0]}
                      barSize={20}
                      label={{
                        position: 'right',
                        fill: 'hsl(var(--muted-foreground))',
                        fontSize: 10,
                        fontWeight: 600,
                        formatter: (val: number) => `${val}%`,
                      }}
                    >
                      {top5Teams.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="px-4 mt-8 animate-in fade-in duration-700 delay-500">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-xl font-black uppercase tracking-wider text-foreground">
                Galeria Elite
              </h2>
              <p className="text-xs text-muted-foreground font-medium">
                Destaques das seleções
              </p>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
            {elitePlayersData.map(({ team, player }) => (
              <PlayerStatsDialog key={player.id} player={player} team={team}>
                <button className="flex flex-col items-center gap-2 group hover:opacity-80 transition-opacity outline-none snap-start shrink-0 w-[120px] bg-secondary/20 p-3 rounded-2xl border border-border/30 backdrop-blur-sm">
                  <div
                    className="relative w-20 h-20 rounded-full overflow-hidden border-[3px] border-border/50 group-hover:scale-105 transition-transform duration-300 shadow-sm"
                    style={{ borderColor: team.color }}
                  >
                    <img
                      src={player.image}
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-0.5 mt-1">
                    <span className="text-xs font-bold text-foreground transition-colors text-center leading-tight">
                      {player.name}
                    </span>
                    <span
                      className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider"
                      style={{ color: team.color }}
                    >
                      {team.name}
                    </span>
                  </div>
                </button>
              </PlayerStatsDialog>
            ))}
          </div>
        </div>

        <div className="px-4 mt-8 animate-in fade-in duration-700 delay-500">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-xl font-black uppercase tracking-wider text-foreground">
                Calendário
              </h2>
              <p className="text-xs text-muted-foreground font-medium">
                Próximos confrontos
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-secondary/20 border-border/30 hover:bg-secondary/40 h-8 rounded-full px-4"
              onClick={() => navigate('/album/stats/table')}
            >
              Ver Tabela
            </Button>
          </div>

          <Card className="border-border/30 bg-secondary/10 backdrop-blur-md overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-secondary/20">
                  <TableRow className="border-border/30 hover:bg-transparent">
                    <TableHead className="w-[80px] text-[10px] uppercase font-bold text-muted-foreground whitespace-nowrap">
                      Data
                    </TableHead>
                    <TableHead className="w-[60px] text-[10px] uppercase font-bold text-muted-foreground">
                      Hora
                    </TableHead>
                    <TableHead className="text-[10px] uppercase font-bold text-muted-foreground">
                      Confronto
                    </TableHead>
                    <TableHead className="text-[10px] uppercase font-bold text-muted-foreground text-right whitespace-nowrap">
                      Local
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {SUMMARY_SCHEDULE.map((match) => (
                    <TableRow
                      key={match.id}
                      className="border-border/20 hover:bg-secondary/20 cursor-pointer transition-colors"
                      onClick={() => navigate('/album/stats/table')}
                    >
                      <TableCell className="font-medium text-xs whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-primary" />
                          {match.date}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {match.time}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col items-end w-[45px]">
                            <span className="text-xs font-bold truncate w-full text-right">
                              {match.team1.name}
                            </span>
                          </div>
                          <img
                            src={match.team1.flag}
                            alt={match.team1.name}
                            className="w-4 h-4 rounded-full object-cover border border-border/50 shrink-0"
                          />
                          <span className="text-[10px] font-black text-muted-foreground mx-0.5">
                            X
                          </span>
                          <img
                            src={match.team2.flag}
                            alt={match.team2.name}
                            className="w-4 h-4 rounded-full object-cover border border-border/50 shrink-0"
                          />
                          <div className="flex flex-col items-start w-[45px]">
                            <span className="text-xs font-bold truncate w-full text-left">
                              {match.team2.name}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-[10px] text-muted-foreground whitespace-nowrap">
                        {match.stadium}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>

        <div className="px-4 mt-8 mb-4 flex items-end justify-between animate-in fade-in duration-700 delay-500">
          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-foreground">
              Ranking de Força
            </h2>
            <p className="text-xs text-muted-foreground font-medium">
              Análise técnica detalhada
            </p>
          </div>
          <Select value={sortBy} onValueChange={(val: any) => setSortBy(val)}>
            <SelectTrigger className="w-[140px] h-8 bg-secondary/30 border-border/30 text-xs font-semibold rounded-full">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="probability">Impacto Título</SelectItem>
              <SelectItem value="strength">Força (TPI)</SelectItem>
              <SelectItem value="name">Alfabética</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="px-4 flex flex-col gap-3 pb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
          {sortedTeams.map((team, index) => (
            <TeamCard key={team.id} team={team} rank={index + 1} />
          ))}
        </div>
      </div>

      {/* Bolão Predictor Modal */}
      <Dialog
        open={!!selectedMatch}
        onOpenChange={(open) => !open && setSelectedMatch(null)}
      >
        <DialogContent className="sm:max-w-md bg-secondary border-border/50">
          <DialogHeader>
            <DialogTitle className="uppercase tracking-widest font-black text-center text-foreground">
              Faça seu Palpite
            </DialogTitle>
          </DialogHeader>
          {selectedMatch && (
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between px-4">
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <img
                    src={selectedMatch.team1.flag}
                    className="w-14 h-14 rounded-full border-2 border-border/50 object-cover shadow-sm"
                    alt={selectedMatch.team1.name}
                  />
                  <span className="font-bold text-sm text-center">
                    {selectedMatch.team1.name}
                  </span>
                  <input
                    type="number"
                    value={t1}
                    onChange={(e) => setT1(Number(e.target.value))}
                    className="flex h-12 w-16 rounded-md border border-input bg-background px-3 py-2 text-xl font-black text-center ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    min={0}
                  />
                </div>
                <span className="text-2xl font-black text-muted-foreground/30">
                  X
                </span>
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <img
                    src={selectedMatch.team2.flag}
                    className="w-14 h-14 rounded-full border-2 border-border/50 object-cover shadow-sm"
                    alt={selectedMatch.team2.name}
                  />
                  <span className="font-bold text-sm text-center">
                    {selectedMatch.team2.name}
                  </span>
                  <input
                    type="number"
                    value={t2}
                    onChange={(e) => setT2(Number(e.target.value))}
                    className="flex h-12 w-16 rounded-md border border-input bg-background px-3 py-2 text-xl font-black text-center ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    min={0}
                  />
                </div>
              </div>

              <div className="space-y-2 px-4">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Quem fará um gol?
                </label>
                <input
                  type="text"
                  placeholder="Ex: Neymar Jr."
                  value={scorer}
                  onChange={(e) => setScorer(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <p className="text-[10px] text-muted-foreground italic mt-2 border-l-2 border-primary/50 pl-2">
                  Dica para testar: {selectedMatch.mockResult.t1}x
                  {selectedMatch.mockResult.t2} com gol de '
                  {selectedMatch.mockResult.scorer}' aciona o prêmio!
                </p>
              </div>

              <div className="px-4 pb-2">
                <Button
                  className="w-full font-black uppercase tracking-widest h-12"
                  onClick={submitPrediction}
                >
                  Participar do Bolão
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Bolão Reward Voucher Modal */}
      <Dialog
        open={!!showVoucher}
        onOpenChange={(open) => !open && setShowVoucher(null)}
      >
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-indigo-950 to-purple-950 border-[hsl(var(--gold))] text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-[hsl(var(--gold))] text-center uppercase tracking-widest flex items-center justify-center gap-2 drop-shadow-md">
              <Trophy className="w-6 h-6" /> Na Mosca!
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-32 h-32 rounded-full bg-black/40 border-4 border-[hsl(var(--gold))] p-4 flex items-center justify-center relative shadow-[0_0_40px_hsl(var(--gold)/0.4)] animate-in zoom-in duration-500">
              <Gift className="w-16 h-16 text-[hsl(var(--gold))] animate-bounce" />
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-center space-y-2 w-full px-4">
              <h3 className="text-lg font-bold text-white">
                Parabéns! Você acertou em cheio!
              </h3>
              <div className="bg-black/40 p-5 rounded-xl border border-white/20 mt-4 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[hsl(var(--gold)/0.1)] blur-2xl rounded-full pointer-events-none" />
                <div className="flex items-center gap-2 mb-3 justify-center text-[hsl(var(--gold))] relative z-10">
                  <Ticket className="w-5 h-5" />
                  <span className="font-black uppercase tracking-wider text-sm">
                    Voucher Desbloqueado
                  </span>
                </div>
                <p className="text-[13px] font-bold text-white/90 uppercase tracking-wide relative z-10">
                  Vale-Presente: Camiseta Oficial da{' '}
                  {showVoucher?.team1?.name || 'Seleção'}
                </p>
                <div className="flex items-center justify-center gap-1.5 mt-2 text-green-400 relative z-10">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <p className="text-[11px] font-bold uppercase tracking-wider">
                    Inclui: Frete Gratuito para todo o Brasil
                  </p>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-center text-white/50 px-8 mt-2 leading-relaxed font-medium">
              * Para resgatar, acesse a loja GoPlay e insira o código gerado em
              seu perfil. Em ambiente real, o prêmio está sujeito à
              disponibilidade de estoque.
            </p>
            <div className="px-4 w-full mt-2">
              <Button
                className="w-full bg-[hsl(var(--gold))] text-black font-black uppercase tracking-widest hover:bg-[hsl(var(--gold)/0.8)] shadow-[0_0_15px_hsl(var(--gold)/0.3)] h-12"
                onClick={() => setShowVoucher(null)}
              >
                Resgatar Prêmio
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
