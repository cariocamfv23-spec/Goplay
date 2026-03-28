import { Ct as mockReplays, zt as create } from "./index-D2WRTAIi.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-ob_7uUoJ.js.map