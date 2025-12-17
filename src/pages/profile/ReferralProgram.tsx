import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { mockCurrentUser, referralLevels } from '@/lib/data'
import {
  ArrowLeft,
  Copy,
  Share2,
  Gift,
  MessageCircle,
  TrendingUp,
  Award,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ShareDialog } from '@/components/ShareDialog'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { ReferralLevelProgress } from '@/components/ReferralLevelProgress'
import useNotificationStore from '@/stores/useNotificationStore'

export default function ReferralProgram() {
  const navigate = useNavigate()
  const { addNotification } = useNotificationStore()
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Local state to simulate referral increments
  const [referralsCount, setReferralsCount] = useState(
    mockCurrentUser.referralStats?.invited || 0,
  )

  // Track previous level to show notifications on level up
  const [prevLevelId, setPrevLevelId] = useState<string>('')

  const referralCode = mockCurrentUser.referralCode || 'GOPLAY2024'
  const inviteLink = `https://goplay.app/invite/${referralCode}`
  const inviteMessage = `Baixe o Goplay com meu código ${referralCode} e ganhe 500 pontos na hora! ${inviteLink}`

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    toast.success('Código copiado!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsappShare = () => {
    const text = encodeURIComponent(inviteMessage)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  // Calculate Current Level ID
  const getCurrentLevelId = (count: number) => {
    const levelIndex = referralLevels.findIndex((level, index) => {
      const nextLevel = referralLevels[index + 1]
      return (
        count >= level.minReferrals &&
        (!nextLevel || count < nextLevel.minReferrals)
      )
    })
    return referralLevels[levelIndex]?.id || 'rookie'
  }

  // Effect to check for level up
  useEffect(() => {
    const currentLevelId = getCurrentLevelId(referralsCount)

    // Initial load
    if (!prevLevelId) {
      setPrevLevelId(currentLevelId)
      return
    }

    // Check if level changed and improved
    if (currentLevelId !== prevLevelId) {
      const newLevel = referralLevels.find((l) => l.id === currentLevelId)
      const oldLevelIndex = referralLevels.findIndex(
        (l) => l.id === prevLevelId,
      )
      const newLevelIndex = referralLevels.findIndex(
        (l) => l.id === currentLevelId,
      )

      if (newLevel && newLevelIndex > oldLevelIndex) {
        // Level Up!
        toast.success(`Parabéns! Você alcançou o nível ${newLevel.name}!`, {
          description: 'Novos benefícios foram desbloqueados em sua conta.',
          icon: <Award className="h-5 w-5 text-gold" />,
          duration: 5000,
        })

        addNotification({
          title: 'Novo Nível Alcançado!',
          message: `Você agora é nível ${newLevel.name} no programa de indicação. Aproveite seus novos benefícios!`,
          type: 'system',
          priority: 'high',
        })
      }
      setPrevLevelId(currentLevelId)
    }
  }, [referralsCount, prevLevelId, addNotification])

  const simulateReferral = () => {
    setReferralsCount((prev) => prev + 1)
    toast.success('Nova indicação simulada!', {
      description: 'Contagem de indicações atualizada.',
      icon: <TrendingUp className="h-4 w-4 text-green-500" />,
    })
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-purple-700 to-indigo-800 text-white pb-10 rounded-b-[2.5rem] relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/1000/1000?q=abstract%20network&color=purple')] bg-cover opacity-10 mix-blend-overlay" />

        <div className="relative z-10 p-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-bold">Indique e Ganhe</h1>
        </div>

        <div className="flex flex-col items-center justify-center pt-6 pb-4 relative z-10 px-6 text-center">
          <div className="h-20 w-20 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md mb-4 border border-white/20 shadow-lg">
            <Gift className="h-10 w-10 text-gold drop-shadow-md" />
          </div>
          <h2 className="text-3xl font-black tracking-tight mb-2">
            Ganhe pontos <br />
            <span className="text-gold">com amigos!</span>
          </h2>
          <p className="text-white/80 text-sm max-w-[280px]">
            Receba 200 pontos para cada amigo que baixar o app com seu código.
          </p>
        </div>
      </div>

      <div className="px-4 -mt-8 relative z-20 space-y-6">
        {/* Level Progress Component */}
        <ReferralLevelProgress currentReferrals={referralsCount} />

        {/* Code Card */}
        <Card className="border-none shadow-lg bg-card overflow-hidden">
          <CardContent className="p-6 flex flex-col items-center">
            <p className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              Seu código exclusivo
            </p>
            <div
              className="w-full bg-secondary/50 rounded-xl p-4 flex items-center justify-between border border-dashed border-primary/30 cursor-pointer group hover:border-primary/60 transition-colors"
              onClick={handleCopyCode}
            >
              <span className="text-2xl font-black text-primary tracking-widest font-mono">
                {referralCode}
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground group-hover:text-primary"
              >
                {copied ? (
                  <span className="text-green-500 font-bold text-xs">OK</span>
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Toque para copiar
            </p>
          </CardContent>
        </Card>

        {/* Share Actions */}
        <div className="space-y-3">
          <Button
            className="w-full h-14 text-base font-bold rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white shadow-md transition-all active:scale-[0.98]"
            onClick={handleWhatsappShare}
          >
            <MessageCircle className="mr-2 h-6 w-6" />
            Convidar via WhatsApp
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 font-bold rounded-xl border-2 hover:bg-secondary/50"
            onClick={() => setIsShareOpen(true)}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Outras opções
          </Button>
        </div>

        {/* Developer Tool: Simulation Button */}
        <div className="pt-4 border-t border-dashed border-border/50">
          <p className="text-xs text-muted-foreground text-center mb-2">
            Área de Simulação (Dev)
          </p>
          <Button
            variant="secondary"
            className="w-full border border-primary/20 bg-primary/5 text-primary"
            onClick={simulateReferral}
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Simular +1 Indicação
          </Button>
        </div>
      </div>

      <ShareDialog
        open={isShareOpen}
        onOpenChange={setIsShareOpen}
        title="Convite Goplay"
        description={inviteMessage}
        url={inviteLink}
      />
    </div>
  )
}
