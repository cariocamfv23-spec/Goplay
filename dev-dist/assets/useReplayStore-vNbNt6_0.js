import { Bt as create, wt as mockReplays } from "./index-CGwwiF4x.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-vNbNt6_0.js.map