'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import Link from 'next/link' // Ya no necesitamos useRouter

export default function SuccessPage() {
    const { clearCart } = useCart()

    useEffect(() => {
        // Ejecutar clearCart solo una vez al montar el componente
        const timer = setTimeout(() => {
            clearCart()
        }, 0)
        return () => clearTimeout(timer)
    }, []) // Removido clearCart de las dependencias

    return (
        <div className="min-h-screen pt-24 bg-gradient-to-b from-black to-gray-900 text-white">
            <div className="max-w-2xl mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    {/* Success Icon */}
                    <div className="mb-8 inline-block">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.2
                            }}
                            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto"
                        >
                            <svg
                                className="w-12 h-12 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </motion.div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Thank You for Your Purchase!
                    </h1>
                    <p className="text-xl text-gray-300 mb-8">
                        Your order has been successfully processed.
                    </p>
                    <p className="text-gray-400 mb-12">
                        You will receive an email confirmation shortly with your order details.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/shop/art-works">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-white text-black rounded-full
                                         hover:bg-gray-100 transition-colors w-full sm:w-auto"
                            >
                                Continue Shopping
                            </motion.button>
                        </Link>
                        <Link href="/shop/art-works">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 border border-white text-white rounded-full
                                         hover:bg-white/10 transition-colors w-full sm:w-auto"
                            >
                                View More Art
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}