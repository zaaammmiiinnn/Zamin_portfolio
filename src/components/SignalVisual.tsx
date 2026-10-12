"use client";

import { useEffect, useRef } from "react";

/**
 * SIGNAL VISUAL ENGINE — "SIGNAL / SYSTEMS IN MOTION"
 * An interactive, lightweight mathematical waveform and phase-space canvas.
 * Simulates signal modulation, harmonic resonance, and convergence from noise into order.
 * 
 * Performance:
 * - Pure 2D Canvas with zero external dependencies.
 * - Pauses rendering when scrolled out of view or tab is hidden.
 * - Disables pointer calculations on touch devices.
 * - Static harmonic freeze for prefers-reduced-motion.
 */
export default function SignalVisual() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        let isVisible = true;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const isTouch = window.matchMedia("(pointer: coarse)").matches;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let width = 0;
        let height = 0;
        let mouseX = -9999;
        let mouseY = -9999;
        let targetFreq = 1.0;
        let currentFreq = 1.0;
        let targetAmp = 1.0;
        let currentAmp = 1.0;

        const setupDimensions = () => {
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };

        setupDimensions();

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;

            // Normalize pointer influence (frequency and amplitude modulation)
            const nx = Math.max(0, Math.min(1, mouseX / width));
            const ny = Math.max(0, Math.min(1, mouseY / height));
            targetFreq = 0.6 + nx * 1.8;
            targetAmp = 0.7 + (1 - ny) * 0.9;
        };

        const handleMouseLeave = () => {
            targetFreq = 1.0;
            targetAmp = 1.0;
            mouseX = -9999;
            mouseY = -9999;
        };

        if (!isTouch) {
            window.addEventListener("mousemove", handleMouseMove, { passive: true });
            document.addEventListener("mouseleave", handleMouseLeave);
        }

        const handleResize = () => {
            setupDimensions();
            if (prefersReducedMotion) renderStaticFrame();
        };

        window.addEventListener("resize", handleResize);

        const handleVisibilityChange = () => {
            isVisible = !document.hidden;
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Static rendering for reduced-motion users
        const renderStaticFrame = () => {
            ctx.clearRect(0, 0, width, height);
            const centerY = height * 0.52;
            ctx.beginPath();
            ctx.strokeStyle = "rgba(0, 102, 255, 0.4)";
            ctx.lineWidth = 1.5;

            for (let x = 0; x < width; x += 4) {
                const y = centerY + Math.sin(x * 0.015) * 35;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        };

        if (prefersReducedMotion) {
            renderStaticFrame();
            return () => {
                window.removeEventListener("resize", handleResize);
                if (!isTouch) {
                    window.removeEventListener("mousemove", handleMouseMove);
                    document.removeEventListener("mouseleave", handleMouseLeave);
                }
                document.removeEventListener("visibilitychange", handleVisibilityChange);
            };
        }

        let time = 0;
        let lastTimestamp = performance.now();

        // 3 Harmonically Coupled Carrier Waves
        const render = (now: number) => {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            const dt = Math.min((now - lastTimestamp) / 1000, 0.1);
            lastTimestamp = now;
            time += dt * 1.2;

            // Smooth interpolation of frequency and amplitude
            currentFreq += (targetFreq - currentFreq) * 0.05;
            currentAmp += (targetAmp - currentAmp) * 0.05;

            ctx.clearRect(0, 0, width, height);

            const centerY = width > 768 ? height * 0.52 : height * 0.48;
            const waveLength = width;
            const pointsCount = Math.min(Math.floor(width / 3), 280);
            const step = waveLength / pointsCount;

            // Ambient background datum lines (radar oscilloscope grid)
            ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
            ctx.lineWidth = 1;
            [-80, -40, 0, 40, 80].forEach((offset) => {
                ctx.beginPath();
                ctx.moveTo(0, centerY + offset);
                ctx.lineTo(width, centerY + offset);
                ctx.stroke();
            });

            // Vertical calibration pips along the waveform
            const pipCount = 9;
            for (let i = 1; i < pipCount; i++) {
                const px = (width / pipCount) * i;
                ctx.beginPath();
                ctx.moveTo(px, centerY - 15);
                ctx.lineTo(px, centerY + 15);
                ctx.strokeStyle = "rgba(0, 102, 255, 0.08)";
                ctx.stroke();
            }

            // Layered Waveforms
            const waves = [
                {
                    freqMultiplier: 0.8 * currentFreq,
                    ampMultiplier: 42 * currentAmp,
                    speed: 1.1,
                    phase: 0,
                    stroke: "rgba(0, 102, 255, 0.65)",
                    width: 2,
                },
                {
                    freqMultiplier: 1.6 * currentFreq,
                    ampMultiplier: 24 * currentAmp,
                    speed: 1.8,
                    phase: Math.PI * 0.35,
                    stroke: "rgba(0, 240, 255, 0.45)",
                    width: 1.2,
                },
                {
                    freqMultiplier: 2.8 * currentFreq,
                    ampMultiplier: 12 * currentAmp,
                    speed: 2.4,
                    phase: Math.PI * 0.7,
                    stroke: "rgba(255, 255, 255, 0.2)",
                    width: 0.8,
                },
            ];

            waves.forEach((w) => {
                ctx.beginPath();
                ctx.strokeStyle = w.stroke;
                ctx.lineWidth = w.width;

                for (let i = 0; i <= pointsCount; i++) {
                    const x = i * step;
                    const progress = x / width;

                    // Envelope function: tapered at ends, strong in center
                    const envelope = Math.sin(progress * Math.PI);

                    // Primary harmonic equation
                    const fundamental = Math.sin(progress * Math.PI * 4 * w.freqMultiplier + time * w.speed + w.phase);
                    const secondary = Math.cos(progress * Math.PI * 8 * w.freqMultiplier - time * 0.6);

                    const y = centerY + (fundamental * 0.7 + secondary * 0.3) * w.ampMultiplier * envelope;

                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            });

            // Interactive focal probe (when pointer is active)
            if (!isTouch && mouseX > 0 && mouseX < width) {
                // Vertical probe cursor
                ctx.strokeStyle = "rgba(0, 240, 255, 0.25)";
                ctx.lineWidth = 1;
                ctx.setLineDash([3, 4]);
                ctx.beginPath();
                ctx.moveTo(mouseX, centerY - 100);
                ctx.lineTo(mouseX, centerY + 100);
                ctx.stroke();
                ctx.setLineDash([]); // reset

                // Crosshair marker
                const sampleProgress = mouseX / width;
                const sampleEnv = Math.sin(sampleProgress * Math.PI);
                const probeY =
                    centerY +
                    Math.sin(sampleProgress * Math.PI * 4 * waves[0].freqMultiplier + time * waves[0].speed) *
                        waves[0].ampMultiplier *
                        sampleEnv;

                ctx.beginPath();
                ctx.arc(mouseX, probeY, 4, 0, Math.PI * 2);
                ctx.fillStyle = "#00F0FF";
                ctx.shadowColor = "#00F0FF";
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
            if (!isTouch) {
                window.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseleave", handleMouseLeave);
            }
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 w-full h-full opacity-70 -z-10"
            aria-hidden="true"
        />
    );
}
