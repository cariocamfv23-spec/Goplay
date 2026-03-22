import { t as CircleCheck } from "./circle-check-CZwIMKMC.js";
import { $r as require_react, Er as ArrowLeft, K as mockAgencies, Ln as Search, R as Badge, Rn as Plane, Ur as require_jsx_runtime, Wn as MapPin, Xr as useNavigate, jn as Star, nn as Button } from "./index-gMWuR-H4.js";
import { n as CardContent, t as Card } from "./card-Do2Y5ADa.js";
import { t as Input } from "./input-S_2xVAcb.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function AgenciesList() {
	const navigate = useNavigate();
	const [search, setSearch] = (0, import_react.useState)("");
	const filteredAgencies = mockAgencies.filter((agency) => agency.name.toLowerCase().includes(search.toLowerCase()) || agency.description.toLowerCase().includes(search.toLowerCase()) || agency.location.toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "-ml-2 hover:bg-secondary/50 rounded-full",
					onClick: () => navigate("/explore"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-sky-100 dark:bg-sky-900/30 p-1.5 rounded-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plane, { className: "h-5 w-5 text-sky-600 dark:text-sky-400" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-bold text-lg",
						children: "Agências de Intercâmbio"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 pb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Buscar agências, programas ou países...",
						className: "pl-9 bg-secondary border-none rounded-xl",
						value: search,
						onChange: (e) => setSearch(e.target.value)
					})]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4 space-y-4",
			children: filteredAgencies.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center py-10 opacity-60",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plane, { className: "h-12 w-12 mx-auto mb-3 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-medium",
						children: "Nenhuma agência encontrada"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: "Tente ajustar seus termos de busca."
					})
				]
			}) : filteredAgencies.map((agency) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "overflow-hidden border-none shadow-sm cursor-pointer hover:shadow-md transition-all group active:scale-[0.98]",
				onClick: () => navigate(`/explore/agencies/${agency.id}`),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "h-32 relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: agency.cover,
							alt: agency.name,
							className: "w-full h-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute -bottom-4 left-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-12 h-12 bg-background rounded-xl p-1 shadow-lg border border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: agency.logo,
									alt: "Logo",
									className: "w-full h-full object-contain rounded-lg"
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-3 right-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								className: "bg-sky-500 hover:bg-sky-600 text-white border-none shadow-lg",
								children: [
									agency.rating,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 ml-1 fill-current" })
								]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4 pt-6 bg-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-between items-start mb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-bold text-lg leading-tight flex items-center gap-1",
								children: [agency.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-blue-500 fill-blue-100" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
									" ",
									agency.location
								]
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground leading-snug mb-3",
							children: agency.shortDescription
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-1.5",
							children: [agency.services.slice(0, 3).map((service, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] bg-secondary px-2 py-0.5 rounded-md text-muted-foreground font-medium border border-border/50",
								children: service
							}, i)), agency.services.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] bg-secondary px-2 py-0.5 rounded-md text-muted-foreground font-medium border border-border/50",
								children: ["+", agency.services.length - 3]
							})]
						})
					]
				})]
			}, agency.id))
		})]
	});
}
export { AgenciesList as default };

//# sourceMappingURL=AgenciesList-C0f1j2Yg.js.map