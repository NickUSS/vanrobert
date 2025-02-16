import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { items } = body;

        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: 'No items provided' },
                { status: 400 }
            );
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map((item: any) => ({
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
    } catch (error: any) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json(
            { error: 'Error creating checkout session', details: error.message },
            { status: 500 }
        );
    }
}