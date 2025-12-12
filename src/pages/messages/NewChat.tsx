import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ArrowLeft, Users, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockProfiles } from '@/lib/data'
import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'

const NewChat = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [isGroupMode, setIsGroupMode] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const filteredUsers = mockProfiles.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  )

  const handleUserSelect = (id: string) => {
    if (isGroupMode) {
      if (selectedUsers.includes(id)) {
        setSelectedUsers(selectedUsers.filter((uid) => uid !== id))
      } else {
        setSelectedUsers([...selectedUsers, id])
      }
    } else {
      // Start direct chat immediately
      navigate(`/messages/user-${id}`)
    }
  }

  const handleCreateGroup = () => {
    if (selectedUsers.length === 0) return
    // In a real app, create group API call here
    navigate('/messages/group-new')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-4 border-b border-border flex items-center gap-3 bg-background/80 backdrop-blur-md sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-bold text-lg">Nova Conversa</h1>
          <p className="text-xs text-muted-foreground">
            {isGroupMode
              ? `${selectedUsers.length} selecionados`
              : 'Selecione um contato'}
          </p>
        </div>
        {isGroupMode && (
          <Button
            size="sm"
            onClick={handleCreateGroup}
            disabled={selectedUsers.length === 0}
          >
            Criar
          </Button>
        )}
      </div>

      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar pessoas..."
            className="pl-9 bg-secondary border-none rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div
          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors ${isGroupMode ? 'bg-primary/10 border border-primary/20' : ''}`}
          onClick={() => {
            setIsGroupMode(!isGroupMode)
            setSelectedUsers([])
          }}
        >
          <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-primary">
            <Users className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Novo Grupo</h3>
            <p className="text-sm text-muted-foreground">
              Adicione participantes
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-muted-foreground px-1 mb-2">
            Sugestões
          </h2>
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 p-3 hover:bg-secondary/30 rounded-xl cursor-pointer transition-colors"
              onClick={() => handleUserSelect(user.id)}
            >
              <div className="relative">
                <Avatar className="h-12 w-12 border border-border">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                {isGroupMode && selectedUsers.includes(user.id) && (
                  <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-0.5">
                    <UserPlus className="h-3 w-3" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{user.name}</h3>
                <p className="text-xs text-muted-foreground">{user.type}</p>
              </div>
              {isGroupMode && (
                <Checkbox checked={selectedUsers.includes(user.id)} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewChat
