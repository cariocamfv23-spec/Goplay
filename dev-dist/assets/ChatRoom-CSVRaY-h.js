import "./bot-u70xSBxA.js";
import "./download-D8ddYSqE.js";
import "./file-text-I-Qx-ouW.js";
import "./image-BhlHjfvP.js";
import { t as MicOff } from "./mic-off-BCnvFH4J.js";
import { t as Mic } from "./mic-Bs-YCOGr.js";
import "./paperclip-DlSQVQoa.js";
import { t as Phone } from "./phone-DoURZNzc.js";
import "./play-DRVJDtd1.js";
import "./send-hNBUwEwn.js";
import "./triangle-alert-pSp-uRIs.js";
import { t as Video } from "./video-uaYya0fr.js";
import { Br as createLucideIcon, Lr as ArrowLeft, Y as mockChats, ai as useSearchParams, an as Button, bn as cn, bt as mockProfiles, ci as useParams, di as require_react, en as Avatar, kt as mockTalents, li as require_jsx_runtime, nn as AvatarImage, si as useNavigate, tn as AvatarFallback, vn as toast } from "./index-D7HAKqsN.js";
import "./card-Df0uDja_.js";
import "./progress-BIHdl0of.js";
import { n as ChatBubble, t as ChatInput } from "./ChatInput-BZ06jWy5.js";
import "./input-DbceDMoC.js";
import "./drawer-KbNZAYP7.js";
var Maximize2 = createLucideIcon("maximize-2", [
	["path", {
		d: "M15 3h6v6",
		key: "1q9fwt"
	}],
	["path", {
		d: "m21 3-7 7",
		key: "1l2asr"
	}],
	["path", {
		d: "m3 21 7-7",
		key: "tjx5ai"
	}],
	["path", {
		d: "M9 21H3v-6",
		key: "wtvkvv"
	}]
]);
var Minimize2 = createLucideIcon("minimize-2", [
	["path", {
		d: "m14 10 7-7",
		key: "oa77jy"
	}],
	["path", {
		d: "M20 10h-6V4",
		key: "mjg0md"
	}],
	["path", {
		d: "m3 21 7-7",
		key: "tjx5ai"
	}],
	["path", {
		d: "M4 14h6v6",
		key: "rmj7iw"
	}]
]);
var PhoneOff = createLucideIcon("phone-off", [
	["path", {
		d: "M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272",
		key: "1wngk7"
	}],
	["path", {
		d: "M22 2 2 22",
		key: "y4kqgn"
	}],
	["path", {
		d: "M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473",
		key: "10hv5p"
	}]
]);
var VideoOff = createLucideIcon("video-off", [
	["path", {
		d: "M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196",
		key: "w8jjjt"
	}],
	["path", {
		d: "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2",
		key: "1xawa7"
	}],
	["path", {
		d: "m2 2 20 20",
		key: "1ooewy"
	}]
]);
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function CallOverlay({ isOpen, type, user, onEndCall }) {
	const [isMuted, setIsMuted] = (0, import_react.useState)(false);
	const [isVideoEnabled, setIsVideoEnabled] = (0, import_react.useState)(type === "video");
	const [callStatus, setCallStatus] = (0, import_react.useState)("connecting");
	const [duration, setDuration] = (0, import_react.useState)(0);
	const [isMinimized, setIsMinimized] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isOpen) {
			setCallStatus("connecting");
			setDuration(0);
			setIsMinimized(false);
			setIsVideoEnabled(type === "video");
			const connectTimer = setTimeout(() => {
				setCallStatus("connected");
			}, 2e3);
			return () => clearTimeout(connectTimer);
		}
	}, [isOpen, type]);
	(0, import_react.useEffect)(() => {
		let interval;
		if (isOpen && callStatus === "connected") interval = setInterval(() => {
			setDuration((prev) => prev + 1);
		}, 1e3);
		return () => clearInterval(interval);
	}, [isOpen, callStatus]);
	if (!isOpen) return null;
	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};
	if (isMinimized) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed top-20 right-4 z-50 bg-background/90 backdrop-blur-md border border-border shadow-2xl rounded-2xl p-3 flex items-center gap-3 animate-in slide-in-from-right",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
					className: "h-10 w-10 border-2 border-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: user.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: user.name[0] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-background animate-pulse" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-bold",
					children: user.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] text-muted-foreground",
					children: formatTime(duration)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-1 ml-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon",
					variant: "ghost",
					className: "h-8 w-8 rounded-full",
					onClick: () => setIsMinimized(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon",
					variant: "destructive",
					className: "h-8 w-8 rounded-full",
					onClick: onEndCall,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneOff, { className: "h-4 w-4" })
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex flex-col bg-background animate-in slide-in-from-bottom duration-300",
		children: [
			!isVideoEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 z-0 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/20 to-background" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse" })]
			}),
			isVideoEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 z-0 bg-zinc-900",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "https://img.usecurling.com/p/400/800?q=portrait%20person%20video%20call",
					className: "w-full h-full object-cover opacity-80",
					alt: "Video Feed"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-4 right-4 w-28 h-40 bg-black rounded-xl border border-white/20 shadow-xl overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "https://img.usecurling.com/ppl/medium?gender=male&seed=1",
						className: "w-full h-full object-cover",
						alt: "My Feed"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 p-6 flex flex-col items-center mt-8",
				children: [
					!isVideoEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						className: "h-32 w-32 border-4 border-background shadow-2xl mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: user.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: user.name[0] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: cn("text-2xl font-bold mb-1", isVideoEnabled ? "text-white drop-shadow-md" : "text-foreground"),
						children: user.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("text-sm font-medium", isVideoEnabled ? "text-white/80" : "text-muted-foreground"),
						children: callStatus === "connecting" ? "Chamando..." : formatTime(duration)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 p-8 pb-12 flex items-center justify-center gap-6 bg-gradient-to-t from-background via-background/80 to-transparent",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						variant: "secondary",
						className: cn("h-14 w-14 rounded-full shadow-lg border-2", isMuted ? "bg-white text-black" : "bg-secondary/80 backdrop-blur-md"),
						onClick: () => setIsMuted(!isMuted),
						children: isMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "h-6 w-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						variant: "destructive",
						className: "h-20 w-20 rounded-full shadow-xl animate-in zoom-in duration-300 hover:scale-105 transition-transform bg-red-600 hover:bg-red-700",
						onClick: onEndCall,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneOff, { className: "h-8 w-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						variant: "secondary",
						className: cn("h-14 w-14 rounded-full shadow-lg border-2", !isVideoEnabled ? "bg-white text-black" : "bg-secondary/80 backdrop-blur-md"),
						onClick: () => setIsVideoEnabled(!isVideoEnabled),
						children: !isVideoEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoOff, { className: "h-6 w-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						className: "absolute right-6 bottom-14 text-muted-foreground hover:text-foreground",
						onClick: () => setIsMinimized(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize2, { className: "h-6 w-6" })
					})
				]
			})
		]
	});
}
function ChatRoom() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [isCallOpen, setIsCallOpen] = (0, import_react.useState)(false);
	const [callType, setCallType] = (0, import_react.useState)("voice");
	const [messages, setMessages] = (0, import_react.useState)([]);
	const scrollRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const action = searchParams.get("action");
		if (action === "voice") handleStartCall("voice");
		else if (action === "video") handleStartCall("video");
	}, [searchParams]);
	const chat = (0, import_react.useMemo)(() => {
		const chatData = mockChats.find((c) => c.id === id);
		if (chatData) return chatData;
		const mockId = id?.replace("user-", "") || "unknown";
		const profileUser = mockProfiles.find((p) => p.id === mockId) || mockTalents.find((p) => p.id === mockId);
		return {
			id: id || "temp",
			user: {
				id: mockId,
				name: profileUser ? profileUser.name : `Usuário ${mockId}`,
				avatar: profileUser ? profileUser.avatar : `https://img.usecurling.com/ppl/medium?gender=male&seed=${mockId}`,
				online: true,
				type: profileUser ? profileUser.type : "User"
			},
			messages: [],
			unread: 0,
			lastMessage: "",
			time: "Agora"
		};
	}, [id]);
	(0, import_react.useEffect)(() => {
		if (chat?.messages) setMessages(chat.messages.map((m) => ({
			...m,
			type: m.type || "text",
			isMe: m.sender === "me",
			mediaUrl: m.mediaUrl || void 0,
			fileName: m.fileName || void 0
		})));
	}, [chat?.messages]);
	(0, import_react.useEffect)(() => {
		if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
	}, [messages]);
	const handleStartCall = (type) => {
		setCallType(type);
		setIsCallOpen(true);
		toast.info(`Iniciando chamada de ${type === "voice" ? "voz" : "vídeo"}...`);
	};
	const handleSendMessage = (newMsg) => {
		const message = {
			id: `new-${Date.now()}`,
			sender: "me",
			time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			}),
			type: "text",
			isMe: true,
			...newMsg
		};
		setMessages((prev) => [...prev, message]);
		if (message.type === "text") {} else toast.success("Mídia enviada");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-screen bg-background animate-fade-in relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CallOverlay, {
				isOpen: isCallOpen,
				type: callType,
				user: chat.user,
				onEndCall: () => setIsCallOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 bg-background/95 backdrop-blur z-20 p-3 border-b border-border/50 flex items-center justify-between shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "-ml-2 hover:bg-secondary/50",
						onClick: () => navigate(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "cursor-pointer flex items-center gap-3",
						onClick: () => navigate(`/profile/${chat?.user.id}`),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-10 w-10 border border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: chat.user.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: chat.user.name[0] })]
							}), chat.user.online && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 border-2 border-background rounded-full" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-sm leading-none mb-1",
								children: chat.user.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground block",
								children: chat.user.online ? "Online" : "Visto por último recentemente"
							})]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => handleStartCall("voice"),
						className: "hover:bg-primary/10 hover:text-primary transition-colors rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => handleStartCall("video"),
						className: "hover:bg-primary/10 hover:text-primary transition-colors rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-5 w-5" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: scrollRef,
				className: "flex-1 overflow-y-auto p-4 space-y-2 bg-slate-50 dark:bg-black/20",
				children: messages.length > 0 ? messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatBubble, {
					message: m,
					senderAvatar: chat?.user.avatar,
					senderName: chat?.user.name
				}, m.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8 animate-fade-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-20 w-20 bg-secondary/50 rounded-full flex items-center justify-center mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-20 w-20 opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: chat?.user.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: chat?.user.name[0] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-medium",
							children: ["Inicie a conversa com ", chat?.user.name]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs opacity-50 mt-1",
							children: "Suas mensagens e chamadas são protegidas."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatInput, { onSendMessage: handleSendMessage })
		]
	});
}
export { ChatRoom as default };

//# sourceMappingURL=ChatRoom-CSVRaY-h.js.map