import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { mockProducts } from '@/lib/data'
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function Cart() {
  const navigate = useNavigate()
  // Mock cart state
  const [items, setItems] = useState([
    { ...mockProducts[0], quantity: 1 },
    { ...mockProducts[1], quantity: 2 },
  ])

  const total = items.reduce((acc, item) => {
    const price = parseFloat(
      item.price.replace('R$ ', '').replace('.', '').replace(',', '.'),
    )
    return acc + price * item.quantity
  }, 0)

  const handleCheckout = () => {
    toast.success('Pedido realizado com sucesso!')
    navigate('/marketplace')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-4 border-b flex items-center gap-4 bg-background sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold">Carrinho de Compras</h1>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {items.map((item, index) => (
          <Card key={index} className="overflow-hidden border-none shadow-sm">
            <CardContent className="p-3 flex gap-4">
              <div className="h-24 w-24 bg-secondary rounded-lg shrink-0">
                <img
                  src={`https://img.usecurling.com/p/200/200?q=${item.img}`}
                  className="w-full h-full object-cover rounded-lg"
                  alt={item.name}
                />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3 className="font-semibold text-sm truncate">
                    {item.name}
                  </h3>
                  <p className="text-primary font-bold">{item.price}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 bg-secondary/50 rounded-full px-2 py-1">
                    <button className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-background">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-background">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-4 border-t bg-background safe-area-bottom">
        <div className="flex justify-between items-center mb-4">
          <span className="text-muted-foreground">Total</span>
          <span className="text-2xl font-bold text-primary">
            R$ {total.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <Button
          className="w-full h-12 rounded-full font-bold"
          onClick={handleCheckout}
        >
          Finalizar Pedido
        </Button>
      </div>
    </div>
  )
}
