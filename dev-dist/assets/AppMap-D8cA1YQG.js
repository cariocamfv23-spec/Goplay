import { t as Ghost } from "./ghost-L-smyiJc.js";
import { Bn as Sparkles, Cn as cn, Cr as CreditCard, Fn as Target, Gn as Search, H as Badge, Hn as ShoppingBag, Rr as ArrowRight, Tr as Clock, U as ScrollArea, Xn as MessageSquare, cn as Button, cr as History, er as Map, ir as LayoutList, jn as Trophy, jr as Car, kn as User, ri as require_jsx_runtime, ui as useNavigate, vr as Film, wn as Zap } from "./index-DRYwHC8w.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-Y1uCQlH7.js";
var import_jsx_runtime = require_jsx_runtime();
var FEATURE_MAP = [
	{
		title: "Análise Criativa & Performance",
		items: [
			{
				id: "moves",
				title: "GoPlay Moves",
				description: "Feed vertical imersivo para highlights esportivos. Diferente de likes tradicionais, aqui você reage com emojis específicos de cada esporte (⚽, 🏀, 🏆) para avaliar a performance.",
				icon: Zap,
				color: "text-yellow-500",
				bgColor: "bg-yellow-500/10",
				link: "/move",
				badge: "Vertical Feed"
			},
			{
				id: "timeshift",
				title: "Time Shift",
				description: "Módulo independente de análise narrativa visual. Explore três linhas do tempo: \"Real\" (o evento), \"Quase\" (o near-miss), e \"Ideal\" (a execução perfeita). Apresenta estilo visual low-poly/abstrato. Exemplos: Futebol, Artes Marciais, Natação.",
				icon: Clock,
				color: "text-indigo-500",
				bgColor: "bg-indigo-500/10",
				link: "/timeshift",
				badge: "Independent Module"
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
		title: "Social & Conexão",
		items: [
			{
				id: "feed",
				title: "Feed Principal",
				description: "O coração do app. Acompanhe postagens cronológicas, artigos, notícias e atualizações da sua rede esportiva.",
				icon: LayoutList,
				color: "text-blue-500",
				bgColor: "bg-blue-500/10",
				link: "/feed"
			},
			{
				id: "stories",
				title: "Stories",
				description: "Momentos efêmeros dos atletas que você segue, disponíveis no topo do seu Feed.",
				icon: Film,
				color: "text-pink-500",
				bgColor: "bg-pink-500/10",
				link: "/feed"
			},
			{
				id: "profile",
				title: "Perfil de Atleta",
				description: "Seu cartão de visitas esportivo. Exiba suas estatísticas, histórico de partidas, conquistas e portfólio visual.",
				icon: User,
				color: "text-green-500",
				bgColor: "bg-green-500/10",
				link: "/profile/me"
			},
			{
				id: "messages",
				title: "Mensagens",
				description: "Canal direto de comunicação com outros atletas, treinadores e recrutadores.",
				icon: MessageSquare,
				color: "text-orange-500",
				bgColor: "bg-orange-500/10",
				link: "/messages"
			}
		]
	},
	{
		title: "Explorar & Oportunidades",
		items: [
			{
				id: "explore",
				title: "Explorar",
				description: "Ferramenta de busca avançada para encontrar talentos (Scouts), quadras, eventos, academias e profissionais.",
				icon: Search,
				color: "text-emerald-500",
				bgColor: "bg-emerald-500/10",
				link: "/explore"
			},
			{
				id: "ranking",
				title: "Ranking",
				description: "Sistema de classificação global e regional para comparar sua performance com outros atletas.",
				icon: Trophy,
				color: "text-gold",
				bgColor: "bg-yellow-500/10",
				link: "/ranking"
			},
			{
				id: "marketplace",
				title: "Marketplace",
				description: "Loja oficial do app para compra de equipamentos, suplementos e produtos esportivos com GoCoins ou dinheiro.",
				icon: ShoppingBag,
				color: "text-red-500",
				bgColor: "bg-red-500/10",
				link: "/marketplace"
			}
		]
	},
	{
		title: "Utilitários",
		items: [
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
				id: "history",
				title: "Retrospectiva",
				description: "Visualize seus melhores momentos e resumo estatístico anual.",
				icon: History,
				color: "text-fuchsia-500",
				bgColor: "bg-fuchsia-500/10",
				link: "/retrospective"
			}
		]
	}
];
function AppMap() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-6 pb-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-2.5 bg-primary/10 rounded-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "h-6 w-6 text-primary" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold tracking-tight",
					children: "Mapa do App"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Guia completo de funcionalidades do GoPlay"
				})] })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			className: "h-[calc(100vh-140px)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-6 pb-10 space-y-8",
				children: FEATURE_MAP.map((category, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 w-4 bg-primary rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-bold uppercase tracking-wider text-muted-foreground",
							children: category.title
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: category.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border-border/60 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30 group overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
								className: "pb-3 flex flex-row items-start justify-between space-y-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: cn("p-2.5 rounded-lg shrink-0 h-fit transition-transform group-hover:scale-110 duration-300", item.bgColor),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: cn("h-5 w-5", item.color) })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
											className: "text-base font-bold flex items-center gap-2",
											children: [item.title, item.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "outline",
												className: "text-[10px] h-5 px-1.5 font-normal bg-background/50",
												children: item.badge
											})]
										})
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
									className: "text-xs leading-relaxed text-muted-foreground/90",
									children: item.description
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "sm",
									className: "w-full justify-between bg-secondary/30 hover:bg-secondary/60 hover:text-primary group/btn h-9 text-xs",
									onClick: () => navigate(item.link),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: "Ir para Funcionalidade"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3 transition-transform group-hover/btn:translate-x-1" })]
								})]
							})]
						}, item.id))
					})]
				}, idx))
			})
		})]
	});
}
export { AppMap as default };

//# sourceMappingURL=AppMap-D8cA1YQG.js.map