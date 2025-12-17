import { Button } from '@/components/ui/button'
import { ArrowLeft, Trash2, ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { PaymentDialog } from '@/components/PaymentDialog'
import { useCartStore } from '@/stores/useCartStore'
import { cn } from '@/lib/utils'

export default function Cart() {
  const navigate = useNavigate()
  const { cart, removeFromCart, clearCart, total, totalPoints } = useCartStore()

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24 animate-fade-in">
      <div className="sticky top-0 bg-background/95 backdrop-blur z-20 p-4 border-b border-border/50 flex items-center gap-4 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full hover:bg-secondary"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Carrinho</h1>
        <span className="text-sm text-muted-foreground ml-auto font-medium">
          {cart.length} {cart.length === 1 ? 'item' : 'itens'}
        </span>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-secondary/30 p-6 rounded-full">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/50" />
            </div>
            <div className="space-y-2 max-w-[250px]">
              <h3 className="font-bold text-lg text-foreground">
                Seu carrinho está vazio
              </h3>
              <p className="text-sm text-muted-foreground">
                Explore a loja e encontre os melhores produtos para sua
                performance.
              </p>
            </div>
            <Button
              onClick={() => navigate('/marketplace')}
              className="rounded-full px-8 shadow-md"
            >
              Ir para a Loja
            </Button>
          </div>
        ) : (
          cart.map((item) => (
            <Card
              key={item.id}
              className="border border-border/50 shadow-sm overflow-hidden bg-card/50 hover:bg-card transition-colors group"
            >
              <CardContent className="p-3 flex gap-4">
                {/* Product Image - Enhanced Visibility */}
                <div className="h-28 w-24 bg-secondary/20 rounded-xl p-2 flex items-center justify-center shrink-0 border border-border/30 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Product Details with Description */}
                <div className="flex-1 flex flex-col min-h-[7rem]">
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-sm leading-tight line-clamp-2 text-foreground">
                        {item.name}
                      </h3>
                    </div>

                    <p className="text-[10px] font-bold text-primary uppercase tracking-wider">
                      {item.category}
                    </p>

                    {/* New Description Field */}
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed opacity-90">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-end mt-3 pt-2 border-t border-border/30">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-1">
                        <span className="font-bold text-base text-foreground">
                          R$ {item.price.toFixed(2)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-xs text-muted-foreground font-normal">
                            x{item.quantity}
                          </span>
                        )}
                      </div>
                      {item.pointsPrice > 0 && (
                        <span className="text-[10px] text-gold font-bold flex items-center gap-1">
                          +{item.pointsPrice * item.quantity} pts
                        </span>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="sticky bottom-0 bg-background/80 backdrop-blur-xl p-6 border-t border-border/50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-20">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Frete</span>
              <span className="text-green-600 font-medium">Grátis</span>
            </div>
            <Separator className="bg-border/50" />
            <div className="flex justify-between items-end">
              <span className="text-lg font-bold">Total</span>
              <div className="text-right">
                <div className="text-xl font-bold text-primary">
                  R$ {total.toFixed(2)}
                </div>
                {totalPoints > 0 && (
                  <div className="text-xs text-gold font-bold">
                    ou {totalPoints} pts
                  </div>
                )}
              </div>
            </div>
          </div>
          <PaymentDialog
            title={`Compra de ${cart.length} ${cart.length === 1 ? 'item' : 'itens'}`}
            price={total}
            pointsPrice={totalPoints}
            onSuccess={clearCart}
          >
            <Button
              size="lg"
              className="w-full h-14 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
            >
              <ShoppingBag className="mr-2 h-5 w-5" /> Finalizar Compra
            </Button>
          </PaymentDialog>
        </div>
      )}
    </div>
  )
}
