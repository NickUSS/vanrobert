import { ArtWork } from '@/types/art';

export const FEATURED_ARTWORKS: ArtWork[] = [
    {
        id: '1',
        title: 'Abstracción en Negro',
        artist: 'María González',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
        category: 'painting',
        isFeatured: true,
        likes: 245,
        badges: ['Destacado', 'Nuevo'],
        currency: 'USD',
        date: '2024-01-15',
        description: 'Una obra única que explora la abstracción.'
    },
    // Añade más obras aquí
];