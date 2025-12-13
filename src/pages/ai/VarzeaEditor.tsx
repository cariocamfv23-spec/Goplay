import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Scissors,
  Mic,
  Music,
  Wand2,
  Download,
  Share2,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

export default function VarzeaEditor() {
  const navigate = useNavigate()
  const [processing, setProcessing] = useState(false)

  const handleAutoEdit = () => {
    setProcessing(true)
    setTimeout(() => setProcessing(false), 2000)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <div className="p-4 flex items-center justify-between border-b border-zinc-800 sticky top-0 bg-zinc-950 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="font-bold">Editor Várzea</h1>
        <Button
          size="sm"
          className="bg-primary text-white hover:bg-primary/90 gap-2"
        >
          <Download className="h-4 w-4" /> Exportar
        </Button>
      </div>

      {/* Video Preview */}
      <div className="aspect-video bg-black relative flex items-center justify-center overflow-hidden">
        <img
          src="https://img.usecurling.com/p/800/450?q=soccer%20match%20action&dpr=2"
          alt="Timeline Preview"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/60 backdrop-blur-sm p-2 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="secondary"
                className="bg-gold text-black hover:bg-gold"
              >
                Gol
              </Badge>
              <Badge variant="outline" className="text-white border-white/20">
                00:15
              </Badge>
            </div>
            <p className="text-sm font-medium italic">
              "Que categoria meus amigos!"
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Mock */}
      <div className="h-24 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-1 overflow-x-auto no-scrollbar">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`h-16 min-w-[60px] rounded-md border border-zinc-700 bg-zinc-800 relative overflow-hidden ${i === 3 ? 'ring-2 ring-primary' : ''}`}
          >
            <div className="absolute inset-0 bg-zinc-700/50" />
            {i % 3 === 0 && (
              <div className="absolute bottom-1 right-1 w-2 h-2 bg-gold rounded-full" />
            )}
          </div>
        ))}
      </div>

      {/* Tools */}
      <div className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:text-white"
            onClick={handleAutoEdit}
          >
            {processing ? (
              <Wand2 className="h-6 w-6 animate-spin text-purple-500" />
            ) : (
              <Wand2 className="h-6 w-6 text-purple-500" />
            )}
            Edição Mágica
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:text-white"
          >
            <Mic className="h-6 w-6 text-blue-500" />
            Narração IA
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:text-white"
          >
            <Music className="h-6 w-6 text-pink-500" />
            Trilha Sonora
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:text-white"
          >
            <Scissors className="h-6 w-6 text-green-500" />
            Cortes
          </Button>
        </div>

        <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl p-4 border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-white">Destaques Detectados</h3>
            <Badge className="bg-primary">3 Lances</Badge>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center justify-between text-sm text-zinc-300">
              <span>• Gol de Falta (00:15)</span>
              <span className="text-green-500">Incluso</span>
            </li>
            <li className="flex items-center justify-between text-sm text-zinc-300">
              <span>• Drible (00:42)</span>
              <span className="text-green-500">Incluso</span>
            </li>
            <li className="flex items-center justify-between text-sm text-zinc-300">
              <span>• Defesa (01:10)</span>
              <span className="text-zinc-500">Oculto</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
