import { Er as ChevronRight, Nn as Target, at as mockGoals, ci as useNavigate, ti as require_jsx_runtime } from "./index-6JQDnUMD.js";
import { n as CardContent, t as Card } from "./card-DhZ0yNdb.js";
import { t as Progress } from "./progress-Wmxfone7.js";
var import_jsx_runtime = require_jsx_runtime();
function GoalCard() {
	const navigate = useNavigate();
	const activeGoal = mockGoals.find((g) => g.status === "active") || {
		id: "g-mock",
		title: "Meta Semanal",
		currentValue: 3,
		targetValue: 5,
		unit: "treinos",
		progress: 60
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "border-none shadow-sm bg-gradient-to-br from-card to-secondary/50 overflow-hidden cursor-pointer group hover:border-primary/20 transition-all hover:shadow-md",
		onClick: () => navigate("/goals"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-start mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-1.5 rounded-lg bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "w-4 h-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
							children: "Meu Foco"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-sm font-bold mb-3 line-clamp-1",
					children: activeGoal.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-xs font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Progresso"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-primary",
								children: [activeGoal.progress, "%"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: activeGoal.progress,
							className: "h-2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-[10px] text-muted-foreground pt-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								activeGoal.targetValue,
								" ",
								activeGoal.unit
							] })]
						})
					]
				})
			]
		})
	});
}
export { GoalCard as t };

//# sourceMappingURL=GoalCard-DqCruMF8.js.map