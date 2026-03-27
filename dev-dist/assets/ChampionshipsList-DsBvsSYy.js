import { t as Plus } from "./plus-obAglaQy.js";
import { Un as Search, ci as useNavigate, di as require_react, jr as Calendar, kn as Trophy, on as Button, ti as require_jsx_runtime, z as Badge } from "./index-D3UB8102.js";
import { n as CardContent, t as Card } from "./card-Dw0YJnKU.js";
import { t as Input } from "./input-Bavt8Bj0.js";
import { t as useChampionshipStore } from "./useChampionshipStore-BawjgztG.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function ChampionshipsList() {
	const { championships } = useChampionshipStore();
	const navigate = useNavigate();
	const [search, setSearch] = (0, import_react.useState)("");
	const filtered = championships.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
	const getStatusColor = (status) => {
		switch (status) {
			case "active": return "bg-green-500 hover:bg-green-600";
			case "completed": return "bg-zinc-500 hover:bg-zinc-600";
			case "open": return "bg-blue-500 hover:bg-blue-600";
			default: return "bg-yellow-500 hover:bg-yellow-600";
		}
	};
	const getStatusLabel = (status) => {
		switch (status) {
			case "active": return "Em Andamento";
			case "completed": return "Finalizado";
			case "open": return "Inscrições";
			default: return "Rascunho";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-2xl font-bold flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-6 w-6 text-yellow-500" }), "Meus Torneios"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Gerencie suas competições"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => navigate("/organizer/create"),
					className: "rounded-full h-10 w-10 p-0 shadow-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-6 w-6" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Buscar campeonato...",
					className: "pl-9 bg-secondary border-none rounded-xl",
					value: search,
					onChange: (e) => setSearch(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-10 opacity-60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-16 w-16 mx-auto mb-4 text-muted-foreground/30" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "Nenhum campeonato encontrado."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "link",
							onClick: () => navigate("/organizer/create"),
							className: "mt-2 text-primary",
							children: "Criar o primeiro"
						})
					]
				}) : filtered.map((champ) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-none shadow-md cursor-pointer hover:scale-[1.01] transition-transform overflow-hidden",
					onClick: () => navigate(`/organizer/${champ.id}`),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 bg-gradient-to-r from-primary to-purple-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-start mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold text-lg leading-tight",
									children: champ.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: `${getStatusColor(champ.status)} text-white border-none`,
									children: getStatusLabel(champ.status)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mb-4 line-clamp-2",
								children: champ.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4 text-xs font-medium text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-3.5 w-3.5" }), champ.modality]
								}), champ.startDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5" }), new Date(champ.startDate).toLocaleDateString("pt-BR")]
								})]
							})
						]
					})]
				}, champ.id))
			})
		]
	});
}
export { ChampionshipsList as default };

//# sourceMappingURL=ChampionshipsList-DsBvsSYy.js.map