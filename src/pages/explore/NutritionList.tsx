import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Star, MapPin, CreditCard } from 'lucide-react'
import { mockNutrition, mockHortifrutis } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { DigitalCard } from '@/components/DigitalCard'

export default function NutritionList() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background z-20 p-4 border-b border-border/50 shadow-sm backdrop-blur-md bg-background/95">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Nutrição e Alimentação</h1>
          <DigitalCard type="market" title="Hortifruti Pass">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:bg-primary/10 rounded-full"
            >
              <CreditCard className="h-5 w-5" />
            </Button>
          </DigitalCard>
        </div>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar nutricionistas ou lojas..."
            className="pl-9 bg-secondary border-none rounded-xl"
          />
        </div>
      </div>

      <Tabs defaultValue="nutritionists" className="w-full px-4 pt-4">
        <TabsList className="w-full grid grid-cols-2 mb-4 bg-secondary/50 rounded-xl p-1 h-auto">
          <TabsTrigger
            value="nutritionists"
            className="rounded-lg font-bold py-2"
          >
            Nutricionistas
          </TabsTrigger>
          <TabsTrigger
            value="hortifrutis"
            className="rounded-lg font-bold py-2"
          >
            Hortifrutis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="nutritionists" className="space-y-4 mt-0">
          {mockNutrition.map((nutri) => (
            <Card
              key={nutri.id}
              className="border-none shadow-md cursor-pointer hover:bg-secondary/20 transition-all hover:scale-[1.01]"
              onClick={() => navigate(`/nutrition/${nutri.id}`)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-border/50">
                  <AvatarImage src={nutri.image} />
                  <AvatarFallback>{nutri.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-bold text-base leading-tight">
                    {nutri.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mt-0.5">
                    {nutri.specialty}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1.5">
                    <Star className="h-3.5 w-3.5 text-gold fill-gold" />
                    <span className="font-semibold text-foreground">
                      {nutri.rating}
                    </span>
                    <span>• {nutri.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {mockNutrition.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-8">
              Nenhum nutricionista encontrado.
            </p>
          )}
        </TabsContent>

        <TabsContent value="hortifrutis" className="space-y-4 mt-0">
          {mockHortifrutis.map((shop) => (
            <Card
              key={shop.id}
              className="border-none shadow-md cursor-pointer overflow-hidden hover:bg-secondary/20 transition-all hover:scale-[1.01]"
              onClick={() => navigate(`/hortifrutis/${shop.id}`)}
            >
              <div className="h-36 w-full relative">
                <img
                  src={shop.image}
                  className="w-full h-full object-cover"
                  alt={shop.name}
                />
                <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-md px-2 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                  <Star className="h-3 w-3 text-gold fill-gold" />
                  {shop.rating}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg leading-tight">{shop.name}</h3>
                <p className="text-sm text-primary font-medium mt-0.5">
                  {shop.specialty}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                  <MapPin className="h-3.5 w-3.5" /> {shop.address}
                </div>
                <div className="mt-3 pt-3 border-t border-border/50 flex justify-between items-center">
                  <span className="text-xs font-medium text-muted-foreground">
                    Cesta a partir de
                  </span>
                  <span className="font-bold text-sm text-foreground">
                    {shop.price}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
          {mockHortifrutis.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-8">
              Nenhum parceiro encontrado.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
