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
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  Map,
  Zap,
  Clock,
  LayoutList,
  User,
  Search,
  ShoppingBag,
  MessageSquare,
  Sparkles,
  Ghost,
  Trophy,
  Film,
  Crown,
  Shield,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeatureItem {
  id: string
  title: string
  description: string
  objective: string
  stepByStep: string[]
  icon: React.ElementType
  color: string
  bgColor: string
  link: string
  badge?: string
  isPremium?: boolean
}

interface FeatureCategory {
  title: string
  items: FeatureItem[]
}

const FEATURE_MAP: FeatureCategory[] = [
  {
    title: 'Análise Criativa & Performance',
    items: [
      {
        id: 'moves',
        title: 'GoPlay Moves',
        description:
          'Feed vertical imersivo para highlights esportivos com reações contextualizadas.',
        objective:
          'Permitir a avaliação e descoberta rápida de highlights usando reações com emojis específicos de cada esporte.',
        stepByStep: [
          'Acesse a aba Move no menu inferior.',
          'Deslize verticalmente para assistir aos highlights.',
          'Reaja com emojis esportivos (⚽, 🏀, 🏆) para avaliar a performance.',
        ],
        icon: Zap,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/10',
        link: '/move',
        badge: 'Vertical Feed',
      },
      {
        id: 'timeshift',
        title: 'Time Shift',
        description:
          'Módulo de análise narrativa visual em múltiplas linhas do tempo.',
        objective:
          'Explorar as nuances de um lance esportivo nas visões Real, Quase (near-miss) e Ideal.',
        stepByStep: [
          'Navegue até o Time Shift.',
          'Selecione uma jogada ou evento do catálogo.',
          'Alterne entre as perspectivas de tempo para entender a biomecânica e o que poderia ter acontecido.',
        ],
        icon: Clock,
        color: 'text-indigo-500',
        bgColor: 'bg-indigo-500/10',
        link: '/timeshift',
      },
      {
        id: 'ghostplay',
        title: 'Replay 3D (Ghost)',
        description:
          'Transforme vídeos 2D comuns em experiências 3D imersivas para análise.',
        objective:
          'Proporcionar uma visão espacial de técnica e posicionamento usando inteligência artificial.',
        stepByStep: [
          'Abra o Estúdio AI e escolha Gerar Replay 3D.',
          'Faça o upload do seu vídeo.',
          'Aguarde a reconstrução e rotacione a câmera livremente no visualizador 3D.',
        ],
        icon: Ghost,
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
        link: '/ai/ghost-play',
      },
      {
        id: 'aicoach',
        title: 'AI Coach',
        description:
          'Assistente virtual que analisa seus movimentos via visão computacional.',
        objective:
          'Oferecer correções e sugestões técnicas personalizadas com base na sua performance gravada.',
        stepByStep: [
          'Abra a ferramenta AI Coach.',
          'Grave ou envie o vídeo de um movimento técnico.',
          'Acesse o relatório de postura e pontos de melhoria sugeridos pela IA.',
        ],
        icon: Sparkles,
        color: 'text-cyan-500',
        bgColor: 'bg-cyan-500/10',
        link: '/ai/coach',
      },
    ],
  },
  {
    title: 'Engajamento & Competição',
    items: [
      {
        id: 'arena',
        title: 'Goplay Reality Arena™',
        description:
          'Arena oficial para desafios de habilidades físicas e técnicas.',
        objective:
          'Proporcionar um ambiente competitivo seguro onde usuários participam de desafios e ganham recompensas com base em sua performance.',
        stepByStep: [
          'Acesse o menu Reality Arena.',
          'Escolha um desafio ativo e toque em Participar.',
          'Envie seus dados ou grave seu vídeo de comprovação.',
          'Ative a opção "Publicar resultados automaticamente no Feed Inteligente".',
          'Aguarde a avaliação da IA e da comunidade para subir no ranking!',
        ],
        icon: Shield,
        color: 'text-red-500',
        bgColor: 'bg-red-500/10',
        link: '/arena',
        badge: 'Competitivo',
      },
      {
        id: 'conquista',
        title: 'A Conquista',
        description: 'Sistema avançado de troféus com raridades e recompensas.',
        objective:
          'Módulo gamificado de recompensas desenhado para reconhecer e incentivar ativamente seu engajamento no ecossistema Goplay.',
        stepByStep: [
          'Complete missões (como criar posts ou participar da Arena) para desbloquear conquistas.',
          'Identifique a raridade: Comum, Raro, Épico e Lendário.',
          'Ganhe recompensas valiosas: pontos internos, moeda da plataforma, boost de alcance no feed e badges no perfil.',
          'Acesse a aba "Conquistas" dentro do seu Perfil de Atleta para acompanhar o progresso e visualizar as silhuetas de prêmios bloqueados.',
        ],
        icon: Crown,
        color: 'text-gold',
        bgColor: 'bg-gold/10',
        link: '/profile/me',
        isPremium: true,
      },
    ],
  },
  {
    title: 'Social & Conexão',
    items: [
      {
        id: 'feed',
        title: 'Feed Inteligente',
        description:
          'O coração do app com postagens, atualizações e resultados integrados.',
        objective:
          'Agregar de forma inteligente o conteúdo criado pela comunidade, novidades do esporte e os resultados automatizados gerados pela Arena.',
        stepByStep: [
          'Acesse a Home ou a aba Feed no menu principal.',
          'Acompanhe as publicações dos seus amigos e os resultados gerados automaticamente pelo sistema.',
          'Interaja deixando sua curtida, aplauso ou comentário para impulsionar outros atletas.',
        ],
        icon: LayoutList,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        link: '/feed',
      },
      {
        id: 'stories',
        title: 'Stories',
        description:
          'Momentos efêmeros dos atletas que você segue, disponíveis no topo do Feed.',
        objective:
          'Facilitar o compartilhamento de atualizações rápidas, treinos diários e bastidores do esporte.',
        stepByStep: [
          'Toque na sua foto com sinal de "+" no topo do Feed Inteligente.',
          'Capture uma foto/vídeo na hora ou envie da galeria do dispositivo.',
          'Publique para manter sua base de fãs engajada (o conteúdo expira em 24 horas).',
        ],
        icon: Film,
        color: 'text-pink-500',
        bgColor: 'bg-pink-500/10',
        link: '/feed',
      },
      {
        id: 'profile',
        title: 'Perfil de Atleta',
        description:
          'Seu cartão de visitas esportivo completo e personalizável.',
        objective:
          'Centralizar sua identidade esportiva, estatísticas, histórico de partidas e a sua galeria de Conquistas.',
        stepByStep: [
          'Navegue para o seu Perfil usando o atalho de usuário no menu inferior.',
          'Edite sua biografia, medidas físicas e defina seu esporte principal.',
          'Verifique suas métricas de evolução e acompanhe a aba dedicada às Conquistas.',
        ],
        icon: User,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        link: '/profile/me',
      },
      {
        id: 'messages',
        title: 'Mensagens',
        description: 'Canal direto de comunicação e networking.',
        objective:
          'Conectar atletas, treinadores e recrutadores de forma ágil, privada e totalmente segura.',
        stepByStep: [
          'Abra a caixa de entrada através do ícone de Mensagens.',
          'Selecione um contato existente ou crie um novo chat em grupo para seu time.',
          'Troque mensagens, fotos e utilize o espaço para fechar novos acordos ou partidas.',
        ],
        icon: MessageSquare,
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
        link: '/messages',
      },
    ],
  },
  {
    title: 'Explorar & Oportunidades',
    items: [
      {
        id: 'explore',
        title: 'Explorar',
        description: 'Buscador e diretório avançado do ecossistema Goplay.',
        objective:
          'Ajudar o usuário a encontrar as melhores oportunidades de carreira: talentos (Scouts), bolsas de estudo, agências, eventos e instalações.',
        stepByStep: [
          'Toque no ícone de lupa (Explorar) presente no menu inferior.',
          'Navegue através dos atalhos visuais de categorias.',
          'Use a busca por palavras-chave e aplique filtros de localização ou modalidade.',
        ],
        icon: Search,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        link: '/explore',
      },
      {
        id: 'ranking',
        title: 'Ranking Geral',
        description:
          'Sistema de classificação regional e global estruturado por pontos.',
        objective:
          'Promover a competitividade saudável e destacar os melhores atletas, permitindo comparações justas de performance.',
        stepByStep: [
          'Acesse a tela de Ranking por meio do atalho na Home.',
          'Escolha entre as visualizações Global ou Regional, Semanal ou Mensal.',
          'Confira a sua posição exata e saiba quantos pontos faltam para escalar no placar.',
        ],
        icon: Trophy,
        color: 'text-gold',
        bgColor: 'bg-yellow-500/10',
        link: '/ranking',
      },
      {
        id: 'marketplace',
        title: 'Marketplace',
        description: 'Loja oficial do app com produtos, vestuário e serviços.',
        objective:
          'Oferecer um ambiente seguro e integrado para a aquisição de equipamentos e suplementos, utilizando GoCoins ou moedas tradicionais.',
        stepByStep: [
          'Abra o Marketplace tocando no ícone de sacola no menu principal.',
          'Navegue pelos departamentos ou busque um produto desejado.',
          'Adicione ao carrinho e escolha a forma de pagamento (Saldo interno ou Cartão de Crédito).',
        ],
        icon: ShoppingBag,
        color: 'text-red-500',
        bgColor: 'bg-red-500/10',
        link: '/marketplace',
      },
    ],
  },
]

