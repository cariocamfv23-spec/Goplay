import { useState, useEffect } from 'react'
import { useAlbumStore } from '@/stores/useAlbumStore'
import { mockStickers, Sticker } from '@/lib/album-data'
import { Button } from '@/components/ui/button'
import { X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PackOpenerProps {
  onClose: () => void
}

export function PackOpener({ onClose }: PackOpenerProps) {
  const { openPack } = useAlbumStore()
  const [cards, setCards] = useState<Sticker[]>([])
  const [currentIdx, setCurrentIdx] = useState<number>(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [finished, setFinished] = useState(false)

  // Generate 7 random cards on mount
  useEffect(() => {
    // 6 common, 1 rare
    const commons = mockStickers.filter((s) => s.rarity === 'common')
    const rares = mockStickers.filter((s) => s.rarity === 'rare')

    const randomCard = (arr: Sticker[]) =>
      arr[Math.floor(Math.random() * arr.length)]

    const newCards = [
      ...Array.from({ length: 6 }).map(() => randomCard(commons)),
      randomCard(rares),
    ]

    newCards.sort(() => Math.random() - 0.5)
    setCards(newCards)
  }, [])

  const handleInteract = () => {
    if (!isFlipped) {
      setIsFlipped(true)
    } else {
      if (currentIdx < cards.length - 1) {
        setIsFlipped(false)
        setTimeout(() => setCurrentIdx((prev) => prev + 1), 150)
      } else {
        openPack(cards.map((c) => c.id))
        setFinished(true)
      }
    }
  }

  const handleFinish = () => {
    if (!finished) openPack(cards.map((c) => c.id))
    onClose()
  }

  if (cards.length === 0) return null

  const currentCard = cards[currentIdx]

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center p-4 animate-in fade-in duration-500">
      {!finished && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-6 right-6 text-white/50 hover:text-white"
          onClick={handleFinish}
        >
          <X className="w-6 h-6" />
        </Button>
      )}

      {finished ? (
        <div className="text-center space-y-6 animate-in slide-in-from-bottom-10">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(34,197,94,0.5)]">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white">Pacote Aberto!</h2>
          <p className="text-zinc-400 max-w-xs mx-auto">
            7 figurinhas foram adicionadas ao seu álbum.
          </p>
          <Button
            onClick={onClose}
            className="bg-white text-black hover:bg-zinc-200 font-bold w-full max-w-[240px] h-12"
          >
            Ver Álbum
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-sm flex flex-col items-center gap-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-white">
              {isFlipped ? `${currentIdx + 1} de 7` : 'Novo Pacote'}
            </h2>
            <p className="text-sm text-zinc-400">
              {isFlipped ? 'Toque para a próxima' : 'Toque para revelar'}
            </p>
          </div>

          <div
            className="relative w-[260px] aspect-[3/4] [perspective:1000px] cursor-pointer group"
            onClick={handleInteract}
          >
            <div
              className={cn(
                'w-full h-full relative [transform-style:preserve-3d] transition-transform duration-700 ease-out',
                isFlipped
                  ? '[transform:rotateY(180deg)]'
                  : 'group-hover:scale-105',
              )}
            >
              {/* Back of Card */}
              <div className="absolute inset-0 [backface-visibility:hidden] bg-gradient-to-br from-green-600 to-green-900 rounded-2xl border-4 border-white/20 shadow-2xl flex flex-col items-center justify-center">
                <Sparkles className="w-12 h-12 text-yellow-300 mb-4 opacity-80" />
                <span className="text-white font-black tracking-[0.2em] text-xl">
                  COPA 2026
                </span>
                <span className="text-green-200/50 font-bold text-xs mt-2">
                  TAP TO OPEN
                </span>
              </div>

              {/* Front of Card */}
              <div
                className={cn(
                  'absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl border-4 overflow-hidden',
                  currentCard?.rarity === 'rare'
                    ? 'border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.6)]'
                    : 'border-white shadow-2xl',
                )}
              >
                {currentCard && (
                  <>
                    <img
                      src={currentCard.image}
                      alt={currentCard.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-md p-4 text-center">
                      <p className="text-white font-black text-xl">
                        {currentCard.country}
                      </p>
                      <p
                        className={cn(
                          'text-xs font-bold uppercase tracking-widest mt-1',
                          currentCard.rarity === 'rare'
                            ? 'text-yellow-400'
                            : 'text-zinc-400',
                        )}
                      >
                        {currentCard.rarity === 'rare' ? '🌟 RARA 🌟' : 'Comum'}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={handleInteract}
            className="w-full max-w-[260px] h-14 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-black text-lg hover:scale-105 transition-transform"
          >
            {isFlipped ? (currentIdx < 6 ? 'Próxima' : 'Concluir') : 'Revelar'}
          </Button>
        </div>
      )}
    </div>
  )
}
