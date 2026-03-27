import { useState, useEffect } from 'react'
import { Logo } from '@/components/Logo'
import { AppIcon } from '@/components/AppIcon'

const phrases = [
  'A grandeza exige tempo...',
  'Preparando o seu palco...',
  'O suor de hoje é a vitória de amanhã...',
  'Entrando em campo...',
  'Ajustando os detalhes finais...',
  'O seu esporte, levado a sério...',
]

export const PageLoader = () => {
  const [phrase, setPhrase] = useState('')

  useEffect(() => {
    setPhrase(phrases[Math.floor(Math.random() * phrases.length)])
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background animate-in fade-in duration-700 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[hsl(var(--gold)/0.1)] rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-background/50 flex items-center justify-center border border-border/50 shadow-xl backdrop-blur-sm z-20 relative animate-in fade-in zoom-in duration-700">
            {/* Enable Seasonal Elements for Splash Screen */}
            <AppIcon className="w-16 h-16" enableSeasonal={true} />
          </div>
          <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse delay-75 pointer-events-none z-10" />
        </div>

        <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300">
          <Logo variant="text" className="text-4xl" />
        </div>

        <div className="mt-2 flex gap-1">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
        </div>

        {phrase && (
          <div className="mt-6 animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-500">
            <p className="text-sm font-medium text-muted-foreground text-center animate-pulse px-6">
              {phrase}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
