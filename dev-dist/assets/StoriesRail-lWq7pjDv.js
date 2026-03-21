import { t as Flame } from "./flame-B_zCxbLX.js";
import { t as Plus } from "./plus-D3VEOBew.js";
import { t as Radio } from "./radio-CiO3n9tj.js";
import { t as Send } from "./send-BfQgag7Y.js";
import { G as mockCurrentUser, Gn as Heart, Gt as Avatar, Kt as AvatarFallback, Lr as require_jsx_runtime, N as ScrollArea, P as ScrollBar, Qr as __toESM, Wr as useNavigate, Xt as Button, _n as Trophy, bt as mockStories, c as DialogContent, fn as X, o as Dialog, qr as require_react, qt as AvatarImage, tr as Eye, un as cn } from "./index-YiRCBu0v.js";
import { t as Input } from "./input-BkczHjKx.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function SportSeparator3D({ sport, className, index = 0 }) {
	const config = (0, import_react.useMemo)(() => {
		if (!sport) return null;
		const s = sport.toLowerCase();
		if (s.includes("futebol") || s.includes("soccer")) return {
			query: "soccer-ball",
			color: "multicolor"
		};
		if (s.includes("bike") || s.includes("cycl")) return {
			query: "bicycle",
			color: "multicolor"
		};
		if (s.includes("box") || s.includes("fight")) return {
			query: "boxing-glove",
			color: "multicolor"
		};
		if (s.includes("jiu") || s.includes("judo") || s.includes("bjj") || s.includes("martial")) return {
			query: "kimono",
			color: "multicolor"
		};
		if (s.includes("gym") || s.includes("crossfit") || s.includes("muscul")) return {
			query: "dumbbell",
			color: "multicolor"
		};
		if (s.includes("run") || s.includes("corri")) return {
			query: "running-shoe",
			color: "multicolor"
		};
		if (s.includes("tenis") || s.includes("tennis")) return {
			query: "tennis-ball",
			color: "multicolor"
		};
		if (s.includes("basket") || s.includes("basquete")) return {
			query: "basketball",
			color: "multicolor"
		};
		if (s.includes("volei") || s.includes("volley")) return {
			query: "volleyball",
			color: "multicolor"
		};
		if (s.includes("swim") || s.includes("nata")) return {
			query: "swimming-goggles",
			color: "multicolor"
		};
		if (s.includes("skate")) return {
			query: "skateboard",
			color: "multicolor"
		};
		if (s.includes("surf")) return {
			query: "surfboard",
			color: "multicolor"
		};
		return {
			query: "trophy",
			color: "multicolor"
		};
	}, [sport]);
	const animationClass = (0, import_react.useMemo)(() => {
		const animations = [
			"animate-float",
			"animate-wiggle-slow",
			"animate-hover-3d",
			"animate-pulse-slow"
		];
		return animations[index % animations.length];
	}, [index]);
	if (!sport || !config) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col justify-center h-full pb-4 opacity-30 pointer-events-none select-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 rounded-full bg-muted-foreground/50" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col justify-center h-full pb-3 select-none pointer-events-none relative z-10", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("relative w-7 h-7 flex items-center justify-center transition-transform will-change-transform", animationClass),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: `https://img.usecurling.com/i?q=${encodeURIComponent(config.query)}&color=${config.color}`,
				alt: sport,
				className: "w-full h-full object-contain drop-shadow-sm filter contrast-[1.05] saturate-[1.15] scale-90",
				loading: "lazy"
			})
		})
	});
}
var commentsData = [
	{
		id: 1,
		user: "alex_silva",
		text: "Que jogada incrível! 🔥",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1"
	},
	{
		id: 2,
		user: "mari.sports",
		text: "Vai timeeee!! Pra cima deles!",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=female&seed=12"
	},
	{
		id: 3,
		user: "carlos_edu",
		text: "O passe foi genial.",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=45"
	},
	{
		id: 4,
		user: "lucas_mendes",
		text: "Alguém sabe quanto tá o placar?",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=34"
	},
	{
		id: 5,
		user: "bia_lima",
		text: "Golaçoooo ⚽⚽⚽",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=female&seed=23"
	},
	{
		id: 6,
		user: "pedro_santos",
		text: "Defesa espetacular!!!",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=67"
	},
	{
		id: 7,
		user: "julia_costa",
		text: "Tô acompanhando daqui de casa",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=female&seed=120"
	}
];
function LiveStoryModal({ open, onOpenChange }) {
	const [visibleComments, setVisibleComments] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (open) {
			let i = 0;
			setVisibleComments([commentsData[0]]);
			i++;
			const interval = setInterval(() => {
				if (i < commentsData.length) {
					setVisibleComments((prev) => [...prev, commentsData[i]]);
					i++;
				} else clearInterval(interval);
			}, 2e3);
			return () => {
				clearInterval(interval);
				setVisibleComments([]);
			};
		}
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "max-w-none w-screen h-[100dvh] p-0 border-none rounded-none bg-black overflow-hidden sm:max-w-[400px] sm:h-[800px] sm:rounded-[40px] sm:m-auto [&>button]:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full h-full flex flex-col justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "https://img.usecurling.com/p/800/1600?q=soccer%20match%20live&color=black&dpr=2",
						alt: "Live Stream",
						className: "absolute inset-0 w-full h-full object-cover opacity-90"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 flex items-start justify-between p-4 pt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "w-10 h-10 border border-white/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: "https://img.usecurling.com/ppl/medium?gender=male&seed=999" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: "TV" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white font-bold text-sm leading-tight drop-shadow-md",
									children: "Goplay TV"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white/80 text-xs leading-tight drop-shadow-md",
									children: "Final Regional"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full pr-3 pl-1 py-1 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1.5 animate-pulse",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 bg-white rounded-full" }), "AO VIVO"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 text-white text-xs font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5" }), "2.4k"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md",
								onClick: () => onOpenChange(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 flex flex-col justify-end p-4 pb-8 h-[60%]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute right-4 bottom-20 flex flex-col items-center gap-1 pointer-events-none w-10 h-48 overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute bottom-0 text-red-500 animate-float-up-fade animation-delay-100",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-6 h-6 fill-current" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute bottom-0 text-orange-500 animate-float-up-fade animation-delay-500",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-6 h-6 fill-current" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute bottom-0 text-yellow-400 animate-float-up-fade animation-delay-1000",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-6 h-6 fill-current" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute bottom-0 text-red-500 animate-float-up-fade animation-delay-1500",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-5 h-5 fill-current" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute bottom-0 text-orange-500 animate-float-up-fade animation-delay-2000",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-5 h-5 fill-current" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 overflow-hidden relative w-[85%] mask-gradient-to-t",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute bottom-0 w-full flex flex-col gap-3 pb-2",
									children: visibleComments.map((comment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-2 animate-in slide-in-from-bottom-2 fade-in duration-300",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
											className: "w-7 h-7 border border-white/10 shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: comment.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: comment.user[0] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-2xl rounded-tl-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-bold text-white/70",
												children: comment.user
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-white drop-shadow-sm",
												children: comment.text
											})]
										})]
									}, comment.id))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative flex-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Comentar...",
											className: "bg-black/40 backdrop-blur-md border-white/20 text-white placeholder:text-white/60 rounded-full h-10 focus-visible:ring-white/30"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										className: "rounded-full h-10 w-10 shrink-0 bg-gradient-to-r from-primary to-purple-600 border-none shadow-lg",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-4 h-4 text-white" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										className: "rounded-full h-10 w-10 shrink-0 bg-black/40 backdrop-blur-md text-white hover:bg-black/60 border border-white/10",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-5 h-5" })
									})
								]
							})
						]
					})
				]
			})
		})
	});
}
function StoriesRail() {
	const [liveStoryOpen, setLiveStoryOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full py-4 relative z-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveStoryModal, {
			open: liveStoryOpen,
			onOpenChange: setLiveStoryOpen
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollArea, {
			className: "w-full whitespace-nowrap",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-max items-center gap-2 px-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-1.5 cursor-pointer group pl-2 transition-transform hover:scale-105 active:scale-95 duration-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "w-16 h-16 border-2 border-dashed border-muted-foreground/30 p-0.5 group-hover:border-primary transition-colors shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
									src: mockCurrentUser.avatar,
									className: "rounded-full opacity-80"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: "EU" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 border-2 border-background shadow-md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3 h-3" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-medium text-muted-foreground",
							children: "Seu Story"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-1.5 cursor-pointer group hover:-translate-y-1 transition-transform duration-300 ml-1",
						onClick: () => navigate("/live/broadcast"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative rounded-full p-[2px] bg-gradient-to-tr from-rose-500 to-red-600 group-hover:scale-105 shadow-sm group-hover:shadow-lg transition-all duration-300 ring-2 ring-background flex items-center justify-center w-[68px] h-[68px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-background rounded-full w-full h-full flex items-center justify-center border-2 border-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "w-6 h-6 text-red-500 animate-pulse" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm border border-background whitespace-nowrap shadow-sm",
								children: "TRANSMITIR"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-bold text-foreground transition-colors truncate mt-1",
							children: "Go Live"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-1.5 cursor-pointer group hover:-translate-y-1 transition-transform duration-300 ml-1",
						onClick: () => setLiveStoryOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative rounded-full p-[2px] bg-red-500 group-hover:scale-105 shadow-sm group-hover:shadow-lg transition-all duration-300 ring-2 ring-background",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "w-16 h-16 border-2 border-background",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: "https://img.usecurling.com/ppl/medium?gender=male&seed=999" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: "TV" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm border border-background animate-pulse whitespace-nowrap shadow-sm",
								children: "AO VIVO"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-bold text-red-500 transition-colors truncate max-w-[64px] mt-1",
							children: "Goplay TV"
						})]
					}),
					mockStories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SportSeparator3D, {
						sport: mockStories[0].user.sport,
						index: 0,
						className: "mx-1"
					}),
					mockStories.map((story, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-1.5 cursor-pointer group hover:-translate-y-1 transition-transform duration-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("rounded-full p-[2px] transition-all duration-300 group-hover:scale-105 shadow-sm group-hover:shadow-lg", story.viewed ? "bg-muted" : "bg-gradient-to-tr from-primary via-purple-500 to-gold"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "w-16 h-16 border-2 border-background",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: story.user.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: story.user.name[0] })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors truncate max-w-[64px]",
							children: story.user.name
						})]
					}), index < mockStories.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SportSeparator3D, {
						sport: mockStories[index + 1].user.sport,
						index: index + 1,
						className: "mx-1"
					})] }, story.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {
				orientation: "horizontal",
				className: "invisible"
			})]
		})]
	});
}
export { StoriesRail as t };

//# sourceMappingURL=StoriesRail-lWq7pjDv.js.map