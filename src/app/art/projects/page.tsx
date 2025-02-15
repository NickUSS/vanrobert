'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Creepster, Montserrat } from 'next/font/google'

const creepster = Creepster({
    weight: '400',
    subsets: ['latin'],
})

const montserrat = Montserrat({
    subsets: ['latin'],
})

export default function ProjectsPage() {
    return (
        <div className={`min-h-screen bg-black text-white pt-24 ${montserrat.className}`}>
            {/* Hero Section */}
            <section className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center">
                <div className="absolute inset-0">
                    <Image
                        src="/images/brecha1.jpg"
                        alt="LA BRECHA Project"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
                </div>
                <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, type: "spring" }}
                        className={`${creepster.className} text-6xl md:text-8xl text-center mb-8
                                 bg-clip-text text-transparent bg-gradient-to-b 
                                 from-red-600 to-red-800 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]`}
                    >
                        LA BRECHA
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light tracking-wide"
                    >
                        Bringing Art to Every Corner of America
                    </motion.p>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <svg
                        className="w-6 h-6 text-white/70"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </motion.div>
            </section>

            {/* Project Description */}
            <section className="py-20 bg-gradient-to-b from-black to-red-900">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto px-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6 text-red-500">The Vision</h2>
                            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                LA BRECHA is a revolutionary mobile art gallery housed in a
                                crystal-encased truck, designed to traverse the United States
                                and bring art directly to children in communities across the nation.
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                Our mission is to break down barriers between art and young minds,
                                creating an accessible and inspiring space for creativity to flourish.
                            </p>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl"
                        >
                            <Image
                                src="/images/brecha2.jpg"
                                alt="The Crystal Truck"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </section>
            {/* Interactive Experience */}
            <section className="py-20 bg-gradient-to-b from-red-900 to-black">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl"
                        >
                            <Image
                                src="/images/brecha3.jpg"
                                alt="Interactive Art Experience"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                        <div>
                            <h2 className="text-4xl font-bold mb-6">The Experience</h2>
                            <ul className="space-y-4 text-lg text-gray-300">
                                <li className="flex items-center">
                                    <span className="text-red-500 mr-2">▹</span>
                                    <span className="leading-relaxed">Interactive Art Installations</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-red-500 mr-2">▹</span>
                                    <span className="leading-relaxed">Live Demonstrations</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-red-500 mr-2">▹</span>
                                    <span className="leading-relaxed">Hands-on Workshops</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-red-500 mr-2">▹</span>
                                    <span className="leading-relaxed">Digital Art Integration</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Route Map */}
            <section className="py-20 bg-black">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto px-4 text-center"
                >
                    <h2 className="text-4xl font-bold mb-12">Journey Map</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {['West Coast', 'Central States', 'East Coast'].map((region) => (
                            <motion.div
                                key={region}
                                whileHover={{ scale: 1.05 }}
                                className="bg-gradient-to-br from-red-900 to-black p-6 rounded-xl
                                         border border-red-800/20 shadow-lg"
                            >
                                <h3 className="text-2xl font-semibold mb-4">{region}</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    Visiting schools, communities, and public spaces
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-b from-black to-red-900">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto px-4 text-center"
                >
                    <h2 className="text-4xl font-bold mb-6">Join the Journey</h2>
                    <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                        Want LA BRECHA to visit your community? Get in touch with us to
                        learn more about our upcoming routes and scheduling possibilities.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-600 text-white px-8 py-3 rounded-full
                                 text-lg font-semibold hover:bg-red-700
                                 transition-colors duration-300 shadow-lg"
                    >
                        Contact Us
                    </motion.button>
                </motion.div>
            </section>
        </div>
    )
}