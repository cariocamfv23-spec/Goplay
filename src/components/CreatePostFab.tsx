import { Button } from '@/components/ui/button'
import { Plus, Image, Type, Video, FileText, X, Music } from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer'
import { useState } from 'react'
import { MusicSelector } from './MusicSelector'
import { MusicTrack } from '@/lib/data'
import { toast } from 'sonner'

export function CreatePostFab() {
  const [isOpen, setIsOpen] = useState(false)
  const [showVideoFlow, setShowVideoFlow] = useState(false)
  const [isMusicSelectorOpen, setIsMusicSelectorOpen] = useState(false)
  const [selectedMusic, setSelectedMusic] = useState<MusicTrack | null>(null)

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

  const handleCreateVideoPost = () => {
    // Mock post creation
    toast.success('Vídeo publicado com sucesso!', {
      description: selectedMusic
        ? `Com a música: ${selectedMusic.title}`
        : 'Som original',
    })
    setShowVideoFlow(false)
    setIsOpen(false)
    setSelectedMusic(null)
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
          if (!open) {
            setShowVideoFlow(false)
            setSelectedMusic(null)
          }
        }}
      >
        <DrawerContent className="pb-8">
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
              <div className="aspect-[9/16] bg-zinc-900 rounded-xl flex items-center justify-center relative overflow-hidden group border border-zinc-800">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-50"
                  style={{
                    backgroundImage:
                      "url('https://img.usecurling.com/p/400/800?q=training&color=black')",
                  }}
                ></div>
                <Button variant="secondary" className="relative z-10">
                  <Video className="h-4 w-4 mr-2" /> Selecionar Vídeo
                </Button>
              </div>

              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-between h-12"
                  onClick={() => setIsMusicSelectorOpen(true)}
                >
                  <span className="flex items-center gap-2">
                    <Music className="h-4 w-4 text-primary" />
                    {selectedMusic ? selectedMusic.title : 'Adicionar Música'}
                  </span>
                  {selectedMusic && (
                    <span className="text-xs text-muted-foreground">
                      {selectedMusic.artist}
                    </span>
                  )}
                </Button>

                <Button
                  className="w-full h-12 text-lg font-bold"
                  onClick={handleCreateVideoPost}
                >
                  Publicar
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
                    className={`h-16 w-16 rounded-2xl flex items-center justify-center ${opt.bg} transition-transform group-hover:scale-110`}
                  >
                    <opt.icon className={`h-8 w-8 ${opt.color}`} />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
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
    </>
  )
}
