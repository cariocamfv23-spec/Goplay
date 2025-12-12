import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, ArrowUpRight, Filter, Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockPhotographerTransactions } from '@/lib/data'
import { Badge } from '@/components/ui/badge'

export default function TransactionHistory() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filteredTransactions = mockPhotographerTransactions.filter((tx) => {
    const matchesFilter = filter === 'all' || tx.status === filter
    const matchesSearch =
      tx.clientName.toLowerCase().includes(search.toLowerCase()) ||
      tx.description.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background pb-20 p-4 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Extrato Financeiro</h1>
      </div>

      <div className="grid gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente ou serviço..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className="rounded-full"
          >
            Todos
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
            className="rounded-full"
          >
            Recebidos
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('pending')}
            className="rounded-full"
          >
            Pendentes
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTransactions.map((tx) => (
          <Card
            key={tx.id}
            className="border-none shadow-sm hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">{tx.description}</h3>
                  <p className="text-sm text-muted-foreground">
                    {tx.clientName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-primary">
                    R$ {tx.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <Badge
                  variant={tx.type === 'service' ? 'secondary' : 'outline'}
                >
                  {tx.type === 'service' ? 'Serviço' : 'Pacote'}
                </Badge>
                <Badge
                  variant="outline"
                  className={
                    tx.status === 'completed'
                      ? 'text-green-600 border-green-200 bg-green-50'
                      : 'text-yellow-600 border-yellow-200 bg-yellow-50'
                  }
                >
                  {tx.status === 'completed' ? 'Recebido' : 'Pendente'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
