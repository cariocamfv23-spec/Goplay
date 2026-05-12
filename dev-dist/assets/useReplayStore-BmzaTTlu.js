import { Bt as create, wt as mockReplays } from "./index-BsvDdUYC.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-BmzaTTlu.js.map