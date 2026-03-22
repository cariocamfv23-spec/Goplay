import { t as Building2 } from "./building-2-CXoBWV3C.js";
import { t as CircleAlert } from "./circle-alert-DpQVxS9-.js";
import { t as CircleCheck } from "./circle-check-B8s1PILC.js";
import { t as PaymentDialog } from "./PaymentDialog-pxgSDxrg.js";
import { t as FileText } from "./file-text-CVu8myXT.js";
import { t as LockOpen } from "./lock-open-DTh4R7lh.js";
import { t as Send } from "./send-DrCRyOMs.js";
import "./wallet-D3ANy_eO.js";
import { Ct as mockScholarships, Hr as require_jsx_runtime, L as Badge, Pn as ShieldCheck, Qr as require_react, Sn as Trophy, Tr as ArrowLeft, Un as MapPin, Xr as useParams, Yn as House, Yr as useNavigate, hn as cn, pn as toast, tn as Button, yr as Calendar } from "./index-BflVICRt.js";
import "./label-CA48FGWP.js";
import "./input-CtIo15S9.js";
import "./tabs-C3HjLp4W.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function ScholarshipDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const scholarship = mockScholarships.find((s) => s.id === id);
	const [unlocked, setUnlocked] = (0, import_react.useState)(false);
	const [isApplied, setIsApplied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (id) {
			if (localStorage.getItem(`applied_scholarship_${id}`)) setIsApplied(true);
		}
	}, [id]);
	if (!scholarship) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center h-screen text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Bolsa não encontrada." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "link",
			onClick: () => navigate(-1),
			children: "Voltar"
		})]
	});
	const handleUnlock = () => {
		setUnlocked(true);
		toast.success("Acesso liberado!", { description: "Você agora tem acesso total aos candidatos desta bolsa." });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-24 animate-fade-in relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "h-64 relative w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: scholarship.image,
						alt: scholarship.university,
						className: "w-full h-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "absolute top-4 left-4 bg-black/20 text-white hover:bg-black/40 rounded-full backdrop-blur-sm",
						onClick: () => navigate(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-6 w-6" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 -mt-12 relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card border border-border/50 shadow-lg rounded-2xl p-5 mb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-start mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-white p-2 rounded-xl shadow-sm border border-border/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: scholarship.logo,
										alt: "Logo",
										className: "w-12 h-12 object-contain"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									className: "bg-emerald-500 hover:bg-emerald-600 text-white border-none text-xs px-3 py-1",
									children: [scholarship.value, "% Off"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-bold leading-tight mb-1",
								children: scholarship.university
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm text-muted-foreground mb-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary" }),
									scholarship.city,
									", ",
									scholarship.country,
									scholarship.neighborhood && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs bg-secondary px-1.5 py-0.5 rounded",
										children: scholarship.neighborhood
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-secondary/30 p-2.5 rounded-xl border border-border/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase text-muted-foreground font-bold tracking-wider block mb-1",
										children: "Esporte"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 font-semibold text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-3.5 w-3.5 text-gold" }), scholarship.sport]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-secondary/30 p-2.5 rounded-xl border border-border/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase text-muted-foreground font-bold tracking-wider block mb-1",
										children: "Deadline"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 font-semibold text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5 text-red-500" }), scholarship.deadline]
									})]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-bold text-lg mb-3 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "h-5 w-5 text-primary" }), " Hospedagem"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground leading-relaxed bg-secondary/20 p-4 rounded-xl border border-border/40",
								children: scholarship.accommodation
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-bold text-lg mb-3 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5 text-primary" }), " Documentação"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-secondary/20 p-4 rounded-xl border border-border/40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "text-sm text-muted-foreground space-y-2",
									children: scholarship.documentation.split(",").map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-emerald-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "leading-snug",
											children: item.trim()
										})]
									}, i))
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-bold text-lg mb-3 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-primary" }), " Processo da Bolsa"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-secondary/20 p-4 rounded-xl border border-border/40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2 text-sm text-muted-foreground font-medium flex-wrap",
									children: scholarship.process.split(">").map((step, i, arr) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "contents",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-center",
											children: step.trim()
										}), i < arr.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground/30 mx-1",
											children: "→"
										})]
									}, i))
								})
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 mb-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative overflow-hidden rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-0 right-0 p-3 opacity-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "w-24 h-24 text-primary" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "font-bold text-lg text-primary mb-1 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-5 w-5" }), " Área da Instituição"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground mb-4 max-w-[90%]",
										children: "É recrutador desta universidade? Libere o acesso completo aos perfis dos atletas candidatos e inicie o processo de seleção."
									}),
									unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 p-4 rounded-xl flex items-center gap-3 border border-emerald-200 dark:border-emerald-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-6 w-6 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold text-sm",
											children: "Acesso Liberado"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs opacity-90",
											children: "Você pode visualizar todos os candidatos na aba de gestão."
										})] })]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg border border-amber-100 dark:border-amber-900/30",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Taxa única de liberação: R$ ", scholarship.fee.toFixed(2)] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDialog, {
											title: "Unlock Full Match",
											price: scholarship.fee,
											onSuccess: handleUnlock,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												className: "w-full font-bold shadow-lg shadow-primary/20 h-12",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "w-4 h-4 mr-2" }), " Liberar Match Completo"]
											})
										})]
									})
								]
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-border/50 z-20 pb-safe",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					className: cn("w-full font-bold h-12 text-base rounded-xl transition-all", isApplied ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : "bg-primary hover:bg-primary/90 text-primary-foreground"),
					onClick: () => {
						if (!isApplied) navigate(`/explore/scholarships/${id}/apply`);
					},
					disabled: isApplied,
					children: isApplied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mr-2 h-5 w-5 text-emerald-500" }), "Candidatura Enviada"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Aplicar para esta Bolsa ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "ml-2 h-4 w-4" })] })
				})
			})
		]
	});
}
export { ScholarshipDetails as default };

//# sourceMappingURL=ScholarshipDetails-Wm8sJZUr.js.map