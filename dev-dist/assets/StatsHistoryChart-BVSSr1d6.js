import { Tn as TrendingUp, Wr as require_jsx_runtime, kr as Activity } from "./index-FJeuxUgY.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CsV1Iyzk.js";
import { n as YAxis, r as XAxis } from "./generateCategoricalChart-6cqTAHIV.js";
import { t as CartesianGrid } from "./CartesianGrid-D3brAiUC.js";
import { n as Area, t as AreaChart } from "./AreaChart-DntPq4qi.js";
import { n as ChartTooltip, r as ChartTooltipContent, t as ChartContainer } from "./chart-MzQ3e_xH.js";
var import_jsx_runtime = require_jsx_runtime();
var chartConfig = {
	rating: {
		label: "Nota Média",
		color: "hsl(var(--primary))"
	},
	matches: {
		label: "Partidas",
		color: "hsl(var(--chart-2))"
	}
};
function StatsHistoryChart({ data }) {
	if (!data || data.length === 0) return null;
	const lastMonth = data[data.length - 1];
	const previousMonth = data[data.length - 2];
	const ratingTrend = lastMonth && previousMonth ? (lastMonth.rating - previousMonth.rating) / previousMonth.rating * 100 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "border-none shadow-none bg-transparent",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			className: "px-0 pt-0 pb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "text-lg flex items-center gap-2 text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4 text-primary" }), "Evolução de Performance"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
					className: "text-zinc-400",
					children: "Desempenho nos últimos 6 meses"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${ratingTrend >= 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3" }),
						ratingTrend > 0 ? "+" : "",
						ratingTrend.toFixed(1),
						"%"
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-[200px] w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
					config: chartConfig,
					className: "w-full h-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data,
						margin: {
							top: 10,
							right: 10,
							left: -20,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "fillRating",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "5%",
									stopColor: "var(--color-rating)",
									stopOpacity: .8
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "95%",
									stopColor: "var(--color-rating)",
									stopOpacity: .1
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								vertical: false,
								strokeDasharray: "3 3",
								stroke: "#333"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "date",
								tickLine: false,
								axisLine: false,
								tickMargin: 8,
								fontSize: 12,
								stroke: "#666"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tickLine: false,
								axisLine: false,
								tickMargin: 8,
								fontSize: 12,
								domain: [0, 5],
								stroke: "#666"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
								cursor: false,
								content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
									indicator: "line",
									className: "bg-zinc-900 border-zinc-800 text-white"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								dataKey: "rating",
								type: "monotone",
								fill: "url(#fillRating)",
								fillOpacity: .4,
								stroke: "var(--color-rating)",
								strokeWidth: 2,
								dot: {
									r: 4,
									fill: "var(--color-rating)",
									strokeWidth: 0
								},
								activeDot: {
									r: 6,
									fill: "var(--color-rating)",
									strokeWidth: 2,
									stroke: "#fff"
								}
							})
						]
					})
				})
			})
		})]
	});
}
export { StatsHistoryChart as t };

//# sourceMappingURL=StatsHistoryChart-BVSSr1d6.js.map