import { t as Play } from "./play-BORXKWk3.js";
import { t as ShieldAlert } from "./shield-alert-C7lUl19q.js";
import { Sn as X, an as Button, bn as cn, d as Description, f as Overlay, fi as require_react, h as Title, l as Close, m as Root, mr as Flame, p as Portal, ti as require_jsx_runtime, u as Content, xn as Zap, zr as Activity } from "./index-C0-ILgjM.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	"All",
	"CrossFit",
	"Yoga",
	"Football",
	"Combat Sports",
	"Endurance",
	"Strength"
];
var WORKOUTS = [
	{
		id: 1,
		title: "Cyber Core Crusher",
		sport: "CrossFit",
		difficulty: "Advanced",
		image: "https://img.usecurling.com/p/600/400?q=crossfit&color=purple",
		video: "https://img.usecurling.com/p/800/450?q=workout&color=blue",
		tips: "Keep your core tight to maximize energy transfer. Don't rush the eccentric phase.",
		steps: [
			"Start in a hollow body position",
			"Explode upwards into a V-up",
			"Rotate torso to the right, then left",
			"Return to starting position with control"
		]
	},
	{
		id: 2,
		title: "Neon Flow Sequence",
		sport: "Yoga",
		difficulty: "Beginner",
		image: "https://img.usecurling.com/p/600/400?q=yoga&color=pink",
		video: "https://img.usecurling.com/p/800/450?q=meditation&color=pink",
		tips: "Sync every movement with deep, conscious breaths to build internal heat.",
		steps: [
			"Begin in downward facing dog",
			"Sweep right leg up to three-legged dog",
			"Step through into warrior one",
			"Open up gracefully to warrior two"
		]
	},
	{
		id: 3,
		title: "Titan Strike Combos",
		sport: "Combat Sports",
		difficulty: "Intermediate",
		image: "https://img.usecurling.com/p/600/400?q=boxing&color=cyan",
		video: "https://img.usecurling.com/p/800/450?q=boxing&color=cyan",
		tips: "Always keep your guard up and pivot on your lead foot.",
		steps: [
			"Establish a solid fighting stance",
			"Throw a quick jab-cross combination",
			"Slip to the outside of an incoming punch",
			"Counter with a devastating lead hook"
		]
	},
	{
		id: 4,
		title: "Quantum Sprint",
		sport: "Endurance",
		difficulty: "Advanced",
		image: "https://img.usecurling.com/p/600/400?q=running&color=yellow",
		video: "https://img.usecurling.com/p/800/450?q=running&color=yellow",
		tips: "Maintain proper arm swing to drive your momentum forward without twisting.",
		steps: [
			"Start with a light 5-minute jog warmup",
			"Accelerate to 90% max speed for 30 seconds",
			"Recover with a 1-minute walk",
			"Repeat 10 cycles for maximum burn"
		]
	}
];
function InfinityHub() {
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [selectedWorkout, setSelectedWorkout] = (0, import_react.useState)(null);
	const filtered = filter === "All" ? WORKOUTS : WORKOUTS.filter((w) => w.sport === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-[calc(100vh-8rem)] bg-zinc-950 text-white flex flex-col pb-24 font-sans selection:bg-cyan-500/30",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pt-6 px-4 pb-4 bg-gradient-to-b from-purple-900/30 via-zinc-950/80 to-transparent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-8 h-8 text-cyan-400 fill-cyan-400/20" }), "INFINITY HUB"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-zinc-400 text-sm font-medium mt-1",
					children: "Unlock your maximum athletic potential."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-2 overflow-x-auto no-scrollbar flex gap-2",
				children: CATEGORIES.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setFilter(cat),
					className: cn("whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all border", filter === cat ? "bg-purple-600/20 border-purple-500 text-purple-300 shadow-[0_0_12px_rgba(124,58,237,0.3)]" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"),
					children: cat
				}, cat))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 grid grid-cols-1 md:grid-cols-2 gap-5",
				children: filtered.map((workout) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 transition-all cursor-pointer shadow-lg",
					onClick: () => setSelectedWorkout(workout),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "aspect-[16/9] relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: workout.image,
								alt: workout.title,
								className: "w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-black/60 p-3 rounded-full backdrop-blur-md border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-8 h-8 ml-1 fill-cyan-400/20" })
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-0 left-0 right-0 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-2 py-0.5 rounded text-[10px] font-black uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm",
								children: workout.sport
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "px-2 py-0.5 rounded text-[10px] font-black uppercase bg-zinc-900/80 text-zinc-300 flex items-center gap-1 border border-white/5 backdrop-blur-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-3 h-3 text-orange-500" }),
									" ",
									workout.difficulty
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-bold leading-tight text-white group-hover:text-cyan-400 transition-colors",
							children: workout.title
						})]
					})]
				}, workout.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
				open: !!selectedWorkout,
				onOpenChange: (open) => !open && setSelectedWorkout(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
					className: "fixed left-1/2 top-[50%] w-[95%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-zinc-950 border border-purple-500/30 rounded-3xl p-0 overflow-hidden z-[100] shadow-[0_0_60px_rgba(124,58,237,0.2)] outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 flex flex-col max-h-[90vh]",
					children: selectedWorkout && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-video shrink-0 bg-zinc-900 flex items-center justify-center overflow-hidden border-b border-white/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: selectedWorkout.video,
								alt: "Demo",
								className: "absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative z-10 w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center backdrop-blur-md border border-cyan-500/50 cursor-pointer hover:bg-cyan-500/30 transition-all hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.2)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-8 h-8 ml-1 fill-cyan-400/30" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-sm text-white/80 transition-colors z-20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 overflow-y-auto no-scrollbar",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mb-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-cyan-400 uppercase tracking-wider",
										children: selectedWorkout.sport
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-zinc-700",
										children: "•"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-zinc-400 uppercase tracking-wider",
										children: selectedWorkout.difficulty
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
								className: "text-2xl font-black mb-6 tracking-tight",
								children: selectedWorkout.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-purple-950/30 border border-purple-500/20 rounded-2xl p-4 relative overflow-hidden",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
											className: "flex items-center gap-2 font-bold text-purple-300 mb-2 relative z-10",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-4 h-4" }), " Pro Tip"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
											className: "text-sm text-purple-100/70 leading-relaxed relative z-10",
											children: selectedWorkout.tips
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "flex items-center gap-2 font-bold text-white mb-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-4 h-4 text-cyan-400" }),
										" ",
										"Execution Protocol"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "space-y-4 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-zinc-800",
									children: selectedWorkout.steps.map((step, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "relative pl-8 flex items-start",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute left-0 top-0 w-6 h-6 rounded-full bg-zinc-950 border-2 border-cyan-500 flex items-center justify-center text-[10px] font-black text-cyan-400 z-10 shadow-[0_0_10px_rgba(34,211,238,0.2)]",
											children: idx + 1
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-zinc-300 pt-0.5 leading-relaxed",
											children: step
										})]
									}, idx))
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 pt-4 border-t border-white/5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black text-lg h-12 shadow-[0_0_15px_rgba(34,211,238,0.4)]",
									children: "INITIALIZE SEQUENCE"
								})
							})
						]
					})] })
				})] })
			})
		]
	});
}
export { InfinityHub as default };

//# sourceMappingURL=InfinityHub-D_GLYj2i.js.map