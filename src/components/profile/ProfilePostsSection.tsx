import { useState, useEffect, useRef, useCallback } from 'react'
import { feedService, type PostItem } from '@/services/feed'
import { PostCard } from '@/components/PostCard'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  ImagePlus,
  Send,
  Loader2,
  X,
  AlertCircle,
  RefreshCw,
  Sparkles,
  MessageSquare,
  Video,
} from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'

interface ProfilePostsSectionProps {
  userId: string
  isMe: boolean
  userName?: string
  userAvatar?: string
}

export function ProfilePostsSection({
  userId,
  isMe,
  userName = 'Usuário',
  userAvatar,
}: ProfilePostsSectionProps) {
  const { user: authUser, profile: authProfile } = useAuth()

  // Posts listing state
  const [posts, setPosts] = useState<PostItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Composer state
  const [content, setContent] = useState('')
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null)
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isSupabaseAuthor =
    typeof userId === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      userId,
    )

  // Load posts for this user
  const loadPosts = useCallback(async () => {
    if (!isSupabaseAuthor) {
      setPosts([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    const { data, error: fetchErr } = await feedService.getUserPosts(
      userId,
      authUser?.id,
      50,
    )

    if (fetchErr) {
      setError('Não foi possível carregar as publicações. Tente novamente.')
    } else {
      setPosts(data || [])
    }
    setLoading(false)
  }, [userId, authUser?.id, isSupabaseAuthor])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  // Realtime subscription for posts created/deleted by this user
  useEffect(() => {
    if (!isSupabaseAuthor) return

    const channelName = `profile-posts-${userId}-${Date.now()}`
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts',
          filter: `user_id=eq.${userId}`,
        },
        () => {
          // Refresh list on insert, update or delete
          loadPosts()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, isSupabaseAuthor, loadPosts])

  // Media selector handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 20 * 1024 * 1024) {
      toast.error('Arquivo muito grande. O limite máximo é de 20MB.')
      return
    }

    setSelectedMedia(file)
    setMediaPreview(URL.createObjectURL(file))
  }

  const handleClearMedia = () => {
    setSelectedMedia(null)
    if (mediaPreview) {
      URL.revokeObjectURL(mediaPreview)
      setMediaPreview(null)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleCreatePost = async () => {
    if (!authUser?.id) {
      toast.error('Faça login para criar uma publicação.')
      return
    }

    const trimmed = content.trim()
    if (!trimmed && !selectedMedia) {
      toast.error('Escreva uma mensagem ou adicione uma foto/vídeo.')
      return
    }

    setIsSubmitting(true)
    const isVideo = selectedMedia?.type.startsWith('video/')
    const postType = isVideo ? 'video' : selectedMedia ? 'image' : 'text'

    const { data: created, error: createErr } = await feedService.createPost({
      userId: authUser.id,
      content: trimmed,
      mediaFiles: selectedMedia ? [selectedMedia] : [],
      postType,
    })

    setIsSubmitting(false)

    if (createErr || !created) {
      toast.error(
        'Erro ao publicar: ' + (createErr?.message || 'Falha de conexão.'),
      )
      return
    }

    // Success feedback
    toast.success('Publicação realizada com sucesso!', {
      description: 'Seu post já está visível no seu perfil e no feed central.',
    })

    // Reset composer form
    setContent('')
    handleClearMedia()

    // Add to local list immediately
    setPosts((prev) => {
      if (prev.some((p) => p.id === created.id)) return prev
      return [created, ...prev]
    })
  }

  const handlePostDeleted = (deletedId: string | number) => {
    setPosts((prev) => prev.filter((p) => p.id !== String(deletedId)))
  }

  // Author avatar for composer
  const composerAvatar =
    authProfile?.avatar_url ||
    userAvatar ||
    (authUser?.id
      ? `https://img.usecurling.com/ppl/thumbnail?seed=${authUser.id.slice(0, 4)}`
      : 'https://img.usecurling.com/ppl/thumbnail?seed=user')

  return (
    <div className="space-y-4">
      {/* Real Post Composer (only visible to profile owner) */}
      {isMe && (
        <Card className="border border-border/60 bg-gradient-to-b from-card to-card/60 shadow-sm rounded-2xl overflow-hidden">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-border/40">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Criar Publicação Real
              </span>
              <Badge
                variant="secondary"
                className="text-[10px] bg-primary/10 text-primary border-primary/20 font-medium"
              >
                No seu perfil & Feed
              </Badge>
            </div>

            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 border border-border shrink-0 mt-0.5">
                <AvatarImage src={composerAvatar} alt="Meu Avatar" />
                <AvatarFallback>EU</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Compartilhe uma conquista, treino, novidade ou pensamento..."
                  rows={3}
                  disabled={isSubmitting}
                  className="resize-none bg-background/60 border-border/60 focus-visible:ring-primary text-sm min-h-[72px]"
                />

                {/* Media Preview inside Composer */}
                {mediaPreview && (
                  <div className="relative rounded-xl overflow-hidden border border-border/60 bg-black/5 max-h-56">
                    {selectedMedia?.type.startsWith('video/') ? (
                      <video
                        src={mediaPreview}
                        className="w-full h-44 object-cover"
                        controls
                      />
                    ) : (
                      <img
                        src={mediaPreview}
                        alt="Prévia da imagem"
                        className="w-full h-44 object-cover"
                      />
                    )}
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 h-7 w-7 rounded-full shadow-md"
                      onClick={handleClearMedia}
                      disabled={isSubmitting}
                      title="Remover mídia"
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isSubmitting}
                      className="h-8 text-xs gap-1.5 border-border/60 hover:bg-secondary/60"
                    >
                      {selectedMedia?.type.startsWith('video/') ? (
                        <Video className="w-3.5 h-3.5 text-primary" />
                      ) : (
                        <ImagePlus className="w-3.5 h-3.5 text-primary" />
                      )}
                      <span>
                        {selectedMedia ? 'Trocar Mídia' : 'Foto / Vídeo'}
                      </span>
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/mp4,video/webm"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>

                  <Button
                    type="button"
                    size="sm"
                    onClick={handleCreatePost}
                    disabled={
                      isSubmitting || (!content.trim() && !selectedMedia)
                    }
                    className="h-8 px-4 font-bold text-xs gap-1.5 shadow-md bg-primary hover:bg-primary/90 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Publicando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Publicar</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 gap-2 text-muted-foreground">
          <Loader2 className="w-7 h-7 animate-spin text-primary" />
          <span className="text-xs">Carregando publicações...</span>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <Card className="border-destructive/30 bg-destructive/5 text-center p-6">
          <CardContent className="space-y-3 p-0">
            <AlertCircle className="w-8 h-8 text-destructive mx-auto" />
            <p className="text-xs text-destructive font-medium">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={loadPosts}
              className="text-xs gap-1.5 border-destructive/30 hover:bg-destructive/10"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-border/50 bg-secondary/10 space-y-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-foreground">
              {isMe
                ? 'Nenhuma publicação ainda'
                : `${userName} ainda não publicou`}
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              {isMe
                ? 'Use o campo acima para criar sua primeira postagem real. Ela aparecerá aqui e no Feed principal para todos os atletas!'
                : 'Quando novas publicações forem compartilhadas, elas aparecerão aqui em tempo real.'}
            </p>
          </div>
        </div>
      )}

      {/* Real Posts Feed List */}
      {!loading && !error && posts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {posts.length}{' '}
              {posts.length === 1 ? 'publicação real' : 'publicações reais'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={loadPosts}
              className="h-7 text-[11px] text-muted-foreground hover:text-foreground gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Atualizar
            </Button>
          </div>

          {posts.map((post) => {
            const formattedForCard = {
              id: post.id,
              type: post.type,
              user: {
                id: post.user.id,
                name: post.user.name,
                avatar: post.user.avatar,
                type: post.user.type,
                sport: post.user.sport,
              },
              content: post.content,
              media: post.media,
              image: post.media?.[0],
              videoUrl: post.videoUrl,
              likes: post.likesCount,
              comments: post.commentsCount,
              shares: 0,
              applauds: 0,
              supports: 0,
              time: post.timeAgo,
              liked: post.isLiked,
            }

            return (
              <div key={post.id} className="rounded-2xl">
                <PostCard
                  post={formattedForCard}
                  onDeleted={handlePostDeleted}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
