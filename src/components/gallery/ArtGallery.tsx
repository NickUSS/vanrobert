'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';
import ArtCard from './ArtCard';
import QuickView from './QuickView';
import { ArtWork } from '@/types/art';

interface ArtGalleryProps {
    artworks: ArtWork[];
    onLike: (id: string) => void;
}

export default function ArtGallery({ artworks, onLike }: ArtGalleryProps) {
    const [selectedArtwork, setSelectedArtwork] = useState<ArtWork | null>(null);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold mb-4">Obras Destacadas</h2>
                    <p className="text-gray-600">Descubre nuestras obras más recientes y populares</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {artworks.map((artwork) => (
                        <ArtCard
                            key={artwork.id}
                            artwork={artwork}
                            onLike={onLike}
                            onQuickView={setSelectedArtwork}
                        />
                    ))}
                </div>

                <QuickView
                    artwork={selectedArtwork}
                    isOpen={!!selectedArtwork}
                    onClose={() => setSelectedArtwork(null)}
                />
            </div>
        </section>
    );
}