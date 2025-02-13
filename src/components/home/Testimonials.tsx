'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
    {
        name: 'Ana García',
        role: 'Coleccionista de Arte',
        content: 'Una plataforma increíble para descubrir nuevos artistas.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
    {
        name: 'Carlos Ruiz',
        role: 'Artista Visual',
        content: 'La mejor plataforma para mostrar mi trabajo y conectar con otros artistas.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    },
    {
        name: 'María Torres',
        role: 'Diseñadora de Moda',
        content: 'Excelente espacio para la comunidad creativa.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    },
];

export default function Testimonials() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-center mb-12"
                >
                    Lo que dicen nuestros clientes
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-6 rounded-xl shadow-lg"
                        >
                            <div className="flex items-center mb-4">
                                <div className="relative w-12 h-12 mr-4">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{testimonial.name}</h3>
                                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">"{testimonial.content}"</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}