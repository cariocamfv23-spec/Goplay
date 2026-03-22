import "./chevron-down-CPS0QcCi.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BDUT0K4E.js";
import { t as Save } from "./save-Ma72qahX.js";
import { t as Volume2 } from "./volume-2-D87wIueK.js";
import { A as Switch, Er as ArrowLeft, Or as Activity, Ur as require_jsx_runtime, Xr as useNavigate, _n as Zap, mn as toast, nn as Button } from "./index-gMWuR-H4.js";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-Do2Y5ADa.js";
import { t as Label } from "./label-DoDzzct1.js";
import { t as Separator } from "./separator-CRg4Rpwh.js";
import { t as useAiCoachStore } from "./useAiCoachStore-CxsFcIYd.js";
var import_jsx_runtime = require_jsx_runtime();
function AiCoachSettings() {
	const navigate = useNavigate();
	const { preferences, setPreference } = useAiCoachStore();
	const handleSave = () => {
		toast.success("Configurações salvas", { description: "Suas preferências do AI Coach foram atualizadas." });
		navigate(-1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 bg-background/80 backdrop-blur-md z-20 p-4 border-b border-border/50 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => navigate(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold",
					children: "Configurações AI Coach"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				onClick: handleSave,
				className: "gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), "Salvar"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-6 max-w-2xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4" }), "Feedback e Análise"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						className: "pb-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-base font-medium",
							children: "Estilo de Feedback"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tipo de Feedback" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: preferences.feedbackType,
										onValueChange: (v) => setPreference("feedbackType", v),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione o tipo" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "verbal",
												children: "Apenas Verbal (Áudio)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "visual",
												children: "Apenas Visual (Tela)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "all",
												children: "Completo (Áudio + Visual)"
											})
										] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Como você prefere receber as instruções durante o treino."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Detalhamento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: preferences.feedbackDetail,
									onValueChange: (v) => setPreference("feedbackDetail", v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione o detalhamento" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "summary",
										children: "Resumido (Foco no essencial)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "detailed",
										children: "Detalhado (Análise técnica completa)"
									})] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Frequência" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: preferences.feedbackFrequency,
									onValueChange: (v) => setPreference("feedbackFrequency", v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione a frequência" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "realtime",
											children: "Tempo Real (Durante a execução)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "end_of_set",
											children: "Ao final da série"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "end_of_session",
											children: "Ao final do treino"
										})
									] })]
								})]
							})
						]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4" }), "Integrações"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "pt-6 space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-base",
											children: "Coach na Arena Mode"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground max-w-[250px]",
										children: "Receba dicas táticas e motivacionais do AI Coach durante as sessões de AR."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: preferences.enabledInArena,
									onCheckedChange: (c) => setPreference("enabledInArena", c)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-4 w-4 text-blue-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-base",
											children: "Comandos de Voz"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground max-w-[250px]",
										children: "Permitir que o AI Coach utilize síntese de voz para instruções."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: preferences.voiceEnabled,
									onCheckedChange: (c) => setPreference("voiceEnabled", c)
								})]
							})
						]
					}) })]
				})
			]
		})]
	});
}
export { AiCoachSettings as default };

//# sourceMappingURL=AiCoachSettings-0F1zg8Rx.js.map