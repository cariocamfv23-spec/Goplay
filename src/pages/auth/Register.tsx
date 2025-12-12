import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Mail, Lock, User, Check } from 'lucide-react'
import useBrandingStore from '@/stores/useBrandingStore'

const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { logoUrl } = useBrandingStore()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/profile-selection')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 bg-background animate-fade-in relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8 relative z-10">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 shadow-sm transition-transform hover:scale-105 duration-300">
            <img
              src={logoUrl}
              alt="Goplay App"
              className="h-16 w-auto object-contain drop-shadow-md"
            />
          </div>
        </div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Criar conta</h2>
        <p className="text-muted-foreground">
          Junte-se à maior comunidade esportiva
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="relative group">
            <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="text"
              placeholder="Nome completo"
              required
              className="rounded-xl h-12 pl-10 bg-secondary/30 border-border/50 focus-visible:ring-primary transition-all"
            />
          </div>

          <div className="relative group">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="email"
              placeholder="seu@email.com"
              required
              className="rounded-xl h-12 pl-10 bg-secondary/30 border-border/50 focus-visible:ring-primary transition-all"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="password"
              placeholder="Senha"
              required
              className="rounded-xl h-12 pl-10 bg-secondary/30 border-border/50 focus-visible:ring-primary transition-all"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="password"
              placeholder="Confirmar senha"
              required
              className="rounded-xl h-12 pl-10 bg-secondary/30 border-border/50 focus-visible:ring-primary transition-all"
            />
          </div>

          <div className="flex items-start gap-2 pt-2">
            <div className="flex items-center h-5">
              <div className="relative flex items-center justify-center w-5 h-5 border border-primary rounded bg-background">
                <Check className="h-3 w-3 text-primary" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Ao criar uma conta, você concorda com nossos{' '}
              <Link to="#" className="text-primary hover:underline">
                Termos de Serviço
              </Link>{' '}
              e{' '}
              <Link to="#" className="text-primary hover:underline">
                Política de Privacidade
              </Link>
              .
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-full text-base font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 transition-all hover:scale-[1.02] mt-4"
            disabled={loading}
          >
            {loading ? 'Criando conta...' : 'Continuar'}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Já tem uma conta?{' '}
          <Link
            to="/login"
            className="font-bold text-primary hover:text-primary/80 transition-colors"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
