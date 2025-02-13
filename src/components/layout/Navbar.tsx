'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedButton from '../buttons/AnimatedButton'

const navItems = [
    { name: 'Art', href: '/arte' },
    { name: 'Fashion', href: '/moda' },
    { name: 'Shop', href: '/tienda' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeItem, setActiveItem] = useState('')

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
    }

    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={navVariants}
            className={`fixed w-full z-50 transition-all duration-500 ${
                isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-lg'
                    : 'bg-gradient-to-b from-black/50 to-transparent py-2'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-[200px]" // Ancho fijo para el logo
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

                    {/* Desktop Navigation - Centrado */}
                    <div className="hidden md:flex flex-1 justify-center items-center">
                        <div className={`flex flex-row items-center space-x-8 ${
                            isScrolled ? '' : 'bg-black/20 backdrop-blur-sm rounded-full px-6 py-2'
                        } transition-all duration-300`}>
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    custom={index}
                                    variants={itemVariants}
                                    onHoverStart={() => setActiveItem(item.name)}
                                    onHoverEnd={() => setActiveItem('')}
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
                                        {activeItem === item.name && (
                                            <motion.div
                                                layoutId="underline"
                                                className={`absolute bottom-0 left-0 right-0 h-0.5 
                                                ${isScrolled ? 'bg-black' : 'bg-white'}`}
                                                initial={false}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                    damping: 30
                                                }}
                                            />
                                        )}
                                    </Link>
                                </motion.div>
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
                        className={`md:hidden ${
                            isScrolled
                                ? 'bg-white border-t'
                                : 'bg-black/80 backdrop-blur-md'
                        }`}
                    >
                        <div className="px-4 py-6 space-y-3">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        transition: {
                                            delay: index * 0.1
                                        }
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: -20,
                                        transition: {
                                            delay: index * 0.1
                                        }
                                    }}
                                >
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
                                </motion.div>
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
                                    Iniciar Sesión
                                </AnimatedButton>
                                <AnimatedButton
                                    variant="primary"
                                    className={`w-full ${
                                        isScrolled
                                            ? 'bg-black text-white hover:bg-gray-800'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                                >
                                    Registrarse
                                </AnimatedButton>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}