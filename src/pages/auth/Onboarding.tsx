import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { AppIcon } from '@/components/AppIcon'

const Onboarding = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  const steps = [
    {
      title: 'Conecte-se ao Esporte',
      description:
        'Encontre atletas, clubes e profissionais do esporte em um só lugar. A maior rede esportiva do Brasil.',
      image: 'https://img.usecurling.com/p/600/600?q=athletes%20connecting',
    },
    {
      title: 'Mostre seu Talento',
      description:
        'Compartilhe seus melhores momentos com o MOVE. Vídeos curtos que destacam suas habilidades.',
      image: 'https://img.usecurling.com/p/600/600?q=soccer%20skills',
    },
    {
      title: 'Evolua sua Carreira',
      description:
        'Acesse vagas, peneiras e oportunidades exclusivas. O Goplay impulsiona sua jornada.',
      image: 'https://img.usecurling.com/p/600/600?q=trophy%20winner',
    },
  ]

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      localStorage.setItem('goplay_has_seen_onboarding', 'true')
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background Blob */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="w-full p-6 flex justify-center pt-8 z-10">
        <Logo className="h-10 w-auto" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-8 z-10">
        <div className="relative w-full aspect-square max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up">
          <img
            src={steps[step].image}
            alt={steps[step].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="w-12 h-12 bg-background/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 mb-4">
              <AppIcon className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="text-center space-y-4 max-w-sm animate-fade-in">
          <h1 className="text-3xl font-bold leading-tight">
            {steps[step].title}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {steps[step].description}
          </p>
        </div>
      </div>

      {/* Footer / Controls */}
      <div className="p-6 pb-10 flex items-center justify-between z-10">
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-primary' : 'w-2 bg-secondary'}`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          size="lg"
          className="rounded-full px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
        >
          {step === steps.length - 1 ? 'Começar' : 'Próximo'}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default Onboarding
