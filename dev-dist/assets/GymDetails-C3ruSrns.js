import "./circle-alert-QaBQjphs.js";
import "./circle-check-B8StrKRE.js";
import { t as PaymentDialog } from "./PaymentDialog-pzSDJ0fk.js";
import "./wallet-HX3krcS_.js";
import { $n as MapPin, Ln as Star, Lr as ArrowLeft, R as Badge, an as Button, ci as useNavigate, li as useParams, ot as mockGyms, ti as require_jsx_runtime, xr as CreditCard } from "./index-BdDFDm-L.js";
import "./label-eiyBqmdC.js";
import "./input-whOm72Rw.js";
import "./tabs-Dagk8mHu.js";
var import_jsx_runtime = require_jsx_runtime();
function GymDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const gym = mockGyms.find((g) => g.id === id) || mockGyms[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-64",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: gym.image,
					className: "w-full h-full object-cover",
					alt: gym.name
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-start mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold",
						children: gym.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 font-bold text-gold bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full border shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-gold" }),
							" ",
							gym.rating
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground text-sm mb-4 flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }),
						" ",
						gym.address
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					className: "mb-6",
					children: gym.type
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border p-4 rounded-xl mb-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mb-1",
						children: "Mensalidade"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-2xl font-bold",
						children: gym.price
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDialog, {
					title: `Mensalidade ${gym.name}`,
					price: gym.price,
					onSuccess: () => {},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "mr-2 h-5 w-5" }), " Matricular Agora"]
					})
				})
			]
		})]
	});
}
export { GymDetails as default };

//# sourceMappingURL=GymDetails-C3ruSrns.js.map