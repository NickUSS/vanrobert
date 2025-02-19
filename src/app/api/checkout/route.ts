import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Definir la interfaz para los items del carrito
interface CartItem {
    title: string;
    image: string;
    price: number;
    quantity: number;
    frame?: string;
}

interface RequestBody {
    items: CartItem[];
}

export async function POST(req: Request) {
    try {
        const body = await req.json() as RequestBody;
        const { items } = body;

        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: 'No items provided' },
                { status: 400 }
            );
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map((item: CartItem) => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.title,
                        images: [baseUrl + item.image],
                        description: item.frame ? `Frame: ${item.frame}` : undefined,
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${baseUrl}/checkout/success`,
            cancel_url: `${baseUrl}/checkout/cancel`,
            metadata: {
                order_id: `order_${Date.now()}`,
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);

        // Manejar el error de manera más específica
        if (error instanceof Stripe.errors.StripeError) {
            return NextResponse.json(
                {
                    error: 'Stripe error occurred',
                    details: error.message
                },
                { status: error.statusCode || 500 }
            );
        }

        return NextResponse.json(
            {
                error: 'Error creating checkout session',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}