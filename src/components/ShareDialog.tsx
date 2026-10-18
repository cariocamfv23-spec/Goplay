import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Link as LinkIcon,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  MoreHorizontal,
  Check,
} from 'lucide-react'
import { useState, ReactNode } from 'react'
import { useToast } from '@/hooks/use-toast'

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  url?: string
  preview?: ReactNode
  onShareAction?: (platform?: string) => void
  videoTitle?: string
}

export function ShareDialog({
  open,
  onOpenChange,
  title = 'Compartilhar',
  description,
  url,
  preview,
  onShareAction,
  videoTitle,
}: ShareDialogProps) {
  const resolvedUrl =
    url || (typeof window !== 'undefined' ? window.location.href : '')
  const displayTitle = videoTitle ? `Compartilhar: ${videoTitle}` : title
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleCopy = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(resolvedUrl)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: 'Link copiado!',
      description: 'O link foi copiado para a área de transferência.',
    })
    if (onShareAction) {
      onShareAction('copy_link')
    }
  }

  const handleShare = async (platform: string) => {
    let shared = false
    const fullText = description ? `${description} ${resolvedUrl}` : resolvedUrl

    try {
      if (platform === 'WhatsApp') {
        // WhatsApp Web / Mobile direct deep link
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullText)}`
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
        shared = true
      } else if (platform === 'Facebook') {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(resolvedUrl)}`,
          '_blank',
        )
        shared = true
      } else if (platform === 'Twitter') {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(description || title)}&url=${encodeURIComponent(resolvedUrl)}`,
          '_blank',
        )
        shared = true
      } else if (platform === 'Email') {
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(fullText)}`
        shared = true
      } else if (platform === 'Outros') {
        if (navigator?.share) {
          await navigator.share({ title, text: description, url: resolvedUrl })
          shared = true
        } else {
          // Fallback to copy link
          handleCopy()
          return
        }
      } else if (platform === 'Instagram') {
        if (navigator?.clipboard?.writeText) {
          navigator.clipboard.writeText(fullText)
        }
        toast({
          title: 'Link copiado!',
          description:
            'O Instagram não permite links diretos. Cole no app para compartilhar.',
        })
        shared = true
      }
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        console.error(err)
      }
    }

    if (shared && onShareAction) {
      onShareAction(platform)
    }
  }

  const shareOptions = [
    {
      id: 'WhatsApp',
      icon: MessageCircle,
      label: 'WhatsApp',
      color: 'bg-[#25D366]',
    },
    {
      id: 'Instagram',
      icon: Instagram,
      label: 'Instagram',
      color: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
    },
    {
      id: 'Facebook',
      icon: Facebook,
      label: 'Facebook',
      color: 'bg-[#1877F2]',
    },
    { id: 'Twitter', icon: Twitter, label: 'Twitter', color: 'bg-[#1DA1F2]' },
    { id: 'Email', icon: Mail, label: 'Email', color: 'bg-zinc-600' },
    {
      id: 'Outros',
      icon: MoreHorizontal,
      label: 'Outros',
      color: 'bg-zinc-800',
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-950 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-zinc-400">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {preview && <div className="py-2">{preview}</div>}

        <div className="grid grid-cols-4 gap-4 py-4">
          {shareOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleShare(option.id)}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className={`${option.color} p-3 rounded-full text-white transition-transform group-hover:scale-110 shadow-lg`}
              >
                <option.icon className="w-6 h-6" />
              </div>
              <span className="text-xs text-zinc-400 group-hover:text-white transition-colors">
                {option.label}
              </span>
            </button>
          ))}
        </div>

        <div className="border-t border-zinc-800 pt-4">
          <p className="text-sm font-medium text-zinc-400 mb-2">Link</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-zinc-900 rounded-md px-3 py-2 text-sm text-zinc-300 truncate border border-zinc-800 font-mono text-xs">
              {resolvedUrl}
            </div>
            <Button
              onClick={handleCopy}
              className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
            >
              {copied ? (
                <Check className="w-4 h-4 mr-1" />
              ) : (
                <LinkIcon className="w-4 h-4 mr-1" />
              )}
              {copied ? 'Copiado' : 'Copiar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
