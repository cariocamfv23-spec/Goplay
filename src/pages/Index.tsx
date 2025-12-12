import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Transition to login after 2.5 seconds
    const timer = setTimeout(() => {
      navigate('/login')
    }, 2500)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary to-purple-900 text-white animate-fade-in">
      <div className="flex flex-col items-center animate-slide-up">
        {/* Logo Placeholder */}
        <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-lg flex items-center justify-center mb-6 shadow-2xl border border-white/20">
          <svg
            className="w-12 h-12 text-white fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold tracking-tighter mb-2">Goplay App</h1>
        <p className="text-white/70 text-sm font-medium tracking-widest uppercase">
          Sports Connected
        </p>
      </div>
    </div>
  )
}

export default Index
