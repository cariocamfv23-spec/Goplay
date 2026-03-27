import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  ArrowRight,
  Sparkles,
  Trophy,
  Users,
  Orbit,
  MessageCircle,
  Medal,
  Calendar,
  Bell,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ManualItem {
  id: string
  title: string
  whatItIs: string
  howToUse: string
  icon: React.ElementType
  color: string
  bgColor: string
  link?: string
  badge?: string
}

interface ManualCategory {
  title: string
  icon: React.ElementType
  items: ManualItem[]
}

const MANUAL_CATEGORIES: ManualCategory[] = [
  {
    title: 'Comunidade & Interação',
    icon: Users,
    items: [
      {
        id: 'nexus',
        title: 'Nexus Hub',
        whatItIs:
          'O centro principal de descoberta de comunidades esportivas no Goplay. Um diretório dinâmico onde você pode navegar por categorias e modalidades (Futebol, Skate, Bike, Surf, Basquete, Tênis, Vôlei) para encontrar pessoas com os mesmos interesses.',
        howToUse:
          'Acesse o menu principal e clique em "Nexus". Use as abas no topo para explorar por esporte (Filtros), visualizar as tribos que você já participa ou conferir o Ranking. Clique em qualquer card de tribo para ver mais detalhes.',
        icon: Orbit,
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
        link: '/nexus',
        badge: 'Novo',
      },
      {
        id: 'tribes',
        title: 'Tribos (Comunidades)',
        whatItIs:
          'Espaços virtuais dedicados para grupos de atletas interagirem, organizarem partidas, discutirem táticas e competirem juntos.',
        howToUse:
          'Para entrar em uma, navegue pelo Nexus e clique em "Solicitar Entrada" (se privada) ou "Entrar na Tribo" (se pública). Para criar a sua, use o botão "Criar Tribo" no topo do Nexus, defina um nome, escolha a modalidade, insira uma descrição e decida o nível de privacidade.',
        icon: Users,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        link: '/nexus',
      },
      {
        id: 'tribe-chat',
        title: 'Chat das Tribos',
        whatItIs:
          'Um canal de comunicação por mensagens instantâneas e em tempo real, exclusivo para os membros aprovados de uma determinada tribo.',
        howToUse:
          'Acesse a página da sua tribo e navegue até a aba "Chat". Use este espaço para combinar horários de jogos, compartilhar arquivos, enviar táticas ou apenas conversar com a sua equipe.',
        icon: MessageSquare,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
      },
      {
        id: 'feed',
        title: 'Feed Principal',
        whatItIs:
          'A linha do tempo central do aplicativo onde aparecem postagens, fotos, vídeos, artigos e notícias da sua rede de conexões.',
        howToUse:
          'Role a tela para ver atualizações. Você pode curtir, comentar e compartilhar publicações. É o melhor lugar para se manter atualizado sobre seus amigos e influenciadores.',
        icon: LayoutList,
        color: 'text-sky-500',
        bgColor: 'bg-sky-500/10',
        link: '/feed',
      },
      {
        id: 'messages',
        title: 'Mensagens Diretas',
        whatItIs:
          'Canal privado para conversas 1 a 1 com outros atletas, treinadores ou olheiros (Scouts).',
        howToUse:
          'Acesse pelo ícone de mensagens no menu inferior. Busque por um usuário ou clique em "Mensagem" diretamente no perfil de alguém para iniciar uma conversa privada.',
        icon: MessageCircle,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        link: '/messages',
      },
    ],
  },
  {
    title: 'Competição & Eventos',
    icon: Trophy,
    items: [
      {
        id: 'tribe-ranking',
        title: 'Ranking de Tribos',
        whatItIs:
          'Um sistema de classificação (Leaderboard) que mede o engajamento, a atividade e a quantidade de eventos organizados pelas comunidades. As tribos Top 3 recebem selos especiais (Dourado, Prata e Bronze).',
        howToUse:
          'Acesse a aba "Ranking" dentro do Nexus. As tribos ganham pontos automaticamente ao agendar eventos, aceitar membros e manter o chat ativo. Ajude sua tribo a subir no placar participando ativamente!',
        icon: Trophy,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/10',
        link: '/nexus',
        badge: 'Competitivo',
      },
      {
        id: 'ranking',
        title: 'Ranking Global Individual',
        whatItIs:
          'Classificação individual que compara o seu desempenho, vitórias e pontuações de desafios com todos os outros atletas do aplicativo.',
        howToUse:
          'Acesse pelo menu principal ou pelo seu perfil. Filtre por "Global", "Desafios" ou "Emocional" para ver sua posição. Participe de desafios diários para acumular pontos (GoCoins) e subir na tabela.',
        icon: Medal,
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/10',
        link: '/ranking',
      },
      {
        id: 'events',
        title: 'Eventos & Campeonatos',
        whatItIs:
          'Partidas, torneios, maratonas ou encontros casuais organizados pelas tribos ou por parceiros oficiais do Goplay.',
        howToUse:
          'Encontre eventos gerais na aba "Explorar" > "Eventos" ou eventos específicos da sua equipe na aba "Eventos" dentro do perfil da Tribo. Clique no evento para ver local, data, confirmar presença e interagir.',
        icon: Calendar,
        color: 'text-red-500',
        bgColor: 'bg-red-500/10',
        link: '/explore/events',
      },
    ],
  },
  {
    title: 'Avisos & Sistema',
    icon: Bell,
    items: [
      {
        id: 'notifications',
        title: 'Central de Notificações (Sino)',
        whatItIs:
          'A central de alertas localizada no topo da tela (ícone de sino). Ela categoriza e organiza todos os eventos importantes que requerem sua atenção no app.',
        howToUse:
          'Clique no sino no menu superior. As notificações incluem:\n• Convites e mensagens de Tribos\n• Alertas de Desafios e Conquistas\n• Alertas Climáticos da Defesa Civil (chuvas, tempestades)\n• Matches de Bolsas de Estudo (Baseado no seu perfil)\n• Notificações de Visitantes VIP (Olheiros e Patrocinadores visualizando seu perfil)\n• Viagens no Tempo (Lembranças de postagens antigas)',
        icon: Bell,
        color: 'text-rose-500',
        bgColor: 'bg-rose-500/10',
        link: '/notifications',
      },
      {
        id: 'explore',
        title: 'Área Explorar (Busca)',
        whatItIs:
          'Ferramenta avançada para encontrar novas oportunidades. Inclui mapas interativos, lista de olheiros (Scouts), quadras parceiras, agências, e profissionais de saúde.',
        howToUse:
          'Acesse o ícone de lupa na navegação inferior. Use os cards coloridos para filtrar exatamente o que você procura, desde "Bolsas de Estudo" até "Nutricionistas".',
        icon: Search,
        color: 'text-indigo-500',
        bgColor: 'bg-indigo-500/10',
        link: '/explore',
      },
    ],
  },
  {
    title: 'Perfil & Ferramentas',
    icon: User,
    items: [
      {
        id: 'profile',
        title: 'Perfil do Usuário',
        whatItIs:
          'O seu currículo digital esportivo. Exibe sua biografia, fotos de capa e perfil, estatísticas gerais, galeria de mídias e as modalidades que você pratica.',
        howToUse:
          'Acesse pelo ícone de usuário no menu principal. Para atualizar seus dados, clique no botão "Editar Perfil" (ou vá em Configurações). Mantenha seus dados atualizados para atrair Scouts e patrocinadores.',
        icon: User,
        color: 'text-blue-600',
        bgColor: 'bg-blue-600/10',
        link: '/profile/me',
      },
      {
        id: 'settings',
        title: 'Configurações',
        whatItIs:
          'O painel de controle da sua conta, onde você ajusta preferências de interface, segurança e notificações.',
        howToUse:
          'Acesse pelo seu Perfil clicando em "Editar" ou pelo menu superior. Aqui você pode alterar o Tema (Claro/Escuro/Cores), ativar Efeitos 3D, ligar o Modo Nostalgia (Filtros Retrô), gerenciar sua privacidade e ajustar quais Alertas Climáticos deseja receber.',
        icon: Settings,
        color: 'text-slate-500',
        bgColor: 'bg-slate-500/10',
        link: '/settings',
      },
      {
        id: 'moves',
        title: 'GoPlay Moves (Vídeos)',
        whatItIs:
          'Um feed vertical imersivo (estilo TikTok/Reels) focado exclusivamente em lances, highlights esportivos e dicas rápidas.',
        howToUse:
          'Clique no ícone de "Raio" na navegação principal. Deslize para cima ou para baixo para trocar de vídeo. Reaja com emojis interativos ou salve seus lances favoritos.',
        icon: Zap,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/10',
        link: '/move',
      },
      {
        id: 'marketplace',
        title: 'Loja Marketplace',
        whatItIs:
          'Loja oficial integrada onde você pode adquirir equipamentos, suplementos e vestuário esportivo.',
        howToUse:
          'Acesse pelo ícone de "Sacola". Você pode pagar suas compras utilizando dinheiro real ou resgatando seus GoCoins ganhos ao completar desafios no app.',
        icon: ShoppingBag,
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
        link: '/marketplace',
      },
      {
        id: 'timeshift',
        title: 'Time Capsule (Retrospectiva)',
        whatItIs:
          'Funcionalidade premium que gera um vídeo narrativo com os seus melhores momentos do ano esportivo, estatísticas e conquistas.',
        howToUse:
          'Acesse através do banner especial no seu Perfil. Escolha um filtro visual (Ex: VHS, 90s) e compartilhe seu vídeo nas redes sociais.',
        icon: Clock,
        color: 'text-teal-500',
        bgColor: 'bg-teal-500/10',
        link: '/retrospective',
      },
      {
        id: 'wallet',
        title: 'Carteira (Wallet)',
        whatItIs:
          'Gerenciador financeiro que consolida seus pagamentos, saldo de GoCoins (pontos) e histórico de transações.',
        howToUse:
          'Acesse pelo menu do perfil no canto superior direito. Verifique seus ganhos por convites (Referral) e gastos no Marketplace.',
        icon: CreditCard,
        color: 'text-zinc-500',
        bgColor: 'bg-zinc-500/10',
        link: '/wallet',
      },
    ],
  },
]

