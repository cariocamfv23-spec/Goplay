import { t as Funnel } from "./funnel-C1MjtxSv.js";
import { $r as require_react, Er as ArrowLeft, Fn as ShieldCheck, Ln as Search, R as Badge, Ur as require_jsx_runtime, Wn as MapPin, Xr as useNavigate, bn as Users, br as Calendar, d as DialogFooter, dt as mockKidsVenues, fr as Clock, gn as cn, gr as Check, jn as Star, l as DialogContent, mn as toast, nn as Button, p as DialogTitle, s as Dialog, u as DialogDescription, vn as X, wr as Baby, z as ScrollArea } from "./index-DgEcce6A.js";
import { n as CardContent, t as Card } from "./card-Crq9OrMQ.js";
import { t as Label } from "./label-nFo_CyX9.js";
import { t as Separator } from "./separator-BVoWUljI.js";
import { t as Input } from "./input-BVAFQpu1.js";
import { t as Checkbox } from "./checkbox-BLkX2clU.js";
import { n as RadioGroupItem, t as RadioGroup } from "./radio-group-DCxV37cN.js";
import { a as SheetFooter, c as SheetTrigger, i as SheetDescription, n as SheetClose, o as SheetHeader, r as SheetContent, s as SheetTitle, t as Sheet } from "./sheet--WHP_hhN.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function KidsFilterSheet({ children, filters, setFilters, availableActivities, counts }) {
	const handleActivityChange = (activity, checked) => {
		setFilters({
			...filters,
			activities: checked ? [...filters.activities, activity] : filters.activities.filter((a) => a !== activity)
		});
	};
	const handlePeriodChange = (period, checked) => {
		setFilters({
			...filters,
			periods: checked ? [...filters.periods, period] : filters.periods.filter((p) => p !== period)
		});
	};
	const clearFilters = () => {
		setFilters({
			activities: [],
			ageGroup: "all",
			periods: []
		});
	};
	const activeFiltersCount = filters.activities.length + filters.periods.length + (filters.ageGroup !== "all" ? 1 : 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
		asChild: true,
		children
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
		side: "bottom",
		className: "h-[85vh] sm:h-auto sm:max-w-md rounded-t-3xl sm:rounded-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				className: "mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Filtros Avançados" }), activeFiltersCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: clearFilters,
						className: "h-8 px-2 text-destructive hover:text-destructive",
						children: [
							"Limpar (",
							activeFiltersCount,
							")"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Encontre o local perfeito para a diversão das crianças." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				className: "h-[calc(85vh-180px)] sm:h-[60vh] pr-4 -mr-4 pl-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 pb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "text-base font-semibold flex items-center gap-2",
								children: ["Faixa Etária", filters.ageGroup !== "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									className: "text-[10px] h-5",
									children: "Ativo"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
								value: filters.ageGroup,
								onValueChange: (value) => setFilters({
									...filters,
									ageGroup: value
								}),
								className: "grid grid-cols-2 gap-2",
								children: [
									{
										value: "all",
										label: "Todas as idades"
									},
									{
										value: "0-3",
										label: "0 a 3 anos"
									},
									{
										value: "3-6",
										label: "3 a 6 anos"
									},
									{
										value: "6-10",
										label: "6 a 10 anos"
									},
									{
										value: "10-14",
										label: "10 a 14 anos"
									}
								].map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
									value: option.value,
									id: `age-${option.value}`,
									className: "peer sr-only"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: `age-${option.value}`,
									className: "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary cursor-pointer transition-all",
									children: option.label
								})] }, option.value))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "text-base font-semibold flex items-center gap-2",
								children: ["Horários Específicos", filters.periods.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									className: "text-[10px] h-5",
									children: filters.periods.length
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-2",
								children: [
									{
										id: "morning",
										label: "Manhã",
										sub: "06h - 12h"
									},
									{
										id: "afternoon",
										label: "Tarde",
										sub: "12h - 18h"
									},
									{
										id: "night",
										label: "Noite",
										sub: "18h - 22h"
									}
								].map((period) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									id: `period-${period.id}`,
									checked: filters.periods.includes(period.id),
									onCheckedChange: (checked) => handlePeriodChange(period.id, checked),
									className: "sr-only peer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									htmlFor: `period-${period.id}`,
									className: "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-transparent p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary cursor-pointer transition-all h-20 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: period.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground mt-1",
										children: period.sub
									})]
								})] }, period.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "text-base font-semibold flex items-center gap-2",
								children: ["Tipo de Atividade", filters.activities.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									className: "text-[10px] h-5",
									children: filters.activities.length
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 gap-2",
								children: availableActivities.map((activity) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										id: `activity-${activity}`,
										checked: filters.activities.includes(activity),
										onCheckedChange: (checked) => handleActivityChange(activity, checked)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: `activity-${activity}`,
										className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer py-1",
										children: activity
									})]
								}, activity))
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetFooter, {
				className: "mt-4 sm:mt-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetClose, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "w-full h-12 text-base rounded-xl shadow-lg",
						children: [
							"Ver ",
							counts?.filtered ?? 0,
							" locais"
						]
					})
				})
			})
		]
	})] });
}
var allActivities = Array.from(new Set(mockKidsVenues.flatMap((v) => v.activities))).sort();
function KidsFriendlyList() {
	const navigate = useNavigate();
	const [search, setSearch] = (0, import_react.useState)("");
	const [filters, setFilters] = (0, import_react.useState)({
		activities: [],
		ageGroup: "all",
		periods: []
	});
	const [selectedVenue, setSelectedVenue] = (0, import_react.useState)(null);
	const filteredVenues = (0, import_react.useMemo)(() => {
		return mockKidsVenues.filter((venue) => {
			if (search && !venue.name.toLowerCase().includes(search.toLowerCase())) return false;
			if (filters.activities.length > 0) {
				if (!venue.activities.some((act) => filters.activities.includes(act))) return false;
			}
			if (filters.ageGroup !== "all") {
				const [minStr, maxStr] = filters.ageGroup.split("-");
				const filterMin = parseInt(minStr);
				const filterMax = parseInt(maxStr);
				if (filters.ageGroup === "10-14") {
					if (!(venue.minAge <= 14 && venue.maxAge >= 10)) return false;
				} else if (!(venue.minAge <= filterMax && venue.maxAge >= filterMin)) return false;
			}
			if (filters.periods.length > 0) {
				if (!venue.periods.some((p) => filters.periods.includes(p))) return false;
			}
			return true;
		});
	}, [search, filters]);
	const activeFiltersCount = filters.activities.length + filters.periods.length + (filters.ageGroup !== "all" ? 1 : 0);
	const handleBooking = () => {
		toast.success("Solicitação enviada!", { description: "Sua reserva foi encaminhada para aprovação. Verifique seu email." });
		setSelectedVenue(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => navigate(-1),
						className: "-ml-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-lg font-bold truncate",
						children: "Recreação para Crianças"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Buscar locais e eventos...",
							className: "pl-9 bg-secondary border-none rounded-xl",
							value: search,
							onChange: (e) => setSearch(e.target.value)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KidsFilterSheet, {
						filters,
						setFilters,
						availableActivities: allActivities,
						counts: {
							total: mockKidsVenues.length,
							filtered: filteredVenues.length
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: activeFiltersCount > 0 ? "default" : "outline",
							size: "icon",
							className: cn("shrink-0 rounded-xl relative", activeFiltersCount > 0 && "bg-primary text-primary-foreground border-primary"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-4 w-4" }), activeFiltersCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-background" })]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 space-y-4",
				children: [
					activeFiltersCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 animate-fade-in-down",
						children: [
							filters.ageGroup !== "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "secondary",
								className: "pl-1 pr-2 py-1 gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
										className: "h-3 w-3 cursor-pointer",
										onClick: () => setFilters({
											...filters,
											ageGroup: "all"
										})
									}),
									"Idade: ",
									filters.ageGroup
								]
							}),
							filters.periods.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "secondary",
								className: "pl-1 pr-2 py-1 gap-1 capitalize",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
									className: "h-3 w-3 cursor-pointer",
									onClick: () => setFilters({
										...filters,
										periods: filters.periods.filter((x) => x !== p)
									})
								}), p === "morning" ? "Manhã" : p === "afternoon" ? "Tarde" : "Noite"]
							}, p)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => setFilters({
									activities: [],
									ageGroup: "all",
									periods: []
								}),
								className: "h-6 text-xs text-muted-foreground px-2",
								children: "Limpar tudo"
							})
						]
					}),
					filteredVenues.map((venue) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "overflow-hidden border-none shadow-md cursor-pointer active:scale-[0.99] transition-transform hover:shadow-lg",
						onClick: () => setSelectedVenue(venue),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-44",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: venue.image,
									className: "w-full h-full object-cover",
									alt: venue.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-gold text-gold" }),
										" ",
										venue.rating
									]
								}),
								venue.linkedEvent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-2 left-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "default",
										className: "bg-primary/90 hover:bg-primary backdrop-blur-md shadow-sm border-0 gap-1 pl-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }), venue.linkedEvent]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute bottom-2 left-2 flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: `backdrop-blur shadow-sm ${venue.isFree ? "bg-green-500/90 text-white" : "bg-yellow-500/90 text-white"}`,
										children: venue.isFree ? "Grátis" : "Pago"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "secondary",
										className: "backdrop-blur shadow-sm bg-black/50 text-white gap-1 pl-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), venue.hours]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-lg mb-1 leading-tight",
										children: venue.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "outline",
										className: "text-[10px] whitespace-nowrap shrink-0 ml-2",
										children: [
											venue.minAge,
											"-",
											venue.maxAge,
											" anos"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 text-xs text-muted-foreground mb-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3 shrink-0" }),
										" ",
										venue.location
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground mb-4 line-clamp-2",
									children: venue.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "text-xs font-bold uppercase text-muted-foreground mb-2 flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Baby, { className: "h-3 w-3" }), " Atividades"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [venue.activities.slice(0, 3).map((activity, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "outline",
										className: "text-[10px] py-0 h-6 border-pink-200 bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:border-pink-800 dark:text-pink-300",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-2 w-2 mr-1" }),
											" ",
											activity
										]
									}, i)), venue.activities.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "outline",
										className: "text-[10px] py-0 h-6",
										children: ["+", venue.activities.length - 3]
									})]
								})] })
							]
						})]
					}, venue.id)),
					filteredVenues.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center py-10 text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Baby, { className: "h-12 w-12 mx-auto mb-3 opacity-20" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2",
								children: "Nenhum local encontrado com esses filtros."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "link",
								onClick: () => setFilters({
									activities: [],
									ageGroup: "all",
									periods: []
								}),
								children: "Limpar filtros"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!selectedVenue,
				onOpenChange: (open) => !open && setSelectedVenue(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					className: "max-w-md p-0 overflow-hidden bg-background border-none h-[85vh] sm:h-auto flex flex-col",
					children: selectedVenue && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-56 shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: selectedVenue.image,
									alt: selectedVenue.name,
									className: "w-full h-full object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "absolute top-2 right-2 text-white hover:bg-white/20 rounded-full bg-black/20 backdrop-blur-sm",
									onClick: () => setSelectedVenue(null),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute bottom-0 left-0 right-0 p-4",
									children: [selectedVenue.linkedEvent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: "bg-primary/90 backdrop-blur mb-2 border-none",
										children: selectedVenue.linkedEvent
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
										className: "text-2xl font-bold text-white leading-tight drop-shadow-md",
										children: selectedVenue.name
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 overflow-y-auto p-6 space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5 text-primary shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-semibold text-sm",
										children: "Localização"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
										className: "text-sm mt-0.5 text-foreground",
										children: selectedVenue.location
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-secondary/30 p-3 rounded-xl border border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 mb-1 text-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold uppercase",
												children: "Horário"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-sm",
											children: selectedVenue.hours
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-secondary/30 p-3 rounded-xl border border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 mb-1 text-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold uppercase",
												children: "Capacidade"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-sm",
											children: selectedVenue.capacity
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-semibold text-sm mb-2",
									children: "Sobre o Local"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground leading-relaxed",
									children: selectedVenue.description
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "font-semibold text-sm mb-3 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-primary" }), " Protocolos de Segurança"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-2",
									children: selectedVenue.safetyProtocols?.map((protocol, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "text-sm text-muted-foreground flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" }), protocol]
									}, idx))
								})] }),
								selectedVenue.monitorsList && selectedVenue.monitorsList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-secondary/20 p-3 rounded-lg border border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-bold uppercase text-muted-foreground mb-2",
										children: "Equipe Responsável"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2",
										children: selectedVenue.monitorsList.map((monitor) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "secondary",
											className: "bg-background",
											children: monitor
										}, monitor))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "font-semibold text-sm mb-3 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Baby, { className: "h-4 w-4 text-primary" }), " Atividades Inclusas"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2",
									children: selectedVenue.activities.map((act) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: "font-normal",
										children: act
									}, act))
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
							className: "p-4 pt-2 border-t border-border/50 bg-background/95 backdrop-blur shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground block",
										children: "Valor por criança"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg font-bold text-primary",
										children: selectedVenue.isFree ? "Grátis" : "Sob consulta"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: handleBooking,
									className: "flex-[2] font-bold shadow-lg shadow-primary/20 rounded-xl",
									children: "Reservar Vaga"
								})]
							})
						})
					] })
				})
			})
		]
	});
}
export { KidsFriendlyList as default };

//# sourceMappingURL=KidsFriendlyList-CUZVnEW4.js.map