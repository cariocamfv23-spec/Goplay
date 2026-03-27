import "./qr-code-BcMytCEr.js";
import "./wallet-D4J_ZqCC.js";
import { t as DigitalCard } from "./DigitalCard-BLq6Wde6.js";
import { $n as MapPin, Ln as Star, R as Badge, Un as Search, X as mockClinics, an as Button, ci as useNavigate, ti as require_jsx_runtime, xr as CreditCard } from "./index-Do-nns7y.js";
import { n as CardContent, t as Card } from "./card-DEwPQAn_.js";
import { t as Input } from "./input-DDLU77jm.js";
var import_jsx_runtime = require_jsx_runtime();
function ClinicsList() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 bg-background z-20 p-4 border-b border-border/50 shadow-sm backdrop-blur-md bg-background/95",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold",
					children: "Fisioterapia e Recovery"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DigitalCard, {
					type: "recovery",
					title: "Health Pass",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "text-primary hover:bg-primary/10 rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-5 w-5" })
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Buscar clínicas...",
					className: "pl-9 bg-secondary border-none rounded-xl"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-4",
			children: [mockClinics.map((clinic) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "overflow-hidden border-none shadow-md cursor-pointer hover:bg-secondary/20 transition-all hover:scale-[1.01]",
				onClick: () => navigate(`/clinics/${clinic.id}`),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "h-40 relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: clinic.image,
							className: "w-full h-full object-cover",
							alt: clinic.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-3 left-3 text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-lg shadow-black/50 drop-shadow-sm",
								children: clinic.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 text-xs opacity-90 mt-0.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
									" ",
									clinic.address
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-black flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 text-gold fill-gold" }), clinic.rating]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-start mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-primary",
							children: clinic.specialty
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold text-sm",
							children: clinic.price
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: clinic.services.map((service, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "text-[10px] bg-secondary/50 font-medium",
							children: service
						}, idx))
					})]
				})]
			}, clinic.id)), mockClinics.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-muted-foreground text-sm py-8",
				children: "Nenhuma clínica encontrada."
			})]
		})]
	});
}
export { ClinicsList as default };

//# sourceMappingURL=ClinicsList-Cjsgfrn6.js.map