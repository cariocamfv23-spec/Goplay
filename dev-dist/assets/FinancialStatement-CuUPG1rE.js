import { n as ArrowDownLeft, t as ArrowUpRight } from "./arrow-up-right-FNq9f0lT.js";
import { t as CircleCheck } from "./circle-check-D8HG44fp.js";
import { t as CircleX } from "./circle-x-D4kDjRA8.js";
import { t as Megaphone } from "./megaphone-CqzmWkJk.js";
import { t as UserPlus } from "./user-plus-BbginPPB.js";
import { t as Wallet } from "./wallet-4arHjo5v.js";
import { Cr as createLucideIcon, Lr as require_jsx_runtime, M as Badge, N as ScrollArea, On as ShoppingBag, Tn as Star, Wr as useNavigate, X as mockFinancialSummary, Xt as Button, Y as mockFinancialHistory, _n as Trophy, br as ArrowLeft, or as Clock, un as cn } from "./index-B1eGiQWt.js";
import { n as CardContent, t as Card } from "./card-Dk9UBOl5.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BudGxkUn.js";
var ArrowRightLeft = createLucideIcon("arrow-right-left", [
	["path", {
		d: "m16 3 4 4-4 4",
		key: "1x1c3m"
	}],
	["path", {
		d: "M20 7H4",
		key: "zbl0bi"
	}],
	["path", {
		d: "m8 21-4-4 4-4",
		key: "h9nckh"
	}],
	["path", {
		d: "M4 17h16",
		key: "g4d7ey"
	}]
]);
var import_jsx_runtime = require_jsx_runtime();
function FinancialStatement() {
	const navigate = useNavigate();
	const summaryData = mockFinancialSummary;
	const balance = Number(summaryData?.balance ?? 0);
	const totalSpent = Number(summaryData?.totalSpent ?? summaryData?.monthlySpending ?? 0);
	const pointsBalance = Number(summaryData?.pointsBalance ?? 0);
	const pointsEarned = Number(summaryData?.pointsEarned ?? 0);
	const conversionRate = summaryData?.conversionRate ?? "1:1";
	const marketplaceStatus = summaryData?.marketplaceStatus ?? "Ativo";
	const getTransactionIcon = (type) => {
		switch (type) {
			case "gain":
			case "payment": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-5 w-5" });
			case "spend": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownLeft, { className: "h-5 w-5" });
			case "bonus": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-5 w-5" });
			case "invite": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-5 w-5" });
			case "marketing": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "h-5 w-5" });
			case "marketplace": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-5 w-5" });
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRightLeft, { className: "h-5 w-5" });
		}
	};
	const getTransactionColor = (type, currency) => {
		if (type === "spend" || type === "marketplace") return "text-red-500";
		return currency === "BRL" ? "text-green-500" : "text-gold";
	};
	const getStatusBadge = (status) => {
		switch (status) {
			case "confirmed": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				variant: "outline",
				className: "text-[10px] h-5 px-1.5 gap-1 border-green-500/30 text-green-600 bg-green-500/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }), " Confirmado"]
			});
			case "pending": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				variant: "outline",
				className: "text-[10px] h-5 px-1.5 gap-1 border-yellow-500/30 text-yellow-600 bg-yellow-500/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), " Pendente"]
			});
			case "expired": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				variant: "outline",
				className: "text-[10px] h-5 px-1.5 gap-1 border-red-500/30 text-red-600 bg-red-500/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3 w-3" }), " Expirado"]
			});
			default: return null;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 bg-background/95 backdrop-blur-sm z-20 p-4 border-b border-border/50 flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: () => navigate(-1),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-6 w-6" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-bold",
				children: "Extrato Financeiro"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-none shadow-lg bg-gradient-to-br from-primary to-purple-900 text-white relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-6 relative z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-start mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-3 bg-white/10 rounded-xl backdrop-blur-md",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-6 w-6 text-white" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: "bg-white/20 hover:bg-white/30 text-white border-none",
										children: "Carteira Digital"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-white/70 font-medium",
										children: "Saldo disponível"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "text-3xl font-bold tracking-tight",
										children: ["R$ ", balance.toFixed(2)]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-4 border-t border-white/10 flex justify-between items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-white/70",
										children: "Total gasto na plataforma"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-sm",
										children: ["R$ ", totalSpent.toFixed(2)]
									})]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-none shadow-lg bg-gradient-to-br from-[#B45309] to-[#78350f] text-white relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-6 relative z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-start mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-3 bg-white/10 rounded-xl backdrop-blur-md",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-6 w-6 text-white" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: "bg-white/20 hover:bg-white/30 text-white border-none",
										children: "Goplay Points"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-white/70 font-medium",
										children: "Pontos disponíveis para uso"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "text-3xl font-bold tracking-tight",
										children: [pointsBalance, " pts"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 pt-4 border-t border-white/10",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-white/70",
												children: "Total ganho em pontos"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold",
												children: [pointsEarned, " pts"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-white/70",
												children: "Conversão de pontos"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold",
												children: conversionRate
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-white/70",
												children: "Uso no Marketplace"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-green-300 flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }),
													" ",
													marketplaceStatus
												]
											})]
										})
									]
								})
							]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-lg font-bold flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRightLeft, { className: "h-5 w-5 text-primary" }), "Histórico de Movimentações"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "all",
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "w-full grid grid-cols-3 mb-4 bg-muted/50 p-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "all",
									children: "Tudo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "money",
									children: "Dinheiro"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "points",
									children: "Pontos"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "all",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
								className: "h-[400px] pr-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [(mockFinancialHistory || []).map((transaction) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionItem, {
										transaction,
										getIcon: getTransactionIcon,
										getColor: getTransactionColor,
										getBadge: getStatusBadge
									}, transaction.id)), (!mockFinancialHistory || mockFinancialHistory.length === 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center py-10 text-muted-foreground text-sm",
										children: "Nenhuma movimentação encontrada."
									})]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "money",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
								className: "h-[400px] pr-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [(mockFinancialHistory || []).filter((t) => t.currency === "BRL").map((transaction) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionItem, {
										transaction,
										getIcon: getTransactionIcon,
										getColor: getTransactionColor,
										getBadge: getStatusBadge
									}, transaction.id)), (!mockFinancialHistory || mockFinancialHistory.filter((t) => t.currency === "BRL").length === 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center py-10 text-muted-foreground text-sm",
										children: "Nenhuma movimentação em dinheiro."
									})]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "points",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
								className: "h-[400px] pr-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [(mockFinancialHistory || []).filter((t) => t.currency === "PTS").map((transaction) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionItem, {
										transaction,
										getIcon: getTransactionIcon,
										getColor: getTransactionColor,
										getBadge: getStatusBadge
									}, transaction.id)), (!mockFinancialHistory || mockFinancialHistory.filter((t) => t.currency === "PTS").length === 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center py-10 text-muted-foreground text-sm",
										children: "Nenhuma movimentação em pontos."
									})]
								})
							})
						})
					]
				})]
			})]
		})]
	});
}
function TransactionItem({ transaction, getIcon, getColor, getBadge }) {
	if (!transaction) return null;
	const value = Number(transaction.value ?? 0);
	const currency = transaction.currency ?? "BRL";
	const type = transaction.type ?? "unknown";
	const status = transaction.status ?? "pending";
	const description = transaction.description ?? "Sem descrição";
	const date = transaction.date ?? "-";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between p-4 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 group",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("h-12 w-12 rounded-full flex items-center justify-center bg-muted group-hover:bg-background border border-transparent group-hover:border-border transition-colors", getColor(type, currency)),
				children: getIcon(type)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-bold text-sm leading-tight",
					children: description
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: date
					}), getBadge(status)]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-right",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("block font-bold", getColor(type, currency)),
				children: [value > 0 ? "+" : "", currency === "BRL" ? `R$ ${Math.abs(value).toFixed(2).replace(".", ",")}` : `${Math.abs(value)} pts`]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] uppercase text-muted-foreground font-medium tracking-wider",
				children: type === "spend" ? "Gasto" : type === "gain" ? "Ganho" : type === "bonus" ? "Bônus" : type
			})]
		})]
	});
}
export { FinancialStatement as default };

//# sourceMappingURL=FinancialStatement-CuUPG1rE.js.map