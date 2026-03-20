import { Gn as Heart, Gr as useNavigate, Jn as GraduationCap, Jt as AvatarImage, Kn as Handshake, Kt as Avatar, M as useNotificationStore_default, N as Badge, Rr as require_jsx_runtime, Zt as Button, _n as Trophy, dn as Zap, hr as Calendar, ir as Crown, kn as ShieldCheck, or as CloudLightning, qt as AvatarFallback, sr as Clock, un as cn, vn as TrendingUp, vr as Bell, xn as Target, xr as ArrowLeft, yn as TrendingDown, yr as Baby } from "./index-BAKyNRbD.js";
var import_jsx_runtime = require_jsx_runtime();
function Notifications() {
	const navigate = useNavigate();
	const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotificationStore_default();
	const getIcon = (type, title = "") => {
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
				if (title.toLowerCase().includes("vip")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-5 w-5 text-gold" });
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-blue-600" });
			case "sponsorship_match": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handshake, { className: "h-5 w-5 text-indigo-500" });
			case "kids_zone": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Baby, { className: "h-5 w-5 text-pink-500" });
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5 text-primary" });
		}
	};
	const getPriorityStyle = (priority, title = "") => {
		if (priority === "critical") return "border-l-4 border-l-red-500 bg-red-500/10 dark:bg-red-900/20";
		if (priority === "high" && title.toLowerCase().includes("vip")) return "border-l-4 border-l-gold bg-gold/10 dark:bg-gold/10";
		if (priority === "high") return "border-l-4 border-l-green-500 bg-green-500/10 dark:bg-green-900/20";
		return "hover:bg-secondary/30";
	};
	const handleNotificationClick = (not) => {
		if (!not.read) markAsRead(not.id);
		if (not.link) navigate(not.link);
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
			}), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				className: "text-primary text-xs h-8 px-2",
				onClick: markAllAsRead,
				children: "Marcar todas como lidas"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4 space-y-6",
			children: hasNotifications ? Object.entries(groupedNotifications).map(([date, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold text-muted-foreground px-1 uppercase tracking-wide",
					children: date
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: items.map((not) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("p-4 rounded-xl flex gap-4 transition-all relative overflow-hidden border border-border/30 shadow-sm", not.read ? "bg-card opacity-90" : "bg-card ring-1 ring-primary/20 shadow-md", getPriorityStyle(not.priority, not.title), not.link && "cursor-pointer active:scale-[0.98]"),
						onClick: () => handleNotificationClick(not),
						children: [
							not.type === "live_stream" && not.user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative shrink-0 mt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
									className: cn("h-10 w-10 ring-2 ring-offset-2 ring-offset-background", not.link?.includes("/replay/") ? "ring-primary" : "ring-red-500"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: not.user.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: not.user.name.substring(0, 2).toUpperCase() })]
								}), !not.link?.includes("/replay/") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-1 -right-1 h-3 w-3 bg-red-500 border-2 border-background rounded-full animate-pulse" })]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("mt-1 h-10 w-10 rounded-full flex items-center justify-center shrink-0 border border-border/50", not.read ? "bg-secondary/50" : "bg-secondary", not.title.toLowerCase().includes("vip") && "bg-gold/10 border-gold/30"),
								children: getIcon(not.type, not.title)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0 pr-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-between items-start gap-2 mb-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: cn("font-bold text-sm leading-tight", not.read ? "text-foreground/80" : "text-foreground", not.priority === "critical" && "text-red-600 dark:text-red-400", not.title.toLowerCase().includes("vip") && "text-gold", not.type === "live_stream" && !not.link?.includes("/replay/") && "text-red-500"),
											children: not.title
										})
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
											children: "LIVE"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-primary font-bold",
											children: "Assistir Agora"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground/70 font-medium",
											children: not.time
										}), not.priority && not.priority !== "low" && not.type !== "live_stream" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: cn("text-[10px] h-5 px-1.5 font-normal border-0", not.priority === "critical" ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" : not.title.toLowerCase().includes("vip") ? "bg-gold/20 text-gold border-gold/30" : not.priority === "high" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"),
											children: not.priority === "critical" ? "Urgente" : not.title.toLowerCase().includes("vip") ? "Destaque" : not.priority === "high" ? "Importante" : "Info"
										})]
									})
								]
							}),
							!not.read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-4 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-primary" })
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

//# sourceMappingURL=Notifications-19c4LECc.js.map