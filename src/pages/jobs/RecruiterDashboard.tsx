import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockJobs } from '@/lib/data'
import { ArrowLeft, Briefcase, Plus, Users, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export default function RecruiterDashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 border-b flex items-center gap-4 bg-background sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold">Painel do Recrutador</h1>
      </div>

      <div className="p-4">
        <Button className="w-full mb-6 gap-2 rounded-full">
          <Plus className="h-4 w-4" /> Criar Nova Vaga
        </Button>

        <Tabs defaultValue="jobs">
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="jobs">Minhas Vagas</TabsTrigger>
            <TabsTrigger value="applications">Candidaturas</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-4">
            {mockJobs.slice(0, 2).map((job) => (
              <Card key={job.id} className="border-none shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{job.title}</h3>
                    <Badge
                      variant="outline"
                      className="bg-green-500/10 text-green-600 border-green-200"
                    >
                      Ativa
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground mt-4 pt-4 border-t">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" /> 124 views
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" /> 18 inscritos
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="border-none shadow-sm">
                <CardContent className="p-4 flex gap-4 items-center">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`https://img.usecurling.com/ppl/thumbnail?gender=male&seed=${i + 10}`}
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">Candidato {i + 1}</h4>
                    <p className="text-xs text-muted-foreground">
                      Treinador Sub-15
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Perfil
                    </Button>
                    <Button size="sm">Chat</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
