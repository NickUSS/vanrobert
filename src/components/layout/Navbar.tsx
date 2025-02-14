'use client'
import {useState, useEffect, JSX} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedButton from '../buttons/AnimatedButton'

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

    FashionEvents: ({ className }: { className?: string }) => (
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
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
            <path d="M8 14h.01"/>
            <path d="M12 14h.01"/>
            <path d="M16 14h.01"/>
            <path d="M8 18h.01"/>
            <path d="M12 18h.01"/>
            <path d="M16 18h.01"/>
        </svg>
    ),
    Collections: ({ className }: { className?: string }) => (
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
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
            <path d="M21 5c0 1.66-4 3-9 3s-9-1.34-9-3"/>
            <path d="M3 5c0 1.66 4 3 9 3s9-1.34 9-3"/>
        </svg>
    ),
    Runway: ({ className }: { className?: string }) => (
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
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
        </svg>
    ),
    Clothes: ({ className }: { className?: string }) => (
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
            <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/>
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
    NewArrivals: ({ className }: { className?: string }) => (
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
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
            <circle cx="18" cy="5" r="3" fill="currentColor"/>
        </svg>
    ),
    Limited: ({ className }: { className?: string }) => (
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
            <path d="M20 7h-7L10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
            <path d="M12 12v6"/>
            <path d="M9 15h6"/>
        </svg>
    )
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

interface DesktopNavItemProps {
    item: NavItem;
    isScrolled: boolean;
    index: number;
}

// Variantes de animación
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
        ]
    },
    {
        name: 'Fashion',
        href: '/fashion',
        submenu: [
            {
                name: 'Fashion Events',
                description: 'Discover upcoming fashion shows and exclusive events',
                href: '/fashion/events',
                Icon: Icons.FashionEvents
            },
            {
                name: 'Collections',
                description: 'Explore our latest seasonal fashion collections',
                href: '/fashion/collections',
                Icon: Icons.Collections
            },
            {
                name: 'Runway',
                description: 'Watch our latest runway shows and presentations',
                href: '/fashion/runway',
                Icon: Icons.Runway
            }
        ]
    },
    {
        name: 'Shop',
        href: '/shop',
        submenu: [
            {
                name: 'New Arrivals',
                description: 'Discover our latest additions to the collection',
                href: '/shop/new-arrivals',
                Icon: Icons.NewArrivals
            },
            {
                name: 'Clothes',
                description: 'Explore our exclusive fashion pieces and accessories',
                href: '/shop/clothes',
                Icon: Icons.Clothes
            },
            {
                name: 'Art Works',
                description: 'Browse and collect unique pieces of art',
                href: '/shop/art-works',
                Icon: Icons.ArtWorks
            },
            {
                name: 'Limited Edition',
                description: 'Special collections and limited releases',
                href: '/shop/limited',
                Icon: Icons.Limited
            }
        ]
    }
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
                                            <div className="mr-3 flex-shrink-0">
                                                <subItem.Icon className={`w-6 h-6 ${
                                                    isScrolled
                                                        ? 'text-gray-800 group-hover:text-black'
                                                        : 'text-white group-hover:text-white/90'
                                                }`} />
                                            </div>
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
                                                        } group`}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        <div className="flex items-center">
                                                            <subItem.Icon className={`w-5 h-5 mr-2 ${
                                                                isScrolled
                                                                    ? 'text-gray-600 group-hover:text-gray-900'
                                                                    : 'text-gray-300 group-hover:text-white'
                                                            }`} />
                                                            {subItem.name}
                                                        </div>
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