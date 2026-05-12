import "./ellipsis-TM50F5pP.js";
import { t as ShareDialog } from "./ShareDialog-JnSnD0uk.js";
import "./mail-DDQOiPjO.js";
import { t as Share2 } from "./share-2-wyBY2MbD.js";
import { An as Trophy, Cn as X, Q as mockCurrentUser, Vr as createLucideIcon, ar as Info, ni as require_jsx_runtime, nr as Lock, on as Button, pi as require_react, xn as cn, zn as Sparkles } from "./index-BsvDdUYC.js";
import { t as Card } from "./card-Di7loJbg.js";
import { t as useAlbumStore } from "./useAlbumStore-GtCWycVe.js";
var PackageOpen = createLucideIcon("package-open", [
	["path", {
		d: "M12 22v-9",
		key: "x3hkom"
	}],
	["path", {
		d: "M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z",
		key: "2ntwy6"
	}],
	["path", {
		d: "M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13",
		key: "1pmm1c"
	}],
	["path", {
		d: "M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z",
		key: "12ttoo"
	}]
]);
var countries = [
	"Brasil",
	"Argentina",
	"França",
	"Alemanha",
	"Inglaterra",
	"Espanha",
	"Portugal",
	"Itália"
];
const mockStickers = Array.from({ length: 40 }).map((_, i) => {
	const number = i + 1;
	const countryIndex = Math.floor(i / 5);
	const country = countries[countryIndex];
	return {
		id: `stk-${number}`,
		number,
		name: `Figurinha ${number}`,
		country,
		image: `https://img.usecurling.com/p/300/400?q=soccer%20player%20${country}&color=${[
			"green",
			"blue",
			"red",
			"black",
			"white",
			"orange",
			"red",
			"blue"
		][countryIndex]}&dpr=2`,
		rarity: number % 5 === 0 ? "rare" : "common"
	};
});
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function PackOpener({ onClose }) {
	const { openPack } = useAlbumStore();
	const [cards, setCards] = (0, import_react.useState)([]);
	const [currentIdx, setCurrentIdx] = (0, import_react.useState)(0);
	const [isFlipped, setIsFlipped] = (0, import_react.useState)(false);
	const [finished, setFinished] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const commons = mockStickers.filter((s) => s.rarity === "common");
		const rares = mockStickers.filter((s) => s.rarity === "rare");
		const randomCard = (arr) => arr[Math.floor(Math.random() * arr.length)];
		const newCards = [...Array.from({ length: 6 }).map(() => randomCard(commons)), randomCard(rares)];
		newCards.sort(() => Math.random() - .5);
		setCards(newCards);
	}, []);
	const handleInteract = () => {
		if (!isFlipped) setIsFlipped(true);
		else if (currentIdx < cards.length - 1) {
			setIsFlipped(false);
			setTimeout(() => setCurrentIdx((prev) => prev + 1), 150);
		} else {
			openPack(cards.map((c) => c.id));
			setFinished(true);
		}
	};
	const handleFinish = () => {
		if (!finished) openPack(cards.map((c) => c.id));
		onClose();
	};
	if (cards.length === 0) return null;
	const currentCard = cards[currentIdx];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center p-4 animate-in fade-in duration-500",
		children: [!finished && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "icon",
			className: "absolute top-6 right-6 text-white/50 hover:text-white",
			onClick: handleFinish,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-6 h-6" })
		}), finished ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center space-y-6 animate-in slide-in-from-bottom-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(34,197,94,0.5)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-10 h-10 text-white" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-black text-white",
					children: "Pacote Aberto!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-zinc-400 max-w-xs mx-auto",
					children: "7 figurinhas foram adicionadas ao seu álbum."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: onClose,
					className: "bg-white text-black hover:bg-zinc-200 font-bold w-full max-w-[240px] h-12",
					children: "Ver Álbum"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm flex flex-col items-center gap-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-black text-white",
						children: isFlipped ? `${currentIdx + 1} de 7` : "Novo Pacote"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-zinc-400",
						children: isFlipped ? "Toque para a próxima" : "Toque para revelar"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative w-[260px] aspect-[3/4] [perspective:1000px] cursor-pointer group",
					onClick: handleInteract,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("w-full h-full relative [transform-style:preserve-3d] transition-transform duration-700 ease-out", isFlipped ? "[transform:rotateY(180deg)]" : "group-hover:scale-105"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 [backface-visibility:hidden] bg-gradient-to-br from-green-600 to-green-900 rounded-2xl border-4 border-white/20 shadow-2xl flex flex-col items-center justify-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-12 h-12 text-yellow-300 mb-4 opacity-80" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white font-black tracking-[0.2em] text-xl",
									children: "COPA 2026"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-green-200/50 font-bold text-xs mt-2",
									children: "TAP TO OPEN"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl border-4 overflow-hidden", currentCard?.rarity === "rare" ? "border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.6)]" : "border-white shadow-2xl"),
							children: currentCard && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: currentCard.image,
								alt: currentCard.name,
								className: "w-full h-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-md p-4 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-white font-black text-xl",
									children: currentCard.country
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: cn("text-xs font-bold uppercase tracking-widest mt-1", currentCard.rarity === "rare" ? "text-yellow-400" : "text-zinc-400"),
									children: currentCard.rarity === "rare" ? "🌟 RARA 🌟" : "Comum"
								})]
							})] })
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleInteract,
					className: "w-full max-w-[260px] h-14 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-black text-lg hover:scale-105 transition-transform",
					children: isFlipped ? currentIdx < 6 ? "Próxima" : "Concluir" : "Revelar"
				})
			]
		})]
	});
}
function StickerAlbum() {
	const { collected, unopenedPacks } = useAlbumStore();
	const [isOpenerOpen, setIsOpenerOpen] = (0, import_react.useState)(false);
	const [isShareOpen, setIsShareOpen] = (0, import_react.useState)(false);
	const inviteLink = `https://goplay.app/invite/${mockCurrentUser.referralCode || "GOPLAY2024"}`;
	const inviteMessage = `Me ajude a completar o Álbum da Copa 2026! Baixe o Goplay com meu link e nós dois ganhamos pacotes de figurinhas: ${inviteLink}`;
	const totalStickers = mockStickers.length;
	const collectedCount = collected.length;
	const progress = Math.round(collectedCount / totalStickers * 100);
	const groupedStickers = mockStickers.reduce((acc, sticker) => {
		if (!acc[sticker.country]) acc[sticker.country] = [];
		acc[sticker.country].push(sticker);
		return acc;
	}, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-gradient-to-br from-green-700 via-emerald-600 to-green-900 text-white pb-8 rounded-b-[2.5rem] relative overflow-hidden shadow-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[url('https://img.usecurling.com/p/1000/1000?q=soccer%20pattern&color=green')] bg-cover opacity-10 mix-blend-overlay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 pt-10 pb-4 px-6 text-center space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-inner",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-8 h-8 text-yellow-300 drop-shadow-md" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-3xl font-black tracking-tight leading-tight",
							children: [
								"Álbum Virtual ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-yellow-300",
									children: "Copa 2026"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-xs mx-auto space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs font-bold uppercase tracking-wider",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Progresso" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [progress, "%"] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-3 w-full bg-black/20 rounded-full overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-yellow-300 transition-all duration-1000 ease-out rounded-full",
										style: { width: `${progress}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-green-100",
									children: [
										collectedCount,
										" de ",
										totalStickers,
										" figurinhas colecionadas"
									]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 -mt-6 relative z-20 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4 flex items-center justify-between shadow-lg border-none bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageOpen, { className: cn("w-8 h-8", unopenedPacks > 0 ? "text-yellow-500" : "text-muted-foreground") }), unopenedPacks > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce",
									children: unopenedPacks
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold leading-none",
								children: "Pacotes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: [unopenedPacks, " disponíveis"]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => setIsOpenerOpen(true),
							disabled: unopenedPacks === 0,
							className: cn("font-bold transition-all shadow-md active:scale-95", unopenedPacks > 0 ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700" : ""),
							children: "Abrir Pacote"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-5 border border-primary/20 flex flex-col items-center text-center space-y-3 relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-4 -top-4 w-20 h-20 bg-primary/10 rounded-full blur-xl" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "w-6 h-6 text-primary mb-1" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-lg leading-tight",
								children: "Quer mais figurinhas?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									"Convide seus amigos para o GoPlay. A cada amigo que se cadastrar pelo seu link, você ganha",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "1 pacote com 7 figurinhas!" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => setIsShareOpen(true),
								className: "w-full mt-2 font-bold shadow-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-4 h-4 mr-2" }), "Convidar Amigos"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-8",
						children: Object.entries(groupedStickers).map(([country, stickers]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-black text-xl tracking-tight uppercase border-l-4 border-primary pl-3",
									children: country
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-medium text-muted-foreground",
									children: [
										"(",
										stickers.filter((s) => collected.includes(s.id)).length,
										"/",
										stickers.length,
										")"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3",
								children: stickers.map((sticker) => {
									const isCollected = collected.includes(sticker.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: cn("relative aspect-[3/4] rounded-lg overflow-hidden border shadow-sm transition-all duration-300", isCollected ? "border-primary/50" : "border-dashed border-border bg-secondary/30", isCollected && sticker.rarity === "rare" ? "ring-2 ring-yellow-400 ring-offset-2 ring-offset-background" : ""),
										children: isCollected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: sticker.image,
											alt: sticker.name,
											className: "w-full h-full object-cover"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-1 text-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] font-bold text-white tracking-wider",
												children: ["#", sticker.number]
											})
										})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/40",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-5 h-5 mb-1 opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-black text-xl opacity-50",
												children: sticker.number
											})]
										})
									}, sticker.id);
								})
							})]
						}, country))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareDialog, {
				open: isShareOpen,
				onOpenChange: setIsShareOpen,
				title: "Ganhe Figurinhas",
				description: inviteMessage,
				url: inviteLink
			}),
			isOpenerOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackOpener, { onClose: () => setIsOpenerOpen(false) })
		]
	});
}
export { StickerAlbum as default };

//# sourceMappingURL=StickerAlbum-DozPRpjz.js.map