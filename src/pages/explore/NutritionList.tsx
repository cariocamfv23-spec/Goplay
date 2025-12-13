import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Star, MapPin } from 'lucide-react'
import { mockNutrition } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function NutritionList() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background z-20 p-4 border-b border-border/50">
        <h1 className="text-xl font-bold mb-4">Nutricionistas</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar especialistas..."
            className="pl-9 bg-secondary border-none rounded-xl"
          />
        </div>
      </div>
      <div className="p-4 space-y-4">
        {mockNutrition.map((nutri) => (
          <Card
            key={nutri.id}
            className="border-none shadow-md cursor-pointer"
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
      </div>
    </div>
  )
}
