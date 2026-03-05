import { Button } from '@/components/ui/button'
import { Languages, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TranslateButtonProps {
  isTranslated: boolean
  isLoading: boolean
  onClick: (e: React.MouseEvent) => void
  className?: string
}

export function TranslateButton({
  isTranslated,
  isLoading,
  onClick,
  className,
}: TranslateButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={isLoading}
      className={cn(
        'h-auto p-0 mt-1.5 text-xs font-semibold flex items-center gap-1.5 transition-colors active:scale-95',
        className,
      )}
    >
      {isLoading ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <Languages className="h-3 w-3" />
      )}
      {isLoading
        ? 'Traduzindo...'
        : isTranslated
          ? 'Ver original'
          : 'Ver tradução'}
    </Button>
  )
}
