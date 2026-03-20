import { t as Send } from "./send-rXgdMqeG.js";
import { Gt as Avatar, Ir as require_jsx_runtime, Kr as require_react, Kt as AvatarFallback, N as ScrollArea, Wn as Heart, Xt as Button, ln as cn, qt as AvatarImage } from "./index-B4C18nT5.js";
import { t as Input } from "./input-DvXz7g1S.js";
import { o as SheetHeader, r as SheetContent, s as SheetTitle, t as Sheet } from "./sheet-ymQ_h3YX.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
var MOCK_COMMENTS = [
	{
		id: "1",
		user: {
			name: "João Silva",
			avatar: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1"
		},
		text: "Que jogada incrível! 🔥",
		time: "2min",
		likes: 24
	},
	{
		id: "2",
		user: {
			name: "Maria Souza",
			avatar: "https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2"
		},
		text: "A técnica do chute foi perfeita.",
		time: "5min",
		likes: 12
	},
	{
		id: "3",
		user: {
			name: "Coach Pedro",
			avatar: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=3"
		},
		text: "Precisamos treinar essa movimentação amanhã.",
		time: "1h",
		likes: 56
	},
	{
		id: "4",
		user: {
			name: "Ana Clara",
			avatar: "https://img.usecurling.com/ppl/thumbnail?gender=female&seed=4"
		},
		text: "Onde foi esse jogo?",
		time: "3h",
		likes: 2
	}
];
function CommentsSheet({ open, onOpenChange }) {
	const [comments, setComments] = (0, import_react.useState)(MOCK_COMMENTS);
	const [newComment, setNewComment] = (0, import_react.useState)("");
	const handleSend = () => {
		if (!newComment.trim()) return;
		setComments([{
			id: Date.now().toString(),
			user: {
				name: "Você",
				avatar: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99"
			},
			text: newComment,
			time: "Agora",
			likes: 0
		}, ...comments]);
		setNewComment("");
	};
	const toggleLike = (id) => {
		setComments(comments.map((c) => {
			if (c.id === id) return {
				...c,
				likes: c.isLiked ? c.likes - 1 : c.likes + 1,
				isLiked: !c.isLiked
			};
			return c;
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
			side: "bottom",
			className: "h-[75vh] p-0 rounded-t-3xl bg-zinc-950 border-zinc-800 text-white",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col h-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
						className: "p-4 border-b border-zinc-800",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
							className: "text-white text-center",
							children: [
								"Comentários (",
								comments.length,
								")"
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
						className: "flex-1 px-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4 py-4",
							children: comments.map((comment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
										className: "w-8 h-8 border border-zinc-700",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: comment.user.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: comment.user.name[0] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-baseline justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-semibold text-zinc-200",
													children: comment.user.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-zinc-500",
													children: comment.time
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-zinc-300 leading-relaxed",
												children: comment.text
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "text-xs font-medium text-zinc-500 hover:text-white transition-colors",
												children: "Responder"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => toggleLike(comment.id),
											className: "p-1 hover:bg-zinc-800 rounded-full transition-colors",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("w-4 h-4", comment.isLiked ? "fill-red-500 text-red-500" : "text-zinc-500") })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-zinc-500",
											children: comment.likes
										})]
									})
								]
							}, comment.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 border-t border-zinc-800 bg-zinc-900 pb-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "w-8 h-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: "EU" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: newComment,
									onChange: (e) => setNewComment(e.target.value),
									placeholder: "Adicione um comentário...",
									className: "bg-zinc-800 border-none text-white pr-10 focus-visible:ring-primary/50",
									onKeyDown: (e) => e.key === "Enter" && handleSend()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									className: "absolute right-0 top-0 text-primary hover:text-primary/80 hover:bg-transparent",
									onClick: handleSend,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-4 h-4" })
								})]
							})]
						})
					})
				]
			})
		})
	});
}
export { CommentsSheet as t };

//# sourceMappingURL=CommentsSheet-bEH2mUsp.js.map