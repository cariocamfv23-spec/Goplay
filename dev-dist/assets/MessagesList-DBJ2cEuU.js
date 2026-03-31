import { t as Phone } from "./phone-2DcvFivq.js";
import { t as Video } from "./video-DSjgLevz.js";
import { Br as createLucideIcon, R as Badge, Un as Search, Y as mockChats, an as Button, bn as cn, en as Avatar, li as require_jsx_runtime, nn as AvatarImage, si as useNavigate, tn as AvatarFallback } from "./index-DVDRZSZo.js";
import { n as CardContent, t as Card } from "./card-DmBSBngY.js";
import { t as Input } from "./input-QL8KJmQt.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BTYNkyJw.js";
var PhoneIncoming = createLucideIcon("phone-incoming", [
	["path", {
		d: "M16 2v6h6",
		key: "1mfrl5"
	}],
	["path", {
		d: "m22 2-6 6",
		key: "6f0sa0"
	}],
	["path", {
		d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
		key: "9njp5v"
	}]
]);
var PhoneMissed = createLucideIcon("phone-missed", [
	["path", {
		d: "m16 2 6 6",
		key: "1gw87d"
	}],
	["path", {
		d: "m22 2-6 6",
		key: "6f0sa0"
	}],
	["path", {
		d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
		key: "9njp5v"
	}]
]);
var PhoneOutgoing = createLucideIcon("phone-outgoing", [
	["path", {
		d: "m16 8 6-6",
		key: "oawc05"
	}],
	["path", {
		d: "M22 8V2h-6",
		key: "oqy2zc"
	}],
	["path", {
		d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
		key: "9njp5v"
	}]
]);
var SquarePen = createLucideIcon("square-pen", [["path", {
	d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
	key: "1m0v6g"
}], ["path", {
	d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
	key: "ohrbg2"
}]]);
const mockCalls = [
	{
		id: "c1",
		user: {
			id: "u2",
			name: "Flamengo Oficial",
			avatar: "https://img.usecurling.com/i?q=flamengo&color=red",
			online: true
		},
		type: "missed",
		date: "Hoje, 10:45",
		isVideo: false
	},
	{
		id: "c2",
		user: {
			id: "u3",
			name: "Coach Carter",
			avatar: "https://img.usecurling.com/ppl/medium?gender=male&seed=45"
		},
		type: "outgoing",
		date: "Ontem",
		duration: "5:23",
		isVideo: true
	},
	{
		id: "c3",
		user: {
			id: "u4",
			name: "Julia Santos",
			avatar: "https://img.usecurling.com/ppl/medium?gender=female&seed=12",
			online: true
		},
		type: "incoming",
		date: "Segunda",
		duration: "12:40",
		isVideo: false
	},
	{
		id: "c4",
		user: {
			id: "u10",
			name: "Gabriel Medina",
			avatar: "https://img.usecurling.com/ppl/medium?gender=male&seed=88"
		},
		type: "missed",
		date: "22 Out",
		isVideo: true
	},
	{
		id: "c5",
		user: {
			id: "u2",
			name: "Flamengo Oficial",
			avatar: "https://img.usecurling.com/i?q=flamengo&color=red"
		},
		type: "outgoing",
		date: "20 Out",
		duration: "2:15",
		isVideo: false
	}
];
var import_jsx_runtime = require_jsx_runtime();
function CallHistory() {
	const navigate = useNavigate();
	const handleCall = (userId, isVideo, e) => {
		e.stopPropagation();
		navigate(`/messages/${userId}?action=${isVideo ? "video" : "voice"}`);
	};
	if (mockCalls.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-12 text-center animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-16 w-16 bg-secondary/50 rounded-full flex items-center justify-center mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-8 w-8 text-muted-foreground/50" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-lg font-semibold text-foreground",
				children: "Sem histórico de chamadas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mt-1 max-w-[250px]",
				children: "Suas chamadas recentes aparecerão aqui. Inicie uma nova conversa para ligar."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-1 p-4 pt-2 animate-fade-in-up",
		children: mockCalls.map((call) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/30 active:bg-secondary/50 transition-colors cursor-pointer group border border-transparent hover:border-border/50",
			onClick: () => navigate(`/messages/${call.user.id}`),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						className: "h-12 w-12 border border-border/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: call.user.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: call.user.name[0] })]
					}), call.type === "missed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute -bottom-1 -right-1 h-5 w-5 bg-background rounded-full flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneMissed, { className: "h-3 w-3 text-red-500 fill-red-500/20" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-baseline mb-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: cn("font-semibold text-sm truncate", call.type === "missed" ? "text-red-500" : "text-foreground"),
							children: call.user.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-muted-foreground whitespace-nowrap ml-2",
							children: call.date
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 text-xs text-muted-foreground",
						children: [
							call.type === "outgoing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneOutgoing, { className: "h-3 w-3" }),
							call.type === "incoming" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneIncoming, { className: "h-3 w-3" }),
							call.type === "missed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-red-500/80 font-medium",
								children: "Perdida"
							}),
							call.type !== "missed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["• ", call.duration] }),
							call.isVideo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1 h-1 rounded-full bg-muted-foreground/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Vídeo" })]
							})] })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "rounded-full h-10 w-10 text-muted-foreground hover:text-primary hover:bg-primary/10 opacity-70 group-hover:opacity-100 transition-all",
					onClick: (e) => handleCall(call.user.id, call.isVideo, e),
					children: call.isVideo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5" })
				})
			]
		}, call.id))
	});
}
function MessagesList() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "chats",
			className: "w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sticky top-0 bg-background/95 backdrop-blur z-20 border-b border-border/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 pb-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl font-bold",
									children: "Mensagens"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => navigate("/messages/new"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-5 w-5" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Buscar...",
									className: "pl-9 bg-secondary border-none rounded-xl"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "grid w-full grid-cols-2 bg-transparent p-0 border-b border-transparent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "chats",
									className: "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3",
									children: "Conversas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "calls",
									className: "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3",
									children: "Chamadas"
								})]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "chats",
					className: "mt-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 pt-2 space-y-2",
						children: mockChats.map((chat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "border-none shadow-none bg-transparent hover:bg-secondary/30 transition-colors cursor-pointer rounded-xl",
							onClick: () => navigate(`/messages/${chat.id}`),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-3 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
										className: "h-12 w-12 border border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: chat.user.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: chat.user.name[0] })]
									}), chat.user.online && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-baseline mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-semibold text-sm truncate",
											children: chat.user.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground",
											children: chat.time
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground truncate pr-2",
											children: chat.lastMessage
										}), chat.unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: "h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] shadow-sm",
											children: chat.unread
										})]
									})]
								})]
							})
						}, chat.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "calls",
					className: "mt-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CallHistory, {})
				})
			]
		})
	});
}
export { MessagesList as default };

//# sourceMappingURL=MessagesList-DBJ2cEuU.js.map