'use client'
import { createContext, useContext, useState, useEffect } from 'react'

interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string;
    frame?: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    updateFrame: (id: string, frame: string) => void;
    clearCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    // Cargar carrito del localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            setItems(JSON.parse(savedCart))
        }
    }, [])

    // Guardar carrito en localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items))
    }, [items])

    const addItem = (item: CartItem) => {
        setItems(prev => {
            const existingItem = prev.find(i => i.id === item.id)
            if (existingItem) {
                return prev.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                )
            }
            return [...prev, item]
        })
    }

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        setItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        )
    }

    const updateFrame = (id: string, frame: string) => {
        setItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, frame } : item
            )
        )
    }

    const clearCart = () => {
        setItems([])
    }

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    return (
        <CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            updateQuantity,
            updateFrame,
            clearCart,
            total
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}