import { useParams, useNavigate } from 'react-router-dom'
import { mockProducts } from '@/lib/data'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  MessageSquare,
} from 'lucide-react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = mockProducts.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Produto não encontrado
      </div>
    )
  }

  const handleAddToCart = () => {
    toast.success('Produto adicionado ao carrinho!')
    navigate('/marketplace/cart')
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative h-96 bg-secondary">
        <img
          src={`https://img.usecurling.com/p/600/600?q=${product.img}`}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/80 backdrop-blur-sm rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/80 backdrop-blur-sm rounded-full"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-6 -mt-6 bg-background rounded-t-3xl relative">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
          <div className="text-2xl font-bold text-primary">{product.price}</div>
        </div>

        <div className="flex items-center gap-1 mb-6">
          <Star className="h-4 w-4 fill-gold text-gold" />
          <span className="font-medium">{product.rating}</span>
          <span className="text-muted-foreground text-sm ml-2">
            ({product.reviews?.length || 120} avaliações)
          </span>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="font-bold text-lg">Descrição</h3>
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Reviews Section */}
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            Avaliações dos Usuários
          </h3>

          <div className="bg-secondary/20 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="text-center">
                <span className="text-3xl font-bold text-primary">
                  {product.rating}
                </span>
                <div className="flex text-gold text-xs">
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span>5</span> <Progress value={80} className="h-1.5" />
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span>4</span> <Progress value={15} className="h-1.5" />
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span>3</span> <Progress value={5} className="h-1.5" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-border/50 pb-4 last:border-0"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>{review.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">{review.user}</p>
                        <div className="flex text-gold text-[10px]">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {review.date}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {review.comment}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                Seja o primeiro a avaliar este produto!
              </p>
            )}
          </div>
        </div>

        <Button
          className="w-full h-14 rounded-full text-lg shadow-lg shadow-primary/20"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-5 w-5" /> Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  )
}
