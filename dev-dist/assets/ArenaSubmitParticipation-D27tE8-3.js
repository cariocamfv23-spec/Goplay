import { t as Video } from "./video-BP8oc29R.js";
import { Dr as Activity, Hr as require_jsx_runtime, J as mockCurrentUser, Qr as require_react, Tr as ArrowLeft, Xr as useParams, Yr as useNavigate, dn as toast, en as Button, mn as Zap, pn as cn } from "./index-GT0xtY_b.js";
import { t as Input } from "./input-bR8Jvcsx.js";
import "./dist-B7c39uJZ.js";
import { t as Switch } from "./switch-CXzErt94.js";
import { t as Label } from "./label-CTH-YpoY.js";
import { t as useArenaStore } from "./useArenaStore-BGXdVLbL.js";
import { t as useFeedStore } from "./useFeedStore-Cw9N___c.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function ArenaSubmitParticipation() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { challenges, addParticipation } = useArenaStore();
	const addPost = useFeedStore((state) => state.addPost);
	const challenge = challenges.find((c) => c.id === id);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(false);
	const [autoPublish, setAutoPublish] = (0, import_react.useState)(false);
	if (!challenge) return null;
	const handleSubmit = () => {
		setIsSubmitting(true);
		setTimeout(() => {
			addParticipation({
				challengeId: challenge.id,
				videoUrl: "https://video.mp4",
				autoPublish,
				status: "evaluated",
				finalScore: 92.5
			});
			if (autoPublish) addPost({
				type: "arena_result",
				user: mockCurrentUser,
				content: `Acabei de receber meu resultado no ${challenge.title}! Muito orgulho dessa conquista na Arena Goplay. 🔥`,
				arenaResult: {
					challengeId: challenge.id,
					challengeTitle: challenge.title,
					rank: 1,
					score: 92.5,
					medal: "gold",
					banner: challenge.banner
				}
			});
			setIsSubmitting(false);
			setSuccess(true);
			toast.success(autoPublish ? "Participação enviada e publicada no feed!" : "Participação enviada com sucesso!");
		}, 2e3);
	};
	if (success) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-10 h-10 text-primary animate-pulse" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-black mb-2",
				children: "Enviado com Sucesso!"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted-foreground mb-8",
				children: [
					"Sua participação foi processada.",
					" ",
					autoPublish && "O resultado já está disponível no seu Feed."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full max-w-xs h-12 font-bold",
				onClick: () => navigate(`/arena/${challenge.id}`),
				children: "Voltar para o Desafio"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-secondary/30 p-4 flex items-center gap-3 border-b border-border/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "rounded-full",
					onClick: () => navigate(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground uppercase tracking-widest font-bold",
					children: "Enviar Participação"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-bold truncate max-w-[200px]",
					children: challenge.title
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 space-y-6",
				children: [
					challenge.videoRequired && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "font-bold text-base",
							children: "Vídeo Oficial"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-2 border-dashed border-border/50 rounded-xl h-48 flex flex-col items-center justify-center bg-muted/20 text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "w-10 h-10 mb-3 opacity-50" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "Toque para gravar ou enviar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px]",
									children: "Max 2 minutos. Sem cortes."
								})
							]
						})]
					}),
					challenge.moveDataAllowed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "font-bold text-base flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-4 h-4 text-green-500" }), " Vínculo MOVE Data"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Ex: Tempo, KM, ou ID do Smartwatch",
								className: "bg-muted/50"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Opcional. Os dados serão conferidos automaticamente."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("space-y-3 p-4 rounded-xl border mt-6 transition-colors", autoPublish ? "bg-primary/5 border-primary/30" : "bg-secondary/30 border-border/50"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-row items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "font-bold text-sm leading-snug cursor-pointer flex-1",
								onClick: () => setAutoPublish(!autoPublish),
								children: "Publicar resultados automaticamente no Feed Inteligente"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: autoPublish,
								onCheckedChange: setAutoPublish,
								className: "data-[state=checked]:bg-primary"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: "Compartilhe sua nota e ranking final com seus seguidores assim que a avaliação do desafio for concluída."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full h-12 font-bold text-base",
					disabled: isSubmitting,
					onClick: handleSubmit,
					children: isSubmitting ? "Enviando..." : "Confirmar Envio"
				})
			})
		]
	});
}
export { ArenaSubmitParticipation as default };

//# sourceMappingURL=ArenaSubmitParticipation-D27tE8-3.js.map