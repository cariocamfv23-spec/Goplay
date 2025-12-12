import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, CreditCard, Plus, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function PaymentMethods() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 border-b flex items-center gap-4 bg-background sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold">Formas de Pagamento</h1>
      </div>

      <div className="p-4 max-w-md mx-auto space-y-4">
        <Card className="bg-gradient-to-r from-zinc-800 to-zinc-900 text-white border-none shadow-md">
          <CardContent className="p-6 relative overflow-hidden">
            <div className="flex justify-between items-start mb-8">
              <CreditCard className="h-8 w-8 opacity-80" />
              <span className="font-mono text-lg tracking-widest">VISA</span>
            </div>
            <div className="mb-4">
              <p className="text-xs text-zinc-400 mb-1">Número do Cartão</p>
              <p className="font-mono text-lg tracking-wider">
                •••• •••• •••• 4242
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-zinc-400">Titular</p>
                <p className="text-sm font-medium">LUCAS OLIVEIRA</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-red-400 hover:bg-white/10"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Button variant="outline" className="w-full h-12 border-dashed gap-2">
          <Plus className="h-4 w-4" /> Adicionar Novo Cartão
        </Button>
      </div>
    </div>
  )
}
