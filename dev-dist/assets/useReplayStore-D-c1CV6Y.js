import { Ct as mockReplays, zt as create } from "./index-KrmgwaCy.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-D-c1CV6Y.js.map