import { Tt as mockReplays, Vt as create } from "./index-BOE_rkya.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-D5ViFb9C.js.map