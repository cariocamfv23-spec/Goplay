import { S as useDepthStore, bn as cn, di as require_react, ti as require_jsx_runtime } from "./index-DbWDAVNz.js";
var import_react = require_react();
function useTilt3D(maxRotation = 5, scale = 1.02) {
	const { isEnabled, intensity } = useDepthStore();
	const [style, setStyle] = (0, import_react.useState)({
		transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
		transition: "transform 0.1s ease-out"
	});
	const effectiveRotation = isEnabled ? maxRotation * intensity : 0;
	const effectiveScale = isEnabled ? 1 + (scale - 1) * intensity : 1;
	const onMouseMove = (0, import_react.useCallback)((e) => {
		if (!isEnabled) return;
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		setStyle({
			transform: `perspective(1000px) rotateX(${(y - centerY) / centerY * -effectiveRotation}deg) rotateY(${(x - centerX) / centerX * effectiveRotation}deg) scale(${effectiveScale})`,
			transition: "none"
		});
	}, [
		isEnabled,
		effectiveRotation,
		effectiveScale
	]);
	const onMouseLeave = (0, import_react.useCallback)(() => {
		setStyle({
			transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
			transition: "transform 0.5s ease-out"
		});
	}, []);
	return {
		style: isEnabled ? style : {
			transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
			transition: "transform 0.5s ease-out"
		},
		onMouseMove: isEnabled ? onMouseMove : void 0,
		onMouseLeave: isEnabled ? onMouseLeave : void 0
	};
}
var import_jsx_runtime = require_jsx_runtime();
function DepthContainer({ children, className, enableTilt = true, maxRotation = 3, scale = 1.01 }) {
	const { style, onMouseMove, onMouseLeave } = useTilt3D(maxRotation, scale);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative transform-style-3d backface-hidden will-change-transform", className),
		style: enableTilt ? style : void 0,
		onMouseMove: enableTilt ? onMouseMove : void 0,
		onMouseLeave: enableTilt ? onMouseLeave : void 0,
		children
	});
}
export { DepthContainer as t };

//# sourceMappingURL=DepthContainer-BrYzl88q.js.map