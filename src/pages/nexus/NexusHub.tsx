import { Orbit, Users, Lock, Globe } from 'lucide-react'
import { CreateTribeDialog } from '@/components/nexus/CreateTribeDialog'
import { useNexusStore } from '@/stores/useNexusStore'
import { mockUser } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'

export default function NexusHub() {
  const { tribes } = useNexusStore()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-24 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none" />

      <div className="relative z-10 p-4 pt-6 space-y-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-2 text-foreground drop-shadow-sm">
              <Orbit className="w-8 h-8 text-primary" />
              Nexus
            </h1>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              Descubra e conecte-se com sua tribo ideal.
            </p>
          </div>
          <CreateTribeDialog />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tribes.map((tribe) => {
            const isMember = tribe.members.includes(mockUser.id)
            const isRequested = tribe.pendingRequests.includes(mockUser.id)

            return (
              <div
                key={tribe.id}
                onClick={() => navigate(`/nexus/${tribe.id}`)}
                className="group relative flex flex-col bg-card/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)] hover:border-primary/40 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                <div className="h-32 w-full relative">
                  <img
                    src={tribe.cover}
                    alt={tribe.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute top-3 right-3">
                    {tribe.isPrivate ? (
                      <Badge
                        variant="secondary"
                        className="bg-black/40 text-white backdrop-blur-md border border-white/10 gap-1.5 py-1"
                      >
                        <Lock className="w-3 h-3" /> Privado
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-black/40 text-white backdrop-blur-md border border-white/10 gap-1.5 py-1"
                      >
                        <Globe className="w-3 h-3" /> Público
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0 relative flex-1 flex flex-col">
                  <div className="absolute -top-10 left-5 p-1 bg-card rounded-2xl shadow-lg border border-border/50">
                    <img
                      src={tribe.icon}
                      alt={`${tribe.name} icon`}
                      className="w-16 h-16 rounded-xl object-cover bg-secondary"
                    />
                  </div>

                  <div className="mt-10 flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-colors"
                    >
                      {tribe.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                      <Users className="w-3.5 h-3.5" /> {tribe.members.length}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg mt-3 leading-tight group-hover:text-primary transition-colors line-clamp-1">
                    {tribe.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed flex-1">
                    {tribe.description}
                  </p>

                  <div className="mt-5">
                    {isMember ? (
                      <div className="w-full py-2.5 text-center text-xs font-bold text-primary bg-primary/10 rounded-xl border border-primary/20">
                        VOCÊ É MEMBRO
                      </div>
                    ) : isRequested ? (
                      <div className="w-full py-2.5 text-center text-xs font-bold text-orange-500 bg-orange-500/10 rounded-xl border border-orange-500/20">
                        SOLICITAÇÃO PENDENTE
                      </div>
                    ) : (
                      <div className="w-full py-2.5 text-center text-xs font-bold text-muted-foreground bg-secondary/50 rounded-xl border border-border group-hover:bg-secondary transition-colors">
                        VER DETALHES
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
