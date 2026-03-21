import "./box-Dix8YfWV.js";
import "./chevron-down-0moyF_uj.js";
import { t as ChevronLeft } from "./chevron-left-B0W1024f.js";
import "./select-DsJOBt8Y.js";
import { t as Post3DGenerator } from "./Post3DGenerator-Cbfwt-l0.js";
import { t as Ghost } from "./ghost-Ckc54u9w.js";
import "./pause-pr6KJoEx.js";
import { t as Play } from "./play-DkAi8h78.js";
import "./rotate-ccw-BCpgclif.js";
import { t as Upload } from "./upload-BThIm-uc.js";
import "./video-By9dW3el.js";
import "./wand-sparkles-DCHUCyWC.js";
import { En as Sparkles, Lr as require_jsx_runtime, Wr as useNavigate, Xt as Button, cn as toast, qr as require_react } from "./index-YiRCBu0v.js";
import { n as CardContent, t as Card } from "./card-C2B2zboe.js";
import "./dist-B5ADQoVP.js";
import "./progress-DNNfsHdl.js";
import "./tabs-1ZT7Tdte.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function GhostPlay() {
	const navigate = useNavigate();
	const [videoFile, setVideoFile] = (0, import_react.useState)(null);
	const fileInputRef = (0, import_react.useRef)(null);
	const handleFileSelect = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			if (!file.type.startsWith("video/")) {
				toast.error("Por favor, selecione um arquivo de vídeo.");
				return;
			}
			setVideoFile(file);
		}
	};
	const handle3DConfirm = (mode) => {
		toast.success("Replay Salvo na Galeria!", { description: `Modo salvo: ${mode.toUpperCase()}. Você pode usá-lo em seus posts.` });
		setVideoFile(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 flex items-center gap-4 border-b border-border/40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: () => navigate(-1),
				className: "rounded-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-6 h-6" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-xl font-bold flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ghost, { className: "w-6 h-6 text-indigo-500" }), "Ghost Play 3D"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 max-w-xl mx-auto space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-6 text-center space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-8 h-8 text-indigo-500" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold",
								children: "Transforme seus Vídeos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground leading-relaxed",
								children: "Use nossa AI para reconstruir seus movimentos em um ambiente 3D Low-Poly. Analise sua técnica de qualquer ângulo."
							})
						]
					})
				}),
				videoFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-border shadow-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Post3DGenerator, {
							videoFile,
							onConfirm: handle3DConfirm,
							onCancel: () => setVideoFile(null)
						})
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-muted/50 transition-colors group",
					onClick: () => fileInputRef.current?.click(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-20 h-20 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-8 h-8 text-muted-foreground" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-lg",
								children: "Carregar Vídeo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Toque para selecionar da galeria"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							ref: fileInputRef,
							className: "hidden",
							accept: "video/*",
							onChange: handleFileSelect
						})
					]
				}),
				!videoFile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-sm text-muted-foreground uppercase tracking-wider",
						children: "Exemplos da Comunidade"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [1, 2].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "aspect-video bg-zinc-900 rounded-lg overflow-hidden relative group cursor-pointer border border-border/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-8 h-8 text-white opacity-80" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white font-bold",
								children: ["REPLAY #", i]
							})]
						}, i))
					})]
				})
			]
		})]
	});
}
export { GhostPlay as default };

//# sourceMappingURL=GhostPlay-BdwBz0R_.js.map