import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Trophy,
  Zap,
  Activity,
  Calendar,
  Brain,
  History,
  TrendingUp,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockTimelineEvents, mockStatsHistory, TimelineEvent } from '@/lib/data'
import { StatsHistoryChart } from '@/components/StatsHistoryChart'
import { cn } from '@/lib/utils'

export default function EvolutionTimeline() {
  const navigate = useNavigate()

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'match':
        return <Trophy className="h-5 w-5 text-green-500" />
      case 'training':
        return <Zap className="h-5 w-5 text-orange-500" />
      case 'ai_insight':
        return <Brain className="h-5 w-5 text-purple-500" />
      case 'achievement':
        return <Trophy className="h-5 w-5 text-gold" />
      case 'milestone':
        return <History className="h-5 w-5 text-blue-500" />
      default:
        return <Activity className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getEventColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'match':
        return 'border-green-500/20 bg-green-500/5'
      case 'training':
        return 'border-orange-500/20 bg-orange-500/5'
      case 'ai_insight':
        return 'border-purple-500/20 bg-purple-500/5'
      case 'achievement':
        return 'border-gold/30 bg-gold/5'
      case 'milestone':
        return 'border-blue-500/20 bg-blue-500/5'
      default:
        return 'border-border bg-card'
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-20 p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              Linha do Tempo
              <History className="h-4 w-4 text-primary" />
            </h1>
            <p className="text-xs text-muted-foreground">
              Sua jornada esportiva
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        {/* Progress Chart */}
        <Card className="bg-secondary/20 border-border/50 shadow-sm overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-4 w-4" /> Evolução de Rating
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[200px] w-full px-2 pb-2">
              <StatsHistoryChart data={mockStatsHistory} />
            </div>
          </CardContent>
        </Card>

        {/* Timeline Container */}
        <div className="relative pl-6 space-y-8 before:absolute before:inset-y-0 before:left-2 before:w-[2px] before:bg-gradient-to-b before:from-primary/50 before:via-border before:to-transparent">
          {mockTimelineEvents.map((event, index) => (
            <div
              key={event.id}
              className="relative animate-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[25px] top-4 h-4 w-4 rounded-full bg-background border-2 border-primary ring-4 ring-background flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              </div>

              {/* Date Header */}
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="text-[10px] font-normal h-5 border-border bg-background/50 backdrop-blur-sm"
                >
                  <Calendar className="h-3 w-3 mr-1 opacity-70" />
                  {event.fullDate}
                </Badge>
                {event.type === 'achievement' && (
                  <Badge
                    variant="default"
                    className="text-[10px] bg-gold text-black hover:bg-gold/90 h-5 border-0"
                  >
                    Conquista
                  </Badge>
                )}
                {event.type === 'milestone' && (
                  <Badge variant="secondary" className="text-[10px] h-5">
                    Marco Histórico
                  </Badge>
                )}
              </div>

              {/* Event Card */}
              <Card
                className={cn(
                  'overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/30 group',
                  getEventColor(event.type),
                )}
              >
                <div className="flex">
                  {/* Left Accent Bar */}
                  <div
                    className={cn(
                      'w-1 shrink-0',
                      event.type === 'match' && 'bg-green-500',
                      event.type === 'training' && 'bg-orange-500',
                      event.type === 'ai_insight' && 'bg-purple-500',
                      event.type === 'achievement' && 'bg-gold',
                      event.type === 'milestone' && 'bg-blue-500',
                    )}
                  />

                  <CardContent className="p-4 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 rounded-full bg-background shadow-sm shrink-0">
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base leading-tight group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          {event.description}
                        </p>

                        {/* Stats Grid */}
                        {event.stats && (
                          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/10">
                            {event.stats.map((stat, i) => (
                              <div
                                key={i}
                                className="flex flex-col px-2 py-1 rounded bg-background/50 border border-border/10"
                              >
                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                                  {stat.label}
                                </span>
                                <span className="text-xs font-bold font-mono">
                                  {stat.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Optional Image */}
                    {event.image && (
                      <div className="mt-4 rounded-lg overflow-hidden relative aspect-video shadow-sm">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>
                    )}
                  </CardContent>
                </div>
              </Card>
            </div>
          ))}

          {/* Start Point */}
          <div className="relative pt-8 pb-4">
            <div className="absolute -left-[25px] top-10 h-4 w-4 rounded-full bg-muted border-2 border-muted-foreground flex items-center justify-center"></div>
            <div className="text-sm text-muted-foreground italic ml-1">
              Início da jornada no Goplay
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
