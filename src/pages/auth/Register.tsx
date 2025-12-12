import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'

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
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 bg-background">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">
          {step === 'form' ? 'Criar Conta' : 'Verificação'}
        </h2>
        <p className="text-muted-foreground">
          {step === 'form'
            ? 'Junte-se à maior comunidade esportiva'
            : 'Digite o código enviado por SMS'}
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {step === 'form' ? (
          <form className="space-y-4" onSubmit={handleRegister}>
            <Input
              type="text"
              placeholder="Nome Completo"
              required
              className="rounded-xl h-12"
            />
            <Input
              type="email"
              placeholder="Email"
              required
              className="rounded-xl h-12"
            />
            <Input
              type="tel"
              placeholder="Telefone"
              required
              className="rounded-xl h-12"
            />
            <Input
              type="password"
              placeholder="Senha"
              required
              className="rounded-xl h-12"
            />

            <Button
              type="submit"
              className="w-full h-12 rounded-full text-base mt-4"
            >
              Criar Conta
            </Button>
          </form>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <Button
              onClick={handleVerify}
              className="w-full h-12 rounded-full text-base"
            >
              Verificar
            </Button>

            <Button variant="ghost" className="text-sm">
              Reenviar código
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Register
