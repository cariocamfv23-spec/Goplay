import { Bt as create, wt as mockReplays } from "./index-CJsG0f1F.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-CSdjQ9M6.js.map