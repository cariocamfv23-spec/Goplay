import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { moderationService } from '@/services/moderation'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'
import { UserX, UserCheck, Loader2 } from 'lucide-react'

interface BlockDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  targetUserId: string
  targetUserName?: string
  isCurrentlyBlocked?: boolean
  onBlockChanged?: (isBlocked: boolean) => void
}

export function BlockDialog({
  open,
  onOpenChange,
  targetUserId,
  targetUserName = 'este usuário',
  isCurrentlyBlocked = false,
  onBlockChanged,
}: BlockDialogProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleAction = async () => {
    if (!user?.id) {
      toast.error('Você precisa estar logado para realizar esta ação.')
      return
    }

    setLoading(true)

    if (isCurrentlyBlocked) {
      const { error } = await moderationService.unblockUser(
        user.id,
        targetUserId,
      )
      setLoading(false)

      if (error) {
        toast.error('Não foi possível desbloquear o usuário: ' + error.message)
        return
      }

      toast.success(`${targetUserName} foi desbloqueado(a).`, {
        description:
          'Você voltará a visualizar o perfil e publicações no feed.',
      })
      onOpenChange(false)
      onBlockChanged?.(false)
    } else {
      const { error } = await moderationService.blockUser(user.id, targetUserId)
      setLoading(false)

      if (error) {
        toast.error('Não foi possível bloquear o usuário: ' + error.message)
        return
      }

      toast.success(`${targetUserName} foi bloqueado(a).`, {
        description:
          'Vocês não verão mais conteúdos mútuos no feed nem poderão interagir.',
      })
      onOpenChange(false)
      onBlockChanged?.(true)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-destructive">
            {isCurrentlyBlocked ? (
              <UserCheck className="w-5 h-5 shrink-0 text-foreground" />
            ) : (
              <UserX className="w-5 h-5 shrink-0" />
            )}
            <AlertDialogTitle>
              {isCurrentlyBlocked
                ? `Desbloquear ${targetUserName}?`
                : `Bloquear ${targetUserName}?`}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-xs space-y-2 pt-1 text-muted-foreground leading-relaxed">
            {isCurrentlyBlocked ? (
              <span>
                Ao desbloquear, as publicações de {targetUserName} voltarão a
                aparecer no seu feed e vocês poderão interagir novamente no
                aplicativo.
              </span>
            ) : (
              <>
                <span className="block">
                  O bloqueio tem efeito mútuo e imediato:
                </span>
                <ul className="list-disc list-inside space-y-1 pl-1 text-[11px] text-foreground/80">
                  <li>Vocês não verão publicações um do outro no feed.</li>
                  <li>
                    Curtidas, comentários, mensagens e conexões serão
                    bloqueadas.
                  </li>
                  <li>
                    O usuário não receberá nenhuma notificação dizendo que foi
                    bloqueado.
                  </li>
                  <li>
                    Você pode desbloquear este perfil a qualquer momento no
                    perfil ou configurações.
                  </li>
                </ul>
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-0 pt-2">
          <AlertDialogCancel disabled={loading} className="text-xs">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleAction()
            }}
            disabled={loading}
            className={`text-xs font-bold gap-1.5 ${
              isCurrentlyBlocked
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Processando...
              </>
            ) : isCurrentlyBlocked ? (
              <>
                <UserCheck className="w-3.5 h-3.5" />
                Confirmar Desbloqueio
              </>
            ) : (
              <>
                <UserX className="w-3.5 h-3.5" />
                Sim, Bloquear
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
