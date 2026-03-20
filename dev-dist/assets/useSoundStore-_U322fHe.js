import { At as create, kt as persist, sn as toast } from "./index-BF9ltOpP.js";
var useSoundStore_default = create()(persist((set, get) => ({
	masterEnabled: true,
	volume: .8,
	silentInMatches: false,
	activePack: "varzea",
	isPlayingNarration: false,
	setMasterEnabled: (enabled) => set({ masterEnabled: enabled }),
	setVolume: (volume) => set({ volume }),
	setSilentInMatches: (enabled) => set({ silentInMatches: enabled }),
	setActivePack: (pack) => set({ activePack: pack }),
	playSound: (category, context) => {
		const { masterEnabled, volume } = get();
		if (!masterEnabled) return;
		if ("speechSynthesis" in window) {
			const synth = window.speechSynthesis;
			let textToSpeak = "";
			let pitch = 1;
			let rate = 1.2;
			switch (category) {
				case "like_football": {
					const footballSounds = [
						"Que isso hein?!",
						"Pega essa maçã!",
						"Humildade passa longe!"
					];
					textToSpeak = footballSounds[Math.floor(Math.random() * footballSounds.length)];
					pitch = .8;
					break;
				}
				case "like_basketball":
					textToSpeak = "Splash!";
					rate = 1.5;
					break;
				case "like_volleyball":
					textToSpeak = "Bateu bonito!";
					break;
				case "like_futsal":
					textToSpeak = "Só tapa!";
					rate = 1.3;
					break;
				case "like_tennis":
					textToSpeak = "Na linha!";
					break;
				case "like_workout":
					textToSpeak = "Brabo demais!";
					pitch = .5;
					break;
				case "like_partner":
					textToSpeak = "Parceiro!";
					pitch = 1.2;
					break;
				case "notification_invite":
					textToSpeak = "Convocado!";
					break;
				case "notification_checkin":
					textToSpeak = "Check-in aprovado!";
					break;
				case "notification_uber": {
					const uberSounds = ["Hoje é só chegar!", "Uber do brabo tá pago!"];
					textToSpeak = uberSounds[Math.floor(Math.random() * uberSounds.length)];
					break;
				}
				case "notification_points":
					textToSpeak = "Goplay!";
					pitch = 1.5;
					rate = 2;
					break;
				case "notification_store":
					textToSpeak = "Conquista desbloqueada!";
					break;
				default: break;
			}
			if (textToSpeak) {
				synth.cancel();
				const utterance = new SpeechSynthesisUtterance(textToSpeak);
				utterance.volume = volume;
				utterance.rate = rate;
				utterance.pitch = pitch;
				const ptVoice = synth.getVoices().find((v) => v.lang.includes("pt"));
				if (ptVoice) utterance.voice = ptVoice;
				synth.speak(utterance);
			}
		}
	},
	playNarration: (config) => {
		const { masterEnabled } = get();
		if (!masterEnabled) return;
		if ("speechSynthesis" in window) {
			const synth = window.speechSynthesis;
			synth.cancel();
			const utterance = new SpeechSynthesisUtterance(config.text);
			utterance.volume = config.volume;
			switch (config.style) {
				case "varzea":
					utterance.pitch = .8;
					utterance.rate = 1.4;
					break;
				case "professional":
					utterance.pitch = 1.2;
					utterance.rate = 1.1;
					break;
				case "comedy":
					utterance.pitch = 1.5;
					utterance.rate = 1.6;
					break;
				case "futuristic":
					utterance.pitch = .6;
					utterance.rate = .9;
					break;
				case "influencer":
					utterance.pitch = 1.3;
					utterance.rate = 1.3;
					break;
				case "tactical":
					utterance.pitch = .9;
					utterance.rate = .9;
					break;
				case "emotion":
					utterance.pitch = 1.1;
					utterance.rate = 1;
					break;
				case "gringo":
					utterance.pitch = 1;
					utterance.rate = 1;
					utterance.lang = "en-US";
					break;
			}
			const voices = synth.getVoices();
			let targetVoice = voices.find((v) => v.lang.includes("pt"));
			if (config.style === "gringo") {
				const enVoice = voices.find((v) => v.lang.includes("en"));
				if (enVoice) targetVoice = enVoice;
			}
			if (targetVoice) utterance.voice = targetVoice;
			utterance.onstart = () => set({ isPlayingNarration: true });
			utterance.onend = () => set({ isPlayingNarration: false });
			utterance.onerror = () => set({ isPlayingNarration: false });
			synth.speak(utterance);
		} else toast.error("Navegador sem suporte a áudio.");
	}
}), { name: "goplay-sound-storage" }));
export { useSoundStore_default as t };

//# sourceMappingURL=useSoundStore-_U322fHe.js.map