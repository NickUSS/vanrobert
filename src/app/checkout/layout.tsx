'use client'
import Navbar from '@/components/layout/Navbar'
import { CartProvider } from '@/context/CartContext'

export default function CheckoutLayout({
                                           children,
                                       }: {
    children: React.ReactNode
}) {
    return (
        <CartProvider>
            <Navbar />
            <div className="min-h-screen">
                {children}
            </div>
        </CartProvider>
    )
}