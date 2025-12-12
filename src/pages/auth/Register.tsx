import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { ArrowLeft, User, Mail, Phone, Lock } from 'lucide-react'

const Register = () => {
  const [step, setStep] = useState<'form' | 'sms'>('form')
  const navigate = useNavigate()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('sms')
  }

  const handleVerify = () => {
    navigate('/onboarding')
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-background animate-fade-in">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4"
        onClick={() => (step === 'sms' ? setStep('form') : navigate('/login'))}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">
            {step === 'form' ? 'Criar Conta' : 'Verificação'}
          </h2>
          <p className="text-muted-foreground">
            {step === 'form'
              ? 'Preencha seus dados para começar'
              : 'Enviamos um código para seu telefone'}
          </p>
        </div>

        {step === 'form' ? (
          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="relative">
              <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Nome Completo"
                required
                className="rounded-xl h-12 pl-10 bg-secondary/30"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email"
                required
                className="rounded-xl h-12 pl-10 bg-secondary/30"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="Telefone"
                required
                className="rounded-xl h-12 pl-10 bg-secondary/30"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Senha"
                required
                className="rounded-xl h-12 pl-10 bg-secondary/30"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-12 rounded-full text-base font-bold shadow-lg shadow-primary/20"
              >
                Continuar
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Ao criar uma conta, você concorda com nossos{' '}
              <span className="underline cursor-pointer">
                Termos de Serviço
              </span>
              .
            </p>
          </form>
        ) : (
          <div className="flex flex-col items-center space-y-8 animate-slide-up">
            <InputOTP maxLength={6}>
              <InputOTPGroup className="gap-2">
                <InputOTPSlot
                  index={0}
                  className="rounded-lg border-2 border-secondary h-12 w-10 sm:w-12"
                />
                <InputOTPSlot
                  index={1}
                  className="rounded-lg border-2 border-secondary h-12 w-10 sm:w-12"
                />
                <InputOTPSlot
                  index={2}
                  className="rounded-lg border-2 border-secondary h-12 w-10 sm:w-12"
                />
                <InputOTPSlot
                  index={3}
                  className="rounded-lg border-2 border-secondary h-12 w-10 sm:w-12"
                />
                <InputOTPSlot
                  index={4}
                  className="rounded-lg border-2 border-secondary h-12 w-10 sm:w-12"
                />
                <InputOTPSlot
                  index={5}
                  className="rounded-lg border-2 border-secondary h-12 w-10 sm:w-12"
                />
              </InputOTPGroup>
            </InputOTP>

            <Button
              onClick={handleVerify}
              className="w-full h-12 rounded-full text-base font-bold"
            >
              Verificar Código
            </Button>

            <Button
              variant="ghost"
              className="text-sm font-medium text-primary"
            >
              Reenviar código em 30s
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Register
