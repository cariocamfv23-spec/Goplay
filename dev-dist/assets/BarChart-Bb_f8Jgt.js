import { d as formatAxisMap, f as Bar, n as YAxis, r as XAxis, t as generateCategoricalChart } from "./generateCategoricalChart-xAmiFWOn.js";
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

//# sourceMappingURL=BarChart-Bb_f8Jgt.js.map