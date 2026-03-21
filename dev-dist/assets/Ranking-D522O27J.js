import { t as Brain } from "./brain-DEzqsPWN.js";
import "./chevron-down-Bex_JgzL.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-C4rXqNra.js";
import { t as Flame } from "./flame-DDdR7PcI.js";
import { t as Gift } from "./gift-DfPB7WLt.js";
import { t as Minus } from "./minus-CW3xmmTc.js";
import { t as Shield } from "./shield-CbC8L3wp.js";
import { $t as Button, Br as require_jsx_runtime, Cr as ArrowLeft, E as getRankings, F as Badge, G as mockChallenges, Gr as useSearchParams, J as mockCurrentUser, Jt as Avatar, Kn as Info, On as Star, Sn as TrendingDown, T as getChallengeRankings, Xr as require_react, Xt as AvatarImage, Yt as AvatarFallback, _n as Users, _r as Calendar, _t as mockPsychologicalRankings, bn as Trophy, c as DialogContent, d as DialogHeader, en as Tooltip, f as DialogTitle, fr as ChevronRight, l as DialogDescription, lr as Clock, mn as Zap, o as Dialog, or as Crown, p as DialogTrigger, pn as cn, qr as useNavigate, rn as TooltipTrigger, tn as TooltipContent, xn as TrendingUp, zn as Medal } from "./index-E9b2kZbq.js";
import { n as CardContent, t as Card } from "./card-DQ2g85J7.js";
import { t as Progress } from "./progress-DpTo6Ob8.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-ChGnYV9T.js";
import { t as ptBR } from "./pt-BR-BJdaBO5r.js";
import { t as format } from "./format-CDsTDPw2.js";
import { t as formatDistanceToNow } from "./formatDistanceToNow-Bz9o3R6i.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function ChallengesList({ onSelectChallenge }) {
	const [filter, setFilter] = (0, import_react.useState)("all");
	const filteredChallenges = mockChallenges.filter((c) => filter === "all" || c.status === filter);
	const getStatusColor = (status) => {
		switch (status) {
			case "active": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
			case "upcoming": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
			case "ended": return "text-muted-foreground bg-muted border-muted-foreground/20";
			default: return "text-muted-foreground";
		}
	};
	const getStatusLabel = (status) => {
		switch (status) {
			case "active": return "Em Andamento";
			case "upcoming": return "Em Breve";
			case "ended": return "Encerrado";
			default: return status;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-2 overflow-x-auto pb-2 scrollbar-hide",
			children: [
				"all",
				"active",
				"upcoming",
				"ended"
			].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: filter === f ? "default" : "outline",
				size: "sm",
				onClick: () => setFilter(f),
				className: "rounded-full h-8 text-xs font-medium capitalize",
				children: f === "all" ? "Todos" : f === "active" ? "Ativos" : f === "upcoming" ? "Breve" : "Fim"
			}, f))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [filteredChallenges.map((challenge) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "overflow-hidden border-border/50 hover:border-primary/30 transition-all cursor-pointer group active:scale-[0.99]",
				onClick: () => onSelectChallenge(challenge.id),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-32 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: challenge.banner,
							alt: challenge.title,
							className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-3 left-3 z-20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: cn("mb-2 border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", getStatusColor(challenge.status)),
								children: getStatusLabel(challenge.status)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold text-white leading-tight",
								children: challenge.title
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4 space-y-4 bg-card/50 backdrop-blur-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [challenge.status === "active" ? "Termina em " : "Inicia em ", formatDistanceToNow(new Date(challenge.status === "upcoming" ? challenge.startDate : challenge.endDate), { locale: ptBR })] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-3.5 h-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [challenge.participants, " inscritos"] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground line-clamp-2 leading-relaxed",
							children: challenge.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-2 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-gold/10 p-1.5 rounded-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "w-3.5 h-3.5 text-gold" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium text-gold/90 truncate max-w-[150px]",
									children: challenge.rewards[0]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "ghost",
								className: "h-8 text-xs hover:bg-primary/10 hover:text-primary gap-1 pl-2 pr-1",
								children: ["Ver Ranking", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-3 h-3" })]
							})]
						})
					]
				})]
			}, challenge.id)), filteredChallenges.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center py-12 px-4 rounded-xl border border-dashed border-border/50 bg-muted/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground font-medium",
					children: "Nenhum desafio encontrado com este filtro."
				})]
			})]
		})]
	});
}
function ChallengeRanking({ challenge, onBack }) {
	const rankings = (0, import_react.useMemo)(() => {
		return getChallengeRankings(challenge.id);
	}, [challenge.id]);
	const myRank = rankings.find((r) => r.user.id === mockCurrentUser.id);
	const getAchievementIcon = (type) => {
		switch (type) {
			case "mvp": return Star;
			case "streak": return Flame;
			case "veteran": return Shield;
			case "rising_star": return Zap;
			default: return Star;
		}
	};
	const getAchievementColor = (type) => {
		switch (type) {
			case "mvp": return "text-yellow-500";
			case "streak": return "text-orange-500";
			case "veteran": return "text-blue-500";
			case "rising_star": return "text-purple-500";
			default: return "text-primary";
		}
	};
	const getAchievementBg = (type) => {
		switch (type) {
			case "mvp": return "bg-yellow-500/10 border-yellow-500/30";
			case "streak": return "bg-orange-500/10 border-orange-500/30";
			case "veteran": return "bg-blue-500/10 border-blue-500/30";
			case "rising_star": return "bg-purple-500/10 border-purple-500/30";
			default: return "";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col animate-in slide-in-from-right-4 fade-in duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-48 -mx-4 -mt-4 mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background z-10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: challenge.banner,
						alt: challenge.title,
						className: "w-full h-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-4 left-4 z-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							size: "icon",
							onClick: onBack,
							className: "rounded-full bg-black/30 text-white hover:bg-black/50 border border-white/10 backdrop-blur-md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-4 left-4 right-4 z-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "mb-2 bg-primary/80 backdrop-blur-md border-primary/20 hover:bg-primary",
								children: challenge.metricLabel
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-bold text-white leading-tight drop-shadow-md",
								children: challenge.title
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "outline",
									className: "rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-5 w-5" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: challenge.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Detalhes do Desafio" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 py-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
											className: "font-semibold text-sm flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-4 h-4 text-primary" }), " Período"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-muted-foreground",
											children: [
												format(new Date(challenge.startDate), "dd 'de' MMMM", { locale: ptBR }),
												" ",
												"até",
												" ",
												format(new Date(challenge.endDate), "dd 'de' MMMM", { locale: ptBR })
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-semibold text-sm",
											children: "Regras"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: challenge.rules
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-semibold text-sm",
											children: "Recompensas"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "list-disc list-inside text-sm text-muted-foreground",
											children: challenge.rewards.map((reward, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: reward }, i))
										})]
									})
								]
							})] })] })]
						})
					})
				]
			}),
			myRank && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6 flex items-center justify-between shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						className: "h-10 w-10 border-2 border-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: mockCurrentUser.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: "EU" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold text-primary",
						children: "Sua Posição"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: mockCurrentUser.name
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-2xl font-black text-primary leading-none",
						children: ["#", myRank.position]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] font-medium text-muted-foreground uppercase",
						children: [
							myRank.points,
							" ",
							challenge.metricLabel
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3 pb-8",
				children: rankings.map((rank) => {
					const isMe = rank.user.id === mockCurrentUser.id;
					const isTop3 = rank.position <= 3;
					const achievement = rank.specialAchievement;
					const achievementStyle = achievement ? getAchievementBg(achievement.type) : "";
					const Icon = achievement ? getAchievementIcon(achievement.type) : null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("relative flex items-center gap-4 p-3 pr-4 rounded-2xl border transition-all duration-300 group", isTop3 ? "bg-gradient-to-r from-card to-background border-border/60 shadow-sm" : "bg-card border-border/30 hover:border-border/60", isMe && "bg-primary/5 border-primary/40 shadow-[0_0_15px_rgba(var(--primary),0.1)] scale-[1.02] z-10", achievement && !isMe && achievementStyle, achievement && isMe && "ring-1 ring-offset-1 ring-offset-background ring-primary/50"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("flex flex-col items-center justify-center w-8 shrink-0", isTop3 ? "scale-110" : ""),
								children: rank.position === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-7 w-7 text-yellow-500 fill-yellow-500 animate-[bounce_2s_infinite]" }) : rank.position === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Medal, { className: "h-6 w-6 text-slate-400 fill-slate-200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-1 -right-1 text-[10px] font-bold bg-slate-500 text-white w-4 h-4 flex items-center justify-center rounded-full",
										children: "2"
									})]
								}) : rank.position === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Medal, { className: "h-6 w-6 text-orange-700 fill-orange-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-1 -right-1 text-[10px] font-bold bg-orange-800 text-white w-4 h-4 flex items-center justify-center rounded-full",
										children: "3"
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-lg font-bold text-muted-foreground/60",
									children: ["#", rank.position]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
									className: cn("h-12 w-12 border-2 transition-transform group-hover:scale-105", rank.position === 1 ? "border-yellow-500 ring-2 ring-yellow-500/20" : rank.position === 2 ? "border-slate-400" : rank.position === 3 ? "border-orange-700" : "border-transparent bg-muted", isMe && "border-primary ring-2 ring-primary/20", achievement && !isMe && !isTop3 && cn("border-opacity-50", getAchievementColor(achievement.type).replace("text-", "border-"))),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
										src: rank.user.avatar,
										className: "object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: rank.user.name[0] })]
								}), isMe && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -bottom-1 -right-1 w-4 h-4 bg-primary border-2 border-white rounded-full flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 bg-white rounded-full animate-pulse" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0 flex flex-col justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: cn("font-bold text-sm truncate leading-tight", isMe && "text-primary"),
										children: isMe ? "Você" : rank.user.name
									}), achievement && Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: cn("cursor-help p-0.5 rounded-full hover:bg-muted transition-colors", getAchievementColor(achievement.type)),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-3.5 h-3.5" })
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
										side: "right",
										className: "text-xs bg-popover text-popover-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold",
											children: achievement.label
										})
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground truncate leading-tight mt-0.5",
									children: rank.user.team || "Atleta Independente"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right flex flex-col items-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: cn("font-bold text-lg leading-none", isMe ? "text-primary" : "text-foreground"),
									children: [rank.points, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-normal text-muted-foreground ml-1 lowercase",
										children: challenge.metricLabel
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 mt-1 bg-muted/50 px-1.5 py-0.5 rounded-full",
									children: [
										rank.trend === "up" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3 text-emerald-500" }),
										rank.trend === "down" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-3 w-3 text-rose-500" }),
										rank.trend === "same" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3 text-muted-foreground" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("text-[10px] font-medium", rank.trend === "up" ? "text-emerald-600" : rank.trend === "down" ? "text-rose-600" : "text-muted-foreground"),
											children: rank.trend === "up" ? "Subiu" : rank.trend === "down" ? "Caiu" : "-"
										})
									]
								})]
							})
						]
					}, rank.id);
				})
			})
		]
	});
}
function EmotionalRanking() {
	const sortedRankings = [...mockPsychologicalRankings].sort((a, b) => b.totalScore - a.totalScore);
	const myRank = sortedRankings.find((r) => r.user.id === mockCurrentUser.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-purple-500/20 rounded-2xl p-4 flex items-center justify-between shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-2 bg-purple-500/20 rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "w-6 h-6 text-purple-500" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-bold text-base leading-tight",
					children: "Ranking Emocional"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Inteligência Emocional & Resiliência"
				})] })]
			}), myRank && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-2xl font-black text-purple-500 leading-none",
					children: ["#", myRank.position]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-medium text-muted-foreground uppercase",
					children: "Sua Posição"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3 pb-8",
			children: sortedRankings.map((rank) => {
				const isMe = rank.user.id === mockCurrentUser.id;
				const isTop3 = rank.position <= 3;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("relative flex flex-col gap-3 p-4 rounded-2xl border transition-all duration-300 group", isTop3 ? "bg-gradient-to-r from-card to-background border-border/60 shadow-sm" : "bg-card border-border/30 hover:border-border/60", isMe && "bg-purple-500/5 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.1)] scale-[1.01] z-10"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("flex flex-col items-center justify-center w-8 shrink-0", isTop3 ? "scale-110" : ""),
								children: rank.position === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-7 w-7 text-yellow-500 fill-yellow-500" }) : rank.position === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Medal, { className: "h-6 w-6 text-slate-400 fill-slate-200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-1 -right-1 text-[10px] font-bold bg-slate-500 text-white w-4 h-4 flex items-center justify-center rounded-full",
										children: "2"
									})]
								}) : rank.position === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Medal, { className: "h-6 w-6 text-orange-700 fill-orange-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-1 -right-1 text-[10px] font-bold bg-orange-800 text-white w-4 h-4 flex items-center justify-center rounded-full",
										children: "3"
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-lg font-bold text-muted-foreground/60",
									children: ["#", rank.position]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
									className: cn("h-12 w-12 border-2 transition-transform group-hover:scale-105", isMe ? "border-purple-500 ring-2 ring-purple-500/20" : "border-transparent bg-muted"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
										src: rank.user.avatar,
										className: "object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: rank.user.name[0] })]
								}), isMe && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -bottom-1 -right-1 w-4 h-4 bg-purple-500 border-2 border-white rounded-full flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 bg-white rounded-full animate-pulse" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: cn("font-bold text-sm truncate leading-tight", isMe && "text-purple-600"),
										children: isMe ? "Você" : rank.user.name
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground truncate leading-tight mt-0.5",
									children: rank.user.team || "Atleta Independente"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right flex flex-col items-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: cn("text-xs font-bold px-2 py-0.5", isMe ? "bg-purple-500 hover:bg-purple-600" : "bg-primary hover:bg-primary/90"),
									children: rank.totalScore.toFixed(1)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 mt-1",
									children: [
										rank.trend === "up" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3 text-emerald-500" }),
										rank.trend === "down" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-3 w-3 text-rose-500" }),
										rank.trend === "same" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3 text-muted-foreground" })
									]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4 mt-1 px-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-[10px] uppercase font-bold tracking-wide text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "w-3 h-3 text-purple-500" }), " EQ"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-purple-600",
									children: rank.eqScore
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: rank.eqScore,
								className: "h-1.5 bg-purple-100 dark:bg-purple-900/20",
								indicatorClassName: "bg-purple-500"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-[10px] uppercase font-bold tracking-wide text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-3 h-3 text-orange-500" }), " Resiliência"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-orange-600",
									children: rank.resilienceScore
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: rank.resilienceScore,
								className: "h-1.5 bg-orange-100 dark:bg-orange-900/20",
								indicatorClassName: "bg-orange-500"
							})]
						})]
					})]
				}, rank.id);
			})
		})]
	});
}
function Ranking() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const initialTab = searchParams.get("tab") || "weekly";
	const initialMode = searchParams.get("mode") || (searchParams.get("challengeId") ? "challenges" : "global");
	const [timeRange, setTimeRange] = (0, import_react.useState)(initialTab);
	const [metric, setMetric] = (0, import_react.useState)("points");
	const [viewMode, setViewMode] = (0, import_react.useState)(initialMode);
	const [selectedChallengeId, setSelectedChallengeId] = (0, import_react.useState)(searchParams.get("challengeId") || null);
	const rankings = (0, import_react.useMemo)(() => {
		return getRankings(timeRange, metric);
	}, [timeRange, metric]);
	const getMetricUnit = () => {
		switch (metric) {
			case "points": return "pts";
			case "matches": return "jogos";
			case "wins": return "vits";
			case "assists": return "asts";
			default: return "pts";
		}
	};
	const myRank = rankings.find((r) => r.user.id === mockCurrentUser.id);
	const handleChallengeSelect = (id) => {
		setSelectedChallengeId(id);
		setSearchParams({
			mode: "challenges",
			challengeId: id
		});
	};
	const handleBackToChallenges = () => {
		setSelectedChallengeId(null);
		setSearchParams({ mode: "challenges" });
	};
	const handleModeChange = (mode) => {
		setViewMode(mode);
		if (mode === "global" || mode === "emotional") {
			setSelectedChallengeId(null);
			setSearchParams({
				tab: timeRange,
				mode
			});
		} else setSearchParams({ mode: "challenges" });
	};
	const selectedChallenge = mockChallenges.find((c) => c.id === selectedChallengeId);
	const getAchievementIcon = (type) => {
		switch (type) {
			case "mvp": return Star;
			case "streak": return Flame;
			case "veteran": return Shield;
			case "rising_star": return Zap;
			default: return Star;
		}
	};
	const getAchievementColor = (type) => {
		switch (type) {
			case "mvp": return "text-yellow-500";
			case "streak": return "text-orange-500";
			case "veteran": return "text-blue-500";
			case "rising_star": return "text-purple-500";
			default: return "text-primary";
		}
	};
	const getAchievementBg = (type) => {
		switch (type) {
			case "mvp": return "bg-yellow-500/10 border-yellow-500/30";
			case "streak": return "bg-orange-500/10 border-orange-500/30";
			case "veteran": return "bg-blue-500/10 border-blue-500/30";
			case "rising_star": return "bg-purple-500/10 border-purple-500/30";
			default: return "";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-primary/5 pb-6 pt-6 px-4 relative z-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => navigate(-1),
							className: "hover:bg-primary/10 -ml-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-6 w-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-xl font-bold",
								children: "Ranking"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground font-medium tracking-wide uppercase",
								children: "Temporada 2024"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-background/60 p-1 rounded-xl backdrop-blur-md shadow-sm border border-white/20 dark:border-white/5 mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
						value: viewMode,
						onValueChange: handleModeChange,
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid w-full grid-cols-3 h-10 bg-transparent p-0 gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "global",
									className: "text-sm font-medium h-full rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-primary data-[state=active]:shadow-sm",
									children: "Global"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "challenges",
									className: "text-sm font-medium h-full rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-primary data-[state=active]:shadow-sm",
									children: "Desafios"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "emotional",
									className: "text-sm font-medium h-full rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-primary data-[state=active]:shadow-sm",
									children: "Emocional"
								})
							]
						})
					})
				}),
				viewMode === "global" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-background/60 p-1 rounded-xl backdrop-blur-md shadow-sm border border-white/20 dark:border-white/5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
							value: timeRange,
							onValueChange: (v) => {
								setTimeRange(v);
								setSearchParams({
									tab: v,
									mode: "global"
								});
							},
							className: "w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "grid w-full grid-cols-4 h-9 bg-transparent p-0 gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "daily",
										className: "text-xs h-full rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-primary data-[state=active]:shadow-sm",
										children: "Dia"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "weekly",
										className: "text-xs h-full rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-primary data-[state=active]:shadow-sm",
										children: "Semana"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "monthly",
										className: "text-xs h-full rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-primary data-[state=active]:shadow-sm",
										children: "Mês"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "all_time",
										className: "text-xs h-full rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-primary data-[state=active]:shadow-sm",
										children: "Geral"
									})
								]
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 bg-background/60 rounded-xl p-3 backdrop-blur-md border border-white/20 dark:border-white/5 flex items-center justify-between shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-4 w-4 text-yellow-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold",
									children: "Métrica"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: metric,
								onValueChange: (v) => setMetric(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "w-[120px] h-7 text-xs bg-white/50 dark:bg-black/20 border-0 focus:ring-0 px-2 py-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "points",
										children: "Pontos"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "wins",
										children: "Vitórias"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "matches",
										children: "Partidas"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "assists",
										children: "Assistências"
									})
								] })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-none bg-primary text-primary-foreground rounded-xl px-4 py-2 flex flex-col items-center justify-center shadow-md min-w-[80px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] opacity-80 uppercase font-bold",
								children: "Você"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-baseline gap-0.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-lg font-bold",
									children: ["#", myRank?.position || "-"]
								})
							})]
						})]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 bg-background rounded-t-[2rem] -mt-6 px-4 pt-8 pb-4 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-20 overflow-visible min-h-[500px]",
			children: viewMode === "challenges" ? selectedChallenge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChallengeRanking, {
				challenge: selectedChallenge,
				onBack: handleBackToChallenges
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChallengesList, { onSelectChallenge: handleChallengeSelect }) : viewMode === "emotional" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmotionalRanking, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [rankings.map((rank) => {
					const isMe = rank.user.id === mockCurrentUser.id;
					const isTop3 = rank.position <= 3;
					const achievement = rank.specialAchievement;
					const achievementStyle = achievement ? getAchievementBg(achievement.type) : "";
					const Icon = achievement ? getAchievementIcon(achievement.type) : null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("relative flex items-center gap-4 p-3 pr-4 rounded-2xl border transition-all duration-300 group", isTop3 ? "bg-gradient-to-r from-card to-background border-border/60 shadow-sm" : "bg-card border-border/30 hover:border-border/60", isMe && "bg-primary/5 border-primary/40 shadow-[0_0_15px_rgba(var(--primary),0.1)] scale-[1.02] z-10", achievement && !isMe && achievementStyle, achievement && isMe && "ring-1 ring-offset-1 ring-offset-background ring-primary/50"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("flex flex-col items-center justify-center w-8 shrink-0", isTop3 ? "scale-110" : ""),
								children: rank.position === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-7 w-7 text-yellow-500 fill-yellow-500 animate-[bounce_2s_infinite]" }) : rank.position === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Medal, { className: "h-6 w-6 text-slate-400 fill-slate-200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-1 -right-1 text-[10px] font-bold bg-slate-500 text-white w-4 h-4 flex items-center justify-center rounded-full",
										children: "2"
									})]
								}) : rank.position === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Medal, { className: "h-6 w-6 text-orange-700 fill-orange-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-1 -right-1 text-[10px] font-bold bg-orange-800 text-white w-4 h-4 flex items-center justify-center rounded-full",
										children: "3"
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-lg font-bold text-muted-foreground/60",
									children: ["#", rank.position]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
										className: cn("h-12 w-12 border-2 transition-transform group-hover:scale-105", rank.position === 1 ? "border-yellow-500 ring-2 ring-yellow-500/20" : rank.position === 2 ? "border-slate-400" : rank.position === 3 ? "border-orange-700" : "border-transparent bg-muted", isMe && "border-primary ring-2 ring-primary/20", achievement && !isMe && !isTop3 && cn("border-opacity-50", getAchievementColor(achievement.type).replace("text-", "border-"))),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
											src: rank.user.avatar,
											className: "object-cover"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: rank.user.name[0] })]
									}),
									isMe && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute -bottom-1 -right-1 w-4 h-4 bg-primary border-2 border-white rounded-full flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 bg-white rounded-full animate-pulse" })
									}),
									achievement && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: cn("absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-sm bg-background", getAchievementColor(achievement.type)),
										children: Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-3 h-3 fill-current" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0 flex flex-col justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: cn("font-bold text-sm truncate leading-tight", isMe && "text-primary"),
										children: isMe ? "Você" : rank.user.name
									}), achievement && Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: cn("cursor-help p-0.5 rounded-full hover:bg-muted transition-colors", getAchievementColor(achievement.type)),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-3.5 h-3.5" })
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
										side: "right",
										className: "text-xs bg-popover text-popover-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold",
											children: achievement.label
										})
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground truncate leading-tight mt-0.5",
									children: rank.user.team || "Atleta Independente"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right flex flex-col items-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: cn("font-bold text-lg leading-none", isMe ? "text-primary" : "text-foreground"),
									children: [rank.points, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-normal text-muted-foreground ml-1",
										children: getMetricUnit()
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 mt-1 bg-muted/50 px-1.5 py-0.5 rounded-full",
									children: [
										rank.trend === "up" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3 text-emerald-500" }),
										rank.trend === "down" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-3 w-3 text-rose-500" }),
										rank.trend === "same" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3 text-muted-foreground" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("text-[10px] font-medium", rank.trend === "up" ? "text-emerald-600" : rank.trend === "down" ? "text-rose-600" : "text-muted-foreground"),
											children: rank.trend === "up" ? "Subiu" : rank.trend === "down" ? "Caiu" : "-"
										})
									]
								})]
							})
						]
					}, rank.id);
				}), rankings.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center py-12 text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Nenhum dado encontrado para este filtro." })
				})]
			})
		})]
	});
}
export { Ranking as default };

//# sourceMappingURL=Ranking-D522O27J.js.map