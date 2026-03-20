import "./circle-alert-DcltXEFu.js";
import "./circle-check-mH3bCFk0.js";
import { t as PaymentDialog } from "./PaymentDialog-Dt-W3eJK.js";
import { t as Radio } from "./radio-ByfqLIgG.js";
import "./wallet-B8TnFJgV.js";
import { Gt as Avatar, Ir as require_jsx_runtime, Kr as require_react, Kt as AvatarFallback, Ln as MapPin, M as Badge, Ur as useNavigate, Xt as Button, er as Eye, ln as cn, mn as User, n as AppIcon, nr as Crown, qt as AvatarImage, xr as Activity, yr as ArrowLeft } from "./index-CfexWzlo.js";
import { n as CardContent, t as Card } from "./card-RRkXJHrf.js";
import "./label-DXVFJ-C8.js";
import "./input-BWgP6RfD.js";
import "./tabs-BQ8rjeOQ.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
var LIVE_POOL = [
	{
		id: "lv1",
		name: "Scout Internacional",
		type: "Recrutador",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=11",
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
		id: "lv3",
		name: "Carlos \"Olheiro\"",
		type: "Scout",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=33",
		pos: {
			top: "75%",
			left: "20%"
		}
	},
	{
		id: "lv4",
		name: "Red Wolves FC",
		type: "Clube",
		avatar: "https://img.usecurling.com/i?q=wolf&color=red",
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
		name: "João Santos",
		type: "Atleta",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=101",
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
	const [liveViewers, setLiveViewers] = (0, import_react.useState)([LIVE_POOL[0], LIVE_POOL[1]]);
	const [pastViewers, setPastViewers] = (0, import_react.useState)(INITIAL_PAST);
	const [totalViews, setTotalViews] = (0, import_react.useState)(142);
	const viewsThisWeek = 28;
	(0, import_react.useEffect)(() => {
		const interval = setInterval(() => {
			setLiveViewers((current) => {
				const shouldRemove = current.length > 0 && Math.random() > .6;
				const shouldAdd = current.length < 4 && Math.random() > .4;
				let next = [...current];
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
								className: "absolute top-4 left-4 z-20 flex items-center gap-2 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/50 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative flex h-2.5 w-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-bold font-mono text-green-500 tracking-wider",
									children: [liveViewers.length, " LIVE"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-4 right-4 z-20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									className: "bg-black/80 text-primary border-primary/30 flex items-center gap-1 backdrop-blur-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "w-3 h-3 animate-pulse" }), " Radar Ativo"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-24 h-24 bg-primary/20 rounded-full absolute animate-ping",
										style: { animationDuration: "3s" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-40 h-40 border border-primary/20 rounded-full absolute" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-64 h-64 border border-primary/10 rounded-full absolute" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-96 h-96 border border-primary/5 rounded-full absolute" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "z-10 bg-background/90 backdrop-blur-sm p-3 rounded-full ring-2 ring-primary/30 shadow-xl border border-primary/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppIcon, { className: "w-8 h-8 opacity-90" })
							}),
							liveViewers.map((v, i) => {
								const isBlurredRadar = !isUnlocked && i > 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute z-20 animate-in zoom-in duration-500 fade-in",
									style: v.pos,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative group flex flex-col items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
											className: cn("w-10 h-10 border-2 border-green-500 shadow-xl transition-all duration-300", isBlurredRadar && "blur-[3px] grayscale opacity-70"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: isBlurredRadar ? void 0 : v.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-5 h-5 text-muted-foreground" }) })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full animate-pulse" })]
									})
								}, v.id);
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between bg-secondary/30 rounded-2xl p-4 border border-border/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3 bg-primary/10 rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-6 h-6 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground font-medium",
							children: "Total de Visitas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-black text-foreground",
							children: totalViews
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-background px-3 py-1.5 rounded-full text-xs font-bold border border-border/50 shadow-sm flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-green-500",
							children: ["+", viewsThisWeek]
						}), " semana"]
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
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "animate-in slide-in-from-bottom-2 fade-in duration-500",
								children: [
									isFirstLive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "font-bold text-sm text-green-500 uppercase tracking-wider mb-3 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-4 h-4 animate-pulse" }), "Assistindo Agora"]
									}),
									isFirstPast && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "font-bold text-sm text-muted-foreground uppercase tracking-wider mt-6 mb-3 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4" }), "Últimos Visitantes"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
										className: cn("border-none shadow-sm transition-all", isBlurred && "blur-sm opacity-60 select-none pointer-events-none", viewer.isLive && !isBlurred && "ring-1 ring-green-500/30 bg-green-500/5"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
											className: "p-4 flex items-center gap-4 relative overflow-hidden",
											children: [
												viewer.isLive && !isBlurred && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full blur-xl -mr-8 -mt-8" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
														className: cn("h-12 w-12 border-2", viewer.isLive && !isBlurred ? "border-green-500" : "border-border"),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: isBlurred ? void 0 : viewer.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-6 w-6 text-muted-foreground" }) })]
													}), viewer.isLive && !isBlurred && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full animate-pulse" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-1 min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between items-start",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-bold truncate",
															children: isBlurred ? "Visitante Premium" : viewer.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: cn("text-xs font-bold whitespace-nowrap", viewer.isLive ? "text-green-500" : "text-muted-foreground"),
															children: viewer.date
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2 mt-0.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-xs text-muted-foreground",
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

//# sourceMappingURL=ProfileViews-vDJC3g5F.js.map