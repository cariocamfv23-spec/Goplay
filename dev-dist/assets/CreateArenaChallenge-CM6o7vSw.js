import "./chevron-down-DkhSKsF8.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-vnEJBwa_.js";
import { Hr as require_jsx_runtime, Mn as Shield, Qr as require_react, Tr as ArrowLeft, Yr as useNavigate, dn as toast, en as Button } from "./index-DzO-_6nv.js";
import { t as Input } from "./input-7n92bmYq.js";
import "./dist-Dp-kXTJt.js";
import { t as Switch } from "./switch-DsL02LBL.js";
import { t as Label } from "./label-DJWYQIjU.js";
import { t as useArenaStore } from "./useArenaStore-Bsxdli5Z.js";
import { t as Textarea } from "./textarea-XFYN1-yN.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function CreateArenaChallenge() {
	const navigate = useNavigate();
	const { addChallenge } = useArenaStore();
	const [formData, setFormData] = (0, import_react.useState)({
		modality: "Futebol",
		type: "Técnico",
		title: "",
		description: "",
		rules: "",
		criteria: "",
		startDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
		endDate: "",
		audience: "Público geral",
		videoRequired: true,
		moveDataAllowed: false
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.title || !formData.endDate) {
			toast.error("Preencha os campos obrigatórios.");
			return;
		}
		addChallenge({
			modality: formData.modality,
			type: formData.type,
			title: formData.title,
			description: formData.description,
			rules: formData.rules,
			criteria: formData.criteria,
			startDate: new Date(formData.startDate).toISOString(),
			endDate: new Date(formData.endDate).toISOString(),
			audience: formData.audience,
			videoRequired: formData.videoRequired,
			moveDataAllowed: formData.moveDataAllowed
		});
		toast.success("Desafio criado com sucesso!", { description: "Ele já está disponível na Arena." });
		navigate("/arena");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 p-4 flex items-center gap-3 shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				className: "rounded-full",
				onClick: () => navigate(-1),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 font-bold text-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-5 h-5 text-gold" }), "Criar Desafio"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "p-4 space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Modalidade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: formData.modality,
								onValueChange: (val) => setFormData((p) => ({
									...p,
									modality: val
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Futebol",
										children: "Futebol"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Basquete",
										children: "Basquete"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Corrida",
										children: "Corrida"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Crossfit",
										children: "Crossfit"
									})
								] })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tipo de Desafio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: formData.type,
								onValueChange: (val) => setFormData((p) => ({
									...p,
									type: val
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Técnico",
										children: "Técnico"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Velocidade",
										children: "Velocidade"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Precisão",
										children: "Precisão"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Resistência",
										children: "Resistência"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Criativo",
										children: "Criativo"
									})
								] })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Título do Desafio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Ex: Rei da Embaixadinha",
							value: formData.title,
							onChange: (e) => setFormData((p) => ({
								...p,
								title: e.target.value
							}))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Descrição" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							placeholder: "Explique o desafio...",
							className: "resize-none",
							value: formData.description,
							onChange: (e) => setFormData((p) => ({
								...p,
								description: e.target.value
							}))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Regras Detalhadas" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							placeholder: "O que é permitido e proibido?",
							className: "resize-none",
							value: formData.rules,
							onChange: (e) => setFormData((p) => ({
								...p,
								rules: e.target.value
							}))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Critério de Pontuação" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							placeholder: "Ex: IA analisa 50% precisão, comunidade 50% estilo...",
							className: "resize-none",
							value: formData.criteria,
							onChange: (e) => setFormData((p) => ({
								...p,
								criteria: e.target.value
							}))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Data Início" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: formData.startDate,
								onChange: (e) => setFormData((p) => ({
									...p,
									startDate: e.target.value
								}))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Data Fim" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: formData.endDate,
								onChange: (e) => setFormData((p) => ({
									...p,
									endDate: e.target.value
								}))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Público" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: formData.audience,
							onValueChange: (val) => setFormData((p) => ({
								...p,
								audience: val
							})),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Público geral",
									children: "Público geral"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Somente seguidores",
									children: "Somente seguidores"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Privado",
									children: "Privado por convite"
								})
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-secondary/40 p-4 rounded-xl border border-border/50 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Vídeo Obrigatório" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "Para análise visual da IA."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: formData.videoRequired,
								onCheckedChange: (c) => setFormData((p) => ({
									...p,
									videoRequired: c
								}))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Permitir Dados MOVE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "Integrar stats de smartwatches."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: formData.moveDataAllowed,
								onCheckedChange: (c) => setFormData((p) => ({
									...p,
									moveDataAllowed: c
								}))
							})]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "w-full h-12 bg-gold hover:bg-gold/90 text-black font-bold text-base",
				children: "Publicar Desafio"
			})]
		})]
	});
}
export { CreateArenaChallenge as default };

//# sourceMappingURL=CreateArenaChallenge-CM6o7vSw.js.map