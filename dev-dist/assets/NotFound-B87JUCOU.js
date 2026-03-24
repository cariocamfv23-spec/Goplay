import { Yr as require_jsx_runtime, an as Button, ni as useNavigate } from "./index-B8447bYP.js";
var import_jsx_runtime = require_jsx_runtime();
var NotFound = () => {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col items-center justify-center p-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-6xl font-bold text-primary mb-4",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xl text-muted-foreground mb-8",
				children: "Página não encontrada"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => navigate("/home"),
				children: "Voltar para o Início"
			})
		]
	});
};
var NotFound_default = NotFound;
export { NotFound_default as default };

//# sourceMappingURL=NotFound-B87JUCOU.js.map