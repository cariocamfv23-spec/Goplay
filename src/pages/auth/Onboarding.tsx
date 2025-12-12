import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import useBrandingStore from '@/stores/useBrandingStore'

const slides = [
  {
    id: 1,
    title: 'Conecte-se ao Esporte',
    description: 'Encontre parceiros, times e eventos próximos a você.',
    image: 'https://img.usecurling.com/p/600/600?q=soccer%20players%20hugging',
  },
  {
    id: 2,
    title: 'Mostre seu Talento',
    description: 'Publique seus melhores lances e seja visto por olheiros.',
    image: 'https://img.usecurling.com/p/600/600?q=athlete%20celebrating',
  },
  {
    id: 3,
    title: 'Evolua sua Performance',
    description: 'Acompanhe suas estatísticas e receba dicas de treino.',
    image: 'https://img.usecurling.com/p/600/600?q=fitness%20tracker',
  },
]

const Onboarding = () => {
  const navigate = useNavigate()
  const { logoUrl } = useBrandingStore()
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      completeOnboarding()
    }
  }

  const completeOnboarding = () => {
    localStorage.setItem('has_visited_onboarding', 'true')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Header */}
      <div className="p-6 flex justify-center z-10">
        <img src={logoUrl} alt="Goplay" className="h-8 w-auto object-contain" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 relative z-10">
        <div className="w-full aspect-square max-w-sm mx-auto mb-10 relative">
          <div className="absolute inset-4 bg-gradient-to-tr from-primary/20 to-gold/20 rounded-full blur-3xl" />
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105 mask-image-gradient"
          />
        </div>

        <div className="text-center space-y-4 max-w-sm mx-auto animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {slides[currentSlide].title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {slides[currentSlide].description}
          </p>
        </div>
      </div>

      {/* Footer / Controls */}
      <div className="p-8 flex items-center justify-between">
        {/* Indicators */}
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-muted'}`}
            />
          ))}
        </div>

        <Button
          onClick={nextSlide}
          size="lg"
          className="rounded-full w-14 h-14 p-0 shadow-lg shadow-primary/25 bg-gradient-primary hover:scale-105 transition-transform"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute bottom-10 left-0 w-full flex justify-center">
        <button
          onClick={completeOnboarding}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          Pular
        </button>
      </div>
    </div>
  )
}

export default Onboarding
