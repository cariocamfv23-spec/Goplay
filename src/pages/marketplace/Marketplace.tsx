import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Star,
  ShoppingCart,
  Search,
  Gift,
  Trophy,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockProducts, mockCourts, mockProfiles, mockRewards } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

const Marketplace = () => {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [redeemProduct, setRedeemProduct] = useState<any | null>(null)

  const productCategories = ['Todos', 'Equipamentos', 'Nutrição', 'Wearables']

  const filteredProducts =
    activeCategory === 'Todos'
      ? mockProducts
      : mockProducts.filter((p) => p.category === activeCategory)

  const handleRedeem = () => {
    toast.success('Resgate Realizado com Sucesso!', {
      description: `Você resgatou ${redeemProduct.name}. Verifique seu email.`,
      icon: <Sparkles className="h-5 w-5 text-gold" />,
    })
    setRedeemProduct(null)
  }

  return (
    <div className="pb-24 bg-background min-h-screen">
      <div className="bg-background sticky top-14 z-20 shadow-sm">
        <div className="p-4 pb-0 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Loja & Prêmios</h1>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full border-primary/20 bg-primary/5 hover:bg-primary/10"
              onClick={() => navigate('/marketplace/cart')}
            >
              <ShoppingCart className="h-5 w-5 text-primary" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-4 h-12 overflow-x-auto">
            <TabsTrigger
              value="products"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Produtos
            </TabsTrigger>
            <TabsTrigger
              value="rewards"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none flex items-center gap-1"
            >
              <Gift className="h-3 w-3" /> Prêmios
            </TabsTrigger>
            <TabsTrigger
              value="courts"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Quadras
            </TabsTrigger>
            <TabsTrigger
              value="services"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Serviços
            </TabsTrigger>
          </TabsList>

          <div className="p-4">
            <TabsContent value="products" className="mt-0">
              <ScrollArea className="w-full whitespace-nowrap mb-4">
                <div className="flex space-x-2 pb-2">
                  {productCategories.map((cat) => (
                    <Badge
                      key={cat}
                      variant={activeCategory === cat ? 'default' : 'outline'}
                      className="cursor-pointer px-4 py-1.5"
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="invisible" />
              </ScrollArea>

              <div className="grid grid-cols-2 gap-4">
                {filteredProducts.map((prod) => (
                  <Card
                    key={prod.id}
                    className="overflow-hidden border-none shadow-sm cursor-pointer hover:shadow-lg transition-all group bg-card"
                    onClick={() => navigate(`/marketplace/product/${prod.id}`)}
                  >
                    <div className="aspect-square bg-secondary relative overflow-hidden">
                      <img
                        src={`https://img.usecurling.com/p/300/300?q=${prod.img}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={prod.name}
                      />
                      <button className="absolute bottom-2 right-2 h-8 w-8 bg-white/90 rounded-full shadow flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                    </div>
                    <CardContent className="p-3">
                      <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wide mb-1">
                        {prod.category}
                      </div>
                      <h3 className="font-semibold text-sm truncate leading-tight mb-1">
                        {prod.name}
                      </h3>
                      <div className="flex items-center gap-1 text-gold text-xs mb-2">
                        <Star className="h-3 w-3 fill-current" /> {prod.rating}
                      </div>
                      <div className="font-bold text-primary">{prod.price}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rewards" className="mt-0 space-y-4">
              <div className="bg-gradient-to-r from-primary to-purple-800 rounded-xl p-4 text-white flex justify-between items-center shadow-md">
                <div>
                  <p className="text-xs text-white/80">Seu Saldo</p>
                  <h3 className="text-2xl font-bold">1.250 pts</h3>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-full text-primary font-bold"
                  onClick={() => navigate('/ranking')} // Or logic to earn more
                >
                  <Trophy className="h-4 w-4 mr-1" /> Ganhar Mais
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {mockRewards.map((reward) => (
                  <Card
                    key={reward.id}
                    className="overflow-hidden border border-gold/30 shadow-md group"
                  >
                    <div className="aspect-square bg-secondary relative overflow-hidden">
                      <img
                        src={reward.image}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={reward.name}
                      />
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                        {reward.category}
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-semibold text-sm truncate leading-tight mb-2">
                        {reward.name}
                      </h3>
                      <div className="flex justify-between items-end">
                        <div className="text-primary font-bold text-sm">
                          {reward.points} pts
                        </div>
                        <Button
                          size="sm"
                          className="h-7 px-3 rounded-full bg-gold hover:bg-yellow-500 text-white text-xs"
                          onClick={() => setRedeemProduct(reward)}
                        >
                          Resgatar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="courts" className="mt-0 space-y-4">
              {mockCourts.map((court) => (
                <Card
                  key={court.id}
                  className="overflow-hidden border-none shadow-md flex flex-col md:flex-row group cursor-pointer"
                >
                  <div className="h-40 md:w-48 bg-secondary relative">
                    <img
                      src={`https://img.usecurling.com/p/400/300?q=${court.img}`}
                      className="w-full h-full object-cover"
                      alt={court.name}
                    />
                    <Badge className="absolute top-2 left-2 bg-white/90 text-foreground hover:bg-white">
                      Disponível Hoje
                    </Badge>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg leading-tight">
                          {court.name}
                        </h3>
                        <div className="flex items-center gap-1 text-gold text-xs font-bold bg-gold/10 px-2 py-1 rounded-full">
                          <Star className="h-3 w-3 fill-current" />{' '}
                          {court.rating}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-end mt-3">
                      <span className="font-bold text-primary text-lg">
                        {court.price}
                      </span>
                      <Button size="sm" className="rounded-full px-6">
                        Reservar
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="services" className="mt-0 space-y-3">
              {mockProfiles
                .filter((p) =>
                  [
                    'coach',
                    'photographer',
                    'nutritionist',
                    'physiotherapist',
                  ].includes(p.type),
                )
                .map((pro) => (
                  <Card
                    key={pro.id}
                    className="border-none shadow-sm flex items-center p-3 gap-3"
                    onClick={() => navigate(`/profile/${pro.id}`)}
                  >
                    <div className="h-14 w-14 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={pro.avatar}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm">{pro.name}</h3>
                      <p className="text-xs text-muted-foreground capitalize">
                        {pro.type === 'coach'
                          ? 'Treinador'
                          : pro.type === 'photographer'
                            ? 'Fotógrafo'
                            : pro.type === 'nutritionist'
                              ? 'Nutricionista'
                              : 'Fisioterapeuta'}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Ver
                    </Button>
                  </Card>
                ))}
            </TabsContent>
          </div>
        </Tabs>

        {/* Redemption Dialog */}
        <AlertDialog
          open={!!redeemProduct}
          onOpenChange={(open) => !open && setRedeemProduct(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">
                Confirmar Resgate
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Deseja trocar <b>{redeemProduct?.points} pontos</b> por{' '}
                <b>{redeemProduct?.name}</b>?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex justify-center py-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gold blur-2xl opacity-20" />
                <img
                  src={redeemProduct?.image}
                  className="w-32 h-32 object-cover rounded-xl relative z-10 border-2 border-gold"
                  alt="Product"
                />
              </div>
            </div>
            <AlertDialogFooter className="flex gap-2">
              <AlertDialogCancel className="flex-1 rounded-full">
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                className="flex-1 rounded-full bg-primary hover:bg-primary/90"
                onClick={handleRedeem}
              >
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default Marketplace
