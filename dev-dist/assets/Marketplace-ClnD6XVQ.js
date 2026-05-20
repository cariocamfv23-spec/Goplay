import { t as CircleCheck } from "./circle-check-C_s7jCNS.js";
import { t as Funnel } from "./funnel-B4gY3H4X.js";
import { t as ImageOff } from "./image-off-D4EbGeX8.js";
import { t as Wallet } from "./wallet-CYi4NtkH.js";
import { F as useBolaoStore, Gn as Search, Sn as cn, Vn as ShoppingCart, at as mockFinancialSummary, ci as useSearchParams, jn as Trophy, mi as require_react, ri as require_jsx_runtime, sn as Button, ui as useNavigate, wn as X, xt as mockProducts, z as Badge, zn as Star } from "./index-D6lOY_hF.js";
import { n as CardContent, t as Card } from "./card-Cxa7RtOt.js";
import { t as Input } from "./input-5SVNFDD5.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function Marketplace() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { claimPrize } = useBolaoStore();
	const isRedeeming = searchParams.get("redeem") === "true";
	const redeemTeam = searchParams.get("team");
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("Todos");
	const [selectedModality, setSelectedModality] = (0, import_react.useState)("Todos");
	(0, import_react.useEffect)(() => {
		if (isRedeeming) {
			setSelectedCategory("Vestuário");
			setSelectedModality("Futebol");
			if (redeemTeam) setSearch("Camisa");
		}
	}, [isRedeeming, redeemTeam]);
	const categories = [
		"Todos",
		"Vestuário",
		"Calçados",
		"Equipamentos",
		"Suplementos",
		"Acessórios"
	];
	const modalities = [
		"Todos",
		"Futebol",
		"Basquete",
		"Fitness",
		"Corrida",
		"Vôlei",
		"Lutas"
	];
	const filteredProducts = mockProducts.filter((product) => {
		const searchLower = search.toLowerCase();
		const matchesSearch = !search || product.name.toLowerCase().includes(searchLower);
		const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
		const matchesModality = selectedModality === "Todos" || product.modality === selectedModality;
		return matchesSearch && matchesCategory && matchesModality;
	});
	const mockPrizeProduct = isRedeeming && redeemTeam ? {
		id: "prize-1",
		name: `Camiseta Oficial - ${redeemTeam}`,
		category: "Vestuário",
		modality: "Futebol",
		price: 0,
		pointsPrice: 0,
		rating: 5,
		isPremium: true,
		image: `https://img.usecurling.com/p/400/400?q=soccer%20jersey%20${encodeURIComponent(redeemTeam)}`,
		availability: "in_stock"
	} : null;
	const finalProducts = mockPrizeProduct ? [mockPrizeProduct, ...filteredProducts.filter((p) => !p.name.includes(redeemTeam))] : filteredProducts;
	const handleClaim = (e) => {
		e.stopPropagation();
		claimPrize();
		navigate("/marketplace/cart");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 bg-background/95 backdrop-blur z-20 border-b border-border/50",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl font-bold",
									children: "Loja Goplay"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => navigate("/marketplace/cart"),
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-6 w-6" }), isRedeeming && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-background" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 bg-secondary/50 rounded-lg p-2 flex items-center gap-2 border border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-bold",
										children: ["R$ ", (mockFinancialSummary?.balance ?? 0).toFixed(2)]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 bg-secondary/50 rounded-lg p-2 flex items-center gap-2 border border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-4 w-4 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-bold",
										children: [mockFinancialSummary?.pointsBalance ?? 0, " pts"]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "Buscar produtos...",
										className: "pl-9 pr-9 bg-secondary border-none rounded-xl",
										value: search,
										onChange: (e) => setSearch(e.target.value)
									}),
									search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setSearch(""),
										className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide",
						children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: selectedCategory === cat ? "default" : "outline",
							size: "sm",
							onClick: () => setSelectedCategory(cat),
							className: "rounded-full text-xs h-8 whitespace-nowrap",
							children: cat
						}, cat))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide border-t border-border/30 pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-3 w-3 text-muted-foreground self-center mr-1 shrink-0" }), modalities.map((mod) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: selectedModality === mod ? "secondary" : "ghost",
							size: "sm",
							onClick: () => setSelectedModality(mod),
							className: cn("rounded-full text-xs h-7 whitespace-nowrap", selectedModality === mod ? "bg-secondary font-bold" : "text-muted-foreground"),
							children: mod
						}, mod))]
					})
				]
			}),
			isRedeeming && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-4 mt-4 p-4 rounded-xl bg-gradient-to-r from-[hsl(var(--gold))] to-amber-600 text-black flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg animate-in fade-in slide-in-from-top-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-black/20 p-2.5 rounded-full shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-6 w-6 text-black" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-black uppercase tracking-widest text-sm flex items-center gap-1.5",
						children: ["Prêmio do Bolão Ativado", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-green-900" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-bold opacity-90 leading-snug mt-0.5",
						children: [
							"Você ganhou uma camiseta oficial da seleção",
							" ",
							redeemTeam ? `(${redeemTeam})` : "",
							" + Frete Gratuito"
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					className: "bg-black text-[hsl(var(--gold))] hover:bg-black/90 uppercase font-black px-3 py-1 shadow-sm whitespace-nowrap",
					children: "Voucher Ativo"
				})]
			}),
			selectedCategory === "Todos" && selectedModality === "Todos" && !search && !isRedeeming && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 overflow-x-auto whitespace-nowrap scrollbar-hide -mx-4 px-8 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-block w-[280px] h-[140px] bg-gradient-to-r from-primary to-purple-600 rounded-2xl mr-4 p-4 relative overflow-hidden align-top shadow-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 text-white h-full flex flex-col justify-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-lg mb-1",
								children: "Oferta de Verão"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm opacity-90 mb-3",
								children: "Até 50% OFF em roupas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								className: "w-fit text-xs font-bold",
								children: "Ver Ofertas"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-block w-[280px] h-[140px] bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 relative overflow-hidden align-top shadow-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 text-white h-full flex flex-col justify-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-lg mb-1",
								children: "Suplementos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm opacity-90 mb-3",
								children: "Compre 1 Leve 2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								className: "w-fit text-xs font-bold",
								children: "Aproveitar"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500",
				children: [finalProducts.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: cn("border-none shadow-sm overflow-hidden group cursor-pointer transition-all hover:shadow-md active:scale-[0.98]", product.isPremium ? "ring-1 ring-[hsl(var(--gold))/0.5]" : "", product.id === "prize-1" ? "ring-2 ring-[hsl(var(--gold))] shadow-[0_0_15px_hsl(var(--gold)/0.3)] scale-[1.02] transform origin-bottom" : ""),
					onClick: () => {
						if (product.id === "prize-1") handleClaim({ stopPropagation: () => {} });
						else navigate(`/marketplace/product/${product.id}`);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "aspect-square bg-secondary/30 relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: product.image,
								alt: product.name,
								className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
								onError: (e) => {
									e.currentTarget.style.display = "none";
									e.currentTarget.nextElementSibling?.classList.remove("hidden");
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hidden absolute inset-0 bg-secondary flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageOff, { className: "h-8 w-8 text-muted-foreground/30" })
							}),
							product.id === "prize-1" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-2 right-2 bg-background/90 backdrop-blur rounded-full px-1.5 py-0.5 flex items-center gap-1 z-20 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold",
									children: product.rating
								})]
							}),
							product.id === "prize-1" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-2 left-2 bg-[hsl(var(--gold))] text-black rounded px-1.5 py-0.5 text-[10px] font-black uppercase tracking-widest z-20 shadow-sm flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-3 h-3" }), " Prêmio"]
							}) : product.isPremium && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-2 left-2 bg-[hsl(var(--gold))] text-black rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider z-20 shadow-sm",
								children: "Premium"
							}),
							product.id === "prize-1" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute bottom-2 left-0 right-0 flex justify-center z-20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "bg-green-500 text-white border-none text-[10px] font-black uppercase tracking-widest px-2 py-0.5 shadow-md",
									children: "Frete Grátis"
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-[10px] uppercase tracking-wider font-medium", product.id === "prize-1" ? "text-[hsl(var(--gold))]" : "text-muted-foreground"),
									children: product.category
								}), product.availability === "low_stock" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] text-red-500 font-bold uppercase",
									children: "Últimas un."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-sm mb-2 line-clamp-2 leading-tight min-h-[40px]",
								children: product.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("font-black text-sm", product.id === "prize-1" ? "text-green-500" : "text-primary"),
										children: product.price === 0 ? "GRÁTIS" : `R$ ${(product.price ?? 0).toFixed(2)}`
									}), product.id === "prize-1" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										className: "h-7 text-[10px] font-black uppercase tracking-widest bg-[hsl(var(--gold))] text-black hover:bg-[hsl(var(--gold))/80] shadow-sm",
										onClick: handleClaim,
										children: "Resgatar"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										className: "h-7 w-7 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors shadow-none shrink-0",
										onClick: (e) => {
											e.stopPropagation();
											navigate(`/marketplace/product/${product.id}`);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-3.5 w-3.5" })
									})]
								}), product.pointsPrice > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[10px] text-muted-foreground flex items-center gap-1",
									children: [
										"ou",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-[hsl(var(--gold))]",
											children: [product.pointsPrice, " pts"]
										})
									]
								})]
							})
						]
					})]
				}, product.id)), finalProducts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-2 md:col-span-3 lg:col-span-4 flex flex-col items-center justify-center py-16 text-muted-foreground text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-16 w-16 bg-secondary rounded-full flex items-center justify-center mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-8 w-8 text-muted-foreground/50" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: "Nenhum produto encontrado."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm opacity-70 mb-4",
							children: "Tente mudar os filtros ou sua busca."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => {
								setSelectedCategory("Todos");
								setSelectedModality("Todos");
								setSearch("");
								if (isRedeeming) navigate("/marketplace");
							},
							children: "Limpar filtros"
						})
					]
				})]
			})
		]
	});
}
export { Marketplace as default };

//# sourceMappingURL=Marketplace-ClnD6XVQ.js.map