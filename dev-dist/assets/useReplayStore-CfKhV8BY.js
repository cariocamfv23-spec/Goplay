import { Ct as mockReplays, zt as create } from "./index-BOr7Ztun.js";
const useReplayStore = create((set) => ({
	replays: mockReplays,
	addReplay: (replay) => set((state) => ({ replays: [replay, ...state.replays] }))
}));
export { useReplayStore as t };

//# sourceMappingURL=useReplayStore-CfKhV8BY.js.map