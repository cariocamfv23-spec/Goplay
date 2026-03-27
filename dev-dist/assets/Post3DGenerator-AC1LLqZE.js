import { t as Box } from "./box-BpG-mRT7.js";
import { t as ChevronLeft } from "./chevron-left-DuNL9yJ6.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DU0zycm7.js";
import { t as Pause } from "./pause-BNK0tb2U.js";
import { t as Play } from "./play-CtLWrUuF.js";
import { t as RotateCcw } from "./rotate-ccw-CFpp9CrK.js";
import { t as Video } from "./video-bAiCrb_P.js";
import { t as WandSparkles } from "./wand-sparkles-D6jUUbjj.js";
import { Br as createLucideIcon, Rn as Sparkles, di as require_react, on as Button, ti as require_jsx_runtime, xn as cn, yn as toast } from "./index-D3UB8102.js";
import { t as Progress } from "./progress-B__P20_r.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-Cl_LRyBB.js";
var Cuboid = createLucideIcon("cuboid", [
	["path", {
		d: "m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.95 8.41a2 2 0 0 0-.95 1.7v5.82a2 2 0 0 0 .88 1.66l6.05 4.07a2 2 0 0 0 2.17.05l9.95-6.12a2 2 0 0 0 .95-1.7V8.06a2 2 0 0 0-.88-1.66Z",
		key: "1u2ovd"
	}],
	["path", {
		d: "M10 22v-8L2.25 9.15",
		key: "11pn4q"
	}],
	["path", {
		d: "m10 14 11.77-6.87",
		key: "1kt1wh"
	}]
]);
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function Ghost3DViewer({ videoSrc, mode, isPlaying, className, sport = "futebol" }) {
	const assetUrl = (0, import_react.useMemo)(() => {
		const s = sport.toLowerCase();
		let query = "trophy";
		if (s.includes("futebol") || s.includes("soccer") || s.includes("futsal")) query = "soccer-ball";
		else if (s.includes("basket") || s.includes("basquete")) query = "basketball";
		else if (s.includes("tenis") || s.includes("tennis")) query = "tennis-ball";
		else if (s.includes("volei") || s.includes("volley")) query = "volleyball";
		else if (s.includes("americano") || s.includes("football")) query = "american-football";
		return `https://img.usecurling.com/i?q=${query}&color=multicolor`;
	}, [sport]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative w-full h-full bg-black overflow-hidden", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("absolute inset-0 transition-all duration-700 flex", mode === "split" ? "flex-col md:flex-row" : "flex-col"),
			style: { transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("relative transition-all duration-700 overflow-hidden bg-zinc-950", mode === "ghost" ? "w-0 h-0 opacity-0" : "w-full h-full", mode === "split" && "h-1/2 md:h-full md:w-1/2 border-b md:border-b-0 md:border-r border-white/10"),
				children: [videoSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: videoSrc,
					className: "w-full h-full object-cover opacity-90",
					autoPlay: isPlaying,
					loop: true,
					muted: true,
					playsInline: true
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full h-full flex flex-col items-center justify-center text-zinc-600 bg-zinc-900",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "w-12 h-12 mb-2 opacity-30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium opacity-50",
						children: "Aguardando vídeo..."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-4 left-4 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-white/90 z-10 border border-white/10 flex items-center gap-1.5 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "w-3 h-3" }), "ORIGINAL"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("relative transition-all duration-700 bg-black overflow-hidden perspective-[1200px]", mode === "original" ? "w-0 h-0 opacity-0" : "w-full h-full", mode === "split" && "h-1/2 md:h-full md:w-1/2"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#11111f] to-[#1a1a2e]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 flex items-center justify-center transform-style-3d",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("relative w-80 h-80 transform-style-3d transition-transform ease-linear", isPlaying ? "animate-[camera-orbit_20s_linear_infinite]" : "rotate-x-[25deg] rotate-y-[35deg]"),
							style: { transitionDuration: "2000ms" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 transform rotate-x-90 translate-z-[-80px] w-[300%] h-[300%] -left-[100%] -top-[100%]",
									style: {
										background: `
                    linear-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(99, 102, 241, 0.15) 1px, transparent 1px),
                    radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 60%)
                  `,
										backgroundSize: "60px 60px, 60px 60px, 100% 100%",
										maskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 70%)"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transform-style-3d",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-[-75px] left-1/2 -translate-x-1/2 w-32 h-32 bg-indigo-500/30 rounded-full blur-xl transform rotate-x-90" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: cn("relative transform-style-3d transition-transform duration-500", isPlaying && "animate-[float_3s_ease-in-out_infinite]"),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute -top-[90px] left-1/2 -translate-x-1/2 w-12 h-14 bg-gradient-to-tr from-indigo-400 to-indigo-600 rounded-2xl opacity-90 shadow-[0_0_20px_rgba(99,102,241,0.6)] border border-indigo-300/50 backdrop-blur-md transform-style-3d",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-white/10 rounded-2xl" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute -top-[70px] left-1/2 -translate-x-1/2 w-20 h-28 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl opacity-80 shadow-[0_0_30px_rgba(59,130,246,0.4)] border border-blue-400/30 transform-style-3d",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-1 bg-white/40 blur-[1px]" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute -top-[60px] -left-[20px] w-6 h-24 bg-indigo-500/80 rounded-full origin-top transform-style-3d", isPlaying ? "animate-[arm-swing_1s_infinite_alternate]" : "rotate-12") }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute -top-[60px] -right-[20px] w-6 h-24 bg-indigo-500/80 rounded-full origin-top transform-style-3d", isPlaying ? "animate-[arm-swing_1s_infinite_alternate-reverse]" : "-rotate-12") }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute top-[30px] left-1 w-7 h-28 bg-indigo-700/80 rounded-full origin-top transform-style-3d", isPlaying ? "animate-[leg-run_0.8s_infinite_alternate]" : "rotate-6") }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute top-[30px] right-1 w-7 h-28 bg-indigo-700/80 rounded-full origin-top transform-style-3d", isPlaying ? "animate-[leg-run_0.8s_infinite_alternate-reverse]" : "-rotate-6") })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: cn("absolute w-16 h-16 bottom-[-100px] left-16 transition-all transform-style-3d", isPlaying && "animate-[ball-orbit_3s_infinite_linear]"),
											style: { transitionDuration: "2000ms" },
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: assetUrl,
												alt: "Sport Object",
												className: "w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] filter contrast-125 saturate-150 animate-[spin_4s_linear_infinite]"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-4 bg-black/60 blur-md rounded-full transform rotate-x-90 scale-y-50" })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									className: "absolute inset-0 w-full h-full pointer-events-none transform translate-z-[10px] overflow-visible opacity-60 mix-blend-screen",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "trace-gradient",
										x1: "0%",
										y1: "0%",
										x2: "100%",
										y2: "0%",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "0%",
												stopColor: "transparent"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "50%",
												stopColor: "#6366f1"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "100%",
												stopColor: "#ffffff"
											})
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M 40,240 Q 120,100 240,160",
										fill: "none",
										stroke: "url(#trace-gradient)",
										strokeWidth: "3",
										strokeLinecap: "round",
										className: cn(isPlaying && "animate-pulse"),
										filter: "drop-shadow(0 0 8px rgba(99,102,241,0.8))"
									})]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute top-4 right-4 bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-lg text-[10px] font-bold text-indigo-300 z-10 border border-indigo-500/30 flex items-center gap-2 shadow-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative flex h-2 w-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-indigo-500" })]
						}), "3D LIVE VIEW"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-4 left-4 font-mono text-[10px] text-white/50 pointer-events-none tracking-widest z-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cuboid, { className: "w-3 h-3" }), " MESH: HIGH_POLY"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "LIGHTING: RAY_TRACE_SIM" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PHYSICS: ACTIVE" })
							]
						})
					})
				]
			})]
		})
	});
}
function Post3DGenerator({ videoFile, onConfirm, onCancel, confirmLabel = "Usar este Replay" }) {
	const [step, setStep] = (0, import_react.useState)("uploading");
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [viewMode, setViewMode] = (0, import_react.useState)("split");
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(true);
	const [videoSrc, setVideoSrc] = (0, import_react.useState)(null);
	const [detectedSport, setDetectedSport] = (0, import_react.useState)("futebol");
	(0, import_react.useEffect)(() => {
		const url = URL.createObjectURL(videoFile);
		setVideoSrc(url);
		return () => URL.revokeObjectURL(url);
	}, [videoFile]);
	(0, import_react.useEffect)(() => {
		const timer = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(timer);
					setStep("done");
					toast.success("Reconstrução 3D Concluída!", { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 text-gold" }) });
					return 100;
				}
				if (prev < 20) setStep("uploading");
				else if (prev < 50) setStep("analyzing");
				else if (prev < 80) setStep("mapping");
				else setStep("reconstructing");
				return prev + 1;
			});
		}, 60);
		return () => clearInterval(timer);
	}, []);
	const getStepLabel = () => {
		switch (step) {
			case "uploading": return "Carregando vídeo para a nuvem...";
			case "analyzing": return "Detectando movimentos e profundidade...";
			case "mapping": return "Mapeando objetos esportivos...";
			case "reconstructing": return "Renderizando cena 3D High-Fidelity...";
			case "done": return "Pronto!";
			default: return "Iniciando...";
		}
	};
	if (step !== "done") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center min-h-[500px] w-full bg-background p-8 space-y-8 relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "h-24 w-24 rounded-3xl bg-background border border-border shadow-2xl flex items-center justify-center relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-10 w-10 text-primary animate-spin-slow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-1 rounded-3xl border-2 border-primary/30 animate-ping opacity-20" })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm space-y-4 text-center z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-xl",
						children: getStepLabel()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Transformando 2D em Experiência Imersiva"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: progress,
						className: "h-2.5 bg-secondary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-xs font-mono text-muted-foreground/70",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: step.toUpperCase() }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [Math.round(progress), "%"] })]
					})]
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-full bg-background animate-in fade-in duration-500",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-6 py-4 border-b border-border/40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-2 bg-primary/10 rounded-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "w-5 h-5 text-primary" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-bold text-sm leading-none",
					children: "Replay 3D Studio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] text-muted-foreground mt-1",
					children: "High-Fidelity Rendering"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: detectedSport,
					onValueChange: setDetectedSport,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "h-8 w-[130px] text-xs border-primary/20 bg-primary/5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Esporte" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "futebol",
							children: "⚽ Futebol"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "basquete",
							children: "🏀 Basquete"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "tenis",
							children: "🎾 Tênis"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "volei",
							children: "🏐 Vôlei"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "futevolei",
							children: "🦶🏖️ Futevôlei"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "americano",
							children: "🏈 F. Americano"
						})
					] })]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 p-4 md:p-6 overflow-hidden flex flex-col gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-h-[350px] rounded-2xl overflow-hidden relative group shadow-2xl ring-1 ring-border/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ghost3DViewer, {
					videoSrc,
					mode: viewMode,
					isPlaying,
					sport: detectedSport,
					className: "h-full bg-black"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => setIsPlaying(!isPlaying),
							className: "h-8 w-8 rounded-full text-white hover:bg-white/20",
							children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "w-4 h-4 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-4 h-4 fill-current" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-px h-4 bg-white/20" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => setIsPlaying(true),
							className: "h-8 w-8 rounded-full text-white hover:bg-white/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "w-4 h-4" })
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row gap-4 items-center justify-between bg-secondary/30 p-4 rounded-xl border border-border/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full md:w-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
						defaultValue: "split",
						value: viewMode,
						onValueChange: (v) => setViewMode(v),
						className: "w-full md:w-[300px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid w-full grid-cols-3 h-9 bg-background/80",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "original",
									className: "text-xs",
									children: "Original"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "split",
									className: "text-xs",
									children: "Split View"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "ghost",
									className: "text-xs font-bold text-primary",
									children: "3D Only"
								})
							]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 w-full md:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						onClick: onCancel,
						className: "flex-1 md:flex-none text-muted-foreground hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-4 h-4 mr-2" }), "Voltar"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => onConfirm(viewMode),
						className: "flex-1 md:flex-none bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white shadow-lg font-bold min-w-[180px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "w-4 h-4 mr-2" }), confirmLabel]
					})]
				})]
			})]
		})]
	});
}
export { Post3DGenerator as t };

//# sourceMappingURL=Post3DGenerator-AC1LLqZE.js.map