'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedButton from '../buttons/AnimatedButton'

// Definir interfaces
interface SubMenuItem {
    name: string;
    description: string;
    href: string;
    icon: string;
}

interface NavItem {
    name: string;
    href: string;
    submenu?: SubMenuItem[];
}

interface DesktopNavItemProps {
    item: NavItem;
    isScrolled: boolean;
    index: number;
}

// Definir las variantes de animación
const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.1,
            type: "spring",
            stiffness: 100
        }
    })
};

const navItems: NavItem[] = [
    {
        name: 'Art',
        href: '/art',
        submenu: [
            {
                name: 'Courses',
                description: 'Explore our art courses and workshops for all levels',
                href: '/art/courses',
                icon: '🎨'
            },
            {
                name: 'About Me',
                description: 'Learn about my journey and artistic philosophy',
                href: '/art/about',
                icon: '👨‍🎨'
            },
            {
                name: 'Projects',
                description: 'Discover my latest artistic projects and collaborations',
                href: '/art/projects',
                icon: '🎯'
            },
            {
                name: 'Exhibitions',
                description: 'View upcoming and past art exhibitions',
                href: '/art/exhibitions',
                icon: '🏛️'
            }
        ]
    },
    { name: 'Fashion', href: '/fashion' },
    { name: 'Shop', href: '/shop' },
];

const DesktopNavItem = ({ item, isScrolled, index }: DesktopNavItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            key={item.name}
            custom={index}
            variants={itemVariants}
            onHoverStart={() => setIsOpen(true)}
            onHoverEnd={() => setIsOpen(false)}
            className="relative"
        >
            <Link
                href={item.href}
                className={`relative px-4 py-2 transition-all duration-300 
                ${isScrolled
                    ? 'text-gray-800 hover:text-black'
                    : 'text-white hover:text-white/80'
                }`}
            >
                {item.name}
                {item.submenu && (
                    <span className="ml-1">▾</span>
                )}
            </Link>

            {/* Submenu */}
            <AnimatePresence>
                {isOpen && item.submenu && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute left-0 mt-2 w-80 rounded-xl overflow-hidden shadow-lg
                                  ${isScrolled ? 'bg-white' : 'bg-black/90 backdrop-blur-md'}
                                  border border-white/10`}
                    >
                        <div className="p-2">
                            {item.submenu.map((subItem, idx) => (
                                <motion.div
                                    key={subItem.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <Link
                                        href={subItem.href}
                                        className={`block p-3 rounded-lg transition-all duration-200
                                                  ${isScrolled
                                            ? 'hover:bg-gray-100 text-gray-800'
                                            : 'hover:bg-white/10 text-white'
                                        } group`}
                                    >
                                        <div className="flex items-center">
                                            <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">
                                                {subItem.icon}
                                            </span>
                                            <div>
                                                <p className="font-medium">{subItem.name}</p>
                                                <p className={`text-sm ${
                                                    isScrolled ? 'text-gray-500' : 'text-gray-300'
                                                }`}>
                                                    {subItem.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    }

    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={navVariants}
            className="fixed w-full z-50 nav-transition top-0"
        >
            <div className={`w-full transition-all duration-300 ${
                isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : ''
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24">
                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-[200px]"
                        >
                            <Link href="/" className="flex items-center">
                                <div className="relative w-[200px] h-[80px]">
                                    <Image
                                        src="/images/logo.png"
                                        alt="Logo"
                                        fill
                                        priority
                                        sizes="200px"
                                        className={`object-contain transition-all duration-300 
                                        ${isScrolled ? 'brightness-90' : 'brightness-100 filter-white'}`}
                                    />
                                </div>
                            </Link>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex flex-1 justify-center items-center">
                            <div className={`flex flex-row items-center space-x-8 transition-all duration-300 ${
                                !isScrolled ? 'bg-black/20 backdrop-blur-sm rounded-full px-6 py-2' : ''
                            }`}>
                                {navItems.map((item, index) => (
                                    <DesktopNavItem
                                        key={item.name}
                                        item={item}
                                        isScrolled={isScrolled}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Authentication Buttons */}
                        <div className="hidden md:flex items-center gap-2 w-[200px] justify-end">
                            <AnimatedButton
                                variant="secondary"
                                className={`inline-flex items-center justify-center whitespace-nowrap ${
                                    isScrolled
                                        ? 'border-black text-black hover:bg-black hover:text-white'
                                        : 'border-white text-white hover:bg-white/20'
                                } backdrop-blur-sm text-sm px-4 py-2 rounded-full`}
                            >
                                Sign In
                            </AnimatedButton>
                            <AnimatedButton
                                variant="primary"
                                className={`inline-flex items-center justify-center whitespace-nowrap ${
                                    isScrolled
                                        ? 'bg-black text-white hover:bg-gray-800'
                                        : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                                } text-sm px-4 py-2 rounded-full`}
                            >
                                Sign Up
                            </AnimatedButton>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`p-2 rounded-lg ${
                                    isScrolled
                                        ? 'hover:bg-gray-100'
                                        : 'bg-black/20 backdrop-blur-sm hover:bg-white/10'
                                }`}
                                aria-label="Menu"
                            >
                                <svg
                                    className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {isMobileMenuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                                opacity: 1,
                                height: 'auto',
                                transition: {
                                    height: {
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 20
                                    }
                                }
                            }}
                            exit={{
                                opacity: 0,
                                height: 0,
                                transition: {
                                    opacity: { duration: 0.2 },
                                    height: { duration: 0.3 }
                                }
                            }}
                            className={`md:hidden w-full ${
                                isScrolled
                                    ? 'bg-white/95 backdrop-blur-md border-t'
                                    : 'bg-black/80 backdrop-blur-md'
                            }`}
                        >
                            <div className="px-4 py-6 space-y-3">
                                {navItems.map((item) => (
                                    <div key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={`block px-4 py-2 rounded-lg transition-colors ${
                                                isScrolled
                                                    ? 'text-gray-800 hover:bg-gray-100'
                                                    : 'text-white hover:bg-white/10'
                                            }`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                        {item.submenu && (
                                            <div className="pl-4 mt-2 space-y-2">
                                                {item.submenu.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className={`block px-4 py-2 rounded-lg text-sm ${
                                                            isScrolled
                                                                ? 'text-gray-600 hover:bg-gray-100'
                                                                : 'text-gray-300 hover:bg-white/10'
                                                        }`}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        <span className="mr-2">{subItem.icon}</span>
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="space-y-2 pt-4">
                                    <AnimatedButton
                                        variant="secondary"
                                        className={`w-full ${
                                            isScrolled
                                                ? 'border-black text-black hover:bg-black hover:text-white'
                                                : 'border-white text-white hover:bg-white/20'
                                        }`}
                                    >
                                        Sign In
                                    </AnimatedButton>
                                    <AnimatedButton
                                        variant="primary"
                                        className={`w-full ${
                                            isScrolled
                                                ? 'bg-black text-white hover:bg-gray-800'
                                                : 'bg-white/20 text-white hover:bg-white/30'
                                        }`}
                                    >
                                        Sign Up
                                    </AnimatedButton>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    )
}