import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import {
  ArrowLeft,
  Ghost,
  Crown,
  Shield,
  Eye,
  Lock,
  Fingerprint,
  Smartphone,
  CheckCircle2,
  Trash2,
  Loader2,
  Info,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { usePrivacyStore } from '@/stores/usePrivacyStore'
import { useAuth } from '@/hooks/use-auth'
import { useAuthStore } from '@/stores/useAuthStore'
import {
  biometricService,
  type BiometricCredentialData,
} from '@/services/biometrics'
import { toast } from 'sonner'
import { Switch } from '@/components/ui/switch'
import { PaymentDialog } from '@/components/PaymentDialog'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function PrivacySettings() {
  const navigate = useNavigate()
  const { isInvisibleMode, isPremium, toggleInvisibleMode, upgradeToPremium } =
    usePrivacyStore()
  const { user, profile } = useAuth()
  const session = useAuthStore((s) => s.session)

  const [biometricSupported, setBiometricSupported] = useState(false)
  const [platformSupported, setPlatformSupported] = useState(false)
  const [enrolledCredential, setEnrolledCredential] =
    useState<BiometricCredentialData | null>(null)
  const [enrollingLoading, setEnrollingLoading] = useState(false)

  useEffect(() => {
    const supported = biometricService.isWebAuthnSupported()
    setBiometricSupported(supported)
    if (supported) {
      biometricService
        .isPlatformAuthenticatorAvailable()
        .then(setPlatformSupported)
        .catch(() => setPlatformSupported(false))
    }
    const cred = biometricService.getEnrolledCredential()
    setEnrolledCredential(cred)
  }, [])

  const handleEnrollBiometrics = async () => {
    if (!user) {
      toast.error('Você precisa estar logado para ativar a biometria.')
      return
    }

    setEnrollingLoading(true)

    try {
      const tokens = session
        ? {
            access_token: session.access_token,
            refresh_token: session.refresh_token,
            expires_at: session.expires_at,
          }
        : undefined

      const displayName =
        profile?.full_name ||
        user.user_metadata?.full_name ||
        user.email?.split('@')[0] ||
        'Atleta Goplay'

      toast.info('Confirme a biometria no seu dispositivo', {
        description: 'Aproxime o dedo ou use o Face ID no prompt do sistema...',
        icon: <Fingerprint className="w-4 h-4 text-primary animate-pulse" />,
      })

      const res = await biometricService.enrollBiometrics({
        userId: user.id,
        userEmail: user.email || '',
        userName: displayName,
        sessionTokens: tokens,
      })

      if (res.success) {
        const updatedCred = biometricService.getEnrolledCredential()
        setEnrolledCredential(updatedCred)
        toast.success('Entrada biométrica ativada com sucesso!', {
          description:
            'Agora você pode usar Touch ID, Face ID ou digital para entrar rapidamente neste aparelho.',
        })
      } else {
        toast.error('Não foi possível ativar a biometria', {
          description: res.error,
        })
      }
    } catch (err: any) {
      toast.error('Erro ao registrar biometria', {
        description: err?.message || 'Tente novamente.',
      })
    } finally {
      setEnrollingLoading(false)
    }
  }

  const handleDisableBiometrics = () => {
    biometricService.disableBiometrics()
    setEnrolledCredential(null)
    toast.success('Biometria desativada neste aparelho', {
      description:
        'A credencial local foi removida. Você poderá reativá-la a qualquer momento.',
    })
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background z-20 p-4 border-b border-border/50 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Privacidade e Segurança</h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Sua Privacidade
          </h2>
          <p className="text-sm text-muted-foreground">
            Gerencie como os outros veem você e controle seus rastros de
            navegação no app.
          </p>
        </div>

        {/* Biometrics Card */}
        <Card
          className={cn(
            'relative overflow-hidden transition-all duration-300 border-border',
            enrolledCredential && 'border-primary/40 shadow-sm',
          )}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <Fingerprint
                  className={cn(
                    'w-5 h-5 transition-colors',
                    enrolledCredential
                      ? 'text-primary'
                      : 'text-muted-foreground',
                  )}
                />
                Entrada por Biometria
              </div>
              <Badge
                variant={enrolledCredential ? 'default' : 'secondary'}
                className={cn(
                  'text-[10px] font-semibold',
                  enrolledCredential
                    ? 'bg-emerald-500/15 text-emerald-600 border border-emerald-500/30'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                {enrolledCredential ? 'Ativa neste Aparelho' : 'Desativada'}
              </Badge>
            </CardTitle>
            <CardDescription className="text-sm">
              Use Face ID, Touch ID ou a digital do seu aparelho para entrar
              direto na sua conta, sem digitar senha a cada acesso.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!biometricSupported ? (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Seu navegador ou dispositivo atual não suporta a Web
                  Authentication API (WebAuthn).
                </span>
              </div>
            ) : enrolledCredential ? (
              <div className="space-y-3">
                <div className="bg-secondary/40 border border-border/60 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-primary" />
                      Dispositivo vinculado:
                    </span>
                    <span className="font-semibold text-foreground">
                      {enrolledCredential.deviceName || 'Este aparelho'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Conta associada:
                    </span>
                    <span className="font-semibold text-foreground">
                      {enrolledCredential.userEmail}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Cadastrado em:
                    </span>
                    <span className="font-medium text-foreground">
                      {new Date(
                        enrolledCredential.enrolledAt,
                      ).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Pronto para uso na tela de login
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDisableBiometrics}
                    className="text-destructive hover:bg-destructive/10 border-destructive/30 hover:border-destructive text-xs gap-1.5 h-8"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Desativar Biometria
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-xs text-muted-foreground leading-relaxed">
                  Ao ativar, o seu aparelho solicitará sua digital ou Face ID. A
                  chave de acesso fica salva de forma segura e criptografada
                  apenas neste dispositivo.
                </div>
                <Button
                  className="w-full gap-2 font-semibold"
                  onClick={handleEnrollBiometrics}
                  disabled={enrollingLoading}
                >
                  {enrollingLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Aguardando confirmação do sensor...
                    </>
                  ) : (
                    <>
                      <Fingerprint className="w-4 h-4" />
                      Ativar Biometria neste Aparelho
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card
          className={cn(
            'relative overflow-hidden transition-all duration-300',
            isInvisibleMode
              ? 'border-gold/50 shadow-[0_0_20px_hsl(var(--gold)/0.15)]'
              : 'border-border',
          )}
        >
          {isInvisibleMode && (
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          )}
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <Ghost
                  className={cn(
                    'w-5 h-5 transition-colors',
                    isInvisibleMode
                      ? 'text-gold animate-pulse'
                      : 'text-primary',
                  )}
                />
                Modo Invisível
              </div>
              {!isPremium && (
                <Badge
                  variant="secondary"
                  className="bg-gold/20 text-gold hover:bg-gold/30 border-none px-2 py-0.5 shadow-sm flex items-center gap-1"
                >
                  <Crown className="w-3 h-3 fill-gold" />
                  PRO
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="text-sm">
              Navegue anonimamente sem disparar notificações de VIP ou aparecer
              em históricos de visitas de outros perfis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between bg-secondary/30 p-4 rounded-xl border border-border/50">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'p-2 rounded-full transition-colors',
                    isInvisibleMode
                      ? 'bg-gold/20 text-gold'
                      : 'bg-muted text-muted-foreground',
                  )}
                >
                  {isInvisibleMode ? (
                    <Eye className="w-5 h-5 opacity-50" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-sm">Status do Modo</p>
                  <p
                    className={cn(
                      'text-xs font-medium transition-colors',
                      isInvisibleMode ? 'text-gold' : 'text-muted-foreground',
                    )}
                  >
                    {isInvisibleMode
                      ? 'Ativado (Invisível)'
                      : 'Desativado (Visível)'}
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  'relative flex items-center justify-center h-6 w-11 rounded-full ring-2 transition-all',
                  isInvisibleMode
                    ? 'ring-gold/50 shadow-[0_0_10px_hsl(var(--gold)/0.2)]'
                    : 'ring-transparent',
                )}
              >
                {!isPremium && (
                  <PaymentDialog
                    title="Desbloquear Modo Invisível"
                    price={19.9}
                    pointsPrice={1000}
                    onSuccess={() => {
                      upgradeToPremium()
                      toggleInvisibleMode(true)
                    }}
                  >
                    <div className="absolute inset-0 z-10 cursor-pointer" />
                  </PaymentDialog>
                )}
                <Switch
                  checked={isInvisibleMode}
                  onCheckedChange={(c) => {
                    if (isPremium) toggleInvisibleMode(c)
                  }}
                  className={cn(
                    isInvisibleMode && 'data-[state=checked]:bg-gold',
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2 mt-6">
          <h3 className="text-sm font-bold text-muted-foreground uppercase px-1">
            Geral
          </h3>
          <div className="bg-card border rounded-xl overflow-hidden divide-y">
            <Button
              variant="ghost"
              className="w-full justify-start h-14 rounded-none px-4 gap-3"
            >
              <Lock className="w-5 h-5 text-muted-foreground" />
              <div className="flex flex-col items-start">
                <span className="font-medium">
                  Autenticação em Dois Fatores
                </span>
                <span className="text-xs text-muted-foreground">
                  Maior segurança para sua conta
                </span>
              </div>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-14 rounded-none px-4 gap-3"
              onClick={() => navigate('/privacy')}
            >
              <Shield className="w-5 h-5 text-emerald-500" />
              <div className="flex flex-col items-start text-left">
                <span className="font-medium">
                  Política de Privacidade (LGPD)
                </span>
                <span className="text-xs text-muted-foreground">
                  Tratamento de dados de atletas e canal do Encarregado
                </span>
              </div>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-14 rounded-none px-4 gap-3"
              onClick={() => navigate('/terms')}
            >
              <Lock className="w-5 h-5 text-primary" />
              <div className="flex flex-col items-start text-left">
                <span className="font-medium">Termos de Uso</span>
                <span className="text-xs text-muted-foreground">
                  Condições do serviço, regras e eventos esportivos
                </span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
