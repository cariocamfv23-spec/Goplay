import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Link,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  MoreHorizontal,
  Check,
} from 'lucide-react'
import { useState } from 'react'

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  videoTitle?: string
}

export function ShareDialog({ open, onOpenChange }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOptions = [
    { icon: MessageCircle, label: 'WhatsApp', color: 'bg-green-500' },
    { icon: Instagram, label: 'Instagram', color: 'bg-pink-500' },
    { icon: Facebook, label: 'Facebook', color: 'bg-blue-600' },
    { icon: Twitter, label: 'Twitter', color: 'bg-sky-500' },
    { icon: Mail, label: 'Email', color: 'bg-gray-500' },
    { icon: MoreHorizontal, label: 'Outros', color: 'bg-zinc-700' },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-950 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Compartilhar para</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-4 py-4">
          {shareOptions.map((option) => (
            <button
              key={option.label}
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
          <p className="text-sm font-medium text-zinc-400 mb-2">
            Link do vídeo
          </p>
          <div className="flex gap-2">
            <div className="flex-1 bg-zinc-900 rounded-md px-3 py-2 text-sm text-zinc-300 truncate border border-zinc-800">
              https://goplay.app/v/{Math.random().toString(36).substr(2, 9)}
            </div>
            <Button
              onClick={handleCopy}
              className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
            >
              {copied ? (
                <Check className="w-4 h-4 mr-1" />
              ) : (
                <Link className="w-4 h-4 mr-1" />
              )}
              {copied ? 'Copiado' : 'Copiar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
