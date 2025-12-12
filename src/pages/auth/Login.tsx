import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Mail, Lock, Smartphone } from 'lucide-react'

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [method, setMethod] = useState<'email' | 'phone'>('email')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/home')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 bg-background animate-fade-in relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8 relative z-10">
        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-lg shadow-primary/5">
          <img
            src="https://img.usecurling.com/i?q=play&shape=fill&color=violet"
            alt="Goplay App"
            className="h-10 w-10 object-contain"
          />
        </div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-primary mb-2">
          Bem-vindo de volta
        </h2>
        <p className="text-muted-foreground">Entre para continuar jogando</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex bg-secondary p-1 rounded-xl mb-6">
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${method === 'email' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
            onClick={() => setMethod('email')}
          >
            Email
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${method === 'phone' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
            onClick={() => setMethod('phone')}
          >
            Telefone
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          {method === 'email' ? (
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="seu@email.com"
                required
                className="rounded-xl h-12 pl-10 bg-secondary/30 border-border/50 focus-visible:ring-primary"
              />
            </div>
          ) : (
            <div className="relative">
              <Smartphone className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="(00) 00000-0000"
                required
                className="rounded-xl h-12 pl-10 bg-secondary/30 border-border/50 focus-visible:ring-primary"
              />
            </div>
          )}

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Sua senha"
              required
              className="rounded-xl h-12 pl-10 bg-secondary/30 border-border/50 focus-visible:ring-primary"
            />
          </div>

          <div className="flex items-center justify-end">
            <Link
              to="#"
              className="text-xs font-medium text-primary hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-full text-base font-bold shadow-lg shadow-primary/20 bg-gradient-primary hover:opacity-90 transition-opacity"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-background text-muted-foreground">
                Ou continue com
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
          Não tem uma conta?{' '}
          <Link
            to="/register"
            className="font-bold text-primary hover:underline"
          >
            Criar agora
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
