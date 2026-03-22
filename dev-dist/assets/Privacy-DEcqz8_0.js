import "./circle-alert-hYlPRKTc.js";
import "./circle-check-BU6Lk7K4.js";
import { t as PaymentDialog } from "./PaymentDialog-BZd9b1zf.js";
import { t as Ghost } from "./ghost-DrdEDUcH.js";
import { t as Shield } from "./shield-qY1k_n_t.js";
import "./wallet-D_pr4rCa.js";
import { Gn as Lock, Hr as require_jsx_runtime, L as Badge, O as usePrivacyStore, Tr as ArrowLeft, Yr as useNavigate, cr as Crown, hn as cn, k as Switch, or as Eye, tn as Button } from "./index-CZGnW8jE.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-B-e8E4Uu.js";
import "./label-DTLZA-TB.js";
import "./input-BYCBJ3-Q.js";
import "./tabs-BeHHX435.js";
var import_jsx_runtime = require_jsx_runtime();
function PrivacySettings() {
	const navigate = useNavigate();
	const { isInvisibleMode, isPremium, toggleInvisibleMode, upgradeToPremium } = usePrivacyStore();
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
				children: "Privacidade e Segurança"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-lg font-bold flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-5 h-5 text-primary" }), "Sua Privacidade"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Gerencie como os outros veem você e controle seus rastros de navegação no app."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: cn("relative overflow-hidden transition-all duration-300", isInvisibleMode ? "border-gold/50 shadow-[0_0_20px_hsl(var(--gold)/0.15)]" : "border-border"),
					children: [
						isInvisibleMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							className: "pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								className: "flex items-center justify-between text-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ghost, { className: cn("w-5 h-5 transition-colors", isInvisibleMode ? "text-gold animate-pulse" : "text-primary") }), "Modo Invisível"]
								}), !isPremium && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									className: "bg-gold/20 text-gold hover:bg-gold/30 border-none px-2 py-0.5 shadow-sm flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "w-3 h-3 fill-gold" }), "PRO"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								className: "text-sm",
								children: "Navegue anonimamente sem disparar notificações de VIP ou aparecer em históricos de visitas de outros perfis."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between bg-secondary/30 p-4 rounded-xl border border-border/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("p-2 rounded-full transition-colors", isInvisibleMode ? "bg-gold/20 text-gold" : "bg-muted text-muted-foreground"),
									children: isInvisibleMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-5 h-5 opacity-50" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-5 h-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-sm",
									children: "Status do Modo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: cn("text-xs font-medium transition-colors", isInvisibleMode ? "text-gold" : "text-muted-foreground"),
									children: isInvisibleMode ? "Ativado (Invisível)" : "Desativado (Visível)"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("relative flex items-center justify-center h-6 w-11 rounded-full ring-2 transition-all", isInvisibleMode ? "ring-gold/50 shadow-[0_0_10px_hsl(var(--gold)/0.2)]" : "ring-transparent"),
								children: [!isPremium && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDialog, {
									title: "Desbloquear Modo Invisível",
									price: 19.9,
									pointsPrice: 1e3,
									onSuccess: () => {
										upgradeToPremium();
										toggleInvisibleMode(true);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 z-10 cursor-pointer" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: isInvisibleMode,
									onCheckedChange: (c) => {
										if (isPremium) toggleInvisibleMode(c);
									},
									className: cn(isInvisibleMode && "data-[state=checked]:bg-gold")
								})]
							})]
						}) })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-bold text-muted-foreground uppercase px-1",
						children: "Geral"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card border rounded-xl overflow-hidden divide-y",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							className: "w-full justify-start h-14 rounded-none px-4 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-5 h-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: "Autenticação em Dois Fatores"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Maior segurança para sua conta"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							className: "w-full justify-start h-14 rounded-none px-4 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-5 h-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: "Dados e Permissões"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Gerencie seus dados no aplicativo"
								})]
							})]
						})]
					})]
				})
			]
		})]
	});
}
export { PrivacySettings as default };

//# sourceMappingURL=Privacy-DEcqz8_0.js.map