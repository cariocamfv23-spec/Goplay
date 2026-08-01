import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Handshake,
  Trophy,
} from 'lucide-react'
import { TransportMenu } from '@/components/TransportMenu'
import { TeamRoleBadge } from '@/components/matchmaking/TeamRoleBadge'
import { MatchFinancialsCard } from '@/components/matchmaking/MatchFinancialsCard'
import {
  VisitorChecklist,
  type VisitorChecklistState,
} from '@/components/matchmaking/VisitorChecklist'
import type { MatchConfigState } from '@/components/matchmaking/MatchConfigCard'
import type { MatchTeam, MatchField } from '@/lib/matchmaking-data'

export interface ConfirmedMatch {
  id: string
  teamA: MatchTeam
  teamB: MatchTeam
  field: MatchField
  date: string
  startTime: string
  config: MatchConfigState
  visitorChecklist: VisitorChecklistState
}

export function MatchConfirmationCard({ match }: { match: ConfirmedMatch }) {
  const [visitorChecklist, setVisitorChecklist] =
    useState<VisitorChecklistState>(match.visitorChecklist)

  return (
    <Card className="border-green-500/30 bg-green-500/5 backdrop-blur-md overflow-hidden shadow-xl animate-fade-in-up">
      <div className="relative bg-gradient-to-r from-green-500/20 via-primary/10 to-[hsl(var(--gold)/0.15)] p-4 border-b border-green-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--gold)/0.1),transparent_60%)] pointer-events-none" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center border border-green-500/30">
            <Handshake className="w-6 h-6 text-green-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-black uppercase tracking-widest text-green-500 flex items-center gap-2">
              Acordo Fechado
            </h2>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
              Partida confirmada e documentada
            </p>
          </div>
          <CheckCircle2 className="w-6 h-6 text-green-500" />
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <img
              src={match.teamA.logo}
              alt={match.teamA.name}
              className="w-12 h-12 rounded-full bg-secondary/40 p-1 border border-border/50"
            />
            <div className="min-w-0">
              <TeamRoleBadge role="home" />
              <span className="text-sm font-bold truncate block mt-0.5">
                {match.teamA.name}
              </span>
            </div>
          </div>
          <span className="text-xs font-black text-muted-foreground px-2">
            VS
          </span>
          <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
            <div className="min-w-0 text-right">
              <TeamRoleBadge role="visitor" className="ml-auto" />
              <span className="text-sm font-bold truncate block mt-0.5">
                {match.teamB.name}
              </span>
            </div>
            <img
              src={match.teamB.logo}
              alt={match.teamB.name}
              className="w-12 h-12 rounded-full bg-secondary/40 p-1 border border-border/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-border/30 bg-background/30 p-3">
          <Calendar className="w-4 h-4 text-primary shrink-0" />
          <span className="text-xs font-black uppercase tracking-wider">
            {match.date}
          </span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <Clock className="w-3.5 h-3.5 text-[hsl(var(--gold))] shrink-0" />
          <span className="text-xs font-bold text-[hsl(var(--gold))]">
            {match.startTime}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-1.5 text-xs">
            <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="font-black uppercase tracking-wider text-foreground block">
                {match.field.name}
              </span>
              <span className="text-[10px] text-muted-foreground font-medium block">
                {match.field.address}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Badge variant="outline" className="text-[9px] uppercase font-bold">
              {match.field.fieldType === 'sintetico' ? 'Sintético' : 'Terrão'}
            </Badge>
            <Badge variant="outline" className="text-[9px] uppercase font-bold">
              {match.field.region}
            </Badge>
          </div>
        </div>

        <MatchFinancialsCard
          config={match.config}
          visitorChecklist={visitorChecklist}
        />

        <VisitorChecklist
          initial={visitorChecklist}
          onChange={setVisitorChecklist}
        />

        <TransportMenu
          location={{
            address: match.field.address,
            lat: match.field.lat,
            lng: match.field.lng,
            name: match.field.name,
          }}
          label="Ir para o Local"
        />
      </CardContent>
    </Card>
  )
}
