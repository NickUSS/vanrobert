'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section con un diseño más artístico */}
            <div className="relative min-h-screen bg-black">
                {/* Fondo artístico abstracto */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-purple-500/20 to-pink-500/20 opacity-60" />

                {/* Contenedor principal */}
                <div className="relative max-w-7xl mx-auto px-4 py-20 min-h-screen flex flex-col md:flex-row items-center justify-center gap-12">
                    {/* Contenedor de la imagen */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="/images/about.jpg"
                            alt="Van Robert - Contemporary Artist"
                            width={500}
                            height={700}
                            className="object-cover"
                            priority
                            quality={100}
                        />
                        {/* Overlay sutil */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </motion.div>

                    {/* Contenido de texto */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white max-w-xl text-center md:text-left"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            Van Robert
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-8">
                            Contemporary Artist & Fashion Innovator
                        </p>
                        <p className="text-lg text-white/80 mb-8">
                            Bridging the gap between classical artistry and modern expression,
                            creating pieces that challenge conventional boundaries while celebrating
                            the beauty of diversity in art.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-black px-8 py-3 rounded-full
                                     hover:bg-gray-100 transition-all duration-300
                                     font-medium text-lg"
                        >
                            Explore My Work
                        </motion.button>
                    </motion.div>
                </div>

                {/* Elemento decorativo - líneas artísticas */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1) 50%, transparent)',
                        maskImage: 'linear-gradient(to top, white, transparent)'
                    }}
                />
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="prose prose-lg max-w-none"
                >
                    <h2 className="text-3xl font-bold mb-6">The Artist's Vision</h2>

                    <p className="text-gray-700 mb-6">
                        With a distinctive blend of classical training and contemporary innovation,
                        Van Robert has emerged as one of the most compelling voices in modern art.
                        His work seamlessly bridges the gap between traditional artistic expression
                        and contemporary fashion, creating pieces that challenge conventional boundaries
                        while celebrating the beauty of diversity in art.
                    </p>

                    <div className="my-12 p-8 bg-gradient-to-br from-yellow-50 to-pink-50 rounded-xl">
                        <h3 className="text-2xl font-semibold mb-4">Artistic Philosophy</h3>
                        <p className="text-gray-700 mb-4">
                            "I believe art should be both a reflection of our times and a window into
                            possibility. Each piece I create is a conversation between tradition and
                            innovation, between the familiar and the unexpected. My work aims to create
                            spaces where different cultural expressions can meet and transform into
                            something entirely new."
                        </p>
                        <p className="text-gray-500 italic">- Van Robert</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                        <div>
                            <h3 className="text-2xl font-semibold mb-4">Background & Influence</h3>
                            <p className="text-gray-700">
                                Drawing from his rich cultural heritage and global experiences,
                                Van Robert's work is characterized by bold color combinations,
                                dynamic compositions, and a deep understanding of how art can
                                transcend cultural boundaries. His unique perspective has been
                                shaped by years of studying both classical techniques and
                                contemporary artistic movements.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-4">Current Focus</h3>
                            <p className="text-gray-700">
                                Currently, Van Robert is exploring the intersection of traditional
                                artistry with modern technology and sustainable practices. His latest
                                works incorporate innovative materials and techniques while maintaining
                                the soulful expression that has become his signature.
                            </p>
                        </div>
                    </div>

                    {/* Stats Section con colores actualizados */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-center p-6 bg-gradient-to-br from-yellow-400 to-pink-500 text-white rounded-xl"
                        >
                            <h4 className="text-3xl font-bold mb-2">20+</h4>
                            <p className="text-white/90">Years of Innovation</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-center p-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl"
                        >
                            <h4 className="text-3xl font-bold mb-2">100+</h4>
                            <p className="text-white/90">Global Exhibitions</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-center p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl"
                        >
                            <h4 className="text-3xl font-bold mb-2">500+</h4>
                            <p className="text-white/90">Unique Creations</p>
                        </motion.div>
                    </div>

                    <div className="my-12">
                        <h3 className="text-2xl font-semibold mb-4">Recognition & Achievements</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="p-6 bg-gray-50 rounded-xl"
                            >
                                <h4 className="font-semibold mb-2">International Recognition</h4>
                                <ul className="list-disc list-inside text-gray-700">
                                    <li>Featured Artist at Paris Fashion Week</li>
                                    <li>New York Art Critics Circle Award</li>
                                    <li>Global Innovator in Arts Award</li>
                                </ul>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="p-6 bg-gray-50 rounded-xl"
                            >
                                <h4 className="font-semibold mb-2">Notable Collaborations</h4>
                                <ul className="list-disc list-inside text-gray-700">
                                    <li>Major Fashion Houses</li>
                                    <li>Contemporary Museums</li>
                                    <li>International Art Foundations</li>
                                </ul>
                            </motion.div>
                        </div>
                    </div>

                    {/* Studio Section */}
                    <div className="my-12">
                        <h3 className="text-2xl font-semibold mb-4">The Creative Process</h3>
                        <p className="text-gray-700 mb-6">
                            In his studio, Van Robert combines traditional techniques with innovative
                            approaches to create unique pieces that speak to both the past and future
                            of artistic expression. Each work is carefully crafted through a process
                            that can take months, ensuring that every detail contributes to the
                            overall vision.
                        </p>
                    </div>

                    {/* Contact Section con estilo actualizado */}
                    <div className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl text-center text-white">
                        <h3 className="text-2xl font-semibold mb-4">Connect with Van Robert</h3>
                        <p className="mb-6 text-white/90">
                            For collaborations, exhibitions, or to discuss art acquisitions,
                            I welcome your contact.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-blue-800 px-8 py-3 rounded-full
                                     hover:bg-gray-100 transition-colors duration-300
                                     font-semibold"
                        >
                            Get in Touch
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}