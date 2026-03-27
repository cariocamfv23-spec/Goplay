import { Ft as mockUser, Ht as create, Vt as persist, xn as toast } from "./index-DRYwHC8w.js";
var initialTribes = [
	{
		id: "t1",
		name: "Varzeanos Raiz",
		category: "Futebol",
		description: "A tribo oficial da várzea. Aqui o futebol respira em cada esquina.",
		icon: "https://img.usecurling.com/i?q=soccer%20ball&color=green",
		cover: "https://img.usecurling.com/p/800/400?q=muddy%20soccer%20field&color=green",
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
		name: "Elite Runners",
		category: "Corrida",
		description: "Foco na alta performance. Corridas diárias, desafios e planilhas compartilhadas.",
		icon: "https://img.usecurling.com/i?q=running%20shoe&color=orange",
		cover: "https://img.usecurling.com/p/800/400?q=running%20track&color=orange",
		isPrivate: true,
		creatorId: mockUser.id,
		members: [mockUser.id, "u5"],
		pendingRequests: ["u6", "u7"],
		events: []
	},
	{
		id: "t3",
		name: "GG E-Sports Hub",
		category: "E-Sports",
		description: "Encontre seu duo, forme times e participe de campeonatos internos.",
		icon: "https://img.usecurling.com/i?q=gamepad&color=purple",
		cover: "https://img.usecurling.com/p/800/400?q=cyberpunk%20gaming%20setup&color=purple",
		isPrivate: false,
		creatorId: "u8",
		members: ["u8", "u9"],
		pendingRequests: [],
		events: [{
			id: "e2",
			title: "Torneio 2v2",
			date: "Sábado, 20:00",
			location: "Discord Oficial"
		}]
	}
];
const useNexusStore = create()(persist((set) => ({
	tribes: initialTribes,
	createTribe: (data) => set((state) => {
		const newTribe = {
			...data,
			id: `t${Date.now()}`,
			members: [data.creatorId],
			pendingRequests: [],
			events: []
		};
		toast.success("Tribo criada com sucesso!");
		return { tribes: [...state.tribes, newTribe] };
	}),
	joinTribe: (tribeId, userId) => set((state) => {
		return { tribes: state.tribes.map((t) => {
			if (t.id === tribeId) {
				if (t.isPrivate) {
					if (!t.pendingRequests.includes(userId)) {
						toast.success("Solicitação enviada ao administrador.");
						return {
							...t,
							pendingRequests: [...t.pendingRequests, userId]
						};
					}
				} else if (!t.members.includes(userId)) {
					toast.success("Bem-vindo à tribo!");
					return {
						...t,
						members: [...t.members, userId]
					};
				}
			}
			return t;
		}) };
	}),
	approveRequest: (tribeId, userId) => set((state) => {
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
	}),
	declineRequest: (tribeId, userId) => set((state) => {
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
	})
}), { name: "goplay-nexus-storage" }));
export { useNexusStore as t };

//# sourceMappingURL=useNexusStore-Zf25O8JJ.js.map