import { t as ChevronLeft } from "./chevron-left-CAaP3zOu.js";
import { t as CirclePlay } from "./circle-play-Cz1vDRac.js";
import { t as Minus } from "./minus-BZ__vfJW.js";
import { t as RotateCcw } from "./rotate-ccw-Bu_Ap7Dk.js";
import { t as Share2 } from "./share-2-tPj7Pvqa.js";
import { t as Volume2 } from "./volume-2-Do6hl1QE.js";
import { t as VolumeX } from "./volume-x-BaUBfqMC.js";
import { $r as require_react, Cn as Trophy, Ct as mockRetrospectiveHistory, Mn as Sparkles, St as mockRetrospective, Tn as TrendingDown, Tr as ArrowRight, Ur as require_jsx_runtime, Xr as useNavigate, Z as mockCurrentUser, fr as Clock, gn as cn, hr as ChevronRight, nn as Button, r as AppIcon, vn as X, wn as TrendingUp } from "./index-BWrK_vl1.js";
import "./card-p5VC9bVs.js";
import "./generateCategoricalChart-BFM74r41.js";
import "./CartesianGrid-Dfmwemjn.js";
import "./BarChart-DEkuK7_S.js";
import { t as EvolutionChart } from "./EvolutionChart-CxZotPGK.js";
import { n as useRetrospectiveStore } from "./useRetrospectiveStore-BH5q-Y5c.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function IntroSlide() {
	const { getTheme } = useRetrospectiveStore();
	const currentTheme = getTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center h-full w-full p-6 text-center text-white space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "animate-in fade-in zoom-in duration-1000 delay-300 fill-mode-both",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-28 h-28 bg-white rounded-3xl rotate-12 flex items-center justify-center shadow-2xl mb-6 mx-auto overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "-rotate-12 w-20 h-20 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppIcon, { className: "w-full h-full drop-shadow-md" })
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-medium tracking-widest uppercase opacity-90 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-500 fill-mode-both",
					children: "Sua Retrospectiva"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-black tracking-tighter animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-700 fill-mode-both",
					children: mockRetrospective.year
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "animate-in fade-in duration-1000 delay-1000 fill-mode-both",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: cn("w-4 h-4 animate-pulse", currentTheme.icon) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-sm",
						children: "Goplay Wrapped"
					})]
				})
			})
		]
	});
}
function StatsSlide() {
	const { getTheme } = useRetrospectiveStore();
	const currentTheme = getTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-full w-full p-8 text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-sm font-bold uppercase tracking-widest opacity-80 mb-12 animate-in slide-in-from-top-4 fade-in duration-700",
			children: "Histórico"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex flex-col justify-center space-y-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white/10 backdrop-blur-lg p-6 rounded-[2rem] border border-white/20 shadow-xl animate-in slide-in-from-right fade-in duration-700 delay-200",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm opacity-80 uppercase font-medium",
						children: "Categoria Top"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-4xl font-black mt-1",
						children: mockRetrospective.stats.topCategory
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("w-12 h-12 bg-white rounded-full flex items-center justify-center", currentTheme.icon),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-6 h-6 fill-current" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs opacity-60",
					children: [
						"Você é fanático por ",
						mockRetrospective.stats.topCategory,
						"!"
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-black/20 backdrop-blur-sm p-5 rounded-3xl animate-in slide-in-from-bottom-8 fade-in duration-700 delay-400",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: cn("w-8 h-8 mb-3 opacity-80", currentTheme.icon) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-3xl font-bold",
							children: mockRetrospective.stats.videosWatched
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs opacity-70 mt-1",
							children: "Vídeos Assistidos"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-black/20 backdrop-blur-sm p-5 rounded-3xl animate-in slide-in-from-bottom-8 fade-in duration-700 delay-500",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: cn("w-8 h-8 mb-3 opacity-80", currentTheme.icon) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-3xl font-bold",
							children: [mockRetrospective.stats.hoursWatched, "h"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs opacity-70 mt-1",
							children: "Horas de Conteúdo"
						})
					]
				})]
			})]
		})]
	});
}
function MilestonesSlide() {
	const { getTheme } = useRetrospectiveStore();
	const currentTheme = getTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-full w-full p-8 text-white relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-bold uppercase tracking-widest opacity-80 mb-8 animate-in slide-in-from-top-4 fade-in duration-700",
				children: "Marcos do Ano"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-12 top-24 bottom-24 w-0.5 bg-white/20 rounded-full" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 flex flex-col justify-center space-y-8 relative z-10",
				children: mockRetrospective.milestones.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("flex items-center gap-6 animate-in slide-in-from-right fade-in duration-700 fill-mode-both"),
					style: { animationDelay: `${index * 300 + 200}ms` },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg shrink-0 z-10", currentTheme.icon),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "w-4 h-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex-1 hover:bg-white/20 transition-colors duration-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-between items-start mb-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-mono opacity-70 bg-black/20 px-2 py-0.5 rounded-md",
								children: item.date
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold text-lg leading-tight",
							children: item.label
						})]
					})]
				}, item.id))
			})
		]
	});
}
function AchievementsSlide() {
	const { getTheme } = useRetrospectiveStore();
	const currentTheme = getTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-full w-full p-8 text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-sm font-bold uppercase tracking-widest opacity-80 mb-6 animate-in slide-in-from-top-4 fade-in duration-700",
			children: "Conquistas Desbloqueadas"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 grid grid-rows-3 gap-4",
			children: mockRetrospective.achievements.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("relative overflow-hidden rounded-3xl p-6 flex items-center gap-4 border border-white/20 shadow-lg animate-in zoom-in-90 fade-in duration-500 fill-mode-both", index === 0 ? "bg-gradient-to-br from-white/20 to-white/5" : index === 1 ? "bg-gradient-to-br from-white/15 to-white/5" : "bg-gradient-to-br from-white/10 to-white/5"),
				style: { animationDelay: `${index * 250 + 200}ms` },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-0 right-0 p-4 opacity-10 transform translate-x-1/4 -translate-y-1/4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "w-32 h-32" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner shrink-0", "bg-white", currentTheme.icon),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "w-7 h-7" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-bold text-xl leading-none mb-1",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs opacity-80 leading-relaxed max-w-[140px]",
							children: item.description
						})]
					})
				]
			}, item.id))
		})]
	});
}
function EvolutionSlide() {
	const { getTheme } = useRetrospectiveStore();
	getTheme();
	const currentYear = mockRetrospectiveHistory[0];
	const previousYear = mockRetrospectiveHistory[1];
	const growthMatches = (currentYear.stats.matches - previousYear.stats.matches) / previousYear.stats.matches * 100;
	const growthRating = (currentYear.stats.rating - previousYear.stats.rating) / previousYear.stats.rating * 100;
	const renderTrend = (value) => {
		if (value > 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-4 h-4 text-green-400 mr-1" });
		if (value < 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "w-4 h-4 text-red-400 mr-1" });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "w-4 h-4 text-gray-400 mr-1" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-full w-full p-6 text-white overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-sm font-bold uppercase tracking-widest opacity-80 mb-6 animate-in slide-in-from-top-4 fade-in duration-700",
			children: "Sua Evolução"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex flex-col space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 animate-in slide-in-from-left fade-in duration-700 delay-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs opacity-60 uppercase font-bold",
							children: "Partidas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end gap-2 mt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-3xl font-black",
								children: currentYear.stats.matches
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center text-xs font-bold mb-1.5",
								children: [renderTrend(growthMatches), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: growthMatches > 0 ? "text-green-400" : growthMatches < 0 ? "text-red-400" : "text-gray-400",
									children: [Math.abs(growthMatches).toFixed(0), "%"]
								})]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 animate-in slide-in-from-right fade-in duration-700 delay-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs opacity-60 uppercase font-bold",
							children: "Rating"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end gap-2 mt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-3xl font-black",
								children: currentYear.stats.rating
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center text-xs font-bold mb-1.5",
								children: [renderTrend(growthRating), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: growthRating > 0 ? "text-green-400" : growthRating < 0 ? "text-red-400" : "text-gray-400",
									children: [Math.abs(growthRating).toFixed(1), "%"]
								})]
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-lg leading-relaxed font-light opacity-90",
						children: [
							"Você jogou ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-gold",
								children: "mais"
							}),
							" e com",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-primary",
								children: "melhor qualidade"
							}),
							" ",
							"comparado a 2023. O esforço valeu a pena!"
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 animate-in fade-in zoom-in duration-700 delay-700 relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0 rounded-2xl") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvolutionChart, { data: mockRetrospectiveHistory })]
				})
			]
		})]
	});
}
function OutroSlide({ onRestart, onFinish }) {
	const { getTheme } = useRetrospectiveStore();
	const currentTheme = getTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-full w-full p-8 text-center items-center justify-center text-white space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative animate-in zoom-in fade-in duration-1000",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute inset-0 blur-3xl opacity-40 animate-pulse", currentTheme.accent) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden relative z-10 mx-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: mockCurrentUser.avatar,
							className: "w-full h-full object-cover",
							alt: "Avatar"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("absolute -bottom-3 left-1/2 -translate-x-1/2 text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider z-20 whitespace-nowrap", currentTheme.accent),
						children: ["Lenda ", mockRetrospective.year]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 max-w-xs animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300 fill-mode-both",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-3xl font-bold",
					children: [
						"Obrigado, ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn(currentTheme.accentText),
							children: mockCurrentUser.name.split(" ")[0]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm opacity-80 leading-relaxed font-light",
					children: [
						"\"",
						mockRetrospective.summary.message,
						"\""
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700 fill-mode-both",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					className: cn("w-full h-12 rounded-xl border-2 bg-transparent font-bold transition-all duration-300", currentTheme.id === "gold" ? "border-gold text-gold hover:bg-gold/10 hover:text-gold hover:border-gold" : cn(currentTheme.accentText, currentTheme.ring)),
					style: currentTheme.isCustom ? {
						borderColor: "var(--retro-accent)",
						color: "var(--retro-accent)"
					} : void 0,
					onClick: onRestart,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "mr-2 h-4 w-4" }), " Replay"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "w-full h-12 rounded-xl font-bold border-none transition-transform active:scale-95 bg-gold text-black hover:bg-gold/90 shadow-lg shadow-gold/20",
					onClick: onFinish,
					children: ["Continuar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "animate-in fade-in duration-1000 delay-1000 fill-mode-both",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					className: "text-white/50 hover:text-white uppercase text-xs tracking-widest gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-3 h-3" }), " Compartilhar"]
				})
			})
		]
	});
}
var SLIDES = [
	{
		id: "intro",
		component: IntroSlide
	},
	{
		id: "stats",
		component: StatsSlide
	},
	{
		id: "milestones",
		component: MilestonesSlide
	},
	{
		id: "achievements",
		component: AchievementsSlide
	},
	{
		id: "evolution",
		component: EvolutionSlide
	},
	{
		id: "outro",
		component: OutroSlide
	}
];
function Retrospective() {
	const navigate = useNavigate();
	const [currentSlide, setCurrentSlide] = (0, import_react.useState)(0);
	const [isMuted, setIsMuted] = (0, import_react.useState)(false);
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(true);
	const audioRef = (0, import_react.useRef)(null);
	const progressInterval = (0, import_react.useRef)(null);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const SLIDE_DURATION = 6e3;
	const { getTheme } = useRetrospectiveStore();
	const currentTheme = getTheme();
	(0, import_react.useEffect)(() => {
		const audio = new Audio("https://assets.mixkit.co/music/preview/mixkit-uplifting-strings-and-piano-1341.mp3");
		audio.loop = true;
		audio.volume = .4;
		audioRef.current = audio;
		const playPromise = audio.play();
		if (playPromise !== void 0) playPromise.then(() => {}).catch(() => {
			setIsMuted(true);
		});
		return () => {
			audio.pause();
			audio.currentTime = 0;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (audioRef.current) {
			audioRef.current.muted = isMuted;
			if (!isMuted && isPlaying) audioRef.current.play().catch(() => {});
			else audioRef.current.pause();
		}
	}, [isMuted, isPlaying]);
	const handleNext = (0, import_react.useCallback)(() => {
		setProgress(0);
		if (currentSlide < SLIDES.length - 1) setCurrentSlide((prev) => prev + 1);
		else setIsPlaying(false);
	}, [currentSlide]);
	const handlePrev = (0, import_react.useCallback)(() => {
		setProgress(0);
		if (currentSlide > 0) setCurrentSlide((prev) => prev - 1);
	}, [currentSlide]);
	(0, import_react.useEffect)(() => {
		if (progress >= 100 && isPlaying) handleNext();
	}, [
		progress,
		isPlaying,
		handleNext
	]);
	(0, import_react.useEffect)(() => {
		if (isPlaying) {
			setProgress(0);
			progressInterval.current = setInterval(() => {
				setProgress((prev) => {
					if (prev >= 100) return 100;
					return prev + 100 / (SLIDE_DURATION / 100);
				});
			}, 100);
		} else if (progressInterval.current) clearInterval(progressInterval.current);
		return () => {
			if (progressInterval.current) clearInterval(progressInterval.current);
		};
	}, [currentSlide, isPlaying]);
	const restart = () => {
		setCurrentSlide(0);
		setIsPlaying(true);
		setProgress(0);
	};
	const toggleMute = () => setIsMuted(!isMuted);
	const togglePlay = () => setIsPlaying(!isPlaying);
	const handleClose = () => navigate("/");
	const handleFinish = () => navigate("/profile/me");
	const ActiveComponent = SLIDES[currentSlide].component;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 bg-black text-white flex items-center justify-center overflow-hidden font-sans",
		style: currentTheme.customVars,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute inset-0 transition-all duration-1000 ease-in-out", currentTheme.gradient) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-20 w-full max-w-md h-full sm:h-[90vh] sm:rounded-3xl bg-black/10 backdrop-blur-sm shadow-2xl overflow-hidden flex flex-col border-x border-white/5 sm:border border-white/10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-0 left-0 right-0 p-4 z-40 flex gap-2",
					children: SLIDES.map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1 flex-1 bg-white/30 rounded-full overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-white transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(255,255,255,0.5)]",
							style: { width: index < currentSlide ? "100%" : index === currentSlide ? `${progress}%` : "0%" }
						})
					}, index))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-8 left-0 right-0 px-6 z-40 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center p-1.5 shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppIcon, { className: "w-full h-full drop-shadow-sm" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-bold uppercase tracking-widest opacity-90 drop-shadow-md",
							children: ["Retrospectiva ", mockRetrospective.year]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "h-9 w-9 rounded-full bg-black/20 hover:bg-black/30 text-white backdrop-blur-md border border-white/10",
							onClick: toggleMute,
							children: isMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "h-9 w-9 rounded-full bg-black/20 hover:bg-black/30 text-white backdrop-blur-md border border-white/10",
							onClick: handleClose,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0 z-30 flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-1/3 h-full cursor-pointer active:bg-black/5 transition-colors",
							onClick: handlePrev,
							onMouseDown: () => setIsPlaying(false),
							onMouseUp: () => setIsPlaying(true),
							onTouchStart: () => setIsPlaying(false),
							onTouchEnd: () => setIsPlaying(true)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-1/3 h-full cursor-pointer flex items-center justify-center",
							onClick: togglePlay,
							children: !isPlaying && currentSlide < SLIDES.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-black/40 p-6 rounded-full backdrop-blur-md animate-in zoom-in fade-in",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-10 w-10 fill-white text-white ml-1" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-1/3 h-full cursor-pointer active:bg-black/5 transition-colors",
							onClick: handleNext,
							onMouseDown: () => setIsPlaying(false),
							onMouseUp: () => setIsPlaying(true),
							onTouchStart: () => setIsPlaying(false),
							onTouchEnd: () => setIsPlaying(true)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 relative z-10 pt-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full w-full",
						children: currentSlide === SLIDES.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutroSlide, {
							onRestart: restart,
							onFinish: handleFinish
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveComponent, {})
					}, currentSlide)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden sm:flex absolute top-1/2 left-4 z-40 -translate-y-1/2 opacity-20 hover:opacity-100 transition-opacity",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						className: "rounded-full text-white",
						onClick: handlePrev,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-8 w-8" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden sm:flex absolute top-1/2 right-4 z-40 -translate-y-1/2 opacity-20 hover:opacity-100 transition-opacity",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						className: "rounded-full text-white",
						onClick: handleNext,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-8 w-8" })
					})
				})
			]
		})]
	});
}
export { Retrospective as default };

//# sourceMappingURL=Retrospective-DoLmkB17.js.map