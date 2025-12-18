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
import { Check, Palette, Sparkles } from 'lucide-react'
import {
  useRetrospectiveStore,
  retroThemes,
  RetroThemeId,
} from '@/stores/useRetrospectiveStore'
import { cn } from '@/lib/utils'

interface RetrospectiveThemeSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RetrospectiveThemeSelector({
  open,
  onOpenChange,
}: RetrospectiveThemeSelectorProps) {
  const { themeId, setThemeId } = useRetrospectiveStore()

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-2 bg-secondary rounded-full">
              <Palette className="h-5 w-5 text-primary" />
            </div>
          </div>
          <DrawerTitle className="text-center text-xl">
            Personalize sua Retrospectiva
          </DrawerTitle>
          <DrawerDescription className="text-center">
            Escolha o tema que mais combina com seu momento no esporte.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {(Object.keys(retroThemes) as RetroThemeId[]).map((id) => {
              const theme = retroThemes[id]
              const isSelected = themeId === id

              return (
                <div
                  key={id}
                  onClick={() => setThemeId(id)}
                  className={cn(
                    'relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 group',
                    isSelected
                      ? `border-foreground ${theme.ring}`
                      : 'border-transparent hover:border-muted-foreground/30',
                  )}
                >
                  {/* Theme Preview Background */}
                  <div className={cn('h-24 w-full', theme.cardGradient)}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={cn(
                          'px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm text-white',
                        )}
                      >
                        <Sparkles className={cn('h-3 w-3', theme.accentText)} />
                        Preview
                      </div>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="p-3 bg-secondary/30 flex items-center justify-between">
                    <span className="text-sm font-medium">{theme.label}</span>
                    {isSelected && (
                      <div
                        className={cn(
                          'h-5 w-5 rounded-full flex items-center justify-center',
                          theme.accent,
                        )}
                      >
                        <Check className="h-3 w-3 text-black" />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button className="w-full h-12 rounded-xl text-base font-bold">
              Confirmar Estilo
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
