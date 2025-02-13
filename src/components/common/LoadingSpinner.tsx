'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaPaintBrush } from 'react-icons/fa';

export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 bg-white dark:bg-black z-50 flex items-center justify-center">
            <div className="relative">
                {/* Contenedor del logo */}
                <div className="relative w-[800px] h-[320px]">
                    {/* Logo en blanco estático */}
                    <div className="absolute inset-0">
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            fill
                            className="object-contain brightness-0 invert opacity-20"
                        />
                    </div>

                    {/* Logo que se pinta en rojo */}
                    <motion.div
                        className="absolute inset-0"
                        initial={{ clipPath: 'inset(0 100% 0 0)' }}
                        animate={{ clipPath: 'inset(0 0% 0 0)' }}
                        transition={{
                            duration: 2.5,
                            ease: "easeInOut",
                        }}
                    >
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            fill
                            className="object-contain"
                        />
                    </motion.div>

                    {/* Pincel animado */}
                    <motion.div
                        className="absolute w-20 h-20 -left-10 -top-10"
                        animate={{
                            x: [0, 800],
                            y: [0, 320],
                            rotate: -45,
                        }}
                        transition={{
                            duration: 2.5,
                            ease: "easeInOut",
                        }}
                    >
                        {/* Icono de pincel */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                            }}
                            className="text-red-500 text-6xl transform -rotate-45"
                        >
                            <FaPaintBrush />
                        </motion.div>

                        {/* Pequeño efecto de pintura localizado */}
                        <motion.div
                            className="absolute w-10 h-10 bg-red-500/10 rounded-full blur-sm"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.2, 0.1, 0.2],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}