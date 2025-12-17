import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { mockCurrentUser } from '@/lib/data'
import {
  ArrowLeft,
  Copy,
  Share2,
  Gift,
  Users,
  CreditCard,
  MessageCircle,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ShareDialog } from '@/components/ShareDialog'
import { useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function ReferralProgram() {
  const navigate = useNavigate()
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [copied, setCopied] = useState(false)

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

        {/* Stats */}
        <div>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" /> Seus Resultados
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary/30 p-4 rounded-xl border border-border/50">
              <p className="text-3xl font-black text-foreground mb-1">
                {mockCurrentUser.referralStats?.invited || 0}
              </p>
              <p className="text-xs text-muted-foreground uppercase font-bold">
                Amigos convidados
              </p>
            </div>
            <div className="bg-secondary/30 p-4 rounded-xl border border-border/50">
              <p className="text-3xl font-black text-gold mb-1">
                {mockCurrentUser.referralStats?.earned || 0}
              </p>
              <p className="text-xs text-muted-foreground uppercase font-bold">
                Pontos ganhos
              </p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
          <CardContent className="p-4 flex gap-4 items-start">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1">Use no Cartão Goplay</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Seus pontos acumulados viram saldo real para gastar na loja ou
                com parceiros.
                <br />
                <span className="font-semibold text-primary block mt-1">
                  1000 pts = R$ 10,00
                </span>
              </p>
              <Button
                variant="link"
                className="px-0 h-auto mt-2 text-xs font-bold"
                onClick={() => navigate('/wallet')}
              >
                Ir para Carteira &rarr;
              </Button>
            </div>
          </CardContent>
        </Card>
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
