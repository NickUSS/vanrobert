'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import AnnouncementBanner from '@/components/home/AnnouncementBanner';
import CoursesSection from '@/components/home/EventsSection';
import InstagramFeed from '@/components/home/InstagramFeed';
import Testimonials from '@/components/home/Testimonials';
import Stats from '@/components/home/Stats';
import AdvancedFilters from '@/components/filters/AdvancedFilters';
import CustomCursor from '@/components/common/CustomCursor';
import { PriceRange, SortOption } from '@/types/art';

interface FilterState {
    price: PriceRange;
    sort: SortOption;
    date: string;
    category: string;
}

const GALLERY_IMAGES = [2, 3, 4].map(num => ({
    id: num,
    src: `/images/${num}.jpg`,
    title: `Artwork ${num}`,
    category: 'artwork',
    price: Math.floor(Math.random() * 1000) + 500
}));

const SHOP_SECTIONS = [
    {
        id: 'summer',
        title: 'Summer Collection',
        subtitle: '2025',
        image: '/images/fashion1.jpg',
        href: '/fashion/summer'
    },
    {
        id: 'winter',
        title: 'Winter Collection',
        subtitle: '2025',
        image: '/images/fashion2.jpg',
        href: '/fashion/winter'
    }
];

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [activeImage, setActiveImage] = useState<number | null>(null);
    const [filters, setFilters] = useState<FilterState>({
        price: 'all',
        sort: 'popular',
        date: 'all',
        category: 'all'
    });
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showAnnouncement, setShowAnnouncement] = useState(true);

    useEffect(() => {
        const bannerState = localStorage.getItem('announcementBannerVisible');
        if (bannerState === 'false') {
            setShowAnnouncement(false);
        }
    }, []);

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

    const handleAnnouncementClose = () => {
        setShowAnnouncement(false);
        localStorage.setItem('announcementBannerVisible', 'false');
    };

    const handleFilterChange = <T extends keyof FilterState>(
        type: T,
        value: FilterState[T]
    ) => {
        setFilters(prev => ({...prev, [type]: value}));
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <LoadingSpinner/>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-black"> {/* Cambiado a bg-black */}
            <CustomCursor/>

            {/* Banner de anuncios */}
            <AnimatePresence>
                {showAnnouncement && (
                    <AnnouncementBanner
                        isVisible={showAnnouncement}
                        onClose={handleAnnouncementClose}
                    />
                )}
            </AnimatePresence>

            {/* Main Content - Eliminado el padding superior */}
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5}}
            >
                <HeroSection/>
                <main className="relative z-10 bg-white"> {/* Añadido bg-white aquí */}
                    <Stats/>
                    <GallerySection
                        filters={filters}
                        handleFilterChange={handleFilterChange}
                        activeImage={activeImage}
                        setActiveImage={setActiveImage}
                    />
                    <ShopSection/>
                    <CoursesSection/>
                    <InstagramFeed/>
                    <Testimonials/>
                    <NewsletterSection/>
                </main>

                <AnimatePresence>
                    {showScrollTop && (
                        <ScrollToTopButton
                            show={showScrollTop}
                            onClick={scrollToTop}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

// Hero Section Component
const HeroSection = () => (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
            <Image
                src="/images/4.jpg"
                alt="Hero background"
                fill
                priority
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg"
            >
                Van Robert
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-md"
            >
                Art • Design • Expression
            </motion.p>
            <HeroButtons />
        </div>

        <ScrollIndicator />
    </section>
);

// Hero Buttons Component
const HeroButtons = () => (
    <div className="flex flex-row space-x-4 justify-center">
        <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/90 backdrop-blur-sm text-black px-8 py-3
                     rounded-full text-lg font-medium hover:bg-white
                     transition-all duration-300 shadow-lg hover:shadow-xl
                     transform hover:-translate-y-0.5"
        >
            Explore Collection
        </motion.button>
        <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-white/90 backdrop-blur-sm text-white
                     px-8 py-3 rounded-full text-lg font-medium
                     hover:bg-white/20 transition-all duration-300
                     shadow-lg hover:shadow-xl transform
                     hover:-translate-y-0.5"
        >
            Learn More
        </motion.button>
    </div>
);

// Scroll Indicator Component
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
            className="w-6 h-10 border-2 border-white rounded-full relative
                     shadow-lg backdrop-blur-sm"
        >
            <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-white rounded-full absolute
                         left-1/2 top-2 transform -translate-x-1/2"
            />
        </motion.div>
    </motion.div>
);

// Gallery Section Component
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
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Artworks</h2>
                <p className="text-gray-600">Discover Van Robert latest creations</p>
            </div>

            <AdvancedFilters
                onPriceRangeChange={(value) => handleFilterChange('price', value)}
                onSortChange={(value) => handleFilterChange('sort', value)}
                selectedPrice={filters.price}
                selectedSort={filters.sort}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
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
        </motion.div>
    </section>
);

