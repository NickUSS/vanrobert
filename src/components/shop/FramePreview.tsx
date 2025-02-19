'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {Artwork} from "@/types/artwork";

interface FramePreviewProps {
    isOpen: boolean;
    onClose: () => void;
    artwork: Artwork;
    onFrameSelect: (frame: string) => void;
}

const frames = [
    { id: 'classic-black', name: 'Classic Black', color: '#000000', width: '20px' },
    { id: 'modern-white', name: 'Modern White', color: '#FFFFFF', width: '20px' },
    { id: 'gold-leaf', name: 'Gold Leaf', color: '#CFB53B', width: '25px' },
    { id: 'silver', name: 'Silver', color: '#C0C0C0', width: '20px' },
    { id: 'natural-wood', name: 'Natural Wood', color: '#DEB887', width: '22px' },
];

export default function FramePreview({ isOpen, onClose, artwork, onFrameSelect }: FramePreviewProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="text-2xl font-bold mb-6">Choose a Frame</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Preview Area */}
                            <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                                <div className="absolute inset-4" style={{ padding: '20px' }}>
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={artwork.image}
                                            alt={artwork.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Frame Selection */}
                            <div className="space-y-6">
                                <p className="text-gray-600">
                                    Select a frame style to complement your artwork
                                </p>
                                <div className="space-y-4">
                                    {frames.map((frame) => (
                                        <motion.button
                                            key={frame.id}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => onFrameSelect(frame.id)}
                                            className="w-full p-4 border rounded-lg flex items-center
                                                     gap-4 hover:bg-gray-50 transition-colors"
                                        >
                                            <div
                                                className="w-16 h-16 rounded"
                                                style={{
                                                    backgroundColor: frame.color,
                                                    border: frame.color === '#FFFFFF' ? '1px solid #E5E7EB' : 'none'
                                                }}
                                            />
                                            <div className="text-left">
                                                <h3 className="font-medium">{frame.name}</h3>
                                                <p className="text-sm text-gray-500">
                                                    Perfect for {frame.id === 'modern-white' ? 'contemporary' : 'traditional'} spaces
                                                </p>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}