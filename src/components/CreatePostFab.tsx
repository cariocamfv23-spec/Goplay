import { Button } from "@/components/ui/button"
import {
  Plus,
  Ghost,
  Video,
  X,
  Sparkles,
  Box,
  AtSign,
  Music,
} from "lucide-react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { Post3DGenerator } from "@/components/Post3DGenerator"
import { GhostViewMode } from "@/components/Ghost3DViewer"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MentionAutocomplete } from "@/components/feed/MentionAutocomplete"
import { AudioMusicModal } from "@/components/feed/AudioMusicModal"
import type { PostMention, PostMusicLink } from "@/services/feed"

import { useAuth } from "@/hooks/use-auth"
import { feedService } from "@/services/feed"
import { Loader2 } from "lucide-react"

export function CreatePostFab({
  onPostCreated,
}: {
  onPostCreated?: () => void
}) {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState("")
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null)
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null)
  const [selectedMusicLink, setSelectedMusicLink] =
    useState<PostMusicLink | null>(null)
  const [mentions, setMentions] = useState<PostMention[]>([])
  const [mentionQuery, setMentionQuery] = useState("")
  const [isMentionOpen, setIsMentionOpen] = useState(false)
  const [isMusicModalOpen, setIsMusicModalOpen] = useState(false)
  const [show3DGenerator, setShow3DGenerator] = useState(false)
  const [generatedMode, setGeneratedMode] = useState<GhostViewMode | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setContent(val)

    const cursor = e.target.selectionStart || val.length
    const textBeforeCursor = val.slice(0, cursor)
    const atMatch = textBeforeCursor.match(/@([a-zA-Z0-9_À-ÿ]*)$/)

    if (atMatch) {
      setMentionQuery(atMatch[1])
      setIsMentionOpen(true)
    } else {
      setIsMentionOpen(false)
    }
  }

  const handleSelectMention = (mention: PostMention) => {
    if (mentions.some((m) => m.id === mention.id)) {
      toast.info("Perfil já adicionado às marcações.")
      setIsMentionOpen(false)
      return
    }

    if (mentions.length >= 10) {
      toast.error("Limite de até 10 marcações por publicação atingido.")
      setIsMentionOpen(false)
      return
    }

    setMentions((prev) => [...prev, mention])

    const textarea = textareaRef.current
    if (textarea) {
      const cursor = textarea.selectionStart || content.length
      const textBeforeCursor = content.slice(0, cursor)
      const textAfterCursor = content.slice(cursor)
      const replacedBefore = textBeforeCursor.replace(
        /@([a-zA-Z0-9_À-ÿ]*)$/,
        "",
      )
      setContent(`${replacedBefore}${textAfterCursor}`)
    }

    setIsMentionOpen(false)
    toast.success(`@${mention.name} marcado no post!`)
  }

  const handleRemoveMention = (id: string) => {
    setMentions((prev) => prev.filter((m) => m.id !== id))
  }

  const handlePost = async () => {
    if (
      !content.trim() &&
      !selectedMedia &&
      !selectedAudio &&
      !selectedMusicLink
    )
      return

    if (user?.id) {
      setIsSubmitting(true)
      const { data, error } = await feedService.createPost({
        userId: user.id,
        content: content.trim(),
        mediaFiles: selectedMedia ? [selectedMedia] : [],
        audioFile: selectedAudio,
        musicLink: selectedMusicLink,
        mentions,
        postType: selectedMedia?.type.startsWith("video/")
          ? "video"
          : selectedMedia
            ? "image"
            : "text",
      })
      setIsSubmitting(false)

      if (error || !data) {
        toast.error(
          "Erro ao publicar: " + (error?.message || "Falha de conexão."),
        )
        return
      }

      toast.success("Publicação compartilhada com sucesso!", {
        description: "Seu post já está visível para a comunidade Goplay.",
      })
      if (onPostCreated) onPostCreated()
    } else {
      toast.success("Publicação enviada!", {
        description: "Seu post aparecerá no feed em instantes.",
      })
    }

    setIsOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setContent("")
    setSelectedMedia(null)
    setMediaPreview(null)
    setSelectedAudio(null)
    setSelectedMusicLink(null)
    setMentions([])
    setIsMentionOpen(false)
    setShow3DGenerator(false)
    setGeneratedMode(null)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        toast.error("Arquivo muito grande. O limite é 20MB.")
        return
      }
      setSelectedMedia(file)
      setMediaPreview(URL.createObjectURL(file))
    }
  }

  const handle3DConfirm = (mode: GhostViewMode) => {
    setGeneratedMode(mode)
    setShow3DGenerator(false)
    toast.success("Replay 3D anexado!", {
      description: "Agora você pode finalizar sua publicação.",
    })
  }

  const handleRemoveVideo = () => {
    setSelectedMedia(null)
    setMediaPreview(null)
    setGeneratedMode(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleGhostPlayNavigation = () => {
    setIsOpen(false)
    navigate("/ai/ghost-play")
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) resetForm()
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg z-40 bg-primary hover:bg-primary/90 text-white animate-in zoom-in duration-300"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border max-h-[90vh] overflow-y-auto">
        {/* If 3D Generator is active, show only that component */}
        {show3DGenerator && selectedMedia ? (
          <Post3DGenerator
            videoFile={selectedMedia}
            onConfirm={handle3DConfirm}
            onCancel={() => setShow3DGenerator(false)}
          />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Criar Nova Publicação</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2 relative">
                <Label htmlFor="content">No que você está pensando?</Label>
                <div className="relative">
                  <MentionAutocomplete
                    query={mentionQuery}
                    isOpen={isMentionOpen}
                    onSelect={handleSelectMention}
                    onClose={() => setIsMentionOpen(false)}
                    currentUserId={user?.id}
                    existingMentions={mentions}
                  />

                  <Textarea
                    ref={textareaRef}
                    id="content"
                    placeholder="Compartilhe seu treino, conquista... Digite @ para marcar alguém!"
                    className="min-h-[100px] resize-none"
                    value={content}
                    onChange={handleContentChange}
                  />
                </div>

                {/* Mention Chips List */}
                {mentions.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
                      <AtSign className="w-3 h-3 text-primary" />
                      Marcados ({mentions.length}):
                    </span>
                    {mentions.map((m) => (
                      <Badge
                        key={m.id}
                        variant="secondary"
                        className="text-xs py-0.5 px-2 bg-primary/10 text-primary border border-primary/20 flex items-center gap-1 rounded-full animate-in fade-in"
                      >
                        <Avatar className="w-3.5 h-3.5">
                          <AvatarImage
                            src={
                              m.avatar ||
                              `https://img.usecurling.com/ppl/thumbnail?seed=${m.id.slice(0, 4)}`
                            }
                          />
                          <AvatarFallback className="text-[8px]">
                            {m.name.slice(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{m.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveMention(m.id)}
                          disabled={isSubmitting}
                          className="hover:text-destructive p-0.5 rounded-full ml-0.5"
                          title="Remover marcação"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Music / Audio Indicator */}
                {(selectedAudio || selectedMusicLink) && (
                  <div className="p-2.5 rounded-xl border border-primary/30 bg-primary/5 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                        <Music className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground truncate">
                          {selectedAudio
                            ? selectedAudio.name
                            : selectedMusicLink?.title || "Música Anexada"}
                        </p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {selectedAudio
                            ? `${(selectedAudio.size / (1024 * 1024)).toFixed(2)} MB • Áudio local`
                            : `${selectedMusicLink?.platform.toUpperCase()}: ${selectedMusicLink?.url}`}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 rounded-full text-muted-foreground hover:text-destructive"
                      onClick={() => {
                        setSelectedAudio(null)
                        setSelectedMusicLink(null)
                      }}
                      disabled={isSubmitting}
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Media Preview Area */}
              {mediaPreview && (
                <div className="relative rounded-xl overflow-hidden bg-black/5 border border-border group">
                  {selectedMedia?.type.startsWith("video/") ? (
                    <video
                      src={mediaPreview}
                      className="w-full h-48 object-cover opacity-80"
                      controls={false}
                      muted
                    />
                  ) : (
                    <img
                      src={mediaPreview}
                      className="w-full h-48 object-cover"
                      alt="Prévia do post"
                    />
                  )}

                  {generatedMode && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                      <div className="bg-primary/90 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg animate-in zoom-in">
                        <Box className="w-3 h-3" />
                        Replay 3D:{" "}
                        {generatedMode === "split"
                          ? "Dividido"
                          : generatedMode === "ghost"
                            ? "Apenas 3D"
                            : "Original"}
                      </div>
                    </div>
                  )}

                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2 h-6 w-6 rounded-full opacity-90 hover:opacity-100 transition-opacity"
                    onClick={handleRemoveVideo}
                  >
                    <X className="w-3 h-3" />
                  </Button>

                  {/* 3D Generation Trigger for videos */}
                  {!generatedMode &&
                    selectedMedia?.type.startsWith("video/") && (
                      <div className="absolute bottom-2 left-2 right-2">
                        <Button
                          variant="default"
                          size="sm"
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg border border-indigo-400/30"
                          onClick={() => setShow3DGenerator(true)}
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Gerar Replay 3D
                        </Button>
                      </div>
                    )}
                </div>
              )}

              <div className="grid gap-2">
                <Label>Adicionar à publicação</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    className="w-full text-xs gap-1.5 px-2"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isSubmitting}
                  >
                    <Video className="w-3.5 h-3.5 text-primary" />
                    <span className="truncate">
                      {selectedMedia ? "Mídia" : "Foto/Vídeo"}
                    </span>
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*,video/mp4,video/webm"
                    onChange={handleFileSelect}
                  />

                  <Button
                    variant={mentions.length > 0 ? "secondary" : "outline"}
                    className="w-full text-xs gap-1.5 px-2"
                    onClick={() => {
                      setMentionQuery("")
                      setIsMentionOpen((prev) => !prev)
                    }}
                    disabled={isSubmitting}
                  >
                    <AtSign className="w-3.5 h-3.5 text-primary" />
                    <span className="truncate">
                      {mentions.length > 0
                        ? `Tags (${mentions.length})`
                        : "Marcar"}
                    </span>
                  </Button>

                  <Button
                    variant={
                      selectedAudio || selectedMusicLink
                        ? "secondary"
                        : "outline"
                    }
                    className="w-full text-xs gap-1.5 px-2"
                    onClick={() => setIsMusicModalOpen(true)}
                    disabled={isSubmitting}
                  >
                    <Music className="w-3.5 h-3.5 text-primary" />
                    <span className="truncate">
                      {selectedAudio || selectedMusicLink
                        ? "Música ✓"
                        : "Música"}
                    </span>
                  </Button>
                </div>
              </div>

              <Separator className="my-1" />

              <div className="grid gap-2">
                <Label className="text-primary flex items-center gap-2">
                  <Ghost className="w-4 h-4" />
                  Goplay AI Studio
                </Label>
                <Button
                  variant="secondary"
                  className="w-full gap-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 border border-indigo-500/20"
                  onClick={handleGhostPlayNavigation}
                >
                  <Ghost className="w-4 h-4" />
                  Abrir Estúdio Completo
                </Button>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handlePost}
                disabled={
                  (!content.trim() &&
                    !selectedMedia &&
                    !selectedAudio &&
                    !selectedMusicLink) ||
                  isSubmitting
                }
                className="font-bold gap-1.5"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-1" />
                    Publicando...
                  </>
                ) : (
                  "Publicar"
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>

      <AudioMusicModal
        open={isMusicModalOpen}
        onOpenChange={setIsMusicModalOpen}
        onSaveAudio={setSelectedAudio}
        onSaveMusicLink={setSelectedMusicLink}
        currentAudioFile={selectedAudio}
        currentMusicLink={selectedMusicLink}
      />
    </Dialog>
  )
}
