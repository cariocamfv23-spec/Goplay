import { t as Download } from "./download-DYQbqCaT.js";
import { t as RefreshCw } from "./refresh-cw-DcjeUaF4.js";
import { t as Smartphone } from "./smartphone-Ba4I3lws.js";
import { t as Trash2 } from "./trash-2-DTuRdjl6.js";
import { Lr as ArrowLeft, _i as __toESM, an as Button, ci as useNavigate, fi as require_react, k as Switch, ti as require_jsx_runtime, ui as goplay_icon_0e955_default, vn as toast } from "./index-CLnpuxm4.js";
import { t as Skeleton } from "./skeleton-DyMpW9_8.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var PWASettingsErrorBoundary = class extends import_react.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}
	static getDerivedStateFromError() {
		return { hasError: true };
	}
	componentDidCatch(error, errorInfo) {
		console.error("PWA Settings Error:", error, errorInfo);
	}
	render() {
		if (this.state.hasError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-screen flex flex-col items-center justify-center bg-background gap-4 p-4 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-6 w-6 text-destructive" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "Erro de Carregamento"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground max-w-xs",
					children: "Ocorreu um problema ao acessar o status do PWA."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => window.location.reload(),
					variant: "outline",
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "mr-2 h-4 w-4" }), "Tentar Novamente"]
				})
			]
		});
		return this.props.children;
	}
};
function PWASettingsContent() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [hasError, setHasError] = (0, import_react.useState)(false);
	const [pwaState, setPwaState] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let isMounted = true;
		const loadSettings = () => {
			setTimeout(() => {
				if (!isMounted) return;
				try {
					setPwaState({
						isInstalled: typeof window !== "undefined" ? window.matchMedia && window.matchMedia("(display-mode: standalone)").matches || "standalone" in window.navigator && window.navigator.standalone === true : false,
						autoUpdate: true,
						notifications: false
					});
				} catch (error) {
					console.error("Error loading PWA settings", error);
					setHasError(true);
					setPwaState({
						isInstalled: false,
						autoUpdate: false,
						notifications: false
					});
				} finally {
					setIsLoading(false);
				}
			}, 600);
		};
		setTimeout(loadSettings, 0);
		return () => {
			isMounted = false;
		};
	}, []);
	if (hasError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col items-center justify-center bg-background gap-4 p-4 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-6 w-6 text-destructive" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold",
				children: "Erro de Carregamento"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground max-w-xs",
				children: "Ocorreu um problema ao acessar o status do PWA."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => window.location.reload(),
				variant: "outline",
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "mr-2 h-4 w-4" }), "Tentar Novamente"]
			})
		]
	});
	if (isLoading || !pwaState) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 bg-background z-20 p-4 border-b border-border/50 flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				disabled: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-bold",
				children: "Configurações do PWA"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center p-6 space-y-4 bg-muted/30 rounded-2xl border border-border/50",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 w-16 rounded-full" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-48" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-64" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-full max-w-[200px] mt-2" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-32 px-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card rounded-xl border border-border/50 overflow-hidden space-y-2 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-56" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-10 rounded-full" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-[1px] w-full my-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-32" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-48" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-10 rounded-full" })]
						})
					]
				})]
			})]
		})]
	});
	const isInstalled = Boolean(pwaState?.isInstalled ?? false);
	const autoUpdate = Boolean(pwaState?.autoUpdate ?? false);
	const notifications = Boolean(pwaState?.notifications ?? false);
	const handleClearCache = () => {
		toast.success("Cache do aplicativo limpo com sucesso!", { description: "Isso ajudará a liberar espaço e resolver problemas." });
	};
	const handleUpdate = () => {
		toast.info("Verificando atualizações...", { description: "O aplicativo será reiniciado se houver uma nova versão." });
		if ("serviceWorker" in navigator) navigator.serviceWorker.ready.then((registration) => {
			registration.update().then(() => {
				setTimeout(() => {
					window.location.reload();
				}, 1500);
			});
		});
		else setTimeout(() => {
			window.location.reload();
		}, 1500);
	};
	const handleInstallApp = async () => {
		toast.success("Pronto para instalar", { description: "Siga as instruções do navegador para adicionar à tela inicial." });
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
							className: "h-20 w-20 bg-primary/10 rounded-3xl flex items-center justify-center overflow-hidden shadow-lg border border-primary/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: goplay_icon_0e955_default,
								alt: "GoPlay App Logo",
								className: "h-14 w-14 object-contain drop-shadow-md"
							})
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
							onClick: handleInstallApp,
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
								onCheckedChange: (v) => setPwaState((prev) => prev ? {
									...prev,
									autoUpdate: v
								} : {
									isInstalled: false,
									notifications: false,
									autoUpdate: v
								})
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
								onCheckedChange: (v) => setPwaState((prev) => prev ? {
									...prev,
									notifications: v
								} : {
									isInstalled: false,
									autoUpdate: false,
									notifications: v
								})
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
function PWASettings() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PWASettingsErrorBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PWASettingsContent, {}) });
}
export { PWASettings as default };

//# sourceMappingURL=PWASettings-BJrGHGzr.js.map