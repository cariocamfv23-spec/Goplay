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
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function Settings() {
  const navigate = useNavigate()
  const { logoUrl, iconUrl, setLogoUrl, setIconUrl, resetBranding } =
    useBrandingStore()
  const [tempLogo, setTempLogo] = useState(logoUrl)
  const [tempIcon, setTempIcon] = useState(iconUrl)
  const [uploading, setUploading] = useState(false)

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

      <Tabs defaultValue="branding" className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 bg-background border rounded-xl">
          <TabsTrigger value="branding" className="gap-2">
            <Palette className="h-4 w-4" /> Aparência
          </TabsTrigger>
          <TabsTrigger value="account" className="gap-2">
            <User className="h-4 w-4" /> Conta
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" /> Notificações
          </TabsTrigger>
        </TabsList>

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
                  <Lock className="h-4 w-4" /> Senha e Segurança
                </Button>
                <Button variant="outline" className="justify-start gap-2 h-12">
                  <Shield className="h-4 w-4" /> Privacidade
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

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>
                Escolha como você quer ser notificado.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-2">
                <div className="space-y-0.5">
                  <Label>Notificações Push</Label>
                  <p className="text-xs text-muted-foreground">
                    Receba alertas sobre novos jogos e mensagens.
                  </p>
                </div>
                {/* Mock Switch */}
                <div className="h-6 w-11 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full" />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between p-2">
                <div className="space-y-0.5">
                  <Label>Emails de Marketing</Label>
                  <p className="text-xs text-muted-foreground">
                    Novidades e promoções dos parceiros.
                  </p>
                </div>
                <div className="h-6 w-11 bg-input rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
                </div>
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
          Versão 1.0.2 (Build 2304)
        </p>
      </div>
    </div>
  )
}
