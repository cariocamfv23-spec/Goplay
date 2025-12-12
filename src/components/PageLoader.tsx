import { Play } from 'lucide-react'

export const PageLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background animate-fade-in">
      <div className="relative">
        <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center animate-pulse">
          <Play className="w-8 h-8 text-primary fill-primary ml-1" />
        </div>
        <div className="absolute -inset-4 bg-primary/5 rounded-full blur-xl animate-pulse delay-75" />
      </div>
      <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">
        Carregando...
      </p>
    </div>
  )
}
