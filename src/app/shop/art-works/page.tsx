'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
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
    additionalImages: string[];
    category: string;
    description: string;
    dimensions: string;
    medium: string;
    dateCreated: string;
    availability: string;
    certificateInfo: string;
}

const artworks: Artwork[] = [
    {
        id: "1",
        title: "The Joker",
        artist: "Van Robert",
        price: 8640,
        image: "/images/12.jpg",
        additionalImages: [
            "/images/12-detail-1.jpg",
            "/images/12-detail-2.jpg",
            "/images/12-detail-3.jpg"
        ],
        category: "Abstract",
        description: "This vibrant abstract painting captures the essence of chaos and creativity. The piece showcases a masterful blend of colors and techniques, creating a dynamic and engaging visual experience. Each brushstroke has been carefully considered to contribute to the overall composition, resulting in a piece that continues to reveal new details with each viewing.",
        dimensions: "18\" x 48\"",
        medium: "Mix on Canvas",
        dateCreated: "2023",
        availability: "One of One - Original Piece",
        certificateInfo: "Comes with a certificate of authenticity signed by the artist"
    },
    {
        id: "2",
        title: "Breath",
        artist: "Van Robert",
        price: 7040,
        image: "/images/2.jpg",
        additionalImages: [
            "/images/2-detail-1.jpg",
            "/images/2-detail-2.jpg",
            "/images/2-detail-3.jpg"
        ],
        category: "Abstract",
        description: "\"Breath\" is an abstract painting that evokes a sense of movement and depth through its fluid composition. Dominated by shades of green, turquoise, and yellow, the piece features a swirling energy at its center, resembling an organic burst or a breath of life. Textured elements and delicate ripples add dimension, while the contrast between dark and light tones creates a dynamic, almost ethereal atmosphere. The painting invites the viewer to feel the flow of energy and emotion within its vibrant strokes.",
        dimensions: "22\" x 32\"",
        medium: "Mix on Canvas",
        dateCreated: "2023",
        availability: "One of One - Original Piece",
        certificateInfo: "Comes with a certificate of authenticity signed by the artist"
    },
    {
        id: "3",
        title: "Emotions Found",
        artist: "Van Robert",
        price: 6160,
        image: "/images/21.jpg",
        additionalImages: [
            "/images/21-detail-1.jpg",
            "/images/21-detail-2.jpg",
            "/images/21-detail-3.jpg"
        ],
        category: "Abstract",
        description: "\"Emotions Found\" is a vibrant abstract piece that blends warm and cool tones in a dynamic vertical flow. Swirling shapes and bold textures create a sense of movement, evoking deep emotional expression and energy.",
        dimensions: "22\" x 28\"",
        medium: "Mix on Canvas",
        dateCreated: "2023",
        availability: "One of One - Original Piece",
        certificateInfo: "Comes with a certificate of authenticity signed by the artist"
    },
    {
        id: "4",
        title: "Ancient Face",
        artist: "Van Robert",
        price: 15840,
        image: "/images/15.jpg",
        additionalImages: [
            "/images/15-detail-1.jpg",
            "/images/15-detail-2.jpg",
            "/images/15-detail-3.jpg"
        ],
        category: "Abstract",
        description: "\"Ancient Face\" features a human profile silhouette emerging from an explosion of colors and abstract shapes. With dark tones and vibrant bursts of red, yellow, and blue, the piece evokes a sense of mysticism and connection to the past. Its fluid and expressive composition suggests a fusion between the human and the ethereal.",
        dimensions: "36\" x 44\"",
        medium: "Mix on Canvas",
        dateCreated: "2023",
        availability: "One of One - Original Piece",
        certificateInfo: "Comes with a certificate of authenticity signed by the artist"
    },
    {
        id: "5",
        title: "Falconry",
        artist: "Van Robert",
        price: 18000,
        image: "/images/14.jpg",
        additionalImages: [
            "/images/14-detail-1.jpg",
            "/images/14-detail-2.jpg",
            "/images/14-detail-3.jpg"
        ],
        category: "Abstract",
        description:  "Falconry is an abstract artwork featuring dynamic swirls and textures in warm tones of orange, brown, and gold, contrasted with cool turquoise. The composition suggests movement and energy, evoking the grace and power of falconry.",
        dimensions: "30\" x 60\"",
        medium: "Mix on Canvas",
        dateCreated: "2023",
        availability: "One of One - Original Piece",
        certificateInfo: "Comes with a certificate of authenticity signed by the artist"
    },
    {
        id: "6",
        title: "The Lady",
        artist: "Van Robert",
        price: 20000,
        image: "/images/9.jpg",
        additionalImages: [
            "/images/9-detail-1.jpg",
            "/images/9-detail-2.jpg",
            "/images/9-detail-3.jpg"
        ],
        category: "Portrait",
        description:  "\"The Lady\" is a striking artwork depicting a woman in a moment of elegance and introspection. She is dressed in a flowing, off-shoulder gown, holding a glass of wine. The background features a blend of dark and warm tones, highlighting her graceful pose and serene expression. The use of light and shadow adds depth and emotion to the piece.",
        dimensions: "40\" x 50\"",
        medium: "Mix on Canvas",
        dateCreated: "2023",
        availability: "One of One - Original Piece",
        certificateInfo: "Comes with a certificate of authenticity signed by the artist"
    },
    {
        id: "7",
        title: "Angel Dance",
        artist: "Van Robert",
        price: 12000,
        image: "/images/16.jpg",
        additionalImages: [
            "/images/16-detail-1.jpg",
            "/images/16-detail-2.jpg",
            "/images/16-detail-3.jpg"
        ],
        category: "Abstract",
        description:  "\"Angel Dance\" is an abstract artwork with vibrant swirls of blue, green, orange, and red, capturing dynamic and ethereal movement.",
        dimensions: "30\" x 40\"",
        medium: "Mix on Canvas",
        dateCreated: "2023",
        availability: "One of One - Original Piece",
        certificateInfo: "Comes with a certificate of authenticity signed by the artist"
    },
    {
        id: "8",
        title: "Jazz Night",
        artist: "Van Robert",
        price: 8640,
        image: "/images/13.jpg",
        additionalImages: [
            "/images/13-detail-1.jpg",
            "/images/13-detail-2.jpg",
            "/images/13-detail-3.jpg"
        ],
        category: "Abstract",
        description:  "\"Jazz Night\" depicts a musician playing a saxophone, surrounded by vibrant bursts of color. The artwork captures the lively and soulful essence of a jazz performance.",
        dimensions: "24\" x 36\"",
        medium: "Mix on Canvas",
        dateCreated: "2023",
        availability: "One of One - Original Piece",
        certificateInfo: "Comes with a certificate of authenticity signed by the artist"
    },
    {
        id: "9",
        title: "Illusions Seller",
        artist: "Van Robert",
        price: 15000,
        image: "/images/8.jpg",
        additionalImages: [
            "/images/8-detail-1.jpg",
            "/images/8-detail-2.jpg",
            "/images/8-detail-3.jpg"
        ],
        category: "Abstract",
        description:  "\"Illusions Seller\" is an abstract piece with vibrant splashes of red, green, and yellow. The dynamic forms and colors create a sense of mystery and movement, evoking the concept of illusions.",
        dimensions: "30\" x 50\"",
        medium: "Mix on Canvas",
        dateCreated: "2023",
        availability: "One of One - Original Piece",
        certificateInfo: "Comes with a certificate of authenticity signed by the artist"
    },
    {
        id: "10",
        title: "Coming from there",
        artist: "Van Robert",
        price: 14400,
        image: "/images/6.jpg",
        additionalImages: [
            "/images/6-detail-1.jpg",
            "/images/6-detail-2.jpg",
            "/images/6-detail-3.jpg"
        ],
        category: "Abstract",
        description:  "\"Coming from There\" portrays the journey of an immigrant starting anew. The artwork uses vibrant colors and dynamic forms to symbolize hope, struggle, and the pursuit of dreams. The swirling motion reflects the challenges and aspirations of beginning from the bottom.",
        dimensions: "30\" x 48\"",
        medium: "Mix on Canvas",
        dateCreated: "2023",
        availability: "One of One - Original Piece",
        certificateInfo: "Comes with a certificate of authenticity signed by the artist"
    },
    {
        id: "11",
        title: "Perfect Combination",
        artist: "Van Robert",
        price: 17280,
        image: "/images/5.jpg",
        additionalImages: [
            "/images/5-detail-1.jpg",
            "/images/5-detail-2.jpg",
            "/images/5-detail-3.jpg"
        ],
        category: "Abstract",
        description:  "\"Perfect Combination\" features a vibrant fusion of musical instruments, including a saxophone and a violin. The artwork uses bold colors and dynamic forms to convey harmony and the blending of musical elements, creating a lively and energetic composition.",
        dimensions: "36\" x 48\"",
        medium: "Mix on Canvas",
        dateCreated: "2023",
        availability: "One of One - Original Piece",
        certificateInfo: "Comes with a certificate of authenticity signed by the artist"
    },
    {
        id: "12",
        title: "Sunflower Dream",
        artist: "Van Robert",
        price: 13875,
        image: "/images/7.jpg",
        additionalImages: [
            "/images/7-detail-1.jpg",
            "/images/7-detail-2.jpg",
            "/images/7-detail-3.jpg"
        ],
        category: "Abstract",
        description:  "\"Sunflower Dream\" is an abstract artwork with vibrant swirls of green, yellow, and orange. The colors and fluid forms evoke the essence of sunflowers, creating a dreamy and lively atmosphere.",
        dimensions: "18.5\" x 75\"",
        medium: "Mix on Canvas",
        dateCreated: "2023",
        availability: "One of One - Original Piece",
        certificateInfo: "Comes with a certificate of authenticity signed by the artist"
    },
    {
        id: "13",
        title: "Love Seller",
        artist: "Van Robert",
        price: 34500,
        image: "/images/4.jpg",
        additionalImages: [
            "/images/4-detail-1.jpg",
            "/images/4-detail-2.jpg",
            "/images/4-detail-3.jpg"
        ],
        category: "Abstract",
        description:  "\"Love Seller\" is an abstract piece featuring vibrant colors like red, yellow, and green. The swirling forms and dynamic composition evoke emotions and the concept of love, creating a vivid and expressive atmosphere.",
        dimensions: "48\" x 72\"",
        medium: "Mix on Canvas",
        dateCreated: "2023",
        availability: "One of One - Original Piece",
        certificateInfo: "Comes with a certificate of authenticity signed by the artist"
    },
    {
        id: "14",
        title: "Heart Healer",
        artist: "Van Robert",
        price: 46800,
        image: "/images/1.jpg",
        additionalImages: [
            "/images/1-detail-1.jpg",
            "/images/1-detail-2.jpg",
            "/images/1-detail-3.jpg"
        ],
        category: "Abstract",
        description:  "\"Heart Healer\" is an abstract artwork with vibrant colors like green, red, and yellow. The swirling forms create a sense of healing and emotion, evoking the concept of mending and renewal.",
        dimensions: "52\" x 90\"",
        medium: "Mix on Canvas",
        dateCreated: "2023",
        availability: "One of One - Original Piece",
        certificateInfo: "Comes with a certificate of authenticity signed by the artist"
    },
    {
        id: "15",
        title: "Dialogue",
        artist: "Van Robert",
        price: 17280,
        image: "/images/3.jpg",
        additionalImages: [
            "/images/3-detail-1.jpg",
            "/images/3-detail-2.jpg",
            "/images/3-detail-3.jpg"
        ],
        category: "Abstract",
        description:  "\"Dialogue\" is an abstract piece featuring vibrant colors like blue, red, and orange. The dynamic forms suggest interaction and communication, evoking the essence of a lively conversation.",
        dimensions: "36\" x 48\"",
        medium: "Mix on Canvas",
        dateCreated: "2023",
        availability: "One of One - Original Piece",
        certificateInfo: "Comes with a certificate of authenticity signed by the artist"
    },
];

const categories = ['All', 'Abstract', 'Portrait'];

const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under $3000', value: 'under-3000' },
    { label: '$10000 - $20000', value: '10000-20000' },
    { label: '$20000 - $30000', value: '20000-30000' },
    { label: 'Over $40000', value: 'over-40000' }
];

export default function ArtWorksPage() {
    const router = useRouter()
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
            <main className="min-h-screen bg-white pt-24">
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
                                <div
                                    className="relative aspect-[3/4] cursor-pointer"
                                    onClick={() => router.push(`/shop/art-works/${artwork.id}`)}
                                >
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
                                            <p className="text-sm font-medium mt-3 flex items-center gap-2">
                                                Click to view details
                                                <svg
                                                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </p>
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
                                    <div className="space-y-3">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => router.push(`/shop/art-works/${artwork.id}`)}
                                            className="w-full px-6 py-3 bg-white text-black border-2 border-black rounded-full
                                     hover:bg-gray-100 transition-colors flex items-center
                                     justify-center gap-2 group"
                                        >
                                            <span>View Details</span>
                                            <svg
                                                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </motion.button>
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
            </main>
        </>
    )
}