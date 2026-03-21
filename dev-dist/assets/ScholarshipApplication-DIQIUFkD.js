import { t as Building2 } from "./building-2-Bbwy-m_6.js";
import { t as CircleCheck } from "./circle-check-B1KSzb31.js";
import { t as FileText } from "./file-text-Dw3QIMvy.js";
import { t as LoaderCircle } from "./loader-circle-DdQ0Qx7x.js";
import { t as Paperclip } from "./paperclip-BA4QXJS_.js";
import { t as Upload } from "./upload-BThIm-uc.js";
import { G as mockCurrentUser, Gr as useParams, Lr as require_jsx_runtime, M as Badge, Wr as useNavigate, Xt as Button, br as ArrowLeft, cn as toast, fn as X, qr as require_react, vt as mockScholarships } from "./index-YiRCBu0v.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-C2B2zboe.js";
import { t as Label } from "./label-DQNZAURn.js";
import { t as Input } from "./input-BkczHjKx.js";
import { t as Textarea } from "./textarea-Bveobeyp.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function ScholarshipApplication() {
	const { id } = useParams();
	const navigate = useNavigate();
	const scholarship = mockScholarships.find((s) => s.id === id);
	const fileInputRef = (0, import_react.useRef)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [isSuccess, setIsSuccess] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		fullName: mockCurrentUser.name,
		email: "alex.silva@email.com",
		gpa: "",
		statement: ""
	});
	const [files, setFiles] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		window.scrollTo(0, 0);
	}, []);
	if (!scholarship) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center min-h-screen text-muted-foreground p-4 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4",
			children: "Bolsa não encontrada."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: () => navigate("/explore/scholarships"),
			children: "Voltar"
		})]
	});
	const handleFileChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			const newFiles = Array.from(e.target.files);
			setFiles((prev) => [...prev, ...newFiles]);
		}
	};
	const removeFile = (index) => {
		setFiles((prev) => prev.filter((_, i) => i !== index));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			setIsSuccess(true);
			localStorage.setItem(`applied_scholarship_${id}`, "true");
			toast.success("Candidatura enviada com sucesso!", { description: `Sua aplicação para ${scholarship.university} foi recebida.` });
		}, 2e3);
	};
	if (isSuccess) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col items-center justify-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-6 shadow-sm animate-bounce",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-12 w-12" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-center mb-2",
				children: "Aplicação Enviada!"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-center mb-8 max-w-xs",
				children: "Recebemos seus dados e documentos. A instituição entrará em contato em breve através do aplicativo."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "w-full max-w-sm mb-8 bg-secondary/20 border-border/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						className: "text-base flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4 text-primary" }), scholarship.university]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Status: Em Análise" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Candidatura #", Math.floor(Math.random() * 1e4)] })]
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full max-w-sm h-12 font-bold",
				onClick: () => navigate(`/explore/scholarships/${id}`),
				children: "Voltar para Detalhes"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border/50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "-ml-2 hover:bg-secondary/50 rounded-full",
					onClick: () => navigate(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-bold text-lg leading-none",
					children: "Aplicar para Bolsa"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: scholarship.university
				})] })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 max-w-lg mx-auto space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-4 bg-primary/5 p-4 rounded-xl border border-primary/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: scholarship.logo,
					alt: scholarship.university,
					className: "w-12 h-12 object-contain bg-white rounded-lg p-1 shadow-sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-bold",
					children: scholarship.university
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "text-xs font-normal",
						children: scholarship.sport
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						className: "bg-emerald-500 hover:bg-emerald-600 border-none text-xs",
						children: [scholarship.value, "% Off"]
					})]
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "fullName",
								children: "Nome Completo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "fullName",
								value: formData.fullName,
								onChange: (e) => setFormData({
									...formData,
									fullName: e.target.value
								}),
								required: true,
								placeholder: "Seu nome completo"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "email",
								children: "Email de Contato"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								type: "email",
								value: formData.email,
								onChange: (e) => setFormData({
									...formData,
									email: e.target.value
								}),
								required: true,
								placeholder: "seu@email.com"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "gpa",
									children: "Média Escolar / GPA"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "gpa",
									value: formData.gpa,
									onChange: (e) => setFormData({
										...formData,
										gpa: e.target.value
									}),
									required: true,
									placeholder: "Ex: 8.5 ou 3.8"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "sat",
									children: "Nota ENEM / SAT (Opcional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "sat",
									placeholder: "Ex: 750 ou 1200"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "statement",
									children: "Carta de Motivação"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "statement",
									value: formData.statement,
									onChange: (e) => setFormData({
										...formData,
										statement: e.target.value
									}),
									required: true,
									placeholder: "Por que você merece esta bolsa? Descreva seus objetivos acadêmicos e esportivos...",
									className: "min-h-[150px] resize-none"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground text-right",
									children: [formData.statement.length, "/500 caracteres"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Documentos (Histórico, Cartas, Vídeos)" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-2 border-dashed border-border rounded-xl p-6 text-center hover:bg-secondary/20 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "file",
											multiple: true,
											className: "hidden",
											ref: fileInputRef,
											onChange: handleFileChange
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "outline",
											onClick: () => fileInputRef.current?.click(),
											className: "mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4 mr-2" }), "Selecionar Arquivos"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "PDF, JPG ou MP4 (Máx. 10MB)"
										})
									]
								}),
								files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2 mt-2",
									children: files.map((file, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between bg-secondary/30 p-2 rounded-md text-sm border border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 overflow-hidden",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "h-3 w-3 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate max-w-[200px]",
												children: file.name
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "ghost",
											size: "icon",
											className: "h-6 w-6 hover:text-destructive",
											onClick: () => removeFile(index),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
										})]
									}, index))
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full h-12 text-base font-bold shadow-lg shadow-primary/20",
						disabled: isLoading,
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Enviando..."] }) : "Enviar Candidatura"
					})
				})]
			})]
		})]
	});
}
export { ScholarshipApplication as default };

//# sourceMappingURL=ScholarshipApplication-DIQIUFkD.js.map