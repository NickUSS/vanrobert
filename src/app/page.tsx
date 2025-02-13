'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import AnimatedBackground from '@/components/common/AnimatedBackground';
import AnnouncementBanner from '@/components/home/AnnouncementBanner';
import EventsSection from '@/components/home/EventsSection';
import InstagramFeed from '@/components/home/InstagramFeed';
import Newsletter from '@/components/home/Newsletter';
import Testimonials from '@/components/home/Testimonials';
import Stats from '@/components/home/Stats';
import AdvancedFilters from '@/components/filters/AdvancedFilters';
import CustomCursor from '@/components/common/CustomCursor';
import { PriceRange, SortOption } from '@/types/art';

// Interfaces
interface Theme {
    background: string;
    text: string;
    accent: string;
}

interface FilterState {
    price: PriceRange;
    sort: SortOption;
    date: string;
    category: string;
}

// Constantes
const THEME = {
    light: {
        background: 'bg-white',
        text: 'text-black',
        accent: 'bg-black'
    },
    dark: {
        background: 'bg-black',
        text: 'text-white',
        accent: 'bg-white'
    }
} as const;

const GALLERY_IMAGES = [2, 3, 4].map(num => ({
    id: num,
    src: `/images/${num}.jpeg`,
    title: `Artwork ${num}`,
    category: 'art',
    price: Math.floor(Math.random() * 1000) + 500
}));

const SHOP_SECTIONS = [
    {
        id: 'art',
        title: 'Cuadros',
        image: '/images/5.jpeg',
        href: '/shop/art'
    },
    {
        id: 'clothing',
        title: 'Ropa',
        image: '/images/6.jpeg',
        href: '/shop/clothing'
    }
];

export default function HomePage() {
    // Estados
    const [isLoading, setIsLoading] = useState(true);
    const [activeImage, setActiveImage] = useState<number | null>(null);
    const [filters, setFilters] = useState<FilterState>({
        price: 'all',
        sort: 'popular',
        date: 'all',
        category: 'all'
    });
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Efectos
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handlers
    const handleFilterChange = <T extends keyof FilterState>(
        type: T,
        value: FilterState[T]
    ) => {
        setFilters(prev => ({ ...prev, [type]: value }));
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-white">
            <CustomCursor />
            <AnnouncementBanner />

            <HeroSection />
            <Stats />

            <GallerySection
                filters={filters}
                handleFilterChange={handleFilterChange}
                activeImage={activeImage}
                setActiveImage={setActiveImage}
            />

            <ShopSection />
            <EventsSection />
            <InstagramFeed />
            <Testimonials />
            <NewsletterSection />

            <ScrollToTopButton
                show={showScrollTop}
                onClick={scrollToTop}
            />
        </div>
    );
}

// Hero Section Component
const HeroSection = () => (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-black">
            <Image
                src="/images/1.jpeg"
                alt="Hero"
                fill
                priority
                className="object-cover opacity-50 mix-blend-overlay"
            />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-6 text-white"
            >
                Van Robert
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl mb-8 text-white"
            >
                Arte • Diseño • Moda
            </motion.p>
            <HeroButtons />
        </div>

        <ScrollIndicator />
    </section>
);

const HeroButtons = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
    >
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-8 py-3 rounded-full text-lg font-medium
                     hover:bg-gray-100 transition-all duration-300"
        >
            Explorar Colección
        </motion.button>
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-white text-white px-8 py-3 rounded-full text-lg
                     font-medium hover:bg-white hover:text-black transition-all duration-300"
        >
            Conocer Más
        </motion.button>
    </motion.div>
);

const ScrollIndicator = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    >
        <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full relative"
        >
            <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-white rounded-full absolute left-1/2 top-2
                         transform -translate-x-1/2"
            />
        </motion.div>
    </motion.div>
);

// GallerySection
interface GallerySectionProps {
    filters: FilterState;
    handleFilterChange: <T extends keyof FilterState>(type: T, value: FilterState[T]) => void;
    activeImage: number | null;
    setActiveImage: (id: number | null) => void;
}

