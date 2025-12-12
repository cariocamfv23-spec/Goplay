import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { mockJobs } from '@/lib/data'
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  DollarSign,
  MessageCircle,
  Building2,
  CheckCircle2,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

const JobDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const job = mockJobs.find((j) => j.id === id)

  if (!job) {
    return <div>Vaga não encontrada</div>
  }

  const handleApply = () => {
    toast.success('Candidatura enviada com sucesso!')
    navigate('/jobs')
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="h-40 bg-gradient-to-r from-primary to-purple-800 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 text-white hover:bg-white/10 rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="px-4 -mt-16 relative">
        <Card className="border-none shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="h-20 w-20 bg-background rounded-xl shadow-md p-2 flex items-center justify-center mb-4 border border-border">
              <Building2 className="h-10 w-10 text-primary" />
            </div>

            <h1 className="text-2xl font-bold mb-1">{job.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-base font-medium">{job.company}</span>
              <Badge variant="secondary" className="text-xs">
                {job.type}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-secondary/30 p-3 rounded-xl flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">
                  <p className="text-muted-foreground text-xs">Local</p>
                  <p className="font-medium truncate">{job.location}</p>
                </div>
              </div>
              <div className="bg-secondary/30 p-3 rounded-xl flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">
                  <p className="text-muted-foreground text-xs">Salário</p>
                  <p className="font-medium truncate">{job.salary}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-2 text-lg">Descrição</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div>
                <h3 className="font-bold mb-2 text-lg">Requisitos</h3>
                <ul className="space-y-2">
                  {job.requirements.map((req, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 grid gap-3">
              <Button
                className="w-full h-12 rounded-full text-base font-semibold"
                onClick={handleApply}
              >
                Candidatar-se
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 rounded-full border-primary text-primary hover:bg-primary/5 gap-2"
                onClick={() => navigate(`/messages/job-${job.id}`)}
              >
                <MessageCircle className="h-5 w-5" /> Falar com Recrutador
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default JobDetails
