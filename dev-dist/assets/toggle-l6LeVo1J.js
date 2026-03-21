import { Dr as useControllableState, Lr as require_jsx_runtime, Nr as Primitive, Qr as __toESM, qr as require_react, un as cn, wr as cva, zr as composeEventHandlers } from "./index-B1eGiQWt.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var NAME = "Toggle";
var Toggle$1 = import_react.forwardRef((props, forwardedRef) => {
	const { pressed: pressedProp, defaultPressed, onPressedChange, ...buttonProps } = props;
	const [pressed, setPressed] = useControllableState({
		prop: pressedProp,
		onChange: onPressedChange,
		defaultProp: defaultPressed ?? false,
		caller: NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		"aria-pressed": pressed,
		"data-state": pressed ? "on" : "off",
		"data-disabled": props.disabled ? "" : void 0,
		...buttonProps,
		ref: forwardedRef,
		onClick: composeEventHandlers(props.onClick, () => {
			if (!props.disabled) setPressed(!pressed);
		})
	});
});
Toggle$1.displayName = NAME;
var Root = Toggle$1;
var toggleVariants = cva("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2", {
	variants: {
		variant: {
			default: "bg-transparent",
			outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
		},
		size: {
			default: "h-10 px-3 min-w-10",
			sm: "h-9 px-2.5 min-w-9",
			lg: "h-11 px-5 min-w-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Toggle = import_react.forwardRef(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(toggleVariants({
		variant,
		size,
		className
	})),
	...props
}));
Toggle.displayName = Root.displayName;
export { toggleVariants as n, Toggle$1 as r, Toggle as t };

//# sourceMappingURL=toggle-l6LeVo1J.js.map