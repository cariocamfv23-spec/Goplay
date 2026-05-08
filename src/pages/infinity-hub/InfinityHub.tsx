import { useState } from 'react'
import { X, Play, Activity, Flame, ShieldAlert, Zap } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const CATEGORIES = [
  'All',
  'CrossFit',
  'Yoga',
  'Football',
  'Combat Sports',
  'Endurance',
  'Strength',
]

const WORKOUTS = [
  {
    id: 1,
    title: 'Cyber Core Crusher',
    sport: 'CrossFit',
    difficulty: 'Advanced',
    image: 'https://img.usecurling.com/p/600/400?q=crossfit&color=purple',
    video: 'https://img.usecurling.com/p/800/450?q=workout&color=blue',
    tips: "Keep your core tight to maximize energy transfer. Don't rush the eccentric phase.",
    steps: [
      'Start in a hollow body position',
      'Explode upwards into a V-up',
      'Rotate torso to the right, then left',
      'Return to starting position with control',
    ],
  },
  {
    id: 2,
    title: 'Neon Flow Sequence',
    sport: 'Yoga',
    difficulty: 'Beginner',
    image: 'https://img.usecurling.com/p/600/400?q=yoga&color=pink',
    video: 'https://img.usecurling.com/p/800/450?q=meditation&color=pink',
    tips: 'Sync every movement with deep, conscious breaths to build internal heat.',
    steps: [
      'Begin in downward facing dog',
      'Sweep right leg up to three-legged dog',
      'Step through into warrior one',
      'Open up gracefully to warrior two',
    ],
  },
  {
    id: 3,
    title: 'Titan Strike Combos',
    sport: 'Combat Sports',
    difficulty: 'Intermediate',
    image: 'https://img.usecurling.com/p/600/400?q=boxing&color=cyan',
    video: 'https://img.usecurling.com/p/800/450?q=boxing&color=cyan',
    tips: 'Always keep your guard up and pivot on your lead foot.',
    steps: [
      'Establish a solid fighting stance',
      'Throw a quick jab-cross combination',
      'Slip to the outside of an incoming punch',
      'Counter with a devastating lead hook',
    ],
  },
  {
    id: 4,
    title: 'Quantum Sprint',
    sport: 'Endurance',
    difficulty: 'Advanced',
    image: 'https://img.usecurling.com/p/600/400?q=running&color=yellow',
    video: 'https://img.usecurling.com/p/800/450?q=running&color=yellow',
    tips: 'Maintain proper arm swing to drive your momentum forward without twisting.',
    steps: [
      'Start with a light 5-minute jog warmup',
      'Accelerate to 90% max speed for 30 seconds',
      'Recover with a 1-minute walk',
      'Repeat 10 cycles for maximum burn',
    ],
  },
]

export default function InfinityHub() {
  const [filter, setFilter] = useState('All')
  const [selectedWorkout, setSelectedWorkout] = useState<
    (typeof WORKOUTS)[0] | null
  >(null)

  const filtered =
    filter === 'All' ? WORKOUTS : WORKOUTS.filter((w) => w.sport === filter)

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-zinc-950 text-white flex flex-col pb-24 font-sans selection:bg-cyan-500/30">
      {/* Header */}
      <div className="pt-6 px-4 pb-4 bg-gradient-to-b from-purple-900/30 via-zinc-950/80 to-transparent">
        <h1 className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 flex items-center gap-2">
          <Zap className="w-8 h-8 text-cyan-400 fill-cyan-400/20" />
          INFINITY HUB
        </h1>
        <p className="text-zinc-400 text-sm font-medium mt-1">
          Unlock your maximum athletic potential.
        </p>
      </div>

      {/* Filters */}
      <div className="px-4 py-2 overflow-x-auto no-scrollbar flex gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              'whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all border',
              filter === cat
                ? 'bg-purple-600/20 border-purple-500 text-purple-300 shadow-[0_0_12px_rgba(124,58,237,0.3)]'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((workout) => (
          <div
            key={workout.id}
            className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 transition-all cursor-pointer shadow-lg"
            onClick={() => setSelectedWorkout(workout)}
          >
            <div className="aspect-[16/9] relative">
              <img
                src={workout.image}
                alt={workout.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/60 p-3 rounded-full backdrop-blur-md border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                  <Play className="w-8 h-8 ml-1 fill-cyan-400/20" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm">
                  {workout.sport}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-zinc-900/80 text-zinc-300 flex items-center gap-1 border border-white/5 backdrop-blur-sm">
                  <Flame className="w-3 h-3 text-orange-500" />{' '}
                  {workout.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-bold leading-tight text-white group-hover:text-cyan-400 transition-colors">
                {workout.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Dialog */}
      <Dialog.Root
        open={!!selectedWorkout}
        onOpenChange={(open) => !open && setSelectedWorkout(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-[50%] w-[95%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-zinc-950 border border-purple-500/30 rounded-3xl p-0 overflow-hidden z-[100] shadow-[0_0_60px_rgba(124,58,237,0.2)] outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 flex flex-col max-h-[90vh]">
            {selectedWorkout && (
              <>
                <div className="relative aspect-video shrink-0 bg-zinc-900 flex items-center justify-center overflow-hidden border-b border-white/10">
                  <img
                    src={selectedWorkout.video}
                    alt="Demo"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />

                  <div className="relative z-10 w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center backdrop-blur-md border border-cyan-500/50 cursor-pointer hover:bg-cyan-500/30 transition-all hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                    <Play className="w-8 h-8 ml-1 fill-cyan-400/30" />
                  </div>

                  <Dialog.Close asChild>
                    <button className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-sm text-white/80 transition-colors z-20">
                      <X className="w-5 h-5" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="p-5 overflow-y-auto no-scrollbar">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                      {selectedWorkout.sport}
                    </span>
                    <span className="text-zinc-700">•</span>
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      {selectedWorkout.difficulty}
                    </span>
                  </div>

                  <Dialog.Title className="text-2xl font-black mb-6 tracking-tight">
                    {selectedWorkout.title}
                  </Dialog.Title>

                  <div className="space-y-6">
                    <div className="bg-purple-950/30 border border-purple-500/20 rounded-2xl p-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                      <h4 className="flex items-center gap-2 font-bold text-purple-300 mb-2 relative z-10">
                        <Activity className="w-4 h-4" /> Pro Tip
                      </h4>
                      <Dialog.Description className="text-sm text-purple-100/70 leading-relaxed relative z-10">
                        {selectedWorkout.tips}
                      </Dialog.Description>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-white mb-4">
                        <ShieldAlert className="w-4 h-4 text-cyan-400" />{' '}
                        Execution Protocol
                      </h4>
                      <ol className="space-y-4 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-zinc-800">
                        {selectedWorkout.steps.map((step, idx) => (
                          <li
                            key={idx}
                            className="relative pl-8 flex items-start"
                          >
                            <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-zinc-950 border-2 border-cyan-500 flex items-center justify-center text-[10px] font-black text-cyan-400 z-10 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                              {idx + 1}
                            </div>
                            <span className="text-sm text-zinc-300 pt-0.5 leading-relaxed">
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5">
                    <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black text-lg h-12 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                      INITIALIZE SEQUENCE
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
