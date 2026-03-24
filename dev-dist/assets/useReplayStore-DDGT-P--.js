import { wt as mockReplays, zt as create } from "./index-Ffqs5NK1.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-DDGT-P--.js.map