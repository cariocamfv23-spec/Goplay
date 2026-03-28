import { t as CircleCheck } from "./circle-check-CUdEwqwG.js";
import { t as ExternalLink } from "./external-link-Bq7FBEGp.js";
import { t as Mail } from "./mail-DfvsyKyJ.js";
import { t as Phone } from "./phone-G90vGiav.js";
import { $n as MapPin, K as mockAgencies, Ln as Star, Lr as ArrowLeft, R as Badge, Wn as Plane, Yn as MessageCircle, an as Button, ci as useParams, dr as Globe, li as require_jsx_runtime, si as useNavigate, vn as toast } from "./index-BEPdDYyI.js";
var import_jsx_runtime = require_jsx_runtime();
function AgencyDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const agency = mockAgencies.find((a) => a.id === id);
	if (!agency) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center h-screen text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Agência não encontrada." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "link",
			onClick: () => navigate(-1),
			children: "Voltar"
		})]
	});
	const handleContact = (type) => {
		switch (type) {
			case "website":
				window.open(agency.website, "_blank");
				break;
			case "email":
				window.location.href = `mailto:${agency.email}`;
				break;
			case "phone":
				window.location.href = `tel:${agency.phone}`;
				break;
			case "whatsapp":
				toast.success("Redirecionando para o WhatsApp...");
				break;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-24 animate-fade-in relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "h-64 relative w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: agency.cover,
						alt: agency.name,
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-border/50 shadow-lg rounded-2xl p-5 mb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-white p-2 rounded-xl shadow-sm border border-border/20 -mt-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: agency.logo,
									alt: "Logo",
									className: "w-16 h-16 object-contain rounded-lg"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								className: "bg-sky-500 hover:bg-sky-600 text-white border-none text-xs px-3 py-1 gap-1",
								children: [
									agency.rating,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-current" })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-2xl font-bold leading-tight mb-1 flex items-center gap-2",
							children: [agency.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-blue-500 fill-blue-100" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm text-muted-foreground mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary" }), agency.location]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground leading-relaxed",
							children: agency.description
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-bold text-lg mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plane, { className: "h-5 w-5 text-primary" }), " Serviços Oferecidos"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-3",
							children: agency.services.map((service, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-secondary/30 p-3 rounded-xl border border-border/40 text-sm font-medium flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "leading-tight",
									children: service
								})]
							}, i))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-bold text-lg mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-5 w-5 text-primary" }), " Programas em Destaque"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: agency.programs.map((program, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-card p-4 rounded-xl border border-border/50 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-bold text-base mb-1 text-primary",
									children: program.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: program.description
								})]
							}, i))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-lg mb-3",
							children: "Contato"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "justify-start h-12 gap-3",
								onClick: () => handleContact("website"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold",
										children: "Website Oficial"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground truncate max-w-[200px]",
										children: agency.website
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									className: "justify-start h-12 gap-3",
									onClick: () => handleContact("email"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-start",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold",
											children: "Email"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground",
											children: "Enviar mensagem"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									className: "justify-start h-12 gap-3",
									onClick: () => handleContact("phone"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-start",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold",
											children: "Telefone"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground",
											children: "Ligar agora"
										})]
									})]
								})]
							})]
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-border/50 z-20 pb-safe",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "lg",
					className: "w-full font-bold h-12 text-base rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/20",
					onClick: () => handleContact("whatsapp"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "mr-2 h-5 w-5" }), "Falar no WhatsApp"]
				})
			})
		]
	});
}
export { AgencyDetails as default };

//# sourceMappingURL=AgencyDetails-D_cmVswm.js.map