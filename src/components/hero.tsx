"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight, FaGithub, FaLinkedin, FaEnvelope, FaTimes } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const ROTATING_PHRASES = [
    "I build AI that solves real problems",
    "Data → Models → Impact",
    "Full-stack AI, end to end",
];

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const [activePhraseIndex, setActivePhraseIndex] = useState(0);
    const [showEasterEgg, setShowEasterEgg] = useState(false);

    // Rotate phrases every 3.2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActivePhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
        }, 3200);
        return () => clearInterval(interval);
    }, []);

    // 90-second recruiter easter egg timer
    useEffect(() => {
        const timer = setTimeout(() => {
            if (typeof window !== "undefined") {
                const dismissed = sessionStorage.getItem("recruiter_egg_dismissed");
                if (!dismissed) {
                    setShowEasterEgg(true);
                }
            }
        }, 90000); // 90 seconds

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                dismissEasterEgg();
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const dismissEasterEgg = () => {
        setShowEasterEgg(false);
        if (typeof window !== "undefined") {
            sessionStorage.setItem("recruiter_egg_dismissed", "true");
        }
    };

    // GSAP ScrollTrigger timeline setup with desktop pinning (200vh) & mobile fallback
    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Desktop (>= 768px): Pinned cinematic sequence for 200vh
            mm.add("(min-width: 768px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: () => `+=${window.innerHeight * 2}`,
                        scrub: true,
                        pin: true,
                        anticipatePin: 1,
                    },
                });

                tl.to(".hero-smoke", { scale: 1.2, opacity: 0.6, ease: "none" }, 0)
                  .to(".hero-ribbon", { rotate: 8, y: -40, ease: "none" }, 0)
                  .to(".hero-title", { y: -100, opacity: 0, ease: "none" }, 0);
            });

            // Mobile (< 768px): No pinning. Just a clean fade-in
            mm.add("(max-width: 767px)", () => {
                gsap.fromTo(
                    ".hero-title",
                    { opacity: 0, y: 24 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
                );
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            id="hero"
            className="hero relative w-full min-h-screen overflow-hidden bg-[#060608] text-[#F3F2EE] flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 lg:px-20 select-none"
            aria-label="Hero Section"
        >
            {/* 1. Cinematic Silhouette Visual Background (Blue Theme) */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <Image
                    src="/images/hero_silhouette.jpg"
                    alt="Dark cinematic silhouette of AI Systems Engineer in deep blue lighting"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center opacity-30 md:opacity-40 transition-opacity duration-1000 mix-blend-screen"
                />
                {/* Radial Gradient Vignette over silhouette */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#060608]/70 to-[#060608]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-[#060608]/90" />
            </div>

            {/* 2. Layered Smoke Overlay (Scales up & fades as user scrolls) */}
            <div
                className="hero-smoke pointer-events-none absolute inset-0 z-[1] will-change-transform origin-center opacity-25"
                aria-hidden="true"
            >
                {/* Smoke Plume 1 - Center Left Cyan/Blue */}
                <div className="absolute -top-[10%] -left-[10%] w-[80vw] h-[70vh] rounded-full bg-[radial-gradient(circle_at_center,_rgba(0,102,255,0.22)_0%,_rgba(0,240,255,0.08)_35%,_transparent_70%)] blur-[100px]" />
                {/* Smoke Plume 2 - Center Right Deep Indigo */}
                <div className="absolute top-[20%] -right-[15%] w-[75vw] h-[80vh] rounded-full bg-[radial-gradient(circle_at_center,_rgba(30,58,138,0.28)_0%,_rgba(0,102,255,0.12)_45%,_transparent_75%)] blur-[120px]" />
                {/* Smoke Plume 3 - Bottom Floor Drift */}
                <div className="absolute bottom-[-15%] left-[10%] w-[90vw] h-[50vh] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(14,165,233,0.18)_0%,_transparent_65%)] blur-[90px]" />

                {/* Subtle Organic Smoke Noise Texture */}
                <svg className="absolute inset-0 w-full h-full opacity-15 mix-blend-overlay">
                    <filter id="heroSmokeNoise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" result="noise" />
                        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#heroSmokeNoise)" />
                </svg>
            </div>

            {/* 3. SVG Ribbon with rotating phrases (Drifts upward & rotates on scroll) */}
            <div
                className="hero-ribbon pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-[2] will-change-transform overflow-visible hidden md:block"
                aria-hidden="true"
            >
                <svg
                    className="w-full h-64 overflow-visible"
                    viewBox="0 0 1600 260"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="ribbonBlueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#0066FF" stopOpacity="0" />
                            <stop offset="20%" stopColor="#0066FF" stopOpacity="0.4" />
                            <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.85" />
                            <stop offset="80%" stopColor="#3B82F6" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
                        </linearGradient>

                        <filter id="ribbonGlowFilter" x="-20%" y="-40%" width="140%" height="180%">
                            <feGaussianBlur stdDeviation="6" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>

                        <path
                            id="ribbonWavePath"
                            d="M -150 160 C 250 40, 600 240, 950 110 C 1300 -20, 1550 180, 1850 120"
                        />
                        <path
                            id="ribbonWavePathOffset"
                            d="M -150 185 C 250 65, 600 265, 950 135 C 1300 5, 1550 205, 1850 145"
                        />
                    </defs>

                    {/* Glowing Primary Ribbon Stroke */}
                    <path
                        d="M -150 160 C 250 40, 600 240, 950 110 C 1300 -20, 1550 180, 1850 120"
                        stroke="url(#ribbonBlueGradient)"
                        strokeWidth="2.5"
                        filter="url(#ribbonGlowFilter)"
                    />

                    {/* Secondary Echo Dash Stroke */}
                    <path
                        d="M -150 185 C 250 65, 600 265, 950 135 C 1300 5, 1550 205, 1850 145"
                        stroke="url(#ribbonBlueGradient)"
                        strokeWidth="1"
                        strokeDasharray="5 7"
                        opacity="0.45"
                    />

                    {/* Text Path Streaming Across Ribbon */}
                    <text className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] fill-cyan-300/80">
                        <textPath href="#ribbonWavePath" startOffset="3%">
                            {`✦ ${ROTATING_PHRASES[activePhraseIndex]} ✦ DATA → MODELS → IMPACT ✦ FULL-STACK AI, END TO END ✦ I BUILD AI THAT SOLVES REAL PROBLEMS ✦`}
                        </textPath>
                    </text>
                </svg>
            </div>

            {/* 4. Top Datum Metadata & Status Dot */}
            <div className="z-10 w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
                {/* Available for Opportunities Badge */}
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400 font-mono text-xs">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="tracking-wider uppercase text-[11px] font-medium">
                        Available for opportunities
                    </span>
                </div>

                {/* Rotating Narrative Chip */}
                <div className="flex items-center gap-2 font-mono text-[11px] text-white/50 bg-white/[0.03] px-3 py-1.5 border border-white/[0.06]">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#0066FF]" />
                    <span className="text-white/40 uppercase tracking-widest hidden sm:inline">NARRATIVE:</span>
                    <span className="text-blue-300 transition-all duration-500 key={activePhraseIndex}">
                        {ROTATING_PHRASES[activePhraseIndex]}
                    </span>
                </div>
            </div>

            {/* 5. Hero Title & Narrative Content (Fades out & moves up on scroll) */}
            <div className="hero-title z-10 w-full max-w-6xl mx-auto my-auto py-8 sm:py-12 space-y-8 select-text">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-xs tracking-[0.3em] uppercase text-blue-400 font-medium">
                            ZAMIN ASKARI RIZVI
                        </span>
                        <span className="text-white/20">•</span>
                        <span className="font-mono text-xs tracking-[0.25em] uppercase text-white/40">
                            AI SYSTEMS &amp; FULL-STACK ARCHITECT
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] text-[#F3F2EE]">
                        <span className="block text-white/95">FROM SENSORY SIGNAL</span>
                        <span className="block text-white/80">TO AUTONOMOUS</span>
                        <span className="block text-white/95">
                            INTELLIGENCE<span className="text-blue-500">.</span>
                        </span>
                    </h1>
                </div>

                {/* Intro Thesis */}
                <div className="max-w-2xl">
                    <p className="text-base sm:text-lg md:text-xl text-[#9494A0] leading-relaxed font-light">
                        Engineering machine learning pipelines, real-time drone vision, and autonomous agent workflows.
                        Bridging noisy real-world data with verifiable, low-latency production systems.
                    </p>
                </div>

                {/* CTA Buttons & Social Channels */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                        href="#projects"
                        className="group inline-flex items-center gap-3 px-6 py-3.5 border border-blue-500/30 bg-blue-600/10 hover:bg-blue-600 text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(0,102,255,0.15)]"
                    >
                        <span>[01] EXAMINE ARCHITECTURES</span>
                        <FaArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>

                    <a
                        href="#about"
                        className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/[0.1] hover:border-white/30 bg-white/[0.02] text-white/80 hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-300"
                    >
                        <span>[02] SYSTEM MONOGRAPH</span>
                    </a>

                    {/* Social links */}
                    <div className="flex items-center gap-2.5 sm:ml-4 pt-2 sm:pt-0">
                        <a
                            href="https://github.com/zaaammmiiinnn"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub Profile"
                            className="p-3 border border-white/[0.08] hover:border-blue-500 hover:bg-blue-600/10 text-white/60 hover:text-white transition-colors"
                        >
                            <FaGithub className="w-4 h-4" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/zamin-askari-rizvi/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn Profile"
                            className="p-3 border border-white/[0.08] hover:border-blue-500 hover:bg-blue-600/10 text-white/60 hover:text-white transition-colors"
                        >
                            <FaLinkedin className="w-4 h-4" />
                        </a>
                        <a
                            href="mailto:zaminaskari.work@gmail.com"
                            aria-label="Send Direct Email"
                            className="p-3 border border-white/[0.08] hover:border-blue-500 hover:bg-blue-600/10 text-white/60 hover:text-white transition-colors"
                        >
                            <FaEnvelope className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>

            {/* 6. Bottom Calibration Telemetry & Scroll Cue */}
            <div className="z-10 w-full max-w-6xl mx-auto pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-white/40">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400" />
                        <span>SENSORY INPUT: ARDUPILOT UAV TELEMETRY</span>
                    </span>
                    <span className="hidden md:inline text-white/20">/</span>
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-cyan-400" />
                        <span>LATENT MODEL: PYTORCH &amp; NLP</span>
                    </span>
                </div>

                <a
                    href="#about"
                    aria-label="Scroll down to explore story"
                    className="group inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-[11px]"
                >
                    <span className="tracking-widest uppercase">SCROLL TO COMMENCE NARRATIVE</span>
                    <span className="text-blue-400 group-hover:translate-y-0.5 transition-transform">↓</span>
                </a>
            </div>

            {/* 7. Easter Egg: 90-Second Recruiter Popup */}
            {showEasterEgg && (
                <div
                    role="alert"
                    aria-live="polite"
                    className="fixed bottom-6 right-6 z-50 max-w-sm p-5 bg-[#0C0F17]/95 backdrop-blur-md border border-blue-500/40 shadow-[0_10px_35px_rgba(0,102,255,0.25)] rounded-none text-white space-y-3 animate-in fade-in slide-in-from-bottom-5 duration-500"
                >
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            <span>Easter Egg Discovered</span>
                        </div>
                        <button
                            onClick={dismissEasterEgg}
                            className="text-white/40 hover:text-white transition-colors p-1"
                            aria-label="Dismiss Easter Egg Notification"
                        >
                            <FaTimes className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <p className="text-sm text-white/90 leading-relaxed font-sans">
                        &ldquo;You’ve spent more time here than most recruiters do. Guess you like this — let’s collaborate.&rdquo;
                    </p>

                    <div className="flex items-center gap-3 pt-1">
                        <a
                            href="#contact"
                            onClick={dismissEasterEgg}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs uppercase tracking-wider transition-colors"
                        >
                            <span>Let&apos;s Talk</span>
                            <FaArrowRight className="w-2.5 h-2.5" />
                        </a>
                        <button
                            onClick={dismissEasterEgg}
                            className="font-mono text-xs text-white/50 hover:text-white transition-colors uppercase tracking-wider"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
