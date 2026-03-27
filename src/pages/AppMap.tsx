import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useNavigate } from 'react-router-dom'
import {
  Map,
  Zap,
  Clock,
  LayoutList,
  User,
  Search,
  ShoppingBag,
  MessageSquare,
  CreditCard,
  Car,
  ArrowRight,
  Sparkles,
  Ghost,
  Trophy,
  History,
  Target,
  Users,
  Film,
  Orbit,
  Filter,
  MessageCircle,
  Medal,
  Calendar,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeatureItem {
  id: string
  title: string
  description: string
  icon: React.ElementType
  color: string
  bgColor: string
  link: string
  badge?: string
}

interface FeatureCategory {
  title: string
  items: FeatureItem[]
}

const FEATURE_MAP: FeatureCategory[] = [
  {
    title: 'Comunidade',
    items: [
      {
        id: 'nexus',
        title: 'Nexus Hub',
        description:
          'Centro principal de descoberta de comunidades. Encontre sua tribo ideal com base nos seus esportes favoritos.',
        icon: Orbit,
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
        link: '/nexus',
        badge: 'Novo',
      },
      {
        id: 'tribes',
        title: 'Tribos (Tribes)',
        description:
          'Comunidades exclusivas para atletas. Participe, crie eventos e interaja com pessoas que compartilham sua paixão.',
        icon: Users,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        link: '/nexus',
      },
      {
        id: 'tribe-filters',
        title: 'Filtros de Modalidades',
        description:
          'Explore as tribos facilmente utilizando filtros por esportes como Futebol, Skate, Bike, Surf, Basquete e Tênis.',
        icon: Filter,
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
        link: '/nexus',
      },
    ],
  },
  {
    title: 'Interação',
    items: [
      {
        id: 'tribe-chat',
        title: 'Chat em Tempo Real',
        description:
          'Sistema de mensagens instantâneas dentro das tribos. Combine jogos, troque ideias e envie arquivos.',
        icon: MessageSquare,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        link: '/nexus',
      },
      {
        id: 'feed',
        title: 'Feed Principal',
        description:
          'O coração do app. Acompanhe postagens, artigos, notícias e atualizações da sua rede esportiva cronologicamente.',
        icon: LayoutList,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        link: '/feed',
      },
      {
        id: 'messages',
        title: 'Mensagens Diretas',
        description:
          'Canal direto de comunicação privada com outros atletas, treinadores e recrutadores (scouts).',
        icon: MessageCircle,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        link: '/messages',
      },
    ],
  },
  {
    title: 'Competição',
    items: [
      {
        id: 'tribe-ranking',
        title: 'Ranking de Tribos',
        description:
          'Acompanhe a classificação (Leaderboard) das comunidades mais ativas e que mais organizam eventos.',
        icon: Trophy,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/10',
        link: '/nexus',
        badge: 'Leaderboard',
      },
      {
        id: 'ranking',
        title: 'Ranking Global',
        description:
          'Sistema de classificação global e regional para comparar sua performance individual com outros atletas.',
        icon: Medal,
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/10',
        link: '/ranking',
      },
      {
        id: 'explore-events',
        title: 'Eventos & Campeonatos',
        description:
          'Encontre competições, maratonas, torneios de diversas modalidades próximos a você.',
        icon: Calendar,
        color: 'text-red-500',
        bgColor: 'bg-red-500/10',
        link: '/explore/events',
      },
    ],
  },
  {
    title: 'Análise & Performance',
    items: [
      {
        id: 'moves',
        title: 'GoPlay Moves',
        description:
          'Feed vertical imersivo para highlights esportivos. Reaja com emojis específicos de cada esporte (⚽, 🏀, 🏆).',
        icon: Zap,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/10',
        link: '/move',
      },
      {
        id: 'timeshift',
        title: 'Time Shift',
        description:
          'Módulo de análise narrativa visual com três linhas do tempo: "Real", "Quase" e "Ideal".',
        icon: Clock,
        color: 'text-indigo-500',
        bgColor: 'bg-indigo-500/10',
        link: '/timeshift',
      },
      {
        id: 'ghostplay',
        title: 'Replay 3D (Ghost)',
        description:
          'Transforme vídeos 2D comuns em experiências 3D imersivas para análise de técnica e posicionamento.',
        icon: Ghost,
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
        link: '/ai/ghost-play',
      },
      {
        id: 'aicoach',
        title: 'AI Coach',
        description:
          'Assistente virtual que analisa seus movimentos via visão computacional e sugere melhorias técnicas.',
        icon: Sparkles,
        color: 'text-cyan-500',
        bgColor: 'bg-cyan-500/10',
        link: '/ai/coach',
      },
    ],
  },
  {
    title: 'Explorar & Oportunidades',
    items: [
      {
        id: 'explore',
        title: 'Busca de Talentos',
        description:
          'Ferramenta de busca avançada para encontrar talentos (Scouts), quadras, academias e profissionais.',
        icon: Search,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        link: '/explore',
      },
      {
        id: 'marketplace',
        title: 'Marketplace',
        description:
          'Loja oficial do app para compra de equipamentos e suplementos com GoCoins ou dinheiro.',
        icon: ShoppingBag,
        color: 'text-rose-500',
        bgColor: 'bg-rose-500/10',
        link: '/marketplace',
      },
    ],
  },
  {
    title: 'Perfil & Utilitários',
    items: [
      {
        id: 'profile',
        title: 'Perfil do Atleta',
        description:
          'Seu cartão de visitas esportivo. Exiba estatísticas, histórico de partidas e portfólio visual.',
        icon: User,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        link: '/profile/me',
      },
      {
        id: 'passport',
        title: 'Passaporte Esportivo',
        description:
          'Identidade digital verificada do atleta, contendo certificações e validações oficiais.',
        icon: Target,
        color: 'text-blue-600',
        bgColor: 'bg-blue-600/10',
        link: '/profile/passport',
      },
      {
        id: 'wallet',
        title: 'Carteira (Wallet)',
        description:
          'Gerencie seus pagamentos, saldo de GoCoins e histórico de transações financeiras.',
        icon: CreditCard,
        color: 'text-slate-500',
        bgColor: 'bg-slate-500/10',
        link: '/wallet',
      },
      {
        id: 'driver',
        title: 'GoPlay Driver',
        description:
          'Serviço de transporte especializado para atletas e equipes, com espaço para equipamentos esportivos.',
        icon: Car,
        color: 'text-zinc-500',
        bgColor: 'bg-zinc-500/10',
        link: '/driver/dashboard',
      },
    ],
  },
]

export default function AppMap() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none" />

      <div className="relative z-10 p-6 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-primary/10 rounded-xl">
            <Map className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-foreground">
              Mapa do App
            </h1>
            <p className="text-sm font-medium text-muted-foreground mt-0.5">
              Guia completo de funcionalidades do GoPlay
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-140px)] relative z-10">
        <Accordion
          type="single"
          collapsible
          defaultValue="cat-0"
          className="px-6 pb-10 space-y-4"
        >
          {FEATURE_MAP.map((category, idx) => (
            <AccordionItem
              key={idx}
              value={`cat-${idx}`}
              className="border border-border/50 rounded-2xl bg-card/60 backdrop-blur-md overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-secondary/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <h2 className="text-base font-bold tracking-tight text-foreground">
                    {category.title}
                  </h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 pt-2">
                <div className="grid gap-4 md:grid-cols-2">
                  {category.items.map((item) => (
                    <Card
                      key={item.id}
                      onClick={() => navigate(item.link)}
                      className="bg-background/80 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)] hover:border-primary/40 transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col h-full"
                    >
                      <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0 flex-none">
                        <div className="flex gap-3">
                          <div
                            className={cn(
                              'p-2.5 rounded-xl shrink-0 h-fit transition-transform group-hover:scale-110 duration-300 shadow-sm',
                              item.bgColor,
                            )}
                          >
                            <item.icon className={cn('h-5 w-5', item.color)} />
                          </div>
                          <div className="space-y-1">
                            <CardTitle className="text-[15px] font-bold flex flex-wrap items-center gap-2 leading-tight">
                              {item.title}
                              {item.badge && (
                                <Badge
                                  variant="outline"
                                  className="text-[10px] h-5 px-1.5 font-bold bg-background/50 text-primary border-primary/30"
                                >
                                  {item.badge}
                                </Badge>
                              )}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                        <CardDescription className="text-xs leading-relaxed text-muted-foreground/90 font-medium">
                          {item.description}
                        </CardDescription>
                        <div className="flex items-center text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors pt-2 border-t border-border/50 mt-auto">
                          <span>Acessar funcionalidade</span>
                          <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  )
}
