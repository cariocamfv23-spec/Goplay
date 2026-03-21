import { t as CircleCheck } from "./circle-check-BV1uHxyG.js";
import { t as CircleX } from "./circle-x-CDy5SXuK.js";
import { t as Plus } from "./plus-Dpc-g1PF.js";
import { Kr as useNavigate, N as Badge, Sr as ArrowLeft, Zt as Button, _r as Briefcase, cr as Clock, dn as cn, nr as FilePenLine, yn as TrendingUp, zr as require_jsx_runtime } from "./index-GF_UKfZV.js";
import { n as CardContent, t as Card } from "./card-d9rwX2Pq.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DZk7l6ll.js";
import { t as useContractStore } from "./useContractStore-B8IFJhO_.js";
var import_jsx_runtime = require_jsx_runtime();
function LiveContractsDashboard() {
	const navigate = useNavigate();
	const { contracts, getContractValue } = useContractStore();
	const activeContracts = contracts.filter((c) => c.status === "active");
	const pendingContracts = contracts.filter((c) => c.status === "pending");
	const historyContracts = contracts.filter((c) => c.status === "completed" || c.status === "rejected" || c.status === "draft");
	const getStatusBadge = (status) => {
		switch (status) {
			case "active": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				className: "bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20 gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-3 h-3" }), " Vivo"]
			});
			case "pending": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				variant: "outline",
				className: "text-orange-500 border-orange-500/30 gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3 h-3" }), " Pendente"]
			});
			case "completed": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				variant: "secondary",
				className: "text-muted-foreground gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3 h-3" }), " Concluído"]
			});
			case "rejected": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				variant: "destructive",
				className: "bg-red-500/10 text-red-500 border-red-500/20 gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "w-3 h-3" }), " Recusado"]
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "outline",
				children: status
			});
		}
	};
	const ContractCard = ({ contract }) => {
		const currentValue = getContractValue(contract);
		const isLive = contract.status === "active";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "overflow-hidden cursor-pointer hover:shadow-md transition-all active:scale-[0.99] group border-border/50",
			onClick: () => navigate(`/contracts/${contract.id}`),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 bg-gradient-to-b from-primary to-primary/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-start mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-10 w-10 rounded-lg bg-secondary/50 p-1.5 border border-border/50",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: contract.proposerLogo,
											alt: contract.proposerName,
											className: "w-full h-full object-contain"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-sm leading-none mb-1",
										children: contract.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: contract.proposerName
									})] })]
								}), getStatusBadge(contract.status)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-end justify-between bg-secondary/20 rounded-xl p-3 border border-border/30",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-0.5",
									children: ["Valor ", isLive ? "Atual" : "Proposto"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-medium text-muted-foreground",
										children: contract.currency
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("text-xl font-bold", isLive ? "text-green-600 dark:text-green-400" : ""),
										children: currentValue.toLocaleString()
									})]
								})] }), isLive && currentValue > contract.baseValue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-500/10 px-1.5 py-0.5 rounded-full",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-3 h-3" }),
											"+",
											((currentValue - contract.baseValue) / contract.baseValue * 100).toFixed(0),
											"%"
										]
									})
								})]
							}),
							contract.metrics.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex gap-2 overflow-hidden",
								children: [contract.metrics.slice(0, 3).map((metric) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									className: "text-[9px] h-5 font-normal bg-secondary border-none truncate max-w-[100px]",
									children: metric.label
								}, metric.id)), contract.metrics.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									className: "text-[9px] h-5 px-1.5",
									children: ["+", contract.metrics.length - 3]
								})]
							})
						]
					})]
				})
			})
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 p-4 shadow-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => navigate(-1),
						className: "-ml-2 hover:bg-secondary/50 rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-bold text-lg leading-none flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, { className: "h-5 w-5 text-primary" }), "Contratos Vivos"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Propostas e Acordos Dinâmicos"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => navigate("/contracts/create"),
					className: "h-9 px-3 gap-1 shadow-md bg-primary hover:bg-primary/90",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Nova Proposta"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sm:hidden",
							children: "Criar"
						})
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "active",
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "grid w-full grid-cols-3 mb-6 bg-secondary/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "active",
								children: [
									"Ativos (",
									activeContracts.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "pending",
								children: [
									"Pendentes (",
									pendingContracts.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "history",
								children: "Histórico"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "active",
						className: "space-y-4 animate-in slide-in-from-bottom-2",
						children: activeContracts.length > 0 ? activeContracts.map((contract) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContractCard, { contract }, contract.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center py-12 border-2 border-dashed border-border/50 rounded-2xl bg-secondary/10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-10 w-10 mx-auto text-muted-foreground/30 mb-3" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-muted-foreground",
									children: "Nenhum contrato ativo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground/60 mt-1 px-4",
									children: "Seus contratos em andamento aparecerão aqui."
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "pending",
						className: "space-y-4 animate-in slide-in-from-bottom-2",
						children: pendingContracts.length > 0 ? pendingContracts.map((contract) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContractCard, { contract }, contract.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center py-12 border-2 border-dashed border-border/50 rounded-2xl bg-secondary/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-10 w-10 mx-auto text-muted-foreground/30 mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-muted-foreground",
								children: "Nenhuma proposta pendente"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "history",
						className: "space-y-4 animate-in slide-in-from-bottom-2",
						children: historyContracts.length > 0 ? historyContracts.map((contract) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContractCard, { contract }, contract.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center py-12 border-2 border-dashed border-border/50 rounded-2xl bg-secondary/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, { className: "h-10 w-10 mx-auto text-muted-foreground/30 mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-muted-foreground",
								children: "Histórico vazio"
							})]
						})
					})
				]
			})
		})]
	});
}
export { LiveContractsDashboard as default };

//# sourceMappingURL=LiveContractsDashboard-0H6FHCH5.js.map