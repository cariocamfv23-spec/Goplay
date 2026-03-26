import { t as ChevronDown } from "./chevron-down-C29nF4b3.js";
import { t as CircleAlert } from "./circle-alert-CefPeTts.js";
import { Br as createLucideIcon, Cn as cn, Gr as Presence, H as Badge, Wr as useControllableState, Xr as Primitive, Zr as createCollection, bn as useId, cn as Button, di as require_react, ei as createContextScope, gi as __toESM, ni as useComposedRefs, qr as useLayoutEffect2, ri as composeEventHandlers, ti as require_jsx_runtime, tn as useDirection, wn as Zap, xn as toast } from "./index-B51WKH09.js";
import { n as CardContent, t as Card } from "./card-rXLlQYLa.js";
var CalendarPlus = createLucideIcon("calendar-plus", [
	["path", {
		d: "M16 19h6",
		key: "xwg31i"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["path", {
		d: "M19 16v6",
		key: "tddt3s"
	}],
	["path", {
		d: "M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5",
		key: "1glfrc"
	}],
	["path", {
		d: "M3 10h18",
		key: "8toen8"
	}],
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}]
]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var COLLAPSIBLE_NAME = "Collapsible";
var [createCollapsibleContext, createCollapsibleScope] = createContextScope(COLLAPSIBLE_NAME);
var [CollapsibleProvider, useCollapsibleContext] = createCollapsibleContext(COLLAPSIBLE_NAME);
var Collapsible = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCollapsible, open: openProp, defaultOpen, disabled, onOpenChange, ...collapsibleProps } = props;
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: onOpenChange,
		caller: COLLAPSIBLE_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleProvider, {
		scope: __scopeCollapsible,
		disabled,
		contentId: useId(),
		open,
		onOpenToggle: import_react.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			"data-state": getState$1(open),
			"data-disabled": disabled ? "" : void 0,
			...collapsibleProps,
			ref: forwardedRef
		})
	});
});
Collapsible.displayName = COLLAPSIBLE_NAME;
var TRIGGER_NAME$1 = "CollapsibleTrigger";
var CollapsibleTrigger = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCollapsible, ...triggerProps } = props;
	const context = useCollapsibleContext(TRIGGER_NAME$1, __scopeCollapsible);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		"aria-controls": context.contentId,
		"aria-expanded": context.open || false,
		"data-state": getState$1(context.open),
		"data-disabled": context.disabled ? "" : void 0,
		disabled: context.disabled,
		...triggerProps,
		ref: forwardedRef,
		onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
	});
});
CollapsibleTrigger.displayName = TRIGGER_NAME$1;
var CONTENT_NAME$1 = "CollapsibleContent";
var CollapsibleContent = import_react.forwardRef((props, forwardedRef) => {
	const { forceMount, ...contentProps } = props;
	const context = useCollapsibleContext(CONTENT_NAME$1, props.__scopeCollapsible);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.open,
		children: ({ present }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContentImpl, {
			...contentProps,
			ref: forwardedRef,
			present
		})
	});
});
CollapsibleContent.displayName = CONTENT_NAME$1;
var CollapsibleContentImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCollapsible, present, children, ...contentProps } = props;
	const context = useCollapsibleContext(CONTENT_NAME$1, __scopeCollapsible);
	const [isPresent, setIsPresent] = import_react.useState(present);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const heightRef = import_react.useRef(0);
	const height = heightRef.current;
	const widthRef = import_react.useRef(0);
	const width = widthRef.current;
	const isOpen = context.open || isPresent;
	const isMountAnimationPreventedRef = import_react.useRef(isOpen);
	const originalStylesRef = import_react.useRef(void 0);
	import_react.useEffect(() => {
		const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
		return () => cancelAnimationFrame(rAF);
	}, []);
	useLayoutEffect2(() => {
		const node = ref.current;
		if (node) {
			originalStylesRef.current = originalStylesRef.current || {
				transitionDuration: node.style.transitionDuration,
				animationName: node.style.animationName
			};
			node.style.transitionDuration = "0s";
			node.style.animationName = "none";
			const rect = node.getBoundingClientRect();
			heightRef.current = rect.height;
			widthRef.current = rect.width;
			if (!isMountAnimationPreventedRef.current) {
				node.style.transitionDuration = originalStylesRef.current.transitionDuration;
				node.style.animationName = originalStylesRef.current.animationName;
			}
			setIsPresent(present);
		}
	}, [context.open, present]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		"data-state": getState$1(context.open),
		"data-disabled": context.disabled ? "" : void 0,
		id: context.contentId,
		hidden: !isOpen,
		...contentProps,
		ref: composedRefs,
		style: {
			[`--radix-collapsible-content-height`]: height ? `${height}px` : void 0,
			[`--radix-collapsible-content-width`]: width ? `${width}px` : void 0,
			...props.style
		},
		children: isOpen && children
	});
});
function getState$1(open) {
	return open ? "open" : "closed";
}
var Root = Collapsible;
var Trigger = CollapsibleTrigger;
var Content = CollapsibleContent;
var ACCORDION_NAME = "Accordion";
var ACCORDION_KEYS = [
	"Home",
	"End",
	"ArrowDown",
	"ArrowUp",
	"ArrowLeft",
	"ArrowRight"
];
var [Collection, useCollection, createCollectionScope] = createCollection(ACCORDION_NAME);
var [createAccordionContext, createAccordionScope] = createContextScope(ACCORDION_NAME, [createCollectionScope, createCollapsibleScope]);
var useCollapsibleScope = createCollapsibleScope();
var Accordion$1 = import_react.forwardRef((props, forwardedRef) => {
	const { type, ...accordionProps } = props;
	const singleProps = accordionProps;
	const multipleProps = accordionProps;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
		scope: props.__scopeAccordion,
		children: type === "multiple" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImplMultiple, {
			...multipleProps,
			ref: forwardedRef
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImplSingle, {
			...singleProps,
			ref: forwardedRef
		})
	});
});
Accordion$1.displayName = ACCORDION_NAME;
var [AccordionValueProvider, useAccordionValueContext] = createAccordionContext(ACCORDION_NAME);
var [AccordionCollapsibleProvider, useAccordionCollapsibleContext] = createAccordionContext(ACCORDION_NAME, { collapsible: false });
var AccordionImplSingle = import_react.forwardRef((props, forwardedRef) => {
	const { value: valueProp, defaultValue, onValueChange = () => {}, collapsible = false, ...accordionSingleProps } = props;
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? "",
		onChange: onValueChange,
		caller: ACCORDION_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionValueProvider, {
		scope: props.__scopeAccordion,
		value: import_react.useMemo(() => value ? [value] : [], [value]),
		onItemOpen: setValue,
		onItemClose: import_react.useCallback(() => collapsible && setValue(""), [collapsible, setValue]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionCollapsibleProvider, {
			scope: props.__scopeAccordion,
			collapsible,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImpl, {
				...accordionSingleProps,
				ref: forwardedRef
			})
		})
	});
});
var AccordionImplMultiple = import_react.forwardRef((props, forwardedRef) => {
	const { value: valueProp, defaultValue, onValueChange = () => {}, ...accordionMultipleProps } = props;
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? [],
		onChange: onValueChange,
		caller: ACCORDION_NAME
	});
	const handleItemOpen = import_react.useCallback((itemValue) => setValue((prevValue = []) => [...prevValue, itemValue]), [setValue]);
	const handleItemClose = import_react.useCallback((itemValue) => setValue((prevValue = []) => prevValue.filter((value2) => value2 !== itemValue)), [setValue]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionValueProvider, {
		scope: props.__scopeAccordion,
		value,
		onItemOpen: handleItemOpen,
		onItemClose: handleItemClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionCollapsibleProvider, {
			scope: props.__scopeAccordion,
			collapsible: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImpl, {
				...accordionMultipleProps,
				ref: forwardedRef
			})
		})
	});
});
var [AccordionImplProvider, useAccordionContext] = createAccordionContext(ACCORDION_NAME);
var AccordionImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, disabled, dir, orientation = "vertical", ...accordionProps } = props;
	const composedRefs = useComposedRefs(import_react.useRef(null), forwardedRef);
	const getItems = useCollection(__scopeAccordion);
	const isDirectionLTR = useDirection(dir) === "ltr";
	const handleKeyDown = composeEventHandlers(props.onKeyDown, (event) => {
		if (!ACCORDION_KEYS.includes(event.key)) return;
		const target = event.target;
		const triggerCollection = getItems().filter((item) => !item.ref.current?.disabled);
		const triggerIndex = triggerCollection.findIndex((item) => item.ref.current === target);
		const triggerCount = triggerCollection.length;
		if (triggerIndex === -1) return;
		event.preventDefault();
		let nextIndex = triggerIndex;
		const homeIndex = 0;
		const endIndex = triggerCount - 1;
		const moveNext = () => {
			nextIndex = triggerIndex + 1;
			if (nextIndex > endIndex) nextIndex = homeIndex;
		};
		const movePrev = () => {
			nextIndex = triggerIndex - 1;
			if (nextIndex < homeIndex) nextIndex = endIndex;
		};
		switch (event.key) {
			case "Home":
				nextIndex = homeIndex;
				break;
			case "End":
				nextIndex = endIndex;
				break;
			case "ArrowRight":
				if (orientation === "horizontal") if (isDirectionLTR) moveNext();
				else movePrev();
				break;
			case "ArrowDown":
				if (orientation === "vertical") moveNext();
				break;
			case "ArrowLeft":
				if (orientation === "horizontal") if (isDirectionLTR) movePrev();
				else moveNext();
				break;
			case "ArrowUp":
				if (orientation === "vertical") movePrev();
				break;
		}
		triggerCollection[nextIndex % triggerCount].ref.current?.focus();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImplProvider, {
		scope: __scopeAccordion,
		disabled,
		direction: dir,
		orientation,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
			scope: __scopeAccordion,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				...accordionProps,
				"data-orientation": orientation,
				ref: composedRefs,
				onKeyDown: disabled ? void 0 : handleKeyDown
			})
		})
	});
});
var ITEM_NAME = "AccordionItem";
var [AccordionItemProvider, useAccordionItemContext] = createAccordionContext(ITEM_NAME);
var AccordionItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, value, ...accordionItemProps } = props;
	const accordionContext = useAccordionContext(ITEM_NAME, __scopeAccordion);
	const valueContext = useAccordionValueContext(ITEM_NAME, __scopeAccordion);
	const collapsibleScope = useCollapsibleScope(__scopeAccordion);
	const triggerId = useId();
	const open = value && valueContext.value.includes(value) || false;
	const disabled = accordionContext.disabled || props.disabled;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionItemProvider, {
		scope: __scopeAccordion,
		open,
		disabled,
		triggerId,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
			"data-orientation": accordionContext.orientation,
			"data-state": getState(open),
			...collapsibleScope,
			...accordionItemProps,
			ref: forwardedRef,
			disabled,
			open,
			onOpenChange: (open2) => {
				if (open2) valueContext.onItemOpen(value);
				else valueContext.onItemClose(value);
			}
		})
	});
});
AccordionItem$1.displayName = ITEM_NAME;
var HEADER_NAME = "AccordionHeader";
var AccordionHeader = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, ...headerProps } = props;
	const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
	const itemContext = useAccordionItemContext(HEADER_NAME, __scopeAccordion);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.h3, {
		"data-orientation": accordionContext.orientation,
		"data-state": getState(itemContext.open),
		"data-disabled": itemContext.disabled ? "" : void 0,
		...headerProps,
		ref: forwardedRef
	});
});
AccordionHeader.displayName = HEADER_NAME;
var TRIGGER_NAME = "AccordionTrigger";
var AccordionTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, ...triggerProps } = props;
	const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
	const itemContext = useAccordionItemContext(TRIGGER_NAME, __scopeAccordion);
	const collapsibleContext = useAccordionCollapsibleContext(TRIGGER_NAME, __scopeAccordion);
	const collapsibleScope = useCollapsibleScope(__scopeAccordion);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.ItemSlot, {
		scope: __scopeAccordion,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
			"aria-disabled": itemContext.open && !collapsibleContext.collapsible || void 0,
			"data-orientation": accordionContext.orientation,
			id: itemContext.triggerId,
			...collapsibleScope,
			...triggerProps,
			ref: forwardedRef
		})
	});
});
AccordionTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "AccordionContent";
var AccordionContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, ...contentProps } = props;
	const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
	const itemContext = useAccordionItemContext(CONTENT_NAME, __scopeAccordion);
	const collapsibleScope = useCollapsibleScope(__scopeAccordion);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		role: "region",
		"aria-labelledby": itemContext.triggerId,
		"data-orientation": accordionContext.orientation,
		...collapsibleScope,
		...contentProps,
		ref: forwardedRef,
		style: {
			["--radix-accordion-content-height"]: "var(--radix-collapsible-content-height)",
			["--radix-accordion-content-width"]: "var(--radix-collapsible-content-width)",
			...props.style
		}
	});
});
AccordionContent$1.displayName = CONTENT_NAME;
function getState(open) {
	return open ? "open" : "closed";
}
var Root2 = Accordion$1;
var Item = AccordionItem$1;
var Header = AccordionHeader;
var Trigger2 = AccordionTrigger$1;
var Content2 = AccordionContent$1;
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
function TrainingSuggestions({ suggestions }) {
	const handleAddToCalendar = (title) => {
		toast.success("Treino Agendado!", {
			description: `${title} foi adicionado ao seu calendário para amanhã.`,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarPlus, { className: "h-4 w-4 text-primary" })
		});
	};
	if (!suggestions || suggestions.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "border-dashed border-2 bg-zinc-900/30 border-zinc-800",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex flex-col items-center justify-center py-8 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-8 w-8 text-zinc-600 mb-2 opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-zinc-500 text-sm",
				children: [
					"Nenhuma sugestão disponível no momento.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Continue jogando para gerar dados!"
				]
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "font-bold text-lg flex items-center gap-2 text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5 text-primary" }), "Sugestões do AI Coach"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "outline",
				className: "border-primary/30 text-primary",
				children: "Personalizado"
			})]
		}), suggestions.map((suggestion) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "overflow-hidden border-none shadow-md bg-zinc-900",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-l-4 border-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
					type: "single",
					collapsible: true,
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: suggestion.id,
						className: "border-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "px-4 py-3 hover:no-underline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-start text-left gap-1 w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 w-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-base text-zinc-100",
										children: suggestion.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: cn("ml-auto text-[10px]", suggestion.difficulty === "Avançado" ? "bg-red-900/30 text-red-400" : suggestion.difficulty === "Intermediário" ? "bg-yellow-900/30 text-yellow-400" : "bg-green-900/30 text-green-400"),
										children: suggestion.difficulty
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-xs text-zinc-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: suggestion.reason })]
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionContent, {
							className: "px-4 pb-4 pt-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-zinc-300 mb-3",
									children: suggestion.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 bg-zinc-950/50 rounded-lg p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2",
										children: "Exercícios Recomendados"
									}), suggestion.exercises.map((exercise, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-sm border-b border-zinc-800 last:border-0 pb-2 last:pb-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-medium flex items-center gap-2 text-zinc-200",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-1.5 rounded-full bg-primary" }), exercise.name]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-zinc-500 text-xs whitespace-nowrap",
											children: [
												exercise.sets,
												" x ",
												exercise.reps
											]
										})]
									}, idx))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2 mt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										className: "h-8 text-xs rounded-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white",
										children: "Ver Detalhes"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										onClick: () => handleAddToCalendar(suggestion.title),
										className: "h-8 text-xs rounded-full bg-white text-black hover:bg-zinc-200",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarPlus, { className: "h-3 w-3 mr-1" }), " Agendar"]
									})]
								})
							]
						})]
					})
				})
			})
		}, suggestion.id))]
	});
}
export { TrainingSuggestions as t };

//# sourceMappingURL=TrainingSuggestions-C9ig-C56.js.map