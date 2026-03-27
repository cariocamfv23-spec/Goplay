import { B as ScrollBar, Fr as ArrowRight, Hn as Search, R as Badge, Sr as Clock, an as Button, ei as require_jsx_runtime, pr as Flame, ui as require_react, z as ScrollArea, zr as createLucideIcon } from "./index-DPiC_-4g.js";
import { n as CardContent, t as Card } from "./card-O6TwzgDw.js";
import { t as Input } from "./input-C5iMmyNY.js";
import { t as DepthContainer } from "./DepthContainer-DGYt7syb.js";
var BookOpen = createLucideIcon("book-open", [["path", {
	d: "M12 7v14",
	key: "1akyts"
}], ["path", {
	d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
	key: "ruj8y"
}]]);
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
var mockNews = [
	{
		id: 1,
		title: "Transferência Histórica: Astro do Futebol assina por valor recorde",
		excerpt: "O mercado da bola está em chamas após a confirmação da maior transferência da década. O acordo surpreendeu especialistas e fãs do esporte.",
		category: "Mercado da Bola",
		sport: "Futebol",
		image: "https://img.usecurling.com/p/800/600?q=soccer%20stadium&color=blue&dpr=2",
		time: "2h atrás",
		readTime: "3 min",
		featured: true
	},
	{
		id: 2,
		title: "Finais da NBA: O jogo que parou o mundo",
		excerpt: "Com uma cesta no último segundo, a equipe garante o campeonato em uma partida inesquecível e consagra nova lenda.",
		category: "Match Recap",
		sport: "Basquete",
		image: "https://img.usecurling.com/p/800/600?q=basketball%20dunk&color=orange&dpr=2",
		time: "4h atrás",
		readTime: "5 min",
		featured: false
	},
	{
		id: 3,
		title: "Nova Promessa do Tênis vence Grand Slam",
		excerpt: "Aos 19 anos, o jovem talento surpreende veteranos e leva o troféu para casa em uma exibição de técnica pura.",
		category: "Exclusivo",
		sport: "Tênis",
		image: "https://img.usecurling.com/p/800/600?q=tennis%20player&color=green&dpr=2",
		time: "Ontem",
		readTime: "4 min",
		featured: false
	},
	{
		id: 4,
		title: "Escândalo no Surfe: Mudanças nas regras geram polêmica",
		excerpt: "A nova pontuação da liga mundial está causando divisões entre os atletas de elite, que ameaçam boicote na próxima etapa.",
		category: "Polêmica",
		sport: "Surfe",
		image: "https://img.usecurling.com/p/800/600?q=surfing%20wave&color=cyan&dpr=2",
		time: "Ontem",
		readTime: "6 min",
		featured: false
	},
	{
		id: 5,
		title: "Renovação Contratual: Piloto campeão garante mais 3 anos",
		excerpt: "Após semanas de intensas negociações, o anúncio oficial veio nesta manhã para a alegria da torcida.",
		category: "Mercado",
		sport: "Motorsport",
		image: "https://img.usecurling.com/p/800/600?q=race%20car&color=red&dpr=2",
		time: "2 dias atrás",
		readTime: "2 min",
		featured: false
	},
	{
		id: 6,
		title: "Ascensão do E-Sports: Torneio bate recorde de audiência",
		excerpt: "A grande final do mundial atraiu mais de 10 milhões de espectadores simultâneos, consolidando o cenário competitivo.",
		category: "Trending",
		sport: "E-Sports",
		image: "https://img.usecurling.com/p/800/600?q=esports%20gaming&color=purple&dpr=2",
		time: "2 dias atrás",
		readTime: "4 min",
		featured: false
	}
];
function ArenaGo() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [activeSport, setActiveSport] = (0, import_react.useState)("Todos");
	const categories = ["Todos", ...Array.from(new Set(mockNews.map((n) => n.sport)))];
	const filteredNews = (0, import_react.useMemo)(() => {
		return mockNews.filter((news) => {
			const matchesSearch = news.title.toLowerCase().includes(search.toLowerCase()) || news.excerpt.toLowerCase().includes(search.toLowerCase());
			const matchesSport = activeSport === "Todos" || news.sport === activeSport;
			return matchesSearch && matchesSport;
		});
	}, [search, activeSport]);
	const featuredItem = filteredNews.find((n) => n.featured) || filteredNews[0];
	const regularItems = filteredNews.filter((n) => n.id !== featuredItem?.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-24 animate-in fade-in duration-500",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5 pt-6 pb-2 sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border/40",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-2 rounded-xl bg-orange-500/10 text-orange-500",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-6 h-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600",
						children: "Arena Go"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground font-medium",
						children: "Tudo o que acontece no mundo dos esportes"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Buscar notícias, atletas ou esportes...",
						className: "pl-9 bg-secondary/50 border-none rounded-xl h-11 focus-visible:ring-orange-500/50",
						value: search,
						onChange: (e) => setSearch(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollArea, {
					className: "w-full whitespace-nowrap -mx-5 px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex w-max space-x-2 pb-3",
						children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: activeSport === cat ? "default" : "secondary",
							className: `cursor-pointer px-4 py-1.5 rounded-full text-xs transition-all ${activeSport === cat ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md" : "hover:bg-secondary/80"}`,
							onClick: () => setActiveSport(cat),
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
			children: filteredNews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-20 text-center space-y-4 animate-in zoom-in duration-300",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-inner",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newspaper, { className: "w-10 h-10 text-muted-foreground/50" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-bold",
						children: "Nenhuma notícia encontrada"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground max-w-[250px] leading-relaxed",
						children: "Não encontramos resultados para sua busca. Tente buscar por outros termos ou categorias."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "mt-2 rounded-xl",
						onClick: () => {
							setSearch("");
							setActiveSport("Todos");
						},
						children: "Limpar Filtros"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [featuredItem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthContainer, {
				maxRotation: 2,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "overflow-hidden border-none shadow-lg cursor-pointer group bg-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-[4/3] w-full overflow-hidden bg-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: featuredItem.image,
								alt: featuredItem.title,
								className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-4 left-4 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "bg-red-500 hover:bg-red-600 border-none shadow-sm text-[10px] font-bold uppercase tracking-wider",
									children: "HOT"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									className: "bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md shadow-sm text-[10px]",
									children: featuredItem.sport
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-4 left-4 right-4 text-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold leading-tight mb-2 drop-shadow-md",
									children: featuredItem.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-[10px] font-medium opacity-90",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3 h-3" }),
											" ",
											featuredItem.time
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-3 h-3" }),
											" ",
											featuredItem.readTime
										]
									})]
								})]
							})
						]
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-4",
				children: regularItems.map((news) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthContainer, {
					maxRotation: 2,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "overflow-hidden border-border/50 shadow-sm cursor-pointer group hover:border-orange-500/30 hover:shadow-md transition-all flex flex-col h-full bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-40 w-full overflow-hidden bg-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: news.image,
									alt: news.title,
									className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-3 left-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "bg-background/80 hover:bg-background text-foreground border-none backdrop-blur-md shadow-sm text-[10px] font-medium",
										children: news.category
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-4 flex-1 flex flex-col",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-orange-500 uppercase tracking-wider",
										children: news.sport
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-2 text-[10px] text-muted-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3 h-3" }),
												" ",
												news.time
											]
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-bold leading-snug mb-2 group-hover:text-orange-500 transition-colors line-clamp-2",
									children: news.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed",
									children: news.excerpt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-auto flex items-center justify-between pt-3 border-t border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors",
										children: "Ler notícia completa"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-7 h-7 rounded-full bg-secondary flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all group-hover:scale-110 shadow-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3.5 h-3.5" })
									})]
								})
							]
						})]
					})
				}, news.id))
			})] })
		})]
	});
}
export { ArenaGo as default };

//# sourceMappingURL=ArenaGo--COQZ_FV.js.map