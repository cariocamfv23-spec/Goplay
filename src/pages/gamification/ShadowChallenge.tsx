import { Button } from '@/components/ui/button'
import { ArrowLeft, Video, Camera, Trophy, Share2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function ShadowChallenge() {
  const navigate = useNavigate()
  const [recording, setRecording] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="p-4 flex items-center justify-between z-10 absolute top-0 left-0 right-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-black/20 rounded-full"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-bold">
          DESAFIO SOMBRA
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-black/20 rounded-full"
        >
          <Share2 className="h-6 w-6" />
        </Button>
      </div>

      {/* Split Screen View */}
      <div className="flex-1 flex flex-col">
        {/* Pro Video (Top) */}
        <div className="flex-1 relative border-b border-white/20">
          <img
            src="https://img.usecurling.com/p/600/400?q=soccer%20pro%20dribble&dpr=2"
            className="w-full h-full object-cover"
            alt="Pro Move"
          />
          <div className="absolute bottom-4 left-4">
            <h3 className="font-bold text-shadow">Elástico do Falcão</h3>
            <p className="text-xs opacity-80">Referência Pro</p>
          </div>
        </div>

        {/* User Camera (Bottom) */}
        <div className="flex-1 relative bg-zinc-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-zinc-500 text-sm">Câmera Frontal</p>
          </div>
          {/* Overlay Guidelines */}
          <div className="absolute inset-0 border-2 border-primary/30 m-8 rounded-3xl border-dashed" />

          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <Button
              size="lg"
              className={`h-16 w-16 rounded-full border-4 border-white ${recording ? 'bg-red-500 animate-pulse' : 'bg-transparent hover:bg-white/10'}`}
              onClick={() => setRecording(!recording)}
            >
              <div
                className={`h-full w-full rounded-full ${recording ? 'bg-transparent' : 'bg-red-500 scale-90'}`}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="bg-zinc-950 p-4 pb-8 flex justify-around border-t border-zinc-800">
        <div className="text-center">
          <div className="text-gold font-bold text-lg flex items-center gap-1">
            <Trophy className="h-4 w-4" /> 500
          </div>
          <div className="text-[10px] text-zinc-400">Pontos</div>
        </div>
        <div className="text-center">
          <div className="text-white font-bold text-lg">Difícil</div>
          <div className="text-[10px] text-zinc-400">Nível</div>
        </div>
      </div>
    </div>
  )
}
