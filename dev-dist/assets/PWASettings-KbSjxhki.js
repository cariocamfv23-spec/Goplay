import { t as Download } from "./download-Di_lYUSv.js";
import { t as LoaderCircle } from "./loader-circle-qxjfpriY.js";
import { t as RefreshCw } from "./refresh-cw-BwRcVsVP.js";
import { t as Smartphone } from "./smartphone-DAEfl0Kf.js";
import { t as Trash2 } from "./trash-2-B8DOH5RN.js";
import { Lr as ArrowLeft, an as Button, ci as useNavigate, di as require_react, k as Switch, ti as require_jsx_runtime, vn as toast } from "./index-DtdimDLb.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function PWASettings() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [pwaState, setPwaState] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const loadSettings = () => {
			try {
				setTimeout(() => {
					setPwaState({
						isInstalled: window.matchMedia("(display-mode: standalone)").matches,
						autoUpdate: true,
						notifications: false
					});
					setIsLoading(false);
				}, 600);
			} catch (error) {
				console.error("Error loading PWA settings", error);
				setPwaState({
					isInstalled: false,
					autoUpdate: false,
					notifications: false
				});
				setIsLoading(false);
			}
		};
		loadSettings();
	}, []);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
	});
	const isInstalled = pwaState?.isInstalled ?? false;
	const autoUpdate = pwaState?.autoUpdate ?? false;
	const notifications = pwaState?.notifications ?? false;
	const handleClearCache = () => {
		toast.success("Cache do aplicativo limpo com sucesso!", { description: "Isso ajudará a liberar espaço e resolver problemas." });
	};
	const handleUpdate = () => {
		toast.info("Verificando atualizações...", { description: "O aplicativo será reiniciado se houver uma nova versão." });
		setTimeout(() => {
			window.location.reload();
		}, 1500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 bg-background z-20 p-4 border-b border-border/50 flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: () => navigate(-1),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-bold",
				children: "Configurações do PWA"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center p-6 text-center space-y-4 bg-muted/30 rounded-2xl border border-border/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-8 w-8 text-primary" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Status do Aplicativo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-1",
							children: isInstalled ? "Aplicativo instalado no dispositivo e otimizado." : "Acesse pelo navegador ou instale para melhor experiência."
						})] }),
						!isInstalled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "default",
							className: "w-full max-w-[200px] gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), "Instalar App"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-bold text-muted-foreground uppercase px-2",
						children: "Preferências"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card rounded-xl border border-border/50 overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 flex items-center justify-between border-b border-border/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "Atualizações Automáticas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Baixar novas versões em segundo plano"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: autoUpdate,
								onCheckedChange: (v) => setPwaState((prev) => ({
									...prev,
									autoUpdate: v
								}))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "Push Notifications"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Alertas do sistema nativo"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: notifications,
								onCheckedChange: (v) => setPwaState((prev) => ({
									...prev,
									notifications: v
								}))
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-bold text-muted-foreground uppercase px-2",
						children: "Manutenção"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card rounded-xl border border-border/50 overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							className: "w-full justify-start h-14 rounded-none border-b border-border/50 gap-3 text-base",
							onClick: handleUpdate,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-5 w-5 text-blue-500" }), "Forçar Atualização"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							className: "w-full justify-start h-14 rounded-none gap-3 text-base text-destructive hover:text-destructive hover:bg-destructive/10",
							onClick: handleClearCache,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-5 w-5" }), "Limpar Cache Local"]
						})]
					})]
				})
			]
		})]
	});
}
export { PWASettings as default };

//# sourceMappingURL=PWASettings-KbSjxhki.js.map