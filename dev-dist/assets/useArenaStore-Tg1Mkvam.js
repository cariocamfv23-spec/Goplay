import { J as mockCurrentUser, Nt as persist, Pt as create, Z as mockFeedUsers } from "./index-DLpyukkZ.js";
var mockChallenges = [{
	id: "ac1",
	creatorId: "u1",
	modality: "Futebol",
	type: "Precisão",
	title: "Desafio do Travessão Pro",
	description: "Acerte o travessão de fora da área 3 vezes seguidas. A IA avaliará a distância e velocidade da bola.",
	rules: "Vídeo sem cortes, distância mínima de 16m.",
	criteria: "Precisão 50%, Força 30%, Estilo 20%",
	startDate: (/* @__PURE__ */ new Date()).toISOString(),
	endDate: new Date(Date.now() + 864e5 * 5).toISOString(),
	audience: "Público geral",
	videoRequired: true,
	moveDataAllowed: false,
	status: "active",
	banner: "https://img.usecurling.com/p/800/400?q=soccer%20goal%20crossbar&color=gold"
}, {
	id: "ac2",
	creatorId: "u2",
	modality: "Corrida",
	type: "Velocidade",
	title: "Tiro de 100 Metros",
	description: "Quem é o mais rápido no tiro curto? Prove sua explosão e sincronize com o MOVE.",
	rules: "Correr 100m, gravação em pista livre.",
	criteria: "Tempo Oficial 80%, Aceleração Inicial 20%",
	startDate: (/* @__PURE__ */ new Date(Date.now() - 864e5 * 10)).toISOString(),
	endDate: (/* @__PURE__ */ new Date(Date.now() - 864e5 * 2)).toISOString(),
	audience: "Público geral",
	videoRequired: false,
	moveDataAllowed: true,
	status: "ended",
	banner: "https://img.usecurling.com/p/800/400?q=running%20track&color=orange"
}];
var mockParticipations = [
	{
		id: "p1",
		challengeId: "ac1",
		athleteId: mockFeedUsers[0].id,
		videoUrl: "https://video.mp4",
		aiScore: 85,
		communityScore: 90,
		proScore: 88,
		finalScore: 87.5,
		status: "evaluated",
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		athlete: mockFeedUsers[0]
	},
	{
		id: "p2",
		challengeId: "ac1",
		athleteId: mockFeedUsers[1].id,
		videoUrl: "https://video.mp4",
		aiScore: 95,
		communityScore: 85,
		proScore: 92,
		finalScore: 91.5,
		status: "evaluated",
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		athlete: mockFeedUsers[1]
	},
	{
		id: "p3",
		challengeId: "ac1",
		athleteId: mockFeedUsers[2].id,
		videoUrl: "https://video.mp4",
		aiScore: 75,
		communityScore: 80,
		proScore: 78,
		finalScore: 77.5,
		status: "evaluated",
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		athlete: mockFeedUsers[2]
	}
];
const useArenaStore = create()(persist((set) => ({
	challenges: mockChallenges,
	participations: mockParticipations,
	addChallenge: (data) => set((state) => ({ challenges: [{
		...data,
		id: Math.random().toString(36).substr(2, 9),
		creatorId: mockCurrentUser.id,
		status: "active",
		banner: "https://img.usecurling.com/p/800/400?q=stadium%20arena&color=purple"
	}, ...state.challenges] })),
	addParticipation: (data) => set((state) => ({ participations: [{
		id: Math.random().toString(36).substr(2, 9),
		athleteId: mockCurrentUser.id,
		status: "submitted",
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		athlete: mockCurrentUser,
		...data
	}, ...state.participations] }))
}), { name: "goplay-arena-storage" }));
export { useArenaStore as t };

//# sourceMappingURL=useArenaStore-Tg1Mkvam.js.map