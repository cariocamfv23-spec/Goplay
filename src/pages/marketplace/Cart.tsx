import { Button } from '@/components/ui/button'
import { ArrowLeft, Trash2, ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockProducts } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { PaymentDialog } from '@/components/PaymentDialog'

export default function Cart() {
  const navigate = useNavigate()
  // Mock cart items
  const cartItems = [mockProducts[0], mockProducts[1]]
  const total = cartItems.reduce((acc, item) => acc + item.price, 0)
  const totalPoints = cartItems.reduce(
    (acc, item) => acc + (item.pointsPrice || 0),
    0,
  )

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24 animate-fade-in">
      <div className="sticky top-0 bg-background z-20 p-4 border-b border-border/50 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Carrinho</h1>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {cartItems.map((item, i) => (
          <Card key={i} className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-3 flex gap-3">
              <div className="h-20 w-20 bg-secondary/30 rounded-lg p-2 flex items-center justify-center shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {item.category}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="font-bold text-primary">
                      R$ {item.price.toFixed(2)}
                    </span>
                    {item.pointsPrice > 0 && (
                      <span className="text-[10px] text-gold font-medium">
                        {item.pointsPrice} pts
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="sticky bottom-0 bg-background p-6 border-t border-border/50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Frete</span>
            <span className="text-green-600">Grátis</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <div className="text-right">
              <div>R$ {total.toFixed(2)}</div>
              {totalPoints > 0 && (
                <div className="text-xs text-gold font-medium">
                  ou {totalPoints} pts
                </div>
              )}
            </div>
          </div>
        </div>
        <PaymentDialog
          title={`Compra de ${cartItems.length} itens`}
          price={total}
          pointsPrice={totalPoints}
        >
          <Button
            size="lg"
            className="w-full h-14 rounded-full font-bold text-lg shadow-lg"
          >
            <ShoppingBag className="mr-2 h-5 w-5" /> Finalizar Compra
          </Button>
        </PaymentDialog>
      </div>
    </div>
  )
}
