'use client'
import { motion } from 'framer-motion';

export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 bg-white dark:bg-black z-50 flex items-center justify-center">
            <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Cargando...
                </motion.div>
            </motion.div>
        </div>
    );
}