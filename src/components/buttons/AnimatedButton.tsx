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
                inline-flex items-center justify-center
                px-4 py-2 rounded-full
                text-sm font-medium
                transition-all duration-300
                whitespace-nowrap
                ${variant === 'primary' ? 'min-w-[80px]' : 'min-w-[70px]'}
                ${className}
            `}
        >
            {children}
        </motion.button>
    );
}