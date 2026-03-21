import "./circle-alert-DTSVsFA6.js";
import "./circle-check-BV1uHxyG.js";
import { t as PaymentDialog } from "./PaymentDialog-DIprdnmk.js";
import { t as Radio } from "./radio-TwGqUIG8.js";
import "./wallet-SojpWcHS.js";
import { $t as TooltipContent, Jt as AvatarImage, Kr as useNavigate, Kt as Avatar, N as Badge, Qt as Tooltip, Sr as ArrowLeft, Yr as require_react, Zn as Ghost, Zt as Button, ar as Crown, dn as cn, en as TooltipProvider, gn as User, qt as AvatarFallback, r as AppIcon, rr as Eye, t as usePrivacyStore, tn as TooltipTrigger, wr as Activity, zn as MapPin, zr as require_jsx_runtime } from "./index-GF_UKfZV.js";
import { n as CardContent, t as Card } from "./card-d9rwX2Pq.js";
import "./label-CN_ANQnS.js";
import "./input-Bjc7gR1n.js";
import "./tabs-DZk7l6ll.js";
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
function ProfileViews() {
	const navigate = useNavigate();
	const [isUnlocked, setIsUnlocked] = (0, import_react.useState)(false);
	const { isInvisibleMode, isPremium, toggleInvisibleMode, upgradeToPremium } = usePrivacyStore();
	const [liveViewers, setLiveViewers] = (0, import_react.useState)([LIVE_POOL[0], LIVE_POOL[1]]);
	const [pastViewers, setPastViewers] = (0, import_react.useState)(INITIAL_PAST);
	const [totalViews, setTotalViews] = (0, import_react.useState)(142);
	const viewsThisWeek = 28;
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
							liveViewers.map((v, i) => {
								const isBlurredRadar = !isUnlocked && i > 0;
								const isVipRadar = [
									"Scout",
									"Coach",
									"Sponsor"
								].includes(v.type);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute z-20 animate-in zoom-in duration-500 fade-in cursor-pointer hover:scale-110 transition-transform",
									style: v.pos,
									onClick: () => {
										if (!isBlurredRadar) navigate(`/profile/${v.id}`);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative group flex flex-col items-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
												className: cn("w-10 h-10 border-2 transition-all duration-300", isVipRadar ? "border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.6)]" : "border-primary shadow-[0_0_15px_hsl(var(--primary)/0.4)]", isBlurredRadar && "blur-[3px] grayscale opacity-70"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: isBlurredRadar ? void 0 : v.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-5 h-5 text-muted-foreground" }) })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-background rounded-full animate-pulse", isVipRadar ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" : "bg-gold shadow-[0_0_8px_hsl(var(--gold))]") }),
											isVipRadar && !isBlurredRadar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
					className: "flex items-center justify-between bg-secondary/30 rounded-2xl p-4 border border-border/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 bg-primary/10 rounded-xl relative group cursor-default",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-primary/20 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-6 h-6 text-primary relative z-10" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
								delayDuration: 200,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "inline-block relative",
										children: isPremium ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => toggleInvisibleMode(!isInvisibleMode),
											className: cn("p-2.5 rounded-full transition-all duration-300 active:scale-95 ring-2 ring-transparent relative group flex items-center justify-center", isInvisibleMode ? "bg-gold/15 text-gold shadow-[0_0_20px_hsl(var(--gold)/0.4)] ring-gold/40 hover:bg-gold/20 hover:scale-110" : "bg-muted/60 text-muted-foreground hover:bg-primary/10 hover:text-primary hover:scale-110 hover:shadow-md"),
											"aria-label": "Toggle Invisible Mode",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ghost, { className: cn("w-5 h-5 transition-transform duration-300", isInvisibleMode ? "animate-[pulse_2s_ease-in-out_infinite] drop-shadow-md scale-105" : "group-hover:-translate-y-0.5 group-hover:rotate-6") })
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDialog, {
											title: "Desbloquear Modo Invisível",
											price: 19.9,
											pointsPrice: 1e3,
											onSuccess: () => {
												upgradeToPremium();
												toggleInvisibleMode(true);
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												className: "p-2.5 rounded-full bg-muted/60 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95 relative group flex items-center justify-center outline-none",
												"aria-label": "Unlock Invisible Mode",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ghost, { className: "w-5 h-5 opacity-70 group-hover:-translate-y-0.5 group-hover:rotate-6 transition-all duration-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute -bottom-1 -right-1 bg-background rounded-full p-0.5 shadow-sm border border-border group-hover:border-gold/50 transition-colors z-10",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "w-3 h-3 text-gold fill-gold" })
												})]
											})
										})
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipContent, {
									side: "right",
									sideOffset: 15,
									className: "text-xs font-bold border-border/50 bg-background/95 backdrop-blur-md text-foreground shadow-xl rounded-lg py-2 px-3 flex items-center gap-2",
									children: [isInvisibleMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative flex h-2 w-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-gold shadow-[0_0_5px_hsl(var(--gold))]" })]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative flex h-2 w-2 rounded-full bg-muted-foreground/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isInvisibleMode ? "Modo Invisível: Ativado" : "Modo Invisível: Desativado" })]
								})] })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground font-medium",
								children: "Total de Visitas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-black text-foreground",
								children: totalViews
							})]
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative pb-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: allViewers.map((viewer, index) => {
							const isBlurred = !isUnlocked && index > 0;
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
										className: cn("border-none shadow-sm transition-all relative overflow-hidden", isBlurred && "blur-sm opacity-60 select-none pointer-events-none", viewer.isLive && !isBlurred && !isVip && "ring-1 ring-gold/30 bg-gradient-to-r from-primary/5 to-transparent shadow-[0_0_15px_hsl(var(--primary)/0.05)]", isVip && !isBlurred && "ring-2 ring-purple-500/50 bg-gradient-to-r from-purple-500/10 to-gold/10 shadow-[0_0_20px_rgba(168,85,247,0.2)] cursor-pointer hover:scale-[1.02]"),
										onClick: () => {
											if (isVip && !isBlurred) navigate(`/profile/${viewer.id}`);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
											className: "p-4 flex items-center gap-4 relative z-10",
											children: [
												viewer.isLive && !isBlurred && !isVip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" }),
												isVip && !isBlurred && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative z-10",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
														className: cn("h-12 w-12 border-2", viewer.isLive && !isBlurred && !isVip ? "border-primary shadow-[0_0_10px_hsl(var(--primary)/0.3)]" : "", isVip && !isBlurred ? "border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]" : "", !viewer.isLive && !isVip ? "border-border" : ""),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: isBlurred ? void 0 : viewer.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-6 w-6 text-muted-foreground" }) })]
													}), viewer.isLive && !isBlurred && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-background rounded-full animate-pulse", isVip ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" : "bg-gold shadow-[0_0_8px_hsl(var(--gold))]") })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-1 min-w-0 z-10",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between items-start",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "font-bold truncate flex items-center gap-1.5 text-foreground",
															children: [isBlurred ? "Visitante Premium" : viewer.name, isVip && !isBlurred && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
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
															className: cn("text-xs font-medium", isVip && !isBlurred ? "text-purple-600/80 dark:text-purple-400/80" : "text-muted-foreground"),
															children: isBlurred ? "Perfil Oculto" : viewer.type
														}), !isBlurred && !viewer.isLive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-primary/40" })]
													})]
												})
											]
										})
									})
								]
							}, viewer.id);
						})
					}), !isUnlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-0 bottom-0 top-32 bg-gradient-to-b from-transparent via-background/95 to-background flex flex-col items-center justify-end pb-8 pt-20 px-4 text-center z-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-16 h-16 bg-gradient-to-br from-gold to-yellow-600 rounded-full flex items-center justify-center mb-4 shadow-lg animate-pulse ring-4 ring-gold/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "w-8 h-8 text-white fill-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppIcon, { className: "w-5 h-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-primary tracking-tight",
									children: "Goplay Premium"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-bold mb-3 text-foreground",
								children: "Descubra quem está de olho"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-sm mb-6 max-w-[280px] leading-relaxed",
								children: "Desbloqueie o Live Tracking e a lista completa para ver os scouts, recrutadores e atletas que visitam seu perfil."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDialog, {
								title: "Desbloquear Radar & Views",
								price: 9.9,
								pointsPrice: 500,
								onSuccess: () => setIsUnlocked(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "lg",
									className: "w-full bg-gradient-to-r from-primary to-primary/90 hover:to-primary text-white font-bold h-12 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95",
									children: "Desbloquear Tudo"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground mt-4 font-medium",
								children: ["Ou use seus ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gold",
									children: "Goplay Points"
								})]
							})
						]
					})]
				})
			]
		})]
	});
}
export { ProfileViews as default };

//# sourceMappingURL=ProfileViews-D-rQcua0.js.map