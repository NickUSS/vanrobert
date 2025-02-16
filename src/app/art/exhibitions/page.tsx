'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { upcomingEvents, pastEvents } from './data' // Mover los datos a un archivo separado

// Interfaces
interface Event {
    id: number
    title: string
    date: string
    location: string
    image: string
    status?: string
    description?: string
    content?: string
}

interface EventCardProps {
    event: Event
}

// Animaciones
const fadeInAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    viewport: { once: true }
}

type ButtonProps = {
    children: React.ReactNode;
} & Omit<React.ComponentProps<typeof motion.button>, 'children'>;

const Button = ({ children, ...props }: ButtonProps) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300"
        {...props}
    >
        {children}
    </motion.button>
);

const EventCard: React.FC<EventCardProps> = ({ event }) => (
    <motion.div
        {...fadeInAnimation}
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 group cursor-pointer"
    >
        <div className="relative h-48">
            <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
            {event.status && (
                <div className="absolute top-4 right-4">
          <span className="px-4 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-black">
            {event.status}
          </span>
                </div>
            )}
        </div>
        <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <div className="space-y-1 text-gray-500 text-sm">
                <p>{event.date}</p>
                <p>{event.location}</p>
            </div>
            <Button className="mt-4 w-full">Learn More</Button>
        </div>
    </motion.div>
)

const PastEventCard: React.FC<EventCardProps> = ({ event }) => (
    <motion.article {...fadeInAnimation} className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-[400px]">
            <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                loading="lazy"
            />
        </div>
        <div className="p-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>{event.date}</span>
                <span>•</span>
                <span>{event.location}</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
            {event.description && <p className="text-gray-600 mb-6">{event.description}</p>}
            {event.content && <p className="text-gray-600">{event.content}</p>}
            <div className="mt-6">
                <Link href={`/exhibitions/${event.id}`}>
                    <Button>View Gallery</Button>
                </Link>
            </div>
        </div>
    </motion.article>
)

const ExhibitionsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white pt-24">
            <section className="bg-black text-white py-16">
                <div className="container mx-auto px-4">
                    <motion.h1 {...fadeInAnimation} className="text-4xl md:text-5xl font-bold text-center mb-4">
                        Exhibitions
                    </motion.h1>
                    <motion.p
                        {...fadeInAnimation}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-center text-gray-300"
                    >
                        Discover our upcoming shows and past exhibitions
                    </motion.p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-2/3 space-y-12">
                        <h2 className="text-3xl font-bold mb-8">Past Exhibitions</h2>
                        {pastEvents.map(event => <PastEventCard key={event.id} event={event} />)}
                    </div>

                    <div className="lg:w-1/3">
                        <div className="sticky top-24">
                            <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
                            <div className="space-y-6">
                                {upcomingEvents.map(event => <EventCard key={event.id} event={event} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExhibitionsPage