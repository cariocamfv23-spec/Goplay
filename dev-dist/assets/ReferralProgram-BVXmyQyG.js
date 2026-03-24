import { t as Award } from "./award-CZGscsIq.js";
import { t as CircleCheck } from "./circle-check-DGOoyZ_9.js";
import "./ellipsis-B4-iMt0e.js";
import { t as ShareDialog } from "./ShareDialog-UIF-ZwY9.js";
import { t as Gift } from "./gift-Di0w0D9q.js";
import { t as Mail } from "./mail-CXALgloI.js";
import { t as MessageCircle } from "./message-circle-B0A069fO.js";
import { t as Plus } from "./plus-Dws5D6rl.js";
import { t as Share2 } from "./share-2-pUq6Zivh.js";
import { It as referralLevels, Ln as Sparkles, Pr as createLucideIcon, Tn as Users, V as Badge, Yr as require_jsx_runtime, Zn as Lock, _r as Clock, ai as require_react, an as Button, bn as cn, en as Avatar, et as mockCurrentUser, jr as ArrowLeft, kn as TrendingUp, ni as useNavigate, nn as AvatarImage, tn as AvatarFallback, vn as toast, xn as Zap, z as useNotificationStore_default } from "./index-wbjedP09.js";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-DF86Q89l.js";
import { t as Progress } from "./progress-D2mNgl4n.js";
import { o as toDate, t as ptBR } from "./pt-BR-BJdaBO5r.js";
import { t as formatDistanceToNow } from "./formatDistanceToNow-Bz9o3R6i.js";
var CalendarDays = createLucideIcon("calendar-days", [
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "4",
		rx: "2",
		key: "1hopcy"
	}],
	["path", {
		d: "M3 10h18",
		key: "8toen8"
	}],
	["path", {
		d: "M8 14h.01",
		key: "6423bh"
	}],
	["path", {
		d: "M12 14h.01",
		key: "1etili"
	}],
	["path", {
		d: "M16 14h.01",
		key: "1gbofw"
	}],
	["path", {
		d: "M8 18h.01",
		key: "lrp35t"
	}],
	["path", {
		d: "M12 18h.01",
		key: "mhygvu"
	}],
	["path", {
		d: "M16 18h.01",
		key: "kzsmim"
	}]
]);
var Copy = createLucideIcon("copy", [["rect", {
	width: "14",
	height: "14",
	x: "8",
	y: "8",
	rx: "2",
	ry: "2",
	key: "17jyea"
}], ["path", {
	d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
	key: "zix9uf"
}]]);
var Smartphone = createLucideIcon("smartphone", [["rect", {
	width: "14",
	height: "20",
	x: "5",
	y: "2",
	rx: "2",
	ry: "2",
	key: "1yt0o3"
}], ["path", {
	d: "M12 18h.01",
	key: "mhygvu"
}]]);
var UserCheck = createLucideIcon("user-check", [
	["path", {
		d: "m16 11 2 2 4-4",
		key: "9rsbq5"
	}],
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}]
]);
function isWithinInterval(date, interval, options) {
	const time = +toDate(date, options?.in);
	const [startTime, endTime] = [+toDate(interval.start, options?.in), +toDate(interval.end, options?.in)].sort((a, b) => a - b);
	return time >= startTime && time <= endTime;
}
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function ReferralLevelProgress({ currentReferrals }) {
	const currentLevelIndex = referralLevels.findIndex((level, index) => {
		const nextLevel$1 = referralLevels[index + 1];
		return currentReferrals >= level.minReferrals && (!nextLevel$1 || currentReferrals < nextLevel$1.minReferrals);
	});
	const currentLevel = referralLevels[currentLevelIndex];
	const nextLevel = referralLevels[currentLevelIndex + 1];
	const calculateProgress = () => {
		if (!nextLevel) return 100;
		const totalNeeded = nextLevel.minReferrals - currentLevel.minReferrals;
		const currentProgress = currentReferrals - currentLevel.minReferrals;
		return Math.min(Math.round(currentProgress / totalNeeded * 100), 100);
	};
	const progress = calculateProgress();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "border-none shadow-md bg-card/50 backdrop-blur-sm overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("h-12 w-12 rounded-full flex items-center justify-center bg-secondary shadow-sm", currentLevel.color.replace("text-", "bg-").replace("600", "100")),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(currentLevel.icon, { className: cn("h-6 w-6", currentLevel.color) })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground uppercase font-bold tracking-wider",
							children: "Nível Atual"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: cn("text-xl font-black", currentLevel.color),
							children: currentLevel.name
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl font-black text-foreground",
							children: currentReferrals
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground font-medium",
							children: "Indicações"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-xs font-semibold mb-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Progresso"
						}), nextLevel ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-primary",
							children: [
								nextLevel.minReferrals - currentReferrals,
								" para",
								" ",
								nextLevel.name
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "Nível Máximo!"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: progress,
						className: "h-2.5"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-bold text-muted-foreground flex items-center gap-2",
						children: [
							"Benefícios do Nível ",
							currentLevel.name,
							":"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [currentLevel.benefits.map((benefit, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm bg-secondary/40 p-2 rounded-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-green-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: benefit })]
						}, i)), nextLevel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm bg-muted/30 p-2 rounded-lg opacity-60 border border-dashed border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [
									"Próximo: ",
									nextLevel.benefits[0],
									"..."
								]
							})]
						})]
					})]
				})
			]
		})
	});
}
var getStatusConfig = (status) => {
	switch (status) {
		case "registered": return {
			label: "Cadastro Completo",
			icon: UserCheck,
			color: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
			iconColor: "text-green-600"
		};
		case "downloaded": return {
			label: "App Instalado",
			icon: Smartphone,
			color: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
			iconColor: "text-amber-600"
		};
		case "sent": return {
			label: "Convite Enviado",
			icon: Mail,
			color: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
			iconColor: "text-slate-500"
		};
		default: return {
			label: "Desconhecido",
			icon: Clock,
			color: "bg-gray-100",
			iconColor: "text-gray-500"
		};
	}
};
function ReferralStatusList({ referrals }) {
	if (!referrals || referrals.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "border-none shadow-lg bg-card overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			className: "pb-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				className: "text-lg flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5 text-primary" }), "Minhas Indicações"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-6 text-center text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: "Você ainda não indicou ninguém."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs mt-1",
				children: "Compartilhe seu código para começar a ganhar pontos!"
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "border-none shadow-lg bg-card overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			className: "pb-3 border-b border-border/50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				className: "text-lg flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5 text-primary" }),
					"Minhas Indicações",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "ml-auto",
						children: referrals.length
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "divide-y divide-border/50",
				children: referrals.map((referral) => {
					const statusConfig = getStatusConfig(referral.status);
					const StatusIcon = statusConfig.icon;
					const hasBonus = !!referral.bonusApplied;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 hover:bg-muted/30 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
									className: "h-10 w-10 border border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
										src: referral.avatar,
										alt: referral.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: referral.name.charAt(0) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-bold text-foreground truncate",
											children: referral.name
										}), referral.pointsEarned && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "secondary",
											className: cn("h-5 px-1.5 text-[10px] gap-0.5", hasBonus ? "bg-primary/10 text-primary hover:bg-primary/20" : "bg-green-500/10 text-green-600 hover:bg-green-500/20"),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-2.5 w-2.5" }),
												referral.pointsEarned,
												" pts"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), referral.date]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-col items-end gap-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: cn("flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border", statusConfig.color),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusIcon, { className: "h-3 w-3" }), statusConfig.label]
									})
								})
							]
						}), hasBonus && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 ml-14 flex items-center gap-1.5 text-[10px] text-primary bg-primary/5 w-fit px-2 py-1 rounded-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3 w-3 fill-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium",
								children: ["Bônus aplicado: ", referral.bonusApplied]
							})]
						})]
					}, referral.id);
				})
			})
		})]
	});
}
var now = /* @__PURE__ */ new Date();
var fiveDaysAgo = new Date(now);
fiveDaysAgo.setDate(now.getDate() - 5);
var tenDaysFromNow = new Date(now);
tenDaysFromNow.setDate(now.getDate() + 10);
const mockPromotions = [{
	id: "promo1",
	title: "Verão de Prêmios",
	description: "Convide amigos e ganhe bônus extra por cada cadastro!",
	startDate: fiveDaysAgo.toISOString(),
	endDate: tenDaysFromNow.toISOString(),
	bonusPoints: 100,
	color: "from-orange-500 to-red-600",
	icon: "sun"
}, {
	id: "promo2",
	title: "Sprint Final",
	description: "Últimos dias para dobrar seus pontos.",
	startDate: "2025-12-01T00:00:00Z",
	endDate: "2025-12-31T23:59:59Z",
	bonusPoints: 200,
	color: "from-blue-500 to-cyan-500",
	icon: "zap"
}];
const mockReferrals = [
	{
		id: "r1",
		name: "Carlos Eduardo",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=50",
		status: "registered",
		date: "Hoje, 10:30",
		pointsEarned: 300,
		bonusApplied: "Verão de Prêmios"
	},
	{
		id: "r2",
		name: "Mariana Lima",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=female&seed=51",
		status: "downloaded",
		date: "Ontem, 15:45"
	},
	{
		id: "r3",
		name: "Felipe Costa",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=52",
		status: "sent",
		date: "2 dias atrás"
	},
	{
		id: "r4",
		name: "Ana Souza",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=female&seed=53",
		status: "registered",
		date: "1 semana atrás",
		pointsEarned: 200
	},
	{
		id: "r5",
		name: "Bruno Silva",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=54",
		status: "sent",
		date: "2 semanas atrás"
	}
];
function ActivePromotions({ promotions }) {
	const activePromotions = promotions.filter((promo) => {
		return isWithinInterval(/* @__PURE__ */ new Date(), {
			start: new Date(promo.startDate),
			end: new Date(promo.endDate)
		});
	});
	if (activePromotions.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 animate-fade-in-up",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "font-bold text-lg flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-gold" }), "Promoções Ativas"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				variant: "outline",
				className: "bg-primary/5 border-primary/20",
				children: [activePromotions.length, " disponível(is)"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4",
			children: activePromotions.map((promo) => {
				const timeLeft = formatDistanceToNow(new Date(promo.endDate), {
					locale: ptBR,
					addSuffix: false
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-none overflow-hidden relative group",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute inset-0 bg-gradient-to-r opacity-10 group-hover:opacity-15 transition-opacity", promo.color) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b", promo.color) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-5 relative z-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 mb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "secondary",
												className: cn("text-[10px] px-1.5 py-0 h-5 bg-gradient-to-r text-white border-0 font-bold tracking-wider", promo.color),
												children: "TEMPORADA"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs text-muted-foreground font-medium flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
													"Termina em ",
													timeLeft
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-bold text-lg leading-tight",
											children: promo.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground line-clamp-2",
											children: promo.description
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center justify-center min-w-[80px] bg-background/50 backdrop-blur-sm rounded-xl p-2 border border-border/50 shadow-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold text-muted-foreground uppercase",
											children: "Bônus"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-0.5 text-primary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xl font-black",
												children: ["+", promo.bonusPoints]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-medium text-primary",
											children: "PTS"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-center gap-3 text-xs text-muted-foreground bg-secondary/30 p-2 rounded-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Válido de",
									" ",
									new Date(promo.startDate).toLocaleDateString("pt-BR"),
									" até",
									" ",
									new Date(promo.endDate).toLocaleDateString("pt-BR")
								] })]
							})]
						})
					]
				}, promo.id);
			})
		})]
	});
}
function ReferralProgram() {
	const navigate = useNavigate();
	const { addNotification } = useNotificationStore_default();
	const [isShareOpen, setIsShareOpen] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [referralsList, setReferralsList] = (0, import_react.useState)(mockReferrals);
	const [referralsCount, setReferralsCount] = (0, import_react.useState)(mockCurrentUser.referralStats?.invited || referralsList.length);
	const [totalEarned, setTotalEarned] = (0, import_react.useState)(mockCurrentUser.referralStats?.earned || 0);
	const [prevLevelId, setPrevLevelId] = (0, import_react.useState)("");
	const referralCode = mockCurrentUser.referralCode || "GOPLAY2024";
	const inviteLink = `https://goplay.app/invite/${referralCode}`;
	const inviteMessage = `Baixe o Goplay com meu código ${referralCode} e ganhe 500 pontos na hora! ${inviteLink}`;
	const handleCopyCode = () => {
		navigator.clipboard.writeText(referralCode);
		setCopied(true);
		toast.success("Código copiado!");
		setTimeout(() => setCopied(false), 2e3);
	};
	const handleWhatsappShare = () => {
		const text = encodeURIComponent(inviteMessage);
		window.open(`https://wa.me/?text=${text}`, "_blank");
	};
	const getCurrentLevelId = (count) => {
		return referralLevels[referralLevels.findIndex((level, index) => {
			const nextLevel = referralLevels[index + 1];
			return count >= level.minReferrals && (!nextLevel || count < nextLevel.minReferrals);
		})]?.id || "rookie";
	};
	(0, import_react.useEffect)(() => {
		const currentLevelId = getCurrentLevelId(referralsCount);
		if (!prevLevelId) {
			setPrevLevelId(currentLevelId);
			return;
		}
		if (currentLevelId !== prevLevelId) {
			const newLevel = referralLevels.find((l) => l.id === currentLevelId);
			const oldLevelIndex = referralLevels.findIndex((l) => l.id === prevLevelId);
			const newLevelIndex = referralLevels.findIndex((l) => l.id === currentLevelId);
			if (newLevel && newLevelIndex > oldLevelIndex) {
				toast.success(`Parabéns! Você alcançou o nível ${newLevel.name}!`, {
					description: "Novos benefícios foram desbloqueados em sua conta.",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-5 w-5 text-gold" }),
					duration: 5e3
				});
				addNotification({
					title: "Novo Nível Alcançado!",
					message: `Você agora é nível ${newLevel.name} no programa de indicação. Aproveite seus novos benefícios!`,
					type: "system",
					priority: "high"
				});
			}
			setPrevLevelId(currentLevelId);
		}
	}, [
		referralsCount,
		prevLevelId,
		addNotification
	]);
	const getActivePromotions = () => {
		const now$1 = /* @__PURE__ */ new Date();
		return mockPromotions.filter((promo) => isWithinInterval(now$1, {
			start: new Date(promo.startDate),
			end: new Date(promo.endDate)
		}));
	};
	const simulateReferral = () => {
		const basePoints = 200;
		const activePromotions = getActivePromotions();
		const bonusPoints = activePromotions.reduce((acc, promo) => acc + promo.bonusPoints, 0);
		const totalPoints = basePoints + bonusPoints;
		const activePromoNames = activePromotions.map((p) => p.title).join(", ");
		setReferralsCount((prev) => prev + 1);
		setTotalEarned((prev) => prev + totalPoints);
		const newReferral = {
			id: Math.random().toString(36).substr(2, 9),
			name: "Novo Usuário",
			avatar: `https://img.usecurling.com/ppl/thumbnail?gender=male&seed=${Math.floor(Math.random() * 100)}`,
			status: "registered",
			date: "Agora",
			pointsEarned: totalPoints,
			bonusApplied: activePromoNames || void 0
		};
		setReferralsList((prev) => [newReferral, ...prev]);
		if (bonusPoints > 0) toast.success(`+${totalPoints} Pontos Recebidos!`, {
			description: `${basePoints} (Padrão) + ${bonusPoints} (Bônus: ${activePromoNames})`,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "h-5 w-5 text-primary" }),
			duration: 4e3
		});
		else toast.success(`+${totalPoints} Pontos Recebidos!`, {
			description: "Nova indicação confirmada.",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-green-500" })
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-gradient-to-br from-primary via-purple-700 to-indigo-800 text-white pb-10 rounded-b-[2.5rem] relative overflow-hidden shadow-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[url('https://img.usecurling.com/p/1000/1000?q=abstract%20network&color=purple')] bg-cover opacity-10 mix-blend-overlay" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 p-4 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "text-white hover:bg-white/10",
							onClick: () => navigate(-1),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-lg font-bold",
							children: "Indique e Ganhe"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center pt-6 pb-4 relative z-10 px-6 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-20 w-20 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md mb-4 border border-white/20 shadow-lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "h-10 w-10 text-gold drop-shadow-md" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-3xl font-black tracking-tight mb-2",
								children: [
									"Ganhe pontos ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gold",
										children: "com amigos!"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white/80 text-xs font-bold uppercase tracking-wider",
									children: "Total Ganho:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-white font-black",
									children: [totalEarned, " pts"]
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 -mt-8 relative z-20 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferralLevelProgress, { currentReferrals: referralsCount }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivePromotions, { promotions: mockPromotions }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border-none shadow-lg bg-card overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-6 flex flex-col items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider",
									children: "Seu código exclusivo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full bg-secondary/50 rounded-xl p-4 flex items-center justify-between border border-dashed border-primary/30 cursor-pointer group hover:border-primary/60 transition-colors",
									onClick: handleCopyCode,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl font-black text-primary tracking-widest font-mono",
										children: referralCode
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										className: "text-muted-foreground group-hover:text-primary",
										children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-green-500 font-bold text-xs",
											children: "OK"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-5 w-5" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-2",
									children: "Toque para copiar"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "w-full h-14 text-base font-bold rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white shadow-md transition-all active:scale-[0.98]",
							onClick: handleWhatsappShare,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "mr-2 h-6 w-6" }), "Convidar via WhatsApp"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "w-full h-12 font-bold rounded-xl border-2 hover:bg-secondary/50",
							onClick: () => setIsShareOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "mr-2 h-4 w-4" }), "Outras opções"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferralStatusList, { referrals: referralsList }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-4 border-t border-dashed border-border/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground text-center mb-2",
							children: "Área de Simulação (Dev)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							className: "w-full border border-primary/20 bg-primary/5 text-primary",
							onClick: simulateReferral,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "mr-2 h-4 w-4" }), "Simular +1 Indicação (com bônus)"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareDialog, {
				open: isShareOpen,
				onOpenChange: setIsShareOpen,
				title: "Convite Goplay",
				description: inviteMessage,
				url: inviteLink
			})
		]
	});
}
export { ReferralProgram as default };

//# sourceMappingURL=ReferralProgram-BVXmyQyG.js.map