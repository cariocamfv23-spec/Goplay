import { Button } from '@/components/ui/button'
import { ArrowLeft, Sparkles, TrendingUp, Target } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockOracle } from '@/lib/data'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { Card, CardContent } from '@/components/ui/card'

export default function Oracle() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20 animate-fade-in">
      <div className="p-4 border-b border-zinc-800 flex items-center gap-4 bg-zinc-950 sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-zinc-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" /> Oráculo Goplay
        </h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="text-center py-6">
          <div className="inline-block relative">
            <div className="h-32 w-32 rounded-full border-4 border-purple-500/30 flex items-center justify-center bg-purple-900/10 mb-4 animate-[pulse_3s_infinite]">
              <span className="text-5xl font-black text-purple-400">
                {mockOracle.potentialIndex}
              </span>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-1">Potencial Goplay</h2>
          <p className="text-zinc-400 text-sm">
            Baseado na análise de 128 vídeos seus.
          </p>
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" /> Projeção Futura
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockOracle.comparisonData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#333"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="subject"
                    stroke="#666"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#111', border: 'none' }}
                    cursor={{ fill: '#333' }}
                  />
                  <Bar dataKey="A" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" /> Posição Ideal
            </h3>
            <p className="text-xl font-bold text-white mb-2">
              {mockOracle.predictedPosition}
            </p>
            <p className="text-sm text-zinc-400">
              A IA identificou que suas características de velocidade e visão de
              jogo se encaixam perfeitamente nesta posição.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
