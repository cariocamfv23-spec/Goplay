import { mockProducts, mockFinancialSummary } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search,
  ShoppingCart,
  Star,
  Filter,
  Trophy,
  Wallet,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function Marketplace() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedModality, setSelectedModality] = useState('Todos')

  const categories = [
    'Todos',
    'Vestuário',
    'Calçados',
    'Equipamentos',
    'Suplementos',
    'Acessórios',
  ]

  const modalities = [
    'Todos',
    'Futebol',
    'Basquete',
    'Fitness',
    'Corrida',
    'Vôlei',
  ]

  const filteredProducts = mockProducts.filter((product) => {
    const matchCat =
      selectedCategory === 'Todos' || product.category === selectedCategory
    const matchMod =
      selectedModality === 'Todos' || product.modality === selectedModality
    return matchCat && matchMod
  })

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header with Balance */}
      <div className="sticky top-0 bg-background/95 backdrop-blur z-20 border-b border-border/50">
        <div className="p-4">
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

          <div className="flex gap-2 mb-4">
            <div className="flex-1 bg-secondary/50 rounded-lg p-2 flex items-center gap-2 border border-border/50">
              <Wallet className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold">
                R$ {mockFinancialSummary.balance.toFixed(2)}
              </span>
            </div>
            <div className="flex-1 bg-secondary/50 rounded-lg p-2 flex items-center gap-2 border border-border/50">
              <Trophy className="h-4 w-4 text-gold" />
              <span className="text-xs font-bold">
                {mockFinancialSummary.pointsBalance} pts
              </span>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              className="pl-9 bg-secondary border-none rounded-xl"
            />
          </div>
        </div>

        {/* Categories Pills */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="rounded-full text-xs h-8 whitespace-nowrap"
            >
              {cat}
            </Button>
          ))}
        </div>
        {/* Modalities Pills */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide border-t border-border/30 pt-3">
          <Filter className="h-3 w-3 text-muted-foreground self-center mr-1" />
          {modalities.map((mod) => (
            <Button
              key={mod}
              variant={selectedModality === mod ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedModality(mod)}
              className={cn(
                'rounded-full text-xs h-7 whitespace-nowrap',
                selectedModality === mod
                  ? 'bg-secondary font-bold'
                  : 'text-muted-foreground',
              )}
            >
              {mod}
            </Button>
          ))}
        </div>
      </div>

      {/* Banners */}
      {selectedCategory === 'Todos' && selectedModality === 'Todos' && (
        <div className="p-4 overflow-x-auto whitespace-nowrap scrollbar-hide -mx-4 px-8 pb-2">
          <div className="inline-block w-[280px] h-[140px] bg-gradient-to-r from-primary to-purple-600 rounded-2xl mr-4 p-4 relative overflow-hidden align-top">
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
          </div>
          <div className="inline-block w-[280px] h-[140px] bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 relative overflow-hidden align-top">
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
      )}

      {/* Product Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className={cn(
              'border-none shadow-sm overflow-hidden group cursor-pointer transition-all hover:shadow-md',
              product.isPremium ? 'ring-1 ring-gold/50' : '',
            )}
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
              {product.isPremium && (
                <div className="absolute top-2 left-2 bg-gold text-black rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  Premium
                </div>
              )}
            </div>
            <CardContent className="p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {product.category}
                </span>
              </div>
              <h3 className="font-bold text-sm mb-2 line-clamp-1">
                {product.name}
              </h3>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary text-sm">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <Button
                    size="icon"
                    className="h-6 w-6 rounded-full bg-primary text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/marketplace/product/${product.id}`)
                    }}
                  >
                    <ShoppingCart className="h-3 w-3" />
                  </Button>
                </div>
                {product.pointsPrice > 0 && (
                  <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                    ou{' '}
                    <span className="font-bold text-gold">
                      {product.pointsPrice} pts
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-2 text-center py-10 text-muted-foreground">
            <p>Nenhum produto encontrado.</p>
            <Button
              variant="link"
              onClick={() => {
                setSelectedCategory('Todos')
                setSelectedModality('Todos')
              }}
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
