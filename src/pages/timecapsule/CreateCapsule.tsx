import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTimeCapsuleStore } from '@/stores/useTimeCapsuleStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Video, FileText, Lock, Calendar } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function CreateCapsule() {
  const navigate = useNavigate()
  const { addCapsule } = useTimeCapsuleStore()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<'video' | 'text'>('text')
  const [content, setContent] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [openPeriod, setOpenPeriod] = useState('6') // months
  const [customDate, setCustomDate] = useState('')
  const [isSealing, setIsSealing] = useState(false)
  const [sealProgress, setSealProgress] = useState(0)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const calculateOpenDate = (months: number) => {
    const d = new Date()
    d.setMonth(d.getMonth() + months)
    return d.toISOString()
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('video/')) {
        toast.error('Selecione um arquivo de vídeo válido.')
        return
      }
      setVideoFile(file)
    }
  }

  const handleSubmit = () => {
    if (!title || !description) {
      toast.error('Preencha o título e a descrição.')
      return
    }

    if (type === 'text' && !content) {
      toast.error('Escreva sua mensagem.')
      return
    }

    if (type === 'video' && !videoFile) {
      toast.error('Anexe o vídeo da sua cápsula.')
      return
    }

    if (openPeriod === 'custom' && !customDate) {
      toast.error('Selecione a data de abertura.')
      return
    }

    const finalOpenDate =
      openPeriod === 'custom'
        ? new Date(customDate).toISOString()
        : calculateOpenDate(Number(openPeriod))

    setIsSealing(true)
  }

  useEffect(() => {
    if (isSealing) {
      const interval = setInterval(() => {
        setSealProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 2
        })
      }, 40) // 2s total animation
      return () => clearInterval(interval)
    }
  }, [isSealing])

  useEffect(() => {
    if (sealProgress >= 100) {
      setTimeout(() => {
        const finalOpenDate =
          openPeriod === 'custom'
            ? new Date(customDate).toISOString()
            : calculateOpenDate(Number(openPeriod))

        addCapsule({
          title,
          description,
          type,
          content:
            type === 'video'
              ? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' // mock URL
              : content,
          openAt: finalOpenDate,
        })
        navigate('/timecapsule')
      }, 500)
    }
  }, [sealProgress])

  const today = new Date().toISOString().split('T')[0]

  if (isSealing) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden">
        {/* Cyberpunk grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] opacity-20" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gold blur-3xl opacity-30 animate-pulse" />
            <Lock
              className="w-32 h-32 text-gold animate-[bounce_1s_ease-in-out_infinite]"
              strokeWidth={1.5}
            />
          </div>

          <div className="mt-8 space-y-2 text-center">
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200 uppercase tracking-widest">
              Selando Cápsula
            </h2>
            <p className="text-gold/60 font-mono text-sm">
              Criptografia AES-256 ativada...
            </p>
            {/* Progress bar */}
            <div className="w-64 h-2 bg-white/10 rounded-full mt-4 overflow-hidden relative">
              <div
                className="absolute top-0 left-0 bottom-0 bg-gold transition-all duration-[40ms]"
                style={{ width: `${sealProgress}%` }}
              />
            </div>
            <p className="text-xs text-gold/40 mt-2 font-mono">
              {sealProgress}%
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in relative">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-20 p-4 border-b border-border/50 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="font-bold text-lg text-primary">Nova Time Capsule</h1>
          <p className="text-xs text-muted-foreground">
            Registre sua promessa para o futuro
          </p>
        </div>
      </div>

      <div className="p-4 max-w-xl mx-auto space-y-6">
        <Card className="bg-primary/5 border-primary/20 shadow-none">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>Título da meta</Label>
              <Input
                placeholder="Ex: Ser convocado para a seleção"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-background"
                maxLength={60}
              />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Input
                placeholder="Resumo do objetivo..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-background"
                maxLength={100}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Label>Formato do Registro</Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={type === 'text' ? 'default' : 'outline'}
              className={cn(
                'h-12 border-2',
                type === 'text' && 'bg-primary border-primary text-white',
              )}
              onClick={() => setType('text')}
            >
              <FileText className="mr-2 h-5 w-5" /> Texto
            </Button>
            <Button
              variant={type === 'video' ? 'default' : 'outline'}
              className={cn(
                'h-12 border-2',
                type === 'video' && 'bg-primary border-primary text-white',
              )}
              onClick={() => setType('video')}
            >
              <Video className="mr-2 h-5 w-5" /> Vídeo
            </Button>
          </div>
        </div>

        {type === 'text' ? (
          <div className="space-y-2 animate-in fade-in">
            <div className="flex justify-between">
              <Label>Sua Mensagem</Label>
              <span
                className={cn(
                  'text-xs',
                  content.length >= 500
                    ? 'text-red-500 font-bold'
                    : 'text-muted-foreground',
                )}
              >
                {content.length}/500
              </span>
            </div>
            <Textarea
              placeholder="Escreva sua promessa detalhada aqui..."
              className="min-h-[150px] resize-none bg-background/50"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={500}
            />
          </div>
        ) : (
          <div className="space-y-2 animate-in fade-in">
            <Label>Gravar/Anexar Vídeo (Máx. 2 minutos)</Label>
            <div
              className={cn(
                'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors',
                videoFile
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 hover:bg-secondary/50',
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="video/*"
                onChange={handleVideoChange}
              />
              <Video
                className={cn(
                  'w-10 h-10 mx-auto mb-3',
                  videoFile ? 'text-primary' : 'text-muted-foreground/50',
                )}
              />
              {videoFile ? (
                <div>
                  <p className="font-bold text-primary">{videoFile.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Toque para trocar
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-foreground">
                    Toque para selecionar
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    MP4, MOV (Máx 50MB)
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-3 pt-2">
          <Label className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gold" /> Quando você quer abrir?
          </Label>
          <Select value={openPeriod} onValueChange={setOpenPeriod}>
            <SelectTrigger className="h-12 bg-background border-2 border-border/50 font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">Em 6 meses</SelectItem>
              <SelectItem value="12">Em 1 ano</SelectItem>
              <SelectItem value="24">Em 2 anos</SelectItem>
              <SelectItem value="36">Em 3 anos</SelectItem>
              <SelectItem value="60">Em 5 anos</SelectItem>
              <SelectItem value="custom">Data personalizada</SelectItem>
            </SelectContent>
          </Select>

          {openPeriod === 'custom' && (
            <div className="pt-2 animate-in slide-in-from-top-2">
              <Input
                type="date"
                className="h-12 bg-background"
                min={today}
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="pt-8">
          <Button
            className="w-full h-14 bg-gradient-to-r from-gold to-yellow-500 hover:from-gold hover:to-yellow-400 text-black font-black text-lg shadow-[0_0_20px_rgba(255,215,0,0.3)] border border-yellow-300 gap-2"
            onClick={handleSubmit}
          >
            <Lock className="w-5 h-5" />
            SELAR CÁPSULA
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Aviso: Uma vez selada, o conteúdo não poderá ser editado ou apagado.
          </p>
        </div>
      </div>
    </div>
  )
}
