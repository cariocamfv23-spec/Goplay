import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Wand2,
  Scissors,
  Music,
  Sticker,
  Download,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function VarzeaEditor() {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleProcess = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
    }, 3000)
  }

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col">
      <div className="p-4 flex items-center justify-between border-b border-zinc-800">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-zinc-800"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-gold" /> Edição Várzea
        </h1>
        <Button variant="ghost" size="sm" className="text-gold font-bold">
          Exportar
        </Button>
      </div>

      <div className="flex-1 bg-zinc-900 relative flex items-center justify-center overflow-hidden">
        {/* Preview Area */}
        <div className="relative aspect-[9/16] h-[80%] bg-black rounded-lg overflow-hidden shadow-2xl">
          <img
            src="https://img.usecurling.com/p/400/700?q=funny%20soccer%20fail"
            className="w-full h-full object-cover opacity-80"
            alt="Edit Preview"
          />

          {/* Simulated Effects Overlay */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 transform -rotate-12 bg-yellow-400 text-black font-black text-3xl px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce">
            QUE ISSO!?
          </div>

          <div className="absolute bottom-20 right-4 text-4xl animate-pulse">
            🤣🤣🤣
          </div>

          {isProcessing && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20">
              <Wand2 className="h-12 w-12 text-gold animate-spin mb-4" />
              <p className="font-bold">Aplicando Efeitos...</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 bg-zinc-950 border-t border-zinc-800 grid grid-cols-4 gap-4">
        <div
          className="flex flex-col items-center gap-2 cursor-pointer opacity-80 hover:opacity-100"
          onClick={handleProcess}
        >
          <div className="h-12 w-12 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700">
            <Wand2 className="h-6 w-6 text-gold" />
          </div>
          <span className="text-xs">Auto Edit</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer opacity-80 hover:opacity-100">
          <div className="h-12 w-12 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700">
            <Music className="h-6 w-6 text-purple-400" />
          </div>
          <span className="text-xs">Sons</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer opacity-80 hover:opacity-100">
          <div className="h-12 w-12 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700">
            <Sticker className="h-6 w-6 text-green-400" />
          </div>
          <span className="text-xs">Stickers</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer opacity-80 hover:opacity-100">
          <div className="h-12 w-12 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700">
            <Scissors className="h-6 w-6 text-blue-400" />
          </div>
          <span className="text-xs">Cortar</span>
        </div>
      </div>
    </div>
  )
}
