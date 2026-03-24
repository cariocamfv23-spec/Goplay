import { Ct as mockReplays, Rt as create } from "./index-1EG7Tklo.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-mrtiP0cn.js.map