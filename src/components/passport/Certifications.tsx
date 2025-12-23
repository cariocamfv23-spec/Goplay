import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Plus, FileText, Trash2 } from 'lucide-react'
import { usePassportStore } from '@/stores/usePassportStore'
import { toast } from 'sonner'

export function Certifications() {
  const { certifications, removeCertification } = usePassportStore()

  const handleDelete = (id: string) => {
    removeCertification(id)
    toast.success('Certificação removida.')
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h3 className="font-bold text-lg">Certificações</h3>
        <Button size="sm" variant="outline" className="h-8 gap-1">
          <Plus className="h-3.5 w-3.5" /> Adicionar
        </Button>
      </div>

      <div className="space-y-3">
        {certifications.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-xl">
            Nenhuma certificação adicionada.
          </div>
        ) : (
          certifications.map((cert) => (
            <Card key={cert.id} className="border-none shadow-sm group">
              <CardContent className="p-4 flex items-start gap-3">
                <div className="h-10 w-10 bg-secondary rounded-lg flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-sm truncate pr-2">
                      {cert.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      {cert.verified && (
                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                      )}
                      <button
                        onClick={() => handleDelete(cert.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {cert.issuer}
                  </p>
                  <div className="flex flex-wrap gap-2 text-[10px]">
                    <Badge variant="secondary" className="font-normal">
                      Emitido: {cert.date}
                    </Badge>
                    {cert.expiry && (
                      <Badge variant="outline" className="font-normal">
                        Válido até: {cert.expiry}
                      </Badge>
                    )}
                    {cert.credentialId && (
                      <span className="text-muted-foreground self-center">
                        ID: {cert.credentialId}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
