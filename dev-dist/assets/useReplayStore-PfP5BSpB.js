import { Ct as mockReplays, zt as create } from "./index-Bsg1ViuR.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-PfP5BSpB.js.map