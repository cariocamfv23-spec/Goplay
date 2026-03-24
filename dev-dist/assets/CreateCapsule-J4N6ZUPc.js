import "./chevron-down-DD0uNOWN.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CSxphnuN.js";
import { t as FileText } from "./file-text-DgCw2V2P.js";
import { t as Video } from "./video-D0Mvrfl8.js";
import { Tr as Calendar, Yr as require_jsx_runtime, Zn as Lock, ai as require_react, an as Button, bn as cn, jr as ArrowLeft, ni as useNavigate, vn as toast } from "./index-wbjedP09.js";
import { n as CardContent, t as Card } from "./card-DF86Q89l.js";
import { t as Label } from "./label-BFtdsJ9k.js";
import { t as Input } from "./input-Cc5RcaoH.js";
import { t as Textarea } from "./textarea-Btu9Qtyq.js";
import { t as useTimeCapsuleStore } from "./useTimeCapsuleStore-BBXEH6fB.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
var calculateOpenDate = (months) => {
	const d = /* @__PURE__ */ new Date();
	d.setMonth(d.getMonth() + months);
	return d.toISOString();
};
function CreateCapsule() {
	const navigate = useNavigate();
	const { addCapsule } = useTimeCapsuleStore();
	const [title, setTitle] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("text");
	const [content, setContent] = (0, import_react.useState)("");
	const [videoFile, setVideoFile] = (0, import_react.useState)(null);
	const [openPeriod, setOpenPeriod] = (0, import_react.useState)("6");
	const [customDate, setCustomDate] = (0, import_react.useState)("");
	const [isSealing, setIsSealing] = (0, import_react.useState)(false);
	const [sealProgress, setSealProgress] = (0, import_react.useState)(0);
	const fileInputRef = (0, import_react.useRef)(null);
	const handleVideoChange = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			if (!file.type.startsWith("video/")) {
				toast.error("Selecione um arquivo de vídeo válido.");
				return;
			}
			setVideoFile(file);
		}
	};
	const handleSubmit = () => {
		if (!title || !description) {
			toast.error("Preencha o título e a descrição.");
			return;
		}
		if (type === "text" && !content) {
			toast.error("Escreva sua mensagem.");
			return;
		}
		if (type === "video" && !videoFile) {
			toast.error("Anexe o vídeo da sua cápsula.");
			return;
		}
		if (openPeriod === "custom" && !customDate) {
			toast.error("Selecione a data de abertura.");
			return;
		}
		setIsSealing(true);
	};
	(0, import_react.useEffect)(() => {
		if (isSealing) {
			const interval = setInterval(() => {
				setSealProgress((prev) => {
					if (prev >= 100) {
						clearInterval(interval);
						return 100;
					}
					return prev + 2;
				});
			}, 40);
			return () => clearInterval(interval);
		}
	}, [isSealing]);
	(0, import_react.useEffect)(() => {
		if (sealProgress >= 100) {
			const timer = setTimeout(() => {
				const finalOpenDate = openPeriod === "custom" ? new Date(customDate).toISOString() : calculateOpenDate(Number(openPeriod));
				addCapsule({
					title,
					description,
					type,
					content: type === "video" ? "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" : content,
					openAt: finalOpenDate
				});
				navigate("/timecapsule");
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [
		sealProgress,
		openPeriod,
		customDate,
		title,
		description,
		type,
		content,
		addCapsule,
		navigate
	]);
	const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	if (isSealing) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 flex flex-col items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gold blur-3xl opacity-30 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
					className: "w-32 h-32 text-gold animate-[bounce_1s_ease-in-out_infinite]",
					strokeWidth: 1.5
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-2 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200 uppercase tracking-widest",
						children: "Selando Cápsula"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-gold/60 font-mono text-sm",
						children: "Criptografia AES-256 ativada..."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-64 h-2 bg-white/10 rounded-full mt-4 overflow-hidden relative",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-0 left-0 bottom-0 bg-gold transition-all duration-[40ms]",
							style: { width: `${sealProgress}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-gold/40 mt-2 font-mono",
						children: [sealProgress, "%"]
					})
				]
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 bg-background/80 backdrop-blur-md z-20 p-4 border-b border-border/50 flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: () => navigate(-1),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-bold text-lg text-foreground",
				children: "Nova Time Capsule"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground font-medium",
				children: "Registre sua promessa para o futuro"
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 max-w-xl mx-auto space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "bg-primary/5 border-primary/20 shadow-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-4 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-foreground font-semibold",
								children: "Título da meta"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Ex: Ser convocado para a seleção",
								value: title,
								onChange: (e) => setTitle(e.target.value),
								className: "bg-background text-foreground font-medium placeholder:text-muted-foreground/70",
								maxLength: 60
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-foreground font-semibold",
								children: "Descrição"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Resumo do objetivo...",
								value: description,
								onChange: (e) => setDescription(e.target.value),
								className: "bg-background text-foreground font-medium placeholder:text-muted-foreground/70",
								maxLength: 100
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-foreground font-semibold",
						children: "Formato do Registro"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: type === "text" ? "default" : "outline",
							className: cn("h-12 border-2 font-bold", type === "text" && "bg-primary border-primary text-white"),
							onClick: () => setType("text"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mr-2 h-5 w-5" }), " Texto"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: type === "video" ? "default" : "outline",
							className: cn("h-12 border-2 font-bold", type === "video" && "bg-primary border-primary text-white"),
							onClick: () => setType("video"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "mr-2 h-5 w-5" }), " Vídeo"]
						})]
					})]
				}),
				type === "text" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 animate-in fade-in",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-foreground font-semibold",
							children: "Sua Mensagem"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("text-xs font-medium", content.length >= 500 ? "text-red-500 font-bold" : "text-slate-500 dark:text-slate-400"),
							children: [content.length, "/500"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						placeholder: "Escreva sua promessa detalhada aqui...",
						className: "min-h-[150px] resize-none bg-background/50 text-foreground font-medium placeholder:text-muted-foreground/70",
						value: content,
						onChange: (e) => setContent(e.target.value),
						maxLength: 500
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 animate-in fade-in",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-foreground font-semibold",
						children: "Gravar/Anexar Vídeo (Máx. 2 minutos)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors", videoFile ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-secondary/50"),
						onClick: () => fileInputRef.current?.click(),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								ref: fileInputRef,
								className: "hidden",
								accept: "video/*",
								onChange: handleVideoChange
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: cn("w-10 h-10 mx-auto mb-3", videoFile ? "text-foreground" : "text-muted-foreground/50") }),
							videoFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-foreground",
								children: videoFile.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-1 font-medium",
								children: "Toque para trocar"
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-foreground",
								children: "Toque para selecionar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-1 font-medium",
								children: "MP4, MOV (Máx 50MB)"
							})] })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							className: "flex items-center gap-2 text-foreground font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-4 h-4 text-gold" }), " Quando você quer abrir?"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: openPeriod,
							onValueChange: setOpenPeriod,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-12 bg-background border-2 border-border/50 font-medium text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione a data" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "6",
									children: "Em 6 meses"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "12",
									children: "Em 1 ano"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "24",
									children: "Em 2 anos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "36",
									children: "Em 3 anos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "60",
									children: "Em 5 anos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "custom",
									children: "Data personalizada"
								})
							] })]
						}),
						openPeriod === "custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-2 animate-in slide-in-from-top-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								className: "h-12 bg-background text-foreground font-medium",
								min: today,
								value: customDate,
								onChange: (e) => setCustomDate(e.target.value)
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "w-full h-14 bg-gradient-to-r from-gold to-yellow-500 hover:from-gold hover:to-yellow-400 text-black font-black text-lg shadow-[0_0_20px_rgba(255,215,0,0.3)] border border-yellow-300 gap-2",
						onClick: handleSubmit,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-5 h-5" }), "SELAR CÁPSULA"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs text-muted-foreground mt-3 font-medium",
						children: "Aviso: Uma vez selada, o conteúdo não poderá ser editado ou apagado."
					})]
				})
			]
		})]
	});
}
export { CreateCapsule as default };

//# sourceMappingURL=CreateCapsule-J4N6ZUPc.js.map