'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArtWork } from '@/types/art';

interface ArtCardProps {
    artwork: ArtWork;
    onLike: (id: string) => void;
    onQuickView: (artwork: ArtWork) => void;
}

export default function ArtCard({ artwork, onLike, onQuickView }: ArtCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
            <div className="relative aspect-square">
                <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <button
                    onClick={() => onLike(artwork.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors z-10"
                >
                    <svg
                        className={`w-6 h-6 ${artwork.isLiked ? 'text-red-500' : 'text-gray-600'}`}
                        fill={artwork.isLiked ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </button>
                {artwork.badges.length > 0 && (
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {artwork.badges.map((badge, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 text-xs font-semibold bg-black text-white rounded-full"
                            >
                                {badge}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{artwork.title}</h3>
                <p className="text-gray-600 mb-4">por {artwork.artist}</p>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">${artwork.price}</span>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onQuickView(artwork)}
                        className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                    >
                        Ver Detalles
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}