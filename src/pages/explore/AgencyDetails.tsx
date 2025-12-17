import { useParams, useNavigate } from 'react-router-dom'
import { mockAgencies } from '@/lib/data'
import {
  ArrowLeft,
  MapPin,
  Globe,
  Mail,
  Phone,
  CheckCircle2,
  ExternalLink,
  Star,
  Plane,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export default function AgencyDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const agency = mockAgencies.find((a) => a.id === id)

  if (!agency) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-muted-foreground">
        <p>Agência não encontrada.</p>
        <Button variant="link" onClick={() => navigate(-1)}>
          Voltar
        </Button>
      </div>
    )
  }

  const handleContact = (type: 'website' | 'email' | 'phone' | 'whatsapp') => {
    switch (type) {
      case 'website':
        window.open(agency.website, '_blank')
        break
      case 'email':
        window.location.href = `mailto:${agency.email}`
        break
      case 'phone':
        window.location.href = `tel:${agency.phone}`
        break
      case 'whatsapp':
        // Mock whatsapp link
        toast.success('Redirecionando para o WhatsApp...')
        break
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in relative">
      {/* Hero Image */}
      <div className="h-64 relative w-full">
        <img
          src={agency.cover}
          alt={agency.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-black/20 text-white hover:bg-black/40 rounded-full backdrop-blur-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="px-5 -mt-12 relative z-10">
        {/* Header Card */}
        <div className="bg-card border border-border/50 shadow-lg rounded-2xl p-5 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-white p-2 rounded-xl shadow-sm border border-border/20 -mt-10">
              <img
                src={agency.logo}
                alt="Logo"
                className="w-16 h-16 object-contain rounded-lg"
              />
            </div>
            <Badge className="bg-sky-500 hover:bg-sky-600 text-white border-none text-xs px-3 py-1 gap-1">
              {agency.rating} <Star className="h-3 w-3 fill-current" />
            </Badge>
          </div>

          <h1 className="text-2xl font-bold leading-tight mb-1 flex items-center gap-2">
            {agency.name}
            <CheckCircle2 className="h-5 w-5 text-blue-500 fill-blue-100" />
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 text-primary" />
            {agency.location}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {agency.description}
          </p>
        </div>

        {/* Services Section */}
        <div className="space-y-6">
          <section>
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Plane className="h-5 w-5 text-primary" /> Serviços Oferecidos
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {agency.services.map((service, i) => (
                <div
                  key={i}
                  className="bg-secondary/30 p-3 rounded-xl border border-border/40 text-sm font-medium flex items-center gap-2"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="leading-tight">{service}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" /> Programas em Destaque
            </h3>
            <div className="space-y-3">
              {agency.programs.map((program, i) => (
                <div
                  key={i}
                  className="bg-card p-4 rounded-xl border border-border/50 shadow-sm"
                >
                  <h4 className="font-bold text-base mb-1 text-primary">
                    {program.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {program.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">Contato</h3>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                className="justify-start h-12 gap-3"
                onClick={() => handleContact('website')}
              >
                <ExternalLink className="h-5 w-5 text-muted-foreground" />
                <div className="flex flex-col items-start">
                  <span className="text-xs font-bold">Website Oficial</span>
                  <span className="text-[10px] text-muted-foreground truncate max-w-[200px]">
                    {agency.website}
                  </span>
                </div>
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="justify-start h-12 gap-3"
                  onClick={() => handleContact('email')}
                >
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-bold">Email</span>
                    <span className="text-[10px] text-muted-foreground">
                      Enviar mensagem
                    </span>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-12 gap-3"
                  onClick={() => handleContact('phone')}
                >
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-bold">Telefone</span>
                    <span className="text-[10px] text-muted-foreground">
                      Ligar agora
                    </span>
                  </div>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-border/50 z-20 pb-safe">
        <Button
          size="lg"
          className="w-full font-bold h-12 text-base rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/20"
          onClick={() => handleContact('whatsapp')}
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          Falar no WhatsApp
        </Button>
      </div>
    </div>
  )
}
