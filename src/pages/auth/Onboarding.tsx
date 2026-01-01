import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Trophy, Users, Star, ArrowRight, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SportsWallpaper } from '@/components/SportsWallpaper'

const steps = [
  {
    icon: Trophy,
    title: 'Compita e Ganhe',
    description:
      'Participe de campeonatos, suba no ranking e ganhe prêmios exclusivos.',
    color: 'text-gold',
  },
  {
    icon: Users,
    title: 'Conecte-se',
    description: 'Encontre atletas, times e oportunidades perto de você.',
    color: 'text-primary',
  },
  {
    icon: Star,
    title: 'Seja Descoberto',
    description:
      'Mostre seu talento para olheiros e patrocinadores de todo o mundo.',
    color: 'text-emerald-500',
  },
  {
    icon: Zap,
    title: 'Evolua seu Jogo',
    description:
      'Acesse treinos, dicas e ferramentas profissionais para melhorar sua performance.',
    color: 'text-orange-500',
  },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((curr) => curr + 1)
    } else {
      navigate('/profile-selection')
    }
  }

  const handleSkip = () => {
    navigate('/profile-selection')
  }

  const StepIcon = steps[currentStep].icon

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Global Background Pattern */}
      <SportsWallpaper />

      <div className="relative z-10 w-full max-w-md">
        <Card className="border-border/50 shadow-2xl bg-background/95 backdrop-blur-xl overflow-hidden">
          <CardContent className="p-8 flex flex-col items-center text-center space-y-8 min-h-[500px] justify-between">
            <div className="w-full flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="text-muted-foreground hover:text-foreground"
              >
                Pular
              </Button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 key={currentStep}">
              <div
                className={cn(
                  'w-32 h-32 rounded-full bg-secondary/50 flex items-center justify-center relative',
                  'before:absolute before:inset-0 before:bg-gradient-to-tr before:from-transparent before:to-white/20 before:rounded-full',
                )}
              >
                <StepIcon
                  className={cn(
                    'w-16 h-16 drop-shadow-lg',
                    steps[currentStep].color,
                  )}
                />
                <div className="absolute inset-0 border-4 border-background/50 rounded-full animate-pulse opacity-50" />
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">
                  {steps[currentStep].title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {steps[currentStep].description}
                </p>
              </div>
            </div>

            <div className="w-full space-y-8">
              <div className="flex justify-center gap-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      index === currentStep
                        ? 'w-8 bg-primary'
                        : 'w-2 bg-secondary',
                    )}
                  />
                ))}
              </div>

              <Button
                size="lg"
                className="w-full h-12 text-base"
                onClick={handleNext}
              >
                {currentStep === steps.length - 1 ? 'Começar Agora' : 'Próximo'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
