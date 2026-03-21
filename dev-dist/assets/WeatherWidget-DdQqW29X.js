import { t as Wind } from "./wind-BfwteO8T.js";
import { Bn as MapPin, C as useWeatherStore, Tr as createLucideIcon, zr as require_jsx_runtime } from "./index-CU7avrqi.js";
import { n as CardContent, t as Card } from "./card-Bf_SgjqI.js";
var CloudSun = createLucideIcon("cloud-sun", [
	["path", {
		d: "M12 2v2",
		key: "tus03m"
	}],
	["path", {
		d: "m4.93 4.93 1.41 1.41",
		key: "149t6j"
	}],
	["path", {
		d: "M20 12h2",
		key: "1q8mjw"
	}],
	["path", {
		d: "m19.07 4.93-1.41 1.41",
		key: "1shlcs"
	}],
	["path", {
		d: "M15.947 12.65a4 4 0 0 0-5.925-4.128",
		key: "dpwdj0"
	}],
	["path", {
		d: "M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z",
		key: "s09mg5"
	}]
]);
var Droplets = createLucideIcon("droplets", [["path", {
	d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
	key: "1ptgy4"
}], ["path", {
	d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
	key: "1sl1rz"
}]]);
var Ticket = createLucideIcon("ticket", [
	["path", {
		d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
		key: "qn84l0"
	}],
	["path", {
		d: "M13 5v2",
		key: "dyzc3o"
	}],
	["path", {
		d: "M13 17v2",
		key: "1ont0d"
	}],
	["path", {
		d: "M13 11v2",
		key: "1wjjxi"
	}]
]);
var import_jsx_runtime = require_jsx_runtime();
function WeatherWidget() {
	const { currentLocation } = useWeatherStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "border-none shadow-sm bg-gradient-to-br from-sky-400 to-blue-600 text-white overflow-hidden relative group cursor-pointer hover:shadow-md transition-all",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-4 flex flex-col justify-between h-full relative z-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-medium text-white/80 flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3 h-3" }),
							" ",
							currentLocation.split(",")[0]
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-3xl font-bold tracking-tighter mt-1",
						children: "26°"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudSun, { className: "w-8 h-8 text-yellow-300 animate-pulse" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 mt-3 text-[10px] font-medium text-white/90",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "45%" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "12km/h" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ml-auto",
						children: "Ensolarado"
					})
				]
			})]
		})]
	});
}
export { Ticket as n, WeatherWidget as t };

//# sourceMappingURL=WeatherWidget-DdQqW29X.js.map