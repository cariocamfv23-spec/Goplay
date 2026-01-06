import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Play,
  Download,
  Share2,
  Zap,
  Target,
  Activity,
  Eye,
  Video,
  Award,
} from 'lucide-react'
import { mockCurrentUser } from '@/lib/data'

export function StrategicVisualPassport() {
  const user = mockCurrentUser

  const highlights = [
    {
      id: 1,
      title: `Season 2025 - ${user.name} Highlights`,
      duration: '03:45',
      type: 'Full Reel',
      thumbnail:
        'https://img.usecurling.com/p/800/450?q=soccer%20goal%20celebration&color=blue',
      views: 1250,
      tags: ['Goals', 'Assists', 'Skills', 'Playmaking'],
    },
  ]

  const smartCuts = [
    {
      id: 2,
      title: 'Análise de Velocidade',
      duration: '00:45',
      thumbnail:
        'https://img.usecurling.com/p/400/225?q=sprinter%20running&color=red',
      aiScore: 92,
      metric: '34.5 km/h Top Speed',
      type: 'Physical',
    },
    {
      id: 3,
      title: 'Inteligência Tática',
      duration: '01:12',
      thumbnail:
        'https://img.usecurling.com/p/400/225?q=soccer%20tactics%20board&color=green',
      aiScore: 88,
      metric: '95% Positioning',
      type: 'Tactical',
    },
    {
      id: 4,
      title: 'Finalizações Precisas',
      duration: '00:58',
      thumbnail:
        'https://img.usecurling.com/p/400/225?q=soccer%20kick%20ball&color=orange',
      aiScore: 90,
      metric: '8/10 on Target',
      type: 'Technical',
    },
    {
      id: 5,
      title: 'Duelos Defensivos',
      duration: '01:05',
      thumbnail:
        'https://img.usecurling.com/p/400/225?q=soccer%20tackle&color=black',
      aiScore: 85,
      metric: '70% Won Duels',
      type: 'Defensive',
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in pb-4">
      {/* Header Section */}
      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            Material Visual
          </h3>
          <Badge
            variant="secondary"
            className="bg-gold/10 text-gold border-gold/20 gap-1"
          >
            <Zap className="h-3 w-3" /> AI Powered
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Curadoria inteligente dos seus melhores momentos para scouts e clubes.
        </p>
      </div>

      {/* Main Feature Highlight */}
      {highlights.map((video) => (
        <Card
          key={video.id}
          className="overflow-hidden border-none shadow-lg group cursor-pointer relative bg-zinc-950"
        >
          <div className="relative aspect-video w-full overflow-hidden">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform ring-1 ring-white/20">
                <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/50">
                  <Play className="h-5 w-5 fill-current ml-1" />
                </div>
              </div>
            </div>
            {/* Duration Badge */}
            <div className="absolute bottom-3 right-3 z-20 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs text-white font-mono border border-white/10">
              {video.duration}
            </div>
            {/* AI Watermark */}
            <div className="absolute top-3 left-3 z-20">
              <Badge className="bg-primary/90 hover:bg-primary text-white border-none shadow-lg backdrop-blur-sm">
                Official Scouting Reel
              </Badge>
            </div>
          </div>
          <CardContent className="p-4 bg-card relative z-30">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-1">
                <h4 className="font-bold text-base line-clamp-1">
                  {video.title}
                </h4>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <Eye className="h-3 w-3" /> {video.views} visualizações
                  profissionais
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-8 gap-2 bg-background/50"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:inline-block">
                  Enviar
                </span>
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {video.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-[10px] bg-secondary/50 hover:bg-secondary font-normal"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Smart Cuts Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h4 className="font-bold text-sm flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" /> Smart Cuts (IA)
          </h4>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
            Technical Focus
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {smartCuts.map((cut) => (
            <Card
              key={cut.id}
              className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow group cursor-pointer bg-zinc-900"
            >
              <div className="relative aspect-[16/9] bg-muted overflow-hidden">
                <img
                  src={cut.thumbnail}
                  alt={cut.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                {/* AI Score Badge */}
                <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm ring-1 ring-white/10">
                  <Activity className="h-3 w-3" /> {cut.aiScore}
                </div>

                {/* Metrics Overlay */}
                <div className="absolute bottom-2 left-2 right-2 space-y-0.5">
                  <div className="flex items-center gap-1">
                    <Award className="h-3 w-3 text-gold" />
                    <span className="text-[9px] text-white/90 uppercase tracking-wider font-semibold">
                      {cut.type}
                    </span>
                  </div>
                  <div className="text-white font-bold text-xs leading-tight line-clamp-1">
                    {cut.metric}
                  </div>
                </div>

                {/* Hover Play */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[1px]">
                  <Play className="h-8 w-8 text-white fill-white drop-shadow-lg" />
                </div>
              </div>
              <CardContent className="p-3 bg-card">
                <h5 className="font-semibold text-xs mb-1 line-clamp-1">
                  {cut.title}
                </h5>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Video className="h-3 w-3" /> {cut.duration}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-border/50 grid grid-cols-2 gap-3">
        <Button variant="outline" className="w-full h-10 border-dashed">
          <Download className="mr-2 h-4 w-4" />
          Baixar Reels
        </Button>
        <Button className="w-full h-10 bg-gold text-black hover:bg-gold/90 border-gold shadow-gold/20 shadow-lg">
          <Zap className="mr-2 h-4 w-4" />
          Gerar Novo
        </Button>
      </div>
    </div>
  )
}
