import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface GoogleSignInButtonProps {
  onClick: () => void | Promise<void>
  loading?: boolean
  disabled?: boolean
  className?: string
  text?: string
}

export function GoogleSignInButton({
  onClick,
  loading = false,
  disabled = false,
  className,
  text = "Continuar com Google",
}: GoogleSignInButtonProps) {
  return (
    <Button
      variant="outline"
      type="button"
      className={cn(
        "w-full h-11 gap-3 font-semibold border-border hover:bg-secondary/60 hover:border-primary/40 transition-all text-sm shadow-sm",
        className,
      )}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin text-primary shrink-0" />
      ) : (
        <svg
          className="w-4 h-4 shrink-0"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.04h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.04c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.24v3.13C3.26 21.36 7.33 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.6H1.24C.45 8.22 0 10.05 0 12s.45 3.78 1.24 5.4l4.04-3.13z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.6l4.04 3.13c.95-2.84 3.6-4.98 6.72-4.98z"
          />
        </svg>
      )}
      <span>{text}</span>
    </Button>
  )
}
