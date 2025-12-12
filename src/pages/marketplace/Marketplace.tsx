import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Star, ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockProducts, mockCourts } from '@/lib/data'

const Marketplace = () => {
  const navigate = useNavigate()

  return (
    <div className="p-4 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full"
          onClick={() => navigate('/marketplace/cart')}
        >
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </div>

      <Tabs defaultValue="products">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="products">Loja</TabsTrigger>
          <TabsTrigger value="courts">Quadras</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div className="grid grid-cols-2 gap-4">
            {mockProducts.map((prod) => (
              <Card
                key={prod.id}
                className="overflow-hidden border-none shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/marketplace/product/${prod.id}`)}
              >
                <div className="aspect-square bg-secondary relative">
                  <img
                    src={`https://img.usecurling.com/p/300/300?q=${prod.img}`}
                    className="w-full h-full object-cover"
                    alt={prod.name}
                  />
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm truncate">
                    {prod.name}
                  </h3>
                  <div className="flex items-center gap-1 text-gold text-xs my-1">
                    <Star className="h-3 w-3 fill-current" /> {prod.rating}
                  </div>
                  <div className="font-bold text-primary">{prod.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="courts">
          <div className="space-y-4">
            {mockCourts.map((court) => (
              <Card
                key={court.id}
                className="overflow-hidden border-none shadow-md flex flex-col md:flex-row"
              >
                <div className="h-40 md:w-40 bg-secondary">
                  <img
                    src={`https://img.usecurling.com/p/400/300?q=${court.img}`}
                    className="w-full h-full object-cover"
                    alt={court.name}
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{court.name}</h3>
                    <div className="flex items-center gap-1 text-gold text-sm my-1">
                      <Star className="h-4 w-4 fill-current" /> {court.rating}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-primary">
                      {court.price}
                    </span>
                    <Button size="sm">Reservar</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Marketplace
