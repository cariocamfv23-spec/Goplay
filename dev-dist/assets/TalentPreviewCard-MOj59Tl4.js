import { An as Star, Dr as Activity, Hr as require_jsx_runtime, L as Badge, Sn as Trophy, Un as MapPin, Yr as useNavigate, ar as FilePenLine, gn as Zap, hn as cn, jn as Sparkles, tn as Button, wr as ArrowRight } from "./index-CZGnW8jE.js";
import { n as CardContent, t as Card } from "./card-B-e8E4Uu.js";
import { t as DepthContainer } from "./DepthContainer-DEOZ7mx6.js";
var import_jsx_runtime = require_jsx_runtime();
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-muted", className),
		...props
	});
}
function TalentPreviewCard({ talent, isTopTalent = false }) {
	const navigate = useNavigate();
	if (!talent) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "overflow-hidden border-border/50 shadow-sm bg-background/95 h-[350px] flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-20 bg-muted animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "pt-0 pb-4 px-4 flex-1 flex flex-col mt-[-40px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-end mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 w-20 rounded-full border-4 border-background" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-16" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 mb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-3/4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-1/2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-1/3" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-2 mt-auto mb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 rounded-lg" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 rounded-lg" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 rounded-lg" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full rounded-md" })
			]
		})]
	});
	const isDiscovered = talent?.isDiscovered ?? false;
	const rating = talent?.rating ?? 0;
	const eligibleForContract = rating >= 4.5;
	const avatarUrl = talent.avatar || "https://img.usecurling.com/ppl/medium?gender=male";
	const talentName = talent.name || "Usuário";
	const coverUrl = talent.cover;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthContainer, {
		maxRotation: 4,
		scale: 1.02,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "overflow-hidden border-border/50 shadow-2xl bg-background/95 backdrop-blur-xl animate-in zoom-in-95 duration-200 ring-1 ring-white/10 group flex flex-col h-full hover:border-primary/30 transition-colors",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("h-24 relative overflow-hidden transition-colors duration-300 shrink-0 translate-z-10", isDiscovered ? "bg-gradient-to-r from-cyan-900 to-blue-900" : "bg-gradient-to-r from-primary/20 to-secondary"),
				children: [
					coverUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: coverUrl,
						alt: "Cover",
						className: "absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" }),
					isDiscovered ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute top-2 right-2 flex items-center gap-1 bg-cyan-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-cyan-500/20 z-10 translate-z-20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-3 h-3" }), "Talento Descoberto"]
					}) : isTopTalent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute top-2 right-2 flex items-center gap-1 bg-gold text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10 translate-z-20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-3 h-3" }), "Top Talent"]
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "pt-0 pb-4 px-4 relative flex-1 flex flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative -mt-12 mb-3 flex justify-between items-end translate-z-30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("h-20 w-20 rounded-full border-4 border-background overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-105 bg-muted", isDiscovered ? "ring-2 ring-cyan-400" : isTopTalent ? "ring-2 ring-gold" : ""),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: avatarUrl,
									alt: talentName,
									className: "h-full w-full object-cover",
									onError: (e) => {
										e.currentTarget.src = "https://img.usecurling.com/ppl/medium?gender=male";
									}
								})
							}), isDiscovered ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute -bottom-1 -right-1 bg-cyan-500 rounded-full p-1 border-2 border-background shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-3 h-3 fill-white text-white" })
							}) : isTopTalent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute -bottom-1 -right-1 bg-gold rounded-full p-1 border-2 border-background shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-3 h-3 fill-black text-black" })
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-right pb-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-end gap-1 text-primary font-bold text-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground font-normal uppercase tracking-wider mr-1",
									children: "Rating"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-xl", isDiscovered ? "text-cyan-500" : "text-primary"),
									children: rating.toFixed(1)
								})]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 mb-4 translate-z-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-bold text-lg leading-tight flex items-center gap-1 line-clamp-1",
								children: [talentName, eligibleForContract && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "outline",
									className: "text-[8px] h-4 px-1 border-green-500/50 text-green-600 bg-green-500/10 ml-1 whitespace-nowrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, { className: "w-2 h-2 mr-0.5" }), "Contrato Vivo"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground flex items-center gap-1.5 line-clamp-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-3.5 h-3.5 shrink-0 text-primary/70" }),
									talent.position || "Posição N/A",
									" •",
									" ",
									talent.sport || "Esporte N/A"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground flex items-center gap-1.5 line-clamp-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3.5 h-3.5 shrink-0 text-primary/70" }), talent.location || "Localização N/A"]
							})
						]
					}),
					isDiscovered && talent.discoveryReason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 bg-cyan-950/30 border border-cyan-500/20 rounded-lg p-2.5 animate-in slide-in-from-left-2 fade-in duration-300 translate-z-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "text-[10px] uppercase font-bold text-cyan-400 mb-1 flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3" }), " Motivo da Descoberta"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-cyan-100 leading-snug italic line-clamp-2",
							children: [
								"\"",
								talent.discoveryReason,
								"\""
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-2 mb-4 mt-auto translate-z-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-secondary/50 rounded-lg p-2 text-center border border-border/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-bold text-sm",
									children: talent.stats?.matches || 0
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] text-muted-foreground uppercase font-medium",
									children: "Jogos"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-secondary/50 rounded-lg p-2 text-center border border-border/50",
								children: talent.engagement ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block font-bold text-sm text-green-400 flex items-center justify-center gap-0.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-3 h-3 fill-current" }),
										talent.engagement,
										"%"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] text-muted-foreground uppercase font-medium",
									children: "Engajamento"
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-bold text-sm",
									children: talent.age || "-"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] text-muted-foreground uppercase font-medium",
									children: "Idade"
								})] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-secondary/50 rounded-lg p-2 text-center border border-border/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("block font-bold text-sm", isDiscovered ? "text-cyan-500" : "text-gold"),
									children: talent.stats?.mvp || 0
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] text-muted-foreground uppercase font-medium",
									children: "MVPs"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: cn("w-full h-9 font-semibold gap-2 text-xs uppercase tracking-wide translate-z-20", isDiscovered ? "bg-cyan-600 hover:bg-cyan-700 shadow-[0_0_15px_rgba(8,145,178,0.4)]" : "bg-primary hover:bg-primary/90"),
						onClick: () => {
							if (talent.id) navigate(`/profile/${talent.id}`);
						},
						disabled: !talent.id,
						children: [
							isDiscovered ? "Ver Talento" : "Ver Perfil Completo",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3.5 h-3.5" })
						]
					})
				]
			})]
		})
	});
}
export { TalentPreviewCard as t };

//# sourceMappingURL=TalentPreviewCard-MOj59Tl4.js.map