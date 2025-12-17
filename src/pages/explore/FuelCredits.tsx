import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Fuel,
  MapPin,
  History,
  Info,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DigitalCard } from '@/components/DigitalCard'
import { mockFuelTransactions } from '@/lib/data'
import { Badge } from '@/components/ui/badge'

export default function FuelCredits() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background/95 backdrop-blur z-20 p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Fuel className="h-5 w-5 text-yellow-600" />
            Combustível Goplay
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Hero Section */}
        <div className="flex flex-col items-center gap-6">
          <DigitalCard
            type="fuel"
            balance="R$ 180,00"
            title="Goplay Fuel"
            triggerClassName="w-full max-w-sm"
          >
            <div className="w-full max-w-sm cursor-pointer transform hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden aspect-[1.586/1]">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl tracking-tight drop-shadow-md">
                      Goplay Fuel
                    </h3>
                    <Fuel className="h-6 w-6 text-white/90" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/70 uppercase tracking-widest mb-1">
                      Saldo Combustível
                    </span>
                    <span className="font-bold text-3xl tracking-tight text-white drop-shadow-sm">
                      R$ 180,00
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-white/80">
                    <CreditCard className="w-4 h-4" />
                    <span>Toque para ver detalhes</span>
                  </div>
                </div>
              </div>
            </div>
          </DigitalCard>

          <div className="grid grid-cols-2 gap-4 w-full">
            <Card className="border-none shadow-sm bg-secondary/30">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className="p-2 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30">
                  <Info className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">Como Funciona</span>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-secondary/30">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className="p-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">Postos Parceiros</span>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How it works info */}
        <div className="bg-card rounded-xl p-4 border border-border/50 shadow-sm">
          <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] px-2 h-5">
              INFO
            </Badge>
            Sobre o Crédito
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Este saldo é exclusivo para abastecimento em postos parceiros,
            fornecido por times e organizadores para cobrir seus custos de
            deslocamento para eventos e jogos.
          </p>
        </div>

        {/* History */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <History className="h-4 w-4 text-muted-foreground" /> Extrato
              Recente
            </h3>
          </div>
          <div className="space-y-3">
            {mockFuelTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-card rounded-xl border border-border/50 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                      transaction.type === 'deposit'
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/20'
                        : 'bg-red-100 text-red-600 dark:bg-red-900/20'
                    }`}
                  >
                    {transaction.type === 'deposit' ? (
                      <ArrowUpRight className="h-5 w-5" />
                    ) : (
                      <ArrowDownLeft className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{transaction.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.description} • {transaction.date}
                    </p>
                  </div>
                </div>
                <span
                  className={`font-bold text-sm ${
                    transaction.type === 'deposit'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'deposit' ? '+' : '-'} R${' '}
                  {transaction.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div>
          <h3 className="font-bold text-lg mb-4">Rede Parceira</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
            {[
              { name: 'Shell', color: 'red' },
              { name: 'Ipiranga', color: 'blue' },
              { name: 'Petrobras', color: 'green' },
              { name: 'Ale', color: 'cyan' },
            ].map((partner, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 min-w-[80px]"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-border flex items-center justify-center p-3">
                  <img
                    src={`https://img.usecurling.com/i?q=${partner.name}&color=${partner.color}`}
                    alt={partner.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
