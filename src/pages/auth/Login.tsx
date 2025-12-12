import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate login
    setTimeout(() => {
      setLoading(false)
      navigate('/home') // Or /onboarding for new users, but sticking to standard flow
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 bg-background">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-10">
        <h2 className="text-3xl font-bold text-primary mb-2">Bem-vindo</h2>
        <p className="text-muted-foreground">Entre para continuar</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <Input
              type="email"
              placeholder="Email"
              required
              className="rounded-xl h-12"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Senha"
              required
              className="rounded-xl h-12"
            />
          </div>

          <div className="flex items-center justify-between">
            <Link
              to="#"
              className="text-sm font-medium text-primary hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-full text-base"
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
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">
                Ou continue com
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Button variant="outline" className="rounded-full">
              Google
            </Button>
            <Button variant="outline" className="rounded-full">
              Apple
            </Button>
            <Button variant="outline" className="rounded-full">
              LinkedIn
            </Button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Não tem uma conta?{' '}
          <Link
            to="/register"
            className="font-semibold text-primary hover:underline"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
