import { Button } from '@/components/ui/button'
import { ArrowLeft, Ghost, Crown, Shield, Eye, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { usePrivacyStore } from '@/stores/usePrivacyStore'
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
            >
              <Shield className="w-5 h-5 text-muted-foreground" />
              <div className="flex flex-col items-start">
                <span className="font-medium">Dados e Permissões</span>
                <span className="text-xs text-muted-foreground">
                  Gerencie seus dados no aplicativo
                </span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
