import { n as ArrowDownLeft, t as ArrowUpRight } from "./arrow-up-right-CeeXivvF.js";
import { t as Funnel } from "./funnel-NgK5id3e.js";
import { Lr as ArrowLeft, an as Button, bn as cn, ci as useNavigate, nt as mockFinancialHistory, ti as require_jsx_runtime } from "./index-CyB4EoJq.js";
import { n as CardContent, t as Card } from "./card-Cuvs-ka7.js";
var import_jsx_runtime = require_jsx_runtime();
function TransactionHistory() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 bg-background/95 backdrop-blur-sm z-20 p-4 border-b border-border/50 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => navigate(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold",
					children: "Extrato Completo"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-5 w-5" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-4",
			children: [mockFinancialHistory.map((t) => {
				const isNegative = t.value < 0 || t.type === "spend";
				const valueColor = isNegative ? "text-red-500" : "text-green-500";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border border-border/50 shadow-sm hover:shadow-md transition-all duration-200",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("h-10 w-10 rounded-full flex items-center justify-center", isNegative ? "bg-red-500/10" : "bg-green-500/10", valueColor),
								children: isNegative ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownLeft, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-sm",
								children: t.description
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: t.date
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: cn("font-bold", valueColor),
								children: [t.value > 0 ? "+" : "", t.currency === "BRL" ? `R$ ${Math.abs(t.value).toFixed(2).replace(".", ",")}` : `${Math.abs(t.value)} pts`]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase text-muted-foreground font-medium",
								children: t.status
							})]
						})]
					})
				}, t.id);
			}), mockFinancialHistory.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col items-center justify-center py-10 text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: "Nenhuma movimentação encontrada."
				})
			})]
		})]
	});
}
export { TransactionHistory as default };

//# sourceMappingURL=TransactionHistory-dl-w0xkS.js.map