import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { mockMusicTracks, MusicTrack } from '@/lib/data'
import { Search, Music, X, Play } from 'lucide-react'
import { useState } from 'react'

interface MusicSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (track: MusicTrack) => void
  selectedTrack?: MusicTrack
}

export function MusicSelector({
  open,
  onOpenChange,
  onSelect,
  selectedTrack,
}: MusicSelectorProps) {
  const [search, setSearch] = useState('')

  const filteredTracks = mockMusicTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(search.toLowerCase()) ||
      track.artist.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSelect = (track: MusicTrack) => {
    onSelect(track)
    onOpenChange(false)
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[80vh] flex flex-col rounded-t-3xl">
        <DrawerHeader className="border-b pb-4">
          <DrawerTitle className="text-center flex items-center justify-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            Selecionar Música
          </DrawerTitle>
          <DrawerDescription className="text-center">
            Escolha uma trilha sonora para seu perfil ou vídeo
          </DrawerDescription>
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

        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar música ou artista..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary/50 border-none"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-2">
            {filteredTracks.map((track) => (
              <div
                key={track.id}
                onClick={() => handleSelect(track)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                  selectedTrack?.id === track.id
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-secondary/50 bg-secondary/20'
                }`}
              >
                <div className="relative h-12 w-12 rounded-md overflow-hidden bg-muted shrink-0 group">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="h-4 w-4 text-white fill-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className={`font-semibold text-sm truncate ${
                      selectedTrack?.id === track.id ? 'text-primary' : ''
                    }`}
                  >
                    {track.title}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {track.artist}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  {track.duration}
                </span>
              </div>
            ))}
            {filteredTracks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Music className="h-10 w-10 mx-auto mb-2 opacity-20" />
                <p>Nenhuma música encontrada</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
