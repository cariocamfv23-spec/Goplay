import { Rt as persist, zt as create } from "./index-CL_NvdBb.js";
var initialContracts = [{
	id: "c1",
	title: "Patrocínio Master 2024",
	proposerName: "Red Bull",
	proposerLogo: "https://img.usecurling.com/i?q=red%20bull%20logo&color=red",
	athleteName: "Alex Silva",
	baseValue: 1500,
	currency: "R$",
	status: "active",
	startDate: "2024-01-01",
	endDate: "2024-12-31",
	metrics: [
		{
			id: "m1",
			label: "Gols na Temporada",
			currentValue: 12,
			targetValue: 20,
			unit: "gols",
			impactValue: 500,
			type: "linear"
		},
		{
			id: "m2",
			label: "Posts no Instagram",
			currentValue: 5,
			targetValue: 10,
			unit: "posts",
			impactValue: 300,
			type: "milestone"
		},
		{
			id: "m3",
			label: "Partidas Jogadas",
			currentValue: 15,
			targetValue: 30,
			unit: "jogos",
			impactValue: 200,
			type: "linear"
		}
	],
	createdAt: (/* @__PURE__ */ new Date()).toISOString()
}, {
	id: "c2",
	title: "Embaixador da Marca",
	proposerName: "Nike",
	proposerLogo: "https://img.usecurling.com/i?q=nike%20logo&color=black",
	athleteName: "Alex Silva",
	baseValue: 2e3,
	currency: "R$",
	status: "pending",
	startDate: "2024-06-01",
	endDate: "2025-06-01",
	metrics: [{
		id: "m1",
		label: "Seguidores Novos",
		currentValue: 0,
		targetValue: 5e3,
		unit: "followers",
		impactValue: 1e3,
		type: "linear"
	}],
	createdAt: (/* @__PURE__ */ new Date()).toISOString()
}];
const useContractStore = create()(persist((set, get) => ({
	contracts: initialContracts,
	addContract: (contractData) => set((state) => ({ contracts: [{
		...contractData,
		id: `lc-${Date.now()}`,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	}, ...state.contracts] })),
	updateContractStatus: (id, status) => set((state) => ({ contracts: state.contracts.map((c) => c.id === id ? {
		...c,
		status
	} : c) })),
	updateMetricProgress: (contractId, metricId, value) => set((state) => ({ contracts: state.contracts.map((c) => {
		if (c.id !== contractId) return c;
		return {
			...c,
			metrics: c.metrics.map((m) => m.id === metricId ? {
				...m,
				currentValue: value
			} : m)
		};
	}) })),
	getContractValue: (contract) => {
		let total = contract.baseValue;
		contract.metrics.forEach((m) => {
			if (m.type === "milestone") {
				if (m.currentValue >= m.targetValue) total += m.impactValue;
			} else if (m.type === "linear") {
				const progress = Math.min(1, m.currentValue / m.targetValue);
				total += m.impactValue * progress;
			}
		});
		return Math.floor(total);
	}
}), { name: "goplay-live-contracts" }));
export { useContractStore as t };

//# sourceMappingURL=useContractStore-BUvYM40v.js.map