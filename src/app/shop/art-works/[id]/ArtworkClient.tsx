'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import Cart from '@/components/shop/Cart'
import FramePreview from '@/components/shop/FramePreview'
import {Navbar} from "@/components/layout";

interface ArtworkClientProps {
    id: string;
}


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
        medium: "Oil on Canvas",
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
        medium: "Oil on Canvas",
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
        medium: "Oil on Canvas",
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
        medium: "Oil on Canvas",
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
        medium: "Oil on Canvas",
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
        medium: "Oil on Canvas",
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
        medium: "Oil on Canvas",
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
        medium: "Oil on Canvas",
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
        medium: "Oil on Canvas",
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
        medium: "Oil on Canvas",
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
        medium: "Oil on Canvas",
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
        medium: "Oil on Canvas",
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
        medium: "Oil on Canvas",
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
        medium: "Oil on Canvas",
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
        medium: "Oil on Canvas",
        dateCreated: "2023",
        availability: "One of One - Original Piece",
        certificateInfo: "Comes with a certificate of authenticity signed by the artist"
    },
];

export default function ArtworkClient({ id }: ArtworkClientProps) {
    const router = useRouter()
    const { addItem, items } = useCart()
    const [selectedImage, setSelectedImage] = useState(0)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isFramePreviewOpen, setIsFramePreviewOpen] = useState(false)

    const artwork = artworks.find(art => art.id === id)

    if (!artwork) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Artwork Not Found</h1>
                    <button
                        onClick={() => router.push('/shop')}
                        className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                    >
                        Return to Gallery
                    </button>
                </div>
            </div>
        )
    }

    const handleFrameSelect = (frame: string) => {
        addItem({
            id: `${artwork.id}-${frame}`,
            title: artwork.title,
            price: artwork.price,
            image: artwork.image,
            frame,
            quantity: 1
        })
        setIsFramePreviewOpen(false)
        setIsCartOpen(true)
    }

    const allImages = [artwork.image, ...artwork.additionalImages]

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white pt-24">
                <div className="container mx-auto px-4 py-12">
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <button
                            onClick={() => router.push('/shop/art-works')}
                            className="text-gray-600 hover:text-black flex items-center gap-2 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Gallery
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Galería de Imágenes */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-xl overflow-hidden"
                            >
                                <Image
                                    src={allImages[selectedImage]}
                                    alt={artwork.title}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-auto h-auto"
                                    priority
                                    unoptimized
                                />
                            </motion.div>

                            {/* Miniaturas */}
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {allImages.map((img, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative w-24 aspect-square rounded-lg overflow-hidden
                                              ${selectedImage === index ? 'ring-2 ring-black' : ''}`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${artwork.title} view ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Información de la Obra */}
                        <div className="space-y-8">
                            <div>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-4xl font-bold mb-4"
                                >
                                    {artwork.title}
                                </motion.h1>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center gap-4"
                                >
                                    <span className="text-3xl font-bold">${artwork.price.toLocaleString()}</span>
                                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                        {artwork.category}
                                    </span>
                                </motion.div>
                            </div>

                            {/* Detalles Técnicos */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-gray-500 text-sm">Artist</h3>
                                        <p className="font-medium">{artwork.artist}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-500 text-sm">Year</h3>
                                        <p className="font-medium">{artwork.dateCreated}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-500 text-sm">Medium</h3>
                                        <p className="font-medium">{artwork.medium}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-500 text-sm">Dimensions</h3>
                                        <p className="font-medium">{artwork.dimensions}</p>
                                    </div>
                                </div>

                                {/* Descripción */}
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">About this piece</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {artwork.description}
                                    </p>
                                </div>

                                {/* Disponibilidad y Certificado */}
                                <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Availability</h3>
                                        <p className="text-gray-600">{artwork.availability}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Authentication</h3>
                                        <p className="text-gray-600">{artwork.certificateInfo}</p>
                                    </div>
                                </div>

                                {/* Botones de Acción */}
                                <div className="space-y-4 pt-6">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setIsFramePreviewOpen(true)}
                                        className="w-full px-8 py-4 bg-black text-white rounded-full
                                             hover:bg-gray-800 transition-colors flex items-center
                                             justify-center gap-3 text-lg font-medium"
                                    >
                                        Add to Cart
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            // Aquí puedes agregar la lógica para contactar al artista
                                        }}
                                        className="w-full px-8 py-4 border-2 border-black text-black rounded-full
                                             hover:bg-gray-100 transition-colors flex items-center
                                             justify-center gap-3 text-lg font-medium"
                                    >
                                        Contact About This Piece
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                            />
                                        </svg>
                                    </motion.button>
                                </div>

                                {/* Información Adicional */}
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                                    <ul className="space-y-3 text-gray-600">
                                        <li className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M5 13l4 4L19 7" />
                                            </svg>
                                            Professional packaging and shipping
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M5 13l4 4L19 7" />
                                            </svg>
                                            Certificate of authenticity included
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M5 13l4 4L19 7" />
                                            </svg>
                                            Ready to hang
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        </div>
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
                <FramePreview
                    isOpen={isFramePreviewOpen}
                    onClose={() => setIsFramePreviewOpen(false)}
                    artwork={artwork}
                    onFrameSelect={handleFrameSelect}
                />
            </div>
        </>
    )
}