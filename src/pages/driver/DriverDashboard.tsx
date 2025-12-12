import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Car,
  MapPin,
  History,
  Settings,
  DollarSign,
  Star,
  ChevronRight,
  User,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function DriverDashboard() {
  const navigate = useNavigate()
  const [isOnline, setIsOnline] = useState(false)

  return (
    <div className="min-h-screen bg-background pb-20 p-4 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Painel do Motorista</h1>
          <p className="text-muted-foreground text-sm">Bem-vindo, Carlos</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {isOnline ? 'Online' : 'Offline'}
          </span>
          <Switch checked={isOnline} onCheckedChange={setIsOnline} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="bg-primary text-primary-foreground border-none shadow-lg">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <DollarSign className="h-5 w-5 mb-2 opacity-80" />
            <div>
              <p className="text-xs opacity-80">Ganhos Hoje</p>
              <h2 className="text-2xl font-bold">R$ 145,90</h2>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border shadow-sm">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <Star className="h-5 w-5 text-gold fill-gold" />
              <Badge variant="secondary" className="text-xs">
                4.9
              </Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avaliação</p>
              <h2 className="text-xl font-bold">Excelente</h2>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Actions */}
      <div className="space-y-3 mb-8">
        <Button
          className="w-full h-16 justify-between text-lg font-bold shadow-md"
          variant={isOnline ? 'default' : 'secondary'}
          onClick={() => navigate('/driver/requests')}
        >
          <div className="flex items-center gap-3">
            <MapPin className="h-6 w-6" />
            Ver Solicitações
          </div>
          {isOnline && (
            <Badge className="bg-white text-primary hover:bg-white/90">
              3 Novas
            </Badge>
          )}
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-14 justify-start"
            onClick={() => navigate('/driver/history')}
          >
            <History className="h-5 w-5 mr-2 text-muted-foreground" />
            Histórico
          </Button>
          <Button
            variant="outline"
            className="h-14 justify-start"
            onClick={() => navigate('/driver/settings')}
          >
            <Settings className="h-5 w-5 mr-2 text-muted-foreground" />
            Configurações
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="font-bold text-lg mb-4">Atividade Recente</h3>
        <Card className="shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Última Corrida
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-bold text-sm">Lucas Oliveira</p>
                  <p className="text-xs text-muted-foreground">
                    Hoje, 10:30 • 5.2 km
                  </p>
                </div>
              </div>
              <span className="font-bold text-green-600">+ R$ 22,90</span>
            </div>
            <Button
              variant="ghost"
              className="w-full mt-2 text-xs h-8"
              onClick={() => navigate('/driver/history')}
            >
              Ver todas <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
