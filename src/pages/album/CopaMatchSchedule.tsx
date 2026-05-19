import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, MapPin, Tv } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const SCHEDULE_DATA = [
  {
    id: 'm1',
    date: '11 Jun 2026',
    time: '15:00',
    group: 'Abertura - Grupo A',
    team1: {
      name: 'México',
      flag: 'https://img.usecurling.com/p/100/100?q=mexico%20flag',
    },
    team2: {
      name: 'Catar',
      flag: 'https://img.usecurling.com/p/100/100?q=qatar%20flag',
    },
    stadium: 'Estádio Azteca, Cidade do México',
    broadcasters: ['TV Globo', 'SporTV', 'CazéTV'],
  },
  {
    id: 'm2',
    date: '12 Jun 2026',
    time: '16:00',
    group: 'Grupo B',
    team1: {
      name: 'EUA',
      flag: 'https://img.usecurling.com/p/100/100?q=usa%20flag',
    },
    team2: {
      name: 'País de Gales',
      flag: 'https://img.usecurling.com/p/100/100?q=wales%20flag',
    },
    stadium: 'SoFi Stadium, Los Angeles',
    broadcasters: ['SporTV', 'Globoplay'],
  },
  {
    id: 'm3',
    date: '15 Jun 2026',
    time: '13:00',
    group: 'Grupo G',
    team1: {
      name: 'Brasil',
      flag: 'https://img.usecurling.com/p/100/100?q=brazil%20flag',
    },
    team2: {
      name: 'Sérvia',
      flag: 'https://img.usecurling.com/p/100/100?q=serbia%20flag',
    },
    stadium: 'MetLife Stadium, Nova York',
    broadcasters: ['TV Globo', 'SporTV', 'CazéTV', 'Globoplay'],
  },
  {
    id: 'm4',
    date: '16 Jun 2026',
    time: '16:00',
    group: 'Grupo C',
    team1: {
      name: 'Argentina',
      flag: 'https://img.usecurling.com/p/100/100?q=argentina%20flag',
    },
    team2: {
      name: 'Arábia Saudita',
      flag: 'https://img.usecurling.com/p/100/100?q=saudi%20arabia%20flag',
    },
    stadium: 'AT&T Stadium, Dallas',
    broadcasters: ['SporTV', 'CazéTV'],
  },
  {
    id: 'm5',
    date: '18 Jun 2026',
    time: '16:00',
    group: 'Grupo D',
    team1: {
      name: 'França',
      flag: 'https://img.usecurling.com/p/100/100?q=france%20flag',
    },
    team2: {
      name: 'Dinamarca',
      flag: 'https://img.usecurling.com/p/100/100?q=denmark%20flag',
    },
    stadium: 'Hard Rock Stadium, Miami',
    broadcasters: ['SporTV'],
  },
  {
    id: 'm6',
    date: '19 Jun 2026',
    time: '13:00',
    group: 'Grupo B',
    team1: {
      name: 'Inglaterra',
      flag: 'https://img.usecurling.com/p/100/100?q=england%20flag',
    },
    team2: {
      name: 'EUA',
      flag: 'https://img.usecurling.com/p/100/100?q=usa%20flag',
    },
    stadium: 'Mercedes-Benz Stadium, Atlanta',
    broadcasters: ['TV Globo', 'SporTV', 'Globoplay'],
  },
  {
    id: 'm7',
    date: '20 Jun 2026',
    time: '15:00',
    group: 'Grupo E',
    team1: {
      name: 'Espanha',
      flag: 'https://img.usecurling.com/p/100/100?q=spain%20flag',
    },
    team2: {
      name: 'Alemanha',
      flag: 'https://img.usecurling.com/p/100/100?q=germany%20flag',
    },
    stadium: "Levi's Stadium, San Francisco",
    broadcasters: ['SporTV', 'CazéTV'],
  },
  {
    id: 'm8',
    date: '22 Jun 2026',
    time: '13:00',
    group: 'Grupo G',
    team1: {
      name: 'Brasil',
      flag: 'https://img.usecurling.com/p/100/100?q=brazil%20flag',
    },
    team2: {
      name: 'Suíça',
      flag: 'https://img.usecurling.com/p/100/100?q=switzerland%20flag',
    },
    stadium: 'SoFi Stadium, Los Angeles',
    broadcasters: ['TV Globo', 'SporTV', 'CazéTV', 'Globoplay'],
  },
]

