import { At as create, kt as persist } from "./index-YiRCBu0v.js";
const usePrivacyStore = create()(persist((set, get) => ({
	isInvisibleMode: false,
	isPremium: false,
	toggleInvisibleMode: (enabled) => {
		if (get().isPremium) set({ isInvisibleMode: enabled });
	},
	upgradeToPremium: () => set({ isPremium: true })
}), { name: "goplay-privacy-storage" }));
export { usePrivacyStore as t };

//# sourceMappingURL=usePrivacyStore-NYG5L6_p.js.map