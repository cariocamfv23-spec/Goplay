import { Mt as mockUser, Rt as persist, vn as toast, zt as create } from "./index-6JQDnUMD.js";
const initialTribes = [
	{
		id: "t1",
		name: "Pelada de Domingo FC",
		category: "Futebol",
		description: "A clássica pelada de domingo. Só vem quem aguenta a resenha e o calor do meio-dia.",
		icon: "https://img.usecurling.com/i?q=soccer%20ball&color=green",
		cover: "https://img.usecurling.com/p/800/400?q=soccer%20field%20sunny&color=green",
		isPrivate: false,
		creatorId: "u3",
		members: [
			"u3",
			"u4",
			mockUser.id
		],
		pendingRequests: [],
		events: [{
			id: "e1",
			title: "Racha de Domingo",
			date: "Domingo, 09:00",
			location: "Campo do Botafogo"
		}]
	},
	{
		id: "t2",
		name: "Masters of the Pitch",
		category: "Futebol",
		description: "Futebol society de alto nível. Foco em tática e competições regionais amadoras.",
		icon: "https://img.usecurling.com/i?q=trophy&color=gold",
		cover: "https://img.usecurling.com/p/800/400?q=stadium%20night&color=blue",
		isPrivate: true,
		creatorId: "u4",
		members: ["u4", "u5"],
		pendingRequests: ["u6"],
		events: []
	},
	{
		id: "t3",
		name: "Local League Fans",
		category: "Futebol",
		description: "Comunidade dedicada a acompanhar e debater os campeonatos locais.",
		icon: "https://img.usecurling.com/i?q=stadium&color=red",
		cover: "https://img.usecurling.com/p/800/400?q=soccer%20fans&color=red",
		isPrivate: false,
		creatorId: "u5",
		members: ["u5", "u7"],
		pendingRequests: [],
		events: []
	},
	{
		id: "t4",
		name: "Concrete Surfers",
		category: "Skate",
		description: "Surfando no asfalto. Pistas, bowls e muito freeride pela cidade.",
		icon: "https://img.usecurling.com/i?q=skateboard&color=gray",
		cover: "https://img.usecurling.com/p/800/400?q=skatepark%20bowl&color=gray",
		isPrivate: false,
		creatorId: mockUser.id,
		members: [mockUser.id, "u8"],
		pendingRequests: [],
		events: []
	},
	{
		id: "t5",
		name: "Street Kings",
		category: "Skate",
		description: "A rua é nossa casa. Foco em street skate, picos urbanos e manobras técnicas.",
		icon: "https://img.usecurling.com/i?q=crown&color=orange",
		cover: "https://img.usecurling.com/p/800/400?q=skateboard%20street%20trick&color=orange",
		isPrivate: false,
		creatorId: "u9",
		members: ["u9", "u10"],
		pendingRequests: [],
		events: []
	},
	{
		id: "t6",
		name: "Vert Park Legends",
		category: "Skate",
		description: "Apenas transições e aéreos. Para os amantes de halfpipe e mega rampas.",
		icon: "https://img.usecurling.com/i?q=ramp&color=blue",
		cover: "https://img.usecurling.com/p/800/400?q=vert%20skate%20ramp&color=blue",
		isPrivate: true,
		creatorId: "u3",
		members: ["u3"],
		pendingRequests: ["u4"],
		events: []
	},
	{
		id: "t7",
		name: "Mountain Trail Blazers",
		category: "Bike",
		description: "Desbravando trilhas e montanhas todo final de semana. Pura adrenalina e lama.",
		icon: "https://img.usecurling.com/i?q=mountain%20bike&color=green",
		cover: "https://img.usecurling.com/p/800/400?q=mountain%20biking%20forest&color=green",
		isPrivate: false,
		creatorId: "u6",
		members: ["u6", "u7"],
		pendingRequests: [],
		events: []
	},
	{
		id: "t8",
		name: "Sunday Road Cyclists",
		category: "Bike",
		description: "Pelotão focado em asfalto, velocidade e longas distâncias aos domingos.",
		icon: "https://img.usecurling.com/i?q=bicycle&color=red",
		cover: "https://img.usecurling.com/p/800/400?q=road%20cycling%20group&color=red",
		isPrivate: false,
		creatorId: "u8",
		members: ["u8", mockUser.id],
		pendingRequests: [],
		events: []
	},
	{
		id: "t9",
		name: "Urban Commuters",
		category: "Bike",
		description: "Mobilidade urbana levada a sério. A cidade vista de cima do selim.",
		icon: "https://img.usecurling.com/i?q=city&color=purple",
		cover: "https://img.usecurling.com/p/800/400?q=city%20biking&color=purple",
		isPrivate: false,
		creatorId: "u4",
		members: ["u4", "u9"],
		pendingRequests: [],
		events: []
	},
	{
		id: "t10",
		name: "Dawn Patrol Crew",
		category: "Surf",
		description: "Primeira luz do dia e já estamos na água. Aproveitando o mar liso e vazio.",
		icon: "https://img.usecurling.com/i?q=sunrise&color=orange",
		cover: "https://img.usecurling.com/p/800/400?q=surfing%20sunrise&color=orange",
		isPrivate: false,
		creatorId: "u5",
		members: ["u5", "u10"],
		pendingRequests: [],
		events: []
	},
	{
		id: "t11",
		name: "Big Wave Hunters",
		category: "Surf",
		description: "Caçadores de swells e ondulações pesadas. Apenas para surfistas experientes.",
		icon: "https://img.usecurling.com/i?q=wave&color=blue",
		cover: "https://img.usecurling.com/p/800/400?q=big%20wave%20surfing&color=blue",
		isPrivate: true,
		creatorId: "u7",
		members: ["u7"],
		pendingRequests: ["u8", "u9"],
		events: []
	},
	{
		id: "t12",
		name: "Beach Break Collective",
		category: "Surf",
		description: "A vibe clássica do surf de praia com a galera. Longboards, fun e muita paz.",
		icon: "https://img.usecurling.com/i?q=surfboard&color=cyan",
		cover: "https://img.usecurling.com/p/800/400?q=beach%20surf%20lifestyle&color=cyan",
		isPrivate: false,
		creatorId: "u3",
		members: ["u3", mockUser.id],
		pendingRequests: [],
		events: []
	},
	{
		id: "t13",
		name: "Streetballers",
		category: "Basquete",
		description: "Basquete de rua 3x3. Toda noite na quadra pública da praça.",
		icon: "https://img.usecurling.com/i?q=basketball&color=orange",
		cover: "https://img.usecurling.com/p/800/400?q=street%20basketball%20court&color=orange",
		isPrivate: false,
		creatorId: "u6",
		members: ["u6"],
		pendingRequests: [],
		events: []
	},
	{
		id: "t14",
		name: "Ace Smashers",
		category: "Tênis",
		description: "Torneios amadores, clínicas de aprimoramento e muito jogo no saibro.",
		icon: "https://img.usecurling.com/i?q=tennis%20ball&color=yellow",
		cover: "https://img.usecurling.com/p/800/400?q=tennis%20court%20action&color=yellow",
		isPrivate: false,
		creatorId: "u8",
		members: ["u8", "u9"],
		pendingRequests: [],
		events: []
	}
];
const useNexusStore = create()(persist((set) => ({
	tribes: initialTribes,
	createTribe: (data) => set((state) => {
		try {
			const newTribe = {
				...data,
				id: `t${Date.now()}`,
				members: [data.creatorId],
				pendingRequests: [],
				events: []
			};
			toast.success("Tribo criada com sucesso!");
			return { tribes: [...state.tribes, newTribe] };
		} catch (error) {
			toast.error("Erro ao criar a tribo. Verifique os dados e tente novamente.");
			return state;
		}
	}),
	joinTribe: (tribeId, userId) => set((state) => {
		try {
			return { tribes: state.tribes.map((t) => {
				if (t.id === tribeId) if (t.isPrivate) if (!t.pendingRequests.includes(userId)) {
					toast.success("Solicitação enviada ao administrador.");
					return {
						...t,
						pendingRequests: [...t.pendingRequests, userId]
					};
				} else toast.info("Sua solicitação já está pendente.");
				else if (!t.members.includes(userId)) {
					toast.success("Bem-vindo à tribo!");
					return {
						...t,
						members: [...t.members, userId]
					};
				} else toast.info("Você já é membro desta tribo.");
				return t;
			}) };
		} catch (error) {
			toast.error("Erro ao entrar na tribo. Tente novamente mais tarde.");
			return state;
		}
	}),
	approveRequest: (tribeId, userId) => set((state) => {
		try {
			return { tribes: state.tribes.map((t) => {
				if (t.id === tribeId) {
					toast.success("Membro aprovado!");
					return {
						...t,
						pendingRequests: t.pendingRequests.filter((id) => id !== userId),
						members: [...t.members, userId]
					};
				}
				return t;
			}) };
		} catch (error) {
			toast.error("Erro ao aprovar o membro.");
			return state;
		}
	}),
	declineRequest: (tribeId, userId) => set((state) => {
		try {
			return { tribes: state.tribes.map((t) => {
				if (t.id === tribeId) {
					toast.info("Solicitação recusada.");
					return {
						...t,
						pendingRequests: t.pendingRequests.filter((id) => id !== userId)
					};
				}
				return t;
			}) };
		} catch (error) {
			toast.error("Erro ao recusar a solicitação.");
			return state;
		}
	})
}), { name: "goplay-nexus-storage" }));
export { useNexusStore as t };

//# sourceMappingURL=useNexusStore-BH38E6te.js.map