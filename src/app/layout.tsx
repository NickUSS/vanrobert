import './global.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Footer, Navbar } from "@/components/layout"
import { CartProvider } from '@/context/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'VanRobert - Arte & Diseño',
    description: 'Portfolio y tienda de arte de VanRobert',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="es" className="scroll-smooth">
        <body className={`${inter.className} min-h-screen flex flex-col`}>
        <CartProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
        </CartProvider>
        </body>
        </html>
    )
}