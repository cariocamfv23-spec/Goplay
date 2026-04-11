import "./circle-alert-BM1MqWla.js";
import "./circle-check-CG6ACArV.js";
import { t as PaymentDialog } from "./PaymentDialog-C-tHd8_i.js";
import "./wallet-Cttb5mhK.js";
import { Ln as Star, Lr as ArrowLeft, an as Button, ci as useNavigate, en as Avatar, gt as mockNutrition, li as useParams, nn as AvatarImage, ti as require_jsx_runtime, tn as AvatarFallback, xr as CreditCard } from "./index-DbWDAVNz.js";
import "./label-NelZq7OI.js";
import "./input-cQrETuk4.js";
import "./tabs-BnPuj3Qe.js";
var import_jsx_runtime = require_jsx_runtime();
function NutritionPartnerDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const partner = mockNutrition.find((n) => n.id === id) || mockNutrition[0];
	if (!partner) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
		if (typeof priceStr === "number") return priceStr;
		let clean = priceStr.replace(/\./g, "");
		clean = clean.replace(/[^0-9,]/g, "");
		clean = clean.replace(",", ".");
		const value = parseFloat(clean);
		return isNaN(value) ? 0 : value;
	};
	const numericPrice = getNumericPrice(partner.price);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-primary/10 h-32 relative",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				className: "absolute top-4 left-4 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors",
				onClick: () => navigate(-1),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5 -mt-12 relative z-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
					className: "h-24 w-24 border-4 border-background shadow-md mb-4 bg-background",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
						src: partner.image,
						alt: partner.name,
						className: "object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: partner.name[0] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold leading-tight",
						children: partner.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-primary font-medium",
						children: partner.specialty
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 mt-3 mb-6 bg-secondary/30 w-fit px-3 py-1.5 rounded-full border border-border/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 text-yellow-500 fill-yellow-500" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-sm",
							children: partner.rating
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground text-xs",
							children: "(120 avaliações)"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-border/50 p-5 rounded-xl mb-6 shadow-sm space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground leading-relaxed",
						children: partner.description
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
							children: "Valor da Consulta"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-bold text-foreground",
							children: partner.price
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDialog, {
						title: `Consulta com ${partner.name}`,
						price: numericPrice,
						onSuccess: () => {},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "w-full h-14 font-bold rounded-xl shadow-lg shadow-primary/20 text-base transition-all hover:scale-[1.02] active:scale-95",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "mr-2 h-5 w-5" }), "Agendar e Pagar"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-center text-muted-foreground px-4",
						children: "Cancelamento gratuito até 24h antes da consulta."
					})]
				})
			]
		})]
	});
}
export { NutritionPartnerDetails as default };

//# sourceMappingURL=NutritionPartnerDetails-BjDuN1YG.js.map