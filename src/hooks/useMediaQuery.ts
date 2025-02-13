'use client'
import { useState, useEffect } from 'react';

const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState<boolean>(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        const updateMatches = (e: MediaQueryListEvent | MediaQueryList) => {
            setMatches(e.matches);
        };

        // Set initial value
        updateMatches(mediaQuery);

        // Listen for changes
        if (mediaQuery.addListener) {
            mediaQuery.addListener(updateMatches);
        } else {
            mediaQuery.addEventListener('change', updateMatches);
        }

        return () => {
            if (mediaQuery.removeListener) {
                mediaQuery.removeListener(updateMatches);
            } else {
                mediaQuery.removeEventListener('change', updateMatches);
            }
        };
    }, [query]);

    return matches;
};

export default useMediaQuery;