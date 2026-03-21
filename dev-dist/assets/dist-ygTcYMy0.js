import { Qr as __toESM, qr as require_react } from "./index-CrJ_L4xh.js";
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

//# sourceMappingURL=dist-ygTcYMy0.js.map