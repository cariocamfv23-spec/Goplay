import { t as CircleCheck } from "./circle-check-Dehrnh5C.js";
import { t as CircleQuestionMark } from "./circle-question-mark-C9oMd_Ag.js";
import { t as Package } from "./package-ouuYWtt1.js";
import { t as Truck } from "./truck-DbqOguVt.js";
import { Hr as require_jsx_runtime, L as Badge, R as ScrollArea, Tr as ArrowLeft, Un as MapPin, Xr as useParams, Yr as useNavigate, hn as cn, lr as CreditCard, tn as Button } from "./index-Dx2bvPXd.js";
import { n as CardContent, t as Card } from "./card-B0TLypDf.js";
import { t as Separator } from "./separator-BsN_uTk2.js";
import { t as mockOrders } from "./mock-orders-qRoZdCbG.js";
var import_jsx_runtime = require_jsx_runtime();
function OrderDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const order = mockOrders.find((o) => o.id === id);
	if (!order) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col items-center justify-center p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground mb-4",
			children: "Pedido não encontrado"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: () => navigate(-1),
			children: "Voltar"
		})]
	});
	const getStatusColor = (status) => {
		switch (status) {
			case "delivered": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800";
			case "shipped": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800";
			case "cancelled": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
			default: return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
		}
	};
	const getStatusLabel = (status) => {
		switch (status) {
			case "delivered": return "Pedido Entregue";
			case "shipped": return "Em Trânsito";
			case "cancelled": return "Pedido Cancelado";
			default: return "Processando";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-24 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 bg-background/80 backdrop-blur-xl z-20 p-4 border-b border-border/40 flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: () => navigate(-1),
				className: "rounded-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-bold",
				children: "Detalhes do Pedido"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			className: "h-[calc(100vh-65px)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold text-foreground",
								children: order.id
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: ["Realizado em ", order.date]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: cn("px-3 py-1 text-xs border", getStatusColor(order.status)),
								children: getStatusLabel(order.status)
							})]
						}), order.trackingCode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-secondary/30 p-3 rounded-lg flex items-center gap-3 border border-border/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-5 w-5 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground uppercase font-bold tracking-wider",
										children: "Código de Rastreio"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-mono font-medium",
										children: order.trackingCode
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "sm",
									className: "h-8 text-xs",
									children: "Copiar"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-bold flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4 text-primary" }), " Itens do Pedido"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: order.items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "border-border/50 shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "p-3 flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-16 w-16 bg-white rounded-md border border-border/30 p-1 flex items-center justify-center shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: item.product.image,
											alt: item.product.name,
											className: "w-full h-full object-contain"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "font-semibold text-sm line-clamp-2",
												children: item.product.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground mt-1",
												children: ["Quantidade: ", item.quantity]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1 flex items-baseline gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-medium text-sm",
													children: ["R$ ", item.product.price.toFixed(2)]
												}), item.product.pointsPrice > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[10px] text-gold font-bold",
													children: [
														"+ ",
														item.product.pointsPrice,
														" pts"
													]
												})]
											})
										]
									})]
								})
							}, idx))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-bold flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary" }), " Endereço de Entrega"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm text-muted-foreground bg-secondary/20 p-3 rounded-lg border border-border/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: order.shippingAddress }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs font-medium text-foreground",
									children: ["Método: ", order.shippingMethod]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-bold flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4 text-primary" }), " Pagamento"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm text-muted-foreground bg-secondary/20 p-3 rounded-lg border border-border/50 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-green-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: order.paymentMethod })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold",
							children: "Resumo Financeiro"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["R$ ", (order.total - order.shippingCost).toFixed(2)] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Frete" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: order.shippingCost === 0 ? "Grátis" : `R$ ${order.shippingCost.toFixed(2)}` })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-end font-bold text-lg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-primary",
											children: ["R$ ", order.total.toFixed(2)]
										}), order.totalPoints > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-gold",
											children: [
												"+ ",
												order.totalPoints,
												" pts"
											]
										})]
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "w-full gap-2 mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-4 w-4" }), " Preciso de Ajuda"]
					})
				]
			})
		})]
	});
}
export { OrderDetails as default };

//# sourceMappingURL=OrderDetails-DaCp49Hi.js.map