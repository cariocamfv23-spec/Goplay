import { t as Box } from "./box-Dix8YfWV.js";
import "./chevron-down-0moyF_uj.js";
import "./chevron-left-B0W1024f.js";
import "./select-DsJOBt8Y.js";
import { t as Post3DGenerator } from "./Post3DGenerator-Cbfwt-l0.js";
import { t as Ellipsis } from "./ellipsis-E4xY0T1W.js";
import { t as ExternalLink } from "./external-link-CyiwItpE.js";
import "./flame-B_zCxbLX.js";
import { t as Ghost } from "./ghost-Ckc54u9w.js";
import "./loader-circle-DdQ0Qx7x.js";
import { t as MessageCircle } from "./message-circle-CZOp1Bgy.js";
import "./mic-dE-xpqhr.js";
import "./pause-pr6KJoEx.js";
import "./play-DkAi8h78.js";
import { t as Plus } from "./plus-D3VEOBew.js";
import "./radio-CiO3n9tj.js";
import "./rotate-ccw-BCpgclif.js";
import "./send-BfQgag7Y.js";
import { t as Share2 } from "./share-2-CZnle0WO.js";
import { t as Video } from "./video-By9dW3el.js";
import "./volume-2-DNGU5t3c.js";
import "./volume-x-D6XFX67y.js";
import "./wand-sparkles-DCHUCyWC.js";
import { Cr as createLucideIcon, En as Sparkles, Gn as Heart, Gt as Avatar, Kt as AvatarFallback, Lr as require_jsx_runtime, M as Badge, Vr as Link, Wr as useNavigate, Xt as Button, a as NostalgiaFilter, c as DialogContent, cn as toast, d as DialogHeader, dt as mockPosts, f as DialogTitle, fn as X, o as Dialog, p as DialogTrigger, qn as Hand, qr as require_react, qt as AvatarImage, un as cn } from "./index-YiRCBu0v.js";
import { a as CardHeader, n as CardContent, t as Card } from "./card-C2B2zboe.js";
import "./dist-B5ADQoVP.js";
import { t as Label } from "./label-DQNZAURn.js";
import { t as Separator } from "./separator-DZJj1vto.js";
import { t as useSoundStore_default } from "./useSoundStore-wKKCDtrY.js";
import "./progress-DNNfsHdl.js";
import "./input-BkczHjKx.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-1ZT7Tdte.js";
import { t as DepthContainer } from "./DepthContainer-BdN9Z1pM.js";
import "./sheet-mJidBv1v.js";
import { t as Textarea } from "./textarea-Bveobeyp.js";
import { a as CarouselPrevious, i as CarouselNext, n as CarouselContent, r as CarouselItem, t as Carousel } from "./carousel-wXMcoIGZ.js";
import { t as CommentsSheet } from "./CommentsSheet-CxiU1MSH.js";
import { t as useLikeInteraction } from "./useLikeInteraction-Ca1SKjjs.js";
import "./SoundWaveVisualizer-B-_BOJV9.js";
import { t as PostDetailDialog } from "./PostDetailDialog-uzg8sMDl.js";
import { t as FeedVideoPlayer } from "./FeedVideoPlayer-Gz9Sb5JB.js";
import { t as StoriesRail } from "./StoriesRail-lWq7pjDv.js";
var HeartHandshake = createLucideIcon("heart-handshake", [["path", {
	d: "M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762",
	key: "17lmqv"
}]]);
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function PostCard({ post }) {
	const [showComments, setShowComments] = (0, import_react.useState)(false);
	const [showDetail, setShowDetail] = (0, import_react.useState)(false);
	const [imgError, setImgError] = (0, import_react.useState)(false);
	const { isLiked, likeCount, handleLike } = useLikeInteraction(post, post.likes, post.liked);
	const [isCool, setIsCool] = (0, import_react.useState)(false);
	const [coolCount, setCoolCount] = (0, import_react.useState)(post.cools || 0);
	const { playSound } = useSoundStore_default();
	const handleCool = () => {
		setIsCool(!isCool);
		setCoolCount(isCool ? coolCount - 1 : coolCount + 1);
		if (!isCool) playSound("like_generic");
	};
	const openDetail = () => {
		setShowDetail(true);
	};
	const handleImageError = () => {
		setImgError(true);
	};
	const primaryImage = imgError ? "https://img.usecurling.com/p/800/400?q=sports%20generic&color=gray" : post.image || post.media?.[0];
	const renderSocialContext = () => {
		if (!post.socialContext) return null;
		const { type, user } = post.socialContext;
		let icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-3 h-3 text-muted-foreground fill-muted-foreground/30" });
		let text = "curtiu isso";
		if (type === "comment") {
			icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-3 w-3 text-muted-foreground fill-muted-foreground/10" });
			text = "comentou nisso";
		} else if (type === "repost") {
			icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-3 w-3 text-muted-foreground" });
			text = "compartilhou isso";
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 px-4 pt-3 pb-0 -mb-2",
			children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: `/profile/${user.id}`,
						className: "font-semibold hover:text-foreground hover:underline transition-colors",
						children: user.name
					}),
					" ",
					text
				]
			})]
		});
	};
	const renderContent = () => {
		switch (post.type) {
			case "video":
				if (post.videoUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mb-3 rounded-xl overflow-hidden shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedVideoPlayer, {
						url: post.videoUrl,
						thumbnail: primaryImage,
						onClick: openDetail
					}), post.narration && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-2 left-2 z-30 pointer-events-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "bg-gold/90 text-black border-none shadow-md",
							children: "Narração AI"
						})
					})]
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthContainer, {
					className: "relative rounded-xl overflow-hidden mb-3 group cursor-pointer",
					maxRotation: 5,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: openDetail,
						className: "w-full h-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NostalgiaFilter, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: primaryImage,
								alt: "Thumbnail",
								loading: "lazy",
								onError: handleImageError,
								className: "w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform shadow-xl translate-z-30",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-5 w-5 bg-white ml-1",
										style: { clipPath: "polygon(0 0, 100% 50%, 0 100%)" }
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-2 right-2 px-2 py-0.5 bg-black/60 rounded text-xs text-white font-medium translate-z-20",
								children: post.videoDuration
							})
						]
					})
				});
			case "carousel": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Carousel, {
					className: "w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselContent, { children: post.media?.map((url, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthContainer, {
						className: "aspect-square relative rounded-xl overflow-hidden bg-muted cursor-pointer",
						maxRotation: 3,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: openDetail,
							className: "w-full h-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NostalgiaFilter, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: url,
								alt: `Slide ${index}`,
								loading: "lazy",
								className: "w-full h-full object-cover hover:scale-105 transition-transform duration-500"
							})]
						})
					}) }, index)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden sm:block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselPrevious, { className: "left-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselNext, { className: "right-2" })]
					})]
				})
			});
			case "article": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthContainer, {
				className: "mb-3 border border-border rounded-xl overflow-hidden bg-secondary/20 hover:bg-secondary/30 transition-colors cursor-pointer",
				maxRotation: 2,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: openDetail,
					className: "w-full h-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "aspect-[2/1] relative overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NostalgiaFilter, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: primaryImage,
							alt: "Article",
							loading: "lazy",
							onError: handleImageError,
							className: "w-full h-full object-cover hover:scale-105 transition-transform duration-500"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3 translate-z-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1",
							children: [
								post.articleDomain,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-bold text-sm leading-tight group-hover:text-primary transition-colors",
							children: post.articleTitle
						})]
					})]
				})
			});
			default:
				if (primaryImage) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthContainer, {
					className: "relative rounded-xl overflow-hidden mb-3 cursor-pointer",
					maxRotation: 3,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: openDetail,
						className: "w-full h-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NostalgiaFilter, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: primaryImage,
							alt: "Post",
							loading: "lazy",
							onError: handleImageError,
							className: "w-full h-auto object-cover max-h-[500px] hover:scale-105 transition-transform duration-500"
						})]
					})
				});
				return null;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "border-none shadow-sm rounded-2xl overflow-visible bg-card mb-4 animate-fade-in hover:shadow-md transition-shadow duration-300",
			children: [
				renderSocialContext(),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex flex-row items-center p-4 pb-2 space-y-0 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: `/profile/${post.user.id || "me"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-10 w-10 border border-border cursor-pointer hover:border-primary transition-colors depth-element-hover",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: post.user.avatar }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: post.user.name.substring(0, 2) })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: `/profile/${post.user.id || "me"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold hover:text-primary transition-colors",
									children: post.user.name
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									className: "h-4 px-1 text-[10px] rounded-sm font-normal text-muted-foreground bg-secondary/50",
									children: post.user.type
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] text-muted-foreground",
									children: ["• ", post.time]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "h-8 w-8 text-muted-foreground hover:bg-secondary/80 rounded-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-4 w-4" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4 pt-1",
					children: [
						post.content && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm mb-3 leading-relaxed whitespace-pre-wrap",
							children: post.content
						}),
						renderContent(),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pt-2 border-t border-border/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										size: "sm",
										className: cn("flex flex-col items-center gap-0 h-auto py-1 px-2 transition-colors active:scale-90", isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-400"),
										onClick: handleLike,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("h-5 w-5 transition-all", isLiked ? "fill-current scale-110" : "") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-medium",
											children: likeCount
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										size: "sm",
										className: "flex flex-col items-center gap-0 h-auto py-1 px-2 text-muted-foreground hover:text-gold active:scale-90",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hand, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-medium",
											children: post.applauds
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										size: "sm",
										className: cn("flex flex-col items-center gap-0 h-auto py-1 px-2 transition-colors active:scale-90", isCool ? "text-orange-500" : "text-muted-foreground hover:text-orange-400"),
										onClick: handleCool,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-lg leading-none mb-0.5",
											children: "🤙"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-medium",
											children: coolCount
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										size: "sm",
										className: "flex flex-col items-center gap-0 h-auto py-1 px-2 text-muted-foreground hover:text-primary active:scale-90",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-medium",
											children: post.supports
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										size: "sm",
										className: "flex flex-col items-center gap-0 h-auto py-1 px-2 text-muted-foreground hover:text-blue-500 active:scale-90",
										onClick: () => setShowComments(true),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-medium",
											children: post.comments
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "text-muted-foreground hover:text-primary active:scale-90 rounded-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-5 w-5" })
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommentsSheet, {
			open: showComments,
			onOpenChange: setShowComments
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostDetailDialog, {
			post,
			open: showDetail,
			onOpenChange: setShowDetail
		})
	] });
}
function CreatePostFab() {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [content, setContent] = (0, import_react.useState)("");
	const [videoFile, setVideoFile] = (0, import_react.useState)(null);
	const [videoPreview, setVideoPreview] = (0, import_react.useState)(null);
	const [show3DGenerator, setShow3DGenerator] = (0, import_react.useState)(false);
	const [generatedMode, setGeneratedMode] = (0, import_react.useState)(null);
	const fileInputRef = (0, import_react.useRef)(null);
	const navigate = useNavigate();
	const handlePost = () => {
		if (!content.trim() && !videoFile) return;
		toast.success("Publicação enviada!", {
			description: generatedMode ? `Seu Replay 3D (${generatedMode}) foi publicado com sucesso!` : "Seu post aparecerá no feed em instantes.",
			icon: generatedMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "w-4 h-4 text-primary" }) : void 0
		});
		setIsOpen(false);
		resetForm();
	};
	const resetForm = () => {
		setContent("");
		setVideoFile(null);
		setVideoPreview(null);
		setShow3DGenerator(false);
		setGeneratedMode(null);
	};
	const handleFileSelect = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			if (!file.type.startsWith("video/")) {
				toast.error("Por favor, selecione um arquivo de vídeo.");
				return;
			}
			setVideoFile(file);
			setVideoPreview(URL.createObjectURL(file));
		}
	};
	const handle3DConfirm = (mode) => {
		setGeneratedMode(mode);
		setShow3DGenerator(false);
		toast.success("Replay 3D anexado!", { description: "Agora você pode finalizar sua publicação." });
	};
	const handleRemoveVideo = () => {
		setVideoFile(null);
		setVideoPreview(null);
		setGeneratedMode(null);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};
	const handleGhostPlayNavigation = () => {
		setIsOpen(false);
		navigate("/ai/ghost-play");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open: isOpen,
		onOpenChange: (open) => {
			setIsOpen(open);
			if (!open) resetForm();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "icon",
				className: "fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg z-40 bg-primary hover:bg-primary/90 text-white animate-in zoom-in duration-300",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-6 w-6" })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "sm:max-w-md bg-card border-border max-h-[90vh] overflow-y-auto",
			children: show3DGenerator && videoFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Post3DGenerator, {
				videoFile,
				onConfirm: handle3DConfirm,
				onCancel: () => setShow3DGenerator(false)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Criar Nova Publicação" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "content",
								children: "No que você está pensando?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "content",
								placeholder: "Compartilhe seu treino, conquista ou ideia...",
								className: "min-h-[100px] resize-none",
								value: content,
								onChange: (e) => setContent(e.target.value)
							})]
						}),
						videoPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative rounded-xl overflow-hidden bg-black/5 border border-border group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
									src: videoPreview,
									className: "w-full h-48 object-cover opacity-80",
									controls: false,
									muted: true
								}),
								generatedMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-primary/90 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg animate-in zoom-in",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "w-3 h-3" }),
											"Replay 3D:",
											" ",
											generatedMode === "split" ? "Dividido" : generatedMode === "ghost" ? "Apenas 3D" : "Original"
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "destructive",
									className: "absolute top-2 right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
									onClick: handleRemoveVideo,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-3 h-3" })
								}),
								!generatedMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute bottom-2 left-2 right-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "default",
										size: "sm",
										className: "w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg border border-indigo-400/30",
										onClick: () => setShow3DGenerator(true),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 mr-2" }), "Gerar Replay 3D"]
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Adicionar Mídia" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										className: "w-full text-xs gap-2",
										onClick: () => fileInputRef.current?.click(),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "w-4 h-4" }), videoFile ? "Trocar Vídeo" : "Foto/Vídeo"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										ref: fileInputRef,
										className: "hidden",
										accept: "video/*",
										onChange: handleFileSelect
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										className: "w-full text-xs",
										disabled: true,
										children: "Localização"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "text-primary flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ghost, { className: "w-4 h-4" }), "Goplay AI Studio"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "secondary",
								className: "w-full gap-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 border border-indigo-500/20",
								onClick: handleGhostPlayNavigation,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ghost, { className: "w-4 h-4" }), "Abrir Estúdio Completo"]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handlePost,
						disabled: !content.trim() && !videoFile,
						children: "Publicar"
					})
				})
			] })
		})]
	});
}
function Feed() {
	const eventPosts = mockPosts.filter((p) => p.type === "article" || p.type === "event");
	const socialPosts = mockPosts.filter((p) => p.type !== "article" && p.type !== "event");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-16 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoriesRail, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "all",
					className: "w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "w-full grid grid-cols-3 h-9",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "all",
								className: "text-xs",
								children: "Todos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "social",
								className: "text-xs",
								children: "Social"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "events",
								className: "text-xs",
								children: "Eventos"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 pb-24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "all",
								className: "space-y-6 m-0 animate-in fade-in slide-in-from-bottom-4 duration-500",
								children: mockPosts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post }, post.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "social",
								className: "space-y-6 m-0 animate-in fade-in slide-in-from-bottom-4 duration-500",
								children: socialPosts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post }, post.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "events",
								className: "space-y-6 m-0 animate-in fade-in slide-in-from-bottom-4 duration-500",
								children: eventPosts.length > 0 ? eventPosts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post }, post.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-center py-10 text-muted-foreground text-sm",
									children: "Nenhum evento no momento."
								})
							})
						]
					})]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatePostFab, {})]
	});
}
export { Feed as default };

//# sourceMappingURL=Feed-B4h4Bsyz.js.map