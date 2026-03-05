import { t as Plus } from "./plus-BwA5V9YP.js";
import { F as Badge, Hr as require_jsx_runtime, Mn as Shield, Yr as useNavigate, bn as Trophy, dr as Clock, en as Button, pn as cn, wn as Target } from "./index-DLpyukkZ.js";
import { n as CardContent, t as Card } from "./card-BkRvw9Oy.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-LWnc5QIH.js";
import { t as useArenaStore } from "./useArenaStore-Tg1Mkvam.js";
import { t as ptBR } from "./pt-BR-nlOX6a7W.js";
import { t as formatDistanceToNow } from "./formatDistanceToNow-W4zh3kJA.js";
var import_jsx_runtime = require_jsx_runtime();
function ArenaDashboard() {
	const navigate = useNavigate();
	const { challenges } = useArenaStore();
	const activeChallenges = challenges.filter((c) => c.status === "active");
	const endedChallenges = challenges.filter((c) => c.status === "ended");
	const renderChallenge = (challenge) => {
		const isEnded = challenge.status === "ended";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: cn("overflow-hidden cursor-pointer group mb-4 transition-all hover:border-gold/50 shadow-sm hover:shadow-md", isEnded ? "opacity-80 grayscale-[20%]" : ""),
			onClick: () => navigate(`/arena/${challenge.id}`),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-32 w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: challenge.banner,
						alt: challenge.title,
						className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-3 left-3 right-3 flex items-end justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: cn("mb-1.5 text-[10px] font-bold uppercase tracking-widest border-none", isEnded ? "bg-muted text-muted-foreground" : "bg-gold/90 text-black"),
							children: challenge.type
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-white font-bold leading-tight line-clamp-1",
							children: challenge.title
						})] }), isEnded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "bg-black/60 text-white border-white/20 backdrop-blur-sm",
							children: "Finalizado"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 text-[10px] text-white/90 bg-black/60 backdrop-blur-sm px-2 py-1 rounded",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3 h-3 text-gold" }), formatDistanceToNow(new Date(challenge.endDate), { locale: ptBR })]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "p-3 bg-card/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "w-3.5 h-3.5" }), " IA Avaliada"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-3.5 h-3.5" }), " Ranking + Pontos"]
					})]
				})
			})]
		}, challenge.id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-zinc-950 p-6 text-center border-b border-white/10 relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-12 h-12 text-gold mx-auto mb-3 relative z-10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-black text-white italic tracking-tighter drop-shadow-md relative z-10",
						children: "GOPLAY REALITY ARENA™"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-zinc-400 mt-1 relative z-10",
						children: "O campo de provas digital da nova geração."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "active",
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid w-full grid-cols-2 mb-6 bg-secondary/50 h-11",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "active",
								className: "text-xs font-bold data-[state=active]:bg-background",
								children: "Em Andamento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "ended",
								className: "text-xs font-bold data-[state=active]:bg-background",
								children: "Encerrados"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "active",
							className: "mt-0",
							children: activeChallenges.length > 0 ? activeChallenges.map(renderChallenge) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center py-10 text-muted-foreground border-2 border-dashed border-border/50 rounded-xl",
								children: "Nenhum desafio ativo."
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "ended",
							className: "mt-0",
							children: endedChallenges.length > 0 ? endedChallenges.map(renderChallenge) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center py-10 text-muted-foreground border-2 border-dashed border-border/50 rounded-xl",
								children: "Nenhum desafio encerrado."
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg z-40 bg-gold hover:bg-gold/90 text-black border border-gold/50 animate-in zoom-in",
				onClick: () => navigate("/arena/create"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-6 w-6" })
			})
		]
	});
}
export { ArenaDashboard as default };

//# sourceMappingURL=ArenaDashboard-DeTtOT8w.js.map