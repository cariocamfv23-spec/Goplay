import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Dumbbell, Star, MapPin } from 'lucide-react'
import { mockGyms } from '@/lib/data'
import { useNavigate } from 'react-router-dom'

export default function GymsList() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background z-20 p-4 border-b border-border/50">
        <h1 className="text-xl font-bold mb-4">Academias e CTs</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar academias..."
            className="pl-9 bg-secondary border-none rounded-xl"
          />
        </div>
      </div>
      <div className="p-4 space-y-4">
        {mockGyms.map((gym) => (
          <Card
            key={gym.id}
            className="overflow-hidden border-none shadow-md cursor-pointer"
            onClick={() => navigate(`/gyms/${gym.id}`)}
          >
            <div className="h-40 relative">
              <img
                src={gym.image}
                className="w-full h-full object-cover"
                alt={gym.name}
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between">
                <h3 className="font-bold text-lg">{gym.name}</h3>
                <div className="flex items-center gap-1 text-gold font-bold">
                  <Star className="h-4 w-4 fill-gold" /> {gym.rating}
                </div>
              </div>
              <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" /> {gym.address}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
