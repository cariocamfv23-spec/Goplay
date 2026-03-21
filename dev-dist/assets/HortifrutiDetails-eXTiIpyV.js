import "./circle-alert-CKhyNx1P.js";
import "./circle-check-Dt_Hi9P9.js";
import { t as PaymentDialog } from "./PaymentDialog-D2Vg28SU.js";
import "./wallet-BX9kxDFr.js";
import { Bn as MapPin, En as Star, Kr as useNavigate, N as Badge, Sr as ArrowLeft, Zt as Button, kn as ShoppingBag, qr as useParams, tt as mockHortifrutis, ur as CircleCheckBig, zr as require_jsx_runtime } from "./index-CU7avrqi.js";
import "./label-B0zBdqae.js";
import "./input-CWkbfZrp.js";
import "./tabs-iTPnU0lQ.js";
var import_jsx_runtime = require_jsx_runtime();
function HortifrutiDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const shop = mockHortifrutis.find((s) => s.id === id) || mockHortifrutis[0];
	if (!shop) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col items-center justify-center bg-background p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground mb-4",
			children: "Parceiro não encontrado."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: () => navigate(-1),
			variant: "outline",
			children: "Voltar"
		})]
	});
	const getNumericPrice = (priceStr) => {
		if (!priceStr) return 0;
		let clean = priceStr.replace(/\./g, "");
		clean = clean.replace(/[^0-9,]/g, "");
		clean = clean.replace(",", ".");
		const value = parseFloat(clean);
		return isNaN(value) ? 0 : value;
	};
	const numericPrice = getNumericPrice(shop.price);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-64",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: shop.image,
					className: "w-full h-full object-cover",
					alt: shop.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "absolute top-4 left-4 bg-background/50 rounded-full backdrop-blur-md",
					onClick: () => navigate(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5 -mt-12 relative z-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-start mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold",
							children: shop.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full border shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 text-gold fill-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-sm",
								children: shop.rating
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							className: "bg-green-600/10 text-green-700 dark:text-green-400 hover:bg-green-600/20 border-green-600/20 gap-1.5 pl-2 pr-3 py-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-xs",
								children: "Conveniado GoPlay"
							})]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-primary font-medium mb-2",
					children: shop.specialty
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground text-sm mb-4 flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }),
						" ",
						shop.address
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border p-4 rounded-xl mb-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold mb-2",
						children: "Sobre"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground leading-relaxed",
						children: shop.description
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border p-4 rounded-xl mb-6 shadow-sm flex justify-between items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Cesta Semanal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xl font-bold",
						children: shop.price
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "bg-green-100 text-green-700",
						children: "Entrega Grátis"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDialog, {
					title: `Pedido em ${shop.name}`,
					price: numericPrice,
					onSuccess: () => {},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "mr-2 h-5 w-5" }), " Fazer Pedido"]
					})
				})
			]
		})]
	});
}
export { HortifrutiDetails as default };

//# sourceMappingURL=HortifrutiDetails-eXTiIpyV.js.map