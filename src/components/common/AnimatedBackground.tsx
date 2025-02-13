'use client'
import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    radius: number;
    dx: number;
    dy: number;
    color: string;
}

export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        const initCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const getParticleColors = () => {
            const computedStyle = getComputedStyle(document.documentElement);
            return [
                `hsla(var(--particle-color-1) / 0.3)`,
                `hsla(var(--particle-color-2) / 0.2)`,
                `hsla(var(--particle-color-3) / 0.1)`
            ];
        };

        const initParticles = () => {
            particles = [];
            const colors = getParticleColors();

            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 1,
                    dx: (Math.random() - 0.5) * 0.5,
                    dy: (Math.random() - 0.5) * 0.5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                // Actualizar posición
                particle.x += particle.dx;
                particle.y += particle.dy;

                // Rebote en los bordes
                if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;

                // Dibujar partícula
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
            });

            // Dibujar conexiones
            particles.forEach((particle1, i) => {
                particles.slice(i + 1).forEach(particle2 => {
                    const dx = particle1.x - particle2.x;
                    const dy = particle1.y - particle2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        const opacity = 0.1 * (1 - distance / 100);
                        ctx.beginPath();
                        ctx.strokeStyle = `hsla(var(--particle-color-1) / ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particle1.x, particle1.y);
                        ctx.lineTo(particle2.x, particle2.y);
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            initCanvas();
        };

        initCanvas();
        animate();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{
                background: `linear-gradient(to right, hsl(var(--background-start)), hsl(var(--background-end)))`
            }}
        />
    );
}