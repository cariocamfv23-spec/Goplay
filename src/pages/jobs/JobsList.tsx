import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Building2, ChevronRight, Bookmark } from 'lucide-react'
import { mockJobs } from '@/lib/data'
import { useNavigate } from 'react-router-dom'

const JobsList = () => {
  const navigate = useNavigate()

  return (
    <div className="pb-24 bg-background min-h-screen">
      <div className="p-4 sticky top-14 z-20 bg-background/95 backdrop-blur border-b border-border/50">
        <h1 className="text-2xl font-bold">Vagas</h1>
        <p className="text-sm text-muted-foreground">
          Encontre sua próxima oportunidade no esporte
        </p>
      </div>

      <div className="p-4 space-y-6">
        {/* Recruiter Access CTA */}
        <Card className="bg-gradient-to-r from-primary to-purple-800 text-white border-none shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
          <CardContent className="p-5 flex items-center justify-between relative z-10">
            <div>
              <h3 className="font-bold text-lg mb-1">Para Empresas</h3>
              <p className="text-xs text-white/80 max-w-[200px]">
                Publique vagas e encontre os melhores talentos esportivos.
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/jobs/dashboard')}
              className="text-primary font-bold shadow-lg"
            >
              Acessar
            </Button>
          </CardContent>
        </Card>

        {/* Jobs List */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-lg">Recomendadas para você</h2>
            <span className="text-xs text-primary font-medium cursor-pointer">
              Filtros
            </span>
          </div>
          <div className="space-y-3">
            {mockJobs.map((job) => (
              <Card
                key={job.id}
                className="border border-border/50 shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
                onClick={() => navigate(`/jobs/${job.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-3">
                      {job.companyLogo ? (
                        <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center overflow-hidden shrink-0">
                          <img
                            src={job.companyLogo}
                            alt={job.company}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                          <Building2 className="h-5 w-5" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-base leading-tight">
                          {job.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {job.company}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary -mt-1 -mr-2"
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className="font-normal">
                      {job.type}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="font-normal text-muted-foreground flex items-center gap-1"
                    >
                      <MapPin className="h-3 w-3" /> {job.location}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="font-normal text-green-600 bg-green-500/10"
                    >
                      {job.salary}
                    </Badge>
                  </div>

                  <div className="flex items-center text-xs text-muted-foreground pt-3 border-t border-border/50 justify-between">
                    <span>Publicada há 2 dias</span>
                    <div className="flex items-center text-primary font-medium">
                      Ver detalhes <ChevronRight className="h-3 w-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobsList
