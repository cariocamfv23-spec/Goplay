import { Bn as Medal, F as Badge, Hr as require_jsx_runtime, J as mockCurrentUser, Mn as Shield, Nn as ShieldCheck, Tr as ArrowLeft, Xr as useParams, Xt as AvatarFallback, Yr as useNavigate, Yt as Avatar, Zt as AvatarImage, dr as Clock, en as Button, mn as Zap } from "./index-DzO-_6nv.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CNZvN4eE.js";
import { t as useArenaStore } from "./useArenaStore-Bsxdli5Z.js";
import { t as ptBR } from "./pt-BR-nlOX6a7W.js";
import { t as formatDistanceToNow } from "./formatDistanceToNow-W4zh3kJA.js";
var import_jsx_runtime = require_jsx_runtime();
function ArenaChallengeDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { challenges, participations } = useArenaStore();
	const challenge = challenges.find((c) => c.id === id);
	const challengeParticipations = participations.filter((p) => p.challengeId === id);
	const myParticipation = challengeParticipations.find((p) => p.athleteId === mockCurrentUser.id);
	if (!challenge) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 text-center text-muted-foreground",
		children: "Desafio não encontrado."
	});
	const isEnded = challenge.status === "ended";
	const rankings = [...challengeParticipations].sort((a, b) => (b.finalScore || 0) - (a.finalScore || 0));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-64 w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: challenge.banner,
						alt: challenge.title,
						className: "w-full h-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-black/50 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "icon",
						className: "absolute top-4 left-4 rounded-full bg-black/40 text-white hover:bg-black/60 border border-white/10 backdrop-blur-md",
						onClick: () => navigate(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-4 left-4 right-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								className: "bg-gold text-black border-none font-bold mb-2",
								children: [
									challenge.modality,
									" • ",
									challenge.type
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-black text-white leading-tight drop-shadow-md",
								children: challenge.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mt-2 text-white/80 text-xs font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5" }), isEnded ? "Desafio Encerrado" : `Termina em ${formatDistanceToNow(new Date(challenge.endDate), { locale: ptBR })}`]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "details",
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid w-full grid-cols-2 bg-secondary/50 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "details",
								className: "text-xs font-bold",
								children: "Detalhes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "ranking",
								className: "text-xs font-bold",
								children: "Ranking Oficial"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "details",
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-lg",
										children: "Sobre o Desafio"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground leading-relaxed",
										children: challenge.description
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-lg",
										children: "Regras"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground bg-muted p-3 rounded-lg border border-border/50",
										children: challenge.rules
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											className: "font-bold text-lg flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-5 h-5 text-primary" }), "Motor de Avaliação Híbrido"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-3 gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "bg-primary/10 border border-primary/20 rounded-xl p-3 text-center",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-5 h-5 text-primary mx-auto mb-1" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-black text-lg text-primary leading-none",
															children: "50%"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[9px] uppercase tracking-wider text-muted-foreground mt-1",
															children: "IA Goplay"
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5 text-blue-500 mx-auto mb-1" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-black text-lg text-blue-500 leading-none",
															children: "30%"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[9px] uppercase tracking-wider text-muted-foreground mt-1",
															children: "Profissionais"
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "w-5 h-5 mx-auto mb-1 flex items-center justify-center font-bold text-green-500",
															children: "V"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-black text-lg text-green-500 leading-none",
															children: "20%"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[9px] uppercase tracking-wider text-muted-foreground mt-1",
															children: "Comunidade"
														})
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground mt-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Critérios Específicos:" }),
												" ",
												challenge.criteria
											]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "ranking",
							className: "space-y-3",
							children: rankings.length > 0 ? rankings.map((participation, index) => {
								const isMe = participation.athleteId === mockCurrentUser.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `flex items-center gap-3 p-3 rounded-xl border ${isMe ? "bg-primary/5 border-primary/30" : "bg-card"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-8 flex justify-center shrink-0",
											children: index === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Medal, { className: "w-7 h-7 text-yellow-500 fill-yellow-500" }) : index === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Medal, { className: "w-6 h-6 text-slate-400 fill-slate-300" }) : index === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Medal, { className: "w-6 h-6 text-orange-700 fill-orange-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-muted-foreground",
												children: ["#", index + 1]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
											className: "w-10 h-10 border border-border",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: participation.athlete?.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: "AT" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-sm truncate",
												children: isMe ? "Você" : participation.athlete?.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[10px] text-muted-foreground",
												children: [
													"Status:",
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "capitalize text-primary font-medium",
														children: participation.status
													})
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-black text-lg text-foreground",
												children: participation.finalScore?.toFixed(1) || "--"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[9px] text-muted-foreground uppercase",
												children: "Score Híbrido"
											})]
										})
									]
								}, participation.id);
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center py-10 text-muted-foreground",
								children: "Nenhuma participação registrada ainda."
							})
						})
					]
				})
			}),
			!isEnded && !myParticipation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full h-12 text-base font-bold bg-gold text-black hover:bg-gold/90 shadow-lg",
					onClick: () => navigate(`/arena/${challenge.id}/participate`),
					children: "Participar do Desafio"
				})
			}),
			myParticipation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: true,
					className: "w-full h-12 text-base font-bold",
					children: "Participação Registrada"
				})
			})
		]
	});
}
export { ArenaChallengeDetails as default };

//# sourceMappingURL=ArenaChallengeDetails-Cc7V0n2t.js.map