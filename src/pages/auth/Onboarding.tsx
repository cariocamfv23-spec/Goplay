import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  Trophy,
  Activity,
  Dumbbell,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'

const Onboarding = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      navigate('/profile-selection')
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background p-6 animate-fade-in relative overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full pt-8">
        {step > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="self-start -ml-2 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}

        <div className="flex-1 flex flex-col justify-center">
          {step === 1 && (
            <div className="space-y-6 animate-slide-up">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                  <Trophy className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold">Qual seu esporte?</h2>
                <p className="text-muted-foreground">
                  Selecione sua modalidade principal
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  'Futebol',
                  'Vôlei',
                  'Basquete',
                  'Tênis',
                  'Corrida',
                  'Crossfit',
                ].map((sport) => (
                  <div
                    key={sport}
                    className="p-4 rounded-xl border-2 border-transparent bg-secondary/50 hover:border-primary hover:bg-primary/5 cursor-pointer transition-all flex flex-col items-center gap-2 group"
                  >
                    <img
                      src={`https://img.usecurling.com/i?q=${sport}&color=gradient`}
                      className="h-8 w-8"
                      alt={sport}
                    />
                    <span className="font-medium group-hover:text-primary">
                      {sport}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-slide-up">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4 text-orange-500">
                  <Activity className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold">Seu Nível</h2>
                <p className="text-muted-foreground">
                  Como você se classifica?
                </p>
              </div>

              <div className="space-y-4">
                {[
                  'Iniciante',
                  'Amador',
                  'Intermediário',
                  'Avançado',
                  'Profissional',
                ].map((level) => (
                  <div
                    key={level}
                    className="p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 cursor-pointer flex justify-between items-center group transition-all"
                  >
                    <span className="font-semibold">{level}</span>
                    <div className="h-4 w-4 rounded-full border border-muted-foreground group-hover:border-primary group-hover:bg-primary" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-slide-up">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4 text-blue-500">
                  <MapPin className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold">Onde você joga?</h2>
                <p className="text-muted-foreground">
                  Encontre partidas e locais perto de você
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full h-14 rounded-xl gap-2 border-primary/30 text-primary bg-primary/5"
                >
                  <MapPin className="h-5 w-5" /> Usar Localização Atual
                </Button>
                <div className="relative">
                  <span className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground bg-background w-8 mx-auto z-10">
                    OU
                  </span>
                  <div className="border-t border-border absolute w-full top-1/2"></div>
                </div>
                <Input
                  placeholder="Digite sua cidade..."
                  className="h-14 rounded-xl bg-secondary/30"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-slide-up">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4 text-green-500">
                  <Dumbbell className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold">Interesses</h2>
                <p className="text-muted-foreground">
                  O que você busca no Goplay?
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'Jogar Partidas',
                  'Encontrar Times',
                  'Participar de Torneios',
                  'Alugar Quadras',
                  'Contratar Treinador',
                  'Comprar Equipamentos',
                  'Vagas de Emprego',
                  'Assistir Conteúdo',
                ].map((interest) => (
                  <Badge
                    key={interest}
                    variant="secondary"
                    className="px-4 py-2.5 text-sm rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all select-none"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button
          className="w-full h-14 rounded-full text-base font-bold shadow-lg mt-8"
          onClick={handleNext}
        >
          {step === 4 ? 'Finalizar' : 'Continuar'}{' '}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

export default Onboarding
