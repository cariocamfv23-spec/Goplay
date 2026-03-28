import { An as TrendingUp, Cr as Clock, Dn as UserPlus, F as useFlashbackStore, Fr as Baby, I as useNotificationStore_default, Jn as MessageSquare, Lr as ArrowLeft, Nn as Target, Pr as Bell, R as Badge, Sr as CloudLightning, Vn as ShieldCheck, Xn as Megaphone, Yn as MessageCircle, an as Button, bn as cn, br as Crown, cr as Handshake, en as Avatar, jn as TrendingDown, jr as Calendar, kn as Trophy, li as require_jsx_runtime, nn as AvatarImage, or as History, si as useNavigate, sr as Heart, tn as AvatarFallback, ur as GraduationCap, vr as Eye, xn as Zap } from "./index-CmViBNnK.js";
var import_jsx_runtime = require_jsx_runtime();
function Notifications() {
	const navigate = useNavigate();
	const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotificationStore_default();
	const { openFlashback } = useFlashbackStore();
	const isVipAlert = (title, message = "") => {
		const text = (title + " " + message).toLowerCase();
		return text.includes("vip") || text.includes("scout") || text.includes("sponsor") || text.includes("olheiro") || text.includes("patrocinador");
	};
	const getIcon = (type, title = "", message = "") => {
		switch (type) {
			case "challenge": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-5 w-5 text-gold" });
			case "invite": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-5 w-5 text-blue-500" });
			case "like": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5 text-red-500" });
			case "weather": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudLightning, { className: "h-5 w-5 text-yellow-500" });
			case "scholarship": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-5 w-5 text-emerald-500" });
			case "level_up": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5 text-purple-500" });
			case "ranking":
				if (title.toLowerCase().includes("caiu") || title.toLowerCase().includes("desceu")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-5 w-5 text-orange-500" });
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-green-500" });
			case "event_reminder": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-5 w-5 text-orange-500" });
			case "goal_deadline": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-5 w-5 text-red-500" });
			case "verification":
				if (title.toLowerCase().includes("scout") || title.toLowerCase().includes("olheiro")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-5 w-5 text-blue-500" });
				if (title.toLowerCase().includes("sponsor") || title.toLowerCase().includes("patrocinador")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handshake, { className: "h-5 w-5 text-emerald-500" });
				if (isVipAlert(title, message)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-5 w-5 text-gold" });
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-blue-600" });
			case "sponsorship_match": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handshake, { className: "h-5 w-5 text-indigo-500" });
			case "kids_zone": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Baby, { className: "h-5 w-5 text-pink-500" });
			case "comment": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-5 w-5 text-blue-500" });
			case "thread_comment": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-5 w-5 text-blue-500" });
			case "system_update": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "h-5 w-5 text-primary" });
			case "memory":
			case "time_travel": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-5 w-5 text-purple-500" });
			case "friend_suggestion": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-5 w-5 text-pink-500" });
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5 text-primary" });
		}
	};
	const getPriorityStyle = (priority, title = "", message = "", type) => {
		if (type === "friend_suggestion") return "border-l-4 border-l-pink-500 bg-pink-500/10 dark:bg-pink-900/20";
		if (type === "memory" || type === "time_travel") return "border-l-4 border-l-purple-500 bg-purple-500/10 dark:bg-purple-900/20";
		if (priority === "critical") return "border-l-4 border-l-red-500 bg-red-500/10 dark:bg-red-900/20";
		if (isVipAlert(title, message)) {
			if (title.toLowerCase().includes("scout") || title.toLowerCase().includes("olheiro")) return "border-l-4 border-l-blue-500 bg-blue-500/10 dark:bg-blue-900/20";
			if (title.toLowerCase().includes("sponsor") || title.toLowerCase().includes("patrocinador")) return "border-l-4 border-l-emerald-500 bg-emerald-500/10 dark:bg-emerald-900/20";
			return "border-l-4 border-l-gold bg-gold/10 dark:bg-gold/10";
		}
		if (priority === "high") return "border-l-4 border-l-green-500 bg-green-500/10 dark:bg-green-900/20";
		return "hover:bg-secondary/30";
	};
	const handleNotificationClick = (not) => {
		if (!not.read) markAsRead(not.id);
		if (not.type === "time_travel" || not.type === "memory") {
			openFlashback(not.link?.replace("modal:", "")?.replace("/memory/", "") || "today");
			return;
		}
		if (not.link) navigate(not.link);
		else if (not.type === "friend_suggestion") navigate(`/profile/${not.suggestedUserId || not.id || "new-friend"}`);
	};
	const groupedNotifications = notifications.reduce((acc, not) => {
		const date = not.date || "Anteriores";
		if (!acc[date]) acc[date] = [];
		acc[date].push(not);
		return acc;
	}, {});
	const hasNotifications = notifications.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 bg-background/80 backdrop-blur-md z-20 p-4 border-b border-border/50 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "rounded-full hover:bg-secondary/80",
					onClick: () => navigate(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold",
					children: "Notificações"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2",
				children: unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					className: "text-primary text-xs h-8 px-2",
					onClick: markAllAsRead,
					children: "Marcar todas como lidas"
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4 space-y-6",
			children: hasNotifications ? Object.entries(groupedNotifications).map(([date, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold text-muted-foreground px-1 uppercase tracking-wide",
					children: date === "Anteriores" ? "Anteriores" : date
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: items.map((not) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("p-4 rounded-xl flex gap-4 transition-all relative overflow-hidden border border-border/30 shadow-sm", not.type === "friend_suggestion" && "items-center", not.read ? "bg-card opacity-90" : "bg-card ring-1 ring-primary/20 shadow-md", getPriorityStyle(not.priority, not.title, not.message, not.type), (not.link || not.type === "time_travel" || not.type === "memory" || not.type === "friend_suggestion") && "cursor-pointer active:scale-[0.98]"),
						onClick: () => handleNotificationClick(not),
						children: [
							not.user || not.imageUrl || not.avatarUrl || not.type === "friend_suggestion" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("relative shrink-0", not.type !== "friend_suggestion" && "mt-1"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
										className: cn("ring-2 ring-offset-2 ring-offset-background", not.type === "friend_suggestion" ? "h-14 w-14 ring-pink-500" : "h-10 w-10", not.type === "live_stream" ? not.link?.includes("/replay/") ? "ring-primary" : "ring-red-500" : not.type !== "friend_suggestion" && "ring-transparent border border-border"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: not.user?.avatar || not.avatarUrl || not.imageUrl || `https://img.usecurling.com/ppl/thumbnail?seed=${not.id}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: (not.user?.name || not.title || "U").substring(0, 2).toUpperCase() })]
									}),
									not.type === "live_stream" && !not.link?.includes("/replay/") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-1 -right-1 h-3 w-3 bg-red-500 border-2 border-background rounded-full animate-pulse" }),
									not.type === "comment" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute -bottom-1 -right-1 h-4 w-4 bg-blue-500 border-2 border-background rounded-full flex items-center justify-center shadow-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-2 w-2 text-white" })
									}),
									not.type === "thread_comment" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute -bottom-1 -right-1 h-4 w-4 bg-blue-500 border-2 border-background rounded-full flex items-center justify-center shadow-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-2 w-2 text-white" })
									}),
									not.type === "friend_suggestion" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute bottom-0 -right-1 h-5 w-5 bg-pink-500 border-2 border-background rounded-full flex items-center justify-center shadow-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-3 w-3 text-white" })
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("mt-1 h-10 w-10 rounded-full flex items-center justify-center shrink-0 border border-border/50", not.read ? "bg-secondary/50" : "bg-secondary", isVipAlert(not.title, not.message) && "bg-gold/10 border-gold/30", (not.title.toLowerCase().includes("scout") || not.title.toLowerCase().includes("olheiro")) && "bg-blue-500/10 border-blue-500/30", (not.title.toLowerCase().includes("sponsor") || not.title.toLowerCase().includes("patrocinador")) && "bg-emerald-500/10 border-emerald-500/30", not.type === "system_update" && "bg-primary/10 border-primary/30", (not.type === "memory" || not.type === "time_travel") && "bg-purple-500/10 border-purple-500/30", not.type === "friend_suggestion" && "bg-pink-500/10 border-pink-500/30"),
								children: getIcon(not.type, not.title, not.message)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0 pr-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-between items-start gap-2 mb-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: cn("font-bold text-sm leading-tight", not.read ? "text-foreground/80" : "text-foreground", not.priority === "critical" && "text-red-600 dark:text-red-400", isVipAlert(not.title, not.message) && "text-gold", (not.title.toLowerCase().includes("scout") || not.title.toLowerCase().includes("olheiro")) && "text-blue-600 dark:text-blue-400", (not.title.toLowerCase().includes("sponsor") || not.title.toLowerCase().includes("patrocinador")) && "text-emerald-600 dark:text-emerald-400", not.type === "live_stream" && !not.link?.includes("/replay/") && "text-red-500", (not.type === "memory" || not.type === "time_travel") && "text-purple-600 dark:text-purple-400"),
											children: not.title
										})
									}),
									not.type === "friend_suggestion" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-pink-500 mb-0.5 uppercase tracking-wider",
										children: "Sugestão de Amizade"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground leading-snug line-clamp-2",
										children: not.message
									}),
									not.type === "live_stream" && not.link?.includes("/replay/") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "secondary",
											className: "h-5 text-[10px] px-1.5 border-0 bg-secondary/50",
											children: "REPLAY"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-primary font-bold",
											children: "Assistir Replay"
										})]
									}) : not.type === "live_stream" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "destructive",
											className: "h-5 text-[10px] px-1.5 animate-pulse border-0",
											children: "AO VIVO"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-primary font-bold",
											children: "Assistir Agora"
										})]
									}),
									not.type === "friend_suggestion" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											className: "h-8 rounded-full flex-1 bg-pink-500 hover:bg-pink-600 text-xs text-white border-0 shadow-sm shadow-pink-500/20",
											children: "Ver Perfil"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground/70 font-medium ml-2",
											children: not.time
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground/70 font-medium",
											children: not.time
										}), not.priority && not.priority !== "low" && not.type !== "live_stream" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: cn("text-[10px] h-5 px-1.5 font-normal border-0", not.type === "memory" || not.type === "time_travel" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300" : not.priority === "critical" ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" : isVipAlert(not.title, not.message) ? "bg-gold/20 text-gold border-gold/30" : not.priority === "high" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"),
											children: not.type === "memory" || not.type === "time_travel" ? "Flashback" : not.priority === "critical" ? "Urgente" : isVipAlert(not.title, not.message) ? "VIP" : not.priority === "high" ? "Importante" : "Info"
										})]
									})
								]
							}),
							!not.read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-primary" })
						]
					}, not.id))
				})]
			}, date)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-24 w-24 rounded-full bg-secondary/50 flex items-center justify-center mb-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-10 w-10 text-muted-foreground/40" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold mb-2",
						children: "Tudo limpo por aqui!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground max-w-[250px]",
						children: "Você não tem notificações no momento."
					})
				]
			})
		})]
	});
}
export { Notifications as default };

//# sourceMappingURL=Notifications-5xPkgbKC.js.map