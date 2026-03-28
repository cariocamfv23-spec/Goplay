import { t as CircleCheck } from "./circle-check-CUdEwqwG.js";
import { t as TriangleAlert } from "./triangle-alert-C0fjOQi0.js";
import { Lr as ArrowLeft, an as Button, di as require_react, li as require_jsx_runtime, si as useNavigate, zr as Activity } from "./index-BEPdDYyI.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function InjuryScanner() {
	const navigate = useNavigate();
	const [scanning, setScanning] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setScanning(false), 3e3);
		return () => clearTimeout(timer);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-zinc-950 text-white flex flex-col relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 flex items-center justify-between sticky top-0 z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => navigate(-1),
						className: "text-white hover:bg-white/10 rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-bold flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5 text-red-500" }), " Scanner Biométrico"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col items-center justify-center p-6 relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-sm aspect-[3/4] bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 flex items-center justify-center opacity-30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "https://img.usecurling.com/i?q=human%20body%20silhouette&color=white&shape=outline",
								alt: "Body Silhouette",
								className: "h-3/4 w-auto object-contain"
							})
						}),
						scanning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-[scan_2s_ease-in-out_infinite]" }),
						!scanning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 p-6 flex flex-col justify-between animate-fade-in bg-black/40 backdrop-blur-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "self-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-green-500/20 border border-green-500 text-green-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }), " Ombros OK"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "self-start mt-20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-yellow-500/20 border border-yellow-500 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3 w-3" }), " Joelho Direito"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-zinc-300 mt-1 max-w-[120px] bg-black/60 p-1 rounded",
										children: "Sobrecarga detectada. Risco moderado de tendinite."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-auto bg-zinc-900/90 border border-zinc-700 p-4 rounded-xl",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-bold mb-2",
											children: "Análise Concluída"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center text-sm mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-zinc-400",
												children: "Fadiga Muscular"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-yellow-500 font-bold",
												children: "Moderada"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-2 bg-zinc-800 rounded-full overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-[60%] bg-yellow-500" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											className: "w-full mt-4",
											variant: "outline",
											onClick: () => navigate("/ai/library"),
											children: "Ver Exercícios Preventivos"
										})
									]
								})
							]
						})
					]
				}), scanning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-zinc-400 animate-pulse",
					children: "Analisando biomecânica..."
				})]
			})
		]
	});
}
export { InjuryScanner as default };

//# sourceMappingURL=InjuryScanner-COIqzgjy.js.map