import { t as LoaderCircle } from "./loader-circle-BYRls7Qd.js";
import { t as Play } from "./play-mvq0Iscv.js";
import { t as Volume2 } from "./volume-2-B9OfVlnb.js";
import { t as VolumeX } from "./volume-x-nvUBOrjN.js";
import { Yr as require_jsx_runtime, ai as require_react, an as Button, bn as cn, o as NostalgiaFilter } from "./index-wbjedP09.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function FeedVideoPlayer({ url, thumbnail, aspectRatio = "aspect-video", onClick, autoPlayThreshold = .6, className }) {
	const videoRef = (0, import_react.useRef)(null);
	const containerRef = (0, import_react.useRef)(null);
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const [isMuted, setIsMuted] = (0, import_react.useState)(true);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [progress, setProgress] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) videoRef.current?.play().then(() => setIsPlaying(true)).catch(() => {
					if (videoRef.current && !videoRef.current.muted) {
						videoRef.current.muted = true;
						setIsMuted(true);
						videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
					}
				});
				else {
					videoRef.current?.pause();
					setIsPlaying(false);
				}
			});
		}, { threshold: autoPlayThreshold });
		if (containerRef.current) observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, [autoPlayThreshold]);
	const togglePlay = (e) => {
		e.stopPropagation();
		if (videoRef.current) if (isPlaying) {
			videoRef.current.pause();
			setIsPlaying(false);
		} else {
			videoRef.current.play();
			setIsPlaying(true);
		}
		onClick?.();
	};
	const toggleMute = (e) => {
		e.stopPropagation();
		if (videoRef.current) {
			videoRef.current.muted = !isMuted;
			setIsMuted(!isMuted);
		}
	};
	const handleTimeUpdate = () => {
		if (videoRef.current) setProgress(videoRef.current.currentTime / videoRef.current.duration * 100 || 0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: containerRef,
		className: cn("relative w-full overflow-hidden bg-black group rounded-xl", aspectRatio, className),
		onClick: togglePlay,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NostalgiaFilter, { className: "z-10 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				src: url,
				poster: thumbnail,
				className: "absolute inset-0 w-full h-full object-cover",
				loop: true,
				playsInline: true,
				muted: isMuted,
				onTimeUpdate: handleTimeUpdate,
				onLoadStart: () => setIsLoading(true),
				onCanPlay: () => setIsLoading(false),
				onWaiting: () => setIsLoading(true),
				onPlaying: () => {
					setIsLoading(false);
					setIsPlaying(true);
				},
				onPause: () => setIsPlaying(false)
			}),
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center bg-black/20 z-20 pointer-events-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-8 h-8 text-white animate-spin" })
			}),
			!isPlaying && !isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center pointer-events-none z-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-black/40 rounded-full p-4 backdrop-blur-sm animate-in fade-in zoom-in duration-300",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-8 w-8 text-white fill-white ml-1" })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent z-30 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						className: "h-8 w-8 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md",
						onClick: toggleMute,
						children: isMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-4 w-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-primary transition-all duration-100 ease-linear shadow-[0_0_8px_rgba(var(--primary),0.8)]",
					style: { width: `${progress}%` }
				})
			})
		]
	});
}
export { FeedVideoPlayer as t };

//# sourceMappingURL=FeedVideoPlayer-Dl74UT1o.js.map