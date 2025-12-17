import { useParams, useNavigate } from 'react-router-dom'
import { mockScholarships } from '@/lib/data'
import {
  ArrowLeft,
  MapPin,
  Calendar,
  CheckCircle2,
  FileText,
  Home,
  ShieldCheck,
  Building2,
  Unlock,
  AlertCircle,
  Trophy,
  Send,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PaymentDialog } from '@/components/PaymentDialog'
import { toast } from 'sonner'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export default function ScholarshipDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const scholarship = mockScholarships.find((s) => s.id === id)
  const [unlocked, setUnlocked] = useState(false)
  const [isApplied, setIsApplied] = useState(false)

  useEffect(() => {
    // Check if applied
    if (id) {
      const applied = localStorage.getItem(`applied_scholarship_${id}`)
      if (applied) {
        setIsApplied(true)
      }
    }
  }, [id])

  if (!scholarship) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-muted-foreground">
        <p>Bolsa não encontrada.</p>
        <Button variant="link" onClick={() => navigate(-1)}>
          Voltar
        </Button>
      </div>
    )
  }

  const handleUnlock = () => {
    setUnlocked(true)
    toast.success('Acesso liberado!', {
      description: 'Você agora tem acesso total aos candidatos desta bolsa.',
    })
  }

  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in relative">
      {/* Hero Image */}
      <div className="h-64 relative w-full">
        <img
          src={scholarship.image}
          alt={scholarship.university}
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
            <div className="bg-white p-2 rounded-xl shadow-sm border border-border/20">
              <img
                src={scholarship.logo}
                alt="Logo"
                className="w-12 h-12 object-contain"
              />
            </div>
            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none text-xs px-3 py-1">
              {scholarship.value}% Off
            </Badge>
          </div>

          <h1 className="text-2xl font-bold leading-tight mb-1">
            {scholarship.university}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 text-primary" />
            {scholarship.city}, {scholarship.country}
            {scholarship.neighborhood && (
              <span className="text-xs bg-secondary px-1.5 py-0.5 rounded">
                {scholarship.neighborhood}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary/30 p-2.5 rounded-xl border border-border/40">
              <span className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider block mb-1">
                Esporte
              </span>
              <div className="flex items-center gap-1.5 font-semibold text-sm">
                <Trophy className="h-3.5 w-3.5 text-gold" />
                {scholarship.sport}
              </div>
            </div>
            <div className="bg-secondary/30 p-2.5 rounded-xl border border-border/40">
              <span className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider block mb-1">
                Deadline
              </span>
              <div className="flex items-center gap-1.5 font-semibold text-sm">
                <Calendar className="h-3.5 w-3.5 text-red-500" />
                {scholarship.deadline}
              </div>
            </div>
          </div>
        </div>

        {/* Details Sections */}
        <div className="space-y-6">
          <section>
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" /> Hospedagem
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed bg-secondary/20 p-4 rounded-xl border border-border/40">
              {scholarship.accommodation}
            </p>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" /> Documentação
            </h3>
            <div className="bg-secondary/20 p-4 rounded-xl border border-border/40">
              <ul className="text-sm text-muted-foreground space-y-2">
                {scholarship.documentation.split(',').map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{item.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> Processo da Bolsa
            </h3>
            <div className="bg-secondary/20 p-4 rounded-xl border border-border/40">
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium flex-wrap">
                {scholarship.process.split('>').map((step, i, arr) => (
                  <div key={i} className="contents">
                    <span className="text-center">{step.trim()}</span>
                    {i < arr.length - 1 && (
                      <span className="text-muted-foreground/30 mx-1">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Institution Area - Unlock Match */}
        <div className="mt-8 mb-6">
          <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-5">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Building2 className="w-24 h-24 text-primary" />
            </div>

            <div className="relative z-10">
              <h3 className="font-bold text-lg text-primary mb-1 flex items-center gap-2">
                <Building2 className="h-5 w-5" /> Área da Instituição
              </h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-[90%]">
                É recrutador desta universidade? Libere o acesso completo aos
                perfis dos atletas candidatos e inicie o processo de seleção.
              </p>

              {unlocked ? (
                <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 p-4 rounded-xl flex items-center gap-3 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="h-6 w-6 shrink-0" />
                  <div>
                    <p className="font-bold text-sm">Acesso Liberado</p>
                    <p className="text-xs opacity-90">
                      Você pode visualizar todos os candidatos na aba de gestão.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg border border-amber-100 dark:border-amber-900/30">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>
                      Taxa única de liberação: R$ {scholarship.fee.toFixed(2)}
                    </span>
                  </div>
                  <PaymentDialog
                    title="Unlock Full Match"
                    price={scholarship.fee}
                    onSuccess={handleUnlock}
                  >
                    <Button className="w-full font-bold shadow-lg shadow-primary/20 h-12">
                      <Unlock className="w-4 h-4 mr-2" /> Liberar Match Completo
                    </Button>
                  </PaymentDialog>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action for Athletes */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-border/50 z-20 pb-safe">
        <Button
          size="lg"
          className={cn(
            'w-full font-bold h-12 text-base rounded-xl transition-all',
            isApplied
              ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              : 'bg-primary hover:bg-primary/90 text-primary-foreground',
          )}
          onClick={() => {
            if (!isApplied) {
              navigate(`/explore/scholarships/${id}/apply`)
            }
          }}
          disabled={isApplied}
        >
          {isApplied ? (
            <>
              <CheckCircle2 className="mr-2 h-5 w-5 text-emerald-500" />
              Candidatura Enviada
            </>
          ) : (
            <>
              Aplicar para esta Bolsa <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
