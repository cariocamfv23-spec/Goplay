import { t as CalendarDays } from "./calendar-days-cZr_OM4g.js";
import { t as ExternalLink } from "./external-link-BVX_4SKg.js";
import { An as Tv, B as ScrollArea, Gn as Search, Hr as createLucideIcon, Nr as Calendar, On as User, Sn as cn, Tr as Clock, V as ScrollBar, Vr as Activity, Y as mockArenaArticles, mi as require_react, ri as require_jsx_runtime, sn as Button, z as Badge, zr as ArrowLeft } from "./index-D6lOY_hF.js";
import { n as CardContent, t as Card } from "./card-Cxa7RtOt.js";
import { t as Input } from "./input-5SVNFDD5.js";
var Newspaper = createLucideIcon("newspaper", [
	["path", {
		d: "M15 18h-5",
		key: "95g1m2"
	}],
	["path", {
		d: "M18 14h-8",
		key: "sponae"
	}],
	["path", {
		d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",
		key: "39pd36"
	}],
	["rect", {
		width: "8",
		height: "4",
		x: "10",
		y: "6",
		rx: "1",
		key: "aywv1n"
	}]
]);
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
var categories = [
	"Todos",
	"Futebol",
	"Basquete",
	"MMA",
	"Tênis",
	"Surfe",
	"eSports",
	"Corrida"
];
function ArticleDetail({ article, onBack }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-[calc(100vh-8rem)] bg-background pb-24 animate-in slide-in-from-right-4 duration-500",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border/40 px-5 py-4 flex items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: onBack,
				className: "-ml-2 text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5 mr-2" }), "Voltar"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5 pt-6 max-w-3xl mx-auto space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "bg-purple-600 hover:bg-purple-700 text-white border-none shadow-sm text-xs font-bold uppercase tracking-wider",
							children: article.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-foreground",
							children: article.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg text-muted-foreground leading-relaxed font-medium",
							children: article.summary
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground border-y border-border/50 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-4 h-4" }),
								" ",
								article.author
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "w-4 h-4" }),
								" ",
								article.date
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newspaper, { className: "w-4 h-4" }),
								" ",
								article.source
							]
						})
					]
				}),
				article.broadcaster && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 bg-secondary/40 border border-border/50 rounded-xl p-4 text-sm font-medium text-foreground shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl shadow-[0_0_15px_rgba(147,51,234,0.3)] border border-purple-500/30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]",
							children: "📺"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mb-0.5 font-semibold uppercase tracking-wider",
						children: "Onde Assistir"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-extrabold text-purple-500 drop-shadow-sm",
								children: article.broadcaster
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "•"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								article.eventDate?.split("-").reverse().join("/"),
								" às",
								" ",
								article.eventTime
							] })
						]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative aspect-[21/9] w-full overflow-hidden rounded-2xl bg-muted shadow-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: article.image,
						alt: article.title,
						className: "w-full h-full object-cover"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-none text-foreground/90 leading-relaxed text-base space-y-6 mt-8",
					children: article.content.split("\n\n").map((paragraph, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "leading-relaxed",
						children: paragraph
					}, i))
				})
			]
		})]
	});
}
function ArenaGo() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("Todos");
	const [dateFilter, setDateFilter] = (0, import_react.useState)("");
	const [broadcasterFilter, setBroadcasterFilter] = (0, import_react.useState)("all");
	const [selectedArticleId, setSelectedArticleId] = (0, import_react.useState)(null);
	const availableBroadcasters = (0, import_react.useMemo)(() => {
		const broadcasters = new Set(mockArenaArticles.map((a) => a.broadcaster).filter(Boolean));
		return Array.from(broadcasters);
	}, []);
	const filteredArticles = (0, import_react.useMemo)(() => {
		return mockArenaArticles.filter((article) => {
			const matchesSearch = article.title.toLowerCase().includes(search.toLowerCase()) || article.summary.toLowerCase().includes(search.toLowerCase());
			const matchesCategory = activeCategory === "Todos" || article.category === activeCategory;
			const matchesDate = !dateFilter || article.eventDate === dateFilter;
			const matchesBroadcaster = broadcasterFilter === "all" || article.broadcaster === broadcasterFilter;
			return matchesSearch && matchesCategory && matchesDate && matchesBroadcaster;
		});
	}, [
		search,
		activeCategory,
		dateFilter,
		broadcasterFilter
	]);
	const selectedArticle = mockArenaArticles.find((a) => a.id === selectedArticleId);
	if (selectedArticle) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleDetail, {
		article: selectedArticle,
		onBack: () => setSelectedArticleId(null)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-[calc(100vh-8rem)] bg-background pb-24 animate-in fade-in duration-500",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5 pt-6 pb-2 sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border/40",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-2.5 rounded-xl bg-purple-600/10 text-purple-600",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newspaper, { className: "w-6 h-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600",
						children: "Arena Go"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground font-medium",
						children: "Últimas notícias e transmissões esportivas"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Buscar notícias, esportes...",
						className: "pl-9 bg-secondary/50 border-none rounded-xl h-11 focus-visible:ring-purple-600/50",
						value: search,
						onChange: (e) => setSearch(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row gap-3 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: dateFilter,
							onChange: (e) => setDateFilter(e.target.value),
							className: "flex h-11 w-full items-center justify-between rounded-xl border-none bg-secondary/50 px-3 py-2 pl-9 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-purple-600/50 disabled:cursor-not-allowed disabled:opacity-50 text-foreground",
							placeholder: "Filtrar por Data"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tv, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: broadcasterFilter,
								onChange: (e) => setBroadcasterFilter(e.target.value),
								className: "flex h-11 w-full items-center justify-between rounded-xl border-none bg-secondary/50 px-3 py-2 pl-9 pr-8 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-purple-600/50 disabled:cursor-not-allowed disabled:opacity-50 appearance-none text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "Todas as Emissoras"
								}), availableBroadcasters.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: b,
									children: b
								}, b))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									width: "15",
									height: "15",
									viewBox: "0 0 15 15",
									fill: "none",
									xmlns: "http://www.w3.org/2000/svg",
									className: "text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",
										fill: "currentColor",
										fillRule: "evenodd",
										clipRule: "evenodd"
									})
								})
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-1 text-sm font-semibold text-foreground/90",
					children: "Categorias"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollArea, {
					className: "w-full whitespace-nowrap -mx-5 px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex w-max space-x-2 pb-3 pt-2",
						children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: activeCategory === cat ? "default" : "secondary",
							className: cn("cursor-pointer px-4 py-1.5 rounded-full text-xs transition-all", activeCategory === cat ? "bg-purple-600 hover:bg-purple-700 text-white shadow-md" : "hover:bg-secondary/80 text-muted-foreground"),
							onClick: () => setActiveCategory(cat),
							children: cat
						}, cat))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {
						orientation: "horizontal",
						className: "hidden"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-5 pt-6 space-y-6",
			children: filteredArticles.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-20 text-center space-y-4 animate-in zoom-in duration-300",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-inner",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-10 h-10 text-muted-foreground/50" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-bold",
						children: "Nenhum evento encontrado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground max-w-[250px] leading-relaxed",
						children: "Não encontramos resultados para sua busca. Tente alterar as datas ou emissoras."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "mt-2 rounded-xl text-purple-600 border-purple-600/30 hover:bg-purple-600/10",
						onClick: () => {
							setSearch("");
							setActiveCategory("Todos");
							setDateFilter("");
							setBroadcasterFilter("all");
						},
						children: "Limpar Filtros"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-6",
				children: filteredArticles.map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "overflow-hidden border-border/50 shadow-sm bg-card hover:shadow-md transition-shadow group cursor-pointer flex flex-col",
					onClick: () => setSelectedArticleId(article.id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-video w-full overflow-hidden bg-muted shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: article.image,
								alt: article.title,
								className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-3 left-3 flex gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "bg-purple-600 hover:bg-purple-700 text-white border-none shadow-sm text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm",
									children: article.category
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5 flex flex-col flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-[10px] font-medium text-muted-foreground mb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newspaper, { className: "w-3 h-3" }),
											" ",
											article.source
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3 h-3" }),
											" ",
											article.time
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold leading-tight line-clamp-2 mb-2 group-hover:text-purple-600 transition-colors",
								children: article.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed flex-1",
								children: article.summary
							}),
							article.broadcaster && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 bg-secondary/40 rounded-xl p-3 flex items-center justify-between border border-border/50 shadow-sm transition-all group-hover:border-purple-500/30 group-hover:bg-purple-500/5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500/10 to-indigo-500/10 shadow-[0_0_8px_rgba(147,51,234,0.2)]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-base drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]",
											children: "📺"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-extrabold text-foreground tracking-wide group-hover:text-purple-500 transition-colors",
										children: article.broadcaster
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[11px] font-bold text-muted-foreground",
									children: [
										article.eventDate?.split("-").reverse().join("/"),
										" às",
										" ",
										article.eventTime
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "w-full rounded-xl text-purple-600 border-purple-600/30 hover:bg-purple-600/10 h-10 font-semibold group-hover:border-purple-600 transition-colors mt-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-4 h-4 mr-2" }), " Ler artigo completo"]
							})
						]
					})]
				}, article.id))
			})
		})]
	});
}
export { ArenaGo as default };

//# sourceMappingURL=ArenaGo-C86yOPPh.js.map