import { Kr as useNavigate, Yr as require_react, Zt as Button, _r as Briefcase, a as SportsWallpaper, dn as cn, gn as User, hr as Camera, mr as Car, vn as Trophy, zr as require_jsx_runtime } from "./index-C8TvyyZP.js";
import { n as CardContent, t as Card } from "./card-CNjV3712.js";
import "./dist-cVG77CgU.js";
import { t as Label } from "./label-J7OAKquS.js";
import { n as RadioGroupItem, t as RadioGroup } from "./radio-group-DqKQIFDo.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
var profileTypes = [
	{
		id: "athlete",
		icon: User,
		title: "Atleta",
		description: "Para jogadores amadores e profissionais",
		color: "text-blue-500",
		bg: "bg-blue-500/10"
	},
	{
		id: "club",
		icon: Trophy,
		title: "Clube/Time",
		description: "Para gestão de times e campeonatos",
		color: "text-gold",
		bg: "bg-gold/10"
	},
	{
		id: "scout",
		icon: Briefcase,
		title: "Profissional",
		description: "Olheiros, treinadores e agentes",
		color: "text-purple-500",
		bg: "bg-purple-500/10"
	},
	{
		id: "photographer",
		icon: Camera,
		title: "Fotógrafo",
		description: "Venda suas fotos esportivas",
		color: "text-pink-500",
		bg: "bg-pink-500/10"
	},
	{
		id: "driver",
		icon: Car,
		title: "Motorista",
		description: "Transporte para eventos esportivos",
		color: "text-green-500",
		bg: "bg-green-500/10"
	}
];
function ProfileSelection() {
	const navigate = useNavigate();
	const [selected, setSelected] = (0, import_react.useState)("athlete");
	const handleContinue = () => {
		navigate("/home");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex items-center justify-center p-4 relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SportsWallpaper, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 w-full max-w-2xl animate-in fade-in zoom-in duration-500",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-8 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold",
					children: "Escolha seu Perfil"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Como você quer usar o Goplay?"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-border/50 shadow-2xl bg-background/95 backdrop-blur-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
						value: selected,
						onValueChange: setSelected,
						className: "grid grid-cols-1 md:grid-cols-2 gap-4",
						children: profileTypes.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
							value: type.id,
							id: type.id,
							className: "peer sr-only"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							htmlFor: type.id,
							className: cn("flex items-start space-x-4 rounded-xl border-2 border-transparent p-4 hover:bg-secondary/50 cursor-pointer transition-all duration-200", selected === type.id ? "border-primary bg-secondary/30 ring-2 ring-primary/20" : "border-border/50"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("p-3 rounded-lg shrink-0", type.bg),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(type.icon, { className: cn("w-6 h-6", type.color) })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-base",
									children: type.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground font-normal",
									children: type.description
								})]
							})]
						})] }, type.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							className: "w-full md:w-auto md:min-w-[200px]",
							onClick: handleContinue,
							children: "Continuar"
						})
					})]
				})
			})]
		})]
	});
}
export { ProfileSelection as default };

//# sourceMappingURL=ProfileSelection-Bu4cK6VM.js.map