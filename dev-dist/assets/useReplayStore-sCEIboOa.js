import { Ct as mockReplays, zt as create } from "./index-CJ2Qsi3b.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-sCEIboOa.js.map