import { useState, useMemo } from 'react'
import {
  Search,
  Newspaper,
  Clock,
  ExternalLink,
  Activity,
  ArrowLeft,
  User,
  CalendarDays,
  Tv,
  Calendar,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { mockArenaArticles, type ArenaArticle } from '@/lib/data'

const categories = [
  'Todos',
  'Futebol',
  'Basquete',
  'MMA',
  'Tênis',
  'Surfe',
  'eSports',
  'Corrida',
]

function ArticleDetail({
  article,
  onBack,
}: {
  article: ArenaArticle
  onBack: () => void
}) {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-background pb-24 animate-in slide-in-from-right-4 duration-500">
      <div className="sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border/40 px-5 py-4 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="-ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </Button>
      </div>

      <div className="px-5 pt-6 max-w-3xl mx-auto space-y-6">
        <div className="space-y-4">
          <Badge className="bg-purple-600 hover:bg-purple-700 text-white border-none shadow-sm text-xs font-bold uppercase tracking-wider">
            {article.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-foreground">
            {article.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed font-medium">
            {article.summary}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground border-y border-border/50 py-4">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" /> {article.author}
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4" /> {article.date}
          </div>
          <div className="flex items-center gap-1.5">
            <Newspaper className="w-4 h-4" /> {article.source}
          </div>
        </div>

        {article.broadcaster && (
          <div className="flex items-center gap-3 bg-secondary/40 border border-border/50 rounded-xl p-4 text-sm font-medium text-foreground shadow-sm">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl shadow-[0_0_15px_rgba(147,51,234,0.3)] border border-purple-500/30">
              <span className="text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                📺
              </span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5 font-semibold uppercase tracking-wider">
                Onde Assistir
              </p>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-purple-500 drop-shadow-sm">
                  {article.broadcaster}
                </span>
                <span className="text-muted-foreground">•</span>
                <span>
                  {article.eventDate?.split('-').reverse().join('/')} às{' '}
                  {article.eventTime}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl bg-muted shadow-md">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-none text-foreground/90 leading-relaxed text-base space-y-6 mt-8">
          {article.content.split('\n\n').map((paragraph, i) => (
            <p key={i} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ArenaGo() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [dateFilter, setDateFilter] = useState('')
  const [broadcasterFilter, setBroadcasterFilter] = useState('all')
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(
    null,
  )

  const availableBroadcasters = useMemo(() => {
    const broadcasters = new Set(
      mockArenaArticles.map((a) => a.broadcaster).filter(Boolean),
    )
    return Array.from(broadcasters) as string[]
  }, [])

  const filteredArticles = useMemo(() => {
    return mockArenaArticles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.summary.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        activeCategory === 'Todos' || article.category === activeCategory
      const matchesDate = !dateFilter || article.eventDate === dateFilter
      const matchesBroadcaster =
        broadcasterFilter === 'all' || article.broadcaster === broadcasterFilter

      return (
        matchesSearch && matchesCategory && matchesDate && matchesBroadcaster
      )
    })
  }, [search, activeCategory, dateFilter, broadcasterFilter])

  const selectedArticle = mockArenaArticles.find(
    (a) => a.id === selectedArticleId,
  )

  if (selectedArticle) {
    return (
      <ArticleDetail
        article={selectedArticle}
        onBack={() => setSelectedArticleId(null)}
      />
    )
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-background pb-24 animate-in fade-in duration-500">
      <div className="px-5 pt-6 pb-2 sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border/40">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-purple-600/10 text-purple-600">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Arena Go
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              Últimas notícias e transmissões esportivas
            </p>
          </div>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar notícias, esportes..."
            className="pl-9 bg-secondary/50 border-none rounded-xl h-11 focus-visible:ring-purple-600/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Broadcast Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="flex h-11 w-full items-center justify-between rounded-xl border-none bg-secondary/50 px-3 py-2 pl-9 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-purple-600/50 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
              placeholder="Filtrar por Data"
            />
          </div>
          <div className="relative flex-1">
            <Tv className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <select
              value={broadcasterFilter}
              onChange={(e) => setBroadcasterFilter(e.target.value)}
              className="flex h-11 w-full items-center justify-between rounded-xl border-none bg-secondary/50 px-3 py-2 pl-9 pr-8 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-purple-600/50 disabled:cursor-not-allowed disabled:opacity-50 appearance-none text-foreground"
            >
              <option value="all">Todas as Emissoras</option>
              {availableBroadcasters.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-muted-foreground"
              >
                <path
                  d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-1 text-sm font-semibold text-foreground/90">
          Categorias
        </div>
        <ScrollArea className="w-full whitespace-nowrap -mx-5 px-5">
          <div className="flex w-max space-x-2 pb-3 pt-2">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={activeCategory === cat ? 'default' : 'secondary'}
                className={cn(
                  'cursor-pointer px-4 py-1.5 rounded-full text-xs transition-all',
                  activeCategory === cat
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md'
                    : 'hover:bg-secondary/80 text-muted-foreground',
                )}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      <div className="px-5 pt-6 space-y-6">
        {filteredArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-inner">
              <Activity className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-bold">Nenhum evento encontrado</h3>
            <p className="text-sm text-muted-foreground max-w-[250px] leading-relaxed">
              Não encontramos resultados para sua busca. Tente alterar as datas
              ou emissoras.
            </p>
            <Button
              variant="outline"
              className="mt-2 rounded-xl text-purple-600 border-purple-600/30 hover:bg-purple-600/10"
              onClick={() => {
                setSearch('')
                setActiveCategory('Todos')
                setDateFilter('')
                setBroadcasterFilter('all')
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden border-border/50 shadow-sm bg-card hover:shadow-md transition-shadow group cursor-pointer flex flex-col"
                onClick={() => setSelectedArticleId(article.id)}
              >
                <div className="relative aspect-video w-full overflow-hidden bg-muted shrink-0">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-purple-600 hover:bg-purple-700 text-white border-none shadow-sm text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      {article.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Newspaper className="w-3 h-3" /> {article.source}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.time}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold leading-tight line-clamp-2 mb-2 group-hover:text-purple-600 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed flex-1">
                    {article.summary}
                  </p>

                  {article.broadcaster && (
                    <div className="mb-4 bg-secondary/40 rounded-xl p-3 flex items-center justify-between border border-border/50 shadow-sm transition-all group-hover:border-purple-500/30 group-hover:bg-purple-500/5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500/10 to-indigo-500/10 shadow-[0_0_8px_rgba(147,51,234,0.2)]">
                          <span className="text-base drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                            📺
                          </span>
                        </div>
                        <span className="text-xs font-extrabold text-foreground tracking-wide group-hover:text-purple-500 transition-colors">
                          {article.broadcaster}
                        </span>
                      </div>
                      <div className="text-[11px] font-bold text-muted-foreground">
                        {article.eventDate?.split('-').reverse().join('/')} às{' '}
                        {article.eventTime}
                      </div>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    className="w-full rounded-xl text-purple-600 border-purple-600/30 hover:bg-purple-600/10 h-10 font-semibold group-hover:border-purple-600 transition-colors mt-auto"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" /> Ler artigo
                    completo
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
