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
        'h-auto p-0 mt-1.5 text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 active:scale-95 group',
        className,
      )}
    >
      {isLoading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Languages
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-300',
            isTranslated ? 'scale-105' : 'group-hover:scale-110',
          )}
        />
      )}
      <span className="tracking-wide">
        {isLoading
          ? 'Traduzindo...'
          : isTranslated
            ? 'Ver original'
            : 'Ver tradução'}
      </span>
    </Button>
  )
}
