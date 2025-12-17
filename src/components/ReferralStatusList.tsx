import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Referral, ReferralStatus } from '@/lib/referral-data'
import { Mail, Smartphone, UserCheck, Clock, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReferralStatusListProps {
  referrals: Referral[]
}

const getStatusConfig = (status: ReferralStatus) => {
  switch (status) {
    case 'registered':
      return {
        label: 'Cadastro Completo',
        icon: UserCheck,
        color:
          'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
        iconColor: 'text-green-600',
      }
    case 'downloaded':
      return {
        label: 'App Instalado',
        icon: Smartphone,
        color:
          'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
        iconColor: 'text-amber-600',
      }
    case 'sent':
      return {
        label: 'Convite Enviado',
        icon: Mail,
        color:
          'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
        iconColor: 'text-slate-500',
      }
    default:
      return {
        label: 'Desconhecido',
        icon: Clock,
        color: 'bg-gray-100',
        iconColor: 'text-gray-500',
      }
  }
}

export function ReferralStatusList({ referrals }: ReferralStatusListProps) {
  if (!referrals || referrals.length === 0) {
    return (
      <Card className="border-none shadow-lg bg-card overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Minhas Indicações
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center text-muted-foreground">
          <p className="text-sm">Você ainda não indicou ninguém.</p>
          <p className="text-xs mt-1">
            Compartilhe seu código para começar a ganhar pontos!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-none shadow-lg bg-card overflow-hidden">
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Minhas Indicações
          <Badge variant="secondary" className="ml-auto">
            {referrals.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/50">
          {referrals.map((referral) => {
            const statusConfig = getStatusConfig(referral.status)
            const StatusIcon = statusConfig.icon

            return (
              <div
                key={referral.id}
                className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors"
              >
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage src={referral.avatar} alt={referral.name} />
                  <AvatarFallback>{referral.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">
                    {referral.name}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock className="h-3 w-3" />
                    {referral.date}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div
                    className={cn(
                      'flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border',
                      statusConfig.color,
                    )}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {statusConfig.label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
