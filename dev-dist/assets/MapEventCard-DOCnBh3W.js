import { t as CloudRain } from "./cloud-rain-9qbuFVE2.js";
import { t as Wind } from "./wind-Dht9kYK8.js";
import { En as Sun, F as Badge, Hn as MapPin, Hr as require_jsx_runtime, Or as createLucideIcon, Yr as useNavigate, bn as Trophy, pn as cn, yr as Calendar } from "./index-DzO-_6nv.js";
import { n as CardContent, t as Card } from "./card-oWygQP_5.js";
var Cloud = createLucideIcon("cloud", [["path", {
	d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
	key: "p7xjir"
}]]);
var import_jsx_runtime = require_jsx_runtime();
function MapEventCard({ event, compact = false }) {
	const navigate = useNavigate();
	const getWeatherIcon = (condition) => {
		switch (condition) {
			case "sunny": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4 text-yellow-500" });
			case "rainy": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudRain, { className: "h-4 w-4 text-blue-500" });
			case "windy": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, { className: "h-4 w-4 text-gray-500" });
			case "cloudy":
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, { className: "h-4 w-4 text-gray-400" });
		}
	};
	const getLevelColor = (level) => {
		switch (level) {
			case "Iniciante": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
			case "Intermediário": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
			case "Avançado": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
			case "Profissional": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
			default: return "bg-secondary text-muted-foreground";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: cn("overflow-hidden border-none shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-[0.98]", compact ? "bg-background" : "bg-card"),
		onClick: () => navigate(`/events/${event.id}`),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative", compact ? "h-24" : "h-36"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: event.image,
					className: "w-full h-full object-cover",
					alt: event.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-2 left-2 flex gap-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "bg-background/80 text-foreground backdrop-blur-md shadow-sm hover:bg-background",
						children: event.modality
					})
				}),
				event.weather && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-2 right-2 bg-background/90 backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1 shadow-sm",
					children: [getWeatherIcon(event.weather.condition), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-bold",
						children: [event.weather.temp, "°"]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: cn("p-3", compact ? "p-2" : "p-3"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-between items-start mb-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: cn("font-bold leading-tight line-clamp-1", compact ? "text-sm" : "text-base"),
						children: event.title
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							event.date,
							" • ",
							event.time
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "line-clamp-1",
							children: [
								event.city,
								", ",
								event.state
							]
						})]
					})]
				}),
				!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "secondary",
						className: cn("text-[10px] h-5 px-1.5 font-medium border-0", getLevelColor(event.level)),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-3 w-3 mr-1" }), event.level]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-bold text-primary",
						children: event.price === 0 ? "Grátis" : `R$ ${event.price.toFixed(2)}`
					})]
				})
			]
		})]
	});
}
export { MapEventCard as t };

//# sourceMappingURL=MapEventCard-DOCnBh3W.js.map