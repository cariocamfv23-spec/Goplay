import { t as Navigation } from "./navigation-DqfUQB66.js";
import { $r as require_react, $t as AvatarImage, Fn as ShieldCheck, Ln as Search, Q as mockDrivers, Qt as AvatarFallback, R as Badge, Ur as require_jsx_runtime, Xr as useNavigate, Z as mockCurrentUser, Zt as Avatar, jn as Star, nn as Button, vr as Car } from "./index-CMN2_1TR.js";
import { n as CardContent, t as Card } from "./card-1FFZljLu.js";
import { t as Input } from "./input-2s6SaNBy.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function DriversList() {
	const navigate = useNavigate();
	const [search, setSearch] = (0, import_react.useState)("");
	const filteredDrivers = mockDrivers.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-xl font-bold mb-4 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Car, { className: "h-6 w-6 text-primary" }), " Motoristas Goplay"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Buscar motorista...",
					className: "pl-9 bg-secondary border-none rounded-xl",
					value: search,
					onChange: (e) => setSearch(e.target.value)
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "bg-gradient-to-r from-zinc-900 to-zinc-800 text-white border-none shadow-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4 flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
							className: "h-14 w-14 border-2 border-white/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: mockCurrentUser.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: mockCurrentUser.name[0] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-lg",
								children: mockCurrentUser.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm text-zinc-300",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 text-gold fill-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "4.9 Passageiro VIP" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							size: "sm",
							className: "bg-white/10 hover:bg-white/20 text-white",
							children: "Histórico"
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "text-lg font-bold mb-3 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "h-5 w-5 text-green-500" }), "Disponíveis Próximos"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: filteredDrivers.map((driver) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "overflow-hidden border-none shadow-md hover:shadow-lg transition-all cursor-pointer",
					onClick: () => navigate(`/profile/${driver.id}`),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
									className: "h-12 w-12 border-2 border-background",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: driver.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: driver.name[0] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold",
									children: driver.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Car, { className: "h-3 w-3" }),
										" ",
										driver.car?.model
									]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 bg-secondary/50 px-1.5 py-0.5 rounded text-xs font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-gold text-gold" }), driver.rating]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-primary font-medium mt-1",
									children: driver.distance || "0.5 km"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								className: "text-[10px] text-green-600 border-green-200 bg-green-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3 mr-1" }), " Verificado"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								className: "rounded-full h-8 px-4",
								onClick: (e) => {
									e.stopPropagation();
									navigate(`/ride/request/${driver.id}`);
								},
								children: "Solicitar"
							})]
						})]
					})
				}, driver.id))
			})] })]
		})]
	});
}
export { DriversList as default };

//# sourceMappingURL=DriversList-0CtWdQbZ.js.map