import "./circle-alert-D4B0SI1Q.js";
import "./circle-check-DW8ITpr7.js";
import { t as PaymentDialog } from "./PaymentDialog-CYPN31rD.js";
import { t as Funnel } from "./funnel-CsWj1JC8.js";
import { t as Mail } from "./mail-OCTBoC7n.js";
import { t as Phone } from "./phone-4VIf66Sc.js";
import { t as ShieldAlert } from "./shield-alert-C_kOmp2X.js";
import "./wallet-C0vZAWWb.js";
import { $n as MapPin, Ln as Star, R as Badge, Tn as Users, Tr as CircleCheckBig, Un as Search, an as Button, ci as useNavigate, di as require_react, en as Avatar, kn as Trophy, kt as mockTalents, nn as AvatarImage, ti as require_jsx_runtime, tn as AvatarFallback, tr as Lock, vn as toast } from "./index-9FdtLN8r.js";
import { n as CardContent, t as Card } from "./card-CGnIfxBc.js";
import "./label-CAfjS5OU.js";
import { t as Input } from "./input-DjLXmjYS.js";
import { a as DrawerFooter, i as DrawerDescription, o as DrawerHeader, r as DrawerContent, s as DrawerTitle, t as Drawer } from "./drawer-CWGeMa7s.js";
import "./tabs-CVV5Rqkx.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function TalentUnlockDrawer({ athlete, open, onClose }) {
	const navigate = useNavigate();
	const [isUnlocked, setIsUnlocked] = (0, import_react.useState)(false);
	if (!athlete) return null;
	const isUnderage = (athlete.age || 0) < 18;
	const handleUnlockSuccess = () => {
		setIsUnlocked(true);
		toast.success("Acesso ao perfil liberado com sucesso!");
	};
	const handleContactSupport = () => {
		toast.info("Solicitação enviada ao suporte para validação de cláusulas.");
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
		open,
		onOpenChange: (val) => !val && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerContent, {
			className: "max-h-[90vh]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerHeader, {
					className: "text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-20 w-20 border-2 border-background shadow-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: athlete.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: athlete.name[0] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, {
										className: "text-xl font-bold",
										children: athlete.name
									}), isUnlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										className: "bg-green-100 text-green-700 hover:bg-green-200 border-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "w-3 h-3 mr-1" }), " Liberado"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerDescription, {
									className: "flex flex-col gap-1 mt-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1 text-primary font-medium",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-3 h-3" }),
												" ",
												athlete.sport,
												" •",
												" ",
												athlete.position
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3 h-3" }),
												" ",
												athlete.location
											]
										}),
										athlete.age && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-muted-foreground",
											children: [
												athlete.age,
												" anos • ",
												athlete.height,
												" • ",
												athlete.weight
											]
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-secondary/30 p-4 rounded-xl space-y-3 mb-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-sm font-semibold",
									children: "Resumo do Atleta"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground leading-relaxed",
									children: athlete.bio
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-4 pt-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-center p-2 bg-background rounded-lg flex-1 border border-border/50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-lg",
												children: athlete.stats?.matches || 0
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase text-muted-foreground",
												children: "Jogos"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-center p-2 bg-background rounded-lg flex-1 border border-border/50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-lg text-green-600",
												children: athlete.rating || "-"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase text-muted-foreground",
												children: "Rating"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-center p-2 bg-background rounded-lg flex-1 border border-border/50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-lg text-gold",
												children: athlete.stats?.mvp || 0
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase text-muted-foreground",
												children: "MVPs"
											})]
										})
									]
								})
							]
						}),
						!isUnlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-4 p-5 border border-dashed border-red-200 bg-red-50 dark:bg-red-900/10 rounded-xl overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center text-center gap-3 relative z-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-5 h-5 text-red-500" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold text-red-700 dark:text-red-400",
									children: "Informações Privadas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-red-600/80 dark:text-red-300 mt-1 max-w-[280px] mx-auto",
									children: "O acesso ao contato direto, histórico médico e relatórios detalhados é restrito a recrutadores verificados."
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 flex flex-col gap-2 p-4 opacity-10 pointer-events-none blur-[2px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 bg-black w-3/4 rounded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 bg-black w-1/2 rounded" })]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 p-5 border border-green-200 bg-green-50 dark:bg-green-900/10 rounded-xl animate-fade-in",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "w-4 h-4" }), " Dados de Contato"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 p-3 bg-background rounded-lg border border-border/40",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-2 bg-secondary rounded-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-4 h-4 text-primary" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "E-mail"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm font-medium select-all",
												children: [athlete.username.replace("@", ""), "@email.com"]
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 p-3 bg-background rounded-lg border border-border/40",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-2 bg-secondary rounded-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-4 h-4 text-primary" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Telefone"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-medium select-all",
												children: "(11) 99999-9999"
											})]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									className: "w-full mt-4",
									onClick: () => navigate(`/profile/${athlete.id}`),
									children: "Ver Perfil Completo"
								})
							]
						})
					]
				}), !isUnlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerFooter, {
					className: "pt-2 pb-8",
					children: [isUnderage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-amber-800 dark:text-amber-200 text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Atenção: Atleta Menor de Idade." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Para segurança de todos, o acesso a perfis de atletas menores de 18 anos requer validação de cláusulas de responsabilidade junto ao nosso suporte."
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full h-12 text-base font-bold bg-amber-600 hover:bg-amber-700 text-white",
							onClick: handleContactSupport,
							children: "Contatar Suporte e Validar"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDialog, {
						title: `Acesso Total: ${athlete.name}`,
						price: 9.9,
						pointsPrice: 1e3,
						onSuccess: handleUnlockSuccess,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full h-12 text-base font-bold shadow-lg shadow-primary/20",
							children: "Desbloquear Acesso Completo (R$ 9,90)"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: onClose,
						children: "Cancelar"
					})]
				})]
			})
		})
	});
}
function TalentsList() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedTalent, setSelectedTalent] = (0, import_react.useState)(null);
	const [isDrawerOpen, setIsDrawerOpen] = (0, import_react.useState)(false);
	const filteredTalents = mockTalents.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.sport?.toLowerCase().includes(search.toLowerCase()) || t.position?.toLowerCase().includes(search.toLowerCase()));
	const handleTalentClick = (talent) => {
		setSelectedTalent(talent);
		setIsDrawerOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-xl font-bold flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-6 w-6 text-primary" }), " Scouts & Talentos"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-5 w-5" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Buscar por nome, esporte ou posição...",
						className: "pl-9 bg-secondary border-none rounded-xl",
						value: search,
						onChange: (e) => setSearch(e.target.value)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-gradient-to-r from-indigo-900 to-primary rounded-xl p-5 text-white shadow-lg relative overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-bold text-lg mb-1",
							children: "Área do Recrutador"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-white/80 max-w-[80%]",
							children: "Encontre as próximas estrelas do esporte. Acesse relatórios detalhados e entre em contato direto."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold mb-3",
					children: "Atletas em Destaque"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: filteredTalents.map((talent) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "overflow-hidden border-none shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.99]",
						onClick: () => handleTalentClick(talent),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-0 flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-28 relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: talent.avatar,
									alt: talent.name,
									className: "w-full h-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-2 left-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: "bg-black/60 hover:bg-black/70 backdrop-blur-sm border-none text-[10px] h-5",
										children: talent.sport
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 p-3 flex flex-col justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-start",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-bold text-sm leading-tight",
											children: talent.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1 text-xs font-bold text-gold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-current" }), talent.rating]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground mt-1",
										children: [
											talent.position,
											" • ",
											talent.age,
											" anos"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2 mt-2 text-[10px] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "bg-secondary px-1.5 py-0.5 rounded",
											children: talent.height
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "bg-secondary px-1.5 py-0.5 rounded",
											children: talent.weight
										})]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mt-3 pt-2 border-t border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[10px]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold",
												children: talent.stats?.matches
											}),
											" ",
											"Jogos"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										className: "h-7 text-xs px-3 bg-indigo-600 hover:bg-indigo-700",
										children: "Ver Detalhes"
									})]
								})]
							})]
						})
					}, talent.id))
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentUnlockDrawer, {
				athlete: selectedTalent,
				open: isDrawerOpen,
				onClose: () => setIsDrawerOpen(false)
			})
		]
	});
}
export { TalentsList as default };

//# sourceMappingURL=TalentsList-BAky2qN3.js.map