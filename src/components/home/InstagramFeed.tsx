'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';

interface InstagramPost {
    id: string;
    imageUrl: string;
    likes: number;
    comments: number;
    caption: string;
}

const instagramPosts: InstagramPost[] = [
    {
        id: '1',
        imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop',
        likes: 120,
        comments: 15,
        caption: 'Nueva colección de arte contemporáneo'
    },
    {
        id: '2',
        imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=400&fit=crop',
        likes: 89,
        comments: 8,
        caption: 'Exposición de primavera'
    },
    {
        id: '3',
        imageUrl: 'https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=400&h=400&fit=crop',
        likes: 230,
        comments: 24,
        caption: 'Detrás de escena'
    },
    {
        id: '4',
        imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop',
        likes: 156,
        comments: 12,
        caption: 'Arte en proceso'
    },
    {
        id: '5',
        imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop',
        likes: 342,
        comments: 18,
        caption: 'Nuevas obras en galería'
    },
    {
        id: '6',
        imageUrl: 'https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=400&h=400&fit=crop',
        likes: 278,
        comments: 21,
        caption: 'Diseños exclusivos'
    }
];

export default function InstagramFeed() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold mb-4">Síguenos en Instagram</h2>
                    <p className="text-gray-600">@vanrobert_art</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {instagramPosts.map((post) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            className="relative aspect-square group"
                        >
                            <Image
                                src={post.imageUrl}
                                alt={post.caption}
                                fill
                                className="object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                <div className="text-white text-center p-4">
                                    <p className="text-sm mb-2">{post.caption}</p>
                                    <div className="flex justify-center space-x-4">
                                        <span className="flex items-center">
                                            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                            </svg>
                                            {post.likes}
                                        </span>
                                        <span className="flex items-center">
                                            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M21 15a2 2 0 0 1-2 2h-2v2a2 2 0 1 1-4 0v-2H7a2 2 0 1 1 0-4h6v-2a2 2 0 1 1 4 0v2h2a2 2 0 0 1 2 2zm-6-9H7a2 2 0 1 1 0-4h8a2 2 0 1 1 0 4z"/>
                                            </svg>
                                            {post.comments}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-8"
                >
                    <a
                        href="https://instagram.com/vanrobert_art"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-colors"
                    >
                        Seguir en Instagram
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}