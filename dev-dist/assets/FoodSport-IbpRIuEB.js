import "./chevron-down-BC9B-Kta.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CL_T0AIk.js";
import { t as Image } from "./image-R36k5OyQ.js";
import { t as MessageCircle } from "./message-circle-DAP1ORL5.js";
import { t as Play } from "./play-BnG9O-zz.js";
import { t as Plus } from "./plus-CME60Rol.js";
import { t as Send } from "./send-CqnfhtOv.js";
import { t as Share2 } from "./share-2-JUJeHIrK.js";
import { $t as AvatarImage, Ar as createLucideIcon, B as ScrollBar, Jr as Link, Mn as Star, Qn as Heart, Qt as AvatarFallback, R as Badge, Wr as require_jsx_runtime, Zt as Avatar, bn as Utensils, ei as require_react, f as DialogHeader, gn as cn, l as DialogContent, m as DialogTrigger, mn as toast, nn as Button, p as DialogTitle, s as Dialog, vn as X, z as ScrollArea } from "./index-BBSMba7k.js";
import { a as CardHeader, n as CardContent, t as Card } from "./card-D90CWVFd.js";
import { t as Label } from "./label-CUCyPAbk.js";
import { t as Textarea } from "./textarea-CBDLE5GQ.js";
var Bookmark = createLucideIcon("bookmark", [["path", {
	d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",
	key: "1fy3hk"
}]]);
var UtensilsCrossed = createLucideIcon("utensils-crossed", [
	["path", {
		d: "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8",
		key: "n7qcjb"
	}],
	["path", {
		d: "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7",
		key: "d0u48b"
	}],
	["path", {
		d: "m2.1 21.8 6.4-6.3",
		key: "yn04lh"
	}],
	["path", {
		d: "m19 5-7 7",
		key: "194lzd"
	}]
]);
var import_react = require_react();
const foodCategories = [
	"Todos",
	"Pré treino",
	"Pós treino",
	"Receita",
	"Saudável",
	"Fitness",
	"Proteína",
	"Energia",
	"Hipertrofia",
	"Emagrecimento",
	"Nutrição esportiva",
	"Vegano",
	"Low carb",
	"Alimentação saudável"
];
const foodHighlights = [
	{
		id: 1,
		title: "Receita da semana",
		image: "https://img.usecurling.com/p/400/300?q=healthy%20recipe&color=green",
		label: "Panqueca Proteica"
	},
	{
		id: 2,
		title: "Destaque do dia",
		image: "https://img.usecurling.com/p/400/300?q=salad%20bowl&color=orange",
		label: "Salada de Quinoa"
	},
	{
		id: 3,
		title: "Top Food Sport",
		image: "https://img.usecurling.com/p/400/300?q=smoothie&color=purple",
		label: "Smoothie Energético"
	},
	{
		id: 4,
		title: "Atleta Chef da semana",
		image: "https://img.usecurling.com/ppl/medium?gender=female&seed=22",
		label: "@mariachef"
	},
	{
		id: 5,
		title: "Post mais curtido",
		image: "https://img.usecurling.com/p/400/300?q=chicken%20rice&color=yellow",
		label: "Frango com Batata Doce"
	},
	{
		id: 6,
		title: "Receita mais salva",
		image: "https://img.usecurling.com/p/400/300?q=avocado%20toast&color=green",
		label: "Avocado Toast"
	}
];
const mockFoodPosts = [
	{
		id: 201,
		type: "image",
		user: {
			id: "u5",
			name: "Beatriz Lima",
			type: "Nutricionista",
			avatar: "https://img.usecurling.com/ppl/medium?gender=female&seed=23"
		},
		template: "Receita",
		categories: [
			"Receita",
			"Pré treino",
			"Saudável",
			"Proteína",
			"Alimentação saudável"
		],
		content: "Mingau de aveia super cremoso para começar o dia com muita energia! 💪✨\n\n- 3 colheres de aveia\n- 1 scoop de whey de baunilha\n- Canela a gosto\n- Frutas vermelhas para decorar\n\nRápido, prático e focado na hipertrofia.",
		image: "https://img.usecurling.com/p/800/800?q=oatmeal%20bowl&color=pink&dpr=2",
		hashtags: [
			"#Receita",
			"#PreTreino",
			"#Saudavel"
		],
		likes: 1250,
		comments: 89,
		shares: 45,
		saves: 320,
		favorites: 150,
		time: "2h",
		liked: true,
		saved: true
	},
	{
		id: 202,
		type: "image",
		user: {
			id: "u1",
			name: "Alex Silva",
			type: "Atleta",
			avatar: "https://img.usecurling.com/ppl/medium?gender=male&seed=1"
		},
		template: "Pós treino",
		categories: [
			"Pós treino",
			"Proteína",
			"Hipertrofia",
			"Nutrição esportiva"
		],
		content: "Recuperação é tudo! O clássico frango, arroz e brócolis depois de 2 horas de treino intenso. Nutrição é a base da performance. 🥦🍗",
		image: "https://img.usecurling.com/p/800/800?q=chicken%20broccoli%20rice&color=green&dpr=2",
		hashtags: [
			"#PosTreino",
			"#Foco",
			"#NutricaoEsportiva"
		],
		likes: 856,
		comments: 22,
		shares: 10,
		saves: 45,
		favorites: 80,
		time: "4h",
		liked: false,
		saved: false
	},
	{
		id: 203,
		type: "video",
		user: {
			id: "u9",
			name: "Juliana Costa",
			type: "Atleta",
			avatar: "https://img.usecurling.com/ppl/medium?gender=female&seed=56"
		},
		template: "Rotina alimentar",
		categories: [
			"Fitness",
			"Low carb",
			"Alimentação saudável",
			"Saudável"
		],
		content: "Preparando as marmitas da semana. Organização é o segredo para não furar a dieta! 🥗🍱",
		image: "https://img.usecurling.com/p/800/800?q=meal%20prep%20containers&color=orange&dpr=2",
		videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
		hashtags: [
			"#MealPrep",
			"#Rotina",
			"#LowCarb"
		],
		likes: 3400,
		comments: 150,
		shares: 500,
		saves: 1200,
		favorites: 400,
		time: "Ontem",
		liked: true,
		saved: true
	},
	{
		id: 204,
		type: "image",
		user: {
			id: "u12",
			name: "Camila Vegan",
			type: "Atleta",
			avatar: "https://img.usecurling.com/ppl/medium?gender=female&seed=88"
		},
		template: "Vegano",
		categories: [
			"Vegano",
			"Saudável",
			"Proteína",
			"Alimentação saudável"
		],
		content: "Tofu mexido com cúrcuma e espinafre! 🌿💪\nProteína 100% vegetal para o pós-treino. Quem disse que vegano não ganha massa?",
		image: "https://img.usecurling.com/p/800/800?q=scrambled%20tofu&color=yellow&dpr=2",
		hashtags: [
			"#Vegano",
			"#PlantBased",
			"#ProteinaVegetal"
		],
		likes: 432,
		comments: 45,
		shares: 12,
		saves: 89,
		favorites: 34,
		time: "5h",
		liked: false,
		saved: true
	},
	{
		id: 205,
		type: "image",
		user: {
			id: "u15",
			name: "Dr. Roberto",
			type: "Nutricionista",
			avatar: "https://img.usecurling.com/ppl/medium?gender=male&seed=45"
		},
		template: "Emagrecimento",
		categories: [
			"Emagrecimento",
			"Low carb",
			"Nutrição esportiva"
		],
		content: "Déficit calórico não precisa ser sinônimo de fome! 🥗\nPrato volumoso com mix de folhas, tomate cereja, pepino e filé de peixe grelhado. Alta saciedade e baixo teor calórico.",
		image: "https://img.usecurling.com/p/800/800?q=grilled%20fish%20salad&color=green&dpr=2",
		hashtags: [
			"#Emagrecimento",
			"#Nutricao",
			"#FocoNaDieta"
		],
		likes: 1205,
		comments: 112,
		shares: 88,
		saves: 450,
		favorites: 120,
		time: "8h",
		liked: true,
		saved: false
	},
	{
		id: 206,
		type: "image",
		user: {
			id: "u18",
			name: "Lucas Treino",
			type: "Personal Trainer",
			avatar: "https://img.usecurling.com/ppl/medium?gender=male&seed=67"
		},
		template: "Energia",
		categories: [
			"Energia",
			"Pré treino",
			"Fitness"
		],
		content: "O combustível perfeito para o treino de pernas de hoje! 🍌☕\nBanana amassada com mel, aveia e aquele café expresso duplo para acordar.",
		image: "https://img.usecurling.com/p/800/800?q=banana%20oats%20coffee&color=orange&dpr=2",
		hashtags: [
			"#PreTreino",
			"#Energia",
			"#LegDay"
		],
		likes: 890,
		comments: 34,
		shares: 15,
		saves: 76,
		favorites: 45,
		time: "12h",
		liked: false,
		saved: false
	},
	{
		id: 207,
		type: "image",
		user: {
			id: "u22",
			name: "Marina Fit",
			type: "Atleta",
			avatar: "https://img.usecurling.com/ppl/medium?gender=female&seed=91"
		},
		template: "Receita Fit",
		categories: [
			"Fitness",
			"Saudável",
			"Alimentação saudável",
			"Low carb"
		],
		content: "Panqueca de banana com apenas 2 ingredientes! 🥞✨\n\n1 banana amassada e 2 ovos. Misture tudo e coloque na frigideira. Simples, rápido e perfeito para matar a vontade de doce sem sair do foco.",
		image: "https://img.usecurling.com/p/800/800?q=banana%20pancake&color=yellow&dpr=2",
		hashtags: [
			"#ReceitaFit",
			"#Fitness",
			"#SemAcucar"
		],
		likes: 2150,
		comments: 140,
		shares: 320,
		saves: 890,
		favorites: 210,
		time: "1 dia",
		liked: true,
		saved: true
	},
	{
		id: 208,
		type: "image",
		user: {
			id: "u31",
			name: "Ricardo Nutri",
			type: "Nutricionista",
			avatar: "https://img.usecurling.com/ppl/medium?gender=male&seed=14"
		},
		template: "Hipertrofia",
		categories: [
			"Hipertrofia",
			"Proteína",
			"Nutrição esportiva",
			"Pós treino"
		],
		content: "Refeição sólida pós-treino visando síntese proteica máxima! 🥩🥔\n200g de patinho moído, 150g de purê de batata e legumes no vapor. Básico que funciona!",
		image: "https://img.usecurling.com/p/800/800?q=ground%20beef%20potato&color=red&dpr=2",
		hashtags: [
			"#Hipertrofia",
			"#Bodybuilding",
			"#Proteina"
		],
		likes: 1540,
		comments: 98,
		shares: 45,
		saves: 210,
		favorites: 130,
		time: "2 dias",
		liked: false,
		saved: false
	}
];
var import_jsx_runtime = require_jsx_runtime();
function FoodHighlights() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-4 mb-3 flex items-center justify-between",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2",
				children: ["Highlights", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border/50 ml-2" })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollArea, {
			className: "w-full whitespace-nowrap px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex w-max space-x-3 pb-4",
				children: foodHighlights.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "w-[140px] md:w-[160px] flex-shrink-0 overflow-hidden border-none shadow-sm cursor-pointer group hover:shadow-md transition-all duration-300 transform hover:-translate-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "h-28 relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.image,
								alt: item.title,
								className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute bottom-2 left-2 right-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-white text-[10px] font-bold leading-tight break-words whitespace-normal line-clamp-2 drop-shadow-md",
									children: item.label
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "p-2 bg-secondary/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] font-semibold text-primary truncate",
							children: item.title
						})
					})]
				}, item.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {
				orientation: "horizontal",
				className: "invisible"
			})]
		})]
	});
}
function FoodPostCard({ post }) {
	const [isLiked, setIsLiked] = (0, import_react.useState)(post.liked);
	const [likes, setLikes] = (0, import_react.useState)(post.likes);
	const [isSaved, setIsSaved] = (0, import_react.useState)(post.saved);
	const [isFavorite, setIsFavorite] = (0, import_react.useState)(false);
	const [isFollowing, setIsFollowing] = (0, import_react.useState)(false);
	const handleLike = () => {
		setIsLiked(!isLiked);
		setLikes(isLiked ? likes - 1 : likes + 1);
	};
	const handleComment = () => {
		toast.success("Comentários abertos", { description: "Esta função abrirá a aba de comentários em breve." });
	};
	const handleShare = () => {
		toast.success("Opções de compartilhamento", { description: "Link copiado para a área de transferência!" });
	};
	const handleFollow = () => {
		setIsFollowing(!isFollowing);
		if (!isFollowing) toast.success(`Você agora segue ${post.user.name}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "border-none shadow-sm rounded-2xl overflow-hidden bg-card mb-4 animate-fade-in hover:shadow-md transition-shadow duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "flex flex-row items-center justify-between p-4 pb-3 space-y-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: `/profile/${post.user.id}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						className: "h-10 w-10 border border-border cursor-pointer hover:border-primary transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: post.user.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: post.user.name.substring(0, 2) })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: `/profile/${post.user.id}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold hover:text-primary transition-colors leading-none",
							children: post.user.name
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 mt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "h-4 px-1 text-[9px] rounded-sm font-normal bg-secondary/50 text-muted-foreground uppercase",
							children: post.user.type
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] text-muted-foreground",
							children: ["• ", post.time]
						})]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: isFollowing ? "secondary" : "outline",
				size: "sm",
				className: cn("h-7 text-xs rounded-full px-4 transition-all duration-300", !isFollowing && "text-primary border-primary/50 hover:bg-primary hover:text-white"),
				onClick: handleFollow,
				children: isFollowing ? "Seguindo" : "Seguir"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-0",
			children: [
				post.template && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-4 pb-2 flex flex-wrap gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						className: "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 border-none rounded-md px-2 py-0.5 text-xs font-bold flex w-fit items-center gap-1.5 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtensilsCrossed, { className: "w-3 h-3" }), post.template]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed whitespace-pre-wrap",
						children: post.content
					}), post.hashtags && post.hashtags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1 mt-2",
						children: post.hashtags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary text-xs font-medium cursor-pointer hover:underline",
							children: tag
						}, tag))
					})]
				}),
				post.image && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-square w-full bg-zinc-900 group cursor-pointer overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: post.image,
						alt: "Food post content",
						className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
					}), post.type === "video" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 bg-black/20 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/50 shadow-xl group-hover:scale-110 transition-transform",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-5 w-5 text-white ml-1 fill-white" })
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 bg-secondary/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: cn("h-8 w-8 rounded-full transition-colors", isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-400"),
									onClick: handleLike,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("h-5 w-5", isLiked && "fill-current scale-110") })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "h-8 w-8 rounded-full text-muted-foreground hover:text-blue-400",
									onClick: handleComment,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "h-8 w-8 rounded-full text-muted-foreground hover:text-green-400",
									onClick: handleShare,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-5 w-5" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: cn("h-8 w-8 rounded-full transition-colors", isFavorite ? "text-yellow-500" : "text-muted-foreground hover:text-yellow-400"),
								onClick: () => setIsFavorite(!isFavorite),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("h-5 w-5", isFavorite && "fill-current") })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: cn("h-8 w-8 rounded-full transition-colors", isSaved ? "text-primary" : "text-muted-foreground hover:text-primary"),
								onClick: () => setIsSaved(!isSaved),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: cn("h-5 w-5", isSaved && "fill-current") })
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-bold",
							children: [likes.toLocaleString(), " curtidas"]
						}), post.comments > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground mt-0.5 cursor-pointer hover:underline",
							onClick: handleComment,
							children: [
								"Ver todos os ",
								post.comments,
								" comentários"
							]
						})]
					})]
				})
			]
		})]
	});
}
function CreateFoodPostFab({ onPost }) {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [content, setContent] = (0, import_react.useState)("");
	const [template, setTemplate] = (0, import_react.useState)("");
	const fileInputRef = (0, import_react.useRef)(null);
	const handlePost = () => {
		if (!content.trim()) {
			toast.error("Escreva algo para publicar.");
			return;
		}
		if (onPost) onPost({
			content,
			template,
			image: "https://img.usecurling.com/p/800/800?q=food&color=orange&dpr=2"
		});
		else toast.success("Publicação Food Sport enviada!", {
			description: "Sua receita/dica já está no feed.",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { className: "w-4 h-4 text-orange-500" })
		});
		setIsOpen(false);
		setContent("");
		setTemplate("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open: isOpen,
		onOpenChange: setIsOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "icon",
				className: "fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-xl z-40 bg-orange-600 hover:bg-orange-700 text-white animate-in zoom-in duration-300",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex items-center justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-6 w-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -top-1 -right-1 bg-background rounded-full p-0.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { className: "w-3 h-3 text-orange-500" })
					})]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md bg-card border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "flex items-center gap-2 text-orange-600",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { className: "w-5 h-5" }), "Nova Publicação Food Sport"]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Categoria / Template" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: template,
								onValueChange: setTemplate,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione o tipo de post" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Alimentação do dia",
										children: "Alimentação do dia"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Pré treino",
										children: "Pré treino"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Pós treino",
										children: "Pós treino"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Rotina alimentar",
										children: "Rotina alimentar"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Receita Fit",
										children: "Receita Fit"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Dica de Nutrição",
										children: "Dica de Nutrição"
									})
								] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "content",
								children: "Ingredientes ou Descrição"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "content",
								placeholder: "Compartilhe sua receita, dieta ou dica nutricional...",
								className: "min-h-[120px] resize-none",
								value: content,
								onChange: (e) => setContent(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Adicionar Foto/Vídeo da Refeição" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									className: "w-full h-12 border-dashed gap-2 text-muted-foreground hover:text-orange-500 hover:border-orange-500/50 hover:bg-orange-500/10",
									onClick: () => fileInputRef.current?.click(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "w-5 h-5" }), "Fazer Upload"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									ref: fileInputRef,
									className: "hidden",
									accept: "image/*,video/*"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handlePost,
						className: "bg-orange-600 hover:bg-orange-700 font-bold px-8 shadow-md",
						disabled: !content.trim(),
						children: "Publicar"
					})
				})
			]
		})]
	});
}
function FoodSport() {
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("Todos");
	const [posts, setPosts] = (0, import_react.useState)(mockFoodPosts);
	const [newPostContent, setNewPostContent] = (0, import_react.useState)("");
	const [newPostImage, setNewPostImage] = (0, import_react.useState)(null);
	const fileInputRef = (0, import_react.useRef)(null);
	const handleImageSelect = (e) => {
		if (e.target.files && e.target.files[0]) setNewPostImage(URL.createObjectURL(e.target.files[0]));
	};
	const handlePost = () => {
		if (!newPostContent.trim() && !newPostImage) {
			toast.error("Adicione texto ou uma foto para publicar.");
			return;
		}
		setPosts([{
			id: Date.now(),
			type: newPostImage ? "image" : "text",
			user: {
				id: "me",
				name: "Você",
				type: "Atleta",
				avatar: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99"
			},
			template: "Alimentação do dia",
			categories: ["Todos", activeCategory !== "Todos" ? activeCategory : "Alimentação saudável"],
			content: newPostContent,
			image: newPostImage || void 0,
			hashtags: [],
			likes: 0,
			comments: 0,
			shares: 0,
			saves: 0,
			favorites: 0,
			time: "Agora",
			liked: false,
			saved: false
		}, ...posts]);
		setNewPostContent("");
		setNewPostImage(null);
		toast.success("Refeição compartilhada com sucesso!");
	};
	const handleFabPost = (data) => {
		setPosts([{
			id: Date.now(),
			type: "image",
			user: {
				id: "me",
				name: "Você",
				type: "Atleta",
				avatar: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99"
			},
			template: data.template || "Alimentação do dia",
			categories: ["Todos", activeCategory !== "Todos" ? activeCategory : "Alimentação saudável"],
			content: data.content,
			image: data.image,
			hashtags: [],
			likes: 0,
			comments: 0,
			shares: 0,
			saves: 0,
			favorites: 0,
			time: "Agora",
			liked: false,
			saved: false
		}, ...posts]);
		toast.success("Refeição compartilhada com sucesso!");
	};
	const filteredPosts = posts.filter((post) => activeCategory === "Todos" || post.categories && post.categories.includes(activeCategory) || post.template === activeCategory);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background relative pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-16 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-4 py-3 flex items-center justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-2 bg-orange-500/10 rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { className: "w-5 h-5 text-orange-500" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-xl font-bold tracking-tight text-foreground",
							children: ["Food ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-orange-500",
								children: "Sport"
							})]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollArea, {
					className: "w-full whitespace-nowrap pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex w-max space-x-2 px-4",
						children: foodCategories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: activeCategory === cat ? "default" : "secondary",
							size: "sm",
							className: cn("rounded-full text-xs font-semibold h-8 border shadow-sm transition-all", activeCategory === cat ? "bg-orange-600 hover:bg-orange-700 text-white border-transparent" : "bg-secondary/50 border-border/50 text-muted-foreground hover:text-foreground"),
							onClick: () => setActiveCategory(cat),
							children: cat
						}, cat))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {
						orientation: "horizontal",
						className: "invisible"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "animate-in fade-in slide-in-from-bottom-4 duration-500",
				children: [activeCategory === "Todos" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodHighlights, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 mt-2 max-w-2xl mx-auto space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "mb-6 border-none shadow-sm rounded-2xl bg-card overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								className: "p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
										className: "h-10 w-10 border border-border",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: "VC" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
												placeholder: "Compartilhe sua refeição...",
												className: "min-h-[80px] resize-none border-none bg-secondary/30 focus-visible:ring-1 focus-visible:ring-orange-500 rounded-xl",
												value: newPostContent,
												onChange: (e) => setNewPostContent(e.target.value)
											}),
											newPostImage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative rounded-xl overflow-hidden bg-black/5 aspect-video",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: newPostImage,
													alt: "Preview",
													className: "w-full h-full object-cover"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "destructive",
													size: "icon",
													className: "absolute top-2 right-2 h-8 w-8 rounded-full shadow-md hover:scale-105 transition-transform",
													onClick: () => setNewPostImage(null),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between pt-2 border-t border-border/50",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														variant: "ghost",
														size: "sm",
														className: "text-muted-foreground hover:text-orange-500 hover:bg-orange-500/10 rounded-full",
														onClick: () => fileInputRef.current?.click(),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "w-4 h-4 mr-2 text-orange-500" }), "Foto / Vídeo"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "file",
														ref: fileInputRef,
														className: "hidden",
														accept: "image/*,video/*",
														onChange: handleImageSelect
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														onClick: handlePost,
														size: "sm",
														className: "rounded-full bg-orange-600 hover:bg-orange-700 text-white px-5 shadow-md",
														disabled: !newPostContent.trim() && !newPostImage,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-4 h-4 mr-2" }), "Publicar"]
													})
												]
											})
										]
									})]
								})
							})
						}),
						filteredPosts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodPostCard, { post }, post.id)),
						filteredPosts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center py-12 text-muted-foreground text-sm flex flex-col items-center bg-card rounded-2xl shadow-sm border border-border/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { className: "w-12 h-12 opacity-20 mb-3 text-orange-500" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-foreground",
									children: "Nenhuma publicação nesta categoria."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs mt-1",
									children: "Seja o primeiro a compartilhar algo aqui!"
								})
							]
						}),
						filteredPosts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center py-8 text-muted-foreground text-sm flex flex-col items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { className: "w-8 h-8 opacity-20 mb-2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Você chegou ao fim do feed." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs",
									children: "Compartilhe sua refeição com a comunidade!"
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateFoodPostFab, { onPost: handleFabPost })
		]
	});
}
export { FoodSport as default };

//# sourceMappingURL=FoodSport-IbpRIuEB.js.map