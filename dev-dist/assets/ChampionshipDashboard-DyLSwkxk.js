import "./chevron-down-BNXeKQ0G.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DOGz9JGn.js";
import { t as CircleX } from "./circle-x-4S2w5OV0.js";
import { t as EllipsisVertical } from "./ellipsis-vertical-D9jj9kEl.js";
import { t as Plus } from "./plus-B0Gm0Hs7.js";
import { t as Save } from "./save-BfpUXzlw.js";
import { t as Share2 } from "./share-2-Bf3ZnhIi.js";
import { t as Trash2 } from "./trash-2-vGYTY2Z5.js";
import { $n as MapPin, Bt as DropdownMenu, Cr as Clock, Dr as Check, Ht as DropdownMenuContent, Lr as ArrowLeft, R as Badge, Tn as Users, Tr as CircleCheckBig, Ut as DropdownMenuItem, Wt as DropdownMenuTrigger, an as Button, c as DialogTrigger, ci as useNavigate, di as require_react, jr as Calendar, li as useParams, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog, ti as require_jsx_runtime } from "./index-CyB4EoJq.js";
import { n as CardContent, t as Card } from "./card-Cuvs-ka7.js";
import { t as Input } from "./input-BAWbxbhp.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DQqqz-6o.js";
import { t as Textarea } from "./textarea-B3NRTAoJ.js";
import { t as useChampionshipStore } from "./useChampionshipStore-CSa3vJll.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function OverviewTab({ championship }) {
	const { updateChampionship } = useChampionshipStore();
	const [formData, setFormData] = (0, import_react.useState)({
		name: championship.name,
		description: championship.description,
		location: championship.location || "",
		status: championship.status,
		modality: championship.modality
	});
	const handleSave = () => {
		updateChampionship(championship.id, formData);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "border-none shadow-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Nome do Campeonato"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: formData.name,
							onChange: (e) => setFormData({
								...formData,
								name: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Modalidade"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: formData.modality,
							onChange: (e) => setFormData({
								...formData,
								modality: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Descrição"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: formData.description,
							onChange: (e) => setFormData({
								...formData,
								description: e.target.value
							}),
							rows: 4
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Local Principal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: formData.location,
							onChange: (e) => setFormData({
								...formData,
								location: e.target.value
							}),
							placeholder: "Ex: Arena XP"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: formData.status,
							onValueChange: (value) => setFormData({
								...formData,
								status: value
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione o status" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "draft",
									children: "Rascunho"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "open",
									children: "Inscrições Abertas"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "active",
									children: "Em Andamento"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "completed",
									children: "Finalizado"
								})
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: handleSave,
						className: "w-full gap-2 mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Salvar Alterações"]
					})
				]
			})
		})
	});
}
function RegistrationsTab({ championship }) {
	const { participants, addParticipant, updateParticipantStatus, removeParticipant } = useChampionshipStore();
	const [newParticipant, setNewParticipant] = (0, import_react.useState)("");
	const [isDialogOpen, setIsDialogOpen] = (0, import_react.useState)(false);
	const championshipParticipants = participants.filter((p) => p.championshipId === championship.id);
	const handleAdd = () => {
		if (!newParticipant) return;
		addParticipant({
			championshipId: championship.id,
			name: newParticipant
		});
		setNewParticipant("");
		setIsDialogOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "font-bold",
				children: [
					"Participantes (",
					championshipParticipants.length,
					")"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open: isDialogOpen,
				onOpenChange: setIsDialogOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Adicionar"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Novo Participante" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Nome do Time ou Atleta",
						value: newParticipant,
						onChange: (e) => setNewParticipant(e.target.value)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handleAdd,
						className: "w-full",
						children: "Cadastrar"
					})]
				})] })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: championshipParticipants.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center py-8 text-muted-foreground bg-muted/20 rounded-xl border border-dashed",
				children: "Nenhum participante registrado."
			}) : championshipParticipants.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-none shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-10 w-10 bg-secondary rounded-full flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5 text-muted-foreground" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-bold text-sm",
							children: p.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: p.status === "approved" ? "default" : p.status === "rejected" ? "destructive" : "secondary",
								className: "text-[10px]",
								children: p.status === "approved" ? "Confirmado" : p.status === "rejected" ? "Rejeitado" : "Pendente"
							}), p.contact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: p.contact
							})]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "h-4 w-4" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						align: "end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onClick: () => updateParticipantStatus(p.id, "approved"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "mr-2 h-4 w-4 text-green-500" }), "Aprovar"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onClick: () => updateParticipantStatus(p.id, "rejected"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "mr-2 h-4 w-4 text-red-500" }), "Rejeitar"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								onClick: () => updateParticipantStatus(p.id, "pending"),
								children: "Marcar como Pendente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								className: "text-red-500 focus:text-red-500",
								onClick: () => removeParticipant(p.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 h-4 w-4" }), "Remover"]
							})
						]
					})] })]
				})
			}, p.id))
		})]
	});
}
function CalendarTab({ championship }) {
	const { matches, participants, addMatch, deleteMatch } = useChampionshipStore();
	const [isDialogOpen, setIsDialogOpen] = (0, import_react.useState)(false);
	const [newMatch, setNewMatch] = (0, import_react.useState)({
		teamA: "",
		teamB: "",
		date: "",
		time: "",
		location: "",
		round: ""
	});
	const champMatches = matches.filter((m) => m.championshipId === championship.id);
	const champParticipants = participants.filter((p) => p.championshipId === championship.id && p.status === "approved");
	const handleAddMatch = () => {
		if (!newMatch.teamA || !newMatch.teamB || !newMatch.date || !newMatch.time) return;
		addMatch({
			championshipId: championship.id,
			...newMatch
		});
		setIsDialogOpen(false);
		setNewMatch({
			teamA: "",
			teamB: "",
			date: "",
			time: "",
			location: "",
			round: ""
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-bold",
				children: "Calendário de Jogos"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open: isDialogOpen,
				onOpenChange: setIsDialogOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4" }), " Agendar Jogo"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Agendar Partida" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: newMatch.teamA,
								onValueChange: (val) => setNewMatch({
									...newMatch,
									teamA: val
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Time A" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: champParticipants.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: p.name,
									children: p.name
								}, p.id)) })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: newMatch.teamB,
								onValueChange: (val) => setNewMatch({
									...newMatch,
									teamB: val
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Time B" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: champParticipants.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: p.name,
									children: p.name
								}, p.id)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: newMatch.date,
							onChange: (e) => setNewMatch({
								...newMatch,
								date: e.target.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "time",
							value: newMatch.time,
							onChange: (e) => setNewMatch({
								...newMatch,
								time: e.target.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Local (Ex: Quadra 1)",
							value: newMatch.location,
							onChange: (e) => setNewMatch({
								...newMatch,
								location: e.target.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Rodada (Ex: Final)",
							value: newMatch.round,
							onChange: (e) => setNewMatch({
								...newMatch,
								round: e.target.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: handleAddMatch,
							className: "w-full mt-2",
							children: "Agendar"
						})
					]
				})] })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: champMatches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center py-8 text-muted-foreground bg-muted/20 rounded-xl border border-dashed",
				children: "Nenhuma partida agendada."
			}) : champMatches.map((match) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-none shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wide",
								children: match.round || "Partida"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => deleteMatch(match.id),
								className: "text-muted-foreground hover:text-red-500",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center mb-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-base",
									children: match.teamA
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground text-xs px-2",
									children: "VS"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-base",
									children: match.teamB
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }),
										" ",
										match.date
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
										" ",
										match.time
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
										" ",
										match.location
									]
								})
							]
						})
					]
				})
			}, match.id))
		})]
	});
}
function ResultsTab({ championship }) {
	const { matches, updateMatch } = useChampionshipStore();
	const champMatches = matches.filter((m) => m.championshipId === championship.id);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [scores, setScores] = (0, import_react.useState)({
		a: "",
		b: ""
	});
	const startEdit = (match) => {
		setEditingId(match.id);
		setScores({
			a: match.scoreA?.toString() || "",
			b: match.scoreB?.toString() || ""
		});
	};
	const saveScore = (matchId) => {
		updateMatch(matchId, {
			scoreA: parseInt(scores.a) || 0,
			scoreB: parseInt(scores.b) || 0,
			status: "completed"
		});
		setEditingId(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-bold",
			children: "Resultados"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: champMatches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center py-8 text-muted-foreground bg-muted/20 rounded-xl border border-dashed",
				children: "Nenhuma partida encontrada. Agende jogos no calendário."
			}) : champMatches.map((match) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-none shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-center text-muted-foreground mb-2 uppercase",
							children: [
								match.round || "Partida",
								" - ",
								match.date
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 text-right font-bold truncate",
									children: match.teamA
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2 min-w-[100px] justify-center",
									children: editingId === match.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											className: "w-10 h-8 p-1 text-center",
											value: scores.a,
											onChange: (e) => setScores({
												...scores,
												a: e.target.value
											}),
											type: "number"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs",
											children: "x"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											className: "w-10 h-8 p-1 text-center",
											value: scores.b,
											onChange: (e) => setScores({
												...scores,
												b: e.target.value
											}),
											type: "number"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											className: "h-8 w-8 ml-1",
											onClick: () => saveScore(match.id),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
										})
									] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xl font-black",
											children: match.scoreA ?? "-"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "x"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xl font-black",
											children: match.scoreB ?? "-"
										})
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 text-left font-bold truncate",
									children: match.teamB
								})
							]
						}),
						editingId !== match.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								className: "text-xs h-6",
								onClick: () => startEdit(match),
								children: "Atualizar Placar"
							})
						})
					]
				})
			}, match.id))
		})]
	});
}
function RulesTab({ championship }) {
	const { updateChampionship } = useChampionshipStore();
	const [rules, setRules] = (0, import_react.useState)(championship.rules || "");
	const handleSave = () => {
		updateChampionship(championship.id, { rules });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "border-none shadow-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-6 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold",
							children: "Regulamento e Informações"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Descreva as regras, formato de disputa e premiação."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							className: "min-h-[200px]",
							value: rules,
							onChange: (e) => setRules(e.target.value),
							placeholder: "Digite aqui o regulamento do campeonato..."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: handleSave,
					className: "w-full gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Salvar Regulamento"]
				})]
			})
		})
	});
}
function ChampionshipDashboard() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { championships } = useChampionshipStore();
	const championship = championships.find((c) => c.id === id);
	if (!championship) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex items-center justify-center flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Campeonato não encontrado." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: () => navigate("/organizer"),
			children: "Voltar"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background animate-fade-in pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-primary/5 border-b border-border/50 pb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 flex items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => navigate(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-bold text-lg truncate max-w-[200px]",
						children: "Painel do Organizador"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-5 w-5" })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold leading-tight mb-1",
					children: championship.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: "bg-background",
						children: championship.modality
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "capitalize",
						children: championship.status
					})]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "overview",
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "w-full h-auto flex flex-wrap justify-start gap-1 bg-transparent p-0 mb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "overview",
								className: "rounded-full border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
								children: "Visão Geral"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "registrations",
								className: "rounded-full border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
								children: "Inscrições"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "calendar",
								className: "rounded-full border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
								children: "Calendário"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "results",
								className: "rounded-full border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
								children: "Resultados"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "rules",
								className: "rounded-full border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
								children: "Regulamento"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "overview",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewTab, { championship })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "registrations",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegistrationsTab, { championship })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "calendar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarTab, { championship })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "results",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultsTab, { championship })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "rules",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RulesTab, { championship })
					})
				]
			})
		})]
	});
}
export { ChampionshipDashboard as default };

//# sourceMappingURL=ChampionshipDashboard-DyLSwkxk.js.map