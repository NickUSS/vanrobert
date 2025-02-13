'use client'
import { useState, useEffect } from 'react';

interface ScrollPosition {
    scrollPosition: number;
    direction: 'up' | 'down';
}

const useScrollPosition = (): ScrollPosition => {
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const [direction, setDirection] = useState<'up' | 'down'>('up');
    const [lastPosition, setLastPosition] = useState<number>(0);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const position = window.scrollY;
                    setDirection(position > lastPosition ? 'down' : 'up');
                    setLastPosition(position);
                    setScrollPosition(position);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastPosition]);

    return { scrollPosition, direction };
};

export default useScrollPosition;