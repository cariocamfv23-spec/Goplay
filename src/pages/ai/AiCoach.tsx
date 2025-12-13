import { Button } from '@/components/ui/button'
import { ArrowLeft, MessageSquare, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function AiCoach() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-background p-4 animate-fade-in">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <div className="text-center mb-8">
        <div className="h-20 w-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Zap className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Goplay AI Coach</h1>
        <p className="text-muted-foreground">
          Seu assistente virtual de performance.
        </p>
      </div>

      <div className="space-y-4">
        <Card className="bg-secondary/30 border-none">
          <CardContent className="p-4 flex gap-3">
            <Avatar>
              <AvatarImage src="https://img.usecurling.com/i?q=robot&shape=circle" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm">
                Olá, Alex! Analisei seus últimos jogos. Você melhorou 15% na
                velocidade, mas precisamos focar na precisão dos passes.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border/50">
        <Button className="w-full h-12 rounded-full font-bold">
          <MessageSquare className="mr-2 h-5 w-5" /> Iniciar Chat
        </Button>
      </div>
    </div>
  )
}
