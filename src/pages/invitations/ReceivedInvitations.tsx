import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, MapPin, Check, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockInvitations } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export default function ReceivedInvitations() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4 flex items-center gap-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="font-bold text-xl">Convites</h1>
      </div>

      <div className="p-4 space-y-4">
        {mockInvitations.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            Nenhum convite pendente.
          </div>
        ) : (
          mockInvitations.map((invite) => (
            <Card key={invite.id} className="animate-fade-in">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border border-border">
                      <AvatarImage src={invite.teamLogo} />
                      <AvatarFallback>{invite.teamName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold">{invite.teamName}</h3>
                      <Badge variant="secondary" className="text-[10px] h-5">
                        {invite.modality}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-primary">
                      {invite.level}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" /> {invite.time}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {invite.location}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 gap-2">
                    <Check className="h-4 w-4" /> Aceitar
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 hover:bg-destructive/10 hover:text-destructive gap-2"
                  >
                    <X className="h-4 w-4" /> Recusar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
