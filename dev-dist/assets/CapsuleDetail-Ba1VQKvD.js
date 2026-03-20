import "./loader-circle-BzevQPEg.js";
import { t as LockOpen } from "./lock-open-m8GIrgSe.js";
import "./play-DbyowQJe.js";
import { t as Share2 } from "./share-2-eIoePM9A.js";
import "./volume-2-C23cmmCn.js";
import "./volume-x-BrFbYBkC.js";
import { Cn as Swords, En as Star, K as mockCurrentUser, Kr as useNavigate, N as Badge, Sr as ArrowLeft, Zt as Button, gr as Calendar, ln as toast, qr as useParams, vn as Trophy, zr as require_jsx_runtime } from "./index-DBo3WkRA.js";
import { t as FeedVideoPlayer } from "./FeedVideoPlayer-DVCmj-56.js";
import { t as ptBR } from "./pt-BR-BJdaBO5r.js";
import { t as format } from "./format-CDsTDPw2.js";
import { t as useTimeCapsuleStore } from "./useTimeCapsuleStore-Cv6xBT64.js";
var import_jsx_runtime = require_jsx_runtime();
function CapsuleDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { capsules } = useTimeCapsuleStore();
	const capsule = capsules.find((c) => c.id === id);
	if (!capsule || capsule.status !== "released") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col items-center justify-center p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "w-16 h-16 text-muted-foreground/30 mb-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold",
				children: "Cápsula indisponível"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mb-6 font-medium",
				children: "Esta cápsula ainda não foi liberada ou não existe."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => navigate(-1),
				children: "Voltar"
			})
		]
	});
	const handlePublish = () => {
		toast.success("Publicado no Feed com sucesso!");
		navigate("/feed");
	};
	const handleHighlight = () => {
		toast.success("Adicionado aos Destaques do Perfil.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-24 animate-fade-in relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-gold/10 via-primary/5 to-transparent pointer-events-none -z-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-0 bg-background/80 backdrop-blur-md z-20 p-4 border-b border-border/50 flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => navigate(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-bold text-lg text-foreground leading-none",
						children: "Time Capsule Revelada"
					}) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 max-w-xl mx-auto space-y-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								className: "bg-gold/20 text-gold hover:bg-gold/30 border-none mb-3 font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "w-3 h-3 mr-1" }), " Liberada Oficialmente"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-3xl font-black tracking-tight text-foreground",
								children: capsule.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-4 text-xs text-muted-foreground mt-3 font-medium",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-4 h-4" }),
											" Selada:",
											" ",
											format(new Date(capsule.createdAt), "dd MMM yyyy", { locale: ptBR })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 font-bold text-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-4 h-4" }),
											" Aberta:",
											" ",
											format(new Date(capsule.openAt), "dd MMM yyyy", { locale: ptBR })
										]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative",
						children: capsule.type === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-2xl overflow-hidden shadow-lg border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedVideoPlayer, {
								url: capsule.content,
								thumbnail: "https://img.usecurling.com/p/800/450?q=athlete%20training&color=black"
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-secondary/30 p-8 rounded-2xl border border-border/50 relative overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -top-4 -left-4 text-8xl text-primary/10 font-serif",
									children: "\""
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg italic text-foreground/90 relative z-10 leading-relaxed text-center font-medium",
									children: capsule.content
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -bottom-10 -right-4 text-8xl text-primary/10 font-serif",
									children: "\""
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center p-6 bg-gradient-to-br from-gold/20 to-yellow-500/5 rounded-2xl border border-gold/30 shadow-[0_0_40px_rgba(255,215,0,0.1)] relative overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center relative z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative inline-block mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gold blur-xl opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-16 h-16 text-gold relative z-10 mx-auto" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-2xl font-black text-gold uppercase tracking-widest drop-shadow-sm",
									children: "Meta Cumprida"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-gold/80 mt-1 font-medium",
									children: "Você honrou sua promessa do passado!"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-center text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4",
						children: "Sua Evolução"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 flex items-center justify-center z-10 pointer-events-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-background border border-border p-2 rounded-full shadow-lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "w-5 h-5 text-muted-foreground" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-secondary/30 p-5 rounded-2xl border border-border text-center flex flex-col justify-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] uppercase font-bold text-muted-foreground mb-3 tracking-wider",
										children: "Quando Selada"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-3xl font-black text-foreground",
											children: capsule.statsAtCreation.level
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground font-medium",
											children: "Nível"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 pt-4 border-t border-border/50 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xl font-bold text-foreground",
											children: capsule.statsAtCreation.points
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground font-medium",
											children: "Pontos Goplay"
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-primary/10 p-5 rounded-2xl border border-primary/30 text-center flex flex-col justify-center relative overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative z-10",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10px] uppercase font-bold text-foreground mb-3 tracking-wider flex items-center justify-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-3 h-3 text-foreground" }), " Hoje"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-3xl font-black text-foreground",
												children: mockCurrentUser.level || 15
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground font-medium",
												children: "Nível"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 pt-4 border-t border-primary/20 space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xl font-bold text-foreground",
												children: mockCurrentUser.points
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground font-medium",
												children: "Pontos Goplay"
											})]
										})
									]
								})]
							})]
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-4 border-t border-border/50 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "w-full bg-primary text-white h-14 text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform",
							onClick: handlePublish,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "mr-2 h-5 w-5" }), "Publicar no Feed"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "w-full h-14 text-lg font-bold border-primary/50 text-foreground hover:bg-primary/10",
							onClick: handleHighlight,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "mr-2 h-5 w-5" }), "Destaque no Perfil"]
						})]
					})
				]
			})
		]
	});
}
export { CapsuleDetail as default };

//# sourceMappingURL=CapsuleDetail-Ba1VQKvD.js.map