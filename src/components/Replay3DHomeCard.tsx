import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Box, Play, Sparkles } from 'lucide-react'
import { Replay3DWizardDialog } from '@/components/Replay3DWizardDialog'

export function Replay3DHomeCard() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="w-full mb-6">
        <div className="flex items-center justify-between px-1 mb-2">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Novidade
          </h2>
        </div>

        <Card className="border-none shadow-lg bg-gradient-to-br from-indigo-900 via-zinc-900 to-black text-white overflow-hidden relative cursor-pointer group hover:shadow-xl transition-all border-l-4 border-l-primary">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/800/400?q=3d%20wireframe%20grid&color=blue')] bg-cover bg-center opacity-20 mix-blend-overlay" />
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/30 rounded-full blur-[50px]" />

          <CardContent className="p-5 relative z-10 flex items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 rounded-md bg-white/10 backdrop-blur-md border border-white/10">
                  <Box className="w-5 h-5 text-indigo-300" />
                </div>
                <h3 className="text-lg font-bold tracking-tight">
                  Goplay Replay 3D
                </h3>
              </div>
              <p className="text-sm text-indigo-100/80 leading-snug">
                Transforme seus vídeos em animações táticas{' '}
                <strong>Low-Poly</strong> com Inteligência Artificial.
              </p>
              <div className="pt-2">
                <Button
                  size="sm"
                  onClick={() => setOpen(true)}
                  className="bg-white text-indigo-950 hover:bg-white/90 font-bold border-0"
                >
                  <Play className="w-3.5 h-3.5 mr-2 fill-current" />
                  Testar Agora
                </Button>
              </div>
            </div>

            {/* Visual Preview (Abstract 3D Representation) */}
            <div className="hidden min-[360px]:flex relative w-24 h-24 shrink-0 items-center justify-center">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-pulse" />
              <div className="relative w-16 h-16 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center transform rotate-6 group-hover:rotate-12 transition-transform duration-500">
                <Box className="w-8 h-8 text-indigo-300 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Replay3DWizardDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
