import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const useCheckout = () => {
    const createCheckoutSession = async (items: any[]) => {
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Redirigir directamente a la URL de Stripe
            if (data.url) {
                window.location.href = data.url;
                return;
            }

            throw new Error('No checkout URL provided');
        } catch (error) {
            console.error('Error in checkout:', error);
            throw error;
        }
    };

    return { createCheckoutSession };
};