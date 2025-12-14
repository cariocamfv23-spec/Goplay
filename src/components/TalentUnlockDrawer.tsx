import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Lock,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Trophy,
  Mail,
  Phone,
  ShieldAlert,
} from 'lucide-react'
import { ProfileData } from '@/lib/data'
import { useState } from 'react'
import { PaymentDialog } from '@/components/PaymentDialog'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface TalentUnlockDrawerProps {
  athlete: ProfileData | null
  open: boolean
  onClose: () => void
}

export function TalentUnlockDrawer({
  athlete,
  open,
  onClose,
}: TalentUnlockDrawerProps) {
  const navigate = useNavigate()
  const [isUnlocked, setIsUnlocked] = useState(false)

  if (!athlete) return null

  const isUnderage = (athlete.age || 0) < 18

  const handleUnlockSuccess = () => {
    setIsUnlocked(true)
    toast.success('Acesso ao perfil liberado com sucesso!')
  }

  const handleContactSupport = () => {
    toast.info('Solicitação enviada ao suporte para validação de cláusulas.')
    onClose()
  }

  return (
    <Drawer open={open} onOpenChange={(val) => !val && onClose()}>
      <DrawerContent className="max-h-[90vh]">
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader className="text-left">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="h-20 w-20 border-2 border-background shadow-lg">
                <AvatarImage src={athlete.avatar} />
                <AvatarFallback>{athlete.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <DrawerTitle className="text-xl font-bold">
                    {athlete.name}
                  </DrawerTitle>
                  {isUnlocked && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">
                      <CheckCircle className="w-3 h-3 mr-1" /> Liberado
                    </Badge>
                  )}
                </div>
                <DrawerDescription className="flex flex-col gap-1 mt-1">
                  <span className="flex items-center gap-1 text-primary font-medium">
                    <Trophy className="w-3 h-3" /> {athlete.sport} •{' '}
                    {athlete.position}
                  </span>
                  <span className="flex items-center gap-1 text-xs">
                    <MapPin className="w-3 h-3" /> {athlete.location}
                  </span>
                  {athlete.age && (
                    <span className="text-xs text-muted-foreground">
                      {athlete.age} anos • {athlete.height} • {athlete.weight}
                    </span>
                  )}
                </DrawerDescription>
              </div>
            </div>

            <div className="bg-secondary/30 p-4 rounded-xl space-y-3 mb-2">
              <h4 className="text-sm font-semibold">Resumo do Atleta</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {athlete.bio}
              </p>
              <div className="flex gap-4 pt-2">
                <div className="flex flex-col items-center p-2 bg-background rounded-lg flex-1 border border-border/50">
                  <span className="font-bold text-lg">
                    {athlete.stats?.matches || 0}
                  </span>
                  <span className="text-[10px] uppercase text-muted-foreground">
                    Jogos
                  </span>
                </div>
                <div className="flex flex-col items-center p-2 bg-background rounded-lg flex-1 border border-border/50">
                  <span className="font-bold text-lg text-green-600">
                    {athlete.rating || '-'}
                  </span>
                  <span className="text-[10px] uppercase text-muted-foreground">
                    Rating
                  </span>
                </div>
                <div className="flex flex-col items-center p-2 bg-background rounded-lg flex-1 border border-border/50">
                  <span className="font-bold text-lg text-gold">
                    {athlete.stats?.mvp || 0}
                  </span>
                  <span className="text-[10px] uppercase text-muted-foreground">
                    MVPs
                  </span>
                </div>
              </div>
            </div>

            {!isUnlocked ? (
              <div className="relative mt-4 p-5 border border-dashed border-red-200 bg-red-50 dark:bg-red-900/10 rounded-xl overflow-hidden">
                <div className="flex flex-col items-center text-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-red-700 dark:text-red-400">
                      Informações Privadas
                    </h3>
                    <p className="text-xs text-red-600/80 dark:text-red-300 mt-1 max-w-[280px] mx-auto">
                      O acesso ao contato direto, histórico médico e relatórios
                      detalhados é restrito a recrutadores verificados.
                    </p>
                  </div>
                </div>
                {/* Simulated blurred content */}
                <div className="absolute inset-0 flex flex-col gap-2 p-4 opacity-10 pointer-events-none blur-[2px]">
                  <div className="h-4 bg-black w-3/4 rounded" />
                  <div className="h-4 bg-black w-1/2 rounded" />
                </div>
              </div>
            ) : (
              <div className="mt-4 p-5 border border-green-200 bg-green-50 dark:bg-green-900/10 rounded-xl animate-fade-in">
                <h4 className="font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Dados de Contato
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border/40">
                    <div className="p-2 bg-secondary rounded-full">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        E-mail
                      </span>
                      <span className="text-sm font-medium select-all">
                        {athlete.username.replace('@', '')}@email.com
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border/40">
                    <div className="p-2 bg-secondary rounded-full">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        Telefone
                      </span>
                      <span className="text-sm font-medium select-all">
                        (11) 99999-9999
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => navigate(`/profile/${athlete.id}`)}
                >
                  Ver Perfil Completo
                </Button>
              </div>
            )}
          </DrawerHeader>

          {!isUnlocked && (
            <DrawerFooter className="pt-2 pb-8">
              {isUnderage ? (
                <div className="space-y-3">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 dark:text-amber-200 text-left">
                      <strong>Atenção: Atleta Menor de Idade.</strong>
                      <br />
                      Para segurança de todos, o acesso a perfis de atletas
                      menores de 18 anos requer validação de cláusulas de
                      responsabilidade junto ao nosso suporte.
                    </p>
                  </div>
                  <Button
                    className="w-full h-12 text-base font-bold bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={handleContactSupport}
                  >
                    Contatar Suporte e Validar
                  </Button>
                </div>
              ) : (
                <PaymentDialog
                  title={`Acesso Total: ${athlete.name}`}
                  price={9.9}
                  pointsPrice={1000}
                  onSuccess={handleUnlockSuccess}
                >
                  <Button className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20">
                    Desbloquear Acesso Completo (R$ 9,90)
                  </Button>
                </PaymentDialog>
              )}
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </DrawerFooter>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
