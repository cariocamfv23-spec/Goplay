import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Camera, MapPin, CheckCircle2, ScanFace, Loader2 } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface CheckInModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function CheckInModal({
  open,
  onOpenChange,
  onSuccess,
}: CheckInModalProps) {
  const [step, setStep] = useState<
    'camera' | 'analyzing' | 'success' | 'failed'
  >('camera')
  const [progress, setProgress] = useState(0)
  const [analysisStep, setAnalysisStep] = useState(0)

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setStep('camera')
      setProgress(0)
      setAnalysisStep(0)
    }
  }, [open])

  const handleTakePhoto = () => {
    setStep('analyzing')
    simulateAnalysis()
  }

  const simulateAnalysis = () => {
    // Step 1: Location
    setTimeout(() => {
      setAnalysisStep(1)
      setProgress(33)
    }, 1500)

    // Step 2: Environment
    setTimeout(() => {
      setAnalysisStep(2)
      setProgress(66)
    }, 3000)

    // Step 3: Facial & Clarity
    setTimeout(() => {
      setAnalysisStep(3)
      setProgress(100)
    }, 4500)

    // Success
    setTimeout(() => {
      setStep('success')
      toast.success('Check-in realizado com sucesso!', {
        description: 'Você ganhou +50 pontos Goplay!',
      })
      setTimeout(() => {
        onSuccess()
        onOpenChange(false)
      }, 2000)
    }, 5500)
  }

  const analysisSteps = [
    { label: 'Validando Localização GPS...', icon: MapPin },
    { label: 'Analisando Ambiente Esportivo...', icon: Camera },
    { label: 'Verificando Identidade...', icon: ScanFace },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-black text-white border-zinc-800">
        <DialogHeader className="p-4 bg-zinc-900 border-b border-zinc-800">
          <DialogTitle className="text-center text-white">
            Check-in na Partida
          </DialogTitle>
        </DialogHeader>

        <div className="relative aspect-[3/4] bg-zinc-900 flex flex-col items-center justify-center overflow-hidden">
          {step === 'camera' && (
            <>
              {/* Fake Camera Viewfinder */}
              <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/600/800?q=soccer%20field&dpr=2')] bg-cover bg-center opacity-50" />
              <div className="absolute inset-0 border-[2px] border-white/20 m-8 rounded-lg" />
              <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
                <Button
                  size="icon"
                  className="h-16 w-16 rounded-full border-4 border-white bg-transparent hover:bg-white/10 transition-colors"
                  onClick={handleTakePhoto}
                >
                  <div className="h-12 w-12 rounded-full bg-white" />
                </Button>
              </div>
              <p className="absolute top-8 text-sm font-medium text-white/80 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                Tire uma foto do local
              </p>
            </>
          )}

          {step === 'analyzing' && (
            <div className="flex flex-col items-center w-full px-8 z-10">
              <div className="h-24 w-24 rounded-full border-4 border-primary border-t-transparent animate-spin mb-6" />
              <h3 className="text-xl font-bold mb-6">Analisando...</h3>

              <div className="w-full space-y-4">
                {analysisSteps.map((s, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex items-center gap-3 transition-all duration-500',
                      i < analysisStep
                        ? 'text-green-500 opacity-100'
                        : i === analysisStep
                          ? 'text-white opacity-100'
                          : 'text-zinc-500 opacity-50',
                    )}
                  >
                    {i < analysisStep ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : i === analysisStep ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <s.icon className="h-5 w-5" />
                    )}
                    <span className="text-sm font-medium">{s.label}</span>
                  </div>
                ))}
              </div>

              <Progress value={progress} className="h-2 mt-8 w-full" />
            </div>
          )}

          {step === 'success' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-20 animate-in fade-in zoom-in duration-500">
              <div className="h-32 w-32 rounded-full border-4 border-gold bg-primary/20 flex items-center justify-center mb-6 animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_30px_rgba(212,175,55,0.6)]">
                <CheckCircle2 className="h-16 w-16 text-gold" />
              </div>
              <h2 className="text-3xl font-bold text-gold mb-2">Aprovado!</h2>
              <p className="text-white/80 mb-6">Check-in Confirmado</p>
              <div className="bg-gradient-to-r from-primary to-purple-800 px-6 py-2 rounded-full text-white font-bold flex items-center gap-2 animate-bounce">
                +50 Pontos
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
