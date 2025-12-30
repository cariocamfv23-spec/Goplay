import { useParams, useNavigate } from 'react-router-dom'
import { useContractStore } from '@/stores/useContractStore'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Target,
  Calendar,
  AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { Slider } from '@/components/ui/slider'

export default function ContractDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    contracts,
    updateContractStatus,
    updateMetricProgress,
    getContractValue,
  } = useContractStore()

  const contract = contracts.find((c) => c.id === id)

  if (!contract) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 text-center">
        <div>
          <h2 className="text-xl font-bold mb-2">Contrato não encontrado</h2>
          <Button onClick={() => navigate('/contracts')}>Voltar</Button>
        </div>
      </div>
    )
  }

  const currentValue = getContractValue(contract)
  const maxValue =
    contract.baseValue +
    contract.metrics.reduce((acc, m) => acc + m.impactValue, 0)
  const isLive = contract.status === 'active'

  const handleAccept = () => {
    updateContractStatus(contract.id, 'active')
    toast.success('Contrato aceito! O monitoramento começou.')
  }

  const handleReject = () => {
    updateContractStatus(contract.id, 'rejected')
    toast.info('Proposta recusada.')
    navigate(-1)
  }

  // Demo Simulation Handler
  const handleSimulateMetric = (metricId: string, value: number) => {
    updateMetricProgress(contract.id, metricId, value)
  }

  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in flex flex-col">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 p-4 shadow-sm flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="-ml-2 hover:bg-secondary/50 rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground bg-secondary px-2 py-0.5 rounded">
          {isLive ? 'Live Tracking' : 'Proposta'}
        </span>
      </div>

      <div className="flex-1 p-4 space-y-6">
        {/* Header Profile */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-white p-2 shadow-lg mb-4 flex items-center justify-center border border-border/50">
            <img
              src={contract.proposerLogo}
              alt={contract.proposerName}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl font-bold leading-tight">{contract.title}</h1>
          <p className="text-sm text-muted-foreground">
            {contract.proposerName}
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>
              {new Date(contract.startDate).toLocaleDateString()} -{' '}
              {new Date(contract.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Live Value Card */}
        <div className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <TrendingUp className="w-24 h-24" />
          </div>

          <div className="relative z-10 text-center">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
              Valor {isLive ? 'Atual do Contrato' : 'Proposto'}
            </p>
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <span className="text-lg font-medium text-muted-foreground self-start mt-2">
                {contract.currency}
              </span>
              <span className="text-5xl font-black tracking-tight text-foreground">
                {currentValue.toLocaleString()}
              </span>
            </div>

            {isLive && (
              <div className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                <TrendingUp className="w-3 h-3" />
                Live Update
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-border/50 flex justify-between text-xs">
              <div>
                <span className="block text-muted-foreground">
                  Base Garantida
                </span>
                <span className="font-bold">
                  {contract.currency} {contract.baseValue.toLocaleString()}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-muted-foreground">
                  Potencial Máximo
                </span>
                <span className="font-bold text-primary">
                  {contract.currency} {maxValue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Tracking */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Metas de Performance
          </h3>

          <div className="space-y-3">
            {contract.metrics.map((metric) => {
              const progress = Math.min(
                100,
                (metric.currentValue / metric.targetValue) * 100,
              )
              const isAchieved = metric.currentValue >= metric.targetValue

              return (
                <div
                  key={metric.id}
                  className="bg-secondary/20 rounded-xl p-4 border border-border/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-bold text-sm block">
                        {metric.label}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase">
                        {metric.type === 'linear' ? 'Escalável' : 'Milestone'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-sm text-green-600">
                        + {contract.currency} {metric.impactValue}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-3">
                    <div className="flex justify-between text-xs font-medium">
                      <span>
                        {metric.currentValue} {metric.unit}
                      </span>
                      <span className="text-muted-foreground">
                        {metric.targetValue} {metric.unit}
                      </span>
                    </div>
                    <Progress
                      value={progress}
                      className={cn(
                        'h-2',
                        isAchieved
                          ? '[&>div]:bg-green-500'
                          : '[&>div]:bg-primary',
                      )}
                    />
                  </div>

                  {/* Demo Simulation Slider */}
                  {isLive && (
                    <div className="pt-2 border-t border-border/30 mt-2">
                      <p className="text-[9px] text-muted-foreground mb-1 uppercase tracking-wider">
                        Simular Progresso (Demo)
                      </p>
                      <Slider
                        defaultValue={[metric.currentValue]}
                        max={metric.targetValue * 1.5}
                        step={1}
                        onValueChange={(val) =>
                          handleSimulateMetric(metric.id, val[0])
                        }
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        {contract.status === 'pending' && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border/50 backdrop-blur-lg flex gap-3 z-40">
            <Button
              variant="outline"
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={handleReject}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Recusar
            </Button>
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700 text-white shadow-lg"
              onClick={handleAccept}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Aceitar Proposta
            </Button>
          </div>
        )}

        {contract.status === 'rejected' && (
          <div className="p-4 bg-red-500/10 text-red-600 rounded-xl text-center text-sm font-medium border border-red-500/20">
            <AlertCircle className="w-5 h-5 mx-auto mb-2" />
            Esta proposta foi recusada.
          </div>
        )}
      </div>
    </div>
  )
}
