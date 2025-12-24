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
  ImageOff,
  X,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function Marketplace() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
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
    'Lutas',
  ]

  const filteredProducts = mockProducts.filter((product) => {
    const searchLower = search.toLowerCase()
    const matchesSearch =
      !search || product.name.toLowerCase().includes(searchLower)
    const matchesCategory =
      selectedCategory === 'Todos' || product.category === selectedCategory
    const matchesModality =
      selectedModality === 'Todos' || product.modality === selectedModality

    return matchesSearch && matchesCategory && matchesModality
  })

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in flex flex-col">
      {/* Header with Balance */}
      <div className="sticky top-0 bg-background/95 backdrop-blur z-20 border-b border-border/50">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Loja Goplay</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/marketplace/cart')}
              className="relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {/* Optional: Add badge for cart items count here */}
            </Button>
          </div>

          <div className="flex gap-2 mb-4">
            <div className="flex-1 bg-secondary/50 rounded-lg p-2 flex items-center gap-2 border border-border/50">
              <Wallet className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold">
                R$ {(mockFinancialSummary?.balance ?? 0).toFixed(2)}
              </span>
            </div>
            <div className="flex-1 bg-secondary/50 rounded-lg p-2 flex items-center gap-2 border border-border/50">
              <Trophy className="h-4 w-4 text-gold" />
              <span className="text-xs font-bold">
                {mockFinancialSummary?.pointsBalance ?? 0} pts
              </span>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              className="pl-9 pr-9 bg-secondary border-none rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            )}
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
          <Filter className="h-3 w-3 text-muted-foreground self-center mr-1 shrink-0" />
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

      {/* Banners - Only show on 'All' view */}
      {selectedCategory === 'Todos' &&
        selectedModality === 'Todos' &&
        !search && (
          <div className="p-4 overflow-x-auto whitespace-nowrap scrollbar-hide -mx-4 px-8 pb-2">
            <div className="inline-block w-[280px] h-[140px] bg-gradient-to-r from-primary to-purple-600 rounded-2xl mr-4 p-4 relative overflow-hidden align-top shadow-md">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
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
            <div className="inline-block w-[280px] h-[140px] bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 relative overflow-hidden align-top shadow-md">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
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
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className={cn(
              'border-none shadow-sm overflow-hidden group cursor-pointer transition-all hover:shadow-md active:scale-[0.98]',
              product.isPremium ? 'ring-1 ring-gold/50' : '',
            )}
            onClick={() => navigate(`/marketplace/product/${product.id}`)}
          >
            <div className="aspect-square bg-secondary/30 relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextElementSibling?.classList.remove('hidden')
                }}
              />
              {/* Fallback container hidden by default */}
              <div className="hidden absolute inset-0 bg-secondary flex items-center justify-center">
                <ImageOff className="h-8 w-8 text-muted-foreground/30" />
              </div>

              <div className="absolute top-2 right-2 bg-background/90 backdrop-blur rounded-full px-1.5 py-0.5 flex items-center gap-1 z-10 shadow-sm">
                <Star className="h-3 w-3 fill-gold text-gold" />
                <span className="text-[10px] font-bold">{product.rating}</span>
              </div>
              {product.isPremium && (
                <div className="absolute top-2 left-2 bg-gold text-black rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider z-10 shadow-sm">
                  Premium
                </div>
              )}
            </div>
            <CardContent className="p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                  {product.category}
                </span>
                {product.availability === 'low_stock' && (
                  <span className="text-[9px] text-red-500 font-bold uppercase">
                    Últimas un.
                  </span>
                )}
              </div>
              <h3 className="font-bold text-sm mb-2 line-clamp-1 leading-tight">
                {product.name}
              </h3>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary text-sm">
                    R$ {(product.price ?? 0).toFixed(2)}
                  </span>
                  <Button
                    size="icon"
                    className="h-7 w-7 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors shadow-none"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/marketplace/product/${product.id}`)
                    }}
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
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
          <div className="col-span-2 md:col-span-3 lg:col-span-4 flex flex-col items-center justify-center py-16 text-muted-foreground text-center">
            <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <p className="font-medium">Nenhum produto encontrado.</p>
            <p className="text-sm opacity-70 mb-4">
              Tente mudar os filtros ou sua busca.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('Todos')
                setSelectedModality('Todos')
                setSearch('')
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
