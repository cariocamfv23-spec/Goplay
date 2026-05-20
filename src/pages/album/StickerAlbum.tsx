import { useAlbumStore } from '@/stores/useAlbumStore'
import { mockStickers, Sticker } from '@/lib/album-data'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Trophy, Share2, PackageOpen, Info, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PackOpener } from '@/components/album/PackOpener'
import { ShareDialog } from '@/components/ShareDialog'
import { mockCurrentUser } from '@/lib/data'
import { useToast } from '@/hooks/use-toast'

export default function StickerAlbum() {
  const navigate = useNavigate()
  const { collected, unopenedPacks, addPack } = useAlbumStore()
  const [isOpenerOpen, setIsOpenerOpen] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const { toast } = useToast()

  const referralCode = mockCurrentUser.referralCode || 'GOPLAY2024'
  const inviteLink = `https://goplay-app-screens-11312.goskip.app/invite/${referralCode}`
  const inviteMessage = `Comece sua coleção no GoPlay! Use meu link para ganhar seu álbum da Copa 2026:`

  const handleShareAction = () => {
    // Simulate reward loop after returning from share
    setTimeout(() => {
      addPack()
      toast({
        title: '🎉 Novo amigo cadastrado!',
        description:
          'Alguém se cadastrou com seu link! Você ganhou 1 pacote de figurinhas.',
        duration: 6000,
      })
    }, 4500)
  }

  const totalStickers = mockStickers.length
  const collectedCount = collected.length
  const progress = Math.round((collectedCount / totalStickers) * 100)

  // Group stickers by country
  const groupedStickers = mockStickers.reduce(
    (acc, sticker) => {
      if (!acc[sticker.country]) acc[sticker.country] = []
      acc[sticker.country].push(sticker)
      return acc
    },
    {} as Record<string, Sticker[]>,
  )

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header World Cup Themed */}
      <div className="bg-gradient-to-br from-green-700 via-emerald-600 to-green-900 text-white pb-8 rounded-b-[2.5rem] relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/1000/1000?q=soccer%20pattern&color=green')] bg-cover opacity-10 mix-blend-overlay" />

        <div className="absolute top-safe pt-4 left-4 z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/album')}
            className="text-white hover:bg-white/20 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </Button>
        </div>

        <div className="relative z-10 pt-10 pb-4 px-6 text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-inner">
            <Trophy className="w-8 h-8 text-yellow-300 drop-shadow-md" />
          </div>
          <h1 className="text-3xl font-black tracking-tight leading-tight">
            Álbum Virtual <br />
            <span className="text-yellow-300">Copa 2026</span>
          </h1>

          <div className="max-w-xs mx-auto space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
              <span>Progresso</span>
              <span>{progress}%</span>
            </div>

            <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-300 transition-all duration-1000 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-xs text-green-100">
              {collectedCount} de {totalStickers} figurinhas colecionadas
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-6 relative z-20 space-y-6">
        {/* Stateless Disclaimer */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 flex items-start gap-3 shadow-sm">
          <Info className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-700 dark:text-yellow-400/90 leading-relaxed">
            <strong className="font-bold">Aviso de Demonstração:</strong> Suas
            figurinhas adquiridas nesta sessão serão resetadas ao recarregar a
            página até que o banco de dados seja integrado.
          </p>
        </div>

        {/* Action Panel */}
        <Card className="p-4 flex items-center justify-between shadow-lg border-none bg-card">
          <div className="flex items-center gap-3">
            <div className="relative">
              <PackageOpen
                className={cn(
                  'w-8 h-8',
                  unopenedPacks > 0
                    ? 'text-yellow-500'
                    : 'text-muted-foreground',
                )}
              />
              {unopenedPacks > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                  {unopenedPacks}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-bold leading-none">Pacotes</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {unopenedPacks} disponíveis
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsOpenerOpen(true)}
            disabled={unopenedPacks === 0}
            className={cn(
              'font-bold transition-all shadow-md active:scale-95',
              unopenedPacks > 0
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700'
                : '',
            )}
          >
            Abrir Pacote
          </Button>
        </Card>

        {/* Share Banner */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-5 border border-primary/20 flex flex-col items-center text-center space-y-3 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
          <Info className="w-6 h-6 text-primary mb-1" />
          <h3 className="font-bold text-lg leading-tight">
            Quer mais figurinhas?
          </h3>
          <p className="text-sm text-muted-foreground">
            Convide seus amigos para o GoPlay. A cada amigo que se cadastrar
            pelo seu link, você ganha{' '}
            <strong>1 pacote com 7 figurinhas!</strong>
          </p>
          <Button
            onClick={() => setIsShareOpen(true)}
            className="w-full mt-2 font-bold shadow-md"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Convidar Amigos
          </Button>
        </div>

        {/* Album Grid */}
        <div className="space-y-8">
          {Object.entries(groupedStickers).map(([country, stickers]) => (
            <div key={country} className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="font-black text-xl tracking-tight uppercase border-l-4 border-primary pl-3">
                  {country}
                </h3>
                <span className="text-xs font-medium text-muted-foreground">
                  ({stickers.filter((s) => collected.includes(s.id)).length}/
                  {stickers.length})
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {stickers.map((sticker) => {
                  const isCollected = collected.includes(sticker.id)
                  return (
                    <div
                      key={sticker.id}
                      className={cn(
                        'relative aspect-[3/4] rounded-lg overflow-hidden border shadow-sm transition-all duration-300',
                        isCollected
                          ? 'border-primary/50'
                          : 'border-dashed border-border bg-secondary/30',
                        isCollected && sticker.rarity === 'rare'
                          ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-background'
                          : '',
                      )}
                    >
                      {isCollected ? (
                        <>
                          <img
                            src={sticker.image}
                            alt={sticker.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-sm rounded px-1 text-[10px] shadow-sm">
                            {sticker.flag}
                          </div>
                          <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-sm rounded px-1 text-[10px] font-bold text-white">
                            #{sticker.number}
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-4 pb-1 px-1 text-center">
                            <p className="text-[10px] font-bold text-white leading-tight truncate">
                              {sticker.name}
                            </p>
                            <p className="text-[8px] text-zinc-300 font-medium">
                              {sticker.position}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/40">
                          <Lock className="w-5 h-5 mb-1 opacity-50" />
                          <span className="font-black text-xl opacity-50">
                            {sticker.number}
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Dialog */}
      <ShareDialog
        open={isShareOpen}
        onOpenChange={setIsShareOpen}
        title="Ganhe Figurinhas"
        description={inviteMessage}
        url={inviteLink}
        onShareAction={handleShareAction}
      />

      {/* Pack Opener */}
      {isOpenerOpen && <PackOpener onClose={() => setIsOpenerOpen(false)} />}
    </div>
  )
}
