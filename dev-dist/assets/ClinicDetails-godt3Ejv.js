import "./circle-alert-PBBHMGNl.js";
import "./circle-check-D_6Vj8NI.js";
import { t as PaymentDialog } from "./PaymentDialog-CYLmQmF9.js";
import "./wallet-D5y0n1qr.js";
import { Ir as require_jsx_runtime, Ln as MapPin, M as Badge, Ur as useNavigate, W as mockClinics, Wr as useParams, Xt as Button, rr as CreditCard, yr as ArrowLeft } from "./index-BF9ltOpP.js";
import "./label-CLepZYG1.js";
import "./input-Bsrmoolt.js";
import "./tabs-Dd13gNzH.js";
var import_jsx_runtime = require_jsx_runtime();
function ClinicDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const clinic = mockClinics.find((c) => c.id === id) || mockClinics[0];
	if (!clinic) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col items-center justify-center bg-background p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground mb-4",
			children: "Clínica não encontrada."
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
	const numericPrice = getNumericPrice(clinic.price);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "h-64 relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: clinic.image,
					className: "w-full h-full object-cover",
					alt: clinic.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" }),
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold mb-1",
					children: clinic.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground text-sm flex items-center gap-1 mb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }),
						" ",
						clinic.address
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-4 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-secondary/30 p-3 rounded-lg flex-1 text-center border border-border/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block font-bold text-lg",
							children: [clinic.rating, " ★"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "Avaliação"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-secondary/30 p-3 rounded-lg flex-1 text-center border border-border/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-bold text-lg",
							children: "15"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "Especialistas"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold mb-2",
						children: "Serviços"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: clinic.services.map((service, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: service
						}, idx))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border p-4 rounded-xl mb-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mb-2",
						children: clinic.description
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-2 border-t border-border/50 mt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mb-1",
							children: "Valor da Sessão"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-bold",
							children: clinic.price
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDialog, {
					title: `Sessão em ${clinic.name}`,
					price: numericPrice,
					onSuccess: () => {},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "w-full h-14 font-bold rounded-xl shadow-lg shadow-primary/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "mr-2 h-5 w-5" }), " Agendar e Pagar"]
					})
				})
			]
		})]
	});
}
export { ClinicDetails as default };

//# sourceMappingURL=ClinicDetails-godt3Ejv.js.map