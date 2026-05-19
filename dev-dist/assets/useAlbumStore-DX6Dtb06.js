import { Bt as create } from "./index-CQOQT9V-.js";
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

//# sourceMappingURL=useAlbumStore-DX6Dtb06.js.map