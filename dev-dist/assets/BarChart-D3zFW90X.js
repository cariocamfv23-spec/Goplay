import { d as formatAxisMap, f as Bar, n as YAxis, r as XAxis, t as generateCategoricalChart } from "./generateCategoricalChart-BpS9pnpR.js";
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

//# sourceMappingURL=BarChart-D3zFW90X.js.map