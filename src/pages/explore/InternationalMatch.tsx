import { Button } from '@/components/ui/button'
import { ArrowLeft, Globe, MessageCircle, Swords } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockInternationalMatches } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function InternationalMatch() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4 flex items-center gap-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="font-bold text-xl flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-500" /> Match Internacional
        </h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-sm text-blue-700 dark:text-blue-300">
          Conecte-se com atletas ao redor do mundo para desafios amistosos e
          intercâmbio cultural.
        </div>

        <div className="grid gap-4">
          {mockInternationalMatches.map((match) => (
            <Card key={match.id} className="overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-blue-900 to-indigo-900 relative">
                <div className="absolute top-2 right-2">
                  <img
                    src={match.flag}
                    alt={match.country}
                    className="w-8 h-6 object-cover rounded shadow-md border border-white/20"
                  />
                </div>
              </div>
              <CardContent className="pt-0 relative">
                <div className="flex justify-between items-end -mt-10 mb-4">
                  <Avatar className="h-20 w-20 border-4 border-background">
                    <AvatarImage src={match.avatar} />
                    <AvatarFallback>{match.opponentName[0]}</AvatarFallback>
                  </Avatar>
                  <Badge className="mb-2 bg-gold text-black hover:bg-gold/90">
                    {match.level}
                  </Badge>
                </div>

                <div className="mb-4">
                  <h3 className="font-bold text-lg">{match.opponentName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {match.country}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 gap-2">
                    <Swords className="h-4 w-4" /> Desafiar
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <MessageCircle className="h-4 w-4" /> Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
