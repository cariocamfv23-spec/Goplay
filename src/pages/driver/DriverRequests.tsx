import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function DriverRequests() {
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
      <h1 className="text-2xl font-bold mb-4">Solicitações de Corrida</h1>
      <p className="text-muted-foreground">Em breve.</p>
    </div>
  )
}
