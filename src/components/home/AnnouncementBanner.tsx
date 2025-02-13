'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function AnnouncementBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-black text-white"
                >
                    <div className="container mx-auto px-4 py-3 text-center relative">
                        <p className="text-sm">
                            🎉 Nueva colección disponible - ¡Descubre las últimas obras!
                            <Link href="/coleccion" className="underline ml-2">
                                Ver más
                            </Link>
                        </p>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2
                                     hover:opacity-75 transition-opacity"
                        >
                            ×
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}