import { t as LoaderCircle } from "./loader-circle-DUQx21oy.js";
import { t as Play } from "./play-DSSrFgeK.js";
import { t as QrCode } from "./qr-code-BR7Zm-4G.js";
import { t as ShieldAlert } from "./shield-alert-H-FvaSCf.js";
import { B as ScrollBar, Cn as X, Dn as User, Er as CircleCheckBig, R as Badge, Sn as Zap, Sr as CreditCard, Vr as Activity, Wn as Search, ar as Info, br as Dumbbell, d as Description, f as Overlay, h as Title, l as Close, m as Root, mi as require_react, nr as Lock, oi as useToast, on as Button, p as Portal, ri as require_jsx_runtime, u as Content, xn as cn, z as ScrollArea } from "./index-Bmwg26o-.js";
import { n as CardContent, t as Card } from "./card-DGizBIKW.js";
import { t as Input } from "./input-Bma7CNmO.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
var mockPosts = [
	{
		id: 1,
		title: "Agachamento Perfeito",
		trainer: "Carlos Mendes",
		modality: "Musculação",
		intensity: "Avançado",
		tip: "Mantenha a coluna neutra e os joelhos alinhados com as pontas dos pés. Desça até que as coxas fiquem paralelas ao chão.",
		videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
		poster: "https://img.usecurling.com/p/800/600?q=squat%20exercise&color=purple",
		steps: [
			"Posicione os pés na largura dos ombros",
			"Desça o quadril como se fosse sentar numa cadeira",
			"Mantenha o peito estufado e olhar à frente",
			"Retorne à posição inicial contraindo os glúteos"
		],
		price: 19.9,
		pointsPrice: 500
	},
	{
		id: 2,
		title: "Circuito Queima Gordura",
		trainer: "Ana Silva",
		modality: "CrossFit",
		intensity: "Alta",
		tip: "Faça os movimentos de forma contínua, focando na respiração. Não sacrifique a técnica pela velocidade.",
		videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
		poster: "https://img.usecurling.com/p/800/600?q=crossfit%20workout&color=purple",
		steps: [
			"Faça 10 burpees rapidamente",
			"Pule na caixa (box jump) 15 vezes",
			"Balance kettlebell (kettlebell swing) 20 vezes",
			"Descanse 1 minuto e repita o circuito"
		],
		price: 24.9,
		pointsPrice: 600
	},
	{
		id: 3,
		title: "Saudação ao Sol",
		trainer: "Marta Lima",
		modality: "Yoga",
		intensity: "Iniciante",
		tip: "Sincronize cada movimento com a respiração. Inspire ao expandir e expire ao flexionar.",
		videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
		poster: "https://img.usecurling.com/p/800/600?q=yoga%20pose&color=purple",
		steps: [
			"Comece na postura da montanha (Tadasana)",
			"Inspire e levante os braços (Urdhva Hastasana)",
			"Expire e dobre-se para a frente (Uttanasana)",
			"Inspire, alongue a coluna e olhe para frente"
		],
		price: 14.9,
		pointsPrice: 350
	},
	{
		id: 4,
		title: "Técnica de Passada",
		trainer: "Beto Costa",
		modality: "Corrida",
		intensity: "Intermediário",
		tip: "Aterrisse com o meio do pé para reduzir o impacto nas articulações. Mantenha os braços num ângulo de 90 graus.",
		videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
		poster: "https://img.usecurling.com/p/800/600?q=running%20track&color=purple",
		steps: [
			"Aqueça com uma caminhada de 5 minutos",
			"Acelere aos poucos, mantendo o tronco levemente inclinado",
			"Mantenha a cadência em torno de 170-180 passos por minuto",
			"Relaxe os ombros e controle a respiração"
		],
		price: 19.9,
		pointsPrice: 500
	},
	{
		id: 5,
		title: "Mobilidade Articular",
		trainer: "Lucas Souza",
		modality: "Funcional",
		intensity: "Iniciante",
		tip: "Realize os movimentos de forma lenta e controlada para explorar o máximo de amplitude de cada articulação.",
		videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
		poster: "https://img.usecurling.com/p/800/600?q=stretching&color=purple",
		steps: [
			"Gire os ombros para trás e para frente 10 vezes",
			"Faça rotações de quadril amplas",
			"Estenda as pernas e alongue os isquiotibiais",
			"Mantenha cada alongamento por 30 segundos"
		],
		price: 12.9,
		pointsPrice: 300
	},
	{
		id: 6,
		title: "Levantamento Terra",
		trainer: "Carlos Mendes",
		modality: "Musculação",
		intensity: "Avançado",
		tip: "O movimento deve partir dos quadris. Contraia o abdômen e mantenha a barra próxima ao corpo durante toda a execução.",
		videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
		poster: "https://img.usecurling.com/p/800/600?q=deadlift&color=purple",
		steps: [
			"Fique próximo à barra com os pés na largura dos ombros",
			"Segure a barra e abaixe o quadril",
			"Puxe a barra mantendo as costas retas e o core ativado",
			"Estenda completamente os quadris e joelhos no topo"
		],
		price: 29.9,
		pointsPrice: 800
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
function InfinityHub() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [activeModality, setActiveModality] = (0, import_react.useState)("Todos");
	const [selectedWorkout, setSelectedWorkout] = (0, import_react.useState)(null);
	const [unlockedVideos, setUnlockedVideos] = (0, import_react.useState)([]);
	const [isPaymentModalOpen, setIsPaymentModalOpen] = (0, import_react.useState)(false);
	const [isProcessingPayment, setIsProcessingPayment] = (0, import_react.useState)(false);
	const [selectedPaymentMethod, setSelectedPaymentMethod] = (0, import_react.useState)("goplay_credits");
	const { toast: toast$1 } = useToast();
	const videoRef = (0, import_react.useRef)(null);
	const handleTimeUpdate = (e) => {
		const video = e.currentTarget;
		if (selectedWorkout && !unlockedVideos.includes(selectedWorkout.id) && video.currentTime >= 10) {
			video.pause();
			setIsPaymentModalOpen(true);
		}
	};
	const handleStartWorkout = () => {
		if (selectedWorkout && !unlockedVideos.includes(selectedWorkout.id)) {
			setIsPaymentModalOpen(true);
			if (videoRef.current) videoRef.current.pause();
		} else {
			toast$1({
				title: "Treino Iniciado!",
				description: "Bom treino!"
			});
			setSelectedWorkout(null);
		}
	};
	const handlePayment = () => {
		if (!selectedWorkout) return;
		setIsProcessingPayment(true);
		setTimeout(() => {
			setIsProcessingPayment(false);
			setUnlockedVideos((prev) => [...prev, selectedWorkout.id]);
			setIsPaymentModalOpen(false);
			toast$1({
				title: "Sucesso!",
				description: "Treino desbloqueado com sucesso."
			});
			if (videoRef.current) videoRef.current.play();
		}, 1500);
	};
	const filteredPosts = (0, import_react.useMemo)(() => {
		return mockPosts.filter((post) => {
			const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || post.tip.toLowerCase().includes(search.toLowerCase());
			const matchesModality = activeModality === "Todos" || post.modality === activeModality;
			return matchesSearch && matchesModality;
		});
	}, [search, activeModality]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-[calc(100vh-8rem)] bg-background pb-24 animate-in fade-in duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 pt-6 pb-2 sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border/40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-2.5 rounded-xl bg-purple-600/10 text-purple-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { className: "w-6 h-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600",
							children: "Infinity Hub"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground font-medium",
							children: "Treinos exclusivos, vídeos e dicas passo a passo"
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
						children: "Modalidades"
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
							children: "Não encontramos resultados para sua busca. Tente buscar por outros termos ou modalidades."
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
						className: "overflow-hidden border-border/50 shadow-sm bg-card hover:shadow-md transition-shadow cursor-pointer group",
						onClick: () => setSelectedWorkout(post),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-video w-full bg-black",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: post.poster,
									alt: post.title,
									className: "w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "bg-black/50 p-3 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-6 h-6 ml-1 text-white" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute top-3 left-3 flex gap-2 pointer-events-none flex-wrap max-w-[80%]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: "bg-purple-600/90 text-white border-none shadow-sm text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm",
											children: post.modality
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "secondary",
											className: "bg-black/60 text-white border-none backdrop-blur-md shadow-sm text-[10px] font-semibold",
											children: post.intensity
										}),
										!unlockedVideos.includes(post.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											className: "bg-amber-500/90 text-white border-none backdrop-blur-md shadow-sm text-[10px] font-bold uppercase flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-2.5 h-2.5" }), " Premium"]
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-5 flex-1 flex flex-col",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center justify-between mb-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-bold leading-tight line-clamp-1 group-hover:text-purple-600 transition-colors",
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed",
									children: post.tip
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-auto pt-4 flex items-center justify-between",
									children: [!unlockedVideos.includes(post.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-bold text-amber-500 flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-3 h-3" }),
											" ",
											post.pointsPrice,
											" pts"
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-bold text-green-500 flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "w-3 h-3" }), " Desbloqueado"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-9 px-4 font-semibold text-xs group-hover:shadow-md transition-shadow",
										children: "Assistir"
									})]
								})
							]
						})]
					}, post.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
				open: !!selectedWorkout,
				onOpenChange: (open) => !open && setSelectedWorkout(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
					className: "fixed left-1/2 top-[50%] w-[95%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-card border border-border/50 rounded-3xl p-0 overflow-hidden z-[100] shadow-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 flex flex-col max-h-[90vh]",
					children: selectedWorkout && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-video w-full bg-black group",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("video", {
								ref: videoRef,
								className: "w-full h-full object-cover",
								controls: true,
								poster: selectedWorkout.poster,
								preload: "metadata",
								autoPlay: true,
								onTimeUpdate: handleTimeUpdate,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
									src: selectedWorkout.videoUrl,
									type: "video/mp4"
								}), "Seu navegador não suporta o elemento de vídeo."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-3 left-3 flex gap-2 pointer-events-none z-20",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: "bg-purple-600/90 text-white border-none shadow-sm text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm",
										children: selectedWorkout.modality
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "bg-black/60 text-white border-none backdrop-blur-md shadow-sm text-[10px] font-semibold",
										children: selectedWorkout.intensity
									}),
									!unlockedVideos.includes(selectedWorkout.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										className: "bg-amber-500 text-white border-none backdrop-blur-md shadow-sm text-[10px] font-bold uppercase flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-3 h-3" }), " Preview (10s)"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-sm text-white transition-colors z-20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 overflow-y-auto no-scrollbar",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
								className: "text-2xl font-bold mb-4 tracking-tight",
								children: selectedWorkout.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mb-6 p-3 bg-secondary/50 rounded-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-5 h-5 text-purple-600" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold",
									children: selectedWorkout.trainer
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
								className: "space-y-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-purple-600/5 border border-purple-600/10 rounded-2xl p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										className: "flex items-center gap-2 font-bold text-purple-700 dark:text-purple-400 mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "w-4 h-4" }), " Dica do Especialista"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
										className: "text-sm text-foreground/80 leading-relaxed",
										children: selectedWorkout.tip
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "flex items-center gap-2 font-bold text-foreground mb-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-4 h-4 text-purple-600" }),
										" ",
										"Passo a Passo"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "space-y-4 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-secondary",
									children: selectedWorkout.steps.map((step, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "relative pl-8 flex items-start",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute left-0 top-0 w-6 h-6 rounded-full bg-background border-2 border-purple-600 flex items-center justify-center text-[10px] font-bold text-purple-600 z-10",
											children: idx + 1
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-muted-foreground pt-0.5 leading-relaxed font-medium",
											children: step
										})]
									}, idx))
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 pt-4 border-t border-border/50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-base h-12 rounded-xl flex items-center justify-center gap-2",
									onClick: handleStartWorkout,
									children: !unlockedVideos.includes(selectedWorkout.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-5 h-5" }), " Desbloquear Treino"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-5 h-5" }), " Iniciar Agora"] })
								})
							})
						]
					})] })
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
				open: isPaymentModalOpen,
				onOpenChange: setIsPaymentModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
					className: "fixed left-1/2 top-[50%] w-[95%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-card border border-border/50 rounded-3xl p-6 z-[150] shadow-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 flex flex-col max-h-[90vh]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
							className: "text-xl font-bold mb-2",
							children: "Desbloquear Treino"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
							className: "text-sm text-muted-foreground mb-6",
							children: "Este é um conteúdo premium. Escolha como deseja pagar para ter acesso completo ao treino e dicas."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setSelectedPaymentMethod("goplay_credits"),
									className: cn("flex items-center justify-between w-full p-4 rounded-xl border transition-all", selectedPaymentMethod === "goplay_credits" ? "border-purple-600 bg-purple-600/10" : "border-border hover:bg-secondary/50"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-2 bg-purple-600/20 text-purple-600 rounded-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-5 h-5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-left",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-sm text-foreground",
												children: "Créditos GoPlay"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: "Saldo: 5.500 pts"
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-purple-600",
										children: [selectedWorkout?.pointsPrice, " pts"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setSelectedPaymentMethod("credit_card"),
									className: cn("flex items-center justify-between w-full p-4 rounded-xl border transition-all", selectedPaymentMethod === "credit_card" ? "border-purple-600 bg-purple-600/10" : "border-border hover:bg-secondary/50"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-2 bg-secondary text-foreground rounded-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "w-5 h-5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-left",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-sm text-foreground",
												children: "Cartão de Crédito"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: "Terminado em 4321"
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-foreground",
										children: ["R$ ", selectedWorkout?.price.toFixed(2).replace(".", ",")]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setSelectedPaymentMethod("pix"),
									className: cn("flex items-center justify-between w-full p-4 rounded-xl border transition-all", selectedPaymentMethod === "pix" ? "border-purple-600 bg-purple-600/10" : "border-border hover:bg-secondary/50"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-2 bg-secondary text-foreground rounded-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "w-5 h-5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-left",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-sm text-foreground",
												children: "PIX"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: "Aprovação imediata"
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-foreground",
										children: ["R$ ", selectedWorkout?.price.toFixed(2).replace(".", ",")]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 mt-auto pt-4 border-t border-border/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "flex-1 rounded-xl h-12",
								onClick: () => setIsPaymentModalOpen(false),
								children: "Voltar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-12 font-bold",
								onClick: handlePayment,
								disabled: isProcessingPayment,
								children: isProcessingPayment ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-5 h-5 animate-spin" }) : "Confirmar Pagamento"
							})]
						})
					]
				})] })
			})
		]
	});
}
export { InfinityHub as default };

//# sourceMappingURL=InfinityHub-Dv9RAN_1.js.map