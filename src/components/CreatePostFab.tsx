import { Button } from '@/components/ui/button'
import {
  Plus,
  Image,
  Type,
  Video,
  FileText,
  X,
  Music,
  Mic,
  ArrowRight,
} from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer'
import { useState } from 'react'
import { MusicSelector } from './MusicSelector'
import { MusicTrack, NarrationConfig } from '@/lib/data'
import { toast } from 'sonner'
import { NarrationEditor } from './NarrationEditor'
import { cn } from '@/lib/utils'

export function CreatePostFab() {
  const [isOpen, setIsOpen] = useState(false)
  const [showVideoFlow, setShowVideoFlow] = useState(false)
  const [isMusicSelectorOpen, setIsMusicSelectorOpen] = useState(false)
  const [isNarrationEditorOpen, setIsNarrationEditorOpen] = useState(false)
  const [selectedMusic, setSelectedMusic] = useState<MusicTrack | null>(null)
  const [narrationConfig, setNarrationConfig] =
    useState<NarrationConfig | null>(null)

  const options = [
    {
      label: 'Texto',
      icon: Type,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10 dark:bg-blue-500/20',
      action: () => toast.info('Funcionalidade em desenvolvimento'),
    },
    {
      label: 'Foto',
      icon: Image,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10 dark:bg-purple-500/20',
      action: () => toast.info('Funcionalidade em desenvolvimento'),
    },
    {
      label: 'Vídeo',
      icon: Video,
      color: 'text-red-500',
      bg: 'bg-red-500/10 dark:bg-red-500/20',
      action: () => setShowVideoFlow(true),
    },
    {
      label: 'Artigo',
      icon: FileText,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10 dark:bg-orange-500/20',
      action: () => toast.info('Funcionalidade em desenvolvimento'),
    },
  ]

  const handleMusicSelect = (track: MusicTrack) => {
    setSelectedMusic(track)
    toast.success('Música selecionada!', {
      description: `${track.title} - ${track.artist}`,
    })
  }

  const handleNarrationSave = (config: NarrationConfig) => {
    setNarrationConfig(config)
  }

  const handleCreateVideoPost = () => {
    // Mock post creation
    toast.success('Vídeo publicado com sucesso!', {
      description: cn(
        selectedMusic ? `Com a música: ${selectedMusic.title}` : 'Som original',
        narrationConfig && ' + Narração AI',
      ),
    })
    setShowVideoFlow(false)
    setIsOpen(false)
    setSelectedMusic(null)
    setNarrationConfig(null)
  }

  const resetFlow = () => {
    setShowVideoFlow(false)
    setSelectedMusic(null)
    setNarrationConfig(null)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg z-40 bg-primary hover:bg-primary/90 animate-fade-in"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <Drawer
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open)
          if (!open) resetFlow()
        }}
      >
        <DrawerContent className="pb-8 bg-background/95 backdrop-blur-xl">
          <DrawerHeader className="relative">
            <DrawerTitle className="text-center text-xl font-bold">
              {showVideoFlow ? 'Novo Vídeo Move' : 'Criar Publicação'}
            </DrawerTitle>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
              >
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          {showVideoFlow ? (
            <div className="px-6 py-4 space-y-6">
              <div className="aspect-[9/16] bg-zinc-900 rounded-xl flex items-center justify-center relative overflow-hidden group border border-zinc-800 shadow-inner">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60"
                  style={{
                    backgroundImage:
                      "url('https://img.usecurling.com/p/400/800?q=training&color=black')",
                  }}
                ></div>
                <Button
                  variant="secondary"
                  className="relative z-10 bg-black/50 backdrop-blur-md text-white border border-white/20 hover:bg-black/70"
                >
                  <Video className="h-4 w-4 mr-2" /> Selecionar Vídeo
                </Button>
                {narrationConfig && (
                  <div className="absolute top-2 right-2 bg-gold text-black text-xs font-bold px-2 py-1 rounded-md shadow-lg flex items-center gap-1">
                    <Mic className="h-3 w-3" /> Narração Ativa
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className={cn(
                      'justify-start h-12 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all',
                      selectedMusic && 'border-primary bg-primary/10',
                    )}
                    onClick={() => setIsMusicSelectorOpen(true)}
                  >
                    <Music className="h-4 w-4 mr-2 text-primary" />
                    <span className="truncate text-xs font-medium">
                      {selectedMusic ? selectedMusic.title : 'Música'}
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    className={cn(
                      'justify-start h-12 border-gold/20 hover:border-gold/50 hover:bg-gold/5 transition-all',
                      narrationConfig && 'border-gold bg-gold/10',
                    )}
                    onClick={() => setIsNarrationEditorOpen(true)}
                  >
                    <Mic className="h-4 w-4 mr-2 text-gold" />
                    <span className="truncate text-xs font-medium">
                      {narrationConfig ? 'Editar Narração' : 'Narração AI'}
                    </span>
                  </Button>
                </div>

                <Button
                  className="w-full h-12 text-lg font-bold bg-gradient-to-r from-primary to-purple-800 shadow-lg hover:shadow-primary/25"
                  onClick={handleCreateVideoPost}
                >
                  Publicar <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4 px-6 py-8">
              {options.map((opt) => (
                <div
                  key={opt.label}
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                  onClick={opt.action}
                >
                  <div
                    className={`h-16 w-16 rounded-2xl flex items-center justify-center ${opt.bg} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                  >
                    <opt.icon className={`h-8 w-8 ${opt.color}`} />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {opt.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </DrawerContent>
      </Drawer>

      <MusicSelector
        open={isMusicSelectorOpen}
        onOpenChange={setIsMusicSelectorOpen}
        onSelect={handleMusicSelect}
        selectedTrack={selectedMusic || undefined}
      />

      <NarrationEditor
        open={isNarrationEditorOpen}
        onOpenChange={setIsNarrationEditorOpen}
        onSave={handleNarrationSave}
        initialConfig={narrationConfig || undefined}
        videoThumbnail="https://img.usecurling.com/p/400/800?q=training&color=black"
      />
    </>
  )
}
