import { t as Ellipsis } from "./ellipsis-CALG_uL4.js";
import { t as Mail } from "./mail-BQqlNbQl.js";
import { Hr as createLucideIcon, Zn as MessageCircle, i as DialogDescription, kr as Check, mi as require_react, o as DialogHeader, oi as useToast, r as DialogContent, ri as require_jsx_runtime, s as DialogTitle, sn as Button, t as Dialog } from "./index-BOE_rkya.js";
var Facebook = createLucideIcon("facebook", [["path", {
	d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
	key: "1jg4f8"
}]]);
var Instagram = createLucideIcon("instagram", [
	["rect", {
		width: "20",
		height: "20",
		x: "2",
		y: "2",
		rx: "5",
		ry: "5",
		key: "2e1cvw"
	}],
	["path", {
		d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",
		key: "9exkf1"
	}],
	["line", {
		x1: "17.5",
		x2: "17.51",
		y1: "6.5",
		y2: "6.5",
		key: "r4j83e"
	}]
]);
var Link = createLucideIcon("link", [["path", {
	d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
	key: "1cjeqo"
}], ["path", {
	d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
	key: "19qd67"
}]]);
var Twitter = createLucideIcon("twitter", [["path", {
	d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
	key: "pff0z6"
}]]);
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function ShareDialog({ open, onOpenChange, title = "Compartilhar", description, url = window.location.href, preview, onShareAction }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const { toast } = useToast();
	const handleCopy = () => {
		navigator.clipboard.writeText(url);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
		toast({
			title: "Link copiado!",
			description: "O link de convite foi copiado para a área de transferência."
		});
	};
	const handleShare = async (platform) => {
		let shared = false;
		const fullText = description ? `${description} ${url}` : url;
		try {
			if (platform === "WhatsApp") {
				window.open(`https://wa.me/?text=${encodeURIComponent(fullText)}`, "_blank");
				shared = true;
			} else if (platform === "Facebook") {
				window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
				shared = true;
			} else if (platform === "Twitter") {
				window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(description || title)}&url=${encodeURIComponent(url)}`, "_blank");
				shared = true;
			} else if (platform === "Email") {
				window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(fullText)}`;
				shared = true;
			} else if (platform === "Outros") if (navigator.share) {
				await navigator.share({
					title,
					text: description,
					url
				});
				shared = true;
			} else toast({
				title: "Compartilhamento não suportado",
				description: "Seu navegador não suporta a funcionalidade de compartilhamento nativo."
			});
			else if (platform === "Instagram") {
				navigator.clipboard.writeText(fullText);
				toast({
					title: "Link copiado!",
					description: "O Instagram não permite links diretos. Cole no app para compartilhar."
				});
				shared = true;
			}
		} catch (err) {
			console.error(err);
		}
		if (shared && onShareAction) {
			toast({
				title: "Redirecionando...",
				description: `Abrindo ${platform} para compartilhar seu link.`
			});
			onShareAction();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md bg-zinc-950 border-zinc-800 text-white",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: title }), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "text-zinc-400",
					children: description
				})] }),
				preview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-2",
					children: preview
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-4 gap-4 py-4",
					children: [
						{
							id: "WhatsApp",
							icon: MessageCircle,
							label: "WhatsApp",
							color: "bg-[#25D366]"
						},
						{
							id: "Instagram",
							icon: Instagram,
							label: "Instagram",
							color: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]"
						},
						{
							id: "Facebook",
							icon: Facebook,
							label: "Facebook",
							color: "bg-[#1877F2]"
						},
						{
							id: "Twitter",
							icon: Twitter,
							label: "Twitter",
							color: "bg-[#1DA1F2]"
						},
						{
							id: "Email",
							icon: Mail,
							label: "Email",
							color: "bg-zinc-600"
						},
						{
							id: "Outros",
							icon: Ellipsis,
							label: "Outros",
							color: "bg-zinc-800"
						}
					].map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handleShare(option.id),
						className: "flex flex-col items-center gap-2 group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `${option.color} p-3 rounded-full text-white transition-transform group-hover:scale-110 shadow-lg`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(option.icon, { className: "w-6 h-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-zinc-400 group-hover:text-white transition-colors",
							children: option.label
						})]
					}, option.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-zinc-800 pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-zinc-400 mb-2",
						children: "Link"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 bg-zinc-900 rounded-md px-3 py-2 text-sm text-zinc-300 truncate border border-zinc-800",
							children: url
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: handleCopy,
							className: "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700",
							children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 mr-1" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { className: "w-4 h-4 mr-1" }), copied ? "Copiado" : "Copiar"]
						})]
					})]
				})
			]
		})
	});
}
export { ShareDialog as t };

//# sourceMappingURL=ShareDialog-CXG_X2vT.js.map