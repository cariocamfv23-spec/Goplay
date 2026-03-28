import { t as Funnel } from "./funnel-B2qTKR1B.js";
import { $n as MapPin, Ln as Star, Nt as mockVenues, R as Badge, Sn as X, Un as Search, an as Button, bn as cn, ci as useNavigate, di as require_react, kn as Trophy, ti as require_jsx_runtime } from "./index-DtdimDLb.js";
import { n as CardContent, t as Card } from "./card-DDpEGeqV.js";
import { t as Input } from "./input-BvAQnsds.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function VenuesList() {
	const navigate = useNavigate();
	const [search, setSearch] = (0, import_react.useState)("");
	const [activeFilter, setActiveFilter] = (0, import_react.useState)("todos");
	const filters = [
		{
			id: "todos",
			label: "Todos"
		},
		{
			id: "futebol",
			label: "Futebol"
		},
		{
			id: "areia",
			label: "Areia"
		},
		{
			id: "raquete",
			label: "Raquete"
		},
		{
			id: "outros",
			label: "Outros"
		}
	];
	const filteredVenues = mockVenues.filter((venue) => {
		const matchesSearch = venue.name.toLowerCase().includes(search.toLowerCase()) || venue.address.toLowerCase().includes(search.toLowerCase()) || venue.type.toLowerCase().includes(search.toLowerCase());
		let matchesFilter = true;
		if (activeFilter !== "todos") {
			const type = venue.type.toLowerCase();
			if (activeFilter === "futebol") matchesFilter = type.includes("futsal") || type.includes("society");
			else if (activeFilter === "areia") matchesFilter = type.includes("areia") || type.includes("beach") || type.includes("futevôlei") || type.includes("vôlei");
			else if (activeFilter === "raquete") matchesFilter = type.includes("tênis") || type.includes("padel") || type.includes("squash");
			else if (activeFilter === "outros") matchesFilter = type.includes("basquete") || type.includes("poliesportiva");
		}
		return matchesSearch && matchesFilter;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Buscar quadras, campos...",
							className: "pl-9 pr-8 bg-secondary border-none rounded-xl",
							value: search,
							onChange: (e) => setSearch(e.target.value)
						}),
						search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSearch(""),
							className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "icon",
					className: "shrink-0 rounded-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-4 w-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto pb-2 scrollbar-hide",
				children: filters.map((filter) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: activeFilter === filter.id ? "default" : "secondary",
					size: "sm",
					className: cn("rounded-full px-4 shadow-sm transition-all", activeFilter === filter.id ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"),
					onClick: () => setActiveFilter(filter.id),
					children: filter.label
				}, filter.id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-lg font-bold flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-5 w-5 text-primary" }), "Quadras e Espaços"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: filteredVenues.map((venue) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "overflow-hidden border-none shadow-md cursor-pointer active:scale-[0.99] transition-transform animate-slide-up hover:shadow-lg group",
						onClick: () => navigate(`/venues/${venue.id}`),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-44",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: venue.image,
									className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
									alt: venue.name,
									loading: "lazy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-gold text-gold" }),
										" ",
										venue.rating
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute bottom-2 left-2 bg-primary/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-white shadow-sm",
									children: venue.price
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-2 left-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "backdrop-blur-md bg-black/50 text-white border-none",
										children: venue.type
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-between items-start mb-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-lg leading-tight",
										children: venue.name
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground truncate mb-3 flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
										" ",
										venue.address
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [venue.amenities.slice(0, 3).map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "text-[10px] h-6 bg-secondary/50 font-normal",
										children: item
									}, i)), venue.amenities.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "secondary",
										className: "text-[10px] h-6 bg-secondary/50 font-normal",
										children: ["+", venue.amenities.length - 3]
									})]
								})
							]
						})]
					}, venue.id))
				}),
				filteredVenues.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-10 text-muted-foreground animate-fade-in flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-16 w-16 bg-secondary rounded-full flex items-center justify-center mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-8 w-8 opacity-40" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: "Nenhuma quadra encontrada para o filtro."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm opacity-70 mb-4",
							children: "Tente buscar por outro termo ou categoria."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => {
								setSearch("");
								setActiveFilter("todos");
							},
							className: "mt-2",
							children: "Limpar filtros"
						})
					]
				})
			]
		})]
	});
}
export { VenuesList as default };

//# sourceMappingURL=VenuesList-EZxQ2oQn.js.map