import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Filter } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { mockFinancialHistory } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function TransactionHistory() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-20 p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Extrato Completo</h1>
        </div>
        <Button variant="ghost" size="icon">
          <Filter className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4 space-y-4">
        {mockFinancialHistory.map((t) => {
          const isNegative = t.value < 0 || t.type === 'spend'
          const valueColor = isNegative ? 'text-red-500' : 'text-green-500'
          const bgColor = isNegative ? 'bg-red-500/10' : 'bg-green-500/10'

          return (
            <Card
              key={t.id}
              className="border border-border/50 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'h-10 w-10 rounded-full flex items-center justify-center',
                      bgColor,
                      valueColor,
                    )}
                  >
                    {isNegative ? (
                      <ArrowDownLeft className="h-5 w-5" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{t.description}</h3>
                    <p className="text-xs text-muted-foreground">{t.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn('font-bold', valueColor)}>
                    {t.value > 0 ? '+' : ''}
                    {t.currency === 'BRL'
                      ? `R$ ${Math.abs(t.value).toFixed(2).replace('.', ',')}`
                      : `${Math.abs(t.value)} pts`}
                  </p>
                  <p className="text-[10px] uppercase text-muted-foreground font-medium">
                    {t.status}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {mockFinancialHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
            <p className="text-sm">Nenhuma movimentação encontrada.</p>
          </div>
        )}
      </div>
    </div>
  )
}
