import { t as CircleAlert } from "./circle-alert-CjLTlaAp.js";
import { t as CircleCheck } from "./circle-check-CMULjyTt.js";
import { t as CircleX } from "./circle-x-CfNd_x8v.js";
import { An as TrendingUp, Lr as ArrowLeft, Nn as Target, an as Button, bn as cn, ci as useNavigate, jr as Calendar, li as useParams, ti as require_jsx_runtime, vn as toast } from "./index-Bsg1ViuR.js";
import { t as Progress } from "./progress-BcHEMgbP.js";
import { t as Slider } from "./slider-Cj4jnx1l.js";
import { t as useContractStore } from "./useContractStore-BawJUmGQ.js";
var import_jsx_runtime = require_jsx_runtime();
function ContractDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { contracts, updateContractStatus, updateMetricProgress, getContractValue } = useContractStore();
	const contract = contracts.find((c) => c.id === id);
	if (!contract) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center p-4 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xl font-bold mb-2",
			children: "Contrato não encontrado"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: () => navigate("/contracts"),
			children: "Voltar"
		})] })
	});
	const currentValue = getContractValue(contract);
	const maxValue = contract.baseValue + contract.metrics.reduce((acc, m) => acc + m.impactValue, 0);
	const isLive = contract.status === "active";
	const handleAccept = () => {
		updateContractStatus(contract.id, "active");
		toast.success("Contrato aceito! O monitoramento começou.");
	};
	const handleReject = () => {
		updateContractStatus(contract.id, "rejected");
		toast.info("Proposta recusada.");
		navigate(-1);
	};
	const handleSimulateMetric = (metricId, value) => {
		updateMetricProgress(contract.id, metricId, value);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-24 animate-fade-in flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 p-4 shadow-sm flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: () => navigate(-1),
				className: "-ml-2 hover:bg-secondary/50 rounded-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-bold uppercase tracking-widest text-muted-foreground bg-secondary px-2 py-0.5 rounded",
				children: isLive ? "Live Tracking" : "Proposta"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 p-4 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-20 h-20 rounded-2xl bg-white p-2 shadow-lg mb-4 flex items-center justify-center border border-border/50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: contract.proposerLogo,
								alt: contract.proposerName,
								className: "w-full h-full object-contain"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl font-bold leading-tight",
							children: contract.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: contract.proposerName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mt-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								new Date(contract.startDate).toLocaleDateString(),
								" -",
								" ",
								new Date(contract.endDate).toLocaleDateString()
							] })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-0 right-0 p-3 opacity-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-24 h-24" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1",
								children: ["Valor ", isLive ? "Atual do Contrato" : "Proposto"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-1.5 mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-lg font-medium text-muted-foreground self-start mt-2",
									children: contract.currency
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-5xl font-black tracking-tight text-foreground",
									children: currentValue.toLocaleString()
								})]
							}),
							isLive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-1.5 bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-3 h-3" }), "Live Update"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 pt-4 border-t border-border/50 flex justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-muted-foreground",
									children: "Base Garantida"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold",
									children: [
										contract.currency,
										" ",
										contract.baseValue.toLocaleString()
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-muted-foreground",
										children: "Potencial Máximo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-primary",
										children: [
											contract.currency,
											" ",
											maxValue.toLocaleString()
										]
									})]
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-bold text-sm flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "w-4 h-4 text-primary" }), "Metas de Performance"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: contract.metrics.map((metric) => {
							const progress = Math.min(100, metric.currentValue / metric.targetValue * 100);
							const isAchieved = metric.currentValue >= metric.targetValue;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-secondary/20 rounded-xl p-4 border border-border/50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-start mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-sm block",
											children: metric.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground uppercase",
											children: metric.type === "linear" ? "Escalável" : "Milestone"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-sm text-green-600",
												children: [
													"+ ",
													contract.currency,
													" ",
													metric.impactValue
												]
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5 mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												metric.currentValue,
												" ",
												metric.unit
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-muted-foreground",
												children: [
													metric.targetValue,
													" ",
													metric.unit
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
											value: progress,
											className: cn("h-2", isAchieved ? "[&>div]:bg-green-500" : "[&>div]:bg-primary")
										})]
									}),
									isLive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-2 border-t border-border/30 mt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[9px] text-muted-foreground mb-1 uppercase tracking-wider",
											children: "Simular Progresso (Demo)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
											defaultValue: [metric.currentValue],
											max: metric.targetValue * 1.5,
											step: 1,
											onValueChange: (val) => handleSimulateMetric(metric.id, val[0])
										})]
									})
								]
							}, metric.id);
						})
					})]
				}),
				contract.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border/50 backdrop-blur-lg flex gap-3 z-40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700",
						onClick: handleReject,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "w-4 h-4 mr-2" }), "Recusar"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "flex-1 bg-green-600 hover:bg-green-700 text-white shadow-lg",
						onClick: handleAccept,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 mr-2" }), "Aceitar Proposta"]
					})]
				}),
				contract.status === "rejected" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 bg-red-500/10 text-red-600 rounded-xl text-center text-sm font-medium border border-red-500/20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-5 h-5 mx-auto mb-2" }), "Esta proposta foi recusada."]
				})
			]
		})]
	});
}
export { ContractDetails as default };

//# sourceMappingURL=ContractDetails-MPVNvHv7.js.map