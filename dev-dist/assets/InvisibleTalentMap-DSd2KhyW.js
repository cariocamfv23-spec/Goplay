import "./chevron-down-00m86Rqa.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-3I6lDVZi.js";
import { Br as createLucideIcon, H as Popover, Ln as Star, Lr as ArrowLeft, Nn as Target, R as Badge, Rn as Sparkles, U as PopoverContent, Un as Search, W as PopoverTrigger, an as Button, bn as cn, di as require_react, en as Avatar, kn as Trophy, kt as mockTalents, li as require_jsx_runtime, nn as AvatarImage, si as useNavigate, tn as AvatarFallback } from "./index-CcX5o6Se.js";
import "./card-CpXR7lrW.js";
import { t as Input } from "./input-Cp-9ani6.js";
import "./DepthContainer-DHCVtGQV.js";
import "./skeleton-CXY7ncMV.js";
import { t as TalentPreviewCard } from "./TalentPreviewCard-CeeucUV3.js";
import { t as Toggle } from "./toggle-AMZxDzUa.js";
var Radar = createLucideIcon("radar", [
	["path", {
		d: "M19.07 4.93A10 10 0 0 0 6.99 3.34",
		key: "z3du51"
	}],
	["path", {
		d: "M4 6h.01",
		key: "oypzma"
	}],
	["path", {
		d: "M2.29 9.62A10 10 0 1 0 21.31 8.35",
		key: "qzzz0"
	}],
	["path", {
		d: "M16.24 7.76A6 6 0 1 0 8.23 16.67",
		key: "1yjesh"
	}],
	["path", {
		d: "M12 18h.01",
		key: "mhygvu"
	}],
	["path", {
		d: "M17.99 11.66A6 6 0 0 1 15.77 16.67",
		key: "1u2y91"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "2",
		key: "1c9p78"
	}],
	["path", {
		d: "m13.41 10.59 5.66-5.66",
		key: "mhq4k0"
	}]
]);
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function TalentMapMarker({ talent, isTopTalent }) {
	const isDiscovered = talent.isDiscovered;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: cn("absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 hover:scale-125 hover:z-50", isTopTalent || isDiscovered ? "z-20" : "z-10"),
			style: {
				left: `${talent.x}%`,
				top: `${talent.y}%`
			},
			children: [
				isDiscovered && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 rounded-full bg-cyan-400/30 animate-ping",
					style: { animationDuration: "3s" }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-2 rounded-full border border-cyan-400/50 animate-pulse" })] }),
				!isDiscovered && isTopTalent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full bg-gold/50 animate-ping" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("relative h-10 w-10 rounded-full border-2 flex items-center justify-center shadow-lg overflow-hidden bg-background transition-colors", isDiscovered ? "border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]" : isTopTalent ? "border-gold shadow-[0_0_15px_rgba(255,215,0,0.5)]" : "border-white/50 hover:border-primary"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						className: "h-full w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
							src: talent.avatar,
							alt: talent.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: talent.name.substring(0, 2) })]
					}), isDiscovered ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-0 right-0 bg-cyan-500 text-white rounded-full p-0.5 border border-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-2 w-2 fill-current" })
					}) : isTopTalent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-0 right-0 bg-gold text-black rounded-full p-0.5 border border-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-2 w-2 fill-current" })
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none backdrop-blur-sm border border-white/10",
					children: talent.name
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
		className: "w-80 p-0 border-none bg-transparent shadow-none",
		side: "top",
		sideOffset: 10,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentPreviewCard, {
			talent,
			isTopTalent
		})
	})] });
}
var generateCoordinates = (id) => {
	const strId = id.toString();
	const seedX = strId.charCodeAt(0) + (strId.charCodeAt(1) || 0);
	const seedY = strId.charCodeAt(strId.length - 1) * 2;
	return {
		x: seedX * 13 % 70 + 15,
		y: seedY * 17 % 70 + 15
	};
};
function InvisibleTalentMap() {
	const navigate = useNavigate();
	const [search, setSearch] = (0, import_react.useState)("");
	const [sportFilter, setSportFilter] = (0, import_react.useState)("all");
	const [positionFilter, setPositionFilter] = (0, import_react.useState)("all");
	const [ratingFilter, setRatingFilter] = (0, import_react.useState)("all");
	const [showDiscoveriesOnly, setShowDiscoveriesOnly] = (0, import_react.useState)(false);
	const filteredTalents = (0, import_react.useMemo)(() => {
		return mockTalents.map((t) => ({
			...t,
			...t.coordinates ? t.coordinates : generateCoordinates(t.id)
		}));
	}, []).filter((talent) => {
		const matchesSearch = talent.name.toLowerCase().includes(search.toLowerCase()) || talent.location.toLowerCase().includes(search.toLowerCase());
		const matchesSport = sportFilter === "all" || talent.sport?.toLowerCase() === sportFilter.toLowerCase();
		const matchesPosition = positionFilter === "all" || talent.position?.toLowerCase().includes(positionFilter.toLowerCase());
		const matchesRating = ratingFilter === "all" || (talent.rating || 0) >= parseFloat(ratingFilter);
		const matchesDiscovery = !showDiscoveriesOnly || talent.isDiscovered === true;
		return matchesSearch && matchesSport && matchesPosition && matchesRating && matchesDiscovery;
	});
	const sports = Array.from(new Set(mockTalents.map((t) => t.sport).filter(Boolean)));
	const positions = Array.from(new Set(mockTalents.map((t) => t.position).filter(Boolean)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 z-0 bg-slate-950",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 bg-cover bg-center opacity-40 grayscale contrast-125",
						style: { backgroundImage: "url('https://img.usecurling.com/p/1600/1200?q=satellite%20city%20map%20dark&color=blue')" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(rgba(0,255,100,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,100,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-pulse" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen animate-pulse delay-700" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/5 rounded-full blur-[60px] pointer-events-none mix-blend-screen" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent w-[200%] h-full animate-[spin_8s_linear_infinite] origin-bottom-left opacity-30 pointer-events-none" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-30 flex flex-col gap-2 p-4 bg-gradient-to-b from-black/90 to-transparent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							size: "icon",
							className: "rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 text-white",
							onClick: () => navigate(-1),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Buscar talento, região...",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								className: "pl-9 h-10 rounded-full bg-black/40 backdrop-blur-md border-white/10 text-white placeholder:text-white/50 focus-visible:ring-primary/50"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "outline",
							className: "hidden md:flex h-10 px-4 rounded-full border-primary/50 text-primary bg-primary/10 backdrop-blur-md gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "h-4 w-4 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold",
								children: "LIVE SCAN"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 overflow-x-auto pb-2 scrollbar-hide mask-fade-right items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Toggle, {
							pressed: showDiscoveriesOnly,
							onPressedChange: setShowDiscoveriesOnly,
							className: cn("h-8 rounded-full border border-white/10 text-xs px-3 gap-1.5 transition-all", showDiscoveriesOnly ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : "bg-black/40 text-white hover:bg-white/10"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-3.5 h-3.5" }), "Descobertas"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: sportFilter,
							onValueChange: setSportFilter,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-[120px] h-8 rounded-full bg-black/40 backdrop-blur-md border-white/10 text-xs text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Esporte" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								className: "bg-slate-900 border-white/10 text-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "Todos Esportes"
								}), sports.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: s || "unknown",
									children: s
								}, s))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: positionFilter,
							onValueChange: setPositionFilter,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-[120px] h-8 rounded-full bg-black/40 backdrop-blur-md border-white/10 text-xs text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Posição" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								className: "bg-slate-900 border-white/10 text-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "Todas Posições"
								}), positions.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: p || "unknown",
									children: p
								}, p))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: ratingFilter,
							onValueChange: setRatingFilter,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-[120px] h-8 rounded-full bg-black/40 backdrop-blur-md border-white/10 text-xs text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Rating" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								className: "bg-slate-900 border-white/10 text-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "all",
										children: "Qualquer Rating"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "4.0",
										children: "4.0+"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "4.5",
										children: "4.5+"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "4.8",
										children: "4.8+ (Elite)"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							className: "h-8 rounded-full bg-primary/20 text-primary hover:bg-primary/30 border border-primary/20 text-xs px-3",
							onClick: () => {
								setSportFilter("all");
								setPositionFilter("all");
								setRatingFilter("all");
								setSearch("");
								setShowDiscoveriesOnly(false);
							},
							children: "Limpar"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 relative z-10 w-full h-full overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative w-full h-full",
					children: filteredTalents.map((talent) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentMapMarker, {
							talent,
							isTopTalent: (talent.rating || 0) >= 4.8 || (talent.stats?.mvp || 0) >= 5
						}, talent.id);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-6 left-4 right-4 z-20 flex justify-between items-end pointer-events-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-xl pointer-events-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-white/60 uppercase tracking-widest font-bold mb-1",
							children: "Talentos na Área"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xl font-black text-white",
								children: filteredTalents.length
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-white/60",
								children: "encontrados"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-xl pointer-events-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							className: "rounded-full h-10 w-10 bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_hsl(var(--primary))]",
							onClick: () => {
								setShowDiscoveriesOnly(!showDiscoveriesOnly);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: cn("h-5 w-5 transition-transform", showDiscoveriesOnly && "scale-110") })
						})
					})]
				})]
			})
		]
	});
}
export { InvisibleTalentMap as default };

//# sourceMappingURL=InvisibleTalentMap-DSd2KhyW.js.map