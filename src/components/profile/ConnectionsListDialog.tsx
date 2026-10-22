import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { connectionService, type FollowUserItem } from "@/services/connections"
import { useNavigate } from "react-router-dom"
import { Loader2, Users } from "lucide-react"

interface ConnectionsListDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId: string
  mode: "followers" | "following"
  userName: string
}

export function ConnectionsListDialog({
  open,
  onOpenChange,
  userId,
  mode,
  userName,
}: ConnectionsListDialogProps) {
  const navigate = useNavigate()
  const [users, setUsers] = useState<FollowUserItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !userId) return
    setLoading(true)
    const fetcher =
      mode === "followers"
        ? connectionService.getFollowers(userId)
        : connectionService.getFollowing(userId)

    fetcher.then((list) => {
      setUsers(list)
      setLoading(false)
    })
  }, [open, userId, mode])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Users className="w-4 h-4 text-primary" />
            {mode === "followers"
              ? `Seguidores de ${userName}`
              : `Perfis que ${userName} segue`}
          </DialogTitle>
        </DialogHeader>

        <div className="py-2 max-h-[60vh] overflow-y-auto space-y-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="text-xs text-muted-foreground">
                Carregando lista...
              </span>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-xs text-muted-foreground">
              {mode === "followers"
                ? "Nenhum seguidor até o momento."
                : "Ainda não está seguindo nenhum perfil."}
            </div>
          ) : (
            users.map((u) => (
              <div
                key={u.id}
                onClick={() => {
                  onOpenChange(false)
                  navigate(`/profile/${u.id}`)
                }}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-secondary/40 cursor-pointer transition-colors border border-border/30 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="w-10 h-10 border border-border/50">
                    <AvatarImage src={u.avatar} />
                    <AvatarFallback>{u.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                      {u.name}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span>{u.sport || u.type}</span>
                      {(u.city || u.state) && (
                        <span>
                          • {[u.city, u.state].filter(Boolean).join(", ")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="text-[10px] capitalize shrink-0"
                >
                  {u.type === "club"
                    ? "Clube"
                    : u.type === "coach"
                      ? "Coach"
                      : "Atleta"}
                </Badge>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
