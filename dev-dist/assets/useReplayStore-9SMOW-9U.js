import { Ct as mockReplays, zt as create } from "./index-gQQ3RAfA.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-9SMOW-9U.js.map