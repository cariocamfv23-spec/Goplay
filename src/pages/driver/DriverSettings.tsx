import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Car, FileText, CreditCard } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function DriverSettings() {
  const navigate = useNavigate()

  const handleSave = () => {
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

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" /> Recebimentos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Conta Bancária Principal (**** 1234)
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Chave Pix (CPF)
            </Button>
          </CardContent>
        </Card>

        <Button className="w-full h-12 font-bold" onClick={handleSave}>
          Salvar Alterações
        </Button>
      </div>
    </div>
  )
}
