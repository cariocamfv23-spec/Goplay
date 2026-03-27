import "./chevron-down-BZASJxj-.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-pDcHKclm.js";
import { t as Plus } from "./plus-Dxbap4Wi.js";
import { Ft as mockUser, H as Badge, Jn as Orbit, N as Switch, On as Users, cn as Button, f as DialogHeader, l as DialogContent, m as DialogTrigger, p as DialogTitle, pi as require_react, pr as Globe, ri as require_jsx_runtime, rr as Lock, s as Dialog, ui as useNavigate } from "./index-Bo0UapdT.js";
import { t as Label } from "./label-hQtR99HP.js";
import { t as Input } from "./input-C9Vsx2J7.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-BjGB6l0m.js";
import { t as Textarea } from "./textarea-BPbBvMKg.js";
import { t as useNexusStore } from "./useNexusStore-D01rgUZm.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function CreateTribeDialog() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { createTribe } = useNexusStore();
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		category: "",
		description: "",
		isPrivate: false
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		createTribe({
			...formData,
			creatorId: mockUser.id,
			icon: `https://img.usecurling.com/i?q=${encodeURIComponent(formData.category || "sports")}&color=purple`,
			cover: `https://img.usecurling.com/p/800/400?q=${encodeURIComponent(formData.category || "sports")}&color=purple`
		});
		setOpen(false);
		setFormData({
			name: "",
			category: "",
			description: "",
			isPrivate: false
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "rounded-full shadow-lg gap-2 font-bold hover:-translate-y-1 transition-transform",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), " Criar Tribo"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "text-2xl font-black",
				children: "Nova Tribo"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-4 pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome da Tribo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							required: true,
							placeholder: "Ex: Guerreiros da Quadra",
							value: formData.name,
							onChange: (e) => setFormData({
								...formData,
								name: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Categoria" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							required: true,
							value: formData.category,
							onValueChange: (v) => setFormData({
								...formData,
								category: v
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione..." }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Futebol",
									children: "Futebol"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Skate",
									children: "Skate"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Bike",
									children: "Bike"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Basquete",
									children: "Basquete"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Surf",
									children: "Surf"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Tênis",
									children: "Tênis"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Corrida",
									children: "Corrida"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "E-Sports",
									children: "E-Sports"
								})
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Descrição" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							required: true,
							placeholder: "Qual o propósito da tribo?",
							value: formData.description,
							onChange: (e) => setFormData({
								...formData,
								description: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between p-3 border rounded-xl bg-secondary/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "flex items-center gap-2",
								children: [formData.isPrivate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-4 h-4 text-primary" }), "Tribo Privada"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Membros precisam de aprovação."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: formData.isPrivate,
							onCheckedChange: (c) => setFormData({
								...formData,
								isPrivate: c
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full h-12 text-lg font-bold mt-4",
						children: "Criar Espaço"
					})
				]
			})]
		})]
	});
}
var CATEGORIES = [
	"Todos",
	"Futebol",
	"Skate",
	"Bike",
	"Basquete",
	"Surf",
	"Tênis",
	"Corrida",
	"E-Sports"
];
function NexusHub() {
	const { tribes } = useNexusStore();
	const navigate = useNavigate();
	const [activeFilter, setActiveFilter] = (0, import_react.useState)("Todos");
	const filteredTribes = (0, import_react.useMemo)(() => {
		if (activeFilter === "Todos") return tribes;
		return tribes.filter((t) => t.category === activeFilter);
	}, [tribes, activeFilter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-24 relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 p-4 pt-6 space-y-6 max-w-5xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-3xl font-black tracking-tight flex items-center gap-2 text-foreground drop-shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orbit, { className: "w-8 h-8 text-primary" }), "Nexus"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground font-medium mt-1",
						children: "Descubra e conecte-se com sua tribo ideal."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateTribeDialog, {})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
					value: activeFilter,
					onValueChange: setActiveFilter,
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
							className: "w-max bg-secondary/50 p-1 rounded-xl h-auto",
							children: CATEGORIES.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: cat,
								className: "rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all",
								children: cat
							}, cat))
						})
					})
				}),
				filteredTribes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center py-20 px-4 text-center bg-card/50 backdrop-blur-xl rounded-3xl border border-border/50 shadow-sm mt-8 animate-fade-in-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orbit, { className: "w-16 h-16 text-primary/30 mb-5 animate-float" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-black text-foreground mb-2",
							children: "Nenhuma tribo encontrada"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground text-sm max-w-md leading-relaxed",
							children: [
								"Não encontramos nenhuma comunidade para a categoria",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-primary",
									children: [
										"\"",
										activeFilter,
										"\""
									]
								}),
								". Seja o primeiro a criar um espaço para este esporte!"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => setActiveFilter("Todos"),
							variant: "outline",
							className: "mt-8 rounded-full h-11 px-6 font-bold",
							children: "Limpar Filtros"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
					children: filteredTribes.map((tribe) => {
						const isMember = tribe.members.includes(mockUser.id);
						const isRequested = tribe.pendingRequests.includes(mockUser.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: () => navigate(`/nexus/${tribe.id}`),
							className: "group relative flex flex-col bg-card/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)] hover:border-primary/40 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 animate-fade-in",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "h-32 w-full relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: tribe.cover,
										alt: tribe.name,
										className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute top-3 right-3 flex flex-col gap-2 items-end",
										children: tribe.isPrivate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "secondary",
											className: "bg-black/60 text-white backdrop-blur-md border border-white/10 gap-1.5 py-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-3 h-3" }), " Privado"]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "secondary",
											className: "bg-black/60 text-white backdrop-blur-md border border-white/10 gap-1.5 py-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-3 h-3" }), " Público"]
										})
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "px-5 pb-5 pt-0 relative flex-1 flex flex-col",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute -top-10 left-5 p-1 bg-card rounded-2xl shadow-lg border border-border/50",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: tribe.icon,
											alt: `${tribe.name} icon`,
											className: "w-16 h-16 rounded-xl object-cover bg-secondary"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-10 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors font-bold px-3 py-0.5",
											children: tribe.category
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-muted-foreground flex items-center gap-1.5 font-medium",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-3.5 h-3.5" }),
												" ",
												tribe.members.length
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-black text-xl mt-3 leading-tight group-hover:text-primary transition-colors line-clamp-1",
										children: tribe.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed flex-1 font-medium",
										children: tribe.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-5",
										children: isMember ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-full py-2.5 text-center text-xs font-bold text-primary bg-primary/10 rounded-xl border border-primary/20 shadow-inner",
											children: "VOCÊ É MEMBRO"
										}) : isRequested ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-full py-2.5 text-center text-xs font-bold text-orange-500 bg-orange-500/10 rounded-xl border border-orange-500/20 shadow-inner",
											children: "SOLICITAÇÃO PENDENTE"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-full py-2.5 text-center text-xs font-bold text-muted-foreground bg-secondary/50 rounded-xl border border-border group-hover:bg-secondary group-hover:text-foreground transition-all",
											children: "VER DETALHES"
										})
									})
								]
							})]
						}, tribe.id);
					})
				})
			]
		})]
	});
}
export { NexusHub as default };

//# sourceMappingURL=NexusHub-RKdp9pem.js.map