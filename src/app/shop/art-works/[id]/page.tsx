// src/app/shop/art-works/[id]/page.tsx
import { Metadata } from 'next'
import ArtworkClient from './ArtworkClient'

export const metadata: Metadata = {
    title: 'Artwork Details',
    description: 'View artwork details and purchase options',
}

interface Props {
    params: Promise<{ id: string }>;
}

async function resolveParams(params: Promise<{ id: string }>): Promise<string> {
    const resolvedParams = await params;
    return resolvedParams.id;
}

export default async function Page({ params }: Props) {
    const id = await resolveParams(params);
    return <ArtworkClient id={id} />;
}