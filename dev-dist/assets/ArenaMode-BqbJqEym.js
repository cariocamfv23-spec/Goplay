import { t as Play } from "./play-BjZ306DK.js";
import { t as RotateCcw } from "./rotate-ccw-9D2PUma4.js";
import { t as Scan } from "./scan-lb7s9B1T.js";
import { t as Shield } from "./shield-Cep82Y33.js";
import { Cn as Target, Gn as Info, Kr as useNavigate, Qt as Button, Sr as ArrowLeft, Tr as createLucideIcon, Yr as require_react, fn as cn, i as AppIcon, pn as Zap, un as toast, yn as Trophy, zr as require_jsx_runtime } from "./index-DQPgPshh.js";
import { t as useAiCoachStore } from "./useAiCoachStore-CWRe7QG_.js";
import { t as useSoundStore_default } from "./useSoundStore-mZmds4AH.js";
var Crosshair = createLucideIcon("crosshair", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "22",
		x2: "18",
		y1: "12",
		y2: "12",
		key: "l9bcsi"
	}],
	["line", {
		x1: "6",
		x2: "2",
		y1: "12",
		y2: "12",
		key: "13hhkx"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "6",
		y2: "2",
		key: "10w3f3"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "22",
		y2: "18",
		key: "15g9kq"
	}]
]);
var Hexagon = createLucideIcon("hexagon", [["path", {
	d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
	key: "yt0hxn"
}]]);
var Timer = createLucideIcon("timer", [
	["line", {
		x1: "10",
		x2: "14",
		y1: "2",
		y2: "2",
		key: "14vaq8"
	}],
	["line", {
		x1: "12",
		x2: "15",
		y1: "14",
		y2: "11",
		key: "17fdiu"
	}],
	["circle", {
		cx: "12",
		cy: "14",
		r: "8",
		key: "1e1u0o"
	}]
]);
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
const ArTarget = ({ data, onInteract }) => {
	const [isHit, setIsHit] = (0, import_react.useState)(false);
	const [scale, setScale] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		requestAnimationFrame(() => setScale(1));
	}, []);
	const handleClick = (e) => {
		e.stopPropagation();
		if (isHit) return;
		setIsHit(true);
		onInteract(data.id, data.value, data.type);
	};
	const getTargetStyle = () => {
		switch (data.type) {
			case "bonus": return {
				color: "text-gold",
				bg: "bg-gold/20",
				border: "border-gold",
				shadow: "shadow-[0_0_15px_hsl(var(--gold))]",
				icon: Zap
			};
			case "hazard": return {
				color: "text-red-500",
				bg: "bg-red-500/20",
				border: "border-red-500",
				shadow: "shadow-[0_0_15px_rgba(239,68,68,0.6)]",
				icon: Hexagon
			};
			default: return {
				color: "text-primary",
				bg: "bg-primary/20",
				border: "border-primary",
				shadow: "shadow-[0_0_15px_hsl(var(--primary))]",
				icon: Target
			};
		}
	};
	const style = getTargetStyle();
	const Icon = style.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ease-out z-30", isHit ? "scale-150 opacity-0" : "hover:scale-110"),
		style: {
			top: `${data.y}%`,
			left: `${data.x}%`,
			transform: `translate(-50%, -50%) scale(${isHit ? 1.5 : scale})`
		},
		onClick: handleClick,
		onTouchStart: handleClick,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative group",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute inset-0 rounded-full border-2 animate-ping opacity-20", style.border) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("relative h-14 w-14 rounded-full border-2 backdrop-blur-md flex items-center justify-center transition-colors", style.bg, style.border, style.color, style.shadow),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6" }), data.type === "standard" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 animate-spin-slow opacity-50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crosshair, { className: "h-full w-full p-1" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap", style.bg, style.border, style.color),
					children: [
						data.value > 0 ? "+" : "",
						data.value,
						" PTS"
					]
				})
			]
		})
	});
};
function ArenaMode() {
	const navigate = useNavigate();
	const { playSound } = useSoundStore_default();
	const { preferences } = useAiCoachStore();
	const [gameState, setGameState] = (0, import_react.useState)("scanning");
	const [score, setScore] = (0, import_react.useState)(0);
	const [timeLeft, setTimeLeft] = (0, import_react.useState)(60);
	const [targets, setTargets] = (0, import_react.useState)([]);
	const [combo, setCombo] = (0, import_react.useState)(0);
	const [coachTip, setCoachTip] = (0, import_react.useState)(null);
	const requestRef = (0, import_react.useRef)(0);
	const lastSpawnTime = (0, import_react.useRef)(0);
	const lastTipTime = (0, import_react.useRef)(0);
	const gameStateRef = (0, import_react.useRef)(gameState);
	const scoreRef = (0, import_react.useRef)(score);
	const comboRef = (0, import_react.useRef)(combo);
	(0, import_react.useEffect)(() => {
		gameStateRef.current = gameState;
		scoreRef.current = score;
		comboRef.current = combo;
	}, [
		gameState,
		score,
		combo
	]);
	const triggerCoachTip = (0, import_react.useCallback)(() => {
		if (!preferences.enabledInArena) return;
		const tips = [
			"Mantenha o foco nos alvos dourados!",
			"Cuidado com as penalidades vermelhas!",
			"Sua sequência está ótima, continue assim!",
			"Respire fundo e mantenha o ritmo.",
			"Olhos atentos nas bordas da tela!",
			"Movimente-se para alcançar mais longe!"
		];
		const randomTip = tips[Math.floor(Math.random() * tips.length)];
		setCoachTip(randomTip);
		setTimeout(() => setCoachTip(null), 4e3);
		if (preferences.feedbackType !== "visual" && preferences.voiceEnabled) {}
	}, [preferences]);
	const endGame = (0, import_react.useCallback)(() => {
		setGameState("finished");
		playSound("notification_points");
		if (scoreRef.current > 0) toast.success("Treino Finalizado!", { description: `Você fez ${scoreRef.current} pontos com um combo máximo de ${comboRef.current}x!` });
	}, [playSound]);
	const spawnTarget = (0, import_react.useCallback)(() => {
		const id = Math.random().toString(36).substr(2, 9);
		const x = 15 + Math.random() * 70;
		const y = 20 + Math.random() * 60;
		const rng = Math.random();
		let type = "standard";
		let value = 100;
		let duration = 4e3;
		if (rng > .9) {
			type = "bonus";
			value = 300;
			duration = 2e3;
		} else if (rng < .1) {
			type = "hazard";
			value = -150;
			duration = 5e3;
		}
		const newTarget = {
			id,
			x,
			y,
			type,
			value,
			expiresAt: Date.now() + duration
		};
		setTargets((prev) => [...prev, newTarget]);
	}, []);
	const gameLoop = (0, import_react.useCallback)((timestamp) => {
		if (!lastSpawnTime.current) lastSpawnTime.current = timestamp;
		if (!lastTipTime.current) lastTipTime.current = timestamp;
		const currentCombo = comboRef.current;
		const spawnRate = Math.max(800, 2e3 - currentCombo * 100);
		if (timestamp - lastSpawnTime.current > spawnRate) {
			spawnTarget();
			lastSpawnTime.current = timestamp;
		}
		if (timestamp - lastTipTime.current > 15e3) {
			triggerCoachTip();
			lastTipTime.current = timestamp;
		}
		setTargets((prev) => prev.filter((t) => t.expiresAt > Date.now()));
		if (gameStateRef.current === "playing") requestRef.current = requestAnimationFrame(gameLoop);
	}, [spawnTarget, triggerCoachTip]);
	const startGame = () => {
		setGameState("playing");
		setScore(0);
		setTimeLeft(60);
		setTargets([]);
		setCombo(0);
		lastSpawnTime.current = 0;
		lastTipTime.current = 0;
		playSound("like_generic");
	};
	const handleInteraction = (id, value, type) => {
		setTargets((prev) => prev.filter((t) => t.id !== id));
		if (type === "hazard") {
			setScore((prev) => Math.max(0, prev + value));
			setCombo(0);
			playSound("notification_store");
			const body = document.querySelector("body");
			if (body) {
				body.classList.add("animate-shake");
				setTimeout(() => body.classList.remove("animate-shake"), 500);
			}
			if (preferences.enabledInArena) {
				setCoachTip("Evite os alvos vermelhos!");
				setTimeout(() => setCoachTip(null), 3e3);
			}
		} else {
			const comboMultiplier = 1 + combo * .1;
			const finalPoints = Math.round(value * comboMultiplier);
			setScore((prev) => prev + finalPoints);
			setCombo((prev) => Math.min(prev + 1, 10));
			if (type === "bonus") playSound("notification_points");
			else playSound("like_generic");
		}
	};
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => {
			setGameState("ready");
			playSound("notification_store");
		}, 3e3);
		return () => clearTimeout(timer);
	}, [playSound]);
	(0, import_react.useEffect)(() => {
		let interval;
		if (gameState === "playing") {
			interval = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev <= 1) {
						endGame();
						return 0;
					}
					return prev - 1;
				});
			}, 1e3);
			requestRef.current = requestAnimationFrame(gameLoop);
		}
		return () => {
			clearInterval(interval);
			cancelAnimationFrame(requestRef.current);
		};
	}, [
		gameState,
		endGame,
		gameLoop
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-black relative overflow-hidden flex flex-col font-sans touch-none select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 z-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "https://img.usecurling.com/p/600/1000?q=soccer%20field%20pov&dpr=2",
						alt: "AR View",
						className: "w-full h-full object-cover opacity-80"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(rgba(var(--primary),0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary),0.15)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30 [transform:perspective(1000px)_rotateX(20deg)] pointer-events-none" }),
					gameState !== "scanning" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 z-0 pointer-events-none overflow-hidden animate-pulse-slow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[35%] left-[10%] w-[80%] h-[40%] border-2 border-primary/20 rounded-[40px] transform rotate-x-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[25%] left-[40%] w-[20%] h-[10%] border border-gold/30 rounded-full" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-10 overflow-hidden pointer-events-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full h-full pointer-events-auto",
					children: targets.map((target) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArTarget, {
						data: target,
						onInteract: handleInteraction
					}, target.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-20 flex-1 flex flex-col p-4 pointer-events-none",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-start pointer-events-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => navigate(-1),
								className: "text-white hover:bg-white/10 rounded-full backdrop-blur-md bg-black/30 border border-white/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-primary/30 text-xs text-white flex items-center gap-2 shadow-lg",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppIcon, { className: "w-4 h-4" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold tracking-widest text-primary",
											children: "ARENA MODE"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("w-2 h-2 rounded-full ml-1", gameState === "playing" ? "bg-green-500 animate-pulse" : "bg-red-500") })
									]
								}), gameState === "playing" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-white font-mono text-sm flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "h-3 w-3 text-gold" }),
										timeLeft,
										"s"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "text-white hover:bg-white/10 rounded-full backdrop-blur-md bg-black/30 border border-white/10",
								onClick: () => {
									toast.info("Toque nos alvos para marcar pontos!", { description: "Evite os alvos vermelhos. Alvos dourados valem mais!" });
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-6 w-6" })
							})
						]
					}),
					coachTip && preferences.enabledInArena && preferences.feedbackType !== "verbal" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-xs animate-in slide-in-from-top-4 fade-in duration-300 pointer-events-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-primary/90 backdrop-blur-lg p-3 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "shrink-0 bg-white/20 p-2 rounded-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4 text-white fill-white animate-pulse" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-bold uppercase text-white/70 tracking-wider",
								children: "AI Coach"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold text-white leading-tight",
								children: coachTip
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 flex items-center justify-center pointer-events-auto",
						children: [
							gameState === "scanning" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-64 h-64 border border-white/10 rounded-2xl animate-pulse",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary shadow-[0_0_15px_hsl(var(--primary))]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary shadow-[0_0_15px_hsl(var(--primary))]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary shadow-[0_0_15px_hsl(var(--primary))]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary shadow-[0_0_15px_hsl(var(--primary))]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute inset-0 flex flex-col items-center justify-center gap-4 bg-primary/5 backdrop-blur-sm rounded-2xl",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scan, { className: "h-12 w-12 text-primary animate-spin-slow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-primary font-mono text-sm tracking-widest animate-pulse",
											children: "ESCANEANDO..."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-0 right-0 h-0.5 bg-primary/80 shadow-[0_0_10px_hsl(var(--primary))] animate-scan-down" })
								]
							}),
							gameState === "ready" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center animate-in zoom-in fade-in duration-500",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "text-4xl font-black text-white italic tracking-tighter mb-4 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]",
									children: ["ARENA ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: "PRONTA"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "lg",
									className: "h-16 px-8 rounded-full text-lg font-bold bg-primary hover:bg-primary/90 shadow-[0_0_30px_hsl(var(--primary)/0.4)] animate-bounce",
									onClick: startGame,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "mr-2 h-6 w-6 fill-current" }), " COMEÇAR"]
								})]
							}),
							gameState === "finished" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-black/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 text-center animate-in zoom-in fade-in duration-500 max-w-sm w-full mx-4 shadow-2xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-16 w-16 text-gold mx-auto mb-4 animate-bounce" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl font-bold text-white mb-1",
										children: "Fim de Treino!"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground mb-6 text-sm",
										children: "Sua performance na Arena"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-4 mb-8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-white/5 p-4 rounded-2xl",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground uppercase mb-1",
												children: "Pontuação"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-3xl font-black text-primary",
												children: score
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-white/5 p-4 rounded-2xl",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground uppercase mb-1",
												children: "Max Combo"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-3xl font-black text-gold",
												children: [combo, "x"]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											className: "w-full h-12 rounded-xl text-base font-bold bg-white text-black hover:bg-white/90",
											onClick: startGame,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "mr-2 h-4 w-4" }), " Tentar Novamente"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											className: "w-full h-12 rounded-xl border-white/20 text-white hover:bg-white/10",
											onClick: () => navigate("/ai/reports"),
											children: "Ver Análise Detalhada"
										})]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-auto grid grid-cols-3 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-1 bg-black/60 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex flex-col justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-primary mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold uppercase tracking-wider",
										children: "Score"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-2xl font-black text-white leading-none",
									children: score
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "col-span-1 flex flex-col items-center justify-end pb-2",
								children: combo > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "animate-in slide-in-from-bottom-4 fade-in duration-300",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-4xl font-black text-transparent bg-clip-text bg-gradient-to-t from-gold to-yellow-200 italic drop-shadow-lg",
										children: [combo, "x"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-[10px] text-gold font-bold uppercase tracking-widest text-center -mt-1",
										children: "COMBO"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-1 bg-black/60 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex flex-col justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-blue-400 mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold uppercase tracking-wider",
										children: "Defesa"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-2xl font-black text-white leading-none",
									children: "85%"
								})]
							})
						]
					})
				]
			})
		]
	});
}
export { ArenaMode as default };

//# sourceMappingURL=ArenaMode-BqbJqEym.js.map