import { t as CalendarDays } from "./calendar-days-cZr_OM4g.js";
import { t as ChartColumn } from "./chart-column-BQh8Vm3a.js";
import { t as Gift } from "./gift-EQheDF71.js";
import { $ as mockCurrentUser, Bn as Sparkles, Fn as Target, Hr as createLucideIcon, Or as ChevronRight, jn as Trophy, mi as require_react, ri as require_jsx_runtime, sn as Button, ui as useNavigate, yi as __toESM, z as Badge, zr as ArrowLeft } from "./index-D6lOY_hF.js";
import { t as Card } from "./card-Cxa7RtOt.js";
import { t as useAlbumStore } from "./useAlbumStore-aOJBHwQg.js";
import { t as mockStickers } from "./album-data-C7SHWewy.js";
var BookOpen = createLucideIcon("book-open", [["path", {
	d: "M12 7v14",
	key: "1akyts"
}], ["path", {
	d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
	key: "ruj8y"
}]]);
require_react();
var import_jsx_runtime = require_jsx_runtime();
function CopaHub() {
	const navigate = useNavigate();
	const { collected } = useAlbumStore();
	const totalStickers = mockStickers?.length || 100;
	const progressPercent = Math.round(collected.length / totalStickers * 100) || 0;
	const userScore = mockCurrentUser?.stats?.points || 2450;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#0a0a0a] text-white pb-24 relative overflow-hidden animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 pointer-events-none z-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "https://img.usecurling.com/p/800/1200?q=soccer%20stadium%20night%20lights&color=green",
						className: "w-full h-full object-cover opacity-20",
						alt: "Stadium"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/80 to-[#0a0a0a]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-40 -right-40 w-96 h-96 bg-[hsl(var(--gold))/0.15] rounded-full blur-[100px]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 pt-safe-top px-4 pb-4 flex items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => navigate("/home"),
						className: "text-white hover:bg-white/10 rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-sm font-black uppercase tracking-widest text-[hsl(var(--gold))] flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-4 h-4" }), " Copa 26"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 px-6 pt-2 pb-8 flex flex-col items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-24 h-24 mb-4 rounded-3xl bg-gradient-to-br from-[hsl(var(--gold))] to-amber-700 p-0.5 shadow-[0_0_30px_hsl(var(--gold)/0.3)] hover:scale-105 transition-transform",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full h-full bg-zinc-950 rounded-[22px] flex items-center justify-center relative overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[url('https://img.usecurling.com/p/200/200?q=glitter&color=yellow')] opacity-20 mix-blend-overlay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "w-10 h-10 text-[hsl(var(--gold))] drop-shadow-md relative z-10" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-3xl font-black uppercase tracking-tighter leading-none mb-2",
						children: [
							"Power Index",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--gold))] to-amber-200",
								children: "Dashboard"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-zinc-400 text-sm max-w-[280px] mt-2 font-medium",
						children: "Seu centro de inteligência e recompensas para a Copa do Mundo 2026."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 px-4 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					onClick: () => navigate("/album/stats"),
					className: "bg-zinc-900/60 border-zinc-800/50 backdrop-blur-xl p-5 rounded-3xl cursor-pointer hover:bg-zinc-800/80 transition-all border-l-4 border-l-[hsl(var(--gold))] shadow-lg group overflow-hidden relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-0 top-0 w-32 h-32 bg-[hsl(var(--gold))/0.1] rounded-full blur-2xl group-hover:bg-[hsl(var(--gold))/0.2] transition-colors" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 relative z-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-14 h-14 rounded-2xl bg-[hsl(var(--gold))/0.1] flex items-center justify-center shrink-0 border border-[hsl(var(--gold))/0.2]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "https://img.usecurling.com/i?q=analytics&color=gradient&shape=fill",
									className: "w-8 h-8 opacity-90 drop-shadow-[0_0_8px_hsl(var(--gold)/0.5)]",
									alt: "Analytics"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-black text-lg text-white uppercase tracking-wider flex items-center gap-2",
									children: [
										"Estatísticas",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5 text-[hsl(var(--gold))]" })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-zinc-400 mt-0.5 leading-tight",
									children: "Força das seleções e rankings."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-end mr-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xl font-black text-[hsl(var(--gold))]",
									children: userScore
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] text-zinc-400 uppercase tracking-wider font-bold",
									children: "Seu TPI"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-5 h-5 text-zinc-500 group-hover:text-[hsl(var(--gold))] transition-colors shrink-0" })
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							onClick: () => navigate("/album/stickers"),
							className: "bg-zinc-900/60 border-zinc-800/50 backdrop-blur-xl p-4 rounded-3xl cursor-pointer hover:bg-zinc-800/80 transition-all shadow-lg group relative overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-6 h-6 text-emerald-500" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-black text-sm text-white uppercase tracking-wider",
										children: "Álbum Virtual"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-zinc-400 mt-1 leading-tight",
										children: "Colecione figurinhas."
									})]
								}) })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full bg-black/40 h-1.5 rounded-full overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "bg-emerald-500 h-full transition-all duration-1000",
										style: { width: `${progressPercent}%` }
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[9px] text-zinc-500 mt-1.5 font-bold uppercase tracking-wider",
									children: [progressPercent, "% Concluído"]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							onClick: () => navigate("/album/stats"),
							className: "bg-zinc-900/60 border-zinc-800/50 backdrop-blur-xl p-4 rounded-3xl cursor-pointer hover:bg-zinc-800/80 transition-all shadow-lg group relative overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-3 right-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "bg-rose-500 text-white text-[9px] px-1.5 py-0 uppercase font-black animate-pulse",
									children: "Ao Vivo"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3 h-full justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20 group-hover:bg-rose-500/20 transition-colors mb-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "w-6 h-6 text-rose-500" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-black text-sm text-white uppercase tracking-wider",
										children: "Bolão Goplay"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-zinc-400 mt-1 leading-tight",
										children: "Acerte placares e concorra."
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[9px] text-rose-400/80 mt-2 font-bold uppercase tracking-wider flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" }),
										" ",
										"Partidas Hoje"
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							onClick: () => navigate("/marketplace?category=jerseys&redeem=true"),
							className: "bg-zinc-900/60 border-zinc-800/50 backdrop-blur-xl p-4 rounded-3xl cursor-pointer hover:bg-zinc-800/80 transition-all shadow-lg group relative overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-3 right-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "bg-[hsl(var(--gold))] text-black text-[9px] px-1.5 py-0 uppercase font-black",
									children: "Prêmios"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-12 h-12 rounded-2xl bg-[hsl(var(--gold))/0.1] flex items-center justify-center border border-[hsl(var(--gold))/0.2] group-hover:bg-[hsl(var(--gold))/0.2] transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "w-6 h-6 text-[hsl(var(--gold))]" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-black text-sm text-white uppercase tracking-wider",
									children: "Recompensas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-zinc-400 mt-1 leading-tight",
									children: "Resgate camisas oficiais."
								})] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							onClick: () => navigate("/album/stats/table"),
							className: "bg-zinc-900/60 border-zinc-800/50 backdrop-blur-xl p-4 rounded-3xl cursor-pointer hover:bg-zinc-800/80 transition-all shadow-lg group relative overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "w-6 h-6 text-blue-400" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-black text-sm text-white uppercase tracking-wider",
									children: "Tabela"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-zinc-400 mt-1 leading-tight",
									children: "Acompanhe todos confrontos."
								})] })]
							})
						})
					]
				})]
			})
		]
	});
}
export { CopaHub as default };

//# sourceMappingURL=CopaHub-CTd8MM_f.js.map