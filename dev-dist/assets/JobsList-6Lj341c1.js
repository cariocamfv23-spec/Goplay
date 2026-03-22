import { Hr as require_jsx_runtime, In as Search, L as Badge, Qt as AvatarImage, Un as MapPin, Xt as Avatar, Yr as useNavigate, Zt as AvatarFallback, ct as mockJobs } from "./index-Dx2bvPXd.js";
import { n as CardContent, t as Card } from "./card-B0TLypDf.js";
import { t as Input } from "./input-BYAdMP9R.js";
var import_jsx_runtime = require_jsx_runtime();
function JobsList() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 bg-background z-20 p-4 border-b border-border/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-bold mb-4",
				children: "Vagas no Esporte"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Buscar vagas...",
					className: "pl-9 bg-secondary border-none rounded-xl"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4 space-y-4",
			children: mockJobs.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-none shadow-md cursor-pointer",
				onClick: () => navigate(`/jobs/${job.id}`),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-12 w-12 rounded-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: job.image }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: job.company[0] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold",
								children: job.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: job.company
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: job.type
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
									" ",
									job.location
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-green-600",
							children: job.salary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-2 text-right",
							children: job.posted
						})
					]
				})
			}, job.id))
		})]
	});
}
export { JobsList as default };

//# sourceMappingURL=JobsList-6Lj341c1.js.map