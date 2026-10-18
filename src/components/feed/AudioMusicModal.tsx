import { useState, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Music,
  Upload,
  Link as LinkIcon,
  X,
  Check,
  Volume2,
} from 'lucide-react'
import { toast } from 'sonner'
import type { PostMusicLink } from '@/services/feed'

interface AudioMusicModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSaveAudio: (file: File | null) => void
  onSaveMusicLink: (link: PostMusicLink | null) => void
  currentAudioFile: File | null
  currentMusicLink: PostMusicLink | null
}

export function AudioMusicModal({
  open,
  onOpenChange,
  onSaveAudio,
  onSaveMusicLink,
  currentAudioFile,
  currentMusicLink,
}: AudioMusicModalProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'link'>(
    currentMusicLink ? 'link' : 'upload',
  )

  // Local draft state
  const [selectedFile, setSelectedFile] = useState<File | null>(
    currentAudioFile,
  )
  const [linkUrl, setLinkUrl] = useState<string>(currentMusicLink?.url || '')
  const [linkTitle, setLinkTitle] = useState<string>(
    currentMusicLink?.title || '',
  )
  const [linkArtist, setLinkArtist] = useState<string>(
    currentMusicLink?.artist || '',
  )
  const audioInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Limit ~15MB as requested in scope
    if (file.size > 15 * 1024 * 1024) {
      toast.error('O arquivo de áudio deve ter no máximo 15MB.')
      return
    }

    const validTypes = [
      'audio/mpeg',
      'audio/mp3',
      'audio/wav',
      'audio/x-wav',
      'audio/m4a',
      'audio/x-m4a',
      'audio/aac',
      'audio/ogg',
    ]

    const isAudioExt = /\.(mp3|m4a|wav|aac|ogg)$/i.test(file.name)
    if (
      !file.type.startsWith('audio/') &&
      !isAudioExt &&
      !validTypes.includes(file.type)
    ) {
      toast.error('Formato inválido. Selecione um arquivo MP3, M4A ou WAV.')
      return
    }

    setSelectedFile(file)
    toast.success(`Áudio "${file.name}" selecionado!`)
  }

  const handleConfirm = () => {
    if (activeTab === 'upload') {
      onSaveAudio(selectedFile)
      // When audio file is kept, clear music link or keep both? Usually mutually exclusive in music slot
      if (selectedFile) {
        onSaveMusicLink(null)
      }
    } else {
      const trimmedUrl = linkUrl.trim()
      if (!trimmedUrl) {
        onSaveMusicLink(null)
      } else {
        // Validate URL format
        try {
          const parsed = new URL(trimmedUrl)
          let platform: 'spotify' | 'youtube' | 'apple' | 'other' = 'other'
          if (parsed.hostname.includes('spotify.com')) platform = 'spotify'
          else if (
            parsed.hostname.includes('youtube.com') ||
            parsed.hostname.includes('youtu.be')
          )
            platform = 'youtube'
          else if (parsed.hostname.includes('apple.com')) platform = 'apple'

          onSaveMusicLink({
            platform,
            url: trimmedUrl,
            title: linkTitle.trim() || undefined,
            artist: linkArtist.trim() || undefined,
          })
          if (selectedFile) {
            onSaveAudio(null)
          }
        } catch {
          toast.error(
            'Por favor, insira uma URL de música válida (https://...).',
          )
          return
        }
      }
    }

    onOpenChange(false)
  }

  const handleClearAll = () => {
    setSelectedFile(null)
    setLinkUrl('')
    setLinkTitle('')
    setLinkArtist('')
    onSaveAudio(null)
    onSaveMusicLink(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Music className="w-5 h-5 text-primary" />
            Adicionar Música ou Áudio
          </DialogTitle>
          <DialogDescription>
            Anexe uma faixa sonora ou informe um link do Spotify, YouTube ou
            Apple Music na sua publicação.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as 'upload' | 'link')}
          className="w-full mt-2"
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="upload" className="text-xs gap-1.5">
              <Upload className="w-3.5 h-3.5" />
              Arquivo de Áudio
            </TabsTrigger>
            <TabsTrigger value="link" className="text-xs gap-1.5">
              <LinkIcon className="w-3.5 h-3.5" />
              Link de Música
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: UPLOAD DE ARQUIVO */}
          <TabsContent value="upload" className="space-y-3 pt-3">
            <input
              ref={audioInputRef}
              type="file"
              accept="audio/mp3,audio/mpeg,audio/m4a,audio/wav,audio/aac,audio/ogg,.mp3,.m4a,.wav"
              className="hidden"
              onChange={handleFileSelect}
            />

            {selectedFile ? (
              <div className="p-3.5 rounded-xl border border-primary/30 bg-primary/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                    <Volume2 className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB •
                      Áudio pronto para upload
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive rounded-full"
                  onClick={() => setSelectedFile(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div
                onClick={() => audioInputRef.current?.click()}
                className="border-2 border-dashed border-border/80 hover:border-primary/60 rounded-xl p-6 text-center cursor-pointer transition-colors bg-secondary/20 hover:bg-secondary/40 space-y-2"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-foreground">
                    Clique para selecionar um áudio
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    MP3, M4A ou WAV até 15MB
                  </p>
                </div>
              </div>
            )}
          </TabsContent>

          {/* TAB 2: LINK EXTERNO */}
          <TabsContent value="link" className="space-y-3 pt-3">
            <div className="space-y-1.5">
              <Label htmlFor="music-url" className="text-xs">
                Link da Música (Spotify, YouTube ou Apple Music)
              </Label>
              <Input
                id="music-url"
                placeholder="https://open.spotify.com/track/... ou YouTube"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label
                  htmlFor="music-title"
                  className="text-[11px] text-muted-foreground"
                >
                  Título (opcional)
                </Label>
                <Input
                  id="music-title"
                  placeholder="Nome da música"
                  value={linkTitle}
                  onChange={(e) => setLinkTitle(e.target.value)}
                  className="text-xs h-8"
                />
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="music-artist"
                  className="text-[11px] text-muted-foreground"
                >
                  Artista (opcional)
                </Label>
                <Input
                  id="music-artist"
                  placeholder="Nome do artista"
                  value={linkArtist}
                  onChange={(e) => setLinkArtist(e.target.value)}
                  className="text-xs h-8"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex items-center justify-between sm:justify-between gap-2 pt-2">
          {selectedFile || linkUrl ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-xs text-muted-foreground hover:text-destructive"
            >
              Remover Música
            </Button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-xs"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleConfirm}
              className="text-xs gap-1.5 bg-primary hover:bg-primary/90 text-white"
            >
              <Check className="w-3.5 h-3.5" />
              Concluir
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
