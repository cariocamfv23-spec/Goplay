import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Mail, Lock, User, Smartphone } from 'lucide-react'
import useBrandingStore from '@/stores/useBrandingStore'
import { AppIcon } from '@/components/AppIcon'

export default function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { logoUrl } = useBrandingStore()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      // Navigate to profile selection after registration
      navigate('/profile-selection')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 bg-background animate-in fade-in duration-500 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8 relative z-10">
        <div className="flex flex-col items-center justify-center mb-6 gap-4">
          <div className="p-3 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 shadow-lg">
            <AppIcon className="w-12 h-12" />
          </div>
          <img
            src={logoUrl}
            alt="Goplay App"
            className="h-10 w-auto object-contain drop-shadow-md"
          />
        </div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">
          Crie sua conta
        </h2>
        <p className="text-muted-foreground">
          Entre para a comunidade esportiva que mais cresce
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
            <Smartphone className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="tel"
              placeholder="(00) 00000-0000"
              required
              className="rounded-xl h-12 pl-10 bg-secondary/30 border-border/50 focus-visible:ring-primary transition-all"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="password"
              placeholder="Crie uma senha"
              required
              className="rounded-xl h-12 pl-10 bg-secondary/30 border-border/50 focus-visible:ring-primary transition-all"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="password"
              placeholder="Confirme a senha"
              required
              className="rounded-xl h-12 pl-10 bg-secondary/30 border-border/50 focus-visible:ring-primary transition-all"
            />
          </div>

          <div className="text-xs text-muted-foreground text-center px-4">
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

          <Button
            type="submit"
            className="w-full h-12 rounded-full text-base font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 transition-all hover:scale-[1.02]"
            disabled={loading}
          >
            {loading ? 'Criando conta...' : 'Criar conta'}
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
