import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowLeft,
  ShieldCheck,
  QrCode,
  Globe,
  Share2,
  Trophy,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockProfiles, mockPassport } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export default function SportsPassport() {
  const navigate = useNavigate()
  const profile = mockProfiles[0]

  return (
    <div className="min-h-screen bg-black text-white pb-20 animate-fade-in">
      <div className="p-4 flex items-center gap-4 bg-transparent sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="hover:bg-white/10 text-white rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold">Passaporte Esportivo</h1>
      </div>

      <div className="p-4 flex flex-col items-center gap-8">
        <div className="perspective-1000 w-full max-w-sm group">
          <div className="relative w-full aspect-[1.586/1] transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
            {/* Front of Card */}
            <Card className="absolute inset-0 w-full h-full rounded-2xl border-none shadow-2xl bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-white/10 overflow-hidden backface-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />

              <CardContent className="h-full relative z-10 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-gold" />
                    <span className="font-bold tracking-widest text-sm text-gold">
                      GOPLAY PASSPORT
                    </span>
                  </div>
                  <Badge className="bg-white/10 hover:bg-white/20 text-white border-none">
                    {mockPassport.category}
                  </Badge>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-2 border-gold shadow-lg">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback>EU</AvatarFallback>
                    </Avatar>
                    {mockPassport.verified && (
                      <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1 border-2 border-black">
                        <ShieldCheck className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold uppercase tracking-wide">
                      {profile.name}
                    </h2>
                    <p className="text-sm text-zinc-400">
                      ID: {mockPassport.idNumber}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Globe className="h-3 w-3 text-zinc-500" />
                      <span className="text-xs text-zinc-300">
                        {mockPassport.nationality}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex gap-4">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase block">
                        Membro Desde
                      </span>
                      <span className="text-sm font-semibold">
                        {mockPassport.since}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase block">
                        Validade
                      </span>
                      <span className="text-sm font-semibold">
                        {mockPassport.expiry}
                      </span>
                    </div>
                  </div>
                  <QrCode className="h-10 w-10 text-white/80" />
                </div>
              </CardContent>
            </Card>

            {/* Back of Card (Simulated for this demo as separate view if not 3D flipping fully) */}
          </div>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Trophy className="h-8 w-8 text-gold mb-2" />
                <span className="text-2xl font-bold text-white">12</span>
                <span className="text-xs text-zinc-400">Conquistas</span>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Star className="h-8 w-8 text-primary mb-2" />
                <span className="text-2xl font-bold text-white">
                  {profile.rating}
                </span>
                <span className="text-xs text-zinc-400">Rating Geral</span>
              </CardContent>
            </Card>
          </div>

          <Button className="w-full h-12 rounded-full bg-gold text-black hover:bg-yellow-500 font-bold shadow-lg shadow-gold/20">
            <Share2 className="mr-2 h-4 w-4" /> Compartilhar Passaporte
          </Button>

          <p className="text-center text-xs text-zinc-500 px-8">
            Este é um documento digital oficial verificado pela Goplay Sports
            Association.
          </p>
        </div>
      </div>
    </div>
  )
}
