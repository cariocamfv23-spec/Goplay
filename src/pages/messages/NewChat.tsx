import { Button } from '@/components/ui/button'
import { ArrowLeft, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { mockProfiles } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function NewChat() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="sticky top-0 bg-background z-20 p-4 border-b border-border/50 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Nova Conversa</h1>
      </div>

      <div className="p-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Para: Nome, usuário..."
            className="pl-9 bg-secondary border-none rounded-xl"
            autoFocus
          />
        </div>

        <h3 className="text-sm font-bold text-muted-foreground mb-3">
          Sugestões
        </h3>
        <div className="space-y-4">
          {mockProfiles.slice(0, 5).map((profile) => (
            <div
              key={profile.id}
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate(`/messages/user-${profile.id}`)}
            >
              <Avatar>
                <AvatarImage src={profile.avatar} />
                <AvatarFallback>{profile.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-sm">{profile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {profile.username}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
