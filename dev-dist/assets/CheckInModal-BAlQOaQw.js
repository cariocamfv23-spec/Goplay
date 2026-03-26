import { t as LoaderCircle } from "./loader-circle-D25rQ1nM.js";
import { t as RefreshCw } from "./refresh-cw-o_awan1j.js";
import { Cr as Check, Er as Camera, Sn as X, Zn as MapPin, Zr as require_jsx_runtime, an as Button, bn as cn, d as DialogFooter, f as DialogHeader, l as DialogContent, p as DialogTitle, s as Dialog, si as require_react, u as DialogDescription, xr as CircleCheckBig } from "./index-CDMiuv4n.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function CheckInModal({ open, onOpenChange, venueName, points }) {
	const [step, setStep] = (0, import_react.useState)("idle");
	const [image, setImage] = (0, import_react.useState)(null);
	const videoRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const [cameraError, setCameraError] = (0, import_react.useState)(null);
	const stopCamera = () => {
		if (streamRef.current) {
			streamRef.current.getTracks().forEach((track) => track.stop());
			streamRef.current = null;
		}
	};
	const startCamera = async () => {
		setCameraError(null);
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: "user" },
				audio: false
			});
			streamRef.current = stream;
			if (videoRef.current) videoRef.current.srcObject = stream;
			setStep("camera");
		} catch (err) {
			console.error("Error accessing camera:", err);
			setCameraError("Não foi possível acessar a câmera. Verifique as permissões.");
		}
	};
	const handleCapture = () => {
		if (videoRef.current && canvasRef.current) {
			const video = videoRef.current;
			const canvas = canvasRef.current;
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.translate(canvas.width, 0);
				ctx.scale(-1, 1);
				ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
				setImage(canvas.toDataURL("image/jpeg", .8));
				setStep("preview");
				stopCamera();
			}
		}
	};
	const handleRetake = () => {
		setImage(null);
		startCamera();
	};
	const handleConfirm = () => {
		setStep("loading");
		setTimeout(() => {
			setStep("success");
		}, 1500);
	};
	const handleInternalClose = () => {
		stopCamera();
		setStep("idle");
		setImage(null);
		setCameraError(null);
		onOpenChange(false);
	};
	(0, import_react.useEffect)(() => {
		return () => {
			stopCamera();
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) {
			stopCamera();
			setStep("idle");
			setImage(null);
			setCameraError(null);
		}
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: handleInternalClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: cn("sm:max-w-md text-center p-0 overflow-hidden gap-0 bg-background transition-all duration-300", step === "camera" ? "h-[80vh] sm:h-auto border-0 sm:border" : ""),
			children: [
				step !== "camera" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					className: "p-6 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "text-center",
						children: ["Check-in: ", venueName]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
						className: "text-center",
						children: [
							step === "idle" && "Confirme sua presença com uma selfie.",
							step === "preview" && "Como ficou a foto?",
							step === "success" && "Parabéns! Pontos recebidos."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("flex flex-col items-center justify-center transition-all", step === "camera" ? "h-full w-full bg-black relative" : "p-6 py-4"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
							ref: canvasRef,
							className: "hidden"
						}),
						step === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-6 py-4 animate-in fade-in zoom-in-95",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-pulse",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-10 w-10" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground",
									children: [
										"Para validar seu check-in e ganhar",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-primary",
											children: [
												"+",
												points,
												" pontos"
											]
										}),
										", precisamos confirmar que você está no local."
									]
								}), cameraError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-destructive font-medium bg-destructive/10 p-2 rounded-md",
									children: cameraError
								})]
							})]
						}),
						step === "camera" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-full h-full flex flex-col bg-black animate-in fade-in",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
									ref: videoRef,
									autoPlay: true,
									playsInline: true,
									muted: true,
									className: "w-full h-full object-cover flex-1",
									style: { transform: "scaleX(-1)" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-4 right-4 z-10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "text-white hover:bg-white/20 rounded-full",
										onClick: handleInternalClose,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute bottom-0 left-0 right-0 p-8 flex justify-center items-center bg-gradient-to-t from-black/80 to-transparent",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: handleCapture,
										className: "h-20 w-20 rounded-full border-4 border-white bg-white/20 flex items-center justify-center hover:bg-white/40 transition-all active:scale-95 ring-4 ring-white/10",
										"aria-label": "Tirar foto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 w-16 rounded-full bg-white" })
									})
								})
							]
						}),
						step === "preview" && image && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-[3/4] w-full max-w-[240px] mx-auto rounded-xl overflow-hidden shadow-lg border-2 border-primary/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: image,
									alt: "Selfie preview",
									className: "w-full h-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "No local" })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Essa foto será vinculada ao seu check-in."
							})]
						}),
						step === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-8 flex flex-col items-center gap-4 animate-in fade-in",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-20 w-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 text-primary animate-spin" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium animate-pulse text-sm",
								children: "Validando localização e foto..."
							})]
						}),
						step === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-6 flex flex-col items-center gap-4 animate-in zoom-in duration-300",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 shadow-sm animate-bounce",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-12 w-12" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-xl text-green-700 dark:text-green-400",
										children: "Check-in Realizado!"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-muted-foreground text-sm",
										children: [
											"Você ganhou",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-foreground",
												children: [
													"+",
													points,
													" pontos"
												]
											})
										]
									})]
								}),
								image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 w-16 h-16 rounded-full overflow-hidden border-2 border-green-500 shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: image,
										className: "w-full h-full object-cover"
									})
								})
							]
						})
					]
				}),
				step !== "camera" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "p-6 pt-0 sm:justify-center gap-2",
					children: [
						step === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: startCamera,
							className: "w-full gap-2 text-base h-12 rounded-xl shadow-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-5 w-5" }), "Tirar Selfie"]
						}),
						step === "preview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								onClick: handleRetake,
								className: "flex-1 gap-2 h-11 rounded-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" }), "Tirar outra"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: handleConfirm,
								className: "flex-1 gap-2 bg-green-600 hover:bg-green-700 h-11 rounded-xl text-white shadow-md hover:shadow-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), "Confirmar"]
							})]
						}),
						step === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: handleInternalClose,
							className: "w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground h-11 rounded-xl",
							children: "Fechar"
						}),
						step === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: true,
							className: "w-full h-11 rounded-xl",
							children: "Processando..."
						})
					]
				})
			]
		})
	});
}
export { CheckInModal as t };

//# sourceMappingURL=CheckInModal-BAlQOaQw.js.map