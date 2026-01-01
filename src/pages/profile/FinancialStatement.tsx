import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockFinancialSummary, mockFinancialHistory } from '@/lib/data'
import {
  ArrowLeft,
  Wallet,
  Trophy,
  ArrowUpRight,
  ArrowDownLeft,
  ShoppingBag,
  UserPlus,
  Star,
  Megaphone,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRightLeft,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function FinancialStatement() {
  const navigate = useNavigate()

  // Defensive data handling for summary stats to prevent crashes on missing data
  // We use type assertion to handle potentially missing properties in the mock data type definition
  const summaryData = mockFinancialSummary as any

  // Safely extract values with defaults to avoid undefined.toFixed() errors
  const balance = Number(summaryData?.balance ?? 0)
  const totalSpent = Number(
    summaryData?.totalSpent ?? summaryData?.monthlySpending ?? 0,
  )
  const pointsBalance = Number(summaryData?.pointsBalance ?? 0)
  const pointsEarned = Number(summaryData?.pointsEarned ?? 0)
  const conversionRate = summaryData?.conversionRate ?? '1:1'
  const marketplaceStatus = summaryData?.marketplaceStatus ?? 'Ativo'

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'gain':
      case 'payment':
        return <ArrowUpRight className="h-5 w-5" />
      case 'spend':
        return <ArrowDownLeft className="h-5 w-5" />
      case 'bonus':
        return <Star className="h-5 w-5" />
      case 'invite':
        return <UserPlus className="h-5 w-5" />
      case 'marketing':
        return <Megaphone className="h-5 w-5" />
      case 'marketplace':
        return <ShoppingBag className="h-5 w-5" />
      default:
        return <ArrowRightLeft className="h-5 w-5" />
    }
  }

  const getTransactionColor = (type: string, currency: 'BRL' | 'PTS') => {
    if (type === 'spend' || type === 'marketplace') return 'text-red-500'
    return currency === 'BRL' ? 'text-green-500' : 'text-gold'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <Badge
            variant="outline"
            className="text-[10px] h-5 px-1.5 gap-1 border-green-500/30 text-green-600 bg-green-500/10"
          >
            <CheckCircle2 className="h-3 w-3" /> Confirmado
          </Badge>
        )
      case 'pending':
        return (
          <Badge
            variant="outline"
            className="text-[10px] h-5 px-1.5 gap-1 border-yellow-500/30 text-yellow-600 bg-yellow-500/10"
          >
            <Clock className="h-3 w-3" /> Pendente
          </Badge>
        )
      case 'expired':
        return (
          <Badge
            variant="outline"
            className="text-[10px] h-5 px-1.5 gap-1 border-red-500/30 text-red-600 bg-red-500/10"
          >
            <XCircle className="h-3 w-3" /> Expirado
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-20 p-4 border-b border-border/50 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold">Extrato Financeiro</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Financial Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Money Card */}
          <Card className="border-none shadow-lg bg-gradient-to-br from-primary to-purple-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>

            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">
                  Carteira Digital
                </Badge>
              </div>

              <div className="space-y-1 mb-6">
                <p className="text-sm text-white/70 font-medium">
                  Saldo disponível
                </p>
                <h2 className="text-3xl font-bold tracking-tight">
                  R$ {balance.toFixed(2)}
                </h2>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-xs text-white/70">
                  Total gasto na plataforma
                </span>
                <span className="font-bold text-sm">
                  R$ {totalSpent.toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Points Card */}
          <Card className="border-none shadow-lg bg-gradient-to-br from-[#B45309] to-[#78350f] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>

            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">
                  Goplay Points
                </Badge>
              </div>

              <div className="space-y-1 mb-6">
                <p className="text-sm text-white/70 font-medium">
                  Pontos disponíveis para uso
                </p>
                <h2 className="text-3xl font-bold tracking-tight">
                  {pointsBalance} pts
                </h2>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/70">Total ganho em pontos</span>
                  <span className="font-bold">{pointsEarned} pts</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/70">Conversão de pontos</span>
                  <span className="font-bold">{conversionRate}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/70">Uso no Marketplace</span>
                  <span className="font-bold text-green-300 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> {marketplaceStatus}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <ArrowRightLeft className="h-5 w-5 text-primary" />
              Histórico de Movimentações
            </h2>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-4 bg-muted/50 p-1">
              <TabsTrigger value="all">Tudo</TabsTrigger>
              <TabsTrigger value="money">Dinheiro</TabsTrigger>
              <TabsTrigger value="points">Pontos</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {(mockFinancialHistory || []).map((transaction) => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                      getIcon={getTransactionIcon}
                      getColor={getTransactionColor}
                      getBadge={getStatusBadge}
                    />
                  ))}
                  {(!mockFinancialHistory ||
                    mockFinancialHistory.length === 0) && (
                    <div className="text-center py-10 text-muted-foreground text-sm">
                      Nenhuma movimentação encontrada.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="money">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {(mockFinancialHistory || [])
                    .filter((t) => t.currency === 'BRL')
                    .map((transaction) => (
                      <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                        getIcon={getTransactionIcon}
                        getColor={getTransactionColor}
                        getBadge={getStatusBadge}
                      />
                    ))}
                  {(!mockFinancialHistory ||
                    mockFinancialHistory.filter((t) => t.currency === 'BRL')
                      .length === 0) && (
                    <div className="text-center py-10 text-muted-foreground text-sm">
                      Nenhuma movimentação em dinheiro.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="points">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {(mockFinancialHistory || [])
                    .filter((t) => t.currency === 'PTS')
                    .map((transaction) => (
                      <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                        getIcon={getTransactionIcon}
                        getColor={getTransactionColor}
                        getBadge={getStatusBadge}
                      />
                    ))}
                  {(!mockFinancialHistory ||
                    mockFinancialHistory.filter((t) => t.currency === 'PTS')
                      .length === 0) && (
                    <div className="text-center py-10 text-muted-foreground text-sm">
                      Nenhuma movimentação em pontos.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function TransactionItem({
  transaction,
  getIcon,
  getColor,
  getBadge,
}: {
  transaction: any
  getIcon: (type: string) => React.ReactNode
  getColor: (type: string, currency: 'BRL' | 'PTS') => string
  getBadge: (status: string) => React.ReactNode
}) {
  // Defensive check for transaction object
  if (!transaction) return null

  // Ensure safe values for rendering
  const value = Number(transaction.value ?? 0)
  const currency = transaction.currency ?? 'BRL'
  const type = transaction.type ?? 'unknown'
  const status = transaction.status ?? 'pending'
  const description = transaction.description ?? 'Sem descrição'
  const date = transaction.date ?? '-'

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            'h-12 w-12 rounded-full flex items-center justify-center bg-muted group-hover:bg-background border border-transparent group-hover:border-border transition-colors',
            getColor(type, currency),
          )}
        >
          {getIcon(type)}
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-sm leading-tight">{description}</h4>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{date}</span>
            {getBadge(status)}
          </div>
        </div>
      </div>
      <div className="text-right">
        <span className={cn('block font-bold', getColor(type, currency))}>
          {value > 0 ? '+' : ''}
          {currency === 'BRL'
            ? `R$ ${Math.abs(value).toFixed(2).replace('.', ',')}`
            : `${Math.abs(value)} pts`}
        </span>
        <span className="text-[10px] uppercase text-muted-foreground font-medium tracking-wider">
          {type === 'spend'
            ? 'Gasto'
            : type === 'gain'
              ? 'Ganho'
              : type === 'bonus'
                ? 'Bônus'
                : type}
        </span>
      </div>
    </div>
  )
}
