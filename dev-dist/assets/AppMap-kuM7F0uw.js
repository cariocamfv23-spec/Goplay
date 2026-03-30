import "./chevron-down-00m86Rqa.js";
import { Bn as ShoppingBag, Cr as Clock, En as User, Hn as Settings, Ir as ArrowRight, Jn as MessageSquare, Kn as Orbit, Pr as Bell, Qn as Map, R as Badge, Rn as Sparkles, Tn as Users, Un as Search, Yn as MessageCircle, Zn as Medal, an as Button, bn as cn, jr as Calendar, kn as Trophy, li as require_jsx_runtime, nr as LayoutList, si as useNavigate, xn as Zap, xr as CreditCard, z as ScrollArea } from "./index-CcX5o6Se.js";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-CpXR7lrW.js";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-BDDFeD4m.js";
var import_jsx_runtime = require_jsx_runtime();
var MANUAL_CATEGORIES = [
	{
		title: "Comunidade & Interação",
		icon: Users,
		items: [
			{
				id: "nexus",
				title: "Nexus Hub",
				whatItIs: "O centro principal de descoberta de comunidades esportivas no Goplay. Um diretório dinâmico onde você pode navegar por categorias e modalidades (Futebol, Skate, Bike, Surf, Basquete, Tênis, Vôlei) para encontrar pessoas com os mesmos interesses.",
				howToUse: "Acesse o menu principal e clique em \"Nexus\". Use as abas no topo para explorar por esporte (Filtros), visualizar as tribos que você já participa ou conferir o Ranking. Clique em qualquer card de tribo para ver mais detalhes.",
				icon: Orbit,
				color: "text-purple-500",
				bgColor: "bg-purple-500/10",
				link: "/nexus",
				badge: "Novo"
			},
			{
				id: "tribes",
				title: "Tribos (Comunidades)",
				whatItIs: "Espaços virtuais dedicados para grupos de atletas interagirem, organizarem partidas, discutirem táticas e competirem juntos.",
				howToUse: "Para entrar em uma, navegue pelo Nexus e clique em \"Solicitar Entrada\" (se privada) ou \"Entrar na Tribo\" (se pública). Para criar a sua, use o botão \"Criar Tribo\" no topo do Nexus, defina um nome, escolha a modalidade, insira uma descrição e decida o nível de privacidade.",
				icon: Users,
				color: "text-blue-500",
				bgColor: "bg-blue-500/10",
				link: "/nexus"
			},
			{
				id: "tribe-chat",
				title: "Chat das Tribos",
				whatItIs: "Um canal de comunicação por mensagens instantâneas e em tempo real, exclusivo para os membros aprovados de uma determinada tribo.",
				howToUse: "Acesse a página da sua tribo e navegue até a aba \"Chat\". Use este espaço para combinar horários de jogos, compartilhar arquivos, enviar táticas ou apenas conversar com a sua equipe.",
				icon: MessageSquare,
				color: "text-green-500",
				bgColor: "bg-green-500/10"
			},
			{
				id: "feed",
				title: "Feed Principal",
				whatItIs: "A linha do tempo central do aplicativo onde aparecem postagens, fotos, vídeos, artigos e notícias da sua rede de conexões.",
				howToUse: "Role a tela para ver atualizações. Você pode curtir, comentar e compartilhar publicações. É o melhor lugar para se manter atualizado sobre seus amigos e influenciadores.",
				icon: LayoutList,
				color: "text-sky-500",
				bgColor: "bg-sky-500/10",
				link: "/feed"
			},
			{
				id: "messages",
				title: "Mensagens Diretas",
				whatItIs: "Canal privado para conversas 1 a 1 com outros atletas, treinadores ou olheiros (Scouts).",
				howToUse: "Acesse pelo ícone de mensagens no menu inferior. Busque por um usuário ou clique em \"Mensagem\" diretamente no perfil de alguém para iniciar uma conversa privada.",
				icon: MessageCircle,
				color: "text-emerald-500",
				bgColor: "bg-emerald-500/10",
				link: "/messages"
			}
		]
	},
	{
		title: "Competição & Eventos",
		icon: Trophy,
		items: [
			{
				id: "tribe-ranking",
				title: "Ranking de Tribos",
				whatItIs: "Um sistema de classificação (Leaderboard) que mede o engajamento, a atividade e a quantidade de eventos organizados pelas comunidades. As tribos Top 3 recebem selos especiais (Dourado, Prata e Bronze).",
				howToUse: "Acesse a aba \"Ranking\" dentro do Nexus. As tribos ganham pontos automaticamente ao agendar eventos, aceitar membros e manter o chat ativo. Ajude sua tribo a subir no placar participando ativamente!",
				icon: Trophy,
				color: "text-yellow-500",
				bgColor: "bg-yellow-500/10",
				link: "/nexus",
				badge: "Competitivo"
			},
			{
				id: "ranking",
				title: "Ranking Global Individual",
				whatItIs: "Classificação individual que compara o seu desempenho, vitórias e pontuações de desafios com todos os outros atletas do aplicativo.",
				howToUse: "Acesse pelo menu principal ou pelo seu perfil. Filtre por \"Global\", \"Desafios\" ou \"Emocional\" para ver sua posição. Participe de desafios diários para acumular pontos (GoCoins) e subir na tabela.",
				icon: Medal,
				color: "text-amber-500",
				bgColor: "bg-amber-500/10",
				link: "/ranking"
			},
			{
				id: "events",
				title: "Eventos & Campeonatos",
				whatItIs: "Partidas, torneios, maratonas ou encontros casuais organizados pelas tribos ou por parceiros oficiais do Goplay.",
				howToUse: "Encontre eventos gerais na aba \"Explorar\" > \"Eventos\" ou eventos específicos da sua equipe na aba \"Eventos\" dentro do perfil da Tribo. Clique no evento para ver local, data, confirmar presença e interagir.",
				icon: Calendar,
				color: "text-red-500",
				bgColor: "bg-red-500/10",
				link: "/explore/events"
			}
		]
	},
	{
		title: "Avisos & Sistema",
		icon: Bell,
		items: [{
			id: "notifications",
			title: "Central de Notificações (Sino)",
			whatItIs: "A central de alertas localizada no topo da tela (ícone de sino). Ela categoriza e organiza todos os eventos importantes que requerem sua atenção no app.",
			howToUse: "Clique no sino no menu superior. As notificações incluem:\n• Convites e mensagens de Tribos\n• Alertas de Desafios e Conquistas\n• Alertas Climáticos da Defesa Civil (chuvas, tempestades)\n• Matches de Bolsas de Estudo (Baseado no seu perfil)\n• Notificações de Visitantes VIP (Olheiros e Patrocinadores visualizando seu perfil)\n• Viagens no Tempo (Lembranças de postagens antigas)",
			icon: Bell,
			color: "text-rose-500",
			bgColor: "bg-rose-500/10",
			link: "/notifications"
		}, {
			id: "explore",
			title: "Área Explorar (Busca)",
			whatItIs: "Ferramenta avançada para encontrar novas oportunidades. Inclui mapas interativos, lista de olheiros (Scouts), quadras parceiras, agências, e profissionais de saúde.",
			howToUse: "Acesse o ícone de lupa na navegação inferior. Use os cards coloridos para filtrar exatamente o que você procura, desde \"Bolsas de Estudo\" até \"Nutricionistas\".",
			icon: Search,
			color: "text-indigo-500",
			bgColor: "bg-indigo-500/10",
			link: "/explore"
		}]
	},
	{
		title: "Perfil & Ferramentas",
		icon: User,
		items: [
			{
				id: "profile",
				title: "Perfil do Usuário",
				whatItIs: "O seu currículo digital esportivo. Exibe sua biografia, fotos de capa e perfil, estatísticas gerais, galeria de mídias e as modalidades que você pratica.",
				howToUse: "Acesse pelo ícone de usuário no menu principal. Para atualizar seus dados, clique no botão \"Editar Perfil\" (ou vá em Configurações). Mantenha seus dados atualizados para atrair Scouts e patrocinadores.",
				icon: User,
				color: "text-blue-600",
				bgColor: "bg-blue-600/10",
				link: "/profile/me"
			},
			{
				id: "settings",
				title: "Configurações",
				whatItIs: "O painel de controle da sua conta, onde você ajusta preferências de interface, segurança e notificações.",
				howToUse: "Acesse pelo seu Perfil clicando em \"Editar\" ou pelo menu superior. Aqui você pode alterar o Tema (Claro/Escuro/Cores), ativar Efeitos 3D, ligar o Modo Nostalgia (Filtros Retrô), gerenciar sua privacidade e ajustar quais Alertas Climáticos deseja receber.",
				icon: Settings,
				color: "text-slate-500",
				bgColor: "bg-slate-500/10",
				link: "/settings"
			},
			{
				id: "moves",
				title: "GoPlay Moves (Vídeos)",
				whatItIs: "Um feed vertical imersivo (estilo TikTok/Reels) focado exclusivamente em lances, highlights esportivos e dicas rápidas.",
				howToUse: "Clique no ícone de \"Raio\" na navegação principal. Deslize para cima ou para baixo para trocar de vídeo. Reaja com emojis interativos ou salve seus lances favoritos.",
				icon: Zap,
				color: "text-yellow-500",
				bgColor: "bg-yellow-500/10",
				link: "/move"
			},
			{
				id: "marketplace",
				title: "Loja Marketplace",
				whatItIs: "Loja oficial integrada onde você pode adquirir equipamentos, suplementos e vestuário esportivo.",
				howToUse: "Acesse pelo ícone de \"Sacola\". Você pode pagar suas compras utilizando dinheiro real ou resgatando seus GoCoins ganhos ao completar desafios no app.",
				icon: ShoppingBag,
				color: "text-orange-500",
				bgColor: "bg-orange-500/10",
				link: "/marketplace"
			},
			{
				id: "timeshift",
				title: "Time Capsule (Retrospectiva)",
				whatItIs: "Funcionalidade premium que gera um vídeo narrativo com os seus melhores momentos do ano esportivo, estatísticas e conquistas.",
				howToUse: "Acesse através do banner especial no seu Perfil. Escolha um filtro visual (Ex: VHS, 90s) e compartilhe seu vídeo nas redes sociais.",
				icon: Clock,
				color: "text-teal-500",
				bgColor: "bg-teal-500/10",
				link: "/retrospective"
			},
			{
				id: "wallet",
				title: "Carteira (Wallet)",
				whatItIs: "Gerenciador financeiro que consolida seus pagamentos, saldo de GoCoins (pontos) e histórico de transações.",
				howToUse: "Acesse pelo menu do perfil no canto superior direito. Verifique seus ganhos por convites (Referral) e gastos no Marketplace.",
				icon: CreditCard,
				color: "text-zinc-500",
				bgColor: "bg-zinc-500/10",
				link: "/wallet"
			}
		]
	}
];
function AppMap() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none z-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 p-6 pb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-3 bg-primary/10 rounded-2xl border border-primary/20 shadow-sm backdrop-blur-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "h-7 w-7 text-primary" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-black tracking-tight text-foreground drop-shadow-sm",
						children: "Manual GoPlay"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-muted-foreground mt-1 max-w-[280px]",
						children: "O guia completo e atualizado de todas as funcionalidades do seu app."
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				className: "h-[calc(100vh-140px)] relative z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
					type: "single",
					collapsible: true,
					defaultValue: "cat-0",
					className: "px-6 pb-12 space-y-4",
					children: MANUAL_CATEGORIES.map((category, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: `cat-${idx}`,
						className: "border border-border/50 rounded-2xl bg-card/60 backdrop-blur-xl overflow-hidden shadow-sm hover:border-primary/30 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "px-5 py-4 hover:no-underline group",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-2 rounded-xl bg-secondary/50 group-hover:bg-primary/10 transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(category.icon, { className: "w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-bold tracking-tight text-foreground",
									children: category.title
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
							className: "px-5 pb-5 pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 md:grid-cols-2",
								children: category.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
									className: "bg-background/80 backdrop-blur-sm border-border/50 shadow-sm transition-all duration-300 overflow-hidden flex flex-col h-full relative group hover:border-primary/40 hover:shadow-[0_8px_30px_rgba(var(--primary),0.12)]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
											className: "p-5 pb-4 flex flex-row items-start gap-4 space-y-0 relative z-10",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: cn("p-3 rounded-2xl shrink-0 shadow-sm border border-border/50", item.bgColor),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: cn("h-6 w-6", item.color) })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "space-y-1.5 flex-1",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
													className: "text-lg font-black leading-tight flex flex-wrap items-center gap-2",
													children: [item.title, item.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
														variant: "secondary",
														className: "text-[10px] h-5 px-2 font-bold bg-primary/10 text-primary border-primary/20",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3 mr-1" }), item.badge]
													})]
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
											className: "p-5 pt-0 space-y-4 flex-1 flex flex-col relative z-10",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
														className: "text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-primary" }), "O que é:"]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm leading-relaxed text-muted-foreground font-medium",
														children: item.whatItIs
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full h-px bg-border/50" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5 flex-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
														className: "text-xs font-black uppercase tracking-widest text-gold flex items-center gap-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-gold" }), "Como usar:"]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm leading-relaxed text-muted-foreground font-medium whitespace-pre-line",
														children: item.howToUse
													})]
												}),
												item.link && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "pt-4 mt-auto",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														variant: "secondary",
														className: "w-full justify-between bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-colors font-bold h-10",
														onClick: () => navigate(item.link),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Acessar ", item.title] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
													})
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 z-0" })
									]
								}, item.id))
							})
						})]
					}, idx))
				})
			})
		]
	});
}
export { AppMap as default };

//# sourceMappingURL=AppMap-kuM7F0uw.js.map