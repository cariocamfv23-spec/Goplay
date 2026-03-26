import { t as QrCode } from "./qr-code-B5h5x6eP.js";
import { t as Wallet } from "./wallet-CJ_40U6-.js";
import { Br as createLucideIcon, Cn as cn, Un as ShieldCheck, l as DialogContent, m as DialogTrigger, mr as Fuel, s as Dialog, ti as require_jsx_runtime, tt as mockCurrentUser, xr as CreditCard } from "./index-Dah213wy.js";
import { n as CardContent } from "./card-QhM0dEIS.js";
var Wifi = createLucideIcon("wifi", [
	["path", {
		d: "M12 20h.01",
		key: "zekei9"
	}],
	["path", {
		d: "M2 8.82a15 15 0 0 1 20 0",
		key: "dnpr2z"
	}],
	["path", {
		d: "M5 12.859a10 10 0 0 1 14 0",
		key: "1x1e6c"
	}],
	["path", {
		d: "M8.5 16.429a5 5 0 0 1 7 0",
		key: "1bycff"
	}]
]);
var import_jsx_runtime = require_jsx_runtime();
function DigitalCard({ title = "Goplay Card", type = "goplay", balance = "R$ 1.250,00", children, triggerClassName }) {
	const getGradient = () => {
		switch (type) {
			case "fit": return "bg-gradient-to-br from-primary to-purple-900";
			case "market": return "bg-gradient-to-br from-emerald-600 to-teal-900";
			case "recovery": return "bg-gradient-to-br from-cyan-600 to-blue-900";
			case "fuel": return "bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-600";
			case "goplay":
			default: return "bg-gradient-to-br from-[#6D28D9] via-[#4C1D95] to-[#B45309]";
		}
	};
	const getIcon = () => {
		switch (type) {
			case "fit": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-6 w-6 text-white/90" });
			case "market": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "h-6 w-6 text-white/90" });
			case "recovery": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-6 w-6 text-white/90" });
			case "fuel": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fuel, { className: "h-6 w-6 text-white/90" });
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-6 w-6 text-white/90" });
		}
	};
	const getTitle = () => {
		if (title !== "Goplay Card") return title;
		switch (type) {
			case "fuel": return "Goplay Fuel";
			default: return title;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
		asChild: true,
		children: children ? children : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: cn("flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors", triggerClassName),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ver Cartão" })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
		className: "sm:max-w-md bg-transparent border-none shadow-none p-0 flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "perspective-1000 group w-full max-w-[360px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("w-full aspect-[1.586/1] rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl transition-all duration-500 hover:rotate-y-3 hover:scale-105", getGradient()),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-20 -right-20 w-64 h-64 bg-primary/30 rounded-full blur-3xl mix-blend-screen" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-20 -left-20 w-64 h-64 bg-[hsl(var(--gold)/0.2)] rounded-full blur-3xl mix-blend-screen" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "h-full flex flex-col justify-between p-6 relative z-10 text-white",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold text-xl tracking-tight drop-shadow-md",
									children: getTitle()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-white/70 text-[10px] font-medium uppercase tracking-wider",
									children: "Virtual Member"
								})] }), getIcon()]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-11 h-8 bg-gradient-to-tr from-yellow-600 to-yellow-300 rounded-md shadow-sm relative overflow-hidden opacity-90",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/10" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "w-6 h-6 rotate-90 text-white/60" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-between items-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] text-white/70 uppercase tracking-widest mb-0.5",
											children: "Saldo Disponível"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-2xl tracking-tight text-white drop-shadow-sm",
											children: balance
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-end",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] text-white/70 uppercase tracking-widest",
											children: "Titular"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold tracking-widest text-sm text-shadow uppercase",
											children: mockCurrentUser.name
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-end",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] text-white/70 uppercase",
											children: "Validade"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-sm tracking-wider",
											children: "12/30"
										})]
									})]
								})]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mt-6 text-white font-medium animate-pulse drop-shadow-md flex items-center justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "w-4 h-4" }), "Aproxime para pagar"]
			})]
		})
	})] });
}
export { DigitalCard as t };

//# sourceMappingURL=DigitalCard-C7pbRpzU.js.map