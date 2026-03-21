import { t as MessageCircle } from "./message-circle-Dz8x_b_J.js";
import { t as Minus } from "./minus-YHLckh2h.js";
import { Cn as Swords, Jt as AvatarImage, Kr as useNavigate, Kt as Avatar, N as Badge, Sr as ArrowLeft, Xn as Globe, Zt as Button, ar as Crown, bn as TrendingDown, dn as cn, nt as mockInternationalMatches, qt as AvatarFallback, rt as mockInternationalRanking, vn as Trophy, yn as TrendingUp, zr as require_jsx_runtime } from "./index-GF_UKfZV.js";
import { n as CardContent, t as Card } from "./card-d9rwX2Pq.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DZk7l6ll.js";
var import_jsx_runtime = require_jsx_runtime();
function InternationalMatch() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 flex items-center gap-4 border-b bg-background/95 backdrop-blur sticky top-0 z-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: () => navigate(-1),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-6 w-6" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-bold text-xl flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-5 w-5 text-blue-500" }), " Match Internacional"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-sm text-blue-700 dark:text-blue-300",
				children: "Conecte-se com atletas ao redor do mundo para desafios amistosos e veja sua posição no ranking global."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "matches",
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "grid w-full grid-cols-2 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "matches",
							children: "Encontrar Oponentes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "ranking",
							children: "Ranking Global"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "matches",
						className: "space-y-4 animate-in fade-in",
						children: mockInternationalMatches.map((match) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "h-24 bg-gradient-to-r from-blue-900 to-indigo-900 relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-2 right-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: match.flag,
										alt: match.country,
										className: "w-8 h-6 object-cover rounded shadow-md border border-white/20"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-2 left-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: match.status === "online" ? "default" : "secondary",
										className: cn("text-[10px] uppercase font-bold tracking-wider", match.status === "online" ? "bg-green-500 hover:bg-green-600" : "bg-gray-500/50 text-white"),
										children: match.status
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "pt-0 relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-end -mt-10 mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
											className: "h-20 w-20 border-4 border-background",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: match.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: match.opponentName[0] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: "mb-2 bg-gold text-black hover:bg-gold/90",
											children: match.level
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-bold text-lg",
											children: match.opponentName
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-muted-foreground flex items-center gap-1",
											children: [
												match.country,
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block w-1 h-1 rounded-full bg-muted-foreground/50 mx-1" }),
												match.rating,
												" ★"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											className: "flex-1 gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "h-4 w-4" }), " Desafiar"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											className: "flex-1 gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), " Chat"]
										})]
									})
								]
							})]
						}, match.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "ranking",
						className: "space-y-4 animate-in fade-in",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-gradient-to-br from-gold/20 to-yellow-500/5 p-6 rounded-2xl border border-gold/30 text-center mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-12 w-12 text-gold mx-auto mb-2 drop-shadow-md" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold text-foreground",
									children: "Ranking Mundial"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Os melhores atletas da temporada internacional"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: mockInternationalRanking.map((rank) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("flex items-center gap-4 p-4 rounded-xl border transition-all hover:scale-[1.01] bg-card", rank.position === 1 ? "border-gold/50 shadow-md shadow-gold/5" : "border-border/50"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-lg text-muted-foreground w-8 text-center flex items-center justify-center",
										children: rank.position === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-6 w-6 text-gold fill-gold" }) : `#${rank.position}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
											className: cn("h-12 w-12 border-2", rank.position === 1 ? "border-gold" : "border-transparent"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: rank.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: rank.name[0] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute -bottom-1 -right-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: rank.flag,
												alt: rank.country,
												className: "w-5 h-3.5 object-cover rounded shadow-sm border border-white/50"
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold truncate",
											children: rank.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: rank.country
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold text-primary",
											children: rank.points
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-end text-xs gap-1",
											children: [
												rank.trend === "up" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3 text-green-500" }),
												rank.trend === "down" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-3 w-3 text-red-500" }),
												rank.trend === "same" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3 text-muted-foreground" })
											]
										})]
									})
								]
							}, rank.id))
						})]
					})
				]
			})]
		})]
	});
}
export { InternationalMatch as default };

//# sourceMappingURL=InternationalMatch-CWSy9L9D.js.map