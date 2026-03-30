import { d as formatAxisMap, f as Bar, n as YAxis, r as XAxis, t as generateCategoricalChart } from "./generateCategoricalChart-pJ3_p7T2.js";
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

//# sourceMappingURL=BarChart-Dxd9L59R.js.map