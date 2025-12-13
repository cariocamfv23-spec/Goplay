import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Mail, Lock } from 'lucide-react'
import useBrandingStore from '@/stores/useBrandingStore'
import { AppIcon } from '@/components/AppIcon'

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { logoUrl } = useBrandingStore()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/home')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 bg-background animate-in fade-in duration-500 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8 relative z-10">
        <div className="flex flex-col items-center justify-center mb-6 gap-4">
          <div className="p-3 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 shadow-lg">
            <AppIcon className="w-12 h-12" />
          </div>
          <img
            src={logoUrl}
            alt="Goplay"
            className="h-10 w-auto object-contain drop-shadow-sm"
          />
        </div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">
          Bem-vindo de volta
        </h2>
        <p className="text-muted-foreground">
          Entre na sua conta para continuar
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="relative group">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="email"
              placeholder="seu@email.com"
              required
              className="pl-10 h-12 rounded-xl bg-secondary/30 border-border/50 focus-visible:ring-primary transition-all"
            />
          </div>
          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="password"
              placeholder="Sua senha"
              required
              className="pl-10 h-12 rounded-xl bg-secondary/30 border-border/50 focus-visible:ring-primary transition-all"
            />
          </div>

          <div className="flex items-center justify-end">
            <Link
              to="#"
              className="text-sm font-medium text-primary hover:underline"
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

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Não tem uma conta?{' '}
          <Link
            to="/register"
            className="font-bold text-primary hover:text-primary/80 transition-colors"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  )
}
