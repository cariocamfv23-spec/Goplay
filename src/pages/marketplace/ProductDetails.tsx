import { useParams, useNavigate } from 'react-router-dom'
import { mockProducts } from '@/lib/data'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Share2,
  ShieldCheck,
  Truck,
  Trophy,
  ImageOff,
  AlertCircle,
} from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { PaymentDialog } from '@/components/PaymentDialog'
import { useCartStore } from '@/stores/useCartStore'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCartStore()

  // Improved Safety Check
  const product = mockProducts.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="h-20 w-20 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        <h2 className="text-xl font-bold mb-2">Produto não encontrado</h2>
        <p className="text-muted-foreground mb-6">
          O produto que você está procurando não existe ou foi removido.
        </p>
        <Button onClick={() => navigate('/marketplace')}>
          Voltar para Loja
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-32 animate-fade-in relative">
      <div className="sticky top-0 z-20 flex justify-between p-4 bg-transparent pointer-events-none">
        <Button
          variant="secondary"
          size="icon"
          className="pointer-events-auto rounded-full shadow-md bg-background/80 backdrop-blur-md border border-white/10 hover:bg-background"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex gap-2 pointer-events-auto">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-md bg-background/80 backdrop-blur-md border border-white/10 hover:bg-background"
          >
            <Share2 className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-md bg-background/80 backdrop-blur-md border border-white/10 hover:bg-background"
            onClick={() => navigate('/marketplace/cart')}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="-mt-20">
        <Carousel className="w-full">
          <CarouselContent>
            {product.images?.length > 0 ? (
              product.images.map((img, i) => (
                <CarouselItem key={i}>
                  <div className="h-[450px] bg-secondary/10 flex items-center justify-center p-8 relative">
                    <img
                      src={img}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-opacity duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.nextElementSibling?.classList.remove(
                          'hidden',
                        )
                      }}
                    />
                    {/* Fallback container */}
                    <div className="hidden absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/40">
                      <ImageOff className="h-20 w-20 mb-2" />
                      <p className="text-sm">Imagem indisponível</p>
                    </div>
                  </div>
                </CarouselItem>
              ))
            ) : (
              // Fallback if images array is empty
              <CarouselItem>
                <div className="h-[450px] bg-secondary/10 flex items-center justify-center p-8 relative">
                  <div className="flex flex-col items-center justify-center text-muted-foreground/40">
                    <ImageOff className="h-20 w-20 mb-2" />
                    <p className="text-sm">Sem imagens</p>
                  </div>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="px-5 pt-2 pb-6 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2 flex-1 pr-4">
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className="text-[10px] uppercase tracking-wider"
              >
                {product.modality}
              </Badge>
              {product.isPremium && (
                <Badge className="bg-gold text-black hover:bg-gold/90 border-none text-[10px] uppercase tracking-wider">
                  Premium
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold leading-tight">{product.name}</h1>
            <p className="text-muted-foreground text-sm">
              Vendido por{' '}
              <span className="font-medium text-foreground">
                {product.seller}
              </span>
            </p>
          </div>
          <div className="flex flex-col items-end pt-1">
            <div className="flex items-center gap-1 text-sm font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full">
              <Star className="h-3.5 w-3.5 fill-amber-500" /> {product.rating}
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="text-muted-foreground text-sm">Preço</span>
            <span className="text-2xl font-bold text-primary">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
          {product.pointsPrice > 0 && (
            <div className="flex justify-between items-center pt-3 mt-2 border-t border-border/50">
              <span className="text-muted-foreground text-xs flex items-center gap-1.5 uppercase tracking-wide font-medium">
                <Trophy className="h-3.5 w-3.5 text-gold" /> Com Pontos
              </span>
              <span className="text-lg font-bold text-gold">
                {product.pointsPrice} pts
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-md font-medium border border-emerald-100 dark:border-emerald-800/30">
            <Truck className="h-3.5 w-3.5" /> Frete Grátis
          </div>
          <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-md font-medium border border-blue-100 dark:border-blue-800/30">
            <ShieldCheck className="h-3.5 w-3.5" /> Garantia Oficial
          </div>
          <Badge
            variant={
              product.availability === 'in_stock' ? 'outline' : 'destructive'
            }
            className="text-[10px] py-1.5 px-3"
          >
            {product.availability === 'in_stock'
              ? 'Em Estoque'
              : 'Poucas Unidades'}
          </Badge>
        </div>

        <div className="pt-2">
          <h3 className="font-bold text-lg mb-3">Descrição</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 pb-6 bg-background/90 backdrop-blur-xl border-t border-border shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-50">
        <div className="flex gap-3 max-w-lg mx-auto w-full">
          <Button
            variant="outline"
            className="flex-1 h-11 rounded-xl font-bold border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all text-xs active:scale-95"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
          <PaymentDialog
            title={product.name}
            price={product.price}
            pointsPrice={product.pointsPrice}
          >
            <Button className="flex-1 h-11 rounded-xl font-bold text-xs shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground active:scale-95 transition-all">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Comprar Agora
            </Button>
          </PaymentDialog>
        </div>
      </div>
    </div>
  )
}
