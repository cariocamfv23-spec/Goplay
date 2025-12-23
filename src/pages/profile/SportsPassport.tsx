import { Button } from '@/components/ui/button'
import { ArrowLeft, Share2, Wallet, Download, QrCode } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PassportCard } from '@/components/passport/PassportCard'
import { CompetitionHistory } from '@/components/passport/CompetitionHistory'
import { Certifications } from '@/components/passport/Certifications'
import { GoalsTracker } from '@/components/passport/GoalsTracker'
import { EventLinkDialog } from '@/components/passport/EventLinkDialog'
import { useState } from 'react'
import { ShareDialog } from '@/components/ShareDialog'
import { mockCurrentUser } from '@/lib/data'

export default function SportsPassport() {
  const navigate = useNavigate()
  const [isEventLinkOpen, setIsEventLinkOpen] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col pb-6">
      <div className="p-4 flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-bold text-lg leading-none">
              Passaporte Esportivo
            </h1>
            <p className="text-xs text-muted-foreground">ID Digital & CV</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary"
          onClick={() => setIsShareOpen(true)}
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 p-4">
        <Tabs defaultValue="digital" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="digital">ID Digital</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="certs">Certif.</TabsTrigger>
            <TabsTrigger value="goals">Metas</TabsTrigger>
          </TabsList>

          <TabsContent value="digital" className="space-y-6 animate-fade-in">
            <PassportCard />

            <div className="grid gap-3 max-w-sm mx-auto">
              <Button
                className="w-full font-bold shadow-lg"
                size="lg"
                onClick={() => setIsEventLinkOpen(true)}
              >
                <QrCode className="mr-2 h-5 w-5" />
                Validar em Evento
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  PDF
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-black text-white hover:bg-black/90 hover:text-white border-black"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Wallet
                </Button>
              </div>
            </div>

            <div className="text-center space-y-2 mt-8">
              <p className="text-xs text-muted-foreground">
                Este documento digital é pessoal e intransferível.
              </p>
              <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">
                ID: {mockCurrentUser.id.toUpperCase()}-GOPLAY-VERIFIED
              </p>
            </div>
          </TabsContent>

          <TabsContent value="history" className="animate-fade-in">
            <CompetitionHistory />
          </TabsContent>

          <TabsContent value="certs" className="animate-fade-in">
            <Certifications />
          </TabsContent>

          <TabsContent value="goals" className="animate-fade-in">
            <GoalsTracker />
          </TabsContent>
        </Tabs>
      </div>

      <EventLinkDialog
        open={isEventLinkOpen}
        onOpenChange={setIsEventLinkOpen}
      />
      <ShareDialog
        open={isShareOpen}
        onOpenChange={setIsShareOpen}
        title={`Passaporte de ${mockCurrentUser.name}`}
        description="Confira meu currículo esportivo oficial no Goplay!"
      />
    </div>
  )
}
