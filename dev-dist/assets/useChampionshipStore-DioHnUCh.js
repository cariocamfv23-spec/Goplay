import { Rt as persist, vn as toast, zt as create } from "./index-DSkLZQ3h.js";
const useChampionshipStore = create()(persist((set) => ({
	championships: [{
		id: "camp1",
		name: "Copa Goplay de Verão",
		description: "Torneio de Futebol Society para times amadores da região.",
		modality: "Futebol Society",
		status: "open",
		location: "Arena XP",
		startDate: "2025-01-10",
		rules: "Jogos de 2 tempos de 20 minutos. Eliminação simples."
	}],
	participants: [
		{
			id: "p1",
			championshipId: "camp1",
			name: "Red Wolves FC",
			status: "approved",
			contact: "Carlos (11) 99999-9999"
		},
		{
			id: "p2",
			championshipId: "camp1",
			name: "Blue Sharks",
			status: "approved"
		},
		{
			id: "p3",
			championshipId: "camp1",
			name: "Os Boleiros",
			status: "pending"
		}
	],
	matches: [{
		id: "m1",
		championshipId: "camp1",
		round: "Quartas de Final",
		teamA: "Red Wolves FC",
		teamB: "Blue Sharks",
		date: "2025-01-15",
		time: "20:00",
		location: "Arena XP - Quadra 1",
		status: "scheduled"
	}],
	addChampionship: (data) => {
		set((state) => ({ championships: [...state.championships, {
			...data,
			id: `c-${Date.now()}`,
			status: "draft"
		}] }));
		toast.success("Campeonato criado com sucesso!");
	},
	updateChampionship: (id, data) => {
		set((state) => ({ championships: state.championships.map((c) => c.id === id ? {
			...c,
			...data
		} : c) }));
		toast.success("Campeonato atualizado.");
	},
	deleteChampionship: (id) => {
		set((state) => ({ championships: state.championships.filter((c) => c.id !== id) }));
		toast.success("Campeonato excluído.");
	},
	addParticipant: (data) => {
		set((state) => ({ participants: [...state.participants, {
			...data,
			id: `p-${Date.now()}`,
			status: "pending"
		}] }));
		toast.success("Participante registrado!");
	},
	updateParticipantStatus: (id, status) => {
		set((state) => ({ participants: state.participants.map((p) => p.id === id ? {
			...p,
			status
		} : p) }));
		toast.success(`Status atualizado para ${status}`);
	},
	removeParticipant: (id) => {
		set((state) => ({ participants: state.participants.filter((p) => p.id !== id) }));
		toast.success("Participante removido.");
	},
	addMatch: (data) => {
		set((state) => ({ matches: [...state.matches, {
			...data,
			id: `m-${Date.now()}`,
			status: "scheduled"
		}] }));
		toast.success("Partida agendada.");
	},
	updateMatch: (id, data) => {
		set((state) => ({ matches: state.matches.map((m) => m.id === id ? {
			...m,
			...data
		} : m) }));
		toast.success("Partida atualizada.");
	},
	deleteMatch: (id) => {
		set((state) => ({ matches: state.matches.filter((m) => m.id !== id) }));
		toast.success("Partida removida.");
	}
}), { name: "goplay-championship-store" }));
export { useChampionshipStore as t };

//# sourceMappingURL=useChampionshipStore-DioHnUCh.js.map