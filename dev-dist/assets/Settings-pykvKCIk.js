import { t as CircleQuestionMark } from "./circle-question-mark-Bm_sWcE8.js";
import { t as CloudRain } from "./cloud-rain-BQVUx8--.js";
import { t as Image } from "./image-DBS3dmwS.js";
import { t as Layers } from "./layers-DeBdHlRp.js";
import { t as LoaderCircle } from "./loader-circle-YSsDVfzL.js";
import { t as Smartphone } from "./smartphone-DJcRMVqf.js";
import { Ar as Camera, Br as createLucideIcon, Bt as DropdownMenu, En as User, Fn as Sun, Ht as DropdownMenuContent, I as useNotificationStore_default, L as useSoundStore_default, Lr as ArrowLeft, On as Tv, Pr as Bell, R as Badge, Rt as persist, S as useDepthStore, Ut as DropdownMenuItem, Wt as DropdownMenuTrigger, Z as mockCurrentUser, an as Button, bn as cn, di as require_react, er as LogOut, gr as Film, j as useNostalgiaStore, k as Switch, li as require_jsx_runtime, qn as Moon, si as useNavigate, tr as Lock, ur as GraduationCap, xn as Zap, yn as z, zt as create } from "./index-DXHfWyM7.js";
import { t as Label } from "./label-DVbfQvTp.js";
import { t as Separator } from "./separator-CwH8Jp-a.js";
import { t as Slider } from "./slider-BOLXDMjM.js";
import { t as useWeatherStore } from "./useWeatherStore-CkmCl8BW.js";
var Laptop = createLucideIcon("laptop", [["path", {
	d: "M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z",
	key: "1pdavp"
}], ["path", {
	d: "M20.054 15.987H3.946",
	key: "14rxg9"
}]]);
var Thermometer = createLucideIcon("thermometer", [["path", {
	d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z",
	key: "17jzev"
}]]);
var import_react = require_react();
const useScholarshipStore = create()(persist((set, get) => ({
	preferences: { notifications: true },
	notifiedIds: [],
	toggleNotifications: (enabled) => set((state) => ({ preferences: {
		...state.preferences,
		notifications: enabled
	} })),
	resetNotifications: () => set({ notifiedIds: [] }),
	checkMatchAndNotify: (scholarship) => {
		const { preferences, notifiedIds } = get();
		if (!preferences.notifications) return;
		if (notifiedIds.includes(scholarship.id)) return;
		const userSport = mockCurrentUser.sport;
		if (scholarship.sport?.toLowerCase() === userSport?.toLowerCase()) {
			useNotificationStore_default.getState().addNotification({
				title: "Nova Bolsa Compatível!",
				message: `Nova oportunidade de bolsa para ${scholarship.sport} na ${scholarship.university}.`,
				type: "scholarship",
				link: `/explore/scholarships/${scholarship.id}`,
				priority: "high"
			});
			set({ notifiedIds: [...notifiedIds, scholarship.id] });
		}
	}
}), { name: "goplay-scholarship-storage" }));
var import_jsx_runtime = require_jsx_runtime();
function Settings() {
	const navigate = useNavigate();
	const { setTheme, theme } = z();
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const weatherStore = useWeatherStore();
	const scholarshipStore = useScholarshipStore();
	const preferences = weatherStore?.preferences || {
		enabled: false,
		storm: false,
		heavyRain: false,
		intenseCold: false
	};
	const toggleAll = weatherStore?.toggleAll || (() => {});
	const toggleType = weatherStore?.toggleType || (() => {});
	const scholarshipPrefs = scholarshipStore?.preferences || { notifications: false };
	const toggleScholarshipNotifs = scholarshipStore?.toggleNotifications || (() => {});
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 100);
		return () => clearTimeout(timer);
	}, []);
	const { isEnabled: isNostalgiaEnabled, preset: nostalgiaPreset, toggle: toggleNostalgia, setPreset: setNostalgiaPreset } = useNostalgiaStore();
	const { isEnabled: isDepthEnabled, intensity: depthIntensity, toggle: toggleDepth, setIntensity: setDepthIntensity } = useDepthStore();
	const { notificationSoundsEnabled, setNotificationSoundsEnabled } = useSoundStore_default();
	const nostalgiaPresets = [
		{
			id: "grain",
			label: "Granulado",
			icon: Film
		},
		{
			id: "retro",
			label: "Retro Tones",
			icon: Camera
		},
		{
			id: "vhs",
			label: "VHS",
			icon: Tv
		},
		{
			id: "90s",
			label: "Anos 90",
			icon: Zap
		},
		{
			id: "analog",
			label: "Analógico",
			icon: Camera
		},
		{
			id: "polaroid",
			label: "Polaroid",
			icon: Image
		}
	];
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
	});
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
				children: "Configurações"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-bold text-muted-foreground uppercase px-2",
						children: "Aparência"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-2 py-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "w-full justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [
										theme === "light" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" }),
										theme === "dark" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" }),
										theme === "system" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laptop, { className: "h-4 w-4" }),
										"Tema"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "capitalize text-muted-foreground",
									children: theme === "system" ? "Automático" : theme === "dark" ? "Escuro" : "Claro"
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
							align: "end",
							className: "w-56",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => setTheme("light"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "mr-2 h-4 w-4" }), "Claro"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => setTheme("dark"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "mr-2 h-4 w-4" }), "Escuro"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => setTheme("system"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laptop, { className: "mr-2 h-4 w-4" }), "Automático (Sistema)"]
								})
							]
						})] })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-bold text-muted-foreground uppercase px-2 flex items-center gap-2",
						children: "Efeitos Visuais"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-2 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-4 w-4 text-indigo-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-base",
										children: "Profundidade 3D"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Habilita camadas de profundidade e paralaxe."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: isDepthEnabled,
								onCheckedChange: toggleDepth
							})]
						}), isDepthEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-2 space-y-3 animate-fade-in px-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-xs text-muted-foreground font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Suave" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Intenso" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								value: [depthIntensity],
								min: .5,
								max: 2,
								step: .1,
								onValueChange: (vals) => setDepthIntensity(vals[0]),
								className: "py-2"
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-sm font-bold text-muted-foreground uppercase px-2 flex items-center gap-2",
						children: ["Modo Nostalgia ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							children: "Novo"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-2 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-base",
									children: "Ativar Filtros Retro"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Aplica visual nostálgico em fotos e vídeos."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: isNostalgiaEnabled,
								onCheckedChange: toggleNostalgia
							})]
						}), isNostalgiaEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2 animate-fade-in",
							children: nostalgiaPresets.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: nostalgiaPreset === p.id ? "default" : "outline",
								size: "sm",
								className: cn("justify-start h-10", nostalgiaPreset === p.id && "border-primary"),
								onClick: () => setNostalgiaPreset(p.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, { className: "mr-2 h-4 w-4" }), p.label]
							}, p.id))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-bold text-muted-foreground uppercase px-2 flex items-center gap-2",
						children: "Sons e Alertas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-2 space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-base",
										children: "Sons de Notificação"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Alertas sonoros para mensagens e avisos."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: notificationSoundsEnabled,
								onCheckedChange: setNotificationSoundsEnabled
							})]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-bold text-muted-foreground uppercase px-2",
						children: "Oportunidades"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-2 space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-4 w-4 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-base",
										children: "Novas Bolsas Compatíveis"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Receba alertas quando surgirem bolsas para seu perfil."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: scholarshipPrefs.notifications,
								onCheckedChange: toggleScholarshipNotifs
							})]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-bold text-muted-foreground uppercase px-2",
						children: "Alertas Climáticos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-2 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-base",
									children: "Notificações Climáticas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Receba alertas preventivos sobre o clima."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: preferences.enabled,
								onCheckedChange: toggleAll
							})]
						}), preferences.enabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pl-4 space-y-4 border-l-2 border-border/50 animate-fade-in",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4 text-yellow-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "font-normal",
											children: "Temporais e Raios"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: preferences.storm,
										onCheckedChange: (c) => toggleType("storm", c)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudRain, { className: "h-4 w-4 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "font-normal",
											children: "Chuvas Fortes"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: preferences.heavyRain,
										onCheckedChange: (c) => toggleType("heavyRain", c)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thermometer, { className: "h-4 w-4 text-cyan-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "font-normal",
											children: "Frio Intenso"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: preferences.intenseCold,
										onCheckedChange: (c) => toggleType("intenseCold", c)
									})]
								})
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-bold text-muted-foreground uppercase px-2",
						children: "Sistema"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						className: "w-full justify-start h-12 gap-3 text-base font-normal",
						onClick: () => navigate("/settings/pwa"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-5 w-5" }), " Configurações do PWA"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-bold text-muted-foreground uppercase px-2",
							children: "Conta"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							className: "w-full justify-start h-12 gap-3 text-base font-normal",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5" }), " Dados Pessoais"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							className: "w-full justify-start h-12 gap-3 text-base font-normal",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5" }), " Notificações Gerais"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							className: "w-full justify-start h-12 gap-3 text-base font-normal",
							onClick: () => navigate("/settings/privacy"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5" }), " Privacidade e Segurança"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-bold text-muted-foreground uppercase px-2",
						children: "Suporte"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						className: "w-full justify-start h-12 gap-3 text-base font-normal",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-5 w-5" }), " Ajuda"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					className: "w-full justify-start h-12 gap-3 text-base font-medium text-destructive hover:text-destructive hover:bg-destructive/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-5 w-5" }), " Sair da Conta"]
				})
			]
		})]
	});
}
export { Settings as default };

//# sourceMappingURL=Settings-pykvKCIk.js.map