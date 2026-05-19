import { Tt as mockReplays, Vt as create } from "./index-BWGMbNJK.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-BaWuLjnN.js.map