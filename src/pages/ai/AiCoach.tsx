import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowLeft,
  Activity,
  Dumbbell,
  PlayCircle,
  TrendingUp,
  Brain,
  Watch,
  Heart,
  MessageSquare,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppIcon } from '@/components/AppIcon'
import useDeviceStore from '@/stores/useDeviceStore'
import { useEffect, useState, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export default function AiCoach() {
  const navigate = useNavigate()
  const { connectedDevice, biometrics, updateBiometrics } = useDeviceStore()
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: 'Olá, atleta! Sou o Coach IA. Estou analisando seus dados para personalizar seu treino hoje.',
    },
  ])
  const [inputText, setInputText] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (connectedDevice) {
      interval = setInterval(updateBiometrics, 2000)
    }
    return () => clearInterval(interval)
  }, [connectedDevice, updateBiometrics])

  const handleSendMessage = () => {
    if (!inputText.trim()) return
    const userMsg = { role: 'user', text: inputText }
    setMessages((prev) => [...prev, userMsg])
    setInputText('')

    setTimeout(() => {
      let aiResponse = ''
      const lowerInput = inputText.toLowerCase()

      if (lowerInput.includes('treino') || lowerInput.includes('exercício')) {
        aiResponse =
          'Baseado nos seus últimos dados, recomendo focar em exercícios pliométricos para explosão muscular hoje.'
      } else if (
        lowerInput.includes('cansa') ||
        lowerInput.includes('fôlego')
      ) {
        aiResponse = `Seu batimento está em ${biometrics.heartRate} BPM. Sugiro um intervalo de recuperação ativa de 2 minutos agora.`
      } else if (lowerInput.includes('dor') || lowerInput.includes('lesão')) {
        aiResponse =
          'Cuidado. Recomendo usar o Scanner de Lesões (Injury Scanner) no menu AI para uma análise visual.'
      } else {
        aiResponse =
          'Entendi. Vou ajustar o plano. Lembre-se de manter a hidratação constante.'
      }

      setMessages((prev) => [...prev, { role: 'ai', text: aiResponse }])
    }, 1500)
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20 animate-fade-in relative">
      <div className="p-4 border-b border-zinc-800 flex items-center gap-4 sticky top-0 bg-zinc-950 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-zinc-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold flex items-center gap-2">
          <AppIcon className="h-6 w-6" /> Coach IA
        </h1>
      </div>

      <div className="p-4 space-y-6">
        {!connectedDevice ? (
          <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-full">
                <Watch className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-primary">
                  Dispositivo Desconectado
                </h3>
                <p className="text-xs text-zinc-400">
                  Conecte para análise em tempo real.
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10 text-xs"
              onClick={() => navigate('/devices')}
            >
              Conectar
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-3 flex flex-col justify-between h-24">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase">
                  <Heart className="h-3 w-3 text-red-500 animate-pulse" />{' '}
                  Batimentos
                </div>
                <div className="text-3xl font-bold text-white">
                  {biometrics.heartRate}{' '}
                  <span className="text-sm font-normal text-zinc-500">BPM</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-3 flex flex-col justify-between h-24">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase">
                  <Activity className="h-3 w-3 text-gold" /> Calorias
                </div>
                <div className="text-3xl font-bold text-white">
                  {biometrics.calories}{' '}
                  <span className="text-sm font-normal text-zinc-500">
                    kcal
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
          <div className="aspect-video relative bg-black">
            <img
              src="https://img.usecurling.com/p/600/400?q=athlete%20running%20skeleton&dpr=2"
              className="w-full h-full object-cover opacity-60"
              alt="Skeleton Analysis"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-3 rounded-lg border border-primary/30">
              <div className="flex items-center gap-2 mb-1">
                <Brain className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-xs font-bold text-primary uppercase">
                  Feedback Dinâmico
                </span>
              </div>
              <p className="font-semibold text-sm">
                {connectedDevice && biometrics.heartRate > 140
                  ? 'Frequência elevada! A IA ajustou o próximo exercício para recuperação ativa.'
                  : 'Ritmo ideal. A IA sugere aumentar a intensidade em 10% no próximo tiro.'}
              </p>
            </div>
          </div>
          <CardContent className="p-4">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
              <PlayCircle className="mr-2 h-5 w-5" /> Iniciar Sessão Guiada
            </Button>
          </CardContent>
        </Card>

        <div>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gold" /> Evolução Semanal
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
              <span className="text-zinc-400 text-xs uppercase">Técnica</span>
              <div className="text-2xl font-bold text-green-500 mt-1">+12%</div>
              <div className="h-1 w-full bg-zinc-800 mt-2 rounded-full overflow-hidden">
                <div className="h-full w-[70%] bg-green-500" />
              </div>
            </div>
            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
              <span className="text-zinc-400 text-xs uppercase">Força</span>
              <div className="text-2xl font-bold text-primary mt-1">+5%</div>
              <div className="h-1 w-full bg-zinc-800 mt-2 rounded-full overflow-hidden">
                <div className="h-full w-[45%] bg-primary" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-white" /> Treinos Recomendados
          </h3>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="h-12 w-12 bg-zinc-800 rounded-lg flex items-center justify-center shrink-0">
                  <PlayCircle className="h-6 w-6 text-zinc-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Correção de Postura</h4>
                  <p className="text-xs text-zinc-400">
                    10 min • Baixa Intensidade
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-primary to-purple-800 shadow-xl z-50">
            <MessageSquare className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AppIcon className="h-6 w-6" /> Conversar com Coach
            </DialogTitle>
          </DialogHeader>
          <div className="h-[300px] flex flex-col">
            <div className="flex-1 overflow-y-auto pr-4" ref={scrollAreaRef}>
              <div className="space-y-4 pb-2">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] p-3 rounded-xl text-sm',
                        msg.role === 'user'
                          ? 'bg-primary text-white rounded-br-none'
                          : 'bg-zinc-800 text-zinc-200 rounded-bl-none',
                      )}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex gap-2 pt-2 border-t border-zinc-800">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Pergunte sobre seu treino..."
                className="bg-zinc-900 border-zinc-700 text-white"
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} size="icon">
                <PlayCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
