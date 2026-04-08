import { t as Brain } from "./brain-C7jPIec8.js";
import { t as Download } from "./download-CAtM4I4Z.js";
import { t as Share2 } from "./share-2-BQer0HSR.js";
import { An as TrendingUp, Dt as mockStatsHistory, Er as ChevronRight, Lr as ArrowLeft, Nn as Target, R as Badge, an as Button, li as require_jsx_runtime, si as useNavigate } from "./index-DSkLZQ3h.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CZ6p3TgF.js";
import { t as Progress } from "./progress-CiAmUyh0.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-B7M4dbLk.js";
import "./generateCategoricalChart-Bn58KSXu.js";
import { t as StatsRadarChart } from "./StatsRadarChart-BPnzhChT.js";
import "./CartesianGrid-BwXi9qL4.js";
import "./AreaChart-Bny7_LNH.js";
import "./chart-B9MpiG8S.js";
import { t as StatsHistoryChart } from "./StatsHistoryChart-CkyhNYIY.js";
import { t as useGoalStore } from "./useGoalStore-Dx0ok-bh.js";
var import_jsx_runtime = require_jsx_runtime();
var mockSkills = [
	{
		label: "Velocidade",
		value: 85,
		max: 100,
		unit: "%"
	},
	{
		label: "Força",
		value: 72,
		max: 100,
		unit: "%"
	},
	{
		label: "Resistência",
		value: 90,
		max: 100,
		unit: "%"
	},
	{
		label: "Técnica",
		value: 65,
		max: 100,
		unit: "%"
	},
	{
		label: "Tática",
		value: 78,
		max: 100,
		unit: "%"
	},
	{
		label: "Mental",
		value: 88,
		max: 100,
		unit: "%"
	}
];
function PerformanceReports() {
	const navigate = useNavigate();
	const { goals } = useGoalStore();
	const activeGoals = goals.filter((g) => g.status === "active");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 bg-background/80 backdrop-blur-md z-20 p-4 border-b border-border/50 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => navigate(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold",
					children: "Relatório de Performance"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Atualizado hoje"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-5 w-5" })
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-6 max-w-4xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "bg-primary/5 border-primary/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4 flex flex-col items-center text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground uppercase font-bold mb-1",
									children: "Score Geral"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-4xl font-black text-primary",
									children: "82"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "mt-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 border-0",
									children: "+4.5% este mês"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "bg-secondary/50 border-border/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4 flex flex-col items-center text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground uppercase font-bold mb-1",
									children: "Treinos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-4xl font-black text-foreground",
									children: "14"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground mt-2",
									children: "Sessões concluídas"
								})
							]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "bg-card border-border/50 hover:border-primary/50 transition-colors cursor-pointer group",
					onClick: () => navigate("/goals"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-primary/10 p-1.5 rounded-md text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold text-sm",
									children: "Metas Ativas"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" })]
						}), activeGoals.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [activeGoals.slice(0, 2).map((goal) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: goal.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: [goal.progress, "%"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
									value: goal.progress,
									className: "h-1.5"
								})]
							}, goal.id)), activeGoals.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-center text-muted-foreground pt-1",
								children: [
									"+ ",
									activeGoals.length - 2,
									" outras metas"
								]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Nenhuma meta ativa. Clique para definir."
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "history",
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid w-full grid-cols-2 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "history",
								children: "Evolução"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "skills",
								children: "Habilidades"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "history",
							className: "space-y-4 animate-in fade-in slide-in-from-bottom-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								className: "text-lg flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-primary" }), "Histórico de Performance"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Evolução do seu score técnico nos últimos 6 meses." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[300px] w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsHistoryChart, { data: mockStatsHistory })
							}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								className: "text-base flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-5 w-5 text-purple-500" }), "Insights do AI Coach"]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-secondary/30 p-4 rounded-lg text-sm",
									children: "\"Notei uma melhora significativa na sua consistência. Seus últimos 3 treinos mantiveram uma intensidade constante. Continue assim!\""
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-secondary/30 p-4 rounded-lg text-sm",
									children: "\"Sua recuperação entre séries está ótima. Considere aumentar a carga em 5% na próxima sessão de força.\""
								})]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "skills",
							className: "space-y-4 animate-in fade-in slide-in-from-bottom-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								className: "text-lg flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-5 w-5 text-primary" }), "Radar de Competências"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Análise comparativa das suas principais valências." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[300px] w-full flex items-center justify-center -ml-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsRadarChart, { stats: mockSkills })
							}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid md:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
									className: "border-l-4 border-l-green-500",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
										className: "pb-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
											className: "text-base font-bold text-green-500",
											children: "Pontos Fortes"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										className: "text-sm space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-foreground",
												children: "Resistência:"
											}),
											" ",
											"Seu condicionamento está 15% acima da média para sua categoria."
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-foreground",
												children: "Mental:"
											}),
											" ",
											"Excelente foco e consistência durante séries longas."
										] })]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
									className: "border-l-4 border-l-yellow-500",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
										className: "pb-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
											className: "text-base font-bold text-yellow-500",
											children: "A Desenvolver"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										className: "text-sm space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-foreground",
												children: "Técnica:"
											}),
											" ",
											"Detectamos instabilidade no joelho esquerdo em agachamentos."
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-foreground",
												children: "Força:"
											}),
											" ",
											"Potência de explosão pode ser melhorada com pliometria."
										] })]
									})]
								})]
							})]
						})
					]
				})
			]
		})]
	});
}
export { PerformanceReports as default };

//# sourceMappingURL=PerformanceReports-CpM3aI_6.js.map