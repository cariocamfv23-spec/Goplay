import "./chevron-down-cBHb13-i.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DKdMOAKg.js";
import { t as Pause } from "./pause-fFkSHDyG.js";
import { t as Play } from "./play-B03Py8gu.js";
import { t as RotateCcw } from "./rotate-ccw--53q-Y89.js";
import { t as Upload } from "./upload-CgyHJhN5.js";
import { $r as __toESM, En as Sparkles, Gr as useNavigate, Jr as require_react, Qr as __toCommonJS, Rr as require_jsx_runtime, Un as Info, Xr as __esmMin, Zr as __export, Zt as Button, cn as toast, d as DialogFooter, f as DialogHeader, jt as create, l as DialogContent, p as DialogTitle, s as Dialog, sr as Clock, u as DialogDescription, un as cn, xr as ArrowLeft } from "./index-BAKyNRbD.js";
import "./dist-2ZSUp4J7.js";
var import_react = require_react();
const useTimeShiftStore = create((set, get) => ({
	timeline: "real",
	sport: "football",
	isPlaying: true,
	setTimeline: (timeline) => set({ timeline }),
	setSport: (sport) => set({ sport }),
	togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
	setIsPlaying: (isPlaying) => set({ isPlaying }),
	cycleTimeline: (direction) => {
		const timelines = [
			"real",
			"almost",
			"ideal"
		];
		const currentIndex = timelines.indexOf(get().timeline);
		let nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
		if (nextIndex >= timelines.length) nextIndex = 0;
		if (nextIndex < 0) nextIndex = timelines.length - 1;
		set({ timeline: timelines[nextIndex] });
	}
}));
var MotionConfigContext = (0, import_react.createContext)({
	transformPagePoint: (p) => p,
	isStatic: false,
	reducedMotion: "never"
});
var MotionContext = (0, import_react.createContext)({});
var PresenceContext = (0, import_react.createContext)(null);
var isBrowser = typeof document !== "undefined";
var useIsomorphicLayoutEffect = isBrowser ? import_react.useLayoutEffect : import_react.useEffect;
var LazyContext = (0, import_react.createContext)({ strict: false });
function useVisualElement(Component, visualState, props, createVisualElement) {
	const { visualElement: parent } = (0, import_react.useContext)(MotionContext);
	const lazyContext = (0, import_react.useContext)(LazyContext);
	const presenceContext = (0, import_react.useContext)(PresenceContext);
	const reducedMotionConfig = (0, import_react.useContext)(MotionConfigContext).reducedMotion;
	const visualElementRef = (0, import_react.useRef)();
	createVisualElement = createVisualElement || lazyContext.renderer;
	if (!visualElementRef.current && createVisualElement) visualElementRef.current = createVisualElement(Component, {
		visualState,
		parent,
		props,
		presenceContext,
		blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
		reducedMotionConfig
	});
	const visualElement = visualElementRef.current;
	(0, import_react.useInsertionEffect)(() => {
		visualElement && visualElement.update(props, presenceContext);
	});
	useIsomorphicLayoutEffect(() => {
		visualElement && visualElement.render();
	});
	(0, import_react.useEffect)(() => {
		visualElement && visualElement.updateFeatures();
	});
	(window.HandoffAppearAnimations ? useIsomorphicLayoutEffect : import_react.useEffect)(() => {
		if (visualElement && visualElement.animationState) visualElement.animationState.animateChanges();
	});
	return visualElement;
}
function isRefObject(ref) {
	return typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}
function useMotionRef(visualState, visualElement, externalRef) {
	return (0, import_react.useCallback)((instance) => {
		instance && visualState.mount && visualState.mount(instance);
		if (visualElement) instance ? visualElement.mount(instance) : visualElement.unmount();
		if (externalRef) {
			if (typeof externalRef === "function") externalRef(instance);
			else if (isRefObject(externalRef)) externalRef.current = instance;
		}
	}, [visualElement]);
}
function isVariantLabel(v) {
	return typeof v === "string" || Array.isArray(v);
}
function isAnimationControls(v) {
	return typeof v === "object" && typeof v.start === "function";
}
var variantPriorityOrder = [
	"animate",
	"whileInView",
	"whileFocus",
	"whileHover",
	"whileTap",
	"whileDrag",
	"exit"
];
var variantProps = ["initial", ...variantPriorityOrder];
function isControllingVariants(props) {
	return isAnimationControls(props.animate) || variantProps.some((name) => isVariantLabel(props[name]));
}
function isVariantNode(props) {
	return Boolean(isControllingVariants(props) || props.variants);
}
function getCurrentTreeVariants(props, context) {
	if (isControllingVariants(props)) {
		const { initial, animate } = props;
		return {
			initial: initial === false || isVariantLabel(initial) ? initial : void 0,
			animate: isVariantLabel(animate) ? animate : void 0
		};
	}
	return props.inherit !== false ? context : {};
}
function useCreateMotionContext(props) {
	const { initial, animate } = getCurrentTreeVariants(props, (0, import_react.useContext)(MotionContext));
	return (0, import_react.useMemo)(() => ({
		initial,
		animate
	}), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)]);
}
function variantLabelsAsDependency(prop) {
	return Array.isArray(prop) ? prop.join(" ") : prop;
}
var featureProps = {
	animation: [
		"animate",
		"variants",
		"whileHover",
		"whileTap",
		"exit",
		"whileInView",
		"whileFocus",
		"whileDrag"
	],
	exit: ["exit"],
	drag: ["drag", "dragControls"],
	focus: ["whileFocus"],
	hover: [
		"whileHover",
		"onHoverStart",
		"onHoverEnd"
	],
	tap: [
		"whileTap",
		"onTap",
		"onTapStart",
		"onTapCancel"
	],
	pan: [
		"onPan",
		"onPanStart",
		"onPanSessionStart",
		"onPanEnd"
	],
	inView: [
		"whileInView",
		"onViewportEnter",
		"onViewportLeave"
	],
	layout: ["layout", "layoutId"]
};
var featureDefinitions = {};
for (const key in featureProps) featureDefinitions[key] = { isEnabled: (props) => featureProps[key].some((name) => !!props[name]) };
function loadFeatures(features) {
	for (const key in features) featureDefinitions[key] = {
		...featureDefinitions[key],
		...features[key]
	};
}
var LayoutGroupContext = (0, import_react.createContext)({});
var SwitchLayoutGroupContext = (0, import_react.createContext)({});
var motionComponentSymbol = Symbol.for("motionComponentSymbol");
function createMotionComponent({ preloadedFeatures: preloadedFeatures$1, createVisualElement, useRender, useVisualState, Component }) {
	preloadedFeatures$1 && loadFeatures(preloadedFeatures$1);
	function MotionComponent(props, externalRef) {
		let MeasureLayout$1;
		const configAndProps = {
			...(0, import_react.useContext)(MotionConfigContext),
			...props,
			layoutId: useLayoutId(props)
		};
		const { isStatic } = configAndProps;
		const context = useCreateMotionContext(props);
		const visualState = useVisualState(props, isStatic);
		if (!isStatic && isBrowser) {
			context.visualElement = useVisualElement(Component, visualState, configAndProps, createVisualElement);
			const initialLayoutGroupConfig = (0, import_react.useContext)(SwitchLayoutGroupContext);
			const isStrict = (0, import_react.useContext)(LazyContext).strict;
			if (context.visualElement) MeasureLayout$1 = context.visualElement.loadFeatures(configAndProps, isStrict, preloadedFeatures$1, initialLayoutGroupConfig);
		}
		return import_react.createElement(MotionContext.Provider, { value: context }, MeasureLayout$1 && context.visualElement ? import_react.createElement(MeasureLayout$1, {
			visualElement: context.visualElement,
			...configAndProps
		}) : null, useRender(Component, props, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, context.visualElement));
	}
	const ForwardRefComponent = (0, import_react.forwardRef)(MotionComponent);
	ForwardRefComponent[motionComponentSymbol] = Component;
	return ForwardRefComponent;
}
function useLayoutId({ layoutId }) {
	const layoutGroupId = (0, import_react.useContext)(LayoutGroupContext).id;
	return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}
function createMotionProxy(createConfig) {
	function custom(Component, customMotionComponentConfig = {}) {
		return createMotionComponent(createConfig(Component, customMotionComponentConfig));
	}
	if (typeof Proxy === "undefined") return custom;
	const componentCache = /* @__PURE__ */ new Map();
	return new Proxy(custom, { get: (_target, key) => {
		if (!componentCache.has(key)) componentCache.set(key, custom(key));
		return componentCache.get(key);
	} });
}
var lowercaseSVGElements = [
	"animate",
	"circle",
	"defs",
	"desc",
	"ellipse",
	"g",
	"image",
	"line",
	"filter",
	"marker",
	"mask",
	"metadata",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"rect",
	"stop",
	"switch",
	"symbol",
	"svg",
	"text",
	"tspan",
	"use",
	"view"
];
function isSVGComponent(Component) {
	if (typeof Component !== "string" || Component.includes("-")) return false;
	else if (lowercaseSVGElements.indexOf(Component) > -1 || /[A-Z]/.test(Component)) return true;
	return false;
}
var scaleCorrectors = {};
function addScaleCorrector(correctors) {
	Object.assign(scaleCorrectors, correctors);
}
var transformPropOrder = [
	"transformPerspective",
	"x",
	"y",
	"z",
	"translateX",
	"translateY",
	"translateZ",
	"scale",
	"scaleX",
	"scaleY",
	"rotate",
	"rotateX",
	"rotateY",
	"rotateZ",
	"skew",
	"skewX",
	"skewY"
];
var transformProps = new Set(transformPropOrder);
function isForcedMotionValue(key, { layout: layout$1, layoutId }) {
	return transformProps.has(key) || key.startsWith("origin") || (layout$1 || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}
var isMotionValue = (value) => Boolean(value && value.getVelocity);
var translateAlias = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
};
var numTransforms = transformPropOrder.length;
function buildTransform(transform, { enableHardwareAcceleration = true, allowTransformNone = true }, transformIsDefault, transformTemplate) {
	let transformString = "";
	for (let i = 0; i < numTransforms; i++) {
		const key = transformPropOrder[i];
		if (transform[key] !== void 0) {
			const transformName = translateAlias[key] || key;
			transformString += `${transformName}(${transform[key]}) `;
		}
	}
	if (enableHardwareAcceleration && !transform.z) transformString += "translateZ(0)";
	transformString = transformString.trim();
	if (transformTemplate) transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
	else if (allowTransformNone && transformIsDefault) transformString = "none";
	return transformString;
}
var checkStringStartsWith = (token) => (key) => typeof key === "string" && key.startsWith(token);
var isCSSVariableName = checkStringStartsWith("--");
var isCSSVariableToken = checkStringStartsWith("var(--");
var cssVariableRegex = /var\s*\(\s*--[\w-]+(\s*,\s*(?:(?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)+)?\s*\)/g;
var getValueAsType = (value, type) => {
	return type && typeof value === "number" ? type.transform(value) : value;
};
var clamp = (min, max, v) => Math.min(Math.max(v, min), max);
var number = {
	test: (v) => typeof v === "number",
	parse: parseFloat,
	transform: (v) => v
};
var alpha = {
	...number,
	transform: (v) => clamp(0, 1, v)
};
var scale = {
	...number,
	default: 1
};
var sanitize = (v) => Math.round(v * 1e5) / 1e5;
var floatRegex = /(-)?([\d]*\.?[\d])+/g;
var colorRegex = /(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi;
var singleColorRegex = /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
function isString(v) {
	return typeof v === "string";
}
var createUnitType = (unit) => ({
	test: (v) => isString(v) && v.endsWith(unit) && v.split(" ").length === 1,
	parse: parseFloat,
	transform: (v) => `${v}${unit}`
});
var degrees = createUnitType("deg");
var percent = createUnitType("%");
var px = createUnitType("px");
var vh = createUnitType("vh");
var vw = createUnitType("vw");
var progressPercentage = {
	...percent,
	parse: (v) => percent.parse(v) / 100,
	transform: (v) => percent.transform(v * 100)
};
var int = {
	...number,
	transform: Math.round
};
var numberValueTypes = {
	borderWidth: px,
	borderTopWidth: px,
	borderRightWidth: px,
	borderBottomWidth: px,
	borderLeftWidth: px,
	borderRadius: px,
	radius: px,
	borderTopLeftRadius: px,
	borderTopRightRadius: px,
	borderBottomRightRadius: px,
	borderBottomLeftRadius: px,
	width: px,
	maxWidth: px,
	height: px,
	maxHeight: px,
	size: px,
	top: px,
	right: px,
	bottom: px,
	left: px,
	padding: px,
	paddingTop: px,
	paddingRight: px,
	paddingBottom: px,
	paddingLeft: px,
	margin: px,
	marginTop: px,
	marginRight: px,
	marginBottom: px,
	marginLeft: px,
	rotate: degrees,
	rotateX: degrees,
	rotateY: degrees,
	rotateZ: degrees,
	scale,
	scaleX: scale,
	scaleY: scale,
	scaleZ: scale,
	skew: degrees,
	skewX: degrees,
	skewY: degrees,
	distance: px,
	translateX: px,
	translateY: px,
	translateZ: px,
	x: px,
	y: px,
	z: px,
	perspective: px,
	transformPerspective: px,
	opacity: alpha,
	originX: progressPercentage,
	originY: progressPercentage,
	originZ: px,
	zIndex: int,
	fillOpacity: alpha,
	strokeOpacity: alpha,
	numOctaves: int
};
function buildHTMLStyles(state, latestValues, options, transformTemplate) {
	const { style, vars, transform, transformOrigin } = state;
	let hasTransform$1 = false;
	let hasTransformOrigin = false;
	let transformIsNone = true;
	for (const key in latestValues) {
		const value = latestValues[key];
		if (isCSSVariableName(key)) {
			vars[key] = value;
			continue;
		}
		const valueType = numberValueTypes[key];
		const valueAsType = getValueAsType(value, valueType);
		if (transformProps.has(key)) {
			hasTransform$1 = true;
			transform[key] = valueAsType;
			if (!transformIsNone) continue;
			if (value !== (valueType.default || 0)) transformIsNone = false;
		} else if (key.startsWith("origin")) {
			hasTransformOrigin = true;
			transformOrigin[key] = valueAsType;
		} else style[key] = valueAsType;
	}
	if (!latestValues.transform) {
		if (hasTransform$1 || transformTemplate) style.transform = buildTransform(state.transform, options, transformIsNone, transformTemplate);
		else if (style.transform) style.transform = "none";
	}
	if (hasTransformOrigin) {
		const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
		style.transformOrigin = `${originX} ${originY} ${originZ}`;
	}
}
var createHtmlRenderState = () => ({
	style: {},
	transform: {},
	transformOrigin: {},
	vars: {}
});
function copyRawValuesOnly(target, source, props) {
	for (const key in source) if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) target[key] = source[key];
}
function useInitialMotionValues({ transformTemplate }, visualState, isStatic) {
	return (0, import_react.useMemo)(() => {
		const state = createHtmlRenderState();
		buildHTMLStyles(state, visualState, { enableHardwareAcceleration: !isStatic }, transformTemplate);
		return Object.assign({}, state.vars, state.style);
	}, [visualState]);
}
function useStyle(props, visualState, isStatic) {
	const styleProp = props.style || {};
	const style = {};
	copyRawValuesOnly(style, styleProp, props);
	Object.assign(style, useInitialMotionValues(props, visualState, isStatic));
	return props.transformValues ? props.transformValues(style) : style;
}
function useHTMLProps(props, visualState, isStatic) {
	const htmlProps = {};
	const style = useStyle(props, visualState, isStatic);
	if (props.drag && props.dragListener !== false) {
		htmlProps.draggable = false;
		style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
		style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
	}
	if (props.tabIndex === void 0 && (props.onTap || props.onTapStart || props.whileTap)) htmlProps.tabIndex = 0;
	htmlProps.style = style;
	return htmlProps;
}
var validMotionProps = new Set([
	"animate",
	"exit",
	"variants",
	"initial",
	"style",
	"values",
	"variants",
	"transition",
	"transformTemplate",
	"transformValues",
	"custom",
	"inherit",
	"onLayoutAnimationStart",
	"onLayoutAnimationComplete",
	"onLayoutMeasure",
	"onBeforeLayoutMeasure",
	"onAnimationStart",
	"onAnimationComplete",
	"onUpdate",
	"onDragStart",
	"onDrag",
	"onDragEnd",
	"onMeasureDragConstraints",
	"onDirectionLock",
	"onDragTransitionEnd",
	"_dragX",
	"_dragY",
	"onHoverStart",
	"onHoverEnd",
	"onViewportEnter",
	"onViewportLeave",
	"ignoreStrict",
	"viewport"
]);
function isValidMotionProp(key) {
	return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || validMotionProps.has(key);
}
function memoize(fn) {
	var cache = {};
	return function(arg) {
		if (cache[arg] === void 0) cache[arg] = fn(arg);
		return cache[arg];
	};
}
var memoize_browser_esm_default;
var init_memoize_browser_esm = __esmMin((() => {
	memoize_browser_esm_default = memoize;
}));
var is_prop_valid_browser_esm_exports = /* @__PURE__ */ __export({ default: () => is_prop_valid_browser_esm_default });
var reactPropsRegex, index, is_prop_valid_browser_esm_default;
var init_is_prop_valid_browser_esm = __esmMin((() => {
	init_memoize_browser_esm();
	reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
	index = memoize_browser_esm_default(function(prop) {
		return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
	});
	is_prop_valid_browser_esm_default = index;
}));
var shouldForward = (key) => !isValidMotionProp(key);
function loadExternalIsValidProp(isValidProp) {
	if (!isValidProp) return;
	shouldForward = (key) => key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
}
try {
	loadExternalIsValidProp((init_is_prop_valid_browser_esm(), __toCommonJS(is_prop_valid_browser_esm_exports)).default);
} catch (_a) {}
function filterProps(props, isDom, forwardMotionProps) {
	const filteredProps = {};
	for (const key in props) {
		if (key === "values" && typeof props.values === "object") continue;
		if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) || props["draggable"] && key.startsWith("onDrag")) filteredProps[key] = props[key];
	}
	return filteredProps;
}
function calcOrigin$1(origin, offset, size) {
	return typeof origin === "string" ? origin : px.transform(offset + size * origin);
}
function calcSVGTransformOrigin(dimensions, originX, originY) {
	return `${calcOrigin$1(originX, dimensions.x, dimensions.width)} ${calcOrigin$1(originY, dimensions.y, dimensions.height)}`;
}
var dashKeys = {
	offset: "stroke-dashoffset",
	array: "stroke-dasharray"
};
var camelKeys = {
	offset: "strokeDashoffset",
	array: "strokeDasharray"
};
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
	attrs.pathLength = 1;
	const keys = useDashCase ? dashKeys : camelKeys;
	attrs[keys.offset] = px.transform(-offset);
	const pathLength = px.transform(length);
	const pathSpacing = px.transform(spacing);
	attrs[keys.array] = `${pathLength} ${pathSpacing}`;
}
function buildSVGAttrs(state, { attrX, attrY, attrScale, originX, originY, pathLength, pathSpacing = 1, pathOffset = 0, ...latest }, options, isSVGTag$1, transformTemplate) {
	buildHTMLStyles(state, latest, options, transformTemplate);
	if (isSVGTag$1) {
		if (state.style.viewBox) state.attrs.viewBox = state.style.viewBox;
		return;
	}
	state.attrs = state.style;
	state.style = {};
	const { attrs, style, dimensions } = state;
	if (attrs.transform) {
		if (dimensions) style.transform = attrs.transform;
		delete attrs.transform;
	}
	if (dimensions && (originX !== void 0 || originY !== void 0 || style.transform)) style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== void 0 ? originX : .5, originY !== void 0 ? originY : .5);
	if (attrX !== void 0) attrs.x = attrX;
	if (attrY !== void 0) attrs.y = attrY;
	if (attrScale !== void 0) attrs.scale = attrScale;
	if (pathLength !== void 0) buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
}
var createSvgRenderState = () => ({
	...createHtmlRenderState(),
	attrs: {}
});
var isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";
function useSVGProps(props, visualState, _isStatic, Component) {
	const visualProps = (0, import_react.useMemo)(() => {
		const state = createSvgRenderState();
		buildSVGAttrs(state, visualState, { enableHardwareAcceleration: false }, isSVGTag(Component), props.transformTemplate);
		return {
			...state.attrs,
			style: { ...state.style }
		};
	}, [visualState]);
	if (props.style) {
		const rawStyles = {};
		copyRawValuesOnly(rawStyles, props.style, props);
		visualProps.style = {
			...rawStyles,
			...visualProps.style
		};
	}
	return visualProps;
}
function createUseRender(forwardMotionProps = false) {
	const useRender = (Component, props, ref, { latestValues }, isStatic) => {
		const visualProps = (isSVGComponent(Component) ? useSVGProps : useHTMLProps)(props, latestValues, isStatic, Component);
		const elementProps = {
			...filterProps(props, typeof Component === "string", forwardMotionProps),
			...visualProps,
			ref
		};
		const { children } = props;
		const renderedChildren = (0, import_react.useMemo)(() => isMotionValue(children) ? children.get() : children, [children]);
		return (0, import_react.createElement)(Component, {
			...elementProps,
			children: renderedChildren
		});
	};
	return useRender;
}
var camelToDash = (str) => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
function renderHTML(element, { style, vars }, styleProp, projection) {
	Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
	for (const key in vars) element.style.setProperty(key, vars[key]);
}
var camelCaseAttributes = new Set([
	"baseFrequency",
	"diffuseConstant",
	"kernelMatrix",
	"kernelUnitLength",
	"keySplines",
	"keyTimes",
	"limitingConeAngle",
	"markerHeight",
	"markerWidth",
	"numOctaves",
	"targetX",
	"targetY",
	"surfaceScale",
	"specularConstant",
	"specularExponent",
	"stdDeviation",
	"tableValues",
	"viewBox",
	"gradientTransform",
	"pathLength",
	"startOffset",
	"textLength",
	"lengthAdjust"
]);
function renderSVG(element, renderState, _styleProp, projection) {
	renderHTML(element, renderState, void 0, projection);
	for (const key in renderState.attrs) element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
}
function scrapeMotionValuesFromProps$1(props, prevProps) {
	const { style } = props;
	const newValues = {};
	for (const key in style) if (isMotionValue(style[key]) || prevProps.style && isMotionValue(prevProps.style[key]) || isForcedMotionValue(key, props)) newValues[key] = style[key];
	return newValues;
}
function scrapeMotionValuesFromProps(props, prevProps) {
	const newValues = scrapeMotionValuesFromProps$1(props, prevProps);
	for (const key in props) if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
		const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
		newValues[targetKey] = props[key];
	}
	return newValues;
}
function resolveVariantFromProps(props, definition, custom, currentValues = {}, currentVelocity = {}) {
	if (typeof definition === "function") definition = definition(custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
	if (typeof definition === "string") definition = props.variants && props.variants[definition];
	if (typeof definition === "function") definition = definition(custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
	return definition;
}
function useConstant(init) {
	const ref = (0, import_react.useRef)(null);
	if (ref.current === null) ref.current = init();
	return ref.current;
}
var isKeyframesTarget = (v) => {
	return Array.isArray(v);
};
var isCustomValue = (v) => {
	return Boolean(v && typeof v === "object" && v.mix && v.toValue);
};
var resolveFinalValueInKeyframes = (v) => {
	return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
};
function resolveMotionValue(value) {
	const unwrappedValue = isMotionValue(value) ? value.get() : value;
	return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}
function makeState({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$2, createRenderState, onMount }, props, context, presenceContext) {
	const state = {
		latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps$2),
		renderState: createRenderState()
	};
	if (onMount) state.mount = (instance) => onMount(props, instance, state);
	return state;
}
var makeUseVisualState = (config) => (props, isStatic) => {
	const context = (0, import_react.useContext)(MotionContext);
	const presenceContext = (0, import_react.useContext)(PresenceContext);
	const make = () => makeState(config, props, context, presenceContext);
	return isStatic ? make() : useConstant(make);
};
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
	const values = {};
	const motionValues = scrapeMotionValues(props, {});
	for (const key in motionValues) values[key] = resolveMotionValue(motionValues[key]);
	let { initial, animate } = props;
	const isControllingVariants$1 = isControllingVariants(props);
	const isVariantNode$1 = isVariantNode(props);
	if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
		if (initial === void 0) initial = context.initial;
		if (animate === void 0) animate = context.animate;
	}
	let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
	isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
	const variantToSet = isInitialAnimationBlocked ? animate : initial;
	if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) (Array.isArray(variantToSet) ? variantToSet : [variantToSet]).forEach((definition) => {
		const resolved = resolveVariantFromProps(props, definition);
		if (!resolved) return;
		const { transitionEnd, transition, ...target } = resolved;
		for (const key in target) {
			let valueTarget = target[key];
			if (Array.isArray(valueTarget)) {
				const index$1 = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
				valueTarget = valueTarget[index$1];
			}
			if (valueTarget !== null) values[key] = valueTarget;
		}
		for (const key in transitionEnd) values[key] = transitionEnd[key];
	});
	return values;
}
var svgMotionConfig = { useVisualState: makeUseVisualState({
	scrapeMotionValuesFromProps,
	createRenderState: createSvgRenderState,
	onMount: (props, instance, { renderState, latestValues }) => {
		try {
			renderState.dimensions = typeof instance.getBBox === "function" ? instance.getBBox() : instance.getBoundingClientRect();
		} catch (e) {
			renderState.dimensions = {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
		}
		buildSVGAttrs(renderState, latestValues, { enableHardwareAcceleration: false }, isSVGTag(instance.tagName), props.transformTemplate);
		renderSVG(instance, renderState);
	}
}) };
var htmlMotionConfig = { useVisualState: makeUseVisualState({
	scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
	createRenderState: createHtmlRenderState
}) };
function createDomMotionConfig(Component, { forwardMotionProps = false }, preloadedFeatures$1, createVisualElement) {
	return {
		...isSVGComponent(Component) ? svgMotionConfig : htmlMotionConfig,
		preloadedFeatures: preloadedFeatures$1,
		useRender: createUseRender(forwardMotionProps),
		createVisualElement,
		Component
	};
}
function addDomEvent(target, eventName, handler, options = { passive: true }) {
	target.addEventListener(eventName, handler, options);
	return () => target.removeEventListener(eventName, handler);
}
var isPrimaryPointer = (event) => {
	if (event.pointerType === "mouse") return typeof event.button !== "number" || event.button <= 0;
	else return event.isPrimary !== false;
};
function extractEventInfo(event, pointType = "page") {
	return { point: {
		x: event[pointType + "X"],
		y: event[pointType + "Y"]
	} };
}
var addPointerInfo = (handler) => {
	return (event) => isPrimaryPointer(event) && handler(event, extractEventInfo(event));
};
function addPointerEvent(target, eventName, handler, options) {
	return addDomEvent(target, eventName, addPointerInfo(handler), options);
}
var combineFunctions = (a, b) => (v) => b(a(v));
var pipe = (...transformers) => transformers.reduce(combineFunctions);
function createLock(name) {
	let lock = null;
	return () => {
		const openLock = () => {
			lock = null;
		};
		if (lock === null) {
			lock = name;
			return openLock;
		}
		return false;
	};
}
var globalHorizontalLock = createLock("dragHorizontal");
var globalVerticalLock = createLock("dragVertical");
function getGlobalLock(drag$1) {
	let lock = false;
	if (drag$1 === "y") lock = globalVerticalLock();
	else if (drag$1 === "x") lock = globalHorizontalLock();
	else {
		const openHorizontal = globalHorizontalLock();
		const openVertical = globalVerticalLock();
		if (openHorizontal && openVertical) lock = () => {
			openHorizontal();
			openVertical();
		};
		else {
			if (openHorizontal) openHorizontal();
			if (openVertical) openVertical();
		}
	}
	return lock;
}
function isDragActive() {
	const openGestureLock = getGlobalLock(true);
	if (!openGestureLock) return true;
	openGestureLock();
	return false;
}
var Feature = class {
	constructor(node) {
		this.isMounted = false;
		this.node = node;
	}
	update() {}
};
var noop = (any) => any;
function createRenderStep(runNextFrame) {
	let toRun = [];
	let toRunNextFrame = [];
	let numToRun = 0;
	let isProcessing = false;
	let flushNextFrame = false;
	const toKeepAlive = /* @__PURE__ */ new WeakSet();
	const step = {
		schedule: (callback, keepAlive = false, immediate = false) => {
			const addToCurrentFrame = immediate && isProcessing;
			const buffer = addToCurrentFrame ? toRun : toRunNextFrame;
			if (keepAlive) toKeepAlive.add(callback);
			if (buffer.indexOf(callback) === -1) {
				buffer.push(callback);
				if (addToCurrentFrame && isProcessing) numToRun = toRun.length;
			}
			return callback;
		},
		cancel: (callback) => {
			const index$1 = toRunNextFrame.indexOf(callback);
			if (index$1 !== -1) toRunNextFrame.splice(index$1, 1);
			toKeepAlive.delete(callback);
		},
		process: (frameData$1) => {
			if (isProcessing) {
				flushNextFrame = true;
				return;
			}
			isProcessing = true;
			[toRun, toRunNextFrame] = [toRunNextFrame, toRun];
			toRunNextFrame.length = 0;
			numToRun = toRun.length;
			if (numToRun) for (let i = 0; i < numToRun; i++) {
				const callback = toRun[i];
				callback(frameData$1);
				if (toKeepAlive.has(callback)) {
					step.schedule(callback);
					runNextFrame();
				}
			}
			isProcessing = false;
			if (flushNextFrame) {
				flushNextFrame = false;
				step.process(frameData$1);
			}
		}
	};
	return step;
}
var stepsOrder = [
	"prepare",
	"read",
	"update",
	"preRender",
	"render",
	"postRender"
];
var maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
	let runNextFrame = false;
	let useDefaultElapsed = true;
	const state = {
		delta: 0,
		timestamp: 0,
		isProcessing: false
	};
	const steps$1 = stepsOrder.reduce((acc, key) => {
		acc[key] = createRenderStep(() => runNextFrame = true);
		return acc;
	}, {});
	const processStep = (stepId) => steps$1[stepId].process(state);
	const processBatch = (timestamp) => {
		runNextFrame = false;
		state.delta = useDefaultElapsed ? 1e3 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
		state.timestamp = timestamp;
		state.isProcessing = true;
		stepsOrder.forEach(processStep);
		state.isProcessing = false;
		if (runNextFrame && allowKeepAlive) {
			useDefaultElapsed = false;
			scheduleNextBatch(processBatch);
		}
	};
	const wake = () => {
		runNextFrame = true;
		useDefaultElapsed = true;
		if (!state.isProcessing) scheduleNextBatch(processBatch);
	};
	const schedule = stepsOrder.reduce((acc, key) => {
		const step = steps$1[key];
		acc[key] = (process, keepAlive = false, immediate = false) => {
			if (!runNextFrame) wake();
			return step.schedule(process, keepAlive, immediate);
		};
		return acc;
	}, {});
	const cancel = (process) => stepsOrder.forEach((key) => steps$1[key].cancel(process));
	return {
		schedule,
		cancel,
		state,
		steps: steps$1
	};
}
var { schedule: frame, cancel: cancelFrame, state: frameData, steps } = createRenderBatcher(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop, true);
function addHoverEvent(node, isActive) {
	const eventName = "pointer" + (isActive ? "enter" : "leave");
	const callbackName = "onHover" + (isActive ? "Start" : "End");
	const handleEvent = (event, info) => {
		if (event.type === "touch" || isDragActive()) return;
		const props = node.getProps();
		if (node.animationState && props.whileHover) node.animationState.setActive("whileHover", isActive);
		if (props[callbackName]) frame.update(() => props[callbackName](event, info));
	};
	return addPointerEvent(node.current, eventName, handleEvent, { passive: !node.getProps()[callbackName] });
}
var HoverGesture = class extends Feature {
	mount() {
		this.unmount = pipe(addHoverEvent(this.node, true), addHoverEvent(this.node, false));
	}
	unmount() {}
};
var FocusGesture = class extends Feature {
	constructor() {
		super(...arguments);
		this.isActive = false;
	}
	onFocus() {
		let isFocusVisible = false;
		try {
			isFocusVisible = this.node.current.matches(":focus-visible");
		} catch (e) {
			isFocusVisible = true;
		}
		if (!isFocusVisible || !this.node.animationState) return;
		this.node.animationState.setActive("whileFocus", true);
		this.isActive = true;
	}
	onBlur() {
		if (!this.isActive || !this.node.animationState) return;
		this.node.animationState.setActive("whileFocus", false);
		this.isActive = false;
	}
	mount() {
		this.unmount = pipe(addDomEvent(this.node.current, "focus", () => this.onFocus()), addDomEvent(this.node.current, "blur", () => this.onBlur()));
	}
	unmount() {}
};
var isNodeOrChild = (parent, child) => {
	if (!child) return false;
	else if (parent === child) return true;
	else return isNodeOrChild(parent, child.parentElement);
};
function fireSyntheticPointerEvent(name, handler) {
	if (!handler) return;
	const syntheticPointerEvent = new PointerEvent("pointer" + name);
	handler(syntheticPointerEvent, extractEventInfo(syntheticPointerEvent));
}
var PressGesture = class extends Feature {
	constructor() {
		super(...arguments);
		this.removeStartListeners = noop;
		this.removeEndListeners = noop;
		this.removeAccessibleListeners = noop;
		this.startPointerPress = (startEvent, startInfo) => {
			this.removeEndListeners();
			if (this.isPressing) return;
			const props = this.node.getProps();
			const endPointerPress = (endEvent, endInfo) => {
				if (!this.checkPressEnd()) return;
				const { onTap, onTapCancel } = this.node.getProps();
				frame.update(() => {
					!isNodeOrChild(this.node.current, endEvent.target) ? onTapCancel && onTapCancel(endEvent, endInfo) : onTap && onTap(endEvent, endInfo);
				});
			};
			this.removeEndListeners = pipe(addPointerEvent(window, "pointerup", endPointerPress, { passive: !(props.onTap || props["onPointerUp"]) }), addPointerEvent(window, "pointercancel", (cancelEvent, cancelInfo) => this.cancelPress(cancelEvent, cancelInfo), { passive: !(props.onTapCancel || props["onPointerCancel"]) }));
			this.startPress(startEvent, startInfo);
		};
		this.startAccessiblePress = () => {
			const handleKeydown = (keydownEvent) => {
				if (keydownEvent.key !== "Enter" || this.isPressing) return;
				const handleKeyup = (keyupEvent) => {
					if (keyupEvent.key !== "Enter" || !this.checkPressEnd()) return;
					fireSyntheticPointerEvent("up", (event, info) => {
						const { onTap } = this.node.getProps();
						if (onTap) frame.update(() => onTap(event, info));
					});
				};
				this.removeEndListeners();
				this.removeEndListeners = addDomEvent(this.node.current, "keyup", handleKeyup);
				fireSyntheticPointerEvent("down", (event, info) => {
					this.startPress(event, info);
				});
			};
			const removeKeydownListener = addDomEvent(this.node.current, "keydown", handleKeydown);
			const handleBlur = () => {
				if (!this.isPressing) return;
				fireSyntheticPointerEvent("cancel", (cancelEvent, cancelInfo) => this.cancelPress(cancelEvent, cancelInfo));
			};
			this.removeAccessibleListeners = pipe(removeKeydownListener, addDomEvent(this.node.current, "blur", handleBlur));
		};
	}
	startPress(event, info) {
		this.isPressing = true;
		const { onTapStart, whileTap } = this.node.getProps();
		if (whileTap && this.node.animationState) this.node.animationState.setActive("whileTap", true);
		if (onTapStart) frame.update(() => onTapStart(event, info));
	}
	checkPressEnd() {
		this.removeEndListeners();
		this.isPressing = false;
		if (this.node.getProps().whileTap && this.node.animationState) this.node.animationState.setActive("whileTap", false);
		return !isDragActive();
	}
	cancelPress(event, info) {
		if (!this.checkPressEnd()) return;
		const { onTapCancel } = this.node.getProps();
		if (onTapCancel) frame.update(() => onTapCancel(event, info));
	}
	mount() {
		const props = this.node.getProps();
		this.removeStartListeners = pipe(addPointerEvent(this.node.current, "pointerdown", this.startPointerPress, { passive: !(props.onTapStart || props["onPointerStart"]) }), addDomEvent(this.node.current, "focus", this.startAccessiblePress));
	}
	unmount() {
		this.removeStartListeners();
		this.removeEndListeners();
		this.removeAccessibleListeners();
	}
};
var observerCallbacks = /* @__PURE__ */ new WeakMap();
var observers = /* @__PURE__ */ new WeakMap();
var fireObserverCallback = (entry) => {
	const callback = observerCallbacks.get(entry.target);
	callback && callback(entry);
};
var fireAllObserverCallbacks = (entries) => {
	entries.forEach(fireObserverCallback);
};
function initIntersectionObserver({ root, ...options }) {
	const lookupRoot = root || document;
	if (!observers.has(lookupRoot)) observers.set(lookupRoot, {});
	const rootObservers = observers.get(lookupRoot);
	const key = JSON.stringify(options);
	if (!rootObservers[key]) rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, {
		root,
		...options
	});
	return rootObservers[key];
}
function observeIntersection(element, options, callback) {
	const rootInteresectionObserver = initIntersectionObserver(options);
	observerCallbacks.set(element, callback);
	rootInteresectionObserver.observe(element);
	return () => {
		observerCallbacks.delete(element);
		rootInteresectionObserver.unobserve(element);
	};
}
var thresholdNames = {
	some: 0,
	all: 1
};
var InViewFeature = class extends Feature {
	constructor() {
		super(...arguments);
		this.hasEnteredView = false;
		this.isInView = false;
	}
	startObserver() {
		this.unmount();
		const { viewport = {} } = this.node.getProps();
		const { root, margin: rootMargin, amount = "some", once } = viewport;
		const options = {
			root: root ? root.current : void 0,
			rootMargin,
			threshold: typeof amount === "number" ? amount : thresholdNames[amount]
		};
		const onIntersectionUpdate = (entry) => {
			const { isIntersecting } = entry;
			if (this.isInView === isIntersecting) return;
			this.isInView = isIntersecting;
			if (once && !isIntersecting && this.hasEnteredView) return;
			else if (isIntersecting) this.hasEnteredView = true;
			if (this.node.animationState) this.node.animationState.setActive("whileInView", isIntersecting);
			const { onViewportEnter, onViewportLeave } = this.node.getProps();
			const callback = isIntersecting ? onViewportEnter : onViewportLeave;
			callback && callback(entry);
		};
		return observeIntersection(this.node.current, options, onIntersectionUpdate);
	}
	mount() {
		this.startObserver();
	}
	update() {
		if (typeof IntersectionObserver === "undefined") return;
		const { props, prevProps } = this.node;
		if ([
			"amount",
			"margin",
			"root"
		].some(hasViewportOptionChanged(props, prevProps))) this.startObserver();
	}
	unmount() {}
};
function hasViewportOptionChanged({ viewport = {} }, { viewport: prevViewport = {} } = {}) {
	return (name) => viewport[name] !== prevViewport[name];
}
var gestureAnimations = {
	inView: { Feature: InViewFeature },
	tap: { Feature: PressGesture },
	focus: { Feature: FocusGesture },
	hover: { Feature: HoverGesture }
};
function shallowCompare(next, prev) {
	if (!Array.isArray(prev)) return false;
	const prevLength = prev.length;
	if (prevLength !== next.length) return false;
	for (let i = 0; i < prevLength; i++) if (prev[i] !== next[i]) return false;
	return true;
}
function getCurrent(visualElement) {
	const current = {};
	visualElement.values.forEach((value, key) => current[key] = value.get());
	return current;
}
function getVelocity$1(visualElement) {
	const velocity = {};
	visualElement.values.forEach((value, key) => velocity[key] = value.getVelocity());
	return velocity;
}
function resolveVariant(visualElement, definition, custom) {
	const props = visualElement.getProps();
	return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, getCurrent(visualElement), getVelocity$1(visualElement));
}
var optimizedAppearDataAttribute = "data-" + camelToDash("framerAppearId");
var warning = noop;
var invariant = noop;
warning = (check, message) => {
	if (!check && typeof console !== "undefined") console.warn(message);
};
invariant = (check, message) => {
	if (!check) throw new Error(message);
};
var secondsToMilliseconds = (seconds) => seconds * 1e3;
var millisecondsToSeconds = (milliseconds) => milliseconds / 1e3;
var instantAnimationState = { current: false };
var isBezierDefinition = (easing) => Array.isArray(easing) && typeof easing[0] === "number";
function isWaapiSupportedEasing(easing) {
	return Boolean(!easing || typeof easing === "string" && supportedWaapiEasing[easing] || isBezierDefinition(easing) || Array.isArray(easing) && easing.every(isWaapiSupportedEasing));
}
var cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;
var supportedWaapiEasing = {
	linear: "linear",
	ease: "ease",
	easeIn: "ease-in",
	easeOut: "ease-out",
	easeInOut: "ease-in-out",
	circIn: cubicBezierAsString([
		0,
		.65,
		.55,
		1
	]),
	circOut: cubicBezierAsString([
		.55,
		0,
		1,
		.45
	]),
	backIn: cubicBezierAsString([
		.31,
		.01,
		.66,
		-.59
	]),
	backOut: cubicBezierAsString([
		.33,
		1.53,
		.69,
		.99
	])
};
function mapEasingToNativeEasing(easing) {
	if (!easing) return void 0;
	return isBezierDefinition(easing) ? cubicBezierAsString(easing) : Array.isArray(easing) ? easing.map(mapEasingToNativeEasing) : supportedWaapiEasing[easing];
}
function animateStyle(element, valueName, keyframes$1, { delay: delay$1 = 0, duration, repeat = 0, repeatType = "loop", ease: ease$1, times } = {}) {
	const keyframeOptions = { [valueName]: keyframes$1 };
	if (times) keyframeOptions.offset = times;
	const easing = mapEasingToNativeEasing(ease$1);
	if (Array.isArray(easing)) keyframeOptions.easing = easing;
	return element.animate(keyframeOptions, {
		delay: delay$1,
		duration,
		easing: !Array.isArray(easing) ? easing : "linear",
		fill: "both",
		iterations: repeat + 1,
		direction: repeatType === "reverse" ? "alternate" : "normal"
	});
}
function getFinalKeyframe(keyframes$1, { repeat, repeatType = "loop" }) {
	return keyframes$1[repeat && repeatType !== "loop" && repeat % 2 === 1 ? 0 : keyframes$1.length - 1];
}
var calcBezier = (t, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + 3 * a1) * t;
var subdivisionPrecision = 1e-7;
var subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
	let currentX;
	let currentT;
	let i = 0;
	do {
		currentT = lowerBound + (upperBound - lowerBound) / 2;
		currentX = calcBezier(currentT, mX1, mX2) - x;
		if (currentX > 0) upperBound = currentT;
		else lowerBound = currentT;
	} while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
	return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
	if (mX1 === mY1 && mX2 === mY2) return noop;
	const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
	return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}
