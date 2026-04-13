import { t as CircleCheck } from "./circle-check-B8StrKRE.js";
import { t as Funnel } from "./funnel-DO4oIS8m.js";
import { $n as MapPin, Bt as DropdownMenu, Et as mockScholarships, Ht as DropdownMenuContent, Lr as ArrowLeft, R as Badge, Un as Search, Vt as DropdownMenuCheckboxItem, Wt as DropdownMenuTrigger, an as Button, bn as cn, ci as useNavigate, di as require_react, ti as require_jsx_runtime, ur as GraduationCap } from "./index-BdDFDm-L.js";
import { n as CardContent, t as Card } from "./card-DIU0oEEZ.js";
import { t as Input } from "./input-whOm72Rw.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function Scholarships() {
	const navigate = useNavigate();
	const [search, setSearch] = (0, import_react.useState)("");
	const [filters, setFilters] = (0, import_react.useState)({
		country: [],
		city: []
	});
	const countries = Array.from(new Set(mockScholarships.map((s) => s.country)));
	const cities = Array.from(new Set(mockScholarships.map((s) => s.city)));
	const filteredScholarships = mockScholarships.filter((s) => {
		const matchesSearch = s.university.toLowerCase().includes(search.toLowerCase()) || s.sport.toLowerCase().includes(search.toLowerCase()) || s.neighborhood && s.neighborhood.toLowerCase().includes(search.toLowerCase());
		const matchesCountry = filters.country.length === 0 || filters.country.includes(s.country);
		const matchesCity = filters.city.length === 0 || filters.city.includes(s.city);
		return matchesSearch && matchesCountry && matchesCity;
	});
	const toggleFilter = (type, value) => {
		setFilters((prev) => {
			const current = prev[type];
			const updated = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
			return {
				...prev,
				[type]: updated
			};
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "-ml-2 hover:bg-secondary/50 rounded-full",
					onClick: () => navigate("/explore"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-emerald-100 dark:bg-emerald-900/30 p-1.5 rounded-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-5 w-5 text-emerald-600 dark:text-emerald-400" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-bold text-lg",
						children: "Bolsas & Match Acadêmico"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 pb-4 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Buscar universidade, esporte ou bairro...",
						className: "pl-9 bg-secondary border-none rounded-xl",
						value: search,
						onChange: (e) => setSearch(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 overflow-x-auto pb-1 scrollbar-hide",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							className: cn("rounded-full text-xs h-8 border-dashed", filters.country.length > 0 && "bg-emerald-50 border-emerald-200 text-emerald-700 border-solid"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-3 w-3 mr-1.5" }),
								"País",
								filters.country.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 bg-emerald-200 text-emerald-800 rounded-full w-4 h-4 text-[9px] flex items-center justify-center",
									children: filters.country.length
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
						align: "start",
						children: countries.map((country) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuCheckboxItem, {
							checked: filters.country.includes(country),
							onCheckedChange: () => toggleFilter("country", country),
							children: country
						}, country))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							className: cn("rounded-full text-xs h-8 border-dashed", filters.city.length > 0 && "bg-emerald-50 border-emerald-200 text-emerald-700 border-solid"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3 mr-1.5" }),
								"Cidade",
								filters.city.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 bg-emerald-200 text-emerald-800 rounded-full w-4 h-4 text-[9px] flex items-center justify-center",
									children: filters.city.length
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
						align: "start",
						children: cities.map((city) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuCheckboxItem, {
							checked: filters.city.includes(city),
							onCheckedChange: () => toggleFilter("city", city),
							children: city
						}, city))
					})] })]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4 space-y-4",
			children: filteredScholarships.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center py-10 opacity-60",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-12 w-12 mx-auto mb-3 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-medium",
						children: "Nenhuma bolsa encontrada"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: "Tente ajustar seus filtros de busca."
					})
				]
			}) : filteredScholarships.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "overflow-hidden border-none shadow-sm cursor-pointer hover:shadow-md transition-all group active:scale-[0.98]",
				onClick: () => navigate(`/explore/scholarships/${item.id}`),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "h-32 relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.image,
							alt: item.university,
							className: "w-full h-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute top-3 left-3 bg-background/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.logo,
								alt: "Logo",
								className: "w-4 h-4 object-contain"
							}), item.university]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-3 left-3 text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-bold text-lg leading-tight",
								children: [item.sport, " Scholarship"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs opacity-90 flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
									" ",
									item.city,
									", ",
									item.country
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-3 right-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								className: "bg-emerald-500 hover:bg-emerald-600 text-white border-none shadow-lg",
								children: [item.value, "% Cobertura"]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "p-4 bg-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Processo Seletivo Aberto" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Até ", item.deadline] })]
					})
				})]
			}, item.id))
		})]
	});
}
export { Scholarships as default };

//# sourceMappingURL=Scholarships-DrhWTTuc.js.map