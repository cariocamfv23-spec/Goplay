import { At as create, G as mockCurrentUser, j as useNotificationStore_default, kt as persist } from "./index-CfexWzlo.js";
var mockCapsules = [
	{
		id: "tc1",
		userId: "u1",
		title: "Ser titular no campeonato",
		description: "Promessa de me dedicar aos treinos físicos e táticos.",
		type: "text",
		content: "Vou focar na minha resistência e velocidade. Não vou desistir de ser titular.",
		createdAt: (/* @__PURE__ */ new Date(Date.now() - 365 * 864e5)).toISOString(),
		openAt: (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString(),
		status: "released",
		statsAtCreation: {
			points: 500,
			rating: 3.8,
			level: 5
		}
	},
	{
		id: "tc2",
		userId: "u1",
		title: "Bolsa internacional",
		description: "Jogar fora do país em 2 anos.",
		type: "video",
		content: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		openAt: new Date(Date.now() + 2 * 365 * 864e5).toISOString(),
		status: "sealed",
		statsAtCreation: {
			points: 1250,
			rating: 4.8,
			level: 15
		}
	},
	{
		id: "tc3",
		userId: "u1",
		title: "Conquistar o MVP",
		description: "Ser o melhor jogador da liga regional.",
		type: "text",
		content: "Treinar finalização todos os dias depois do treino principal.",
		createdAt: (/* @__PURE__ */ new Date(Date.now() - 170 * 864e5)).toISOString(),
		openAt: new Date(Date.now() + 5 * 864e5).toISOString(),
		status: "waiting",
		statsAtCreation: {
			points: 800,
			rating: 4,
			level: 8
		}
	}
];
const useTimeCapsuleStore = create()(persist((set) => ({
	capsules: mockCapsules,
	addCapsule: (data) => set((state) => {
		return { capsules: [{
			...data,
			id: Math.random().toString(36).substr(2, 9),
			userId: mockCurrentUser.id,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			status: "sealed",
			statsAtCreation: {
				points: mockCurrentUser.points || 0,
				rating: mockCurrentUser.stats?.rating || 4.8,
				level: mockCurrentUser.level || 1
			}
		}, ...state.capsules] };
	}),
	archiveCapsule: (id) => set((state) => ({ capsules: state.capsules.map((c) => c.id === id ? {
		...c,
		status: "archived"
	} : c) })),
	checkReleases: () => set((state) => {
		const now = Date.now();
		let updated = false;
		const newCapsules = state.capsules.map((c) => {
			if (c.status === "archived" || c.status === "released") return c;
			const openTime = new Date(c.openAt).getTime();
			if (openTime <= now) {
				updated = true;
				useNotificationStore_default.getState().addNotification({
					title: "Time Capsule Liberada!",
					message: "Sua Time Capsule foi aberta. Veja sua promessa do passado.",
					type: "system",
					priority: "high",
					link: `/timecapsule/${c.id}`
				});
				return {
					...c,
					status: "released"
				};
			} else if (openTime > now && openTime - now <= 7 * 864e5 && c.status === "sealed") {
				updated = true;
				return {
					...c,
					status: "waiting"
				};
			}
			return c;
		});
		return updated ? { capsules: newCapsules } : state;
	})
}), { name: "goplay-timecapsule" }));
export { useTimeCapsuleStore as t };

//# sourceMappingURL=useTimeCapsuleStore-BRsgmWHb.js.map