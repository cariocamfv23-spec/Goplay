import { t as ChartNoAxesColumn } from "./chart-no-axes-column-B3A6k5RK.js";
import { t as CircleCheck } from "./circle-check-CqHnHzr3.js";
import { t as EllipsisVertical } from "./ellipsis-vertical-DlO_3TZv.js";
import { t as Send } from "./send-BheyPvzW.js";
import { t as Share2 } from "./share-2-Blbr09r-.js";
import { Cn as cn, H as Badge, Tn as X, U as ScrollArea, _t as mockLiveEvents, an as AvatarImage, br as Eye, cn as Button, di as useParams, in as AvatarFallback, lr as Heart, pi as require_react, ri as require_jsx_runtime, rn as Avatar, ui as useNavigate, zr as ArrowLeft } from "./index-BRczRGrK.js";
import { t as Input } from "./input-D00ZXvva.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function LiveStream() {
	const { id } = useParams();
	const navigate = useNavigate();
	const event = mockLiveEvents.find((e) => e.id === id) || mockLiveEvents[0];
	const [message, setMessage] = (0, import_react.useState)("");
	const [messages, setMessages] = (0, import_react.useState)([
		{
			id: 1,
			user: "João Silva",
			text: "Golaço!",
			time: "Agora"
		},
		{
			id: 2,
			user: "Maria Souza",
			text: "Vai timeeee!",
			time: "1min"
		},
		{
			id: 3,
			user: "Pedro Santos",
			text: "Juiz tá roubando",
			time: "2min"
		}
	]);
	const [poll, setPoll] = (0, import_react.useState)(null);
	const [votedOptionId, setVotedOptionId] = (0, import_react.useState)(null);
	const [coHost, setCoHost] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const pollTimer = setTimeout(() => {
			setPoll({
				id: "poll-1",
				question: "Quem vai fazer o primeiro gol?",
				options: [{
					id: 1,
					text: "Red Wolves",
					votes: 120
				}, {
					id: 2,
					text: "Blue Sharks",
					votes: 85
				}],
				totalVotes: 205,
				isActive: true
			});
		}, 4e3);
		const coHostTimer = setTimeout(() => {
			setCoHost({
				name: "João Silva",
				avatar: "https://img.usecurling.com/ppl/medium?gender=male&seed=1"
			});
		}, 1e4);
		return () => {
			clearTimeout(pollTimer);
			clearTimeout(coHostTimer);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (poll?.isActive) {
			const timer = setTimeout(() => {
				setPoll((prev) => {
					if (!prev || !prev.isActive) return prev;
					const newOpts = [...prev.options];
					newOpts[0].votes += Math.floor(Math.random() * 3);
					newOpts[1].votes += Math.floor(Math.random() * 3);
					return {
						...prev,
						options: newOpts,
						totalVotes: newOpts[0].votes + newOpts[1].votes
					};
				});
			}, 2500);
			return () => clearTimeout(timer);
		}
	}, [poll]);
	const handleSendMessage = () => {
		if (!message.trim()) return;
		setMessages([{
			id: Date.now(),
			user: "Você",
			text: message,
			time: "Agora"
		}, ...messages]);
		setMessage("");
	};
	const handleVote = (optId) => {
		if (votedOptionId !== null || !poll?.isActive) return;
		setVotedOptionId(optId);
		setPoll((prev) => {
			if (!prev) return prev;
			const newOpts = prev.options.map((o) => o.id === optId ? {
				...o,
				votes: o.votes + 1
			} : o);
			return {
				...prev,
				options: newOpts,
				totalVotes: prev.totalVotes + 1
			};
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-screen bg-black text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between p-4 absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "text-white hover:bg-white/10",
						onClick: () => navigate(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "destructive",
							className: "animate-pulse font-bold px-2",
							children: "AO VIVO"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-mono",
								children: event.viewers
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "text-white hover:bg-white/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "h-6 w-6" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("relative w-full bg-zinc-900 mt-0 flex flex-col md:flex-row items-center justify-center group overflow-hidden transition-all duration-500", coHost ? "aspect-[4/5] md:aspect-video" : "aspect-video"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("relative w-full h-full", coHost ? "h-1/2 md:w-1/2 md:h-full" : ""),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: event.image,
							alt: event.title,
							className: "w-full h-full object-cover opacity-80"
						}), !coHost && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 flex items-center justify-center pointer-events-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 animate-pulse",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1" })
							})
						})]
					}),
					coHost && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full h-1/2 md:w-1/2 md:h-full bg-zinc-800 border-t md:border-t-0 md:border-l border-white/20 animate-in slide-in-from-bottom md:slide-in-from-right duration-500",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: coHost.avatar,
							className: "w-full h-full object-cover opacity-90",
							alt: coHost.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-2 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" }), coHost.name]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-lg font-bold leading-tight text-white",
							children: event.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-gray-300",
							children: [
								event.championship,
								" • ",
								event.score
							]
						})]
					}),
					poll && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute top-16 right-4 left-4 md:left-auto md:w-80 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 z-20 shadow-2xl animate-in slide-in-from-right fade-in duration-300",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-start mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "text-white font-bold text-sm bg-primary/20 text-primary px-2.5 py-1 rounded-md flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumn, { className: "w-4 h-4" }), poll.isActive ? "Enquete Ao Vivo" : "Enquete Encerrada"]
								}), !poll.isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "h-6 w-6 text-white/50 hover:text-white",
									onClick: () => setPoll(null),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-white font-medium mb-5 text-sm leading-snug",
								children: poll.question
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2.5",
								children: poll.options.map((opt) => {
									const percent = poll.totalVotes > 0 ? Math.round(opt.votes / poll.totalVotes * 100) : 0;
									const isSelected = votedOptionId === opt.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleVote(opt.id),
										disabled: votedOptionId !== null || !poll.isActive,
										className: cn("relative w-full text-left rounded-xl overflow-hidden p-3 flex justify-between items-center transition-all duration-200", votedOptionId !== null || !poll.isActive ? isSelected ? "bg-primary/20 border border-primary/50" : "bg-white/5 border border-transparent" : "bg-white/10 hover:bg-white/20 border border-transparent cursor-pointer"),
										children: [
											(votedOptionId !== null || !poll.isActive) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute top-0 bottom-0 left-0 bg-primary/30 transition-all duration-1000 ease-out",
												style: { width: `${percent}%` }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "relative z-10 text-white text-sm font-medium flex items-center gap-2",
												children: [isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-primary shrink-0" }), opt.text]
											}),
											(votedOptionId !== null || !poll.isActive) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "relative z-10 text-white/90 text-xs font-bold shrink-0 pl-2",
												children: [percent, "%"]
											})
										]
									}, opt.id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 flex justify-between items-center text-xs font-medium text-white/50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [poll.totalVotes, " votos computados"] })
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col bg-background/95 backdrop-blur-xl relative rounded-t-3xl -mt-4 z-10 overflow-hidden border-t border-white/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between p-4 border-b border-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-bold text-sm text-foreground",
							children: "Chat ao Vivo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "h-8 w-8 text-muted-foreground hover:text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "h-8 w-8 text-muted-foreground hover:text-red-500",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4" })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
						className: "flex-1 p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: messages.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 items-start animate-in slide-in-from-bottom-2 duration-300",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
									className: "h-8 w-8 border border-white/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: `https://img.usecurling.com/ppl/thumbnail?gender=male&seed=${msg.id}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
										className: "text-xs bg-zinc-800 text-zinc-400",
										children: "U"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-bold text-gray-200",
											children: msg.user
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-gray-500",
											children: msg.time
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-gray-400",
										children: msg.text
									})]
								})]
							}, msg.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 bg-zinc-900 border-t border-white/5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: message,
								onChange: (e) => setMessage(e.target.value),
								placeholder: "Digite sua mensagem...",
								className: "bg-zinc-800 border-none text-white placeholder:text-gray-500 rounded-full pr-10 focus-visible:ring-1 focus-visible:ring-primary",
								onKeyDown: (e) => e.key === "Enter" && handleSendMessage()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								className: "absolute right-1 rounded-full w-8 h-8 bg-primary hover:bg-primary/90",
								onClick: handleSendMessage,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4 text-white" })
							})]
						})
					})
				]
			})
		]
	});
}
export { LiveStream as default };

//# sourceMappingURL=LiveStream-CcWHUv1H.js.map