'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import { useCheckout } from '@/hooks/useCheckout'
import Image from 'next/image'
import { useState } from 'react'

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
    const { items, removeItem, updateQuantity, total, clearCart } = useCart()
    const { createCheckoutSession } = useCheckout()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleCheckout = async () => {
        try {
            setIsLoading(true)
            setError(null)
            await createCheckoutSession(items)
        } catch (err) {
            setError('An error occurred during checkout. Please try again.')
            console.error('Checkout error:', err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Cart Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50
                                 shadow-xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Your Cart</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full p-6">
                                    <svg
                                        className="w-16 h-16 text-gray-400 mb-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                        />
                                    </svg>
                                    <p className="text-gray-500 text-center">Your cart is empty</p>
                                </div>
                            ) : (
                                <div className="p-6 space-y-4">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            className="flex gap-4 border-b pb-4"
                                        >
                                            <div className="relative w-24 h-24 flex-shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover rounded-lg"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium">{item.title}</h3>
                                                {item.frame && (
                                                    <p className="text-sm text-gray-500">
                                                        Frame: {item.frame}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-4 mt-2">
                                                    <select
                                                        value={item.quantity}
                                                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                                        className="border rounded px-2 py-1"
                                                    >
                                                        {[1,2,3,4,5].map(num => (
                                                            <option key={num} value={num}>
                                                                {num}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-red-500 hover:text-red-700 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t p-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium">Free</span>
                                </div>
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>

                                {error && (
                                    <p className="text-red-500 text-sm text-center">{error}</p>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleCheckout}
                                    disabled={isLoading}
                                    className="w-full bg-black text-white py-3 rounded-full
                                             hover:bg-gray-800 transition-colors disabled:opacity-50
                                             disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isLoading ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        'Proceed to Checkout'
                                    )}
                                </motion.button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}