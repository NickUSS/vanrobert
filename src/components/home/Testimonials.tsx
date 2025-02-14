'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
    {
        name: 'Emma Thompson',
        role: 'Art Collector',
        content: 'Van Robert unique vision and artistic excellence have made each piece in my collection truly special. His attention to detail and innovative approach to art is remarkable.',
        image: '/images/14.jpeg',
        rating: 5
    },
    {
        name: 'James Wilson',
        role: 'Fashion Enthusiast',
        content: 'The fusion of art and fashion in Van Robert work is extraordinary. Each piece tells a story and brings a unique perspective to contemporary design.',
        image: '/images/15.jpeg',
        rating: 5
    },
    {
        name: 'Sarah Mitchell',
        role: 'Gallery Owner',
        content: 'Working with Van Robert has been an incredible journey. His pieces consistently captivate our visitors and bring a fresh perspective to our collection.',
        image: '/images/13.jpeg',
        rating: 5
    },
];

export default function Testimonials() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Experiences</h2>
                    <p className="text-gray-600 text-lg">Discover what our collectors say about their journey with Van Robert</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative"
                        >
                            {/* Quote Icon */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.2 + 0.3 }}
                                className="absolute -top-4 -left-4 bg-black text-white p-3 rounded-full"
                            >
                                <FaQuoteLeft className="w-4 h-4" />
                            </motion.div>

                            {/* Rating Stars */}
                            <div className="flex mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-gray-600 mb-6 text-lg leading-relaxed italic">
                                &#34;{testimonial.content}&#34;
                            </p>

                            <div className="flex items-center">
                                <div className="relative w-14 h-14 mr-4">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                                    <p className="text-gray-600">{testimonial.role}</p>
                                </div>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-100 via-black to-gray-100 rounded-b-2xl" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}