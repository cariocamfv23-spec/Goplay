import { B as ScrollBar, En as User, On as Tv, R as Badge, Tr as CircleCheckBig, Un as Search, an as Button, bn as cn, fi as require_react, ir as Info, ti as require_jsx_runtime, z as ScrollArea, zr as Activity } from "./index-Uc2134GP.js";
import { n as CardContent, t as Card } from "./card-DXb0o2fL.js";
import { t as Input } from "./input-D8Y2sdwZ.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
var mockPosts = [
	{
		id: 1,
		title: "Agachamento Perfeito",
		trainer: "Carlos Mendes",
		modality: "Musculação",
		intensity: "Média",
		tip: "Mantenha a coluna neutra e os joelhos alinhados com as pontas dos pés. Desça até que as coxas fiquem paralelas ao chão.",
		videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
		poster: "https://img.usecurling.com/p/800/600?q=squat%20exercise&color=purple"
	},
	{
		id: 2,
		title: "Circuito Queima Gordura",
		trainer: "Ana Silva",
		modality: "CrossFit",
		intensity: "Alta",
		tip: "Faça os movimentos de forma contínua, focando na respiração. Não sacrifique a técnica pela velocidade.",
		videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
		poster: "https://img.usecurling.com/p/800/600?q=crossfit%20workout&color=purple"
	},
	{
		id: 3,
		title: "Saudação ao Sol",
		trainer: "Marta Lima",
		modality: "Yoga",
		intensity: "Baixa",
		tip: "Sincronize cada movimento com a respiração. Inspire ao expandir e expire ao flexionar.",
		videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
		poster: "https://img.usecurling.com/p/800/600?q=yoga%20pose&color=purple"
	},
	{
		id: 4,
		title: "Técnica de Passada",
		trainer: "Beto Costa",
		modality: "Corrida",
		intensity: "Média",
		tip: "Aterrisse com o meio do pé para reduzir o impacto nas articulações. Mantenha os braços num ângulo de 90 graus.",
		videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
		poster: "https://img.usecurling.com/p/800/600?q=running%20track&color=purple"
	},
	{
		id: 5,
		title: "Mobilidade Articular",
		trainer: "Lucas Souza",
		modality: "Funcional",
		intensity: "Baixa",
		tip: "Realize os movimentos de forma lenta e controlada para explorar o máximo de amplitude de cada articulação.",
		videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
		poster: "https://img.usecurling.com/p/800/600?q=stretching&color=purple"
	},
	{
		id: 6,
		title: "Levantamento Terra",
		trainer: "Carlos Mendes",
		modality: "Musculação",
		intensity: "Alta",
		tip: "O movimento deve partir dos quadris. Contraia o abdômen e mantenha a barra próxima ao corpo durante toda a execução.",
		videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
		poster: "https://img.usecurling.com/p/800/600?q=deadlift&color=purple"
	}
];
var categories = [
	"Todos",
	"Musculação",
	"CrossFit",
	"Yoga",
	"Corrida",
	"Funcional"
];
function ArenaGo() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [activeModality, setActiveModality] = (0, import_react.useState)("Todos");
	const filteredPosts = (0, import_react.useMemo)(() => {
		return mockPosts.filter((post) => {
			const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || post.tip.toLowerCase().includes(search.toLowerCase());
			const matchesModality = activeModality === "Todos" || post.modality === activeModality;
			return matchesSearch && matchesModality;
		});
	}, [search, activeModality]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-24 animate-in fade-in duration-500",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5 pt-6 pb-2 sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border/40",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-2.5 rounded-xl bg-purple-600/10 text-purple-600",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tv, { className: "w-6 h-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600",
						children: "GoArena"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground font-medium",
						children: "Treinos, dicas e vídeos em um só lugar"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Buscar por treinos, dicas...",
						className: "pl-9 bg-secondary/50 border-none rounded-xl h-11 focus-visible:ring-purple-600/50",
						value: search,
						onChange: (e) => setSearch(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-1 text-sm font-semibold text-foreground/90",
					children: "Filtros"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollArea, {
					className: "w-full whitespace-nowrap -mx-5 px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex w-max space-x-2 pb-3 pt-2",
						children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: activeModality === cat ? "default" : "secondary",
							className: cn("cursor-pointer px-4 py-1.5 rounded-full text-xs transition-all", activeModality === cat ? "bg-purple-600 hover:bg-purple-700 text-white shadow-md" : "hover:bg-secondary/80 text-muted-foreground"),
							onClick: () => setActiveModality(cat),
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
			children: filteredPosts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-20 text-center space-y-4 animate-in zoom-in duration-300",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-inner",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-10 h-10 text-muted-foreground/50" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-bold",
						children: "Nenhum treino encontrado"
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
							setActiveModality("Todos");
						},
						children: "Limpar Filtros"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-6",
				children: filteredPosts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "overflow-hidden border-border/50 shadow-sm bg-card hover:shadow-md transition-shadow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-video w-full bg-black group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("video", {
							className: "w-full h-full object-cover",
							controls: true,
							poster: post.poster,
							preload: "none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
								src: post.videoUrl,
								type: "video/mp4"
							}), "Seu navegador não suporta o elemento de vídeo."]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute top-3 left-3 flex gap-2 pointer-events-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "bg-purple-600/90 hover:bg-purple-600 text-white border-none shadow-sm text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm",
								children: post.modality
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "secondary",
								className: "bg-black/60 text-white border-none backdrop-blur-md shadow-sm text-[10px]",
								children: ["Intensidade: ", post.intensity]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5 flex-1 flex flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-between mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-bold leading-tight line-clamp-1",
									children: post.title
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-8 h-8 rounded-full bg-secondary flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-4 h-4 text-purple-600" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold",
									children: post.trainer
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] text-muted-foreground flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "w-3 h-3 text-green-500" }),
										" ",
										"Treinador Verificado"
									]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-purple-600/5 rounded-xl p-4 border border-purple-600/10 mb-4 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "flex items-center gap-1.5 text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "w-3.5 h-3.5" }), "Dica do Expert"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-foreground/80 leading-relaxed",
									children: post.tip
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full mt-auto bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-11 font-semibold",
								children: "Ver mais"
							})
						]
					})]
				}, post.id))
			})
		})]
	});
}
export { ArenaGo as default };

//# sourceMappingURL=ArenaGo-xZipQo4B.js.map