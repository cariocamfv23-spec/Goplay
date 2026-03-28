import { t as Award } from "./award-DncGMlV3.js";
import "./chevron-down-Caow62DJ.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CmdLT9c5.js";
import { t as Plus } from "./plus-BLgorADG.js";
import { An as TrendingUp, Dt as mockStatsHistory, Lr as ArrowLeft, Nn as Target, an as Button, di as require_react, li as require_jsx_runtime, si as useNavigate, vn as toast } from "./index-CmViBNnK.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-TSLGiX2d.js";
import { t as Label } from "./label-BIzY-_uG.js";
import "./progress-DU4GuQR4.js";
import { t as Input } from "./input-CplDpRvO.js";
import { a as DrawerFooter, i as DrawerDescription, n as DrawerClose, o as DrawerHeader, r as DrawerContent, s as DrawerTitle, t as Drawer } from "./drawer-DghNkylG.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CM3d3oWl.js";
import "./generateCategoricalChart-BXfAfjMJ.js";
import "./CartesianGrid-GxkRh5PV.js";
import "./AreaChart-CsMouDeC.js";
import "./chart-CpEUtFnq.js";
import { t as StatsHistoryChart } from "./StatsHistoryChart-I-2TMRb4.js";
import { t as useGoalStore } from "./useGoalStore-YoMk_ZKz.js";
import { t as GoalCard } from "./GoalCard-qEMt1Ouu.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function CreateGoalDrawer({ open, onOpenChange }) {
	const { addGoal } = useGoalStore();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		title: "",
		category: "physical",
		metric: "",
		currentValue: "",
		targetValue: "",
		unit: "",
		deadline: ""
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setTimeout(() => {
			addGoal({
				title: formData.title,
				category: formData.category,
				metric: formData.metric,
				currentValue: Number(formData.currentValue),
				targetValue: Number(formData.targetValue),
				unit: formData.unit,
				deadline: formData.deadline
			});
			toast.success("Meta criada com sucesso!");
			setLoading(false);
			onOpenChange(false);
			setFormData({
				title: "",
				category: "physical",
				metric: "",
				currentValue: "",
				targetValue: "",
				unit: "",
				deadline: ""
			});
		}, 1e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: "Nova Meta de Treino" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerDescription, { children: "Defina seus objetivos e deixe o AI Coach te guiar." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "p-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome da Meta" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Ex: Melhorar Sprints",
							value: formData.title,
							onChange: (e) => setFormData({
								...formData,
								title: e.target.value
							}),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Categoria" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: formData.category,
								onValueChange: (v) => setFormData({
									...formData,
									category: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "physical",
										children: "Físico"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "technical",
										children: "Técnico"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "tactical",
										children: "Tático"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "mental",
										children: "Mental"
									})
								] })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Prazo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: formData.deadline,
								onChange: (e) => setFormData({
									...formData,
									deadline: e.target.value
								}),
								required: true
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Métrica (O que vamos medir?)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Ex: Velocidade Máxima",
							value: formData.metric,
							onChange: (e) => setFormData({
								...formData,
								metric: e.target.value
							}),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Atual" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									placeholder: "0",
									value: formData.currentValue,
									onChange: (e) => setFormData({
										...formData,
										currentValue: e.target.value
									}),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Alvo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									placeholder: "100",
									value: formData.targetValue,
									onChange: (e) => setFormData({
										...formData,
										targetValue: e.target.value
									}),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Unidade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "km/h",
									value: formData.unit,
									onChange: (e) => setFormData({
										...formData,
										unit: e.target.value
									}),
									required: true
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerFooter, {
						className: "px-0 pb-0 pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: loading,
							children: loading ? "Criando..." : "Criar Meta"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerClose, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								children: "Cancelar"
							})
						})]
					})
				]
			})]
		}) })
	});
}
function GoalsDashboard() {
	const navigate = useNavigate();
	const { goals } = useGoalStore();
	const [isCreateOpen, setIsCreateOpen] = (0, import_react.useState)(false);
	const activeGoals = goals.filter((g) => g.status === "active");
	const completedGoals = goals.filter((g) => g.status === "completed");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 bg-background/80 backdrop-blur-md z-20 p-4 border-b border-border/50 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => navigate(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-xl font-bold flex items-center gap-2",
						children: ["Metas de Treino", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-5 w-5 text-primary" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Planeje e acompanhe sua evolução"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => setIsCreateOpen(true),
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Nova Meta"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 space-y-6 max-w-2xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "bg-gradient-to-br from-secondary/50 to-background border-border/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							className: "text-base font-bold flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-green-500" }), "Tendência de Performance"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Sua evolução em relação às metas definidas." })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[150px] w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsHistoryChart, { data: mockStatsHistory })
					}) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "active",
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid w-full grid-cols-2 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "active",
								children: [
									"Em Progresso (",
									activeGoals.length,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "completed",
								children: [
									"Concluídas (",
									completedGoals.length,
									")"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "active",
							className: "space-y-4 animate-in slide-in-from-bottom-2",
							children: activeGoals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center py-10 text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-12 w-12 mx-auto mb-3 opacity-20" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Nenhuma meta ativa no momento." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "link",
										onClick: () => setIsCreateOpen(true),
										children: "Criar primeira meta"
									})
								]
							}) : activeGoals.map((goal) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalCard, { goal }, goal.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "completed",
							className: "space-y-4 animate-in slide-in-from-bottom-2",
							children: completedGoals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center py-10 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-12 w-12 mx-auto mb-3 opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Nenhuma meta concluída ainda." })]
							}) : completedGoals.map((goal) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalCard, { goal }, goal.id))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateGoalDrawer, {
				open: isCreateOpen,
				onOpenChange: setIsCreateOpen
			})
		]
	});
}
export { GoalsDashboard as default };

//# sourceMappingURL=GoalsDashboard-CYK5GXP9.js.map