export default function AppMap() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMap = FEATURE_MAP.map((category) => ({
    ...category,
    items: category.items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.objective.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  })).filter((category) => category.items.length > 0)

  return (
    <div className="min-h-screen bg-background pb-20 animate-in fade-in duration-500">
      <div className="p-6 pb-4 bg-background/95 backdrop-blur-md sticky top-0 z-10 border-b border-border/40 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-primary/10 rounded-xl">
            <Map className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Mapa do App</h1>
            <p className="text-sm text-muted-foreground">
              Guia oficial e diretório de funcionalidades do GoPlay
            </p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar funcionalidade ou objetivo..."
            className="pl-10 bg-secondary/50 border-transparent focus-visible:ring-primary/50 rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-170px)]">
        <div className="px-6 py-6 space-y-10">
          {filteredMap.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground opacity-50" />
              </div>
              <h3 className="font-bold text-lg mb-1">Nada encontrado</h3>
              <p className="text-sm text-muted-foreground">
                Tente buscar com outras palavras-chave.
              </p>
            </div>
          ) : (
            filteredMap.map((category, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-1.5 w-6 bg-primary rounded-full" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    {category.title}
                  </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {category.items.map((item) => (
                    <Card
                      key={item.id}
                      className={cn(
                        'border-border/60 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden relative flex flex-col',
                        item.isPremium
                          ? 'border-gold/40 bg-gradient-to-br from-gold/5 via-background to-background ring-1 ring-gold/20'
                          : 'hover:border-primary/30',
                      )}
                    >
                      {item.isPremium && (
                        <div className="absolute -top-10 -right-10 opacity-[0.05] pointer-events-none rotate-12">
                          <Sparkles className="w-48 h-48 text-gold" />
                        </div>
                      )}

                      <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0 relative z-10">
                        <div className="flex gap-3">
                          <div
                            className={cn(
                              'p-2.5 rounded-lg shrink-0 h-fit transition-transform group-hover:scale-110 duration-300',
                              item.bgColor,
                            )}
                          >
                            <item.icon className={cn('h-5 w-5', item.color)} />
                          </div>
                          <div className="space-y-1">
                            <CardTitle className="text-base font-bold flex flex-wrap items-center gap-2 leading-tight">
                              {item.title}
                              {item.badge && (
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    'text-[10px] h-5 px-1.5 font-bold',
                                    item.isPremium
                                      ? 'border-gold text-gold bg-gold/10'
                                      : 'bg-background/50',
                                  )}
                                >
                                  {item.badge}
                                </Badge>
                              )}
                            </CardTitle>
                            <CardDescription className="text-xs leading-relaxed text-muted-foreground/90">
                              {item.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4 flex-1 flex flex-col relative z-10">
                        <div className="space-y-4 pt-3 border-t border-border/40 flex-1">
                          <div className="bg-secondary/40 rounded-lg p-3">
                            <h4 className="text-[11px] font-black uppercase tracking-wider text-primary mb-1">
                              Objetivo
                            </h4>
                            <p className="text-xs text-foreground/90 leading-relaxed font-medium">
                              {item.objective}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-[11px] font-black uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Passo a Passo
                            </h4>
                            <ul className="text-xs text-muted-foreground leading-relaxed space-y-2 pl-1">
                              {item.stepByStep.map((step, i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="font-bold text-foreground opacity-60 w-3 shrink-0">
                                    {i + 1}.
                                  </span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="pt-2 mt-auto">
                          <Button
                            variant="default"
                            size="sm"
                            className={cn(
                              'w-full justify-between h-10 text-xs font-bold group/btn transition-all',
                              item.isPremium
                                ? 'bg-gold hover:bg-gold/90 text-black shadow-lg shadow-gold/20'
                                : 'bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground',
                            )}
                            onClick={() => navigate(item.link)}
                          >
                            Acessar Funcionalidade
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
