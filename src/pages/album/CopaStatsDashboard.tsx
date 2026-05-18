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
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

type PlayerStat = {
  id: string
  name: string
  image: string
  stats: {
    Velocidade: number
    Finalização: number
    Passe: number
    Drible: number
    Físico: number
  }
  tacticalAnalysis: string
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
        id: 'vini',
        name: 'Vini Jr.',
        image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=vini',
        stats: {
          Velocidade: 98,
          Finalização: 89,
          Passe: 85,
          Drible: 96,
          Físico: 82,
        },
        tacticalAnalysis:
          'Sua velocidade explosiva e drible desequilibrante pelas pontas quebram as defesas adversárias, criando os espaços necessários para o ataque brasileiro prosperar rumo ao título.',
      },
      {
        id: 'rodrygo',
        name: 'Rodrygo',
        image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=rodrygo',
        stats: {
          Velocidade: 92,
          Finalização: 88,
          Passe: 87,
          Drible: 93,
          Físico: 75,
        },
        tacticalAnalysis:
          'Extremamente inteligente taticamente, atua em diversas posições do ataque, oferecendo fluidez e precisão no terço final do campo.',
      },
      {
        id: 'endrick',
        name: 'Endrick',
        image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=endrick',
        stats: {
          Velocidade: 90,
          Finalização: 85,
          Passe: 78,
          Drible: 88,
          Físico: 85,
        },
        tacticalAnalysis:
          'Traz força física incomum para sua idade, além de um instinto artilheiro que o torna uma ameaça letal dentro da área adversária.',
      },
    ],
    description:
      'A quintessência do talento futebolístico. Alta habilidade técnica e poder ofensivo.',
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
        image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=mbappe',
        stats: {
          Velocidade: 99,
          Finalização: 94,
          Passe: 83,
          Drible: 93,
          Físico: 85,
        },
        tacticalAnalysis:
          'Sua velocidade em transições e capacidade de finalização o tornam praticamente imparável. É o ponto focal do ataque francês.',
      },
      {
        id: 'griezmann',
        name: 'Griezmann',
        image:
          'https://img.usecurling.com/ppl/medium?gender=male&seed=griezmann',
        stats: {
          Velocidade: 80,
          Finalização: 85,
          Passe: 92,
          Drible: 86,
          Físico: 78,
        },
        tacticalAnalysis:
          'O cérebro tático do time. Dita o ritmo de jogo, conecta o meio ao ataque e incansável na recomposição defensiva.',
      },
      {
        id: 'camavinga',
        name: 'Camavinga',
        image:
          'https://img.usecurling.com/ppl/medium?gender=male&seed=camavinga',
        stats: {
          Velocidade: 85,
          Finalização: 70,
          Passe: 88,
          Drible: 84,
          Físico: 85,
        },
        tacticalAnalysis:
          'Traz dinamismo e versatilidade ao meio-campo, capaz de quebrar linhas com passes precisos e recuperar bolas importantes.',
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
        image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=messi',
        stats: {
          Velocidade: 75,
          Finalização: 93,
          Passe: 96,
          Drible: 94,
          Físico: 65,
        },
        tacticalAnalysis:
          'Líder e principal criador de jogadas. Sua visão de jogo ímpar e passes precisos encontram espaços onde não existem.',
      },
      {
        id: 'alvarez',
        name: 'Alvarez',
        image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=alvarez',
        stats: {
          Velocidade: 86,
          Finalização: 87,
          Passe: 80,
          Drible: 85,
          Físico: 80,
        },
        tacticalAnalysis:
          'Intensa pressão pós-perda e movimentação inteligente criam oportunidades constantes e incomodam as defesas rivais.',
      },
      {
        id: 'macallister',
        name: 'Mac Allister',
        image:
          'https://img.usecurling.com/ppl/medium?gender=male&seed=macallister',
        stats: {
          Velocidade: 78,
          Finalização: 82,
          Passe: 88,
          Drible: 85,
          Físico: 75,
        },
        tacticalAnalysis:
          'Motor do meio-campo argentino, dita o tempo de jogo e aparece como elemento surpresa na área para finalizar.',
      },
    ],
    description:
      'Atuais campeões com uma coesão de equipe inigualável e resiliência mental.',
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
        name: 'Bellingham',
        image:
          'https://img.usecurling.com/ppl/medium?gender=male&seed=bellingham',
        stats: {
          Velocidade: 85,
          Finalização: 86,
          Passe: 88,
          Drible: 89,
          Físico: 90,
        },
        tacticalAnalysis:
          'Um meio-campista completo que avança com força, criando jogadas e finalizando com precisão. A alma do time inglês.',
      },
      {
        id: 'kane',
        name: 'Kane',
        image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=kane',
        stats: {
          Velocidade: 70,
          Finalização: 94,
          Passe: 89,
          Drible: 82,
          Físico: 86,
        },
        tacticalAnalysis:
          'Atacante letal que também atua como armador recuado. Sua capacidade de reter a bola e dar assistências é fundamental.',
      },
      {
        id: 'saka',
        name: 'Saka',
        image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=saka',
        stats: {
          Velocidade: 90,
          Finalização: 84,
          Passe: 83,
          Drible: 90,
          Físico: 75,
        },
        tacticalAnalysis:
          'Alegria e criatividade na ponta direita. Seus dribles curtos e cortes para o meio desmontam as linhas defensivas.',
      },
    ],
    description:
      'Uma geração de ouro que mistura energia jovem com liderança experiente.',
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
        image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=pedri',
        stats: {
          Velocidade: 78,
          Finalização: 75,
          Passe: 92,
          Drible: 88,
          Físico: 70,
        },
        tacticalAnalysis:
          'Controle absoluto no meio-campo. Sua posse de bola e passes incisivos geram controle e fluidez ao jogo espanhol.',
      },
      {
        id: 'yamal',
        name: 'Yamal',
        image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=yamal',
        stats: {
          Velocidade: 89,
          Finalização: 80,
          Passe: 84,
          Drible: 91,
          Físico: 65,
        },
        tacticalAnalysis:
          'Jovem prodígio com extrema habilidade no 1 contra 1, quebrando sistemas defensivos retrancados com criatividade.',
      },
      {
        id: 'rodri',
        name: 'Rodri',
        image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=rodri',
        stats: {
          Velocidade: 70,
          Finalização: 78,
          Passe: 93,
          Drible: 80,
          Físico: 88,
        },
        tacticalAnalysis:
          'O pivô tático da equipe. Garante segurança defensiva e é a primeira peça na construção de jogadas ofensivas.',
      },
    ],
    description:
      'Mestres da posse de bola e do jogo posicional, ditando o ritmo de qualquer partida.',
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
        name: 'Musiala',
        image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=musiala',
        stats: {
          Velocidade: 88,
          Finalização: 84,
          Passe: 85,
          Drible: 94,
          Físico: 72,
        },
        tacticalAnalysis:
          'Drible em espaços curtos excepcional. Ele arrasta marcações e cria oportunidades onde parece não haver espaço.',
      },
      {
        id: 'wirtz',
        name: 'Wirtz',
        image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=wirtz',
        stats: {
          Velocidade: 84,
          Finalização: 85,
          Passe: 90,
          Drible: 89,
          Físico: 70,
        },
        tacticalAnalysis:
          'Visão de jogo impressionante. Seus passes rompem linhas e aceleram a transição ofensiva da equipe alemã.',
      },
      {
        id: 'kimmich',
        name: 'Kimmich',
        image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=kimmich',
        stats: {
          Velocidade: 76,
          Finalização: 78,
          Passe: 91,
          Drible: 82,
          Físico: 80,
        },
        tacticalAnalysis:
          'Versatilidade e garra. Atuando na lateral ou no meio, é essencial na criação de jogadas com seus cruzamentos perfeitos.',
      },
    ],
    description:
      'Taticamente versátil e eficiente, passando por um poderoso renascimento.',
    color: '#ffce00',
  },
  {
    id: 'pt',
    name: 'Portugal',
    probability: 8.5,
    strength: 87,
    athleteLevel: 90,
    stats: { Tático: 85, Físico: 86, Mental: 84, Técnico: 91, Velocidade: 88 },
    keyPlayers: [
      {
        id: 'leao',
        name: 'Leão',
        image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=leao',
        stats: {
          Velocidade: 95,
          Finalização: 82,
          Passe: 80,
          Drible: 92,
          Físico: 86,
        },
        tacticalAnalysis:
          'Força e explosão na ponta esquerda. Ganha duelos físicos e de velocidade, criando muito perigo.',
      },
      {
        id: 'bruno',
        name: 'Bruno Fernandes',
        image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=bruno',
        stats: {
          Velocidade: 78,
          Finalização: 86,
          Passe: 92,
          Drible: 84,
          Físico: 78,
        },
        tacticalAnalysis:
          'Principal armador e batedor da equipe. Seus passes de longa distância e finalizações de fora da área são letais.',
      },
      {
        id: 'bernardo',
        name: 'Bernardo Silva',
        image:
          'https://img.usecurling.com/ppl/medium?gender=male&seed=bernardo',
        stats: {
          Velocidade: 76,
          Finalização: 78,
          Passe: 90,
          Drible: 92,
          Físico: 68,
        },
        tacticalAnalysis:
          'Incansável sem a bola e mágico com ela. Mantém a posse em espaços reduzidos e dita o ritmo ofensivo.',
      },
    ],
    description:
      'Um elenco incrivelmente profundo com maestros técnicos no meio-campo e ataque.',
    color: '#ff0000',
  },
  {
    id: 'it',
    name: 'Itália',
    probability: 3.5,
    strength: 85,
    athleteLevel: 86,
    stats: { Tático: 92, Físico: 82, Mental: 88, Técnico: 85, Velocidade: 80 },
    keyPlayers: [
      {
        id: 'barella',
        name: 'Barella',
        image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=barella',
        stats: {
          Velocidade: 82,
          Finalização: 78,
          Passe: 86,
          Drible: 84,
          Físico: 85,
        },
        tacticalAnalysis:
          'Dinamismo no meio-campo. Ele pressiona alto, recupera a bola e chega à área para finalizar com muita energia.',
      },
      {
        id: 'chiesa',
        name: 'Chiesa',
        image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=chiesa',
        stats: {
          Velocidade: 91,
          Finalização: 84,
          Passe: 80,
          Drible: 88,
          Físico: 76,
        },
        tacticalAnalysis:
          'O desafogo ofensivo italiano. Sua velocidade e finalização potente com as duas pernas garantem gols importantes.',
      },
      {
        id: 'bastoni',
        name: 'Bastoni',
        image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=bastoni',
        stats: {
          Velocidade: 72,
          Finalização: 55,
          Passe: 84,
          Drible: 74,
          Físico: 85,
        },
        tacticalAnalysis:
          'Um zagueiro construtor. Inicia os ataques com passes longos precisos e organiza a defesa com inteligência tática.',
      },
    ],
    description:
      'Historicamente defensores formidáveis com enorme astúcia tática e resiliência.',
    color: '#0066cc',
  },
]

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
                  Prob. Título
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
            {/* Radar Chart */}
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

            {/* Stats Details */}
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
                    <Dialog key={player.id}>
                      <DialogTrigger asChild>
                        <button className="flex flex-col items-center gap-1.5 group hover:opacity-80 transition-opacity outline-none">
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border/50 group-hover:border-primary/80 transition-colors shadow-sm">
                            <img
                              src={player.image}
                              alt={player.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-[10px] font-bold text-muted-foreground group-hover:text-foreground transition-colors max-w-[60px] text-center truncate leading-tight">
                            {player.name}
                          </span>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md bg-secondary/95 border-border/50 backdrop-blur-xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-4">
                            <div
                              className="w-14 h-14 rounded-full overflow-hidden border-[3px] shadow-lg"
                              style={{ borderColor: team.color }}
                            >
                              <img
                                src={player.image}
                                alt={player.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex flex-col items-start gap-0.5">
                              <span className="text-xl font-black tracking-tight">
                                {player.name}
                              </span>
                              <Badge
                                variant="outline"
                                className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0 border-border/50"
                                style={{ color: team.color }}
                              >
                                {team.name}
                              </Badge>
                            </div>
                          </DialogTitle>
                        </DialogHeader>

                        <div className="mt-4 space-y-6">
                          {/* Progress Bars */}
                          <div className="space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                              <Activity className="w-3.5 h-3.5" />
                              Estatísticas Técnicas
                            </h4>
                            <div className="space-y-3">
                              {Object.entries(player.stats).map(
                                ([statName, value]) => (
                                  <div key={statName} className="space-y-1.5">
                                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                                      <span className="text-foreground/80">
                                        {statName}
                                      </span>
                                      <span style={{ color: team.color }}>
                                        {value}
                                      </span>
                                    </div>
                                    <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden shadow-inner">
                                      <div
                                        className="h-full transition-all duration-1000 ease-out"
                                        style={{
                                          width: `${value}%`,
                                          backgroundColor: team.color,
                                        }}
                                      />
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>

                          {/* Tactical Analysis */}
                          <div className="p-4 rounded-xl bg-black/20 border border-border/20 shadow-inner">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
                              <Target className="w-3.5 h-3.5" />
                              Análise Tática
                            </h4>
                            <p className="text-sm leading-relaxed text-foreground/90 font-medium">
                              {player.tacticalAnalysis}
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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
  const [sortBy, setSortBy] = useState<'probability' | 'strength' | 'name'>(
    'probability',
  )

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

  return (
    <div className="min-h-screen bg-background pb-32 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-[hsl(var(--gold)/0.1)] rounded-full blur-[120px]" />
      </div>

      {/* Header */}
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
              Estatísticas Copa 26
            </h1>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
              Índice de Força e Probabilidades
            </span>
          </div>
          <div className="w-10 shrink-0" />
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Top Favorites Chart */}
        <div className="px-4 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
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

        {/* List Header & Controls */}
        <div className="px-4 mt-8 mb-4 flex items-end justify-between animate-in fade-in duration-700 delay-200">
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
              <SelectItem value="probability">Prob. Título</SelectItem>
              <SelectItem value="strength">Força (TPI)</SelectItem>
              <SelectItem value="name">Alfabética</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Teams List */}
        <div className="px-4 flex flex-col gap-3 pb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          {sortedTeams.map((team, index) => (
            <TeamCard key={team.id} team={team} rank={index + 1} />
          ))}
        </div>
      </div>
    </div>
  )
}
