import { Kr as require_react, Zr as __toESM } from "./index-EHR_KjFO.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function usePrevious(value) {
	const ref = import_react.useRef({
		value,
		previous: value
	});
	return import_react.useMemo(() => {
		if (ref.current.value !== value) {
			ref.current.previous = ref.current.value;
			ref.current.value = value;
		}
		return ref.current.previous;
	}, [value]);
}
export { usePrevious as t };

//# sourceMappingURL=dist-jg6V4zxh.js.map