import { Pn as Target, ri as require_jsx_runtime } from "./index-Bmwg26o-.js";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-DGizBIKW.js";
import { i as PolarGrid, n as Radar, r as PolarAngleAxis, t as RadarChart } from "./RadarChart-C7teXT6V.js";
import { n as ChartTooltip, r as ChartTooltipContent, t as ChartContainer } from "./chart-7NyphlIx.js";
var import_jsx_runtime = require_jsx_runtime();
var chartConfig = { value: {
	label: "Score",
	color: "hsl(var(--primary))"
} };
function StatsRadarChart({ stats }) {
	if (!stats || stats.length === 0) return null;
	const data = stats.map((stat) => ({
		subject: stat.label,
		value: Math.round(stat.value / stat.max * 100),
		fullMark: 100,
		originalValue: stat.value,
		unit: stat.unit
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "border-none shadow-none bg-transparent",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			className: "px-0 pt-0 pb-2 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				className: "text-sm font-medium text-zinc-400 flex items-center justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-4 w-4" }), " Radar de Habilidades"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-[200px] w-full flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
					config: chartConfig,
					className: "w-full h-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
						data,
						outerRadius: 70,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, { stroke: "#333" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
								dataKey: "subject",
								tick: {
									fill: "#9ca3af",
									fontSize: 12
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
								name: "Performance",
								dataKey: "value",
								stroke: "hsl(var(--primary))",
								fill: "hsl(var(--primary))",
								fillOpacity: .3
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
								cursor: false,
								content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
									className: "bg-zinc-900 border-zinc-800 text-white",
									formatter: (value, name, item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-primary",
										children: item.payload.originalValue
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-zinc-400 text-xs ml-1",
										children: item.payload.unit
									})] })
								})
							})
						]
					})
				})
			})
		})]
	});
}
export { StatsRadarChart as t };

//# sourceMappingURL=StatsRadarChart-QHXF9RpD.js.map