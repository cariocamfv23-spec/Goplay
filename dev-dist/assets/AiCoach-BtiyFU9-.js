import { t as ChartNoAxesColumn } from "./chart-no-axes-column-B0LfFDko.js";
import { t as CirclePlay } from "./circle-play-C8VDZl4R.js";
import { Gt as Avatar, Ir as require_jsx_runtime, Kt as AvatarFallback, M as Badge, Pn as MessageSquare, Ur as useNavigate, Xt as Button, bn as Target, kn as Settings, qt as AvatarImage, tr as Dumbbell, un as Zap, vr as ArrowRight, xr as Activity, yr as ArrowLeft } from "./index-CfexWzlo.js";
import { n as CardContent, t as Card } from "./card-RRkXJHrf.js";
var import_jsx_runtime = require_jsx_runtime();
function AiCoach() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background p-4 animate-fade-in flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => navigate(-1),
						className: "mr-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-bold",
						children: "Goplay AI Coach"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => navigate("/ai/settings"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-5 w-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-8 animate-in slide-in-from-top-4 duration-700",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "h-20 w-20 bg-gradient-to-br from-primary/20 to-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-10 w-10 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-2 border-primary/20 animate-ping opacity-20" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold mb-2",
						children: "Olá, Atleta!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Estou pronto para analisar seu desempenho."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 flex-1 pb-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "bg-secondary/30 border-none shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4 flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-10 w-10 border border-primary/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: "https://img.usecurling.com/i?q=robot&shape=circle&color=purple" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: "AI" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-sm",
										children: "Insight Recente"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: "Hoje"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm leading-relaxed text-foreground/90",
									children: [
										"Analisei seus últimos jogos. Você melhorou",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-green-500 font-bold",
											children: "15%"
										}),
										" na velocidade, mas precisamos focar na precisão dos passes."
									]
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "h-auto py-3 flex flex-col gap-1 items-center justify-center border-dashed",
								onClick: () => navigate("/ai/reports"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumn, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold",
									children: "Relatórios"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "h-auto py-3 flex flex-col gap-1 items-center justify-center border-dashed",
								onClick: () => navigate("/goals"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold",
									children: "Metas"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "h-auto py-3 flex flex-col gap-1 items-center justify-center border-dashed",
								onClick: () => navigate("/ai/settings"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold",
									children: "Configurar"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "overflow-hidden border-primary/20 bg-gradient-to-br from-zinc-900 to-black text-white cursor-pointer group hover:shadow-lg transition-all duration-300",
						onClick: () => navigate("/ai/motion-analysis"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-24 w-24" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "mb-3 bg-gold text-black hover:bg-gold/90 border-none",
									children: "Novo Recurso"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-xl font-bold mb-2 flex items-center gap-2",
									children: ["Análise de Movimento", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4 text-gold fill-gold animate-pulse" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-zinc-400 text-sm mb-6 max-w-[80%]",
									children: "Use a câmera para corrigir sua postura e técnica em tempo real com nossa IA."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "w-full bg-white text-black hover:bg-zinc-200 font-bold group-hover:scale-[1.02] transition-transform",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "mr-2 h-5 w-5" }), " Iniciar Sessão Rápida"]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "bg-card border-border/50 hover:border-primary/50 transition-colors cursor-pointer",
						onClick: () => navigate("/ai/injury-scanner"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-6 w-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold",
									children: "Scanner Biométrico"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Identifique riscos de lesão com IA"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-5 w-5 text-muted-foreground" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "bg-card border-border/50 hover:border-primary/50 transition-colors cursor-pointer",
						onClick: () => navigate("/ai/library"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { className: "h-6 w-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold",
									children: "Biblioteca de Exercícios"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Explore +50 exercícios guiados por IA"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-5 w-5 text-muted-foreground" })]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto pt-4 border-t border-border/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "w-full h-12 rounded-full font-bold shadow-md",
					variant: "secondary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "mr-2 h-5 w-5" }), " Chat com AI Coach"]
				})
			})
		]
	});
}
export { AiCoach as default };

//# sourceMappingURL=AiCoach-BtiyFU9-.js.map