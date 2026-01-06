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
import { Upload, FileVideo, Sparkles, Box } from 'lucide-react'
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
    // Simulate publication logic
    toast.success('Replay Publicado com Sucesso!', {
      description: `Seu replay no modo ${mode.toUpperCase()} foi postado no feed.`,
      icon: <Box className="w-4 h-4 text-primary" />,
      duration: 5000,
    })

    // Close and reset
    onOpenChange(false)
    setVideoFile(null)

    // Navigate to feed to simulate "viewing" the post
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
        if (!val) setTimeout(reset, 300) // Reset after animation
      }}
    >
      <DialogContent className="sm:max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
        {!videoFile ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                <Box className="w-5 h-5 text-primary" />
                Criar Replay 3D
              </DialogTitle>
            </DialogHeader>

            <div className="py-8 flex flex-col items-center justify-center space-y-6 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-2 animate-pulse">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>

              <div className="space-y-2 max-w-sm">
                <h3 className="text-lg font-bold">Transforme seus vídeos</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Utilize nossa IA para gerar uma versão{' '}
                  <strong>Low-Poly 3D</strong> dos seus melhores momentos
                  esportivos.
                </p>
              </div>

              <div className="grid gap-3 w-full max-w-xs">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50 text-left text-sm">
                  <div className="bg-background p-2 rounded-md shadow-sm">
                    <Upload className="w-4 h-4 text-primary" />
                  </div>
                  <span>1. Envie seu vídeo</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50 text-left text-sm">
                  <div className="bg-background p-2 rounded-md shadow-sm">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                  </div>
                  <span>2. Aguarde o processamento</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50 text-left text-sm">
                  <div className="bg-background p-2 rounded-md shadow-sm">
                    <Box className="w-4 h-4 text-indigo-500" />
                  </div>
                  <span>3. Escolha o formato e publique</span>
                </div>
              </div>

              <div className="pt-4 w-full">
                <Button
                  size="lg"
                  className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FileVideo className="w-5 h-5 mr-2" />
                  Selecionar Vídeo
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
            confirmLabel="Publicar no Feed"
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
