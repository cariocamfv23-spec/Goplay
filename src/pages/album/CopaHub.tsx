import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Trophy,
  Target,
  BookOpen,
  Gift,
  CalendarDays,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAlbumStore } from '@/stores/useAlbumStore'
import { mockStickers } from '@/lib/album-data'
import { mockCurrentUser } from '@/lib/data'

export default function CopaHub() {
  const navigate = useNavigate()
  const { collected } = useAlbumStore()

  const totalStickers = mockStickers?.length || 100
  const progressPercent =
    Math.round((collected.length / totalStickers) * 100) || 0

  const userScore = mockCurrentUser?.stats?.points || 2450

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24 relative overflow-hidden animate-fade-in">
      {/* Premium Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="https://img.usecurling.com/p/800/1200?q=soccer%20stadium%20night%20lights&color=green"
          className="w-full h-full object-cover opacity-20"
          alt="Stadium"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/80 to-[#0a0a0a]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[hsl(var(--gold))/0.15] rounded-full blur-[100px]" />
        <div className="absolute top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-safe-top px-4 pb-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/home')}
          className="text-white hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex flex-col items-center">
          <h1 className="text-sm font-black uppercase tracking-widest text-[hsl(var(--gold))] flex items-center gap-1.5">
            <Trophy className="w-4 h-4" /> Copa 26
          </h1>
        </div>
        <div className="w-10" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 px-6 pt-2 pb-8 flex flex-col items-center text-center">
        <div className="w-24 h-24 mb-4 rounded-3xl bg-gradient-to-br from-[hsl(var(--gold))] to-amber-700 p-0.5 shadow-[0_0_30px_hsl(var(--gold)/0.3)] hover:scale-105 transition-transform">
          <div className="w-full h-full bg-zinc-950 rounded-[22px] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/200/200?q=glitter&color=yellow')] opacity-20 mix-blend-overlay" />
            <BarChart3 className="w-10 h-10 text-[hsl(var(--gold))] drop-shadow-md relative z-10" />
          </div>
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2">
          Power Index
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--gold))] to-amber-200">
            Dashboard
          </span>
        </h2>
        <p className="text-zinc-400 text-sm max-w-[280px] mt-2 font-medium">
          Seu centro de inteligência e recompensas para a Copa do Mundo 2026.
        </p>
      </div>

      {/* Grid Menu */}
      <div className="relative z-10 px-4 space-y-4">
        {/* Primary Featured Card: Power Index Stats */}
        <Card
          onClick={() => navigate('/album/stats')}
          className="bg-zinc-900/60 border-zinc-800/50 backdrop-blur-xl p-5 rounded-3xl cursor-pointer hover:bg-zinc-800/80 transition-all border-l-4 border-l-[hsl(var(--gold))] shadow-lg group overflow-hidden relative"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-[hsl(var(--gold))/0.1] rounded-full blur-2xl group-hover:bg-[hsl(var(--gold))/0.2] transition-colors" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--gold))/0.1] flex items-center justify-center shrink-0 border border-[hsl(var(--gold))/0.2]">
              <img
                src="https://img.usecurling.com/i?q=analytics&color=gradient&shape=fill"
                className="w-8 h-8 opacity-90 drop-shadow-[0_0_8px_hsl(var(--gold)/0.5)]"
                alt="Analytics"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-lg text-white uppercase tracking-wider flex items-center gap-2">
                Estatísticas{' '}
                <Sparkles className="w-3.5 h-3.5 text-[hsl(var(--gold))]" />
              </h3>
              <p className="text-[11px] text-zinc-400 mt-0.5 leading-tight">
                Força das seleções e rankings.
              </p>
            </div>
            <div className="flex flex-col items-end mr-1">
              <span className="text-xl font-black text-[hsl(var(--gold))]">
                {userScore}
              </span>
              <span className="text-[9px] text-zinc-400 uppercase tracking-wider font-bold">
                Seu TPI
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-[hsl(var(--gold))] transition-colors shrink-0" />
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          {/* Sticker Album */}
          <Card
            onClick={() => navigate('/album/stickers')}
            className="bg-zinc-900/60 border-zinc-800/50 backdrop-blur-xl p-4 rounded-3xl cursor-pointer hover:bg-zinc-800/80 transition-all shadow-lg group relative overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                <BookOpen className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <div className="flex flex-col">
                  <h3 className="font-black text-sm text-white uppercase tracking-wider">
                    Álbum Virtual
                  </h3>
                  <p className="text-[10px] text-zinc-400 mt-1 leading-tight">
                    Colecione figurinhas.
                  </p>
                </div>
              </div>
            </div>
            {/* Progress Bar Mini */}
            <div className="mt-4">
              <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[9px] text-zinc-500 mt-1.5 font-bold uppercase tracking-wider">
                {progressPercent}% Concluído
              </p>
            </div>
          </Card>

          {/* Bolão */}
          <Card
            onClick={() => navigate('/album/stats')}
            className="bg-zinc-900/60 border-zinc-800/50 backdrop-blur-xl p-4 rounded-3xl cursor-pointer hover:bg-zinc-800/80 transition-all shadow-lg group relative overflow-hidden"
          >
            <div className="absolute top-3 right-3">
              <Badge className="bg-rose-500 text-white text-[9px] px-1.5 py-0 uppercase font-black animate-pulse">
                Ao Vivo
              </Badge>
            </div>
            <div className="flex flex-col gap-3 h-full justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20 group-hover:bg-rose-500/20 transition-colors mb-3">
                  <Target className="w-6 h-6 text-rose-500" />
                </div>
                <h3 className="font-black text-sm text-white uppercase tracking-wider">
                  Bolão Goplay
                </h3>
                <p className="text-[10px] text-zinc-400 mt-1 leading-tight">
                  Acerte placares e concorra.
                </p>
              </div>
              <p className="text-[9px] text-rose-400/80 mt-2 font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />{' '}
                Partidas Hoje
              </p>
            </div>
          </Card>

          {/* Vouchers & Rewards */}
          <Card
            onClick={() =>
              navigate('/marketplace?category=jerseys&redeem=true')
            }
            className="bg-zinc-900/60 border-zinc-800/50 backdrop-blur-xl p-4 rounded-3xl cursor-pointer hover:bg-zinc-800/80 transition-all shadow-lg group relative overflow-hidden"
          >
            <div className="absolute top-3 right-3">
              <Badge className="bg-[hsl(var(--gold))] text-black text-[9px] px-1.5 py-0 uppercase font-black">
                Prêmios
              </Badge>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[hsl(var(--gold))/0.1] flex items-center justify-center border border-[hsl(var(--gold))/0.2] group-hover:bg-[hsl(var(--gold))/0.2] transition-colors">
                <Gift className="w-6 h-6 text-[hsl(var(--gold))]" />
              </div>
              <div>
                <h3 className="font-black text-sm text-white uppercase tracking-wider">
                  Recompensas
                </h3>
                <p className="text-[10px] text-zinc-400 mt-1 leading-tight">
                  Resgate camisas oficiais.
                </p>
              </div>
            </div>
          </Card>

          {/* Match Schedule */}
          <Card
            onClick={() => navigate('/album/stats/table')}
            className="bg-zinc-900/60 border-zinc-800/50 backdrop-blur-xl p-4 rounded-3xl cursor-pointer hover:bg-zinc-800/80 transition-all shadow-lg group relative overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                <CalendarDays className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-black text-sm text-white uppercase tracking-wider">
                  Tabela
                </h3>
                <p className="text-[10px] text-zinc-400 mt-1 leading-tight">
                  Acompanhe todos confrontos.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
