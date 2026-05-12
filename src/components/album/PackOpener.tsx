import { useState, useEffect } from 'react'
import { useAlbumStore } from '@/stores/useAlbumStore'
import { mockStickers, Sticker } from '@/lib/album-data'
import { Button } from '@/components/ui/button'
import { X, Sparkles, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PackOpenerProps {
  onClose: () => void
}

export function PackOpener({ onClose }: PackOpenerProps) {
  const { openPack } = useAlbumStore()
  const [cards, setCards] = useState<Sticker[]>([])
  const [currentIdx, setCurrentIdx] = useState<number>(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [step, setStep] = useState<'pack' | 'reveal' | 'summary'>('pack')
  const [isTearing, setIsTearing] = useState(false)

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

  const handleOpenPack = () => {
    if (isTearing) return
    setIsTearing(true)
    setTimeout(() => {
      setStep('reveal')
    }, 1000)
  }

  const handleInteract = () => {
    if (!isFlipped) {
      setIsFlipped(true)
    } else {
      if (currentIdx < cards.length - 1) {
        setIsFlipped(false)
        setTimeout(() => setCurrentIdx((prev) => prev + 1), 150)
      } else {
        openPack(cards.map((c) => c.id))
        setStep('summary')
      }
    }
  }

  const handleFinish = () => {
    if (step !== 'summary') {
      openPack(cards.map((c) => c.id))
    }
    onClose()
  }

  if (cards.length === 0) return null

  const currentCard = cards[currentIdx]

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center p-4 animate-in fade-in duration-500">
      {step !== 'summary' && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-6 right-6 text-white/50 hover:text-white"
          onClick={handleFinish}
        >
          <X className="w-6 h-6" />
        </Button>
      )}

      {step === 'pack' && (
        <div className="flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-500">
          <div
            onClick={handleOpenPack}
            className={cn(
              'relative w-64 aspect-[3/4] rounded-xl cursor-pointer shadow-[0_0_50px_rgba(250,204,21,0.3)] transition-all',
              isTearing
                ? 'animate-ping opacity-0 duration-1000 scale-110'
                : 'hover:scale-105 hover:shadow-[0_0_60px_rgba(250,204,21,0.6)]',
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-red-800 rounded-xl border-4 border-yellow-400 overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/500/500?q=foil%20texture')] opacity-30 mix-blend-overlay" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <Trophy className="w-16 h-16 text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.8)] mb-2" />
                <h3 className="text-3xl font-black text-white tracking-widest drop-shadow-md">
                  COPA 2026
                </h3>
                <div className="mt-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-1.5 rounded-full font-black text-sm shadow-lg">
                  CONTÉM 7 FIGURINHAS
                </div>
              </div>
            </div>
          </div>
          <p
            className={cn(
              'text-yellow-400 font-bold text-lg transition-opacity duration-300',
              isTearing ? 'opacity-0' : 'animate-pulse',
            )}
          >
            Toque para rasgar o pacote!
          </p>
        </div>
      )}

      {step === 'summary' && (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 space-y-12 animate-in fade-in duration-500">
          <div className="text-center space-y-3">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(34,197,94,0.5)] mb-4">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white">Pacote Aberto!</h2>
            <p className="text-zinc-400 text-lg">
              7 novas figurinhas para sua coleção.
            </p>
          </div>

          <div
            className="relative w-full max-w-md h-64 flex justify-center items-center"
            style={{ perspective: 1000 }}
          >
            {cards.map((card, i) => {
              const offset = i - 3
              const rotation = offset * 12
              const translateY = Math.abs(offset) * 15
              const zIndex = 10 - Math.abs(offset)

              return (
                <div
                  key={`${card.id}-${i}`}
                  className="absolute w-32 aspect-[3/4] rounded-lg border-2 border-white/20 overflow-hidden shadow-2xl transition-all duration-1000 animate-in slide-in-from-bottom-20"
                  style={{
                    transform: `rotate(${rotation}deg) translateY(${translateY}px) translateZ(${zIndex * 5}px)`,
                    zIndex,
                    animationDelay: `${i * 100}ms`,
                    animationFillMode: 'both',
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent pt-4 pb-1 px-1 text-center">
                    <span className="text-[10px] font-bold text-white truncate block">
                      {card.name}
                    </span>
                  </div>
                  {card.rarity === 'rare' && (
                    <div className="absolute inset-0 ring-2 ring-yellow-400 ring-inset shadow-[inset_0_0_15px_rgba(250,204,21,0.5)]" />
                  )}
                </div>
              )
            })}
          </div>

          <Button
            onClick={handleFinish}
            className="bg-white text-black hover:bg-zinc-200 font-black text-lg w-full max-w-[280px] h-14 shadow-xl"
          >
            Ver no Álbum
          </Button>
        </div>
      )}

      {step === 'reveal' && (
        <div className="w-full max-w-sm flex flex-col items-center gap-8 animate-in slide-in-from-bottom-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-white">
              {isFlipped ? `${currentIdx + 1} de 7` : 'Revelar Figurinha'}
            </h2>
            <p className="text-sm text-zinc-400">
              {isFlipped ? 'Toque para a próxima' : 'Toque para revelar'}
            </p>
          </div>

          <div
            className="relative w-[280px] aspect-[3/4] cursor-pointer group"
            style={{ perspective: 1000 }}
            onClick={handleInteract}
          >
            <div
              className={cn(
                'w-full h-full relative transition-transform duration-700 ease-out',
                isFlipped
                  ? '[transform:rotateY(180deg)]'
                  : 'group-hover:scale-105',
              )}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Back of Card */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-900 rounded-2xl border-4 border-white/20 shadow-2xl flex flex-col items-center justify-center"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <Trophy className="w-16 h-16 text-yellow-300 mb-4 opacity-90 drop-shadow-md" />
                <span className="text-white font-black tracking-[0.2em] text-2xl">
                  COPA 2026
                </span>
                <span className="text-green-200/60 font-bold text-sm mt-3 border border-green-200/30 px-3 py-1 rounded-full">
                  TOQUE PARA ABRIR
                </span>
              </div>

              {/* Front of Card */}
              <div
                className={cn(
                  'absolute inset-0 rounded-2xl border-4 overflow-hidden flex flex-col bg-zinc-900',
                  currentCard?.rarity === 'rare'
                    ? 'border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.6)]'
                    : 'border-zinc-200 shadow-2xl',
                )}
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                {currentCard && (
                  <>
                    <div className="relative flex-1">
                      <img
                        src={currentCard.image}
                        alt={currentCard.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* Top Branding */}
                      <div className="absolute top-0 inset-x-0 p-3 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent">
                        <span className="text-white font-black text-sm bg-black/60 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-sm">
                          #{currentCard.number}
                        </span>
                        <div
                          className="text-3xl drop-shadow-md"
                          title={currentCard.country}
                        >
                          {currentCard.flag}
                        </div>
                      </div>

                      {/* Rarity Badge */}
                      {currentCard.rarity === 'rare' && (
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-300 to-yellow-600 text-black px-3 py-0.5 rounded-full text-xs font-black tracking-widest uppercase shadow-lg border border-yellow-200">
                          Rara
                        </div>
                      )}
                    </div>

                    {/* Bottom Info */}
                    <div className="h-1/3 bg-gradient-to-t from-black via-black/95 to-black/60 p-4 flex flex-col justify-end text-center relative border-t-2 border-white/10">
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-zinc-100 text-black w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-4 border-zinc-900 shadow-lg">
                        {currentCard.position}
                      </div>
                      <h4 className="text-white font-black text-2xl uppercase tracking-tight leading-none mb-1 mt-2">
                        {currentCard.name}
                      </h4>
                      <p className="text-zinc-400 font-bold text-xs uppercase tracking-[0.2em]">
                        {currentCard.country}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={handleInteract}
            className="w-full max-w-[280px] h-14 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-black text-lg hover:scale-105 transition-transform shadow-lg"
          >
            {isFlipped
              ? currentIdx < 6
                ? 'Próxima Figurinha'
                : 'Ver Resumo'
              : 'Revelar'}
          </Button>
        </div>
      )}
    </div>
  )
}
