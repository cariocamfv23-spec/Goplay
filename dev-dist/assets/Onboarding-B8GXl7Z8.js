import { Dn as Trophy, Fn as Star, Jr as require_jsx_runtime, a as SportsWallpaper, bn as Zap, ii as require_react, in as Button, kr as ArrowRight, ti as useNavigate, wn as Users, yn as cn } from "./index-Dri2BohY.js";
import { n as CardContent, t as Card } from "./card-DHTrV-FU.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
var steps = [
	{
		icon: Trophy,
		title: "Compita e Ganhe",
		description: "Participe de campeonatos, suba no ranking e ganhe prêmios exclusivos.",
		color: "text-gold"
	},
	{
		icon: Users,
		title: "Conecte-se",
		description: "Encontre atletas, times e oportunidades perto de você.",
		color: "text-primary"
	},
	{
		icon: Star,
		title: "Seja Descoberto",
		description: "Mostre seu talento para olheiros e patrocinadores de todo o mundo.",
		color: "text-emerald-500"
	},
	{
		icon: Zap,
		title: "Evolua seu Jogo",
		description: "Acesse treinos, dicas e ferramentas profissionais para melhorar sua performance.",
		color: "text-orange-500"
	}
];
function Onboarding() {
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = (0, import_react.useState)(0);
	const handleNext = () => {
		if (currentStep < steps.length - 1) setCurrentStep((curr) => curr + 1);
		else navigate("/profile-selection");
	};
	const handleSkip = () => {
		navigate("/profile-selection");
	};
	const StepIcon = steps[currentStep].icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex items-center justify-center p-4 relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SportsWallpaper, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative z-10 w-full max-w-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-border/50 shadow-2xl bg-background/95 backdrop-blur-xl overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-8 flex flex-col items-center text-center space-y-8 min-h-[500px] justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: handleSkip,
								className: "text-muted-foreground hover:text-foreground",
								children: "Pular"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 flex flex-col items-center justify-center space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 key={currentStep}",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("w-32 h-32 rounded-full bg-secondary/50 flex items-center justify-center relative", "before:absolute before:inset-0 before:bg-gradient-to-tr before:from-transparent before:to-white/20 before:rounded-full"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepIcon, { className: cn("w-16 h-16 drop-shadow-lg", steps[currentStep].color) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 border-4 border-background/50 rounded-full animate-pulse opacity-50" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-3xl font-bold tracking-tight",
									children: steps[currentStep].title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground text-lg leading-relaxed",
									children: steps[currentStep].description
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full space-y-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-center gap-2",
								children: steps.map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-2 rounded-full transition-all duration-300", index === currentStep ? "w-8 bg-primary" : "w-2 bg-secondary") }, index))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "lg",
								className: "w-full h-12 text-base",
								onClick: handleNext,
								children: [currentStep === steps.length - 1 ? "Começar Agora" : "Próximo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-5 w-5" })]
							})]
						})
					]
				})
			})
		})]
	});
}
export { Onboarding as default };

//# sourceMappingURL=Onboarding-B8GXl7Z8.js.map