var easeIn = cubicBezier(.42, 0, 1, 1);
var easeOut = cubicBezier(0, 0, .58, 1);
var easeInOut = cubicBezier(.42, 0, .58, 1);
var isEasingArray = (ease$1) => {
	return Array.isArray(ease$1) && typeof ease$1[0] !== "number";
};
var mirrorEasing = (easing) => (p) => p <= .5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
var reverseEasing = (easing) => (p) => 1 - easing(1 - p);
var circIn = (p) => 1 - Math.sin(Math.acos(p));
var circOut = reverseEasing(circIn);
var circInOut = mirrorEasing(circOut);
var backOut = cubicBezier(.33, 1.53, .69, .99);
var backIn = reverseEasing(backOut);
var backInOut = mirrorEasing(backIn);
var anticipate = (p) => (p *= 2) < 1 ? .5 * backIn(p) : .5 * (2 - Math.pow(2, -10 * (p - 1)));
var easingLookup = {
	linear: noop,
	easeIn,
	easeInOut,
	easeOut,
	circIn,
	circInOut,
	circOut,
	backIn,
	backInOut,
	backOut,
	anticipate
};
var easingDefinitionToFunction = (definition) => {
	if (Array.isArray(definition)) {
		invariant(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`);
		const [x1, y1, x2, y2] = definition;
		return cubicBezier(x1, y1, x2, y2);
	} else if (typeof definition === "string") {
		invariant(easingLookup[definition] !== void 0, `Invalid easing type '${definition}'`);
		return easingLookup[definition];
	}
	return definition;
};
var isColorString = (type, testProp) => (v) => {
	return Boolean(isString(v) && singleColorRegex.test(v) && v.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v, testProp));
};
var splitColor = (aName, bName, cName) => (v) => {
	if (!isString(v)) return v;
	const [a, b, c, alpha$1] = v.match(floatRegex);
	return {
		[aName]: parseFloat(a),
		[bName]: parseFloat(b),
		[cName]: parseFloat(c),
		alpha: alpha$1 !== void 0 ? parseFloat(alpha$1) : 1
	};
};
var clampRgbUnit = (v) => clamp(0, 255, v);
var rgbUnit = {
	...number,
	transform: (v) => Math.round(clampRgbUnit(v))
};
var rgba = {
	test: isColorString("rgb", "red"),
	parse: splitColor("red", "green", "blue"),
	transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};
function parseHex(v) {
	let r = "";
	let g = "";
	let b = "";
	let a = "";
	if (v.length > 5) {
		r = v.substring(1, 3);
		g = v.substring(3, 5);
		b = v.substring(5, 7);
		a = v.substring(7, 9);
	} else {
		r = v.substring(1, 2);
		g = v.substring(2, 3);
		b = v.substring(3, 4);
		a = v.substring(4, 5);
		r += r;
		g += g;
		b += b;
		a += a;
	}
	return {
		red: parseInt(r, 16),
		green: parseInt(g, 16),
		blue: parseInt(b, 16),
		alpha: a ? parseInt(a, 16) / 255 : 1
	};
}
var hex = {
	test: isColorString("#"),
	parse: parseHex,
	transform: rgba.transform
};
var hsla = {
	test: isColorString("hsl", "hue"),
	parse: splitColor("hue", "saturation", "lightness"),
	transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
		return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
	}
};
var color = {
	test: (v) => rgba.test(v) || hex.test(v) || hsla.test(v),
	parse: (v) => {
		if (rgba.test(v)) return rgba.parse(v);
		else if (hsla.test(v)) return hsla.parse(v);
		else return hex.parse(v);
	},
	transform: (v) => {
		return isString(v) ? v : v.hasOwnProperty("red") ? rgba.transform(v) : hsla.transform(v);
	}
};
var mix = (from, to, progress$1) => -progress$1 * from + progress$1 * to + from;
function hueToRgb(p, q, t) {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1 / 6) return p + (q - p) * 6 * t;
	if (t < 1 / 2) return q;
	if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha: alpha$1 }) {
	hue /= 360;
	saturation /= 100;
	lightness /= 100;
	let red = 0;
	let green = 0;
	let blue = 0;
	if (!saturation) red = green = blue = lightness;
	else {
		const q = lightness < .5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
		const p = 2 * lightness - q;
		red = hueToRgb(p, q, hue + 1 / 3);
		green = hueToRgb(p, q, hue);
		blue = hueToRgb(p, q, hue - 1 / 3);
	}
	return {
		red: Math.round(red * 255),
		green: Math.round(green * 255),
		blue: Math.round(blue * 255),
		alpha: alpha$1
	};
}
var mixLinearColor = (from, to, v) => {
	const fromExpo = from * from;
	return Math.sqrt(Math.max(0, v * (to * to - fromExpo) + fromExpo));
};
var colorTypes = [
	hex,
	rgba,
	hsla
];
var getColorType = (v) => colorTypes.find((type) => type.test(v));
function asRGBA(color$1) {
	const type = getColorType(color$1);
	invariant(Boolean(type), `'${color$1}' is not an animatable color. Use the equivalent color code instead.`);
	let model = type.parse(color$1);
	if (type === hsla) model = hslaToRgba(model);
	return model;
}
var mixColor = (from, to) => {
	const fromRGBA = asRGBA(from);
	const toRGBA = asRGBA(to);
	const blended = { ...fromRGBA };
	return (v) => {
		blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v);
		blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v);
		blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v);
		blended.alpha = mix(fromRGBA.alpha, toRGBA.alpha, v);
		return rgba.transform(blended);
	};
};
function test(v) {
	var _a, _b;
	return isNaN(v) && isString(v) && (((_a = v.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) || 0) + (((_b = v.match(colorRegex)) === null || _b === void 0 ? void 0 : _b.length) || 0) > 0;
}
var cssVarTokeniser = {
	regex: cssVariableRegex,
	countKey: "Vars",
	token: "${v}",
	parse: noop
};
var colorTokeniser = {
	regex: colorRegex,
	countKey: "Colors",
	token: "${c}",
	parse: color.parse
};
var numberTokeniser = {
	regex: floatRegex,
	countKey: "Numbers",
	token: "${n}",
	parse: number.parse
};
function tokenise(info, { regex, countKey, token, parse }) {
	const matches = info.tokenised.match(regex);
	if (!matches) return;
	info["num" + countKey] = matches.length;
	info.tokenised = info.tokenised.replace(regex, token);
	info.values.push(...matches.map(parse));
}
function analyseComplexValue(value) {
	const originalValue = value.toString();
	const info = {
		value: originalValue,
		tokenised: originalValue,
		values: [],
		numVars: 0,
		numColors: 0,
		numNumbers: 0
	};
	if (info.value.includes("var(--")) tokenise(info, cssVarTokeniser);
	tokenise(info, colorTokeniser);
	tokenise(info, numberTokeniser);
	return info;
}
function parseComplexValue(v) {
	return analyseComplexValue(v).values;
}
function createTransformer(source) {
	const { values, numColors, numVars, tokenised } = analyseComplexValue(source);
	const numValues = values.length;
	return (v) => {
		let output = tokenised;
		for (let i = 0; i < numValues; i++) if (i < numVars) output = output.replace(cssVarTokeniser.token, v[i]);
		else if (i < numVars + numColors) output = output.replace(colorTokeniser.token, color.transform(v[i]));
		else output = output.replace(numberTokeniser.token, sanitize(v[i]));
		return output;
	};
}
var convertNumbersToZero = (v) => typeof v === "number" ? 0 : v;
function getAnimatableNone$1(v) {
	const parsed = parseComplexValue(v);
	return createTransformer(v)(parsed.map(convertNumbersToZero));
}
var complex = {
	test,
	parse: parseComplexValue,
	createTransformer,
	getAnimatableNone: getAnimatableNone$1
};
var mixImmediate = (origin, target) => (p) => `${p > 0 ? target : origin}`;
function getMixer(origin, target) {
	if (typeof origin === "number") return (v) => mix(origin, target, v);
	else if (color.test(origin)) return mixColor(origin, target);
	else return origin.startsWith("var(") ? mixImmediate(origin, target) : mixComplex(origin, target);
}
var mixArray = (from, to) => {
	const output = [...from];
	const numValues = output.length;
	const blendValue = from.map((fromThis, i) => getMixer(fromThis, to[i]));
	return (v) => {
		for (let i = 0; i < numValues; i++) output[i] = blendValue[i](v);
		return output;
	};
};
var mixObject = (origin, target) => {
	const output = {
		...origin,
		...target
	};
	const blendValue = {};
	for (const key in output) if (origin[key] !== void 0 && target[key] !== void 0) blendValue[key] = getMixer(origin[key], target[key]);
	return (v) => {
		for (const key in blendValue) output[key] = blendValue[key](v);
		return output;
	};
};
var mixComplex = (origin, target) => {
	const template = complex.createTransformer(target);
	const originStats = analyseComplexValue(origin);
	const targetStats = analyseComplexValue(target);
	if (originStats.numVars === targetStats.numVars && originStats.numColors === targetStats.numColors && originStats.numNumbers >= targetStats.numNumbers) return pipe(mixArray(originStats.values, targetStats.values), template);
	else {
		warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
		return mixImmediate(origin, target);
	}
};
var progress = (from, to, value) => {
	const toFromDifference = to - from;
	return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};
var mixNumber = (from, to) => (p) => mix(from, to, p);
function detectMixerFactory(v) {
	if (typeof v === "number") return mixNumber;
	else if (typeof v === "string") return color.test(v) ? mixColor : mixComplex;
	else if (Array.isArray(v)) return mixArray;
	else if (typeof v === "object") return mixObject;
	return mixNumber;
}
function createMixers(output, ease$1, customMixer) {
	const mixers = [];
	const mixerFactory = customMixer || detectMixerFactory(output[0]);
	const numMixers = output.length - 1;
	for (let i = 0; i < numMixers; i++) {
		let mixer = mixerFactory(output[i], output[i + 1]);
		if (ease$1) mixer = pipe(Array.isArray(ease$1) ? ease$1[i] || noop : ease$1, mixer);
		mixers.push(mixer);
	}
	return mixers;
}
function interpolate(input, output, { clamp: isClamp = true, ease: ease$1, mixer } = {}) {
	const inputLength = input.length;
	invariant(inputLength === output.length, "Both input and output ranges must be the same length");
	if (inputLength === 1) return () => output[0];
	if (input[0] > input[inputLength - 1]) {
		input = [...input].reverse();
		output = [...output].reverse();
	}
	const mixers = createMixers(output, ease$1, mixer);
	const numMixers = mixers.length;
	const interpolator = (v) => {
		let i = 0;
		if (numMixers > 1) {
			for (; i < input.length - 2; i++) if (v < input[i + 1]) break;
		}
		const progressInRange = progress(input[i], input[i + 1], v);
		return mixers[i](progressInRange);
	};
	return isClamp ? (v) => interpolator(clamp(input[0], input[inputLength - 1], v)) : interpolator;
}
function fillOffset(offset, remaining) {
	const min = offset[offset.length - 1];
	for (let i = 1; i <= remaining; i++) {
		const offsetProgress = progress(0, remaining, i);
		offset.push(mix(min, 1, offsetProgress));
	}
}
function defaultOffset(arr) {
	const offset = [0];
	fillOffset(offset, arr.length - 1);
	return offset;
}
function convertOffsetToTimes(offset, duration) {
	return offset.map((o) => o * duration);
}
function defaultEasing(values, easing) {
	return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function keyframes({ duration = 300, keyframes: keyframeValues, times, ease: ease$1 = "easeInOut" }) {
	const easingFunctions = isEasingArray(ease$1) ? ease$1.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease$1);
	const state = {
		done: false,
		value: keyframeValues[0]
	};
	const mapTimeToKeyframe = interpolate(convertOffsetToTimes(times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues), duration), keyframeValues, { ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions) });
	return {
		calculatedDuration: duration,
		next: (t) => {
			state.value = mapTimeToKeyframe(t);
			state.done = t >= duration;
			return state;
		}
	};
}
function velocityPerSecond(velocity, frameDuration) {
	return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}
var velocitySampleDuration = 5;
function calcGeneratorVelocity(resolveValue, t, current) {
	const prevT = Math.max(t - velocitySampleDuration, 0);
	return velocityPerSecond(current - resolveValue(prevT), t - prevT);
}
var safeMin = .001;
var minDuration = .01;
var minDamping = .05;
function findSpring({ duration = 800, bounce = .25, velocity = 0, mass = 1 }) {
	let envelope;
	let derivative;
	warning(duration <= secondsToMilliseconds(10), "Spring duration must be 10 seconds or less");
	let dampingRatio = 1 - bounce;
	dampingRatio = clamp(minDamping, 1, dampingRatio);
	duration = clamp(minDuration, 10, millisecondsToSeconds(duration));
	if (dampingRatio < 1) {
		envelope = (undampedFreq$1) => {
			const exponentialDecay = undampedFreq$1 * dampingRatio;
			const delta = exponentialDecay * duration;
			const a = exponentialDecay - velocity;
			const b = calcAngularFreq(undampedFreq$1, dampingRatio);
			const c = Math.exp(-delta);
			return safeMin - a / b * c;
		};
		derivative = (undampedFreq$1) => {
			const delta = undampedFreq$1 * dampingRatio * duration;
			const d = delta * velocity + velocity;
			const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq$1, 2) * duration;
			const f = Math.exp(-delta);
			const g = calcAngularFreq(Math.pow(undampedFreq$1, 2), dampingRatio);
			return (-envelope(undampedFreq$1) + safeMin > 0 ? -1 : 1) * ((d - e) * f) / g;
		};
	} else {
		envelope = (undampedFreq$1) => {
			const a = Math.exp(-undampedFreq$1 * duration);
			const b = (undampedFreq$1 - velocity) * duration + 1;
			return -safeMin + a * b;
		};
		derivative = (undampedFreq$1) => {
			return Math.exp(-undampedFreq$1 * duration) * ((velocity - undampedFreq$1) * (duration * duration));
		};
	}
	const initialGuess = 5 / duration;
	const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
	duration = secondsToMilliseconds(duration);
	if (isNaN(undampedFreq)) return {
		stiffness: 100,
		damping: 10,
		duration
	};
	else {
		const stiffness = Math.pow(undampedFreq, 2) * mass;
		return {
			stiffness,
			damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
			duration
		};
	}
}
var rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
	let result = initialGuess;
	for (let i = 1; i < rootIterations; i++) result = result - envelope(result) / derivative(result);
	return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
	return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
var durationKeys = ["duration", "bounce"];
var physicsKeys = [
	"stiffness",
	"damping",
	"mass"
];
function isSpringType(options, keys) {
	return keys.some((key) => options[key] !== void 0);
}
function getSpringOptions(options) {
	let springOptions = {
		velocity: 0,
		stiffness: 100,
		damping: 10,
		mass: 1,
		isResolvedFromDuration: false,
		...options
	};
	if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
		const derived = findSpring(options);
		springOptions = {
			...springOptions,
			...derived,
			velocity: 0,
			mass: 1
		};
		springOptions.isResolvedFromDuration = true;
	}
	return springOptions;
}
function spring({ keyframes: keyframes$1, restDelta, restSpeed, ...options }) {
	const origin = keyframes$1[0];
	const target = keyframes$1[keyframes$1.length - 1];
	const state = {
		done: false,
		value: origin
	};
	const { stiffness, damping, mass, velocity, duration, isResolvedFromDuration } = getSpringOptions(options);
	const initialVelocity = velocity ? -millisecondsToSeconds(velocity) : 0;
	const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
	const initialDelta = target - origin;
	const undampedAngularFreq = millisecondsToSeconds(Math.sqrt(stiffness / mass));
	const isGranularScale = Math.abs(initialDelta) < 5;
	restSpeed || (restSpeed = isGranularScale ? .01 : 2);
	restDelta || (restDelta = isGranularScale ? .005 : .5);
	let resolveSpring;
	if (dampingRatio < 1) {
		const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
		resolveSpring = (t) => {
			return target - Math.exp(-dampingRatio * undampedAngularFreq * t) * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
		};
	} else if (dampingRatio === 1) resolveSpring = (t) => target - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
	else {
		const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
		resolveSpring = (t) => {
			const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
			const freqForT = Math.min(dampedAngularFreq * t, 300);
			return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
		};
	}
	return {
		calculatedDuration: isResolvedFromDuration ? duration || null : null,
		next: (t) => {
			const current = resolveSpring(t);
			if (!isResolvedFromDuration) {
				let currentVelocity = initialVelocity;
				if (t !== 0) if (dampingRatio < 1) currentVelocity = calcGeneratorVelocity(resolveSpring, t, current);
				else currentVelocity = 0;
				const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
				const isBelowDisplacementThreshold = Math.abs(target - current) <= restDelta;
				state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
			} else state.done = t >= duration;
			state.value = state.done ? target : current;
			return state;
		}
	};
}
function inertia({ keyframes: keyframes$1, velocity = 0, power = .8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = .5, restSpeed }) {
	const origin = keyframes$1[0];
	const state = {
		done: false,
		value: origin
	};
	const isOutOfBounds = (v) => min !== void 0 && v < min || max !== void 0 && v > max;
	const nearestBoundary = (v) => {
		if (min === void 0) return max;
		if (max === void 0) return min;
		return Math.abs(min - v) < Math.abs(max - v) ? min : max;
	};
	let amplitude = power * velocity;
	const ideal = origin + amplitude;
	const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
	if (target !== ideal) amplitude = target - origin;
	const calcDelta = (t) => -amplitude * Math.exp(-t / timeConstant);
	const calcLatest = (t) => target + calcDelta(t);
	const applyFriction = (t) => {
		const delta = calcDelta(t);
		const latest = calcLatest(t);
		state.done = Math.abs(delta) <= restDelta;
		state.value = state.done ? target : latest;
	};
	let timeReachedBoundary;
	let spring$1;
	const checkCatchBoundary = (t) => {
		if (!isOutOfBounds(state.value)) return;
		timeReachedBoundary = t;
		spring$1 = spring({
			keyframes: [state.value, nearestBoundary(state.value)],
			velocity: calcGeneratorVelocity(calcLatest, t, state.value),
			damping: bounceDamping,
			stiffness: bounceStiffness,
			restDelta,
			restSpeed
		});
	};
	checkCatchBoundary(0);
	return {
		calculatedDuration: null,
		next: (t) => {
			let hasUpdatedFrame = false;
			if (!spring$1 && timeReachedBoundary === void 0) {
				hasUpdatedFrame = true;
				applyFriction(t);
				checkCatchBoundary(t);
			}
			if (timeReachedBoundary !== void 0 && t > timeReachedBoundary) return spring$1.next(t - timeReachedBoundary);
			else {
				!hasUpdatedFrame && applyFriction(t);
				return state;
			}
		}
	};
}
var frameloopDriver = (update) => {
	const passTimestamp = ({ timestamp }) => update(timestamp);
	return {
		start: () => frame.update(passTimestamp, true),
		stop: () => cancelFrame(passTimestamp),
		now: () => frameData.isProcessing ? frameData.timestamp : performance.now()
	};
};
function calcGeneratorDuration(generator) {
	let duration = 0;
	const timeStep = 50;
	let state = generator.next(duration);
	while (!state.done && duration < 2e4) {
		duration += timeStep;
		state = generator.next(duration);
	}
	return duration >= 2e4 ? Infinity : duration;
}
var types = {
	decay: inertia,
	inertia,
	tween: keyframes,
	keyframes,
	spring
};
function animateValue({ autoplay = true, delay: delay$1 = 0, driver = frameloopDriver, keyframes: keyframes$1, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", onPlay, onStop, onComplete, onUpdate, ...options }) {
	let speed = 1;
	let hasStopped = false;
	let resolveFinishedPromise;
	let currentFinishedPromise;
	const updateFinishedPromise = () => {
		currentFinishedPromise = new Promise((resolve) => {
			resolveFinishedPromise = resolve;
		});
	};
	updateFinishedPromise();
	let animationDriver;
	const generatorFactory = types[type] || keyframes;
	let mapNumbersToKeyframes;
	if (generatorFactory !== keyframes && typeof keyframes$1[0] !== "number") {
		mapNumbersToKeyframes = interpolate([0, 100], keyframes$1, { clamp: false });
		keyframes$1 = [0, 100];
	}
	const generator = generatorFactory({
		...options,
		keyframes: keyframes$1
	});
	let mirroredGenerator;
	if (repeatType === "mirror") mirroredGenerator = generatorFactory({
		...options,
		keyframes: [...keyframes$1].reverse(),
		velocity: -(options.velocity || 0)
	});
	let playState = "idle";
	let holdTime = null;
	let startTime = null;
	let cancelTime = null;
	if (generator.calculatedDuration === null && repeat) generator.calculatedDuration = calcGeneratorDuration(generator);
	const { calculatedDuration } = generator;
	let resolvedDuration = Infinity;
	let totalDuration = Infinity;
	if (calculatedDuration !== null) {
		resolvedDuration = calculatedDuration + repeatDelay;
		totalDuration = resolvedDuration * (repeat + 1) - repeatDelay;
	}
	let currentTime = 0;
	const tick = (timestamp) => {
		if (startTime === null) return;
		if (speed > 0) startTime = Math.min(startTime, timestamp);
		if (speed < 0) startTime = Math.min(timestamp - totalDuration / speed, startTime);
		if (holdTime !== null) currentTime = holdTime;
		else currentTime = Math.round(timestamp - startTime) * speed;
		const timeWithoutDelay = currentTime - delay$1 * (speed >= 0 ? 1 : -1);
		const isInDelayPhase = speed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
		currentTime = Math.max(timeWithoutDelay, 0);
		if (playState === "finished" && holdTime === null) currentTime = totalDuration;
		let elapsed = currentTime;
		let frameGenerator = generator;
		if (repeat) {
			const progress$1 = currentTime / resolvedDuration;
			let currentIteration = Math.floor(progress$1);
			let iterationProgress = progress$1 % 1;
			if (!iterationProgress && progress$1 >= 1) iterationProgress = 1;
			iterationProgress === 1 && currentIteration--;
			currentIteration = Math.min(currentIteration, repeat + 1);
			const iterationIsOdd = Boolean(currentIteration % 2);
			if (iterationIsOdd) {
				if (repeatType === "reverse") {
					iterationProgress = 1 - iterationProgress;
					if (repeatDelay) iterationProgress -= repeatDelay / resolvedDuration;
				} else if (repeatType === "mirror") frameGenerator = mirroredGenerator;
			}
			let p = clamp(0, 1, iterationProgress);
			if (currentTime > totalDuration) p = repeatType === "reverse" && iterationIsOdd ? 1 : 0;
			elapsed = p * resolvedDuration;
		}
		const state = isInDelayPhase ? {
			done: false,
			value: keyframes$1[0]
		} : frameGenerator.next(elapsed);
		if (mapNumbersToKeyframes) state.value = mapNumbersToKeyframes(state.value);
		let { done } = state;
		if (!isInDelayPhase && calculatedDuration !== null) done = speed >= 0 ? currentTime >= totalDuration : currentTime <= 0;
		const isAnimationFinished = holdTime === null && (playState === "finished" || playState === "running" && done);
		if (onUpdate) onUpdate(state.value);
		if (isAnimationFinished) finish();
		return state;
	};
	const stopAnimationDriver = () => {
		animationDriver && animationDriver.stop();
		animationDriver = void 0;
	};
	const cancel = () => {
		playState = "idle";
		stopAnimationDriver();
		resolveFinishedPromise();
		updateFinishedPromise();
		startTime = cancelTime = null;
	};
	const finish = () => {
		playState = "finished";
		onComplete && onComplete();
		stopAnimationDriver();
		resolveFinishedPromise();
	};
	const play = () => {
		if (hasStopped) return;
		if (!animationDriver) animationDriver = driver(tick);
		const now = animationDriver.now();
		onPlay && onPlay();
		if (holdTime !== null) startTime = now - holdTime;
		else if (!startTime || playState === "finished") startTime = now;
		if (playState === "finished") updateFinishedPromise();
		cancelTime = startTime;
		holdTime = null;
		playState = "running";
		animationDriver.start();
	};
	if (autoplay) play();
	const controls = {
		then(resolve, reject) {
			return currentFinishedPromise.then(resolve, reject);
		},
		get time() {
			return millisecondsToSeconds(currentTime);
		},
		set time(newTime) {
			newTime = secondsToMilliseconds(newTime);
			currentTime = newTime;
			if (holdTime !== null || !animationDriver || speed === 0) holdTime = newTime;
			else startTime = animationDriver.now() - newTime / speed;
		},
		get duration() {
			return millisecondsToSeconds(generator.calculatedDuration === null ? calcGeneratorDuration(generator) : generator.calculatedDuration);
		},
		get speed() {
			return speed;
		},
		set speed(newSpeed) {
			if (newSpeed === speed || !animationDriver) return;
			speed = newSpeed;
			controls.time = millisecondsToSeconds(currentTime);
		},
		get state() {
			return playState;
		},
		play,
		pause: () => {
			playState = "paused";
			holdTime = currentTime;
		},
		stop: () => {
			hasStopped = true;
			if (playState === "idle") return;
			playState = "idle";
			onStop && onStop();
			cancel();
		},
		cancel: () => {
			if (cancelTime !== null) tick(cancelTime);
			cancel();
		},
		complete: () => {
			playState = "finished";
		},
		sample: (elapsed) => {
			startTime = 0;
			return tick(elapsed);
		}
	};
	return controls;
}
function memo(callback) {
	let result;
	return () => {
		if (result === void 0) result = callback();
		return result;
	};
}
var supportsWaapi = memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
var acceleratedValues = new Set([
	"opacity",
	"clipPath",
	"filter",
	"transform",
	"backgroundColor"
]);
var sampleDelta = 10;
var maxDuration = 2e4;
var requiresPregeneratedKeyframes = (valueName, options) => options.type === "spring" || valueName === "backgroundColor" || !isWaapiSupportedEasing(options.ease);
function createAcceleratedAnimation(value, valueName, { onUpdate, onComplete, ...options }) {
	if (!(supportsWaapi() && acceleratedValues.has(valueName) && !options.repeatDelay && options.repeatType !== "mirror" && options.damping !== 0 && options.type !== "inertia")) return false;
	let hasStopped = false;
	let resolveFinishedPromise;
	let currentFinishedPromise;
	const updateFinishedPromise = () => {
		currentFinishedPromise = new Promise((resolve) => {
			resolveFinishedPromise = resolve;
		});
	};
	updateFinishedPromise();
	let { keyframes: keyframes$1, duration = 300, ease: ease$1, times } = options;
	if (requiresPregeneratedKeyframes(valueName, options)) {
		const sampleAnimation = animateValue({
			...options,
			repeat: 0,
			delay: 0
		});
		let state = {
			done: false,
			value: keyframes$1[0]
		};
		const pregeneratedKeyframes = [];
		let t = 0;
		while (!state.done && t < maxDuration) {
			state = sampleAnimation.sample(t);
			pregeneratedKeyframes.push(state.value);
			t += sampleDelta;
		}
		times = void 0;
		keyframes$1 = pregeneratedKeyframes;
		duration = t - sampleDelta;
		ease$1 = "linear";
	}
	const animation = animateStyle(value.owner.current, valueName, keyframes$1, {
		...options,
		duration,
		ease: ease$1,
		times
	});
	const cancelAnimation = () => animation.cancel();
	const safeCancel = () => {
		frame.update(cancelAnimation);
		resolveFinishedPromise();
		updateFinishedPromise();
	};
	animation.onfinish = () => {
		value.set(getFinalKeyframe(keyframes$1, options));
		onComplete && onComplete();
		safeCancel();
	};
	return {
		then(resolve, reject) {
			return currentFinishedPromise.then(resolve, reject);
		},
		get timeline() {
			return animation.timeline;
		},
		set timeline(timeline) {
			animation.timeline = timeline;
			animation.onfinish = null;
		},
		get time() {
			return millisecondsToSeconds(animation.currentTime || 0);
		},
		set time(newTime) {
			animation.currentTime = secondsToMilliseconds(newTime);
		},
		get speed() {
			return animation.playbackRate;
		},
		set speed(newSpeed) {
			animation.playbackRate = newSpeed;
		},
		get duration() {
			return millisecondsToSeconds(duration);
		},
		play: () => {
			if (hasStopped) return;
			animation.play();
			cancelFrame(cancelAnimation);
		},
		pause: () => animation.pause(),
		stop: () => {
			hasStopped = true;
			if (animation.playState === "idle") return;
			const { currentTime } = animation;
			if (currentTime) {
				const sampleAnimation = animateValue({
					...options,
					autoplay: false
				});
				value.setWithVelocity(sampleAnimation.sample(currentTime - sampleDelta).value, sampleAnimation.sample(currentTime).value, sampleDelta);
			}
			safeCancel();
		},
		complete: () => animation.finish(),
		cancel: safeCancel
	};
}
function createInstantAnimation({ keyframes: keyframes$1, delay: delay$1, onUpdate, onComplete }) {
	const setValue = () => {
		onUpdate && onUpdate(keyframes$1[keyframes$1.length - 1]);
		onComplete && onComplete();
		return {
			time: 0,
			speed: 1,
			duration: 0,
			play: noop,
			pause: noop,
			stop: noop,
			then: (resolve) => {
				resolve();
				return Promise.resolve();
			},
			cancel: noop,
			complete: noop
		};
	};
	return delay$1 ? animateValue({
		keyframes: [0, 1],
		duration: 0,
		delay: delay$1,
		onComplete: setValue
	}) : setValue();
}
var underDampedSpring = {
	type: "spring",
	stiffness: 500,
	damping: 25,
	restSpeed: 10
};
var criticallyDampedSpring = (target) => ({
	type: "spring",
	stiffness: 550,
	damping: target === 0 ? 2 * Math.sqrt(550) : 30,
	restSpeed: 10
});
var keyframesTransition = {
	type: "keyframes",
	duration: .8
};
var ease = {
	type: "keyframes",
	ease: [
		.25,
		.1,
		.35,
		1
	],
	duration: .3
};
var getDefaultTransition = (valueKey, { keyframes: keyframes$1 }) => {
	if (keyframes$1.length > 2) return keyframesTransition;
	else if (transformProps.has(valueKey)) return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes$1[1]) : underDampedSpring;
	return ease;
};
var isAnimatable = (key, value) => {
	if (key === "zIndex") return false;
	if (typeof value === "number" || Array.isArray(value)) return true;
	if (typeof value === "string" && (complex.test(value) || value === "0") && !value.startsWith("url(")) return true;
	return false;
};
var maxDefaults = new Set([
	"brightness",
	"contrast",
	"saturate",
	"opacity"
]);
function applyDefaultFilter(v) {
	const [name, value] = v.slice(0, -1).split("(");
	if (name === "drop-shadow") return v;
	const [number$1] = value.match(floatRegex) || [];
	if (!number$1) return v;
	const unit = value.replace(number$1, "");
	let defaultValue = maxDefaults.has(name) ? 1 : 0;
	if (number$1 !== value) defaultValue *= 100;
	return name + "(" + defaultValue + unit + ")";
}
var functionRegex = /([a-z-]*)\(.*?\)/g;
var filter = {
	...complex,
	getAnimatableNone: (v) => {
		const functions = v.match(functionRegex);
		return functions ? functions.map(applyDefaultFilter).join(" ") : v;
	}
};
var defaultValueTypes = {
	...numberValueTypes,
	color,
	backgroundColor: color,
	outlineColor: color,
	fill: color,
	stroke: color,
	borderColor: color,
	borderTopColor: color,
	borderRightColor: color,
	borderBottomColor: color,
	borderLeftColor: color,
	filter,
	WebkitFilter: filter
};
var getDefaultValueType = (key) => defaultValueTypes[key];
function getAnimatableNone(key, value) {
	let defaultValueType = getDefaultValueType(key);
	if (defaultValueType !== filter) defaultValueType = complex;
	return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}
var isZeroValueString = (v) => /^0[^.\s]+$/.test(v);
function isNone(value) {
	if (typeof value === "number") return value === 0;
	else if (value !== null) return value === "none" || value === "0" || isZeroValueString(value);
}
function getKeyframes(value, valueName, target, transition) {
	const isTargetAnimatable = isAnimatable(valueName, target);
	let keyframes$1;
	if (Array.isArray(target)) keyframes$1 = [...target];
	else keyframes$1 = [null, target];
	const defaultOrigin = transition.from !== void 0 ? transition.from : value.get();
	let animatableTemplateValue = void 0;
	const noneKeyframeIndexes = [];
	for (let i = 0; i < keyframes$1.length; i++) {
		if (keyframes$1[i] === null) keyframes$1[i] = i === 0 ? defaultOrigin : keyframes$1[i - 1];
		if (isNone(keyframes$1[i])) noneKeyframeIndexes.push(i);
		if (typeof keyframes$1[i] === "string" && keyframes$1[i] !== "none" && keyframes$1[i] !== "0") animatableTemplateValue = keyframes$1[i];
	}
	if (isTargetAnimatable && noneKeyframeIndexes.length && animatableTemplateValue) for (let i = 0; i < noneKeyframeIndexes.length; i++) {
		const index$1 = noneKeyframeIndexes[i];
		keyframes$1[index$1] = getAnimatableNone(valueName, animatableTemplateValue);
	}
	return keyframes$1;
}
function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, elapsed, ...transition }) {
	return !!Object.keys(transition).length;
}
function getValueTransition(transition, key) {
	return transition[key] || transition["default"] || transition;
}
var animateMotionValue = (valueName, value, target, transition = {}) => {
	return (onComplete) => {
		const valueTransition = getValueTransition(transition, valueName) || {};
		const delay$1 = valueTransition.delay || transition.delay || 0;
		let { elapsed = 0 } = transition;
		elapsed = elapsed - secondsToMilliseconds(delay$1);
		const keyframes$1 = getKeyframes(value, valueName, target, valueTransition);
		const originKeyframe = keyframes$1[0];
		const targetKeyframe = keyframes$1[keyframes$1.length - 1];
		const isOriginAnimatable = isAnimatable(valueName, originKeyframe);
		const isTargetAnimatable = isAnimatable(valueName, targetKeyframe);
		warning(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${valueName} from "${originKeyframe}" to "${targetKeyframe}". ${originKeyframe} is not an animatable value - to enable this animation set ${originKeyframe} to a value animatable to ${targetKeyframe} via the \`style\` property.`);
		let options = {
			keyframes: keyframes$1,
			velocity: value.getVelocity(),
			ease: "easeOut",
			...valueTransition,
			delay: -elapsed,
			onUpdate: (v) => {
				value.set(v);
				valueTransition.onUpdate && valueTransition.onUpdate(v);
			},
			onComplete: () => {
				onComplete();
				valueTransition.onComplete && valueTransition.onComplete();
			}
		};
		if (!isTransitionDefined(valueTransition)) options = {
			...options,
			...getDefaultTransition(valueName, options)
		};
		if (options.duration) options.duration = secondsToMilliseconds(options.duration);
		if (options.repeatDelay) options.repeatDelay = secondsToMilliseconds(options.repeatDelay);
		if (!isOriginAnimatable || !isTargetAnimatable || instantAnimationState.current || valueTransition.type === false) return createInstantAnimation(instantAnimationState.current ? {
			...options,
			delay: 0
		} : options);
		if (value.owner && value.owner.current instanceof HTMLElement && !value.owner.getProps().onUpdate) {
			const acceleratedAnimation = createAcceleratedAnimation(value, valueName, options);
			if (acceleratedAnimation) return acceleratedAnimation;
		}
		return animateValue(options);
	};
};
function isWillChangeMotionValue(value) {
	return Boolean(isMotionValue(value) && value.add);
}
var isNumericalString = (v) => /^\-?\d*\.?\d+$/.test(v);
function addUniqueItem(arr, item) {
	if (arr.indexOf(item) === -1) arr.push(item);
}
function removeItem(arr, item) {
	const index$1 = arr.indexOf(item);
	if (index$1 > -1) arr.splice(index$1, 1);
}
var SubscriptionManager = class {
	constructor() {
		this.subscriptions = [];
	}
	add(handler) {
		addUniqueItem(this.subscriptions, handler);
		return () => removeItem(this.subscriptions, handler);
	}
	notify(a, b, c) {
		const numSubscriptions = this.subscriptions.length;
		if (!numSubscriptions) return;
		if (numSubscriptions === 1) this.subscriptions[0](a, b, c);
		else for (let i = 0; i < numSubscriptions; i++) {
			const handler = this.subscriptions[i];
			handler && handler(a, b, c);
		}
	}
	getSize() {
		return this.subscriptions.length;
	}
	clear() {
		this.subscriptions.length = 0;
	}
};
var warned = /* @__PURE__ */ new Set();
function warnOnce(condition, message, element) {
	if (condition || warned.has(message)) return;
	console.warn(message);
	if (element) console.warn(element);
	warned.add(message);
}
var isFloat = (value) => {
	return !isNaN(parseFloat(value));
};
var MotionValue = class {
	constructor(init, options = {}) {
		this.version = "10.13.1";
		this.timeDelta = 0;
		this.lastUpdated = 0;
		this.canTrackVelocity = false;
		this.events = {};
		this.updateAndNotify = (v, render = true) => {
			this.prev = this.current;
			this.current = v;
			const { delta, timestamp } = frameData;
			if (this.lastUpdated !== timestamp) {
				this.timeDelta = delta;
				this.lastUpdated = timestamp;
				frame.postRender(this.scheduleVelocityCheck);
			}
			if (this.prev !== this.current && this.events.change) this.events.change.notify(this.current);
			if (this.events.velocityChange) this.events.velocityChange.notify(this.getVelocity());
			if (render && this.events.renderRequest) this.events.renderRequest.notify(this.current);
		};
		this.scheduleVelocityCheck = () => frame.postRender(this.velocityCheck);
		this.velocityCheck = ({ timestamp }) => {
			if (timestamp !== this.lastUpdated) {
				this.prev = this.current;
				if (this.events.velocityChange) this.events.velocityChange.notify(this.getVelocity());
			}
		};
		this.hasAnimated = false;
		this.prev = this.current = init;
		this.canTrackVelocity = isFloat(this.current);
		this.owner = options.owner;
	}
	onChange(subscription) {
		warnOnce(false, `value.onChange(callback) is deprecated. Switch to value.on("change", callback).`);
		return this.on("change", subscription);
	}
	on(eventName, callback) {
		if (!this.events[eventName]) this.events[eventName] = new SubscriptionManager();
		const unsubscribe = this.events[eventName].add(callback);
		if (eventName === "change") return () => {
			unsubscribe();
			frame.read(() => {
				if (!this.events.change.getSize()) this.stop();
			});
		};
		return unsubscribe;
	}
	clearListeners() {
		for (const eventManagers in this.events) this.events[eventManagers].clear();
	}
	attach(passiveEffect, stopPassiveEffect) {
		this.passiveEffect = passiveEffect;
		this.stopPassiveEffect = stopPassiveEffect;
	}
	set(v, render = true) {
		if (!render || !this.passiveEffect) this.updateAndNotify(v, render);
		else this.passiveEffect(v, this.updateAndNotify);
	}
	setWithVelocity(prev, current, delta) {
		this.set(current);
		this.prev = prev;
		this.timeDelta = delta;
	}
	jump(v) {
		this.updateAndNotify(v);
		this.prev = v;
		this.stop();
		if (this.stopPassiveEffect) this.stopPassiveEffect();
	}
	get() {
		return this.current;
	}
	getPrevious() {
		return this.prev;
	}
	getVelocity() {
		return this.canTrackVelocity ? velocityPerSecond(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta) : 0;
	}
	start(startAnimation) {
		this.stop();
		return new Promise((resolve) => {
			this.hasAnimated = true;
			this.animation = startAnimation(resolve);
			if (this.events.animationStart) this.events.animationStart.notify();
		}).then(() => {
			if (this.events.animationComplete) this.events.animationComplete.notify();
			this.clearAnimation();
		});
	}
	stop() {
		if (this.animation) {
			this.animation.stop();
			if (this.events.animationCancel) this.events.animationCancel.notify();
		}
		this.clearAnimation();
	}
	isAnimating() {
		return !!this.animation;
	}
	clearAnimation() {
		delete this.animation;
	}
	destroy() {
		this.clearListeners();
		this.stop();
		if (this.stopPassiveEffect) this.stopPassiveEffect();
	}
};
function motionValue(init, options) {
	return new MotionValue(init, options);
}
var testValueType = (v) => (type) => type.test(v);
var dimensionValueTypes = [
	number,
	px,
	percent,
	degrees,
	vw,
	vh,
	{
		test: (v) => v === "auto",
		parse: (v) => v
	}
];
var findDimensionValueType = (v) => dimensionValueTypes.find(testValueType(v));
var valueTypes = [
	...dimensionValueTypes,
	color,
	complex
];
var findValueType = (v) => valueTypes.find(testValueType(v));
function setMotionValue(visualElement, key, value) {
	if (visualElement.hasValue(key)) visualElement.getValue(key).set(value);
	else visualElement.addValue(key, motionValue(value));
}
function setTarget(visualElement, definition) {
	const resolved = resolveVariant(visualElement, definition);
	let { transitionEnd = {}, transition = {}, ...target } = resolved ? visualElement.makeTargetAnimatable(resolved, false) : {};
	target = {
		...target,
		...transitionEnd
	};
	for (const key in target) setMotionValue(visualElement, key, resolveFinalValueInKeyframes(target[key]));
}
function checkTargetForNewValues(visualElement, target, origin) {
	var _a, _b;
	const newValueKeys = Object.keys(target).filter((key) => !visualElement.hasValue(key));
	const numNewValues = newValueKeys.length;
	if (!numNewValues) return;
	for (let i = 0; i < numNewValues; i++) {
		const key = newValueKeys[i];
		const targetValue = target[key];
		let value = null;
		if (Array.isArray(targetValue)) value = targetValue[0];
		if (value === null) value = (_b = (_a = origin[key]) !== null && _a !== void 0 ? _a : visualElement.readValue(key)) !== null && _b !== void 0 ? _b : target[key];
		if (value === void 0 || value === null) continue;
		if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) value = parseFloat(value);
		else if (!findValueType(value) && complex.test(targetValue)) value = getAnimatableNone(key, targetValue);
		visualElement.addValue(key, motionValue(value, { owner: visualElement }));
		if (origin[key] === void 0) origin[key] = value;
		if (value !== null) visualElement.setBaseTarget(key, value);
	}
}
function getOriginFromTransition(key, transition) {
	if (!transition) return;
	return (transition[key] || transition["default"] || transition).from;
}
function getOrigin(target, transition, visualElement) {
	const origin = {};
	for (const key in target) {
		const transitionOrigin = getOriginFromTransition(key, transition);
		if (transitionOrigin !== void 0) origin[key] = transitionOrigin;
		else {
			const value = visualElement.getValue(key);
			if (value) origin[key] = value.get();
		}
	}
	return origin;
}
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
	const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
	needsAnimating[key] = false;
	return shouldBlock;
}
function animateTarget(visualElement, definition, { delay: delay$1 = 0, transitionOverride, type } = {}) {
	let { transition = visualElement.getDefaultTransition(), transitionEnd, ...target } = visualElement.makeTargetAnimatable(definition);
	const willChange = visualElement.getValue("willChange");
	if (transitionOverride) transition = transitionOverride;
	const animations$1 = [];
	const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
	for (const key in target) {
		const value = visualElement.getValue(key);
		const valueTarget = target[key];
		if (!value || valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) continue;
		const valueTransition = {
			delay: delay$1,
			elapsed: 0,
			...transition
		};
		if (window.HandoffAppearAnimations && !value.hasAnimated) {
			const appearId = visualElement.getProps()[optimizedAppearDataAttribute];
			if (appearId) valueTransition.elapsed = window.HandoffAppearAnimations(appearId, key, value, frame);
		}
		value.start(animateMotionValue(key, value, valueTarget, visualElement.shouldReduceMotion && transformProps.has(key) ? { type: false } : valueTransition));
		const animation = value.animation;
		if (isWillChangeMotionValue(willChange)) {
			willChange.add(key);
			animation.then(() => willChange.remove(key));
		}
		animations$1.push(animation);
	}
	if (transitionEnd) Promise.all(animations$1).then(() => {
		transitionEnd && setTarget(visualElement, transitionEnd);
	});
	return animations$1;
}
function animateVariant(visualElement, variant, options = {}) {
	const resolved = resolveVariant(visualElement, variant, options.custom);
	let { transition = visualElement.getDefaultTransition() || {} } = resolved || {};
	if (options.transitionOverride) transition = options.transitionOverride;
	const getAnimation = resolved ? () => Promise.all(animateTarget(visualElement, resolved, options)) : () => Promise.resolve();
	const getChildAnimations = visualElement.variantChildren && visualElement.variantChildren.size ? (forwardDelay = 0) => {
		const { delayChildren = 0, staggerChildren, staggerDirection } = transition;
		return animateChildren(visualElement, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
	} : () => Promise.resolve();
	const { when } = transition;
	if (when) {
		const [first, last] = when === "beforeChildren" ? [getAnimation, getChildAnimations] : [getChildAnimations, getAnimation];
		return first().then(() => last());
	} else return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
}
function animateChildren(visualElement, variant, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
	const animations$1 = [];
	const maxStaggerDuration = (visualElement.variantChildren.size - 1) * staggerChildren;
	const generateStaggerDuration = staggerDirection === 1 ? (i = 0) => i * staggerChildren : (i = 0) => maxStaggerDuration - i * staggerChildren;
	Array.from(visualElement.variantChildren).sort(sortByTreeOrder).forEach((child, i) => {
		child.notify("AnimationStart", variant);
		animations$1.push(animateVariant(child, variant, {
			...options,
			delay: delayChildren + generateStaggerDuration(i)
		}).then(() => child.notify("AnimationComplete", variant)));
	});
	return Promise.all(animations$1);
}
function sortByTreeOrder(a, b) {
	return a.sortNodePosition(b);
}
function animateVisualElement(visualElement, definition, options = {}) {
	visualElement.notify("AnimationStart", definition);
	let animation;
	if (Array.isArray(definition)) {
		const animations$1 = definition.map((variant) => animateVariant(visualElement, variant, options));
		animation = Promise.all(animations$1);
	} else if (typeof definition === "string") animation = animateVariant(visualElement, definition, options);
	else {
		const resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement, definition, options.custom) : definition;
		animation = Promise.all(animateTarget(visualElement, resolvedDefinition, options));
	}
	return animation.then(() => visualElement.notify("AnimationComplete", definition));
}
var reversePriorityOrder = [...variantPriorityOrder].reverse();
var numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement) {
	return (animations$1) => Promise.all(animations$1.map(({ animation, options }) => animateVisualElement(visualElement, animation, options)));
}
function createAnimationState(visualElement) {
	let animate = animateList(visualElement);
	const state = createState();
	let isInitialRender = true;
	const buildResolvedTypeValues = (acc, definition) => {
		const resolved = resolveVariant(visualElement, definition);
		if (resolved) {
			const { transition, transitionEnd, ...target } = resolved;
			acc = {
				...acc,
				...target,
				...transitionEnd
			};
		}
		return acc;
	};
	function setAnimateFunction(makeAnimator) {
		animate = makeAnimator(visualElement);
	}
	function animateChanges(options, changedActiveType) {
		const props = visualElement.getProps();
		const context = visualElement.getVariantContext(true) || {};
		const animations$1 = [];
		const removedKeys = /* @__PURE__ */ new Set();
		let encounteredKeys = {};
		let removedVariantIndex = Infinity;
		for (let i = 0; i < numAnimationTypes; i++) {
			const type = reversePriorityOrder[i];
			const typeState = state[type];
			const prop = props[type] !== void 0 ? props[type] : context[type];
			const propIsVariant = isVariantLabel(prop);
			const activeDelta = type === changedActiveType ? typeState.isActive : null;
			if (activeDelta === false) removedVariantIndex = i;
			let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
			if (isInherited && isInitialRender && visualElement.manuallyAnimateOnMount) isInherited = false;
			typeState.protectedKeys = { ...encounteredKeys };
			if (!typeState.isActive && activeDelta === null || !prop && !typeState.prevProp || isAnimationControls(prop) || typeof prop === "boolean") continue;
			const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
			let shouldAnimateType = variantDidChange || type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || i > removedVariantIndex && propIsVariant;
			const definitionList = Array.isArray(prop) ? prop : [prop];
			let resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
			if (activeDelta === false) resolvedValues = {};
			const { prevResolvedValues = {} } = typeState;
			const allKeys = {
				...prevResolvedValues,
				...resolvedValues
			};
			const markToAnimate = (key) => {
				shouldAnimateType = true;
				removedKeys.delete(key);
				typeState.needsAnimating[key] = true;
			};
			for (const key in allKeys) {
				const next = resolvedValues[key];
				const prev = prevResolvedValues[key];
				if (encounteredKeys.hasOwnProperty(key)) continue;
				if (next !== prev) if (isKeyframesTarget(next) && isKeyframesTarget(prev)) if (!shallowCompare(next, prev) || variantDidChange) markToAnimate(key);
				else typeState.protectedKeys[key] = true;
				else if (next !== void 0) markToAnimate(key);
				else removedKeys.add(key);
				else if (next !== void 0 && removedKeys.has(key)) markToAnimate(key);
				else typeState.protectedKeys[key] = true;
			}
			typeState.prevProp = prop;
			typeState.prevResolvedValues = resolvedValues;
			if (typeState.isActive) encounteredKeys = {
				...encounteredKeys,
				...resolvedValues
			};
			if (isInitialRender && visualElement.blockInitialAnimation) shouldAnimateType = false;
			if (shouldAnimateType && !isInherited) animations$1.push(...definitionList.map((animation) => ({
				animation,
				options: {
					type,
					...options
				}
			})));
		}
		if (removedKeys.size) {
			const fallbackAnimation = {};
			removedKeys.forEach((key) => {
				const fallbackTarget = visualElement.getBaseTarget(key);
				if (fallbackTarget !== void 0) fallbackAnimation[key] = fallbackTarget;
			});
			animations$1.push({ animation: fallbackAnimation });
		}
		let shouldAnimate = Boolean(animations$1.length);
		if (isInitialRender && props.initial === false && !visualElement.manuallyAnimateOnMount) shouldAnimate = false;
		isInitialRender = false;
		return shouldAnimate ? animate(animations$1) : Promise.resolve();
	}
	function setActive(type, isActive, options) {
		var _a;
		if (state[type].isActive === isActive) return Promise.resolve();
		(_a = visualElement.variantChildren) === null || _a === void 0 || _a.forEach((child) => {
			var _a$1;
			return (_a$1 = child.animationState) === null || _a$1 === void 0 ? void 0 : _a$1.setActive(type, isActive);
		});
		state[type].isActive = isActive;
		const animations$1 = animateChanges(options, type);
		for (const key in state) state[key].protectedKeys = {};
		return animations$1;
	}
	return {
		animateChanges,
		setActive,
		setAnimateFunction,
		getState: () => state
	};
}
function checkVariantsDidChange(prev, next) {
	if (typeof next === "string") return next !== prev;
	else if (Array.isArray(next)) return !shallowCompare(next, prev);
	return false;
}
function createTypeState(isActive = false) {
	return {
		isActive,
		protectedKeys: {},
		needsAnimating: {},
		prevResolvedValues: {}
	};
}
function createState() {
	return {
		animate: createTypeState(true),
		whileInView: createTypeState(),
		whileHover: createTypeState(),
		whileTap: createTypeState(),
		whileDrag: createTypeState(),
		whileFocus: createTypeState(),
		exit: createTypeState()
	};
}
var AnimationFeature = class extends Feature {
	constructor(node) {
		super(node);
		node.animationState || (node.animationState = createAnimationState(node));
	}
	updateAnimationControlsSubscription() {
		const { animate } = this.node.getProps();
		this.unmount();
		if (isAnimationControls(animate)) this.unmount = animate.subscribe(this.node);
	}
	mount() {
		this.updateAnimationControlsSubscription();
	}
	update() {
		const { animate } = this.node.getProps();
		const { animate: prevAnimate } = this.node.prevProps || {};
		if (animate !== prevAnimate) this.updateAnimationControlsSubscription();
	}
	unmount() {}
};
var id$1 = 0;
var ExitAnimationFeature = class extends Feature {
	constructor() {
		super(...arguments);
		this.id = id$1++;
	}
	update() {
		if (!this.node.presenceContext) return;
		const { isPresent, onExitComplete, custom } = this.node.presenceContext;
		const { isPresent: prevIsPresent } = this.node.prevPresenceContext || {};
		if (!this.node.animationState || isPresent === prevIsPresent) return;
		const exitAnimation = this.node.animationState.setActive("exit", !isPresent, { custom: custom !== null && custom !== void 0 ? custom : this.node.getProps().custom });
		if (onExitComplete && !isPresent) exitAnimation.then(() => onExitComplete(this.id));
	}
	mount() {
		const { register } = this.node.presenceContext || {};
		if (register) this.unmount = register(this.id);
	}
	unmount() {}
};
var animations = {
	animation: { Feature: AnimationFeature },
	exit: { Feature: ExitAnimationFeature }
};
var distance = (a, b) => Math.abs(a - b);
function distance2D(a, b) {
	const xDelta = distance(a.x, b.x);
	const yDelta = distance(a.y, b.y);
	return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}
