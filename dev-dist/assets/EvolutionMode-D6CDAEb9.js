import "./chevron-down-BZASJxj-.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-pDcHKclm.js";
import { t as Minus } from "./minus-BH5lyTrM.js";
import { Mn as TrendingUp, Nn as TrendingDown, Ot as mockRetrospectiveHistory, cn as Button, pi as require_react, ri as require_jsx_runtime, ui as useNavigate, wn as Zap, zr as ArrowLeft } from "./index-Bo0UapdT.js";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-BKJYcx-F.js";
import "./generateCategoricalChart-DIPNalYb.js";
import "./CartesianGrid-D4KBjYfk.js";
import "./BarChart-DPm-cvAc.js";
import { t as EvolutionChart } from "./EvolutionChart-Dt3x8QE7.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function EvolutionMode() {
	const navigate = useNavigate();
	const [selectedYear, setSelectedYear] = (0, import_react.useState)(mockRetrospectiveHistory[0].year.toString());
	const currentData = mockRetrospectiveHistory.find((h) => h.year.toString() === selectedYear);
	const previousData = mockRetrospectiveHistory.find((h) => h.year === parseInt(selectedYear) - 1);
	const calculateGrowth = (current, previous) => {
		if (!previous) return 0;
		return (current - previous) / previous * 100;
	};
	const renderTrend = (value) => {
		if (value > 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-4 h-4 text-green-500 mr-1" });
		if (value < 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "w-4 h-4 text-red-500 mr-1" });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "w-4 h-4 text-gray-500 mr-1" });
	};
	const renderTrendBadge = (growth) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${growth > 0 ? "text-green-600 bg-green-100 dark:bg-green-900/30" : growth < 0 ? "text-red-600 bg-red-100 dark:bg-red-900/30" : "text-gray-600 bg-gray-100 dark:bg-gray-800"}`,
			children: [
				renderTrend(growth),
				Math.abs(growth).toFixed(0),
				"%"
			]
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 flex items-center gap-4 border-b sticky top-0 bg-background/95 backdrop-blur z-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: () => navigate(-1),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-6 w-6" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-bold text-xl",
				children: "Painel de Evolução"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium text-muted-foreground",
						children: "Ano de Referência"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: selectedYear,
						onValueChange: setSelectedYear,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-[120px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Ano" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: mockRetrospectiveHistory.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: h.year.toString(),
							children: h.year
						}, h.year)) })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground uppercase font-bold",
								children: "Partidas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-end justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-3xl font-black",
									children: currentData.stats.matches
								}), previousData && renderTrendBadge(calculateGrowth(currentData.stats.matches, previousData.stats.matches))]
							})]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground uppercase font-bold",
								children: "Rating Médio"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-end justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-3xl font-black",
									children: currentData.stats.rating
								}), previousData && renderTrendBadge(calculateGrowth(currentData.stats.rating, previousData.stats.rating))]
							})]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground uppercase font-bold",
								children: "Gols"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-end justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-3xl font-black",
									children: currentData.stats.goals
								}), previousData && renderTrendBadge(calculateGrowth(currentData.stats.goals, previousData.stats.goals))]
							})]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground uppercase font-bold",
								children: "Assistências"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-end justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-3xl font-black",
									children: currentData.stats.assists
								}), previousData && renderTrendBadge(calculateGrowth(currentData.stats.assists, previousData.stats.assists))]
							})]
						}) })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "bg-card/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						className: "pb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							className: "text-sm font-medium flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-primary" }), "Comparativo Anual"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvolutionChart, { data: mockRetrospectiveHistory }) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "bg-gradient-to-r from-primary to-purple-800 text-white border-none shadow-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-6 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-8 w-8 mx-auto mb-2 text-gold fill-current" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-lg",
								children: previousData ? "Evolução Constante!" : "Começando Forte!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm opacity-90 mb-4 mt-1",
								children: previousData ? `Você melhorou em ${Object.keys(currentData.stats).filter((k) => currentData.stats[k] > previousData.stats[k]).length} métricas comparado ao ano anterior.` : "Este é o início da sua jornada histórica. Continue assim para ver sua evolução ano que vem!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								className: "w-full text-primary font-bold shadow-md",
								onClick: () => navigate("/retrospective"),
								children: "Ver Retrospectiva Completa"
							})
						]
					})
				})
			]
		})]
	});
}
export { EvolutionMode as default };

//# sourceMappingURL=EvolutionMode-D6CDAEb9.js.map