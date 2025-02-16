'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import Cart from '@/components/shop/Cart'
import FramePreview from '@/components/shop/FramePreview'
import Navbar from '@/components/layout/Navbar'

interface Artwork {
    id: string;
    title: string;
    artist: string;
    price: number;
    image: string;
    category: string;
    description: string;
    dimensions: string;
    medium: string;
}

// Datos de las obras
const artworks: Artwork[] = Array.from({ length: 21 }, (_, i) => ({
    id: String(i + 1),
    title: `Masterpiece ${i + 1}`,
    artist: 'Van Robert',
    price: Math.floor(Math.random() * (5000 - 800) + 800),
    image: `/images/${i + 1}.jpg`,
    category: ['Abstract', 'Urban', 'Portrait', 'Landscape'][Math.floor(Math.random() * 4)],
    description: 'A unique piece that captures the essence of modern artistry and expression.',
    dimensions: '24" x 36"',
    medium: ['Oil on Canvas', 'Acrylic on Canvas', 'Mixed Media'][Math.floor(Math.random() * 3)]
}));

const categories = ['All', 'Abstract', 'Urban', 'Portrait', 'Landscape'];

const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under $1000', value: 'under-1000' },
    { label: '$1000 - $2000', value: '1000-2000' },
    { label: '$2000 - $3000', value: '2000-3000' },
    { label: 'Over $3000', value: 'over-3000' }
];

export default function ArtWorksPage() {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isFramePreviewOpen, setIsFramePreviewOpen] = useState(false)
    const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
    const [activeCategory, setActiveCategory] = useState('All')
    const [activePriceRange, setActivePriceRange] = useState('all')
    const { addItem, items } = useCart()

    const handleFrameSelect = (frame: string) => {
        if (selectedArtwork) {
            addItem({
                id: `${selectedArtwork.id}-${frame}`,
                title: selectedArtwork.title,
                price: selectedArtwork.price,
                image: selectedArtwork.image,
                frame,
                quantity: 1
            })
            setIsFramePreviewOpen(false)
            setIsCartOpen(true)
        }
    }

    const filteredArtworks = artworks
        .filter(art => activeCategory === 'All' || art.category === activeCategory)
        .filter(art => {
            switch (activePriceRange) {
                case 'under-1000':
                    return art.price < 1000;
                case '1000-2000':
                    return art.price >= 1000 && art.price < 2000;
                case '2000-3000':
                    return art.price >= 2000 && art.price < 3000;
                case 'over-3000':
                    return art.price >= 3000;
                default:
                    return true;
            }
        });

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white pt-24">
                {/* Header Section */}
                <section className="relative h-[60vh] bg-black overflow-hidden">
                    <Image
                        src="/images/artworks.jpg"
                        alt="Art Collection"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
                    <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold text-white mb-6 text-center"
                        >
                            Art Collection
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-white/90 text-center max-w-2xl"
                        >
                            Discover and collect unique masterpieces by Van Robert
                        </motion.p>
                    </div>
                </section>
                {/* Filters Section */}
                <section className="sticky top-24 z-20 bg-white border-b">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-wrap gap-4 justify-between items-center">
                            {/* Categories */}
                            <div className="flex gap-3 overflow-x-auto pb-2 flex-grow">
                                {categories.map((category) => (
                                    <motion.button
                                        key={category}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-6 py-2 rounded-full whitespace-nowrap
                                                 transition-colors ${
                                            activeCategory === category
                                                ? 'bg-black text-white'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                        }`}
                                    >
                                        {category}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Price Range Filter */}
                            <select
                                value={activePriceRange}
                                onChange={(e) => setActivePriceRange(e.target.value)}
                                className="px-4 py-2 border rounded-lg bg-white"
                            >
                                {priceRanges.map((range) => (
                                    <option key={range.value} value={range.value}>
                                        {range.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>

                {/* Artworks Grid */}
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredArtworks.map((artwork) => (
                            <motion.div
                                key={artwork.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group bg-white rounded-xl shadow-lg overflow-hidden
                                         hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative aspect-[3/4]">
                                    <Image
                                        src={artwork.image}
                                        alt={artwork.title}
                                        fill
                                        className="object-cover group-hover:scale-105
                                                 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent
                                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                                  flex items-end p-6">
                                        <div className="text-white">
                                            <h3 className="text-xl font-bold mb-2">{artwork.title}</h3>
                                            <p className="text-sm opacity-90">{artwork.medium}</p>
                                            <p className="text-sm opacity-90">{artwork.dimensions}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-2xl font-bold">${artwork.price.toLocaleString()}</span>
                                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                            {artwork.category}
                                        </span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            setSelectedArtwork(artwork)
                                            setIsFramePreviewOpen(true)
                                        }}
                                        className="w-full px-6 py-3 bg-black text-white rounded-full
                                                 hover:bg-gray-800 transition-colors flex items-center
                                                 justify-center gap-2 group"
                                    >
                                        <span>Add to Cart</span>
                                        <svg
                                            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                {/* Cart Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsCartOpen(true)}
                    className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full
                             shadow-lg hover:bg-gray-800 transition-colors z-40"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {items.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6
                                       rounded-full flex items-center justify-center text-sm font-bold">
                            {items.length}
                        </span>
                    )}
                </motion.button>

                {/* Modals */}
                <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                {selectedArtwork && (
                    <FramePreview
                        isOpen={isFramePreviewOpen}
                        onClose={() => setIsFramePreviewOpen(false)}
                        artwork={selectedArtwork}
                        onFrameSelect={handleFrameSelect}
                    />
                )}
            </div>
        </>
    )
}