var PanSession = class {
	constructor(event, handlers, { transformPagePoint } = {}) {
		this.startEvent = null;
		this.lastMoveEvent = null;
		this.lastMoveEventInfo = null;
		this.handlers = {};
		this.updatePoint = () => {
			if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
			const info = getPanInfo(this.lastMoveEventInfo, this.history);
			const isPanStarted = this.startEvent !== null;
			const isDistancePastThreshold = distance2D(info.offset, {
				x: 0,
				y: 0
			}) >= 3;
			if (!isPanStarted && !isDistancePastThreshold) return;
			const { point: point$1 } = info;
			const { timestamp: timestamp$1 } = frameData;
			this.history.push({
				...point$1,
				timestamp: timestamp$1
			});
			const { onStart, onMove } = this.handlers;
			if (!isPanStarted) {
				onStart && onStart(this.lastMoveEvent, info);
				this.startEvent = this.lastMoveEvent;
			}
			onMove && onMove(this.lastMoveEvent, info);
		};
		this.handlePointerMove = (event$1, info) => {
			this.lastMoveEvent = event$1;
			this.lastMoveEventInfo = transformPoint(info, this.transformPagePoint);
			frame.update(this.updatePoint, true);
		};
		this.handlePointerUp = (event$1, info) => {
			this.end();
			if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
			const { onEnd, onSessionEnd } = this.handlers;
			const panInfo = getPanInfo(event$1.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(info, this.transformPagePoint), this.history);
			if (this.startEvent && onEnd) onEnd(event$1, panInfo);
			onSessionEnd && onSessionEnd(event$1, panInfo);
		};
		if (!isPrimaryPointer(event)) return;
		this.handlers = handlers;
		this.transformPagePoint = transformPagePoint;
		const initialInfo = transformPoint(extractEventInfo(event), this.transformPagePoint);
		const { point } = initialInfo;
		const { timestamp } = frameData;
		this.history = [{
			...point,
			timestamp
		}];
		const { onSessionStart } = handlers;
		onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
		this.removeListeners = pipe(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
	}
	updateHandlers(handlers) {
		this.handlers = handlers;
	}
	end() {
		this.removeListeners && this.removeListeners();
		cancelFrame(this.updatePoint);
	}
};
function transformPoint(info, transformPagePoint) {
	return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b) {
	return {
		x: a.x - b.x,
		y: a.y - b.y
	};
}
function getPanInfo({ point }, history) {
	return {
		point,
		delta: subtractPoint(point, lastDevicePoint(history)),
		offset: subtractPoint(point, startDevicePoint(history)),
		velocity: getVelocity(history, .1)
	};
}
function startDevicePoint(history) {
	return history[0];
}
function lastDevicePoint(history) {
	return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
	if (history.length < 2) return {
		x: 0,
		y: 0
	};
	let i = history.length - 1;
	let timestampedPoint = null;
	const lastPoint = lastDevicePoint(history);
	while (i >= 0) {
		timestampedPoint = history[i];
		if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) break;
		i--;
	}
	if (!timestampedPoint) return {
		x: 0,
		y: 0
	};
	const time = millisecondsToSeconds(lastPoint.timestamp - timestampedPoint.timestamp);
	if (time === 0) return {
		x: 0,
		y: 0
	};
	const currentVelocity = {
		x: (lastPoint.x - timestampedPoint.x) / time,
		y: (lastPoint.y - timestampedPoint.y) / time
	};
	if (currentVelocity.x === Infinity) currentVelocity.x = 0;
	if (currentVelocity.y === Infinity) currentVelocity.y = 0;
	return currentVelocity;
}
function calcLength(axis) {
	return axis.max - axis.min;
}
function isNear(value, target = 0, maxDistance = .01) {
	return Math.abs(value - target) <= maxDistance;
}
function calcAxisDelta(delta, source, target, origin = .5) {
	delta.origin = origin;
	delta.originPoint = mix(source.min, source.max, delta.origin);
	delta.scale = calcLength(target) / calcLength(source);
	if (isNear(delta.scale, 1, 1e-4) || isNaN(delta.scale)) delta.scale = 1;
	delta.translate = mix(target.min, target.max, delta.origin) - delta.originPoint;
	if (isNear(delta.translate) || isNaN(delta.translate)) delta.translate = 0;
}
function calcBoxDelta(delta, source, target, origin) {
	calcAxisDelta(delta.x, source.x, target.x, origin ? origin.originX : void 0);
	calcAxisDelta(delta.y, source.y, target.y, origin ? origin.originY : void 0);
}
function calcRelativeAxis(target, relative, parent) {
	target.min = parent.min + relative.min;
	target.max = target.min + calcLength(relative);
}
function calcRelativeBox(target, relative, parent) {
	calcRelativeAxis(target.x, relative.x, parent.x);
	calcRelativeAxis(target.y, relative.y, parent.y);
}
function calcRelativeAxisPosition(target, layout$1, parent) {
	target.min = layout$1.min - parent.min;
	target.max = target.min + calcLength(layout$1);
}
function calcRelativePosition(target, layout$1, parent) {
	calcRelativeAxisPosition(target.x, layout$1.x, parent.x);
	calcRelativeAxisPosition(target.y, layout$1.y, parent.y);
}
function applyConstraints(point, { min, max }, elastic) {
	if (min !== void 0 && point < min) point = elastic ? mix(min, point, elastic.min) : Math.max(point, min);
	else if (max !== void 0 && point > max) point = elastic ? mix(max, point, elastic.max) : Math.min(point, max);
	return point;
}
function calcRelativeAxisConstraints(axis, min, max) {
	return {
		min: min !== void 0 ? axis.min + min : void 0,
		max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
	};
}
function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
	return {
		x: calcRelativeAxisConstraints(layoutBox.x, left, right),
		y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
	};
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
	let min = constraintsAxis.min - layoutAxis.min;
	let max = constraintsAxis.max - layoutAxis.max;
	if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) [min, max] = [max, min];
	return {
		min,
		max
	};
}
function calcViewportConstraints(layoutBox, constraintsBox) {
	return {
		x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
		y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
	};
}
function calcOrigin(source, target) {
	let origin = .5;
	const sourceLength = calcLength(source);
	const targetLength = calcLength(target);
	if (targetLength > sourceLength) origin = progress(target.min, target.max - sourceLength, source.min);
	else if (sourceLength > targetLength) origin = progress(source.min, source.max - targetLength, target.min);
	return clamp(0, 1, origin);
}
function rebaseAxisConstraints(layout$1, constraints) {
	const relativeConstraints = {};
	if (constraints.min !== void 0) relativeConstraints.min = constraints.min - layout$1.min;
	if (constraints.max !== void 0) relativeConstraints.max = constraints.max - layout$1.min;
	return relativeConstraints;
}
var defaultElastic = .35;
function resolveDragElastic(dragElastic = defaultElastic) {
	if (dragElastic === false) dragElastic = 0;
	else if (dragElastic === true) dragElastic = defaultElastic;
	return {
		x: resolveAxisElastic(dragElastic, "left", "right"),
		y: resolveAxisElastic(dragElastic, "top", "bottom")
	};
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
	return {
		min: resolvePointElastic(dragElastic, minLabel),
		max: resolvePointElastic(dragElastic, maxLabel)
	};
}
function resolvePointElastic(dragElastic, label) {
	return typeof dragElastic === "number" ? dragElastic : dragElastic[label] || 0;
}
var createAxisDelta = () => ({
	translate: 0,
	scale: 1,
	origin: 0,
	originPoint: 0
});
var createDelta = () => ({
	x: createAxisDelta(),
	y: createAxisDelta()
});
var createAxis = () => ({
	min: 0,
	max: 0
});
var createBox = () => ({
	x: createAxis(),
	y: createAxis()
});
function eachAxis(callback) {
	return [callback("x"), callback("y")];
}
function convertBoundingBoxToBox({ top, left, right, bottom }) {
	return {
		x: {
			min: left,
			max: right
		},
		y: {
			min: top,
			max: bottom
		}
	};
}
function convertBoxToBoundingBox({ x, y }) {
	return {
		top: y.min,
		right: x.max,
		bottom: y.max,
		left: x.min
	};
}
function transformBoxPoints(point, transformPoint$1) {
	if (!transformPoint$1) return point;
	const topLeft = transformPoint$1({
		x: point.left,
		y: point.top
	});
	const bottomRight = transformPoint$1({
		x: point.right,
		y: point.bottom
	});
	return {
		top: topLeft.y,
		left: topLeft.x,
		bottom: bottomRight.y,
		right: bottomRight.x
	};
}
function isIdentityScale(scale$1) {
	return scale$1 === void 0 || scale$1 === 1;
}
function hasScale({ scale: scale$1, scaleX, scaleY }) {
	return !isIdentityScale(scale$1) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
}
function hasTransform(values) {
	return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY;
}
function has2DTranslate(values) {
	return is2DTranslate(values.x) || is2DTranslate(values.y);
}
function is2DTranslate(value) {
	return value && value !== "0%";
}
function scalePoint(point, scale$1, originPoint) {
	return originPoint + scale$1 * (point - originPoint);
}
function applyPointDelta(point, translate, scale$1, originPoint, boxScale) {
	if (boxScale !== void 0) point = scalePoint(point, boxScale, originPoint);
	return scalePoint(point, scale$1, originPoint) + translate;
}
function applyAxisDelta(axis, translate = 0, scale$1 = 1, originPoint, boxScale) {
	axis.min = applyPointDelta(axis.min, translate, scale$1, originPoint, boxScale);
	axis.max = applyPointDelta(axis.max, translate, scale$1, originPoint, boxScale);
}
function applyBoxDelta(box, { x, y }) {
	applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
	applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
	const treeLength = treePath.length;
	if (!treeLength) return;
	treeScale.x = treeScale.y = 1;
	let node;
	let delta;
	for (let i = 0; i < treeLength; i++) {
		node = treePath[i];
		delta = node.projectionDelta;
		const instance = node.instance;
		if (instance && instance.style && instance.style.display === "contents") continue;
		if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) transformBox(box, {
			x: -node.scroll.offset.x,
			y: -node.scroll.offset.y
		});
		if (delta) {
			treeScale.x *= delta.x.scale;
			treeScale.y *= delta.y.scale;
			applyBoxDelta(box, delta);
		}
		if (isSharedTransition && hasTransform(node.latestValues)) transformBox(box, node.latestValues);
	}
	treeScale.x = snapToDefault(treeScale.x);
	treeScale.y = snapToDefault(treeScale.y);
}
function snapToDefault(scale$1) {
	if (Number.isInteger(scale$1)) return scale$1;
	return scale$1 > 1.0000000000001 || scale$1 < .999999999999 ? scale$1 : 1;
}
function translateAxis(axis, distance$1) {
	axis.min = axis.min + distance$1;
	axis.max = axis.max + distance$1;
}
function transformAxis(axis, transforms, [key, scaleKey, originKey]) {
	const axisOrigin = transforms[originKey] !== void 0 ? transforms[originKey] : .5;
	const originPoint = mix(axis.min, axis.max, axisOrigin);
	applyAxisDelta(axis, transforms[key], transforms[scaleKey], originPoint, transforms.scale);
}
var xKeys$1 = [
	"x",
	"scaleX",
	"originX"
];
var yKeys$1 = [
	"y",
	"scaleY",
	"originY"
];
function transformBox(box, transform) {
	transformAxis(box.x, transform, xKeys$1);
	transformAxis(box.y, transform, yKeys$1);
}
function measureViewportBox(instance, transformPoint$1) {
	return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint$1));
}
function measurePageBox(element, rootProjectionNode$1, transformPagePoint) {
	const viewportBox = measureViewportBox(element, transformPagePoint);
	const { scroll } = rootProjectionNode$1;
	if (scroll) {
		translateAxis(viewportBox.x, scroll.offset.x);
		translateAxis(viewportBox.y, scroll.offset.y);
	}
	return viewportBox;
}
var elementDragControls = /* @__PURE__ */ new WeakMap();
var VisualElementDragControls = class {
	constructor(visualElement) {
		this.openGlobalLock = null;
		this.isDragging = false;
		this.currentDirection = null;
		this.originPoint = {
			x: 0,
			y: 0
		};
		this.constraints = false;
		this.hasMutatedConstraints = false;
		this.elastic = createBox();
		this.visualElement = visualElement;
	}
	start(originEvent, { snapToCursor = false } = {}) {
		const { presenceContext } = this.visualElement;
		if (presenceContext && presenceContext.isPresent === false) return;
		const onSessionStart = (event) => {
			this.stopAnimation();
			if (snapToCursor) this.snapToCursor(extractEventInfo(event, "page").point);
		};
		const onStart = (event, info) => {
			const { drag: drag$1, dragPropagation, onDragStart } = this.getProps();
			if (drag$1 && !dragPropagation) {
				if (this.openGlobalLock) this.openGlobalLock();
				this.openGlobalLock = getGlobalLock(drag$1);
				if (!this.openGlobalLock) return;
			}
			this.isDragging = true;
			this.currentDirection = null;
			this.resolveConstraints();
			if (this.visualElement.projection) {
				this.visualElement.projection.isAnimationBlocked = true;
				this.visualElement.projection.target = void 0;
			}
			eachAxis((axis) => {
				let current = this.getAxisMotionValue(axis).get() || 0;
				if (percent.test(current)) {
					const { projection } = this.visualElement;
					if (projection && projection.layout) {
						const measuredAxis = projection.layout.layoutBox[axis];
						if (measuredAxis) current = calcLength(measuredAxis) * (parseFloat(current) / 100);
					}
				}
				this.originPoint[axis] = current;
			});
			if (onDragStart) frame.update(() => onDragStart(event, info), false, true);
			const { animationState } = this.visualElement;
			animationState && animationState.setActive("whileDrag", true);
		};
		const onMove = (event, info) => {
			const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
			if (!dragPropagation && !this.openGlobalLock) return;
			const { offset } = info;
			if (dragDirectionLock && this.currentDirection === null) {
				this.currentDirection = getCurrentDirection(offset);
				if (this.currentDirection !== null) onDirectionLock && onDirectionLock(this.currentDirection);
				return;
			}
			this.updateAxis("x", info.point, offset);
			this.updateAxis("y", info.point, offset);
			this.visualElement.render();
			onDrag && onDrag(event, info);
		};
		const onSessionEnd = (event, info) => this.stop(event, info);
		this.panSession = new PanSession(originEvent, {
			onSessionStart,
			onStart,
			onMove,
			onSessionEnd
		}, { transformPagePoint: this.visualElement.getTransformPagePoint() });
	}
	stop(event, info) {
		const isDragging = this.isDragging;
		this.cancel();
		if (!isDragging) return;
		const { velocity } = info;
		this.startAnimation(velocity);
		const { onDragEnd } = this.getProps();
		if (onDragEnd) frame.update(() => onDragEnd(event, info));
	}
	cancel() {
		this.isDragging = false;
		const { projection, animationState } = this.visualElement;
		if (projection) projection.isAnimationBlocked = false;
		this.panSession && this.panSession.end();
		this.panSession = void 0;
		const { dragPropagation } = this.getProps();
		if (!dragPropagation && this.openGlobalLock) {
			this.openGlobalLock();
			this.openGlobalLock = null;
		}
		animationState && animationState.setActive("whileDrag", false);
	}
	updateAxis(axis, _point, offset) {
		const { drag: drag$1 } = this.getProps();
		if (!offset || !shouldDrag(axis, drag$1, this.currentDirection)) return;
		const axisValue = this.getAxisMotionValue(axis);
		let next = this.originPoint[axis] + offset[axis];
		if (this.constraints && this.constraints[axis]) next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
		axisValue.set(next);
	}
	resolveConstraints() {
		const { dragConstraints, dragElastic } = this.getProps();
		const { layout: layout$1 } = this.visualElement.projection || {};
		const prevConstraints = this.constraints;
		if (dragConstraints && isRefObject(dragConstraints)) {
			if (!this.constraints) this.constraints = this.resolveRefConstraints();
		} else if (dragConstraints && layout$1) this.constraints = calcRelativeConstraints(layout$1.layoutBox, dragConstraints);
		else this.constraints = false;
		this.elastic = resolveDragElastic(dragElastic);
		if (prevConstraints !== this.constraints && layout$1 && this.constraints && !this.hasMutatedConstraints) eachAxis((axis) => {
			if (this.getAxisMotionValue(axis)) this.constraints[axis] = rebaseAxisConstraints(layout$1.layoutBox[axis], this.constraints[axis]);
		});
	}
	resolveRefConstraints() {
		const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
		if (!constraints || !isRefObject(constraints)) return false;
		const constraintsElement = constraints.current;
		invariant(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
		const { projection } = this.visualElement;
		if (!projection || !projection.layout) return false;
		const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
		let measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
		if (onMeasureDragConstraints) {
			const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
			this.hasMutatedConstraints = !!userConstraints;
			if (userConstraints) measuredConstraints = convertBoundingBoxToBox(userConstraints);
		}
		return measuredConstraints;
	}
	startAnimation(velocity) {
		const { drag: drag$1, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
		const constraints = this.constraints || {};
		const momentumAnimations = eachAxis((axis) => {
			if (!shouldDrag(axis, drag$1, this.currentDirection)) return;
			let transition = constraints && constraints[axis] || {};
			if (dragSnapToOrigin) transition = {
				min: 0,
				max: 0
			};
			const bounceStiffness = dragElastic ? 200 : 1e6;
			const bounceDamping = dragElastic ? 40 : 1e7;
			const inertia$1 = {
				type: "inertia",
				velocity: dragMomentum ? velocity[axis] : 0,
				bounceStiffness,
				bounceDamping,
				timeConstant: 750,
				restDelta: 1,
				restSpeed: 10,
				...dragTransition,
				...transition
			};
			return this.startAxisValueAnimation(axis, inertia$1);
		});
		return Promise.all(momentumAnimations).then(onDragTransitionEnd);
	}
	startAxisValueAnimation(axis, transition) {
		const axisValue = this.getAxisMotionValue(axis);
		return axisValue.start(animateMotionValue(axis, axisValue, 0, transition));
	}
	stopAnimation() {
		eachAxis((axis) => this.getAxisMotionValue(axis).stop());
	}
	getAxisMotionValue(axis) {
		const dragKey = "_drag" + axis.toUpperCase();
		const props = this.visualElement.getProps();
		const externalMotionValue = props[dragKey];
		return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, (props.initial ? props.initial[axis] : void 0) || 0);
	}
	snapToCursor(point) {
		eachAxis((axis) => {
			const { drag: drag$1 } = this.getProps();
			if (!shouldDrag(axis, drag$1, this.currentDirection)) return;
			const { projection } = this.visualElement;
			const axisValue = this.getAxisMotionValue(axis);
			if (projection && projection.layout) {
				const { min, max } = projection.layout.layoutBox[axis];
				axisValue.set(point[axis] - mix(min, max, .5));
			}
		});
	}
	scalePositionWithinConstraints() {
		if (!this.visualElement.current) return;
		const { drag: drag$1, dragConstraints } = this.getProps();
		const { projection } = this.visualElement;
		if (!isRefObject(dragConstraints) || !projection || !this.constraints) return;
		this.stopAnimation();
		const boxProgress = {
			x: 0,
			y: 0
		};
		eachAxis((axis) => {
			const axisValue = this.getAxisMotionValue(axis);
			if (axisValue) {
				const latest = axisValue.get();
				boxProgress[axis] = calcOrigin({
					min: latest,
					max: latest
				}, this.constraints[axis]);
			}
		});
		const { transformTemplate } = this.visualElement.getProps();
		this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
		projection.root && projection.root.updateScroll();
		projection.updateLayout();
		this.resolveConstraints();
		eachAxis((axis) => {
			if (!shouldDrag(axis, drag$1, null)) return;
			const axisValue = this.getAxisMotionValue(axis);
			const { min, max } = this.constraints[axis];
			axisValue.set(mix(min, max, boxProgress[axis]));
		});
	}
	addListeners() {
		if (!this.visualElement.current) return;
		elementDragControls.set(this.visualElement, this);
		const element = this.visualElement.current;
		const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
			const { drag: drag$1, dragListener = true } = this.getProps();
			drag$1 && dragListener && this.start(event);
		});
		const measureDragConstraints = () => {
			const { dragConstraints } = this.getProps();
			if (isRefObject(dragConstraints)) this.constraints = this.resolveRefConstraints();
		};
		const { projection } = this.visualElement;
		const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
		if (projection && !projection.layout) {
			projection.root && projection.root.updateScroll();
			projection.updateLayout();
		}
		measureDragConstraints();
		const stopResizeListener = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints());
		const stopLayoutUpdateListener = projection.addEventListener("didUpdate", (({ delta, hasLayoutChanged }) => {
			if (this.isDragging && hasLayoutChanged) {
				eachAxis((axis) => {
					const motionValue$1 = this.getAxisMotionValue(axis);
					if (!motionValue$1) return;
					this.originPoint[axis] += delta[axis].translate;
					motionValue$1.set(motionValue$1.get() + delta[axis].translate);
				});
				this.visualElement.render();
			}
		}));
		return () => {
			stopResizeListener();
			stopPointerListener();
			stopMeasureLayoutListener();
			stopLayoutUpdateListener && stopLayoutUpdateListener();
		};
	}
	getProps() {
		const props = this.visualElement.getProps();
		const { drag: drag$1 = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true } = props;
		return {
			...props,
			drag: drag$1,
			dragDirectionLock,
			dragPropagation,
			dragConstraints,
			dragElastic,
			dragMomentum
		};
	}
};
function shouldDrag(direction, drag$1, currentDirection) {
	return (drag$1 === true || drag$1 === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset, lockThreshold = 10) {
	let direction = null;
	if (Math.abs(offset.y) > lockThreshold) direction = "y";
	else if (Math.abs(offset.x) > lockThreshold) direction = "x";
	return direction;
}
var DragGesture = class extends Feature {
	constructor(node) {
		super(node);
		this.removeGroupControls = noop;
		this.removeListeners = noop;
		this.controls = new VisualElementDragControls(node);
	}
	mount() {
		const { dragControls } = this.node.getProps();
		if (dragControls) this.removeGroupControls = dragControls.subscribe(this.controls);
		this.removeListeners = this.controls.addListeners() || noop;
	}
	unmount() {
		this.removeGroupControls();
		this.removeListeners();
	}
};
var asyncHandler = (handler) => (event, info) => {
	if (handler) frame.update(() => handler(event, info));
};
var PanGesture = class extends Feature {
	constructor() {
		super(...arguments);
		this.removePointerDownListener = noop;
	}
	onPointerDown(pointerDownEvent) {
		this.session = new PanSession(pointerDownEvent, this.createPanHandlers(), { transformPagePoint: this.node.getTransformPagePoint() });
	}
	createPanHandlers() {
		const { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
		return {
			onSessionStart: asyncHandler(onPanSessionStart),
			onStart: asyncHandler(onPanStart),
			onMove: onPan,
			onEnd: (event, info) => {
				delete this.session;
				if (onPanEnd) frame.update(() => onPanEnd(event, info));
			}
		};
	}
	mount() {
		this.removePointerDownListener = addPointerEvent(this.node.current, "pointerdown", (event) => this.onPointerDown(event));
	}
	update() {
		this.session && this.session.updateHandlers(this.createPanHandlers());
	}
	unmount() {
		this.removePointerDownListener();
		this.session && this.session.end();
	}
};
function usePresence() {
	const context = (0, import_react.useContext)(PresenceContext);
	if (context === null) return [true, null];
	const { isPresent, onExitComplete, register } = context;
	const id$2 = (0, import_react.useId)();
	(0, import_react.useEffect)(() => register(id$2), []);
	const safeToRemove = () => onExitComplete && onExitComplete(id$2);
	return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}
var globalProjectionState = {
	hasAnimatedSinceResize: true,
	hasEverUpdated: false
};
function pixelsToPercent(pixels, axis) {
	if (axis.max === axis.min) return 0;
	return pixels / (axis.max - axis.min) * 100;
}
var correctBorderRadius = { correct: (latest, node) => {
	if (!node.target) return latest;
	if (typeof latest === "string") if (px.test(latest)) latest = parseFloat(latest);
	else return latest;
	return `${pixelsToPercent(latest, node.target.x)}% ${pixelsToPercent(latest, node.target.y)}%`;
} };
var correctBoxShadow = { correct: (latest, { treeScale, projectionDelta }) => {
	const original = latest;
	const shadow = complex.parse(latest);
	if (shadow.length > 5) return original;
	const template = complex.createTransformer(latest);
	const offset = typeof shadow[0] !== "number" ? 1 : 0;
	const xScale = projectionDelta.x.scale * treeScale.x;
	const yScale = projectionDelta.y.scale * treeScale.y;
	shadow[0 + offset] /= xScale;
	shadow[1 + offset] /= yScale;
	const averageScale = mix(xScale, yScale, .5);
	if (typeof shadow[2 + offset] === "number") shadow[2 + offset] /= averageScale;
	if (typeof shadow[3 + offset] === "number") shadow[3 + offset] /= averageScale;
	return template(shadow);
} };
var MeasureLayoutWithContext = class extends import_react.Component {
	componentDidMount() {
		const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
		const { projection } = visualElement;
		addScaleCorrector(defaultScaleCorrectors);
		if (projection) {
			if (layoutGroup.group) layoutGroup.group.add(projection);
			if (switchLayoutGroup && switchLayoutGroup.register && layoutId) switchLayoutGroup.register(projection);
			projection.root.didUpdate();
			projection.addEventListener("animationComplete", () => {
				this.safeToRemove();
			});
			projection.setOptions({
				...projection.options,
				onExitComplete: () => this.safeToRemove()
			});
		}
		globalProjectionState.hasEverUpdated = true;
	}
	getSnapshotBeforeUpdate(prevProps) {
		const { layoutDependency, visualElement, drag: drag$1, isPresent } = this.props;
		const projection = visualElement.projection;
		if (!projection) return null;
		projection.isPresent = isPresent;
		if (drag$1 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0) projection.willUpdate();
		else this.safeToRemove();
		if (prevProps.isPresent !== isPresent) {
			if (isPresent) projection.promote();
			else if (!projection.relegate()) frame.postRender(() => {
				const stack = projection.getStack();
				if (!stack || !stack.members.length) this.safeToRemove();
			});
		}
		return null;
	}
	componentDidUpdate() {
		const { projection } = this.props.visualElement;
		if (projection) {
			projection.root.didUpdate();
			queueMicrotask(() => {
				if (!projection.currentAnimation && projection.isLead()) this.safeToRemove();
			});
		}
	}
	componentWillUnmount() {
		const { visualElement, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
		const { projection } = visualElement;
		if (projection) {
			projection.scheduleCheckAfterUnmount();
			if (layoutGroup && layoutGroup.group) layoutGroup.group.remove(projection);
			if (promoteContext && promoteContext.deregister) promoteContext.deregister(projection);
		}
	}
	safeToRemove() {
		const { safeToRemove } = this.props;
		safeToRemove && safeToRemove();
	}
	render() {
		return null;
	}
};
function MeasureLayout(props) {
	const [isPresent, safeToRemove] = usePresence();
	const layoutGroup = (0, import_react.useContext)(LayoutGroupContext);
	return import_react.createElement(MeasureLayoutWithContext, {
		...props,
		layoutGroup,
		switchLayoutGroup: (0, import_react.useContext)(SwitchLayoutGroupContext),
		isPresent,
		safeToRemove
	});
}
var defaultScaleCorrectors = {
	borderRadius: {
		...correctBorderRadius,
		applyTo: [
			"borderTopLeftRadius",
			"borderTopRightRadius",
			"borderBottomLeftRadius",
			"borderBottomRightRadius"
		]
	},
	borderTopLeftRadius: correctBorderRadius,
	borderTopRightRadius: correctBorderRadius,
	borderBottomLeftRadius: correctBorderRadius,
	borderBottomRightRadius: correctBorderRadius,
	boxShadow: correctBoxShadow
};
var borders = [
	"TopLeft",
	"TopRight",
	"BottomLeft",
	"BottomRight"
];
var numBorders = borders.length;
var asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
var isPx = (value) => typeof value === "number" || px.test(value);
function mixValues(target, follow, lead, progress$1, shouldCrossfadeOpacity, isOnlyMember) {
	if (shouldCrossfadeOpacity) {
		target.opacity = mix(0, lead.opacity !== void 0 ? lead.opacity : 1, easeCrossfadeIn(progress$1));
		target.opacityExit = mix(follow.opacity !== void 0 ? follow.opacity : 1, 0, easeCrossfadeOut(progress$1));
	} else if (isOnlyMember) target.opacity = mix(follow.opacity !== void 0 ? follow.opacity : 1, lead.opacity !== void 0 ? lead.opacity : 1, progress$1);
	for (let i = 0; i < numBorders; i++) {
		const borderLabel = `border${borders[i]}Radius`;
		let followRadius = getRadius(follow, borderLabel);
		let leadRadius = getRadius(lead, borderLabel);
		if (followRadius === void 0 && leadRadius === void 0) continue;
		followRadius || (followRadius = 0);
		leadRadius || (leadRadius = 0);
		if (followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius)) {
			target[borderLabel] = Math.max(mix(asNumber(followRadius), asNumber(leadRadius), progress$1), 0);
			if (percent.test(leadRadius) || percent.test(followRadius)) target[borderLabel] += "%";
		} else target[borderLabel] = leadRadius;
	}
	if (follow.rotate || lead.rotate) target.rotate = mix(follow.rotate || 0, lead.rotate || 0, progress$1);
}
function getRadius(values, radiusName) {
	return values[radiusName] !== void 0 ? values[radiusName] : values.borderRadius;
}
var easeCrossfadeIn = compress(0, .5, circOut);
var easeCrossfadeOut = compress(.5, .95, noop);
function compress(min, max, easing) {
	return (p) => {
		if (p < min) return 0;
		if (p > max) return 1;
		return easing(progress(min, max, p));
	};
}
function copyAxisInto(axis, originAxis) {
	axis.min = originAxis.min;
	axis.max = originAxis.max;
}
function copyBoxInto(box, originBox) {
	copyAxisInto(box.x, originBox.x);
	copyAxisInto(box.y, originBox.y);
}
function removePointDelta(point, translate, scale$1, originPoint, boxScale) {
	point -= translate;
	point = scalePoint(point, 1 / scale$1, originPoint);
	if (boxScale !== void 0) point = scalePoint(point, 1 / boxScale, originPoint);
	return point;
}
function removeAxisDelta(axis, translate = 0, scale$1 = 1, origin = .5, boxScale, originAxis = axis, sourceAxis = axis) {
	if (percent.test(translate)) {
		translate = parseFloat(translate);
		translate = mix(sourceAxis.min, sourceAxis.max, translate / 100) - sourceAxis.min;
	}
	if (typeof translate !== "number") return;
	let originPoint = mix(originAxis.min, originAxis.max, origin);
	if (axis === originAxis) originPoint -= translate;
	axis.min = removePointDelta(axis.min, translate, scale$1, originPoint, boxScale);
	axis.max = removePointDelta(axis.max, translate, scale$1, originPoint, boxScale);
}
function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
	removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
}
var xKeys = [
	"x",
	"scaleX",
	"originX"
];
var yKeys = [
	"y",
	"scaleY",
	"originY"
];
function removeBoxTransforms(box, transforms, originBox, sourceBox) {
	removeAxisTransforms(box.x, transforms, xKeys, originBox ? originBox.x : void 0, sourceBox ? sourceBox.x : void 0);
	removeAxisTransforms(box.y, transforms, yKeys, originBox ? originBox.y : void 0, sourceBox ? sourceBox.y : void 0);
}
function isAxisDeltaZero(delta) {
	return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
	return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function boxEquals(a, b) {
	return a.x.min === b.x.min && a.x.max === b.x.max && a.y.min === b.y.min && a.y.max === b.y.max;
}
function boxEqualsRounded(a, b) {
	return Math.round(a.x.min) === Math.round(b.x.min) && Math.round(a.x.max) === Math.round(b.x.max) && Math.round(a.y.min) === Math.round(b.y.min) && Math.round(a.y.max) === Math.round(b.y.max);
}
function aspectRatio(box) {
	return calcLength(box.x) / calcLength(box.y);
}
var NodeStack = class {
	constructor() {
		this.members = [];
	}
	add(node) {
		addUniqueItem(this.members, node);
		node.scheduleRender();
	}
	remove(node) {
		removeItem(this.members, node);
		if (node === this.prevLead) this.prevLead = void 0;
		if (node === this.lead) {
			const prevLead = this.members[this.members.length - 1];
			if (prevLead) this.promote(prevLead);
		}
	}
	relegate(node) {
		const indexOfNode = this.members.findIndex((member) => node === member);
		if (indexOfNode === 0) return false;
		let prevLead;
		for (let i = indexOfNode; i >= 0; i--) {
			const member = this.members[i];
			if (member.isPresent !== false) {
				prevLead = member;
				break;
			}
		}
		if (prevLead) {
			this.promote(prevLead);
			return true;
		} else return false;
	}
	promote(node, preserveFollowOpacity) {
		const prevLead = this.lead;
		if (node === prevLead) return;
		this.prevLead = prevLead;
		this.lead = node;
		node.show();
		if (prevLead) {
			prevLead.instance && prevLead.scheduleRender();
			node.scheduleRender();
			node.resumeFrom = prevLead;
			if (preserveFollowOpacity) node.resumeFrom.preserveOpacity = true;
			if (prevLead.snapshot) {
				node.snapshot = prevLead.snapshot;
				node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
			}
			if (node.root && node.root.isUpdating) node.isLayoutDirty = true;
			const { crossfade } = node.options;
			if (crossfade === false) prevLead.hide();
		}
	}
	exitAnimationComplete() {
		this.members.forEach((node) => {
			const { options, resumingFrom } = node;
			options.onExitComplete && options.onExitComplete();
			if (resumingFrom) resumingFrom.options.onExitComplete && resumingFrom.options.onExitComplete();
		});
	}
	scheduleRender() {
		this.members.forEach((node) => {
			node.instance && node.scheduleRender(false);
		});
	}
	removeLeadSnapshot() {
		if (this.lead && this.lead.snapshot) this.lead.snapshot = void 0;
	}
};
function buildProjectionTransform(delta, treeScale, latestTransform) {
	let transform = "";
	const xTranslate = delta.x.translate / treeScale.x;
	const yTranslate = delta.y.translate / treeScale.y;
	if (xTranslate || yTranslate) transform = `translate3d(${xTranslate}px, ${yTranslate}px, 0) `;
	if (treeScale.x !== 1 || treeScale.y !== 1) transform += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
	if (latestTransform) {
		const { rotate, rotateX, rotateY } = latestTransform;
		if (rotate) transform += `rotate(${rotate}deg) `;
		if (rotateX) transform += `rotateX(${rotateX}deg) `;
		if (rotateY) transform += `rotateY(${rotateY}deg) `;
	}
	const elementScaleX = delta.x.scale * treeScale.x;
	const elementScaleY = delta.y.scale * treeScale.y;
	if (elementScaleX !== 1 || elementScaleY !== 1) transform += `scale(${elementScaleX}, ${elementScaleY})`;
	return transform || "none";
}
var compareByDepth = (a, b) => a.depth - b.depth;
var FlatTree = class {
	constructor() {
		this.children = [];
		this.isDirty = false;
	}
	add(child) {
		addUniqueItem(this.children, child);
		this.isDirty = true;
	}
	remove(child) {
		removeItem(this.children, child);
		this.isDirty = true;
	}
	forEach(callback) {
		this.isDirty && this.children.sort(compareByDepth);
		this.isDirty = false;
		this.children.forEach(callback);
	}
};
function delay(callback, timeout) {
	const start = performance.now();
	const checkElapsed = ({ timestamp }) => {
		const elapsed = timestamp - start;
		if (elapsed >= timeout) {
			cancelFrame(checkElapsed);
			callback(elapsed - timeout);
		}
	};
	frame.read(checkElapsed, true);
	return () => cancelFrame(checkElapsed);
}
function record(data) {
	if (window.MotionDebug) window.MotionDebug.record(data);
}
function isSVGElement(element) {
	return element instanceof SVGElement && element.tagName !== "svg";
}
function animateSingleValue(value, keyframes$1, options) {
	const motionValue$1 = isMotionValue(value) ? value : motionValue(value);
	motionValue$1.start(animateMotionValue("", motionValue$1, keyframes$1, options));
	return motionValue$1.animation;
}
var transformAxes = [
	"",
	"X",
	"Y",
	"Z"
];
var animationTarget = 1e3;
var id = 0;
var projectionFrameData = {
	type: "projectionFrame",
	totalNodes: 0,
	resolvedTargetDeltas: 0,
	recalculatedProjection: 0
};
function createProjectionNode({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
	return class ProjectionNode {
		constructor(latestValues = {}, parent = defaultParent === null || defaultParent === void 0 ? void 0 : defaultParent()) {
			this.id = id++;
			this.animationId = 0;
			this.children = /* @__PURE__ */ new Set();
			this.options = {};
			this.isTreeAnimating = false;
			this.isAnimationBlocked = false;
			this.isLayoutDirty = false;
			this.isProjectionDirty = false;
			this.isSharedProjectionDirty = false;
			this.isTransformDirty = false;
			this.updateManuallyBlocked = false;
			this.updateBlockedByResize = false;
			this.isUpdating = false;
			this.isSVG = false;
			this.needsReset = false;
			this.shouldResetTransform = false;
			this.treeScale = {
				x: 1,
				y: 1
			};
			this.eventHandlers = /* @__PURE__ */ new Map();
			this.hasTreeAnimated = false;
			this.updateScheduled = false;
			this.checkUpdateFailed = () => {
				if (this.isUpdating) {
					this.isUpdating = false;
					this.clearAllSnapshots();
				}
			};
			this.updateProjection = () => {
				projectionFrameData.totalNodes = projectionFrameData.resolvedTargetDeltas = projectionFrameData.recalculatedProjection = 0;
				this.nodes.forEach(propagateDirtyNodes);
				this.nodes.forEach(resolveTargetDelta);
				this.nodes.forEach(calcProjection);
				this.nodes.forEach(cleanDirtyNodes);
				record(projectionFrameData);
			};
			this.hasProjected = false;
			this.isVisible = true;
			this.animationProgress = 0;
			this.sharedNodes = /* @__PURE__ */ new Map();
			this.latestValues = latestValues;
			this.root = parent ? parent.root || parent : this;
			this.path = parent ? [...parent.path, parent] : [];
			this.parent = parent;
			this.depth = parent ? parent.depth + 1 : 0;
			for (let i = 0; i < this.path.length; i++) this.path[i].shouldResetTransform = true;
			if (this.root === this) this.nodes = new FlatTree();
		}
		addEventListener(name, handler) {
			if (!this.eventHandlers.has(name)) this.eventHandlers.set(name, new SubscriptionManager());
			return this.eventHandlers.get(name).add(handler);
		}
		notifyListeners(name, ...args) {
			const subscriptionManager = this.eventHandlers.get(name);
			subscriptionManager && subscriptionManager.notify(...args);
		}
		hasListeners(name) {
			return this.eventHandlers.has(name);
		}
		mount(instance, isLayoutDirty = this.root.hasTreeAnimated) {
			if (this.instance) return;
			this.isSVG = isSVGElement(instance);
			this.instance = instance;
			const { layoutId, layout: layout$1, visualElement } = this.options;
			if (visualElement && !visualElement.current) visualElement.mount(instance);
			this.root.nodes.add(this);
			this.parent && this.parent.children.add(this);
			if (isLayoutDirty && (layout$1 || layoutId)) this.isLayoutDirty = true;
			if (attachResizeListener) {
				let cancelDelay;
				const resizeUnblockUpdate = () => this.root.updateBlockedByResize = false;
				attachResizeListener(instance, () => {
					this.root.updateBlockedByResize = true;
					cancelDelay && cancelDelay();
					cancelDelay = delay(resizeUnblockUpdate, 250);
					if (globalProjectionState.hasAnimatedSinceResize) {
						globalProjectionState.hasAnimatedSinceResize = false;
						this.nodes.forEach(finishAnimation);
					}
				});
			}
			if (layoutId) this.root.registerSharedNode(layoutId, this);
			if (this.options.animate !== false && visualElement && (layoutId || layout$1)) this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeTargetChanged, layout: newLayout }) => {
				if (this.isTreeAnimationBlocked()) {
					this.target = void 0;
					this.relativeTarget = void 0;
					return;
				}
				const layoutTransition = this.options.transition || visualElement.getDefaultTransition() || defaultLayoutTransition;
				const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
				const targetChanged = !this.targetLayout || !boxEqualsRounded(this.targetLayout, newLayout) || hasRelativeTargetChanged;
				const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeTargetChanged;
				if (this.options.layoutRoot || this.resumeFrom && this.resumeFrom.instance || hasOnlyRelativeTargetChanged || hasLayoutChanged && (targetChanged || !this.currentAnimation)) {
					if (this.resumeFrom) {
						this.resumingFrom = this.resumeFrom;
						this.resumingFrom.resumingFrom = void 0;
					}
					this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
					const animationOptions = {
						...getValueTransition(layoutTransition, "layout"),
						onPlay: onLayoutAnimationStart,
						onComplete: onLayoutAnimationComplete
					};
					if (visualElement.shouldReduceMotion || this.options.layoutRoot) {
						animationOptions.delay = 0;
						animationOptions.type = false;
					}
					this.startAnimation(animationOptions);
				} else {
					if (!hasLayoutChanged) finishAnimation(this);
					if (this.isLead() && this.options.onExitComplete) this.options.onExitComplete();
				}
				this.targetLayout = newLayout;
			});
		}
		unmount() {
			this.options.layoutId && this.willUpdate();
			this.root.nodes.remove(this);
			const stack = this.getStack();
			stack && stack.remove(this);
			this.parent && this.parent.children.delete(this);
			this.instance = void 0;
			cancelFrame(this.updateProjection);
		}
		blockUpdate() {
			this.updateManuallyBlocked = true;
		}
		unblockUpdate() {
			this.updateManuallyBlocked = false;
		}
		isUpdateBlocked() {
			return this.updateManuallyBlocked || this.updateBlockedByResize;
		}
		isTreeAnimationBlocked() {
			return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
		}
		startUpdate() {
			if (this.isUpdateBlocked()) return;
			this.isUpdating = true;
			this.nodes && this.nodes.forEach(resetRotation);
			this.animationId++;
		}
		getTransformTemplate() {
			const { visualElement } = this.options;
			return visualElement && visualElement.getProps().transformTemplate;
		}
		willUpdate(shouldNotifyListeners = true) {
			this.root.hasTreeAnimated = true;
			if (this.root.isUpdateBlocked()) {
				this.options.onExitComplete && this.options.onExitComplete();
				return;
			}
			!this.root.isUpdating && this.root.startUpdate();
			if (this.isLayoutDirty) return;
			this.isLayoutDirty = true;
			for (let i = 0; i < this.path.length; i++) {
				const node = this.path[i];
				node.shouldResetTransform = true;
				node.updateScroll("snapshot");
				if (node.options.layoutRoot) node.willUpdate(false);
			}
			const { layoutId, layout: layout$1 } = this.options;
			if (layoutId === void 0 && !layout$1) return;
			const transformTemplate = this.getTransformTemplate();
			this.prevTransformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
			this.updateSnapshot();
			shouldNotifyListeners && this.notifyListeners("willUpdate");
		}
		update() {
			this.updateScheduled = false;
			if (this.isUpdateBlocked()) {
				this.unblockUpdate();
				this.clearAllSnapshots();
				this.nodes.forEach(clearMeasurements);
				return;
			}
			if (!this.isUpdating) this.nodes.forEach(clearIsLayoutDirty);
			this.isUpdating = false;
			this.nodes.forEach(resetTransformStyle);
			this.nodes.forEach(updateLayout);
			this.nodes.forEach(notifyLayoutUpdate);
			this.clearAllSnapshots();
			const now = performance.now();
			frameData.delta = clamp(0, 1e3 / 60, now - frameData.timestamp);
			frameData.timestamp = now;
			frameData.isProcessing = true;
			steps.update.process(frameData);
			steps.preRender.process(frameData);
			steps.render.process(frameData);
			frameData.isProcessing = false;
		}
		didUpdate() {
			if (!this.updateScheduled) {
				this.updateScheduled = true;
				queueMicrotask(() => this.update());
			}
		}
		clearAllSnapshots() {
			this.nodes.forEach(clearSnapshot);
			this.sharedNodes.forEach(removeLeadSnapshots);
		}
		scheduleUpdateProjection() {
			frame.preRender(this.updateProjection, false, true);
		}
		scheduleCheckAfterUnmount() {
			frame.postRender(() => {
				if (this.isLayoutDirty) this.root.didUpdate();
				else this.root.checkUpdateFailed();
			});
		}
		updateSnapshot() {
			if (this.snapshot || !this.instance) return;
			this.snapshot = this.measure();
		}
		updateLayout() {
			if (!this.instance) return;
			this.updateScroll();
			if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) return;
			if (this.resumeFrom && !this.resumeFrom.instance) for (let i = 0; i < this.path.length; i++) this.path[i].updateScroll();
			const prevLayout = this.layout;
			this.layout = this.measure(false);
			this.layoutCorrected = createBox();
			this.isLayoutDirty = false;
			this.projectionDelta = void 0;
			this.notifyListeners("measure", this.layout.layoutBox);
			const { visualElement } = this.options;
			visualElement && visualElement.notify("LayoutMeasure", this.layout.layoutBox, prevLayout ? prevLayout.layoutBox : void 0);
		}
		updateScroll(phase = "measure") {
			let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
			if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === phase) needsMeasurement = false;
			if (needsMeasurement) this.scroll = {
				animationId: this.root.animationId,
				phase,
				isRoot: checkIsScrollRoot(this.instance),
				offset: measureScroll(this.instance)
			};
		}
		resetTransform() {
			if (!resetTransform) return;
			const isResetRequested = this.isLayoutDirty || this.shouldResetTransform;
			const hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
			const transformTemplate = this.getTransformTemplate();
			const transformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
			const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
			if (isResetRequested && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
				resetTransform(this.instance, transformTemplateValue);
				this.shouldResetTransform = false;
				this.scheduleRender();
			}
		}
		measure(removeTransform = true) {
			const pageBox = this.measurePageBox();
			let layoutBox = this.removeElementScroll(pageBox);
			if (removeTransform) layoutBox = this.removeTransform(layoutBox);
			roundBox(layoutBox);
			return {
				animationId: this.root.animationId,
				measuredBox: pageBox,
				layoutBox,
				latestValues: {},
				source: this.id
			};
		}
		measurePageBox() {
			const { visualElement } = this.options;
			if (!visualElement) return createBox();
			const box = visualElement.measureViewportBox();
			const { scroll } = this.root;
			if (scroll) {
				translateAxis(box.x, scroll.offset.x);
				translateAxis(box.y, scroll.offset.y);
			}
			return box;
		}
		removeElementScroll(box) {
			const boxWithoutScroll = createBox();
			copyBoxInto(boxWithoutScroll, box);
			for (let i = 0; i < this.path.length; i++) {
				const node = this.path[i];
				const { scroll, options } = node;
				if (node !== this.root && scroll && options.layoutScroll) {
					if (scroll.isRoot) {
						copyBoxInto(boxWithoutScroll, box);
						const { scroll: rootScroll } = this.root;
						if (rootScroll) {
							translateAxis(boxWithoutScroll.x, -rootScroll.offset.x);
							translateAxis(boxWithoutScroll.y, -rootScroll.offset.y);
						}
					}
					translateAxis(boxWithoutScroll.x, scroll.offset.x);
					translateAxis(boxWithoutScroll.y, scroll.offset.y);
				}
			}
			return boxWithoutScroll;
		}
		applyTransform(box, transformOnly = false) {
			const withTransforms = createBox();
			copyBoxInto(withTransforms, box);
			for (let i = 0; i < this.path.length; i++) {
				const node = this.path[i];
				if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) transformBox(withTransforms, {
					x: -node.scroll.offset.x,
					y: -node.scroll.offset.y
				});
				if (!hasTransform(node.latestValues)) continue;
				transformBox(withTransforms, node.latestValues);
			}
			if (hasTransform(this.latestValues)) transformBox(withTransforms, this.latestValues);
			return withTransforms;
		}
		removeTransform(box) {
			const boxWithoutTransform = createBox();
			copyBoxInto(boxWithoutTransform, box);
			for (let i = 0; i < this.path.length; i++) {
				const node = this.path[i];
				if (!node.instance) continue;
				if (!hasTransform(node.latestValues)) continue;
				hasScale(node.latestValues) && node.updateSnapshot();
				const sourceBox = createBox();
				copyBoxInto(sourceBox, node.measurePageBox());
				removeBoxTransforms(boxWithoutTransform, node.latestValues, node.snapshot ? node.snapshot.layoutBox : void 0, sourceBox);
			}
			if (hasTransform(this.latestValues)) removeBoxTransforms(boxWithoutTransform, this.latestValues);
			return boxWithoutTransform;
		}
		setTargetDelta(delta) {
			this.targetDelta = delta;
			this.root.scheduleUpdateProjection();
			this.isProjectionDirty = true;
		}
		setOptions(options) {
			this.options = {
				...this.options,
				...options,
				crossfade: options.crossfade !== void 0 ? options.crossfade : true
			};
		}
		clearMeasurements() {
			this.scroll = void 0;
			this.layout = void 0;
			this.snapshot = void 0;
			this.prevTransformTemplateValue = void 0;
			this.targetDelta = void 0;
			this.target = void 0;
			this.isLayoutDirty = false;
		}
		forceRelativeParentToResolveTarget() {
			if (!this.relativeParent) return;
			if (this.relativeParent.resolvedRelativeTargetAt !== frameData.timestamp) this.relativeParent.resolveTargetDelta(true);
		}
		resolveTargetDelta(forceRecalculation = false) {
			var _a;
			const lead = this.getLead();
			this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
			this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
			this.isSharedProjectionDirty || (this.isSharedProjectionDirty = lead.isSharedProjectionDirty);
			const isShared = Boolean(this.resumingFrom) || this !== lead;
			if (!(forceRecalculation || isShared && this.isSharedProjectionDirty || this.isProjectionDirty || ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isProjectionDirty) || this.attemptToResolveRelativeTarget)) return;
			const { layout: layout$1, layoutId } = this.options;
			if (!this.layout || !(layout$1 || layoutId)) return;
			this.resolvedRelativeTargetAt = frameData.timestamp;
			if (!this.targetDelta && !this.relativeTarget) {
				const relativeParent = this.getClosestProjectingParent();
				if (relativeParent && relativeParent.layout && this.animationProgress !== 1) {
					this.relativeParent = relativeParent;
					this.forceRelativeParentToResolveTarget();
					this.relativeTarget = createBox();
					this.relativeTargetOrigin = createBox();
					calcRelativePosition(this.relativeTargetOrigin, this.layout.layoutBox, relativeParent.layout.layoutBox);
					copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
				} else this.relativeParent = this.relativeTarget = void 0;
			}
			if (!this.relativeTarget && !this.targetDelta) return;
			if (!this.target) {
				this.target = createBox();
				this.targetWithTransforms = createBox();
			}
			if (this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
				this.forceRelativeParentToResolveTarget();
				calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
			} else if (this.targetDelta) {
				if (Boolean(this.resumingFrom)) this.target = this.applyTransform(this.layout.layoutBox);
				else copyBoxInto(this.target, this.layout.layoutBox);
				applyBoxDelta(this.target, this.targetDelta);
			} else copyBoxInto(this.target, this.layout.layoutBox);
			if (this.attemptToResolveRelativeTarget) {
				this.attemptToResolveRelativeTarget = false;
				const relativeParent = this.getClosestProjectingParent();
				if (relativeParent && Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !relativeParent.options.layoutScroll && relativeParent.target && this.animationProgress !== 1) {
					this.relativeParent = relativeParent;
					this.forceRelativeParentToResolveTarget();
					this.relativeTarget = createBox();
					this.relativeTargetOrigin = createBox();
					calcRelativePosition(this.relativeTargetOrigin, this.target, relativeParent.target);
					copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
				} else this.relativeParent = this.relativeTarget = void 0;
			}
			projectionFrameData.resolvedTargetDeltas++;
		}
		getClosestProjectingParent() {
			if (!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues)) return;
			if (this.parent.isProjecting()) return this.parent;
			else return this.parent.getClosestProjectingParent();
		}
		isProjecting() {
			return Boolean((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
		}
		calcProjection() {
			var _a;
			const lead = this.getLead();
			const isShared = Boolean(this.resumingFrom) || this !== lead;
			let canSkip = true;
			if (this.isProjectionDirty || ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isProjectionDirty)) canSkip = false;
			if (isShared && (this.isSharedProjectionDirty || this.isTransformDirty)) canSkip = false;
			if (this.resolvedRelativeTargetAt === frameData.timestamp) canSkip = false;
			if (canSkip) return;
			const { layout: layout$1, layoutId } = this.options;
			this.isTreeAnimating = Boolean(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation);
			if (!this.isTreeAnimating) this.targetDelta = this.relativeTarget = void 0;
			if (!this.layout || !(layout$1 || layoutId)) return;
			copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
			const prevTreeScaleX = this.treeScale.x;
			const prevTreeScaleY = this.treeScale.y;
			applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, isShared);
			if (lead.layout && !lead.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1)) lead.target = lead.layout.layoutBox;
			const { target } = lead;
			if (!target) {
				if (this.projectionTransform) {
					this.projectionDelta = createDelta();
					this.projectionTransform = "none";
					this.scheduleRender();
				}
				return;
			}
			if (!this.projectionDelta) {
				this.projectionDelta = createDelta();
				this.projectionDeltaWithTransform = createDelta();
			}
			const prevProjectionTransform = this.projectionTransform;
			calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
			this.projectionTransform = buildProjectionTransform(this.projectionDelta, this.treeScale);
			if (this.projectionTransform !== prevProjectionTransform || this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY) {
				this.hasProjected = true;
				this.scheduleRender();
				this.notifyListeners("projectionUpdate", target);
			}
			projectionFrameData.recalculatedProjection++;
		}
		hide() {
			this.isVisible = false;
		}
		show() {
			this.isVisible = true;
		}
		scheduleRender(notifyAll = true) {
			this.options.scheduleRender && this.options.scheduleRender();
			if (notifyAll) {
				const stack = this.getStack();
				stack && stack.scheduleRender();
			}
			if (this.resumingFrom && !this.resumingFrom.instance) this.resumingFrom = void 0;
		}
		setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false) {
			const snapshot = this.snapshot;
			const snapshotLatestValues = snapshot ? snapshot.latestValues : {};
			const mixedValues = { ...this.latestValues };
			const targetDelta = createDelta();
			if (!this.relativeParent || !this.relativeParent.options.layoutRoot) this.relativeTarget = this.relativeTargetOrigin = void 0;
			this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
			const relativeLayout = createBox();
			const isSharedLayoutAnimation = (snapshot ? snapshot.source : void 0) !== (this.layout ? this.layout.source : void 0);
			const stack = this.getStack();
			const isOnlyMember = !stack || stack.members.length <= 1;
			const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
			this.animationProgress = 0;
			let prevRelativeTarget;
			this.mixTargetDelta = (latest) => {
				const progress$1 = latest / 1e3;
				mixAxisDelta(targetDelta.x, delta.x, progress$1);
				mixAxisDelta(targetDelta.y, delta.y, progress$1);
				this.setTargetDelta(targetDelta);
				if (this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
					calcRelativePosition(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox);
					mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress$1);
					if (prevRelativeTarget && boxEquals(this.relativeTarget, prevRelativeTarget)) this.isProjectionDirty = false;
					if (!prevRelativeTarget) prevRelativeTarget = createBox();
					copyBoxInto(prevRelativeTarget, this.relativeTarget);
				}
				if (isSharedLayoutAnimation) {
					this.animationValues = mixedValues;
					mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress$1, shouldCrossfadeOpacity, isOnlyMember);
				}
				this.root.scheduleUpdateProjection();
				this.scheduleRender();
				this.animationProgress = progress$1;
			};
			this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
		}
		startAnimation(options) {
			this.notifyListeners("animationStart");
			this.currentAnimation && this.currentAnimation.stop();
			if (this.resumingFrom && this.resumingFrom.currentAnimation) this.resumingFrom.currentAnimation.stop();
			if (this.pendingAnimation) {
				cancelFrame(this.pendingAnimation);
				this.pendingAnimation = void 0;
			}
			this.pendingAnimation = frame.update(() => {
				globalProjectionState.hasAnimatedSinceResize = true;
				this.currentAnimation = animateSingleValue(0, animationTarget, {
					...options,
					onUpdate: (latest) => {
						this.mixTargetDelta(latest);
						options.onUpdate && options.onUpdate(latest);
					},
					onComplete: () => {
						options.onComplete && options.onComplete();
						this.completeAnimation();
					}
				});
				if (this.resumingFrom) this.resumingFrom.currentAnimation = this.currentAnimation;
				this.pendingAnimation = void 0;
			});
		}
		completeAnimation() {
			if (this.resumingFrom) {
				this.resumingFrom.currentAnimation = void 0;
				this.resumingFrom.preserveOpacity = void 0;
			}
			const stack = this.getStack();
			stack && stack.exitAnimationComplete();
			this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
			this.notifyListeners("animationComplete");
		}
		finishAnimation() {
			if (this.currentAnimation) {
				this.mixTargetDelta && this.mixTargetDelta(animationTarget);
				this.currentAnimation.stop();
			}
			this.completeAnimation();
		}
		applyTransformsToTarget() {
			const lead = this.getLead();
			let { targetWithTransforms, target, layout: layout$1, latestValues } = lead;
			if (!targetWithTransforms || !target || !layout$1) return;
			if (this !== lead && this.layout && layout$1 && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout$1.layoutBox)) {
				target = this.target || createBox();
				const xLength = calcLength(this.layout.layoutBox.x);
				target.x.min = lead.target.x.min;
				target.x.max = target.x.min + xLength;
				const yLength = calcLength(this.layout.layoutBox.y);
				target.y.min = lead.target.y.min;
				target.y.max = target.y.min + yLength;
			}
			copyBoxInto(targetWithTransforms, target);
			transformBox(targetWithTransforms, latestValues);
			calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
		}
		registerSharedNode(layoutId, node) {
			if (!this.sharedNodes.has(layoutId)) this.sharedNodes.set(layoutId, new NodeStack());
			this.sharedNodes.get(layoutId).add(node);
			const config = node.options.initialPromotionConfig;
			node.promote({
				transition: config ? config.transition : void 0,
				preserveFollowOpacity: config && config.shouldPreserveFollowOpacity ? config.shouldPreserveFollowOpacity(node) : void 0
			});
		}
		isLead() {
			const stack = this.getStack();
			return stack ? stack.lead === this : true;
		}
		getLead() {
			var _a;
			const { layoutId } = this.options;
			return layoutId ? ((_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.lead) || this : this;
		}
		getPrevLead() {
			var _a;
			const { layoutId } = this.options;
			return layoutId ? (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.prevLead : void 0;
		}
		getStack() {
			const { layoutId } = this.options;
			if (layoutId) return this.root.sharedNodes.get(layoutId);
		}
		promote({ needsReset, transition, preserveFollowOpacity } = {}) {
			const stack = this.getStack();
			if (stack) stack.promote(this, preserveFollowOpacity);
			if (needsReset) {
				this.projectionDelta = void 0;
				this.needsReset = true;
			}
			if (transition) this.setOptions({ transition });
		}
		relegate() {
			const stack = this.getStack();
			if (stack) return stack.relegate(this);
			else return false;
		}
		resetRotation() {
			const { visualElement } = this.options;
			if (!visualElement) return;
			let hasRotate = false;
			const { latestValues } = visualElement;
			if (latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.rotateZ) hasRotate = true;
			if (!hasRotate) return;
			const resetValues = {};
			for (let i = 0; i < transformAxes.length; i++) {
				const key = "rotate" + transformAxes[i];
				if (latestValues[key]) {
					resetValues[key] = latestValues[key];
					visualElement.setStaticValue(key, 0);
				}
			}
			visualElement.render();
			for (const key in resetValues) visualElement.setStaticValue(key, resetValues[key]);
			visualElement.scheduleRender();
		}
		getProjectionStyles(styleProp = {}) {
			var _a, _b;
			const styles = {};
			if (!this.instance || this.isSVG) return styles;
			if (!this.isVisible) return { visibility: "hidden" };
			else styles.visibility = "";
			const transformTemplate = this.getTransformTemplate();
			if (this.needsReset) {
				this.needsReset = false;
				styles.opacity = "";
				styles.pointerEvents = resolveMotionValue(styleProp.pointerEvents) || "";
				styles.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
				return styles;
			}
			const lead = this.getLead();
			if (!this.projectionDelta || !this.layout || !lead.target) {
				const emptyStyles = {};
				if (this.options.layoutId) {
					emptyStyles.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1;
					emptyStyles.pointerEvents = resolveMotionValue(styleProp.pointerEvents) || "";
				}
				if (this.hasProjected && !hasTransform(this.latestValues)) {
					emptyStyles.transform = transformTemplate ? transformTemplate({}, "") : "none";
					this.hasProjected = false;
				}
				return emptyStyles;
			}
			const valuesToRender = lead.animationValues || lead.latestValues;
			this.applyTransformsToTarget();
			styles.transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
			if (transformTemplate) styles.transform = transformTemplate(valuesToRender, styles.transform);
			const { x, y } = this.projectionDelta;
			styles.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`;
			if (lead.animationValues) styles.opacity = lead === this ? (_b = (_a = valuesToRender.opacity) !== null && _a !== void 0 ? _a : this.latestValues.opacity) !== null && _b !== void 0 ? _b : 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
			else styles.opacity = lead === this ? valuesToRender.opacity !== void 0 ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== void 0 ? valuesToRender.opacityExit : 0;
			for (const key in scaleCorrectors) {
				if (valuesToRender[key] === void 0) continue;
				const { correct, applyTo } = scaleCorrectors[key];
				const corrected = styles.transform === "none" ? valuesToRender[key] : correct(valuesToRender[key], lead);
				if (applyTo) {
					const num = applyTo.length;
					for (let i = 0; i < num; i++) styles[applyTo[i]] = corrected;
				} else styles[key] = corrected;
			}
			if (this.options.layoutId) styles.pointerEvents = lead === this ? resolveMotionValue(styleProp.pointerEvents) || "" : "none";
			return styles;
		}
		clearSnapshot() {
			this.resumeFrom = this.snapshot = void 0;
		}
		resetTree() {
			this.root.nodes.forEach((node) => {
				var _a;
				return (_a = node.currentAnimation) === null || _a === void 0 ? void 0 : _a.stop();
			});
			this.root.nodes.forEach(clearMeasurements);
			this.root.sharedNodes.clear();
		}
	};
}
function updateLayout(node) {
	node.updateLayout();
}
function notifyLayoutUpdate(node) {
	var _a;
	const snapshot = ((_a = node.resumeFrom) === null || _a === void 0 ? void 0 : _a.snapshot) || node.snapshot;
	if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
		const { layoutBox: layout$1, measuredBox: measuredLayout } = node.layout;
		const { animationType } = node.options;
		const isShared = snapshot.source !== node.layout.source;
		if (animationType === "size") eachAxis((axis) => {
			const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
			const length = calcLength(axisSnapshot);
			axisSnapshot.min = layout$1[axis].min;
			axisSnapshot.max = axisSnapshot.min + length;
		});
		else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout$1)) eachAxis((axis) => {
			const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
			const length = calcLength(layout$1[axis]);
			axisSnapshot.max = axisSnapshot.min + length;
			if (node.relativeTarget && !node.currentAnimation) {
				node.isProjectionDirty = true;
				node.relativeTarget[axis].max = node.relativeTarget[axis].min + length;
			}
		});
		const layoutDelta = createDelta();
		calcBoxDelta(layoutDelta, layout$1, snapshot.layoutBox);
		const visualDelta = createDelta();
		if (isShared) calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
		else calcBoxDelta(visualDelta, layout$1, snapshot.layoutBox);
		const hasLayoutChanged = !isDeltaZero(layoutDelta);
		let hasRelativeTargetChanged = false;
		if (!node.resumeFrom) {
			const relativeParent = node.getClosestProjectingParent();
			if (relativeParent && !relativeParent.resumeFrom) {
				const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
				if (parentSnapshot && parentLayout) {
					const relativeSnapshot = createBox();
					calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
					const relativeLayout = createBox();
					calcRelativePosition(relativeLayout, layout$1, parentLayout.layoutBox);
					if (!boxEqualsRounded(relativeSnapshot, relativeLayout)) hasRelativeTargetChanged = true;
					if (relativeParent.options.layoutRoot) {
						node.relativeTarget = relativeLayout;
						node.relativeTargetOrigin = relativeSnapshot;
						node.relativeParent = relativeParent;
					}
				}
			}
		}
		node.notifyListeners("didUpdate", {
			layout: layout$1,
			snapshot,
			delta: visualDelta,
			layoutDelta,
			hasLayoutChanged,
			hasRelativeTargetChanged
		});
	} else if (node.isLead()) {
		const { onExitComplete } = node.options;
		onExitComplete && onExitComplete();
	}
	node.options.transition = void 0;
}
function propagateDirtyNodes(node) {
	projectionFrameData.totalNodes++;
	if (!node.parent) return;
	if (!node.isProjecting()) node.isProjectionDirty = node.parent.isProjectionDirty;
	node.isSharedProjectionDirty || (node.isSharedProjectionDirty = Boolean(node.isProjectionDirty || node.parent.isProjectionDirty || node.parent.isSharedProjectionDirty));
	node.isTransformDirty || (node.isTransformDirty = node.parent.isTransformDirty);
}
function cleanDirtyNodes(node) {
	node.isProjectionDirty = node.isSharedProjectionDirty = node.isTransformDirty = false;
}
function clearSnapshot(node) {
	node.clearSnapshot();
}
function clearMeasurements(node) {
	node.clearMeasurements();
}
function clearIsLayoutDirty(node) {
	node.isLayoutDirty = false;
}
function resetTransformStyle(node) {
	const { visualElement } = node.options;
	if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) visualElement.notify("BeforeLayoutMeasure");
	node.resetTransform();
}
function finishAnimation(node) {
	node.finishAnimation();
	node.targetDelta = node.relativeTarget = node.target = void 0;
	node.isProjectionDirty = true;
}
function resolveTargetDelta(node) {
	node.resolveTargetDelta();
}
function calcProjection(node) {
	node.calcProjection();
}
function resetRotation(node) {
	node.resetRotation();
}
function removeLeadSnapshots(stack) {
	stack.removeLeadSnapshot();
}
function mixAxisDelta(output, delta, p) {
	output.translate = mix(delta.translate, 0, p);
	output.scale = mix(delta.scale, 1, p);
	output.origin = delta.origin;
	output.originPoint = delta.originPoint;
}
function mixAxis(output, from, to, p) {
	output.min = mix(from.min, to.min, p);
	output.max = mix(from.max, to.max, p);
}
function mixBox(output, from, to, p) {
	mixAxis(output.x, from.x, to.x, p);
	mixAxis(output.y, from.y, to.y, p);
}
function hasOpacityCrossfade(node) {
	return node.animationValues && node.animationValues.opacityExit !== void 0;
}
var defaultLayoutTransition = {
	duration: .45,
	ease: [
		.4,
		0,
		.1,
		1
	]
};
var userAgentContains = (string) => typeof navigator !== "undefined" && navigator.userAgent.toLowerCase().includes(string);
var roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/") ? Math.round : noop;
function roundAxis(axis) {
	axis.min = roundPoint(axis.min);
	axis.max = roundPoint(axis.max);
}
function roundBox(box) {
	roundAxis(box.x);
	roundAxis(box.y);
}
function shouldAnimatePositionOnly(animationType, snapshot, layout$1) {
	return animationType === "position" || animationType === "preserve-aspect" && !isNear(aspectRatio(snapshot), aspectRatio(layout$1), .2);
}
var DocumentProjectionNode = createProjectionNode({
	attachResizeListener: (ref, notify) => addDomEvent(ref, "resize", notify),
	measureScroll: () => ({
		x: document.documentElement.scrollLeft || document.body.scrollLeft,
		y: document.documentElement.scrollTop || document.body.scrollTop
	}),
	checkIsScrollRoot: () => true
});
var rootProjectionNode = { current: void 0 };
var HTMLProjectionNode = createProjectionNode({
	measureScroll: (instance) => ({
		x: instance.scrollLeft,
		y: instance.scrollTop
	}),
	defaultParent: () => {
		if (!rootProjectionNode.current) {
			const documentNode = new DocumentProjectionNode({});
			documentNode.mount(window);
			documentNode.setOptions({ layoutScroll: true });
			rootProjectionNode.current = documentNode;
		}
		return rootProjectionNode.current;
	},
	resetTransform: (instance, value) => {
		instance.style.transform = value !== void 0 ? value : "none";
	},
	checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed")
});
var drag = {
	pan: { Feature: PanGesture },
	drag: {
		Feature: DragGesture,
		ProjectionNode: HTMLProjectionNode,
		MeasureLayout
	}
};
var splitCSSVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function parseCSSVariable(current) {
	const match = splitCSSVariableRegex.exec(current);
	if (!match) return [,];
	const [, token, fallback] = match;
	return [token, fallback];
}
var maxDepth = 4;
function getVariableValue(current, element, depth = 1) {
	invariant(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`);
	const [token, fallback] = parseCSSVariable(current);
	if (!token) return;
	const resolved = window.getComputedStyle(element).getPropertyValue(token);
	if (resolved) return resolved.trim();
	else if (isCSSVariableToken(fallback)) return getVariableValue(fallback, element, depth + 1);
	else return fallback;
}
function resolveCSSVariables(visualElement, { ...target }, transitionEnd) {
	const element = visualElement.current;
	if (!(element instanceof Element)) return {
		target,
		transitionEnd
	};
	if (transitionEnd) transitionEnd = { ...transitionEnd };
	visualElement.values.forEach((value) => {
		const current = value.get();
		if (!isCSSVariableToken(current)) return;
		const resolved = getVariableValue(current, element);
		if (resolved) value.set(resolved);
	});
	for (const key in target) {
		const current = target[key];
		if (!isCSSVariableToken(current)) continue;
		const resolved = getVariableValue(current, element);
		if (!resolved) continue;
		target[key] = resolved;
		if (!transitionEnd) transitionEnd = {};
		if (transitionEnd[key] === void 0) transitionEnd[key] = current;
	}
	return {
		target,
		transitionEnd
	};
}
var positionalKeys = new Set([
	"width",
	"height",
	"top",
	"left",
	"right",
	"bottom",
	"x",
	"y",
	"translateX",
	"translateY"
]);
var isPositionalKey = (key) => positionalKeys.has(key);
var hasPositionalKey = (target) => {
	return Object.keys(target).some(isPositionalKey);
};
var isNumOrPxType = (v) => v === number || v === px;
var getPosFromMatrix = (matrix, pos) => parseFloat(matrix.split(", ")[pos]);
var getTranslateFromMatrix = (pos2, pos3) => (_bbox, { transform }) => {
	if (transform === "none" || !transform) return 0;
	const matrix3d = transform.match(/^matrix3d\((.+)\)$/);
	if (matrix3d) return getPosFromMatrix(matrix3d[1], pos3);
	else {
		const matrix = transform.match(/^matrix\((.+)\)$/);
		if (matrix) return getPosFromMatrix(matrix[1], pos2);
		else return 0;
	}
};
var transformKeys = new Set([
	"x",
	"y",
	"z"
]);
var nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
	const removedTransforms = [];
	nonTranslationalTransformKeys.forEach((key) => {
		const value = visualElement.getValue(key);
		if (value !== void 0) {
			removedTransforms.push([key, value.get()]);
			value.set(key.startsWith("scale") ? 1 : 0);
		}
	});
	if (removedTransforms.length) visualElement.render();
	return removedTransforms;
}
var positionalValues = {
	width: ({ x }, { paddingLeft = "0", paddingRight = "0" }) => x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
	height: ({ y }, { paddingTop = "0", paddingBottom = "0" }) => y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
	top: (_bbox, { top }) => parseFloat(top),
	left: (_bbox, { left }) => parseFloat(left),
	bottom: ({ y }, { top }) => parseFloat(top) + (y.max - y.min),
	right: ({ x }, { left }) => parseFloat(left) + (x.max - x.min),
	x: getTranslateFromMatrix(4, 13),
	y: getTranslateFromMatrix(5, 14)
};
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;
var convertChangedValueTypes = (target, visualElement, changedKeys) => {
	const originBbox = visualElement.measureViewportBox();
	const element = visualElement.current;
	const elementComputedStyle = getComputedStyle(element);
	const { display } = elementComputedStyle;
	const origin = {};
	if (display === "none") visualElement.setStaticValue("display", target.display || "block");
	changedKeys.forEach((key) => {
		origin[key] = positionalValues[key](originBbox, elementComputedStyle);
	});
	visualElement.render();
	const targetBbox = visualElement.measureViewportBox();
	changedKeys.forEach((key) => {
		const value = visualElement.getValue(key);
		value && value.jump(origin[key]);
		target[key] = positionalValues[key](targetBbox, elementComputedStyle);
	});
	return target;
};
var checkAndConvertChangedValueTypes = (visualElement, target, origin = {}, transitionEnd = {}) => {
	target = { ...target };
	transitionEnd = { ...transitionEnd };
	const targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
	let removedTransformValues = [];
	let hasAttemptedToRemoveTransformValues = false;
	const changedValueTypeKeys = [];
	targetPositionalKeys.forEach((key) => {
		const value = visualElement.getValue(key);
		if (!visualElement.hasValue(key)) return;
		let from = origin[key];
		let fromType = findDimensionValueType(from);
		const to = target[key];
		let toType;
		if (isKeyframesTarget(to)) {
			const numKeyframes = to.length;
			const fromIndex = to[0] === null ? 1 : 0;
			from = to[fromIndex];
			fromType = findDimensionValueType(from);
			for (let i = fromIndex; i < numKeyframes; i++) {
				if (to[i] === null) break;
				if (!toType) {
					toType = findDimensionValueType(to[i]);
					invariant(toType === fromType || isNumOrPxType(fromType) && isNumOrPxType(toType), "Keyframes must be of the same dimension as the current value");
				} else invariant(findDimensionValueType(to[i]) === toType, "All keyframes must be of the same type");
			}
		} else toType = findDimensionValueType(to);
		if (fromType !== toType) if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
			const current = value.get();
			if (typeof current === "string") value.set(parseFloat(current));
			if (typeof to === "string") target[key] = parseFloat(to);
			else if (Array.isArray(to) && toType === px) target[key] = to.map(parseFloat);
		} else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) && (toType === null || toType === void 0 ? void 0 : toType.transform) && (from === 0 || to === 0)) if (from === 0) value.set(toType.transform(from));
		else target[key] = fromType.transform(to);
		else {
			if (!hasAttemptedToRemoveTransformValues) {
				removedTransformValues = removeNonTranslationalTransform(visualElement);
				hasAttemptedToRemoveTransformValues = true;
			}
			changedValueTypeKeys.push(key);
			transitionEnd[key] = transitionEnd[key] !== void 0 ? transitionEnd[key] : target[key];
			value.jump(to);
		}
	});
	if (changedValueTypeKeys.length) {
		const scrollY = changedValueTypeKeys.indexOf("height") >= 0 ? window.pageYOffset : null;
		const convertedTarget = convertChangedValueTypes(target, visualElement, changedValueTypeKeys);
		if (removedTransformValues.length) removedTransformValues.forEach(([key, value]) => {
			visualElement.getValue(key).set(value);
		});
		visualElement.render();
		if (isBrowser && scrollY !== null) window.scrollTo({ top: scrollY });
		return {
			target: convertedTarget,
			transitionEnd
		};
	} else return {
		target,
		transitionEnd
	};
};
function unitConversion(visualElement, target, origin, transitionEnd) {
	return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement, target, origin, transitionEnd) : {
		target,
		transitionEnd
	};
}
var parseDomVariant = (visualElement, target, origin, transitionEnd) => {
	const resolved = resolveCSSVariables(visualElement, target, transitionEnd);
	target = resolved.target;
	transitionEnd = resolved.transitionEnd;
	return unitConversion(visualElement, target, origin, transitionEnd);
};
var prefersReducedMotion = { current: null };
var hasReducedMotionListener = { current: false };
function initPrefersReducedMotion() {
	hasReducedMotionListener.current = true;
	if (!isBrowser) return;
	if (window.matchMedia) {
		const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
		const setReducedMotionPreferences = () => prefersReducedMotion.current = motionMediaQuery.matches;
		motionMediaQuery.addListener(setReducedMotionPreferences);
		setReducedMotionPreferences();
	} else prefersReducedMotion.current = false;
}
function updateMotionValuesFromProps(element, next, prev) {
	const { willChange } = next;
	for (const key in next) {
		const nextValue = next[key];
		const prevValue = prev[key];
		if (isMotionValue(nextValue)) {
			element.addValue(key, nextValue);
			if (isWillChangeMotionValue(willChange)) willChange.add(key);
			warnOnce(nextValue.version === "10.13.1", `Attempting to mix Framer Motion versions ${nextValue.version} with 10.13.1 may not work as expected.`);
		} else if (isMotionValue(prevValue)) {
			element.addValue(key, motionValue(nextValue, { owner: element }));
			if (isWillChangeMotionValue(willChange)) willChange.remove(key);
		} else if (prevValue !== nextValue) if (element.hasValue(key)) {
			const existingValue = element.getValue(key);
			!existingValue.hasAnimated && existingValue.set(nextValue);
		} else {
			const latestValue = element.getStaticValue(key);
			element.addValue(key, motionValue(latestValue !== void 0 ? latestValue : nextValue, { owner: element }));
		}
	}
	for (const key in prev) if (next[key] === void 0) element.removeValue(key);
	return next;
}
var visualElementStore = /* @__PURE__ */ new WeakMap();
var featureNames = Object.keys(featureDefinitions);
var numFeatures = featureNames.length;
var propEventHandlers = [
	"AnimationStart",
	"AnimationComplete",
	"Update",
	"BeforeLayoutMeasure",
	"LayoutMeasure",
	"LayoutAnimationStart",
	"LayoutAnimationComplete"
];
var numVariantProps = variantProps.length;
var VisualElement = class {
	constructor({ parent, props, presenceContext, reducedMotionConfig, visualState }, options = {}) {
		this.current = null;
		this.children = /* @__PURE__ */ new Set();
		this.isVariantNode = false;
		this.isControllingVariants = false;
		this.shouldReduceMotion = null;
		this.values = /* @__PURE__ */ new Map();
		this.features = {};
		this.valueSubscriptions = /* @__PURE__ */ new Map();
		this.prevMotionValues = {};
		this.events = {};
		this.propEventSubscriptions = {};
		this.notifyUpdate = () => this.notify("Update", this.latestValues);
		this.render = () => {
			if (!this.current) return;
			this.triggerBuild();
			this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
		};
		this.scheduleRender = () => frame.render(this.render, false, true);
		const { latestValues, renderState } = visualState;
		this.latestValues = latestValues;
		this.baseTarget = { ...latestValues };
		this.initialValues = props.initial ? { ...latestValues } : {};
		this.renderState = renderState;
		this.parent = parent;
		this.props = props;
		this.presenceContext = presenceContext;
		this.depth = parent ? parent.depth + 1 : 0;
		this.reducedMotionConfig = reducedMotionConfig;
		this.options = options;
		this.isControllingVariants = isControllingVariants(props);
		this.isVariantNode = isVariantNode(props);
		if (this.isVariantNode) this.variantChildren = /* @__PURE__ */ new Set();
		this.manuallyAnimateOnMount = Boolean(parent && parent.current);
		const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {});
		for (const key in initialMotionValues) {
			const value = initialMotionValues[key];
			if (latestValues[key] !== void 0 && isMotionValue(value)) {
				value.set(latestValues[key], false);
				if (isWillChangeMotionValue(willChange)) willChange.add(key);
			}
		}
	}
	scrapeMotionValuesFromProps(_props, _prevProps) {
		return {};
	}
	mount(instance) {
		this.current = instance;
		visualElementStore.set(instance, this);
		if (this.projection && !this.projection.instance) this.projection.mount(instance);
		if (this.parent && this.isVariantNode && !this.isControllingVariants) this.removeFromVariantTree = this.parent.addVariantChild(this);
		this.values.forEach((value, key) => this.bindToMotionValue(key, value));
		if (!hasReducedMotionListener.current) initPrefersReducedMotion();
		this.shouldReduceMotion = this.reducedMotionConfig === "never" ? false : this.reducedMotionConfig === "always" ? true : prefersReducedMotion.current;
		warnOnce(this.shouldReduceMotion !== true, "You have Reduced Motion enabled on your device. Animations may not appear as expected.");
		if (this.parent) this.parent.children.add(this);
		this.update(this.props, this.presenceContext);
	}
	unmount() {
		visualElementStore.delete(this.current);
		this.projection && this.projection.unmount();
		cancelFrame(this.notifyUpdate);
		cancelFrame(this.render);
		this.valueSubscriptions.forEach((remove) => remove());
		this.removeFromVariantTree && this.removeFromVariantTree();
		this.parent && this.parent.children.delete(this);
		for (const key in this.events) this.events[key].clear();
		for (const key in this.features) this.features[key].unmount();
		this.current = null;
	}
	bindToMotionValue(key, value) {
		const valueIsTransform = transformProps.has(key);
		const removeOnChange = value.on("change", (latestValue) => {
			this.latestValues[key] = latestValue;
			this.props.onUpdate && frame.update(this.notifyUpdate, false, true);
			if (valueIsTransform && this.projection) this.projection.isTransformDirty = true;
		});
		const removeOnRenderRequest = value.on("renderRequest", this.scheduleRender);
		this.valueSubscriptions.set(key, () => {
			removeOnChange();
			removeOnRenderRequest();
		});
	}
	sortNodePosition(other) {
		if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) return 0;
		return this.sortInstanceNodePosition(this.current, other.current);
	}
	loadFeatures({ children, ...renderedProps }, isStrict, preloadedFeatures$1, initialLayoutGroupConfig) {
		let ProjectionNodeConstructor;
		let MeasureLayout$1;
		if (preloadedFeatures$1 && isStrict) {
			const strictMessage = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
			renderedProps.ignoreStrict ? warning(false, strictMessage) : invariant(false, strictMessage);
		}
		for (let i = 0; i < numFeatures; i++) {
			const name = featureNames[i];
			const { isEnabled, Feature: FeatureConstructor, ProjectionNode, MeasureLayout: MeasureLayoutComponent } = featureDefinitions[name];
			if (ProjectionNode) ProjectionNodeConstructor = ProjectionNode;
			if (isEnabled(renderedProps)) {
				if (!this.features[name] && FeatureConstructor) this.features[name] = new FeatureConstructor(this);
				if (MeasureLayoutComponent) MeasureLayout$1 = MeasureLayoutComponent;
			}
		}
		if (!this.projection && ProjectionNodeConstructor) {
			this.projection = new ProjectionNodeConstructor(this.latestValues, this.parent && this.parent.projection);
			const { layoutId, layout: layout$1, drag: drag$1, dragConstraints, layoutScroll, layoutRoot } = renderedProps;
			this.projection.setOptions({
				layoutId,
				layout: layout$1,
				alwaysMeasureLayout: Boolean(drag$1) || dragConstraints && isRefObject(dragConstraints),
				visualElement: this,
				scheduleRender: () => this.scheduleRender(),
				animationType: typeof layout$1 === "string" ? layout$1 : "both",
				initialPromotionConfig: initialLayoutGroupConfig,
				layoutScroll,
				layoutRoot
			});
		}
		return MeasureLayout$1;
	}
	updateFeatures() {
		for (const key in this.features) {
			const feature = this.features[key];
			if (feature.isMounted) feature.update();
			else {
				feature.mount();
				feature.isMounted = true;
			}
		}
	}
	triggerBuild() {
		this.build(this.renderState, this.latestValues, this.options, this.props);
	}
	measureViewportBox() {
		return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
	}
	getStaticValue(key) {
		return this.latestValues[key];
	}
	setStaticValue(key, value) {
		this.latestValues[key] = value;
	}
	makeTargetAnimatable(target, canMutate = true) {
		return this.makeTargetAnimatableFromInstance(target, this.props, canMutate);
	}
	update(props, presenceContext) {
		if (props.transformTemplate || this.props.transformTemplate) this.scheduleRender();
		this.prevProps = this.props;
		this.props = props;
		this.prevPresenceContext = this.presenceContext;
		this.presenceContext = presenceContext;
		for (let i = 0; i < propEventHandlers.length; i++) {
			const key = propEventHandlers[i];
			if (this.propEventSubscriptions[key]) {
				this.propEventSubscriptions[key]();
				delete this.propEventSubscriptions[key];
			}
			const listener = props["on" + key];
			if (listener) this.propEventSubscriptions[key] = this.on(key, listener);
		}
		this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props, this.prevProps), this.prevMotionValues);
		if (this.handleChildMotionValue) this.handleChildMotionValue();
	}
	getProps() {
		return this.props;
	}
	getVariant(name) {
		return this.props.variants ? this.props.variants[name] : void 0;
	}
	getDefaultTransition() {
		return this.props.transition;
	}
	getTransformPagePoint() {
		return this.props.transformPagePoint;
	}
	getClosestVariantNode() {
		return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
	}
	getVariantContext(startAtParent = false) {
		if (startAtParent) return this.parent ? this.parent.getVariantContext() : void 0;
		if (!this.isControllingVariants) {
			const context$1 = this.parent ? this.parent.getVariantContext() || {} : {};
			if (this.props.initial !== void 0) context$1.initial = this.props.initial;
			return context$1;
		}
		const context = {};
		for (let i = 0; i < numVariantProps; i++) {
			const name = variantProps[i];
			const prop = this.props[name];
			if (isVariantLabel(prop) || prop === false) context[name] = prop;
		}
		return context;
	}
	addVariantChild(child) {
		const closestVariantNode = this.getClosestVariantNode();
		if (closestVariantNode) {
			closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
			return () => closestVariantNode.variantChildren.delete(child);
		}
	}
	addValue(key, value) {
		if (value !== this.values.get(key)) {
			this.removeValue(key);
			this.bindToMotionValue(key, value);
		}
		this.values.set(key, value);
		this.latestValues[key] = value.get();
	}
	removeValue(key) {
		this.values.delete(key);
		const unsubscribe = this.valueSubscriptions.get(key);
		if (unsubscribe) {
			unsubscribe();
			this.valueSubscriptions.delete(key);
		}
		delete this.latestValues[key];
		this.removeValueFromRenderState(key, this.renderState);
	}
	hasValue(key) {
		return this.values.has(key);
	}
	getValue(key, defaultValue) {
		if (this.props.values && this.props.values[key]) return this.props.values[key];
		let value = this.values.get(key);
		if (value === void 0 && defaultValue !== void 0) {
			value = motionValue(defaultValue, { owner: this });
			this.addValue(key, value);
		}
		return value;
	}
	readValue(key) {
		var _a;
		return this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : (_a = this.getBaseTargetFromProps(this.props, key)) !== null && _a !== void 0 ? _a : this.readValueFromInstance(this.current, key, this.options);
	}
	setBaseTarget(key, value) {
		this.baseTarget[key] = value;
	}
	getBaseTarget(key) {
		var _a;
		const { initial } = this.props;
		const valueFromInitial = typeof initial === "string" || typeof initial === "object" ? (_a = resolveVariantFromProps(this.props, initial)) === null || _a === void 0 ? void 0 : _a[key] : void 0;
		if (initial && valueFromInitial !== void 0) return valueFromInitial;
		const target = this.getBaseTargetFromProps(this.props, key);
		if (target !== void 0 && !isMotionValue(target)) return target;
		return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
	}
	on(eventName, callback) {
		if (!this.events[eventName]) this.events[eventName] = new SubscriptionManager();
		return this.events[eventName].add(callback);
	}
	notify(eventName, ...args) {
		if (this.events[eventName]) this.events[eventName].notify(...args);
	}
};
var DOMVisualElement = class extends VisualElement {
	sortInstanceNodePosition(a, b) {
		return a.compareDocumentPosition(b) & 2 ? 1 : -1;
	}
	getBaseTargetFromProps(props, key) {
		return props.style ? props.style[key] : void 0;
	}
	removeValueFromRenderState(key, { vars, style }) {
		delete vars[key];
		delete style[key];
	}
	makeTargetAnimatableFromInstance({ transition, transitionEnd, ...target }, { transformValues }, isMounted) {
		let origin = getOrigin(target, transition || {}, this);
		if (transformValues) {
			if (transitionEnd) transitionEnd = transformValues(transitionEnd);
			if (target) target = transformValues(target);
			if (origin) origin = transformValues(origin);
		}
		if (isMounted) {
			checkTargetForNewValues(this, target, origin);
			const parsed = parseDomVariant(this, target, origin, transitionEnd);
			transitionEnd = parsed.transitionEnd;
			target = parsed.target;
		}
		return {
			transition,
			transitionEnd,
			...target
		};
	}
};
function getComputedStyle$1(element) {
	return window.getComputedStyle(element);
}
var HTMLVisualElement = class extends DOMVisualElement {
	readValueFromInstance(instance, key) {
		if (transformProps.has(key)) {
			const defaultType = getDefaultValueType(key);
			return defaultType ? defaultType.default || 0 : 0;
		} else {
			const computedStyle = getComputedStyle$1(instance);
			const value = (isCSSVariableName(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
			return typeof value === "string" ? value.trim() : value;
		}
	}
	measureInstanceViewportBox(instance, { transformPagePoint }) {
		return measureViewportBox(instance, transformPagePoint);
	}
	build(renderState, latestValues, options, props) {
		buildHTMLStyles(renderState, latestValues, options, props.transformTemplate);
	}
	scrapeMotionValuesFromProps(props, prevProps) {
		return scrapeMotionValuesFromProps$1(props, prevProps);
	}
	handleChildMotionValue() {
		if (this.childSubscription) {
			this.childSubscription();
			delete this.childSubscription;
		}
		const { children } = this.props;
		if (isMotionValue(children)) this.childSubscription = children.on("change", (latest) => {
			if (this.current) this.current.textContent = `${latest}`;
		});
	}
	renderInstance(instance, renderState, styleProp, projection) {
		renderHTML(instance, renderState, styleProp, projection);
	}
};
var SVGVisualElement = class extends DOMVisualElement {
	constructor() {
		super(...arguments);
		this.isSVGTag = false;
	}
	getBaseTargetFromProps(props, key) {
		return props[key];
	}
	readValueFromInstance(instance, key) {
		if (transformProps.has(key)) {
			const defaultType = getDefaultValueType(key);
			return defaultType ? defaultType.default || 0 : 0;
		}
		key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
		return instance.getAttribute(key);
	}
	measureInstanceViewportBox() {
		return createBox();
	}
	scrapeMotionValuesFromProps(props, prevProps) {
		return scrapeMotionValuesFromProps(props, prevProps);
	}
	build(renderState, latestValues, options, props) {
		buildSVGAttrs(renderState, latestValues, options, this.isSVGTag, props.transformTemplate);
	}
	renderInstance(instance, renderState, styleProp, projection) {
		renderSVG(instance, renderState, styleProp, projection);
	}
	mount(instance) {
		this.isSVGTag = isSVGTag(instance.tagName);
		super.mount(instance);
	}
};
var createDomVisualElement = (Component, options) => {
	return isSVGComponent(Component) ? new SVGVisualElement(options, { enableHardwareAcceleration: false }) : new HTMLVisualElement(options, { enableHardwareAcceleration: true });
};
var layout = { layout: {
	ProjectionNode: HTMLProjectionNode,
	MeasureLayout
} };
var preloadedFeatures = {
	...animations,
	...gestureAnimations,
	...drag,
	...layout
};
var motion = /* @__PURE__ */ createMotionProxy((Component, config) => createDomMotionConfig(Component, config, preloadedFeatures, createDomVisualElement));
function useIsMounted() {
	const isMounted = (0, import_react.useRef)(false);
	useIsomorphicLayoutEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);
	return isMounted;
}
function useForceUpdate() {
	const isMounted = useIsMounted();
	const [forcedRenderCount, setForcedRenderCount] = (0, import_react.useState)(0);
	const forceRender = (0, import_react.useCallback)(() => {
		isMounted.current && setForcedRenderCount(forcedRenderCount + 1);
	}, [forcedRenderCount]);
	return [(0, import_react.useCallback)(() => frame.postRender(forceRender), [forceRender]), forcedRenderCount];
}
var PopChildMeasure = class extends import_react.Component {
	getSnapshotBeforeUpdate(prevProps) {
		const element = this.props.childRef.current;
		if (element && prevProps.isPresent && !this.props.isPresent) {
			const size = this.props.sizeRef.current;
			size.height = element.offsetHeight || 0;
			size.width = element.offsetWidth || 0;
			size.top = element.offsetTop;
			size.left = element.offsetLeft;
		}
		return null;
	}
	componentDidUpdate() {}
	render() {
		return this.props.children;
	}
};
function PopChild({ children, isPresent }) {
	const id$2 = (0, import_react.useId)();
	const ref = (0, import_react.useRef)(null);
	const size = (0, import_react.useRef)({
		width: 0,
		height: 0,
		top: 0,
		left: 0
	});
	(0, import_react.useInsertionEffect)(() => {
		const { width, height, top, left } = size.current;
		if (isPresent || !ref.current || !width || !height) return;
		ref.current.dataset.motionPopId = id$2;
		const style = document.createElement("style");
		document.head.appendChild(style);
		if (style.sheet) style.sheet.insertRule(`
          [data-motion-pop-id="${id$2}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            top: ${top}px !important;
            left: ${left}px !important;
          }
        `);
		return () => {
			document.head.removeChild(style);
		};
	}, [isPresent]);
	return import_react.createElement(PopChildMeasure, {
		isPresent,
		childRef: ref,
		sizeRef: size
	}, import_react.cloneElement(children, { ref }));
}
var PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode }) => {
	const presenceChildren = useConstant(newChildrenMap);
	const id$2 = (0, import_react.useId)();
	const context = (0, import_react.useMemo)(() => ({
		id: id$2,
		initial,
		isPresent,
		custom,
		onExitComplete: (childId) => {
			presenceChildren.set(childId, true);
			for (const isComplete of presenceChildren.values()) if (!isComplete) return;
			onExitComplete && onExitComplete();
		},
		register: (childId) => {
			presenceChildren.set(childId, false);
			return () => presenceChildren.delete(childId);
		}
	}), presenceAffectsLayout ? void 0 : [isPresent]);
	(0, import_react.useMemo)(() => {
		presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
	}, [isPresent]);
	import_react.useEffect(() => {
		!isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
	}, [isPresent]);
	if (mode === "popLayout") children = import_react.createElement(PopChild, { isPresent }, children);
	return import_react.createElement(PresenceContext.Provider, { value: context }, children);
};
function newChildrenMap() {
	return /* @__PURE__ */ new Map();
}
function useUnmountEffect(callback) {
	return (0, import_react.useEffect)(() => () => callback(), []);
}
var getChildKey = (child) => child.key || "";
function updateChildLookup(children, allChildren) {
	children.forEach((child) => {
		const key = getChildKey(child);
		allChildren.set(key, child);
	});
}
function onlyElements(children) {
	const filtered = [];
	import_react.Children.forEach(children, (child) => {
		if ((0, import_react.isValidElement)(child)) filtered.push(child);
	});
	return filtered;
}
var AnimatePresence = ({ children, custom, initial = true, onExitComplete, exitBeforeEnter, presenceAffectsLayout = true, mode = "sync" }) => {
	invariant(!exitBeforeEnter, "Replace exitBeforeEnter with mode='wait'");
	const forceRender = (0, import_react.useContext)(LayoutGroupContext).forceRender || useForceUpdate()[0];
	const isMounted = useIsMounted();
	const filteredChildren = onlyElements(children);
	let childrenToRender = filteredChildren;
	const exitingChildren = (0, import_react.useRef)(/* @__PURE__ */ new Map()).current;
	const presentChildren = (0, import_react.useRef)(childrenToRender);
	const allChildren = (0, import_react.useRef)(/* @__PURE__ */ new Map()).current;
	const isInitialRender = (0, import_react.useRef)(true);
	useIsomorphicLayoutEffect(() => {
		isInitialRender.current = false;
		updateChildLookup(filteredChildren, allChildren);
		presentChildren.current = childrenToRender;
	});
	useUnmountEffect(() => {
		isInitialRender.current = true;
		allChildren.clear();
		exitingChildren.clear();
	});
	if (isInitialRender.current) return import_react.createElement(import_react.Fragment, null, childrenToRender.map((child) => import_react.createElement(PresenceChild, {
		key: getChildKey(child),
		isPresent: true,
		initial: initial ? void 0 : false,
		presenceAffectsLayout,
		mode
	}, child)));
	childrenToRender = [...childrenToRender];
	const presentKeys = presentChildren.current.map(getChildKey);
	const targetKeys = filteredChildren.map(getChildKey);
	const numPresent = presentKeys.length;
	for (let i = 0; i < numPresent; i++) {
		const key = presentKeys[i];
		if (targetKeys.indexOf(key) === -1 && !exitingChildren.has(key)) exitingChildren.set(key, void 0);
	}
	if (mode === "wait" && exitingChildren.size) childrenToRender = [];
	exitingChildren.forEach((component, key) => {
		if (targetKeys.indexOf(key) !== -1) return;
		const child = allChildren.get(key);
		if (!child) return;
		const insertionIndex = presentKeys.indexOf(key);
		let exitingComponent = component;
		if (!exitingComponent) {
			const onExit = () => {
				allChildren.delete(key);
				exitingChildren.delete(key);
				const removeIndex = presentChildren.current.findIndex((presentChild) => presentChild.key === key);
				presentChildren.current.splice(removeIndex, 1);
				if (!exitingChildren.size) {
					presentChildren.current = filteredChildren;
					if (isMounted.current === false) return;
					forceRender();
					onExitComplete && onExitComplete();
				}
			};
			exitingComponent = import_react.createElement(PresenceChild, {
				key: getChildKey(child),
				isPresent: false,
				onExitComplete: onExit,
				custom,
				presenceAffectsLayout,
				mode
			}, child);
			exitingChildren.set(key, exitingComponent);
		}
		childrenToRender.splice(insertionIndex, 0, exitingComponent);
	});
	childrenToRender = childrenToRender.map((child) => {
		const key = child.key;
		return exitingChildren.has(key) ? child : import_react.createElement(PresenceChild, {
			key: getChildKey(child),
			isPresent: true,
			presenceAffectsLayout,
			mode
		}, child);
	});
	if (mode === "wait" && childrenToRender.length > 1) console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`);
	return import_react.createElement(import_react.Fragment, null, exitingChildren.size ? childrenToRender : childrenToRender.map((child) => (0, import_react.cloneElement)(child)));
};
var import_jsx_runtime = require_jsx_runtime();
function TimelineSwitcher() {
	const { timeline, setTimeline, isPlaying, togglePlay } = useTimeShiftStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-6 w-full max-w-md mx-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex p-1 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 w-full relative",
			children: [
				{
					id: "real",
					label: "Real",
					color: "bg-zinc-500"
				},
				{
					id: "almost",
					label: "Quase",
					color: "bg-orange-500"
				},
				{
					id: "ideal",
					label: "Ideal",
					color: "bg-emerald-500"
				}
			].map((t) => {
				const isActive = timeline === t.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setTimeline(t.id),
					className: cn("flex-1 py-3 px-4 rounded-full text-sm font-bold transition-all relative z-10", isActive ? "text-white" : "text-white/50 hover:text-white/80"),
					children: [t.label, isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						layoutId: "active-timeline-indicator",
						className: cn("absolute inset-0 rounded-full z-[-1] opacity-80", t.color),
						transition: {
							type: "spring",
							bounce: .2,
							duration: .6
						}
					})]
				}, t.id);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "icon",
				className: "rounded-full h-12 w-12 border-white/10 bg-black/20 text-white hover:bg-white/10 hover:text-white",
				onClick: () => {
					const video = document.querySelector("video");
					if (video) video.currentTime = 0;
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "default",
				size: "icon",
				className: cn("rounded-full h-16 w-16 shadow-lg transition-transform hover:scale-105", timeline === "real" ? "bg-zinc-600 hover:bg-zinc-500" : timeline === "almost" ? "bg-orange-500 hover:bg-orange-400" : "bg-emerald-500 hover:bg-emerald-400"),
				onClick: togglePlay,
				children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-8 w-8 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-8 w-8 fill-current ml-1" })
			})]
		})]
	});
}
function TimeShiftVisualizer() {
	const { timeline, sport, isPlaying } = useTimeShiftStore();
	const containerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const container = containerRef.current;
		if (!container) return;
		let touchStartX = 0;
		let touchEndX = 0;
		const handleTouchStart = (e) => {
			touchStartX = e.changedTouches[0].screenX;
		};
		const handleTouchEnd = (e) => {
			touchEndX = e.changedTouches[0].screenX;
			handleSwipe();
		};
		const handleSwipe = () => {
			const { cycleTimeline } = useTimeShiftStore.getState();
			if (touchEndX < touchStartX - 50) cycleTimeline("next");
			if (touchEndX > touchStartX + 50) cycleTimeline("prev");
		};
		container.addEventListener("touchstart", handleTouchStart);
		container.addEventListener("touchend", handleTouchEnd);
		return () => {
			container.removeEventListener("touchstart", handleTouchStart);
			container.removeEventListener("touchend", handleTouchEnd);
		};
	}, []);
	const renderScene = () => {
		switch (sport) {
			case "football": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FootballScene, {
				timeline,
				isPlaying
			});
			case "martial_arts": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MartialArtsScene, {
				timeline,
				isPlaying
			});
			case "swimming": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwimmingScene, {
				timeline,
				isPlaying
			});
			default: return null;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: containerRef,
		className: "relative w-full h-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-20",
				style: {
					backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
					backgroundSize: "40px 40px",
					transform: "perspective(500px) rotateX(60deg) translateY(-100px) scale(2)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative w-full h-full flex items-center justify-center p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							scale: .9
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						exit: {
							opacity: 0,
							scale: 1.1
						},
						transition: { duration: .4 },
						className: "w-full h-full flex items-center justify-center",
						children: renderScene()
					}, `${sport}-${timeline}`)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-6 left-6 pointer-events-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("text-xs font-bold px-3 py-1 rounded-full inline-block mb-2 uppercase tracking-widest border", timeline === "real" ? "bg-zinc-500/20 border-zinc-500 text-zinc-300" : timeline === "almost" ? "bg-orange-500/20 border-orange-500 text-orange-300" : "bg-emerald-500/20 border-emerald-500 text-emerald-300"),
					children: ["Timeline: ", timeline]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-2xl font-black text-white italic drop-shadow-lg",
					children: [
						sport === "football" && timeline === "real" && "CHUTE DEFENDIDO",
						sport === "football" && timeline === "almost" && "BOLA NA TRAVE",
						sport === "football" && timeline === "ideal" && "GOL NO ÂNGULO",
						sport === "martial_arts" && timeline === "real" && "BLOQUEIO TOTAL",
						sport === "martial_arts" && timeline === "almost" && "RASPÃO",
						sport === "martial_arts" && timeline === "ideal" && "KNOCKOUT",
						sport === "swimming" && timeline === "real" && "SAÍDA ATRASADA",
						sport === "swimming" && timeline === "almost" && "NO TEMPO",
						sport === "swimming" && timeline === "ideal" && "REAÇÃO PERFEITA"
					]
				})]
			})
		]
	});
}
function FootballScene({ timeline, isPlaying }) {
	const activePath = timeline === "real" ? "M 50,350 Q 150,200 250,150" : timeline === "almost" ? "M 50,350 Q 100,50 350,50" : "M 50,350 Q 120,20 380,20";
	const color$1 = timeline === "real" ? "#71717a" : timeline === "almost" ? "#f97316" : "#10b981";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 400 400",
		className: "w-full h-full max-w-md overflow-visible",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M 50,380 L 50,50 L 350,50 L 350,380",
				fill: "none",
				stroke: "white",
				strokeWidth: "4",
				className: "opacity-80"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M 50,380 L 350,380",
				fill: "none",
				stroke: "white",
				strokeWidth: "2",
				className: "opacity-40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
				d: "M 200,300 L 230,380 L 170,380 Z",
				fill: "#3b82f6",
				opacity: "0.8",
				animate: timeline === "real" ? {
					x: 50,
					y: -150,
					scale: 1.2
				} : timeline === "almost" ? {
					x: 100,
					y: -100
				} : {
					x: -50,
					y: -50
				},
				transition: {
					duration: 1.5,
					repeat: isPlaying ? Infinity : 0,
					repeatType: "reverse"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: activePath,
				fill: "none",
				stroke: color$1,
				strokeWidth: "2",
				strokeDasharray: "5,5",
				className: "opacity-50"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
				r: "12",
				fill: "white",
				stroke: color$1,
				strokeWidth: "3",
				initial: { offsetDistance: "0%" },
				animate: { offsetDistance: isPlaying ? "100%" : "0%" },
				style: { offsetPath: `path("${activePath}")` },
				transition: {
					duration: 1.5,
					ease: "circOut",
					repeat: isPlaying ? Infinity : 0,
					repeatDelay: .5
				}
			}),
			timeline === "almost" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
				cx: "350",
				cy: "50",
				r: "20",
				fill: "transparent",
				stroke: "#f97316",
				strokeWidth: "4",
				animate: {
					scale: [1, 2],
					opacity: [1, 0]
				},
				transition: {
					duration: .5,
					repeat: isPlaying ? Infinity : 0,
					delay: 1.4
				}
			}),
			timeline === "ideal" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
				d: "M 360,30 L 390,10 L 400,40 Z",
				fill: "#10b981",
				animate: {
					scale: [0, 1.5],
					opacity: [1, 0],
					rotate: 360
				},
				transition: {
					duration: .5,
					repeat: isPlaying ? Infinity : 0,
					delay: 1.4
				}
			})
		]
	});
}
function MartialArtsScene({ timeline, isPlaying }) {
	const color$1 = timeline === "real" ? "#71717a" : timeline === "almost" ? "#f97316" : "#10b981";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 400 400",
		className: "w-full h-full max-w-md overflow-visible",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.g, {
				animate: { x: isPlaying ? [
					0,
					20,
					0
				] : 0 },
				transition: {
					duration: 1,
					repeat: Infinity
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "100",
						cy: "200",
						r: "30",
						fill: "white",
						opacity: "0.2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 100,200 L 180,200",
						stroke: "white",
						strokeWidth: "12",
						strokeLinecap: "round"
					}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "180",
						cy: "200",
						r: "15",
						fill: color$1
					}),
					" "
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.g, {
				initial: { x: 250 },
				animate: timeline === "real" ? {
					x: 220,
					rotate: -10
				} : timeline === "almost" ? {
					x: 240,
					rotate: 10
				} : {
					x: 300,
					rotate: 45,
					opacity: [1, .5]
				},
				transition: {
					duration: .5,
					repeat: isPlaying ? Infinity : 0,
					repeatDelay: .5
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M 0,0 L 0,100",
					stroke: "white",
					strokeWidth: "40",
					strokeLinecap: "round",
					opacity: "0.5"
				}), timeline === "real" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M -20,20 L -20,80",
					stroke: "#ef4444",
					strokeWidth: "8"
				})]
			}),
			timeline !== "real" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
				cx: "200",
				cy: "200",
				r: "40",
				fill: color$1,
				animate: {
					scale: [0, 1.5],
					opacity: [.8, 0]
				},
				transition: {
					duration: .3,
					repeat: isPlaying ? Infinity : 0,
					repeatDelay: .7
				}
			})
		]
	});
}
function SwimmingScene({ timeline, isPlaying }) {
	const color$1 = timeline === "real" ? "#71717a" : timeline === "almost" ? "#f97316" : "#10b981";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 400 400",
		className: "w-full h-full max-w-md overflow-visible",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "50",
				y1: "0",
				x2: "50",
				y2: "400",
				stroke: "white",
				strokeWidth: "2",
				opacity: "0.2",
				strokeDasharray: "10,10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "150",
				y1: "0",
				x2: "150",
				y2: "400",
				stroke: "white",
				strokeWidth: "2",
				opacity: "0.2",
				strokeDasharray: "10,10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "250",
				y1: "0",
				x2: "250",
				y2: "400",
				stroke: "white",
				strokeWidth: "2",
				opacity: "0.2",
				strokeDasharray: "10,10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "350",
				y1: "0",
				x2: "350",
				y2: "400",
				stroke: "white",
				strokeWidth: "2",
				opacity: "0.2",
				strokeDasharray: "10,10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "0",
				y: "0",
				width: "400",
				height: "400",
				fill: "url(#water-gradient)",
				opacity: "0.1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "water-gradient",
				x1: "0",
				x2: "0",
				y1: "0",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "#0ea5e9",
					stopOpacity: "0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "#0ea5e9",
					stopOpacity: "0.5"
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M 100,400 L 100,300",
				stroke: "white",
				strokeWidth: "20",
				strokeLinecap: "round",
				opacity: "0.1"
			}),
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.g, {
				initial: { y: 400 },
				animate: { y: isPlaying ? -50 : 400 },
				transition: {
					duration: timeline === "real" ? 4 : timeline === "almost" ? 3 : 2,
					ease: "linear",
					repeat: isPlaying ? Infinity : 0
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M 200,0 L 200,40",
					stroke: color$1,
					strokeWidth: "20",
					strokeLinecap: "round"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M 190,40 L 180,60 M 210,40 L 220,60",
					stroke: "white",
					strokeWidth: "2",
					opacity: "0.5"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
				cx: "350",
				cy: "350",
				r: "10",
				fill: timeline === "real" ? "red" : "green",
				animate: { opacity: [
					0,
					1,
					0
				] },
				transition: {
					duration: .5,
					repeat: isPlaying ? Infinity : 0,
					repeatDelay: 3
				}
			})
		]
	});
}
function TimeShift() {
	const navigate = useNavigate();
	const { setSport, sport } = useTimeShiftStore();
	const [showPublisher, setShowPublisher] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-zinc-950 text-white flex flex-col relative overflow-hidden font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 z-20 flex items-center justify-between p-4 bg-zinc-950/80 backdrop-blur-md border-b border-white/5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => navigate(-1),
						className: "text-white/70 hover:text-white hover:bg-white/10 rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-5 w-5 text-indigo-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold tracking-wider text-lg",
							children: "TIME SHIFT"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "text-white/70 hover:text-white hover:bg-white/10 rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-5 w-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col p-4 gap-6 max-w-lg mx-auto w-full z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: sport,
							onValueChange: (v) => setSport(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-[160px] bg-white/5 border-white/10 text-white h-8 text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select Sport" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
								className: "bg-zinc-900 border-zinc-800 text-white",
								children: [
									{
										id: "football",
										label: "Futebol"
									},
									{
										id: "martial_arts",
										label: "Artes Marciais"
									},
									{
										id: "swimming",
										label: "Natação"
									}
								].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: s.id,
									children: s.label
								}, s.id))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-h-[400px] w-full relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeShiftVisualizer, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-4 left-0 right-0 text-center opacity-40 text-[10px] uppercase tracking-widest pointer-events-none animate-pulse",
							children: "Swipe to Shift Time"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pb-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineSwitcher, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-indigo-400" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-bold text-sm mb-1",
								children: "Análise Narrativa"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-white/60 leading-relaxed",
								children: "Explore o que aconteceu, o que quase aconteceu e o que seria a perfeição. Use essa ferramenta para entender a tomada de decisão e melhorar seu desempenho mental."
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "w-full h-14 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-bold text-lg shadow-xl shadow-indigo-900/20 mb-4",
						onClick: () => setShowPublisher(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mr-2 h-5 w-5" }), " Criar Novo Time Shift"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: showPublisher,
				onOpenChange: setShowPublisher,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "bg-zinc-900 border-zinc-800 text-white sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-5 w-5 text-indigo-400" }), " Publicar Time Shift"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "text-zinc-400",
							children: "Carregue seu vídeo e defina os momentos chave para a análise narrativa."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-8 flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-xl bg-zinc-950/50 hover:bg-zinc-950 hover:border-indigo-500/50 transition-colors cursor-pointer group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-16 w-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-8 w-8 text-zinc-400 group-hover:text-indigo-400" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "Toque para selecionar vídeo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-zinc-500 mt-1",
									children: "MP4, MOV até 30s"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "flex-col gap-2 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => setShowPublisher(false),
								className: "hover:bg-white/5 hover:text-white",
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "bg-indigo-600 hover:bg-indigo-500 text-white",
								onClick: () => {
									setShowPublisher(false);
									toast.success("Vídeo enviado para processamento!", { description: "Aguarde a notificação quando o Time Shift estiver pronto." });
								},
								children: "Continuar"
							})]
						})
					]
				})
			})
		]
	});
}
export { TimeShift as default };

//# sourceMappingURL=TimeShift-AnVS-N5A.js.map