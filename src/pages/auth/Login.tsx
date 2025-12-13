import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Logo } from '@/components/Logo'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Bem-vindo de volta!', {
        description: 'Login realizado com sucesso.',
      })
      navigate('/home')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-[hsl(var(--gold)/0.1)] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-sm space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-6">
            <Logo variant="full" className="scale-125" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Acesse sua conta
          </h1>
          <p className="text-sm text-muted-foreground">
            Entre para continuar sua jornada esportiva
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Email ou usuário"
                className="pl-10 h-12 rounded-xl bg-secondary/50 border-border/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                className="pl-10 pr-10 h-12 rounded-xl bg-secondary/50 border-border/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="flex justify-end">
              <Button
                variant="link"
                className="px-0 h-auto text-xs text-muted-foreground hover:text-primary"
              >
                Esqueceu a senha?
              </Button>
            </div>
          </div>

          <Button
            className="w-full h-12 rounded-xl text-base font-bold shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Entrando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Entrar <ArrowRight className="h-5 w-5" />
              </span>
            )}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Não tem uma conta? </span>
          <Button
            variant="link"
            className="p-0 h-auto font-bold text-primary"
            onClick={() => navigate('/register')}
          >
            Cadastre-se
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Ou entre com
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-12 rounded-xl border-border/50 hover:bg-secondary/50"
          >
            <img
              src="https://img.usecurling.com/i?q=google&shape=circle"
              className="h-5 w-5 mr-2"
              alt="Google"
            />
            Google
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-xl border-border/50 hover:bg-secondary/50"
          >
            <img
              src="https://img.usecurling.com/i?q=apple&shape=circle&color=black"
              className="h-5 w-5 mr-2"
              alt="Apple"
            />
            Apple
          </Button>
        </div>
      </div>
    </div>
  )
}
