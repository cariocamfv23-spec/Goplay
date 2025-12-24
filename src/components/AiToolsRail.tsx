import { useNavigate } from 'react-router-dom'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Card, CardContent } from '@/components/ui/card'
import {
  Brain,
  Activity,
  ScanEye,
  BookOpen,
  Video,
  Ghost,
  Swords,
  Bot,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function AiToolsRail() {
  const navigate = useNavigate()

  const tools = [
    {
      id: 'coach',
      label: 'AI Coach',
      icon: Brain,
      path: '/ai/coach',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      id: 'motion',
      label: 'Motion Analysis',
      icon: Activity,
      path: '/ai/motion-analysis',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      id: 'injury',
      label: 'Injury Scanner',
      icon: ScanEye,
      path: '/ai/injury-scanner',
      color: 'text-red-500',
      bg: 'bg-red-500/10 border-red-500/20',
    },
    {
      id: 'editor',
      label: 'Várzea Editor',
      icon: Video,
      path: '/ai/editor',
      color: 'text-orange-500',
      bg: 'bg-orange-500/10 border-orange-500/20',
    },
    {
      id: 'ghost',
      label: 'Ghost Play',
      icon: Ghost,
      path: '/ai/ghost-play',
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
    },
    {
      id: 'arena',
      label: 'Arena Mode',
      icon: Swords,
      path: '/ai/arena-mode',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      id: 'avatar',
      label: 'AI Avatar',
      icon: Bot,
      path: '/ai/avatar',
      color: 'text-pink-500',
      bg: 'bg-pink-500/10 border-pink-500/20',
    },
    {
      id: 'oracle',
      label: 'Oracle',
      icon: Zap,
      path: '/ai/oracle',
      color: 'text-gold',
      bg: 'bg-yellow-500/10 border-yellow-500/20',
    },
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Goplay AI Suite
        </h2>
      </div>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-3 pb-2">
          {tools.map((tool) => (
            <Card
              key={tool.id}
              className={cn(
                'w-32 border shadow-sm cursor-pointer hover:shadow-md transition-all group',
                tool.bg,
              )}
              onClick={() => navigate(tool.path)}
            >
              <CardContent className="p-3 flex flex-col items-center justify-center gap-2 text-center h-full min-h-[100px]">
                <div
                  className={cn(
                    'p-2 rounded-full bg-background shadow-sm group-hover:scale-110 transition-transform',
                    tool.color,
                  )}
                >
                  <tool.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold leading-tight whitespace-normal">
                  {tool.label}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}
