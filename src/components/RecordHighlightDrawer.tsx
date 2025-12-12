import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import {
  Camera,
  History,
  Users,
  Save,
  Loader2,
  Video as VideoIcon,
  Mic,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { Progress } from '@/components/ui/progress'
import { NarrationEditor } from './NarrationEditor'
import { NarrationConfig } from '@/lib/data'

interface RecordHighlightDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  venueName?: string
}

export function RecordHighlightDrawer({
  open,
  onOpenChange,
  venueName = 'Local',
}: RecordHighlightDrawerProps) {
  const [step, setStep] = useState<
    'record' | 'processing' | 'tagging' | 'narration'
  >('record')
  const [duration, setDuration] = useState<10 | 20 | 30>(30)
  const [narrationConfig, setNarrationConfig] =
    useState<NarrationConfig | null>(null)
  const [showNarrationEditor, setShowNarrationEditor] = useState(false)

  const handleRecord = () => {
    setStep('processing')
    // Simulate processing
    setTimeout(() => {
      setStep('tagging')
    }, 2000)
  }

  const handleSkipNarration = () => {
    handleFinalSave()
  }

  const handleFinalSave = () => {
    toast.success('Highlight salvo com sucesso!', {
      description: narrationConfig
        ? 'Vídeo com narração AI gerado!'
        : 'Disponível na sua biblioteca de Lances.',
      icon: narrationConfig ? (
        <Sparkles className="h-5 w-5 text-gold" />
      ) : undefined,
    })
    onOpenChange(false)
    setTimeout(() => {
      setStep('record')
      setNarrationConfig(null)
    }, 500)
  }

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="h-auto max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-center gap-2">
              <Camera className="h-5 w-5 text-primary" /> Gravar Highlight
            </DrawerTitle>
            <DrawerDescription className="text-center">
              {venueName}
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 px-6">
            {step === 'record' && (
              <div className="space-y-6">
                <div className="flex justify-center gap-3">
                  {[10, 20, 30].map((sec) => (
                    <Button
                      key={sec}
                      variant={duration === sec ? 'default' : 'outline'}
                      onClick={() => setDuration(sec as any)}
                      className="rounded-full w-20"
                    >
                      {sec}s
                    </Button>
                  ))}
                </div>
                <div className="aspect-video bg-black rounded-xl relative overflow-hidden flex items-center justify-center">
                  <VideoIcon className="h-12 w-12 text-white/50" />
                  <div className="absolute bottom-4 left-4 text-white text-xs bg-red-600 px-2 py-1 rounded animate-pulse">
                    REC BUFFER
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full h-14 rounded-full text-lg shadow-lg bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleRecord}
                >
                  <History className="mr-2 h-6 w-6" /> Capturar Últimos{' '}
                  {duration}s
                </Button>
              </div>
            )}

            {step === 'processing' && (
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="font-medium text-lg">Processando replay...</p>
                <Progress value={66} className="w-[60%]" />
              </div>
            )}

            {step === 'tagging' && (
              <div className="space-y-4 animate-fade-in">
                <div className="aspect-video bg-black/90 rounded-xl relative overflow-hidden flex items-center justify-center">
                  <img
                    src="https://img.usecurling.com/p/400/225?q=soccer%20action"
                    className="w-full h-full object-cover opacity-80"
                    alt="Preview"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                    00:{duration}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" /> Marcar Jogadores
                  </h4>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-1 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                      >
                        <Avatar className="h-12 w-12 border-2 border-transparent hover:border-primary">
                          <AvatarImage
                            src={`https://img.usecurling.com/ppl/thumbnail?gender=male&seed=${i + 20}`}
                          />
                          <AvatarFallback>P{i}</AvatarFallback>
                        </Avatar>
                        <span className="text-[10px]">Player {i}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full rounded-full"
                  onClick={() => setStep('narration')}
                >
                  Continuar
                </Button>
              </div>
            )}

            {step === 'narration' && (
              <div className="space-y-6 animate-fade-in text-center py-4">
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20">
                  <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-gold animate-pulse" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">
                    Narração Automática AI
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Dê vida ao seu highlight! Nossa IA detecta o momento exato e
                    narra sua jogada como um profissional.
                  </p>

                  <div className="space-y-3">
                    <Button
                      className="w-full h-12 rounded-full text-base font-bold bg-gradient-to-r from-primary to-purple-600 shadow-md"
                      onClick={() => setShowNarrationEditor(true)}
                    >
                      <Mic className="mr-2 h-5 w-5" /> Adicionar Narração
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full rounded-full"
                      onClick={handleSkipNarration}
                    >
                      Salvar sem Narração
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {step !== 'narration' && (
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DrawerClose>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>

      <NarrationEditor
        open={showNarrationEditor}
        onOpenChange={setShowNarrationEditor}
        videoThumbnail="https://img.usecurling.com/p/400/225?q=soccer%20action"
        onSave={(config) => {
          setNarrationConfig(config)
          handleFinalSave()
        }}
      />
    </>
  )
}
