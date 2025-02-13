export const formatPrice = (price: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2
    }).format(price);
};

export const formatDate = (date: string | Date): string => {
    return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
};