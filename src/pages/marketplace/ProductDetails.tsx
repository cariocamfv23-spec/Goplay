import { useParams, useNavigate } from 'react-router-dom'
import { mockProducts } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Star, ShoppingCart, Heart } from 'lucide-react'
import { toast } from 'sonner'

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
            (120 avaliações)
          </span>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="font-bold text-lg">Descrição</h3>
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
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
