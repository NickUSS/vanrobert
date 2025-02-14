'use client'
import { motion } from 'framer-motion';
import { FaPaintBrush, FaGraduationCap, FaCalendarCheck, FaShoppingBag } from 'react-icons/fa';

const stats = [
    {
        number: '500+',
        label: 'Artworks Sold',
        icon: <FaPaintBrush className="text-3xl mb-4 text-blue-500" />,
        color: 'text-blue-500'
    },
    {
        number: '48',
        label: 'Art Events Hosted',
        icon: <FaCalendarCheck className="text-3xl mb-4 text-green-500" />,
        color: 'text-green-500'
    },
    {
        number: '12',
        label: 'New Courses',
        icon: <FaGraduationCap className="text-3xl mb-4 text-purple-500" />,
        color: 'text-purple-500'
    },
    {
        number: '2.5k+',
        label: 'Satisfied Collectors',
        icon: <FaShoppingBag className="text-3xl mb-4 text-red-500" />,
        color: 'text-red-500'
    },
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
                            transition={{
                                delay: index * 0.1,
                                duration: 0.5,
                                ease: "easeOut"
                            }}
                            whileHover={{ y: -10 }}
                            className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    delay: index * 0.1 + 0.3,
                                    type: "spring",
                                    stiffness: 200
                                }}
                                className="flex justify-center"
                            >
                                {stat.icon}
                            </motion.div>

                            <motion.h3
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 + 0.5 }}
                                className={`text-4xl font-bold mb-2 ${stat.color}`}
                            >
                                {stat.number}
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 + 0.6 }}
                                className="text-gray-600 font-medium"
                            >
                                {stat.label}
                            </motion.p>

                            {/* Subtle background effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-2xl -z-10" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}