import { Lr as ArrowLeft, Mr as Briefcase, an as Button, ci as useParams, en as Avatar, li as require_jsx_runtime, nn as AvatarImage, si as useNavigate, tn as AvatarFallback, ut as mockJobs } from "./index-DkRFujBi.js";
var import_jsx_runtime = require_jsx_runtime();
function JobDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const job = mockJobs.find((j) => j.id === id) || mockJobs[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-24 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 bg-background z-20 p-4 flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => navigate(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-bold text-lg",
					children: "Detalhes da Vaga"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
							className: "h-20 w-20 mx-auto mb-3 rounded-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: job.image }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: job.company[0] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold mb-1",
							children: job.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground",
							children: [
								job.company,
								" • ",
								job.location
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-lg mb-2",
						children: "Sobre a vaga"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground leading-relaxed",
						children: job.description
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-lg mb-2",
						children: "Salário"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-primary font-bold",
						children: job.salary
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "lg",
					className: "w-full rounded-full font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "mr-2 h-5 w-5" }), " Candidatar-se"]
				})
			})
		]
	});
}
export { JobDetails as default };

//# sourceMappingURL=JobDetails-6M7BbhTj.js.map