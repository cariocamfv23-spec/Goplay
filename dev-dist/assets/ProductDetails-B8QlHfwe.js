import { t as CircleAlert } from "./circle-alert-BiegFr7l.js";
import "./circle-check-JgAsqCmc.js";
import { t as PaymentDialog } from "./PaymentDialog-Bc0L3chi.js";
import { t as ImageOff } from "./image-off-C_W-5Zye.js";
import { t as Share2 } from "./share-2-nPINnZcQ.js";
import { t as Truck } from "./truck-CoMcaEZ4.js";
import "./wallet-MxEuttO8.js";
import { Bn as ShieldCheck, In as Star, Ir as ArrowLeft, On as Trophy, R as Badge, Rn as ShoppingCart, an as Button, ci as useParams, ei as require_jsx_runtime, si as useNavigate, y as useCartStore, yt as mockProducts } from "./index-BZQsESE3.js";
import "./label-BxFLwCzV.js";
import "./input-Cs6U_5da.js";
import "./tabs-BJHD0rCl.js";
import { n as CarouselContent, r as CarouselItem, t as Carousel } from "./carousel-CtNGlvmf.js";
var import_jsx_runtime = require_jsx_runtime();
function ProductDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { addToCart } = useCartStore();
	const product = mockProducts.find((p) => p.id === id);
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-20 w-20 bg-destructive/10 rounded-full flex items-center justify-center mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-10 w-10 text-destructive" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold mb-2",
				children: "Produto não encontrado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mb-6",
				children: "O produto que você está procurando não existe ou foi removido."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => navigate("/marketplace"),
				children: "Voltar para Loja"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-32 animate-fade-in relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 z-20 flex justify-between p-4 bg-transparent pointer-events-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "icon",
					className: "pointer-events-auto rounded-full shadow-md bg-background/80 backdrop-blur-md border border-white/10 hover:bg-background",
					onClick: () => navigate(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 pointer-events-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "icon",
						className: "rounded-full shadow-md bg-background/80 backdrop-blur-md border border-white/10 hover:bg-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "icon",
						className: "rounded-full shadow-md bg-background/80 backdrop-blur-md border border-white/10 hover:bg-background",
						onClick: () => navigate("/marketplace/cart"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mt-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Carousel, {
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselContent, { children: product.images?.length > 0 ? product.images.map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "h-[450px] bg-secondary/10 flex items-center justify-center p-8 relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img,
							alt: product.name,
							className: "w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-opacity duration-300",
							onError: (e) => {
								e.currentTarget.style.display = "none";
								e.currentTarget.nextElementSibling?.classList.remove("hidden");
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageOff, { className: "h-20 w-20 mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: "Imagem indisponível"
							})]
						})]
					}) }, i)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[450px] bg-secondary/10 flex items-center justify-center p-8 relative",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-center text-muted-foreground/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageOff, { className: "h-20 w-20 mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: "Sem imagens"
							})]
						})
					}) }) })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 pt-2 pb-6 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 flex-1 pr-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: "text-[10px] uppercase tracking-wider",
										children: product.modality
									}), product.isPremium && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: "bg-gold text-black hover:bg-gold/90 border-none text-[10px] uppercase tracking-wider",
										children: "Premium"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl font-bold leading-tight",
									children: product.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-muted-foreground text-sm",
									children: [
										"Vendido por",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-foreground",
											children: product.seller
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col items-end pt-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 text-sm font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-amber-500" }),
									" ",
									product.rating
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card p-4 rounded-xl border border-border shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground text-sm",
								children: "Preço"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-2xl font-bold text-primary",
								children: ["R$ ", product.price.toFixed(2)]
							})]
						}), product.pointsPrice > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center pt-3 mt-2 border-t border-border/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground text-xs flex items-center gap-1.5 uppercase tracking-wide font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-3.5 w-3.5 text-gold" }), " Com Pontos"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-lg font-bold text-gold",
								children: [product.pointsPrice, " pts"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-md font-medium border border-emerald-100 dark:border-emerald-800/30",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-3.5 w-3.5" }), " Frete Grátis"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-md font-medium border border-blue-100 dark:border-blue-800/30",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), " Garantia Oficial"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: product.availability === "in_stock" ? "outline" : "destructive",
								className: "text-[10px] py-1.5 px-3",
								children: product.availability === "in_stock" ? "Em Estoque" : "Poucas Unidades"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-lg mb-3",
							children: "Descrição"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground leading-relaxed",
							children: product.description
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed bottom-0 left-0 right-0 p-4 pb-6 bg-background/90 backdrop-blur-xl border-t border-border shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 max-w-lg mx-auto w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "flex-1 h-11 rounded-xl font-bold border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all text-xs active:scale-95",
						onClick: () => addToCart(product),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "mr-2 h-4 w-4" }), "Adicionar"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDialog, {
						title: product.name,
						price: product.price,
						pointsPrice: product.pointsPrice,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "flex-1 h-11 rounded-xl font-bold text-xs shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground active:scale-95 transition-all",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mr-2 h-4 w-4" }), "Comprar Agora"]
						})
					})]
				})
			})
		]
	});
}
export { ProductDetails as default };

//# sourceMappingURL=ProductDetails-B8QlHfwe.js.map