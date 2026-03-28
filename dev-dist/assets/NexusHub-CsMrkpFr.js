import "./chevron-down-BW-6JMSc.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BBzRC1da.js";
import { t as Plus } from "./plus-DWbsqiki.js";
import { Kn as Orbit, Mt as mockUser, R as Badge, Tn as Users, Zn as Medal, an as Button, bn as cn, c as DialogTrigger, di as require_react, dr as Globe, jr as Calendar, k as Switch, kn as Trophy, li as require_jsx_runtime, mr as Flame, o as DialogHeader, r as DialogContent, s as DialogTitle, si as useNavigate, t as Dialog, tr as Lock } from "./index-DafWH_vn.js";
import { t as Label } from "./label-cfq2X87F.js";
import { t as Input } from "./input-DMYbEcGp.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DwGhpVIt.js";
import { t as Textarea } from "./textarea-BUyxI0qY.js";
import { t as useNexusStore } from "./useNexusStore-C_OiPsdi.js";
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
function TribeCard({ tribe }) {
	const navigate = useNavigate();
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
	});
}
function NexusRankingTab() {
	const { tribes } = useNexusStore();
	const navigate = useNavigate();
	const [metric, setMetric] = (0, import_react.useState)("active");
	const rankedTribes = (0, import_react.useMemo)(() => {
		return tribes.map((t) => {
			const mockEvents = (t.events?.length || 0) + t.name.length % 5;
			const engagement = t.members.length * 15 + mockEvents * 20 + t.id.charCodeAt(t.id.length - 1) % 10 * 5;
			return {
				...t,
				mockEvents,
				engagement
			};
		}).sort((a, b) => metric === "events" ? b.mockEvents - a.mockEvents : b.engagement - a.engagement);
	}, [tribes, metric]);
	if (rankedTribes.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-20 px-4 text-center bg-card/50 backdrop-blur-xl rounded-3xl border border-border/50 shadow-sm mt-8 animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-16 h-16 text-primary/30 mb-5 animate-float" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-xl font-black text-foreground mb-2",
				children: "Nenhuma tribo ranqueada"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-sm max-w-md leading-relaxed",
				children: "Nenhum evento agendado ainda. Seja o primeiro a liderar sua tribo para o topo do ranking!"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "animate-fade-in space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex bg-secondary/50 p-1.5 rounded-2xl w-full max-w-xs mx-auto shadow-inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setMetric("active"),
				className: cn("flex-1 py-2.5 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2", metric === "active" ? "bg-background shadow-md text-primary" : "text-muted-foreground hover:text-foreground"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: cn("w-4 h-4", metric === "active" && "text-orange-500") }), "Mais Ativas"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setMetric("events"),
				className: cn("flex-1 py-2.5 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2", metric === "events" ? "bg-background shadow-md text-primary" : "text-muted-foreground hover:text-foreground"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: cn("w-4 h-4", metric === "events" && "text-blue-500") }), "Mais Eventos"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-4",
			children: rankedTribes.map((tribe, index) => {
				const rank = index + 1;
				const metricValue = metric === "active" ? tribe.engagement : tribe.mockEvents;
				const metricLabel = metric === "active" ? "Engajamento" : "Eventos";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: () => navigate(`/nexus/${tribe.id}`),
					className: cn("relative flex items-center p-4 rounded-3xl border backdrop-blur-xl shadow-sm cursor-pointer transition-all hover:-translate-y-1", rank === 1 && "bg-yellow-500/10 border-yellow-500/50 shadow-[0_4px_20px_rgba(234,179,8,0.15)]", rank === 2 && "bg-slate-300/10 border-slate-300/50", rank === 3 && "bg-amber-700/10 border-amber-700/50", rank > 3 && "bg-card/60 border-border/50 hover:border-primary/40"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-12 sm:w-16 flex justify-center flex-shrink-0",
							children: rank === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "text-yellow-500 w-8 h-8 drop-shadow-md animate-pulse" }) : rank === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Medal, { className: "text-slate-400 w-7 h-7 drop-shadow-sm" }) : rank === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Medal, { className: "text-amber-700 w-7 h-7 drop-shadow-sm" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-black text-xl text-muted-foreground",
								children: ["#", rank]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: tribe.icon,
							alt: tribe.name,
							className: cn("w-14 h-14 rounded-xl object-cover bg-secondary", rank === 1 && "ring-2 ring-yellow-500 ring-offset-2 ring-offset-background")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 ml-4 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-base sm:text-lg leading-tight truncate",
								children: tribe.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: cn("mt-1.5 text-[10px] px-2 py-0", rank === 1 && "border-yellow-500/30 text-yellow-600 dark:text-yellow-400"),
								children: tribe.category
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right ml-4 flex-shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("font-black text-xl sm:text-2xl tabular-nums", rank === 1 ? "text-yellow-600 dark:text-yellow-400" : "text-primary"),
								children: metricValue
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-bold mt-0.5",
								children: metricLabel
							})]
						})
					]
				}, tribe.id);
			})
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
	const [activeFilter, setActiveFilter] = (0, import_react.useState)("Todos");
	const [mainTab, setMainTab] = (0, import_react.useState)("explore");
	const exploreTribes = (0, import_react.useMemo)(() => {
		if (activeFilter === "Todos") return tribes;
		return tribes.filter((t) => t.category === activeFilter);
	}, [tribes, activeFilter]);
	const myTribes = (0, import_react.useMemo)(() => {
		return tribes.filter((t) => t.members.includes(mockUser.id));
	}, [tribes]);
	const renderEmptyState = (message) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-20 px-4 text-center bg-card/50 backdrop-blur-xl rounded-3xl border border-border/50 shadow-sm mt-8 animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orbit, { className: "w-16 h-16 text-primary/30 mb-5 animate-float" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-xl font-black text-foreground mb-2",
				children: "Nenhuma tribo encontrada"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-sm max-w-md leading-relaxed",
				children: message
			}),
			mainTab === "explore" && activeFilter !== "Todos" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => setActiveFilter("Todos"),
				variant: "outline",
				className: "mt-8 rounded-full h-11 px-6 font-bold",
				children: "Limpar Filtros"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-24 relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 p-4 pt-6 space-y-6 max-w-5xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-3xl font-black tracking-tight flex items-center gap-2 text-foreground drop-shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orbit, { className: "w-8 h-8 text-primary" }), "Nexus"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground font-medium mt-1",
					children: "Descubra, conecte-se e compita com sua tribo ideal."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateTribeDialog, {})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				value: mainTab,
				onValueChange: setMainTab,
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "w-full h-auto bg-secondary/50 rounded-2xl p-1.5 flex mb-6 shadow-inner",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "explore",
								className: "flex-1 rounded-xl font-bold py-2.5 data-[state=active]:shadow-md",
								children: "Explorar"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "my-tribes",
								className: "flex-1 rounded-xl font-bold py-2.5 data-[state=active]:shadow-md",
								children: "Minhas Tribos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "ranking",
								className: "flex-1 rounded-xl font-bold py-2.5 data-[state=active]:shadow-md data-[state=active]:text-yellow-600 dark:data-[state=active]:text-yellow-500",
								children: "Ranking"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "explore",
						className: "space-y-6 m-0 outline-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-max flex bg-secondary/30 p-1 rounded-xl h-auto border border-border/50",
								children: CATEGORIES.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setActiveFilter(cat),
									className: `rounded-lg px-4 py-2 text-sm font-medium transition-all ${activeFilter === cat ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
									children: cat
								}, cat))
							})
						}), exploreTribes.length === 0 ? renderEmptyState(`Não encontramos nenhuma comunidade para a categoria "${activeFilter}". Seja o primeiro a criar um espaço para este esporte!`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in",
							children: exploreTribes.map((tribe) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TribeCard, { tribe }, tribe.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "my-tribes",
						className: "m-0 outline-none",
						children: myTribes.length === 0 ? renderEmptyState("Você ainda não faz parte de nenhuma tribo. Explore as opções e junte-se a uma comunidade!") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in",
							children: myTribes.map((tribe) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TribeCard, { tribe }, tribe.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "ranking",
						className: "m-0 outline-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NexusRankingTab, {})
					})
				]
			})]
		})]
	});
}
export { NexusHub as default };

//# sourceMappingURL=NexusHub-CsMrkpFr.js.map