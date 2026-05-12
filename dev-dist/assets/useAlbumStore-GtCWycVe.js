import { Bt as create, zt as persist } from "./index-BsvDdUYC.js";
const useAlbumStore = create()(persist((set) => ({
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
}), { name: "goplay-album-storage" }));
export { useAlbumStore as t };

//# sourceMappingURL=useAlbumStore-GtCWycVe.js.map