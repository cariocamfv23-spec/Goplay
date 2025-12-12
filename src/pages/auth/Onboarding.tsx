import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'

const Onboarding = () => {
  const navigate = useNavigate()

  const interests = [
    'Futebol',
    'Vôlei',
    'Basquete',
    'Tênis',
    'Corrida',
    'Natação',
    'Crossfit',
    'eSports',
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background p-6">
      <div className="flex-1 flex flex-col justify-center">
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            <CarouselItem>
              <div className="p-1">
                <Card className="border-none shadow-none text-center">
                  <img
                    src="https://img.usecurling.com/p/300/300?q=sports%20team"
                    alt="Community"
                    className="mx-auto rounded-full w-48 h-48 object-cover mb-6"
                  />
                  <h3 className="text-2xl font-bold mb-2">Conecte-se</h3>
                  <p className="text-muted-foreground">
                    Encontre atletas, clubes e profissionais perto de você.
                  </p>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <Card className="border-none shadow-none text-center">
                  <h3 className="text-2xl font-bold mb-6">Seus Interesses</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant="secondary"
                        className="px-4 py-2 text-sm rounded-full cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <div className="flex justify-between mt-8">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <Button variant="ghost" onClick={() => navigate('/profile-selection')}>
          Pular
        </Button>
        <Button
          className="rounded-full px-8"
          onClick={() => navigate('/profile-selection')}
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}

export default Onboarding
