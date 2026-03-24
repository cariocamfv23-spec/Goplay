import { t as Download } from "./download-b2clp4Zn.js";
import "./ellipsis-BP8Us5k7.js";
import { t as ShareDialog } from "./ShareDialog-DZV2qO6q.js";
import { t as Image } from "./image-IH4vqkUP.js";
import "./mail-wPWbNlD6.js";
import "./message-circle-C4nw_I2h.js";
import { t as RefreshCw } from "./refresh-cw-C0vBeWwa.js";
import { t as RotateCcw } from "./rotate-ccw-BZ74EphH.js";
import { t as Share2 } from "./share-2-C6UT6mLP.js";
import { t as Trash2 } from "./trash-2-BCpm7BNs.js";
import { t as Type } from "./type-CYgYmiZF.js";
import { t as Upload } from "./upload-RIPak507.js";
import { t as WandSparkles } from "./wand-sparkles-FlcOcbmi.js";
import { Ar as ArrowLeft, B as Badge, Dn as Trophy, Er as Bike, In as Sparkles, Jn as MapPin, Jr as require_jsx_runtime, Jt as createRovingFocusGroupScope, Kt as Item, Lr as useControllableState, Mn as Swords, Nr as createLucideIcon, Un as Palette, Ur as Primitive, Zt as useDirection, _n as toast, br as Check, gr as Clock, ii as require_react, in as Button, li as __toESM, qr as createContextScope, qt as Root, ti as useNavigate, wr as Calendar, yn as cn } from "./index-Dri2BohY.js";
import { n as CardContent, t as Card } from "./card-DHTrV-FU.js";
import { t as Label } from "./label-moNrNjSO.js";
import { t as Input } from "./input-DZWq3H4F.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-C47ialW5.js";
import { n as toggleVariants, r as Toggle } from "./toggle-Btf7KgF3.js";
var LayoutTemplate = createLucideIcon("layout-template", [
	["rect", {
		width: "18",
		height: "7",
		x: "3",
		y: "3",
		rx: "1",
		key: "f1a2em"
	}],
	["rect", {
		width: "9",
		height: "7",
		x: "3",
		y: "14",
		rx: "1",
		key: "jqznyg"
	}],
	["rect", {
		width: "5",
		height: "7",
		x: "16",
		y: "14",
		rx: "1",
		key: "q5h2i8"
	}]
]);
var MonitorPlay = createLucideIcon("monitor-play", [
	["path", {
		d: "M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z",
		key: "vbtd3f"
	}],
	["path", {
		d: "M12 17v4",
		key: "1riwvh"
	}],
	["path", {
		d: "M8 21h8",
		key: "1ev6f3"
	}],
	["rect", {
		x: "2",
		y: "3",
		width: "20",
		height: "14",
		rx: "2",
		key: "x3v2xh"
	}]
]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var TOGGLE_GROUP_NAME = "ToggleGroup";
var [createToggleGroupContext, createToggleGroupScope] = createContextScope(TOGGLE_GROUP_NAME, [createRovingFocusGroupScope]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var ToggleGroup$1 = import_react.forwardRef((props, forwardedRef) => {
	const { type, ...toggleGroupProps } = props;
	if (type === "single") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupImplSingle, {
		...toggleGroupProps,
		ref: forwardedRef
	});
	if (type === "multiple") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupImplMultiple, {
		...toggleGroupProps,
		ref: forwardedRef
	});
	throw new Error(`Missing prop \`type\` expected on \`${TOGGLE_GROUP_NAME}\``);
});
ToggleGroup$1.displayName = TOGGLE_GROUP_NAME;
var [ToggleGroupValueProvider, useToggleGroupValueContext] = createToggleGroupContext(TOGGLE_GROUP_NAME);
var ToggleGroupImplSingle = import_react.forwardRef((props, forwardedRef) => {
	const { value: valueProp, defaultValue, onValueChange = () => {}, ...toggleGroupSingleProps } = props;
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? "",
		onChange: onValueChange,
		caller: TOGGLE_GROUP_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupValueProvider, {
		scope: props.__scopeToggleGroup,
		type: "single",
		value: import_react.useMemo(() => value ? [value] : [], [value]),
		onItemActivate: setValue,
		onItemDeactivate: import_react.useCallback(() => setValue(""), [setValue]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupImpl, {
			...toggleGroupSingleProps,
			ref: forwardedRef
		})
	});
});
var ToggleGroupImplMultiple = import_react.forwardRef((props, forwardedRef) => {
	const { value: valueProp, defaultValue, onValueChange = () => {}, ...toggleGroupMultipleProps } = props;
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? [],
		onChange: onValueChange,
		caller: TOGGLE_GROUP_NAME
	});
	const handleButtonActivate = import_react.useCallback((itemValue) => setValue((prevValue = []) => [...prevValue, itemValue]), [setValue]);
	const handleButtonDeactivate = import_react.useCallback((itemValue) => setValue((prevValue = []) => prevValue.filter((value2) => value2 !== itemValue)), [setValue]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupValueProvider, {
		scope: props.__scopeToggleGroup,
		type: "multiple",
		value,
		onItemActivate: handleButtonActivate,
		onItemDeactivate: handleButtonDeactivate,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupImpl, {
			...toggleGroupMultipleProps,
			ref: forwardedRef
		})
	});
});
ToggleGroup$1.displayName = TOGGLE_GROUP_NAME;
var [ToggleGroupContext$1, useToggleGroupContext] = createToggleGroupContext(TOGGLE_GROUP_NAME);
var ToggleGroupImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeToggleGroup, disabled = false, rovingFocus = true, orientation, dir, loop = true, ...toggleGroupProps } = props;
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToggleGroup);
	const direction = useDirection(dir);
	const commonProps = {
		role: "group",
		dir: direction,
		...toggleGroupProps
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupContext$1, {
		scope: __scopeToggleGroup,
		rovingFocus,
		disabled,
		children: rovingFocus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
			asChild: true,
			...rovingFocusGroupScope,
			orientation,
			dir: direction,
			loop,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				...commonProps,
				ref: forwardedRef
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			...commonProps,
			ref: forwardedRef
		})
	});
});
var ITEM_NAME = "ToggleGroupItem";
var ToggleGroupItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const valueContext = useToggleGroupValueContext(ITEM_NAME, props.__scopeToggleGroup);
	const context = useToggleGroupContext(ITEM_NAME, props.__scopeToggleGroup);
	const rovingFocusGroupScope = useRovingFocusGroupScope(props.__scopeToggleGroup);
	const pressed = valueContext.value.includes(props.value);
	const disabled = context.disabled || props.disabled;
	const commonProps = {
		...props,
		pressed,
		disabled
	};
	const ref = import_react.useRef(null);
	return context.rovingFocus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		asChild: true,
		...rovingFocusGroupScope,
		focusable: !disabled,
		active: pressed,
		ref,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItemImpl, {
			...commonProps,
			ref: forwardedRef
		})
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItemImpl, {
		...commonProps,
		ref: forwardedRef
	});
});
ToggleGroupItem$1.displayName = ITEM_NAME;
var ToggleGroupItemImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeToggleGroup, value, ...itemProps } = props;
	const valueContext = useToggleGroupValueContext(ITEM_NAME, __scopeToggleGroup);
	const singleProps = {
		role: "radio",
		"aria-checked": props.pressed,
		"aria-pressed": void 0
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
		...valueContext.type === "single" ? singleProps : void 0,
		...itemProps,
		ref: forwardedRef,
		onPressedChange: (pressed) => {
			if (pressed) valueContext.onItemActivate(value);
			else valueContext.onItemDeactivate(value);
		}
	});
});
var Root2 = ToggleGroup$1;
var Item2 = ToggleGroupItem$1;
var ToggleGroupContext = import_react.createContext({
	size: "default",
	variant: "default"
});
var ToggleGroup = import_react.forwardRef(({ className, variant, size, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
	ref,
	className: cn("flex items-center justify-center gap-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupContext.Provider, {
		value: {
			variant,
			size
		},
		children
	})
}));
ToggleGroup.displayName = Root2.displayName;
var ToggleGroupItem = import_react.forwardRef(({ className, children, variant, size, ...props }, ref) => {
	const context = import_react.useContext(ToggleGroupContext);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		ref,
		className: cn(toggleVariants({
			variant: context.variant || variant,
			size: context.size || size
		}), className),
		...props,
		children
	});
});
ToggleGroupItem.displayName = Item2.displayName;
function FlyerCreator() {
	const navigate = useNavigate();
	const fileInputRef = (0, import_react.useRef)(null);
	const [step, setStep] = (0, import_react.useState)("select");
	const [selectedTemplate, setSelectedTemplate] = (0, import_react.useState)("matchup");
	const [showShare, setShowShare] = (0, import_react.useState)(false);
	const [flyerData, setFlyerData] = (0, import_react.useState)({
		title: "",
		teamA: "",
		teamB: "",
		date: "",
		time: "",
		location: "",
		category: ""
	});
	const [designData, setDesignData] = (0, import_react.useState)({
		layout: "classic",
		primaryColor: "#ffffff",
		secondaryColor: "#ef4444",
		imageSource: "ai",
		customImage: null,
		aiGeneratedImage: null
	});
	const templates = [
		{
			id: "matchup",
			name: "Dia de Jogo",
			description: "Clássico confronto 1x1 ou Time vs Time",
			icon: Trophy,
			color: "bg-blue-500"
		},
		{
			id: "event",
			name: "Evento Esportivo",
			description: "Corridas, ciclismo e encontros gerais",
			icon: Bike,
			color: "bg-green-500"
		},
		{
			id: "fight",
			name: "Fight Night",
			description: "Boxe, MMA e artes marciais",
			icon: Swords,
			color: "bg-red-500"
		}
	];
	const colorPresets = [
		"#ffffff",
		"#000000",
		"#ef4444",
		"#3b82f6",
		"#22c55e",
		"#eab308",
		"#a855f7",
		"#ec4899"
	];
	const handleTemplateSelect = (id) => {
		setSelectedTemplate(id);
		if (id === "matchup") setDesignData((prev) => ({
			...prev,
			secondaryColor: "#eab308"
		}));
		if (id === "event") setDesignData((prev) => ({
			...prev,
			secondaryColor: "#22c55e"
		}));
		if (id === "fight") setDesignData((prev) => ({
			...prev,
			secondaryColor: "#ef4444"
		}));
		setStep("details");
	};
	const handleDetailsSubmit = () => {
		if (selectedTemplate === "matchup" && (!flyerData.teamA || !flyerData.teamB) || selectedTemplate === "event" && !flyerData.title || !flyerData.date || !flyerData.location) {
			toast.error("Preencha as informações principais");
			return;
		}
		setStep("design");
	};
	const handleImageUpload = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setDesignData((prev) => ({
					...prev,
					customImage: reader.result,
					imageSource: "upload"
				}));
			};
			reader.readAsDataURL(file);
		}
	};
	const handleGenerate = () => {
		if (designData.imageSource === "upload" && !designData.customImage) {
			toast.error("Por favor, faça o upload de uma imagem");
			return;
		}
		if (designData.imageSource === "ai") {
			setStep("generating");
			let query = "sports stadium";
			if (selectedTemplate === "fight") query = "boxing ring mma dark atmosphere";
			if (selectedTemplate === "event") query = `${flyerData.category || "sports"} event outdoor`;
			if (selectedTemplate === "matchup") query = `${flyerData.category || "soccer"} stadium night match`;
			setTimeout(() => {
				const aiImage = `https://img.usecurling.com/p/600/800?q=${encodeURIComponent(query)}&color=${designData.secondaryColor.replace("#", "")}`;
				setDesignData((prev) => ({
					...prev,
					aiGeneratedImage: aiImage
				}));
				setStep("result");
				toast.success("Flyer gerado com sucesso!");
			}, 3e3);
		} else {
			setStep("result");
			toast.success("Flyer criado com sucesso!");
		}
	};
	const handleDownload = () => {
		toast.success("Download iniciado...", { description: "A imagem foi salva na sua galeria." });
	};
	const FlyerPreview = ({ interactive = false }) => {
		let bgImage = "";
		if (designData.imageSource === "upload" && designData.customImage) bgImage = designData.customImage;
		else if (designData.imageSource === "ai" && designData.aiGeneratedImage && step === "result") bgImage = designData.aiGeneratedImage;
		else switch (selectedTemplate) {
			case "fight":
				bgImage = "https://img.usecurling.com/p/600/800?q=boxing%20ring%20dark&color=red";
				break;
			case "event":
				bgImage = "https://img.usecurling.com/p/600/800?q=road%20race%20cycling&color=green";
				break;
			default: bgImage = "https://img.usecurling.com/p/600/800?q=soccer%20stadium%20night&color=blue";
		}
		const isClassic = designData.layout === "classic";
		const isModern = designData.layout === "modern";
		const isBold = designData.layout === "bold";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative w-full aspect-[3/4] overflow-hidden shadow-2xl bg-black group transition-all duration-500", interactive ? "rounded-xl" : "rounded-none"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: bgImage,
						alt: "Background",
						className: cn("absolute inset-0 w-full h-full object-cover transition-transform duration-700", step === "result" ? "" : "opacity-80", isBold ? "grayscale opacity-50 contrast-125" : "opacity-70")
					})
				}),
				isClassic && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" }),
				isModern && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute left-0 bottom-0 top-0 w-1/3 opacity-90 backdrop-blur-sm",
						style: { backgroundColor: designData.secondaryColor }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" })
				] }),
				isBold && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-4 border-4 z-10",
					style: { borderColor: designData.primaryColor }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("absolute inset-0 p-6 flex flex-col text-white transition-all duration-500", isClassic ? "justify-between text-center" : "", isModern ? "justify-end text-left pl-8 pb-10" : "", isBold ? "justify-center items-center text-center" : ""),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("space-y-2", isClassic ? "mt-4" : "", isModern ? "absolute top-6 left-6" : "", isBold ? "absolute top-10" : ""),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "backdrop-blur-md border-0 uppercase tracking-widest text-[10px]",
								style: {
									backgroundColor: isModern ? "white" : "rgba(255,255,255,0.2)",
									color: isModern ? "black" : "white"
								},
								children: "Goplay Presents"
							}), !isModern && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-3xl font-black uppercase tracking-tighter leading-none drop-shadow-lg",
								style: { color: isBold ? designData.secondaryColor : designData.primaryColor },
								children: selectedTemplate === "event" ? flyerData.title || "NOME DO EVENTO" : selectedTemplate === "fight" ? "FIGHT NIGHT" : "MATCH DAY"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4 my-auto w-full",
							children: selectedTemplate === "matchup" || selectedTemplate === "fight" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("flex gap-4 items-center", isModern ? "flex-col items-start" : "flex-col"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: cn("font-bold uppercase truncate drop-shadow-md", isBold ? "text-5xl" : "text-3xl", isModern ? "text-4xl text-left" : ""),
											style: { color: isBold ? "white" : designData.primaryColor },
											children: flyerData.teamA || "TIME A"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: cn("flex items-center justify-center font-black italic", isBold ? "text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500" : "h-10 w-10 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm"),
										style: isModern ? {
											color: designData.primaryColor,
											background: "none",
											padding: 0,
											justifyContent: "flex-start",
											border: "none"
										} : {},
										children: "VS"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: cn("font-bold uppercase truncate drop-shadow-md", isBold ? "text-5xl" : "text-3xl", isModern ? "text-4xl text-left" : ""),
											style: { color: isBold ? "white" : designData.primaryColor },
											children: flyerData.teamB || "TIME B"
										})
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("w-full", isModern ? "pl-2" : "px-4"),
								children: [isModern && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-4xl font-black uppercase tracking-tighter leading-none drop-shadow-lg mb-4 text-white",
									children: flyerData.title || "NOME DO EVENTO"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-2xl font-black uppercase opacity-90 leading-tight",
									style: { color: designData.secondaryColor },
									children: flyerData.category || "Categoria Livre"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("space-y-3", isClassic ? "mb-4" : "", isModern ? "mb-0" : "", isBold ? "absolute bottom-10 w-full px-10" : ""),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("flex flex-col gap-2 text-sm font-medium backdrop-blur-md p-4 rounded-xl border border-white/10", isModern ? "bg-transparent border-none p-0 items-start" : "bg-black/40"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
											className: "h-4 w-4",
											style: { color: designData.secondaryColor }
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: flyerData.date || "Data do Evento" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
											className: "h-4 w-4",
											style: { color: designData.secondaryColor }
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: flyerData.time || "Horário" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-left",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
											className: "h-4 w-4 shrink-0",
											style: { color: designData.secondaryColor }
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate",
											children: flyerData.location || "Localização"
										})]
									})
								]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-2 right-2 flex items-center gap-1 opacity-50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[8px] font-medium text-white",
						children: "Goplay Design"
					})]
				})
			]
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-safe animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border/40 p-4 flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => {
						if (step === "select") navigate(-1);
						else if (step === "generating") return;
						else if (step === "result") setStep("design");
						else if (step === "design") setStep("details");
						else setStep("select");
					},
					className: "rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-bold",
					children: "Criador de Flyers"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 max-w-4xl mx-auto w-full",
				children: [
					step === "select" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6 animate-in slide-in-from-bottom-4 duration-500 max-w-md mx-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold",
								children: "Escolha um Modelo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-sm",
								children: "Selecione o estilo ideal para promover o seu evento esportivo."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4",
							children: templates.map((template) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "cursor-pointer hover:border-primary transition-all active:scale-[0.98] overflow-hidden group border-border/60",
								onClick: () => handleTemplateSelect(template.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "p-0 flex",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("w-3 bg-gradient-to-b from-primary/50 to-primary", template.color.replace("bg-", "from-").replace("500", "")) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-5 flex items-center gap-4 w-full",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: cn("h-12 w-12 rounded-full flex items-center justify-center shrink-0 shadow-md", template.color),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(template.icon, { className: "h-6 w-6 text-white" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1 min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "font-bold text-lg group-hover:text-primary transition-colors",
													children: template.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground truncate",
													children: template.description
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-muted-foreground group-hover:translate-x-1 transition-transform",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5 rotate-180" })
											})
										]
									})]
								})
							}, template.id))
						})]
					}),
					step === "details" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6 animate-in slide-in-from-right-4 duration-500 max-w-md mx-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold",
									children: "Detalhes do Evento"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Preencha as informações que aparecerão no flyer."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									selectedTemplate === "event" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome do Evento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Ex: Maratona de Verão",
											value: flyerData.title,
											onChange: (e) => setFlyerData({
												...flyerData,
												title: e.target.value
											})
										})]
									}),
									(selectedTemplate === "matchup" || selectedTemplate === "fight") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: selectedTemplate === "fight" ? "Lutador A" : "Time da Casa" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "Nome",
												value: flyerData.teamA,
												onChange: (e) => setFlyerData({
													...flyerData,
													teamA: e.target.value
												})
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: selectedTemplate === "fight" ? "Lutador B" : "Visitante" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "Nome",
												value: flyerData.teamB,
												onChange: (e) => setFlyerData({
													...flyerData,
													teamB: e.target.value
												})
											})]
										})]
									}),
									selectedTemplate === "event" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Categoria" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Ex: Ciclismo 50km",
											value: flyerData.category,
											onChange: (e) => setFlyerData({
												...flyerData,
												category: e.target.value
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Data" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "date",
												value: flyerData.date,
												onChange: (e) => setFlyerData({
													...flyerData,
													date: e.target.value
												})
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Horário" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "time",
												value: flyerData.time,
												onChange: (e) => setFlyerData({
													...flyerData,
													time: e.target.value
												})
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Local" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "pl-9",
												placeholder: "Ex: Arena Central, Quadra 2",
												value: flyerData.location,
												onChange: (e) => setFlyerData({
													...flyerData,
													location: e.target.value
												})
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "w-full h-12 text-lg font-bold shadow-lg mt-4 gap-2",
								onClick: handleDetailsSubmit,
								children: ["Continuar", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5 rotate-180" })]
							})
						]
					}),
					step === "design" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col md:flex-row gap-8 animate-in fade-in duration-500",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 order-1 md:order-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sticky top-20 mx-auto max-w-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-sm",
										children: "Preview em Tempo Real"
									}), designData.imageSource === "ai" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "outline",
										className: "text-[10px] gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "h-3 w-3" }), " Imagem IA"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlyerPreview, { interactive: true })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full md:w-[400px] order-2 md:order-1 space-y-8 pb-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl font-bold",
										children: "Personalizar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Ajuste o visual do seu flyer."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-base",
										children: "Layout"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToggleGroup, {
										type: "single",
										value: designData.layout,
										onValueChange: (val) => val && setDesignData({
											...designData,
											layout: val
										}),
										className: "justify-start gap-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToggleGroupItem, {
												value: "classic",
												className: "h-20 w-24 flex flex-col gap-2 border-2 data-[state=on]:border-primary data-[state=on]:bg-primary/5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutTemplate, { className: "h-6 w-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs",
													children: "Clássico"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToggleGroupItem, {
												value: "modern",
												className: "h-20 w-24 flex flex-col gap-2 border-2 data-[state=on]:border-primary data-[state=on]:bg-primary/5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorPlay, { className: "h-6 w-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs",
													children: "Moderno"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToggleGroupItem, {
												value: "bold",
												className: "h-20 w-24 flex flex-col gap-2 border-2 data-[state=on]:border-primary data-[state=on]:bg-primary/5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Type, { className: "h-6 w-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs",
													children: "Bold"
												})]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-base",
											children: "Cores do Tema"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-xs font-normal text-muted-foreground",
													children: "Cor Primária (Textos)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-6 w-6 rounded-full border border-border",
														style: { backgroundColor: designData.primaryColor }
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-mono",
														children: designData.primaryColor
													})]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2 flex-wrap",
												children: [colorPresets.map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: cn("h-8 w-8 rounded-full border border-border transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", designData.primaryColor === color ? "ring-2 ring-primary ring-offset-2 scale-110" : ""),
													style: { backgroundColor: color },
													onClick: () => setDesignData({
														...designData,
														primaryColor: color
													})
												}, `primary-${color}`)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "color",
														className: "absolute inset-0 opacity-0 cursor-pointer w-full h-full",
														value: designData.primaryColor,
														onChange: (e) => setDesignData({
															...designData,
															primaryColor: e.target.value
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "outline",
														size: "icon",
														className: "rounded-full",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "h-4 w-4" })
													})]
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-xs font-normal text-muted-foreground",
													children: "Cor Secundária (Detalhes)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-6 w-6 rounded-full border border-border",
														style: { backgroundColor: designData.secondaryColor }
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-mono",
														children: designData.secondaryColor
													})]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2 flex-wrap",
												children: [colorPresets.map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: cn("h-8 w-8 rounded-full border border-border transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", designData.secondaryColor === color ? "ring-2 ring-primary ring-offset-2 scale-110" : ""),
													style: { backgroundColor: color },
													onClick: () => setDesignData({
														...designData,
														secondaryColor: color
													})
												}, `secondary-${color}`)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "color",
														className: "absolute inset-0 opacity-0 cursor-pointer w-full h-full",
														value: designData.secondaryColor,
														onChange: (e) => setDesignData({
															...designData,
															secondaryColor: e.target.value
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "outline",
														size: "icon",
														className: "rounded-full",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "h-4 w-4" })
													})]
												})]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-base",
										children: "Imagem de Fundo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
										value: designData.imageSource,
										onValueChange: (val) => setDesignData({
											...designData,
											imageSource: val
										}),
										className: "w-full",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
												className: "w-full grid grid-cols-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
													value: "ai",
													className: "gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "h-4 w-4" }), "Gerar com IA"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
													value: "upload",
													className: "gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }), "Upload Próprio"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
												value: "ai",
												className: "mt-4 space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: "A IA irá gerar uma imagem única baseada nos detalhes do seu evento."
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "p-4 border rounded-lg bg-secondary/20 flex items-center gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm",
														children: "Imagem gerada automaticamente na próxima etapa."
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
												value: "upload",
												className: "mt-4 space-y-4",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "file",
														accept: "image/*",
														ref: fileInputRef,
														className: "hidden",
														onChange: handleImageUpload
													}), designData.customImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "relative rounded-lg overflow-hidden border aspect-video group",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: designData.customImage,
															alt: "Custom",
															className: "w-full h-full object-cover"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
																size: "sm",
																variant: "secondary",
																onClick: () => fileInputRef.current?.click(),
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4 mr-2" }), " Trocar"]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																size: "sm",
																variant: "destructive",
																onClick: () => setDesignData({
																	...designData,
																	customImage: null
																}),
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
															})]
														})]
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														onClick: () => fileInputRef.current?.click(),
														className: "border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-secondary/50 transition-colors",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "bg-secondary p-3 rounded-full mb-3",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-6 w-6 text-muted-foreground" })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-sm font-medium",
																children: "Clique para selecionar"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-xs text-muted-foreground mt-1",
																children: "JPG ou PNG (Max 5MB)"
															})
														]
													})]
												})
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "w-full h-12 text-lg font-bold shadow-lg mt-8 gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700",
									onClick: handleGenerate,
									children: designData.imageSource === "ai" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "h-5 w-5" }), "Gerar Flyer"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5" }), "Finalizar Flyer"] })
								})
							]
						})]
					}),
					step === "generating" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center min-h-[50vh] space-y-8 animate-in zoom-in duration-500",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-24 w-24 rounded-full border-4 border-muted flex items-center justify-center bg-secondary/30",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-10 w-10 text-muted-foreground/20" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin duration-1000" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 flex items-center justify-center animate-pulse",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-8 w-8 text-primary" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-bold",
								children: "Criando Arte..."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground max-w-[200px] mx-auto",
								children: "A IA está desenhando seu flyer promocional."
							})]
						})]
					}),
					step === "result" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6 animate-in slide-in-from-bottom-8 duration-500 pb-10 max-w-md mx-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-2xl font-bold",
									children: "Seu Flyer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setStep("design"),
									children: "Editar Design"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlyerPreview, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									className: "h-14 rounded-xl gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary",
									onClick: handleDownload,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-5 w-5" }), "Baixar"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "h-14 rounded-xl gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20",
									onClick: () => setShowShare(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-5 w-5" }), "Compartilhar"]
								})]
							}),
							designData.imageSource === "ai" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								className: "w-full text-xs text-muted-foreground gap-2",
								onClick: () => setStep("generating"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3 w-3" }), "Gerar nova imagem com IA"]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareDialog, {
				open: showShare,
				onOpenChange: setShowShare
			})
		]
	});
}
export { FlyerCreator as default };

//# sourceMappingURL=FlyerCreator-Ba2Dk5ca.js.map