'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';
import AnimatedButton from '../buttons/AnimatedButton';

export default function Newsletter() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implementar lógica de suscripción
        console.log('Suscribiendo:', email);
    };

    return (
        <section className="py-20 bg-black text-white">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold mb-6">
                        Mantente Informado
                    </h2>
                    <p className="mb-8 max-w-2xl mx-auto">
                        Suscríbete para recibir las últimas noticias sobre arte y eventos
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-md mx-auto flex gap-4"
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Tu correo electrónico"
                            className="flex-1 px-4 py-2 rounded-full text-gray-900
                                     focus:ring-2 focus:ring-white focus:outline-none
                                     transition-all duration-300"
                            required
                        />
                        <AnimatedButton
                            variant="primary"
                            className="bg-white text-black hover:bg-gray-100"
                        >
                            Suscribirse
                        </AnimatedButton>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}