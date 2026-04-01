import "./qr-code-C-3HS-3p.js";
import "./wallet-Bz41mfOm.js";
import { t as DigitalCard } from "./DigitalCard-BQ5LxdPd.js";
import { $n as MapPin, Ln as Star, R as Badge, Tr as CircleCheckBig, Un as Search, an as Button, en as Avatar, gt as mockNutrition, li as require_jsx_runtime, nn as AvatarImage, si as useNavigate, st as mockHortifrutis, tn as AvatarFallback, xr as CreditCard } from "./index-DXHfWyM7.js";
import { n as CardContent, t as Card } from "./card-CD1j2m5j.js";
import { t as Input } from "./input-BnRv21ju.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-Cb2qhFcN.js";
var import_jsx_runtime = require_jsx_runtime();
function NutritionList() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 bg-background z-20 p-4 border-b border-border/50 shadow-sm backdrop-blur-md bg-background/95",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold",
					children: "Nutrição e Alimentação"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DigitalCard, {
					type: "market",
					title: "Hortifruti Pass",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "text-primary hover:bg-primary/10 rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-5 w-5" })
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Buscar nutricionistas ou lojas...",
					className: "pl-9 bg-secondary border-none rounded-xl"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "hortifrutis",
			className: "w-full px-4 pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "w-full grid grid-cols-2 mb-4 bg-secondary/50 rounded-xl p-1 h-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "nutritionists",
						className: "rounded-lg font-bold py-2",
						children: "Nutricionistas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "hortifrutis",
						className: "rounded-lg font-bold py-2",
						children: "Hortifrutis"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "nutritionists",
					className: "space-y-4 mt-0",
					children: [mockNutrition.map((nutri) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border-none shadow-md cursor-pointer hover:bg-secondary/20 transition-all hover:scale-[1.01]",
						onClick: () => navigate(`/nutrition/${nutri.id}`),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4 flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-16 w-16 border-2 border-border/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: nutri.image }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: nutri.name[0] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-base leading-tight",
										children: nutri.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-primary font-medium mt-0.5",
										children: nutri.specialty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 text-xs text-muted-foreground mt-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 text-gold fill-gold" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-foreground",
												children: nutri.rating
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["• ", nutri.price] })
										]
									})
								]
							})]
						})
					}, nutri.id)), mockNutrition.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-muted-foreground text-sm py-8",
						children: "Nenhum nutricionista encontrado."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "hortifrutis",
					className: "space-y-4 mt-0",
					children: [mockHortifrutis.map((shop) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "border-none shadow-md cursor-pointer overflow-hidden hover:bg-secondary/20 transition-all hover:scale-[1.01]",
						onClick: () => navigate(`/hortifrutis/${shop.id}`),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "h-36 w-full relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: shop.image,
									className: "w-full h-full object-cover",
									alt: shop.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute top-2 right-2 bg-background/80 backdrop-blur-md px-2 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 text-gold fill-gold" }), shop.rating]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-2 left-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										className: "bg-green-600 hover:bg-green-700 text-white border-0 shadow-lg gap-1 px-2 pointer-events-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-3 w-3" }), "Conveniado GoPlay"]
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold text-lg leading-tight",
									children: shop.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-primary font-medium mt-0.5",
									children: shop.specialty
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 text-xs text-muted-foreground mt-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }),
										" ",
										shop.address
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 pt-3 border-t border-border/50 flex justify-between items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-medium text-muted-foreground",
										children: "Cesta a partir de"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-sm text-foreground",
										children: shop.price
									})]
								})
							]
						})]
					}, shop.id)), mockHortifrutis.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-muted-foreground text-sm py-8",
						children: "Nenhum parceiro encontrado."
					})]
				})
			]
		})]
	});
}
export { NutritionList as default };

//# sourceMappingURL=NutritionList-BwjEUb2e.js.map