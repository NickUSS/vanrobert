'use client'

import { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            x.set(e.clientX - 8);
            y.set(e.clientY - 8);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y]);

    return (
        <motion.div
            className="fixed w-4 h-4 bg-primary rounded-full pointer-events-none mix-blend-difference z-50"
            style={{ x, y }}
            animate={{
                scale: [1, 1.2, 1],
                transition: {
                    duration: 1,
                    repeat: Infinity,
                },
            }}
        />
    );
}