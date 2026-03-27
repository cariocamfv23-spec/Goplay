import { useParams, useNavigate } from 'react-router-dom'
import { useNexusStore } from '@/stores/useNexusStore'
import { mockUser } from '@/lib/data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import {
  Users,
  Lock,
  Globe,
  ArrowLeft,
  Shield,
  MessageSquare,
} from 'lucide-react'
import { TribeFeedTab } from './tabs/TribeFeedTab'
import { TribeEventsTab } from './tabs/TribeEventsTab'
import { TribeAdminTab } from './tabs/TribeAdminTab'
import { TribeChatTab } from './tabs/TribeChatTab'
import { Badge } from '@/components/ui/badge'

export default function TribeProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { tribes, joinTribe } = useNexusStore()

  const tribe = tribes.find((t) => t.id === id)

  if (!tribe)
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Tribo não encontrada.
      </div>
    )

  const isCreator = tribe.creatorId === mockUser.id
  const isMember = tribe.members.includes(mockUser.id)
  const isRequested = tribe.pendingRequests.includes(mockUser.id)

  const handleJoin = () => {
    joinTribe(tribe.id, mockUser.id)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Cover Image */}
      <div className="relative h-56 md:h-72 w-full">
        <img
          src={tribe.cover}
          alt="Tribe Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-black/20 backdrop-blur-md text-white hover:bg-black/40 rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      <div className="relative px-4 pb-4 -mt-16 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div className="p-1.5 bg-background rounded-3xl shadow-lg inline-block w-fit">
            <img
              src={tribe.icon}
              alt="Tribe Icon"
              className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover bg-secondary"
            />
          </div>
          <div className="flex-shrink-0">
            {isMember ? (
              <Button
                variant="secondary"
                className="w-full md:w-auto font-bold gap-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
              >
                Membro Oficial
              </Button>
            ) : isRequested ? (
              <Button
                variant="outline"
                disabled
                className="w-full md:w-auto font-bold border-orange-500/50 text-orange-500"
              >
                Solicitação Pendente
              </Button>
            ) : (
              <Button
                onClick={handleJoin}
                className="w-full md:w-auto font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-transform"
              >
                {tribe.isPrivate ? 'Solicitar Entrada' : 'Entrar na Tribo'}
              </Button>
            )}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              {tribe.name}
            </h1>
            {tribe.isPrivate ? (
              <Lock className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Globe className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-2xl mb-5">
            {tribe.description}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1.5 py-1 px-3">
              <Users className="w-3.5 h-3.5" /> {tribe.members.length} Membros
            </Badge>
            <Badge
              variant="outline"
              className="bg-primary/5 text-primary border-primary/20 py-1 px-3"
            >
              {tribe.category}
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="feed" className="mt-8">
          <TabsList className="w-full h-auto bg-secondary/50 rounded-xl p-1 flex flex-wrap gap-1 justify-start sm:justify-center">
            <TabsTrigger
              value="feed"
              className="flex-1 sm:flex-none rounded-lg data-[state=active]:shadow-sm text-xs sm:text-sm py-2 px-3 sm:px-6"
            >
              Feed
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="flex-1 sm:flex-none rounded-lg data-[state=active]:shadow-sm text-xs sm:text-sm py-2 px-3 sm:px-6 gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Chat
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="flex-1 sm:flex-none rounded-lg data-[state=active]:shadow-sm text-xs sm:text-sm py-2 px-3 sm:px-6"
            >
              Eventos
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="flex-1 sm:flex-none rounded-lg data-[state=active]:shadow-sm text-xs sm:text-sm py-2 px-3 sm:px-6"
            >
              Membros
            </TabsTrigger>
            {isCreator && (
              <TabsTrigger
                value="admin"
                className="flex-1 sm:flex-none rounded-lg data-[state=active]:shadow-sm text-xs sm:text-sm py-2 px-3 sm:px-6 gap-1.5 text-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <Shield className="w-4 h-4" /> Admin
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="feed" className="mt-6">
            <TribeFeedTab />
          </TabsContent>
          <TabsContent value="chat" className="mt-6">
            <TribeChatTab tribe={tribe} />
          </TabsContent>
          <TabsContent value="events" className="mt-6">
            <TribeEventsTab tribe={tribe} />
          </TabsContent>
          <TabsContent value="members" className="mt-6">
            <div className="py-12 text-center text-muted-foreground bg-secondary/20 rounded-2xl border border-border border-dashed">
              <Users className="w-10 h-10 mx-auto text-muted-foreground/50 mb-3" />
              <p className="font-medium">Lista de membros completa em breve.</p>
            </div>
          </TabsContent>
          {isCreator && (
            <TabsContent value="admin" className="mt-6">
              <TribeAdminTab tribe={tribe} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
}
