'use client'
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArtWork } from '@/types/art';

interface QuickViewProps {
    artwork: ArtWork | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function QuickView({ artwork, isOpen, onClose }: QuickViewProps) {
    if (!artwork) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={e => e.stopPropagation()}
                        className="bg-white rounded-xl overflow-hidden max-w-4xl w-full"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="relative h-[400px]">
                                <Image
                                    src={artwork.image}
                                    alt={artwork.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-2">{artwork.title}</h3>
                                <p className="text-gray-600 mb-4">por {artwork.artist}</p>
                                <p className="text-gray-700 mb-4">{artwork.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {artwork.badges.map((badge, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                                        >
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold">${artwork.price}</span>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800"
                                            onClick={onClose}
                                        >
                                            Cerrar
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}