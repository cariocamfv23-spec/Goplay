import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Mail, Lock, User, Smartphone } from 'lucide-react'
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
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8 relative z-10">
        <div className="flex justify-center mb-6">
          <img
            src={logoUrl}
            alt="Goplay App"
            className="h-14 w-auto object-contain drop-shadow-sm"
          />
        </div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-primary mb-2">
          Crie sua conta
        </h2>
        <p className="text-muted-foreground">
          Junte-se à maior comunidade esportiva
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="relative">
            <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Nome completo"
              required
              className="rounded-xl h-12 pl-10 bg-secondary/30 border-border/50 focus-visible:ring-primary"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="seu@email.com"
              required
              className="rounded-xl h-12 pl-10 bg-secondary/30 border-border/50 focus-visible:ring-primary"
            />
          </div>

          <div className="relative">
            <Smartphone className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              type="tel"
              placeholder="(00) 00000-0000"
              required
              className="rounded-xl h-12 pl-10 bg-secondary/30 border-border/50 focus-visible:ring-primary"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Senha"
              required
              className="rounded-xl h-12 pl-10 bg-secondary/30 border-border/50 focus-visible:ring-primary"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Confirmar Senha"
              required
              className="rounded-xl h-12 pl-10 bg-secondary/30 border-border/50 focus-visible:ring-primary"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full h-12 rounded-full text-base font-bold shadow-lg shadow-primary/20 bg-gradient-primary hover:opacity-90 transition-opacity"
              disabled={loading}
            >
              {loading ? 'Criando conta...' : 'Continuar'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-background text-muted-foreground">
                Ou cadastre com
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="rounded-xl h-12 hover:bg-secondary/80 border-border/50"
            >
              <img
                src="https://img.usecurling.com/i?q=google&shape=outline"
                alt="Google"
                className="h-5 w-5"
              />
            </Button>
            <Button
              variant="outline"
              className="rounded-xl h-12 hover:bg-secondary/80 border-border/50"
            >
              <img
                src="https://img.usecurling.com/i?q=apple&shape=outline"
                alt="Apple"
                className="h-5 w-5"
              />
            </Button>
            <Button
              variant="outline"
              className="rounded-xl h-12 hover:bg-secondary/80 border-border/50"
            >
              <img
                src="https://img.usecurling.com/i?q=linkedin&shape=outline"
                alt="LinkedIn"
                className="h-5 w-5"
              />
            </Button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Já tem uma conta?{' '}
          <Link to="/login" className="font-bold text-primary hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
