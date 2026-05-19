import { t as ChevronDown } from "./chevron-down-BRGxlYLT.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CN4GSHgJ.js";
import { t as CirclePlay } from "./circle-play-DLncWYQk.js";
import { t as Crosshair } from "./crosshair-Dlnb4fSb.js";
import { t as Ticket } from "./ticket-0y1aaOLn.js";
import { Br as ArrowLeft, Dn as Users, Dr as CircleCheckBig, F as useBolaoStore, Fn as Target, Hr as Activity, L as useNotificationStore_default, Mn as TrendingUp, Pr as Calendar, Sn as cn, bi as __toESM, c as DialogTrigger, di as useNavigate, er as Map, gr as Flame, hi as require_react, ii as require_jsx_runtime, jn as Trophy, o as DialogHeader, or as Info, r as DialogContent, s as DialogTitle, si as useToast, sn as Button, t as Dialog, z as Badge, zn as Star } from "./index-BWGMbNJK.js";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-BPjdhs3Z.js";
import { i as Root, n as CollapsibleTrigger$1, t as CollapsibleContent$1 } from "./dist-UBevXzFP.js";
import { M as Cell, f as Bar, n as YAxis, r as XAxis } from "./generateCategoricalChart-Rur_IeCp.js";
import { i as PolarGrid, n as Radar, r as PolarAngleAxis, t as RadarChart } from "./RadarChart-Ca6eeuu9.js";
import { t as BarChart } from "./BarChart-CoX_lCJS.js";
import { n as ChartTooltip, r as ChartTooltipContent, t as ChartContainer } from "./chart-BLvM1sGh.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DyG8XT1a.js";
import "./use-toast-MoNKrbaD.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var Collapsible = Root;
var CollapsibleTrigger = CollapsibleTrigger$1;
var CollapsibleContent = CollapsibleContent$1;
var import_jsx_runtime = require_jsx_runtime();
var SUMMARY_SCHEDULE = [
	{
		id: "m1",
		date: "11 Jun 2026",
		time: "15:00",
		team1: {
			name: "México",
			flag: "https://img.usecurling.com/p/100/100?q=mexico%20flag"
		},
		team2: {
			name: "Catar",
			flag: "https://img.usecurling.com/p/100/100?q=qatar%20flag"
		},
		stadium: "Estádio Azteca"
	},
	{
		id: "m2",
		date: "12 Jun 2026",
		time: "16:00",
		team1: {
			name: "EUA",
			flag: "https://img.usecurling.com/p/100/100?q=usa%20flag"
		},
		team2: {
			name: "País de Gales",
			flag: "https://img.usecurling.com/p/100/100?q=wales%20flag"
		},
		stadium: "SoFi Stadium"
	},
	{
		id: "m3",
		date: "15 Jun 2026",
		time: "13:00",
		team1: {
			name: "Brasil",
			flag: "https://img.usecurling.com/p/100/100?q=brazil%20flag"
		},
		team2: {
			name: "Sérvia",
			flag: "https://img.usecurling.com/p/100/100?q=serbia%20flag"
		},
		stadium: "MetLife Stadium"
	}
];
var COMPLETED_MATCHES = [
	{
		id: "c1",
		date: "10 Jun 2026",
		stage: "Abertura",
		team1: {
			name: "México",
			flag: "https://img.usecurling.com/p/100/100?q=mexico%20flag",
			score: 3
		},
		team2: {
			name: "Catar",
			flag: "https://img.usecurling.com/p/100/100?q=qatar%20flag",
			score: 1
		},
		motm: {
			name: "S. Giménez",
			image: "https://img.usecurling.com/p/100/100?q=santiago%20gimenez%20realistic%20portrait%20face"
		}
	},
	{
		id: "c2",
		date: "11 Jun 2026",
		stage: "Fase de Grupos",
		team1: {
			name: "EUA",
			flag: "https://img.usecurling.com/p/100/100?q=usa%20flag",
			score: 2
		},
		team2: {
			name: "P. de Gales",
			flag: "https://img.usecurling.com/p/100/100?q=wales%20flag",
			score: 2
		},
		motm: {
			name: "C. Pulisic",
			image: "https://img.usecurling.com/p/100/100?q=christian%20pulisic%20realistic%20portrait%20face"
		}
	},
	{
		id: "c3",
		date: "12 Jun 2026",
		stage: "Fase de Grupos",
		team1: {
			name: "Brasil",
			flag: "https://img.usecurling.com/p/100/100?q=brazil%20flag",
			score: 2
		},
		team2: {
			name: "Sérvia",
			flag: "https://img.usecurling.com/p/100/100?q=serbia%20flag",
			score: 0
		},
		motm: {
			name: "Neymar Jr.",
			image: "https://img.usecurling.com/p/256/256?q=neymar%20jr%20realistic%20portrait%20face&dpr=2"
		}
	}
];
var BOLAO_MATCHES = [
	{
		id: "b0",
		date: "14 Jun 2026",
		time: "Encerrado",
		team1: {
			name: "Alemanha",
			flag: "https://img.usecurling.com/p/100/100?q=germany%20flag"
		},
		team2: {
			name: "Brasil",
			flag: "https://img.usecurling.com/p/100/100?q=brazil%20flag"
		},
		stadium: "Allianz Arena",
		mockResult: {
			t1: 1,
			t2: 3,
			scorer: "Vini Jr."
		},
		finalized: true
	},
	{
		id: "b1",
		date: "15 Jun 2026",
		time: "16:00",
		team1: {
			name: "Brasil",
			flag: "https://img.usecurling.com/p/100/100?q=brazil%20flag"
		},
		team2: {
			name: "França",
			flag: "https://img.usecurling.com/p/100/100?q=france%20flag"
		},
		stadium: "Maracanã",
		mockResult: {
			t1: 2,
			t2: 0,
			scorer: "Neymar Jr."
		}
	},
	{
		id: "b2",
		date: "16 Jun 2026",
		time: "20:00",
		team1: {
			name: "Argentina",
			flag: "https://img.usecurling.com/p/100/100?q=argentina%20flag"
		},
		team2: {
			name: "Inglaterra",
			flag: "https://img.usecurling.com/p/100/100?q=england%20flag"
		},
		stadium: "Wembley",
		mockResult: {
			t1: 1,
			t2: 2,
			scorer: "Harry Kane"
		}
	}
];
var RANKINGS = {
	scorers: [
		{
			id: "1",
			name: "Neymar Jr.",
			team: "Brasil",
			value: 6,
			subtitle: "Gols"
		},
		{
			id: "2",
			name: "Kylian Mbappé",
			team: "França",
			value: 5,
			subtitle: "Gols"
		},
		{
			id: "3",
			name: "Harry Kane",
			team: "Inglaterra",
			value: 4,
			subtitle: "Gols"
		},
		{
			id: "4",
			name: "Lamine Yamal",
			team: "Espanha",
			value: 3,
			subtitle: "Gols"
		},
		{
			id: "5",
			name: "Jude Bellingham",
			team: "Inglaterra",
			value: 3,
			subtitle: "Gols"
		}
	],
	tactical: [
		{
			id: "4",
			name: "Rodri",
			team: "Espanha",
			value: 9.8,
			subtitle: "Rating"
		},
		{
			id: "5",
			name: "Jude Bellingham",
			team: "Inglaterra",
			value: 9.6,
			subtitle: "Rating"
		},
		{
			id: "6",
			name: "Jamal Musiala",
			team: "Alemanha",
			value: 9.4,
			subtitle: "Rating"
		},
		{
			id: "7",
			name: "Lionel Messi",
			team: "Argentina",
			value: 9.2,
			subtitle: "Rating"
		},
		{
			id: "8",
			name: "Bruno Fernandes",
			team: "Portugal",
			value: 9.1,
			subtitle: "Rating"
		}
	],
	goals: [
		{
			id: "7",
			name: "Vini Jr.",
			team: "Brasil",
			desc: "Voleio de fora da área vs Sérvia",
			value: "1º",
			subtitle: "Lugar"
		},
		{
			id: "8",
			name: "Lamine Yamal",
			team: "Espanha",
			desc: "Chute colocado no ângulo vs Itália",
			value: "2º",
			subtitle: "Lugar"
		},
		{
			id: "9",
			name: "Lionel Messi",
			team: "Argentina",
			desc: "Falta na gaveta vs Uruguai",
			value: "3º",
			subtitle: "Lugar"
		},
		{
			id: "10",
			name: "Kylian Mbappé",
			team: "França",
			desc: "Arrancada do meio campo vs Holanda",
			value: "4º",
			subtitle: "Lugar"
		}
	]
};
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
	}
];
var goldPlayerIds = [
	{
		id: "neymar",
		rating: 9.9
	},
	{
		id: "mbappe",
		rating: 9.7
	},
	{
		id: "messi",
		rating: 9.5
	},
	{
		id: "bellingham",
		rating: 9.3
	},
	{
		id: "kane",
		rating: 9
	},
	{
		id: "vini",
		rating: 8.8
	},
	{
		id: "yamal",
		rating: 8.6
	},
	{
		id: "musiala",
		rating: 8.5
	}
];
var getPlayerFromTeams = (playerId) => {
	for (const team of TEAMS) {
		const p = team.keyPlayers.find((p$1) => p$1.id === playerId);
		if (p) return {
			player: p,
			team
		};
	}
	return null;
};
var getGoldPos = (index, total, rating) => {
	const maxDistance = 42;
	const minDistance = 16;
	const maxRating = 9.9;
	const minRating = 8.5;
	let distance = 0;
	if (rating >= maxRating) distance = minDistance;
	else if (rating <= minRating) distance = maxDistance;
	else distance = minDistance + (maxRating - rating) / (maxRating - minRating) * (maxDistance - minDistance);
	const angle = (index * (360 / total) - 90) * (Math.PI / 180);
	return {
		left: 50 + distance * Math.cos(angle),
		top: 50 + distance * Math.sin(angle)
	};
};
function PlayerStatsDialog({ player, team, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
		asChild: true,
		children
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: "sm:max-w-md bg-secondary/95 border-border/50 backdrop-blur-xl max-h-[90vh] overflow-y-auto",
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
					className: "text-2xl font-black tracking-tight text-foreground",
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
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 pt-4 border-t border-border/20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "w-3.5 h-3.5" }), " Análise Tática e Lances"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl overflow-hidden border border-border/20 relative aspect-[4/3] group cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: `https://img.usecurling.com/p/300/200?q=heat%20map%20soccer&color=red&seed=${player.name.length}`,
								alt: "Heatmap",
								className: "w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold uppercase tracking-wider text-white",
									children: "Heatmap Tático"
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl overflow-hidden border border-border/20 relative aspect-[4/3] group cursor-pointer",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: `https://img.usecurling.com/p/300/200?q=soccer%20stadium%20night&seed=${player.name.length}`,
									alt: "Highlight",
									className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "w-8 h-8 text-white/90 drop-shadow-lg group-hover:scale-110 transition-transform" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold uppercase tracking-wider text-white",
										children: "Ver Destaques"
									})
								})
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 rounded-xl bg-background/40 backdrop-blur-sm border border-[hsl(var(--gold)/0.3)] shadow-sm relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-32 h-32 opacity-20 blur-2xl pointer-events-none rounded-full bg-[hsl(var(--gold))]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5 relative z-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-3.5 h-3.5 text-[hsl(var(--gold))]" }), "Impacto para o Título (Gold Profile)"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-foreground/90 font-medium relative z-10",
							children: player.impactAnalysis
						})
					]
				})
			]
		})]
	})] });
}
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
									children: team.keyPlayers.map((player) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerStatsDialog, {
										player,
										team,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											className: "flex flex-col items-center gap-1.5 group hover:opacity-80 transition-opacity outline-none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-14 h-14 rounded-full overflow-hidden border-[2.5px] border-border/50 group-hover:border-[hsl(var(--gold))] transition-colors shadow-sm",
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
									}, player.id))
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
	const { toast } = useToast();
	const [sortBy, setSortBy] = (0, import_react.useState)("probability");
	const [rankingTab, setRankingTab] = (0, import_react.useState)("scorers");
	const [predictions, setPredictions] = (0, import_react.useState)({ b0: {
		t1Score: 1,
		t2Score: 3,
		scorer: "Vini Jr.",
		status: "won"
	} });
	const [selectedMatch, setSelectedMatch] = (0, import_react.useState)(null);
	const [showVoucher, setShowVoucher] = (0, import_react.useState)(null);
	const [t1, setT1] = (0, import_react.useState)(0);
	const [t2, setT2] = (0, import_react.useState)(0);
	const [scorer, setScorer] = (0, import_react.useState)("");
	const sortedTeams = (0, import_react.useMemo)(() => {
		return [...TEAMS].sort((a, b) => {
			if (sortBy === "probability") return b.probability - a.probability;
			if (sortBy === "strength") return b.strength - a.strength;
			return a.name.localeCompare(b.name);
		});
	}, [sortBy]);
	const top5Teams = [...TEAMS].sort((a, b) => b.probability - a.probability).slice(0, 5);
	const elitePlayersData = (0, import_react.useMemo)(() => {
		return [
			{
				teamId: "br",
				playerId: "neymar"
			},
			{
				teamId: "ar",
				playerId: "messi"
			},
			{
				teamId: "fr",
				playerId: "mbappe"
			},
			{
				teamId: "en",
				playerId: "bellingham"
			},
			{
				teamId: "es",
				playerId: "yamal"
			}
		].map((ep) => {
			const team = TEAMS.find((t) => t.id === ep.teamId);
			return {
				team,
				player: team.keyPlayers.find((p) => p.id === ep.playerId)
			};
		});
	}, []);
	const handlePredict = (match) => {
		setSelectedMatch(match);
		setT1(0);
		setT2(0);
		setScorer("");
	};
	const submitPrediction = () => {
		if (!selectedMatch) return;
		const isPerfect = t1 === selectedMatch.mockResult.t1 && t2 === selectedMatch.mockResult.t2 && scorer.trim().toLowerCase() === selectedMatch.mockResult.scorer.toLowerCase();
		const newPrediction = {
			t1Score: t1,
			t2Score: t2,
			scorer,
			status: isPerfect ? "won" : "pending"
		};
		setPredictions((prev) => ({
			...prev,
			[selectedMatch.id]: newPrediction
		}));
		if (isPerfect) {
			setShowVoucher(selectedMatch);
			useBolaoStore.getState().setWon(selectedMatch.team1.name);
			useNotificationStore_default.getState().addNotification({
				title: "🏆 Bolão GoPlay - Na Mosca!",
				message: `Você acertou o placar exato de ${selectedMatch.team1.name} x ${selectedMatch.team2.name}! Resgate agora sua camiseta oficial com frete grátis.`,
				type: "system",
				link: `/marketplace?redeem=true&team=${encodeURIComponent(selectedMatch.team1.name)}`,
				priority: "high"
			});
		} else toast({
			title: "Palpite Registrado!",
			description: "Seu palpite foi salvo. (Como é uma simulação, apenas acertos exatos disparam o prêmio agora)."
		});
		setSelectedMatch(null);
	};
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
								children: "Copa 26 Stats"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] font-bold text-muted-foreground uppercase tracking-widest",
								children: "Dashboard de Torneio"
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
						className: "px-4 mt-6 animate-in fade-in duration-700",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border-[hsl(var(--gold)/0.4)] bg-black/40 overflow-hidden relative shadow-[0_0_20px_hsl(var(--gold)/0.1)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--gold)/0.15),transparent_70%)] pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6 flex flex-col items-center relative z-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center text-center mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "text-xl font-black uppercase tracking-widest text-[hsl(var(--gold))] flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-5 h-5" }), " Gold Profile"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1",
										children: "Road to Glory - Top Performers"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative w-full max-w-[300px] aspect-square mx-auto",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-[15%] rounded-full border-[1.5px] border-[hsl(var(--gold)/0.4)] border-dashed" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-[30%] rounded-full border-[1.5px] border-[hsl(var(--gold)/0.25)] border-dashed" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-[45%] rounded-full border-[1.5px] border-[hsl(var(--gold)/0.15)] border-dashed" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#ffd700] to-[#b8860b] p-4 rounded-full shadow-[0_0_40px_hsl(var(--gold)/0.6)] z-20 border-2 border-yellow-300",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-10 h-10 text-black drop-shadow-md" })
										}),
										goldPlayerIds.map((p, i) => {
											const pos = getGoldPos(i, goldPlayerIds.length, p.rating);
											const data = getPlayerFromTeams(p.id);
											if (!data) return null;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute z-30 transition-all duration-500 hover:scale-125 hover:z-40",
												style: {
													top: `${pos.top}%`,
													left: `${pos.left}%`,
													transform: "translate(-50%, -50%)"
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerStatsDialog, {
													player: data.player,
													team: data.team,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														className: "relative w-12 h-12 rounded-full p-[2px] bg-gradient-to-br from-[hsl(var(--gold))] to-amber-700 shadow-lg outline-none",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "w-full h-full rounded-full overflow-hidden bg-black",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																src: data.player.image,
																alt: data.player.name,
																className: "w-full h-full object-cover"
															})
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black/90 border border-[hsl(var(--gold))] px-1.5 py-0.5 rounded text-[8px] font-black text-[hsl(var(--gold))] shadow-sm whitespace-nowrap",
															children: p.rating
														})]
													})
												})
											}, p.id);
										})
									]
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 mt-8 animate-in fade-in duration-700 delay-150",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end justify-between mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-black uppercase tracking-wider text-foreground",
								children: "Resultados"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground font-medium",
								children: "Últimas partidas encerradas"
							})] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden",
							children: COMPLETED_MATCHES.map((match) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "min-w-[280px] shrink-0 snap-center border-border/30 bg-secondary/10 backdrop-blur-md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[10px] text-muted-foreground font-bold uppercase mb-3 flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: match.stage }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: match.date })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center mb-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-col items-center gap-1.5 w-[35%]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: match.team1.flag,
														className: "w-10 h-10 rounded-full border-2 border-border/50 object-cover shadow-sm",
														alt: match.team1.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-bold truncate w-full text-center",
														children: match.team1.name
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-col items-center justify-center w-[30%]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-3xl font-black text-foreground tabular-nums",
														children: [
															match.team1.score,
															" - ",
															match.team2.score
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														variant: "outline",
														className: "text-[9px] mt-1 bg-green-500/10 text-green-500 border-green-500/20 px-1.5",
														children: "FINAL"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-col items-center gap-1.5 w-[35%]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: match.team2.flag,
														className: "w-10 h-10 rounded-full border-2 border-border/50 object-cover shadow-sm",
														alt: match.team2.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-bold truncate w-full text-center",
														children: match.team2.name
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-3 border-t border-border/10 flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-3.5 h-3.5 text-[hsl(var(--gold))]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] uppercase font-bold text-muted-foreground",
													children: "Man of the Match"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-black",
													children: match.motm.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: match.motm.image,
													className: "w-7 h-7 rounded-full border border-border/30 object-cover",
													alt: match.motm.name
												})]
											})]
										})
									]
								})
							}, match.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 mt-8 animate-in fade-in duration-700 delay-300",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-end justify-between mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "text-xl font-black uppercase tracking-wider text-foreground flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "w-5 h-5 text-[hsl(var(--gold))]" }), "Bolão GoPlay"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground font-medium mt-1",
									children: "Acerte o placar e ganhe prêmios exclusivos"
								})] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-primary/10 border border-primary/20 rounded-xl p-3 mb-4 flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "w-4 h-4 text-primary shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] text-primary/80 leading-relaxed font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Nota de Sistema:" }), " A verificação em tempo real de resultados e o ranking global persistente do Bolão requerem conexão com backend (Supabase ou Skip Cloud). Atualmente rodando em modo simulação."]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden",
								children: BOLAO_MATCHES.map((match) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
									className: cn("min-w-[280px] shrink-0 snap-center border-border/30 bg-secondary/10 backdrop-blur-md relative overflow-hidden transition-all", predictions[match.id]?.status === "won" && "border-[hsl(var(--gold)/0.5)] shadow-[0_0_15px_hsl(var(--gold)/0.2)]"),
									children: [predictions[match.id]?.status === "won" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute top-0 right-0 bg-gradient-to-r from-[hsl(var(--gold))] to-amber-600 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-lg z-20 shadow-md",
										children: "Na Mosca!"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--gold)/0.05),transparent_70%)] pointer-events-none" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[10px] text-muted-foreground font-bold uppercase mb-3 flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1.5",
													children: [match.date, match.finalized && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														variant: "outline",
														className: "text-[8px] bg-red-500/10 text-red-500 border-red-500/20 px-1 py-0 h-4",
														children: "FINALIZADO"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: match.stadium })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between items-center mb-4 relative",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col items-center gap-1.5 w-[35%] z-10",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: match.team1.flag,
															className: "w-10 h-10 rounded-full border-2 border-border/50 object-cover shadow-sm",
															alt: match.team1.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs font-bold truncate w-full text-center",
															children: match.team1.name
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex flex-col items-center justify-center w-[30%] z-10",
														children: predictions[match.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex flex-col items-center",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "text-2xl font-black text-foreground tabular-nums leading-none",
																children: [
																	predictions[match.id].t1Score,
																	" -",
																	" ",
																	predictions[match.id].t2Score
																]
															}), match.finalized && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "text-[10px] text-muted-foreground font-bold uppercase mt-1 text-center",
																children: [
																	"Placar Real:",
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
																	match.mockResult.t1,
																	" - ",
																	match.mockResult.t2
																]
															})]
														}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xl font-black text-muted-foreground/50",
															children: "VS"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col items-center gap-1.5 w-[35%]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: match.team2.flag,
															className: "w-10 h-10 rounded-full border-2 border-border/50 object-cover shadow-sm",
															alt: match.team2.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs font-bold truncate w-full text-center",
															children: match.team2.name
														})]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "pt-3 border-t border-border/10",
												children: predictions[match.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-col gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between text-xs",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground font-semibold",
															children: "Palpite de gol:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-bold",
															children: predictions[match.id].scorer
														})]
													}), predictions[match.id].status === "won" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														onClick: () => setShowVoucher(match),
														size: "sm",
														className: "w-full text-xs font-black uppercase tracking-widest bg-[hsl(var(--gold))] text-black hover:bg-[hsl(var(--gold)/0.8)] shadow-[0_0_10px_hsl(var(--gold)/0.4)] animate-pulse",
														children: "Resgatar Prêmio"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														variant: "secondary",
														className: "w-full justify-center py-1",
														children: "Aguardando Resultado"
													})]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													onClick: () => handlePredict(match),
													size: "sm",
													className: "w-full text-xs font-black uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90",
													children: "Fazer Palpite"
												})
											})
										]
									})]
								}, match.id))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 mt-8 animate-in fade-in duration-700 delay-300",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-black uppercase tracking-wider text-foreground",
									children: "Rankings"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground font-medium",
									children: "Destaques individuais do torneio"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 bg-secondary/30 p-1.5 rounded-xl mb-4 border border-border/20",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setRankingTab("scorers"),
										className: cn("flex-1 text-[11px] font-black uppercase tracking-wider py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5", rankingTab === "scorers" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "w-3.5 h-3.5" }), "Artilharia"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setRankingTab("tactical"),
										className: cn("flex-1 text-[11px] font-black uppercase tracking-wider py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5", rankingTab === "tactical" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crosshair, { className: "w-3.5 h-3.5" }), "Tático"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setRankingTab("goals"),
										className: cn("flex-1 text-[11px] font-black uppercase tracking-wider py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5", rankingTab === "goals" ? "bg-[hsl(var(--gold))] text-black shadow-sm" : "text-muted-foreground hover:text-foreground"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-3.5 h-3.5" }), "Pinturas"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "border-border/30 bg-secondary/10 backdrop-blur-md overflow-hidden shadow-lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "divide-y divide-border/20",
									children: RANKINGS[rankingTab].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-6 text-center text-lg font-black text-muted-foreground/40",
												children: i + 1
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-bold",
													children: item.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5 mt-0.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] font-bold text-muted-foreground uppercase",
														children: item.team
													}), item.desc && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1 h-1 rounded-full bg-border" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-muted-foreground italic truncate max-w-[120px]",
														children: item.desc
													})] })]
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-end",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("text-lg font-black", rankingTab === "goals" ? "text-[hsl(var(--gold))]" : "text-primary"),
												children: item.value
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] uppercase font-bold text-muted-foreground",
												children: item.subtitle
											})]
										})]
									}, item.id))
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-4 mt-12 animate-in fade-in duration-700 delay-500",
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
						className: "px-4 mt-8 animate-in fade-in duration-700 delay-500",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end justify-between mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-black uppercase tracking-wider text-foreground",
								children: "Galeria Elite"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground font-medium",
								children: "Destaques das seleções"
							})] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden",
							children: elitePlayersData.map(({ team, player }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerStatsDialog, {
								player,
								team,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "flex flex-col items-center gap-2 group hover:opacity-80 transition-opacity outline-none snap-start shrink-0 w-[120px] bg-secondary/20 p-3 rounded-2xl border border-border/30 backdrop-blur-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative w-20 h-20 rounded-full overflow-hidden border-[3px] border-border/50 group-hover:scale-105 transition-transform duration-300 shadow-sm",
										style: { borderColor: team.color },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: player.image,
											alt: player.name,
											className: "w-full h-full object-cover"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-center gap-0.5 mt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold text-foreground transition-colors text-center leading-tight",
											children: player.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider",
											style: { color: team.color },
											children: team.name
										})]
									})]
								})
							}, player.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 mt-8 animate-in fade-in duration-700 delay-500",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-black uppercase tracking-wider text-foreground",
								children: "Calendário"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground font-medium",
								children: "Próximos confrontos"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								className: "text-xs bg-secondary/20 border-border/30 hover:bg-secondary/40 h-8 rounded-full px-4",
								onClick: () => navigate("/album/stats/table"),
								children: "Ver Tabela"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "border-border/30 bg-secondary/10 backdrop-blur-md overflow-hidden shadow-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
									className: "bg-secondary/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										className: "border-border/30 hover:bg-transparent",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												className: "w-[80px] text-[10px] uppercase font-bold text-muted-foreground whitespace-nowrap",
												children: "Data"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												className: "w-[60px] text-[10px] uppercase font-bold text-muted-foreground",
												children: "Hora"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												className: "text-[10px] uppercase font-bold text-muted-foreground",
												children: "Confronto"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												className: "text-[10px] uppercase font-bold text-muted-foreground text-right whitespace-nowrap",
												children: "Local"
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: SUMMARY_SCHEDULE.map((match) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
									className: "border-border/20 hover:bg-secondary/20 cursor-pointer transition-colors",
									onClick: () => navigate("/album/stats/table"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "font-medium text-xs whitespace-nowrap",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-3 h-3 text-primary" }), match.date]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "text-xs text-muted-foreground",
											children: match.time
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex flex-col items-end w-[45px]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-bold truncate w-full text-right",
														children: match.team1.name
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: match.team1.flag,
													alt: match.team1.name,
													className: "w-4 h-4 rounded-full object-cover border border-border/50 shrink-0"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-black text-muted-foreground mx-0.5",
													children: "X"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: match.team2.flag,
													alt: match.team2.name,
													className: "w-4 h-4 rounded-full object-cover border border-border/50 shrink-0"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex flex-col items-start w-[45px]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-bold truncate w-full text-left",
														children: match.team2.name
													})
												})
											]
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "text-right text-[10px] text-muted-foreground whitespace-nowrap",
											children: match.stadium
										})
									]
								}, match.id)) })] })
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 mt-8 mb-4 flex items-end justify-between animate-in fade-in duration-700 delay-500",
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
						className: "px-4 flex flex-col gap-3 pb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500",
						children: sortedTeams.map((team, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamCard, {
							team,
							rank: index + 1
						}, team.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!selectedMatch,
				onOpenChange: (open) => !open && setSelectedMatch(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md bg-secondary border-border/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "uppercase tracking-widest font-black text-center text-foreground",
						children: "Faça seu Palpite"
					}) }), selectedMatch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6 pt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between px-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-center gap-2 w-1/3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: selectedMatch.team1.flag,
												className: "w-14 h-14 rounded-full border-2 border-border/50 object-cover shadow-sm",
												alt: selectedMatch.team1.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-sm text-center",
												children: selectedMatch.team1.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												value: t1,
												onChange: (e) => setT1(Number(e.target.value)),
												className: "flex h-12 w-16 rounded-md border border-input bg-background px-3 py-2 text-xl font-black text-center ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
												min: 0
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl font-black text-muted-foreground/30",
										children: "X"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-center gap-2 w-1/3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: selectedMatch.team2.flag,
												className: "w-14 h-14 rounded-full border-2 border-border/50 object-cover shadow-sm",
												alt: selectedMatch.team2.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-sm text-center",
												children: selectedMatch.team2.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												value: t2,
												onChange: (e) => setT2(Number(e.target.value)),
												className: "flex h-12 w-16 rounded-md border border-input bg-background px-3 py-2 text-xl font-black text-center ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
												min: 0
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 px-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-bold uppercase tracking-widest text-muted-foreground",
										children: "Quem fará um gol?"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										placeholder: "Ex: Neymar Jr.",
										value: scorer,
										onChange: (e) => setScorer(e.target.value),
										className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] text-muted-foreground italic mt-2 border-l-2 border-primary/50 pl-2",
										children: [
											"Dica para testar: ",
											selectedMatch.mockResult.t1,
											"x",
											selectedMatch.mockResult.t2,
											" com gol de '",
											selectedMatch.mockResult.scorer,
											"' aciona o prêmio!"
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-4 pb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "w-full font-black uppercase tracking-widest h-12",
									onClick: submitPrediction,
									children: "Participar do Bolão"
								})
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!showVoucher,
				onOpenChange: (open) => !open && setShowVoucher(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md bg-zinc-950 border-[hsl(var(--gold))] text-white overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--gold)/0.2),transparent_70%)] pointer-events-none" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-20 -top-20 w-40 h-40 bg-[hsl(var(--gold)/0.3)] blur-[80px] rounded-full" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-20 -bottom-20 w-40 h-40 bg-[hsl(var(--gold)/0.3)] blur-[80px] rounded-full" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[url('https://img.usecurling.com/p/600/600?q=glitter%20particles&color=yellow')] opacity-10 mix-blend-color-dodge pointer-events-none" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							className: "relative z-10 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								className: "text-3xl font-black text-[hsl(var(--gold))] text-center uppercase tracking-widest flex items-center justify-center gap-2 drop-shadow-[0_0_10px_hsl(var(--gold)/0.5)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-8 h-8" }), " NA MOSCA!"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-sm font-bold text-white/80 uppercase tracking-widest mt-2",
								children: "Palpite Perfeito Concluído"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-6 py-2 relative z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full relative group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-1 bg-gradient-to-r from-[hsl(var(--gold))] via-amber-200 to-[hsl(var(--gold))] rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative bg-zinc-900 border-2 border-[hsl(var(--gold))] rounded-2xl p-6 overflow-hidden flex flex-col items-center gap-4 shadow-2xl",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute -right-8 -top-8 opacity-20 rotate-12 pointer-events-none",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: showVoucher?.team1?.flag,
													className: "w-40 h-40 object-cover blur-[2px]",
													alt: "Flag Background"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between w-full border-b border-white/10 pb-4 relative z-10",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: showVoucher?.team1?.flag,
														className: "w-10 h-10 rounded-full border-2 border-[hsl(var(--gold))] shadow-md object-cover",
														alt: showVoucher?.team1?.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] uppercase tracking-widest text-[hsl(var(--gold))] font-bold",
															children: "Recompensa Exclusiva"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-sm font-black text-white",
															children: showVoucher?.team1?.name
														})]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "w-8 h-8 text-[hsl(var(--gold))] opacity-80" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-center space-y-1 relative z-10 w-full py-2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
													className: "text-lg md:text-xl font-black text-white uppercase tracking-wider leading-tight drop-shadow-md",
													children: [
														"Você acaba de ganhar uma camiseta oficial da",
														" ",
														showVoucher?.team1?.name,
														"!"
													]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col w-full gap-3 relative z-10",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between bg-black/50 rounded-lg p-3 border border-white/5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] text-white/50 uppercase font-bold tracking-widest",
															children: "Código do Voucher"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "font-mono text-lg font-bold text-[hsl(var(--gold))] tracking-wider",
															children: [
																"GOPLAY-WIN-",
																showVoucher?.team1?.name?.substring(0, 3).toUpperCase() || "BR",
																"-26"
															]
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														size: "icon",
														variant: "ghost",
														className: "h-8 w-8 text-white/50 hover:text-white",
														onClick: () => {
															navigator.clipboard.writeText(`GOPLAY-WIN-${showVoucher?.team1?.name?.substring(0, 3).toUpperCase() || "BR"}-26`);
														},
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
															width: "15",
															height: "15",
															viewBox: "0 0 15 15",
															fill: "none",
															xmlns: "http://www.w3.org/2000/svg",
															className: "w-4 h-4",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
																d: "M5 2V1H10V2H5ZM4.75 0C4.33579 0 4 0.335786 4 0.75V1H3.5C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H11V0.75C11 0.335786 10.6642 0 10.25 0H4.75ZM11 2V2.25C11 2.66421 10.6642 3 10.25 3H4.75C4.33579 3 4 2.66421 4 2.25V2H3.5C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V2.5C12 2.22386 11.7761 2 11.5 2H11Z",
																fill: "currentColor",
																fillRule: "evenodd",
																clipRule: "evenodd"
															})
														})
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-center gap-2 bg-green-500/20 text-green-400 p-2.5 rounded-lg border border-green-500/30",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-black uppercase tracking-widest",
														children: "Frete Gratuito Incluído"
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-zinc-950 rounded-full border-r-2 border-[hsl(var(--gold))] z-20" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-zinc-950 rounded-full border-l-2 border-[hsl(var(--gold))] z-20" })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-center text-white/50 px-4 leading-relaxed font-medium",
									children: "* Para resgatar, acesse a aba Recompensas em seu perfil e insira o código gerado. (Aviso: Recompensa em modo simulação. Status reinicia ao recarregar a página.)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "px-4 w-full mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "w-full bg-[hsl(var(--gold))] text-black font-black uppercase tracking-widest hover:bg-[hsl(var(--gold)/0.8)] shadow-[0_0_20px_hsl(var(--gold)/0.4)] h-14 text-sm",
										onClick: () => {
											setShowVoucher(null);
											navigate(`/marketplace?redeem=true&team=${encodeURIComponent(showVoucher?.team1?.name || "")}`);
										},
										children: "Resgatar Prêmio Agora"
									})
								})
							]
						})
					]
				})
			})
		]
	});
}
export { CopaStatsDashboard as default };

//# sourceMappingURL=CopaStatsDashboard--I1BCXct.js.map