import { Ct as mockReplays, zt as create } from "./index-BHjQ8FPf.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-BVwj-LDI.js.map