import { t as CircleCheck } from "./circle-check-t5Q9t2f3.js";
import { t as CircleX } from "./circle-x-D81Ess7C.js";
import { t as Package } from "./package-T-PsJ4Zx.js";
import { t as Truck } from "./truck-C20xVlMF.js";
import { Cr as Clock, Er as ChevronRight, Lr as ArrowLeft, R as Badge, an as Button, bn as cn, li as require_jsx_runtime, si as useNavigate } from "./index-gQQ3RAfA.js";
import { n as CardContent, t as Card } from "./card-axhjzWgh.js";
import { t as mockOrders } from "./mock-orders-BssVx8oN.js";
var import_jsx_runtime = require_jsx_runtime();
function OrderHistory() {
	const navigate = useNavigate();
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
			case "delivered": return "Entregue";
			case "shipped": return "Enviado";
			case "cancelled": return "Cancelado";
			default: return "Pendente";
		}
	};
	const getStatusIcon = (status) => {
		switch (status) {
			case "delivered": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3 mr-1" });
			case "shipped": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-3 w-3 mr-1" });
			case "cancelled": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3 w-3 mr-1" });
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3 mr-1" });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
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
				children: "Meus Pedidos"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4 space-y-4",
			children: mockOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-20 text-center space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-secondary/30 p-6 rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-12 w-12 text-muted-foreground/50" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-lg",
							children: "Nenhum pedido encontrado"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground max-w-[250px] mx-auto",
							children: "Você ainda não realizou nenhuma compra na loja Goplay."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => navigate("/marketplace"),
						children: "Ir para a Loja"
					})
				]
			}) : mockOrders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "overflow-hidden border border-border/50 shadow-sm hover:bg-secondary/20 transition-colors cursor-pointer",
				onClick: () => navigate(`/marketplace/orders/${order.id}`),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
									children: order.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: order.date
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								className: cn("flex items-center text-[10px] py-0.5 px-2 border", getStatusColor(order.status)),
								children: [getStatusIcon(order.status), getStatusLabel(order.status)]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 mb-3",
							children: [order.items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-12 w-12 bg-white rounded-md border border-border/50 p-1 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.product.image,
									alt: item.product.name,
									className: "w-full h-full object-contain"
								})
							}, idx)), order.items.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "h-12 w-12 bg-secondary rounded-md flex items-center justify-center text-xs font-bold text-muted-foreground",
								children: ["+", order.items.length - 3]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center pt-3 border-t border-border/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-sm",
										children: ["R$ ", order.total.toFixed(2)]
									}), order.totalPoints > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] text-gold font-bold",
										children: [
											"ou ",
											order.totalPoints,
											" pts"
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center text-primary text-xs font-bold",
								children: ["Detalhes ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 ml-1" })]
							})]
						})
					]
				})
			}, order.id))
		})]
	});
}
export { OrderHistory as default };

//# sourceMappingURL=OrderHistory-DIraO14t.js.map