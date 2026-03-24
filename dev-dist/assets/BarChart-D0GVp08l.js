import { d as formatAxisMap, f as Bar, n as YAxis, r as XAxis, t as generateCategoricalChart } from "./generateCategoricalChart-CISaPg4H.js";
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

//# sourceMappingURL=BarChart-D0GVp08l.js.map