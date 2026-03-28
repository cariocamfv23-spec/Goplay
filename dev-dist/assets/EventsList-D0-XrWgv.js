import { $n as MapPin, R as Badge, Sn as X, Un as Search, an as Button, ci as useNavigate, di as require_react, et as mockEvents, jr as Calendar, ti as require_jsx_runtime } from "./index-D2WRTAIi.js";
import { n as CardContent, t as Card } from "./card-DdHNvzw1.js";
import { t as Input } from "./input-gq9obG10.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function EventsList() {
	const navigate = useNavigate();
	const [search, setSearch] = (0, import_react.useState)("");
	const filtered = mockEvents.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()) || e.location.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 bg-background/95 backdrop-blur z-20 p-4 border-b border-border/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-bold mb-4",
				children: "Eventos Esportivos"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Buscar eventos, locais...",
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
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4 space-y-4",
			children: filtered.length > 0 ? filtered.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "overflow-hidden border-none shadow-md cursor-pointer hover:scale-[1.01] transition-transform active:scale-[0.99]",
				onClick: () => navigate(`/events/${event.id}`),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "h-32 relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: event.image,
							className: "w-full h-full object-cover",
							alt: event.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "absolute top-2 right-2 shadow-sm",
							children: event.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "absolute bottom-2 left-2 bg-black/60 text-white backdrop-blur-sm border-none",
							children: event.price === 0 ? "Grátis" : `R$ ${event.price.toFixed(2)}`
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-lg mb-2 leading-tight",
						children: event.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-primary" }),
								" ",
								event.date,
								" •",
								" ",
								event.time
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary" }),
								" ",
								event.location
							]
						})]
					})]
				})]
			}, event.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95 duration-300",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-16 w-16 bg-secondary rounded-full flex items-center justify-center mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-8 w-8 text-muted-foreground/50" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-lg mb-1",
						children: "Nenhum evento encontrado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground max-w-[250px] mx-auto",
						children: "Tente buscar por outro termo ou verifique a ortografia."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "mt-4",
						onClick: () => setSearch(""),
						children: "Limpar busca"
					})
				]
			})
		})]
	});
}
export { EventsList as default };

//# sourceMappingURL=EventsList-D0-XrWgv.js.map