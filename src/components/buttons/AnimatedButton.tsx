'use client'
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    className?: string;
}

export default function AnimatedButton({
                                           children,
                                           onClick,
                                           variant = 'primary',
                                           className = ''
                                       }: AnimatedButtonProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`
                px-6 py-2 rounded-full font-medium
                transition-all duration-300
                ${className}
            `}
        >
            {children}
        </motion.button>
    );
}