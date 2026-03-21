import "./chevron-down-BLS96ANz.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DqjwchaF.js";
import { t as Download } from "./download-C2eaf4BB.js";
import "./ellipsis-CXgLiqGX.js";
import { t as ShareDialog } from "./ShareDialog-c1aX9rFZ.js";
import "./mail-BuOgm4Yw.js";
import "./message-circle-Cffv3wMk.js";
import { t as Pause } from "./pause-DgOAwsGb.js";
import { t as Play } from "./play-R3Xws_lL.js";
import { t as RotateCcw } from "./rotate-ccw-ga6O-4N1.js";
import { t as Share2 } from "./share-2-Q1Z2Y130.js";
import { t as Upload } from "./upload-3FRi5Pd6.js";
import { t as WandSparkles } from "./wand-sparkles-Chxlz2Qv.js";
import { An as Sparkles, I as Badge, Jr as useNavigate, Vr as require_jsx_runtime, Zr as require_react, en as Button, fn as toast, kt as narrationStyles, wr as ArrowLeft } from "./index-D9lGzB06.js";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DREy8Wg-.js";
import { t as Label } from "./label-D2jezcj0.js";
import { t as Progress } from "./progress-ByBvcjO5.js";
import { t as Slider } from "./slider-DS7GON2J.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function VarzeaEditor() {
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)("select");
	const [selectedVideo, setSelectedVideo] = (0, import_react.useState)(null);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const [processingMessage, setProcessingMessage] = (0, import_react.useState)("Iniciando motores...");
	const [showShare, setShowShare] = (0, import_react.useState)(false);
	const [narrationStyle, setNarrationStyle] = (0, import_react.useState)("varzea");
	const [effectIntensity, setEffectIntensity] = (0, import_react.useState)([50]);
	const [addMusic, setAddMusic] = (0, import_react.useState)("yes");
	const funnyMessages = [
		"Calibrando a corneta...",
		"Adicionando efeitos sonoros questionáveis...",
		"Detectando jogadas duvidosas...",
		"Aplicando filtro de habilidade...",
		"Consultando o VAR...",
		"Gerando memes automáticos..."
	];
	const handleFileSelect = () => {
		toast.success("Vídeo carregado com sucesso!");
		setSelectedVideo("https://img.usecurling.com/p/400/800?q=soccer%20fail&color=orange");
		setStep("config");
	};
	const handleProcess = () => {
		setStep("processing");
		setProgress(0);
		let currentProgress = 0;
		const interval = setInterval(() => {
			currentProgress += Math.random() * 15;
			if (currentProgress > 100) {
				currentProgress = 100;
				clearInterval(interval);
				setTimeout(() => setStep("result"), 500);
			}
			setProgress(currentProgress);
			setProcessingMessage(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
		}, 800);
	};
	const handleReset = () => {
		setStep("select");
		setSelectedVideo(null);
		setProgress(0);
		setIsPlaying(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/40 p-4 flex items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => step === "select" ? navigate(-1) : handleReset(),
						className: "rounded-full",
						children: step === "select" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-lg font-bold flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "h-5 w-5 text-gold" }), " Edição Várzea"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-9" }),
					" "
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 p-4 max-w-md mx-auto w-full flex flex-col justify-center",
				children: [
					step === "select" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6 animate-in slide-in-from-bottom-4 duration-500",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-2xl font-bold",
									children: "Escolha seu Highlight"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "Selecione um vídeo da sua galeria para nossa IA transformar em entretenimento puro."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer bg-secondary/20",
								onClick: handleFileSelect,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "flex flex-col items-center justify-center h-64 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-10 w-10 text-primary" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-lg",
											children: "Toque para enviar"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground mt-1",
											children: "MP4, MOV até 1 min"
										})]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [1, 2].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "aspect-video rounded-xl bg-muted relative overflow-hidden group cursor-pointer",
									onClick: handleFileSelect,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: `https://img.usecurling.com/p/300/200?q=soccer&seed=${i}`,
											alt: "Recent",
											className: "w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-0 flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-8 w-8 text-white opacity-80" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: "absolute bottom-2 right-2 bg-black/60 hover:bg-black/60",
											children: "Recente"
										})
									]
								}, i))
							})
						]
					}),
					step === "config" && selectedVideo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6 animate-in slide-in-from-right-4 duration-500",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "aspect-[9/16] max-h-[40vh] bg-black rounded-2xl overflow-hidden relative shadow-xl mx-auto border border-border/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: selectedVideo,
								alt: "Selected",
								className: "w-full h-full object-cover opacity-80"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									className: "text-lg py-1 px-3 backdrop-blur-md",
									children: "Pré-visualização"
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border-border/50 shadow-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-lg",
									children: "Personalizar Edição"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Configure a IA do Várzea" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "space-y-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Estilo de Narração" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												value: narrationStyle,
												onValueChange: setNarrationStyle,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: narrationStyles.map((style) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: style.id,
													children: style.name
												}, style.id)) })]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Intensidade da Zoeira" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-xs text-muted-foreground font-mono",
														children: [effectIntensity, "%"]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
													value: effectIntensity,
													onValueChange: setEffectIntensity,
													max: 100,
													step: 10,
													className: "py-2"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: "Define a frequência de efeitos sonoros e visuais."
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Trilha Sonora" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												value: addMusic,
												onValueChange: setAddMusic,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "yes",
														children: "Música Épica"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "funny",
														children: "Música Engraçada"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "none",
														children: "Som Original"
													})
												] })]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "w-full h-12 text-lg font-bold bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 shadow-lg",
									onClick: handleProcess,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "mr-2 h-5 w-5" }), " Gerar Magic Edit"]
								}) })
							]
						})]
					}),
					step === "processing" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-500 py-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-32 w-32 rounded-full border-4 border-muted flex items-center justify-center bg-secondary/30",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "h-12 w-12 text-muted-foreground/20" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin",
										style: { animationDuration: "1.5s" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0 flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-xl",
											children: [Math.round(progress), "%"]
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 text-center max-w-xs mx-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-bold animate-pulse",
									children: "Processando vídeo..."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground transition-all duration-300 h-6",
									children: processingMessage
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-full max-w-xs space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Upload" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AI Magic" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Render" })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
									value: progress,
									className: "h-2"
								})]
							})
						]
					}),
					step === "result" && selectedVideo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6 animate-in slide-in-from-bottom-8 duration-500 pb-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600",
									children: "Está Pronto!"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground text-sm",
									children: "Seu vídeo foi editado com sucesso."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-[9/16] max-h-[50vh] bg-black rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/20 group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: selectedVideo,
										alt: "Result",
										className: "w-full h-full object-cover"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute top-4 left-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: "bg-gold text-black hover:bg-gold font-bold animate-pulse",
											children: "Várzea Edition"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute bottom-1/4 right-8 rotate-12 opacity-80",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-4xl",
											children: "🔥"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute top-1/4 right-4 -rotate-12 opacity-80",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-4xl",
											children: "⚽️"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0 flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											className: "h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/40 transition-transform hover:scale-110",
											onClick: () => setIsPlaying(!isPlaying),
											children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-8 w-8 text-white fill-white" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-8 w-8 text-white fill-white ml-1" })
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									className: "h-14 rounded-xl gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors",
									onClick: () => toast.success("Vídeo salvo na galeria!"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-5 w-5" }), "Salvar"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "h-14 rounded-xl gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20",
									onClick: () => setShowShare(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-5 w-5" }), "Compartilhar"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "bg-secondary/30 border-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "p-4 flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-gold" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold",
											children: "Dica Pro"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground",
											children: "Vídeos com a tag #GoplayVarzea têm 2x mais alcance no feed!"
										})]
									})]
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareDialog, {
				open: showShare,
				onOpenChange: setShowShare,
				title: "Minha Jogada Várzea Edit",
				description: "Confira esse edit absurdo que a IA do Goplay fez do meu lance! 🔥⚽️"
			})
		]
	});
}
export { VarzeaEditor as default };

//# sourceMappingURL=VarzeaEditor-gbMRTDEp.js.map