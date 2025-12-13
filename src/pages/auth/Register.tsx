import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Logo } from '@/components/Logo'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Lock, Mail, User, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

export default function Register() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Conta criada!', {
        description: 'Bem-vindo ao Goplay.',
      })
      navigate('/onboarding')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-[hsl(var(--gold)/0.1)] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-sm space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-6">
            <Logo variant="full" className="scale-125" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Crie sua conta</h1>
          <p className="text-sm text-muted-foreground">
            Junte-se à maior comunidade esportiva
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Nome completo"
                className="pl-10 h-12 rounded-xl bg-secondary/50 border-border/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Email"
                type="email"
                className="pl-10 h-12 rounded-xl bg-secondary/50 border-border/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Senha"
                type="password"
                className="pl-10 h-12 rounded-xl bg-secondary/50 border-border/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Confirmar senha"
                type="password"
                className="pl-10 h-12 rounded-xl bg-secondary/50 border-border/50"
              />
            </div>
          </div>

          <Button
            className="w-full h-12 rounded-xl text-base font-bold shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              'Criando conta...'
            ) : (
              <span className="flex items-center gap-2">
                Criar Conta <ArrowRight className="h-5 w-5" />
              </span>
            )}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Já tem uma conta? </span>
          <Button
            variant="link"
            className="p-0 h-auto font-bold text-primary"
            onClick={() => navigate('/login')}
          >
            Faça Login
          </Button>
        </div>
      </div>
    </div>
  )
}
