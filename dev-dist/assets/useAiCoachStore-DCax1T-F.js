import { Lt as persist, Rt as create } from "./index-1EG7Tklo.js";
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

//# sourceMappingURL=useAiCoachStore-DCax1T-F.js.map