import { gt as mockReplays, jt as create } from "./index-Dl1oMQSI.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-fjSvGKPw.js.map