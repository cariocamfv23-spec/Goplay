import { Button } from '@/components/ui/button'
import { ArrowLeft, Ghost, Swords, Timer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'

export default function ShadowChallenge() {
  const navigate = useNavigate()

  return (
    <div className="h-screen w-full bg-zinc-950 text-white flex flex-col">
      <div className="p-4 flex items-center justify-between bg-zinc-900 border-b border-zinc-800">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Ghost className="h-5 w-5 text-purple-400" /> Desafio Sombra
        </h1>
        <Badge variant="outline" className="border-purple-500 text-purple-400">
          Nível 5
        </Badge>
      </div>

      <div className="flex-1 relative">
        {/* Split Screen Simulation */}
        <div className="h-1/2 w-full relative border-b-2 border-purple-500/50">
          <img
            src="https://img.usecurling.com/p/800/400?q=soccer%20player%20running&filter=grayscale"
            className="w-full h-full object-cover opacity-50 grayscale"
            alt="Past Self"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Badge className="bg-black/60 text-white border-none text-lg px-4 py-2">
              SUA SOMBRA (2023)
            </Badge>
          </div>
          <div className="absolute bottom-4 right-4 text-2xl font-mono font-bold text-red-500">
            00:14.22
          </div>
        </div>

        <div className="h-1/2 w-full relative">
          <img
            src="https://img.usecurling.com/p/800/400?q=soccer%20player%20running%20action"
            className="w-full h-full object-cover"
            alt="Current Self"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-white border-none">
              VOCÊ AGORA
            </Badge>
          </div>
          <div className="absolute bottom-4 right-4 text-3xl font-mono font-bold text-green-500">
            00:12.45
          </div>
        </div>

        {/* VS Badge */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="h-16 w-16 bg-zinc-900 rounded-full flex items-center justify-center border-4 border-purple-600 shadow-xl shadow-purple-900/50">
            <Swords className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>

      <div className="p-6 bg-zinc-900 border-t border-zinc-800">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-zinc-400 text-sm">Objetivo</p>
            <p className="font-bold text-lg">Superar Tempo</p>
          </div>
          <div className="flex items-center gap-2 text-yellow-400">
            <Timer className="h-5 w-5" />
            <span className="font-mono font-bold">Recorde: 14.22s</span>
          </div>
        </div>
        <Button className="w-full h-12 text-lg font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg shadow-purple-900/20">
          INICIAR DUELO
        </Button>
      </div>
    </div>
  )
}
