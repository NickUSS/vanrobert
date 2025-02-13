'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface AnnouncementBannerProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function AnnouncementBanner({ isVisible, onClose }: AnnouncementBannerProps) {
    // Estado local para la animación
    const [isAnimating, setIsAnimating] = useState(false);

    // Efecto para manejar la animación de salida
    useEffect(() => {
        if (!isVisible && !isAnimating) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                setIsAnimating(false);
            }, 300); // Duración de la animación
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    // Si no es visible y no está animando, no renderizar nada
    if (!isVisible && !isAnimating) return null;

    return (
        <AnimatePresence>
            {(isVisible || isAnimating) && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut"
                    }}
                    className="bg-black text-white fixed top-0 left-0 right-0 z-50 shadow-md"
                >
                    <div className="container mx-auto px-4 py-3 text-center relative">
                        <div className="flex items-center justify-center space-x-2">
                            <span className="animate-bounce text-xl">🎉</span>
                            <p className="text-sm sm:text-base pr-8">
                                Nueva colección disponible - ¡Descubre las últimas obras!
                                <Link
                                    href="/coleccion"
                                    className="underline ml-2 hover:text-gray-300 transition-colors
                                             inline-flex items-center group"
                                >
                                    Ver más
                                    <svg
                                        className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </Link>
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2
                                     w-6 h-6 flex items-center justify-center
                                     hover:bg-white/20 rounded-full transition-all
                                     text-xl font-bold focus:outline-none focus:ring-2
                                     focus:ring-white/50 active:scale-95"
                            aria-label="Cerrar anuncio"
                        >
                            <span className="sr-only">Cerrar</span>
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}