import { useParams, useNavigate } from 'react-router-dom'
import { mockOrders } from '@/lib/mock-orders'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Package,
  Truck,
  MapPin,
  CreditCard,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

export default function OrderDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const order = mockOrders.find((o) => o.id === id)

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <p className="text-muted-foreground mb-4">Pedido não encontrado</p>
        <Button onClick={() => navigate(-1)}>Voltar</Button>
      </div>
    )
  }

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
        return 'Pedido Entregue'
      case 'shipped':
        return 'Em Trânsito'
      case 'cancelled':
        return 'Pedido Cancelado'
      default:
        return 'Processando'
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in">
      <div className="sticky top-0 bg-background/80 backdrop-blur-xl z-20 p-4 border-b border-border/40 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Detalhes do Pedido</h1>
      </div>

      <ScrollArea className="h-[calc(100vh-65px)]">
        <div className="p-4 space-y-6">
          {/* Header Status */}
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {order.id}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Realizado em {order.date}
                </p>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  'px-3 py-1 text-xs border',
                  getStatusColor(order.status),
                )}
              >
                {getStatusLabel(order.status)}
              </Badge>
            </div>
            {order.trackingCode && (
              <div className="bg-secondary/30 p-3 rounded-lg flex items-center gap-3 border border-border/50">
                <Truck className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                    Código de Rastreio
                  </p>
                  <p className="text-sm font-mono font-medium">
                    {order.trackingCode}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Copiar
                </Button>
              </div>
            )}
          </div>

          <Separator />

          {/* Items */}
          <div className="space-y-4">
            <h3 className="font-bold flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" /> Itens do Pedido
            </h3>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <Card key={idx} className="border-border/50 shadow-sm">
                  <CardContent className="p-3 flex gap-3">
                    <div className="h-16 w-16 bg-white rounded-md border border-border/30 p-1 flex items-center justify-center shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm line-clamp-2">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Quantidade: {item.quantity}
                      </p>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="font-medium text-sm">
                          R$ {item.product.price.toFixed(2)}
                        </span>
                        {item.product.pointsPrice > 0 && (
                          <span className="text-[10px] text-gold font-bold">
                            + {item.product.pointsPrice} pts
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Shipping & Payment */}
          <div className="grid gap-6">
            <div className="space-y-3">
              <h3 className="font-bold flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Endereço de Entrega
              </h3>
              <div className="text-sm text-muted-foreground bg-secondary/20 p-3 rounded-lg border border-border/50">
                <p>{order.shippingAddress}</p>
                <p className="mt-1 text-xs font-medium text-foreground">
                  Método: {order.shippingMethod}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" /> Pagamento
              </h3>
              <div className="text-sm text-muted-foreground bg-secondary/20 p-3 rounded-lg border border-border/50 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>{order.paymentMethod}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Summary */}
          <div className="space-y-3">
            <h3 className="font-bold">Resumo Financeiro</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>R$ {(order.total - order.shippingCost).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Frete</span>
                <span>
                  {order.shippingCost === 0
                    ? 'Grátis'
                    : `R$ ${order.shippingCost.toFixed(2)}`}
                </span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-end font-bold text-lg">
                <span>Total</span>
                <div className="text-right">
                  <div className="text-primary">
                    R$ {order.total.toFixed(2)}
                  </div>
                  {order.totalPoints > 0 && (
                    <div className="text-xs text-gold">
                      + {order.totalPoints} pts
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full gap-2 mt-4">
            <HelpCircle className="h-4 w-4" /> Preciso de Ajuda
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}
