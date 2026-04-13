import "./circle-alert-D4B0SI1Q.js";
import "./circle-check-DW8ITpr7.js";
import { t as PaymentDialog } from "./PaymentDialog-CYPN31rD.js";
import { t as Radio } from "./radio-Bh0oUk27.js";
import "./wallet-C0vZAWWb.js";
import { $n as MapPin, Br as createLucideIcon, En as User, Lr as ArrowLeft, O as usePrivacyStore, R as Badge, an as Button, bn as cn, br as Crown, ci as useNavigate, cn as TooltipContent, di as require_react, en as Avatar, ln as TooltipProvider, nn as AvatarImage, sn as Tooltip, ti as require_jsx_runtime, tn as AvatarFallback, tr as Lock, un as TooltipTrigger, vr as Eye, x as AppIcon, zr as Activity } from "./index-9FdtLN8r.js";
import { n as CardContent, t as Card } from "./card-CGnIfxBc.js";
import "./label-CAfjS5OU.js";
import "./input-DjLXmjYS.js";
import "./tabs-CVV5Rqkx.js";
import { M as Cell, f as Bar, n as YAxis, r as XAxis } from "./generateCategoricalChart-m9tU3EgW.js";
import { t as CartesianGrid } from "./CartesianGrid-JXHgfC_t.js";
import { t as BarChart } from "./BarChart-DnVaXQvi.js";
import { n as ChartTooltip, r as ChartTooltipContent, t as ChartContainer } from "./chart-0Ac8EXYR.js";
import { t as GhostEmojiIcon } from "./GhostEmojiIcon-CGPP7kWG.js";
var ChartColumn = createLucideIcon("chart-column", [
	["path", {
		d: "M3 3v16a2 2 0 0 0 2 2h16",
		key: "c24i48"
	}],
	["path", {
		d: "M18 17V9",
		key: "2bz60n"
	}],
	["path", {
		d: "M13 17V5",
		key: "1frdt8"
	}],
	["path", {
		d: "M8 17v-3",
		key: "17ska0"
	}]
]);
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
var LIVE_POOL = [
	{
		id: "u10",
		name: "Rafael Torres",
		type: "Scout",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=78",
		pos: {
			top: "15%",
			left: "25%"
		}
	},
	{
		id: "lv2",
		name: "Agência NextLevel",
		type: "Agência",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=female&seed=22",
		pos: {
			top: "65%",
			left: "75%"
		}
	},
	{
		id: "u4",
		name: "Carlos Eduardo",
		type: "Coach",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=45",
		pos: {
			top: "75%",
			left: "20%"
		}
	},
	{
		id: "a1",
		name: "GoGlobal Sports",
		type: "Sponsor",
		avatar: "https://img.usecurling.com/i?q=globe&color=blue",
		pos: {
			top: "25%",
			left: "80%"
		}
	},
	{
		id: "lv5",
		name: "Visitante Anônimo",
		type: "Atleta",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=44",
		pos: {
			top: "50%",
			left: "10%"
		}
	},
	{
		id: "lv6",
		name: "Marina Silva",
		type: "Treinador",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=female&seed=55",
		pos: {
			top: "40%",
			left: "85%"
		}
	}
];
var INITIAL_PAST = [
	{
		id: "pv1",
		name: "Red Bull Energy",
		type: "Sponsor",
		avatar: "https://img.usecurling.com/i?q=bull&color=red",
		date: "Há 2 horas"
	},
	{
		id: "pv2",
		name: "Futsal Pro Club",
		type: "Clube",
		avatar: "https://img.usecurling.com/i?q=soccer&color=blue",
		date: "Há 5 horas"
	},
	{
		id: "pv3",
		name: "Visitante Anônimo",
		type: "Perfil Oculto",
		avatar: "",
		date: "Ontem"
	},
	{
		id: "pv4",
		name: "Ana Souza",
		type: "Atleta",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=female&seed=102",
		date: "Ontem"
	}
];
var DAILY_ENGAGEMENT_DATA = [
	{
		time: "00h",
		views: 18,
		isPeak: false
	},
	{
		time: "04h",
		views: 12,
		isPeak: false
	},
	{
		time: "08h",
		views: 45,
		isPeak: false
	},
	{
		time: "12h",
		views: 85,
		isPeak: false
	},
	{
		time: "16h",
		views: 124,
		isPeak: false
	},
	{
		time: "20h",
		views: 210,
		isPeak: true
	},
	{
		time: "23h",
		views: 65,
		isPeak: false
	}
];
var chartConfig = {
	views: {
		label: "Visitas",
		color: "hsl(var(--primary))"
	},
	peak: {
		label: "Pico",
		color: "hsl(var(--gold))"
	}
};
function ProfileViews() {
	const navigate = useNavigate();
	const { isInvisibleMode, isPremium, toggleInvisibleMode, upgradeToPremium, isPreviewLocked } = usePrivacyStore();
	const [liveViewers, setLiveViewers] = (0, import_react.useState)([LIVE_POOL[0], LIVE_POOL[1]]);
	const [pastViewers, setPastViewers] = (0, import_react.useState)(INITIAL_PAST);
	const [totalViews, setTotalViews] = (0, import_react.useState)(142);
	const viewsThisWeek = 28;
	const totalVisitsToday = DAILY_ENGAGEMENT_DATA.reduce((acc, curr) => acc + curr.views, 0);
	const peakHour = DAILY_ENGAGEMENT_DATA.find((d) => d.isPeak)?.time || "20h";
	(0, import_react.useEffect)(() => {
		const interval = setInterval(() => {
			setLiveViewers((current) => {
				const shouldRemove = current.length > 0 && Math.random() > .6;
				const shouldAdd = current.length < 4 && Math.random() > .4;
				const next = [...current];
				if (shouldRemove) {
					const idx = Math.floor(Math.random() * next.length);
					const removed = next[idx];
					next.splice(idx, 1);
					setPastViewers((prev) => [{
						id: `moved-${Date.now()}`,
						name: removed.name,
						type: removed.type,
						avatar: removed.avatar,
						date: "Agora mesmo"
					}, ...prev]);
				}
				if (shouldAdd) {
					const available = LIVE_POOL.filter((p) => !next.find((n) => n.id === p.id));
					if (available.length) {
						const picked = available[Math.floor(Math.random() * available.length)];
						next.push(picked);
						setTotalViews((prev) => prev + 1);
					}
				}
				return next;
			});
		}, 3500);
		return () => clearInterval(interval);
	}, []);
	const allViewers = [...liveViewers.map((v) => ({
		...v,
		isLive: true
	})), ...pastViewers.map((v) => ({
		...v,
		isLive: false
	}))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 z-40 w-full h-16 bg-background/80 backdrop-blur-xl border-b border-border/40 flex items-center gap-3 px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: () => navigate(-1),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppIcon, { className: "w-6 h-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-bold text-lg",
					children: "Goplay Views"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-none bg-gradient-to-b from-primary/10 via-background to-background overflow-hidden relative shadow-inner",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-0 h-56 flex flex-col items-center justify-center relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-4 left-4 z-20 flex items-center gap-2 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-gold/30 shadow-[0_0_15px_hsl(var(--gold)/0.15)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative flex h-2.5 w-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-gold shadow-[0_0_8px_hsl(var(--gold))]" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-black font-sans text-gold tracking-widest uppercase drop-shadow-sm",
									children: [liveViewers.length, " AO VIVO"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-4 right-4 z-20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									className: "bg-black/80 text-primary border-primary/30 flex items-center gap-1 backdrop-blur-md shadow-[0_0_10px_hsl(var(--primary)/0.2)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "w-3 h-3 animate-pulse text-primary" }), " Radar Ativo"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-24 h-24 bg-primary/20 rounded-full absolute animate-ping",
										style: { animationDuration: "3s" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-40 h-40 border border-primary/20 rounded-full absolute shadow-[0_0_20px_hsl(var(--primary)/0.1)]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-64 h-64 border border-primary/10 rounded-full absolute" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-96 h-96 border border-primary/5 rounded-full absolute" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "z-10 bg-background/90 backdrop-blur-sm p-3 rounded-full ring-2 ring-primary/40 shadow-[0_0_20px_hsl(var(--primary)/0.3)] border border-primary/30 relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-1 bg-primary/20 rounded-full animate-pulse blur-sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppIcon, { className: "w-8 h-8 opacity-90 relative z-10" })]
							}),
							liveViewers.map((v) => {
								const isVipRadar = [
									"Scout",
									"Coach",
									"Sponsor"
								].includes(v.type);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute z-20 animate-in zoom-in duration-500 fade-in cursor-pointer hover:scale-110 transition-transform",
									style: v.pos,
									onClick: () => {
										navigate(`/profile/${v.id}`);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative group flex flex-col items-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
												className: cn("w-10 h-10 border-2 transition-all duration-300", isVipRadar ? "border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.6)]" : "border-primary shadow-[0_0_15px_hsl(var(--primary)/0.4)]"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: v.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-5 h-5 text-muted-foreground" }) })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-background rounded-full animate-pulse", isVipRadar ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" : "bg-gold shadow-[0_0_8px_hsl(var(--gold))]") }),
											isVipRadar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute -top-2 bg-gradient-to-r from-purple-600 to-yellow-500 rounded-full p-0.5 shadow-md",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "w-3 h-3 text-white fill-white" })
											})
										]
									})
								}, v.id);
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 bg-secondary/30 rounded-2xl p-5 border border-border/50 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground font-medium",
									children: "Total de Visitas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-3xl font-black text-foreground",
									children: totalViews
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-background px-3 py-1.5 rounded-full text-xs font-bold border border-border/50 shadow-sm flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-primary",
										children: ["+", viewsThisWeek]
									}), " semana"]
								}), isInvisibleMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: "text-[9px] text-gold border-gold/30 bg-gold/5 shadow-[0_0_10px_hsl(var(--gold)/0.1)] uppercase tracking-widest px-1.5 py-0",
									children: "Invisível"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-full bg-border/50 my-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-center gap-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, {
								delayDuration: 200,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-12 h-12 rounded-full bg-primary/5 border border-primary/20 shadow-sm flex items-center justify-center cursor-default hover:bg-primary/10 transition-colors group",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-5 h-5 text-primary group-hover:scale-110 transition-transform" })
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
										side: "bottom",
										className: "font-medium text-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Visualizações do Perfil" })
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
										asChild: true,
										children: isPremium ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => toggleInvisibleMode(!isInvisibleMode),
											className: cn("w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 active:scale-95 group shadow-sm", isInvisibleMode ? "bg-gold/10 border-gold/50 shadow-[0_0_15px_hsl(var(--gold)/0.3)] text-gold" : "bg-primary/5 border-primary/20 hover:bg-primary/10 text-primary"),
											"aria-label": "Toggle Invisible Mode",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostEmojiIcon, {
												active: isInvisibleMode,
												className: cn("w-5 h-5 transition-all duration-300", isInvisibleMode ? "drop-shadow-[0_0_8px_hsl(var(--gold)/0.6)] scale-110" : "opacity-90 group-hover:scale-110 group-hover:opacity-100")
											})
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDialog, {
											title: "Desbloquear Modo Invisível",
											price: 19.9,
											pointsPrice: 1e3,
											onSuccess: () => {
												upgradeToPremium();
												toggleInvisibleMode(true);
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												className: "w-12 h-12 rounded-full bg-primary/5 border border-primary/20 hover:bg-primary/10 flex items-center justify-center transition-all duration-300 group relative outline-none shadow-sm",
												"aria-label": "Unlock Invisible Mode",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostEmojiIcon, { className: "w-5 h-5 text-primary opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute -bottom-1 -right-1 bg-background rounded-full p-0.5 shadow-sm border border-border group-hover:border-gold/50 transition-colors z-10",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "w-3 h-3 text-gold fill-gold" })
												})]
											})
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipContent, {
										side: "bottom",
										sideOffset: 8,
										className: "text-xs font-bold border-border/50 bg-background/95 backdrop-blur-md text-foreground shadow-xl rounded-lg py-2 px-3 flex items-center gap-2",
										children: [isInvisibleMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "relative flex h-2 w-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-gold shadow-[0_0_5px_hsl(var(--gold))]" })]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative flex h-2 w-2 rounded-full bg-muted-foreground/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isInvisibleMode ? "Modo Invisível: Ativado" : "Modo Invisível: Desativado" })]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-12 h-12 rounded-full bg-red-500/5 border border-red-500/20 shadow-sm flex items-center justify-center cursor-default hover:bg-red-500/10 transition-colors group",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "w-5 h-5 text-red-500 animate-pulse group-hover:scale-110 transition-transform" })
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
										side: "bottom",
										className: "font-medium text-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Status: Ao Vivo" })
									})] })
								]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "animate-in slide-in-from-bottom-2 fade-in duration-500 delay-100",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-bold text-sm text-foreground uppercase tracking-wider flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "w-4 h-4 text-primary" }), "Engajamento Diário"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: cn("text-[9px] uppercase tracking-widest", !isPreviewLocked ? "text-gold border-gold/30 bg-gold/5 shadow-[0_0_10px_hsl(var(--gold)/0.1)]" : "text-muted-foreground border-border/50 bg-secondary/50"),
								children: !isPreviewLocked ? "Premium" : "Básico"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "border border-border/50 bg-secondary/10 shadow-sm relative overflow-hidden group/chart-card",
						children: [isPreviewLocked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 z-30 flex flex-col items-center justify-center bg-background/70 backdrop-blur-[6px] p-6 text-center animate-in fade-in zoom-in-95 duration-300",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-primary/20 flex items-center justify-center mb-4 border border-gold/30 shadow-[0_0_20px_hsl(var(--gold)/0.15)] relative overflow-hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gold/20 animate-pulse blur-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-8 h-8 text-gold drop-shadow-md relative z-10" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "text-xl font-black text-foreground mb-2 drop-shadow-sm flex items-center gap-2",
									children: [
										"Métricas Premium",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "w-5 h-5 text-gold fill-gold" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground mb-6 max-w-[280px] leading-relaxed",
									children: "Desbloqueie o gráfico de engajamento diário, identifique horários de pico e saiba exatamente como maximizar seu alcance."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDialog, {
									title: "Métricas de Engajamento Premium",
									price: 29.9,
									pointsPrice: 1500,
									onSuccess: () => {
										upgradeToPremium();
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										className: "bg-gradient-to-r from-gold to-yellow-600 hover:from-yellow-500 hover:to-gold text-black font-bold w-full max-w-[240px] shadow-[0_4px_15px_hsl(var(--gold)/0.3)] hover:shadow-[0_6px_20px_hsl(var(--gold)/0.4)] transition-all duration-300 border border-yellow-400/50 group",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4 mr-2 group-hover:hidden" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "w-4 h-4 mr-2 hidden group-hover:block text-black fill-black" }),
											"Desbloquear R$ 29,90"
										]
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: cn("p-4 pt-6 transition-all duration-500", isPreviewLocked && "opacity-30 grayscale-[0.8] blur-[4px] pointer-events-none select-none"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4 mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col bg-secondary/20 p-3 rounded-xl border border-border/50 shadow-sm relative overflow-hidden",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-1 h-full bg-primary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1",
											children: "Total Visitas Hoje"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-2xl font-black text-foreground",
											children: totalVisitsToday
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col bg-secondary/20 p-3 rounded-xl border border-border/50 shadow-sm relative overflow-hidden",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-1 h-full bg-gold" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1",
											children: "Horário de Pico"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-2xl font-black text-gold",
											children: [
												peakHour.replace("h", ":00"),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs font-medium text-muted-foreground",
													children: [
														"- ",
														(parseInt(peakHour) + 1).toString().padStart(2, "0"),
														":00"
													]
												})
											]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
								config: chartConfig,
								className: "h-[180px] w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: DAILY_ENGAGEMENT_DATA,
									margin: {
										top: 0,
										right: 0,
										left: -25,
										bottom: 0
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											vertical: false,
											stroke: "hsl(var(--border))",
											opacity: .4
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "time",
											tickLine: false,
											axisLine: false,
											tickMargin: 10,
											className: "text-[10px] font-medium fill-muted-foreground"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											tickLine: false,
											axisLine: false,
											tickMargin: 10,
											tickCount: 4,
											className: "text-[10px] font-medium fill-muted-foreground"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
											cursor: { fill: "hsl(var(--muted)/0.4)" },
											content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
												hideLabel: true,
												formatter: (value, _name, props) => {
													const isPeak = props.payload.isPeak;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("w-2 h-2 rounded-full", isPeak ? "bg-gold shadow-[0_0_5px_hsl(var(--gold))]" : "bg-primary") }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "font-medium text-foreground",
																children: [value, " visitas"]
															}),
															isPeak && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] text-gold font-bold uppercase ml-1",
																children: "Pico"
															})
														]
													});
												}
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "views",
											radius: [
												4,
												4,
												0,
												0
											],
											maxBarSize: 40,
											children: DAILY_ENGAGEMENT_DATA.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
												fill: entry.isPeak ? "hsl(var(--gold))" : "hsl(var(--primary))",
												className: cn("transition-all duration-300", entry.isPeak && "drop-shadow-[0_-2px_8px_hsl(var(--gold)/0.4)]")
											}, `cell-${index}`))
										})
									]
								})
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative pb-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: allViewers.map((viewer, index) => {
							const isFirstLive = viewer.isLive && index === 0;
							const isFirstPast = !viewer.isLive && index === liveViewers.length;
							const isVip = [
								"Scout",
								"Coach",
								"Sponsor"
							].includes(viewer.type);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "animate-in slide-in-from-bottom-2 fade-in duration-500",
								children: [
									isFirstLive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "font-bold text-sm text-gold uppercase tracking-widest mb-3 flex items-center gap-2 drop-shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-4 h-4 animate-pulse text-gold" }), "Assistindo Agora"]
									}),
									isFirstPast && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "font-bold text-sm text-muted-foreground uppercase tracking-wider mt-6 mb-3 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4" }), "Últimos Visitantes"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
										className: cn("border-none shadow-sm transition-all relative overflow-hidden cursor-pointer hover:scale-[1.02]", viewer.isLive && !isVip && "ring-1 ring-gold/30 bg-gradient-to-r from-primary/5 to-transparent shadow-[0_0_15px_hsl(var(--primary)/0.05)]", isVip && "ring-2 ring-purple-500/50 bg-gradient-to-r from-purple-500/10 to-gold/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]"),
										onClick: () => {
											navigate(`/profile/${viewer.id}`);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
											className: "p-4 flex items-center gap-4 relative z-10",
											children: [
												viewer.isLive && !isVip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" }),
												isVip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative z-10",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
														className: cn("h-12 w-12 border-2", viewer.isLive && !isVip ? "border-primary shadow-[0_0_10px_hsl(var(--primary)/0.3)]" : "", isVip ? "border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]" : "", !viewer.isLive && !isVip ? "border-border" : ""),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: viewer.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-6 w-6 text-muted-foreground" }) })]
													}), viewer.isLive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-background rounded-full animate-pulse", isVip ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" : "bg-gold shadow-[0_0_8px_hsl(var(--gold))]") })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-1 min-w-0 z-10",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between items-start",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "font-bold truncate flex items-center gap-1.5 text-foreground",
															children: [viewer.name, isVip && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
																variant: "secondary",
																className: "bg-gradient-to-r from-purple-600 to-yellow-600 text-white border-none text-[9px] px-1.5 py-0 uppercase tracking-widest gap-0.5 shadow-sm",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "w-2.5 h-2.5 fill-white" }), " VIP"]
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: cn("whitespace-nowrap", viewer.isLive ? isVip ? "text-[10px] font-black tracking-widest uppercase rounded-full px-2 py-0.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 shadow-sm" : "text-[10px] font-black tracking-widest uppercase rounded-full px-2 py-0.5 bg-gold/10 text-gold border border-gold/20 shadow-sm" : "text-xs font-bold text-muted-foreground"),
															children: viewer.isLive ? "Ao Vivo" : viewer.date
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2 mt-0.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: cn("text-xs font-medium", isVip ? "text-purple-600/80 dark:text-purple-400/80" : "text-muted-foreground"),
															children: viewer.type
														}), !viewer.isLive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-primary/40" })]
													})]
												})
											]
										})
									})
								]
							}, viewer.id);
						})
					})
				})
			]
		})]
	});
}
export { ProfileViews as default };

//# sourceMappingURL=ProfileViews-R-Dyhyw5.js.map