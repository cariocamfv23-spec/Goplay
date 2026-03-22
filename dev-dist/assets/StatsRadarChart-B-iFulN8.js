import { $r as require_react, Dn as Target, Ur as require_jsx_runtime, ei as __commonJSMin, ii as __toESM, jr as clsx_default } from "./index-BWrK_vl1.js";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-p5VC9bVs.js";
import { A as require__baseExtremum, B as filterProps, D as require__baseLt, E as require_isEqual, F as Global, H as adaptEventsOfChild, J as require_isFunction, L as require__baseIteratee, T as getValueByDataKey, U as interpolateNumber, _ as require_last, b as getTickClassName, g as LabelList, j as Text, k as require__baseGt, m as es6_default, p as Dot, q as require_isNil, t as generateCategoricalChart, v as Label, x as polarToCartesian, y as formatAxisMap, z as Layer } from "./generateCategoricalChart-BFM74r41.js";
import { n as ChartTooltip, r as ChartTooltipContent, t as ChartContainer } from "./chart-D_BwTYsa.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var _excluded$3 = [
	"points",
	"className",
	"baseLinePoints",
	"connectNulls"
];
function _extends$4() {
	_extends$4 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$4.apply(this, arguments);
}
function _objectWithoutProperties$3(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$3(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$3(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function _toConsumableArray(arr) {
	return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
	if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
	if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
var isValidatePoint = function isValidatePoint$1(point) {
	return point && point.x === +point.x && point.y === +point.y;
};
var getParsedPoints = function getParsedPoints$1() {
	var points = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
	var segmentPoints = [[]];
	points.forEach(function(entry) {
		if (isValidatePoint(entry)) segmentPoints[segmentPoints.length - 1].push(entry);
		else if (segmentPoints[segmentPoints.length - 1].length > 0) segmentPoints.push([]);
	});
	if (isValidatePoint(points[0])) segmentPoints[segmentPoints.length - 1].push(points[0]);
	if (segmentPoints[segmentPoints.length - 1].length <= 0) segmentPoints = segmentPoints.slice(0, -1);
	return segmentPoints;
};
var getSinglePolygonPath = function getSinglePolygonPath$1(points, connectNulls) {
	var segmentPoints = getParsedPoints(points);
	if (connectNulls) segmentPoints = [segmentPoints.reduce(function(res, segPoints) {
		return [].concat(_toConsumableArray(res), _toConsumableArray(segPoints));
	}, [])];
	var polygonPath = segmentPoints.map(function(segPoints) {
		return segPoints.reduce(function(path, point, index) {
			return "".concat(path).concat(index === 0 ? "M" : "L").concat(point.x, ",").concat(point.y);
		}, "");
	}).join("");
	return segmentPoints.length === 1 ? "".concat(polygonPath, "Z") : polygonPath;
};
var getRanglePath = function getRanglePath$1(points, baseLinePoints, connectNulls) {
	var outerPath = getSinglePolygonPath(points, connectNulls);
	return "".concat(outerPath.slice(-1) === "Z" ? outerPath.slice(0, -1) : outerPath, "L").concat(getSinglePolygonPath(baseLinePoints.reverse(), connectNulls).slice(1));
};
var Polygon = function Polygon$1(props) {
	var points = props.points, className = props.className, baseLinePoints = props.baseLinePoints, connectNulls = props.connectNulls, others = _objectWithoutProperties$3(props, _excluded$3);
	if (!points || !points.length) return null;
	var layerClass = clsx_default("recharts-polygon", className);
	if (baseLinePoints && baseLinePoints.length) {
		var hasStroke = others.stroke && others.stroke !== "none";
		var rangePath = getRanglePath(points, baseLinePoints, connectNulls);
		return /* @__PURE__ */ import_react.createElement("g", { className: layerClass }, /* @__PURE__ */ import_react.createElement("path", _extends$4({}, filterProps(others, true), {
			fill: rangePath.slice(-1) === "Z" ? others.fill : "none",
			stroke: "none",
			d: rangePath
		})), hasStroke ? /* @__PURE__ */ import_react.createElement("path", _extends$4({}, filterProps(others, true), {
			fill: "none",
			d: getSinglePolygonPath(points, connectNulls)
		})) : null, hasStroke ? /* @__PURE__ */ import_react.createElement("path", _extends$4({}, filterProps(others, true), {
			fill: "none",
			d: getSinglePolygonPath(baseLinePoints, connectNulls)
		})) : null);
	}
	var singlePath = getSinglePolygonPath(points, connectNulls);
	return /* @__PURE__ */ import_react.createElement("path", _extends$4({}, filterProps(others, true), {
		fill: singlePath.slice(-1) === "Z" ? others.fill : "none",
		className: layerClass,
		d: singlePath
	}));
};
var _excluded$2 = [
	"cx",
	"cy",
	"innerRadius",
	"outerRadius",
	"gridType",
	"radialLines"
];
function _typeof$3(o) {
	"@babel/helpers - typeof";
	return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$3(o);
}
function _objectWithoutProperties$2(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$2(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$2(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function _extends$3() {
	_extends$3 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$3.apply(this, arguments);
}
function ownKeys$3(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$3(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$3(Object(t), !0).forEach(function(r$1) {
			_defineProperty$3(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$3(obj, key, value) {
	key = _toPropertyKey$3(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$3(t) {
	var i = _toPrimitive$3(t, "string");
	return "symbol" == _typeof$3(i) ? i : i + "";
}
function _toPrimitive$3(t, r) {
	if ("object" != _typeof$3(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$3(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var getPolygonPath = function getPolygonPath$1(radius, cx, cy, polarAngles) {
	var path = "";
	polarAngles.forEach(function(angle, i) {
		var point = polarToCartesian(cx, cy, radius, angle);
		if (i) path += "L ".concat(point.x, ",").concat(point.y);
		else path += "M ".concat(point.x, ",").concat(point.y);
	});
	path += "Z";
	return path;
};
var PolarAngles = function PolarAngles$1(props) {
	var cx = props.cx, cy = props.cy, innerRadius = props.innerRadius, outerRadius = props.outerRadius, polarAngles = props.polarAngles, radialLines = props.radialLines;
	if (!polarAngles || !polarAngles.length || !radialLines) return null;
	var polarAnglesProps = _objectSpread$3({ stroke: "#ccc" }, filterProps(props, false));
	return /* @__PURE__ */ import_react.createElement("g", { className: "recharts-polar-grid-angle" }, polarAngles.map(function(entry) {
		var start = polarToCartesian(cx, cy, innerRadius, entry);
		var end = polarToCartesian(cx, cy, outerRadius, entry);
		return /* @__PURE__ */ import_react.createElement("line", _extends$3({}, polarAnglesProps, {
			key: "line-".concat(entry),
			x1: start.x,
			y1: start.y,
			x2: end.x,
			y2: end.y
		}));
	}));
};
var ConcentricCircle = function ConcentricCircle$1(props) {
	var cx = props.cx, cy = props.cy, radius = props.radius, index = props.index;
	var concentricCircleProps = _objectSpread$3(_objectSpread$3({ stroke: "#ccc" }, filterProps(props, false)), {}, { fill: "none" });
	return /* @__PURE__ */ import_react.createElement("circle", _extends$3({}, concentricCircleProps, {
		className: clsx_default("recharts-polar-grid-concentric-circle", props.className),
		key: "circle-".concat(index),
		cx,
		cy,
		r: radius
	}));
};
var ConcentricPolygon = function ConcentricPolygon$1(props) {
	var radius = props.radius, index = props.index;
	var concentricPolygonProps = _objectSpread$3(_objectSpread$3({ stroke: "#ccc" }, filterProps(props, false)), {}, { fill: "none" });
	return /* @__PURE__ */ import_react.createElement("path", _extends$3({}, concentricPolygonProps, {
		className: clsx_default("recharts-polar-grid-concentric-polygon", props.className),
		key: "path-".concat(index),
		d: getPolygonPath(radius, props.cx, props.cy, props.polarAngles)
	}));
};
var ConcentricPath = function ConcentricPath$1(props) {
	var polarRadius = props.polarRadius, gridType = props.gridType;
	if (!polarRadius || !polarRadius.length) return null;
	return /* @__PURE__ */ import_react.createElement("g", { className: "recharts-polar-grid-concentric" }, polarRadius.map(function(entry, i) {
		var key = i;
		if (gridType === "circle") return /* @__PURE__ */ import_react.createElement(ConcentricCircle, _extends$3({ key }, props, {
			radius: entry,
			index: i
		}));
		return /* @__PURE__ */ import_react.createElement(ConcentricPolygon, _extends$3({ key }, props, {
			radius: entry,
			index: i
		}));
	}));
};
var PolarGrid = function PolarGrid$1(_ref) {
	var _ref$cx = _ref.cx, cx = _ref$cx === void 0 ? 0 : _ref$cx, _ref$cy = _ref.cy, cy = _ref$cy === void 0 ? 0 : _ref$cy, _ref$innerRadius = _ref.innerRadius, innerRadius = _ref$innerRadius === void 0 ? 0 : _ref$innerRadius, _ref$outerRadius = _ref.outerRadius, outerRadius = _ref$outerRadius === void 0 ? 0 : _ref$outerRadius, _ref$gridType = _ref.gridType, gridType = _ref$gridType === void 0 ? "polygon" : _ref$gridType, _ref$radialLines = _ref.radialLines, radialLines = _ref$radialLines === void 0 ? true : _ref$radialLines, props = _objectWithoutProperties$2(_ref, _excluded$2);
	if (outerRadius <= 0) return null;
	return /* @__PURE__ */ import_react.createElement("g", { className: "recharts-polar-grid" }, /* @__PURE__ */ import_react.createElement(PolarAngles, _extends$3({
		cx,
		cy,
		innerRadius,
		outerRadius,
		gridType,
		radialLines
	}, props)), /* @__PURE__ */ import_react.createElement(ConcentricPath, _extends$3({
		cx,
		cy,
		innerRadius,
		outerRadius,
		gridType,
		radialLines
	}, props)));
};
PolarGrid.displayName = "PolarGrid";
var require_maxBy = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseExtremum$1 = require__baseExtremum(), baseGt = require__baseGt(), baseIteratee$1 = require__baseIteratee();
	function maxBy$1(array, iteratee) {
		return array && array.length ? baseExtremum$1(array, baseIteratee$1(iteratee, 2), baseGt) : void 0;
	}
	module.exports = maxBy$1;
}));
var require_minBy = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseExtremum = require__baseExtremum(), baseIteratee = require__baseIteratee(), baseLt = require__baseLt();
	function minBy$1(array, iteratee) {
		return array && array.length ? baseExtremum(array, baseIteratee(iteratee, 2), baseLt) : void 0;
	}
	module.exports = minBy$1;
}));
var import_maxBy = /* @__PURE__ */ __toESM(require_maxBy());
var import_minBy = /* @__PURE__ */ __toESM(require_minBy());
var import_isFunction$2 = /* @__PURE__ */ __toESM(require_isFunction());
var _excluded$1 = [
	"cx",
	"cy",
	"angle",
	"ticks",
	"axisLine"
], _excluded2 = [
	"ticks",
	"tick",
	"angle",
	"tickFormatter",
	"stroke"
];
function _typeof$2(o) {
	"@babel/helpers - typeof";
	return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$2(o);
}
function _extends$2() {
	_extends$2 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$2.apply(this, arguments);
}
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), !0).forEach(function(r$1) {
			_defineProperty$2(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _objectWithoutProperties$1(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$1(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function _classCallCheck$2(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$2(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$2(descriptor.key), descriptor);
	}
}
function _createClass$2(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$2(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper$2(t, o, e) {
	return o = _getPrototypeOf$2(o), _possibleConstructorReturn$2(t, _isNativeReflectConstruct$2() ? Reflect.construct(o, e || [], _getPrototypeOf$2(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$2(self, call) {
	if (call && (_typeof$2(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$2(self);
}
function _assertThisInitialized$2(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$2() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t$1) {}
	return (_isNativeReflectConstruct$2 = function _isNativeReflectConstruct$3() {
		return !!t;
	})();
}
function _getPrototypeOf$2(o) {
	_getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf$3(o$1) {
		return o$1.__proto__ || Object.getPrototypeOf(o$1);
	};
	return _getPrototypeOf$2(o);
}
function _inherits$2(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$2(subClass, superClass);
}
function _setPrototypeOf$2(o, p) {
	_setPrototypeOf$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf$3(o$1, p$1) {
		o$1.__proto__ = p$1;
		return o$1;
	};
	return _setPrototypeOf$2(o, p);
}
function _defineProperty$2(obj, key, value) {
	key = _toPropertyKey$2(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$2(t) {
	var i = _toPrimitive$2(t, "string");
	return "symbol" == _typeof$2(i) ? i : i + "";
}
function _toPrimitive$2(t, r) {
	if ("object" != _typeof$2(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$2(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var PolarRadiusAxis = /* @__PURE__ */ function(_PureComponent) {
	function PolarRadiusAxis$1() {
		_classCallCheck$2(this, PolarRadiusAxis$1);
		return _callSuper$2(this, PolarRadiusAxis$1, arguments);
	}
	_inherits$2(PolarRadiusAxis$1, _PureComponent);
	return _createClass$2(PolarRadiusAxis$1, [
		{
			key: "getTickValueCoord",
			value: function getTickValueCoord(_ref) {
				var coordinate = _ref.coordinate;
				var _this$props = this.props, angle = _this$props.angle, cx = _this$props.cx, cy = _this$props.cy;
				return polarToCartesian(cx, cy, coordinate, angle);
			}
		},
		{
			key: "getTickTextAnchor",
			value: function getTickTextAnchor() {
				var orientation = this.props.orientation;
				var textAnchor;
				switch (orientation) {
					case "left":
						textAnchor = "end";
						break;
					case "right":
						textAnchor = "start";
						break;
					default:
						textAnchor = "middle";
						break;
				}
				return textAnchor;
			}
		},
		{
			key: "getViewBox",
			value: function getViewBox() {
				var _this$props2 = this.props, cx = _this$props2.cx, cy = _this$props2.cy, angle = _this$props2.angle, ticks = _this$props2.ticks;
				var maxRadiusTick = (0, import_maxBy.default)(ticks, function(entry) {
					return entry.coordinate || 0;
				});
				return {
					cx,
					cy,
					startAngle: angle,
					endAngle: angle,
					innerRadius: (0, import_minBy.default)(ticks, function(entry) {
						return entry.coordinate || 0;
					}).coordinate || 0,
					outerRadius: maxRadiusTick.coordinate || 0
				};
			}
		},
		{
			key: "renderAxisLine",
			value: function renderAxisLine() {
				var _this$props3 = this.props, cx = _this$props3.cx, cy = _this$props3.cy, angle = _this$props3.angle, ticks = _this$props3.ticks, axisLine = _this$props3.axisLine, others = _objectWithoutProperties$1(_this$props3, _excluded$1);
				var extent = ticks.reduce(function(result, entry) {
					return [Math.min(result[0], entry.coordinate), Math.max(result[1], entry.coordinate)];
				}, [Infinity, -Infinity]);
				var point0 = polarToCartesian(cx, cy, extent[0], angle);
				var point1 = polarToCartesian(cx, cy, extent[1], angle);
				var props = _objectSpread$2(_objectSpread$2(_objectSpread$2({}, filterProps(others, false)), {}, { fill: "none" }, filterProps(axisLine, false)), {}, {
					x1: point0.x,
					y1: point0.y,
					x2: point1.x,
					y2: point1.y
				});
				return /* @__PURE__ */ import_react.createElement("line", _extends$2({ className: "recharts-polar-radius-axis-line" }, props));
			}
		},
		{
			key: "renderTicks",
			value: function renderTicks() {
				var _this = this;
				var _this$props4 = this.props, ticks = _this$props4.ticks, tick = _this$props4.tick, angle = _this$props4.angle, tickFormatter = _this$props4.tickFormatter, stroke = _this$props4.stroke, others = _objectWithoutProperties$1(_this$props4, _excluded2);
				var textAnchor = this.getTickTextAnchor();
				var axisProps = filterProps(others, false);
				var customTickProps = filterProps(tick, false);
				var items = ticks.map(function(entry, i) {
					var coord = _this.getTickValueCoord(entry);
					var tickProps = _objectSpread$2(_objectSpread$2(_objectSpread$2(_objectSpread$2({
						textAnchor,
						transform: "rotate(".concat(90 - angle, ", ").concat(coord.x, ", ").concat(coord.y, ")")
					}, axisProps), {}, {
						stroke: "none",
						fill: stroke
					}, customTickProps), {}, { index: i }, coord), {}, { payload: entry });
					return /* @__PURE__ */ import_react.createElement(Layer, _extends$2({
						className: clsx_default("recharts-polar-radius-axis-tick", getTickClassName(tick)),
						key: "tick-".concat(entry.coordinate)
					}, adaptEventsOfChild(_this.props, entry, i)), PolarRadiusAxis$1.renderTickItem(tick, tickProps, tickFormatter ? tickFormatter(entry.value, i) : entry.value));
				});
				return /* @__PURE__ */ import_react.createElement(Layer, { className: "recharts-polar-radius-axis-ticks" }, items);
			}
		},
		{
			key: "render",
			value: function render() {
				var _this$props5 = this.props, ticks = _this$props5.ticks, axisLine = _this$props5.axisLine, tick = _this$props5.tick;
				if (!ticks || !ticks.length) return null;
				return /* @__PURE__ */ import_react.createElement(Layer, { className: clsx_default("recharts-polar-radius-axis", this.props.className) }, axisLine && this.renderAxisLine(), tick && this.renderTicks(), Label.renderCallByParent(this.props, this.getViewBox()));
			}
		}
	], [{
		key: "renderTickItem",
		value: function renderTickItem(option, props, value) {
			var tickItem;
			if (/* @__PURE__ */ import_react.isValidElement(option)) tickItem = /* @__PURE__ */ import_react.cloneElement(option, props);
			else if ((0, import_isFunction$2.default)(option)) tickItem = option(props);
			else tickItem = /* @__PURE__ */ import_react.createElement(Text, _extends$2({}, props, { className: "recharts-polar-radius-axis-tick-value" }), value);
			return tickItem;
		}
	}]);
}(import_react.PureComponent);
_defineProperty$2(PolarRadiusAxis, "displayName", "PolarRadiusAxis");
_defineProperty$2(PolarRadiusAxis, "axisType", "radiusAxis");
_defineProperty$2(PolarRadiusAxis, "defaultProps", {
	type: "number",
	radiusAxisId: 0,
	cx: 0,
	cy: 0,
	angle: 0,
	orientation: "right",
	stroke: "#ccc",
	axisLine: true,
	tick: true,
	tickCount: 5,
	allowDataOverflow: false,
	scale: "auto",
	allowDuplicatedCategory: true
});
var import_isFunction$1 = /* @__PURE__ */ __toESM(require_isFunction());
function _typeof$1(o) {
	"@babel/helpers - typeof";
	return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$1(o);
}
function _extends$1() {
	_extends$1 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$1.apply(this, arguments);
}
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), !0).forEach(function(r$1) {
			_defineProperty$1(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _classCallCheck$1(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$1(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$1(descriptor.key), descriptor);
	}
}
function _createClass$1(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$1(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper$1(t, o, e) {
	return o = _getPrototypeOf$1(o), _possibleConstructorReturn$1(t, _isNativeReflectConstruct$1() ? Reflect.construct(o, e || [], _getPrototypeOf$1(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$1(self, call) {
	if (call && (_typeof$1(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$1(self);
}
function _assertThisInitialized$1(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$1() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t$1) {}
	return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct$3() {
		return !!t;
	})();
}
function _getPrototypeOf$1(o) {
	_getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf$3(o$1) {
		return o$1.__proto__ || Object.getPrototypeOf(o$1);
	};
	return _getPrototypeOf$1(o);
}
function _inherits$1(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$1(subClass, superClass);
}
function _setPrototypeOf$1(o, p) {
	_setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf$3(o$1, p$1) {
		o$1.__proto__ = p$1;
		return o$1;
	};
	return _setPrototypeOf$1(o, p);
}
function _defineProperty$1(obj, key, value) {
	key = _toPropertyKey$1(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$1(t) {
	var i = _toPrimitive$1(t, "string");
	return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
	if ("object" != _typeof$1(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$1(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var RADIAN = Math.PI / 180;
var eps = 1e-5;
var PolarAngleAxis = /* @__PURE__ */ function(_PureComponent) {
	function PolarAngleAxis$1() {
		_classCallCheck$1(this, PolarAngleAxis$1);
		return _callSuper$1(this, PolarAngleAxis$1, arguments);
	}
	_inherits$1(PolarAngleAxis$1, _PureComponent);
	return _createClass$1(PolarAngleAxis$1, [
		{
			key: "getTickLineCoord",
			value: function getTickLineCoord(data) {
				var _this$props = this.props, cx = _this$props.cx, cy = _this$props.cy, radius = _this$props.radius, orientation = _this$props.orientation;
				var tickLineSize = _this$props.tickSize || 8;
				var p1 = polarToCartesian(cx, cy, radius, data.coordinate);
				var p2 = polarToCartesian(cx, cy, radius + (orientation === "inner" ? -1 : 1) * tickLineSize, data.coordinate);
				return {
					x1: p1.x,
					y1: p1.y,
					x2: p2.x,
					y2: p2.y
				};
			}
		},
		{
			key: "getTickTextAnchor",
			value: function getTickTextAnchor(data) {
				var orientation = this.props.orientation;
				var cos = Math.cos(-data.coordinate * RADIAN);
				var textAnchor;
				if (cos > eps) textAnchor = orientation === "outer" ? "start" : "end";
				else if (cos < -eps) textAnchor = orientation === "outer" ? "end" : "start";
				else textAnchor = "middle";
				return textAnchor;
			}
		},
		{
			key: "renderAxisLine",
			value: function renderAxisLine() {
				var _this$props2 = this.props, cx = _this$props2.cx, cy = _this$props2.cy, radius = _this$props2.radius, axisLine = _this$props2.axisLine, axisLineType = _this$props2.axisLineType;
				var props = _objectSpread$1(_objectSpread$1({}, filterProps(this.props, false)), {}, { fill: "none" }, filterProps(axisLine, false));
				if (axisLineType === "circle") return /* @__PURE__ */ import_react.createElement(Dot, _extends$1({ className: "recharts-polar-angle-axis-line" }, props, {
					cx,
					cy,
					r: radius
				}));
				var points = this.props.ticks.map(function(entry) {
					return polarToCartesian(cx, cy, radius, entry.coordinate);
				});
				return /* @__PURE__ */ import_react.createElement(Polygon, _extends$1({ className: "recharts-polar-angle-axis-line" }, props, { points }));
			}
		},
		{
			key: "renderTicks",
			value: function renderTicks() {
				var _this = this;
				var _this$props3 = this.props, ticks = _this$props3.ticks, tick = _this$props3.tick, tickLine = _this$props3.tickLine, tickFormatter = _this$props3.tickFormatter, stroke = _this$props3.stroke;
				var axisProps = filterProps(this.props, false);
				var customTickProps = filterProps(tick, false);
				var tickLineProps = _objectSpread$1(_objectSpread$1({}, axisProps), {}, { fill: "none" }, filterProps(tickLine, false));
				var items = ticks.map(function(entry, i) {
					var lineCoord = _this.getTickLineCoord(entry);
					var tickProps = _objectSpread$1(_objectSpread$1(_objectSpread$1({ textAnchor: _this.getTickTextAnchor(entry) }, axisProps), {}, {
						stroke: "none",
						fill: stroke
					}, customTickProps), {}, {
						index: i,
						payload: entry,
						x: lineCoord.x2,
						y: lineCoord.y2
					});
					return /* @__PURE__ */ import_react.createElement(Layer, _extends$1({
						className: clsx_default("recharts-polar-angle-axis-tick", getTickClassName(tick)),
						key: "tick-".concat(entry.coordinate)
					}, adaptEventsOfChild(_this.props, entry, i)), tickLine && /* @__PURE__ */ import_react.createElement("line", _extends$1({ className: "recharts-polar-angle-axis-tick-line" }, tickLineProps, lineCoord)), tick && PolarAngleAxis$1.renderTickItem(tick, tickProps, tickFormatter ? tickFormatter(entry.value, i) : entry.value));
				});
				return /* @__PURE__ */ import_react.createElement(Layer, { className: "recharts-polar-angle-axis-ticks" }, items);
			}
		},
		{
			key: "render",
			value: function render() {
				var _this$props4 = this.props, ticks = _this$props4.ticks, radius = _this$props4.radius, axisLine = _this$props4.axisLine;
				if (radius <= 0 || !ticks || !ticks.length) return null;
				return /* @__PURE__ */ import_react.createElement(Layer, { className: clsx_default("recharts-polar-angle-axis", this.props.className) }, axisLine && this.renderAxisLine(), this.renderTicks());
			}
		}
	], [{
		key: "renderTickItem",
		value: function renderTickItem(option, props, value) {
			var tickItem;
			if (/* @__PURE__ */ import_react.isValidElement(option)) tickItem = /* @__PURE__ */ import_react.cloneElement(option, props);
			else if ((0, import_isFunction$1.default)(option)) tickItem = option(props);
			else tickItem = /* @__PURE__ */ import_react.createElement(Text, _extends$1({}, props, { className: "recharts-polar-angle-axis-tick-value" }), value);
			return tickItem;
		}
	}]);
}(import_react.PureComponent);
_defineProperty$1(PolarAngleAxis, "displayName", "PolarAngleAxis");
_defineProperty$1(PolarAngleAxis, "axisType", "angleAxis");
_defineProperty$1(PolarAngleAxis, "defaultProps", {
	type: "category",
	angleAxisId: 0,
	scale: "auto",
	cx: 0,
	cy: 0,
	orientation: "outer",
	axisLine: true,
	tickLine: true,
	tickSize: 8,
	tick: true,
	hide: false,
	allowDuplicatedCategory: true
});
var require_head = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function head(array) {
		return array && array.length ? array[0] : void 0;
	}
	module.exports = head;
}));
var require_first = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_head();
}));
var import_isNil = /* @__PURE__ */ __toESM(require_isNil());
var import_last = /* @__PURE__ */ __toESM(require_last());
var import_first = /* @__PURE__ */ __toESM(require_first());
var import_isEqual = /* @__PURE__ */ __toESM(require_isEqual());
var import_isFunction = /* @__PURE__ */ __toESM(require_isFunction());
var _excluded = ["key"];
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof(o);
}
function _objectWithoutProperties(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function _extends() {
	_extends = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
			_defineProperty(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
	}
}
function _createClass(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
	if (call && (_typeof(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t$1) {}
	return (_isNativeReflectConstruct = function _isNativeReflectConstruct$3() {
		return !!t;
	})();
}
function _getPrototypeOf(o) {
	_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf$3(o$1) {
		return o$1.__proto__ || Object.getPrototypeOf(o$1);
	};
	return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
	_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf$3(o$1, p$1) {
		o$1.__proto__ = p$1;
		return o$1;
	};
	return _setPrototypeOf(o, p);
}
function _defineProperty(obj, key, value) {
	key = _toPropertyKey(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var Radar = /* @__PURE__ */ function(_PureComponent) {
	function Radar$1() {
		var _this;
		_classCallCheck(this, Radar$1);
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		_this = _callSuper(this, Radar$1, [].concat(args));
		_defineProperty(_this, "state", { isAnimationFinished: false });
		_defineProperty(_this, "handleAnimationEnd", function() {
			var onAnimationEnd = _this.props.onAnimationEnd;
			_this.setState({ isAnimationFinished: true });
			if ((0, import_isFunction.default)(onAnimationEnd)) onAnimationEnd();
		});
		_defineProperty(_this, "handleAnimationStart", function() {
			var onAnimationStart = _this.props.onAnimationStart;
			_this.setState({ isAnimationFinished: false });
			if ((0, import_isFunction.default)(onAnimationStart)) onAnimationStart();
		});
		_defineProperty(_this, "handleMouseEnter", function(e) {
			var onMouseEnter = _this.props.onMouseEnter;
			if (onMouseEnter) onMouseEnter(_this.props, e);
		});
		_defineProperty(_this, "handleMouseLeave", function(e) {
			var onMouseLeave = _this.props.onMouseLeave;
			if (onMouseLeave) onMouseLeave(_this.props, e);
		});
		return _this;
	}
	_inherits(Radar$1, _PureComponent);
	return _createClass(Radar$1, [
		{
			key: "renderDots",
			value: function renderDots(points) {
				var _this$props = this.props, dot = _this$props.dot, dataKey = _this$props.dataKey;
				var baseProps = filterProps(this.props, false);
				var customDotProps = filterProps(dot, true);
				var dots = points.map(function(entry, i) {
					var dotProps = _objectSpread(_objectSpread(_objectSpread({
						key: "dot-".concat(i),
						r: 3
					}, baseProps), customDotProps), {}, {
						dataKey,
						cx: entry.x,
						cy: entry.y,
						index: i,
						payload: entry
					});
					return Radar$1.renderDotItem(dot, dotProps);
				});
				return /* @__PURE__ */ import_react.createElement(Layer, { className: "recharts-radar-dots" }, dots);
			}
		},
		{
			key: "renderPolygonStatically",
			value: function renderPolygonStatically(points) {
				var _this$props2 = this.props, shape = _this$props2.shape, dot = _this$props2.dot, isRange = _this$props2.isRange, baseLinePoints = _this$props2.baseLinePoints, connectNulls = _this$props2.connectNulls;
				var radar;
				if (/* @__PURE__ */ import_react.isValidElement(shape)) radar = /* @__PURE__ */ import_react.cloneElement(shape, _objectSpread(_objectSpread({}, this.props), {}, { points }));
				else if ((0, import_isFunction.default)(shape)) radar = shape(_objectSpread(_objectSpread({}, this.props), {}, { points }));
				else radar = /* @__PURE__ */ import_react.createElement(Polygon, _extends({}, filterProps(this.props, true), {
					onMouseEnter: this.handleMouseEnter,
					onMouseLeave: this.handleMouseLeave,
					points,
					baseLinePoints: isRange ? baseLinePoints : null,
					connectNulls
				}));
				return /* @__PURE__ */ import_react.createElement(Layer, { className: "recharts-radar-polygon" }, radar, dot ? this.renderDots(points) : null);
			}
		},
		{
			key: "renderPolygonWithAnimation",
			value: function renderPolygonWithAnimation() {
				var _this2 = this;
				var _this$props3 = this.props, points = _this$props3.points, isAnimationActive = _this$props3.isAnimationActive, animationBegin = _this$props3.animationBegin, animationDuration = _this$props3.animationDuration, animationEasing = _this$props3.animationEasing, animationId = _this$props3.animationId;
				var prevPoints = this.state.prevPoints;
				return /* @__PURE__ */ import_react.createElement(es6_default, {
					begin: animationBegin,
					duration: animationDuration,
					isActive: isAnimationActive,
					easing: animationEasing,
					from: { t: 0 },
					to: { t: 1 },
					key: "radar-".concat(animationId),
					onAnimationEnd: this.handleAnimationEnd,
					onAnimationStart: this.handleAnimationStart
				}, function(_ref) {
					var t = _ref.t;
					var prevPointsDiffFactor = prevPoints && prevPoints.length / points.length;
					var stepData = points.map(function(entry, index) {
						var prev = prevPoints && prevPoints[Math.floor(index * prevPointsDiffFactor)];
						if (prev) {
							var _interpolatorX = interpolateNumber(prev.x, entry.x);
							var _interpolatorY = interpolateNumber(prev.y, entry.y);
							return _objectSpread(_objectSpread({}, entry), {}, {
								x: _interpolatorX(t),
								y: _interpolatorY(t)
							});
						}
						var interpolatorX = interpolateNumber(entry.cx, entry.x);
						var interpolatorY = interpolateNumber(entry.cy, entry.y);
						return _objectSpread(_objectSpread({}, entry), {}, {
							x: interpolatorX(t),
							y: interpolatorY(t)
						});
					});
					return _this2.renderPolygonStatically(stepData);
				});
			}
		},
		{
			key: "renderPolygon",
			value: function renderPolygon() {
				var _this$props4 = this.props, points = _this$props4.points, isAnimationActive = _this$props4.isAnimationActive, isRange = _this$props4.isRange;
				var prevPoints = this.state.prevPoints;
				if (isAnimationActive && points && points.length && !isRange && (!prevPoints || !(0, import_isEqual.default)(prevPoints, points))) return this.renderPolygonWithAnimation();
				return this.renderPolygonStatically(points);
			}
		},
		{
			key: "render",
			value: function render() {
				var _this$props5 = this.props, hide = _this$props5.hide, className = _this$props5.className, points = _this$props5.points, isAnimationActive = _this$props5.isAnimationActive;
				if (hide || !points || !points.length) return null;
				var isAnimationFinished = this.state.isAnimationFinished;
				var layerClass = clsx_default("recharts-radar", className);
				return /* @__PURE__ */ import_react.createElement(Layer, { className: layerClass }, this.renderPolygon(), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
			}
		}
	], [{
		key: "getDerivedStateFromProps",
		value: function getDerivedStateFromProps(nextProps, prevState) {
			if (nextProps.animationId !== prevState.prevAnimationId) return {
				prevAnimationId: nextProps.animationId,
				curPoints: nextProps.points,
				prevPoints: prevState.curPoints
			};
			if (nextProps.points !== prevState.curPoints) return { curPoints: nextProps.points };
			return null;
		}
	}, {
		key: "renderDotItem",
		value: function renderDotItem(option, props) {
			var dotItem;
			if (/* @__PURE__ */ import_react.isValidElement(option)) dotItem = /* @__PURE__ */ import_react.cloneElement(option, props);
			else if ((0, import_isFunction.default)(option)) dotItem = option(props);
			else {
				var key = props.key, dotProps = _objectWithoutProperties(props, _excluded);
				dotItem = /* @__PURE__ */ import_react.createElement(Dot, _extends({}, dotProps, {
					key,
					className: clsx_default("recharts-radar-dot", typeof option !== "boolean" ? option.className : "")
				}));
			}
			return dotItem;
		}
	}]);
}(import_react.PureComponent);
_defineProperty(Radar, "displayName", "Radar");
_defineProperty(Radar, "defaultProps", {
	angleAxisId: 0,
	radiusAxisId: 0,
	hide: false,
	activeDot: true,
	dot: false,
	legendType: "rect",
	isAnimationActive: !Global.isSsr,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease"
});
_defineProperty(Radar, "getComposedData", function(_ref2) {
	var radiusAxis = _ref2.radiusAxis, angleAxis = _ref2.angleAxis, displayedData = _ref2.displayedData, dataKey = _ref2.dataKey, bandSize = _ref2.bandSize;
	var cx = angleAxis.cx, cy = angleAxis.cy;
	var isRange = false;
	var points = [];
	var angleBandSize = angleAxis.type !== "number" ? bandSize !== null && bandSize !== void 0 ? bandSize : 0 : 0;
	displayedData.forEach(function(entry, i) {
		var name = getValueByDataKey(entry, angleAxis.dataKey, i);
		var value = getValueByDataKey(entry, dataKey);
		var angle = angleAxis.scale(name) + angleBandSize;
		var pointValue = Array.isArray(value) ? (0, import_last.default)(value) : value;
		var radius = (0, import_isNil.default)(pointValue) ? void 0 : radiusAxis.scale(pointValue);
		if (Array.isArray(value) && value.length >= 2) isRange = true;
		points.push(_objectSpread(_objectSpread({}, polarToCartesian(cx, cy, radius, angle)), {}, {
			name,
			value,
			cx,
			cy,
			radius,
			angle,
			payload: entry
		}));
	});
	var baseLinePoints = [];
	if (isRange) points.forEach(function(point) {
		if (Array.isArray(point.value)) {
			var baseValue = (0, import_first.default)(point.value);
			var radius = (0, import_isNil.default)(baseValue) ? void 0 : radiusAxis.scale(baseValue);
			baseLinePoints.push(_objectSpread(_objectSpread({}, point), {}, { radius }, polarToCartesian(cx, cy, radius, point.angle)));
		} else baseLinePoints.push(point);
	});
	return {
		points,
		isRange,
		baseLinePoints
	};
});
var RadarChart = generateCategoricalChart({
	chartName: "RadarChart",
	GraphicalChild: Radar,
	axisComponents: [{
		axisType: "angleAxis",
		AxisComp: PolarAngleAxis
	}, {
		axisType: "radiusAxis",
		AxisComp: PolarRadiusAxis
	}],
	formatAxisMap,
	defaultProps: {
		layout: "centric",
		startAngle: 90,
		endAngle: -270,
		cx: "50%",
		cy: "50%",
		innerRadius: 0,
		outerRadius: "80%"
	}
});
var import_jsx_runtime = require_jsx_runtime();
var chartConfig = { value: {
	label: "Score",
	color: "hsl(var(--primary))"
} };
function StatsRadarChart({ stats }) {
	if (!stats || stats.length === 0) return null;
	const data = stats.map((stat) => ({
		subject: stat.label,
		value: Math.round(stat.value / stat.max * 100),
		fullMark: 100,
		originalValue: stat.value,
		unit: stat.unit
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "border-none shadow-none bg-transparent",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			className: "px-0 pt-0 pb-2 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				className: "text-sm font-medium text-zinc-400 flex items-center justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-4 w-4" }), " Radar de Habilidades"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-[200px] w-full flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
					config: chartConfig,
					className: "w-full h-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
						data,
						outerRadius: 70,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, { stroke: "#333" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
								dataKey: "subject",
								tick: {
									fill: "#9ca3af",
									fontSize: 12
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
								name: "Performance",
								dataKey: "value",
								stroke: "hsl(var(--primary))",
								fill: "hsl(var(--primary))",
								fillOpacity: .3
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
								cursor: false,
								content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
									className: "bg-zinc-900 border-zinc-800 text-white",
									formatter: (value, name, item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-primary",
										children: item.payload.originalValue
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-zinc-400 text-xs ml-1",
										children: item.payload.unit
									})] })
								})
							})
						]
					})
				})
			})
		})]
	});
}
export { StatsRadarChart as t };

//# sourceMappingURL=StatsRadarChart-B-iFulN8.js.map