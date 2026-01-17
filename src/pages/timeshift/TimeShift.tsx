import { useEffect, useState } from 'react'
import { useTimeShiftStore, SportType } from '@/stores/useTimeShiftStore'
import { TimelineSwitcher } from '@/components/timeshift/TimelineSwitcher'
import { TimeShiftVisualizer } from '@/components/timeshift/TimeShiftVisualizer'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Clock, Info, Share2, Sparkles, Upload } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

export default function TimeShift() {
  const navigate = useNavigate()
  const { setSport, sport } = useTimeShiftStore()
  const [showPublisher, setShowPublisher] = useState(false)

  // Demo sports list
  const sports: { id: SportType; label: string }[] = [
    { id: 'football', label: 'Futebol' },
    { id: 'martial_arts', label: 'Artes Marciais' },
    { id: 'swimming', label: 'Natação' },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col relative overflow-hidden font-sans">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950 pointer-events-none" />

      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-indigo-400" />
          <span className="font-bold tracking-wider text-lg">TIME SHIFT</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
        >
          <Info className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col p-4 gap-6 max-w-lg mx-auto w-full z-10">
        {/* Sport Selector (For Demo) */}
        <div className="flex justify-end">
          <Select value={sport} onValueChange={(v) => setSport(v as SportType)}>
            <SelectTrigger className="w-[160px] bg-white/5 border-white/10 text-white h-8 text-xs">
              <SelectValue placeholder="Select Sport" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
              {sports.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Main Visualizer Area */}
        <div className="flex-1 min-h-[400px] w-full relative">
          <TimeShiftVisualizer />

          {/* Gesture Hint */}
          <div className="absolute bottom-4 left-0 right-0 text-center opacity-40 text-[10px] uppercase tracking-widest pointer-events-none animate-pulse">
            Swipe to Shift Time
          </div>
        </div>

        {/* Timeline Switcher Control */}
        <div className="pb-8">
          <TimelineSwitcher />
        </div>

        {/* Context Info Card */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1">Análise Narrativa</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Explore o que aconteceu, o que quase aconteceu e o que seria a
                perfeição. Use essa ferramenta para entender a tomada de decisão
                e melhorar seu desempenho mental.
              </p>
            </div>
          </div>
        </div>

        {/* Create Action */}
        <Button
          className="w-full h-14 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-bold text-lg shadow-xl shadow-indigo-900/20 mb-4"
          onClick={() => setShowPublisher(true)}
        >
          <Upload className="mr-2 h-5 w-5" /> Criar Novo Time Shift
        </Button>
      </div>

      {/* Publisher Dialog */}
      <Dialog open={showPublisher} onOpenChange={setShowPublisher}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-400" /> Publicar Time Shift
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Carregue seu vídeo e defina os momentos chave para a análise
              narrativa.
            </DialogDescription>
          </DialogHeader>

          <div className="py-8 flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-xl bg-zinc-950/50 hover:bg-zinc-950 hover:border-indigo-500/50 transition-colors cursor-pointer group">
            <div className="h-16 w-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Upload className="h-8 w-8 text-zinc-400 group-hover:text-indigo-400" />
            </div>
            <p className="text-sm font-medium">Toque para selecionar vídeo</p>
            <p className="text-xs text-zinc-500 mt-1">MP4, MOV até 30s</p>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button
              variant="ghost"
              onClick={() => setShowPublisher(false)}
              className="hover:bg-white/5 hover:text-white"
            >
              Cancelar
            </Button>
            <Button
              className="bg-indigo-600 hover:bg-indigo-500 text-white"
              onClick={() => {
                setShowPublisher(false)
                toast.success('Vídeo enviado para processamento!', {
                  description:
                    'Aguarde a notificação quando o Time Shift estiver pronto.',
                })
              }}
            >
              Continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
