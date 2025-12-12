import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockRankings } from '@/lib/data'
import { ArrowLeft, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Ranking() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="p-4 border-b flex items-center gap-4 bg-background sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold">Ranking de Atletas</h1>
      </div>

      <div className="p-4">
        <Tabs defaultValue="football" className="w-full mb-6">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="football">Futebol</TabsTrigger>
            <TabsTrigger value="volleyball">Vôlei</TabsTrigger>
            <TabsTrigger value="basketball">Basquete</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Top 3 Podium */}
        <div className="flex justify-center items-end gap-4 mb-8 pt-4">
          {/* 2nd Place */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-slate-300">
                <AvatarImage src={mockRankings[1].avatar} />
                <AvatarFallback>{mockRankings[1].name[0]}</AvatarFallback>
              </Avatar>
              <Badge className="absolute -bottom-2 inset-x-0 mx-auto w-6 h-6 rounded-full bg-slate-300 text-slate-800 flex items-center justify-center p-0 border-2 border-background">
                2
              </Badge>
            </div>
            <div className="text-center">
              <span className="block font-bold text-sm truncate max-w-[80px]">
                {mockRankings[1].name.split(' ')[0]}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                {mockRankings[1].points} pts
              </span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center gap-2 -mt-6">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-gold">
                <AvatarImage src={mockRankings[0].avatar} />
                <AvatarFallback>{mockRankings[0].name[0]}</AvatarFallback>
              </Avatar>
              <div className="absolute -top-6 text-gold">
                <Trophy className="h-8 w-8 fill-current" />
              </div>
              <Badge className="absolute -bottom-3 inset-x-0 mx-auto w-7 h-7 rounded-full bg-gold text-white flex items-center justify-center p-0 border-2 border-background">
                1
              </Badge>
            </div>
            <div className="text-center">
              <span className="block font-bold text-base truncate max-w-[100px]">
                {mockRankings[0].name.split(' ')[0]}
              </span>
              <span className="text-sm font-bold text-primary">
                {mockRankings[0].points} pts
              </span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-orange-300">
                <AvatarImage src={mockRankings[2].avatar} />
                <AvatarFallback>{mockRankings[2].name[0]}</AvatarFallback>
              </Avatar>
              <Badge className="absolute -bottom-2 inset-x-0 mx-auto w-6 h-6 rounded-full bg-orange-300 text-orange-800 flex items-center justify-center p-0 border-2 border-background">
                3
              </Badge>
            </div>
            <div className="text-center">
              <span className="block font-bold text-sm truncate max-w-[80px]">
                {mockRankings[2].name.split(' ')[0]}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                {mockRankings[2].points} pts
              </span>
            </div>
          </div>
        </div>

        {/* List of others */}
        <div className="space-y-3 bg-card rounded-xl p-2">
          {mockRankings.slice(3).map((user, index) => (
            <div
              key={user.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50"
            >
              <span className="text-muted-foreground font-bold w-6 text-center">
                {index + 4}
              </span>
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{user.name}</h4>
              </div>
              <span className="font-bold text-sm">{user.points} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
