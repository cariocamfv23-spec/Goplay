import "./chevron-down-JC8yoxH0.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-J8ZJVbSk.js";
import "./cloud-rain-CJ5ua7-_.js";
import { t as MapEventCard } from "./MapEventCard-B_sQmxsJ.js";
import { t as Funnel } from "./funnel-Doi9WXDX.js";
import { t as List } from "./list-C9723dQ0.js";
import "./wind-B8m-GPT4.js";
import { $n as MapPin, H as Popover, Lr as ArrowLeft, Qn as Map, U as PopoverContent, Un as Search, W as PopoverTrigger, an as Button, di as require_react, dr as Globe, et as mockEvents, li as require_jsx_runtime, si as useNavigate } from "./index-D7HAKqsN.js";
import "./card-Df0uDja_.js";
import { t as Input } from "./input-DbceDMoC.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function MapEvents() {
	const navigate = useNavigate();
	const [viewMode, setViewMode] = (0, import_react.useState)("map");
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedModality, setSelectedModality] = (0, import_react.useState)("all");
	const [selectedLocation, setSelectedLocation] = (0, import_react.useState)("all");
	const modalities = Array.from(new Set(mockEvents.map((e) => e.modality).filter(Boolean)));
	const locations = Array.from(new Set(mockEvents.map((e) => e.city).filter(Boolean)));
	const filteredEvents = mockEvents.filter((event) => {
		const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) || event.description.toLowerCase().includes(search.toLowerCase());
		const matchesModality = selectedModality === "all" || event.modality === selectedModality;
		const matchesLocation = selectedLocation === "all" || event.city === selectedLocation;
		return matchesSearch && matchesModality && matchesLocation;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col relative pb-safe",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 p-4 pb-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => navigate(-1),
						className: "-ml-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Buscar eventos...",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							className: "pl-9 h-10 rounded-xl bg-secondary border-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => setViewMode(viewMode === "map" ? "list" : "map"),
						className: "rounded-xl bg-secondary",
						children: viewMode === "map" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "h-5 w-5" })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 p-4 pt-0 overflow-x-auto scrollbar-hide",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: selectedModality,
						onValueChange: setSelectedModality,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-[140px] h-9 rounded-full bg-secondary border-none text-xs font-medium",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Modalidade" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "Todas Modalidades"
						}), modalities.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: m,
							children: m
						}, m))] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: selectedLocation,
						onValueChange: setSelectedLocation,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-[130px] h-9 rounded-full bg-secondary border-none text-xs font-medium",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Localização" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "Todas Cidades"
						}), locations.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: l,
							children: l
						}, l))] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						className: "rounded-full border-border/50 bg-background h-9 px-3 gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs",
							children: "Global"
						})]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 relative overflow-hidden flex flex-col",
			children: viewMode === "map" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 bg-secondary/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full h-full bg-cover bg-center relative opacity-80",
					style: { backgroundImage: "url('https://img.usecurling.com/p/1200/1200?q=map%20street%20view&color=gray')" },
					children: filteredEvents.map((event) => event.coordinates ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "absolute w-8 h-8 -ml-4 -mt-8 hover:scale-125 transition-transform duration-200 z-10",
							style: {
								left: `${event.coordinates.x}%`,
								top: `${event.coordinates.y}%`
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full h-full bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-in zoom-in",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-white" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45 -mt-1 border-r border-b border-white" })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
						className: "w-64 p-0 border-none shadow-xl bg-transparent",
						sideOffset: 5,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapEventCard, {
							event,
							compact: true
						})
					})] }, event.id) : null)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-6 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-border/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-medium flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3 text-primary" }),
							filteredEvents.length,
							" eventos encontrados nesta região"
						]
					})
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto p-4 space-y-4",
				children: filteredEvents.length > 0 ? filteredEvents.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapEventCard, { event }, event.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center py-12 text-center text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-12 w-12 mb-4 opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Nenhum evento encontrado." })]
				})
			})
		})]
	});
}
export { MapEvents as default };

//# sourceMappingURL=MapEvents-CkfSOeqR.js.map