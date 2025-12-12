import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  ArrowLeft,
  Car,
  FileText,
  CreditCard,
  ShieldCheck,
  Bell,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useState, useEffect } from 'react'
import useNotificationStore from '@/stores/useNotificationStore'

export default function DriverSettings() {
  const navigate = useNavigate()
  const { addNotification } = useNotificationStore()
  const [permission, setPermission] = useState('everyone')

  useEffect(() => {
    // Load saved permission (mocked for driver id '5' - Carlos Driver)
    const saved = localStorage.getItem('driver_permission_5')
    if (saved) setPermission(saved)
  }, [])

  const handleSave = () => {
    // Save permission
    localStorage.setItem('driver_permission_5', permission)

    // Trigger Notification
    addNotification({
      title: 'Configurações Atualizadas',
      message: 'As permissões de solicitação de corrida foram alteradas.',
      type: 'profile_update',
      relatedId: '5',
    })

    toast.success('Configurações salvas com sucesso!')
  }

  return (
    <div className="min-h-screen bg-background pb-20 p-4 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Configurações do Motorista</h1>
      </div>

      <div className="space-y-6">
        {/* Permission Settings */}
        <Card className="border-primary/20 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> Permissões de
              Corrida
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Quem pode solicitar corridas com você?
              </p>
              <RadioGroup
                value={permission}
                onValueChange={setPermission}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary/30 transition-colors">
                  <RadioGroupItem value="everyone" id="r1" />
                  <Label htmlFor="r1" className="cursor-pointer flex-1">
                    Todos os usuários
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary/30 transition-colors">
                  <RadioGroupItem value="verified" id="r2" />
                  <Label htmlFor="r2" className="cursor-pointer flex-1">
                    Apenas usuários verificados
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary/30 transition-colors">
                  <RadioGroupItem value="followers" id="r3" />
                  <Label htmlFor="r3" className="cursor-pointer flex-1">
                    Apenas seguidores
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" /> Veículo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Modelo do Carro</Label>
              <Input defaultValue="Honda Civic" />
            </div>
            <div className="space-y-2">
              <Label>Placa</Label>
              <Input defaultValue="ABC-1234" />
            </div>
            <div className="space-y-2">
              <Label>Cor</Label>
              <Input defaultValue="Prata" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" /> Documentação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
              <span className="font-medium text-sm">CNH</span>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                Verificado
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
              <span className="font-medium text-sm">CRLV</span>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                Verificado
              </span>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full h-12 font-bold" onClick={handleSave}>
          Salvar Alterações
        </Button>
      </div>
    </div>
  )
}
