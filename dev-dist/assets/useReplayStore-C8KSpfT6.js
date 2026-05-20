import { Tt as mockReplays, Vt as create } from "./index-D6lOY_hF.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-C8KSpfT6.js.map