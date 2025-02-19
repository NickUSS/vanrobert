'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Types and Interfaces
export interface CartItem {
    id: string
    title: string
    price: number
    image: string
    frame?: string
    quantity: number
}

export interface CartContextType {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    updateFrame: (id: string, frame: string) => void
    clearCart: () => void
    total: number
}

interface CartProviderProps {
    children: ReactNode
}

// Constants
const CART_STORAGE_KEY = 'cart'
const INITIAL_CART: CartItem[] = []

// Context Creation
const CartContext = createContext<CartContextType | undefined>(undefined)

// Helper Functions
const loadCartFromStorage = (): CartItem[] => {
    if (typeof window === 'undefined') return INITIAL_CART
    try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY)
        return savedCart ? JSON.parse(savedCart) : INITIAL_CART
    } catch (error) {
        console.error('Error loading cart from localStorage:', error)
        return INITIAL_CART
    }
}

const saveCartToStorage = (items: CartItem[]): void => {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
        console.error('Error saving cart to localStorage:', error)
    }
}

// Provider Component
export function CartProvider({ children }: CartProviderProps) {
    const [items, setItems] = useState<CartItem[]>(INITIAL_CART)

    // Initialize cart from localStorage
    useEffect(() => {
        setItems(loadCartFromStorage())
    }, [])

    // Save cart to localStorage when it changes
    useEffect(() => {
        saveCartToStorage(items)
    }, [items])

    const addItem = (newItem: CartItem) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === newItem.id)
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prevItems, { ...newItem, quantity: 1 }]
        })
    }

    const removeItem = (id: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        )
    }

    const updateFrame = (id: string, frame: string) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, frame } : item
            )
        )
    }

    const clearCart = () => {
        setItems(INITIAL_CART)
        try {
            localStorage.removeItem(CART_STORAGE_KEY)
        } catch (error) {
            console.error('Error clearing cart from localStorage:', error)
        }
    }

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    const value: CartContextType = {
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateFrame,
        clearCart,
        total
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

// Custom Hook
export function useCart(): CartContextType {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}