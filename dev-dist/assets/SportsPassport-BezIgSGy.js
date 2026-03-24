import { t as Award } from "./award-D2v8q7-7.js";
import { t as CircleCheck } from "./circle-check-_c0_mVFh.js";
import { t as Download } from "./download-BzQEQFbf.js";
import { t as EllipsisVertical } from "./ellipsis-vertical-CQ1MyE4T.js";
import "./ellipsis-ClUDQuXS.js";
import { t as ShareDialog } from "./ShareDialog-VgChEQC8.js";
import { t as FileText } from "./file-text-BzOvWX04.js";
import "./mail-BMbI2_fu.js";
import "./message-circle-DBEB455Z.js";
import { t as Play } from "./play-BBsR2Nvs.js";
import { t as Plus } from "./plus-BPXcf27k.js";
import { t as QrCode } from "./qr-code-BXEJF0l2.js";
import { t as Share2 } from "./share-2-lzMVD6bh.js";
import { t as Trash2 } from "./trash-2-C9jWCWBm.js";
import { t as Video } from "./video-C0lF8NDt.js";
import { t as Wallet } from "./wallet-D6CIXZ9A.js";
import { $t as Logo, Bn as ShieldCheck, Bt as DropdownMenu, H as ScrollArea, Hn as Search, Ht as DropdownMenuContent, Mn as Target, Nr as Activity, O as usePassportStore, On as Trophy, Tr as Calendar, Ut as DropdownMenuItem, V as Badge, Wt as DropdownMenuTrigger, Yn as MapPin, Yr as require_jsx_runtime, _r as Clock, ai as require_react, an as Button, bn as cn, en as Avatar, et as mockCurrentUser, f as DialogHeader, fr as Eye, jr as ArrowLeft, kn as TrendingUp, l as DialogContent, ni as useNavigate, nn as AvatarImage, nt as mockEvents, or as Globe, p as DialogTitle, s as Dialog, tn as AvatarFallback, u as DialogDescription, vn as toast, vr as Circle, xn as Zap, yr as CircleCheckBig, yt as mockPassport } from "./index-BldMY5cb.js";
import { n as CardContent, t as Card } from "./card-BACP1VSv.js";
import { t as Input } from "./input-DZHIwS1f.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-C98klJiD.js";
var import_jsx_runtime = require_jsx_runtime();
function PassportCard() {
	const user = mockCurrentUser;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-sm aspect-[1.58/1] relative perspective-1000 group cursor-pointer mx-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full h-full transition-transform duration-700 transform-style-3d hover:rotate-y-180",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 bg-gradient-to-br from-indigo-900 to-black rounded-2xl shadow-2xl p-6 text-white overflow-hidden border border-white/10 backface-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-cover" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 h-full flex flex-col justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
								variant: "full",
								className: "text-white brightness-200"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-8 w-8 text-white/50" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4 items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-20 w-20 border-2 border-white/30 rounded-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: user.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: user.name[0] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-white/60 uppercase tracking-widest",
										children: user.type === "athlete" ? "Atleta" : user.role
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-lg font-bold",
										children: user.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-gold flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3" }), " Verificado"]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-white/50",
								children: "ID Goplay"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono",
								children: mockPassport.idNumber
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-white/50",
									children: "Validade"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: mockPassport.expiry })]
							})]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center justify-center backface-hidden rotate-y-180 border border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "h-32 w-32 text-black mb-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-center text-muted-foreground",
						children: "Escaneie para validar o perfil do atleta em competições oficiais."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 text-xs font-mono text-zinc-400",
						children: mockPassport.idNumber
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-center text-xs text-muted-foreground mt-4 animate-pulse",
			children: "Toque para virar"
		})]
	});
}
function CompetitionHistory() {
	const { competitions, removeCompetition } = usePassportStore();
	const handleDelete = (id) => {
		removeCompetition(id);
		toast.success("Competição removida do histórico.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between items-center px-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-bold text-lg",
				children: "Histórico de Competições"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "outline",
				className: "h-8 gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Adicionar"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: competitions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-xl",
				children: "Nenhuma competição registrada."
			}) : competitions.map((comp) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "overflow-hidden border-none shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-stretch",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 bg-primary flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-start mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-bold text-sm",
										children: comp.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: comp.organizer
									})] }), comp.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "secondary",
										className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] h-5 px-1.5 gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }), " Verificado"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-xs text-muted-foreground mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }),
											" ",
											comp.date
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
											" ",
											comp.location
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mt-2 pt-2 border-t border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: "text-[10px]",
											children: comp.role
										}), comp.result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-bold text-primary flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-3 w-3 text-gold" }),
												" ",
												comp.result
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "h-6 w-6 rounded-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "h-3 w-3" })
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
										align: "end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											className: "text-red-500 focus:text-red-600",
											onClick: () => handleDelete(comp.id),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 h-3.5 w-3.5" }), "Remover"]
										})
									})] })]
								})
							]
						})]
					})
				})
			}, comp.id))
		})]
	});
}
function Certifications() {
	const { certifications, removeCertification } = usePassportStore();
	const handleDelete = (id) => {
		removeCertification(id);
		toast.success("Certificação removida.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between items-center px-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-bold text-lg",
				children: "Certificações"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "outline",
				className: "h-8 gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Adicionar"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: certifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-xl",
				children: "Nenhuma certificação adicionada."
			}) : certifications.map((cert) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-none shadow-sm group",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4 flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-10 w-10 bg-secondary rounded-lg flex items-center justify-center shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5 text-muted-foreground" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-start mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-bold text-sm truncate pr-2",
									children: cert.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [cert.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-green-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleDelete(cert.id),
										className: "opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-500",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mb-2",
								children: cert.issuer
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2 text-[10px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "secondary",
										className: "font-normal",
										children: ["Emitido: ", cert.date]
									}),
									cert.expiry && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "outline",
										className: "font-normal",
										children: ["Válido até: ", cert.expiry]
									}),
									cert.credentialId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground self-center",
										children: ["ID: ", cert.credentialId]
									})
								]
							})
						]
					})]
				})
			}, cert.id))
		})]
	});
}
function GoalsTracker() {
	const { goals, updateGoalStatus, removeGoal } = usePassportStore();
	const handleDelete = (id) => {
		removeGoal(id);
		toast.success("Objetivo removido.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between items-center px-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-bold text-lg",
				children: "Objetivos Futuros"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "outline",
				className: "h-8 gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Novo Objetivo"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: goals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-xl",
				children: "Nenhum objetivo definido."
			}) : goals.map((goal) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: cn("border-l-4 shadow-sm transition-all group", goal.status === "achieved" ? "border-l-green-500 bg-green-500/5" : goal.status === "in_progress" ? "border-l-blue-500" : "border-l-zinc-300"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => updateGoalStatus(goal.id),
						className: "hover:scale-110 transition-transform",
						children: goal.status === "achieved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-6 w-6 text-green-500" }) : goal.status === "in_progress" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-6 w-6 text-blue-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-6 w-6 text-muted-foreground" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: cn("font-bold text-sm", goal.status === "achieved" && "line-through text-muted-foreground"),
								children: goal.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleDelete(goal.id),
								className: "text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "text-[10px] h-5 px-1.5",
								children: goal.category
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] text-muted-foreground flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
									" Meta: ",
									goal.targetDate
								]
							})]
						})]
					})]
				})
			}, goal.id))
		})]
	});
}
function StrategicVisualPassport() {
	const highlights = [{
		id: 1,
		title: `Season 2025 - ${mockCurrentUser.name} Highlights`,
		duration: "03:45",
		type: "Full Reel",
		thumbnail: "https://img.usecurling.com/p/800/450?q=soccer%20goal%20celebration&color=blue",
		views: 1250,
		tags: [
			"Goals",
			"Assists",
			"Skills",
			"Playmaking"
		]
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 animate-fade-in pb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1 px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-bold text-lg flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-5 w-5 text-primary" }), "Material Visual"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "secondary",
						className: "bg-gold/10 text-gold border-gold/20 gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3 w-3" }), " AI Powered"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Curadoria inteligente dos seus melhores momentos para scouts e clubes."
				})]
			}),
			highlights.map((video) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "overflow-hidden border-none shadow-lg group cursor-pointer relative bg-zinc-950",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-video w-full overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: video.thumbnail,
							alt: video.title,
							className: "w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 flex items-center justify-center z-20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-16 w-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform ring-1 ring-white/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-5 w-5 fill-current ml-1" })
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-3 right-3 z-20 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs text-white font-mono border border-white/10",
							children: video.duration
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-3 left-3 z-20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "bg-primary/90 hover:bg-primary text-white border-none shadow-lg backdrop-blur-sm",
								children: "Official Scouting Reel"
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4 bg-card relative z-30",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-start mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-bold text-base line-clamp-1",
								children: video.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3 w-3" }),
									" ",
									video.views,
									" visualizações profissionais"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							className: "h-8 gap-2 bg-background/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only sm:not-sr-only sm:inline-block",
								children: "Enviar"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 flex-wrap",
						children: video.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "text-[10px] bg-secondary/50 hover:bg-secondary font-normal",
							children: tag
						}, tag))
					})]
				})]
			}, video.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-3 px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
					className: "font-bold text-sm flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-4 w-4 text-primary" }), " Smart Cuts (IA)"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] text-muted-foreground uppercase tracking-widest font-medium",
					children: "Technical Focus"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [
					{
						id: 2,
						title: "Análise de Velocidade",
						duration: "00:45",
						thumbnail: "https://img.usecurling.com/p/400/225?q=sprinter%20running&color=red",
						aiScore: 92,
						metric: "34.5 km/h Top Speed",
						type: "Physical"
					},
					{
						id: 3,
						title: "Inteligência Tática",
						duration: "01:12",
						thumbnail: "https://img.usecurling.com/p/400/225?q=soccer%20tactics%20board&color=green",
						aiScore: 88,
						metric: "95% Positioning",
						type: "Tactical"
					},
					{
						id: 4,
						title: "Finalizações Precisas",
						duration: "00:58",
						thumbnail: "https://img.usecurling.com/p/400/225?q=soccer%20kick%20ball&color=orange",
						aiScore: 90,
						metric: "8/10 on Target",
						type: "Technical"
					},
					{
						id: 5,
						title: "Duelos Defensivos",
						duration: "01:05",
						thumbnail: "https://img.usecurling.com/p/400/225?q=soccer%20tackle&color=black",
						aiScore: 85,
						metric: "70% Won Duels",
						type: "Defensive"
					}
				].map((cut) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow group cursor-pointer bg-zinc-900",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-[16/9] bg-muted overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: cut.thumbnail,
								alt: cut.title,
								className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-2 right-2 bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm ring-1 ring-white/10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-3 w-3" }),
									" ",
									cut.aiScore
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-2 left-2 right-2 space-y-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-3 w-3 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] text-white/90 uppercase tracking-wider font-semibold",
										children: cut.type
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-white font-bold text-xs leading-tight line-clamp-1",
									children: cut.metric
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[1px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-8 w-8 text-white fill-white drop-shadow-lg" })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-3 bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
							className: "font-semibold text-xs mb-1 line-clamp-1",
							children: cut.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[10px] text-muted-foreground flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-3 w-3" }),
								" ",
								cut.duration
							]
						})]
					})]
				}, cut.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pt-4 border-t border-border/50 grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					className: "w-full h-10 border-dashed",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-2 h-4 w-4" }), "Baixar Reels"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "w-full h-10 bg-gold text-black hover:bg-gold/90 border-gold shadow-gold/20 shadow-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "mr-2 h-4 w-4" }), "Gerar Novo"]
				})]
			})
		]
	});
}
var import_react = require_react();
function EventLinkDialog({ open, onOpenChange }) {
	const [search, setSearch] = (0, import_react.useState)("");
	const [linked, setLinked] = (0, import_react.useState)(null);
	const { addCompetition } = usePassportStore();
	const handleLink = (event) => {
		setLinked(event.id);
		addCompetition({
			id: `linked-${Date.now()}`,
			name: event.title,
			date: event.date,
			location: event.location,
			organizer: event.organizer,
			role: "Atleta",
			result: "Participante",
			verified: true
		});
		setTimeout(() => {
			toast.success("Participação registrada!", { description: "O evento foi adicionado ao seu histórico e validado." });
			onOpenChange(false);
			setLinked(null);
		}, 1e3);
	};
	const filteredEvents = mockEvents.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md h-[80vh] flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Registrar Participação" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Busque o evento oficial para vincular ao seu passaporte." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Buscar evento...",
						className: "pl-9",
						value: search,
						onChange: (e) => setSearch(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
					className: "flex-1 -mx-6 px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3 pb-4",
						children: filteredEvents.length > 0 ? filteredEvents.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border rounded-lg p-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-12 w-12 rounded-md overflow-hidden bg-muted shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: event.image,
										alt: event.title,
										className: "h-full w-full object-cover"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-bold text-sm truncate",
										children: event.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col text-xs text-muted-foreground mt-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }),
												" ",
												event.date
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
												" ",
												event.location
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									className: linked === event.id ? "bg-green-600 hover:bg-green-700" : "",
									onClick: () => handleLink(event),
									disabled: linked !== null,
									children: linked === event.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-4 w-4" }) : "Vincular"
								})
							]
						}, event.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center py-10 text-muted-foreground text-sm",
							children: "Nenhum evento encontrado."
						})
					})
				})
			]
		})
	});
}
function SportsPassport() {
	const navigate = useNavigate();
	const [isEventLinkOpen, setIsEventLinkOpen] = (0, import_react.useState)(false);
	const [isShareOpen, setIsShareOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col pb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => navigate(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-bold text-lg leading-none",
						children: "Passaporte Esportivo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "ID Digital & CV"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "text-primary",
					onClick: () => setIsShareOpen(true),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-5 w-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "digital",
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid w-full grid-cols-5 mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "digital",
									className: "px-1 text-[10px] sm:text-sm sm:px-3",
									children: "ID Digital"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "history",
									className: "px-1 text-[10px] sm:text-sm sm:px-3",
									children: "Histórico"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "certs",
									className: "px-1 text-[10px] sm:text-sm sm:px-3",
									children: "Certif."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "goals",
									className: "px-1 text-[10px] sm:text-sm sm:px-3",
									children: "Metas"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "visual",
									className: "px-1 text-[10px] sm:text-sm sm:px-3",
									children: "Visual"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "digital",
							className: "space-y-6 animate-fade-in",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PassportCard, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 max-w-sm mx-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										className: "w-full font-bold shadow-lg",
										size: "lg",
										onClick: () => setIsEventLinkOpen(true),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "mr-2 h-5 w-5" }), "Validar em Evento"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											className: "w-full",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-2 h-4 w-4" }), "PDF"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											className: "w-full bg-black text-white hover:bg-black/90 hover:text-white border-black",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "mr-2 h-4 w-4" }), "Wallet"]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center space-y-2 mt-8",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Este documento digital é pessoal e intransferível."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] text-muted-foreground/60 uppercase tracking-widest",
										children: [
											"ID: ",
											mockCurrentUser.id.toUpperCase(),
											"-GOPLAY-VERIFIED"
										]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "history",
							className: "animate-fade-in",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompetitionHistory, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "certs",
							className: "animate-fade-in",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Certifications, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "goals",
							className: "animate-fade-in",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalsTracker, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "visual",
							className: "animate-fade-in",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StrategicVisualPassport, {})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventLinkDialog, {
				open: isEventLinkOpen,
				onOpenChange: setIsEventLinkOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareDialog, {
				open: isShareOpen,
				onOpenChange: setIsShareOpen,
				title: `Passaporte de ${mockCurrentUser.name}`,
				description: "Confira meu currículo esportivo oficial no Goplay!"
			})
		]
	});
}
export { SportsPassport as default };

//# sourceMappingURL=SportsPassport-BezIgSGy.js.map