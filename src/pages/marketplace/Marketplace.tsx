import { mockProducts } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ShoppingCart, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'

export default function Marketplace() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur z-20 p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Loja Goplay</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/marketplace/cart')}
          >
            <ShoppingCart className="h-6 w-6" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            className="pl-9 bg-secondary border-none rounded-xl"
          />
        </div>
      </div>

      {/* Banners */}
      <div className="p-4 overflow-x-auto whitespace-nowrap scrollbar-hide -mx-4 px-8 pb-2">
        <div className="inline-block w-[300px] h-[150px] bg-gradient-to-r from-primary to-purple-600 rounded-2xl mr-4 p-4 relative overflow-hidden">
          <div className="relative z-10 text-white h-full flex flex-col justify-center">
            <h3 className="font-bold text-lg mb-1">Oferta de Verão</h3>
            <p className="text-sm opacity-90 mb-3">Até 50% OFF em roupas</p>
            <Button
              size="sm"
              variant="secondary"
              className="w-fit text-xs font-bold"
            >
              Ver Ofertas
            </Button>
          </div>
          <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4">
            <ShoppingBagIcon className="w-32 h-32 text-white" />
          </div>
        </div>
        <div className="inline-block w-[300px] h-[150px] bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 relative overflow-hidden">
          <div className="relative z-10 text-white h-full flex flex-col justify-center">
            <h3 className="font-bold text-lg mb-1">Suplementos</h3>
            <p className="text-sm opacity-90 mb-3">Compre 1 Leve 2</p>
            <Button
              size="sm"
              variant="secondary"
              className="w-fit text-xs font-bold"
            >
              Aproveitar
            </Button>
          </div>
        </div>
      </div>

      {/* Categories Pills */}
      <div className="px-4 pb-4 flex gap-2 overflow-x-auto scrollbar-hide">
        {[
          'Todos',
          'Calçados',
          'Roupas',
          'Equipamentos',
          'Suplementos',
          'Acessórios',
        ].map((cat, i) => (
          <Button
            key={cat}
            variant={i === 0 ? 'default' : 'outline'}
            size="sm"
            className="rounded-full text-xs h-8"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {mockProducts.map((product) => (
          <Card
            key={product.id}
            className="border-none shadow-sm overflow-hidden group cursor-pointer"
            onClick={() => navigate(`/marketplace/product/${product.id}`)}
          >
            <div className="aspect-square bg-secondary/30 relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 bg-background/90 backdrop-blur rounded-full px-1.5 py-0.5 flex items-center gap-1">
                <Star className="h-3 w-3 fill-gold text-gold" />
                <span className="text-[10px] font-bold">{product.rating}</span>
              </div>
            </div>
            <CardContent className="p-3">
              <div className="text-[10px] text-muted-foreground mb-1">
                {product.category}
              </div>
              <h3 className="font-bold text-sm mb-2 line-clamp-1">
                {product.name}
              </h3>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">
                  R$ {product.price.toFixed(2)}
                </span>
                <Button
                  size="icon"
                  className="h-6 w-6 rounded-full bg-primary text-white"
                >
                  <ShoppingCart className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ShoppingBagIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}
