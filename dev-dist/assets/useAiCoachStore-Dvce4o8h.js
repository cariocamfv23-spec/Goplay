import { Ht as create, Vt as persist } from "./index-Bo0UapdT.js";
const useAiCoachStore = create()(persist((set) => ({
	preferences: {
		feedbackType: "all",
		feedbackDetail: "detailed",
		feedbackFrequency: "realtime",
		enabledInArena: true,
		voiceEnabled: true,
		emotionDetectionEnabled: true
	},
	setPreference: (key, value) => set((state) => ({ preferences: {
		...state.preferences,
		[key]: value
	} })),
	resetPreferences: () => set({ preferences: {
		feedbackType: "all",
		feedbackDetail: "detailed",
		feedbackFrequency: "realtime",
		enabledInArena: true,
		voiceEnabled: true,
		emotionDetectionEnabled: true
	} })
}), { name: "goplay-ai-coach-storage" }));
export { useAiCoachStore as t };

//# sourceMappingURL=useAiCoachStore-Dvce4o8h.js.map