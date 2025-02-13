'use client'
import { motion } from 'framer-motion';
import { PriceRange, SortOption } from '@/types/art';

interface AdvancedFiltersProps {
    onPriceRangeChange: (range: PriceRange) => void;
    onSortChange: (sort: SortOption) => void;
    onDateRangeChange: (range: string) => void;
    selectedPrice: PriceRange;
    selectedSort: SortOption;
    selectedDate: string;
}

export default function AdvancedFilters({
                                            onPriceRangeChange,
                                            onSortChange,
                                            onDateRangeChange,
                                            selectedPrice,
                                            selectedSort,
                                            selectedDate
                                        }: AdvancedFiltersProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Filtro de Precio */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Rango de Precio
                    </label>
                    <select
                        value={selectedPrice}
                        onChange={(e) => onPriceRangeChange(e.target.value as PriceRange)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="all">Todos los precios</option>
                        <option value="under-500">Menos de $500</option>
                        <option value="500-1000">$500 - $1000</option>
                        <option value="1000-5000">$1000 - $5000</option>
                        <option value="over-5000">Más de $5000</option>
                    </select>
                </div>

                {/* Ordenar por */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Ordenar por
                    </label>
                    <select
                        value={selectedSort}
                        onChange={(e) => onSortChange(e.target.value as SortOption)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="popular">Más populares</option>
                        <option value="recent">Más recientes</option>
                        <option value="price-low">Precio: Menor a Mayor</option>
                        <option value="price-high">Precio: Mayor a Menor</option>
                    </select>
                </div>

                {/* Filtro de Fecha */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Fecha
                    </label>
                    <select
                        value={selectedDate}
                        onChange={(e) => onDateRangeChange(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="all">Todas las fechas</option>
                        <option value="today">Hoy</option>
                        <option value="week">Esta semana</option>
                        <option value="month">Este mes</option>
                        <option value="year">Este año</option>
                    </select>
                </div>
            </div>
        </motion.div>
    );
}