import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import {
  Copy,
  Share2,
  MessageCircle,
  Twitter,
  Facebook,
  Instagram,
  Check,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  url?: string
  preview?: React.ReactNode
}

export function ShareDialog({
  open,
  onOpenChange,
  title,
  description,
  url = window.location.href,
  preview,
}: ShareDialogProps) {
  const [copied, setCopied] = useState(false)

  const shareData = {
    title,
    text: description,
    url,
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData)
        toast.success('Compartilhado com sucesso!')
        onOpenChange(false)
      } catch (err) {
        console.error('Error sharing', err)
      }
    } else {
      handleCopy()
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`${title}\n${description}\n${url}`)
    setCopied(true)
    toast.success('Link copiado para a área de transferência')
    setTimeout(() => {
      setCopied(false)
      onOpenChange(false)
    }, 1500)
  }

  const handleSocialShare = (platform: string) => {
    let shareUrl = ''
    const text = encodeURIComponent(`${title}\n${description}`)
    const link = encodeURIComponent(url)

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${link}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${link}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${link}`
        break
      case 'instagram':
        toast.info('Abrindo Instagram...')
        // Instagram web sharing is limited, usually directs to app or homepage
        shareUrl = 'https://instagram.com'
        break
      default:
        return
    }

    window.open(shareUrl, '_blank')
    onOpenChange(false)
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">Compartilhar</DrawerTitle>
          <DrawerDescription className="text-center">
            Mostre sua evolução para o mundo
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4 space-y-6">
          {/* Preview Card */}
          {preview ? (
            preview
          ) : (
            <div className="bg-secondary/30 p-4 rounded-xl border border-border/50">
              <h4 className="font-bold text-sm mb-1">{title}</h4>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {description}
              </p>
            </div>
          )}

          {/* Share Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
            <button
              onClick={() => handleSocialShare('whatsapp')}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 group-hover:bg-green-500/20 transition-colors">
                <MessageCircle className="h-6 w-6" />
              </div>
              <span className="text-xs text-muted-foreground">WhatsApp</span>
            </button>

            <button
              onClick={() => handleSocialShare('instagram')}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="h-12 w-12 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-600 group-hover:bg-pink-500/20 transition-colors">
                <Instagram className="h-6 w-6" />
              </div>
              <span className="text-xs text-muted-foreground">Instagram</span>
            </button>

            <button
              onClick={() => handleSocialShare('twitter')}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="h-12 w-12 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-foreground group-hover:bg-black/10 dark:group-hover:bg-white/20 transition-colors">
                <Twitter className="h-6 w-6" />
              </div>
              <span className="text-xs text-muted-foreground">X / Twitter</span>
            </button>

            <button
              onClick={() => handleSocialShare('facebook')}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="h-12 w-12 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 group-hover:bg-blue-600/20 transition-colors">
                <Facebook className="h-6 w-6" />
              </div>
              <span className="text-xs text-muted-foreground">Facebook</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-foreground group-hover:bg-secondary/80 transition-colors">
                {copied ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <Copy className="h-6 w-6" />
                )}
              </div>
              <span className="text-xs text-muted-foreground">Copiar</span>
            </button>
          </div>

          <Button
            className="w-full h-12 rounded-xl gap-2 font-bold"
            onClick={handleNativeShare}
          >
            <Share2 className="h-5 w-5" />
            Compartilhar via...
          </Button>
        </div>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full rounded-xl">
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
