import "./chevron-down-fe431DPv.js";
import { t as Funnel } from "./funnel-cBcHnT8l.js";
import { t as Ghost } from "./ghost-BTp4NURP.js";
import { $n as Medal, Bn as Sparkles, Cn as cn, Cr as CreditCard, Fn as Target, Gn as Search, H as Badge, Hn as ShoppingBag, Jn as Orbit, Nr as Calendar, On as Users, Rr as ArrowRight, Tr as Clock, U as ScrollArea, Xn as MessageSquare, Zn as MessageCircle, er as Map, ir as LayoutList, jn as Trophy, jr as Car, kn as User, ri as require_jsx_runtime, ui as useNavigate, wn as Zap } from "./index-BRczRGrK.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CKtk88cD.js";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-CyEgApN1.js";
var import_jsx_runtime = require_jsx_runtime();
var FEATURE_MAP = [
	{
		title: "Comunidade",
		items: [
			{
				id: "nexus",
				title: "Nexus Hub",
				description: "Centro principal de descoberta de comunidades. Encontre sua tribo ideal com base nos seus esportes favoritos.",
				icon: Orbit,
				color: "text-purple-500",
				bgColor: "bg-purple-500/10",
				link: "/nexus",
				badge: "Novo"
			},
			{
				id: "tribes",
				title: "Tribos (Tribes)",
				description: "Comunidades exclusivas para atletas. Participe, crie eventos e interaja com pessoas que compartilham sua paixão.",
				icon: Users,
				color: "text-blue-500",
				bgColor: "bg-blue-500/10",
				link: "/nexus"
			},
			{
				id: "tribe-filters",
				title: "Filtros de Modalidades",
				description: "Explore as tribos facilmente utilizando filtros por esportes como Futebol, Skate, Bike, Surf, Basquete e Tênis.",
				icon: Funnel,
				color: "text-orange-500",
				bgColor: "bg-orange-500/10",
				link: "/nexus"
			}
		]
	},
	{
		title: "Interação",
		items: [
			{
				id: "tribe-chat",
				title: "Chat em Tempo Real",
				description: "Sistema de mensagens instantâneas dentro das tribos. Combine jogos, troque ideias e envie arquivos.",
				icon: MessageSquare,
				color: "text-green-500",
				bgColor: "bg-green-500/10",
				link: "/nexus"
			},
			{
				id: "feed",
				title: "Feed Principal",
				description: "O coração do app. Acompanhe postagens, artigos, notícias e atualizações da sua rede esportiva cronologicamente.",
				icon: LayoutList,
				color: "text-blue-500",
				bgColor: "bg-blue-500/10",
				link: "/feed"
			},
			{
				id: "messages",
				title: "Mensagens Diretas",
				description: "Canal direto de comunicação privada com outros atletas, treinadores e recrutadores (scouts).",
				icon: MessageCircle,
				color: "text-emerald-500",
				bgColor: "bg-emerald-500/10",
				link: "/messages"
			}
		]
	},
	{
		title: "Competição",
		items: [
			{
				id: "tribe-ranking",
				title: "Ranking de Tribos",
				description: "Acompanhe a classificação (Leaderboard) das comunidades mais ativas e que mais organizam eventos.",
				icon: Trophy,
				color: "text-yellow-500",
				bgColor: "bg-yellow-500/10",
				link: "/nexus",
				badge: "Leaderboard"
			},
			{
				id: "ranking",
				title: "Ranking Global",
				description: "Sistema de classificação global e regional para comparar sua performance individual com outros atletas.",
				icon: Medal,
				color: "text-amber-500",
				bgColor: "bg-amber-500/10",
				link: "/ranking"
			},
			{
				id: "explore-events",
				title: "Eventos & Campeonatos",
				description: "Encontre competições, maratonas, torneios de diversas modalidades próximos a você.",
				icon: Calendar,
				color: "text-red-500",
				bgColor: "bg-red-500/10",
				link: "/explore/events"
			}
		]
	},
	{
		title: "Análise & Performance",
		items: [
			{
				id: "moves",
				title: "GoPlay Moves",
				description: "Feed vertical imersivo para highlights esportivos. Reaja com emojis específicos de cada esporte (⚽, 🏀, 🏆).",
				icon: Zap,
				color: "text-yellow-500",
				bgColor: "bg-yellow-500/10",
				link: "/move"
			},
			{
				id: "timeshift",
				title: "Time Shift",
				description: "Módulo de análise narrativa visual com três linhas do tempo: \"Real\", \"Quase\" e \"Ideal\".",
				icon: Clock,
				color: "text-indigo-500",
				bgColor: "bg-indigo-500/10",
				link: "/timeshift"
			},
			{
				id: "ghostplay",
				title: "Replay 3D (Ghost)",
				description: "Transforme vídeos 2D comuns em experiências 3D imersivas para análise de técnica e posicionamento.",
				icon: Ghost,
				color: "text-purple-500",
				bgColor: "bg-purple-500/10",
				link: "/ai/ghost-play"
			},
			{
				id: "aicoach",
				title: "AI Coach",
				description: "Assistente virtual que analisa seus movimentos via visão computacional e sugere melhorias técnicas.",
				icon: Sparkles,
				color: "text-cyan-500",
				bgColor: "bg-cyan-500/10",
				link: "/ai/coach"
			}
		]
	},
	{
		title: "Explorar & Oportunidades",
		items: [{
			id: "explore",
			title: "Busca de Talentos",
			description: "Ferramenta de busca avançada para encontrar talentos (Scouts), quadras, academias e profissionais.",
			icon: Search,
			color: "text-emerald-500",
			bgColor: "bg-emerald-500/10",
			link: "/explore"
		}, {
			id: "marketplace",
			title: "Marketplace",
			description: "Loja oficial do app para compra de equipamentos e suplementos com GoCoins ou dinheiro.",
			icon: ShoppingBag,
			color: "text-rose-500",
			bgColor: "bg-rose-500/10",
			link: "/marketplace"
		}]
	},
	{
		title: "Perfil & Utilitários",
		items: [
			{
				id: "profile",
				title: "Perfil do Atleta",
				description: "Seu cartão de visitas esportivo. Exiba estatísticas, histórico de partidas e portfólio visual.",
				icon: User,
				color: "text-green-500",
				bgColor: "bg-green-500/10",
				link: "/profile/me"
			},
			{
				id: "passport",
				title: "Passaporte Esportivo",
				description: "Identidade digital verificada do atleta, contendo certificações e validações oficiais.",
				icon: Target,
				color: "text-blue-600",
				bgColor: "bg-blue-600/10",
				link: "/profile/passport"
			},
			{
				id: "wallet",
				title: "Carteira (Wallet)",
				description: "Gerencie seus pagamentos, saldo de GoCoins e histórico de transações financeiras.",
				icon: CreditCard,
				color: "text-slate-500",
				bgColor: "bg-slate-500/10",
				link: "/wallet"
			},
			{
				id: "driver",
				title: "GoPlay Driver",
				description: "Serviço de transporte especializado para atletas e equipes, com espaço para equipamentos esportivos.",
				icon: Car,
				color: "text-zinc-500",
				bgColor: "bg-zinc-500/10",
				link: "/driver/dashboard"
			}
		]
	}
];
function AppMap() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 p-6 pb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-2.5 bg-primary/10 rounded-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "h-6 w-6 text-primary" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-black tracking-tight text-foreground",
						children: "Mapa do App"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-muted-foreground mt-0.5",
						children: "Guia completo de funcionalidades do GoPlay"
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				className: "h-[calc(100vh-140px)] relative z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
					type: "single",
					collapsible: true,
					defaultValue: "cat-0",
					className: "px-6 pb-10 space-y-4",
					children: FEATURE_MAP.map((category, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: `cat-${idx}`,
						className: "border border-border/50 rounded-2xl bg-card/60 backdrop-blur-md overflow-hidden shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "px-5 py-4 hover:no-underline hover:bg-secondary/40 transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-1.5 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-bold tracking-tight text-foreground",
									children: category.title
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
							className: "px-5 pb-5 pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 md:grid-cols-2",
								children: category.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
									onClick: () => navigate(item.link),
									className: "bg-background/80 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)] hover:border-primary/40 transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col h-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
										className: "pb-3 flex flex-row items-start justify-between space-y-0 flex-none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: cn("p-2.5 rounded-xl shrink-0 h-fit transition-transform group-hover:scale-110 duration-300 shadow-sm", item.bgColor),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: cn("h-5 w-5", item.color) })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "space-y-1",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
													className: "text-[15px] font-bold flex flex-wrap items-center gap-2 leading-tight",
													children: [item.title, item.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														variant: "outline",
														className: "text-[10px] h-5 px-1.5 font-bold bg-background/50 text-primary border-primary/30",
														children: item.badge
													})]
												})
											})]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										className: "space-y-4 flex-1 flex flex-col justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
											className: "text-xs leading-relaxed text-muted-foreground/90 font-medium",
											children: item.description
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors pt-2 border-t border-border/50 mt-auto",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Acessar funcionalidade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" })]
										})]
									})]
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

//# sourceMappingURL=AppMap-DcBQF_sN.js.map