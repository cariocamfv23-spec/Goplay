import { useNavigate } from 'react-router-dom'
import { useContractStore, LiveContract } from '@/stores/useContractStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowLeft,
  Plus,
  FileSignature,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Briefcase,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LiveContractsDashboard() {
  const navigate = useNavigate()
  const { contracts, getContractValue } = useContractStore()

  // Filter contracts
  const activeContracts = contracts.filter((c) => c.status === 'active')
  const pendingContracts = contracts.filter((c) => c.status === 'pending')
  const historyContracts = contracts.filter(
    (c) =>
      c.status === 'completed' ||
      c.status === 'rejected' ||
      c.status === 'draft',
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20 gap-1">
            <TrendingUp className="w-3 h-3" /> Vivo
          </Badge>
        )
      case 'pending':
        return (
          <Badge
            variant="outline"
            className="text-orange-500 border-orange-500/30 gap-1"
          >
            <Clock className="w-3 h-3" /> Pendente
          </Badge>
        )
      case 'completed':
        return (
          <Badge variant="secondary" className="text-muted-foreground gap-1">
            <CheckCircle2 className="w-3 h-3" /> Concluído
          </Badge>
        )
      case 'rejected':
        return (
          <Badge
            variant="destructive"
            className="bg-red-500/10 text-red-500 border-red-500/20 gap-1"
          >
            <XCircle className="w-3 h-3" /> Recusado
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const ContractCard = ({ contract }: { contract: LiveContract }) => {
    const currentValue = getContractValue(contract)
    const isLive = contract.status === 'active'

    return (
      <Card
        className="overflow-hidden cursor-pointer hover:shadow-md transition-all active:scale-[0.99] group border-border/50"
        onClick={() => navigate(`/contracts/${contract.id}`)}
      >
        <CardContent className="p-0">
          <div className="flex">
            {/* Left Brand Strip */}
            <div className="w-1.5 bg-gradient-to-b from-primary to-primary/50" />

            <div className="flex-1 p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary/50 p-1.5 border border-border/50">
                    <img
                      src={contract.proposerLogo}
                      alt={contract.proposerName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-none mb-1">
                      {contract.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {contract.proposerName}
                    </p>
                  </div>
                </div>
                {getStatusBadge(contract.status)}
              </div>

              <div className="flex items-end justify-between bg-secondary/20 rounded-xl p-3 border border-border/30">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
                    Valor {isLive ? 'Atual' : 'Proposto'}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      {contract.currency}
                    </span>
                    <span
                      className={cn(
                        'text-xl font-bold',
                        isLive ? 'text-green-600 dark:text-green-400' : '',
                      )}
                    >
                      {currentValue.toLocaleString()}
                    </span>
                  </div>
                </div>

                {isLive && currentValue > contract.baseValue && (
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-500/10 px-1.5 py-0.5 rounded-full">
                      <TrendingUp className="w-3 h-3" />+
                      {(
                        ((currentValue - contract.baseValue) /
                          contract.baseValue) *
                        100
                      ).toFixed(0)}
                      %
                    </div>
                  </div>
                )}
              </div>

              {contract.metrics.length > 0 && (
                <div className="mt-3 flex gap-2 overflow-hidden">
                  {contract.metrics.slice(0, 3).map((metric) => (
                    <Badge
                      key={metric.id}
                      variant="secondary"
                      className="text-[9px] h-5 font-normal bg-secondary border-none truncate max-w-[100px]"
                    >
                      {metric.label}
                    </Badge>
                  ))}
                  {contract.metrics.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="text-[9px] h-5 px-1.5"
                    >
                      +{contract.metrics.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in flex flex-col">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="-ml-2 hover:bg-secondary/50 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-bold text-lg leading-none flex items-center gap-2">
                <FileSignature className="h-5 w-5 text-primary" />
                Contratos Vivos
              </h1>
              <p className="text-xs text-muted-foreground">
                Propostas e Acordos Dinâmicos
              </p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => navigate('/contracts/create')}
            className="h-9 px-3 gap-1 shadow-md bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Nova Proposta</span>
            <span className="sm:hidden">Criar</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-secondary/50">
            <TabsTrigger value="active">
              Ativos ({activeContracts.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pendentes ({pendingContracts.length})
            </TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent
            value="active"
            className="space-y-4 animate-in slide-in-from-bottom-2"
          >
            {activeContracts.length > 0 ? (
              activeContracts.map((contract) => (
                <ContractCard key={contract.id} contract={contract} />
              ))
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-border/50 rounded-2xl bg-secondary/10">
                <Briefcase className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
                <h3 className="font-semibold text-muted-foreground">
                  Nenhum contrato ativo
                </h3>
                <p className="text-xs text-muted-foreground/60 mt-1 px-4">
                  Seus contratos em andamento aparecerão aqui.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="pending"
            className="space-y-4 animate-in slide-in-from-bottom-2"
          >
            {pendingContracts.length > 0 ? (
              pendingContracts.map((contract) => (
                <ContractCard key={contract.id} contract={contract} />
              ))
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-border/50 rounded-2xl bg-secondary/10">
                <Clock className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
                <h3 className="font-semibold text-muted-foreground">
                  Nenhuma proposta pendente
                </h3>
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="history"
            className="space-y-4 animate-in slide-in-from-bottom-2"
          >
            {historyContracts.length > 0 ? (
              historyContracts.map((contract) => (
                <ContractCard key={contract.id} contract={contract} />
              ))
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-border/50 rounded-2xl bg-secondary/10">
                <FileSignature className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
                <h3 className="font-semibold text-muted-foreground">
                  Histórico vazio
                </h3>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
