import { d as formatAxisMap, f as Bar, n as YAxis, r as XAxis, t as generateCategoricalChart } from "./generateCategoricalChart-I2S4GhX2.js";
var BarChart = generateCategoricalChart({
	chartName: "BarChart",
	GraphicalChild: Bar,
	defaultTooltipEventType: "axis",
	validateTooltipEventTypes: ["axis", "item"],
	axisComponents: [{
		axisType: "xAxis",
		AxisComp: XAxis
	}, {
		axisType: "yAxis",
		AxisComp: YAxis
	}],
	formatAxisMap
});
export { BarChart as t };

//# sourceMappingURL=BarChart-8bCe7PLi.js.map