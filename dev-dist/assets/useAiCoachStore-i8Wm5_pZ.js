import { Rt as persist, zt as create } from "./index-gQQ3RAfA.js";
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

//# sourceMappingURL=useAiCoachStore-i8Wm5_pZ.js.map