import { Ct as mockReplays, zt as create } from "./index-DbWDAVNz.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-CF8JaG_r.js.map