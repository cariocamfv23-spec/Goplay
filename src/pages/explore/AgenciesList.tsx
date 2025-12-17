import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Search,
  MapPin,
  Plane,
  Star,
  Globe,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { mockAgencies } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function AgenciesList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filteredAgencies = mockAgencies.filter(
    (agency) =>
      agency.name.toLowerCase().includes(search.toLowerCase()) ||
      agency.description.toLowerCase().includes(search.toLowerCase()) ||
      agency.location.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border/50">
        <div className="p-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="-ml-2 hover:bg-secondary/50 rounded-full"
            onClick={() => navigate('/explore')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="bg-sky-100 dark:bg-sky-900/30 p-1.5 rounded-lg">
              <Plane className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            </div>
            <h1 className="font-bold text-lg">Agências de Intercâmbio</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar agências, programas ou países..."
              className="pl-9 bg-secondary border-none rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* List */}
      <div className="p-4 space-y-4">
        {filteredAgencies.length === 0 ? (
          <div className="text-center py-10 opacity-60">
            <Plane className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="text-lg font-medium">Nenhuma agência encontrada</h3>
            <p className="text-sm">Tente ajustar seus termos de busca.</p>
          </div>
        ) : (
          filteredAgencies.map((agency) => (
            <Card
              key={agency.id}
              className="overflow-hidden border-none shadow-sm cursor-pointer hover:shadow-md transition-all group active:scale-[0.98]"
              onClick={() => navigate(`/explore/agencies/${agency.id}`)}
            >
              <div className="h-32 relative">
                <img
                  src={agency.cover}
                  alt={agency.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                {/* Logo Overlay */}
                <div className="absolute -bottom-4 left-4">
                  <div className="w-12 h-12 bg-background rounded-xl p-1 shadow-lg border border-border">
                    <img
                      src={agency.logo}
                      alt="Logo"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                </div>

                <div className="absolute top-3 right-3">
                  <Badge className="bg-sky-500 hover:bg-sky-600 text-white border-none shadow-lg">
                    {agency.rating}{' '}
                    <Star className="h-3 w-3 ml-1 fill-current" />
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4 pt-6 bg-card">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg leading-tight flex items-center gap-1">
                      {agency.name}
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 fill-blue-100" />
                    </h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" /> {agency.location}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-snug mb-3">
                  {agency.shortDescription}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {agency.services.slice(0, 3).map((service, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-secondary px-2 py-0.5 rounded-md text-muted-foreground font-medium border border-border/50"
                    >
                      {service}
                    </span>
                  ))}
                  {agency.services.length > 3 && (
                    <span className="text-[10px] bg-secondary px-2 py-0.5 rounded-md text-muted-foreground font-medium border border-border/50">
                      +{agency.services.length - 3}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
