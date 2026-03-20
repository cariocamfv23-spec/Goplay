import "./chevron-down-C57ccOQX.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CVZiOWKN.js";
import { t as CircleCheck } from "./circle-check-EXWPuuTU.js";
import { t as History } from "./history-CngiO46K.js";
import { t as LoaderCircle } from "./loader-circle-Cy_Dtk65.js";
import { t as Mic } from "./mic-VXeaoJ7_.js";
import { t as Pause } from "./pause-CbCghXV3.js";
import { t as Play } from "./play-DO4bcOj1.js";
import "./refresh-cw-DpzYyiIK.js";
import { t as Save } from "./save-DX2iRYnZ.js";
import { t as Share2 } from "./share-2-DHC9eRwq.js";
import { t as Video } from "./video-C8NJO-J8.js";
import { t as Volume2 } from "./volume-2-B2wW5XlH.js";
import { t as WandSparkles } from "./wand-sparkles-B4kdTRDq.js";
import { Gt as Avatar, Hn as Info, Ir as require_jsx_runtime, Kr as require_react, Kt as AvatarFallback, Ln as MapPin, M as Badge, Tn as Sparkles, Tt as narrationStyles, Ur as useNavigate, Wr as useParams, Xt as Button, ar as Clock, fr as Camera, n as AppIcon, pn as Users, pr as Calendar, qt as AvatarImage, sn as toast, wn as Star, wt as mockVenues, yr as ArrowLeft } from "./index-C3o-AP23.js";
import "./dist-DOcC8dAd.js";
import { t as Label } from "./label-BNzlHS31.js";
import { t as useSoundStore_default } from "./useSoundStore-DGlq1OQS.js";
import { t as Progress } from "./progress-BnvrCCXj.js";
import { a as DrawerFooter, i as DrawerDescription, n as DrawerClose, o as DrawerHeader, r as DrawerContent, s as DrawerTitle, t as Drawer } from "./drawer-CxgrKtF-.js";
import { t as Slider } from "./slider-pl5PAnRt.js";
import { t as CheckInModal } from "./CheckInModal-Do5WKiwr.js";
import { t as SoundWaveVisualizer } from "./SoundWaveVisualizer-B9qRyLWV.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function NarrationEditor({ open, onOpenChange, initialConfig, videoThumbnail, onSave }) {
	const [config, setConfig] = (0, import_react.useState)(initialConfig || {
		hasNarration: true,
		style: "varzea",
		text: narrationStyles[0].previewText,
		volume: .8
	});
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const { playNarration, isPlayingNarration } = useSoundStore_default();
	(0, import_react.useEffect)(() => {
		setIsPlaying(isPlayingNarration);
	}, [isPlayingNarration]);
	const handleStyleChange = (styleId) => {
		const style = narrationStyles.find((s) => s.id === styleId);
		if (style) setConfig({
			...config,
			style: styleId,
			text: style.previewText
		});
	};
	const handlePreview = () => {
		playNarration(config);
	};
	const handleSave = () => {
		onSave(config);
		onOpenChange(false);
		toast.success("Narração aplicada com sucesso!", { description: "Seu vídeo agora tem uma narração personalizada." });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, {
			className: "h-[90vh] flex flex-col rounded-t-3xl bg-background",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerHeader, {
					className: "text-center pb-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-center mb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-primary/10 p-2 rounded-xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppIcon, { className: "h-8 w-8" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerTitle, {
							className: "text-xl font-bold flex items-center justify-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "h-5 w-5 text-gold" }), " Narração AI Personalizada"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerDescription, { children: "Escolha o estilo e personalize a narração do seu highlight." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto px-6 py-4 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-video rounded-xl overflow-hidden bg-black shadow-lg border border-border/50",
						children: [
							videoThumbnail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: videoThumbnail,
								alt: "Preview",
								className: "w-full h-full object-cover opacity-60"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full h-full flex items-center justify-center bg-zinc-900",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-12 w-12 text-zinc-700" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 flex flex-col items-center justify-center gap-4",
								children: [isPlaying && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gold/30 animate-in fade-in zoom-in",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-white font-bold text-lg italic text-center drop-shadow-md",
										children: [
											"\"",
											config.text,
											"\""
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									className: "h-14 w-14 rounded-full bg-primary/90 hover:bg-primary shadow-xl border-2 border-white/20",
									onClick: handlePreview,
									children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-6 w-6 text-white" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-6 w-6 text-white ml-1" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute bottom-4 left-0 right-0 px-8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoundWaveVisualizer, { isPlaying })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Estilo de Narração" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: config.style,
								onValueChange: handleStyleChange,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "h-12",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione um estilo" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: narrationStyles.map((style) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: style.id,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: style.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "ml-2 text-muted-foreground text-xs",
										children: ["- ", style.description]
									})]
								}, style.id)) })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Volume da Narração" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [Math.round(config.volume * 100), "%"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									value: [config.volume],
									max: 1,
									step: .1,
									onValueChange: (val) => setConfig({
										...config,
										volume: val[0]
									}),
									className: "flex-1"
								})]
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerFooter, {
					className: "pt-2 pb-8 px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "w-full h-12 text-lg font-bold rounded-full bg-gradient-to-r from-primary to-purple-800 shadow-lg",
						onClick: handleSave,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "mr-2 h-5 w-5" }), " Aplicar Narração"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerClose, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							className: "rounded-full",
							children: "Cancelar"
						})
					})]
				})
			]
		})
	});
}
function RecordHighlightDrawer({ open, onOpenChange, venueName = "Local" }) {
	const [step, setStep] = (0, import_react.useState)("record");
	const [duration, setDuration] = (0, import_react.useState)(30);
	const [narrationConfig, setNarrationConfig] = (0, import_react.useState)(null);
	const [showNarrationEditor, setShowNarrationEditor] = (0, import_react.useState)(false);
	const handleRecord = () => {
		setStep("processing");
		setTimeout(() => {
			setStep("tagging");
		}, 2e3);
	};
	const handleSkipNarration = () => {
		handleFinalSave();
	};
	const handleFinalSave = () => {
		toast.success("Highlight salvo com sucesso!", {
			description: narrationConfig ? "Vídeo com narração AI gerado!" : "Disponível na sua biblioteca de Lances.",
			icon: narrationConfig ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-gold" }) : void 0
		});
		onOpenChange(false);
		setTimeout(() => {
			setStep("record");
			setNarrationConfig(null);
		}, 500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, {
			className: "h-auto max-h-[90vh]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerTitle, {
					className: "flex items-center justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-5 w-5 text-primary" }), " Gravar Highlight"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerDescription, {
					className: "text-center",
					children: venueName
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 px-6",
					children: [
						step === "record" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-center gap-3",
									children: [
										10,
										20,
										30
									].map((sec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: duration === sec ? "default" : "outline",
										onClick: () => setDuration(sec),
										className: "rounded-full w-20",
										children: [sec, "s"]
									}, sec))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "aspect-video bg-black rounded-xl relative overflow-hidden flex items-center justify-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-12 w-12 text-white/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute bottom-4 left-4 text-white text-xs bg-red-600 px-2 py-1 rounded animate-pulse",
										children: "REC BUFFER"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "lg",
									className: "w-full h-14 rounded-full text-lg shadow-lg bg-red-600 hover:bg-red-700 text-white",
									onClick: handleRecord,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "mr-2 h-6 w-6" }),
										" Capturar Últimos",
										" ",
										duration,
										"s"
									]
								})
							]
						}),
						step === "processing" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-center py-10 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-12 w-12 animate-spin text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-lg",
									children: "Processando replay..."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
									value: 66,
									className: "w-[60%]"
								})
							]
						}),
						step === "tagging" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 animate-fade-in",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "aspect-video bg-black/90 rounded-xl relative overflow-hidden flex items-center justify-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "https://img.usecurling.com/p/400/225?q=soccer%20action",
										className: "w-full h-full object-cover opacity-80",
										alt: "Preview"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs",
										children: ["00:", duration]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "font-semibold mb-2 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }), " Marcar Jogadores"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-2 overflow-x-auto pb-2",
									children: [
										1,
										2,
										3,
										4
									].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-center gap-1 cursor-pointer opacity-60 hover:opacity-100 transition-opacity",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
											className: "h-12 w-12 border-2 border-transparent hover:border-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: `https://img.usecurling.com/ppl/thumbnail?gender=male&seed=${i + 20}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, { children: ["P", i] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px]",
											children: ["Player ", i]
										})]
									}, i))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "lg",
									className: "w-full rounded-full",
									onClick: () => setStep("narration"),
									children: "Continuar"
								})
							]
						}),
						step === "narration" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-6 animate-fade-in text-center py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-primary/5 p-6 rounded-2xl border border-primary/20",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-8 w-8 text-gold animate-pulse" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-xl mb-2",
										children: "Narração Automática AI"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground mb-6",
										children: "Dê vida ao seu highlight! Nossa IA detecta o momento exato e narra sua jogada como um profissional."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											className: "w-full h-12 rounded-full text-base font-bold bg-gradient-to-r from-primary to-purple-600 shadow-md",
											onClick: () => setShowNarrationEditor(true),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "mr-2 h-5 w-5" }), " Adicionar Narração"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											className: "w-full rounded-full",
											onClick: handleSkipNarration,
											children: "Salvar sem Narração"
										})]
									})
								]
							})
						})
					]
				}),
				step !== "narration" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerFooter, {
					className: "pt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerClose, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							children: "Cancelar"
						})
					})
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NarrationEditor, {
		open: showNarrationEditor,
		onOpenChange: setShowNarrationEditor,
		videoThumbnail: "https://img.usecurling.com/p/400/225?q=soccer%20action",
		onSave: (config) => {
			setNarrationConfig(config);
			handleFinalSave();
		}
	})] });
}
function VenueDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const venue = mockVenues.find((v) => v.id === id);
	const [showRecord, setShowRecord] = (0, import_react.useState)(false);
	const [showCheckIn, setShowCheckIn] = (0, import_react.useState)(false);
	if (!venue) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col items-center justify-center gap-4 bg-background p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-20 w-20 bg-secondary rounded-full flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-10 w-10 text-muted-foreground" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold",
				children: "Local não encontrado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-center",
				children: "O local que você está procurando não existe ou foi removido."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => navigate("/explore/venues"),
				children: "Voltar para Lista"
			})
		]
	});
	const handleBooking = () => {
		toast.success("Solicitação de reserva enviada!", { description: "O estabelecimento entrará em contato para confirmar." });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-24 animate-fade-in relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-72 w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: venue.image,
						alt: venue.name,
						className: "w-full h-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "absolute top-4 left-4 bg-background/50 backdrop-blur-md hover:bg-background/80 rounded-full text-foreground z-20",
						onClick: () => navigate(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-4 right-4 flex gap-2 z-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "bg-background/50 backdrop-blur-md hover:bg-background/80 rounded-full text-foreground",
							onClick: () => {
								navigator.clipboard.writeText(window.location.href);
								toast.info("Link copiado para a área de transferência");
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-5 w-5" })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 -mt-10 relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-end mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 mr-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "mb-2 bg-primary/20 text-primary hover:bg-primary/30 border-none backdrop-blur-sm",
								children: venue.type
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl font-bold leading-tight text-foreground drop-shadow-sm",
								children: venue.name
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-end shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-background/80 backdrop-blur px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-bold text-sm shadow-sm border border-border/50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-gold text-gold" }),
									" ",
									venue.rating
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground mt-1 font-medium",
								children: [venue.reviews, " avaliações"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 mb-6 p-4 rounded-2xl bg-secondary/30 border border-border/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: venue.address
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [
										venue.location,
										" • ",
										venue.distance,
										" de você"
									]
								})]
							})]
						}), venue.openHours && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-sm mt-2 pt-2 border-t border-border/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-primary shrink-0" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: venue.openHours
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-emerald-500 font-bold ml-auto px-2 py-0.5 bg-emerald-500/10 rounded-full",
									children: "Aberto"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3 mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "w-full h-12 rounded-xl text-base font-bold shadow-md bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all hover:scale-[1.02] active:scale-95",
							onClick: () => setShowCheckIn(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mr-2 h-5 w-5" }), " Check-in"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "w-full h-12 rounded-xl text-base font-bold shadow-md bg-gradient-to-r from-primary to-purple-700 hover:from-primary/90 hover:to-purple-800 transition-all hover:scale-[1.02] active:scale-95",
							onClick: () => setShowRecord(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "mr-2 h-5 w-5" }), " Gravar Lance"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-bold text-lg flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-5 w-5 text-primary" }), "Sobre o Local"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground leading-relaxed text-sm",
								children: venue.description
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-lg",
								children: "Comodidades"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: venue.amenities.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									className: "px-3 py-1.5 text-sm font-normal bg-secondary border border-border/50",
									children: item
								}, item))
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border/50 z-20 safe-area-bottom",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-4 max-w-md mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground font-medium",
						children: "Preço estimado"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xl font-bold text-primary",
						children: venue.price
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "lg",
						className: "rounded-full px-8 font-bold shadow-lg shadow-primary/20",
						onClick: handleBooking,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "mr-2 h-5 w-5" }), " Reservar Horário"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordHighlightDrawer, {
				open: showRecord,
				onOpenChange: setShowRecord,
				venueName: venue.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckInModal, {
				open: showCheckIn,
				onOpenChange: setShowCheckIn,
				venueName: venue.name,
				points: 100
			})
		]
	});
}
export { VenueDetails as default };

//# sourceMappingURL=VenueDetails-BQyFsQEI.js.map