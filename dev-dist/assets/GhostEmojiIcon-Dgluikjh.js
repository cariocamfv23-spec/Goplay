import { Yr as require_jsx_runtime, ai as require_react, bn as cn, ui as __toESM } from "./index-DkGwRTO2.js";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function GhostEmojiIcon({ className, active, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: active ? "currentColor" : "none",
		stroke: "currentColor",
		strokeWidth: active ? "0" : "1.5",
		className: cn("shrink-0", className),
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M12 2c-4.418 0-8 3.582-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10c0-4.418-3.582-8-8-8z",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "9",
				cy: "10",
				r: "1.5",
				fill: active ? "hsl(var(--background))" : "currentColor",
				stroke: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "15",
				cy: "10",
				r: "1.5",
				fill: active ? "hsl(var(--background))" : "currentColor",
				stroke: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10 14c.5 1 3.5 1 4 0",
				stroke: active ? "hsl(var(--background))" : "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				fill: "none"
			})
		]
	});
}
export { GhostEmojiIcon as t };

//# sourceMappingURL=GhostEmojiIcon-Dgluikjh.js.map