import { t as Award } from "./award-CG68o6Ha.js";
import { t as ChartNoAxesColumn } from "./chart-no-axes-column-CwWYrGwo.js";
import { t as Flame } from "./flame-BVRo6XFZ.js";
import { t as MicOff } from "./mic-off-BLOvycEZ.js";
import { t as Mic } from "./mic-CVKRUi1Q.js";
import { t as Plus } from "./plus-MpTlJhpy.js";
import { t as Radio } from "./radio-Du_VrVqL.js";
import { t as UserPlus } from "./user-plus-4coRwAM9.js";
import { $ as mockFeedUsers, Gr as useToast, Hr as require_jsx_runtime, Or as createLucideIcon, Qr as require_react, Qt as AvatarImage, Sn as Trophy, Xn as Heart, Xt as Avatar, Yr as useNavigate, Zt as AvatarFallback, _n as X, dr as Clock, hn as cn, or as Eye, pr as CircleCheckBig, tn as Button, vr as Camera, yn as Users } from "./index-BEHBL1rc.js";
import { t as Label } from "./label-bSqkt5J3.js";
import { t as Input } from "./input-B9q3QKi7.js";
import { t as useReplayStore } from "./useReplayStore-B9ffmQhn.js";
var CameraOff = createLucideIcon("camera-off", [
	["path", {
		d: "M14.564 14.558a3 3 0 1 1-4.122-4.121",
		key: "1rnrzw"
	}],
	["path", {
		d: "m2 2 20 20",
		key: "1ooewy"
	}],
	["path", {
		d: "M20 20H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 .819-.175",
		key: "1x3arw"
	}],
	["path", {
		d: "M9.695 4.024A2 2 0 0 1 10.004 4h3.993a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v7.344",
		key: "1i84u0"
	}]
]);
var MonitorUp = createLucideIcon("monitor-up", [
	["path", {
		d: "m9 10 3-3 3 3",
		key: "11gsxs"
	}],
	["path", {
		d: "M12 13V7",
		key: "h0r20n"
	}],
	["rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "3",
		rx: "2",
		key: "48i651"
	}],
	["path", {
		d: "M12 17v4",
		key: "1riwvh"
	}],
	["path", {
		d: "M8 21h8",
		key: "1ev6f3"
	}]
]);
var SwitchCamera = createLucideIcon("switch-camera", [
	["path", {
		d: "M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5",
		key: "mtk2lu"
	}],
	["path", {
		d: "M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5",
		key: "120jsl"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "3",
		key: "1v7zrd"
	}],
	["path", {
		d: "m18 22-3-3 3-3",
		key: "kgdoj7"
	}],
	["path", {
		d: "m6 2 3 3-3 3",
		key: "1fnbkv"
	}]
]);
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function CreateLiveBroadcast() {
	const navigate = useNavigate();
	const { addReplay } = useReplayStore();
	const { toast } = useToast();
	const [status, setStatus] = (0, import_react.useState)("preview");
	const videoRef = (0, import_react.useRef)(null);
	const [duration, setDuration] = (0, import_react.useState)(0);
	const [viewers, setViewers] = (0, import_react.useState)(0);
	const [peakViewers, setPeakViewers] = (0, import_react.useState)(0);
	const [comments, setComments] = (0, import_react.useState)([]);
	const [hasVideo, setHasVideo] = (0, import_react.useState)(true);
	const [hasAudio, setHasAudio] = (0, import_react.useState)(true);
	const streamRef = (0, import_react.useRef)(null);
	const [isScreenSharing, setIsScreenSharing] = (0, import_react.useState)(false);
	const screenStreamRef = (0, import_react.useRef)(null);
	const [coHost, setCoHost] = (0, import_react.useState)(null);
	const [inviteModalOpen, setInviteModalOpen] = (0, import_react.useState)(false);
	const [pollModalOpen, setPollModalOpen] = (0, import_react.useState)(false);
	const [pollQuestion, setPollQuestion] = (0, import_react.useState)("");
	const [pollOptions, setPollOptions] = (0, import_react.useState)(["", ""]);
	const [activePoll, setActivePoll] = (0, import_react.useState)(null);
	const [reactions, setReactions] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const initCamera = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: { facingMode: "user" },
					audio: true
				});
				streamRef.current = stream;
				if (videoRef.current && !isScreenSharing) videoRef.current.srcObject = stream;
			} catch (err) {
				console.error("Failed to get media devices", err);
			}
		};
		if (status === "preview" || status === "live") initCamera();
		return () => {
			if (streamRef.current) streamRef.current.getTracks().forEach((track) => track.stop());
			if (screenStreamRef.current) screenStreamRef.current.getTracks().forEach((track) => track.stop());
		};
	}, [status, isScreenSharing]);
	(0, import_react.useEffect)(() => {
		let timerInterval;
		let viewersInterval;
		let commentsInterval;
		let reactionsInterval;
		if (status === "live") {
			timerInterval = setInterval(() => {
				setDuration((prev) => prev + 1);
			}, 1e3);
			viewersInterval = setInterval(() => {
				setViewers((prev) => {
					const change = Math.floor(Math.random() * 11) - 3;
					const newVal = Math.max(0, prev + change);
					setPeakViewers((p) => Math.max(p, newVal));
					return newVal;
				});
			}, 3e3);
			const mockUsers = [
				"alex_silva",
				"mari.sports",
				"carlos_edu",
				"bia_lima",
				"pedro_santos",
				"juca_gol"
			];
			const mockTexts = [
				"Bora!!",
				"Pra cima 🔥",
				"Show de bola",
				"Manda um salve",
				"Acompanhando aqui",
				"Boa transmissão!",
				"Incrível!"
			];
			commentsInterval = setInterval(() => {
				if (Math.random() > .3) {
					const newUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
					const newText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
					setComments((prev) => [...prev, {
						id: Date.now(),
						user: newUser,
						text: newText,
						avatar: `https://img.usecurling.com/ppl/thumbnail?gender=male&seed=${Math.floor(Math.random() * 100)}`
					}].slice(-20));
				}
			}, 2e3);
			const reactionTypes = [
				"heart",
				"flame",
				"trophy"
			];
			reactionsInterval = setInterval(() => {
				if (Math.random() > .4) setReactions((prev) => [...prev, {
					id: Date.now(),
					type: reactionTypes[Math.floor(Math.random() * reactionTypes.length)],
					left: 50 + Math.random() * 40
				}].filter((r) => Date.now() - r.id < 3e3));
			}, 800);
		}
		return () => {
			clearInterval(timerInterval);
			clearInterval(viewersInterval);
			clearInterval(commentsInterval);
			clearInterval(reactionsInterval);
		};
	}, [status]);
	(0, import_react.useEffect)(() => {
		let pollTimeout;
		if (status === "live" && activePoll?.isActive) pollTimeout = setTimeout(() => {
			setActivePoll((prev) => {
				if (!prev || !prev.isActive) return prev;
				const newOptions = [...prev.options];
				const randomOptIndex = Math.floor(Math.random() * newOptions.length);
				newOptions[randomOptIndex].votes += Math.floor(Math.random() * 3);
				const newTotal = newOptions.reduce((acc, opt) => acc + opt.votes, 0);
				return {
					...prev,
					options: newOptions,
					totalVotes: newTotal
				};
			});
		}, 2500);
		return () => {
			if (pollTimeout) clearTimeout(pollTimeout);
		};
	}, [status, activePoll]);
	const toggleVideo = () => {
		if (streamRef.current) {
			const videoTrack = streamRef.current.getVideoTracks()[0];
			if (videoTrack) {
				videoTrack.enabled = !videoTrack.enabled;
				setHasVideo(videoTrack.enabled);
			}
		} else setHasVideo(!hasVideo);
	};
	const toggleAudio = () => {
		if (streamRef.current) {
			const audioTrack = streamRef.current.getAudioTracks()[0];
			if (audioTrack) {
				audioTrack.enabled = !audioTrack.enabled;
				setHasAudio(audioTrack.enabled);
			}
		} else setHasAudio(!hasAudio);
	};
	const toggleScreenShare = async () => {
		if (isScreenSharing) {
			if (screenStreamRef.current) {
				screenStreamRef.current.getTracks().forEach((track) => track.stop());
				screenStreamRef.current = null;
			}
			setIsScreenSharing(false);
			if (videoRef.current && streamRef.current) videoRef.current.srcObject = streamRef.current;
		} else try {
			if (!navigator?.mediaDevices?.getDisplayMedia) throw new Error("Failed to execute 'getDisplayMedia' on 'MediaDevices': Access to the feature 'display-capture' is disallowed by permissions policy.");
			const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
			screenStreamRef.current = stream;
			setIsScreenSharing(true);
			if (videoRef.current) videoRef.current.srcObject = stream;
			stream.getVideoTracks()[0].onended = () => {
				setIsScreenSharing(false);
				screenStreamRef.current = null;
				if (videoRef.current && streamRef.current) videoRef.current.srcObject = streamRef.current;
			};
		} catch (err) {
			console.error("Screen sharing failed", err);
			const errorMessage = err?.message || "";
			errorMessage.includes("disallowed by permissions policy") || errorMessage.includes("display-capture") || err?.name === "NotAllowedError" || err?.name;
			toast({
				title: "Permissão negada",
				description: "Não foi possível iniciar o compartilhamento de tela devido a restrições de permissão do navegador.",
				variant: "destructive"
			});
			setIsScreenSharing(false);
			if (screenStreamRef.current) {
				screenStreamRef.current.getTracks().forEach((track) => track.stop());
				screenStreamRef.current = null;
			}
			if (videoRef.current && streamRef.current) videoRef.current.srcObject = streamRef.current;
		}
	};
	const handleInvite = (user) => {
		setInviteModalOpen(false);
		toast({
			title: `Convite enviado para ${user.name}`,
			description: "Aguardando resposta..."
		});
		setTimeout(() => {
			setCoHost(user);
			toast({
				title: `${user.name} entrou na transmissão!`,
				className: "bg-green-600 text-white border-none"
			});
		}, 4e3);
	};
	const handleCreatePoll = () => {
		const validOptions = pollOptions.filter((o) => o.trim() !== "");
		if (!pollQuestion.trim() || validOptions.length < 2) return;
		setActivePoll({
			question: pollQuestion,
			options: validOptions.map((text) => ({
				text,
				votes: 0
			})),
			totalVotes: 0,
			isActive: true
		});
		setPollModalOpen(false);
		setPollQuestion("");
		setPollOptions(["", ""]);
		toast({
			title: "Enquete iniciada!",
			description: "Seus espectadores já podem votar."
		});
	};
	const formatTime = (seconds) => {
		return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
	};
	const handleEndBroadcast = () => {
		setStatus("summary");
		addReplay({
			id: `rep-${Date.now()}`,
			title: "Minha Transmissão Ao Vivo",
			championship: "Transmissão Pessoal",
			modality: "outros",
			city: "Local",
			status: "ended",
			viewers: `${peakViewers}`,
			image: "https://img.usecurling.com/p/800/400?q=live%20stream%20recording",
			videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
			duration: formatTime(duration),
			date: "Hoje"
		});
	};
	if (status === "summary") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center p-6 text-white z-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "w-10 h-10 text-red-500" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold mb-2",
				children: "Transmissão Encerrada"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-zinc-400 mb-8",
				children: "Aqui está o resumo da sua Live"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4 w-full max-w-sm mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-zinc-900 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-6 h-6 text-blue-400 mb-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-3xl font-bold",
								children: peakViewers
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-zinc-500 mt-1",
								children: "Pico de Espectadores"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-zinc-900 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-6 h-6 text-orange-400 mb-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-3xl font-bold",
								children: formatTime(duration)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-zinc-500 mt-1",
								children: "Duração Total"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-zinc-900 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5 col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-6 h-6 text-yellow-400 mb-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-3xl font-bold",
								children: (peakViewers * 1.5).toFixed(0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-zinc-500 mt-1",
								children: "Total de Contas Alcançadas"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-emerald-500/10 text-emerald-400 px-4 py-3 rounded-xl mb-8 flex items-center gap-3 border border-emerald-500/20 w-full max-w-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "w-6 h-6 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium leading-snug",
					children: "Transmissão salva nos seus replays. Seus seguidores já podem assistir!"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => navigate("/"),
				className: "w-full max-w-sm h-14 rounded-full font-bold text-lg bg-primary hover:bg-primary/90",
				children: "Voltar para Home"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 bg-black z-50 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				autoPlay: true,
				playsInline: true,
				muted: true,
				className: cn("absolute object-cover transition-all duration-500 z-0", !hasVideo && !isScreenSharing && "opacity-0", coHost ? "top-0 left-0 w-full h-1/2 md:w-1/2 md:h-full" : "inset-0 w-full h-full")
			}),
			!hasVideo && !isScreenSharing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center z-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraOff, { className: "w-10 h-10 text-zinc-500" })
				})
			}),
			isScreenSharing && !screenStreamRef.current && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("absolute bg-zinc-900 flex flex-col items-center justify-center z-[1] border-2 border-primary/50", coHost ? "top-0 left-0 w-full h-1/2 md:w-1/2 md:h-full" : "inset-0 w-full h-full"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorUp, { className: "w-20 h-20 text-white/30 mb-4 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-white/80 text-xl font-bold",
					children: "Tela Compartilhada (Simulação)"
				})]
			}),
			coHost && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-0 left-0 w-full h-1/2 md:top-0 md:left-1/2 md:w-1/2 md:h-full bg-zinc-900 border-t md:border-t-0 md:border-l border-white/20 flex flex-col z-[2] animate-in slide-in-from-bottom md:slide-in-from-right duration-500",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: coHost.avatar,
						className: "w-full h-full object-cover opacity-90",
						alt: coHost.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm font-bold shadow-sm flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-red-500 animate-pulse" }), coHost.name]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-32 right-4 md:bottom-4 pointer-events-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							size: "sm",
							onClick: () => setCoHost(null),
							className: "rounded-full shadow-lg font-bold",
							children: "Remover Co-host"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-[3]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-0 left-0 right-0 p-4 pt-safe flex items-start justify-between z-10",
				children: status === "preview" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "text-white hover:bg-white/20 rounded-full",
					onClick: () => navigate(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-6 h-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "text-white bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md",
						onClick: toggleAudio,
						children: hasAudio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "w-5 h-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "w-5 h-5 text-red-400" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "text-white bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md",
						onClick: toggleVideo,
						children: hasVideo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-5 h-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraOff, { className: "w-5 h-5 text-red-400" })
					})]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2 md:gap-3 max-w-[70%]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-pulse shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 bg-white rounded-full" }), "AO VIVO"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5" }), formatTime(duration)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5" }), viewers]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "destructive",
					className: "rounded-full font-bold shadow-lg shrink-0",
					onClick: handleEndBroadcast,
					children: "Encerrar"
				})] })
			}),
			isScreenSharing && status === "live" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-16 left-1/2 -translate-x-1/2 z-20 bg-primary/90 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg animate-in slide-in-from-top-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorUp, { className: "w-4 h-4" }), "Compartilhando Tela"]
			}),
			status === "preview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex flex-col items-center justify-end pb-24 z-10 pointer-events-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto flex flex-col items-center animate-in slide-in-from-bottom-8 duration-500",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-white text-2xl font-bold mb-2 drop-shadow-lg text-center px-4",
							children: "Pronto para entrar ao vivo?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-white/80 text-sm mb-8 drop-shadow-md",
							children: "Ajuste sua câmera e microfone"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setStatus("live"),
							className: "bg-red-600 hover:bg-red-700 text-white rounded-full h-16 px-10 text-lg font-bold shadow-[0_0_20px_rgba(220,38,38,0.5)] flex items-center gap-3 transition-transform active:scale-95",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "w-6 h-6 animate-pulse" }), "Iniciar Transmissão"]
						})
					]
				})
			}),
			status === "live" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-4 left-4 right-20 h-64 flex flex-col justify-end z-[4] mask-gradient-to-t pointer-events-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-3 pb-2 pointer-events-auto",
						children: comments.map((comment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-2 animate-in slide-in-from-bottom-2 fade-in duration-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "w-8 h-8 border border-white/20 shrink-0 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: comment.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: comment.user[0] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-2xl rounded-tl-sm shadow-sm max-w-[80%]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold text-white/70",
									children: comment.user
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-white drop-shadow-sm leading-tight",
									children: comment.text
								})]
							})]
						}, comment.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-0 bottom-0 right-0 w-32 pointer-events-none z-[4] overflow-hidden",
					children: reactions.map((reaction) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-20 animate-float-up-fade",
						style: { left: `${reaction.left}%` },
						children: [
							reaction.type === "heart" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-7 h-7 text-red-500 fill-red-500" }),
							reaction.type === "flame" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-7 h-7 text-orange-500 fill-orange-500" }),
							reaction.type === "trophy" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-7 h-7 text-yellow-400 fill-yellow-400" })
						]
					}, reaction.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-6 right-4 flex flex-col gap-4 z-[5]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: cn("rounded-full h-12 w-12 border shadow-lg transition-colors", isScreenSharing ? "bg-primary border-primary hover:bg-primary/90 text-primary-foreground" : "bg-black/40 backdrop-blur-md text-white border-white/10 hover:bg-black/60"),
							onClick: toggleScreenShare,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorUp, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: cn("bg-black/40 backdrop-blur-md text-white rounded-full h-12 w-12 border shadow-lg transition-colors", coHost ? "border-primary text-primary hover:bg-black/60" : "border-white/10 hover:bg-black/60"),
							onClick: () => setInviteModalOpen(true),
							disabled: !!coHost,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: cn("rounded-full h-12 w-12 border shadow-lg transition-colors", activePoll ? "bg-primary border-primary hover:bg-primary/90 text-primary-foreground" : "bg-black/40 backdrop-blur-md text-white border-white/10 hover:bg-black/60"),
							onClick: () => setPollModalOpen(true),
							disabled: !!activePoll?.isActive,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumn, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "bg-black/40 backdrop-blur-md text-white rounded-full h-12 w-12 border border-white/10 hover:bg-black/60 shadow-lg",
							onClick: toggleAudio,
							children: hasAudio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "w-5 h-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "w-5 h-5 text-red-400" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "bg-black/40 backdrop-blur-md text-white rounded-full h-12 w-12 border border-white/10 hover:bg-black/60 shadow-lg",
							onClick: toggleVideo,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchCamera, { className: "w-5 h-5" })
						})
					]
				})
			] }),
			activePoll && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-24 left-4 right-4 md:left-auto md:right-24 md:w-80 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 z-[5] pointer-events-auto shadow-2xl animate-in slide-in-from-top-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-start mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "text-white font-bold text-sm bg-primary/20 text-primary px-2.5 py-1 rounded-md flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumn, { className: "w-4 h-4" }), activePoll.isActive ? "Enquete Ao Vivo" : "Enquete Encerrada"]
						}), !activePoll.isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "h-6 w-6 text-white/50 hover:text-white",
							onClick: () => setActivePoll(null),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-white font-medium mb-5 text-sm leading-snug",
						children: activePoll.question
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2.5",
						children: activePoll.options.map((opt, i) => {
							const percent = activePoll.totalVotes > 0 ? Math.round(opt.votes / activePoll.totalVotes * 100) : 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative bg-white/5 rounded-xl overflow-hidden p-3 flex justify-between items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute top-0 bottom-0 left-0 bg-primary/40 transition-all duration-500 ease-out",
										style: { width: `${percent}%` }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "relative z-10 text-white text-sm font-medium",
										children: opt.text
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative z-10 text-white/90 text-xs font-bold pl-2 shrink-0",
										children: [percent, "%"]
									})
								]
							}, i);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex justify-between items-center text-xs font-medium text-white/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [activePoll.totalVotes, " votos"] }), activePoll.isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							size: "sm",
							className: "h-8 px-4 text-xs rounded-full font-bold",
							onClick: () => setActivePoll((prev) => prev ? {
								...prev,
								isActive: false
							} : null),
							children: "Encerrar"
						})]
					})
				]
			}),
			inviteModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-zinc-900 w-full max-w-sm rounded-2xl p-6 border border-white/10 shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold text-white",
							children: "Convidar Co-host"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => setInviteModalOpen(false),
							className: "text-white hover:bg-white/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar",
						children: mockFeedUsers.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
									className: "w-10 h-10 border border-white/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: user.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: user.name[0] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white text-sm font-medium",
									children: user.name
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								className: "rounded-full font-bold px-4",
								onClick: () => handleInvite(user),
								children: "Convidar"
							})]
						}, user.id))
					})]
				})
			}),
			pollModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-zinc-900 w-full max-w-sm rounded-2xl p-6 border border-white/10 shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold text-white",
							children: "Criar Enquete"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => setPollModalOpen(false),
							className: "text-white hover:bg-white/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-white/80 mb-2 block",
								children: "Pergunta"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "bg-black/50 border-white/10 text-white placeholder:text-white/30 rounded-xl",
								value: pollQuestion,
								onChange: (e) => setPollQuestion(e.target.value),
								placeholder: "Ex: Quem vai ganhar hoje?"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-white/80 block",
										children: "Opções"
									}),
									pollOptions.map((opt, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										className: "bg-black/50 border-white/10 text-white placeholder:text-white/30 rounded-xl",
										value: opt,
										onChange: (e) => {
											const newOpts = [...pollOptions];
											newOpts[i] = e.target.value;
											setPollOptions(newOpts);
										},
										placeholder: `Opção ${i + 1}`
									}, i)),
									pollOptions.length < 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										size: "sm",
										className: "text-primary w-full mt-2 hover:bg-primary/20 hover:text-primary rounded-xl",
										onClick: () => setPollOptions([...pollOptions, ""]),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4 mr-2" }), " Adicionar Opção"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full rounded-xl font-bold h-12 mt-6",
								disabled: !pollQuestion.trim() || pollOptions.filter((o) => o.trim()).length < 2,
								onClick: handleCreatePoll,
								children: "Iniciar Enquete"
							})
						]
					})]
				})
			})
		]
	});
}
export { CreateLiveBroadcast as default };

//# sourceMappingURL=CreateLiveBroadcast-XE-VHK_d.js.map