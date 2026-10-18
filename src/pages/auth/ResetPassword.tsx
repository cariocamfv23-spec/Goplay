import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Logo } from '@/components/Logo'
import {
  Loader2,
  Lock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Eye,
  EyeOff,
} from 'lucide-react'
import { toast } from 'sonner'
import { SportsWallpaper } from '@/components/SportsWallpaper'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'

export default function ResetPassword() {
  const navigate = useNavigate()
  const { updateUserPassword } = useAuth()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)
  const [hasValidSession, setHasValidSession] = useState(false)
  const [sessionError, setSessionError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Listen and inspect recovery tokens / session on mount
  useEffect(() => {
    let mounted = true

    const verifySession = async () => {
      // 1. Check current session
      const {
        data: { session },
      } = await supabase.auth.getSession()

      // 2. Also inspect URL hash for Supabase Auth recovery tokens (#access_token=...&type=recovery)
      const hash = window.location.hash
      const isRecoveryHash =
        hash.includes('type=recovery') || hash.includes('access_token=')

      if (session || isRecoveryHash) {
        if (mounted) {
          setHasValidSession(true)
          setCheckingSession(false)
        }
      } else {
        // Wait a brief tick for Supabase client to parse URL hash into session
        const timeout = setTimeout(async () => {
          const {
            data: { session: delayedSession },
          } = await supabase.auth.getSession()
          if (mounted) {
            if (delayedSession) {
              setHasValidSession(true)
            } else {
              setHasValidSession(false)
              setSessionError(
                'O link de recuperação expirou, é inválido ou já foi utilizado.',
              )
            }
            setCheckingSession(false)
          }
        }, 1200)

        return () => clearTimeout(timeout)
      }
    }

    verifySession()

    // Listen to PASSWORD_RECOVERY event if triggered
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || (event === 'SIGNED_IN' && session)) {
        if (mounted) {
          setHasValidSession(true)
          setCheckingSession(false)
          setSessionError(null)
        }
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const cleanPass = password.trim()
    const cleanConfirm = confirmPassword.trim()

    if (!cleanPass || !cleanConfirm) {
      toast.error('Preencha os dois campos de senha.')
      return
    }

    if (cleanPass.length < 6) {
      toast.error('A nova senha deve ter no mínimo 6 caracteres.')
      return
    }

    if (cleanPass !== cleanConfirm) {
      toast.error(
        'As senhas não coincidem. Digite a mesma senha em ambos os campos.',
      )
      return
    }

    setLoading(true)

    try {
      const { error } = await updateUserPassword(cleanPass)

      if (error) {
        if (
          error.message?.includes('expired') ||
          error.message?.includes('invalid') ||
          error.message?.includes('session')
        ) {
          toast.error(
            'Sessão de recuperação expirada. Solicite um novo link de redefinição.',
          )
          setSessionError('Link de recuperação expirado.')
          setHasValidSession(false)
        } else {
          toast.error(error.message || 'Erro ao redefinir senha.')
        }
        return
      }

      setSuccess(true)
      toast.success('Senha atualizada com sucesso!', {
        description: 'Você já pode entrar na sua conta com a nova senha.',
      })
    } catch (err: any) {
      toast.error(err?.message || 'Erro inesperado ao salvar nova senha.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      <SportsWallpaper />

      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex justify-center mb-6">
          <Logo variant="full" className="scale-125" />
        </div>

        <Card className="border-border/50 shadow-2xl bg-background/95 backdrop-blur-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Criar Nova Senha
            </CardTitle>
            <CardDescription className="text-center text-xs">
              {success
                ? 'Sua senha foi redefinida com sucesso'
                : 'Defina e confirme sua nova senha de acesso'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {checkingSession ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="text-xs text-muted-foreground">
                  Validando link de recuperação seguro...
                </span>
              </div>
            ) : success ? (
              <div className="space-y-5 text-center py-3 animate-in fade-in">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-base text-foreground">
                    Senha Alterada!
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Sua nova senha de acesso foi salva com segurança no Goplay
                    App.
                  </p>
                </div>
                <Button
                  className="w-full font-bold bg-primary text-white h-11"
                  onClick={() => navigate('/login', { replace: true })}
                >
                  Ir para Login
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            ) : !hasValidSession ? (
              <div className="space-y-4 text-center py-3 animate-in fade-in">
                <div className="w-14 h-14 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto border border-amber-500/20">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-sm text-foreground">
                    Link Inválido ou Expirado
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {sessionError ||
                      'O token de recuperação desta sessão já foi utilizado ou ultrapassou o tempo limite de segurança.'}
                  </p>
                </div>
                <div className="pt-2 flex flex-col gap-2">
                  <Button
                    className="w-full font-bold bg-primary text-white"
                    onClick={() => navigate('/forgot-password')}
                  >
                    Solicitar Novo Link
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-xs"
                    onClick={() => navigate('/login')}
                  >
                    Voltar ao Login
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="new-password"
                    className="text-xs font-semibold"
                  >
                    Nova Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="new-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mínimo 6 caracteres"
                      className="pl-9 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirm-password"
                    className="text-xs font-semibold"
                  >
                    Confirmar Nova Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Repita a nova senha"
                      className="pl-9 pr-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 h-11"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Atualizando senha...
                    </>
                  ) : (
                    'Salvar Nova Senha'
                  )}
                </Button>
              </form>
            )}
          </CardContent>

          <CardFooter className="flex justify-center border-t border-border/40 pt-4">
            <Link
              to="/login"
              className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Voltar ao Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
