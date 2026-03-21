import { t as Brain } from "./brain-C2W5eYoE.js";
import "./ellipsis-h3-Yg_sJ.js";
import { t as ShareDialog } from "./ShareDialog-Ci8H0yKt.js";
import { t as History } from "./history-DgfXPkGN.js";
import "./mail-Baaf6yux.js";
import "./message-circle-C71hx9nM.js";
import { t as Share2 } from "./share-2-CaFluURX.js";
import { Lr as require_jsx_runtime, M as Badge, Qn as Flag, Sr as Activity, St as mockTimelineEvents, Wr as useNavigate, Xt as Button, _n as Trophy, br as ArrowLeft, dn as Zap, mr as Calendar, qr as require_react, un as cn, vn as TrendingUp, xn as Target, yt as mockStatsHistory } from "./index-CrJ_L4xh.js";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-iVaPJa-g.js";
import "./generateCategoricalChart--OGmpkwm.js";
import "./CartesianGrid-CeWT4nuz.js";
import "./AreaChart-D_ExPji5.js";
import "./chart-D7K6Goa2.js";
import { t as StatsHistoryChart } from "./StatsHistoryChart-D27kUk_Y.js";
import { t as useGoalStore } from "./useGoalStore-CoOjIQsM.js";
import { t as ptBR } from "./pt-BR-CBXq7Qr9.js";
import { t as format } from "./format-i6mS7Us4.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function EvolutionTimeline() {
	const navigate = useNavigate();
	const { goals } = useGoalStore();
	const [shareOpen, setShareOpen] = (0, import_react.useState)(false);
	const [shareContent, setShareContent] = (0, import_react.useState)({
		title: "",
		description: ""
	});
	const goalEvents = goals.map((goal) => ({
		id: `goal-${goal.id}`,
		date: format(new Date(goal.createdAt), "dd MMM", { locale: ptBR }),
		fullDate: format(new Date(goal.createdAt), "dd MMMM, yyyy", { locale: ptBR }),
		type: goal.status === "completed" ? "achievement" : "milestone",
		title: goal.status === "completed" ? `Meta Alcançada: ${goal.title}` : `Nova Meta: ${goal.title}`,
		description: `Objetivo: Atingir ${goal.targetValue} ${goal.unit} em ${goal.metric}.`,
		stats: [{
			label: "Progresso",
			value: `${goal.progress}%`
		}]
	}));
	const allEvents = [...mockTimelineEvents, ...goalEvents].sort((a, b) => {
		if (a.date === "Hoje") return -1;
		if (b.date === "Hoje") return 1;
		if (a.date === "Ontem") return -1;
		if (b.date === "Ontem") return 1;
		return 0;
	});
	const getEventIcon = (type) => {
		switch (type) {
			case "match": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-5 w-5 text-green-500" });
			case "training": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5 text-orange-500" });
			case "ai_insight": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-5 w-5 text-purple-500" });
			case "achievement": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-5 w-5 text-gold" });
			case "milestone": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "h-5 w-5 text-blue-500" });
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5 text-muted-foreground" });
		}
	};
	const getEventColor = (type) => {
		switch (type) {
			case "match": return "border-green-500/20 bg-green-500/5";
			case "training": return "border-orange-500/20 bg-orange-500/5";
			case "ai_insight": return "border-purple-500/20 bg-purple-500/5";
			case "achievement": return "border-gold/30 bg-gold/5";
			case "milestone": return "border-blue-500/20 bg-blue-500/5";
			default: return "border-border bg-card";
		}
	};
	const handleShareEvent = (event) => {
		setShareContent({
			title: event.title,
			description: event.description
		});
		setShareOpen(true);
	};
	const handleShareTimeline = () => {
		setShareContent({
			title: "Minha Jornada no Goplay",
			description: `Confira minha evolução no Goplay! Já completei ${allEvents.length} atividades e conquistas.`
		});
		setShareOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 bg-background/80 backdrop-blur-md z-20 p-4 border-b border-border/50 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => navigate(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-xl font-bold flex items-center gap-2",
						children: ["Linha do Tempo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-4 w-4 text-primary" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Sua jornada esportiva"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: handleShareTimeline,
						className: "text-primary hover:text-primary/80 hover:bg-primary/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => navigate("/goals"),
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-4 w-4" }), "Metas"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 max-w-2xl mx-auto space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "bg-secondary/20 border-border/50 shadow-sm overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						className: "pb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							className: "text-sm font-medium flex items-center gap-2 text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" }), " Evolução de Rating"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "p-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[200px] w-full px-2 pb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsHistoryChart, { data: mockStatsHistory })
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative pl-6 space-y-8 before:absolute before:inset-y-0 before:left-2 before:w-[2px] before:bg-gradient-to-b before:from-primary/50 before:via-border before:to-transparent",
					children: [allEvents.map((event, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative animate-in slide-in-from-bottom-4 duration-700",
						style: { animationDelay: `${index * 100}ms` },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute -left-[25px] top-4 h-4 w-4 rounded-full bg-background border-2 border-primary ring-4 ring-background flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-1.5 rounded-full bg-primary" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "outline",
										className: "text-[10px] font-normal h-5 border-border bg-background/50 backdrop-blur-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3 mr-1 opacity-70" }), event.fullDate]
									}),
									event.type === "achievement" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "default",
										className: "text-[10px] bg-gold text-black hover:bg-gold/90 h-5 border-0",
										children: "Conquista"
									}),
									event.type === "milestone" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "text-[10px] h-5",
										children: "Marco Histórico"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: cn("overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/30 group relative", getEventColor(event.type)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("w-1 shrink-0", event.type === "match" && "bg-green-500", event.type === "training" && "bg-orange-500", event.type === "ai_insight" && "bg-purple-500", event.type === "achievement" && "bg-gold", event.type === "milestone" && "bg-blue-500") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										className: "p-4 flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "icon",
													variant: "ghost",
													className: "h-8 w-8 rounded-full bg-background/50 hover:bg-background shadow-sm backdrop-blur-sm",
													onClick: (e) => {
														e.stopPropagation();
														handleShareEvent(event);
													},
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4 text-muted-foreground hover:text-primary" })
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-1 p-2 rounded-full bg-background shadow-sm shrink-0",
													children: getEventIcon(event.type)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-1 min-w-0",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
															className: "font-bold text-base leading-tight group-hover:text-primary transition-colors pr-6",
															children: event.title
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-sm text-muted-foreground mt-1 leading-relaxed",
															children: event.description
														}),
														event.stats && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/10",
															children: event.stats.map((stat, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex flex-col px-2 py-1 rounded bg-background/50 border border-border/10",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[10px] text-muted-foreground uppercase font-bold tracking-wider",
																	children: stat.label
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-xs font-bold font-mono",
																	children: stat.value
																})]
															}, i))
														})
													]
												})]
											}),
											event.image && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-4 rounded-lg overflow-hidden relative aspect-video shadow-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: event.image,
													alt: event.title,
													className: "w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" })]
											})
										]
									})]
								})
							})
						]
					}, event.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative pt-8 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-[25px] top-10 h-4 w-4 rounded-full bg-muted border-2 border-muted-foreground flex items-center justify-center" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted-foreground italic ml-1",
							children: "Início da jornada no Goplay"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareDialog, {
				open: shareOpen,
				onOpenChange: setShareOpen,
				title: shareContent.title,
				description: shareContent.description
			})
		]
	});
}
export { EvolutionTimeline as default };

//# sourceMappingURL=EvolutionTimeline-CPiJIskP.js.map