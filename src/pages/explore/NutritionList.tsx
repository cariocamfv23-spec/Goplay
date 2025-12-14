import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Star, MapPin } from 'lucide-react'
import { mockNutrition, mockHortifrutis } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function NutritionList() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background z-20 p-4 border-b border-border/50">
        <h1 className="text-xl font-bold mb-4">Nutrição e Alimentação</h1>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar nutricionistas ou lojas..."
            className="pl-9 bg-secondary border-none rounded-xl"
          />
        </div>
      </div>

      <Tabs defaultValue="nutritionists" className="w-full px-4">
        <TabsList className="w-full grid grid-cols-2 mb-4 bg-secondary/50 rounded-xl p-1">
          <TabsTrigger value="nutritionists" className="rounded-lg font-bold">
            Nutricionistas
          </TabsTrigger>
          <TabsTrigger value="hortifrutis" className="rounded-lg font-bold">
            Hortifrutis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="nutritionists" className="space-y-4 mt-0">
          {mockNutrition.map((nutri) => (
            <Card
              key={nutri.id}
              className="border-none shadow-md cursor-pointer hover:bg-secondary/20 transition-colors"
              onClick={() => navigate(`/nutrition/${nutri.id}`)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={nutri.image} />
                  <AvatarFallback>{nutri.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">{nutri.name}</h3>
                  <p className="text-sm text-primary font-medium">
                    {nutri.specialty}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <Star className="h-3 w-3 text-gold fill-gold" />{' '}
                    {nutri.rating}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="hortifrutis" className="space-y-4 mt-0">
          {mockHortifrutis.map((shop) => (
            <Card
              key={shop.id}
              className="border-none shadow-md cursor-pointer overflow-hidden hover:bg-secondary/20 transition-colors"
              onClick={() => navigate(`/hortifrutis/${shop.id}`)}
            >
              <div className="h-32 w-full relative">
                <img
                  src={shop.image}
                  className="w-full h-full object-cover"
                  alt={shop.name}
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold">{shop.name}</h3>
                <p className="text-sm text-primary font-medium">
                  {shop.specialty}
                </p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                  <MapPin className="h-3 w-3" /> {shop.address}
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-3 w-3 text-gold fill-gold" />{' '}
                    {shop.rating}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
