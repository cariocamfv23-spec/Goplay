import { t as ExternalLink } from "./external-link-BBZDlj1Z.js";
import { B as ScrollBar, Br as createLucideIcon, Cr as Clock, R as Badge, Un as Search, an as Button, bn as cn, fi as require_react, ti as require_jsx_runtime, z as ScrollArea, zr as Activity } from "./index-BClvu0uS.js";
import { n as CardContent, t as Card } from "./card-CkQzEtJj.js";
import { t as Input } from "./input-BAXz1H52.js";
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
var mockArticles = [
	{
		id: 1,
		title: "Nova Promessa do Futebol Brasileiro Assina com Clube Europeu",
		summary: "Jovem talento de 18 anos fecha contrato de 5 anos com gigante da Espanha após temporada brilhante no campeonato regional.",
		category: "Futebol",
		source: "Globo Esporte",
		time: "Há 2 horas",
		image: "https://img.usecurling.com/p/800/400?q=soccer%20player%20contract&color=blue"
	},
	{
		id: 2,
		title: "Mundial de Surfe: Brasileiros Dominam as Finais",
		summary: "Com atuações históricas, surfistas do Brasil garantem as três primeiras colocações na etapa decisiva do Havaí.",
		category: "Surfe",
		source: "Canal Off",
		time: "Há 4 horas",
		image: "https://img.usecurling.com/p/800/400?q=surfing%20competition&color=cyan"
	},
	{
		id: 3,
		title: "Finais da NBA: Jogo Decisivo Vai para a Prorrogação",
		summary: "Uma partida emocionante que parou o mundo dos esportes na noite de ontem com recorde histórico de audiência.",
		category: "Basquete",
		source: "ESPN",
		time: "Há 5 horas",
		image: "https://img.usecurling.com/p/800/400?q=basketball%20arena&color=orange"
	},
	{
		id: 4,
		title: "O Crescimento do E-Sports no Cenário Global",
		summary: "Como os campeonatos de games estão ultrapassando audiências de esportes tradicionais ao redor do mundo em 2024.",
		category: "eSports",
		source: "Tech Sports",
		time: "Há 12 horas",
		image: "https://img.usecurling.com/p/800/400?q=esports%20tournament&color=purple"
	},
	{
		id: 5,
		title: "Maratona Internacional Quebra Recorde de Participantes",
		summary: "Mais de 50 mil corredores tomaram as ruas da cidade neste domingo chuvoso, demonstrando o crescimento da modalidade.",
		category: "Corrida",
		source: "Runner World",
		time: "Ontem",
		image: "https://img.usecurling.com/p/800/400?q=marathon%20runners&color=red"
	}
];
var categories = [
	"Todos",
	"Futebol",
	"Surfe",
	"Basquete",
	"eSports",
	"Corrida"
];
function ArenaGo() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("Todos");
	const filteredArticles = (0, import_react.useMemo)(() => {
		return mockArticles.filter((article) => {
			const matchesSearch = article.title.toLowerCase().includes(search.toLowerCase()) || article.summary.toLowerCase().includes(search.toLowerCase());
			const matchesCategory = activeCategory === "Todos" || article.category === activeCategory;
			return matchesSearch && matchesCategory;
		});
	}, [search, activeCategory]);
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
						children: "Últimas notícias e artigos do mundo esportivo"
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
						children: "Nenhum artigo encontrado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground max-w-[250px] leading-relaxed",
						children: "Não encontramos resultados para sua busca. Tente buscar por outros termos ou categorias."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "mt-2 rounded-xl text-purple-600 border-purple-600/30 hover:bg-purple-600/10",
						onClick: () => {
							setSearch("");
							setActiveCategory("Todos");
						},
						children: "Limpar Filtros"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-6",
				children: filteredArticles.map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "overflow-hidden border-border/50 shadow-sm bg-card hover:shadow-md transition-shadow group cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-video w-full overflow-hidden bg-muted",
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
						className: "p-5",
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
								className: "text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed",
								children: article.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "w-full rounded-xl text-purple-600 border-purple-600/30 hover:bg-purple-600/10 h-10 font-semibold group-hover:border-purple-600 transition-colors",
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

//# sourceMappingURL=ArenaGo-Cd9ZuV7X.js.map