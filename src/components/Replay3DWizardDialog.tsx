import { useState, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Post3DGenerator } from '@/components/Post3DGenerator'
import { GhostViewMode } from '@/components/Ghost3DViewer'
import { Upload, FileVideo, Sparkles, Box, ScanLine } from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

interface Replay3DWizardDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Replay3DWizardDialog({
  open,
  onOpenChange,
}: Replay3DWizardDialogProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('video/')) {
        toast.error('Por favor, selecione um arquivo de vídeo.')
        return
      }
      setVideoFile(file)
    }
  }

  const handlePublish = (mode: GhostViewMode) => {
    toast.success('Replay 3D Publicado!', {
      description: `Sua reconstrução em modo ${mode.toUpperCase()} já está no feed.`,
      icon: <Box className="w-4 h-4 text-primary" />,
      duration: 5000,
    })

    onOpenChange(false)
    setVideoFile(null)
    navigate('/feed')
  }

  const reset = () => {
    setVideoFile(null)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val)
        if (!val) setTimeout(reset, 300)
      }}
    >
      <DialogContent className="sm:max-w-xl bg-background/95 backdrop-blur-xl border-border max-h-[90vh] overflow-y-auto p-0 gap-0">
        {!videoFile ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            <DialogHeader className="px-6 pt-6 pb-2">
              <DialogTitle className="text-2xl flex items-center gap-2 font-bold tracking-tight">
                <Box className="w-6 h-6 text-primary fill-primary/20" />
                Estúdio de Reconstrução 3D
              </DialogTitle>
            </DialogHeader>

            <div className="py-10 px-6 flex flex-col items-center justify-center space-y-8 text-center relative z-10">
              <div
                className="relative group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-indigo-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="w-24 h-24 rounded-3xl bg-background border-2 border-dashed border-primary/30 flex items-center justify-center relative shadow-xl transition-transform group-hover:scale-105">
                  <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                </div>
              </div>

              <div className="space-y-3 max-w-md mx-auto">
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">
                  Realidade Aumentada & Profundidade
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nossa tecnologia converte vídeos 2D em cenas 3D interativas.
                  Os atletas e a bola são transformados em objetos espaciais com
                  física e iluminação realista.
                </p>
              </div>

              <div className="grid gap-4 w-full max-w-sm">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/40 border border-border/60 hover:bg-secondary/60 transition-colors text-left">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <ScanLine className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="block font-bold text-sm">
                      Escaneamento AI
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Mapeamento de profundidade e movimento.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/40 border border-border/60 hover:bg-secondary/60 transition-colors text-left">
                  <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <Box className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                    <span className="block font-bold text-sm">
                      Reconstrução High-Fidelity
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Assets 3D realistas e iluminação dinâmica.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 w-full max-w-sm">
                <Button
                  size="lg"
                  className="w-full h-14 text-base font-bold shadow-xl shadow-primary/20 rounded-2xl hover:scale-[1.02] transition-transform"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FileVideo className="w-5 h-5 mr-2" />
                  Carregar Vídeo
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="video/*"
                  onChange={handleFileSelect}
                />
              </div>
            </div>
          </>
        ) : (
          <Post3DGenerator
            videoFile={videoFile}
            onConfirm={handlePublish}
            onCancel={reset}
            confirmLabel="Publicar Replay 3D"
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
