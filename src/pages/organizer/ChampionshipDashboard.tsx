import { useParams, useNavigate } from 'react-router-dom'
import { useChampionshipStore } from '@/stores/useChampionshipStore'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Share2 } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { OverviewTab } from '@/components/organizer/OverviewTab'
import { RegistrationsTab } from '@/components/organizer/RegistrationsTab'
import { CalendarTab } from '@/components/organizer/CalendarTab'
import { ResultsTab } from '@/components/organizer/ResultsTab'
import { RulesTab } from '@/components/organizer/RulesTab'
import { Badge } from '@/components/ui/badge'

export default function ChampionshipDashboard() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { championships } = useChampionshipStore()
  const championship = championships.find((c) => c.id === id)

  if (!championship) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p>Campeonato não encontrado.</p>
        <Button onClick={() => navigate('/organizer')}>Voltar</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in pb-20">
      <div className="bg-primary/5 border-b border-border/50 pb-4">
        <div className="p-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-bold text-lg truncate max-w-[200px]">
            Painel do Organizador
          </h1>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
        <div className="px-6 pb-2">
          <h2 className="text-2xl font-bold leading-tight mb-1">
            {championship.name}
          </h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-background">
              {championship.modality}
            </Badge>
            <Badge className="capitalize">{championship.status}</Badge>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full h-auto flex flex-wrap justify-start gap-1 bg-transparent p-0 mb-6">
            <TabsTrigger
              value="overview"
              className="rounded-full border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Visão Geral
            </TabsTrigger>
            <TabsTrigger
              value="registrations"
              className="rounded-full border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Inscrições
            </TabsTrigger>
            <TabsTrigger
              value="calendar"
              className="rounded-full border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Calendário
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="rounded-full border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Resultados
            </TabsTrigger>
            <TabsTrigger
              value="rules"
              className="rounded-full border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Regulamento
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab championship={championship} />
          </TabsContent>
          <TabsContent value="registrations">
            <RegistrationsTab championship={championship} />
          </TabsContent>
          <TabsContent value="calendar">
            <CalendarTab championship={championship} />
          </TabsContent>
          <TabsContent value="results">
            <ResultsTab championship={championship} />
          </TabsContent>
          <TabsContent value="rules">
            <RulesTab championship={championship} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
