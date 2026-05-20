import { Vt as create } from "./index-D6lOY_hF.js";
const useAlbumStore = create()((set) => ({
	collected: [],
	unopenedPacks: 1,
	addPack: () => set((state) => ({ unopenedPacks: state.unopenedPacks + 1 })),
	openPack: (newStickers) => set((state) => {
		const uniqueStickers = new Set([...state.collected, ...newStickers]);
		return {
			collected: Array.from(uniqueStickers),
			unopenedPacks: Math.max(0, state.unopenedPacks - 1)
		};
	})
}));
export { useAlbumStore as t };

//# sourceMappingURL=useAlbumStore-aOJBHwQg.js.map