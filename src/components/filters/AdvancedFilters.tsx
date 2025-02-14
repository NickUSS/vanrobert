'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { PriceRange, SortOption } from '@/types/art';

interface AdvancedFiltersProps {
    onPriceRangeChange: (range: PriceRange) => void;
    onSortChange: (sort: SortOption) => void;
    selectedPrice: PriceRange;
    selectedSort: SortOption;
}

export default function AdvancedFilters({
                                            onPriceRangeChange,
                                            onSortChange,
                                            selectedPrice,
                                            selectedSort,
                                        }: AdvancedFiltersProps) {
    const [isOpenPrice, setIsOpenPrice] = useState(false);
    const [isOpenSort, setIsOpenSort] = useState(false);

    const priceOptions = [
        { value: 'all', label: 'All Prices', color: 'text-blue-600' },
        { value: 'under-500', label: 'Under $500', color: 'text-green-600' },
        { value: '500-1000', label: '$500 - $1000', color: 'text-yellow-600' },
        { value: '1000-5000', label: '$1000 - $5000', color: 'text-orange-600' },
        { value: 'over-5000', label: 'Over $5000', color: 'text-red-600' },
    ];

    const sortOptions = [
        { value: 'popular', label: 'Popular', color: 'text-purple-600' },
        { value: 'recent', label: 'Recent', color: 'text-indigo-600' },
        { value: 'price-low', label: 'Price: Low to High', color: 'text-cyan-600' },
        { value: 'price-high', label: 'Price: High to Low', color: 'text-teal-600' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-8"
        >
            {/* Price Filter */}
            <div className="relative">
                <span className="text-gray-600 font-medium mr-2">Collection:</span>
                <button
                    onClick={() => setIsOpenPrice(!isOpenPrice)}
                    className="px-3 py-1 text-sm focus:outline-none inline-flex items-center space-x-1"
                >
                    <span className={
                        priceOptions.find(opt => opt.value === selectedPrice)?.color || 'text-gray-800'
                    }>
                        {priceOptions.find(opt => opt.value === selectedPrice)?.label}
                    </span>
                    <motion.svg
                        animate={{ rotate: isOpenPrice ? 180 : 0 }}
                        className="w-4 h-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                </button>

                <AnimatePresence>
                    {isOpenPrice && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl"
                        >
                            {priceOptions.map((option) => (
                                <motion.button
                                    key={option.value}
                                    whileHover={{ x: 6 }}
                                    onClick={() => {
                                        onPriceRangeChange(option.value as PriceRange);
                                        setIsOpenPrice(false);
                                    }}
                                    className={`block w-full text-left px-4 py-2 text-sm ${option.color} hover:bg-gray-50`}
                                >
                                    {option.label}
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="w-px h-4 bg-gray-300" />

            {/* Sort Filter */}
            <div className="relative">
                <span className="text-gray-600 font-medium mr-2">Sort by:</span>
                <button
                    onClick={() => setIsOpenSort(!isOpenSort)}
                    className="px-3 py-1 text-sm focus:outline-none inline-flex items-center space-x-1"
                >
                    <span className={
                        sortOptions.find(opt => opt.value === selectedSort)?.color || 'text-gray-800'
                    }>
                        {sortOptions.find(opt => opt.value === selectedSort)?.label}
                    </span>
                    <motion.svg
                        animate={{ rotate: isOpenSort ? 180 : 0 }}
                        className="w-4 h-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                </button>

                <AnimatePresence>
                    {isOpenSort && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl"
                        >
                            {sortOptions.map((option) => (
                                <motion.button
                                    key={option.value}
                                    whileHover={{ x: 6 }}
                                    onClick={() => {
                                        onSortChange(option.value as SortOption);
                                        setIsOpenSort(false);
                                    }}
                                    className={`block w-full text-left px-4 py-2 text-sm ${option.color} hover:bg-gray-50`}
                                >
                                    {option.label}
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}