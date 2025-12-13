import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Briefcase, MapPin } from 'lucide-react'
import { mockJobs } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export default function JobsList() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background z-20 p-4 border-b border-border/50">
        <h1 className="text-xl font-bold mb-4">Vagas no Esporte</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar vagas..."
            className="pl-9 bg-secondary border-none rounded-xl"
          />
        </div>
      </div>
      <div className="p-4 space-y-4">
        {mockJobs.map((job) => (
          <Card
            key={job.id}
            className="border-none shadow-md cursor-pointer"
            onClick={() => navigate(`/jobs/${job.id}`)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4 mb-3">
                <Avatar className="h-12 w-12 rounded-lg">
                  <AvatarImage src={job.image} />
                  <AvatarFallback>{job.company[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary">{job.type}</Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {job.location}
                </Badge>
              </div>
              <p className="text-sm font-medium text-green-600">{job.salary}</p>
              <p className="text-xs text-muted-foreground mt-2 text-right">
                {job.posted}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
