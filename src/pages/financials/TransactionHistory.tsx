import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Filter } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function TransactionHistory() {
  const navigate = useNavigate()

  const transactions = [
    {
      id: 1,
      type: 'in',
      title: 'Pagamento Recebido',
      desc: 'Job: Final do Estadual',
      value: 300.0,
      date: 'Hoje, 10:00',
    },
    {
      id: 2,
      type: 'out',
      title: 'Uber Trip',
      desc: 'Viagem para Arena',
      value: 24.9,
      date: 'Ontem, 18:30',
    },
    {
      id: 3,
      type: 'out',
      title: 'Compra Marketplace',
      desc: 'Chuteira Nike',
      value: 499.9,
      date: '20 Out',
    },
    {
      id: 4,
      type: 'in',
      title: 'Depósito Pix',
      desc: 'Transferência recebida',
      value: 150.0,
      date: '18 Out',
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background z-20 p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Extrato</h1>
        </div>
        <Button variant="ghost" size="icon">
          <Filter className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4 space-y-4">
        {transactions.map((t) => (
          <Card key={t.id} className="border-none shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${t.type === 'in' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                >
                  {t.type === 'in' ? (
                    <ArrowUpRight className="h-5 w-5" />
                  ) : (
                    <ArrowDownLeft className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-sm">{t.title}</h3>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-bold ${t.type === 'in' ? 'text-green-600' : 'text-red-600'}`}
                >
                  {t.type === 'in' ? '+' : '-'} R$ {t.value.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">{t.date}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
