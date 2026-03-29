import { Ct as mockReplays, zt as create } from "./index-tZPBJvE8.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-CFG6GTzS.js.map