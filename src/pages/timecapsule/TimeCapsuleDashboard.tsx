import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTimeCapsuleStore, TimeCapsule } from '@/stores/useTimeCapsuleStore'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Lock,
  Hourglass,
  Unlock,
  ArrowLeft,
  Plus,
  Video,
  FileText,
  Calendar,
  Archive,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export default function TimeCapsuleDashboard() {
  const navigate = useNavigate()
  const { capsules, checkReleases, archiveCapsule } = useTimeCapsuleStore()
  const [activeTab, setActiveTab] = useState('sealed')

  useEffect(() => {
    checkReleases()
  }, [checkReleases])

  const sealed = capsules.filter((c) => c.status === 'sealed')
  const waiting = capsules.filter((c) => c.status === 'waiting')
  const released = capsules.filter((c) => c.status === 'released')

  const handleArchive = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    archiveCapsule(id)
    toast.success('Cápsula arquivada com sucesso.')
  }

  const renderCapsuleCard = (capsule: TimeCapsule) => {
    const isReleased = capsule.status === 'released'
    const isWaiting = capsule.status === 'waiting'

    return (
      <Card
        key={capsule.id}
        className={cn(
          'mb-4 overflow-hidden transition-all duration-300 group',
          isReleased
            ? 'cursor-pointer hover:border-gold/50 bg-gradient-to-br from-card to-gold/5'
            : 'opacity-90',
        )}
        onClick={() => {
          if (isReleased) navigate(`/timecapsule/${capsule.id}`)
        }}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'p-2 rounded-lg flex items-center justify-center',
                  isReleased
                    ? 'bg-gold/20 text-gold'
                    : isWaiting
                      ? 'bg-orange-500/20 text-orange-500'
                      : 'bg-primary/20 text-primary',
                )}
              >
                {capsule.type === 'video' ? (
                  <Video className="w-5 h-5" />
                ) : (
                  <FileText className="w-5 h-5" />
                )}
              </div>
              <div>
                <h3
                  className={cn(
                    'font-bold text-base line-clamp-1',
                    isReleased && 'text-gold',
                  )}
                >
                  {capsule.title}
                </h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Criada em{' '}
                  {format(new Date(capsule.createdAt), 'dd/MM/yyyy', {
                    locale: ptBR,
                  })}
                </p>
              </div>
            </div>
            {!isReleased && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-red-400 -mr-2 -mt-2 z-10"
                onClick={(e) => handleArchive(capsule.id, e)}
                title="Arquivar"
              >
                <Archive className="w-4 h-4" />
              </Button>
            )}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {capsule.description}
          </p>

          <div
            className={cn(
              'flex items-center justify-between p-3 rounded-xl border',
              isReleased
                ? 'bg-gold/10 border-gold/20'
                : isWaiting
                  ? 'bg-orange-500/10 border-orange-500/20'
                  : 'bg-primary/10 border-primary/20',
            )}
          >
            <div className="flex items-center gap-2">
              {isReleased ? (
                <Unlock className="w-4 h-4 text-gold" />
              ) : isWaiting ? (
                <Hourglass className="w-4 h-4 text-orange-500 animate-pulse" />
              ) : (
                <Lock className="w-4 h-4 text-primary" />
              )}
              <span
                className={cn(
                  'text-xs font-bold uppercase tracking-wider',
                  isReleased
                    ? 'text-gold'
                    : isWaiting
                      ? 'text-orange-500'
                      : 'text-primary',
                )}
              >
                {isReleased ? 'Liberada' : isWaiting ? 'Quase lá' : 'Selada'}
              </span>
            </div>

            <div className="text-xs font-medium bg-background/50 px-2 py-1 rounded shadow-sm">
              {isReleased ? (
                <span className="text-foreground">
                  Aberta{' '}
                  {formatDistanceToNow(new Date(capsule.openAt), {
                    locale: ptBR,
                    addSuffix: true,
                  })}
                </span>
              ) : (
                <span className="text-foreground">
                  Abre em{' '}
                  {formatDistanceToNow(new Date(capsule.openAt), {
                    locale: ptBR,
                  })}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-in relative">
      {/* Header */}
      <div className="bg-primary/5 border-b border-primary/10 p-4 pt-6 pb-6 text-center relative z-10">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-5"
          onClick={() => navigate('/profile/me')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Lock className="w-8 h-8 text-gold mx-auto mb-2" />
        <h1 className="text-2xl font-black text-primary uppercase tracking-tight">
          Time Capsule™
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Suas metas guardadas no tempo
        </p>
      </div>

      <div className="flex-1 p-4 pb-24 z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-secondary/50">
            <TabsTrigger value="sealed" className="text-xs">
              <Lock className="w-3 h-3 mr-1" /> Seladas
            </TabsTrigger>
            <TabsTrigger value="waiting" className="text-xs relative">
              <Hourglass className="w-3 h-3 mr-1" /> Quase lá
              {waiting.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              )}
            </TabsTrigger>
            <TabsTrigger value="released" className="text-xs relative">
              <Unlock className="w-3 h-3 mr-1" /> Liberadas
              {released.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gold" />
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sealed" className="mt-0">
            {sealed.length > 0 ? (
              sealed.map(renderCapsuleCard)
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Lock className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Nenhuma cápsula selada no momento.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="waiting" className="mt-0">
            {waiting.length > 0 ? (
              waiting.map(renderCapsuleCard)
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Hourglass className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Nenhuma cápsula próxima da abertura.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="released" className="mt-0">
            {released.length > 0 ? (
              released.map(renderCapsuleCard)
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Unlock className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Nenhuma cápsula liberada ainda.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* FAB to create new capsule */}
      <Button
        className="fixed bottom-6 right-4 h-14 w-14 rounded-full shadow-[0_0_20px_rgba(var(--gold),0.3)] z-40 bg-gold hover:bg-gold/90 text-black animate-in zoom-in duration-300"
        onClick={() => navigate('/timecapsule/create')}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  )
}
