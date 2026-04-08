import { t as ChevronLeft } from "./chevron-left-CDkx7U9m.js";
import { Er as ChevronRight, Mt as mockUser, Q as mockDailyMemories, Sn as X, an as Button, bn as cn, ci as useParams, di as require_react, en as Avatar, li as require_jsx_runtime, nn as AvatarImage, or as History, si as useNavigate, tn as AvatarFallback } from "./index-BcKbICQl.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function MemoryViewer() {
	const { id } = useParams();
	const navigate = useNavigate();
	const memoryData = mockDailyMemories[id];
	const [currentIndex, setCurrentIndex] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!memoryData) navigate("/");
	}, [memoryData, navigate]);
	if (!memoryData) return null;
	const items = memoryData.items;
	const currentItem = items[currentIndex];
	const nextMemory = () => {
		if (currentIndex < items.length - 1) setCurrentIndex((prev) => prev + 1);
		else navigate(-1);
	};
	const prevMemory = () => {
		if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[200] bg-black text-white overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 z-0",
				children: [currentItem.type === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full h-full bg-zinc-900" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: currentItem.url,
					alt: "Memory Background",
					className: "w-full h-full object-cover blur-3xl opacity-30"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-20 flex items-center justify-between p-5 pt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						className: "h-10 w-10 border border-white/20 shadow-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: mockUser.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: "EU" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-sm tracking-tight drop-shadow-md",
							children: "Goplay Memory"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-xs text-white/80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: currentItem.date })]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md",
					onClick: () => navigate(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-20 flex gap-1.5 px-4 mb-2",
				children: items.map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1 flex-1 rounded-full overflow-hidden bg-white/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("h-full bg-white transition-all duration-300", idx < currentIndex ? "w-full" : idx === currentIndex ? "w-full animate-[progress_5s_linear]" : "w-0"),
						style: idx === currentIndex ? { animationPlayState: "running" } : void 0,
						onAnimationEnd: () => {
							if (idx === currentIndex) nextMemory();
						}
					})
				}, idx))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex-1 flex items-center justify-center w-full px-2 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full max-w-sm aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-sm",
						children: [
							currentItem.type === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
								src: currentItem.url,
								className: "w-full h-full object-cover",
								autoPlay: true,
								loop: true,
								muted: true,
								playsInline: true
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: currentItem.url,
								alt: "Memory Content",
								className: "w-full h-full object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-4 left-4 z-30",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center gap-2 shadow-lg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex h-2 w-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-2 w-2 rounded-full bg-purple-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-purple-500" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-bold uppercase tracking-wider text-white",
										children: [
											"Há ",
											currentItem.yearsAgo,
											" ano",
											currentItem.yearsAgo > 1 ? "s" : ""
										]
									})]
								})
							}),
							currentItem.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-30",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-white font-medium text-sm drop-shadow-md leading-relaxed",
									children: currentItem.caption
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-y-0 left-0 w-1/3 z-40",
						onClick: prevMemory
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-y-0 right-0 w-1/3 z-40",
						onClick: nextMemory
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-20 pb-8 pt-4 flex justify-center items-center gap-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: prevMemory,
						disabled: currentIndex === 0,
						className: "rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-medium text-white/50 tracking-widest uppercase",
						children: "Toque para navegar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: nextMemory,
						className: "rounded-full bg-white/5 hover:bg-white/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-6 w-6" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      ` })
		]
	});
}
export { MemoryViewer as default };

//# sourceMappingURL=MemoryViewer-iUbvOWoX.js.map