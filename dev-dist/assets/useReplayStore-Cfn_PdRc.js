import { Ct as mockReplays, zt as create } from "./index-9FdtLN8r.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-Cfn_PdRc.js.map