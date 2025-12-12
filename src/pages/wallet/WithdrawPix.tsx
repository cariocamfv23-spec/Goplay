import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function WithdrawPix() {
  const navigate = useNavigate()
  const [amount, setAmount] = useState('')
  const [pixKey, setPixKey] = useState('')

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Solicitação de saque realizada!')
    navigate('/wallet')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 border-b flex items-center gap-4 bg-background sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold">Saque via Pix</h1>
      </div>

      <div className="p-4 max-w-md mx-auto">
        <Card className="border-none shadow-sm mb-6 bg-secondary/20">
          <CardContent className="p-4 text-center">
            <span className="text-sm text-muted-foreground">
              Saldo Disponível
            </span>
            <h2 className="text-2xl font-bold text-primary mt-1">
              R$ 1.250,00
            </h2>
          </CardContent>
        </Card>

        <form onSubmit={handleWithdraw} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Valor do Saque</Label>
            <Input
              id="amount"
              placeholder="R$ 0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg font-bold"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pix">Chave Pix</Label>
            <Input
              id="pix"
              placeholder="CPF, Email ou Telefone"
              value={pixKey}
              onChange={(e) => setPixKey(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full h-12 rounded-full font-bold">
            Confirmar Saque
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          O valor será creditado na sua conta em até 24 horas úteis.
        </p>
      </div>
    </div>
  )
}
