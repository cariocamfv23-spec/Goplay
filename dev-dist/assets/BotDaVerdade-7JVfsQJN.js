import { t as Bot } from "./bot-sTDx6ZUi.js";
import "./download-aUZuF6iq.js";
import "./file-text-DI076scs.js";
import "./image-AawRVg8Y.js";
import "./mic-BOV6B8vm.js";
import "./paperclip-C8KSKfnL.js";
import "./play-CgaV2ylf.js";
import "./send-CsWGJJWn.js";
import { t as Trash2 } from "./trash-2-f00c-PSs.js";
import "./triangle-alert-JgshJTzv.js";
import "./video-D9GplZVD.js";
import { $r as require_react, Er as ArrowLeft, Ft as persist, It as create, Ur as require_jsx_runtime, Xr as useNavigate, Z as mockCurrentUser, _n as Zap, nn as Button, z as ScrollArea } from "./index-gMWuR-H4.js";
import "./card-Do2Y5ADa.js";
import "./progress-BTqrUp1m.js";
import { n as ChatBubble, t as ChatInput } from "./ChatInput-BetehbTb.js";
import "./input-S_2xVAcb.js";
import "./drawer-wkwWq0y9.js";
const useBotDaVerdadeStore = create()(persist((set, get) => ({
	messages: [{
		id: "welcome",
		sender: "bot",
		text: "Sou o Bot da Verdade. Não estou aqui para te elogiar, estou aqui para te evoluir. Quer saber a realidade sobre o seu desempenho?",
		time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit"
		}),
		type: "text",
		isMe: false
	}],
	isTyping: false,
	sendMessage: (text) => {
		const newMessage = {
			id: Date.now().toString(),
			sender: "me",
			text,
			time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			}),
			type: "text",
			isMe: true
		};
		set((state) => ({ messages: [...state.messages, newMessage] }));
		set({ isTyping: true });
		setTimeout(() => {
			const lowerText = text.toLowerCase();
			let responseText = "";
			let responseType = "text";
			let evaluationData;
			if (lowerText.includes("avaliar") || lowerText.includes("avaliação") || lowerText.includes("verdade") || lowerText.includes("desempenho") || lowerText.includes("stats")) {
				responseText = "Analisando seus dados brutos... Esqueça os elogios dos amigos. Aqui estão os fatos.";
				responseType = "evaluation";
				const stats = mockCurrentUser.stats;
				const winRate = stats.matches > 0 ? Math.round(stats.wins / stats.matches * 100) : 0;
				const score = Math.min(100, Math.round((winRate + stats.mvp * 5) / 1.5));
				let verdict = "Mediano";
				let realityCheck = "Você joga bem, mas não é decisivo. Seus números mostram consistência, mas falta brilho.";
				if (score > 80) {
					verdict = "Promessa Real";
					realityCheck = "Seus números são de elite, mas cuidado com a soberba. O nível profissional exige mais do que vitórias na várzea.";
				} else if (score < 50) {
					verdict = "Amador Iniciante";
					realityCheck = "Sendo brutalmente honesto: seus fundamentos precisam de muito trabalho. Você está perdendo mais do que ganhando.";
				}
				evaluationData = {
					score,
					verdict,
					strengths: [
						`Taxa de Vitória: ${winRate}%`,
						`${stats.mvp} MVPs conquistados`,
						"Consistência física (baseado no histórico)"
					],
					weaknesses: [
						"Pouca participação defensiva (estimado)",
						"Média de gols abaixo do esperado para a posição",
						"Falta experiência em jogos de alta pressão"
					],
					realityCheck
				};
			} else if (lowerText.includes("melhorar") || lowerText.includes("dica")) responseText = "Para melhorar, pare de treinar o que você já sabe. Seus dados indicam falhas na resistência. Foque em treinos intervalados de alta intensidade (HIIT) por 3 semanas e volte aqui.";
			else responseText = "Não entendi. Seja direto. Quer uma \"avaliação\" ou saber como \"melhorar\"?";
			const botMessage = {
				id: (Date.now() + 1).toString(),
				sender: "bot",
				text: responseText,
				time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit"
				}),
				type: responseType,
				isMe: false,
				evaluationData
			};
			set((state) => ({
				messages: [...state.messages, botMessage],
				isTyping: false
			}));
		}, 1500);
	},
	clearHistory: () => set({ messages: [{
		id: "welcome",
		sender: "bot",
		text: "Memória apagada. Mas seus stats continuam os mesmos. O que deseja?",
		time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit"
		}),
		type: "text",
		isMe: false
	}] }),
	generateEvaluation: () => {
		get().sendMessage("Quero uma avaliação completa da minha performance.");
	}
}), { name: "goplay-bot-verdade-storage" }));
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function BotDaVerdade() {
	const navigate = useNavigate();
	const { messages, isTyping, sendMessage, clearHistory, generateEvaluation } = useBotDaVerdadeStore();
	const scrollRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "smooth" });
	}, [messages, isTyping]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-zinc-950 flex flex-col relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 pointer-events-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-red-900/10 rounded-full blur-[120px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[120px]" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 bg-zinc-900/50 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => navigate(-1),
						className: "text-zinc-400 hover:text-white hover:bg-white/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-10 w-10 bg-red-600/20 rounded-xl flex items-center justify-center border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-6 w-6 text-red-500" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-sm font-bold text-white tracking-wide",
							children: "BOT DA VERDADE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[10px] text-red-400 font-medium uppercase tracking-wider flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3 w-3" }), " Análise Sem Filtro"]
						})] })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: clearHistory,
					className: "text-zinc-500 hover:text-red-400 hover:bg-red-500/10",
					title: "Limpar Histórico",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				className: "flex-1 p-4 relative z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl mx-auto flex flex-col gap-2",
					children: [
						messages.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatBubble, { message: msg }, msg.id)),
						isTyping && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-zinc-500 text-xs animate-pulse ml-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Analisando dados..." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: scrollRef })
					]
				})
			}),
			messages.length <= 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 pb-2 z-10 max-w-3xl mx-auto w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					className: "w-full bg-red-950/20 border-red-900/30 text-red-200 hover:bg-red-900/40 hover:text-white transition-all",
					onClick: generateEvaluation,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "mr-2 h-4 w-4 text-red-500" }), "Gerar Avaliação Completa"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatInput, { onSendMessage: (msg) => {
					if (msg.text) sendMessage(msg.text);
				} })
			})
		]
	});
}
export { BotDaVerdade as default };

//# sourceMappingURL=BotDaVerdade-7JVfsQJN.js.map