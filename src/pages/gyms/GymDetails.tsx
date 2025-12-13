import { useParams, useNavigate } from 'react-router-dom'
import { mockGyms } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MapPin, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function GymDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const gym = mockGyms.find((g) => g.id === id) || mockGyms[0]

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="relative h-64">
        <img
          src={gym.image}
          className="w-full h-full object-cover"
          alt={gym.name}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-background/50 rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-bold">{gym.name}</h1>
          <div className="flex items-center gap-1 font-bold text-gold">
            <Star className="h-4 w-4 fill-gold" /> {gym.rating}
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4 flex items-center gap-1">
          <MapPin className="h-4 w-4" /> {gym.address}
        </p>
        <Badge className="mb-6">{gym.type}</Badge>

        <Button className="w-full h-12 text-lg font-bold rounded-xl">
          Matricular - {gym.price}
        </Button>
      </div>
    </div>
  )
}
