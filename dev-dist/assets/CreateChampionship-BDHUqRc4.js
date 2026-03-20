import { Ir as require_jsx_runtime, Kr as require_react, Ur as useNavigate, Xt as Button, gn as Trophy, yr as ArrowLeft } from "./index-DhDTaPkQ.js";
import { n as CardContent, t as Card } from "./card-D47wiQXo.js";
import { t as Input } from "./input-OmURiLjw.js";
import { t as Textarea } from "./textarea-BlXOn60L.js";
import { t as useChampionshipStore } from "./useChampionshipStore-BmP84C_g.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function CreateChampionship() {
	const navigate = useNavigate();
	const { addChampionship } = useChampionshipStore();
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		modality: "",
		description: "",
		location: ""
	});
	const handleSubmit = () => {
		if (!formData.name || !formData.modality) return;
		addChampionship(formData);
		navigate("/organizer");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background p-4 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: () => navigate(-1),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-bold",
				children: "Criar Campeonato"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "border-none shadow-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-20 w-20 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-10 w-10" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Nome do Evento"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Ex: Copa de Verão 2025",
							value: formData.name,
							onChange: (e) => setFormData({
								...formData,
								name: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Modalidade Esportiva"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Ex: Futebol, Vôlei, Basquete...",
							value: formData.modality,
							onChange: (e) => setFormData({
								...formData,
								modality: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Local Principal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Ex: Centro Esportivo Municipal",
							value: formData.location,
							onChange: (e) => setFormData({
								...formData,
								location: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Descrição"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							placeholder: "Descreva brevemente o campeonato...",
							rows: 4,
							value: formData.description,
							onChange: (e) => setFormData({
								...formData,
								description: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full mt-4 bg-primary font-bold text-lg h-12",
						onClick: handleSubmit,
						disabled: !formData.name || !formData.modality,
						children: "Criar Campeonato"
					})
				]
			})
		})]
	});
}
export { CreateChampionship as default };

//# sourceMappingURL=CreateChampionship-BDHUqRc4.js.map