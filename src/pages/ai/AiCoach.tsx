import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  MessageSquare,
  Zap,
  Activity,
  PlayCircle,
  Dumbbell,
  ArrowRight,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export default function AiCoach() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background p-4 animate-fade-in flex flex-col">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Goplay AI Coach</h1>
      </div>

      <div className="text-center mb-8 animate-in slide-in-from-top-4 duration-700">
        <div className="h-20 w-20 bg-gradient-to-br from-primary/20 to-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
          <Zap className="h-10 w-10 text-primary" />
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping opacity-20" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Olá, Atleta!</h2>
        <p className="text-muted-foreground">
          Estou pronto para analisar seu desempenho.
        </p>
      </div>

      <div className="space-y-4 flex-1 pb-20">
        {/* Chat Insight Card */}
        <Card className="bg-secondary/30 border-none shadow-sm">
          <CardContent className="p-4 flex gap-3">
            <Avatar className="h-10 w-10 border border-primary/20">
              <AvatarImage src="https://img.usecurling.com/i?q=robot&shape=circle&color=purple" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">Insight Recente</span>
                <span className="text-xs text-muted-foreground">Hoje</span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">
                Analisei seus últimos jogos. Você melhorou{' '}
                <span className="text-green-500 font-bold">15%</span> na
                velocidade, mas precisamos focar na precisão dos passes.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Motion Analysis Call to Action */}
        <Card
          className="overflow-hidden border-primary/20 bg-gradient-to-br from-zinc-900 to-black text-white cursor-pointer group hover:shadow-lg transition-all duration-300"
          onClick={() => navigate('/ai/motion-analysis')}
        >
          <div className="relative p-6">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity className="h-24 w-24" />
            </div>

            <Badge className="mb-3 bg-gold text-black hover:bg-gold/90 border-none">
              Novo Recurso
            </Badge>

            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              Análise de Movimento
              <Zap className="h-4 w-4 text-gold fill-gold animate-pulse" />
            </h3>

            <p className="text-zinc-400 text-sm mb-6 max-w-[80%]">
              Use a câmera para corrigir sua postura e técnica em tempo real com
              nossa IA.
            </p>

            <Button className="w-full bg-white text-black hover:bg-zinc-200 font-bold group-hover:scale-[1.02] transition-transform">
              <PlayCircle className="mr-2 h-5 w-5" /> Iniciar Sessão Rápida
            </Button>
          </div>
        </Card>

        {/* Exercise Library Link */}
        <Card
          className="bg-card border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => navigate('/ai/library')}
        >
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-primary">
                <Dumbbell className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold">Biblioteca de Exercícios</h3>
                <p className="text-xs text-muted-foreground">
                  Explore +50 exercícios guiados por IA
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>

      <div className="mt-auto pt-4 border-t border-border/50">
        <Button
          className="w-full h-12 rounded-full font-bold shadow-md"
          variant="secondary"
        >
          <MessageSquare className="mr-2 h-5 w-5" /> Chat com AI Coach
        </Button>
      </div>
    </div>
  )
}
