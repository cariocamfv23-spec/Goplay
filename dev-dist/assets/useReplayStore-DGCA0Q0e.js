import { Et as mockReplays, Ht as create } from "./index-BHonH2MR.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-DGCA0Q0e.js.map