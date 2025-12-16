import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, Lock, User, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { PaymentDialog } from '@/components/PaymentDialog'
import { mockProfileViewers } from '@/lib/data'
import { cn } from '@/lib/utils'
import { AppIcon } from '@/components/AppIcon'

export default function ProfileViews() {
  const navigate = useNavigate()
  const [isUnlocked, setIsUnlocked] = useState(false)
  const totalViews = 142
  const viewsThisWeek = 28

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-40 w-full h-16 bg-background/80 backdrop-blur-xl border-b border-border/40 flex items-center gap-3 px-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <AppIcon className="w-6 h-6" />
          <h1 className="font-bold text-lg">Goplay Views</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Free Counter */}
        <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 rounded-2xl p-6 text-center relative overflow-hidden">
          <div className="absolute -top-4 -right-4 p-3 opacity-10 rotate-12">
            <Eye className="w-32 h-32 text-primary" />
          </div>
          <h2 className="text-4xl font-bold text-primary mb-1">{totalViews}</h2>
          <p className="text-muted-foreground font-medium">
            Visualizações do perfil
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-background/50 px-3 py-1 rounded-full text-xs font-medium border border-border/50 shadow-sm">
            <span className="text-green-500 font-bold">+{viewsThisWeek}</span>{' '}
            novas esta semana
          </div>
        </div>

        {/* Viewers List */}
        <div>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            Últimos Visitantes
            {!isUnlocked && <Lock className="w-4 h-4 text-muted-foreground" />}
          </h3>

          <div className="space-y-3 relative">
            {mockProfileViewers.map((viewer, index) => (
              <Card
                key={viewer.id}
                className={cn(
                  'border-none shadow-sm transition-all',
                  !isUnlocked &&
                    index > 0 &&
                    'blur-sm opacity-60 select-none pointer-events-none',
                )}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-border">
                    <AvatarImage
                      src={
                        isUnlocked || index === 0 ? viewer.avatar : undefined
                      }
                    />
                    <AvatarFallback>
                      <User className="h-6 w-6 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="font-bold truncate">
                        {isUnlocked || index === 0
                          ? viewer.name
                          : 'Visitante Anônimo'}
                      </p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {viewer.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-muted-foreground">
                        {isUnlocked || index === 0
                          ? viewer.type
                          : 'Perfil Oculto'}
                      </p>
                      {(isUnlocked || index === 0) && (
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Paywall Overlay */}
            {!isUnlocked && (
              <div className="absolute inset-x-0 bottom-0 top-20 bg-gradient-to-b from-transparent via-background/90 to-background flex flex-col items-center justify-end pb-8 pt-20 px-4 text-center z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-yellow-600 rounded-full flex items-center justify-center mb-4 shadow-lg animate-pulse ring-4 ring-gold/20">
                  <Crown className="w-8 h-8 text-white fill-white" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <AppIcon className="w-5 h-5" />
                  <span className="font-bold text-primary tracking-tight">
                    Goplay App Premium
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  Saiba quem visitou você
                </h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-[280px] leading-relaxed">
                  Desbloqueie a lista completa e veja scouts, recrutadores e
                  atletas que estão de olho no seu perfil.
                </p>

                <PaymentDialog
                  title="Desbloquear Visualizações"
                  price={9.9}
                  pointsPrice={500}
                  onSuccess={() => setIsUnlocked(true)}
                >
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:to-primary text-white font-bold h-12 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Desbloquear por R$ 9,90
                  </Button>
                </PaymentDialog>

                <p className="text-xs text-muted-foreground mt-4 font-medium">
                  Ou use seus <span className="text-gold">Goplay Points</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
