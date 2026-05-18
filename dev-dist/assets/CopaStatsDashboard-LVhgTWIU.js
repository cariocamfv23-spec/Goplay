import { t as ChevronDown } from "./chevron-down-CUmd2JzX.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DwULIAWz.js";
import { En as Users, R as Badge, Rn as Star, Vr as Activity, jn as TrendingUp, mi as require_react, on as Button, ri as require_jsx_runtime, ui as useNavigate, xn as cn, yi as __toESM, zr as ArrowLeft } from "./index-YaFpIL4v.js";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-DVIU2b66.js";
import { i as Root, n as CollapsibleTrigger$1, t as CollapsibleContent$1 } from "./dist-DyuVZ_Cm.js";
import { M as Cell, f as Bar, n as YAxis, r as XAxis } from "./generateCategoricalChart-CUZBlbpf.js";
import { i as PolarGrid, n as Radar, r as PolarAngleAxis, t as RadarChart } from "./RadarChart-murgS1wZ.js";
import { t as BarChart } from "./BarChart-DWvWQZev.js";
import { n as ChartTooltip, r as ChartTooltipContent, t as ChartContainer } from "./chart-DYPQI-1U.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var Collapsible = Root;
var CollapsibleTrigger = CollapsibleTrigger$1;
var CollapsibleContent = CollapsibleContent$1;
var import_jsx_runtime = require_jsx_runtime();
var TEAMS = [
	{
		id: "br",
		name: "Brazil",
		probability: 18.5,
		strength: 94,
		athleteLevel: 96,
		stats: {
			Tactical: 88,
			Physical: 90,
			Mental: 85,
			Technical: 98,
			Speed: 92
		},
		keyPlayers: [
			"Vini Jr.",
			"Rodrygo",
			"Endrick"
		],
		description: "The quintessence of football flair. High technical ability and attacking power.",
		color: "#009c3b"
	},
	{
		id: "fr",
		name: "France",
		probability: 17.2,
		strength: 95,
		athleteLevel: 94,
		stats: {
			Tactical: 90,
			Physical: 95,
			Mental: 88,
			Technical: 92,
			Speed: 94
		},
		keyPlayers: ["Mbappé\", \"Griezmann\", \"Camavinga"],
		description: "A powerhouse of athleticism and tactical discipline, with explosive forwards.",
		color: "#002395"
	},
	{
		id: "ar",
		name: "Argentina",
		probability: 15.8,
		strength: 92,
		athleteLevel: 91,
		stats: {
			Tactical: 92,
			Physical: 85,
			Mental: 95,
			Technical: 90,
			Speed: 84
		},
		keyPlayers: [
			"Messi",
			"Alvarez",
			"Mac Allister"
		],
		description: "Reigning champions with unparalleled team cohesion and mental resilience.",
		color: "#74acdf"
	},
	{
		id: "en",
		name: "England",
		probability: 14,
		strength: 90,
		athleteLevel: 92,
		stats: {
			Tactical: 87,
			Physical: 88,
			Mental: 82,
			Technical: 89,
			Speed: 90
		},
		keyPlayers: [
			"Bellingham",
			"Kane",
			"Saka"
		],
		description: "A golden generation blending youthful energy with experienced leadership.",
		color: "#ce1124"
	},
	{
		id: "es",
		name: "Spain",
		probability: 12.5,
		strength: 89,
		athleteLevel: 90,
		stats: {
			Tactical: 95,
			Physical: 82,
			Mental: 85,
			Technical: 94,
			Speed: 86
		},
		keyPlayers: [
			"Pedri",
			"Yamal",
			"Rodri"
		],
		description: "Masters of possession and positional play, dictating the tempo of any game.",
		color: "#aa151b"
	},
	{
		id: "de",
		name: "Germany",
		probability: 10,
		strength: 88,
		athleteLevel: 89,
		stats: {
			Tactical: 89,
			Physical: 87,
			Mental: 90,
			Technical: 88,
			Speed: 85
		},
		keyPlayers: [
			"Musiala",
			"Wirtz",
			"Kimmich"
		],
		description: "Tactically versatile and efficient, undergoing a powerful resurgence.",
		color: "#ffce00"
	},
	{
		id: "pt",
		name: "Portugal",
		probability: 8.5,
		strength: 87,
		athleteLevel: 90,
		stats: {
			Tactical: 85,
			Physical: 86,
			Mental: 84,
			Technical: 91,
			Speed: 88
		},
		keyPlayers: [
			"Leão",
			"Bruno Fernandes",
			"Bernardo Silva"
		],
		description: "An incredibly deep squad with technical maestros in midfield and attack.",
		color: "#ff0000"
	},
	{
		id: "it",
		name: "Italy",
		probability: 3.5,
		strength: 85,
		athleteLevel: 86,
		stats: {
			Tactical: 92,
			Physical: 82,
			Mental: 88,
			Technical: 85,
			Speed: 80
		},
		keyPlayers: [
			"Barella",
			"Chiesa",
			"Bastoni"
		],
		description: "Historically formidable defenders with tactical astuteness.",
		color: "#0066cc"
	}
];
function TeamCard({ team, rank }) {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const radarData = Object.entries(team.stats).map(([subject, value]) => ({
		subject,
		value
	}));
	const chartConfig = { value: {
		label: "Score",
		color: team.color
	} };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapsible, {
		open: isOpen,
		onOpenChange: setIsOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: cn("border-border/30 bg-secondary/10 backdrop-blur-md overflow-hidden relative group transition-all duration-300", isOpen ? "border-border/60 shadow-lg shadow-black/20" : "hover:border-border/50"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 opacity-[0.03] transition-opacity duration-500 pointer-events-none",
					style: { backgroundImage: `linear-gradient(to right, transparent, ${team.color})` }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 flex items-center justify-between cursor-pointer select-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-black text-muted-foreground/30 w-6 text-center tabular-nums",
									children: rank
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative w-12 h-12 rounded-full overflow-hidden border-2 shadow-sm",
									style: { borderColor: team.color },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: `https://img.usecurling.com/p/100/100?q=${encodeURIComponent(team.name)}%20flag`,
										alt: `${team.name} Flag`,
										className: "w-full h-full object-cover scale-110"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-base font-bold uppercase tracking-wider text-foreground leading-tight",
										children: team.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-1.5 mt-0.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "secondary",
											className: "px-1.5 py-0 text-[10px] bg-background/50 text-muted-foreground border-border/50 font-medium",
											children: [
												"TPI:",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-foreground ml-1 font-bold",
													children: team.strength
												})
											]
										})
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-muted-foreground uppercase tracking-wider",
									children: "Win Prob"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-lg font-black tabular-nums tracking-tighter",
									style: { color: team.color },
									children: [team.probability.toFixed(1), "%"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("p-1.5 rounded-full bg-secondary/50 transition-transform duration-300", isOpen && "rotate-180"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 pt-0 border-t border-border/10 bg-black/20 grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 animate-in slide-in-from-top-2 duration-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "text-[10px] font-bold flex items-center gap-1.5 uppercase tracking-widest text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-3.5 h-3.5" }), " Technical Profile"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[200px] w-full -ml-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
								config: chartConfig,
								className: "h-full w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
									data: radarData,
									margin: {
										top: 10,
										right: 10,
										bottom: 10,
										left: 10
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, {
											stroke: "hsl(var(--border))",
											strokeDasharray: "3 3"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
											dataKey: "subject",
											tick: {
												fill: "hsl(var(--muted-foreground))",
												fontSize: 10,
												fontWeight: 600
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
											name: team.name,
											dataKey: "value",
											stroke: team.color,
											strokeWidth: 2,
											fill: team.color,
											fillOpacity: .25
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, { indicator: "line" }) })
									]
								})
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-center gap-5 pb-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-3.5 h-3.5" }), " Overall Squad Level"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-black",
										children: [team.athleteLevel, "/100"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full bg-secondary/50 h-2 rounded-full overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full transition-all duration-1000 ease-out relative",
										style: {
											width: `${team.athleteLevel}%`,
											backgroundColor: team.color
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-white/20" })
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-3.5 h-3.5" }), " Key Players"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5",
									children: team.keyPlayers.map((player) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: "bg-background/40 border-border/30 text-xs font-medium",
										children: player
									}, player))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground leading-relaxed italic border-l-2 pl-3 py-1",
									style: { borderColor: team.color },
									children: [
										"\"",
										team.description,
										"\""
									]
								})
							})
						]
					})]
				}) })
			]
		})
	});
}
function CopaStatsDashboard() {
	const navigate = useNavigate();
	const [sortBy, setSortBy] = (0, import_react.useState)("probability");
	const sortedTeams = (0, import_react.useMemo)(() => {
		return [...TEAMS].sort((a, b) => {
			if (sortBy === "probability") return b.probability - a.probability;
			if (sortBy === "strength") return b.strength - a.strength;
			return a.name.localeCompare(b.name);
		});
	}, [sortBy]);
	const top5Teams = [...TEAMS].sort((a, b) => b.probability - a.probability).slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-32 overflow-x-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 pointer-events-none z-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-[hsl(var(--gold)/0.1)] rounded-full blur-[120px]" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/30 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between p-4 px-4 pt-safe-top",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => navigate(-1),
							className: "rounded-full shrink-0 hover:bg-secondary/50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-lg font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-primary to-[hsl(var(--gold))]",
								children: "Copa 26 Stats"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] font-bold text-muted-foreground uppercase tracking-widest",
								children: "Power Index & Probabilities"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 shrink-0" })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 max-w-2xl mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-4 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border-border/30 bg-secondary/10 backdrop-blur-md overflow-hidden relative shadow-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[-50px] right-[-50px] w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									className: "pb-0 pt-5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
										className: "text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-4 h-4 text-primary" }), "Title Favorites"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									className: "pt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-[220px] w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
											config: { value: { label: "Win Probability %" } },
											className: "h-full w-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
												data: top5Teams,
												layout: "vertical",
												margin: {
													left: 0,
													right: 30,
													top: 0,
													bottom: 0
												},
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
														type: "number",
														hide: true,
														domain: [0, 25]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
														dataKey: "name",
														type: "category",
														axisLine: false,
														tickLine: false,
														tick: {
															fontSize: 11,
															fill: "hsl(var(--foreground))",
															fontWeight: 600
														},
														width: 70
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
														content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, { indicator: "line" }),
														cursor: { fill: "hsl(var(--secondary)/0.3)" }
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
														dataKey: "probability",
														radius: [
															0,
															4,
															4,
															0
														],
														barSize: 20,
														label: {
															position: "right",
															fill: "hsl(var(--muted-foreground))",
															fontSize: 10,
															fontWeight: 600,
															formatter: (val) => `${val}%`
														},
														children: top5Teams.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: entry.color }, `cell-${index}`))
													})
												]
											})
										})
									})
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 mt-8 mb-4 flex items-end justify-between animate-in fade-in duration-700 delay-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-black uppercase tracking-wider text-foreground",
							children: "Power Rankings"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground font-medium",
							children: "Detailed technical breakdown"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: sortBy,
							onValueChange: (val) => setSortBy(val),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-[140px] h-8 bg-secondary/30 border-border/30 text-xs font-semibold rounded-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Sort by" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "probability",
									children: "Win Probability"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "strength",
									children: "TPI Strength"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "name",
									children: "Alphabetical"
								})
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-4 flex flex-col gap-3 pb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300",
						children: sortedTeams.map((team, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamCard, {
							team,
							rank: index + 1
						}, team.id))
					})
				]
			})
		]
	});
}
export { CopaStatsDashboard as default };

//# sourceMappingURL=CopaStatsDashboard-LVhgTWIU.js.map