import "./box-rGW5ObNs.js";
import "./chevron-down-BN8_tzkS.js";
import { t as ChevronLeft } from "./chevron-left-BeZEqFYo.js";
import "./select-C74IaKzq.js";
import { t as Post3DGenerator } from "./Post3DGenerator-DZA_E_Pl.js";
import { t as Ghost } from "./ghost-WPr9pAGX.js";
import "./pause-CPxmTl3u.js";
import { t as Play } from "./play-DrKRSOvu.js";
import "./rotate-ccw-BSUdvtp7.js";
import { t as Upload } from "./upload-Bcd863hQ.js";
import "./video-B8uTFA7O.js";
import "./wand-sparkles-pY7LomNM.js";
import { Rn as Sparkles, an as Button, ci as useNavigate, di as require_react, ti as require_jsx_runtime, vn as toast } from "./index-9FdtLN8r.js";
import { n as CardContent, t as Card } from "./card-CGnIfxBc.js";
import "./progress-6msWuNJR.js";
import "./tabs-CVV5Rqkx.js";
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

//# sourceMappingURL=GhostPlay-2qe_4ubX.js.map