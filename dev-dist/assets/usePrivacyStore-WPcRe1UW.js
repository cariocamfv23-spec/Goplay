import { At as create, kt as persist } from "./index--2BEb12j.js";
const usePrivacyStore = create()(persist((set, get) => ({
	isInvisibleMode: false,
	isPremium: false,
	toggleInvisibleMode: (enabled) => {
		if (get().isPremium) set({ isInvisibleMode: enabled });
	},
	upgradeToPremium: () => set({ isPremium: true })
}), { name: "goplay-privacy-storage" }));
export { usePrivacyStore as t };

//# sourceMappingURL=usePrivacyStore-WPcRe1UW.js.map