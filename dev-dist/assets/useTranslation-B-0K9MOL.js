import { t as LoaderCircle } from "./loader-circle-CcuHAdp1.js";
import { Hr as require_jsx_runtime, Or as createLucideIcon, Qr as require_react, en as Button, i as useAchievementStore, pn as cn, r as useSoundStore_default } from "./index-DzO-_6nv.js";
var Languages = createLucideIcon("languages", [
	["path", {
		d: "m5 8 6 6",
		key: "1wu5hv"
	}],
	["path", {
		d: "m4 14 6-6 2-3",
		key: "1k1g8d"
	}],
	["path", {
		d: "M2 5h12",
		key: "or177f"
	}],
	["path", {
		d: "M7 2h1",
		key: "1t2jsx"
	}],
	["path", {
		d: "m22 22-5-10-5 10",
		key: "don7ne"
	}],
	["path", {
		d: "M14 18h6",
		key: "1m8k6r"
	}]
]);
var import_react = require_react();
function useLikeInteraction(post, initialLikes = 0, initialLiked = false) {
	const [isLiked, setIsLiked] = (0, import_react.useState)(initialLiked);
	const [likeCount, setLikeCount] = (0, import_react.useState)(initialLikes);
	const { playSound } = useSoundStore_default();
	const { trackAction } = useAchievementStore();
	const handleLike = () => {
		const newIsLiked = !isLiked;
		setIsLiked(newIsLiked);
		setLikeCount(newIsLiked ? likeCount + 1 : likeCount - 1);
		if (newIsLiked) {
			trackAction("like_post");
			let soundCategory = "like_generic";
			const content = (post.content || "").toLowerCase();
			const hashtags = (post.hashtags || []).map((h) => h.toLowerCase());
			const fullText = content + " " + hashtags.join(" ");
			if (fullText.includes("futebol") || fullText.includes("soccer") || fullText.includes("gol") || fullText.includes("chute")) soundCategory = "like_football";
			else if (fullText.includes("futsal") || fullText.includes("quadra") || fullText.includes("salao")) soundCategory = "like_futsal";
			else if (fullText.includes("basquete") || fullText.includes("basketball") || fullText.includes("basket") || fullText.includes("dunk") || fullText.includes("cesta")) soundCategory = "like_basketball";
			else if (fullText.includes("volei") || fullText.includes("volleyball") || fullText.includes("manchete") || fullText.includes("saque")) soundCategory = "like_volleyball";
			else if (fullText.includes("tennis") || fullText.includes("tenis") || fullText.includes("raquete")) soundCategory = "like_tennis";
			else if (fullText.includes("treino") || fullText.includes("gym") || fullText.includes("academia") || fullText.includes("workout") || fullText.includes("crossfit")) soundCategory = "like_workout";
			else if (fullText.includes("parceiro") || fullText.includes("partner") || fullText.includes("nutri") || fullText.includes("fisioterapeuta")) soundCategory = "like_partner";
			playSound(soundCategory);
		}
	};
	return {
		isLiked,
		likeCount,
		handleLike,
		setIsLiked,
		setLikeCount
	};
}
var import_jsx_runtime = require_jsx_runtime();
function TranslateButton({ isTranslated, isLoading, onClick, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "ghost",
		size: "sm",
		onClick,
		disabled: isLoading,
		className: cn("h-auto p-0 mt-1.5 text-xs font-semibold flex items-center gap-1.5 transition-colors active:scale-95", className),
		children: [isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "h-3 w-3" }), isLoading ? "Traduzindo..." : isTranslated ? "Ver original" : "Ver tradução"]
	});
}
var enWords = [
	"the",
	"is",
	"and",
	"to",
	"in",
	"of",
	"that",
	"it",
	"for",
	"on",
	"with",
	"great",
	"awesome",
	"game",
	"play",
	"match",
	"win",
	"yesterday",
	"hard",
	"work",
	"pays",
	"off",
	"unbelievable",
	"shot",
	"skills",
	"dunk",
	"contest",
	"winner",
	"jumped",
	"from",
	"free",
	"throw",
	"line",
	"zero",
	"gravity",
	"confirmed",
	"center",
	"court",
	"football",
	"soccer"
];
function detectLanguage(text) {
	if (!text) return "pt";
	if ((text.toLowerCase().match(/\b\w+\b/g) || []).filter((w) => enWords.includes(w)).length >= 2) return "en";
	return "pt";
}
function mockTranslateText(text) {
	if (!text) return text;
	let translated = text;
	translated = translated.replace(/Great win yesterday! Hard work pays off./gi, "Grande vitória de ontem! O trabalho duro compensa.");
	translated = translated.replace(/Amazing skills/gi, "Habilidades incríveis");
	translated = translated.replace(/Unbelievable shot/gi, "Chute inacreditável");
	translated = translated.replace(/Dunk Contest Winner/gi, "Vencedor do Torneio de Enterradas");
	translated = translated.replace(/Jumped from the free throw line! Zero gravity confirmed on center court./gi, "Saltou da linha de lance livre! Gravidade zero confirmada na quadra central.");
	if (translated === text) translated = `(Traduzido) ${text}`;
	return translated;
}
function useTranslation(texts) {
	const [isTranslated, setIsTranslated] = (0, import_react.useState)(false);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [translatedTexts, setTranslatedTexts] = (0, import_react.useState)([]);
	const [language, setLanguage] = (0, import_react.useState)("pt");
	const textsJoined = texts.join(" ");
	(0, import_react.useEffect)(() => {
		setLanguage(detectLanguage(textsJoined));
		setIsTranslated(false);
		setTranslatedTexts([]);
	}, [textsJoined]);
	const toggleTranslation = async (e) => {
		e?.stopPropagation();
		e?.preventDefault();
		if (isTranslated) setIsTranslated(false);
		else {
			if (translatedTexts.length === 0) {
				setIsLoading(true);
				await new Promise((res) => setTimeout(res, 600));
				setTranslatedTexts(texts.map(mockTranslateText));
				setIsLoading(false);
			}
			setIsTranslated(true);
		}
	};
	return {
		language,
		isTranslated,
		isLoading,
		toggleTranslation,
		translatedTexts
	};
}
export { TranslateButton as n, useLikeInteraction as r, useTranslation as t };

//# sourceMappingURL=useTranslation-B-0K9MOL.js.map