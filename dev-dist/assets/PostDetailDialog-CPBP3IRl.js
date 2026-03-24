import { t as Ellipsis } from "./ellipsis-BP8Us5k7.js";
import { t as MessageCircle } from "./message-circle-C4nw_I2h.js";
import { t as Mic } from "./mic-BlHhs2th.js";
import { t as Play } from "./play-vV5wCO8O.js";
import { t as Share2 } from "./share-2-C6UT6mLP.js";
import { t as Volume2 } from "./volume-2-dxqfTkU6.js";
import { t as VolumeX } from "./volume-x-C7tFTGrf.js";
import { $t as Avatar, B as Badge, Jr as require_jsx_runtime, V as ScrollArea, c as DialogClose, en as AvatarFallback, ii as require_react, in as Button, l as DialogContent, p as DialogTitle, s as Dialog, tn as AvatarImage, tr as Heart, xn as X, yn as cn, z as useSoundStore_default } from "./index-Dri2BohY.js";
import { t as Separator } from "./separator-DI3jbLwJ.js";
import { t as useLikeInteraction } from "./useLikeInteraction-B9wmmIbw.js";
import { t as SoundWaveVisualizer } from "./SoundWaveVisualizer-eDaS4D9d.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function PostDetailDialog({ post, open, onOpenChange }) {
	const safePost = post || {};
	const { isLiked, likeCount, handleLike, setIsLiked, setLikeCount } = useLikeInteraction(safePost, safePost.likes || 0, safePost.liked || false);
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const [isMuted, setIsMuted] = (0, import_react.useState)(false);
	const { playNarration } = useSoundStore_default();
	const [isPlayingNarration, setIsPlayingNarration] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (post) {
			setIsLiked(post.liked || false);
			setLikeCount(post.likes || 0);
		}
	}, [
		post,
		setIsLiked,
		setLikeCount
	]);
	(0, import_react.useEffect)(() => {
		if (open && post) {
			if (post.type === "video") setIsPlaying(true);
		} else {
			setIsPlaying(false);
			setIsPlayingNarration(false);
		}
	}, [open, post]);
	if (!post) return null;
	const toggleNarration = () => {
		if (post.narration) if (!isPlayingNarration) {
			playNarration(post.narration);
			setIsPlayingNarration(true);
			setTimeout(() => setIsPlayingNarration(false), 3e3);
		} else setIsPlayingNarration(false);
	};
	const togglePlayback = () => setIsPlaying(!isPlaying);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-5xl p-0 gap-0 overflow-hidden bg-background border-zinc-800 h-[90vh] md:h-[600px] flex flex-col md:flex-row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "sr-only",
					children: "Detalhes do Post"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					className: "absolute right-4 top-4 z-50 rounded-full bg-black/50 p-1 text-white hover:bg-black/70 md:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 bg-black relative flex items-center justify-center overflow-hidden min-h-[40vh]",
					children: [post.type === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full h-full flex items-center justify-center group",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: post.media?.[0],
								alt: "Video content",
								className: cn("w-full h-full object-contain transition-opacity duration-300", isPlaying ? "opacity-100" : "opacity-60")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity", isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 hover:scale-110 transition-transform",
									onClick: togglePlayback,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: cn("h-8 w-8 text-white fill-white ml-1", isPlaying && "opacity-0") })
								})
							}),
							isPlaying && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute bottom-0 left-0 right-0 h-1 bg-white/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full bg-primary animate-[progress_15s_linear_infinite]" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "absolute bottom-4 right-4 text-white hover:bg-white/10 rounded-full",
								onClick: () => setIsMuted(!isMuted),
								children: isMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-5 w-5" })
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: post.media?.[0],
						alt: "Post content",
						className: "w-full h-full object-contain"
					}), post.narration && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-4 left-4 z-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							className: "bg-gold/90 text-black border-none hover:bg-gold gap-1 pl-2 pr-3 py-1.5 cursor-pointer shadow-lg",
							onClick: toggleNarration,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-3 w-3" }), isPlayingNarration ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoundWaveVisualizer, {
								isPlaying: true,
								className: "h-3 w-8",
								barCount: 4
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Narração" })]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full md:w-[400px] flex flex-col bg-background border-l border-zinc-800/10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 flex items-center justify-between border-b border-border/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
									className: "h-9 w-9 border border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: post.user.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: post.user.name?.substring(0, 2) })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold leading-none",
										children: post.user.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted-foreground mt-0.5",
										children: [
											post.user.type,
											" • ",
											post.time
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-5 w-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
							className: "flex-1 p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-bold text-lg mb-1",
											children: post.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm leading-relaxed whitespace-pre-wrap",
											children: post.content
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-1 mt-3",
											children: post.hashtags?.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-primary text-xs font-medium",
												children: tag
											}, tag))
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-semibold text-muted-foreground",
											children: "Comentários"
										}), [
											1,
											2,
											3
										].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
												className: "h-7 w-7",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: `https://img.usecurling.com/ppl/thumbnail?gender=${i % 2 === 0 ? "female" : "male"}&seed=${i + 10}` })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "bg-secondary/30 p-2.5 rounded-lg rounded-tl-none",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-xs font-bold block mb-0.5",
														children: ["Usuário ", i]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs leading-relaxed",
														children: "Incrível! Muito bom ver esse tipo de conteúdo por aqui. 👏"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-3 mt-1 ml-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-muted-foreground font-medium cursor-pointer hover:text-foreground",
														children: "Curtir"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-muted-foreground font-medium cursor-pointer hover:text-foreground",
														children: "Responder"
													})]
												})]
											})]
										}, i))]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 bg-secondary/10 border-t border-border/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-between mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: cn("hover:bg-red-500/10 hover:text-red-500 transition-colors", isLiked ? "text-red-500" : "text-muted-foreground"),
											onClick: handleLike,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("h-6 w-6 transition-transform", isLiked && "fill-current scale-110") })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "text-muted-foreground hover:bg-blue-500/10 hover:text-blue-500 transition-colors",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-6 w-6" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "text-muted-foreground hover:bg-green-500/10 hover:text-green-500 transition-colors",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-6 w-6" })
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold text-sm",
									children: [likeCount.toLocaleString(), " curtidas"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] text-muted-foreground uppercase",
									children: ["Postado ", post.time]
								})]
							})]
						})
					]
				})
			]
		})
	});
}
export { PostDetailDialog as t };

//# sourceMappingURL=PostDetailDialog-CPBP3IRl.js.map