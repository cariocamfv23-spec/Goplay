import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Globe2, Swords, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockInternationalMatches } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export default function InternationalMatch() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="bg-blue-900 text-white pb-8 rounded-b-3xl">
        <div className="p-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Globe2 className="h-5 w-5" /> Match Internacional
          </h1>
        </div>
        <div className="px-6 py-4 text-center">
          <h2 className="text-2xl font-bold mb-2">Desafie o Mundo</h2>
          <p className="text-white/80 text-sm">
            Conecte-se com atletas de outros países e suba no ranking global.
          </p>
        </div>
      </div>

      <div className="p-4 -mt-6 space-y-4">
        {mockInternationalMatches.map((match) => (
          <Card
            key={match.id}
            className="border-none shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2" />
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-14 w-14 border-2 border-green-500">
                    <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1" />
                    <AvatarFallback>BR</AvatarFallback>
                  </Avatar>
                  <span className="font-bold text-sm">Você</span>
                  <Badge variant="secondary" className="text-[10px]">
                    🇧🇷 BRA
                  </Badge>
                </div>

                <div className="flex flex-col items-center">
                  <Swords className="h-8 w-8 text-muted-foreground animate-pulse" />
                  <span className="text-xs font-bold text-muted-foreground mt-1 uppercase">
                    Versus
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-14 w-14 border-2 border-blue-500">
                    <AvatarImage src={match.avatar} />
                    <AvatarFallback>{match.country[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-bold text-sm truncate max-w-[80px]">
                    {match.opponentName.split(' ')[0]}
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    <img src={match.flag} className="h-2 w-3 mr-1" alt="" />
                    {match.country.substring(0, 3).toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button className="w-full rounded-full font-bold">
                  Desafiar Agora
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Valendo Troféu Internacional{' '}
                  <Trophy className="h-3 w-3 inline text-gold" />
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
