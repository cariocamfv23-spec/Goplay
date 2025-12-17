import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  User,
  Bell,
  Lock,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Laptop,
  CloudRain,
  Thermometer,
  Zap,
  GraduationCap,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { useWeatherStore } from '@/stores/useWeatherStore'
import { useScholarshipStore } from '@/stores/useScholarshipStore'
import { Label } from '@/components/ui/label'

export default function Settings() {
  const navigate = useNavigate()
  const { setTheme, theme } = useTheme()
  const { preferences, toggleAll, toggleType } = useWeatherStore()
  const {
    preferences: scholarshipPrefs,
    toggleNotifications: toggleScholarshipNotifs,
  } = useScholarshipStore()

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
            Aparência
          </h3>
          <div className="px-2 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    {theme === 'light' && <Sun className="h-4 w-4" />}
                    {theme === 'dark' && <Moon className="h-4 w-4" />}
                    {theme === 'system' && <Laptop className="h-4 w-4" />}
                    Tema
                  </span>
                  <span className="capitalize text-muted-foreground">
                    {theme === 'system'
                      ? 'Automático'
                      : theme === 'dark'
                        ? 'Escuro'
                        : 'Claro'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  <Sun className="mr-2 h-4 w-4" />
                  Claro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  <Moon className="mr-2 h-4 w-4" />
                  Escuro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  <Laptop className="mr-2 h-4 w-4" />
                  Automático (Sistema)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator />

        {/* Scholarships Alerts Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-muted-foreground uppercase px-2">
            Oportunidades
          </h3>

          <div className="px-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-emerald-500" />
                  <Label className="text-base">Novas Bolsas Compatíveis</Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Receba alertas quando surgirem bolsas para seu perfil.
                </p>
              </div>
              <Switch
                checked={scholarshipPrefs.notifications}
                onCheckedChange={toggleScholarshipNotifs}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-muted-foreground uppercase px-2">
            Alertas Climáticos
          </h3>

          <div className="px-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Notificações Climáticas</Label>
                <p className="text-xs text-muted-foreground">
                  Receba alertas preventivos sobre o clima.
                </p>
              </div>
              <Switch
                checked={preferences.enabled}
                onCheckedChange={toggleAll}
              />
            </div>

            {preferences.enabled && (
              <div className="pl-4 space-y-4 border-l-2 border-border/50 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <Label className="font-normal">Temporais e Raios</Label>
                  </div>
                  <Switch
                    checked={preferences.storm}
                    onCheckedChange={(c) => toggleType('storm', c)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CloudRain className="h-4 w-4 text-blue-500" />
                    <Label className="font-normal">Chuvas Fortes</Label>
                  </div>
                  <Switch
                    checked={preferences.heavyRain}
                    onCheckedChange={(c) => toggleType('heavyRain', c)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-cyan-500" />
                    <Label className="font-normal">Frio Intenso</Label>
                  </div>
                  <Switch
                    checked={preferences.intenseCold}
                    onCheckedChange={(c) => toggleType('intenseCold', c)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator />

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
            <Bell className="h-5 w-5" /> Notificações Gerais
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
