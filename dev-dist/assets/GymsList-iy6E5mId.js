import { En as Star, Kr as useNavigate, Mn as Search, et as mockGyms, zn as MapPin, zr as require_jsx_runtime } from "./index-C8TvyyZP.js";
import { n as CardContent, t as Card } from "./card-CNjV3712.js";
import { t as Input } from "./input-D-FLwcWN.js";
var import_jsx_runtime = require_jsx_runtime();
function GymsList() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 bg-background z-20 p-4 border-b border-border/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-bold mb-4",
				children: "Academias e CTs"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Buscar academias...",
					className: "pl-9 bg-secondary border-none rounded-xl"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4 space-y-4",
			children: mockGyms.map((gym) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "overflow-hidden border-none shadow-md cursor-pointer",
				onClick: () => navigate(`/gyms/${gym.id}`),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-40 relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: gym.image,
						className: "w-full h-full object-cover",
						alt: gym.name
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-lg",
							children: gym.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 text-gold font-bold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-gold" }),
								" ",
								gym.rating
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground text-sm flex items-center gap-1 mt-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }),
							" ",
							gym.address
						]
					})]
				})]
			}, gym.id))
		})]
	});
}
export { GymsList as default };

//# sourceMappingURL=GymsList-iy6E5mId.js.map