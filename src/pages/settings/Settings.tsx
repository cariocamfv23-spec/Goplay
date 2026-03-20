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
  Camera,
  Film,
  Tv,
  Image as ImageIcon,
  Layers,
  Crown,
  EyeOff,
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
import { useNostalgiaStore, NostalgiaPreset } from '@/stores/useNostalgiaStore'
import { useDepthStore } from '@/stores/useDepthStore'
import { usePrivacyStore } from '@/stores/usePrivacyStore'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { PaymentDialog } from '@/components/PaymentDialog'

export default function Settings() {
  const navigate = useNavigate()
  const { setTheme, theme } = useTheme()
  const { preferences, toggleAll, toggleType } = useWeatherStore()
  const {
    preferences: scholarshipPrefs,
    toggleNotifications: toggleScholarshipNotifs,
  } = useScholarshipStore()
  const {
    isEnabled: isNostalgiaEnabled,
    preset: nostalgiaPreset,
    toggle: toggleNostalgia,
    setPreset: setNostalgiaPreset,
  } = useNostalgiaStore()
  const {
    isEnabled: isDepthEnabled,
    intensity: depthIntensity,
    toggle: toggleDepth,
    setIntensity: setDepthIntensity,
  } = useDepthStore()
  const { isInvisibleMode, isPremium, toggleInvisibleMode, upgradeToPremium } =
    usePrivacyStore()

  const nostalgiaPresets: {
    id: NostalgiaPreset
    label: string
    icon: any
  }[] = [
    { id: 'grain', label: 'Granulado', icon: Film },
    { id: 'retro', label: 'Retro Tones', icon: Camera },
    { id: 'vhs', label: 'VHS', icon: Tv },
    { id: '90s', label: 'Anos 90', icon: Zap },
    { id: 'analog', label: 'Analógico', icon: Camera },
    { id: 'polaroid', label: 'Polaroid', icon: ImageIcon },
  ]

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

        {/* Premium Privacy Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-muted-foreground uppercase px-2 flex items-center gap-2">
            Privacidade <Crown className="w-3.5 h-3.5 text-gold" />
          </h3>
          <div className="px-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <EyeOff className="h-4 w-4 text-primary" />
                  <Label className="text-base font-bold text-foreground">
                    Modo Invisível
                  </Label>
                  {!isPremium && (
                    <Badge
                      variant="secondary"
                      className="bg-gold/20 text-gold hover:bg-gold/30 border-none text-[9px] px-1.5 py-0"
                    >
                      PRO
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground max-w-[260px]">
                  Navegue anonimamente sem disparar notificações de VIP ou
                  aparecer em históricos de visitas.
                </p>
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
                    isInvisibleMode && 'data-[state=checked]:bg-primary',
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* 3D Depth Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-muted-foreground uppercase px-2 flex items-center gap-2">
            Efeitos Visuais
          </h3>
          <div className="px-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-indigo-500" />
                  <Label className="text-base">Profundidade 3D</Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Habilita camadas de profundidade e paralaxe.
                </p>
              </div>
              <Switch checked={isDepthEnabled} onCheckedChange={toggleDepth} />
            </div>

            {isDepthEnabled && (
              <div className="pt-2 space-y-3 animate-fade-in px-1">
                <div className="flex justify-between text-xs text-muted-foreground font-medium">
                  <span>Suave</span>
                  <span>Intenso</span>
                </div>
                <Slider
                  value={[depthIntensity]}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  onValueChange={(vals) => setDepthIntensity(vals[0])}
                  className="py-2"
                />
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Nostalgia Mode */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-muted-foreground uppercase px-2 flex items-center gap-2">
            Modo Nostalgia <Badge variant="secondary">Novo</Badge>
          </h3>

          <div className="px-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Ativar Filtros Retro</Label>
                <p className="text-xs text-muted-foreground">
                  Aplica visual nostálgico em fotos e vídeos.
                </p>
              </div>
              <Switch
                checked={isNostalgiaEnabled}
                onCheckedChange={toggleNostalgia}
              />
            </div>

            {isNostalgiaEnabled && (
              <div className="grid grid-cols-2 gap-2 animate-fade-in">
                {nostalgiaPresets.map((p) => (
                  <Button
                    key={p.id}
                    variant={nostalgiaPreset === p.id ? 'default' : 'outline'}
                    size="sm"
                    className={cn(
                      'justify-start h-10',
                      nostalgiaPreset === p.id && 'border-primary',
                    )}
                    onClick={() => setNostalgiaPreset(p.id)}
                  >
                    <p.icon className="mr-2 h-4 w-4" />
                    {p.label}
                  </Button>
                ))}
              </div>
            )}
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
