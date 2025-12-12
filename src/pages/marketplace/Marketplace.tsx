import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Star } from 'lucide-react'

const Marketplace = () => {
  const products = [
    {
      id: 1,
      name: 'Chuteira Pro Nike',
      price: 'R$ 450,00',
      rating: 4.8,
      img: 'soccer%20cleats',
    },
    {
      id: 2,
      name: 'Bola Oficial',
      price: 'R$ 120,00',
      rating: 4.5,
      img: 'soccer%20ball',
    },
    {
      id: 3,
      name: 'Camisa Treino',
      price: 'R$ 89,90',
      rating: 4.2,
      img: 'jersey',
    },
    {
      id: 4,
      name: 'Luvas Goleiro',
      price: 'R$ 150,00',
      rating: 4.7,
      img: 'goalkeeper%20gloves',
    },
  ]

  const courts = [
    {
      id: 1,
      name: 'Arena Futsal Centro',
      price: 'R$ 150/h',
      rating: 4.9,
      img: 'futsal%20court',
    },
    {
      id: 2,
      name: 'Quadra Society 10',
      price: 'R$ 200/h',
      rating: 4.6,
      img: 'soccer%20field',
    },
  ]

  return (
    <div className="p-4">
      <Tabs defaultValue="products">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="products">Loja</TabsTrigger>
          <TabsTrigger value="courts">Quadras</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div className="grid grid-cols-2 gap-4">
            {products.map((prod) => (
              <Card
                key={prod.id}
                className="overflow-hidden border-none shadow-sm"
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
            {courts.map((court) => (
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
