import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Seja bem-vindo!',
    description: 'O Goplay é a plataforma definitiva para quem vive o esporte.',
    image:
      'https://img.usecurling.com/p/800/800?q=athlete%20celebrating&color=blue',
  },
  {
    id: 2,
    title: 'Conecte-se',
    description:
      'Encontre parceiros, times, treinadores e lugares para praticar.',
    image:
      'https://img.usecurling.com/p/800/800?q=team%20high%20five&color=orange',
  },
  {
    id: 3,
    title: 'Evolua',
    description:
      'Acompanhe suas estatísticas e receba dicas de IA para melhorar.',
    image:
      'https://img.usecurling.com/p/800/800?q=data%20analysis%20sports&color=purple',
  },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      navigate('/profile-selection')
    }
  }

  const step = steps[currentStep]

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={step.image}
          alt={step.title}
          className="w-full h-full object-cover transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col p-6">
        <div className="flex justify-end">
          <Button
            variant="ghost"
            className="text-white/80 hover:text-white"
            onClick={() => navigate('/profile-selection')}
          >
            Pular
          </Button>
        </div>

        <div className="mt-auto space-y-6">
          <div className="flex gap-2 mb-4">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-8 bg-primary' : 'w-2 bg-muted/50'}`}
              />
            ))}
          </div>

          <div className="space-y-2 animate-in slide-in-from-bottom-4 duration-500 key={currentStep}">
            <h1 className="text-4xl font-bold tracking-tight">{step.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>

          <Button
            className="w-full h-14 rounded-xl text-lg font-bold shadow-lg mt-8"
            onClick={handleNext}
          >
            {currentStep === steps.length - 1 ? 'Começar' : 'Próximo'}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
