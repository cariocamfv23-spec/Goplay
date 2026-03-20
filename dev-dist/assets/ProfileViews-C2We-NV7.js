import "./circle-alert-DjWFM7-C.js";
import "./circle-check-BpAXS-EY.js";
import { t as PaymentDialog } from "./PaymentDialog-VUNS2Vbd.js";
import "./wallet-DDm5qsG5.js";
import { Bn as Lock, Jt as AvatarImage, Kt as Avatar, Lr as require_jsx_runtime, Wr as useNavigate, Zt as Button, br as ArrowLeft, hn as User, n as AppIcon, pt as mockProfileViewers, qr as require_react, qt as AvatarFallback, rr as Crown, tr as Eye, un as cn } from "./index-Dl1oMQSI.js";
import { n as CardContent, t as Card } from "./card-XS6eZ92F.js";
import "./label-DJzVoqqp.js";
import "./input-CaUQv6IX.js";
import "./tabs-D4-IMj5F.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function ProfileViews() {
	const navigate = useNavigate();
	const [isUnlocked, setIsUnlocked] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 z-40 w-full h-16 bg-background/80 backdrop-blur-xl border-b border-border/40 flex items-center gap-3 px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: () => navigate(-1),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppIcon, { className: "w-6 h-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-bold text-lg",
					children: "Goplay Views"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 rounded-2xl p-6 text-center relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -top-4 -right-4 p-3 opacity-10 rotate-12",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-32 h-32 text-primary" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-4xl font-bold text-primary mb-1",
						children: 142
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground font-medium",
						children: "Visualizações do perfil"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 inline-flex items-center gap-2 bg-background/50 px-3 py-1 rounded-full text-xs font-medium border border-border/50 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-green-500 font-bold",
								children: ["+", 28]
							}),
							" ",
							"novas esta semana"
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "font-bold text-lg mb-4 flex items-center gap-2",
				children: ["Últimos Visitantes", !isUnlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4 text-muted-foreground" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 relative",
				children: [mockProfileViewers.map((viewer, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: cn("border-none shadow-sm transition-all", !isUnlocked && index > 0 && "blur-sm opacity-60 select-none pointer-events-none"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-4 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
							className: "h-12 w-12 border-2 border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: isUnlocked || index === 0 ? viewer.avatar : void 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-6 w-6 text-muted-foreground" }) })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold truncate",
									children: isUnlocked || index === 0 ? viewer.name : "Visitante Anônimo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground whitespace-nowrap",
									children: viewer.date
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mt-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: isUnlocked || index === 0 ? viewer.type : "Perfil Oculto"
								}), (isUnlocked || index === 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-green-500" })]
							})]
						})]
					})
				}, viewer.id)), !isUnlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-0 top-20 bg-gradient-to-b from-transparent via-background/90 to-background flex flex-col items-center justify-end pb-8 pt-20 px-4 text-center z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-16 h-16 bg-gradient-to-br from-gold to-yellow-600 rounded-full flex items-center justify-center mb-4 shadow-lg animate-pulse ring-4 ring-gold/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "w-8 h-8 text-white fill-white" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppIcon, { className: "w-5 h-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-primary tracking-tight",
								children: "Goplay App Premium"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-bold mb-3 text-foreground",
							children: "Saiba quem visitou você"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-sm mb-6 max-w-[280px] leading-relaxed",
							children: "Desbloqueie a lista completa e veja scouts, recrutadores e atletas que estão de olho no seu perfil."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDialog, {
							title: "Desbloquear Visualizações",
							price: 9.9,
							pointsPrice: 500,
							onSuccess: () => setIsUnlocked(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								className: "w-full bg-gradient-to-r from-primary to-primary/90 hover:to-primary text-white font-bold h-12 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95",
								children: "Desbloquear por R$ 9,90"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground mt-4 font-medium",
							children: ["Ou use seus ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gold",
								children: "Goplay Points"
							})]
						})
					]
				})]
			})] })]
		})]
	});
}
export { ProfileViews as default };

//# sourceMappingURL=ProfileViews-C2We-NV7.js.map