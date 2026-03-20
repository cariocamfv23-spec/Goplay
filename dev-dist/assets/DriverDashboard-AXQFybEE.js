import { Ir as require_jsx_runtime, Ur as useNavigate, Xt as Button, yr as ArrowLeft } from "./index-EHR_KjFO.js";
var import_jsx_runtime = require_jsx_runtime();
function DriverDashboard() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background p-4 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: () => navigate(-1),
				className: "mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold mb-4",
				children: "Painel do Motorista"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Em breve."
			})
		]
	});
}
export { DriverDashboard as default };

//# sourceMappingURL=DriverDashboard-AXQFybEE.js.map