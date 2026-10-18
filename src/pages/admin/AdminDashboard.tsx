import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Search,
  Shield,
  Users,
  UserCheck,
  Calendar,
  Share2,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Eye,
  Activity,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Lock,
} from 'lucide-react'
import { format } from 'date-fns'
import { useAuth } from '@/hooks/use-auth'
import { analyticsService } from '@/services/analytics'
import { profileService, type ProfileRow } from '@/services/profiles'
import { supabase } from '@/lib/supabase/client'

export default function AdminDashboard() {
  const { user: authUser, profile: authProfile } = useAuth()
  const [periodDays, setPeriodDays] = useState<number>(30)
  const [metrics, setMetrics] = useState<any>(null)
  const [metricsLoading, setMetricsLoading] = useState(true)
  const [metricsError, setMetricsError] = useState<string | null>(null)

  const [realProfiles, setRealProfiles] = useState<ProfileRow[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [profilesLoading, setProfilesLoading] = useState(true)

  const isAdmin = Boolean(authProfile?.is_admin)

  // 1. Fetch Real Users from Supabase
  useEffect(() => {
    async function loadUsers() {
      setProfilesLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (data) {
        setRealProfiles(data as unknown as ProfileRow[])
      }
      setProfilesLoading(false)
    }

    loadUsers()
  }, [])

  // 2. Fetch Real MVP Beta Metrics
  useEffect(() => {
    async function loadMetrics() {
      if (!isAdmin) {
        setMetricsLoading(false)
        return
      }

      setMetricsLoading(true)
      setMetricsError(null)

      const { data, error } = await analyticsService.getMvpMetrics(periodDays)

      if (error) {
        setMetricsError(error.message)
      } else {
        setMetrics(data)
      }
      setMetricsLoading(false)
    }

    loadMetrics()
  }, [isAdmin, periodDays])

  const filteredUsers = realProfiles.filter((u) => {
    if (!searchQuery) return true
    const term = searchQuery.toLowerCase()
    return (
      (u.full_name || '').toLowerCase().includes(term) ||
      (u.sport || '').toLowerCase().includes(term) ||
      (u.city || '').toLowerCase().includes(term) ||
      (u.account_type || '').toLowerCase().includes(term)
    )
  })

  // Access control check
  if (!isAdmin) {
    return (
      <div className="container max-w-4xl mx-auto py-16 px-4 text-center min-h-[70vh] flex flex-col items-center justify-center">
        <div className="p-4 rounded-full bg-destructive/10 text-destructive mb-4">
          <Lock className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-bold mb-2">
          Acesso Restrito a Administradores
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mb-6">
          Esta área é reservada para a gestão de métricas do MVP Beta do Goplay
          App. Apenas usuários autenticados com permissão de administrador podem
          visualizar estes relatórios.
        </p>
        <div className="text-xs text-muted-foreground bg-secondary/50 p-3 rounded-lg border border-border/50 max-w-sm">
          Usuário atual:{' '}
          <strong>{authUser?.email || 'Visitante não logado'}</strong>
          <br />
          Para testes administrativos, utilize uma conta com privilégios de
          gestão.
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" /> Painel de Métricas MVP
              Beta
            </h1>
            <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
              Beta Real
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">
            Indicadores prioritários de tração, cadastros, inscrições e
            compartilhamentos no Supabase.
          </p>
        </div>

        {/* Period Filter Buttons */}
        <div className="flex items-center gap-2 bg-secondary/40 p-1.5 rounded-xl border border-border/50 self-start md:self-auto">
          <span className="text-xs text-muted-foreground font-semibold px-2">
            Período:
          </span>
          <Button
            size="sm"
            variant={periodDays === 7 ? 'default' : 'ghost'}
            className="h-8 text-xs font-semibold"
            onClick={() => setPeriodDays(7)}
          >
            Últimos 7 dias
          </Button>
          <Button
            size="sm"
            variant={periodDays === 30 ? 'default' : 'ghost'}
            className="h-8 text-xs font-semibold"
            onClick={() => setPeriodDays(30)}
          >
            Últimos 30 dias
          </Button>
        </div>
      </div>

      {/* Metrics Error Notice */}
      {metricsError && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>Erro ao carregar métricas analíticas: {metricsError}</span>
        </div>
      )}

      {/* Primary KPI Grid (Data real do banco) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up">
        <Card className="border-border/50 shadow-sm bg-card/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Total de Usuários
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metricsLoading
                ? '...'
                : (metrics?.totalUsers ?? realProfiles.length)}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {metrics?.totalAthletes ?? 0} atletas • {metrics?.totalClubs ?? 0}{' '}
              clubes • {metrics?.totalCoaches ?? 0} treinadores
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm bg-card/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Perfis Completos
            </CardTitle>
            <UserCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">
              {metricsLoading
                ? '...'
                : (metrics?.athletesWithCompleteProfile ?? 0)}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Atletas com modalidade, cidade e bio/experiência
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm bg-card/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Eventos / Peneiras
            </CardTitle>
            <Calendar className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metricsLoading ? '...' : (metrics?.totalEvents ?? 0)}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {metrics?.eventsInPeriod ?? 0} criados no período selecionado
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm bg-card/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Taxa de Conversão
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {metricsLoading
                ? '...'
                : `${(metrics?.conversionRate ?? 0).toFixed(1)}%`}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Inscrições concluídas / Inícios de inscrição
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics: Funil e Engajamento */}
      <div className="grid gap-4 md:grid-cols-3 animate-fade-in-up">
        {/* Funil de Inscrições */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" /> Funil de Inscrições
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-border/30">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" /> Visualizações de Eventos
              </span>
              <span className="font-bold text-foreground">
                {metricsLoading ? '...' : (metrics?.eventViewsCount ?? 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-border/30">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-amber-500" /> Inícios de
                Inscrição
              </span>
              <span className="font-bold text-foreground">
                {metricsLoading
                  ? '...'
                  : (metrics?.registrationsStartedCount ?? 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-border/30">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />{' '}
                Concluídas no Banco
              </span>
              <span className="font-bold text-emerald-500">
                {metricsLoading
                  ? '...'
                  : (metrics?.registrationsCompletedCount ?? 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-border/30">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" /> Aprovadas
                pelo Clube
              </span>
              <span className="font-bold text-blue-500">
                {metricsLoading
                  ? '...'
                  : (metrics?.registrationsApprovedCount ?? 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <XCircle className="h-3.5 w-3.5 text-destructive" /> Recusadas
                pelo Clube
              </span>
              <span className="font-bold text-destructive">
                {metricsLoading
                  ? '...'
                  : (metrics?.registrationsRejectedCount ?? 0)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Compartilhamento & Viralidade */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Share2 className="h-4 w-4 text-gold" /> Compartilhamentos (Web
              Share)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-border/30">
              <div>
                <span className="font-semibold block text-foreground">
                  Passaportes de Atleta
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Links públicos compartilhados
                </span>
              </div>
              <span className="font-bold text-lg text-primary">
                {metricsLoading ? '...' : (metrics?.profileSharesCount ?? 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/30">
              <div>
                <span className="font-semibold block text-foreground">
                  Eventos & Peneiras
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Links de eventos divulgados
                </span>
              </div>
              <span className="font-bold text-lg text-primary">
                {metricsLoading ? '...' : (metrics?.eventSharesCount ?? 0)}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed pt-1">
              * Registrado quando o usuário aciona o menu nativo do dispositivo
              ou copia o link oficial.
            </p>
          </CardContent>
        </Card>

        {/* Retenção & Usuários Ativos */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-indigo-500" /> Retenção no
              Período
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-border/30">
              <div>
                <span className="font-semibold block text-foreground">
                  Usuários Ativos
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Interagiram nos últimos {periodDays} dias
                </span>
              </div>
              <span className="font-bold text-lg text-foreground">
                {metricsLoading ? '...' : (metrics?.activeUsersInPeriod ?? 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/30">
              <div>
                <span className="font-semibold block text-foreground">
                  Usuários Recorrentes
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Cadastrados antes e ativos agora
                </span>
              </div>
              <span className="font-bold text-lg text-emerald-500">
                {metricsLoading ? '...' : (metrics?.returningUsersCount ?? 0)}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed pt-1">
              Permite validar se atletas e clubes estão retornando à plataforma
              após o primeiro cadastro.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Real Registered Users Table */}
      <Card className="animate-fade-in-up border-border/50 shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base font-bold">
                Usuários Registrados (Base Real Supabase)
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Total de {realProfiles.length} perfis persistidos no banco de
                dados.
              </p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuário, esporte..."
                className="pl-9 h-9 text-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50 whitespace-nowrap text-xs">
                <TableRow>
                  <TableHead>Perfil</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Esporte / Posição</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Data de Criação</TableHead>
                  <TableHead className="text-right">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-xs">
                {profilesLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      Carregando perfis do Supabase...
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      Nenhum usuário encontrado na busca.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((p) => {
                    const isDemo = p.id.startsWith('11111111-')
                    return (
                      <TableRow
                        key={p.id}
                        className="hover:bg-muted/30 whitespace-nowrap"
                      >
                        <TableCell>
                          <div className="flex items-center gap-2.5">
                            <Avatar className="h-8 w-8 border border-border/50">
                              <AvatarImage src={p.avatar_url || ''} />
                              <AvatarFallback>
                                {(p.full_name || 'U')[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-semibold text-foreground flex items-center gap-1.5">
                                {p.full_name || 'Sem nome'}
                                {isDemo && (
                                  <Badge
                                    variant="outline"
                                    className="text-[9px] px-1 py-0 h-4 bg-muted"
                                  >
                                    Demo
                                  </Badge>
                                )}
                                {p.is_admin && (
                                  <Badge className="text-[9px] px-1 py-0 h-4 bg-primary text-white">
                                    Admin
                                  </Badge>
                                )}
                              </span>
                              <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[140px]">
                                {p.id.slice(0, 13)}...
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className="capitalize text-[10px]"
                          >
                            {p.account_type === 'athlete'
                              ? 'Atleta'
                              : p.account_type === 'club'
                                ? 'Clube'
                                : 'Treinador'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {p.sport || '—'} {p.position ? `• ${p.position}` : ''}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {[p.city, p.state].filter(Boolean).join(', ') || '—'}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {p.created_at
                            ? format(new Date(p.created_at), 'dd/MM/yyyy HH:mm')
                            : '—'}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-[11px]"
                            onClick={() =>
                              window.open(`/passport/${p.id}`, '_blank')
                            }
                          >
                            Ver Passaporte
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
