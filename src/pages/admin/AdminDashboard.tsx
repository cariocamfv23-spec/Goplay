import { useState, useMemo, useEffect } from 'react'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Search, Shield, Users, UserPlus, Clock, Inbox } from 'lucide-react'
import { format } from 'date-fns'

const MOCK_USERS = [
  {
    id: '1',
    name: 'João Silva',
    username: 'joaosilva99',
    email: 'joao.silva@example.com',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
    createdAt: new Date('2025-01-10T14:30:00Z'),
    role: 'admin',
    status: 'active',
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    username: 'maria.oli',
    email: 'maria.oliveira@example.com',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2',
    createdAt: new Date('2025-02-15T09:15:00Z'),
    role: 'user',
    status: 'active',
  },
  {
    id: '3',
    name: 'Carlos Souza',
    username: 'carlinhos_sz',
    email: 'carlos.souza@example.com',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=3',
    createdAt: new Date('2025-03-01T18:45:00Z'),
    role: 'user',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Ana Costa',
    username: 'anacosta',
    email: 'ana.costa@example.com',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=4',
    createdAt: new Date('2025-03-05T10:20:00Z'),
    role: 'user',
    status: 'active',
  },
  {
    id: '5',
    name: 'Pedro Santos',
    username: 'pedro.santos',
    email: 'pedro.santos@example.com',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=5',
    createdAt: new Date('2025-03-10T11:10:00Z'),
    role: 'user',
    status: 'active',
  },
  {
    id: '6',
    name: 'Lucas Ferreira',
    username: 'lucasferreira',
    email: 'lucas.f@example.com',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=6',
    createdAt: new Date('2025-03-12T16:05:00Z'),
    role: 'user',
    status: 'active',
  },
  {
    id: '7',
    name: 'Juliana Lima',
    username: 'juli.lima',
    email: 'juliana.lima@example.com',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=7',
    createdAt: new Date('2025-03-14T08:30:00Z'),
    role: 'moderator',
    status: 'active',
  },
  {
    id: '8',
    name: 'Rafael Almeida',
    username: 'rafael.almeida',
    email: 'rafael.almeida@example.com',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=8',
    createdAt: new Date('2025-03-15T20:00:00Z'),
    role: 'user',
    status: 'banned',
  },
]

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return MOCK_USERS
    const term = searchQuery.toLowerCase()
    return MOCK_USERS.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.username.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term),
    )
  }, [searchQuery])

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 space-y-8 min-h-screen">
      <div className="flex flex-col gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" /> Painel Administrativo
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestão de usuários registrados na plataforma.
          </p>
        </div>
      </div>

      <div
        className="grid gap-4 md:grid-cols-3 animate-fade-in-up"
        style={{ animationDelay: '100ms' }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Usuários
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MOCK_USERS.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Novos (7 dias)
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Acessos Hoje</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
          </CardContent>
        </Card>
      </div>

      <Card
        className="animate-fade-in-up border-border/50 shadow-sm"
        style={{ animationDelay: '200ms' }}
      >
        <CardHeader>
          <CardTitle>Usuários Registrados</CardTitle>
          <div className="mt-4 relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, username ou email..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50 whitespace-nowrap">
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Data de Registro</TableHead>
                  <TableHead>Hora do Registro</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex gap-3 items-center">
                          <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                          <div className="space-y-2">
                            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                            <div className="h-3 w-16 bg-muted animate-pulse rounded" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                      </TableCell>
                      <TableCell>
                        <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                      </TableCell>
                      <TableCell>
                        <div className="h-4 w-12 bg-muted animate-pulse rounded" />
                      </TableCell>
                      <TableCell>
                        <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-48 text-center text-muted-foreground"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <Inbox className="h-10 w-10 mb-2 opacity-50" />
                        <p>Nenhum usuário encontrado</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      className="hover:bg-muted/30 whitespace-nowrap"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-border/50">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>
                              {user.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium text-sm leading-none mb-1">
                              {user.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              @{user.username}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {user.email}
                      </TableCell>
                      <TableCell className="text-sm">
                        {format(user.createdAt, 'dd/MM/yyyy')}
                      </TableCell>
                      <TableCell className="text-sm">
                        {format(user.createdAt, 'HH:mm')}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.status === 'active'
                              ? 'default'
                              : user.status === 'inactive'
                                ? 'secondary'
                                : 'destructive'
                          }
                          className="text-[10px] capitalize"
                        >
                          {user.status === 'active'
                            ? 'Ativo'
                            : user.status === 'inactive'
                              ? 'Inativo'
                              : 'Banido'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
