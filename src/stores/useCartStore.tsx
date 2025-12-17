import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product } from '@/lib/data'
import { toast } from 'sonner'

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  total: number
  totalPoints: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('goplay-cart')
    if (saved) {
      try {
        setCart(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse cart', e)
      }
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('goplay-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id)
      if (existing) {
        toast.success('Quantidade atualizada no carrinho!')
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        )
      }
      toast.success('Produto adicionado ao carrinho!')
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((p) => p.id !== productId))
    toast.info('Produto removido do carrinho')
  }

  const clearCart = () => {
    setCart([])
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const totalPoints = cart.reduce(
    (acc, item) => acc + (item.pointsPrice || 0) * item.quantity,
    0,
  )

  return React.createElement(
    CartContext.Provider,
    {
      value: {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        total,
        totalPoints,
      },
    },
    children,
  )
}

export const useCartStore = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartStore must be used within a CartProvider')
  }
  return context
}

export default useCartStore
