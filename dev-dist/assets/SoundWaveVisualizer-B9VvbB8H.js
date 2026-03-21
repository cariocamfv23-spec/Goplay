import { Yr as require_react, dn as cn, zr as require_jsx_runtime } from "./index-C8TvyyZP.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function SoundWaveVisualizer({ isPlaying, className, barCount = 8 }) {
	const [heights, setHeights] = (0, import_react.useState)(Array(barCount).fill(10));
	(0, import_react.useEffect)(() => {
		let interval;
		if (isPlaying) interval = setInterval(() => {
			setHeights(Array(barCount).fill(0).map(() => Math.random() * 80 + 20));
		}, 100);
		else setHeights(Array(barCount).fill(10));
		return () => clearInterval(interval);
	}, [isPlaying, barCount]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex items-center justify-center gap-[2px] h-12", className),
		children: heights.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-1.5 bg-gold rounded-full transition-all duration-100 ease-in-out shadow-[0_0_8px_hsl(var(--gold)/0.5)]",
			style: { height: `${h}%` }
		}, i))
	});
}
export { SoundWaveVisualizer as t };

//# sourceMappingURL=SoundWaveVisualizer-B9VvbB8H.js.map