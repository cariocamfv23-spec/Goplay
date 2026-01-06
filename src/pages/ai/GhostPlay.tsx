import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Ghost, Upload, Play, Sparkles, ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { Post3DGenerator } from '@/components/Post3DGenerator'
import { GhostViewMode } from '@/components/Ghost3DViewer'
import { toast } from 'sonner'

export default function GhostPlay() {
  const navigate = useNavigate()
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handle3DConfirm = (mode: GhostViewMode) => {
    toast.success('Replay Salvo na Galeria!', {
      description: `Modo salvo: ${mode.toUpperCase()}. Você pode usá-lo em seus posts.`,
    })
    setVideoFile(null)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="p-4 flex items-center gap-4 border-b border-border/40">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Ghost className="w-6 h-6 text-indigo-500" />
          Ghost Play 3D
        </h1>
      </div>

      <div className="p-4 max-w-xl mx-auto space-y-6">
        {/* Intro Card */}
        <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
          <CardContent className="p-6 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-indigo-500" />
            </div>
            <h2 className="text-xl font-bold">Transforme seus Vídeos</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use nossa AI para reconstruir seus movimentos em um ambiente 3D
              Low-Poly. Analise sua técnica de qualquer ângulo.
            </p>
          </CardContent>
        </Card>

        {/* Main Interaction Area */}
        {videoFile ? (
          <Card className="border-border shadow-lg">
            <CardContent className="p-4">
              <Post3DGenerator
                videoFile={videoFile}
                onConfirm={handle3DConfirm}
                onCancel={() => setVideoFile(null)}
              />
            </CardContent>
          </Card>
        ) : (
          <div
            className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-muted/50 transition-colors group"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-lg">Carregar Vídeo</h3>
              <p className="text-sm text-muted-foreground">
                Toque para selecionar da galeria
              </p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="video/*"
              onChange={handleFileSelect}
            />
          </div>
        )}

        {/* Example Showcase */}
        {!videoFile && (
          <div className="space-y-3 pt-4">
            <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">
              Exemplos da Comunidade
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-video bg-zinc-900 rounded-lg overflow-hidden relative group cursor-pointer border border-border/50"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <Play className="w-8 h-8 text-white opacity-80" />
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white font-bold">
                    REPLAY #{i}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
