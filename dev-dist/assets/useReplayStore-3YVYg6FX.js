import { Bt as create, wt as mockReplays } from "./index-YaFpIL4v.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-3YVYg6FX.js.map