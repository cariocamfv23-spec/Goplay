import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { User, Bell, Lock, Globe, LogOut, Moon } from 'lucide-react'

const Settings = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Conta</h2>
        <Card className="p-0 overflow-hidden border border-border shadow-sm">
          <div className="flex items-center justify-between p-4 hover:bg-secondary/50 cursor-pointer border-b border-border/50">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <span>Dados Pessoais</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 hover:bg-secondary/50 cursor-pointer">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <span>Segurança e Senha</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Preferências</h2>
        <Card className="p-0 overflow-hidden border border-border shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span>Notificações</span>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <Moon className="h-5 w-5 text-muted-foreground" />
              <span>Modo Escuro</span>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between p-4 hover:bg-secondary/50 cursor-pointer">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <span>Idioma</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Português (BR)
            </span>
          </div>
        </Card>
      </div>

      <Button variant="destructive" className="w-full mt-8">
        <LogOut className="h-4 w-4 mr-2" /> Sair
      </Button>
    </div>
  )
}

export default Settings
