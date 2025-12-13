import { Button } from '@/components/ui/button'
import { ArrowLeft, Wand2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function VarzeaEditor() {
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
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Wand2 className="h-6 w-6 text-gold" /> Editor Várzea AI
      </h1>
      <p className="text-muted-foreground">
        Ferramenta de edição de highlights com narração automática.
      </p>
    </div>
  )
}
