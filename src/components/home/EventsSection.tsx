'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import AdvancedFilters from '@/components/filters/AdvancedFilters';
import { PriceRange, SortOption } from '@/types/art';

interface Course {
    id: string;
    title: string;
    date: Date;
    location: string;
    description: string;
    image: string;
    category: 'painting' | 'technique' | 'masterclass';
    price: string;
    duration: string;
    capacity: number;
    level: 'beginner' | 'intermediate' | 'advanced';
}

const courses: Course[] = [
    {
        id: '1',
        title: 'Oil Painting Masterclass',
        date: new Date('2024-03-15'),
        location: 'Main Studio',
        description: 'Master the art of oil painting with Van Robert. Learn professional techniques and develop your unique style.',
        image: '/images/courses/oil-painting.jpg',
        category: 'masterclass',
        price: '$499',
        duration: '8 weeks',
        capacity: 8,
        level: 'intermediate'
    },
    {
        id: '2',
        title: 'Contemporary Art Techniques',
        date: new Date('2024-04-20'),
        location: 'Art Studio',
        description: 'Explore modern art techniques and experimental approaches to painting.',
        image: '/images/courses/contemporary.jpg',
        category: 'technique',
        price: '$399',
        duration: '6 weeks',
        capacity: 10,
        level: 'advanced'
    },
    {
        id: '3',
        title: 'Foundation Painting Course',
        date: new Date('2024-05-10'),
        location: 'Learning Center',
        description: 'Perfect for beginners. Learn the fundamentals of painting and color theory.',
        image: '/images/courses/foundation.jpg',
        category: 'painting',
        price: '$299',
        duration: '4 weeks',
        capacity: 12,
        level: 'beginner'
    }
];

function CertificationInfo({ level }: { level: Course['level'] }) {
    return (
        <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-gray-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-gray-700 font-medium">Official Certification</span>
            </div>
            <p className="text-sm text-gray-600 text-center">
                {level === 'beginner' && 'Receive a Foundation Level Certificate upon completion'}
                {level === 'intermediate' && 'Earn an Advanced Practitioner Certificate'}
                {level === 'advanced' && 'Obtain a Master Level Certification'}
            </p>
        </div>
    );
}

export default function CoursesSection() {
    const [filters, setFilters] = useState({
        price: 'all' as PriceRange,
        sort: 'popular' as SortOption,
    });

    const handlePriceChange = (range: PriceRange) => {
        setFilters(prev => ({ ...prev, price: range }));
    };

    const handleSortChange = (sort: SortOption) => {
        setFilters(prev => ({ ...prev, sort: sort }));
    };

    const filteredAndSortedCourses = courses
        .filter(course => {
            if (filters.price === 'all') return true;
            const price = parseInt(course.price.replace('$', ''));
            switch (filters.price) {
                case 'under-500': return price < 500;
                case '500-1000': return price >= 500 && price <= 1000;
                case '1000-5000': return price > 1000 && price <= 5000;
                case 'over-5000': return price > 5000;
                default: return true;
            }
        })
        .sort((a, b) => {
            switch (filters.sort) {
                case 'price-low':
                    return parseInt(a.price.replace('$', '')) - parseInt(b.price.replace('$', ''));
                case 'price-high':
                    return parseInt(b.price.replace('$', '')) - parseInt(a.price.replace('$', ''));
                case 'recent':
                    return b.date.getTime() - a.date.getTime();
                default: // 'popular'
                    return b.capacity - a.capacity;
            }
        });

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold mb-4">Art Courses</h2>
                    <p className="text-gray-600">Learn directly from Van Robert and master the art of painting</p>
                </motion.div>

                <AdvancedFilters
                    onPriceRangeChange={handlePriceChange}
                    onSortChange={handleSortChange}
                    selectedPrice={filters.price}
                    selectedSort={filters.sort}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAndSortedCourses.map((course) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                        >
                            <div className="relative h-48">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                                        ${course.level === 'beginner' ? 'bg-green-500' :
                                        course.level === 'intermediate' ? 'bg-yellow-500' :
                                            'bg-red-500'} text-white`}>
                                        {course.level}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                                <p className="text-gray-600 mb-4">{course.description}</p>

                                <div className="flex items-center mb-4 text-gray-500">
                                    <div className="flex items-center mr-6">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span>{course.capacity} spots</span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <CertificationInfo level={course.level} />
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-2 bg-black text-white rounded-full
                                                 hover:bg-gray-800 transition-all duration-300"
                                    >
                                        Enroll Now
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