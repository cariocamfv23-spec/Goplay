import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Brain,
  Activity,
  Dumbbell,
  ScanEye,
  Film,
  Ghost,
  Swords,
  UserCircle2,
  Sparkles,
  Zap,
  Clock,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface Tool {
  id: string
  icon: any
  label: string
  color: string
  path: string
  isNew?: boolean
}

const tools: Tool[] = [
  {
    id: 'timeshift',
    icon: Clock,
    label: 'Time Shift',
    color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
    path: '/timeshift',
    isNew: true,
  },
  {
    id: 'coach',
    icon: Brain,
    label: 'AI Coach',
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    path: '/ai/coach',
  },
  {
    id: 'motion',
    icon: Activity,
    label: 'Motion Analysis',
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    path: '/ai/motion-analysis',
  },
  {
    id: 'editor',
    icon: Film,
    label: 'Várzea Editor',
    color: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
    path: '/ai/editor',
  },
  {
    id: 'ghost',
    icon: Ghost,
    label: 'Ghost Play',
    color: 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20',
    path: '/ai/ghost-play',
  },
  {
    id: 'arena',
    icon: Swords,
    label: 'Arena Mode',
    color: 'text-red-500 bg-red-500/10 border-red-500/20',
    path: '/ai/arena-mode',
  },
  {
    id: 'injury',
    icon: ScanEye,
    label: 'Injury Scanner',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    path: '/ai/injury-scanner',
  },
  {
    id: 'library',
    icon: Dumbbell,
    label: 'Exercise Lib',
    color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
    path: '/ai/library',
  },
  {
    id: 'avatar',
    icon: UserCircle2,
    label: 'AI Avatar',
    color: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
    path: '/ai/avatar',
  },
  {
    id: 'oracle',
    icon: Sparkles,
    label: 'Oráculo',
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    path: '/ai/oracle',
  },
  {
    id: 'nft',
    icon: Zap,
    label: 'Stickers',
    color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
    path: '/ai/nft-creator',
  },
]

export function AiToolsRail() {
  const navigate = useNavigate()

  return (
    <div className="w-full py-4 space-y-3">
      <div className="px-4 flex items-center justify-between">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Estúdio AI
        </h2>
        <span className="text-xs text-muted-foreground">Ver todos</span>
      </div>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-3 p-4 pt-0">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => navigate(tool.path)}
              className={cn(
                'flex flex-col items-center justify-center gap-2 min-w-[80px] p-2 rounded-xl transition-all hover:scale-105 active:scale-95 group relative',
              )}
            >
              <div
                className={cn(
                  'w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm transition-shadow group-hover:shadow-md',
                  tool.color,
                )}
              >
                <tool.icon className="w-7 h-7" />
                {tool.isNew && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-sm animate-pulse">
                    NOVO
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {tool.label}
              </span>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
