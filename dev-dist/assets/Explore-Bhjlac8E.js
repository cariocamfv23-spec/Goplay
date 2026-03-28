import "./cloud-rain-BoXUDHTJ.js";
import { t as MapEventCard } from "./MapEventCard-ByO-tN98.js";
import { t as Paintbrush } from "./paintbrush-DtsrlyvI.js";
import "./wind-B10vCnp5.js";
import { $n as MapPin, Br as createLucideIcon, G as exploreCategories, Mr as Briefcase, Nt as mockVenues, On as Tv, R as Badge, Un as Search, an as Button, bn as cn, bt as mockProfiles, ci as useNavigate, di as require_react, et as mockEvents, ti as require_jsx_runtime } from "./index-D2WRTAIi.js";
import "./card-DdHNvzw1.js";
import { t as Input } from "./input-gq9obG10.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-B-dDdvmX.js";
import "./DepthContainer-BEHZyS29.js";
import { t as TalentPreviewCard } from "./TalentPreviewCard-CrDIMoY-.js";
var ListFilter = createLucideIcon("list-filter", [
	["path", {
		d: "M2 5h20",
		key: "1fs1ex"
	}],
	["path", {
		d: "M6 12h12",
		key: "8npq4p"
	}],
	["path", {
		d: "M9 19h6",
		key: "456am0"
	}]
]);
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function Explore() {
	const [search, setSearch] = (0, import_react.useState)("");
	const navigate = useNavigate();
	const allCategories = [...[
		{
			id: "live",
			label: "Jogos ao Vivo",
			icon: Tv,
			bg: "bg-red-100 dark:bg-red-900/20",
			color: "text-red-600 dark:text-red-400"
		},
		{
			id: "jobs",
			label: "Vagas",
			icon: Briefcase,
			bg: "bg-slate-100 dark:bg-slate-900/20",
			color: "text-slate-600 dark:text-slate-400"
		},
		{
			id: "flyer",
			label: "Criar Flyer",
			icon: Paintbrush,
			bg: "bg-purple-100 dark:bg-purple-900/20",
			color: "text-purple-600 dark:text-purple-400"
		}
	], ...exploreCategories];
	const getCategoryPath = (id) => {
		switch (id) {
			case "contracts": return "/contracts";
			case "jobs": return "/explore/jobs";
			case "live": return "/explore/live";
			case "flyer": return "/explore/flyer-creator";
			case "map-events": return "/explore/map-events";
			default: return `/explore/${id}`;
		}
	};
	const amateurIds = [
		"events",
		"venues",
		"live",
		"gyms",
		"nutrition",
		"clinics",
		"flyer",
		"photographers",
		"kids",
		"drivers",
		"fuel"
	];
	const proIds = [
		"sponsorship",
		"contracts",
		"scholarships",
		"agencies",
		"international",
		"jobs"
	];
	const scoutIds = ["talents"];
	const amateurCategories = amateurIds.map((id) => allCategories.find((c) => c.id === id)).filter(Boolean);
	const proCategories = proIds.map((id) => allCategories.find((c) => c.id === id)).filter(Boolean);
	const scoutCategories = scoutIds.map((id) => allCategories.find((c) => c.id === id)).filter(Boolean);
	const filteredProfiles = mockProfiles.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.sport?.toLowerCase().includes(search.toLowerCase()));
	const filteredEvents = mockEvents.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()));
	const filteredVenues = mockVenues.filter((v) => v.name.toLowerCase().includes(search.toLowerCase()) || v.type.toLowerCase().includes(search.toLowerCase()) || v.location.toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3 space-y-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Buscar atletas, eventos, locais...",
					className: "pl-9 h-11 bg-secondary border-none rounded-xl transition-all focus:ring-2 focus:ring-primary/20",
					value: search,
					onChange: (e) => setSearch(e.target.value)
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 w-1 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-bold text-foreground tracking-tight uppercase",
						children: "Atletas Amadores"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-4 gap-y-6 gap-x-2",
					children: amateurCategories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => navigate(getCategoryPath(cat.id)),
						className: "flex flex-col items-center gap-2 group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-active:scale-95 shadow-sm", cat.bg),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(cat.icon, { className: cn("w-6 h-6", cat.color) })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-medium text-center leading-tight line-clamp-2 max-w-[60px] text-muted-foreground group-hover:text-foreground transition-colors",
							children: cat.label
						})]
					}, cat.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 w-1 rounded-full bg-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-bold text-foreground tracking-tight uppercase",
						children: "Atletas Profissionais"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-4 gap-y-6 gap-x-2",
					children: proCategories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => navigate(getCategoryPath(cat.id)),
						className: "flex flex-col items-center gap-2 group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-active:scale-95 shadow-sm", cat.bg),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(cat.icon, { className: cn("w-6 h-6", cat.color) })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-medium text-center leading-tight line-clamp-2 max-w-[60px] text-muted-foreground group-hover:text-foreground transition-colors",
							children: cat.label
						})]
					}, cat.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 w-1 rounded-full bg-indigo-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-bold text-foreground tracking-tight uppercase",
							children: "Olheiros"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-4 gap-y-6 gap-x-2 mb-6",
						children: scoutCategories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => navigate(getCategoryPath(cat.id)),
							className: "flex flex-col items-center gap-2 group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-active:scale-95 shadow-sm", cat.bg),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(cat.icon, { className: cn("w-6 h-6", cat.color) })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-medium text-center leading-tight line-clamp-2 max-w-[60px] text-muted-foreground group-hover:text-foreground transition-colors",
								children: cat.label
							})]
						}, cat.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-32 rounded-2xl overflow-hidden bg-zinc-900 cursor-pointer group border border-border/50 shadow-md transition-transform active:scale-[0.98]",
						onClick: () => navigate("/explore/talent-map"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "https://img.usecurling.com/p/800/300?q=dark%20map&color=black",
								alt: "Map",
								className: "w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 flex flex-col justify-center p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-xl font-bold flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-5 h-5 text-primary" }), "Mapa de Talentos"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground max-w-[200px]",
									children: "Descubra atletas e oportunidades perto de você."
								})]
							})
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "talents",
					className: "w-full pt-4 border-t",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-4 mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "talents",
									children: "Talentos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "events",
									children: "Eventos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "venues",
									children: "Locais"
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								title: "Filtrar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListFilter, { className: "w-4 h-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "talents",
							className: "space-y-4 mt-0 animate-in fade-in",
							children: [filteredProfiles.length > 0 ? filteredProfiles.slice(0, 5).map((profile) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentPreviewCard, { talent: profile }, profile.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center py-10 text-muted-foreground bg-secondary/30 rounded-xl border border-dashed border-border",
								children: "Nenhum talento encontrado."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "w-full",
								onClick: () => navigate("/explore/talents"),
								children: "Ver Todos os Talentos"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "events",
							className: "space-y-4 mt-0 animate-in fade-in",
							children: [filteredEvents.length > 0 ? filteredEvents.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapEventCard, { event }, event.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center py-10 text-muted-foreground bg-secondary/30 rounded-xl border border-dashed border-border",
								children: "Nenhum evento encontrado."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "w-full",
								onClick: () => navigate("/explore/events"),
								children: "Ver Todos os Eventos"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "venues",
							className: "space-y-4 mt-0 animate-in fade-in",
							children: [filteredVenues.length > 0 ? filteredVenues.slice(0, 5).map((venue) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3 p-3 rounded-xl border border-border/50 bg-card hover:bg-accent/5 transition-colors cursor-pointer shadow-sm active:scale-[0.99]",
								onClick: () => navigate(`/venues/${venue.id}`),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: venue.image,
										alt: venue.name,
										className: "w-full h-full object-cover"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-start",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "font-bold truncate text-sm",
												children: venue.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "secondary",
												className: "text-[10px] px-1.5 h-5",
												children: venue.rating
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground truncate",
											children: [
												venue.type,
												" • ",
												venue.distance
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground mt-0.5 truncate",
											children: venue.address
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-semibold text-primary mt-1.5",
											children: venue.price
										})
									]
								})]
							}, venue.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center py-10 text-muted-foreground bg-secondary/30 rounded-xl border border-dashed border-border",
								children: "Nenhum local encontrado."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "w-full",
								onClick: () => navigate("/explore/venues"),
								children: "Ver Todos os Locais"
							})]
						})
					]
				})
			]
		})]
	});
}
export { Explore as default };

//# sourceMappingURL=Explore-Bhjlac8E.js.map