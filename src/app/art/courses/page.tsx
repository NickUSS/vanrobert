'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
    subsets: ['latin'],
})

const courseModules = [
    {
        title: "Charcoal Drawing & Composition",
        description: "Master the fundamentals of drawing and composition using charcoal techniques.",
        duration: "2 weeks",
        image: "/images/course-charcoal.jpg"
    },
    {
        title: "Canvas Stretch & Preparation",
        description: "Learn professional techniques for canvas stretching and proper surface preparation.",
        duration: "1 week",
        image: "/images/course-canvas.jpg"
    },
    {
        title: "Color Theory & Management",
        description: "Understand color relationships, mixing, and how to create harmonious compositions.",
        duration: "2 weeks",
        image: "/images/course-color.jpg"
    },
    {
        title: "Still Life Painting",
        description: "Develop your skills in acrylic painting through still life studies.",
        duration: "3 weeks",
        image: "/images/course-still-life.jpg"
    },
    {
        title: "Landscape Painting",
        description: "Explore techniques for creating dynamic and atmospheric landscape paintings.",
        duration: "3 weeks",
        image: "/images/course-landscape.jpg"
    },
    {
        title: "Modern Painting Techniques",
        description: "Experiment with contemporary approaches to acrylic painting.",
        duration: "3 weeks",
        image: "/images/course-modern.jpg"
    }
]

export default function CoursesPage() {
    return (
        <div className={`min-h-screen bg-white pt-24 ${montserrat.className}`}>
            {/* Hero Section */}
            <section className="relative py-20 bg-black text-white">
                <div className="absolute inset-0 opacity-30">
                    <Image
                        src="/images/course-hero.jpg"
                        alt="Art Course Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold mb-6"
                    >
                        Acrylic Painting Course
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-200 max-w-3xl mx-auto"
                    >
                        Master the art of acrylic painting from fundamentals to advanced techniques
                    </motion.p>
                </div>
            </section>

            {/* Course Overview */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Course Overview</h2>
                            <p className="text-gray-600 mb-6">
                                This comprehensive course is designed for both beginners and intermediate
                                artists looking to master acrylic painting techniques. Through hands-on
                                practice and expert guidance, you&#39;ll develop the skills needed to create
                                stunning artwork.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center text-gray-700">
                                    <span className="mr-2">🎨</span>
                                    <span>14 weeks of intensive training</span>
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <span className="mr-2">👥</span>
                                    <span>Small group sessions (max 12 students)</span>
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <span className="mr-2">📝</span>
                                    <span>Personal feedback and guidance</span>
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <span className="mr-2">🎓</span>
                                    <span>Certificate upon completion</span>
                                </li>
                            </ul>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative h-[400px] rounded-xl overflow-hidden shadow-xl"
                        >
                            <Image
                                src="/images/course-overview.jpg"
                                alt="Course Overview"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Course Modules */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center">Course Modules</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courseModules.map((module, index) => (
                            <motion.div
                                key={module.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl shadow-lg overflow-hidden"
                            >
                                <div className="relative h-48">
                                    <Image
                                        src={module.image}
                                        alt={module.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                                    <p className="text-gray-600 mb-4">{module.description}</p>
                                    <p className="text-sm text-gray-500">Duration: {module.duration}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enrollment Section */}
            <section className="py-20 bg-black text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Journey?</h2>
                    <p className="text-gray-300 mb-8">
                        Enrollment is now open for our next course starting March 6.
                        Limited spots available.
                    </p>
                    <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="text-left">
                                <h3 className="font-bold mb-4">Course Details</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li>Duration: 14 weeks</li>
                                    <li>Schedule: Twice weekly</li>
                                    <li>Location: Art Studio</li>
                                    <li>Price: $1,499</li>
                                </ul>
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold mb-4">What&#39;s Included</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li>All materials and supplies</li>
                                    <li>Personal guidance</li>
                                    <li>Certificate</li>
                                    <li>Online resources</li>
                                </ul>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-black px-8 py-3 rounded-full
                                     text-lg font-semibold hover:bg-gray-100
                                     transition-colors duration-300"
                        >
                            Enroll Now
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: "Is this course suitable for beginners?",
                                a: "Yes, this course is designed for both beginners and intermediate artists."
                            },
                            {
                                q: "What materials are provided?",
                                a: "All necessary materials including canvas, paints, and brushes are included."
                            },
                            {
                                q: "Are there payment plans available?",
                                a: "Yes, we offer flexible payment plans. Contact us for more information."
                            }
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-6 rounded-xl shadow-md"
                            >
                                <h3 className="font-bold mb-2">{faq.q}</h3>
                                <p className="text-gray-600">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}