import { At as create, kt as persist } from "./index-CrJ_L4xh.js";
const usePrivacyStore = create()(persist((set, get) => ({
	isInvisibleMode: false,
	isPremium: false,
	toggleInvisibleMode: (enabled) => {
		if (get().isPremium) set({ isInvisibleMode: enabled });
	},
	upgradeToPremium: () => set({ isPremium: true })
}), { name: "goplay-privacy-storage" }));
export { usePrivacyStore as t };

//# sourceMappingURL=usePrivacyStore-C_hdQzwV.js.map