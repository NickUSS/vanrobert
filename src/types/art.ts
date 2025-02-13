export interface ArtWork {
    id: string;
    title: string;
    artist: string;
    price: number;
    image: string;
    category: string;
    isFeatured: boolean;
    likes: number;
    isLiked?: boolean;
    badges: string[];
    currency: string;
    date: string;
    description: string;
}

export type Currency = 'USD' | 'EUR' | 'GBP';
export type PriceRange = 'all' | 'under-500' | '500-1000' | '1000-5000' | 'over-5000';
export type SortOption = 'popular' | 'recent' | 'price-low' | 'price-high';
