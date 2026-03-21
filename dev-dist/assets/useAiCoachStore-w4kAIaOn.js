import { Mt as persist, Nt as create } from "./index-E9b2kZbq.js";
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

//# sourceMappingURL=useAiCoachStore-w4kAIaOn.js.map