'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';

interface AnnouncementBannerProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function AnnouncementBanner({ isVisible, onClose }: AnnouncementBannerProps) {
    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.6
            }}
            className="fixed top-24 right-4 z-[100] max-w-sm" // Aumentado el z-index y quitada la dependencia del navbar
        >
            <div className="bg-black/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden
                          border border-white/10 p-4">
                <div className="relative">
                    {/* Elemento decorativo artístico */}
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r
                                 from-purple-500 via-pink-500 to-red-500 rounded-full
                                 opacity-30 blur-xl"
                    />

                    <div className="relative z-10">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="mb-3"
                        >
                            <span className="text-3xl">🎨</span>
                        </motion.div>

                        <h3 className="text-white font-bold text-lg mb-2">
                            New Collection Available!
                        </h3>

                        <p className="text-white/80 text-sm mb-4">
                            Discover our latest masterpieces in an exclusive art collection
                        </p>

                        <div className="flex items-center justify-between">
                            <Link
                                href="/collection"
                                className="inline-flex items-center group
                                         bg-white/10 hover:bg-white/20
                                         text-white px-4 py-2 rounded-full
                                         transition-all duration-300"
                            >
                                <span>View Gallery</span>
                                <motion.svg
                                    className="w-4 h-4 ml-2"
                                    whileHover={{ x: 5 }}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </motion.svg>
                            </Link>

                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full
                                         transition-colors duration-300"
                                aria-label="Close notification"
                            >
                                <svg
                                    className="w-5 h-5 text-white/80"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}