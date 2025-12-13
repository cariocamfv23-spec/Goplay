import { useNavigate } from 'react-router-dom'
import { mockNutritionPartners } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Leaf, Star, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function NutritionList() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="p-4 border-b flex items-center gap-4 sticky top-0 bg-background z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-500" /> Nutrição Esportiva
        </h1>
      </div>

      <div className="p-4 grid gap-4">
        {mockNutritionPartners.map((partner) => (
          <Card
            key={partner.id}
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/nutrition/${partner.id}`)}
          >
            <div className="relative h-40">
              <img
                src={`https://img.usecurling.com/p/600/400?q=${partner.img}&dpr=2`}
                alt={partner.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-white/90 text-black hover:bg-white">
                  <Star className="h-3 w-3 fill-gold text-gold mr-1" />
                  {partner.rating}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-1">{partner.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <MapPin className="h-3 w-3 mr-1" /> {partner.location}
              </div>
              <div className="flex flex-wrap gap-2">
                {partner.specialties.map((spec) => (
                  <Badge
                    key={spec}
                    variant="secondary"
                    className="text-xs font-normal"
                  >
                    {spec}
                  </Badge>
                ))}
              </div>
              <div className="mt-3 text-sm font-medium text-green-600">
                {partner.discount}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
