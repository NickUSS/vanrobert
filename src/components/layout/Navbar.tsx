'use client'
import {useState, useEffect, JSX} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// Iconos SVG
const Icons = {
    Courses: ({ className }: { className?: string }) => (
        <svg
            className={className}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
    ),
    AboutMe: ({ className }: { className?: string }) => (
        <svg
            className={className}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="7" r="4"/>
            <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
        </svg>
    ),
    Projects: ({ className }: { className?: string }) => (
        <svg
            className={className}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
            <polyline points="2 17 12 22 22 17"/>
            <polyline points="2 12 12 17 22 12"/>
        </svg>
    ),
    Exhibitions: ({ className }: { className?: string }) => (
        <svg
            className={className}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M3 9h18"/>
            <path d="M9 21V9"/>
        </svg>
    ),
    ArtWorks: ({ className }: { className?: string }) => (
        <svg
            className={className}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 3h20v18H2z"/>
            <path d="M7 7l5 5 5-5"/>
            <path d="M7 12l5 5 5-5"/>
        </svg>
    ),
};

// Interfaces
interface SubMenuItem {
    name: string;
    description: string;
    href: string;
    Icon: ({ className }: { className?: string }) => JSX.Element;
}

interface NavItem {
    name: string;
    href: string;
    submenu?: SubMenuItem[];
}
// Datos de navegación
const navItems: NavItem[] = [
    {
        name: 'Art',
        href: '',
        submenu: [
            {
                name: 'Courses',
                description: 'Explore our art courses and workshops for all levels',
                href: '/art/courses',
                Icon: Icons.Courses
            },
            {
                name: 'About Me',
                description: 'Learn about my journey and artistic philosophy',
                href: '/art/about',
                Icon: Icons.AboutMe
            },
            {
                name: 'Projects',
                description: 'Discover my latest artistic projects and collaborations',
                href: '/art/projects',
                Icon: Icons.Projects
            },
            {
                name: 'Exhibitions',
                description: 'View upcoming and past art exhibitions',
                href: '/art/exhibitions',
                Icon: Icons.Exhibitions
            }
        ],
    },
    {
        name: 'Shop',
        href: '',
        submenu: [
            {
                name: 'Art Works',
                description: 'Browse and collect unique pieces of art',
                href: '/shop/art-works',
                Icon: Icons.ArtWorks
            },
        ]
    }
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

    const handleMouseEnter = (itemName: string) => {
        setActiveItem(itemName)
    }

    const handleMouseLeave = () => {
        setActiveItem('')
    }

    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`fixed w-full z-50 transition-all duration-300 ${
                isScrolled ? 'bg-black/95 backdrop-blur-md' : 'bg-black'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-24">
                    {/* Logo con efecto hover */}
                    <Link
                        href="/"
                        className="flex items-center transform transition-transform duration-300 hover:scale-105"
                    >
                        <div className="relative w-[200px] h-[70px]">
                            <Image
                                src="/images/logo.png"
                                alt="Logo"
                                fill
                                priority
                                sizes="200px"
                                className="object-contain"
                                style={{
                                    filter: 'brightness(1) sepia(1) saturate(10000%) hue-rotate(0deg)',
                                    transform: 'scale(1.2)'
                                }}
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation - Centrado y mejorado */}
                    <div className="hidden md:flex items-center justify-center flex-grow">
                        <div className="flex items-center space-x-20">
                            {navItems.map((item) => (
                                <div
                                    key={item.name}
                                    className="relative group"
                                    onMouseEnter={() => handleMouseEnter(item.name)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Link
                                        href={item.href}
                                        className="text-white text-lg tracking-wider font-medium
                                                 hover:text-white/80 transition-all duration-200
                                                 px-3 py-2 rounded-full inline-flex items-center
                                                 hover:text-glow-light hover:bg-white/5"
                                    >
                                        {item.name}
                                        {item.submenu && (
                                            <svg
                                                className="w-5 h-5 ml-1 transition-transform duration-200
                                                         group-hover:rotate-180"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        )}
                                    </Link>

                                    {/* Submenu mejorado */}
                                    <AnimatePresence>
                                        {item.submenu && activeItem === item.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-96
                                                         bg-black/95 backdrop-blur-md rounded-xl shadow-xl
                                                         border border-white/10 overflow-hidden
                                                         shadow-[0_0_30px_rgba(0,0,0,0.3)]"
                                            >
                                                <div className="p-3">
                                                    {item.submenu.map((subItem) => (
                                                        <Link
                                                            key={subItem.name}
                                                            href={subItem.href}
                                                            className="block p-3 rounded-lg text-white/80
                                                                     hover:bg-white/10 group transition-all
                                                                     hover:scale-[1.02] transform"
                                                        >
                                                            <div className="flex items-center">
                                                                <subItem.Icon
                                                                    className="w-6 h-6 mr-4 text-white/60
                                                                             group-hover:text-white
                                                                             transition-colors"
                                                                />
                                                                <div>
                                                                    <p className="text-base font-medium text-white
                                                                              group-hover:text-glow-light">
                                                                        {subItem.name}
                                                                    </p>
                                                                    <p className="text-sm text-white/60
                                                                              group-hover:text-white/80">
                                                                        {subItem.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Menu Button - Mejorado */}
                    <div className="md:hidden">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors
                                     border border-white/20"
                            aria-label="Menu"
                        >
                            <svg
                                className="w-8 h-8 text-white"
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

            {/* Mobile Menu - Mejorado */}
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
                        className="md:hidden w-full bg-black/95 backdrop-blur-md
                                 border-t border-white/10 shadow-lg"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navItems.map((item) => (
                                <div key={item.name} className="space-y-2">
                                    <div
                                        className="flex items-center justify-between"
                                        onClick={() => {
                                            if (activeItem === item.name) {
                                                setActiveItem('')
                                            } else {
                                                setActiveItem(item.name)
                                            }
                                        }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="text-white text-lg tracking-wide
                                                     hover:text-white/80 transition-all duration-200
                                                     py-2 hover:text-glow-light flex-grow"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                        {item.submenu && (
                                            <button className="p-2 hover:bg-white/10 rounded-lg
                                                           transition-colors">
                                                <svg
                                                    className={`w-6 h-6 text-white/80 transition-transform duration-200
                                                              ${activeItem === item.name ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                    </div>

                                    <AnimatePresence>
                                        {item.submenu && activeItem === item.name && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="pl-4 space-y-2"
                                            >
                                                {item.submenu.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className="flex items-center p-3 rounded-lg
                                                                 text-white/80 hover:bg-white/10
                                                                 transition-all duration-200 group"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        <subItem.Icon
                                                            className="w-6 h-6 mr-4 text-white/60
                                                                     group-hover:text-white"
                                                        />
                                                        <div>
                                                            <p className="text-base font-medium text-white
                                                                       group-hover:text-glow-light">
                                                                {subItem.name}
                                                            </p>
                                                            <p className="text-sm text-white/60
                                                                       group-hover:text-white/80">
                                                                {subItem.description}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}