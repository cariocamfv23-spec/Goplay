import { Tribe } from '@/stores/useNexusStore'
import { useNexusStore } from '@/stores/useNexusStore'
import { mockFeedUsers } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Check, X, ShieldAlert } from 'lucide-react'

export function TribeAdminTab({ tribe }: { tribe: Tribe }) {
  const { approveRequest, declineRequest } = useNexusStore()

  const pendingUsers = tribe.pendingRequests.map(
    (id) =>
      mockFeedUsers.find((u) => u.id === id) || {
        id,
        name: 'Usuário Desconhecido',
        avatar: '',
      },
  )

  return (
    <div className="space-y-8 py-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-orange-500" />
            Solicitações Pendentes
          </h3>
          <span className="bg-orange-500/10 text-orange-500 font-bold px-2.5 py-0.5 rounded-full text-xs">
            {pendingUsers.length}
          </span>
        </div>

        {pendingUsers.length === 0 && (
          <p className="text-sm text-muted-foreground bg-secondary/30 p-4 rounded-xl text-center border border-border border-dashed">
            Nenhuma solicitação no momento.
          </p>
        )}

        <div className="grid gap-3">
          {pendingUsers.map((u) => (
            <div
              key={u.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm gap-4"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border border-border">
                  <AvatarImage src={u.avatar} />
                  <AvatarFallback>{u.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <span className="font-bold text-sm leading-none block">
                    {u.name}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Deseja entrar na tribo
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 sm:flex-none gap-1 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => approveRequest(tribe.id, u.id)}
                >
                  <Check className="w-4 h-4" /> Aprovar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 sm:flex-none gap-1 text-destructive hover:bg-destructive/10 border-destructive/20"
                  onClick={() => declineRequest(tribe.id, u.id)}
                >
                  <X className="w-4 h-4" /> Recusar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="font-bold text-lg">Membros Atuais</h3>
          <span className="bg-primary/10 text-primary font-bold px-2.5 py-0.5 rounded-full text-xs">
            {tribe.members.length}
          </span>
        </div>
        <p className="text-sm text-muted-foreground p-4 bg-secondary/30 rounded-xl text-center border border-border border-dashed">
          Painel completo de gerenciamento de membros estará disponível na
          próxima atualização.
        </p>
      </div>
    </div>
  )
}
