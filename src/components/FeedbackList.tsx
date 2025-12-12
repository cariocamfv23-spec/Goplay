import { mockFeedbacks } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Star, MessageSquarePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function FeedbackList() {
  const handleRequestFeedback = () => {
    toast.success('Solicitação enviada!', {
      description: 'Seus treinadores e amigos foram notificados.',
    })
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-lg">Feedback Recente</h3>
        <Button
          size="sm"
          variant="outline"
          className="h-8 gap-1"
          onClick={handleRequestFeedback}
        >
          <MessageSquarePlus className="h-3 w-3" /> Solicitar
        </Button>
      </div>

      <div className="space-y-4">
        {mockFeedbacks.map((fb) => (
          <Card key={fb.id} className="border-none shadow-sm bg-card">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={fb.author.avatar} />
                    <AvatarFallback>{fb.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{fb.author.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">
                      {fb.author.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center bg-secondary/50 px-2 py-0.5 rounded-full">
                  <Star className="h-3 w-3 text-gold fill-gold mr-1" />
                  <span className="text-xs font-bold">{fb.rating}</span>
                </div>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed mb-2">
                {fb.content}
              </p>
              <div className="flex justify-between items-center text-xs text-muted-foreground border-t border-border/50 pt-2 mt-2">
                <span>{fb.context}</span>
                <span>{fb.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
