import { Pt as create, yt as mockReplays } from "./index-GT0xtY_b.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-C4eHbyjz.js.map