import { useParams, useNavigate } from 'react-router-dom'
import { mockProducts } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ShoppingCart, Star, Share2 } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = mockProducts.find((p) => p.id === id) || mockProducts[0]

  const handleAddToCart = () => {
    toast.success('Produto adicionado ao carrinho!')
  }

  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in">
      <div className="sticky top-0 z-20 flex justify-between p-4 bg-transparent pointer-events-none">
        <Button
          variant="secondary"
          size="icon"
          className="pointer-events-auto rounded-full shadow-md"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex gap-2 pointer-events-auto">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-md"
          >
            <Share2 className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-md"
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

      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-1">{product.name}</h1>
            <p className="text-muted-foreground">{product.seller}</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-primary">
              R$ {product.price.toFixed(2)}
            </h2>
            <div className="flex items-center gap-1 justify-end text-sm font-bold text-gold">
              <Star className="h-4 w-4 fill-gold" /> {product.rating}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Badge variant="secondary" className="px-3 py-1">
            Frete Grátis
          </Badge>
          <Badge
            variant="outline"
            className="px-3 py-1 text-green-600 border-green-200 bg-green-50"
          >
            Em Estoque
          </Badge>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">Descrição</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border/50">
        <Button
          size="lg"
          className="w-full h-14 rounded-full text-lg font-bold"
          onClick={handleAddToCart}
        >
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  )
}
