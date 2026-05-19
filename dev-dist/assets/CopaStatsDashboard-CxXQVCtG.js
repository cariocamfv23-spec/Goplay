import { t as ChevronDown } from "./chevron-down-Chj9hHn8.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dm3xUtQ8.js";
import { En as Users, Pn as Target, R as Badge, Rn as Star, Vr as Activity, c as DialogTrigger, jn as TrendingUp, mi as require_react, o as DialogHeader, on as Button, r as DialogContent, ri as require_jsx_runtime, s as DialogTitle, t as Dialog, ui as useNavigate, xn as cn, yi as __toESM, zr as ArrowLeft } from "./index-CJsG0f1F.js";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-DOKiW603.js";
import { i as Root, n as CollapsibleTrigger$1, t as CollapsibleContent$1 } from "./dist-BMRguKqS.js";
import { M as Cell, f as Bar, n as YAxis, r as XAxis } from "./generateCategoricalChart-1n2YhPZv.js";
import { i as PolarGrid, n as Radar, r as PolarAngleAxis, t as RadarChart } from "./RadarChart-BZ4wpD1c.js";
import { t as BarChart } from "./BarChart-CzlkXEeM.js";
import { n as ChartTooltip, r as ChartTooltipContent, t as ChartContainer } from "./chart-BACPr40A.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var Collapsible = Root;
var CollapsibleTrigger = CollapsibleTrigger$1;
var CollapsibleContent = CollapsibleContent$1;
var import_jsx_runtime = require_jsx_runtime();
var TEAMS = [
	{
		id: "br",
		name: "Brasil",
		probability: 18.5,
		strength: 94,
		athleteLevel: 96,
		stats: {
			Tático: 88,
			Físico: 90,
			Mental: 85,
			Técnico: 98,
			Velocidade: 92
		},
		keyPlayers: [
			{
				id: "neymar",
				name: "Neymar Jr.",
				image: "https://img.usecurling.com/p/256/256?q=neymar%20jr%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "31.2 km/h",
					"Precisão de Passe": "89%",
					Gols: 79,
					Assistências: 59
				},
				impactAnalysis: "Recém-convocado, Neymar traz sua genialidade, drible desconcertante e capacidade de decisão incomparável. É a referência técnica e o maestro que dita o ritmo do ataque brasileiro na busca pelo cobiçado hexacampeonato."
			},
			{
				id: "vini",
				name: "Vini Jr.",
				image: "https://img.usecurling.com/p/256/256?q=vinicius%20junior%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "36.5 km/h",
					"Precisão de Passe": "82%",
					Gols: 24,
					Assistências: 18
				},
				impactAnalysis: "Sua velocidade explosiva e drible desequilibrante pelas pontas quebram as defesas adversárias, criando os espaços necessários para o ataque brasileiro prosperar rumo ao título mundial."
			},
			{
				id: "rodrygo",
				name: "Rodrygo",
				image: "https://img.usecurling.com/p/256/256?q=rodrygo%20goes%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "33.8 km/h",
					"Precisão de Passe": "87%",
					Gols: 15,
					Assistências: 12
				},
				impactAnalysis: "Extremamente inteligente taticamente, atua em diversas posições do ataque, oferecendo fluidez e precisão no terço final do campo. Seu faro de gol em momentos decisivos é um trunfo indispensável."
			}
		],
		description: "A quintessência do talento futebolístico. Alta habilidade técnica e enorme poder ofensivo.",
		color: "#009c3b"
	},
	{
		id: "fr",
		name: "França",
		probability: 17.2,
		strength: 95,
		athleteLevel: 94,
		stats: {
			Tático: 90,
			Físico: 95,
			Mental: 88,
			Técnico: 92,
			Velocidade: 94
		},
		keyPlayers: [
			{
				id: "mbappe",
				name: "Mbappé",
				image: "https://img.usecurling.com/p/256/256?q=kylian%20mbappe%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "38.0 km/h",
					"Precisão de Passe": "83%",
					Gols: 46,
					Assistências: 31
				},
				impactAnalysis: "Sua velocidade alucinante em transições e capacidade de finalização letal o tornam praticamente imparável. É o ponto focal do ataque francês e a principal arma para a conquista de mais um título."
			},
			{
				id: "griezmann",
				name: "Griezmann",
				image: "https://img.usecurling.com/p/256/256?q=antoine%20griezmann%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "31.5 km/h",
					"Precisão de Passe": "91%",
					Gols: 44,
					Assistências: 38
				},
				impactAnalysis: "O cérebro tático do time. Dita o ritmo de jogo, conecta magistralmente o meio ao ataque e é incansável na recomposição defensiva. Sua visão de jogo refinada cria inúmeras chances de gol."
			},
			{
				id: "camavinga",
				name: "Camavinga",
				image: "https://img.usecurling.com/p/256/256?q=eduardo%20camavinga%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "34.2 km/h",
					"Precisão de Passe": "89%",
					Gols: 2,
					Assistências: 6
				},
				impactAnalysis: "Traz enorme dinamismo e versatilidade ao meio-campo francês. Capaz de quebrar linhas defensivas com passes verticais e recuperar posses de bola cruciais. Vital para a estabilidade da equipe."
			}
		],
		description: "Uma potência de atleticismo e disciplina tática, com atacantes explosivos.",
		color: "#002395"
	},
	{
		id: "ar",
		name: "Argentina",
		probability: 15.8,
		strength: 92,
		athleteLevel: 91,
		stats: {
			Tático: 92,
			Físico: 85,
			Mental: 95,
			Técnico: 90,
			Velocidade: 84
		},
		keyPlayers: [
			{
				id: "messi",
				name: "Messi",
				image: "https://img.usecurling.com/p/256/256?q=lionel%20messi%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "30.1 km/h",
					"Precisão de Passe": "92%",
					Gols: 109,
					Assistências: 57
				},
				impactAnalysis: "Líder e principal criador de jogadas da seleção. Sua visão de jogo ímpar e passes cirúrgicos encontram espaços onde não existem, sendo a bússola moral e técnica da equipe rumo a mais um título."
			},
			{
				id: "alvarez",
				name: "Julian Alvarez",
				image: "https://img.usecurling.com/p/256/256?q=julian%20alvarez%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "34.8 km/h",
					"Precisão de Passe": "82%",
					Gols: 14,
					Assistências: 7
				},
				impactAnalysis: "Intensa pressão pós-perda e movimentação extremamente inteligente criam oportunidades constantes e incomodam as defesas rivais. Vital para a dinâmica e sufoco ofensivo no terço final."
			},
			{
				id: "macallister",
				name: "Mac Allister",
				image: "https://img.usecurling.com/p/256/256?q=alexis%20mac%20allister%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "32.4 km/h",
					"Precisão de Passe": "88%",
					Gols: 8,
					Assistências: 11
				},
				impactAnalysis: "Motor incansável do meio-campo argentino, dita o tempo de jogo e aparece frequentemente como elemento surpresa na área para finalizar. Garante transição rápida, sólida e muito eficiente."
			}
		],
		description: "Atuais campeões do mundo com uma coesão de equipe inigualável e resiliência mental.",
		color: "#74acdf"
	},
	{
		id: "en",
		name: "Inglaterra",
		probability: 14,
		strength: 90,
		athleteLevel: 92,
		stats: {
			Tático: 87,
			Físico: 88,
			Mental: 82,
			Técnico: 89,
			Velocidade: 90
		},
		keyPlayers: [
			{
				id: "bellingham",
				name: "Jude Bellingham",
				image: "https://img.usecurling.com/p/256/256?q=jude%20bellingham%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "33.9 km/h",
					"Precisão de Passe": "89%",
					Gols: 22,
					Assistências: 14
				},
				impactAnalysis: "Um meio-campista absurdamente completo que avança com força física rara, criando jogadas e finalizando com precisão. É o pilar da nova geração inglesa para tentar romper o longo jejum."
			},
			{
				id: "kane",
				name: "Harry Kane",
				image: "https://img.usecurling.com/p/256/256?q=harry%20kane%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "31.2 km/h",
					"Precisão de Passe": "84%",
					Gols: 68,
					Assistências: 21
				},
				impactAnalysis: "Atacante letal e capitão experiente que também atua como exímio armador recuado. Sua capacidade de reter a bola de costas, atrair a marcação e distribuir o jogo é fundamental para o sucesso."
			},
			{
				id: "saka",
				name: "Bukayo Saka",
				image: "https://img.usecurling.com/p/256/256?q=bukayo%20saka%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "35.4 km/h",
					"Precisão de Passe": "86%",
					Gols: 18,
					Assistências: 15
				},
				impactAnalysis: "Pura alegria e criatividade imprevisível na ponta direita. Seus dribles curtos venenosos, cortes rápidos para o meio e capacidade de finalização desmontam totalmente as defesas rivais fechadas."
			}
		],
		description: "Uma geração de ouro formidável que mistura energia jovem com liderança experiente.",
		color: "#ce1124"
	},
	{
		id: "es",
		name: "Espanha",
		probability: 12.5,
		strength: 89,
		athleteLevel: 90,
		stats: {
			Tático: 95,
			Físico: 82,
			Mental: 85,
			Técnico: 94,
			Velocidade: 86
		},
		keyPlayers: [
			{
				id: "pedri",
				name: "Pedri",
				image: "https://img.usecurling.com/p/256/256?q=pedri%20gonzalez%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "31.8 km/h",
					"Precisão de Passe": "93%",
					Gols: 10,
					Assistências: 19
				},
				impactAnalysis: "Controle absoluto e sublime no meio-campo. Sua posse de bola colada aos pés, giros extremamente rápidos e passes verticais incisivos geram estabilidade, ditando perfeitamente o ritmo espanhol."
			},
			{
				id: "yamal",
				name: "Lamine Yamal",
				image: "https://img.usecurling.com/p/256/256?q=lamine%20yamal%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "34.7 km/h",
					"Precisão de Passe": "84%",
					Gols: 11,
					Assistências: 14
				},
				impactAnalysis: "Jovem prodígio mágico com extrema e abusada habilidade no 1 contra 1. Quebra com naturalidade sistemas defensivos muito retrancados, oferecendo uma arma aguda e super veloz na ponta."
			},
			{
				id: "rodri",
				name: "Rodri",
				image: "https://img.usecurling.com/p/256/256?q=rodri%20hernandez%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "30.5 km/h",
					"Precisão de Passe": "94%",
					Gols: 12,
					Assistências: 8
				},
				impactAnalysis: "O grande pivô tático da equipe e mestre de sua posição. Garante segurança defensiva primorosa e é a primeira peça indispensável na construção paciente de envolventes jogadas ofensivas."
			}
		],
		description: "Mestres absolutos da posse de bola e do refinado jogo posicional, dominando adversários.",
		color: "#aa151b"
	},
	{
		id: "de",
		name: "Alemanha",
		probability: 10,
		strength: 88,
		athleteLevel: 89,
		stats: {
			Tático: 89,
			Físico: 87,
			Mental: 90,
			Técnico: 88,
			Velocidade: 85
		},
		keyPlayers: [
			{
				id: "musiala",
				name: "Jamal Musiala",
				image: "https://img.usecurling.com/p/256/256?q=jamal%20musiala%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "34.2 km/h",
					"Precisão de Passe": "87%",
					Gols: 16,
					Assistências: 14
				},
				impactAnalysis: "Drible em espaços minúsculos excepcional e pura imprevisibilidade. Ele arrasta marcações duplas e cria oportunidades cristalinas onde a olho nu parece não haver qualquer espaço disponível."
			},
			{
				id: "wirtz",
				name: "Florian Wirtz",
				image: "https://img.usecurling.com/p/256/256?q=florian%20wirtz%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "33.5 km/h",
					"Precisão de Passe": "89%",
					Gols: 14,
					Assistências: 18
				},
				impactAnalysis: "Visão de jogo periférica impressionante e rápida agilidade mental. Seus passes venenosos rompem linhas defensivas sólidas e aceleram drasticamente a mortal transição ofensiva germânica."
			},
			{
				id: "kimmich",
				name: "Joshua Kimmich",
				image: "https://img.usecurling.com/p/256/256?q=joshua%20kimmich%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "31.1 km/h",
					"Precisão de Passe": "91%",
					Gols: 10,
					Assistências: 42
				},
				impactAnalysis: "Versatilidade de classe mundial, liderança técnica e garra inabaláveis. Atuando na lateral ou organizando pelo meio, é essencial na criação de jogadas com seus cruzamentos milimétricos."
			}
		],
		description: "Taticamente versátil e extremamente eficiente, passando por um poderoso renascimento.",
		color: "#ffce00"
	},
	{
		id: "pt",
		name: "Portugal",
		probability: 8.5,
		strength: 87,
		athleteLevel: 90,
		stats: {
			Tático: 85,
			Físico: 86,
			Mental: 84,
			Técnico: 91,
			Velocidade: 88
		},
		keyPlayers: [
			{
				id: "leao",
				name: "Rafael Leão",
				image: "https://img.usecurling.com/p/256/256?q=rafael%20leao%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "36.5 km/h",
					"Precisão de Passe": "81%",
					Gols: 18,
					Assistências: 22
				},
				impactAnalysis: "Força bruta incontrolável e explosão física na ponta esquerda. Ganha sucessivos duelos de velocidade com enorme facilidade, criando terror constante através de jogadas inviduais geniais."
			},
			{
				id: "bruno",
				name: "Bruno Fernandes",
				image: "https://img.usecurling.com/p/256/256?q=bruno%20fernandes%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "32.0 km/h",
					"Precisão de Passe": "86%",
					Gols: 32,
					Assistências: 45
				},
				impactAnalysis: "Principal armador lúcido, líder vocal em campo e especialista nato de bolas paradas. Seus passes longos espetaculares e finalizações de média distância são letais contra retrancas."
			},
			{
				id: "bernardo",
				name: "Bernardo Silva",
				image: "https://img.usecurling.com/p/256/256?q=bernardo%20silva%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "31.5 km/h",
					"Precisão de Passe": "90%",
					Gols: 15,
					Assistências: 28
				},
				impactAnalysis: "Operário incansável sem a bola e um verdadeiro artista com ela. Consegue reter a posse sob extrema pressão e ditar cadenciadamente o ritmo melódico do perigoso ataque português."
			}
		],
		description: "Um elenco incrivelmente profundo e recheado de super estrelas com muita fome de vitória.",
		color: "#ff0000"
	},
	{
		id: "it",
		name: "Itália",
		probability: 3.5,
		strength: 85,
		athleteLevel: 86,
		stats: {
			Tático: 92,
			Físico: 82,
			Mental: 88,
			Técnico: 85,
			Velocidade: 80
		},
		keyPlayers: [
			{
				id: "barella",
				name: "Nicolò Barella",
				image: "https://img.usecurling.com/p/256/256?q=nicolo%20barella%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "33.2 km/h",
					"Precisão de Passe": "88%",
					Gols: 12,
					Assistências: 18
				},
				impactAnalysis: "Dinamismo e intensidade puros no coração do meio-campo. Ele lidera a pressão alta de forma incansável, rouba bolas vitais e ainda pisa na área adversária para finalizar com imensa técnica."
			},
			{
				id: "chiesa",
				name: "Federico Chiesa",
				image: "https://img.usecurling.com/p/256/256?q=federico%20chiesa%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "35.1 km/h",
					"Precisão de Passe": "80%",
					Gols: 21,
					Assistências: 14
				},
				impactAnalysis: "O grande e imprevisível desafogo ofensivo nas transições letais. Sua velocidade vertiginosa e finalização cortante com ambas as pernas garantem desequilíbrio e gols em jogos travados."
			},
			{
				id: "bastoni",
				name: "Alessandro Bastoni",
				image: "https://img.usecurling.com/p/256/256?q=alessandro%20bastoni%20realistic%20portrait%20face&dpr=2",
				stats: {
					"Velocidade Máxima": "31.8 km/h",
					"Precisão de Passe": "91%",
					Gols: 4,
					Assistências: 7
				},
				impactAnalysis: "Um moderno zagueiro construtor de primeiríssima classe. Inicia e limpa as jogadas de trás com passes precisos e defende sua grande área com a lendária inteligência tática do calccio."
			}
		],
		description: "Historicamente defensores formidáveis aliados a enorme astúcia tática e forte resiliência.",
		color: "#0066cc"
	}
];
function TeamCard({ team, rank }) {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const radarData = Object.entries(team.stats).map(([subject, value]) => ({
		subject,
		value
	}));
	const chartConfig = { value: {
		label: "Pontuação",
		color: team.color
	} };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapsible, {
		open: isOpen,
		onOpenChange: setIsOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: cn("border-border/30 bg-secondary/10 backdrop-blur-md overflow-hidden relative group transition-all duration-300", isOpen ? "border-border/60 shadow-lg shadow-black/20" : "hover:border-border/50"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 opacity-[0.03] transition-opacity duration-500 pointer-events-none",
					style: { backgroundImage: `linear-gradient(to right, transparent, ${team.color})` }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 flex items-center justify-between cursor-pointer select-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-black text-muted-foreground/30 w-6 text-center tabular-nums",
									children: rank
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative w-12 h-12 rounded-full overflow-hidden border-2 shadow-sm",
									style: { borderColor: team.color },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: `https://img.usecurling.com/p/100/100?q=${encodeURIComponent(team.name)}%20flag`,
										alt: `Bandeira de ${team.name}`,
										className: "w-full h-full object-cover scale-110"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-base font-bold uppercase tracking-wider text-foreground leading-tight",
										children: team.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-1.5 mt-0.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "secondary",
											className: "px-1.5 py-0 text-[10px] bg-background/50 text-muted-foreground border-border/50 font-medium",
											children: [
												"TPI:",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-foreground ml-1 font-bold",
													children: team.strength
												})
											]
										})
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-muted-foreground uppercase tracking-wider",
									children: "Impacto no Título"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-lg font-black tabular-nums tracking-tighter",
									style: { color: team.color },
									children: [team.probability.toFixed(1), "%"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("p-1.5 rounded-full bg-secondary/50 transition-transform duration-300", isOpen && "rotate-180"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 pt-0 border-t border-border/10 bg-black/20 grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 animate-in slide-in-from-top-2 duration-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "text-[10px] font-bold flex items-center gap-1.5 uppercase tracking-widest text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-3.5 h-3.5" }), " Perfil Técnico"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[200px] w-full -ml-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
								config: chartConfig,
								className: "h-full w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
									data: radarData,
									margin: {
										top: 10,
										right: 10,
										bottom: 10,
										left: 10
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, {
											stroke: "hsl(var(--border))",
											strokeDasharray: "3 3"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
											dataKey: "subject",
											tick: {
												fill: "hsl(var(--muted-foreground))",
												fontSize: 10,
												fontWeight: 600
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
											name: team.name,
											dataKey: "value",
											stroke: team.color,
											strokeWidth: 2,
											fill: team.color,
											fillOpacity: .25
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, { indicator: "line" }) })
									]
								})
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-center gap-5 pb-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-3.5 h-3.5" }), " Nível Geral do Elenco"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-black",
										children: [team.athleteLevel, "/100"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full bg-secondary/50 h-2 rounded-full overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full transition-all duration-1000 ease-out relative",
										style: {
											width: `${team.athleteLevel}%`,
											backgroundColor: team.color
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-white/20" })
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-3.5 h-3.5" }), " Principais Jogadores"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-4 mt-2",
									children: team.keyPlayers.map((player) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											className: "flex flex-col items-center gap-1.5 group hover:opacity-80 transition-opacity outline-none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-14 h-14 rounded-full overflow-hidden border-[2.5px] border-border/50 group-hover:border-primary/80 transition-colors shadow-sm",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: player.image,
													alt: player.name,
													className: "w-full h-full object-cover"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-bold text-muted-foreground group-hover:text-foreground transition-colors max-w-[65px] text-center truncate leading-tight",
												children: player.name
											})]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
										className: "sm:max-w-md bg-secondary/95 border-border/50 backdrop-blur-xl",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
											className: "flex items-center gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-24 h-24 rounded-full overflow-hidden border-[3px] shadow-lg shrink-0",
												style: { borderColor: team.color },
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: player.image,
													alt: player.name,
													className: "w-full h-full object-cover"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col items-start gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-2xl font-black tracking-tight",
													children: player.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "outline",
													className: "text-[11px] uppercase font-bold tracking-widest px-2 py-0.5 border-border/50 bg-background/40",
													style: { color: team.color },
													children: team.name
												})]
											})]
										}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 space-y-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
													className: "text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-3.5 h-3.5" }), "Estatísticas Técnicas"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid grid-cols-2 gap-3",
													children: Object.entries(player.stats).map(([statName, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "bg-background/40 backdrop-blur-sm p-4 rounded-xl border border-border/20 flex flex-col items-center justify-center gap-1.5 shadow-sm hover:border-border/40 transition-colors",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-center",
															children: statName
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-2xl font-black tabular-nums tracking-tighter",
															style: { color: team.color },
															children: value
														})]
													}, statName))
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-5 rounded-xl bg-background/40 backdrop-blur-sm border border-border/20 shadow-sm relative overflow-hidden",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "absolute top-0 right-0 w-32 h-32 opacity-10 blur-2xl pointer-events-none rounded-full",
														style: { backgroundColor: team.color }
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
														className: "text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5 relative z-10",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "w-3.5 h-3.5" }), "Impacto para o Título"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm leading-relaxed text-foreground/90 font-medium relative z-10",
														children: player.impactAnalysis
													})
												]
											})]
										})]
									})] }, player.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground leading-relaxed italic border-l-2 pl-3 py-1",
									style: { borderColor: team.color },
									children: [
										"\"",
										team.description,
										"\""
									]
								})
							})
						]
					})]
				}) })
			]
		})
	});
}
function CopaStatsDashboard() {
	const navigate = useNavigate();
	const [sortBy, setSortBy] = (0, import_react.useState)("probability");
	const sortedTeams = (0, import_react.useMemo)(() => {
		return [...TEAMS].sort((a, b) => {
			if (sortBy === "probability") return b.probability - a.probability;
			if (sortBy === "strength") return b.strength - a.strength;
			return a.name.localeCompare(b.name);
		});
	}, [sortBy]);
	const top5Teams = [...TEAMS].sort((a, b) => b.probability - a.probability).slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-32 overflow-x-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 pointer-events-none z-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-[hsl(var(--gold)/0.1)] rounded-full blur-[120px]" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/30 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between p-4 px-4 pt-safe-top",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => navigate(-1),
							className: "rounded-full shrink-0 hover:bg-secondary/50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-lg font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-primary to-[hsl(var(--gold))]",
								children: "Estatísticas Copa 26"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] font-bold text-muted-foreground uppercase tracking-widest",
								children: "Índice de Força e Probabilidades"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 shrink-0" })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 max-w-2xl mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-4 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border-border/30 bg-secondary/10 backdrop-blur-md overflow-hidden relative shadow-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[-50px] right-[-50px] w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									className: "pb-0 pt-5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
										className: "text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-4 h-4 text-primary" }), "Favoritos ao Título"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									className: "pt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-[220px] w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
											config: { value: { label: "Probabilidade %" } },
											className: "h-full w-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
												data: top5Teams,
												layout: "vertical",
												margin: {
													left: 0,
													right: 30,
													top: 0,
													bottom: 0
												},
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
														type: "number",
														hide: true,
														domain: [0, 25]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
														dataKey: "name",
														type: "category",
														axisLine: false,
														tickLine: false,
														tick: {
															fontSize: 11,
															fill: "hsl(var(--foreground))",
															fontWeight: 600
														},
														width: 70
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
														content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, { indicator: "line" }),
														cursor: { fill: "hsl(var(--secondary)/0.3)" }
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
														dataKey: "probability",
														radius: [
															0,
															4,
															4,
															0
														],
														barSize: 20,
														label: {
															position: "right",
															fill: "hsl(var(--muted-foreground))",
															fontSize: 10,
															fontWeight: 600,
															formatter: (val) => `${val}%`
														},
														children: top5Teams.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: entry.color }, `cell-${index}`))
													})
												]
											})
										})
									})
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 mt-8 mb-4 flex items-end justify-between animate-in fade-in duration-700 delay-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-black uppercase tracking-wider text-foreground",
							children: "Ranking de Força"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground font-medium",
							children: "Análise técnica detalhada"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: sortBy,
							onValueChange: (val) => setSortBy(val),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-[140px] h-8 bg-secondary/30 border-border/30 text-xs font-semibold rounded-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Ordenar por" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "probability",
									children: "Impacto Título"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "strength",
									children: "Força (TPI)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "name",
									children: "Alfabética"
								})
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-4 flex flex-col gap-3 pb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300",
						children: sortedTeams.map((team, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamCard, {
							team,
							rank: index + 1
						}, team.id))
					})
				]
			})
		]
	});
}
export { CopaStatsDashboard as default };

//# sourceMappingURL=CopaStatsDashboard-CxXQVCtG.js.map