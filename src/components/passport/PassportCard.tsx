import { Button } from '@/components/ui/button'
import { mockPassport, mockCurrentUser } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Logo } from '@/components/Logo'
import { Globe, ShieldCheck, QrCode } from 'lucide-react'

export function PassportCard() {
  const user = mockCurrentUser

  return (
    <div className="w-full max-w-sm aspect-[1.58/1] relative perspective-1000 group cursor-pointer mx-auto">
      <div className="relative w-full h-full transition-transform duration-700 transform-style-3d hover:rotate-y-180">
        {/* Front Side */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-black rounded-2xl shadow-2xl p-6 text-white overflow-hidden border border-white/10 backface-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-cover" />

          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <Logo variant="full" className="text-white brightness-200" />
              <Globe className="h-8 w-8 text-white/50" />
            </div>

            <div className="flex gap-4 items-center">
              <Avatar className="h-20 w-20 border-2 border-white/30 rounded-lg">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="text-[10px] text-white/60 uppercase tracking-widest">
                  {user.type === 'athlete' ? 'Atleta' : user.role}
                </div>
                <h2 className="text-lg font-bold">{user.name}</h2>
                <div className="text-xs text-gold flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> Verificado
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="text-white/50">ID Goplay</div>
                <div className="font-mono">{mockPassport.idNumber}</div>
              </div>
              <div className="text-right">
                <div className="text-white/50">Validade</div>
                <div>{mockPassport.expiry}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side (QR Code) */}
        <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center justify-center backface-hidden rotate-y-180 border border-border">
          <QrCode className="h-32 w-32 text-black mb-4" />
          <p className="text-xs text-center text-muted-foreground">
            Escaneie para validar o perfil do atleta em competições oficiais.
          </p>
          <div className="mt-4 text-xs font-mono text-zinc-400">
            {mockPassport.idNumber}
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-4 animate-pulse">
        Toque para virar
      </p>
    </div>
  )
}
