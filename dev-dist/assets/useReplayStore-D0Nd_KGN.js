import { gt as mockReplays, jt as create } from "./index-GF_UKfZV.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-D0Nd_KGN.js.map