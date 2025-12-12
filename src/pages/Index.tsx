import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play } from 'lucide-react'

const Index = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Transition to login after 3 seconds for a better splash experience
    const timer = setTimeout(() => {
      navigate('/login')
    }, 3000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary to-purple-900 text-white animate-fade-in relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-gold rounded-full blur-[100px]" />
      </div>

      <div className="flex flex-col items-center z-10 animate-slide-up">
        {/* Animated Logo */}
        <div className="w-28 h-28 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center mb-8 shadow-2xl border border-white/20 relative group">
          <div className="absolute inset-0 bg-white/20 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500" />
          <div className="relative z-10 bg-gradient-to-br from-white to-white/80 p-4 rounded-2xl shadow-inner">
            <Play className="w-12 h-12 text-primary fill-primary ml-1" />
          </div>
        </div>

        <h1 className="text-5xl font-bold tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 drop-shadow-sm">
          Goplay
        </h1>
        <p className="text-white/70 text-sm font-medium tracking-[0.2em] uppercase">
          Sports Connected
        </p>
      </div>

      <div className="absolute bottom-10 z-10">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 rounded-full bg-white animate-bounce" />
        </div>
      </div>
    </div>
  )
}

export default Index
