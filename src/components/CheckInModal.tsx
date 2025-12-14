import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Loader2,
  CheckCircle,
  Camera,
  RefreshCw,
  X,
  Check,
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface CheckInModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  venueName: string
  points: number
}

export function CheckInModal({
  open,
  onOpenChange,
  venueName,
  points,
}: CheckInModalProps) {
  const [step, setStep] = useState<
    'idle' | 'camera' | 'preview' | 'loading' | 'success'
  >('idle')
  const [image, setImage] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }

  const startCamera = async () => {
    setCameraError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setStep('camera')
    } catch (err) {
      console.error('Error accessing camera:', err)
      setCameraError(
        'Não foi possível acessar a câmera. Verifique as permissões.',
      )
    }
  }

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current

      // Set canvas size to video size
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Draw the current frame
        // Mirror effect for selfie if needed
        ctx.translate(canvas.width, 0)
        ctx.scale(-1, 1)
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert to data URL
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
        setImage(dataUrl)
        setStep('preview')
        stopCamera()
      }
    }
  }

  const handleRetake = () => {
    setImage(null)
    startCamera()
  }

  const handleConfirm = () => {
    setStep('loading')
    // Simulate upload/API
    setTimeout(() => {
      setStep('success')
    }, 1500)
  }

  const handleInternalClose = () => {
    stopCamera()
    setStep('idle')
    setImage(null)
    setCameraError(null)
    onOpenChange(false)
  }

  // Cleanup if component unmounts
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  // Cleanup if dialog closes externally
  useEffect(() => {
    if (!open) {
      stopCamera()
      setStep('idle')
      setImage(null)
      setCameraError(null)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={handleInternalClose}>
      <DialogContent
        className={cn(
          'sm:max-w-md text-center p-0 overflow-hidden gap-0 bg-background transition-all duration-300',
          step === 'camera' ? 'h-[80vh] sm:h-auto border-0 sm:border' : '',
        )}
      >
        {/* Header - Hidden in Camera mode for full screen effect */}
        {step !== 'camera' && (
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-center">
              Check-in: {venueName}
            </DialogTitle>
            <DialogDescription className="text-center">
              {step === 'idle' && 'Confirme sua presença com uma selfie.'}
              {step === 'preview' && 'Como ficou a foto?'}
              {step === 'success' && 'Parabéns! Pontos recebidos.'}
            </DialogDescription>
          </DialogHeader>
        )}

        <div
          className={cn(
            'flex flex-col items-center justify-center transition-all',
            step === 'camera' ? 'h-full w-full bg-black relative' : 'p-6 py-4',
          )}
        >
          {/* Hidden Canvas for capture */}
          <canvas ref={canvasRef} className="hidden" />

          {/* IDLE STATE */}
          {step === 'idle' && (
            <div className="flex flex-col items-center gap-6 py-4 animate-in fade-in zoom-in-95">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-pulse">
                <Camera className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Para validar seu check-in e ganhar{' '}
                  <span className="font-bold text-primary">
                    +{points} pontos
                  </span>
                  , precisamos confirmar que você está no local.
                </p>
                {cameraError && (
                  <p className="text-xs text-destructive font-medium bg-destructive/10 p-2 rounded-md">
                    {cameraError}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* CAMERA STATE */}
          {step === 'camera' && (
            <div className="relative w-full h-full flex flex-col bg-black animate-in fade-in">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover flex-1"
                style={{ transform: 'scaleX(-1)' }}
              />

              {/* Camera Overlay Controls */}
              <div className="absolute top-4 right-4 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 rounded-full"
                  onClick={handleInternalClose}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center items-center bg-gradient-to-t from-black/80 to-transparent">
                <button
                  onClick={handleCapture}
                  className="h-20 w-20 rounded-full border-4 border-white bg-white/20 flex items-center justify-center hover:bg-white/40 transition-all active:scale-95 ring-4 ring-white/10"
                  aria-label="Tirar foto"
                >
                  <div className="h-16 w-16 rounded-full bg-white" />
                </button>
              </div>
            </div>
          )}

          {/* PREVIEW STATE */}
          {step === 'preview' && image && (
            <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4">
              <div className="relative aspect-[3/4] w-full max-w-[240px] mx-auto rounded-xl overflow-hidden shadow-lg border-2 border-primary/20">
                <img
                  src={image}
                  alt="Selfie preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm">
                  <MapPin className="w-3 h-3" />
                  <span>No local</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Essa foto será vinculada ao seu check-in.
              </p>
            </div>
          )}

          {/* LOADING STATE */}
          {step === 'loading' && (
            <div className="py-8 flex flex-col items-center gap-4 animate-in fade-in">
              <div className="relative">
                <div className="h-20 w-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
              </div>
              <p className="font-medium animate-pulse text-sm">
                Validando localização e foto...
              </p>
            </div>
          )}

          {/* SUCCESS STATE */}
          {step === 'success' && (
            <div className="py-6 flex flex-col items-center gap-4 animate-in zoom-in duration-300">
              <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-sm animate-bounce">
                <CheckCircle className="h-12 w-12" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xl text-green-700">
                  Check-in Realizado!
                </h3>
                <p className="text-muted-foreground text-sm">
                  Você ganhou{' '}
                  <span className="font-bold text-foreground">
                    +{points} pontos
                  </span>
                </p>
              </div>

              {image && (
                <div className="mt-2 w-16 h-16 rounded-full overflow-hidden border-2 border-green-500 shadow-sm">
                  <img src={image} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== 'camera' && (
          <DialogFooter className="p-6 pt-0 sm:justify-center gap-2">
            {step === 'idle' && (
              <Button
                onClick={startCamera}
                className="w-full gap-2 text-base h-12 rounded-xl shadow-md"
              >
                <Camera className="h-5 w-5" />
                Tirar Selfie
              </Button>
            )}

            {step === 'preview' && (
              <div className="flex gap-3 w-full">
                <Button
                  variant="outline"
                  onClick={handleRetake}
                  className="flex-1 gap-2 h-11 rounded-xl"
                >
                  <RefreshCw className="h-4 w-4" />
                  Tirar outra
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="flex-1 gap-2 bg-green-600 hover:bg-green-700 h-11 rounded-xl text-white shadow-md hover:shadow-lg"
                >
                  <Check className="h-4 w-4" />
                  Confirmar
                </Button>
              </div>
            )}

            {step === 'success' && (
              <Button
                onClick={handleInternalClose}
                className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground h-11 rounded-xl"
              >
                Fechar
              </Button>
            )}

            {step === 'loading' && (
              <Button disabled className="w-full h-11 rounded-xl">
                Processando...
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
