import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Package,
  Truck,
  Clock,
  XCircle,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { mockOrders } from '@/lib/mock-orders'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default function OrderHistory() {
  const navigate = useNavigate()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800'
      default:
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Entregue'
      case 'shipped':
        return 'Enviado'
      case 'cancelled':
        return 'Cancelado'
      default:
        return 'Pendente'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle2 className="h-3 w-3 mr-1" />
      case 'shipped':
        return <Truck className="h-3 w-3 mr-1" />
      case 'cancelled':
        return <XCircle className="h-3 w-3 mr-1" />
      default:
        return <Clock className="h-3 w-3 mr-1" />
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background/80 backdrop-blur-xl z-20 p-4 border-b border-border/40 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Meus Pedidos</h1>
      </div>

      <div className="p-4 space-y-4">
        {mockOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="bg-secondary/30 p-6 rounded-full">
              <Package className="h-12 w-12 text-muted-foreground/50" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg">Nenhum pedido encontrado</h3>
              <p className="text-sm text-muted-foreground max-w-[250px] mx-auto">
                Você ainda não realizou nenhuma compra na loja Goplay.
              </p>
            </div>
            <Button onClick={() => navigate('/marketplace')}>
              Ir para a Loja
            </Button>
          </div>
        ) : (
          mockOrders.map((order) => (
            <Card
              key={order.id}
              className="overflow-hidden border border-border/50 shadow-sm hover:bg-secondary/20 transition-colors cursor-pointer"
              onClick={() => navigate(`/marketplace/orders/${order.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {order.id}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {order.date}
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      'flex items-center text-[10px] py-0.5 px-2 border',
                      getStatusColor(order.status),
                    )}
                  >
                    {getStatusIcon(order.status)}
                    {getStatusLabel(order.status)}
                  </Badge>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="h-12 w-12 bg-white rounded-md border border-border/50 p-1 flex items-center justify-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="h-12 w-12 bg-secondary rounded-md flex items-center justify-center text-xs font-bold text-muted-foreground">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-border/30">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Total</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-bold text-sm">
                        R$ {order.total.toFixed(2)}
                      </span>
                      {order.totalPoints > 0 && (
                        <span className="text-[10px] text-gold font-bold">
                          ou {order.totalPoints} pts
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-primary text-xs font-bold">
                    Detalhes <ChevronRight className="h-4 w-4 ml-1" />
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
