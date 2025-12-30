import { ProfileData } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Star, Trophy } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { TalentPreviewCard } from '@/components/TalentPreviewCard'

interface TalentMapMarkerProps {
  talent: ProfileData & { x: number; y: number }
  isTopTalent: boolean
}

export function TalentMapMarker({ talent, isTopTalent }: TalentMapMarkerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 hover:scale-125 hover:z-50',
            isTopTalent ? 'z-20' : 'z-10',
          )}
          style={{
            left: `${talent.x}%`,
            top: `${talent.y}%`,
          }}
        >
          {/* Pulse Effect for Top Talents */}
          {isTopTalent && (
            <div className="absolute inset-0 rounded-full bg-gold/50 animate-ping" />
          )}

          {/* Marker Container */}
          <div
            className={cn(
              'relative h-10 w-10 rounded-full border-2 flex items-center justify-center shadow-lg overflow-hidden bg-background transition-colors',
              isTopTalent
                ? 'border-gold shadow-[0_0_15px_rgba(255,215,0,0.5)]'
                : 'border-white/50 hover:border-primary',
            )}
          >
            <Avatar className="h-full w-full">
              <AvatarImage src={talent.avatar} alt={talent.name} />
              <AvatarFallback>{talent.name.substring(0, 2)}</AvatarFallback>
            </Avatar>

            {/* Badge Indicator */}
            {isTopTalent && (
              <div className="absolute bottom-0 right-0 bg-gold text-black rounded-full p-0.5">
                <Star className="h-2 w-2 fill-current" />
              </div>
            )}
          </div>

          {/* Hover Label (Desktop) */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none backdrop-blur-sm">
            {talent.name}
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0 border-none bg-transparent shadow-none"
        side="top"
        sideOffset={10}
      >
        <TalentPreviewCard talent={talent} isTopTalent={isTopTalent} />
      </PopoverContent>
    </Popover>
  )
}
