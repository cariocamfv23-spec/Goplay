import { t as FileText } from "./file-text-BeJUlRFb.js";
import { t as LockOpen } from "./lock-open-6N3owZ7E.js";
import { t as Plus } from "./plus-Bk-y-q7r.js";
import { t as Video } from "./video-CHRlDacx.js";
import { Hn as Lock, Kr as useNavigate, Sr as ArrowLeft, Tr as createLucideIcon, Yr as require_react, Zt as Button, dn as cn, gr as Calendar, ln as toast, zr as require_jsx_runtime } from "./index-CU7avrqi.js";
import { n as CardContent, t as Card } from "./card-Bf_SgjqI.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-iTPnU0lQ.js";
import { t as ptBR } from "./pt-BR-BJdaBO5r.js";
import { t as format } from "./format-CDsTDPw2.js";
import { t as formatDistanceToNow } from "./formatDistanceToNow-Bz9o3R6i.js";
import { t as useTimeCapsuleStore } from "./useTimeCapsuleStore-DfVzoPfC.js";
var Archive = createLucideIcon("archive", [
	["rect", {
		width: "20",
		height: "5",
		x: "2",
		y: "3",
		rx: "1",
		key: "1wp1u1"
	}],
	["path", {
		d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",
		key: "1s80jp"
	}],
	["path", {
		d: "M10 12h4",
		key: "a56b0p"
	}]
]);
var Hourglass = createLucideIcon("hourglass", [
	["path", {
		d: "M5 22h14",
		key: "ehvnwv"
	}],
	["path", {
		d: "M5 2h14",
		key: "pdyrp9"
	}],
	["path", {
		d: "M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22",
		key: "1d314k"
	}],
	["path", {
		d: "M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2",
		key: "1vvvr6"
	}]
]);
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function TimeCapsuleDashboard() {
	const navigate = useNavigate();
	const { capsules, checkReleases, archiveCapsule } = useTimeCapsuleStore();
	const [activeTab, setActiveTab] = (0, import_react.useState)("sealed");
	(0, import_react.useEffect)(() => {
		checkReleases();
	}, [checkReleases]);
	const sealed = capsules.filter((c) => c.status === "sealed");
	const waiting = capsules.filter((c) => c.status === "waiting");
	const released = capsules.filter((c) => c.status === "released");
	const handleArchive = (id, e) => {
		e.stopPropagation();
		archiveCapsule(id);
		toast.success("Cápsula arquivada com sucesso.");
	};
	const renderCapsuleCard = (capsule) => {
		const isReleased = capsule.status === "released";
		const isWaiting = capsule.status === "waiting";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: cn("mb-4 overflow-hidden transition-all duration-300 group", isReleased ? "cursor-pointer hover:border-gold/50 bg-gradient-to-br from-card to-gold/5" : "opacity-90"),
			onClick: () => {
				if (isReleased) navigate(`/timecapsule/${capsule.id}`);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("p-2 rounded-lg flex items-center justify-center", isReleased ? "bg-gold/20 text-gold" : isWaiting ? "bg-orange-500/20 text-orange-500" : "bg-primary/20 text-foreground"),
								children: capsule.type === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "w-5 h-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-5 h-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: cn("font-bold text-base line-clamp-1", isReleased ? "text-gold" : "text-foreground"),
								children: capsule.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1 font-medium",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-3 h-3" }),
									" Criada em",
									" ",
									format(new Date(capsule.createdAt), "dd/MM/yyyy", { locale: ptBR })
								]
							})] })]
						}), !isReleased && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "h-8 w-8 text-muted-foreground hover:text-red-400 -mr-2 -mt-2 z-10",
							onClick: (e) => handleArchive(capsule.id, e),
							title: "Arquivar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "w-4 h-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-700 dark:text-slate-200 line-clamp-2 mb-4 font-medium",
						children: capsule.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex items-center justify-between p-3 rounded-xl border", isReleased ? "bg-gold/10 border-gold/20" : isWaiting ? "bg-orange-500/10 border-orange-500/20" : "bg-primary/10 border-primary/30"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [isReleased ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "w-4 h-4 text-gold" }) : isWaiting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hourglass, { className: "w-4 h-4 text-orange-500 animate-pulse" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4 text-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("text-xs font-bold uppercase tracking-wider", isReleased ? "text-gold" : isWaiting ? "text-orange-500" : "text-foreground"),
								children: isReleased ? "Liberada" : isWaiting ? "Quase lá" : "Selada"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-bold bg-background/90 px-3 py-1.5 rounded shadow-sm border border-border/50 text-foreground",
							children: isReleased ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Aberta",
								" ",
								formatDistanceToNow(new Date(capsule.openAt), {
									locale: ptBR,
									addSuffix: true
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Abre em",
								" ",
								formatDistanceToNow(new Date(capsule.openAt), { locale: ptBR })
							] })
						})]
					})
				]
			})
		}, capsule.id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col animate-fade-in relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-primary/5 border-b border-primary/10 p-4 pt-6 pb-6 text-center relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "absolute left-4 top-5",
						onClick: () => navigate("/profile/me"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-8 h-8 text-gold mx-auto mb-2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-black text-foreground uppercase tracking-tight",
						children: "Time Capsule™"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-600 dark:text-slate-300 mt-1 font-medium",
						children: "Suas metas guardadas no tempo"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 p-4 pb-24 z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					value: activeTab,
					onValueChange: setActiveTab,
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid w-full grid-cols-3 mb-6 bg-secondary/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "sealed",
									className: "text-xs font-bold data-[state=active]:text-foreground data-[state=active]:bg-background",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-3 h-3 mr-1" }), " Seladas"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "waiting",
									className: "text-xs font-bold data-[state=active]:text-foreground data-[state=active]:bg-background relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hourglass, { className: "w-3 h-3 mr-1" }),
										" Quase lá",
										waiting.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500 animate-pulse" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "released",
									className: "text-xs font-bold data-[state=active]:text-foreground data-[state=active]:bg-background relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "w-3 h-3 mr-1" }),
										" Liberadas",
										released.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1 right-1 w-2 h-2 rounded-full bg-gold" })
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "sealed",
							className: "mt-0",
							children: sealed.length > 0 ? sealed.map(renderCapsuleCard) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center py-12 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-12 h-12 mx-auto mb-3 opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Nenhuma cápsula selada no momento." })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "waiting",
							className: "mt-0",
							children: waiting.length > 0 ? waiting.map(renderCapsuleCard) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center py-12 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hourglass, { className: "w-12 h-12 mx-auto mb-3 opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Nenhuma cápsula próxima da abertura." })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "released",
							className: "mt-0",
							children: released.length > 0 ? released.map(renderCapsuleCard) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center py-12 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "w-12 h-12 mx-auto mb-3 opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Nenhuma cápsula liberada ainda." })]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "fixed bottom-6 right-4 h-14 w-14 rounded-full shadow-[0_0_20px_rgba(var(--gold),0.3)] z-40 bg-gold hover:bg-gold/90 text-black animate-in zoom-in duration-300",
				onClick: () => navigate("/timecapsule/create"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-6 w-6" })
			})
		]
	});
}
export { TimeCapsuleDashboard as default };

//# sourceMappingURL=TimeCapsuleDashboard-D0f_SLMZ.js.map