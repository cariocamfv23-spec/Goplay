import "./bot-Co-wA5JT.js";
import "./download-BN_OlXzt.js";
import "./file-text-DCFlFZ8m.js";
import "./image-BPEsPKaE.js";
import "./mic-DgDqZhdT.js";
import "./paperclip-DlF5wKJn.js";
import "./play-B8TTrsIP.js";
import "./send-DzA5ZvWG.js";
import { t as Share2 } from "./share-2-DmerbgCh.js";
import { t as ShieldAlert } from "./shield-alert--tP8o5vN.js";
import { t as Shield } from "./shield-CfvnTv3J.js";
import "./triangle-alert-D42euu9a.js";
import "./video-qKZL1vBW.js";
import { Ft as mockUser, H as Badge, Nr as Calendar, On as Users, Or as ChevronRight, St as mockPosts, Tn as X, Xn as MessageSquare, Zn as MessageCircle, an as AvatarImage, at as mockFeedUsers, cn as Button, di as useParams, in as AvatarFallback, kr as Check, lr as Heart, pi as require_react, pr as Globe, ri as require_jsx_runtime, rn as Avatar, rr as Lock, tr as MapPin, ui as useNavigate, zr as ArrowLeft } from "./index-DW2Yio1z.js";
import "./card-gaxt8l5w.js";
import "./progress-CQITQJvD.js";
import { n as ChatBubble, t as ChatInput } from "./ChatInput-CF8ZtBt5.js";
import "./input-BNNakbCa.js";
import "./drawer-B_JkWKQG.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CpaWbNSX.js";
import { t as useNexusStore } from "./useNexusStore-JizE2dh7.js";
var import_jsx_runtime = require_jsx_runtime();
function TribeFeedTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4 py-4",
		children: mockPosts.slice(0, 3).map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 shadow-sm space-y-4 hover:shadow-md transition-all",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						className: "w-10 h-10 ring-2 ring-primary/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: post.user.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: post.user.name[0] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold leading-none",
						children: post.user.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: post.time
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed",
					children: post.content
				}),
				post.media && post.media[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl border border-border/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: post.media[0],
						alt: "Post Media",
						className: "w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-6 pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-red-500 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-4 h-4" }),
								" ",
								post.likes
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-blue-500 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-4 h-4" }),
								" ",
								post.comments
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-green-500 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-4 h-4" }), " Compartilhar"]
						})
					]
				})
			]
		}, post.id))
	});
}
function TribeEventsTab({ tribe }) {
	if (!tribe.events || tribe.events.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center py-12 px-4 bg-secondary/20 rounded-2xl border border-border border-dashed mt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-10 h-10 mx-auto text-muted-foreground/50 mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground font-medium",
			children: "Nenhum evento agendado para esta tribo no momento."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4 py-4",
		children: tribe.events.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5 bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/30 transition-colors group",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-bold text-lg leading-none",
					children: event.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-4 h-4 text-primary" }),
							" ",
							event.date
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4 text-primary" }),
							" ",
							event.location
						]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				className: "w-full md:w-auto gap-2 group-hover:bg-primary/10 group-hover:text-primary border-border/50 group-hover:border-primary/30 transition-all",
				children: ["Ver Detalhes ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })]
			})]
		}, event.id))
	});
}
function TribeAdminTab({ tribe }) {
	const { approveRequest, declineRequest } = useNexusStore();
	const pendingUsers = tribe.pendingRequests.map((id) => mockFeedUsers.find((u) => u.id === id) || {
		id,
		name: "Usuário Desconhecido",
		avatar: ""
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-bold text-lg flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-5 h-5 text-orange-500" }), "Solicitações Pendentes"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "bg-orange-500/10 text-orange-500 font-bold px-2.5 py-0.5 rounded-full text-xs",
						children: pendingUsers.length
					})]
				}),
				pendingUsers.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground bg-secondary/30 p-4 rounded-xl text-center border border-border border-dashed",
					children: "Nenhuma solicitação no momento."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					children: pendingUsers.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "w-10 h-10 border border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: u.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: u.name[0] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-sm leading-none block",
								children: u.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground mt-1",
								children: "Deseja entrar na tribo"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								className: "flex-1 sm:flex-none gap-1 bg-green-600 hover:bg-green-700 text-white",
								onClick: () => approveRequest(tribe.id, u.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4" }), " Aprovar"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								className: "flex-1 sm:flex-none gap-1 text-destructive hover:bg-destructive/10 border-destructive/20",
								onClick: () => declineRequest(tribe.id, u.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" }), " Recusar"]
							})]
						})]
					}, u.id))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-bold text-lg",
					children: "Membros Atuais"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "bg-primary/10 text-primary font-bold px-2.5 py-0.5 rounded-full text-xs",
					children: tribe.members.length
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground p-4 bg-secondary/30 rounded-xl text-center border border-border border-dashed",
				children: "Painel completo de gerenciamento de membros estará disponível na próxima atualização."
			})]
		})]
	});
}
var import_react = require_react();
function TribeChatTab({ tribe }) {
	const scrollRef = (0, import_react.useRef)(null);
	const mockMembers = [
		mockFeedUsers[0],
		mockFeedUsers[1],
		mockFeedUsers[2]
	];
	const [messages, setMessages] = (0, import_react.useState)([
		{
			id: "m1",
			sender: "them",
			text: `E aí pessoal do ${tribe.name}! Bora marcar o próximo encontro?`,
			time: "09:00",
			type: "text",
			isMe: false
		},
		{
			id: "m2",
			sender: "them",
			text: "Eu tô dentro! É só avisar o horário.",
			time: "09:15",
			type: "text",
			isMe: false
		},
		{
			id: "m3",
			sender: "them",
			text: "Final de semana costuma ser melhor pra todo mundo.",
			time: "09:30",
			type: "text",
			isMe: false
		}
	]);
	(0, import_react.useEffect)(() => {
		if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
	}, [messages]);
	const handleSendMessage = (newMsg) => {
		const message = {
			id: `msg-${Date.now()}`,
			sender: "me",
			time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			}),
			type: newMsg.type || "text",
			isMe: true,
			...newMsg
		};
		setMessages((prev) => [...prev, message]);
	};
	const getSenderData = (index, isMe) => {
		if (isMe) return {
			name: mockUser.name,
			avatar: mockUser.avatar
		};
		const user = mockMembers[index % mockMembers.length];
		return {
			name: user.name,
			avatar: user.avatar
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-[600px] max-h-[65vh] bg-card/60 backdrop-blur-md rounded-2xl border border-border/50 shadow-sm overflow-hidden animate-fade-in relative z-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-3 border-b border-border/50 bg-background/50 backdrop-blur-sm flex justify-between items-center z-10 shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-4 h-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-sm leading-none",
							children: "Chat da Tribo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] text-muted-foreground mt-0.5",
							children: [tribe.members.length, " membros na comunidade"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scrollRef,
				className: "flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-black/20 no-scrollbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center pb-4 pt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full",
						children: ["Início do Chat de ", tribe.name]
					})
				}), messages.map((m, i) => {
					const sender = getSenderData(i, m.isMe);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatBubble, {
						message: m,
						senderName: sender.name,
						senderAvatar: sender.avatar
					}, m.id);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto z-10 shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatInput, { onSendMessage: handleSendMessage })
			})
		]
	});
}
function TribeProfile() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { tribes, joinTribe } = useNexusStore();
	const tribe = tribes.find((t) => t.id === id);
	if (!tribe) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center text-muted-foreground",
		children: "Tribo não encontrada."
	});
	const isCreator = tribe.creatorId === mockUser.id;
	const isMember = tribe.members.includes(mockUser.id);
	const isRequested = tribe.pendingRequests.includes(mockUser.id);
	const handleJoin = () => {
		joinTribe(tribe.id, mockUser.id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-56 md:h-72 w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: tribe.cover,
					alt: "Tribe Cover",
					className: "w-full h-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "absolute top-4 left-4 bg-black/20 backdrop-blur-md text-white hover:bg-black/40 rounded-full",
					onClick: () => navigate(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative px-4 pb-4 -mt-16 max-w-4xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row md:justify-between md:items-end gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-1.5 bg-background rounded-3xl shadow-lg inline-block w-fit",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: tribe.icon,
							alt: "Tribe Icon",
							className: "w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover bg-secondary"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-shrink-0",
						children: isMember ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							className: "w-full md:w-auto font-bold gap-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20",
							children: "Membro Oficial"
						}) : isRequested ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							disabled: true,
							className: "w-full md:w-auto font-bold border-orange-500/50 text-orange-500",
							children: "Solicitação Pendente"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: handleJoin,
							className: "w-full md:w-auto font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-transform",
							children: tribe.isPrivate ? "Solicitar Entrada" : "Entrar na Tribo"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl md:text-3xl font-black tracking-tight",
								children: tribe.name
							}), tribe.isPrivate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-5 h-5 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-5 h-5 text-muted-foreground" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground leading-relaxed text-sm md:text-base max-w-2xl mb-5",
							children: tribe.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "secondary",
								className: "gap-1.5 py-1 px-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-3.5 h-3.5" }),
									" ",
									tribe.members.length,
									" Membros"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: "bg-primary/5 text-primary border-primary/20 py-1 px-3",
								children: tribe.category
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "feed",
					className: "mt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "w-full h-auto bg-secondary/50 rounded-xl p-1 flex flex-wrap gap-1 justify-start sm:justify-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "feed",
									className: "flex-1 sm:flex-none rounded-lg data-[state=active]:shadow-sm text-xs sm:text-sm py-2 px-3 sm:px-6",
									children: "Feed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "chat",
									className: "flex-1 sm:flex-none rounded-lg data-[state=active]:shadow-sm text-xs sm:text-sm py-2 px-3 sm:px-6 gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-3.5 h-3.5" }), " Chat"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "events",
									className: "flex-1 sm:flex-none rounded-lg data-[state=active]:shadow-sm text-xs sm:text-sm py-2 px-3 sm:px-6",
									children: "Eventos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "members",
									className: "flex-1 sm:flex-none rounded-lg data-[state=active]:shadow-sm text-xs sm:text-sm py-2 px-3 sm:px-6",
									children: "Membros"
								}),
								isCreator && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "admin",
									className: "flex-1 sm:flex-none rounded-lg data-[state=active]:shadow-sm text-xs sm:text-sm py-2 px-3 sm:px-6 gap-1.5 text-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-4 h-4" }), " Admin"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "feed",
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TribeFeedTab, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "chat",
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TribeChatTab, { tribe })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "events",
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TribeEventsTab, { tribe })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "members",
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "py-12 text-center text-muted-foreground bg-secondary/20 rounded-2xl border border-border border-dashed",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-10 h-10 mx-auto text-muted-foreground/50 mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: "Lista de membros completa em breve."
								})]
							})
						}),
						isCreator && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "admin",
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TribeAdminTab, { tribe })
						})
					]
				})
			]
		})]
	});
}
export { TribeProfile as default };

//# sourceMappingURL=TribeProfile--s_PrGeo.js.map