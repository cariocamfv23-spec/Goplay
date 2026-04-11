import { t as CircleAlert } from "./circle-alert-CjLTlaAp.js";
import { Br as createLucideIcon, R as Badge, an as Button, bn as cn, ti as require_jsx_runtime, vn as toast, xn as Zap } from "./index-Bsg1ViuR.js";
import { n as CardContent, t as Card } from "./card-BPDLImt4.js";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-ssrgA6c_.js";
var CalendarPlus = createLucideIcon("calendar-plus", [
	["path", {
		d: "M16 19h6",
		key: "xwg31i"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["path", {
		d: "M19 16v6",
		key: "tddt3s"
	}],
	["path", {
		d: "M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5",
		key: "1glfrc"
	}],
	["path", {
		d: "M3 10h18",
		key: "8toen8"
	}],
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}]
]);
var import_jsx_runtime = require_jsx_runtime();
function TrainingSuggestions({ suggestions }) {
	const handleAddToCalendar = (title) => {
		toast.success("Treino Agendado!", {
			description: `${title} foi adicionado ao seu calendário para amanhã.`,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarPlus, { className: "h-4 w-4 text-primary" })
		});
	};
	if (!suggestions || suggestions.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "border-dashed border-2 bg-zinc-900/30 border-zinc-800",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex flex-col items-center justify-center py-8 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-8 w-8 text-zinc-600 mb-2 opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-zinc-500 text-sm",
				children: [
					"Nenhuma sugestão disponível no momento.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Continue jogando para gerar dados!"
				]
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "font-bold text-lg flex items-center gap-2 text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5 text-primary" }), "Sugestões do AI Coach"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "outline",
				className: "border-primary/30 text-primary",
				children: "Personalizado"
			})]
		}), suggestions.map((suggestion) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "overflow-hidden border-none shadow-md bg-zinc-900",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-l-4 border-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
					type: "single",
					collapsible: true,
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: suggestion.id,
						className: "border-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "px-4 py-3 hover:no-underline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-start text-left gap-1 w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 w-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-base text-zinc-100",
										children: suggestion.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: cn("ml-auto text-[10px]", suggestion.difficulty === "Avançado" ? "bg-red-900/30 text-red-400" : suggestion.difficulty === "Intermediário" ? "bg-yellow-900/30 text-yellow-400" : "bg-green-900/30 text-green-400"),
										children: suggestion.difficulty
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-xs text-zinc-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: suggestion.reason })]
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionContent, {
							className: "px-4 pb-4 pt-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-zinc-300 mb-3",
									children: suggestion.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 bg-zinc-950/50 rounded-lg p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2",
										children: "Exercícios Recomendados"
									}), suggestion.exercises.map((exercise, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-sm border-b border-zinc-800 last:border-0 pb-2 last:pb-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-medium flex items-center gap-2 text-zinc-200",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-1.5 rounded-full bg-primary" }), exercise.name]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-zinc-500 text-xs whitespace-nowrap",
											children: [
												exercise.sets,
												" x ",
												exercise.reps
											]
										})]
									}, idx))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2 mt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										className: "h-8 text-xs rounded-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white",
										children: "Ver Detalhes"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										onClick: () => handleAddToCalendar(suggestion.title),
										className: "h-8 text-xs rounded-full bg-white text-black hover:bg-zinc-200",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarPlus, { className: "h-3 w-3 mr-1" }), " Agendar"]
									})]
								})
							]
						})]
					})
				})
			})
		}, suggestion.id))]
	});
}
export { TrainingSuggestions as t };

//# sourceMappingURL=TrainingSuggestions-OnU52jAw.js.map