import { Hr as require_jsx_runtime } from "./index-CtM3-AOU.js";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-ZaGdmuED.js";
import { N as ResponsiveContainer, P as Tooltip, f as Bar, n as YAxis, r as XAxis } from "./generateCategoricalChart-BjPNrovm.js";
import { t as CartesianGrid } from "./CartesianGrid-CM7exsvG.js";
import { t as BarChart } from "./BarChart-BHyZfn6G.js";
var import_jsx_runtime = require_jsx_runtime();
function EvolutionChart({ data }) {
	const chartData = [...data].sort((a, b) => a.year - b.year).map((item) => ({
		year: item.year,
		Partidas: item.stats.matches,
		Gols: item.stats.goals,
		Rating: item.stats.rating
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "bg-transparent border-none shadow-none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			className: "p-0 mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-white text-sm font-medium uppercase tracking-wider opacity-90",
				children: "Atividade Anual"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "p-0 h-[200px]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data: chartData,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							strokeDasharray: "3 3",
							vertical: false,
							stroke: "rgba(255,255,255,0.1)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "year",
							stroke: "rgba(255,255,255,0.5)",
							fontSize: 12,
							tickLine: false,
							axisLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							hide: true,
							yAxisId: "left",
							orientation: "left",
							stroke: "rgba(255,255,255,0.5)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							hide: true,
							yAxisId: "right",
							orientation: "right",
							stroke: "rgba(255,255,255,0.5)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							contentStyle: {
								backgroundColor: "#1a1a1a",
								border: "1px solid #333",
								borderRadius: "8px",
								color: "#fff"
							},
							cursor: { fill: "rgba(255,255,255,0.05)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							yAxisId: "left",
							dataKey: "Partidas",
							fill: "hsl(var(--primary))",
							radius: [
								4,
								4,
								0,
								0
							],
							barSize: 20
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							yAxisId: "left",
							dataKey: "Gols",
							fill: "hsl(var(--gold))",
							radius: [
								4,
								4,
								0,
								0
							],
							barSize: 20
						})
					]
				})
			})
		})]
	});
}
export { EvolutionChart as t };

//# sourceMappingURL=EvolutionChart-DIJwQEKW.js.map