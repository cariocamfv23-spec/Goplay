import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Box, Play, Sparkles, Layers } from 'lucide-react'
import { Replay3DWizardDialog } from '@/components/Replay3DWizardDialog'

export function Replay3DHomeCard() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="w-full mb-6">
        <div className="flex items-center justify-between px-1 mb-2">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Exclusivo
          </h2>
        </div>

        <Card className="border-none shadow-xl bg-gradient-to-br from-indigo-950 via-slate-900 to-black text-white overflow-hidden relative cursor-pointer group hover:shadow-2xl transition-all border-l-4 border-l-primary">
          {/* Background Effects - Premium Depth */}
          <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/800/400?q=3d%20wireframe%20grid%20perspective&color=blue')] bg-cover bg-center opacity-30 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/40 rounded-full blur-[80px] animate-pulse-slow" />

          <CardContent className="p-6 relative z-10 flex items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  <Box className="w-5 h-5 text-indigo-300" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white drop-shadow-md">
                  Goplay Replay 3D
                </h3>
              </div>
              <p className="text-sm text-indigo-100/90 leading-relaxed font-medium">
                Transforme vídeos em experiências imersivas. Nossa IA cria uma{' '}
                <span className="text-white font-bold border-b border-white/30">
                  reconstrução 3D realista
                </span>{' '}
                dos seus lances com profundidade de cinema.
              </p>
              <div className="pt-3">
                <Button
                  size="sm"
                  onClick={() => setOpen(true)}
                  className="bg-white text-indigo-950 hover:bg-indigo-50 font-bold border-0 shadow-lg shadow-black/20 transition-transform active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 mr-2 fill-current" />
                  Criar Replay Imersivo
                </Button>
              </div>
            </div>

            {/* Visual Preview (Abstract 3D Representation) */}
            <div className="hidden min-[360px]:flex relative w-28 h-28 shrink-0 items-center justify-center perspective-[500px]">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-pulse blur-xl" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center transform rotate-y-12 rotate-x-6 group-hover:rotate-y-180 transition-transform duration-1000 shadow-2xl preserve-3d">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl" />
                <Layers className="w-10 h-10 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Replay3DWizardDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
