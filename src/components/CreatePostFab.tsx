import { Button } from '@/components/ui/button'
import { Plus, Image, Type, Video, FileText, X } from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer'
import { useState } from 'react'

export function CreatePostFab() {
  const [isOpen, setIsOpen] = useState(false)

  const options = [
    {
      label: 'Texto',
      icon: Type,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10 dark:bg-blue-500/20',
    },
    {
      label: 'Foto',
      icon: Image,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10 dark:bg-purple-500/20',
    },
    {
      label: 'Vídeo',
      icon: Video,
      color: 'text-red-500',
      bg: 'bg-red-500/10 dark:bg-red-500/20',
    },
    {
      label: 'Artigo',
      icon: FileText,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10 dark:bg-orange-500/20',
    },
  ]

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg z-40 bg-primary hover:bg-primary/90 animate-fade-in"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="pb-8">
          <DrawerHeader className="relative">
            <DrawerTitle className="text-center text-xl font-bold">
              Criar Publicação
            </DrawerTitle>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
              >
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <div className="grid grid-cols-4 gap-4 px-6 py-8">
            {options.map((opt) => (
              <div
                key={opt.label}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div
                  className={`h-16 w-16 rounded-2xl flex items-center justify-center ${opt.bg} transition-transform group-hover:scale-110`}
                >
                  <opt.icon className={`h-8 w-8 ${opt.color}`} />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {opt.label}
                </span>
              </div>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
