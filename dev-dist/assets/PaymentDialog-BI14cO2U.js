import { t as CircleAlert } from "./circle-alert-1HJY-dhJ.js";
import { t as CircleCheck } from "./circle-check-ChO3r4RK.js";
import { t as Wallet } from "./wallet-DiB5bLZN.js";
import { Dr as createLucideIcon, Vr as require_jsx_runtime, Wn as Lock, Zr as require_react, c as DialogContent, d as DialogHeader, en as Button, et as mockFinancialSummary, f as DialogTitle, fn as toast, mn as cn, o as Dialog, p as DialogTrigger, xn as Trophy } from "./index-D9lGzB06.js";
import { t as Label } from "./label-D2jezcj0.js";
import { t as Input } from "./input-CW8_-yX4.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-9wA7rEWy.js";
var Coins = createLucideIcon("coins", [
	["circle", {
		cx: "8",
		cy: "8",
		r: "6",
		key: "3yglwk"
	}],
	["path", {
		d: "M18.09 10.37A6 6 0 1 1 10.34 18",
		key: "t5s6rm"
	}],
	["path", {
		d: "M7 6h1v4",
		key: "1obek4"
	}],
	["path", {
		d: "m16.71 13.88.7.71-2.82 2.82",
		key: "1rbuyh"
	}]
]);
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function PaymentDialog({ children, title, price, pointsPrice, onSuccess }) {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)("form");
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("credit-card");
	const userBalance = mockFinancialSummary.balance;
	const userPoints = mockFinancialSummary.pointsBalance;
	const handlePay = (e) => {
		e.preventDefault();
		if (paymentMethod === "goplay-points" && pointsPrice && userPoints < pointsPrice) {
			toast.error("Saldo de pontos insuficiente.");
			return;
		}
		if (paymentMethod === "balance" && userBalance < price) {
			toast.error("Saldo em carteira insuficiente.");
			return;
		}
		setStep("processing");
		setTimeout(() => {
			setStep("success");
			if (onSuccess) onSuccess();
		}, 2e3);
	};
	const handleClose = () => {
		setIsOpen(false);
		setTimeout(() => {
			setStep("form");
		}, 300);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open: isOpen,
		onOpenChange: setIsOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md bg-background border border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-center",
					children: step === "success" ? "Compra Realizada!" : "Pagamento Seguro"
				}) }),
				step === "form" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-secondary/30 p-4 rounded-xl flex justify-between items-center mb-6 border border-border/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted-foreground",
									children: title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold text-2xl text-primary",
									children: ["R$ ", price.toFixed(2)]
								}),
								pointsPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-gold font-bold",
									children: [
										"ou ",
										pointsPrice,
										" pts"
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-background p-2 rounded-full shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5 text-primary" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						defaultValue: "credit-card",
						onValueChange: setPaymentMethod,
						className: "w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "grid w-full grid-cols-4 mb-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "credit-card",
										className: "text-xs",
										children: "Cartão"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "balance",
										className: "text-xs",
										children: "Saldo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "goplay-points",
										className: "text-xs",
										children: "Pontos"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "mixed",
										className: "text-xs",
										children: "Misto"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "credit-card",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handlePay,
									className: "space-y-4 animate-fade-in",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "card",
												children: "Número do Cartão"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "card",
												placeholder: "0000 0000 0000 0000",
												required: true,
												className: "font-mono"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "expiry",
													children: "Validade"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "expiry",
													placeholder: "MM/AA",
													required: true
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "cvv",
													children: "CVV"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "cvv",
													placeholder: "123",
													required: true
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "submit",
											className: "w-full h-12 text-base font-bold mt-4",
											children: ["Pagar R$ ", price.toFixed(2)]
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "balance",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handlePay,
									className: "space-y-6 animate-fade-in",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-gradient-to-br from-[#6D28D9] via-[#4C1D95] to-[#B45309] rounded-xl p-5 text-white relative overflow-hidden shadow-md",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex justify-between items-center relative z-10 mb-2",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-bold flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-4 w-4" }), " Carteira Goplay"]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-2xl font-bold mb-1",
													children: ["R$ ", userBalance.toFixed(2)]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs opacity-80",
													children: "Disponível para uso"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-col gap-2",
											children: userBalance >= price ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-green-500/10 p-3 rounded-lg border border-green-500/20 text-xs text-green-600 flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Saldo suficiente." })]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-xs text-red-600 flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Saldo insuficiente. Recarregue sua carteira." })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											className: "w-full h-12 text-base font-bold",
											disabled: userBalance < price,
											children: "Pagar com Saldo"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "goplay-points",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handlePay,
									className: "space-y-6 animate-fade-in",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-gradient-to-br from-yellow-500 to-amber-700 rounded-xl p-5 text-white relative overflow-hidden shadow-md",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex justify-between items-center relative z-10 mb-2",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-bold flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-4 w-4" }), " Goplay Points"]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-2xl font-bold mb-1",
													children: [userPoints, " pts"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs opacity-80",
													children: "Disponível para troca"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-col gap-2",
											children: pointsPrice ? userPoints >= pointsPrice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-green-500/10 p-3 rounded-lg border border-green-500/20 text-xs text-green-600 flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pontos suficientes." })]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-xs text-red-600 flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pontos insuficientes." })]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-secondary/50 p-3 rounded-lg border border-border/50 text-xs text-muted-foreground flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Este produto não aceita pontos." })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "submit",
											className: "w-full h-12 text-base font-bold bg-gold hover:bg-gold/90 text-black",
											disabled: !pointsPrice || userPoints < pointsPrice,
											children: [
												"Trocar por ",
												pointsPrice || 0,
												" pts"
											]
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "mixed",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 text-center text-muted-foreground space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, { className: "h-10 w-10 mx-auto opacity-50" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pagamento Misto" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs",
											children: "Combine Pontos e Saldo para completar o valor."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "outline",
												className: "w-full",
												disabled: true,
												children: "Em breve"
											})
										})
									]
								})
							})
						]
					})]
				}),
				step === "processing" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center py-8 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("w-12 h-12 border-4 border-t-transparent rounded-full animate-spin border-primary") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground animate-pulse",
						children: "Processando transação..."
					})]
				}),
				step === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center py-4 space-y-4 animate-in zoom-in duration-300",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10 text-green-500" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-lg",
								children: "Sucesso!"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-muted-foreground px-4 text-sm",
								children: "Sua compra foi confirmada e o histórico financeiro atualizado."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full bg-green-600 hover:bg-green-700 mt-4",
							onClick: handleClose,
							children: "Concluir"
						})
					]
				})
			]
		})]
	});
}
export { PaymentDialog as t };

//# sourceMappingURL=PaymentDialog-BI14cO2U.js.map