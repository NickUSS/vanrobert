// src/hooks/useCheckout.ts
'use client'
import { loadStripe } from '@stripe/stripe-js'

// Types
export interface CartItem {
    id: string
    title: string
    price: number
    image: string
    frame?: string
    quantity: number
}

interface CheckoutResponse {
    url?: string
    error?: string
}

interface CheckoutError extends Error {
    statusCode?: number
}

// Constants
const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
if (!STRIPE_KEY) {
    throw new Error('Missing Stripe publishable key')
}

// Initialize Stripe
loadStripe(STRIPE_KEY).catch(error => {
    console.error('Error initializing Stripe:', error)
    throw error
})

export function useCheckout() {
    const createCheckoutSession = async (items: CartItem[]): Promise<void> => {
        if (!items.length) {
            throw new Error('No items in cart')
        }

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items }),
            })

            if (!response.ok) {
                const error: CheckoutError = new Error('Checkout request failed')
                error.statusCode = response.status
                throw error
            }

            const data: CheckoutResponse = await response.json()

            if (data.error) {
                throw new Error(data.error)
            }

            if (!data.url) {
                throw new Error('No checkout URL provided')
            }

            window.location.href = data.url

        } catch (error) {
            console.error('Error in checkout:', error)

            if (error instanceof Error) {
                throw new Error(`Checkout failed: ${error.message}`)
            }

            throw new Error('An unexpected error occurred during checkout')
        }
    }

    const validateCart = (items: CartItem[]): boolean => {
        return items.every(item => (
            item.id &&
            item.price > 0 &&
            item.quantity > 0
        ))
    }

    return {
        createCheckoutSession,
        validateCart,
    }
}

export type { CheckoutResponse, CheckoutError }