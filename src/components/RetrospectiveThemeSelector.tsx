import { useState } from 'react'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Check, Palette, Sparkles, Plus, Trash2, RotateCcw } from 'lucide-react'
import {
  useRetrospectiveStore,
  retroThemes,
  RetroThemeId,
  CustomThemeConfig,
} from '@/stores/useRetrospectiveStore'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface RetrospectiveThemeSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RetrospectiveThemeSelector({
  open,
  onOpenChange,
}: RetrospectiveThemeSelectorProps) {
  const {
    themeId,
    setThemeId,
    customThemes,
    addCustomTheme,
    removeCustomTheme,
  } = useRetrospectiveStore()
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets')
  const [isCreating, setIsCreating] = useState(false)

  // Editor State
  const [editorName, setEditorName] = useState('Meu Tema')
  const [colors, setColors] = useState({
    bgStart: '#4c1d95', // violet-900
    bgMid: '#5b21b6', // violet-800
    bgEnd: '#000000', // black
    accent: '#a78bfa', // violet-400
    text: '#ddd6fe', // violet-200
  })

  const handleCreate = () => {
    setIsCreating(true)
    // Initialize with random or default colors
    setColors({
      bgStart: '#4c1d95',
      bgMid: '#5b21b6',
      bgEnd: '#000000',
      accent: '#a78bfa',
      text: '#ddd6fe',
    })
    setEditorName('Tema Personalizado')
  }

  const handleSave = () => {
    if (!editorName.trim()) {
      toast.error('Dê um nome ao seu tema')
      return
    }

    const newTheme: CustomThemeConfig = {
      id: `custom-${Date.now()}`,
      label: editorName,
      colors: colors,
    }

    addCustomTheme(newTheme)
    setIsCreating(false)
    setActiveTab('custom')
    toast.success('Tema criado com sucesso!')
  }

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    removeCustomTheme(id)
    toast.success('Tema removido')
  }

  // Helper to generate preview style for custom themes
  const getCustomPreviewStyle = (c: typeof colors) => ({
    background: `linear-gradient(to right, ${c.bgStart}, ${c.bgMid}, ${c.bgEnd})`,
  })

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-2 bg-secondary rounded-full">
              <Palette className="h-5 w-5 text-primary" />
            </div>
          </div>
          <DrawerTitle className="text-center text-xl">
            {isCreating ? 'Criar Novo Tema' : 'Personalize sua Retrospectiva'}
          </DrawerTitle>
          <DrawerDescription className="text-center">
            {isCreating
              ? 'Escolha as cores perfeitas para o seu estilo'
              : 'Escolha o tema que mais combina com seu momento no esporte.'}
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-6 py-2 overflow-y-auto">
          {!isCreating && (
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as any)}
              className="w-full mb-6"
            >
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="presets">Premium</TabsTrigger>
                <TabsTrigger value="custom">Meus Temas</TabsTrigger>
              </TabsList>

              <TabsContent value="presets" className="mt-4">
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
                        <div className={cn('h-24 w-full', theme.cardGradient)}>
                          <div className="absolute inset-0 bg-black/10" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div
                              className={cn(
                                'px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm text-white',
                              )}
                            >
                              <Sparkles
                                className={cn('h-3 w-3', theme.accentText)}
                              />
                              Preview
                            </div>
                          </div>
                        </div>

                        <div className="p-3 bg-secondary/30 flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {theme.label}
                          </span>
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
              </TabsContent>

              <TabsContent value="custom" className="mt-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div
                    onClick={handleCreate}
                    className="h-full min-h-[140px] flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-primary hover:bg-primary/5 cursor-pointer transition-all"
                  >
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                      <Plus className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Criar Novo</span>
                  </div>

                  {customThemes.map((theme) => {
                    const isSelected = themeId === theme.id
                    return (
                      <div
                        key={theme.id}
                        onClick={() => setThemeId(theme.id)}
                        className={cn(
                          'relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 group',
                          isSelected
                            ? 'border-primary ring-2 ring-primary/20'
                            : 'border-transparent hover:border-muted-foreground/30',
                        )}
                      >
                        <div
                          className="h-24 w-full relative"
                          style={getCustomPreviewStyle(theme.colors)}
                        >
                          <div className="absolute inset-0 bg-black/10" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm text-white">
                              <Sparkles
                                className="h-3 w-3"
                                style={{ color: theme.colors.text }}
                              />
                              Custom
                            </div>
                          </div>
                          <button
                            onClick={(e) => handleDelete(e, theme.id)}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="p-3 bg-secondary/30 flex items-center justify-between">
                          <span className="text-sm font-medium truncate">
                            {theme.label}
                          </span>
                          {isSelected && (
                            <div className="h-5 w-5 rounded-full flex items-center justify-center bg-primary text-white">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          )}

          {isCreating && (
            <div className="space-y-6 animate-in slide-in-from-right fade-in">
              {/* Preview Area */}
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg relative h-32 group">
                <div
                  className="absolute inset-0 transition-colors duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${colors.bgStart}, ${colors.bgMid}, ${colors.bgEnd})`,
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4">
                  <h3 className="text-white text-2xl font-black italic tracking-tighter drop-shadow-md">
                    2024
                  </h3>
                  <div
                    className="mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm"
                    style={{
                      backgroundColor: colors.accent,
                      color: '#000',
                    }}
                  >
                    <Sparkles className="h-3 w-3" style={{ color: '#000' }} />
                    <span style={{ color: '#000' }}>Preview</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nome do Tema</Label>
                  <Input
                    value={editorName}
                    onChange={(e) => setEditorName(e.target.value)}
                    placeholder="Ex: Minha Vibe"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Início Gradiente</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={colors.bgStart}
                        onChange={(e) =>
                          setColors({ ...colors, bgStart: e.target.value })
                        }
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={colors.bgStart}
                        onChange={(e) =>
                          setColors({ ...colors, bgStart: e.target.value })
                        }
                        className="flex-1 font-mono text-xs uppercase"
                        maxLength={7}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Fim Gradiente</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={colors.bgEnd}
                        onChange={(e) =>
                          setColors({ ...colors, bgEnd: e.target.value })
                        }
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={colors.bgEnd}
                        onChange={(e) =>
                          setColors({ ...colors, bgEnd: e.target.value })
                        }
                        className="flex-1 font-mono text-xs uppercase"
                        maxLength={7}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Cor de Destaque</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={colors.accent}
                        onChange={(e) =>
                          setColors({ ...colors, accent: e.target.value })
                        }
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={colors.accent}
                        onChange={(e) =>
                          setColors({ ...colors, accent: e.target.value })
                        }
                        className="flex-1 font-mono text-xs uppercase"
                        maxLength={7}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Cor do Texto</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={colors.text}
                        onChange={(e) =>
                          setColors({ ...colors, text: e.target.value })
                        }
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={colors.text}
                        onChange={(e) =>
                          setColors({ ...colors, text: e.target.value })
                        }
                        className="flex-1 font-mono text-xs uppercase"
                        maxLength={7}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">Meio Gradiente (Opcional)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={colors.bgMid}
                      onChange={(e) =>
                        setColors({ ...colors, bgMid: e.target.value })
                      }
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={colors.bgMid}
                      onChange={(e) =>
                        setColors({ ...colors, bgMid: e.target.value })
                      }
                      className="flex-1 font-mono text-xs uppercase"
                      maxLength={7}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DrawerFooter className="flex-row gap-3">
          {isCreating ? (
            <>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsCreating(false)}
              >
                Cancelar
              </Button>
              <Button className="flex-1" onClick={handleSave}>
                Salvar Tema
              </Button>
            </>
          ) : (
            <DrawerClose asChild>
              <Button className="w-full h-12 rounded-xl text-base font-bold">
                Confirmar Estilo
              </Button>
            </DrawerClose>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
