import { t as CircleAlert } from "./circle-alert-BoVWrdq3.js";
import { t as List } from "./list-C9723dQ0.js";
import { $n as MapPin, Cr as Clock, Fr as Baby, Lr as ArrowLeft, Qn as Map, R as Badge, Tn as Users, Tr as CircleCheckBig, an as Button, bn as cn, di as require_react, dt as mockKidZones, i as DialogDescription, ir as Info, li as require_jsx_runtime, r as DialogContent, s as DialogTitle, si as useNavigate, t as Dialog } from "./index-D7HAKqsN.js";
import { t as Card } from "./card-Df0uDja_.js";
import { t as Progress } from "./progress-BIHdl0of.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function KidsZoneMap() {
	const navigate = useNavigate();
	const [viewMode, setViewMode] = (0, import_react.useState)("map");
	const [selectedZone, setSelectedZone] = (0, import_react.useState)(null);
	const getStatusColor = (status) => {
		switch (status) {
			case "open": return "text-green-500 bg-green-500/10 border-green-500/20";
			case "full": return "text-red-500 bg-red-500/10 border-red-500/20";
			case "maintenance": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
			case "closed": return "text-gray-500 bg-gray-500/10 border-gray-500/20";
			default: return "text-gray-500 bg-gray-500/10";
		}
	};
	const getStatusLabel = (status) => {
		switch (status) {
			case "open": return "Disponível";
			case "full": return "Lotado";
			case "maintenance": return "Manutenção";
			case "closed": return "Fechado";
			default: return status;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col relative pb-safe",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => navigate("/move"),
							className: "-ml-2 hover:bg-secondary/50 rounded-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-lg font-bold leading-tight flex items-center gap-2",
							children: ["Mapa Kids ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Baby, { className: "h-4 w-4 text-primary" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Copa Goplay Finals • Arena XP"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex bg-secondary/50 p-1 rounded-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => setViewMode("map"),
							className: cn("h-7 px-3 rounded-md transition-all", viewMode === "map" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "h-4 w-4 mr-1.5" }), "Mapa"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => setViewMode("list"),
							className: cn("h-7 px-3 rounded-md transition-all", viewMode === "list" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "h-4 w-4 mr-1.5" }), "Lista"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 relative overflow-hidden flex flex-col",
				children: viewMode === "map" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 relative bg-secondary/30 overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 bg-cover bg-center opacity-90",
						style: { backgroundImage: "url('https://img.usecurling.com/p/1200/800?q=stadium%20layout%20plan&color=gray')" },
						children: mockKidZones.map((zone) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSelectedZone(zone),
							className: "absolute transform -translate-x-1/2 -translate-y-1/2 group z-10 transition-transform hover:scale-110 focus:outline-none",
							style: {
								left: `${zone.coordinates.x}%`,
								top: `${zone.coordinates.y}%`
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: cn("w-10 h-10 rounded-full border-2 border-white shadow-xl flex items-center justify-center transition-colors", zone.status === "open" ? "bg-green-500" : zone.status === "full" ? "bg-red-500" : "bg-gray-500"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Baby, { className: "h-6 w-6 text-white" })
									}),
									zone.status === "open" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30 -z-10" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 backdrop-blur text-white text-[10px] font-bold rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
										children: zone.name
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute top-8 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px]", zone.status === "open" ? "border-t-green-500" : zone.status === "full" ? "border-t-red-500" : "border-t-gray-500") })]
						}, zone.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-6 left-4 right-4 bg-background/90 backdrop-blur-xl border border-border/50 rounded-2xl p-4 shadow-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-green-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Disponível" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-red-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lotado" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-gray-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fechado" })]
								})
							]
						})
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto p-4 space-y-4",
					children: mockKidZones.map((zone) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "overflow-hidden border-none shadow-md cursor-pointer hover:bg-accent/5 transition-colors",
						onClick: () => setSelectedZone(zone),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-32",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-32 shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: zone.image,
									alt: zone.name,
									className: "w-full h-full object-cover"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 p-3 flex flex-col justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-start mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-sm line-clamp-1",
										children: zone.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: cn("text-[10px] px-1.5 py-0 h-5 font-medium border", getStatusColor(zone.status)),
										children: getStatusLabel(zone.status)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground line-clamp-2 mb-2",
									children: zone.description
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 text-muted-foreground font-medium",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3" }),
											" ",
											zone.ageGroup
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-primary font-bold flex items-center gap-1",
										children: ["Detalhes ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3 rotate-180" })]
									})]
								})]
							})]
						})
					}, zone.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!selectedZone,
				onOpenChange: (open) => !open && setSelectedZone(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					className: "max-w-md p-0 overflow-hidden bg-background border-none",
					children: selectedZone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-48",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: selectedZone.image,
								alt: selectedZone.name,
								className: "w-full h-full object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "icon",
								className: "absolute top-2 right-2 text-white hover:bg-white/20 rounded-full",
								onClick: () => setSelectedZone(null),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-6 w-6 rotate-180" }), " "]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-4 left-4 right-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: cn("mb-2 border-0", getStatusColor(selectedZone.status).replace("border", "bg")),
									children: getStatusLabel(selectedZone.status)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
									className: "text-2xl font-bold text-white leading-tight",
									children: selectedZone.name
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5 text-primary shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-semibold text-sm",
									children: "Localização"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
									className: "text-sm mt-0.5",
									children: selectedZone.location
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-sm font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lotação Atual" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: cn(selectedZone.capacity.current >= selectedZone.capacity.max ? "text-red-500" : "text-green-500"),
											children: [
												selectedZone.capacity.current,
												" /",
												" ",
												selectedZone.capacity.max,
												" crianças"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
										value: selectedZone.capacity.current / selectedZone.capacity.max * 100,
										className: "h-2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground text-right",
										children: "Atualizado há 2 min"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-secondary/30 p-3 rounded-xl border border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mb-2 text-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold uppercase",
											children: "Idade"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: selectedZone.ageGroup
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-secondary/30 p-3 rounded-xl border border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mb-2 text-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold uppercase",
											children: "Tempo"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: "Ilimitado"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "font-semibold text-sm mb-3 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-4 w-4 text-primary" }), " Atividades"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: selectedZone.activities.map((act) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									className: "font-normal",
									children: act
								}, act))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										className: "font-semibold text-sm flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4 w-4 text-primary" }), " Regras e Segurança"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "space-y-2",
										children: selectedZone.rules.map((rule, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "text-sm text-muted-foreground flex items-start gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" }), rule]
										}, idx))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 p-2 rounded-lg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Monitores responsáveis: ", selectedZone.monitors.join(", ")] })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full font-bold shadow-lg shadow-primary/20",
								children: "Solicitar Check-in"
							})
						]
					})] })
				})
			})
		]
	});
}
export { KidsZoneMap as default };

//# sourceMappingURL=KidsZoneMap-BPmlOvUG.js.map