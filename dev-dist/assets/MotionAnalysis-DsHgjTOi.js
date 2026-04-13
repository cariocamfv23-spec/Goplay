import { t as Brain } from "./brain-BluTRZYN.js";
import { t as CircleAlert } from "./circle-alert-B9hkcYFg.js";
import { t as CircleCheck } from "./circle-check-CPolSuKk.js";
import { t as Play } from "./play-CQKA5_e5.js";
import { t as RotateCcw } from "./rotate-ccw-TVONbxjR.js";
import { Ar as Camera, Br as createLucideIcon, L as useSoundStore_default, R as Badge, Sn as X, an as Button, bn as cn, ci as useNavigate, fi as require_react, ir as Info, si as useLocation, ti as require_jsx_runtime } from "./index-CLnpuxm4.js";
import { t as useAiCoachStore } from "./useAiCoachStore-B7hXeKgH.js";
import { t as Progress } from "./progress-CNNLa3XI.js";
var Settings2 = createLucideIcon("settings-2", [
	["path", {
		d: "M14 17H5",
		key: "gfn3mx"
	}],
	["path", {
		d: "M19 7h-9",
		key: "6i9tg"
	}],
	["circle", {
		cx: "17",
		cy: "17",
		r: "3",
		key: "18b49y"
	}],
	["circle", {
		cx: "7",
		cy: "7",
		r: "3",
		key: "dfmy0x"
	}]
]);
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function MotionAnalysisOverlay({ active, className }) {
	const [frame, setFrame] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!active) return;
		const interval = setInterval(() => {
			setFrame((prev) => (prev + 1) % 100);
		}, 50);
		return () => clearInterval(interval);
	}, [active]);
	const getPoints = (f) => {
		const breathe = Math.sin(f * .1) * 1;
		const squat = Math.sin(f * .2) * 10;
		return {
			head: {
				x: 50,
				y: 15 + breathe
			},
			neck: {
				x: 50,
				y: 25 + breathe
			},
			leftShoulder: {
				x: 40,
				y: 28 + breathe
			},
			rightShoulder: {
				x: 60,
				y: 28 + breathe
			},
			leftElbow: {
				x: 35,
				y: 40 + breathe
			},
			rightElbow: {
				x: 65,
				y: 40 + breathe
			},
			leftHand: {
				x: 30,
				y: 50 + breathe
			},
			rightHand: {
				x: 70,
				y: 50 + breathe
			},
			hip: {
				x: 50,
				y: 50 + squat
			},
			leftKnee: {
				x: 45,
				y: 70 + squat / 1.5
			},
			rightKnee: {
				x: 55,
				y: 70 + squat / 1.5
			},
			leftFoot: {
				x: 45,
				y: 90
			},
			rightFoot: {
				x: 55,
				y: 90
			}
		};
	};
	const points = getPoints(frame);
	const drawLine = (start, end) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
		x1: `${start.x}%`,
		y1: `${start.y}%`,
		x2: `${end.x}%`,
		y2: `${end.y}%`,
		stroke: "hsl(var(--primary))",
		strokeWidth: "2",
		className: "opacity-80 shadow-[0_0_10px_hsl(var(--primary))]"
	});
	const drawPoint = (p, key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: `${p.x}%`,
		cy: `${p.y}%`,
		r: "4",
		fill: "white",
		stroke: "hsl(var(--primary))",
		strokeWidth: "2",
		className: "shadow-[0_0_10px_white]"
	}, key);
	if (!active) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("absolute inset-0 z-10 pointer-events-none", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			className: "w-full h-full",
			children: [
				drawLine(points.head, points.neck),
				drawLine(points.neck, points.hip),
				drawLine(points.neck, points.leftShoulder),
				drawLine(points.leftShoulder, points.leftElbow),
				drawLine(points.leftElbow, points.leftHand),
				drawLine(points.neck, points.rightShoulder),
				drawLine(points.rightShoulder, points.rightElbow),
				drawLine(points.rightElbow, points.rightHand),
				drawLine(points.hip, points.leftKnee),
				drawLine(points.leftKnee, points.leftFoot),
				drawLine(points.hip, points.rightKnee),
				drawLine(points.rightKnee, points.rightFoot),
				Object.entries(points).map(([key, point]) => drawPoint(point, key))
			]
		})
	});
}
function RealTimeFeedback({ message, className }) {
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (message) {
			setVisible(true);
			const timer = setTimeout(() => setVisible(false), 3e3);
			return () => clearTimeout(timer);
		}
	}, [message]);
	if (!message) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("absolute top-1/4 left-0 right-0 flex justify-center z-20 pointer-events-none transition-all duration-500 transform", visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("px-6 py-3 rounded-full backdrop-blur-md shadow-lg border flex items-center gap-3 max-w-[90%] md:max-w-[80%]", message.type === "success" ? "bg-green-500/20 border-green-500/50 text-green-100" : message.type === "warning" ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-100" : message.type === "emotion" ? "bg-purple-500/20 border-purple-500/50 text-purple-100" : "bg-blue-500/20 border-blue-500/50 text-blue-100"),
			children: [message.type === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-6 w-6 text-green-400 animate-bounce" }) : message.type === "warning" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-6 w-6 text-yellow-400 animate-pulse" }) : message.type === "emotion" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-6 w-6 text-purple-400 animate-pulse" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-6 w-6 text-blue-400 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-bold text-sm md:text-base drop-shadow-md",
				children: message.text
			})]
		})
	});
}
function MotionAnalysis() {
	const navigate = useNavigate();
	const location = useLocation();
	const [isActive, setIsActive] = (0, import_react.useState)(false);
	const [reps, setReps] = (0, import_react.useState)(0);
	const [accuracy, setAccuracy] = (0, import_react.useState)(85);
	const [feedback, setFeedback] = (0, import_react.useState)(null);
	const { playSound, playNarration } = useSoundStore_default();
	const { preferences } = useAiCoachStore();
	const videoRef = (0, import_react.useRef)(null);
	const lastEmotionTime = (0, import_react.useRef)(0);
	const selectedExercise = location.state?.exercise || {
		name: "Agachamento Livre",
		category: "Fitness"
	};
	(0, import_react.useEffect)(() => {
		if (!isActive) return;
		const interval = setInterval(() => {
			const fluctuation = Math.random() * 10 - 5;
			setAccuracy((prev) => {
				const newAcc = Math.min(100, Math.max(60, prev + fluctuation));
				if (preferences.emotionDetectionEnabled) {
					const now = Date.now();
					if (now - lastEmotionTime.current > 8e3) {
						if (newAcc > 92 && Math.random() > .7) {
							const msg = "Confiança detectada! Ritmo excelente.";
							setFeedback({
								id: now.toString(),
								type: "emotion",
								text: msg
							});
							if (preferences.voiceEnabled) playNarration({
								hasNarration: true,
								style: "professional",
								text: msg,
								volume: 1
							});
							lastEmotionTime.current = now;
						} else if (newAcc < 70 && Math.random() > .6) {
							const msg = "Frustração detectada. Respire e foque.";
							setFeedback({
								id: now.toString(),
								type: "emotion",
								text: msg
							});
							if (preferences.voiceEnabled) playNarration({
								hasNarration: true,
								style: "professional",
								text: msg,
								volume: 1
							});
							lastEmotionTime.current = now;
						}
					}
				}
				return newAcc;
			});
			if (Math.random() > .8) setReps((prev) => {
				const newReps = prev + 1;
				playSound("notification_points");
				setFeedback({
					id: Date.now().toString(),
					type: "success",
					text: "Movimento Perfeito!"
				});
				return newReps;
			});
			else if (Math.random() > .9) setFeedback({
				id: Date.now().toString(),
				type: "warning",
				text: "Corrija a postura"
			});
		}, 2e3);
		return () => clearInterval(interval);
	}, [
		isActive,
		playSound,
		playNarration,
		preferences
	]);
	const handleToggle = () => {
		setIsActive(!isActive);
		if (!isActive) setFeedback({
			id: "start",
			type: "info",
			text: "Posicione-se para começar..."
		});
	};
	const handleReset = () => {
		setReps(0);
		setAccuracy(100);
		setIsActive(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-screen w-full bg-black overflow-hidden flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 z-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "https://img.usecurling.com/p/800/1200?q=fitness%20gym%20workout&color=blue",
						alt: "Camera Feed",
						className: "w-full h-full object-cover opacity-80"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						ref: videoRef,
						className: "hidden"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionAnalysisOverlay, { active: isActive }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RealTimeFeedback, { message: feedback }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-20 p-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "outline",
							className: "bg-black/40 text-white border-white/20 backdrop-blur-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-3 h-3 mr-1 text-red-500 animate-pulse" }), "AI Vision"]
						}),
						preferences.emotionDetectionEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "outline",
							className: "bg-purple-900/40 text-purple-100 border-purple-500/20 backdrop-blur-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "w-3 h-3 mr-1 text-purple-400" }), "Emotion AI"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: "bg-primary/20 text-primary border-primary/20 backdrop-blur-md uppercase tracking-wider text-[10px]",
							children: selectedExercise.name
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "rounded-full bg-black/20 hover:bg-black/40 text-white",
					onClick: () => navigate(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-6 h-6" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-20 flex-1 flex flex-col items-center pt-8",
				children: isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-1 animate-in slide-in-from-top-4 fade-in duration-500",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-6xl font-black text-white drop-shadow-lg tracking-tighter",
						children: reps
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm uppercase tracking-widest text-white/80 font-medium",
						children: "Repetições"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-20 p-6 pb-8 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-sm font-medium text-white/90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Precisão do Movimento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [Math.round(accuracy), "%"] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: accuracy,
						className: "h-2 bg-white/10"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							className: "h-12 w-12 rounded-full border-white/20 bg-black/40 text-white hover:bg-black/60 hover:text-white",
							onClick: handleReset,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							className: cn("h-20 w-20 rounded-full shadow-2xl border-4 transition-all duration-300 transform hover:scale-105 active:scale-95", isActive ? "bg-red-500 border-red-200 hover:bg-red-600" : "bg-primary border-primary-foreground/20 hover:bg-primary/90"),
							onClick: handleToggle,
							children: isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-6 bg-white rounded-sm" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-8 w-8 text-white ml-1 fill-current" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							className: "h-12 w-12 rounded-full border-white/20 bg-black/40 text-white hover:bg-black/60 hover:text-white",
							onClick: () => navigate("/ai/settings"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "w-5 h-5" })
						})
					]
				})]
			})
		]
	});
}
export { MotionAnalysis as default };

//# sourceMappingURL=MotionAnalysis-DsHgjTOi.js.map