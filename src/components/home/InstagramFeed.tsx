'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';

interface InstagramPost {
    id: string;
    imageUrl: string;
    caption: string;
    category: 'art' | 'fashion' | 'design';
}

const instagramPosts: InstagramPost[] = [
    {
        id: '1',
        imageUrl: '/images/8.jpg',
        caption: 'Latest Art Collection',
        category: 'art'
    },
    {
        id: '2',
        imageUrl: '/images/9.jpg',
        caption: 'Fashion Design Process',
        category: 'fashion'
    },
    {
        id: '3',
        imageUrl: '/images/10.jpg',
        caption: 'Studio Session',
        category: 'art'
    },
    {
        id: '4',
        imageUrl: '/images/11.jpg',
        caption: 'New Collection Preview',
        category: 'fashion'
    },
    {
        id: '5',
        imageUrl: '/images/12.jpg',
        caption: 'Design Inspiration',
        category: 'design'
    },
    {
        id: '6',
        imageUrl: '/images/13.jpg',
        caption: 'Behind the Scenes',
        category: 'art'
    }
];

export default function InstagramFeed() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold mb-4">Follow Our Journey</h2>
                    <p className="text-gray-600">@vanrobert</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
                    {instagramPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="relative aspect-square group"
                        >
                            <Image
                                src={post.imageUrl}
                                alt={post.caption}
                                fill
                                className="object-cover rounded-xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
                                          opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl
                                          flex items-end justify-start p-6">
                                <div className="text-white">
                                    <span className={`text-xs uppercase tracking-wider mb-2 inline-block px-2 py-1 rounded-full
                                                    ${post.category === 'art' ? 'bg-blue-500' :
                                        post.category === 'fashion' ? 'bg-pink-500' : 'bg-purple-500'}`}>
                                        {post.category}
                                    </span>
                                    <h3 className="text-lg font-medium">{post.caption}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <a
                        href="https://instagram.com/vanrobert"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-8 py-3 bg-black text-white rounded-full
                                 hover:bg-gray-800 transition-all duration-300 group"
                    >
                        Follow on Instagram
                        <svg
                            className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}