export * from './animations';
export * from './format';
export * from './storage';

// Funciones de utilidad comunes
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const classNames = (...classes: (string | boolean | undefined | null)[]) => {
    return classes.filter(Boolean).join(' ');
};

export const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2
    }).format(amount);
};

export const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
};

export const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};

export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
) => {
    let timeout: NodeJS.Timeout;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export const throttle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number
) => {
    let inThrottle: boolean;

    return function executedFunction(...args: Parameters<T>) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

export const isClient = typeof window !== 'undefined';
export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';

// Funciones para manejo de fechas
export const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
};

export const getRelativeTime = (date: Date | string) => {
    const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
    const now = new Date();
    const diff = new Date(date).getTime() - now.getTime();
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (Math.abs(diffDays) < 1) {
        const diffHours = Math.ceil(diff / (1000 * 60 * 60));
        if (Math.abs(diffHours) < 1) {
            const diffMinutes = Math.ceil(diff / (1000 * 60));
            return rtf.format(diffMinutes, 'minute');
        }
        return rtf.format(diffHours, 'hour');
    }
    return rtf.format(diffDays, 'day');
};

// Validaciones comunes
export const isValidEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const isValidPassword = (password: string) => {
    // Mínimo 8 caracteres, al menos una letra y un número
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
};

// Funciones para manejo de arrays
export const shuffleArray = <T>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
    return array.reduce((acc, _, i) => {
        if (i % size === 0) {
            acc.push(array.slice(i, i + size));
        }
        return acc;
    }, [] as T[][]);
};