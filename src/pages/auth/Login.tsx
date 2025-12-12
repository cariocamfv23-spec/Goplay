import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Mail, Lock, Smartphone } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { AppIcon } from '@/components/AppIcon'

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [method, setMethod] = useState<'email' | 'phone'>('email')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      localStorage.setItem('userType', 'athlete')
      navigate('/home')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 bg-background animate-fade-in relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8 relative z-10">
        <div className="flex flex-col items-center justify-center mb-6 gap-4">
          <div className="p-4 rounded-3xl bg-background/50 backdrop-blur-sm border border-border/50 shadow-lg transition-transform hover:scale-105 duration-300">
            <AppIcon className="w-16 h-16" />
          </div>
          <Logo className="h-12 w-auto drop-shadow-md" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">
          Bem-vindo de volta
        </h2>
        <p className="text-muted-foreground">
          Entre para continuar sua jornada esportiva
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex bg-secondary/50 p-1.5 rounded-xl mb-8 backdrop-blur-sm">
          <button
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${method === 'email' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setMethod('email')}
          >
            Email
          </button>
          <button
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${method === 'phone' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setMethod('phone')}
          >
            Telefone
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          {method === 'email' ? (
            <div className="relative group">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="email"
                placeholder="seu@email.com"
                required
                className="rounded-xl h-12 pl-10 bg-secondary/30 border-border/50 focus-visible:ring-primary transition-all"
              />
            </div>
          ) : (
            <div className="relative group">
              <Smartphone className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="tel"
                placeholder="(00) 00000-0000"
                required
                className="rounded-xl h-12 pl-10 bg-secondary/30 border-border/50 focus-visible:ring-primary transition-all"
              />
            </div>
          )}

          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="password"
              placeholder="Sua senha"
              required
              className="rounded-xl h-12 pl-10 bg-secondary/30 border-border/50 focus-visible:ring-primary transition-all"
            />
          </div>

          <div className="flex items-center justify-end">
            <Link
              to="#"
              className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Esqueceu a senha?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-full text-base font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 transition-all hover:scale-[1.02]"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className="mt-10">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-medium">
              <span className="px-4 bg-background text-muted-foreground">
                Ou continue com
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="rounded-xl h-12 hover:bg-secondary/50 border-border/50 transition-all hover:scale-105"
            >
              <img
                src="https://img.usecurling.com/i?q=google&shape=outline"
                alt="Google"
                className="h-5 w-5 opacity-70"
              />
            </Button>
            <Button
              variant="outline"
              className="rounded-xl h-12 hover:bg-secondary/50 border-border/50 transition-all hover:scale-105"
            >
              <img
                src="https://img.usecurling.com/i?q=apple&shape=outline"
                alt="Apple"
                className="h-5 w-5 opacity-70"
              />
            </Button>
            <Button
              variant="outline"
              className="rounded-xl h-12 hover:bg-secondary/50 border-border/50 transition-all hover:scale-105"
            >
              <img
                src="https://img.usecurling.com/i?q=linkedin&shape=outline"
                alt="LinkedIn"
                className="h-5 w-5 opacity-70"
              />
            </Button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Não tem uma conta?{' '}
          <Link
            to="/register"
            className="font-bold text-primary hover:text-primary/80 transition-colors"
          >
            Criar agora
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
