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
} from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { PaymentDialog } from '@/components/PaymentDialog'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/stores/useCartStore'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = mockProducts.find((p) => p.id === id) || mockProducts[0]
  const { addToCart } = useCartStore()

  return (
    <div className="min-h-screen bg-background pb-32 animate-fade-in relative">
      <div className="sticky top-0 z-20 flex justify-between p-4 bg-transparent pointer-events-none">
        <Button
          variant="secondary"
          size="icon"
          className="pointer-events-auto rounded-full shadow-md bg-background/80 backdrop-blur"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex gap-2 pointer-events-auto">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-md bg-background/80 backdrop-blur"
          >
            <Share2 className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-md bg-background/80 backdrop-blur"
            onClick={() => navigate('/marketplace/cart')}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="-mt-20">
        <Carousel className="w-full">
          <CarouselContent>
            {product.images?.map((img, i) => (
              <CarouselItem key={i}>
                <div className="h-[400px] bg-secondary/20 flex items-center justify-center p-8">
                  <img
                    src={img}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="p-5 space-y-5">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className="text-[10px] uppercase tracking-wider"
              >
                {product.modality}
              </Badge>
              {product.isPremium && (
                <Badge className="bg-gold text-black text-[10px] uppercase tracking-wider">
                  Premium
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold mb-1">{product.name}</h1>
            <p className="text-muted-foreground text-sm">{product.seller}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-sm font-bold text-gold bg-gold/10 px-2 py-0.5 rounded-full mb-1">
              <Star className="h-3.5 w-3.5 fill-gold" /> {product.rating}
            </div>
          </div>
        </div>

        <div className="bg-secondary/20 p-4 rounded-xl border border-border/50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground text-sm">Preço</span>
            <span className="text-2xl font-bold text-primary">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
          {product.pointsPrice > 0 && (
            <div className="flex justify-between items-center pt-2 border-t border-border/50">
              <span className="text-muted-foreground text-sm flex items-center gap-1">
                <Trophy className="h-3 w-3" /> Pontos
              </span>
              <span className="text-lg font-bold text-gold">
                {product.pointsPrice} pts
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2 text-xs">
          <div className="flex items-center gap-1 text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
            <Truck className="h-3 w-3" /> Frete Grátis
          </div>
          <div className="flex items-center gap-1 text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
            <ShieldCheck className="h-3 w-3" /> Garantia Oficial
          </div>
          <Badge
            variant={
              product.availability === 'in_stock' ? 'outline' : 'destructive'
            }
            className="text-[10px]"
          >
            {product.availability === 'in_stock'
              ? 'Em Estoque'
              : 'Poucas Unidades'}
          </Badge>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">Descrição</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 pb-6 bg-background/80 backdrop-blur-md border-t border-border/50 flex gap-3 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-50">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 h-12 rounded-xl font-bold border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all text-xs sm:text-sm"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          <span className="truncate">Adicionar ao Carrinho</span>
        </Button>
        <PaymentDialog
          title={product.name}
          price={product.price}
          pointsPrice={product.pointsPrice}
        >
          <Button
            size="lg"
            className="flex-[1.5] h-12 rounded-xl font-bold text-sm sm:text-base shadow-lg bg-primary hover:bg-primary/90 text-white"
          >
            <ShieldCheck className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Comprar Agora
          </Button>
        </PaymentDialog>
      </div>
    </div>
  )
}
