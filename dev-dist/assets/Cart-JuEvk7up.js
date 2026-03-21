import "./circle-alert-DU3np2lE.js";
import "./circle-check-C-GlI8lt.js";
import { t as PaymentDialog } from "./PaymentDialog-NWIME3hB.js";
import { t as Package } from "./package-DpiwzkbY.js";
import { t as Trash2 } from "./trash-2-qNweuSsD.js";
import { t as Truck } from "./truck-DbQW2mEn.js";
import "./wallet-CGVBAAVt.js";
import { Lr as require_jsx_runtime, On as ShoppingBag, Wr as useNavigate, Xt as Button, br as ArrowLeft, dn as Zap, or as Clock, qr as require_react, t as useCartStore, un as cn } from "./index--2BEb12j.js";
import { n as CardContent, t as Card } from "./card-B3WdK53Y.js";
import "./dist-s-Ke5j7D.js";
import { t as Label } from "./label-C7SP5jMB.js";
import { t as Separator } from "./separator-CzcD6Rgd.js";
import "./input-ChnJ1m4r.js";
import "./tabs-DV33p27t.js";
import { n as RadioGroupItem, t as RadioGroup } from "./radio-group-CAceAwGe.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function Cart() {
	const navigate = useNavigate();
	const { cart, removeFromCart, clearCart, total, totalPoints } = useCartStore();
	const [shippingMethod, setShippingMethod] = (0, import_react.useState)("standard");
	const shippingOptions = [
		{
			id: "standard",
			name: "Frete Padrão",
			price: 0,
			time: "5-7 dias úteis",
			icon: Truck
		},
		{
			id: "express",
			name: "Entrega Expressa",
			price: 14.9,
			time: "2-3 dias úteis",
			icon: Zap
		},
		{
			id: "flash",
			name: "Entrega Flash",
			price: 29.9,
			time: "Chega amanhã",
			icon: Package
		}
	];
	const selectedShipping = shippingOptions.find((o) => o.id === shippingMethod) || shippingOptions[0];
	const finalPrice = total + selectedShipping.price;
	const shippingPoints = Math.round(selectedShipping.price * 100);
	const finalPoints = totalPoints > 0 ? totalPoints + shippingPoints : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col pb-24 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 bg-background/95 backdrop-blur z-20 p-4 border-b border-border/50 flex items-center gap-4 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => navigate(-1),
						className: "rounded-full hover:bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-bold",
						children: "Carrinho"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm text-muted-foreground ml-auto font-medium",
						children: [
							cart.length,
							" ",
							cart.length === 1 ? "item" : "itens"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 space-y-4 flex-1",
				children: cart.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center h-[50vh] text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-secondary/30 p-6 rounded-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-12 w-12 text-muted-foreground/50" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 max-w-[250px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-lg text-foreground",
								children: "Seu carrinho está vazio"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Explore a loja e encontre os melhores produtos para sua performance."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => navigate("/marketplace"),
							className: "rounded-full px-8 shadow-md",
							children: "Ir para a Loja"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: cart.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border border-border/50 shadow-sm overflow-hidden bg-card/50 hover:bg-card transition-colors group",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-3 flex gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-28 w-24 bg-secondary/20 rounded-xl p-2 flex items-center justify-center shrink-0 border border-border/30 overflow-hidden relative",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.image,
									alt: item.name,
									className: "w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 flex flex-col min-h-[7rem]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex justify-between items-start gap-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-bold text-sm leading-tight line-clamp-2 text-foreground",
												children: item.name
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] font-bold text-primary uppercase tracking-wider",
											children: item.category
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed opacity-90",
											children: item.description
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-end mt-3 pt-2 border-t border-border/30",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-baseline gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-base text-foreground",
												children: ["R$ ", item.price.toFixed(2)]
											}), item.quantity > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs text-muted-foreground font-normal",
												children: ["x", item.quantity]
											})]
										}), item.pointsPrice > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] text-gold font-bold flex items-center gap-1",
											children: [
												"+",
												item.pointsPrice * item.quantity,
												" pts"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors",
										onClick: () => removeFromCart(item.id),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								})]
							})]
						})
					}, item.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-bold text-sm flex items-center gap-2 px-1 text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4 text-primary" }), "Opções de Entrega"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
						value: shippingMethod,
						onValueChange: setShippingMethod,
						className: "grid gap-3",
						children: shippingOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							htmlFor: option.id,
							className: cn("flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200", shippingMethod === option.id ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20" : "border-border/50 bg-card/30 hover:bg-card hover:border-primary/30"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
										value: option.id,
										id: option.id,
										className: "sr-only"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: cn("p-2.5 rounded-full transition-colors", shippingMethod === option.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(option.icon, { className: "h-5 w-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: cn("font-semibold text-sm", shippingMethod === option.id ? "text-foreground" : "text-muted-foreground"),
											children: option.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), option.time]
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("font-bold text-sm", shippingMethod === option.id ? "text-primary" : "text-foreground"),
									children: option.price === 0 ? "Grátis" : `R$ ${option.price.toFixed(2)}`
								})
							})]
						}, option.id))
					})]
				})] })
			}),
			cart.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky bottom-0 bg-background/80 backdrop-blur-xl p-6 border-t border-border/50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 mb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Subtotal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["R$ ", total.toFixed(2)] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Frete"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("font-medium", selectedShipping.price === 0 ? "text-green-600" : "text-foreground"),
								children: selectedShipping.price === 0 ? "Grátis" : `R$ ${selectedShipping.price.toFixed(2)}`
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "bg-border/50" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg font-bold",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xl font-bold text-primary",
									children: ["R$ ", finalPrice.toFixed(2)]
								}), finalPoints > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-gold font-bold",
									children: [
										"ou ",
										finalPoints,
										" pts"
									]
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDialog, {
					title: `Compra de ${cart.length} ${cart.length === 1 ? "item" : "itens"}`,
					price: finalPrice,
					pointsPrice: finalPoints,
					onSuccess: clearCart,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "lg",
						className: "w-full h-14 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "mr-2 h-5 w-5" }), " Finalizar Compra"]
					})
				})]
			})
		]
	});
}
export { Cart as default };

//# sourceMappingURL=Cart-JuEvk7up.js.map