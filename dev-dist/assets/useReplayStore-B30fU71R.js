import { Ct as mockReplays, zt as create } from "./index-DSkLZQ3h.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-B30fU71R.js.map