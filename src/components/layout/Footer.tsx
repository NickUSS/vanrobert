'use client'
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaPinterest, FaYoutube } from 'react-icons/fa';

const footerLinks = {
    quickLinks: [
        { name: 'Art Collection', href: '/art' },
        { name: 'Fashion', href: '/fashion' },
        { name: 'Courses', href: '/courses' },
        { name: 'About', href: '/about' },
    ],
    social: [
        { name: 'Instagram', href: 'https://instagram.com/vanrobert', Icon: FaInstagram },
        { name: 'Twitter', href: 'https://twitter.com/vanrobert', Icon: FaTwitter },
        { name: 'Pinterest', href: 'https://pinterest.com/vanrobert', Icon: FaPinterest },
        { name: 'YouTube', href: 'https://youtube.com/vanrobert', Icon: FaYoutube },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-black text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Logo and Description */}
                    <div className="space-y-6">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative w-[180px] h-[60px]"
                        >
                            <Image
                                src="/images/logo.png"
                                alt="Van Robert"
                                fill
                                sizes="180px"
                                className="object-contain brightness-0 invert"
                                priority
                            />
                        </motion.div>
                        <p className="text-gray-400 leading-relaxed">
                            Discover the unique fusion of art and fashion through
                            Van Robert's distinctive vision and creative expression.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold">Navigation</h3>
                        <ul className="space-y-4">
                            {footerLinks.quickLinks.map((link) => (
                                <motion.li
                                    key={link.name}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold">Contact</h3>
                        <ul className="space-y-4 text-gray-400">
                            <motion.li
                                whileHover={{ x: 5 }}
                                className="flex items-center space-x-2"
                            >
                                <span className="font-medium text-white">Email:</span>
                                <a href="mailto:contact@vanrobert.net"
                                   className="hover:text-white transition-colors">
                                    contact@vanrobert.net
                                </a>
                            </motion.li>
                            <motion.li
                                whileHover={{ x: 5 }}
                                className="flex items-center space-x-2"
                            >
                                <span className="font-medium text-white">Studio:</span>
                                <span>Doral, FL</span>
                            </motion.li>
                            <motion.li
                                whileHover={{ x: 5 }}
                                className="flex items-center space-x-2"
                            >
                                <span className="font-medium text-white">Hours:</span>
                                <span>Mon-Fri: 10am - 6pm</span>
                            </motion.li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold">Follow Us</h3>
                        <div className="flex space-x-5">
                            {footerLinks.social.map(({ name, href, Icon }) => (
                                <motion.a
                                    key={name}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <span className="sr-only">{name}</span>
                                    <Icon className="h-6 w-6" />
                                </motion.a>
                            ))}
                        </div>
                        <p className="text-gray-400">
                            Stay updated with our latest collections and events
                        </p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
                >
                    <p>
                        &copy; {new Date().getFullYear()} HR FineArt INC.
                        All rights reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}