const GallerySection = ({
                            filters,
                            handleFilterChange,
                            activeImage,
                            setActiveImage
                        }: GallerySectionProps) => (
    <section className="py-20 px-4 md:px-8 bg-white">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto mb-12"
        >
            <AdvancedFilters
                onPriceRangeChange={(value) => handleFilterChange('price', value)}
                onSortChange={(value) => handleFilterChange('sort', value)}
                onDateRangeChange={(value) => handleFilterChange('date', value)}
                selectedPrice={filters.price}
                selectedSort={filters.sort}
                selectedDate={filters.date}
            />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {GALLERY_IMAGES.map((image) => (
                <GalleryItem
                    key={image.id}
                    image={image}
                    isActive={activeImage === image.id}
                    onHoverStart={() => setActiveImage(image.id)}
                    onHoverEnd={() => setActiveImage(null)}
                />
            ))}
        </div>
    </section>
);

// GalleryItem
interface GalleryItemProps {
    image: typeof GALLERY_IMAGES[0];
    isActive: boolean;
    onHoverStart: () => void;
    onHoverEnd: () => void;
}

const GalleryItem = ({ image, isActive, onHoverStart, onHoverEnd }: GalleryItemProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        className="relative aspect-square rounded-xl overflow-hidden group"
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
    >
        <Image
            src={image.src}
            alt={image.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4"
                >
                    <h3 className="text-white text-xl font-bold mb-2">{image.title}</h3>
                    <p className="text-white/80 mb-4">${image.price}</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-black px-6 py-2 rounded-full
                                 hover:bg-gray-100 transition-all duration-300"
                    >
                        Ver Detalles
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
);

// ShopSection
const ShopSection = () => (
    <section className="py-20 px-4 md:px-8 bg-gray-50">
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
            Tienda
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {SHOP_SECTIONS.map((section) => (
                <ShopItem key={section.id} section={section} />
            ))}
        </div>
    </section>
);

// ShopItem
interface ShopItemProps {
    section: typeof SHOP_SECTIONS[0];
}

const ShopItem = ({ section }: ShopItemProps) => (
    <Link href={section.href}>
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative h-[400px] rounded-xl overflow-hidden group cursor-pointer"
        >
            <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60
                         transition-colors duration-300 flex items-center justify-center">
                <motion.h3
                    className="text-3xl font-bold text-white"
                    whileHover={{ scale: 1.1 }}
                >
                    {section.title}
                </motion.h3>
            </div>
        </motion.div>
    </Link>
);

// NewsletterSection
const NewsletterSection = () => (
    <section className="relative py-20 bg-black text-white overflow-hidden">
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="container mx-auto px-4 text-center relative z-10"
        >
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Mantente Informado
                </h2>
                <p className="text-gray-300 mb-8">
                    Suscríbete para recibir las últimas noticias sobre arte,
                    eventos exclusivos y lanzamientos especiales.
                </p>
                <NewsletterForm />
            </div>
        </motion.div>
        <div className="absolute inset-0 opacity-10">
            <AnimatedBackground />
        </div>
    </section>
);

// NewsletterForm Component
const NewsletterForm = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Aquí iría la lógica de suscripción
            await new Promise(resolve => setTimeout(resolve, 1000));
            setStatus('success');
            setEmail('');
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico"
                    className="flex-1 px-4 py-3 rounded-full bg-white/10
                             border border-white/20 text-white placeholder-white/50
                             focus:outline-none focus:ring-2 focus:ring-white/50
                             transition-all duration-300"
                    required
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-white text-black rounded-full
                             font-medium hover:bg-gray-100 transition-colors
                             disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? 'Enviando...' : 'Suscribirse'}
                </motion.button>
            </div>
            {status === 'success' && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 mt-2"
                >
                    ¡Gracias por suscribirte!
                </motion.p>
            )}
            {status === 'error' && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 mt-2"
                >
                    Hubo un error. Por favor, intenta de nuevo.
                </motion.p>
            )}
        </form>
    );
};

// ScrollToTopButton
interface ScrollToTopButtonProps {
    show: boolean;
    onClick: () => void;
}

const ScrollToTopButton = ({ show, onClick }: ScrollToTopButtonProps) => (
    <AnimatePresence>
        {show && (
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={onClick}
                className="fixed bottom-8 right-8 bg-black text-white
                         w-12 h-12 rounded-full flex items-center justify-center
                         shadow-lg hover:bg-gray-800 transition-all duration-300
                         z-50"
            >
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
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                </svg>
            </motion.button>
        )}
    </AnimatePresence>
);

// Utilidades adicionales
const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};