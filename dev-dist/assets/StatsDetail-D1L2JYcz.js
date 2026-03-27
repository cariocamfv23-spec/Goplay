import { t as TrainingSuggestions } from "./TrainingSuggestions-CN0wG7j-.js";
import "./chevron-down-fe431DPv.js";
import "./circle-alert-CCCnmLIK.js";
import { At as mockStatsHistory, Fn as Target, Pt as mockTrainingSuggestions, Vr as Activity, Z as mockAiAnalysis, cn as Button, ri as require_jsx_runtime, ui as useNavigate, wn as Zap, zr as ArrowLeft } from "./index-BRczRGrK.js";
import { n as CardContent, t as Card } from "./card-CKtk88cD.js";
import "./accordion-CyEgApN1.js";
import { t as Progress } from "./progress-Sp-fEiG3.js";
import "./generateCategoricalChart-zwsgSTkj.js";
import "./CartesianGrid-DW4js5Ih.js";
import "./AreaChart-BXzzopH7.js";
import "./chart-C6yTIMHc.js";
import { t as StatsHistoryChart } from "./StatsHistoryChart-Bc4-g6md.js";
var import_jsx_runtime = require_jsx_runtime();
function StatsDetail() {
	const navigate = useNavigate();
	const aiStats = mockAiAnalysis?.aiStats || [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 bg-background/95 backdrop-blur z-20 p-4 border-b border-border/50 flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: () => navigate(-1),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-bold",
				children: "Estatísticas Detalhadas"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsHistoryChart, { data: mockStatsHistory }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "bg-primary/5 border-primary/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4 flex flex-col items-center justify-center text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-5 w-5 text-primary" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-bold text-primary",
									children: "85%"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Precisão Geral"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "bg-orange-500/5 border-orange-500/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4 flex flex-col items-center justify-center text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center mb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5 text-orange-500" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-bold text-orange-500",
									children: "1250"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Power Score"
								})
							]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-bold text-lg mb-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5 text-gold" }), " Análise Recente"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "p-5 space-y-4",
					children: aiStats && aiStats.length > 0 ? aiStats.map((stat, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-muted-foreground",
								children: stat.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold",
								children: [
									stat.value,
									" ",
									stat.unit
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: stat.value / stat.max * 100,
							className: "h-2"
						})]
					}, i)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center py-6 text-muted-foreground text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-8 w-8 mx-auto mb-2 opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Dados insuficientes para análise detalhada." })]
					})
				}) })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrainingSuggestions, { suggestions: mockTrainingSuggestions })
			]
		})]
	});
}
export { StatsDetail as default };

//# sourceMappingURL=StatsDetail-D1L2JYcz.js.map