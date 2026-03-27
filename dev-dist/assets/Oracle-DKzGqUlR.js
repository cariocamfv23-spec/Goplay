import { t as Brain } from "./brain-Dad7USuR.js";
import { An as TrendingUp, Jn as MessageSquare, Ln as Star, Lr as ArrowLeft, Nn as Target, R as Badge, Rn as Sparkles, Un as Search, an as Button, ci as useNavigate, ti as require_jsx_runtime, z as ScrollArea } from "./index-6JQDnUMD.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DhZ0yNdb.js";
import { t as Input } from "./input-BKsLG-X6.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CvYUjwbp.js";
import { N as ResponsiveContainer, n as YAxis, r as XAxis } from "./generateCategoricalChart-CwL9W2Vu.js";
import { n as Area, t as AreaChart } from "./AreaChart-OsUAiyKs.js";
import { n as ChartTooltip, r as ChartTooltipContent, t as ChartContainer } from "./chart-ByomxyOq.js";
var import_jsx_runtime = require_jsx_runtime();
var MOCK_ORACLE_DATA = {
	potentialIndex: 92,
	predictedPosition: "Atacante de Elite",
	futureSkills: [
		{
			name: "Visão de Jogo",
			current: 75,
			projected: 90
		},
		{
			name: "Finalização",
			current: 80,
			projected: 95
		},
		{
			name: "Físico",
			current: 70,
			projected: 85
		}
	],
	marketValueHistory: [
		{
			year: "2022",
			value: 1e3
		},
		{
			year: "2023",
			value: 2500
		},
		{
			year: "2024",
			value: 5e3
		},
		{
			year: "2025",
			value: 12e3
		},
		{
			year: "2026",
			value: 25e3
		}
	],
	comparisonData: [
		{
			subject: "Téc",
			A: 80,
			fullMark: 100
		},
		{
			subject: "Tát",
			A: 70,
			fullMark: 100
		},
		{
			subject: "Fís",
			A: 85,
			fullMark: 100
		},
		{
			subject: "Men",
			A: 65,
			fullMark: 100
		}
	]
};
function Oracle() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-56 bg-gradient-to-br from-indigo-900 via-purple-900 to-background p-6 flex flex-col justify-between overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => navigate(-1),
						className: "text-white hover:bg-white/10 rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-6 w-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs text-gold font-bold flex items-center gap-2 shadow-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 animate-pulse" }), " PREVISÃO 2026"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative z-10 mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3 bg-primary/20 rounded-xl border border-primary/30 backdrop-blur-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-8 w-8 text-primary-foreground" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-black text-white tracking-tight",
							children: "Oráculo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-indigo-200 text-sm font-medium",
							children: "IA Preditiva de Carreira"
						})] })]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-4 -mt-8 relative z-20 space-y-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "overview",
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "w-full grid grid-cols-3 h-12 bg-background/95 backdrop-blur-md border border-border/50 shadow-sm rounded-xl p-1 mb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "overview",
								className: "rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
								children: "Visão Geral"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "career",
								className: "rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
								children: "Carreira"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "advisor",
								className: "rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
								children: "Advisor"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "overview",
						className: "space-y-4 animate-in slide-in-from-bottom-4 duration-500",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "border-none shadow-lg bg-card border-border/50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "p-6 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground font-medium uppercase tracking-wider",
											children: "Índice de Potencial"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-5xl font-black text-primary mt-2 tracking-tighter",
											children: [MOCK_ORACLE_DATA.potentialIndex, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-2xl text-muted-foreground/50 font-normal ml-1",
												children: "/100"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: "mt-2 bg-primary/10 text-primary border-primary/20",
											children: "Top 5% da sua categoria"
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "h-24 w-24 rounded-full border-8 border-primary/10 flex items-center justify-center relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 border-8 border-primary border-t-transparent rounded-full animate-[spin_3s_linear_infinite]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-8 w-8 text-primary" })]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "bg-gradient-to-r from-violet-600 to-indigo-600 border-none text-white shadow-lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									className: "p-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-2 bg-white/20 rounded-lg backdrop-blur-sm",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-6 w-6 text-white" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-bold text-lg text-white",
											children: "Sugestão do Oráculo"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-indigo-100 mt-1 leading-relaxed",
											children: [
												"Para atingir seu potencial máximo como",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-white underline decoration-gold underline-offset-2",
													children: MOCK_ORACLE_DATA.predictedPosition
												}),
												", foque em melhorar sua",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold",
													children: "visão de jogo"
												}),
												" nos próximos 3 meses."
											]
										})] })]
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-bold flex items-center gap-2 px-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-5 w-5 text-gold" }), " Projeção de Skills"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-3",
									children: MOCK_ORACLE_DATA.futureSkills.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
										className: "overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-shadow",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-4 flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold text-sm",
												children: skill.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 mt-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs text-muted-foreground",
													children: ["Atual: ", skill.current]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs text-primary font-bold",
													children: ["→ ", skill.projected]
												})]
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 font-bold text-xs",
												children: ["+", skill.projected - skill.current]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-1 bg-secondary w-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full bg-primary transition-all duration-1000 ease-out",
												style: { width: `${skill.projected / 100 * 100}%` }
											})
										})]
									}, skill.name))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "career",
						className: "space-y-6 animate-in slide-in-from-bottom-4 duration-500",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							className: "text-base flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-green-500" }), " Valor de Mercado (Projeção)"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Evolução estimada em pontos GoPlay" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[250px] w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
								config: { value: {
									label: "Valor",
									color: "hsl(var(--primary))"
								} },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
										data: MOCK_ORACLE_DATA.marketValueHistory,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
												id: "colorValue",
												x1: "0",
												y1: "0",
												x2: "0",
												y2: "1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "5%",
													stopColor: "var(--color-value)",
													stopOpacity: .8
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "95%",
													stopColor: "var(--color-value)",
													stopOpacity: 0
												})]
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "year",
												axisLine: false,
												tickLine: false,
												fontSize: 12
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { hide: true }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
												type: "monotone",
												dataKey: "value",
												stroke: "var(--color-value)",
												fillOpacity: 1,
												fill: "url(#colorValue)",
												strokeWidth: 3
											})
										]
									})
								})
							})
						}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "bg-primary/5 border-primary/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "p-4 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-3xl font-bold text-primary mb-1",
										children: "2026"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground uppercase tracking-wide",
										children: "Ano do Pico"
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "bg-green-500/5 border-green-500/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "p-4 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-3xl font-bold text-green-600 mb-1",
										children: "25k"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground uppercase tracking-wide",
										children: "Pontos Projetados"
									})]
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "advisor",
						className: "h-[500px] flex flex-col animate-in slide-in-from-bottom-4 duration-500",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "flex-1 flex flex-col border-border/50 shadow-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									className: "border-b pb-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
										className: "text-sm font-medium flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4 text-primary" }), " Chat com Oráculo"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									className: "flex-1 p-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
										className: "h-[350px] p-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "bg-secondary rounded-2xl rounded-tl-none p-3 text-sm",
														children: "Olá! Sou sua IA de carreira. Pergunte-me sobre suas chances de bolsa ou como melhorar seu passe."
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex gap-3 flex-row-reverse",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs font-bold",
															children: "EU"
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "bg-primary text-primary-foreground rounded-2xl rounded-tr-none p-3 text-sm",
														children: "Quais minhas chances de jogar na Europa?"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "bg-secondary rounded-2xl rounded-tl-none p-3 text-sm",
														children: [
															"Com base na sua evolução atual (85% de melhoria física), suas chances aumentaram para",
															" ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-bold text-primary",
																children: "High Potential"
															}),
															". Recomendo focar em agências listadas na aba 'Explorar'."
														]
													})]
												})
											]
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-3 border-t bg-secondary/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Faça uma pergunta...",
											className: "pr-10"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											className: "absolute right-0 top-0 h-full text-primary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" })
										})]
									})
								})
							]
						})
					})
				]
			})
		})]
	});
}
export { Oracle as default };

//# sourceMappingURL=Oracle-DKzGqUlR.js.map