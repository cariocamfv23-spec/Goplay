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
  Loader2,
  Upload,
  Image as ImageIcon,
  Video as VideoIcon,
  Trash2,
  Check,
  AlertCircle,
  Eye,
} from 'lucide-react'
import { toast } from 'sonner'
import { profileService, type ProfileRow } from '@/services/profiles'
import { useAuth } from '@/hooks/use-auth'

interface EditCoverDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  profile: ProfileRow | null
  currentCover?: string | null
  currentType?: 'image' | 'video' | string | null
  onCoverUpdated?: (
    newCoverUrl: string | null,
    coverType: 'image' | 'video',
  ) => void
}

export function EditCoverDialog({
  open,
  onOpenChange,
  profile,
  currentCover,
  currentType = 'image',
  onCoverUpdated,
}: EditCoverDialogProps) {
  const { user, refreshProfile } = useAuth()
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [directUrl, setDirectUrl] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const effectiveCover = previewUrl || directUrl || currentCover || null
  const effectiveType =
    previewUrl && selectedFile?.type.startsWith('video/') ? 'video' : activeTab

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Max 15MB size check
    if (file.size > 15 * 1024 * 1024) {
      toast.error('O arquivo deve ter no máximo 15MB.')
      return
    }

    const isVideo = file.type.startsWith('video/')
    if (isVideo && !file.type.match(/video\/(mp4|webm)/)) {
      toast.error(
        'Vídeos suportados: MP4 ou WebM (máximo 15MB / curta duração).',
      )
      return
    }

    setSelectedFile(file)
    setActiveTab(isVideo ? 'video' : 'image')

    // Local object URL for preview
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)
    setDirectUrl('')
  }

  const handleSave = async () => {
    if (!user?.id) {
      toast.error('Usuário não autenticado.')
      return
    }

    setIsUploading(true)
    try {
      let finalCoverUrl = directUrl.trim() || currentCover || null
      let finalType: 'image' | 'video' = activeTab

      if (selectedFile) {
        // Upload to covers bucket in Supabase Storage
        const { url, type, error } = await profileService.uploadCover(
          user.id,
          selectedFile,
        )
        if (error || !url) {
          toast.error(
            'Erro ao fazer upload da capa: ' +
              (error?.message || 'Falha de conexão'),
          )
          setIsUploading(false)
          return
        }
        finalCoverUrl = url
        finalType = type
      }

      // Persist to public.profiles table in Supabase
      const { data, error: updateError } = await profileService.updateMyProfile(
        user.id,
        {
          cover_url: finalCoverUrl,
          cover_type: finalType,
        },
      )

      if (updateError) {
        toast.error('Erro ao salvar capa no perfil: ' + updateError.message)
        setIsUploading(false)
        return
      }

      await refreshProfile()
      toast.success(
        finalType === 'video'
          ? 'Capa em vídeo salva com sucesso!'
          : 'Capa atualizada com sucesso!',
      )

      if (onCoverUpdated) {
        onCoverUpdated(finalCoverUrl, finalType)
      }

      onOpenChange(false)
      setSelectedFile(null)
      setPreviewUrl(null)
    } catch (err: any) {
      toast.error(err?.message || 'Erro inesperado ao salvar capa.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveCover = async () => {
    if (!user?.id) return
    setIsRemoving(true)
    try {
      const { error } = await profileService.removeCover(user.id)
      if (error) {
        toast.error('Erro ao remover capa: ' + error.message)
        return
      }
      await refreshProfile()
      toast.success('Capa removida. Fundo padrão restaurado.')
      setSelectedFile(null)
      setPreviewUrl(null)
      setDirectUrl('')
      if (onCoverUpdated) {
        onCoverUpdated(null, 'image')
      }
      onOpenChange(false)
    } catch {
      toast.error('Falha ao remover capa.')
    } finally {
      setIsRemoving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            Editar Capa do Perfil
          </DialogTitle>
          <DialogDescription>
            Personalize a imagem ou vídeo de fundo do seu perfil.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-1">
          {/* Cover Preview Area */}
          <div className="relative h-44 w-full rounded-xl overflow-hidden bg-muted border border-border/60 shadow-inner group">
            {effectiveCover ? (
              effectiveType === 'video' ? (
                <video
                  src={effectiveCover}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
              ) : (
                <img
                  src={effectiveCover}
                  alt="Prévia da capa"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://img.usecurling.com/p/800/300?q=sports%20stadium'
                  }}
                />
              )
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-secondary/30">
                <ImageIcon className="h-10 w-10 mb-2 opacity-30" />
                <span className="text-xs font-medium">
                  Nenhuma capa configurada
                </span>
                <span className="text-[10px] text-muted-foreground/80">
                  Será exibido o fundo padrão esportivo
                </span>
              </div>
            )}

            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Eye className="w-3 h-3" />
              Prévia em Tempo Real
            </div>

            {selectedFile && (
              <div className="absolute bottom-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                Arquivo selecionado (não salvo ainda)
              </div>
            )}
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(val: any) => setActiveTab(val)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="image" className="text-xs gap-1.5">
                <ImageIcon className="h-3.5 w-3.5" />
                Imagem
              </TabsTrigger>
              <TabsTrigger value="video" className="text-xs gap-1.5">
                <VideoIcon className="h-3.5 w-3.5" />
                Vídeo Loop (MP4/WebM)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="image" className="space-y-3 pt-2">
              <div className="flex flex-col gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 border-dashed border-2 hover:border-primary/50 gap-2"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  <Upload className="h-4 w-4 text-primary" />
                  <span>Escolher Imagem do Dispositivo (até 15MB)</span>
                </Button>

                <div className="space-y-1 pt-1">
                  <Label className="text-xs text-muted-foreground">
                    Ou cole a URL direta de uma imagem:
                  </Label>
                  <Input
                    placeholder="https://exemplo.com/minha-capa.jpg"
                    value={directUrl}
                    onChange={(e) => {
                      setDirectUrl(e.target.value)
                      setSelectedFile(null)
                      setPreviewUrl(null)
                    }}
                    className="h-9 text-xs bg-background"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="video" className="space-y-3 pt-2">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="leading-tight">
                  <strong>Suporte a Vídeo:</strong> Recomendamos clipes curtos
                  (loops até 15MB em MP4 ou WebM). A reprodução com áudio
                  depende de interação do usuário.
                </p>
              </div>

              <input
                type="file"
                accept="video/mp4,video/webm"
                className="hidden"
                id="cover-video-input"
                onChange={handleFileChange}
              />
              <label htmlFor="cover-video-input">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 border-dashed border-2 hover:border-primary/50 gap-2"
                  asChild
                  disabled={isUploading}
                >
                  <span>
                    <Upload className="h-4 w-4 text-primary" />
                    <span>Escolher Arquivo de Vídeo (MP4/WebM)</span>
                  </span>
                </Button>
              </label>

              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Ou URL direta do vídeo:
                </Label>
                <Input
                  placeholder="https://exemplo.com/meu-video.mp4"
                  value={directUrl}
                  onChange={(e) => {
                    setDirectUrl(e.target.value)
                    setSelectedFile(null)
                    setPreviewUrl(null)
                  }}
                  className="h-9 text-xs bg-background"
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Remove Cover Action */}
          {(currentCover || effectiveCover) && (
            <div className="pt-1 flex items-center justify-between border-t border-border/50">
              <span className="text-xs text-muted-foreground">
                Deseja voltar ao fundo padrão?
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs text-destructive hover:bg-destructive/10"
                onClick={handleRemoveCover}
                disabled={isRemoving || isUploading}
              >
                {isRemoving ? (
                  <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                )}
                Remover Capa
              </Button>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isUploading}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={
              isUploading || (!selectedFile && !directUrl && !currentCover)
            }
            className="font-bold gap-1.5"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
                Salvando Capa...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Salvar Capa
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
