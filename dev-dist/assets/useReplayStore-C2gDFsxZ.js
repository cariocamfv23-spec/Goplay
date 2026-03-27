import { Et as mockReplays, Ht as create } from "./index-DW2Yio1z.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-C2gDFsxZ.js.map