// Gallery Item Component
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
                        View Details
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
);

// Scroll To Top Button Component
interface ScrollToTopButtonProps {
    show: boolean;
    onClick: () => void;
}

const ScrollToTopButton = ({onClick }: ScrollToTopButtonProps) => (
    <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        onClick={onClick}
        className="fixed bottom-8 right-8 bg-black text-white
                 w-12 h-12 rounded-full flex items-center justify-center
                 shadow-lg hover:bg-gray-800 transition-all duration-300
                 z-50 group"
    >
        <motion.svg
            className="w-6 h-6 transition-transform group-hover:-translate-y-1"
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
        </motion.svg>
    </motion.button>
);

// Shop Section Component
const ShopSection = () => (
    <section className="py-20 px-4 md:px-8 bg-gray-50">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-16"
        >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Fashion Collections</h2>
            <p className="text-gray-600 text-lg">
                Discover Van Robert exclusive seasonal fashion collections
            </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {SHOP_SECTIONS.map((section) => (
                <ShopItem key={section.id} section={section} />
            ))}
        </div>
    </section>
);

// Shop Item Component
interface ShopItemProps {
    section: typeof SHOP_SECTIONS[0];
}

const ShopItem = ({ section }: ShopItemProps) => (
    <Link href={section.href}>
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative h-[500px] rounded-xl overflow-hidden group cursor-pointer"
        >
            <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50
                         transition-colors duration-300 flex flex-col items-center justify-center">
                <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                >
                    <h3 className="text-4xl font-bold text-white mb-2">
                        {section.title}
                    </h3>
                    <p className="text-2xl text-white/90 font-light mb-4">
                        {section.subtitle}
                    </p>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="inline-block px-6 py-2 border-2 border-white text-white text-lg
                                 hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Explore Collection
                    </motion.span>
                </motion.div>
            </div>
        </motion.div>
    </Link>
);

// Newsletter Section Component
const NewsletterSection = () => (
    <section className="relative py-20 bg-black text-white">
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="container mx-auto px-4 text-center"
        >
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Stay Updated
                </h2>
                <p className="text-gray-300 mb-8">
                    Subscribe to receive updates about new artworks,
                    exclusive releases, and special announcements.
                </p>
                <NewsletterForm />
            </div>
        </motion.div>
    </section>
);

// Newsletter Form Component
const NewsletterForm = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Simulación de envío de formulario
            await new Promise(resolve => setTimeout(resolve, 1000));
            setStatus('success');
            setEmail('');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                    placeholder="Your email address"
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
                    {status === 'loading' ? 'Sending...' : 'Subscribe'}
                </motion.button>
            </div>
            <AnimatePresence>
                {status === 'success' && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-green-400 mt-2"
                    >
                        Thank you for subscribing!
                    </motion.p>
                )}
                {status === 'error' && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-400 mt-2"
                    >
                        An error occurred. Please try again.
                    </motion.p>
                )}
            </AnimatePresence>
        </form>
    );
};