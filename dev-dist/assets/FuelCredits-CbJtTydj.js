import { n as ArrowDownLeft, t as ArrowUpRight } from "./arrow-up-right-BQlPUMwk.js";
import { t as History } from "./history-BVsc28Vi.js";
import "./qr-code-Cd8mhUlk.js";
import "./wallet-R5RlAvpM.js";
import { t as DigitalCard } from "./DigitalCard-D6bzCIxg.js";
import { Hr as require_jsx_runtime, Jn as Info, L as Badge, Tr as ArrowLeft, Un as MapPin, Yr as useNavigate, lr as CreditCard, nr as Fuel, nt as mockFuelTransactions, tn as Button } from "./index-CtM3-AOU.js";
import { n as CardContent, t as Card } from "./card-ZaGdmuED.js";
var import_jsx_runtime = require_jsx_runtime();
function FuelCredits() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sticky top-0 bg-background/95 backdrop-blur z-20 p-4 border-b border-border/50 flex items-center justify-between",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => navigate(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-xl font-bold flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fuel, { className: "h-5 w-5 text-yellow-600" }), "Combustível Goplay"]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DigitalCard, {
						type: "fuel",
						balance: "R$ 180,00",
						title: "Goplay Fuel",
						triggerClassName: "w-full max-w-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full max-w-sm cursor-pointer transform hover:scale-105 transition-transform duration-300",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden aspect-[1.586/1]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative z-10 flex flex-col justify-between h-full",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-start",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-bold text-xl tracking-tight drop-shadow-md",
												children: "Goplay Fuel"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fuel, { className: "h-6 w-6 text-white/90" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-white/70 uppercase tracking-widest mb-1",
												children: "Saldo Combustível"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-3xl tracking-tight text-white drop-shadow-sm",
												children: "R$ 180,00"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-xs font-medium text-white/80",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Toque para ver detalhes" })]
										})
									]
								})]
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4 w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "border-none shadow-sm bg-secondary/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-4 flex flex-col items-center text-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-2 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									children: "Como Funciona"
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "border-none shadow-sm bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors",
							onClick: () => navigate("/explore/fuel/stations"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-4 flex flex-col items-center text-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									children: "Postos Parceiros"
								})]
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card rounded-xl p-4 border border-border/50 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-bold text-sm mb-2 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: "text-[10px] px-2 h-5",
							children: "INFO"
						}), "Sobre o Crédito"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground leading-relaxed",
						children: "Este saldo é exclusivo para abastecimento em postos parceiros, fornecido por times e organizadores para cobrir seus custos de deslocamento para eventos e jogos."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-bold text-lg flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-4 w-4 text-muted-foreground" }), " Extrato Recente"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: mockFuelTransactions.map((transaction) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between p-3 bg-card rounded-xl border border-border/50 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${transaction.type === "deposit" ? "bg-green-100 text-green-600 dark:bg-green-900/20" : "bg-red-100 text-red-600 dark:bg-red-900/20"}`,
								children: transaction.type === "deposit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownLeft, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-sm",
								children: transaction.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									transaction.description,
									" • ",
									transaction.date
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `font-bold text-sm ${transaction.type === "deposit" ? "text-green-600" : "text-red-600"}`,
							children: [
								transaction.type === "deposit" ? "+" : "-",
								" R$",
								" ",
								transaction.amount.toFixed(2)
							]
						})]
					}, transaction.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-bold text-lg mb-4",
					children: "Rede Parceira"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4",
					children: [
						{
							name: "Shell",
							color: "red"
						},
						{
							name: "Ipiranga",
							color: "blue"
						},
						{
							name: "Petrobras",
							color: "green"
						},
						{
							name: "Ale",
							color: "cyan"
						}
					].map((partner, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-2 min-w-[80px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-16 h-16 rounded-full bg-white shadow-sm border border-border flex items-center justify-center p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: `https://img.usecurling.com/i?q=${partner.name}&color=${partner.color}`,
								alt: partner.name,
								className: "w-full h-full object-contain"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium text-muted-foreground",
							children: partner.name
						})]
					}, i))
				})] })
			]
		})]
	});
}
export { FuelCredits as default };

//# sourceMappingURL=FuelCredits-CbJtTydj.js.map