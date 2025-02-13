'use client'
import { motion } from 'framer-motion';

const stats = [
    { number: '1,000+', label: 'Obras de Arte' },
    { number: '500+', label: 'Artistas' },
    { number: '50k+', label: 'Clientes Satisfechos' },
    { number: '100+', label: 'Eventos Anuales' },
];

export default function Stats() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <motion.h3
                                whileHover={{ scale: 1.1 }}
                                className="text-4xl font-bold text-black mb-2"
                            >
                                {stat.number}
                            </motion.h3>
                            <p className="text-gray-600">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}