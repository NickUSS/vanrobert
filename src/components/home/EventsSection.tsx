'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import {useEffect, useState} from 'react';

interface Event {
    id: string;
    title: string;
    date: Date;
    location: string;
    description: string;
    image: string;
    category: 'art' | 'fashion' | 'exhibition';
    price?: string;
    capacity?: number;
}

const events: Event[] = [
    {
        id: '1',
        title: 'Exposición de Arte Moderno',
        date: new Date('2024-03-15'),
        location: 'Galería Principal',
        description: 'Una exposición única que explora las últimas tendencias en arte contemporáneo.',
        image: 'https://images.unsplash.com/photo-1545033131-485ea67fd7c3?w=800&q=80',
        category: 'exhibition',
        price: '$50',
        capacity: 200
    },
    {
        id: '2',
        title: 'Desfile de Moda Primavera',
        date: new Date('2024-04-20'),
        location: 'Salón Central',
        description: 'Presentación exclusiva de las últimas colecciones de diseñadores emergentes.',
        image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80',
        category: 'fashion',
        price: '$75',
        capacity: 150
    },
    {
        id: '3',
        title: 'Subasta de Arte',
        date: new Date('2024-05-10'),
        location: 'Sala VIP',
        description: 'Subasta exclusiva de obras de artistas reconocidos internacionalmente.',
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
        category: 'art',
        price: 'Entrada Libre',
        capacity: 100
    }
];

function CountdownTimer({ targetDate }: { targetDate: Date }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex justify-center space-x-4 bg-gray-100 rounded-lg p-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                    <div className="text-2xl font-bold">{value}</div>
                    <div className="text-xs text-gray-500 capitalize">{unit}</div>
                </div>
            ))}
        </div>
    );
}

export default function EventsSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold mb-4">Próximos Eventos</h2>
                    <p className="text-gray-600">No te pierdas nuestros eventos exclusivos</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                        >
                            <div className="relative h-48">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className="px-3 py-1 bg-black text-white rounded-full text-sm">
                                        {event.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                <p className="text-gray-600 mb-4">{event.description}</p>
                                <div className="flex items-center mb-4">
                                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-gray-600">{event.location}</span>
                                </div>
                                <div className="mb-4">
                                    <CountdownTimer targetDate={event.date} />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">{event.price}</span>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                                    >
                                        Reservar Lugar
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}