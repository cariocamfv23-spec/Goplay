import { n as ArrowDownLeft, t as ArrowUpRight } from "./arrow-up-right-TSgR9KZx.js";
import { t as Plus } from "./plus-DnONAmxC.js";
import { t as QrCode } from "./qr-code-Ys3y_DHE.js";
import "./wallet-C6utmmX0.js";
import { t as DigitalCard } from "./DigitalCard-BsJYxgfR.js";
import { Lr as ArrowLeft, an as Button, ci as useNavigate, or as History, ti as require_jsx_runtime, xr as CreditCard } from "./index-D2WRTAIi.js";
import { n as CardContent, t as Card } from "./card-DdHNvzw1.js";
var import_jsx_runtime = require_jsx_runtime();
function Wallet() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 bg-background z-20 p-4 border-b border-border/50 flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: () => navigate(-1),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-bold",
				children: "Carteira"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-gradient-to-br from-[#6D28D9] via-[#4C1D95] to-[#B45309] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl transform translate-x-10 -translate-y-10" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-start mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-white/80 text-sm font-medium",
										children: "Saldo Total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DigitalCard, {
										balance: "R$ 1.250,00",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "ghost",
											size: "sm",
											className: "bg-white/10 hover:bg-white/20 text-white h-8 px-3 rounded-full border border-white/10 backdrop-blur-md",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "w-3.5 h-3.5 mr-2" }), " Ver Cartão"]
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-4xl font-bold mb-8 tracking-tight",
									children: "R$ 1.250,00"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "secondary",
										className: "bg-white/20 hover:bg-white/30 text-white border-none flex-1 backdrop-blur-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Adicionar"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "secondary",
										className: "bg-white/20 hover:bg-white/30 text-white border-none flex-1 backdrop-blur-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "mr-2 h-4 w-4" }), " Sacar"]
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DigitalCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "hover:bg-secondary/20 cursor-pointer transition-colors border-none shadow-sm group active:scale-95 duration-200",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-4 flex flex-col items-center justify-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-6 w-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-xs",
									children: "Meu Cartão"
								})]
							})
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "hover:bg-secondary/20 cursor-pointer transition-colors border-none shadow-sm group active:scale-95 duration-200",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-4 flex flex-col items-center justify-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-3 rounded-full bg-green-500/10 text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "h-6 w-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-xs",
									children: "Pagar QR"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "hover:bg-secondary/20 cursor-pointer transition-colors border-none shadow-sm group active:scale-95 duration-200",
							onClick: () => navigate("/financials/transactions"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-4 flex flex-col items-center justify-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-3 rounded-full bg-orange-500/10 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-6 w-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-xs",
									children: "Extrato"
								})]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-lg",
						children: "Transações Recentes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "link",
						className: "text-xs text-muted-foreground p-0 h-auto",
						children: "Ver tudo"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [[
						1,
						2,
						3
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between p-3 bg-secondary/10 rounded-xl border border-border/50 hover:bg-secondary/30 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownLeft, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-sm",
								children: "Goplay Card"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Hoje, 14:30"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-red-600",
							children: "- R$ 24,90"
						})]
					}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between p-3 bg-secondary/10 rounded-xl border border-border/50 hover:bg-secondary/30 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-sm",
								children: "Recarga Pix"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Ontem"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-green-600",
							children: "+ R$ 500,00"
						})]
					})]
				})] })
			]
		})]
	});
}
export { Wallet as default };

//# sourceMappingURL=Wallet-CjAzx4Ic.js.map