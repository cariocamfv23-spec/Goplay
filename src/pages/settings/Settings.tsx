import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useBrandingStore from '@/stores/useBrandingStore'
import {
  Bell,
  CreditCard,
  HelpCircle,
  Lock,
  LogOut,
  Palette,
  Shield,
  Upload,
  User,
  Eye,
  Camera,
  Car,
  MessageSquare,
  Calendar,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Switch } from '@/components/ui/switch'

export default function Settings() {
  const navigate = useNavigate()
  const { logoUrl, iconUrl, setLogoUrl, setIconUrl, resetBranding } =
    useBrandingStore()
  const [tempLogo, setTempLogo] = useState(logoUrl)
  const [tempIcon, setTempIcon] = useState(iconUrl)
  const [uploading, setUploading] = useState(false)
  const [privacy, setPrivacy] = useState({
    feedbackPublic: true,
    showStats: true,
  })
  const [notifications, setNotifications] = useState({
    push: true,
    feedback: true,
    driverUpdates: true,
    photographerUpdates: true,
    messages: true,
    scheduledRides: true, // New preference
  })

  const handleSaveBranding = () => {
    setLogoUrl(tempLogo)
    setIconUrl(tempIcon)
    toast.success('Marca atualizada com sucesso!')
  }

  const handleResetBranding = () => {
    resetBranding()
    setTempLogo('https://img.usecurling.com/i?q=play&shape=fill&color=violet')
    setTempIcon('https://img.usecurling.com/i?q=play&shape=fill&color=violet')
    toast.success('Marca restaurada para o padrão.')
  }

  const handleNotificationChange = (
    key: keyof typeof notifications,
    value: boolean,
  ) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
    toast.success('Preferência salva', {
      description: 'Suas configurações de notificação foram atualizadas.',
    })
  }

  const simulateUpload = (type: 'logo' | 'icon') => {
    setUploading(true)
    setTimeout(() => {
      // Simulating an upload that returns a new URL
      // We use a different query to simulate a change
      const newUrl = `https://img.usecurling.com/i?q=goplay&shape=fill&color=violet&ts=${Date.now()}`
      if (type === 'logo') setTempLogo(newUrl)
      else setTempIcon(newUrl)
      setUploading(false)
      toast.success('Imagem enviada com sucesso!')
    }, 1500)
  }

  return (
    <div className="container max-w-2xl mx-auto py-6 px-4 pb-24 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências e conta.
        </p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 bg-background border rounded-xl">
          <TabsTrigger value="account" className="gap-2">
            <User className="h-4 w-4" /> Conta
          </TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2">
            <Lock className="h-4 w-4" /> Privacidade
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" /> Notificações
          </TabsTrigger>
          <TabsTrigger value="branding" className="gap-2">
            <Palette className="h-4 w-4" /> Aparência
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Sua Conta</CardTitle>
              <CardDescription>
                Informações pessoais e segurança.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Button
                  variant="outline"
                  className="justify-start gap-2 h-12"
                  onClick={() => navigate('/profile/me')}
                >
                  <User className="h-4 w-4" /> Editar Perfil
                </Button>
                <Button
                  variant="outline"
                  className="justify-start gap-2 h-12"
                  onClick={() => navigate('/wallet/cards')}
                >
                  <CreditCard className="h-4 w-4" /> Métodos de Pagamento
                </Button>
                <Button variant="outline" className="justify-start gap-2 h-12">
                  <Shield className="h-4 w-4" /> Verificações
                </Button>
              </div>
              <Separator className="my-2" />
              <Button
                variant="destructive"
                className="w-full gap-2"
                onClick={() => navigate('/login')}
              >
                <LogOut className="h-4 w-4" /> Sair da Conta
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacidade e Visibilidade</CardTitle>
              <CardDescription>
                Controle quem pode ver suas informações e interagir.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-2">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Eye className="h-4 w-4" /> Estatísticas Públicas
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Permitir que outros vejam seus gráficos de performance.
                  </p>
                </div>
                <Switch
                  checked={privacy.showStats}
                  onCheckedChange={(c) =>
                    setPrivacy({ ...privacy, showStats: c })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between p-2">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <User className="h-4 w-4" /> Feedback Aberto
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Aceitar feedback de qualquer treinador/usuário.
                  </p>
                </div>
                <Switch
                  checked={privacy.feedbackPublic}
                  onCheckedChange={(c) =>
                    setPrivacy({ ...privacy, feedbackPublic: c })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notificações Personalizadas</CardTitle>
              <CardDescription>
                Escolha exatamente o que você quer receber.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-2">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Bell className="h-4 w-4" /> Notificações Push
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Alertas gerais do aplicativo.
                  </p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(c) => handleNotificationChange('push', c)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between p-2">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Car className="h-4 w-4" /> Atualizações de Motoristas
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Status de corridas e mudanças de perfil.
                  </p>
                </div>
                <Switch
                  checked={notifications.driverUpdates}
                  onCheckedChange={(c) =>
                    handleNotificationChange('driverUpdates', c)
                  }
                />
              </div>
              <div className="flex items-center justify-between p-2">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Alertas de Corridas
                    Agendadas
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Lembretes e confirmações de suas viagens.
                  </p>
                </div>
                <Switch
                  checked={notifications.scheduledRides}
                  onCheckedChange={(c) =>
                    handleNotificationChange('scheduledRides', c)
                  }
                />
              </div>
              <div className="flex items-center justify-between p-2">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Camera className="h-4 w-4" /> Atualizações de Fotógrafos
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Novos álbuns e status de serviços.
                  </p>
                </div>
                <Switch
                  checked={notifications.photographerUpdates}
                  onCheckedChange={(c) =>
                    handleNotificationChange('photographerUpdates', c)
                  }
                />
              </div>
              <div className="flex items-center justify-between p-2">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> Chat e Mensagens
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Receber alertas de novas mensagens.
                  </p>
                </div>
                <Switch
                  checked={notifications.messages}
                  onCheckedChange={(c) =>
                    handleNotificationChange('messages', c)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Personalização da Marca</CardTitle>
              <CardDescription>
                Defina o logo e ícone oficiais do aplicativo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-xl border flex items-center justify-center bg-secondary/20 p-2">
                    <img
                      src={tempLogo}
                      alt="Logo Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="logo-url">Logo Oficial</Label>
                    <div className="flex gap-2">
                      <Input
                        id="logo-url"
                        value={tempLogo}
                        onChange={(e) => setTempLogo(e.target.value)}
                        placeholder="https://..."
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => simulateUpload('logo')}
                        disabled={uploading}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Use uma imagem quadrada ou retangular transparente
                      (PNG/SVG).
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl border flex items-center justify-center bg-secondary/20 p-2">
                    <img
                      src={tempIcon}
                      alt="Icon Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="icon-url">Ícone do App (Favicon)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="icon-url"
                        value={tempIcon}
                        onChange={(e) => setTempIcon(e.target.value)}
                        placeholder="https://..."
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => simulateUpload('icon')}
                        disabled={uploading}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Será usado como ícone do navegador e atalho.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="ghost"
                  onClick={handleResetBranding}
                  className="text-muted-foreground"
                >
                  Restaurar Padrão
                </Button>
                <Button
                  onClick={handleSaveBranding}
                  className="bg-gradient-primary"
                >
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-center">
        <Button variant="link" className="text-muted-foreground gap-2">
          <HelpCircle className="h-4 w-4" /> Precisa de ajuda?
        </Button>
        <p className="text-[10px] text-muted-foreground mt-2">
          Versão 1.0.3 (Build 2305)
        </p>
      </div>
    </div>
  )
}
