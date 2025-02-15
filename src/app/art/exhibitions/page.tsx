'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Datos de ejemplo para los próximos eventos
const upcomingEvents = [
    {
        id: 1,
        title: "Art Basel Miami",
        date: "Dec 15-20, 2024",
        location: "Miami Beach, FL",
        image: "/images/courses/1.jpg",
        status: "Coming Soon"
    },
    {
        id: 2,
        title: "Venice Biennale",
        date: "Apr 20 - Nov 24, 2024",
        location: "Venice, Italy",
        image: "/images/courses/2.jpg",
        status: "Registration Open"
    },
    {
        id: 3,
        title: "Paris Art Fair",
        date: "Mar 15-17, 2024",
        location: "Paris, France",
        image: "/images/courses/3.jpg",
        status: "Limited Spots"
    }
];

// Datos de ejemplo para eventos pasados
const pastEvents = [
    {
        id: 1,
        title: "Modern Art Showcase",
        date: "November 2023",
        location: "New York City",
        description: "A groundbreaking exhibition featuring contemporary pieces that challenged traditional perspectives.",
        image: "/images/courses/4.jpg",
        content: "The exhibition was a tremendous success, attracting over 5,000 visitors and receiving acclaim from art critics worldwide..."
    },
    {
        id: 2,
        title: "Colors of Freedom",
        date: "September 2023",
        location: "London",
        description: "An exploration of abstract expressionism and its influence on modern freedom movements.",
        image: "/images/courses/5.jpg",
        content: "The exhibition showcased how art can be a powerful medium for social change..."
    },
    {
        id: 3,
        title: "Urban Perspectives",
        date: "August 2023",
        location: "Berlin",
        description: "A unique view into the intersection of street art and classical techniques.",
        image: "/images/courses/6.jpg",
        content: "This exhibition brought together artists from different backgrounds to create..."
    }
];

export default function ExhibitionsPage() {
    return (
        <div className="min-h-screen bg-white pt-24">
            {/* Header Section */}
            <section className="bg-black text-white py-16">
                <div className="container mx-auto px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-center mb-4"
                    >
                        Exhibitions
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-center text-gray-300"
                    >
                        Discover our upcoming shows and past exhibitions
                    </motion.p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content - Past Events */}
                    <div className="lg:w-2/3 space-y-12">
                        <h2 className="text-3xl font-bold mb-8">Past Exhibitions</h2>
                        {pastEvents.map((event) => (
                            <motion.article
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl shadow-lg overflow-hidden"
                            >
                                <div className="relative h-[400px]">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        <span>{event.date}</span>
                                        <span>•</span>
                                        <span>{event.location}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                                    <p className="text-gray-600 mb-6">{event.description}</p>
                                    <p className="text-gray-600">{event.content}</p>

                                    <div className="mt-6 flex gap-4">
                                        <Link href={`/exhibitions/${event.id}`}>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-6 py-2 bg-black text-white rounded-full
                                                         hover:bg-gray-800 transition-all duration-300"
                                            >
                                                View Gallery
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {/* Sidebar - Upcoming Events */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-24">
                            <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
                            <div className="space-y-6">
                                {upcomingEvents.map((event) => (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-white rounded-xl shadow-lg overflow-hidden
                                                 border border-gray-100 group cursor-pointer"
                                    >
                                        <div className="relative h-48">
                                            <Image
                                                src={event.image}
                                                alt={event.title}
                                                fill
                                                className="object-cover transition-transform duration-300
                                                         group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50
                                                          transition-colors duration-300" />
                                            <div className="absolute top-4 right-4">
                                                <span className="px-4 py-1 bg-white/90 backdrop-blur-sm
                                                               rounded-full text-sm font-medium text-black">
                                                    {event.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                            <div className="space-y-1 text-gray-500 text-sm">
                                                <p>{event.date}</p>
                                                <p>{event.location}</p>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="mt-4 px-6 py-2 bg-black text-white rounded-full
                                                         w-full hover:bg-gray-800 transition-all duration-300"
                                            >
                                                Learn More
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}