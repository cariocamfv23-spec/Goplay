import "./chevron-down-BWkXIrNC.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-B8zO8JCQ.js";
import { t as DollarSign } from "./dollar-sign-BWDxxqLw.js";
import { t as Plus } from "./plus-B4dmkOEK.js";
import { t as Trash2 } from "./trash-2-DCEHYjie.js";
import { $r as require_react, Dn as Target, Dt as mockTalents, Er as ArrowLeft, Ur as require_jsx_runtime, Xr as useNavigate, mn as toast, nn as Button, wn as TrendingUp, xn as User } from "./index-CMN2_1TR.js";
import { n as CardContent, t as Card } from "./card-1FFZljLu.js";
import { t as Label } from "./label-R6owY-l6.js";
import { t as Input } from "./input-2s6SaNBy.js";
import { t as useContractStore } from "./useContractStore-BLmXtFl-.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function CreateContract() {
	const navigate = useNavigate();
	const { addContract } = useContractStore();
	const [title, setTitle] = (0, import_react.useState)("");
	const [athleteName, setAthleteName] = (0, import_react.useState)("");
	const [baseValue, setBaseValue] = (0, import_react.useState)("");
	const [startDate, setStartDate] = (0, import_react.useState)("");
	const [endDate, setEndDate] = (0, import_react.useState)("");
	const [metrics, setMetrics] = (0, import_react.useState)([]);
	const [newMetric, setNewMetric] = (0, import_react.useState)({
		label: "",
		targetValue: "",
		unit: "",
		impactValue: "",
		type: "linear"
	});
	const handleAddMetric = () => {
		if (!newMetric.label || !newMetric.targetValue || !newMetric.unit || !newMetric.impactValue) {
			toast.error("Preencha todos os campos da métrica");
			return;
		}
		setMetrics([...metrics, {
			label: newMetric.label,
			targetValue: Number(newMetric.targetValue),
			unit: newMetric.unit,
			impactValue: Number(newMetric.impactValue),
			type: newMetric.type
		}]);
		setNewMetric({
			label: "",
			targetValue: "",
			unit: "",
			impactValue: "",
			type: "linear"
		});
	};
	const handleRemoveMetric = (index) => {
		const updated = [...metrics];
		updated.splice(index, 1);
		setMetrics(updated);
	};
	const handleSubmit = () => {
		if (!title || !athleteName || !baseValue || !startDate || !endDate) {
			toast.error("Preencha as informações básicas do contrato");
			return;
		}
		if (metrics.length === 0) {
			toast.error("Adicione pelo menos uma métrica de performance");
			return;
		}
		addContract({
			title,
			proposerName: "Minha Organização",
			proposerLogo: "https://img.usecurling.com/i?q=organization&color=blue",
			athleteName,
			baseValue: Number(baseValue),
			currency: "R$",
			status: "pending",
			startDate,
			endDate,
			metrics: metrics.map((m) => ({
				...m,
				id: `m-${Date.now()}-${Math.random()}`,
				currentValue: 0
			}))
		});
		toast.success("Proposta enviada com sucesso!");
		navigate("/contracts");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-24 animate-fade-in flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 p-4 shadow-sm flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: () => navigate(-1),
				className: "-ml-2 hover:bg-secondary/50 rounded-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-bold text-lg leading-none",
				children: "Nova Proposta"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 p-4 space-y-6 max-w-2xl mx-auto w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-1.5 bg-primary/10 rounded-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold text-sm",
							children: "Informações Básicas"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "title",
									children: "Título do Contrato"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "title",
									placeholder: "Ex: Patrocínio Master 2025",
									value: title,
									onChange: (e) => setTitle(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "athlete",
									children: "Atleta / Time"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									onValueChange: setAthleteName,
									value: athleteName,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione o destinatário" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: mockTalents.map((talent) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: talent.name,
										children: talent.name
									}, talent.id)) })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "start",
										children: "Início"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "start",
										type: "date",
										value: startDate,
										onChange: (e) => setStartDate(e.target.value)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "end",
										children: "Fim"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "end",
										type: "date",
										value: endDate,
										onChange: (e) => setEndDate(e.target.value)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "baseValue",
									children: "Valor Base (Garantido)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold",
										children: "R$"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "baseValue",
										type: "number",
										placeholder: "0,00",
										className: "pl-9",
										value: baseValue,
										onChange: (e) => setBaseValue(e.target.value)
									})]
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-4 pt-4 border-t border-border/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-1.5 bg-green-500/10 rounded-lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-green-600" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-sm",
								children: "Gatilhos de Performance"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "bg-secondary/20 border-border/50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-4 space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1 col-span-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs",
												children: "Métrica"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "Ex: Gols, Seguidores, Jogos",
												value: newMetric.label,
												onChange: (e) => setNewMetric({
													...newMetric,
													label: e.target.value
												}),
												className: "h-9"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs",
												children: "Meta"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "number",
												placeholder: "Alvo",
												value: newMetric.targetValue,
												onChange: (e) => setNewMetric({
													...newMetric,
													targetValue: e.target.value
												}),
												className: "h-9"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs",
												children: "Unidade"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "unid",
												value: newMetric.unit,
												onChange: (e) => setNewMetric({
													...newMetric,
													unit: e.target.value
												}),
												className: "h-9"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs",
												children: "Bônus (Impacto)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "number",
												placeholder: "R$ +",
												value: newMetric.impactValue,
												onChange: (e) => setNewMetric({
													...newMetric,
													impactValue: e.target.value
												}),
												className: "h-9"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs",
												children: "Tipo"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												value: newMetric.type,
												onValueChange: (v) => setNewMetric({
													...newMetric,
													type: v
												}),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													className: "h-9",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "linear",
													children: "Linear (Proporcional)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "milestone",
													children: "Milestone (Tudo ou Nada)"
												})] })]
											})]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									className: "w-full border-dashed border-primary/30 text-primary hover:bg-primary/5 h-9",
									onClick: handleAddMetric,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-2" }), " Adicionar Gatilho"]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: metrics.map((metric, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-3 rounded-xl border bg-card shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-8 w-8 rounded-full bg-secondary flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-4 w-4 text-muted-foreground" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-sm",
										children: metric.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											"Meta: ",
											metric.targetValue,
											" ",
											metric.unit
										]
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "block text-xs font-bold text-green-600",
											children: ["+ R$ ", metric.impactValue]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-[9px] text-muted-foreground uppercase",
											children: metric.type === "linear" ? "Proporcional" : "Fixo"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleRemoveMetric(index),
										className: "text-muted-foreground hover:text-red-500 transition-colors p-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								})]
							}, index))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-primary/5 rounded-xl p-4 border border-primary/10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Valor Base:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold",
								children: ["R$ ", Number(baseValue || 0).toLocaleString()]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center text-sm mt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-green-600",
								children: "Potencial Extra:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-green-600",
								children: [
									"+ R$",
									" ",
									metrics.reduce((acc, m) => acc + Number(m.impactValue), 0).toLocaleString()
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-primary/10 mt-3 pt-3 flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold",
								children: "Valor Total Possível:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-lg text-primary",
								children: [
									"R$",
									" ",
									(Number(baseValue || 0) + metrics.reduce((acc, m) => acc + Number(m.impactValue), 0)).toLocaleString()
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "lg",
					className: "w-full font-bold shadow-lg h-12 text-base",
					onClick: handleSubmit,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "mr-2 h-5 w-5" }), "Enviar Proposta"]
				})
			]
		})]
	});
}
export { CreateContract as default };

//# sourceMappingURL=CreateContract-CjDF4JuK.js.map