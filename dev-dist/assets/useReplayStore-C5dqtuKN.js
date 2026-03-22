import { Ft as create, bt as mockReplays } from "./index-CZGnW8jE.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-C5dqtuKN.js.map