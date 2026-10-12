"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight procedural canvas that creates an ambient cyber-mesh / synaptic field.
 * Zero external asset requests, zero 404 errors, strictly managed animation frames,
 * auto-pauses when off-screen, and respects prefers-reduced-motion.
 */
export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        let isVisible = true;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Particle model
        interface Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            alpha: number;
        }

        let particles: Particle[] = [];
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const initParticles = () => {
            const count = Math.min(Math.floor((width * height) / 24000), 45);
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,
                    radius: Math.random() * 1.5 + 0.5,
                    alpha: Math.random() * 0.4 + 0.15,
                });
            }
        };

        initParticles();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
            if (prefersReducedMotion) renderStatic();
        };

        window.addEventListener("resize", handleResize);

        const renderStatic = () => {
            ctx.clearRect(0, 0, width, height);
            for (const p of particles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 150, 255, ${p.alpha * 0.6})`;
                ctx.fill();
            }
        };

        if (prefersReducedMotion) {
            renderStatic();
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }

        const render = () => {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            ctx.clearRect(0, 0, width, height);

            // Connect nearby particles
            const maxDist = 120;
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                p1.x += p1.vx;
                p1.y += p1.vy;

                // Bounce boundaries
                if (p1.x < 0 || p1.x > width) p1.vx *= -1;
                if (p1.y < 0 || p1.y > height) p1.vy *= -1;

                // Draw point
                ctx.beginPath();
                ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 200, 255, ${p1.alpha})`;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.15;
                        ctx.strokeStyle = `rgba(0, 102, 255, ${alpha})`;
                        ctx.lineWidth = 0.75;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        // Pause animation when tab is inactive or hidden
        const handleVisibilityChange = () => {
            isVisible = !document.hidden;
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 w-full h-full opacity-40 -z-10"
            aria-hidden="true"
        />
    );
}
