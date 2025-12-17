import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockScholarships, mockCurrentUser } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ArrowLeft,
  Upload,
  CheckCircle2,
  Loader2,
  Paperclip,
  FileText,
  X,
  Building2,
} from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'

export default function ScholarshipApplication() {
  const { id } = useParams()
  const navigate = useNavigate()
  const scholarship = mockScholarships.find((s) => s.id === id)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: mockCurrentUser.name,
    email: 'alex.silva@email.com',
    gpa: '',
    statement: '',
  })
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)
  }, [])

  if (!scholarship) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-muted-foreground p-4 text-center">
        <p className="mb-4">Bolsa não encontrada.</p>
        <Button onClick={() => navigate('/explore/scholarships')}>
          Voltar
        </Button>
      </div>
    )
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)

      // Save application state locally
      localStorage.setItem(`applied_scholarship_${id}`, 'true')

      toast.success('Candidatura enviada com sucesso!', {
        description: `Sua aplicação para ${scholarship.university} foi recebida.`,
      })
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-6 shadow-sm animate-bounce">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">
          Aplicação Enviada!
        </h1>
        <p className="text-muted-foreground text-center mb-8 max-w-xs">
          Recebemos seus dados e documentos. A instituição entrará em contato em
          breve através do aplicativo.
        </p>

        <Card className="w-full max-w-sm mb-8 bg-secondary/20 border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              {scholarship.university}
            </CardTitle>
            <CardDescription>Status: Em Análise</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span>Candidatura #{Math.floor(Math.random() * 10000)}</span>
            </div>
          </CardContent>
        </Card>

        <Button
          className="w-full max-w-sm h-12 font-bold"
          onClick={() => navigate(`/explore/scholarships/${id}`)}
        >
          Voltar para Detalhes
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border/50">
        <div className="p-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="-ml-2 hover:bg-secondary/50 rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-bold text-lg leading-none">
              Aplicar para Bolsa
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {scholarship.university}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto space-y-6">
        {/* Info Card */}
        <div className="flex items-start gap-4 bg-primary/5 p-4 rounded-xl border border-primary/10">
          <img
            src={scholarship.logo}
            alt={scholarship.university}
            className="w-12 h-12 object-contain bg-white rounded-lg p-1 shadow-sm"
          />
          <div>
            <h3 className="font-bold">{scholarship.university}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs font-normal">
                {scholarship.sport}
              </Badge>
              <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none text-xs">
                {scholarship.value}% Off
              </Badge>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome Completo</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
                placeholder="Seu nome completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email de Contato</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                placeholder="seu@email.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gpa">Média Escolar / GPA</Label>
                <Input
                  id="gpa"
                  value={formData.gpa}
                  onChange={(e) =>
                    setFormData({ ...formData, gpa: e.target.value })
                  }
                  required
                  placeholder="Ex: 8.5 ou 3.8"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sat">Nota ENEM / SAT (Opcional)</Label>
                <Input id="sat" placeholder="Ex: 750 ou 1200" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="statement">Carta de Motivação</Label>
              <Textarea
                id="statement"
                value={formData.statement}
                onChange={(e) =>
                  setFormData({ ...formData, statement: e.target.value })
                }
                required
                placeholder="Por que você merece esta bolsa? Descreva seus objetivos acadêmicos e esportivos..."
                className="min-h-[150px] resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">
                {formData.statement.length}/500 caracteres
              </p>
            </div>

            <div className="space-y-2">
              <Label>Documentos (Histórico, Cartas, Vídeos)</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:bg-secondary/20 transition-colors">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="mb-2"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Selecionar Arquivos
                </Button>
                <p className="text-xs text-muted-foreground">
                  PDF, JPG ou MP4 (Máx. 10MB)
                </p>
              </div>

              {files.length > 0 && (
                <div className="space-y-2 mt-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-secondary/30 p-2 rounded-md text-sm border border-border/50"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Paperclip className="h-3 w-3 shrink-0" />
                        <span className="truncate max-w-[200px]">
                          {file.name}
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:text-destructive"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Candidatura'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
