import { t as Funnel } from "./funnel-B2qTKR1B.js";
import { Ar as Camera, Er as ChevronRight, Ft as photographerCategories, Ln as Star, R as Badge, Un as Search, an as Button, bt as mockProfiles, ci as useNavigate, di as require_react, en as Avatar, nn as AvatarImage, ti as require_jsx_runtime, tn as AvatarFallback } from "./index-DtdimDLb.js";
import { n as CardContent, t as Card } from "./card-DDpEGeqV.js";
import { t as Input } from "./input-BvAQnsds.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function PhotographersList() {
	const navigate = useNavigate();
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)(null);
	const [search, setSearch] = (0, import_react.useState)("");
	const filteredPhotographers = mockProfiles.filter((p) => p.type === "photographer").filter((p) => {
		const matchesCategory = selectedCategory ? p.categories?.includes(selectedCategory) : true;
		const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
		return matchesCategory && matchesSearch;
	});
	const getStartingPrice = (profile) => {
		if (!profile.packages || profile.packages.length === 0) return null;
		return profile.packages[0].price;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 px-4 py-4 shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Buscar fotógrafos...",
						className: "pl-9 bg-secondary border-none rounded-xl",
						value: search,
						onChange: (e) => setSearch(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "icon",
					className: "shrink-0 rounded-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-4 w-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 overflow-x-auto pb-2 scrollbar-hide",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: selectedCategory === null ? "default" : "secondary",
					size: "sm",
					className: "rounded-full px-4 shadow-sm h-8",
					onClick: () => setSelectedCategory(null),
					children: "Todos"
				}), photographerCategories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: selectedCategory === category ? "default" : "secondary",
					size: "sm",
					className: "rounded-full px-4 shadow-sm whitespace-nowrap h-8",
					onClick: () => setSelectedCategory(category),
					children: category
				}, category))]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-lg font-bold flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-5 w-5 text-primary" }), "Fotógrafos Profissionais"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted-foreground",
						children: [filteredPhotographers.length, " encontrados"]
					})]
				}),
				filteredPhotographers.map((photographer) => {
					const startPrice = getStartingPrice(photographer);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "overflow-hidden border-none shadow-md cursor-pointer hover:shadow-lg transition-all group",
						onClick: () => navigate(`/profile/${photographer.id}`),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "h-28 bg-muted relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: photographer.cover,
									className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
									alt: "Cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-2 right-2 flex gap-1",
									children: photographer.categories?.slice(0, 2).map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: "bg-black/50 text-white backdrop-blur-md border-0",
										children: cat
									}, cat))
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4 relative pt-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-end -mt-8 mb-3 px-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
											className: "h-16 w-16 border-4 border-background shadow-md",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: photographer.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: photographer.name[0] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute -bottom-2 -right-2 bg-background rounded-full p-1 shadow-sm",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												variant: "secondary",
												className: "flex items-center gap-1 text-[10px] h-5 px-1.5 bg-secondary text-foreground whitespace-nowrap shadow-none",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-gold text-gold" }), photographer.rating]
											})
										})]
									}), startPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-white/90 font-medium drop-shadow-md",
											children: "A partir de"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg font-bold text-white drop-shadow-md leading-none",
											children: startPrice
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors",
										children: photographer.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground line-clamp-2",
										children: photographer.bio
									})]
								}),
								photographer.portfolio && photographer.portfolio.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-3 gap-1.5 h-20 rounded-lg overflow-hidden",
									children: photographer.portfolio.slice(0, 3).map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative w-full h-full",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: img,
											className: "w-full h-full object-cover",
											alt: "Portfolio"
										}), i === 2 && photographer.portfolio && photographer.portfolio.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-0 bg-black/50 flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-white text-xs font-bold",
												children: ["+", photographer.portfolio.length - 3]
											})
										})]
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									className: "w-full mt-3 h-8 text-xs text-muted-foreground hover:text-primary",
									children: ["Ver Perfil Completo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3 ml-1" })]
								})
							]
						})]
					}, photographer.id);
				}),
				filteredPhotographers.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-10 text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-secondary/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-10 w-10 opacity-20" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-lg mb-1",
							children: "Nenhum fotógrafo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm max-w-[200px] mx-auto",
							children: "Tente mudar os filtros ou busque por outro termo."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "mt-4",
							onClick: () => {
								setSearch("");
								setSelectedCategory(null);
							},
							children: "Limpar Filtros"
						})
					]
				})
			]
		})]
	});
}
export { PhotographersList as default };

//# sourceMappingURL=PhotographersList-CyH8x7HE.js.map