import { AlertTriangle, Home, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  message?: string
  onRetry?: () => void
  retryLabel?: string
  showHomeButton?: boolean
  backPath?: string
}

export function ErrorState({
  className,
  title = 'Algo deu errado',
  message = 'Não foi possível carregar as informações. Por favor, tente novamente ou verifique sua conexão.',
  onRetry,
  retryLabel = 'Tentar novamente',
  showHomeButton = true,
  backPath = '/home',
  ...props
}: ErrorStateProps) {
  const navigate = useNavigate()

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center min-h-[50vh] p-6 text-center animate-fade-in',
        className,
      )}
      {...props}
    >
      <div className="h-16 w-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>

      <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground mb-8 max-w-xs mx-auto leading-relaxed">
        {message}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        {onRetry && (
          <Button onClick={onRetry} className="w-full gap-2">
            <RefreshCcw className="h-4 w-4" />
            {retryLabel}
          </Button>
        )}

        {showHomeButton && (
          <Button
            variant="outline"
            onClick={() => navigate(backPath)}
            className="w-full gap-2"
          >
            <Home className="h-4 w-4" />
            Voltar para o Início
          </Button>
        )}
      </div>
    </div>
  )
}
