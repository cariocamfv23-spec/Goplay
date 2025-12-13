import { useParams, useNavigate } from 'react-router-dom'
import { mockJobs } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Briefcase } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function JobDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const job = mockJobs.find((j) => j.id === id) || mockJobs[0]

  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in">
      <div className="sticky top-0 bg-background z-20 p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-bold text-lg">Detalhes da Vaga</h1>
      </div>
      <div className="p-5">
        <div className="text-center mb-6">
          <Avatar className="h-20 w-20 mx-auto mb-3 rounded-xl">
            <AvatarImage src={job.image} />
            <AvatarFallback>{job.company[0]}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold mb-1">{job.title}</h2>
          <p className="text-muted-foreground">
            {job.company} • {job.location}
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-lg mb-2">Sobre a vaga</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {job.description}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Salário</h3>
            <p className="text-primary font-bold">{job.salary}</p>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border/50">
        <Button size="lg" className="w-full rounded-full font-bold">
          <Briefcase className="mr-2 h-5 w-5" /> Candidatar-se
        </Button>
      </div>
    </div>
  )
}
