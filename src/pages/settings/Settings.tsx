import { Button } from '@/components/ui/button'
import { ArrowLeft, User, Bell, Lock, HelpCircle, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'

export default function Settings() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background z-20 p-4 border-b border-border/50 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Configurações</h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-muted-foreground uppercase px-2">
            Conta
          </h3>
          <Button
            variant="ghost"
            className="w-full justify-start h-12 gap-3 text-base font-normal"
          >
            <User className="h-5 w-5" /> Dados Pessoais
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start h-12 gap-3 text-base font-normal"
          >
            <Bell className="h-5 w-5" /> Notificações
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start h-12 gap-3 text-base font-normal"
          >
            <Lock className="h-5 w-5" /> Privacidade e Segurança
          </Button>
        </div>

        <Separator />

        <div className="space-y-1">
          <h3 className="text-sm font-bold text-muted-foreground uppercase px-2">
            Suporte
          </h3>
          <Button
            variant="ghost"
            className="w-full justify-start h-12 gap-3 text-base font-normal"
          >
            <HelpCircle className="h-5 w-5" /> Ajuda
          </Button>
        </div>

        <Separator />

        <Button
          variant="ghost"
          className="w-full justify-start h-12 gap-3 text-base font-medium text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-5 w-5" /> Sair da Conta
        </Button>
      </div>
    </div>
  )
}
