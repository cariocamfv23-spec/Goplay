import { Pt as create, yt as mockReplays } from "./index-DzO-_6nv.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-DzJ8NHYQ.js.map