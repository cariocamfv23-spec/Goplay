import { t as Bot } from "./bot-BU1FGZg-.js";
import { t as Download } from "./download-Cfo-B952.js";
import { t as FileText } from "./file-text-DTRHcu3x.js";
import { t as Image } from "./image-Bd5gGVL9.js";
import { t as Mic } from "./mic-Bg6dQ5FP.js";
import { t as Paperclip } from "./paperclip-DqylFGvN.js";
import { t as Play } from "./play-D84fO2eb.js";
import { t as Send } from "./send-3_F60DlV.js";
import { t as TriangleAlert } from "./triangle-alert-CO_FcaHL.js";
import { t as Video } from "./video-B8BPShog.js";
import { An as TrendingUp, R as Badge, Sn as X, an as Button, bn as cn, di as require_react, en as Avatar, jn as TrendingDown, li as require_jsx_runtime, nn as AvatarImage, tn as AvatarFallback } from "./index-CmViBNnK.js";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-TSLGiX2d.js";
import { t as Progress } from "./progress-DU4GuQR4.js";
import { t as Input } from "./input-CplDpRvO.js";
import { n as DrawerClose, o as DrawerHeader, r as DrawerContent, s as DrawerTitle, t as Drawer } from "./drawer-DghNkylG.js";
var import_jsx_runtime = require_jsx_runtime();
function ChatBubble({ message, senderAvatar, senderName }) {
	const isMe = message.isMe;
	const isBot = message.sender === "bot";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex w-full mb-4 animate-fade-in-up", isMe ? "justify-end" : "justify-start"),
		children: [!isMe && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
			className: cn("h-8 w-8 mr-2 mt-1 shadow-sm", isBot ? "bg-zinc-900 border border-zinc-700" : ""),
			children: isBot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-center w-full h-full bg-zinc-950",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-5 w-5 text-red-500" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: senderAvatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: senderName?.[0] })] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("max-w-[85%] md:max-w-[60%] rounded-2xl px-4 py-3 relative shadow-sm", isMe ? "bg-primary text-primary-foreground rounded-br-none" : isBot ? "bg-zinc-900 text-zinc-100 rounded-bl-none border border-red-900/30" : "bg-white dark:bg-zinc-800 text-foreground rounded-bl-none border border-border"),
			children: [
				!isMe && senderName && !isBot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] text-primary font-bold mb-1 opacity-80 uppercase tracking-wide",
					children: senderName
				}),
				!isMe && isBot && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[10px] text-red-500 font-bold mb-1 opacity-90 uppercase tracking-wide flex items-center gap-1",
					children: ["Bot da Verdade ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3 w-3" })]
				}),
				message.type === "text" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed whitespace-pre-wrap",
					children: message.text
				}),
				message.type === "evaluation" && message.evaluationData && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 mt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed mb-2",
						children: message.text
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "bg-black/40 border-red-500/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							className: "p-3 pb-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								className: "text-xs font-bold text-red-400 uppercase tracking-widest flex items-center justify-between",
								children: ["Relatório Técnico", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: "border-red-500/50 text-red-400 text-[10px]",
									children: "CONFIDENCIAL"
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-3 pt-2 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium text-zinc-300",
										children: "Score Geral"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-2xl font-black text-white",
										children: [message.evaluationData.score, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-zinc-500 font-normal",
											children: "/100"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
									value: message.evaluationData.score,
									className: "h-2 bg-zinc-800",
									indicatorClassName: cn(message.evaluationData.score > 75 ? "bg-green-500" : message.evaluationData.score > 50 ? "bg-yellow-500" : "bg-red-500")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-red-950/30 p-2 rounded border border-red-900/30",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-red-200 font-medium leading-relaxed",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-red-500",
												children: "REALITY CHECK:"
											}),
											" ",
											message.evaluationData.realityCheck
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2 mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10px] text-zinc-400 font-bold flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3 text-green-500" }), " PONTOS FORTES"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "text-[10px] text-zinc-300 list-disc list-inside",
											children: message.evaluationData.strengths.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, i))
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10px] text-zinc-400 font-bold flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-3 w-3 text-red-500" }), " PONTOS FRACOS"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "text-[10px] text-zinc-300 list-disc list-inside",
											children: message.evaluationData.weaknesses.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, i))
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pt-2 border-t border-white/5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-zinc-500",
											children: "Veredito:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-white tracking-wide",
											children: message.evaluationData.verdict
										})]
									})
								})
							]
						})]
					})]
				}),
				message.type === "image" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg overflow-hidden my-1 shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: message.mediaUrl,
						alt: "Sent image",
						className: "w-full h-auto max-h-[300px] object-cover"
					})
				}),
				message.type === "video" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg overflow-hidden my-1 relative group cursor-pointer shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: message.mediaUrl,
						alt: "Video thumbnail",
						className: "w-full h-auto max-h-[300px] object-cover opacity-90"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-12 w-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/60 shadow-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-5 w-5 text-white fill-white ml-1" })
						})
					})]
				}),
				message.type === "document" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 bg-background/10 rounded-xl p-3 border border-current/10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-10 w-10 bg-background/20 rounded-lg flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold truncate",
								children: message.fileName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] opacity-70",
								children: "PDF • 2.4 MB"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "h-8 w-8 flex items-center justify-center rounded-full hover:bg-background/10 transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" })
						})
					]
				}),
				message.type === "audio" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 min-w-[180px] py-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "h-10 w-10 rounded-full bg-background/20 flex items-center justify-center shrink-0 hover:bg-background/30 transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 fill-current" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1.5 w-full bg-current/20 rounded-full overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-1/3 bg-current rounded-full" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] opacity-70 font-medium",
								children: "0:15 / 1:30"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-4 w-4 opacity-50" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("text-[10px] mt-1 text-right w-full block", isMe ? "text-primary-foreground/70" : isBot ? "text-zinc-500" : "text-muted-foreground"),
					children: message.time || message.timestamp
				})
			]
		})]
	});
}
var import_react = require_react();
function ChatInput({ onSendMessage }) {
	const [text, setText] = (0, import_react.useState)("");
	const [isDrawerOpen, setIsDrawerOpen] = (0, import_react.useState)(false);
	const [isRecording, setIsRecording] = (0, import_react.useState)(false);
	const [recordingTime, setRecordingTime] = (0, import_react.useState)(0);
	const timerRef = (0, import_react.useRef)(null);
	const handleSendText = () => {
		if (!text.trim()) return;
		onSendMessage({
			type: "text",
			text,
			timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			})
		});
		setText("");
	};
	const handleSendMedia = (type) => {
		let msg = {
			type,
			timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			})
		};
		if (type === "image") {
			msg.mediaUrl = "https://img.usecurling.com/p/400/300?q=chat%20image";
			msg.text = "Imagem enviada";
		} else if (type === "video") {
			msg.mediaUrl = "https://img.usecurling.com/p/400/300?q=chat%20video";
			msg.text = "Vídeo enviado";
		} else {
			msg.fileName = "Documento_Anexo.pdf";
			msg.text = "Documento enviado";
		}
		onSendMessage(msg);
		setIsDrawerOpen(false);
	};
	const toggleRecording = () => {
		if (isRecording) {
			if (timerRef.current) clearInterval(timerRef.current);
			setIsRecording(false);
			setRecordingTime(0);
			onSendMessage({
				type: "audio",
				timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit"
				})
			});
		} else {
			setIsRecording(true);
			timerRef.current = setInterval(() => {
				setRecordingTime((prev) => prev + 1);
			}, 1e3);
		}
	};
	const formatTime = (seconds) => {
		return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-3 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shrink-0 z-20 pb-safe",
		children: [isRecording ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4 animate-in fade-in bg-secondary rounded-full px-4 py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-3 bg-red-500 rounded-full animate-pulse" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex-1 text-sm font-medium",
					children: ["Gravando ", formatTime(recordingTime)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: () => {
						if (timerRef.current) clearInterval(timerRef.current);
						setIsRecording(false);
						setRecordingTime(0);
					},
					children: "Cancelar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon",
					className: "rounded-full h-8 w-8 bg-primary",
					onClick: toggleRecording,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "shrink-0 text-muted-foreground hover:text-primary transition-colors",
					onClick: () => setIsDrawerOpen(true),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Mensagem...",
					value: text,
					onChange: (e) => setText(e.target.value),
					className: "rounded-full bg-secondary border-none focus-visible:ring-1 focus-visible:ring-primary",
					onKeyDown: (e) => e.key === "Enter" && handleSendText()
				}),
				text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon",
					className: "rounded-full shrink-0 animate-in zoom-in duration-200",
					onClick: handleSendText,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "shrink-0 text-muted-foreground hover:text-primary transition-colors",
					onClick: toggleRecording,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-5 w-5" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
			open: isDrawerOpen,
			onOpenChange: setIsDrawerOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, {
				className: "pb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerHeader, {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, {
						className: "text-center",
						children: "Anexar Mídia"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerClose, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "absolute right-4 top-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-center gap-10 py-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-3 cursor-pointer group",
							onClick: () => handleSendMedia("image"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-16 w-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 group-hover:scale-105 transition-transform shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-7 w-7" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium",
								children: "Galeria"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-3 cursor-pointer group",
							onClick: () => handleSendMedia("video"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-16 w-16 rounded-2xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 group-hover:scale-105 transition-transform shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-7 w-7" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium",
								children: "Vídeo"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-3 cursor-pointer group",
							onClick: () => handleSendMedia("document"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-16 w-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-7 w-7" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium",
								children: "Documento"
							})]
						})
					]
				})]
			})
		})]
	});
}
export { ChatBubble as n, ChatInput as t };

//# sourceMappingURL=ChatInput-BgB_U9dJ.js.map