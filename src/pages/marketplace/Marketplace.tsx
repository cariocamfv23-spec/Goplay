import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Star, ShoppingCart, Filter } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockProducts, mockCourts, mockProfiles } from '@/lib/data'
import { Badge } from '@/components/ui/badge'

const Marketplace = () => {
  const navigate = useNavigate()

  return (
    <div className="pb-24 bg-background min-h-screen">
      <div className="bg-background sticky top-14 z-20 shadow-sm">
        <div className="p-4 pb-0 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Loja & Serviços</h1>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="rounded-full">
              <Filter className="h-5 w-5" />
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
              <div className="grid grid-cols-2 gap-4">
                {mockProducts.map((prod) => (
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
                .filter((p) => p.type === 'photographer' || p.type === 'coach')
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
                      <p className="text-xs text-muted-foreground">
                        {pro.type === 'coach' ? 'Treinador' : 'Fotógrafo'}
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
      </div>
    </div>
  )
}

export default Marketplace
