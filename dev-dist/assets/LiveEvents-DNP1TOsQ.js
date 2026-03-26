import "./chevron-down-NFdNbVwv.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dn027jDc.js";
import { t as CirclePlay } from "./circle-play-BXxYKF2J.js";
import { t as Radio } from "./radio-BA2O6rc-.js";
import { Cr as Clock, Gn as Search, H as Badge, Lr as ArrowLeft, Tn as X, U as ScrollArea, W as ScrollBar, _t as mockLiveEvents, ci as useNavigate, cn as Button, di as require_react, er as MapPin, jn as Trophy, kn as User, ti as require_jsx_runtime } from "./index-BHonH2MR.js";
import { n as CardContent, t as Card } from "./card-5w_MGB-7.js";
import { t as Input } from "./input-B_upe3HX.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
var modalities = [
	{
		id: "all",
		label: "Todos"
	},
	{
		id: "Football",
		label: "Football"
	},
	{
		id: "Basketball",
		label: "Basketball"
	},
	{
		id: "Volleyball",
		label: "Volleyball"
	},
	{
		id: "MMA",
		label: "MMA"
	},
	{
		id: "Tennis",
		label: "Tennis"
	}
];
function LiveEvents() {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [athleteSearch, setAthleteSearch] = (0, import_react.useState)("");
	const [selectedModality, setSelectedModality] = (0, import_react.useState)("all");
	const [selectedCity, setSelectedCity] = (0, import_react.useState)("all");
	const cities = Array.from(new Set(mockLiveEvents.map((e) => e.city))).sort();
	const filteredEvents = mockLiveEvents.filter((event) => {
		const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.championship.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesModality = selectedModality === "all" || event.modality === selectedModality;
		const matchesCity = selectedCity === "all" || event.city === selectedCity;
		const matchesAthlete = athleteSearch === "" || event.athletes?.some((a) => a.toLowerCase().includes(athleteSearch.toLowerCase()));
		return matchesSearch && matchesModality && matchesCity && matchesAthlete;
	});
	const hasActiveFilters = searchTerm !== "" || athleteSearch !== "" || selectedModality !== "all" || selectedCity !== "all";
	const handleClearFilters = () => {
		setSearchTerm("");
		setAthleteSearch("");
		setSelectedModality("all");
		setSelectedCity("all");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in-up",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "-ml-2 hover:bg-secondary/50 rounded-full",
					onClick: () => navigate(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "h-5 w-5 text-red-500 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-ping opacity-75" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500",
						children: "Eventos ao Vivo"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 pb-4 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Buscar jogos, campeonatos...",
							className: "pl-9 bg-secondary border-none rounded-xl",
							value: searchTerm,
							onChange: (e) => setSearchTerm(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Buscar por atleta...",
								className: "pl-9 bg-secondary border-none rounded-xl",
								value: athleteSearch,
								onChange: (e) => setAthleteSearch(e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: selectedCity,
							onValueChange: setSelectedCity,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-[140px] bg-secondary border-none rounded-xl h-10 text-xs font-medium",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 truncate",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Cidade" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "Todas Cidades"
							}), cities.map((city) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: city,
								children: city
							}, city))] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 items-center pt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollArea, {
							className: "flex-1 whitespace-nowrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-2",
								children: modalities.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSelectedModality(m.id),
									className: `
                        px-3 py-1.5 rounded-full text-xs font-medium transition-all
                        ${selectedModality === m.id ? "bg-primary text-primary-foreground shadow-sm" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}
                      `,
									children: m.label
								}, m.id))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {
								orientation: "horizontal",
								className: "invisible"
							})]
						}), hasActiveFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: handleClearFilters,
							className: "text-xs h-8 px-2 shrink-0 text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3 mr-1" }), "Limpar"]
						})]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4 space-y-4",
			children: filteredEvents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center py-10 opacity-60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-12 w-12 mx-auto mb-3 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "No live broadcasts found for the selected filters."
				})]
			}) : filteredEvents.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "group overflow-hidden border-none shadow-md bg-card hover:bg-secondary/20 transition-all cursor-pointer relative",
				onClick: () => navigate(`/explore/live/${event.id}`),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-48 w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: event.image,
							alt: event.title,
							className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-3 right-3",
							children: event.status === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "destructive",
								className: "animate-pulse shadow-lg font-bold",
								children: ["AO VIVO • ", event.viewers]
							}) : event.status === "upcoming" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "secondary",
								className: "bg-black/50 text-white backdrop-blur-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3 mr-1" }), event.startTime]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "bg-gray-800 text-gray-300",
								children: "ENCERRADO"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-14 w-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "h-10 w-10 text-white drop-shadow-md" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-0 left-0 right-0 p-4 text-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-1 text-white/80 text-xs font-medium uppercase tracking-wider",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: event.modality }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: event.city })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-bold leading-tight mb-1",
									children: event.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-white/70",
									children: event.championship
								}),
								event.athletes && event.athletes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-white/60 mt-1 line-clamp-1",
									children: ["Com: ", event.athletes.join(", ")]
								})
							]
						})
					]
				}), event.status !== "upcoming" && event.score && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-3 bg-secondary/30 flex justify-between items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium text-muted-foreground uppercase tracking-widest",
						children: "Placar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-mono font-bold text-primary",
						children: event.score
					})]
				})]
			}, event.id))
		})]
	});
}
export { LiveEvents as default };

//# sourceMappingURL=LiveEvents-DNP1TOsQ.js.map