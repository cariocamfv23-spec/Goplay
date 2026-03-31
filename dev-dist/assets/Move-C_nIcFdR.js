import { t as TrainingSuggestions } from "./TrainingSuggestions-D_1yMC-Q.js";
import "./chevron-down-00m86Rqa.js";
import "./circle-alert-DcdaCRQi.js";
import "./ellipsis-BDyEEoop.js";
import { t as ShareDialog } from "./ShareDialog-BxKdbBxd.js";
import { t as LoaderCircle } from "./loader-circle-jWxocW6q.js";
import "./mail-CvrVgcKl.js";
import { t as Music } from "./music-CsByqMmg.js";
import { t as Play } from "./play-CiJWWTT3.js";
import { t as Plus } from "./plus-Bctt6gSU.js";
import "./send-4SQaLmLe.js";
import { t as Share2 } from "./share-2-DhHz8afc.js";
import { t as Volume2 } from "./volume-2-a7F6ocaM.js";
import { t as VolumeX } from "./volume-x-B0IkLp3X.js";
import { B as ScrollBar, Dt as mockStatsHistory, Lt as tribes, Nn as Target, Qn as Map, R as Badge, Sn as X, Yn as MessageCircle, Z as mockCurrentUser, an as Button, bn as cn, di as require_react, en as Avatar, ii as Link, jt as mockTrainingSuggestions, li as require_jsx_runtime, nn as AvatarImage, q as mockAiAnalysis, si as useNavigate, tn as AvatarFallback, vn as toast, w as NostalgiaFilter, xn as Zap, z as ScrollArea, zr as Activity } from "./index-CcX5o6Se.js";
import { n as CardContent, t as Card } from "./card-CpXR7lrW.js";
import "./accordion-BDDFeD4m.js";
import { t as Progress } from "./progress-BZVQjqcZ.js";
import "./input-Cp-9ani6.js";
import { i as DrawerDescription, n as DrawerClose, o as DrawerHeader, r as DrawerContent, s as DrawerTitle, t as Drawer } from "./drawer-DHbKD7gZ.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BpSshx0z.js";
import "./generateCategoricalChart-CGuZZn3p.js";
import { t as StatsRadarChart } from "./StatsRadarChart-CxWdp29K.js";
import "./CartesianGrid-CB3ZF5r6.js";
import "./AreaChart-BatOrecq.js";
import "./chart-YsPVZG9_.js";
import { t as StatsHistoryChart } from "./StatsHistoryChart-DQjjBflr.js";
import "./sheet-CwdcWqz_.js";
import { t as CommentsSheet } from "./CommentsSheet-DO2FgKfn.js";
import { t as useLikeInteraction } from "./useLikeInteraction-JBO-9U0G.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function AiAnalysisDrawer({ open, onOpenChange, data }) {
	if (!data) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, {
			className: "h-[90vh] flex flex-col rounded-t-3xl bg-zinc-950 text-white border-zinc-800",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerHeader, {
				className: "relative text-left px-6 pt-6 pb-2 shrink-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2 mb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "outline",
							className: "bg-primary/10 text-primary border-primary/20 gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3 w-3" }), " AI Skip Analysis"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, {
						className: "text-2xl font-bold",
						children: "Análise de Performance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerDescription, {
						className: "text-zinc-400",
						children: "Detalhamento técnico da sua jogada e pontos de melhoria"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerClose, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "absolute right-4 top-4 bg-zinc-800 rounded-full hover:bg-zinc-700 text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto px-6 pb-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "stats",
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "w-full grid grid-cols-2 mb-6 bg-zinc-900",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "stats",
								className: "data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400",
								children: "Estatísticas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "training",
								className: "data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400",
								children: "O que Melhorar"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "stats",
							className: "space-y-6 animate-fade-in",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between bg-gradient-to-r from-zinc-900 to-zinc-900/50 p-4 rounded-xl border border-zinc-800",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1",
											children: "Score da Jogada"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-4xl font-black text-white",
											children: data.score
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-zinc-500 text-sm font-medium",
											children: "/100"
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-12 w-12 rounded-full border-4 border-primary flex items-center justify-center bg-primary/10",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-6 w-6 text-primary fill-current" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-4",
									children: data.aiStats?.map((stat, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-end",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-semibold flex items-center gap-2 text-zinc-200 text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-3.5 w-3.5 text-primary" }), stat.label]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-primary text-base",
												children: [stat.value, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-zinc-500 font-normal ml-1",
													children: stat.unit
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
											value: stat.value / stat.max * 100,
											className: "h-2 bg-zinc-800"
										})]
									}, index))
								}),
								data.aiStats && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsRadarChart, { stats: data.aiStats })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									className: "bg-zinc-900/50 border-zinc-800 mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										className: "p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
											className: "font-bold mb-2 flex items-center gap-2 text-white text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-4 w-4 text-yellow-500" }), " Insight do Coach AI"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-zinc-400 leading-relaxed",
											children: data.feedback || "Sua técnica está excelente! Continue treinando para melhorar seus resultados."
										})]
									})
								}),
								data.history && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 pt-6 border-t border-zinc-800",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsHistoryChart, { data: data.history })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/profile/stats",
									className: "block mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										className: "w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white",
										children: "Ver Estatísticas Detalhadas"
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "training",
							className: "space-y-4 animate-fade-in",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrainingSuggestions, { suggestions: data.suggestions || [] })
						})
					]
				})
			})]
		})
	});
}
var getEmoji = (modality) => {
	return {
		futebol: "⚽",
		soccer: "⚽",
		futsal: "⚽",
		basquete: "🏀",
		basketball: "🏀",
		volei: "🏐",
		volleyball: "🏐",
		tenis: "🎾",
		tennis: "🎾",
		bike: "🚴",
		cycling: "🚴",
		running: "🏃",
		crossfit: "🏋️",
		swimming: "🏊",
		boxing: "🥊",
		climbing: "🧗",
		martial_arts: "🥋",
		lutas: "🥋",
		skate: "🛹",
		surf: "🏄",
		golf: "⛳",
		baseball: "⚾",
		rugby: "🏉"
	}[modality.toLowerCase().replace("ê", "e").replace("ç", "c")] || "🔥";
};
function SportsReactionButton({ modality, isLiked, likesCount, onLike, className }) {
	const [emoji, setEmoji] = (0, import_react.useState)("🔥");
	(0, import_react.useEffect)(() => {
		setEmoji(getEmoji(modality));
	}, [modality]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-center gap-1", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "icon",
			variant: "ghost",
			className: "h-12 w-12 rounded-full bg-transparent hover:bg-transparent overflow-visible group",
			onClick: onLike,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("text-4xl transition-all duration-300 filter select-none leading-none flex items-center justify-center", isLiked ? "animate-like-bounce opacity-100 scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" : "grayscale opacity-60 scale-100 group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105"),
				role: "img",
				"aria-label": `Like with ${emoji}`,
				children: emoji
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-white text-xs font-bold drop-shadow-md",
			children: likesCount
		})]
	});
}
function VideoCard({ video, isActive }) {
	const videoRef = (0, import_react.useRef)(null);
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const [isMuted, setIsMuted] = (0, import_react.useState)(true);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [showAnalysis, setShowAnalysis] = (0, import_react.useState)(false);
	const [showComments, setShowComments] = (0, import_react.useState)(false);
	const [showShare, setShowShare] = (0, import_react.useState)(false);
	const [isFollowing, setIsFollowing] = (0, import_react.useState)(video.user.isFollowing);
	const { isLiked, likeCount, handleLike } = useLikeInteraction({
		content: video.title,
		hashtags: [video.modality]
	}, video.likes, false);
	(0, import_react.useEffect)(() => {
		if (isActive) {
			const playPromise = videoRef.current?.play();
			if (playPromise !== void 0) playPromise.then(() => {
				setIsPlaying(true);
			}).catch((error) => {
				console.error("Autoplay prevented:", error);
				setIsPlaying(false);
				if (videoRef.current && !videoRef.current.muted) {
					setIsMuted(true);
					videoRef.current.muted = true;
					videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
				}
			});
		} else {
			videoRef.current?.pause();
			setIsPlaying(false);
			if (videoRef.current) videoRef.current.currentTime = 0;
		}
	}, [isActive]);
	(0, import_react.useEffect)(() => {
		if (videoRef.current) videoRef.current.muted = isMuted;
	}, [isMuted]);
	const togglePlay = () => {
		if (videoRef.current) if (isPlaying) {
			videoRef.current.pause();
			setIsPlaying(false);
		} else {
			videoRef.current.play();
			setIsPlaying(true);
		}
	};
	const toggleMute = (e) => {
		e.stopPropagation();
		setIsMuted(!isMuted);
	};
	const handleFollow = (e) => {
		e.stopPropagation();
		setIsFollowing(!isFollowing);
		toast.success(isFollowing ? "Deixou de seguir" : `Você agora segue ${video.user.name}`);
	};
	const handleTimeUpdate = () => {
		if (videoRef.current) setProgress(videoRef.current.currentTime / videoRef.current.duration * 100 || 0);
	};
	const handleLoadStart = () => setIsLoading(true);
	const handleCanPlay = () => setIsLoading(false);
	const handleWaiting = () => setIsLoading(true);
	const handlePlaying = () => {
		setIsLoading(false);
		setIsPlaying(true);
	};
	const enrichedAiData = {
		...mockAiAnalysis,
		score: Math.floor(Math.random() * 23 + 75),
		aiStats: [
			{
				label: "Velocidade",
				value: 28,
				max: 35,
				unit: "km/h"
			},
			{
				label: "Força",
				value: 850,
				max: 1e3,
				unit: "N"
			},
			{
				label: "Técnica",
				value: 92,
				max: 100,
				unit: "pts"
			}
		],
		history: mockStatsHistory.length > 0 ? mockStatsHistory : [],
		suggestions: mockTrainingSuggestions.length > 0 ? mockTrainingSuggestions : []
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full w-full snap-start bg-black overflow-hidden flex items-center justify-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NostalgiaFilter, { className: "z-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				src: video.url,
				poster: video.thumbnail,
				className: "absolute inset-0 w-full h-full object-cover bg-black",
				loop: true,
				playsInline: true,
				muted: isMuted,
				onClick: togglePlay,
				onTimeUpdate: handleTimeUpdate,
				onLoadStart: handleLoadStart,
				onCanPlay: handleCanPlay,
				onWaiting: handleWaiting,
				onPlaying: handlePlaying
			}),
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center bg-black/20 z-10 pointer-events-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-10 h-10 text-white animate-spin" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" }),
			!isPlaying && !isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center pointer-events-none z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-black/40 rounded-full p-4 backdrop-blur-sm animate-in fade-in zoom-in duration-300",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-12 w-12 text-white fill-white ml-1" })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute right-2 bottom-24 flex flex-col items-center gap-6 z-20 pb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
							className: "h-12 w-12 border-2 border-white shadow-lg cursor-pointer transition-transform hover:scale-110",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: video.user.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: video.user.name[0] })]
						}), !isFollowing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleFollow,
							className: "absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-white rounded-full p-0.5 shadow-md hover:bg-primary/90 transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SportsReactionButton, {
						modality: video.modality,
						isLiked,
						likesCount: likeCount,
						onLike: handleLike
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							className: "h-12 w-12 rounded-full bg-transparent hover:bg-transparent text-white",
							onClick: () => setShowComments(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-8 w-8 drop-shadow-md" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-white text-xs font-bold drop-shadow-md",
							children: video.comments
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							className: "h-12 w-12 rounded-full bg-black/40 text-primary hover:bg-black/60 border border-primary/50 animate-pulse shadow-[0_0_15px_rgba(var(--primary),0.5)]",
							onClick: () => setShowAnalysis(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-6 w-6 fill-current" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-white text-xs font-bold drop-shadow-md",
							children: "AI"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							className: "h-12 w-12 rounded-full bg-transparent hover:bg-transparent text-white",
							onClick: () => setShowShare(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-8 w-8 drop-shadow-md" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-white text-xs font-bold drop-shadow-md",
							children: video.shares
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-0 left-0 right-16 p-4 pb-6 z-20 pointer-events-none text-left",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-white font-bold text-base shadow-black drop-shadow-md mb-1",
							children: video.user.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-white/90 text-sm mb-3 line-clamp-2 drop-shadow-md leading-snug",
							children: [
								video.title,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white/70 font-normal",
									children: video.description
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs text-white flex items-center gap-2 max-w-[90%] border border-white/10",
								children: video.music ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "h-3 w-3 animate-[spin_3s_linear_infinite]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "truncate font-medium",
									children: [
										video.music.title,
										" - ",
										video.music.artist
									]
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Som original - ", video.user.name] })] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/10",
								onClick: toggleMute,
								children: isMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-4 w-4" })
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-primary transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(var(--primary),0.8)]",
					style: { width: `${progress}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-6 right-4 z-20 pointer-events-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("w-10 h-10 rounded-full bg-black border-4 border-zinc-800 flex items-center justify-center", isPlaying ? "animate-[spin_5s_linear_infinite]" : ""),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
						className: "w-6 h-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: video.user.avatar })
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiAnalysisDrawer, {
				open: showAnalysis,
				onOpenChange: setShowAnalysis,
				data: enrichedAiData
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommentsSheet, {
				open: showComments,
				onOpenChange: setShowComments,
				videoId: video.id
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareDialog, {
				open: showShare,
				onOpenChange: setShowShare,
				videoTitle: video.title
			})
		]
	});
}
var MOVE_VIDEOS = [
	{
		id: "fut_highlight_1",
		url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
		thumbnail: "https://img.usecurling.com/p/720/1280?q=soccer%20free%20kick%20goal%20stadium&color=green&dpr=2",
		title: "Cobrança de falta magistral! ⚽🎯",
		description: "Aquele chute no ângulo que o goleiro nem viu a cor da bola. Técnica pura e precisão cirúrgica.",
		likes: 15420,
		comments: 432,
		shares: 2100,
		user: {
			id: "u_pro_1",
			name: "Camisa 10",
			avatar: "https://img.usecurling.com/ppl/medium?gender=male&seed=10",
			isFollowing: false
		},
		music: {
			title: "Gol de Placa",
			artist: "Torcida"
		},
		modality: "futebol"
	},
	{
		id: "fut_highlight_2",
		url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
		thumbnail: "https://img.usecurling.com/p/720/1280?q=soccer%20dribbling%20skill%20close%20up&color=green&dpr=2",
		title: "Entortando a zaga 🔥",
		description: "Sequência de dribles rápidos em espaço curto. Controle de bola absurdo para escapar da marcação.",
		likes: 8950,
		comments: 215,
		shares: 840,
		user: {
			id: "u_pro_2",
			name: "Rei do Drible",
			avatar: "https://img.usecurling.com/ppl/medium?gender=male&seed=22",
			isFollowing: true
		},
		music: {
			title: "Ousadia",
			artist: "Samba Ball"
		},
		modality: "futebol"
	},
	{
		id: "bball_1",
		url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
		thumbnail: "https://img.usecurling.com/p/720/1280?q=basketball%20slam%20dunk%20action&color=orange&dpr=2",
		title: "Dunk Contest Winner 🏀👑",
		description: "Saltou da linha do lance livre! Gravidade zero confirmada na quadra central.",
		likes: 28500,
		comments: 1200,
		shares: 5600,
		user: {
			id: "u_bball_1",
			name: "Air Mike",
			avatar: "https://img.usecurling.com/ppl/medium?gender=male&seed=23",
			isFollowing: true
		},
		music: {
			title: "Hype Beast",
			artist: "Court Flow"
		},
		modality: "basketball"
	},
	{
		id: "bball_2",
		url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
		thumbnail: "https://img.usecurling.com/p/720/1280?q=basketball%203%20point%20shot&color=orange&dpr=2",
		title: "Chuva de 3 pontos! 👌",
		description: "Mão quente no treino de hoje. Ninguém segura quando entra nesse ritmo.",
		likes: 12300,
		comments: 450,
		shares: 890,
		user: {
			id: "u_bball_2",
			name: "Sniper 3pts",
			avatar: "https://img.usecurling.com/ppl/medium?gender=female&seed=24",
			isFollowing: false
		},
		music: null,
		modality: "basketball"
	},
	{
		id: "surf_1",
		url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
		thumbnail: "https://img.usecurling.com/p/720/1280?q=surfing%20huge%20barrel%20wave%20ocean&color=cyan&dpr=2",
		title: "Tubo Gigante em Nazaré 🌊🏄‍♂️",
		description: "A força da natureza é impressionante. Drop insano na onda gigante do canhão.",
		likes: 42e3,
		comments: 890,
		shares: 12e3,
		user: {
			id: "u_surf_1",
			name: "Maya Ocean",
			avatar: "https://img.usecurling.com/ppl/medium?gender=female&seed=45",
			isFollowing: false
		},
		music: {
			title: "Ocean Drive",
			artist: "Chill Waves"
		},
		modality: "surf"
	},
	{
		id: "skate_1",
		url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
		thumbnail: "https://img.usecurling.com/p/720/1280?q=skateboarding%20kickflip%20stairs%20urban&color=gray&dpr=2",
		title: "Kickflip 360 na Escadaria 🛹🚀",
		description: "Acertou de primeira! Estilo e técnica dominando o pico de rua em SP.",
		likes: 18900,
		comments: 340,
		shares: 900,
		user: {
			id: "u_skate_1",
			name: "Sk8 Or Die",
			avatar: "https://img.usecurling.com/ppl/medium?gender=male&seed=66",
			isFollowing: true
		},
		music: {
			title: "Punk Rocker",
			artist: "Street Bands"
		},
		modality: "skate"
	},
	{
		id: "cf_1",
		url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
		thumbnail: "https://img.usecurling.com/p/720/1280?q=crossfit%20clean%20and%20jerk%20heavy%20gym&color=black&dpr=2",
		title: "Novo PR de Clean & Jerk! 🏋️‍♂️💪",
		description: "120kg pra conta! Foco, força e superação diária no box. A técnica vence a força.",
		likes: 9800,
		comments: 210,
		shares: 150,
		user: {
			id: "u_cf_1",
			name: "Iron Lady",
			avatar: "https://img.usecurling.com/ppl/medium?gender=female&seed=88",
			isFollowing: true
		},
		music: {
			title: "Beast Mode",
			artist: "Gym Motivation"
		},
		modality: "crossfit"
	},
	{
		id: "volley_1",
		url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
		thumbnail: "https://img.usecurling.com/p/720/1280?q=volleyball%20spike%20match%20action&color=yellow&dpr=2",
		title: "Monster Block! 🏐⛔",
		description: "Paredão subiu e não passou nada. Defesa ganha jogo! O time vibra muito.",
		likes: 11200,
		comments: 180,
		shares: 400,
		user: {
			id: "u_volley_1",
			name: "Volei Pro",
			avatar: "https://img.usecurling.com/ppl/medium?gender=female&seed=99",
			isFollowing: false
		},
		music: null,
		modality: "volleyball"
	},
	{
		id: "futsal_1",
		url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
		thumbnail: "https://img.usecurling.com/p/720/1280?q=futsal%20dribbling%20skill%20indoor&color=blue&dpr=2",
		title: "Rabiscando na Ala 🔥⚽",
		description: "Futsal arte na veia. Drible curto, velocidade e finalização no canto.",
		likes: 8700,
		comments: 120,
		shares: 300,
		user: {
			id: "u_futsal_1",
			name: "Falcão Jr",
			avatar: "https://img.usecurling.com/ppl/medium?gender=male&seed=77",
			isFollowing: true
		},
		music: {
			title: "Samba Beat",
			artist: "Brasil"
		},
		modality: "futsal"
	},
	{
		id: "bike_1",
		url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
		thumbnail: "https://img.usecurling.com/p/720/1280?q=road%20cycling%20mountain%20sprint&color=orange&dpr=2",
		title: "Sprint Final na Serra 🚴‍♂️💨",
		description: "Subida de 12% de inclinação e ainda sobrou perna pro sprint. Paisagem incrível!",
		likes: 6500,
		comments: 150,
		shares: 200,
		user: {
			id: "u_bike_1",
			name: "Pedal Forte",
			avatar: "https://img.usecurling.com/ppl/medium?gender=male&seed=55",
			isFollowing: false
		},
		music: null,
		modality: "bike"
	},
	{
		id: "tennis_1",
		url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
		thumbnail: "https://img.usecurling.com/p/720/1280?q=tennis%20serve%20action%20clay&color=green&dpr=2",
		title: "Ace no Match Point! 🎾🏆",
		description: "Saque a 210km/h para fechar o jogo. Concentração total e execução perfeita.",
		likes: 14200,
		comments: 320,
		shares: 500,
		user: {
			id: "u_tennis_1",
			name: "Ace Queen",
			avatar: "https://img.usecurling.com/ppl/medium?gender=female&seed=33",
			isFollowing: true
		},
		music: {
			title: "Match Point",
			artist: "Tennis Courts"
		},
		modality: "tennis"
	}
];
function Move() {
	const navigate = useNavigate();
	const getInitialTribe = () => {
		if (!mockCurrentUser?.sport) return "all";
		const userSportId = mockCurrentUser.sport.toLowerCase().replace("ê", "e").replace("ç", "c").replace("ã", "a");
		return tribes.some((t) => t.id === userSportId) ? userSportId : "all";
	};
	const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
	const [activeTribe, setActiveTribe] = (0, import_react.useState)(getInitialTribe());
	const [feedType, setFeedType] = (0, import_react.useState)("foryou");
	const containerRef = (0, import_react.useRef)(null);
	const handleScroll = (e) => {
		const container = e.currentTarget;
		const index = Math.round(container.scrollTop / container.clientHeight);
		if (index !== activeIndex) setActiveIndex(index);
	};
	const filteredVideos = MOVE_VIDEOS.filter((video) => {
		if (feedType === "following" && !video.user.isFollowing) return false;
		if (feedType === "following") return true;
		if (activeTribe === "all") return true;
		return video.modality === activeTribe;
	});
	const handleTribeChange = (tribeId) => {
		setActiveTribe(tribeId);
		setFeedType("foryou");
		setActiveIndex(0);
		if (containerRef.current) containerRef.current.scrollTop = 0;
	};
	const handleFeedTypeChange = (type) => {
		setFeedType(type);
		setActiveIndex(0);
		if (containerRef.current) containerRef.current.scrollTop = 0;
	};
	(0, import_react.useEffect)(() => {
		if (containerRef.current) containerRef.current.scrollTop = 0;
	}, [activeTribe, feedType]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full w-full bg-black relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute top-4 left-0 right-0 z-30 flex flex-col items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between w-full px-4 mb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-24" }),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 text-white text-sm font-bold shadow-black drop-shadow-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleFeedTypeChange("following"),
								className: cn("transition-all duration-300", feedType === "following" ? "opacity-100 border-b-2 border-white pb-0.5 scale-105" : "opacity-60 hover:opacity-100"),
								children: "Seguindo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "opacity-40",
								children: "|"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleFeedTypeChange("foryou"),
								className: cn("transition-all duration-300", feedType === "foryou" ? "opacity-100 border-b-2 border-white pb-0.5 scale-105" : "opacity-60 hover:opacity-100"),
								children: "Para Você"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => navigate("/move/kids-map"),
						className: "w-auto h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 border border-white/20 hover:opacity-90 text-white shadow-lg text-[10px] font-bold px-3 gap-1.5",
						title: "Mapeamento para recreação de crianças",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "h-3 w-3" }), "Mapa Kids"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("w-full transition-all duration-300 overflow-hidden", feedType === "following" ? "max-h-0 opacity-0" : "max-h-16 opacity-100"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollArea, {
					className: "w-full whitespace-nowrap px-4 mask-gradient",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex w-max space-x-3 px-4 pb-2",
						children: tribes.map((tribe) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => handleTribeChange(tribe.id),
							className: cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 backdrop-blur-md border border-transparent", activeTribe === tribe.id ? "bg-primary text-white border-primary/50 shadow-[0_0_10px_rgba(var(--primary),0.4)]" : "bg-black/30 text-white hover:bg-black/50 border-white/10"),
							children: ["image" in tribe && tribe.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: tribe.image,
								alt: tribe.label,
								className: "h-3 w-3 object-contain"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(tribe.icon, { className: cn("h-3 w-3", activeTribe === tribe.id ? "fill-current" : "") }), tribe.label]
						}, tribe.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {
						orientation: "horizontal",
						className: "hidden"
					})]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: containerRef,
			className: "h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar",
			onScroll: handleScroll,
			children: filteredVideos.length > 0 ? filteredVideos.map((video, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full w-full snap-start",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoCard, {
					video,
					isActive: index === activeIndex
				})
			}, video.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "h-full w-full flex flex-col items-center justify-center text-white p-6 text-center bg-zinc-950",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-zinc-900 p-6 rounded-full mb-6 animate-pulse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-10 w-10 text-zinc-500" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-2xl font-bold mb-3",
						children: feedType === "following" ? "Nenhum vídeo novo" : "Sem vídeos no momento"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-zinc-400 max-w-xs mx-auto leading-relaxed",
						children: feedType === "following" ? "Siga mais atletas e times para ver os lances deles aqui." : `Não encontramos lances para ${activeTribe}. Tente selecionar outra tribo ou volte mais tarde!`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "mt-8 border-white/20 text-white hover:bg-white/10 px-8",
						onClick: () => feedType === "following" ? handleFeedTypeChange("foryou") : handleTribeChange("all"),
						children: feedType === "following" ? "Explorar Para Você" : "Ver todos os esportes"
					})
				]
			})
		})]
	});
}
export { Move as default };

//# sourceMappingURL=Move-C_nIcFdR.js.map