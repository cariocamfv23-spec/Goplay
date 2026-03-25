import { t as CircleCheck } from "./circle-check-CYZ1Q7J6.js";
import { t as Funnel } from "./funnel-Bjue409q.js";
import { t as Megaphone } from "./megaphone-UqOKJ41W.js";
import { t as Store } from "./store-QvVU5g2S.js";
import { At as mockTalents, Hn as Search, On as Trophy, Pr as createLucideIcon, Rt as persist, V as Badge, Yr as require_jsx_runtime, ai as require_react, an as Button, bn as cn, en as Avatar, er as Info, f as DialogHeader, fr as Eye, jr as ArrowLeft, kn as TrendingUp, l as DialogContent, m as DialogTrigger, ni as useNavigate, nn as AvatarImage, nr as Heart, p as DialogTitle, rr as Handshake, s as Dialog, tn as AvatarFallback, u as DialogDescription, vn as toast, xr as Check, z as useNotificationStore_default, zt as create } from "./index-D54wtiKj.js";
import { n as CardContent, t as Card } from "./card-BIPm8KZn.js";
import { t as Input } from "./input-1FYDUuaH.js";
var Shirt = createLucideIcon("shirt", [["path", {
	d: "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z",
	key: "1wgbhj"
}]]);
var Tag = createLucideIcon("tag", [["path", {
	d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
	key: "vktsd0"
}], ["circle", {
	cx: "7.5",
	cy: "7.5",
	r: ".5",
	fill: "currentColor",
	key: "kqv944"
}]]);
var import_react = require_react();
const useSponsorshipStore = create()(persist((set, get) => ({
	selectedCriteria: [],
	matches: [],
	toggleCriteria: (criteria) => set((state) => {
		return { selectedCriteria: state.selectedCriteria.includes(criteria) ? state.selectedCriteria.filter((c) => c !== criteria) : [...state.selectedCriteria, criteria] };
	}),
	requestMatch: (profileId) => {
		const { selectedCriteria } = get();
		set((state) => ({ matches: [...state.matches, {
			profileId,
			status: "pending",
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			criteria: selectedCriteria
		}] }));
		useNotificationStore_default.getState().addNotification({
			title: "Solicitação Enviada",
			message: "Sua proposta de patrocínio foi enviada com sucesso.",
			type: "sponsorship_match",
			priority: "medium"
		});
	},
	isMatched: (profileId) => {
		return get().matches.some((m) => m.profileId === profileId);
	}
}), { name: "goplay-sponsorship-storage" }));
var import_jsx_runtime = require_jsx_runtime();
function CriteriaSelector() {
	const { selectedCriteria, toggleCriteria } = useSponsorshipStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-3",
		children: [
			{
				id: "brand",
				label: "Uso de Marca",
				icon: Tag,
				color: "text-blue-500 bg-blue-500/10 border-blue-200"
			},
			{
				id: "posts",
				label: "Postagens",
				icon: Megaphone,
				color: "text-purple-500 bg-purple-500/10 border-purple-200"
			},
			{
				id: "uniform",
				label: "Uniforme",
				icon: Shirt,
				color: "text-orange-500 bg-orange-500/10 border-orange-200"
			},
			{
				id: "promo",
				label: "Ações Promo",
				icon: Store,
				color: "text-green-500 bg-green-500/10 border-green-200"
			}
		].map((option) => {
			const isSelected = selectedCriteria.includes(option.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => toggleCriteria(option.id),
				className: cn("relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 text-left group", isSelected ? "bg-secondary/80 border-primary/50 shadow-sm" : "bg-background/50 border-border/50 hover:bg-secondary/40"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("p-2 rounded-lg transition-transform group-hover:scale-110", option.color, isSelected && "ring-1 ring-inset ring-current"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(option.icon, { className: "w-4 h-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("text-xs font-semibold", isSelected ? "text-foreground" : "text-muted-foreground"),
						children: option.label
					}),
					isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-2 right-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-4 h-4 bg-primary rounded-full flex items-center justify-center animate-in zoom-in",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-2.5 h-2.5 text-primary-foreground" })
						})
					})
				]
			}, option.id);
		})
	});
}
function ProfileMatchCard({ profile }) {
	const { requestMatch, isMatched, selectedCriteria } = useSponsorshipStore();
	const matched = isMatched(profile.id);
	const handleMatch = () => {
		if (selectedCriteria.length === 0) {
			toast.error("Selecione ao menos um critério de contrapartida.");
			return;
		}
		requestMatch(profile.id);
		toast.success(`Solicitação enviada para ${profile.name}!`);
	};
	const formatNumber = (num) => {
		if (!num) return "0";
		return num >= 1e3 ? `${(num / 1e3).toFixed(1)}k` : num.toString();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "overflow-hidden border-border/50 hover:border-primary/20 transition-all bg-card/50 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-24 p-3 flex flex-col items-center justify-center border-r border-border/30 bg-secondary/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
							className: "h-16 w-16 border-2 border-primary/20 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: profile.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: profile.name[0] })]
						}), profile.ranking && profile.ranking <= 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute -top-2 -right-2 bg-yellow-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm flex items-center gap-0.5 border border-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-2.5 h-2.5" }),
								" #",
								profile.ranking
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: "text-[9px] h-4 px-1.5 border-primary/30 text-primary uppercase",
						children: profile.type === "team" ? "Time" : "Atleta"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 p-3 flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-between items-start mb-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-sm leading-tight line-clamp-1",
								children: profile.name
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground line-clamp-1 mb-3",
							children: [
								profile.sport,
								" • ",
								profile.location
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-2 bg-background/50 rounded-lg p-2 border border-border/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] text-muted-foreground flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-3 h-3 text-gold" }), " Rank"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-xs",
										children: profile.ranking ? `#${profile.ranking}` : "-"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center border-l border-border/30",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] text-muted-foreground flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3 h-3 text-blue-500" }), " Views"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-xs",
										children: formatNumber(profile.totalViews)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center border-l border-border/30",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] text-muted-foreground flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-3 h-3 text-red-500" }), " Likes"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-xs",
										children: formatNumber(profile.totalLikes)
									})]
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: matched ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							className: "w-full h-8 text-xs font-semibold bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20",
							disabled: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5 mr-1.5" }), "Solicitação Enviada"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							className: cn("w-full h-8 text-xs font-semibold shadow-sm transition-all active:scale-95", "bg-gradient-to-r from-primary to-primary/80 hover:to-primary"),
							onClick: handleMatch,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handshake, { className: "w-3.5 h-3.5 mr-1.5" }), "Conectar Agora"]
						})
					})]
				})]
			})
		})
	});
}
function SponsorshipMatch() {
	const navigate = useNavigate();
	const [search, setSearch] = (0, import_react.useState)("");
	const eliteProfiles = mockTalents.filter((p) => {
		const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sport?.toLowerCase().includes(search.toLowerCase());
		const isElite = p.ranking && p.ranking <= 100 || p.totalViews && p.totalViews > 1e3;
		return matchesSearch && isElite;
	}).sort((a, b) => {
		if (a.ranking && b.ranking) return a.ranking - b.ranking;
		if (a.ranking) return -1;
		if (b.ranking) return 1;
		return (b.totalViews || 0) - (a.totalViews || 0);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-24 animate-fade-in flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 pt-4 pb-4 px-4 shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => navigate(-1),
						className: "-ml-2 hover:bg-secondary/50 rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-1.5 bg-primary/10 rounded-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handshake, { className: "h-4 w-4 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-lg",
							children: "Sponsorship Match"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-5 w-5" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Como funciona?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
						className: "space-y-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"O ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Sponsorship Match" }),
							" conecta sua marca aos atletas e times de maior destaque na plataforma."
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "list-disc list-inside text-sm space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Defina o que você espera em troca (Contrapartidas)." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Navegue pelos perfis de elite (Rankeados)." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Envie propostas de conexão direta." })
							]
						})]
					})] }) })] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Buscar atleta, time ou esporte...",
					className: "pl-9 bg-secondary border-none rounded-xl h-11",
					value: search,
					onChange: (e) => setSearch(e.target.value)
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "w-3.5 h-3.5" }), " Contrapartidas Desejadas"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground -mt-2 mb-2",
							children: "Selecione o que sua marca busca nestas parcerias."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CriteriaSelector, {})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-3.5 h-3.5" }), " Perfis em Alta"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full",
							children: "Top Ranking & Engajamento"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: eliteProfiles.length > 0 ? eliteProfiles.map((profile) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileMatchCard, { profile }, profile.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center py-10 bg-secondary/20 rounded-xl border border-dashed border-border/50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-sm",
								children: "Nenhum perfil encontrado com estes filtros."
							})
						})
					})]
				})]
			})
		})]
	});
}
export { SponsorshipMatch as default };

//# sourceMappingURL=SponsorshipMatch-C88olGzG.js.map