export default function CopaMatchSchedule() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-32 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-[hsl(var(--gold)/0.1)] rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/30 shadow-sm">
        <div className="flex items-center justify-between p-4 px-4 pt-safe-top">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full shrink-0 hover:bg-secondary/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-primary to-[hsl(var(--gold))]">
              Tabela de Jogos
            </h1>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
              Copa do Mundo 2026
            </span>
          </div>
          <div className="w-10 shrink-0" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Card className="border-border/30 bg-secondary/10 backdrop-blur-md overflow-hidden shadow-xl rounded-2xl">
          <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden">
            <Table className="w-full min-w-[700px]">
              <TableHeader className="bg-secondary/40 backdrop-blur-sm border-b border-border/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[120px] text-xs uppercase font-black text-muted-foreground tracking-wider py-4">
                    Data / Hora
                  </TableHead>
                  <TableHead className="w-[250px] text-xs uppercase font-black text-muted-foreground tracking-wider py-4 text-center">
                    Confronto
                  </TableHead>
                  <TableHead className="w-[150px] text-xs uppercase font-black text-muted-foreground tracking-wider py-4">
                    Grupo / Fase
                  </TableHead>
                  <TableHead className="w-[180px] text-xs uppercase font-black text-muted-foreground tracking-wider py-4">
                    Local
                  </TableHead>
                  <TableHead className="w-[180px] text-xs uppercase font-black text-muted-foreground tracking-wider py-4">
                    Onde Assistir
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SCHEDULE_DATA.map((match) => (
                  <TableRow
                    key={match.id}
                    className="border-border/20 hover:bg-secondary/30 transition-colors group"
                  >
                    <TableCell className="py-4 align-top">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5 font-bold text-sm">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          {match.date}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          {match.time}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="py-4">
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex items-center gap-3 w-[110px] justify-end">
                          <span className="text-sm font-bold truncate">
                            {match.team1.name}
                          </span>
                          <img
                            src={match.team1.flag}
                            alt={match.team1.name}
                            className="w-7 h-7 rounded-full object-cover border-[1.5px] border-border/50 shadow-sm"
                          />
                        </div>
                        <span className="text-xs font-black text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full">
                          X
                        </span>
                        <div className="flex items-center gap-3 w-[110px] justify-start">
                          <img
                            src={match.team2.flag}
                            alt={match.team2.name}
                            className="w-7 h-7 rounded-full object-cover border-[1.5px] border-border/50 shadow-sm"
                          />
                          <span className="text-sm font-bold truncate">
                            {match.team2.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="py-4 align-top">
                      <Badge
                        variant="outline"
                        className="text-[10px] font-bold uppercase tracking-widest bg-background/50"
                      >
                        {match.group}
                      </Badge>
                    </TableCell>

                    <TableCell className="py-4 align-top">
                      <div className="flex items-start gap-1.5 text-xs text-muted-foreground font-medium leading-tight max-w-[160px]">
                        <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary/70" />
                        <span>{match.stadium}</span>
                      </div>
                    </TableCell>

                    <TableCell className="py-4 align-top">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          <Tv className="w-3.5 h-3.5" /> Transmissão
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {match.broadcasters.map((broadcaster) => (
                            <Badge
                              key={broadcaster}
                              variant="secondary"
                              className="text-[9px] px-2 py-0.5 font-bold tracking-wider bg-background/60 border-border/40 hover:bg-primary/20 transition-colors"
                            >
                              {broadcaster}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  )
}