export default function AppMap() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none z-0" />

      {/* Header */}
      <div className="relative z-10 p-6 pb-4">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 shadow-sm backdrop-blur-md">
            <Map className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground drop-shadow-sm">
              Manual GoPlay
            </h1>
            <p className="text-sm font-medium text-muted-foreground mt-1 max-w-[280px]">
              O guia completo e atualizado de todas as funcionalidades do seu
              app.
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-140px)] relative z-10">
        <Accordion
          type="single"
          collapsible
          defaultValue="cat-0"
          className="px-6 pb-12 space-y-4"
        >
          {MANUAL_CATEGORIES.map((category, idx) => (
            <AccordionItem
              key={idx}
              value={`cat-${idx}`}
              className="border border-border/50 rounded-2xl bg-card/60 backdrop-blur-xl overflow-hidden shadow-sm hover:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-secondary/50 group-hover:bg-primary/10 transition-colors">
                    <category.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h2 className="text-lg font-bold tracking-tight text-foreground">
                    {category.title}
                  </h2>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-5 pb-5 pt-2">
                <div className="grid gap-4 md:grid-cols-2">
                  {category.items.map((item) => (
                    <Card
                      key={item.id}
                      className="bg-background/80 backdrop-blur-sm border-border/50 shadow-sm transition-all duration-300 overflow-hidden flex flex-col h-full relative group hover:border-primary/40 hover:shadow-[0_8px_30px_rgba(var(--primary),0.12)]"
                    >
                      <CardHeader className="p-5 pb-4 flex flex-row items-start gap-4 space-y-0 relative z-10">
                        <div
                          className={cn(
                            'p-3 rounded-2xl shrink-0 shadow-sm border border-border/50',
                            item.bgColor,
                          )}
                        >
                          <item.icon className={cn('h-6 w-6', item.color)} />
                        </div>
                        <div className="space-y-1.5 flex-1">
                          <CardTitle className="text-lg font-black leading-tight flex flex-wrap items-center gap-2">
                            {item.title}
                            {item.badge && (
                              <Badge
                                variant="secondary"
                                className="text-[10px] h-5 px-2 font-bold bg-primary/10 text-primary border-primary/20"
                              >
                                <Sparkles className="w-3 h-3 mr-1" />
                                {item.badge}
                              </Badge>
                            )}
                          </CardTitle>
                        </div>
                      </CardHeader>

                      <CardContent className="p-5 pt-0 space-y-4 flex-1 flex flex-col relative z-10">
                        {/* O que é Section */}
                        <div className="space-y-1.5">
                          <h4 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            O que é:
                          </h4>
                          <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                            {item.whatItIs}
                          </p>
                        </div>

                        <div className="w-full h-px bg-border/50" />

                        {/* Como Usar Section */}
                        <div className="space-y-1.5 flex-1">
                          <h4 className="text-xs font-black uppercase tracking-widest text-gold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                            Como usar:
                          </h4>
                          <p className="text-sm leading-relaxed text-muted-foreground font-medium whitespace-pre-line">
                            {item.howToUse}
                          </p>
                        </div>

                        {/* Action Link */}
                        {item.link && (
                          <div className="pt-4 mt-auto">
                            <Button
                              variant="secondary"
                              className="w-full justify-between bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-colors font-bold h-10"
                              onClick={() => navigate(item.link!)}
                            >
                              <span>Acessar {item.title}</span>
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </div>
                        )}
                      </CardContent>

                      {/* Subtle hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 z-0" />
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
