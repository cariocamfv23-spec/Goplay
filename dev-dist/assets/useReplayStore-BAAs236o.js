import { Ct as mockReplays, zt as create } from "./index-Bi9K5oVm.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-BAAs236o.js.map