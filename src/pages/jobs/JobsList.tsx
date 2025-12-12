import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Building2 } from 'lucide-react'

const JobsList = () => {
  const jobs = [
    {
      id: 1,
      title: 'Treinador Sub-15',
      company: 'Clube Atlético',
      location: 'São Paulo, SP',
      type: 'Presencial',
    },
    {
      id: 2,
      title: 'Fisioterapeuta Esportivo',
      company: 'Clinica Move',
      location: 'Rio de Janeiro, RJ',
      type: 'Presencial',
    },
    {
      id: 3,
      title: 'Analista de Desempenho',
      company: 'TechSports',
      location: 'Remoto',
      type: 'Remoto',
    },
  ]

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Vagas Recentes</h2>
        <Button variant="link">Ver todas</Button>
      </div>

      {jobs.map((job) => (
        <Card key={job.id} className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{job.title}</h3>
              <Badge variant="secondary">{job.type}</Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
              <Building2 className="h-4 w-4" /> {job.company}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
              <MapPin className="h-4 w-4" /> {job.location}
            </div>
            <Button className="w-full rounded-full" variant="outline">
              Ver Detalhes
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default JobsList
