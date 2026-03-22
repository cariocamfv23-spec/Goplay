import { t as EllipsisVertical } from "./ellipsis-vertical-paNGMokk.js";
import { t as Pause } from "./pause-BZ0rTNrw.js";
import { t as Play } from "./play-B_MI2Vx0.js";
import { t as Volume2 } from "./volume-2-Do6hl1QE.js";
import { t as VolumeX } from "./volume-x-BaUBfqMC.js";
import { $r as require_react, Er as ArrowLeft, R as Badge, Ur as require_jsx_runtime, Xr as useNavigate, Zr as useParams, bn as Users, br as Calendar, fr as Clock, nn as Button } from "./index-BWrK_vl1.js";
import { t as Slider } from "./slider-Dp8clQq6.js";
import { t as useReplayStore } from "./useReplayStore-DCv6K7QF.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function ReplayStream() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { replays } = useReplayStore();
	const replay = replays.find((r) => r.id === id) || replays[0];
	const videoRef = (0, import_react.useRef)(null);
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [duration, setDuration] = (0, import_react.useState)(0);
	const [isMuted, setIsMuted] = (0, import_react.useState)(false);
	const [showControls, setShowControls] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let timeout;
		if (isPlaying && showControls) timeout = setTimeout(() => setShowControls(false), 3e3);
		return () => clearTimeout(timeout);
	}, [isPlaying, showControls]);
	const togglePlay = () => {
		if (videoRef.current) {
			if (isPlaying) videoRef.current.pause();
			else videoRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};
	const handleTimeUpdate = () => {
		if (videoRef.current) setProgress(videoRef.current.currentTime / videoRef.current.duration * 100);
	};
	const handleLoadedMetadata = () => {
		if (videoRef.current) setDuration(videoRef.current.duration);
	};
	const handleSeek = (value) => {
		if (videoRef.current) {
			const time = value[0] / 100 * videoRef.current.duration;
			videoRef.current.currentTime = time;
			setProgress(value[0]);
		}
	};
	const formatTime = (seconds) => {
		if (isNaN(seconds)) return "00:00";
		return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
	};
	if (!replay) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-screen bg-black text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between p-4 absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "text-white hover:bg-white/10",
					onClick: () => navigate(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-6 w-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "bg-white/20 text-white font-bold px-2 backdrop-blur-md border-0",
						children: "REPLAY"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "text-white hover:bg-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "h-6 w-6" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full h-full flex flex-col justify-center bg-black group cursor-pointer",
			onClick: () => setShowControls(true),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				src: replay.videoUrl,
				poster: replay.image,
				className: "w-full h-auto max-h-full object-contain",
				onTimeUpdate: handleTimeUpdate,
				onLoadedMetadata: handleLoadedMetadata,
				onEnded: () => setIsPlaying(false),
				muted: isMuted,
				playsInline: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `absolute inset-0 bg-black/40 transition-opacity duration-300 flex flex-col justify-end p-6 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "h-16 w-16 rounded-full bg-black/50 text-white hover:bg-black/70 hover:scale-105 transition-all",
						onClick: (e) => {
							e.stopPropagation();
							togglePlay();
						},
						children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-8 w-8" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-8 w-8 ml-1" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 w-full max-w-3xl mx-auto z-10",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold leading-tight drop-shadow-md",
							children: replay.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 text-sm text-gray-200 drop-shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-4 h-4" }),
										" ",
										replay.date
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-4 h-4" }),
										" ",
										replay.viewers,
										" espectadores"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-4 h-4" }),
										" ",
										replay.duration
									]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 bg-black/40 backdrop-blur-md p-3 rounded-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-mono w-12 text-center",
								children: formatTime(videoRef.current?.currentTime || 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								value: [progress],
								max: 100,
								step: .1,
								className: "flex-1 cursor-pointer",
								onValueChange: handleSeek
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-mono w-12 text-center",
								children: formatTime(duration)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "h-8 w-8 text-white hover:bg-white/20 ml-2 rounded-full shrink-0",
								onClick: () => setIsMuted(!isMuted),
								children: isMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-5 w-5" })
							})
						]
					})]
				})]
			})]
		})]
	});
}
export { ReplayStream as default };

//# sourceMappingURL=ReplayStream-CIy82GuE.js.map