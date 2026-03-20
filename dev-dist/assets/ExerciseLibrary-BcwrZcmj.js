import { t as CirclePlay } from "./circle-play-BxuqJf6o.js";
import { t as Flame } from "./flame-CRojVY9b.js";
import { t as Video } from "./video-Cuew5KPC.js";
import { An as Search, Ir as require_jsx_runtime, Kr as require_react, M as Badge, N as ScrollArea, Ur as useNavigate, Xt as Button, c as DialogContent, d as DialogHeader, f as DialogTitle, gn as Trophy, ln as cn, o as Dialog, tr as Dumbbell, xr as Activity, yr as ArrowLeft } from "./index-Bs1Nxvp8.js";
import { n as CardContent, t as Card } from "./card-uCTjPuOL.js";
import { t as Input } from "./input-nDIcbtqz.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-_dk6Xmsh.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
var exercises = [
	{
		id: "fit1",
		name: "Agachamento Livre",
		category: "fitness",
		difficulty: "Iniciante",
		image: "https://img.usecurling.com/p/400/300?q=squat%20exercise&color=blue",
		description: "Exercício fundamental para pernas e glúteos. Mantenha a postura ereta.",
		duration: "10 min",
		calories: 80,
		videoUrl: "https://img.usecurling.com/p/800/450?q=squat%20video"
	},
	{
		id: "fit2",
		name: "Flexão de Braço",
		category: "fitness",
		difficulty: "Intermediário",
		image: "https://img.usecurling.com/p/400/300?q=pushup%20exercise&color=red",
		description: "Fortalece peitoral, ombros e tríceps. Mantenha o corpo alinhado.",
		duration: "5 min",
		calories: 45,
		videoUrl: "https://img.usecurling.com/p/800/450?q=pushup%20video"
	},
	{
		id: "fit3",
		name: "Burpees",
		category: "fitness",
		difficulty: "Avançado",
		image: "https://img.usecurling.com/p/400/300?q=burpee%20exercise&color=orange",
		description: "Exercício de corpo total de alta intensidade.",
		duration: "8 min",
		calories: 120,
		videoUrl: "https://img.usecurling.com/p/800/450?q=burpee%20video"
	},
	{
		id: "soc1",
		name: "Controle de Bola",
		category: "futebol",
		difficulty: "Iniciante",
		image: "https://img.usecurling.com/p/400/300?q=soccer%20dribbling&color=green",
		description: "Melhore seu domínio e toque curto com a bola.",
		duration: "15 min",
		calories: 110,
		videoUrl: "https://img.usecurling.com/p/800/450?q=soccer%20dribbling%20video"
	},
	{
		id: "soc2",
		name: "Chute de Precisão",
		category: "futebol",
		difficulty: "Intermediário",
		image: "https://img.usecurling.com/p/400/300?q=soccer%20kick&color=green",
		description: "Treino focado em acertar alvos específicos no gol.",
		duration: "20 min",
		calories: 140,
		videoUrl: "https://img.usecurling.com/p/800/450?q=soccer%20kick%20video"
	},
	{
		id: "bas1",
		name: "Arremesso Livre",
		category: "basquete",
		difficulty: "Iniciante",
		image: "https://img.usecurling.com/p/400/300?q=basketball%20shot&color=orange",
		description: "Mecânica básica de arremesso para lances livres.",
		duration: "15 min",
		calories: 90,
		videoUrl: "https://img.usecurling.com/p/800/450?q=basketball%20shot%20video"
	},
	{
		id: "bas2",
		name: "Drible Cruzado",
		category: "basquete",
		difficulty: "Avançado",
		image: "https://img.usecurling.com/p/400/300?q=basketball%20dribble&color=orange",
		description: "Cross-over dribble para superar adversários.",
		duration: "12 min",
		calories: 130,
		videoUrl: "https://img.usecurling.com/p/800/450?q=basketball%20dribble%20video"
	},
	{
		id: "yog1",
		name: "Saudação ao Sol",
		category: "yoga",
		difficulty: "Iniciante",
		image: "https://img.usecurling.com/p/400/300?q=yoga%20sun%20salutation&color=purple",
		description: "Sequência clássica para aquecer e alongar o corpo.",
		duration: "10 min",
		calories: 50,
		videoUrl: "https://img.usecurling.com/p/800/450?q=yoga%20sun%20salutation%20video"
	},
	{
		id: "yog2",
		name: "Postura do Guerreiro",
		category: "yoga",
		difficulty: "Intermediário",
		image: "https://img.usecurling.com/p/400/300?q=yoga%20warrior&color=purple",
		description: "Fortalece pernas e melhora o equilíbrio.",
		duration: "8 min",
		calories: 40,
		videoUrl: "https://img.usecurling.com/p/800/450?q=yoga%20warrior%20video"
	}
];
function ExerciseLibrary() {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [activeTab, setActiveTab] = (0, import_react.useState)("todos");
	const [selectedVideo, setSelectedVideo] = (0, import_react.useState)(null);
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const filteredExercises = exercises.filter((exercise) => {
		const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesTab = activeTab === "todos" || exercise.category === activeTab;
		return matchesSearch && matchesTab;
	});
	const categories = [
		{
			id: "todos",
			label: "Todos",
			icon: Activity
		},
		{
			id: "fitness",
			label: "Fitness",
			icon: Dumbbell
		},
		{
			id: "futebol",
			label: "Futebol",
			icon: Trophy
		},
		{
			id: "basquete",
			label: "Basquete",
			icon: Flame
		},
		{
			id: "yoga",
			label: "Yoga",
			icon: Activity
		}
	];
	const handleSelectExercise = (exercise) => {
		navigate("/ai/motion-analysis", { state: { exercise } });
	};
	const handleOpenVideo = (e, exercise) => {
		e.stopPropagation();
		setSelectedVideo(exercise);
		setIsPlaying(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => navigate(-1),
						className: "rounded-full hover:bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-bold",
						children: "Biblioteca de Exercícios"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Buscar exercício...",
						value: searchTerm,
						onChange: (e) => setSearchTerm(e.target.value),
						className: "pl-9 bg-secondary/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "todos",
					value: activeTab,
					onValueChange: setActiveTab,
					className: "w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
						className: "w-full justify-start overflow-x-auto bg-transparent p-0 mb-4 h-auto gap-2 no-scrollbar",
						children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: cat.id,
							className: "rounded-full border border-border/50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 h-auto shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(cat.icon, { className: "w-4 h-4 mr-2" }), cat.label]
						}, cat.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: activeTab,
						className: "mt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
							className: "h-[calc(100vh-200px)] pb-20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-4 pb-20",
								children: [filteredExercises.map((exercise) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
									className: "overflow-hidden border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all cursor-pointer group",
									onClick: () => handleSelectExercise(exercise),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative h-40 w-full overflow-hidden",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: exercise.image,
												alt: exercise.name,
												className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "absolute bottom-3 left-3 right-3 z-20 flex justify-between items-end",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "secondary",
													className: "font-semibold backdrop-blur-md bg-black/40 text-white border-none",
													children: exercise.difficulty
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-col items-end text-white text-xs font-medium",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "flex items-center gap-1",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-3 h-3 text-primary" }),
															" ",
															exercise.calories,
															" kcal"
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "opacity-80",
														children: exercise.duration
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "secondary",
												size: "icon",
												className: "absolute top-2 right-2 z-20 h-8 w-8 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity",
												onClick: (e) => handleOpenVideo(e, exercise),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-4 w-4" })
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										className: "p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-bold text-lg mb-1 group-hover:text-primary transition-colors",
												children: exercise.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted-foreground line-clamp-2 mb-3",
												children: exercise.description
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													className: "flex-1 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground font-semibold group-hover:shadow-md transition-all text-xs",
													onClick: () => handleSelectExercise(exercise),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "w-3 h-3 mr-2" }), "Iniciar Análise"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													variant: "outline",
													className: "flex-1 border-primary/20 hover:bg-primary/5 text-primary text-xs",
													onClick: (e) => handleOpenVideo(e, exercise),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "w-3 h-3 mr-2" }), "Ver Demo"]
												})]
											})
										]
									})]
								}, exercise.id)), filteredExercises.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "col-span-full flex flex-col items-center justify-center py-12 text-center text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { className: "h-12 w-12 mb-3 opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Nenhum exercício encontrado." })]
								})]
							})
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!selectedVideo,
				onOpenChange: (o) => !o && setSelectedVideo(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "bg-background/95 backdrop-blur-xl border-border/50 sm:max-w-lg p-0 overflow-hidden gap-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
							className: "p-4 bg-secondary/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: selectedVideo?.name })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative aspect-video bg-black flex items-center justify-center group",
							children: selectedVideo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: selectedVideo.image.replace("300", "600"),
								alt: "Video Thumbnail",
								className: cn("w-full h-full object-cover opacity-80 transition-opacity", isPlaying && "opacity-0 pointer-events-none")
							}), !isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								className: "absolute h-16 w-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/50 text-white z-10 transition-transform hover:scale-110",
								onClick: () => setIsPlaying(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "h-10 w-10 fill-white/20" })
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-500",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "animate-pulse",
										children: "Reproduzindo demonstração..."
									})
								})
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mb-4",
								children: selectedVideo?.description
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "w-full font-bold",
								onClick: () => {
									if (selectedVideo) {
										handleSelectExercise(selectedVideo);
										setSelectedVideo(null);
									}
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "mr-2 h-4 w-4" }), "Praticar Agora"]
							})]
						})
					]
				})
			})
		]
	});
}
export { ExerciseLibrary as default };

//# sourceMappingURL=ExerciseLibrary-BcwrZcmj.js.map