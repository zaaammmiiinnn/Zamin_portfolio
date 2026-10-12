"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FaArrowRight, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import SignalVisual from "./SignalVisual";

export default function Hero() {
    const shouldReduceMotion = useReducedMotion();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.1,
                delayChildren: shouldReduceMotion ? 0 : 0.08,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1] as const,
            },
        },
    };

    return (
        <section
            id="hero"
            className="relative min-h-[100svh] w-full flex flex-col justify-between pt-32 pb-14 px-6 sm:px-12 lg:px-20 overflow-hidden bg-[#060608]"
            aria-label="Hero Section"
        >
            {/* 1. Mathematical Waveform Signal Engine */}
            <SignalVisual />

            {/* 2. Architectural Coordinate Spine (Persistent Datum Line) */}
            <div className="pointer-events-none absolute left-6 sm:left-12 lg:left-20 top-0 bottom-0 w-[1px] bg-white/[0.05] -z-10" />

            {/* 3. Header Datum & Engineering Metadata */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-6xl w-full z-10 pt-4"
            >
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]"
                >
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/40">
                            SIGNAL // 001
                        </span>
                        <span className="text-white/20">•</span>
                        <span className="font-mono text-[10px] sm:text-xs text-blue-400 font-medium tracking-wider">
                            AUTONOMOUS SYSTEMS ARCHITECTURE
                        </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-white/50">
                        <span className="inline-flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#0066FF]" />
                            <span className="text-[11px] text-white/70">ZAMIN ASKARI RIZVI</span>
                        </span>
                    </div>
                </motion.div>
            </motion.div>

            {/* 4. Monumental Editorial Typography */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-6xl w-full my-auto z-10 py-10 space-y-8"
            >
                <motion.div variants={itemVariants} className="space-y-4">
                    <p className="font-mono text-xs tracking-[0.28em] uppercase text-white/45">
                        RESEARCH ⟶ CODE ⟶ DETERMINISTIC RUNTIME
                    </p>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] text-[#F3F2EE]">
                        <span className="block text-white/95">FROM SENSORY SIGNAL</span>
                        <span className="block text-white/80">TO AUTONOMOUS</span>
                        <span className="block text-white/95">
                            INTELLIGENCE<span className="text-blue-500">.</span>
                        </span>
                    </h1>
                </motion.div>

                {/* Subtitle / Engineering Thesis */}
                <motion.div variants={itemVariants} className="max-w-2xl">
                    <p className="text-base sm:text-lg md:text-xl text-[#9494A0] leading-relaxed font-light">
                        Engineering machine learning pipelines, real-time drone vision, and autonomous agent workflows.
                        Bridging noisy real-world data with verifiable, low-latency production systems.
                    </p>
                </motion.div>

                {/* Purposeful Architectural Actions */}
                <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5 pt-3">
                    <a
                        href="#projects"
                        className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-none border border-white/20 bg-white/[0.04] hover:bg-blue-600 hover:border-blue-500 text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-sm"
                    >
                        <span>[01] EXAMINE ARCHITECTURES</span>
                        <FaArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>

                    <a
                        href="#about"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-none border border-white/[0.08] hover:border-white/20 bg-transparent text-white/70 hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-300"
                    >
                        <span>[02] SYSTEM MONOGRAPH</span>
                    </a>

                    {/* Direct Verified Links */}
                    <div className="flex items-center gap-3 sm:ml-4 pt-2 sm:pt-0">
                        <a
                            href="https://github.com/zaaammmiiinnn"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub Profile"
                            className="p-3 border border-white/[0.08] hover:border-blue-500 text-white/50 hover:text-white transition-colors"
                        >
                            <FaGithub className="w-4 h-4" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/zamin-askari-rizvi/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn Profile"
                            className="p-3 border border-white/[0.08] hover:border-blue-500 text-white/50 hover:text-white transition-colors"
                        >
                            <FaLinkedin className="w-4 h-4" />
                        </a>
                        <a
                            href="mailto:zaminaskari.work@gmail.com"
                            aria-label="Send Direct Email"
                            className="p-3 border border-white/[0.08] hover:border-blue-500 text-white/50 hover:text-white transition-colors"
                        >
                            <FaEnvelope className="w-4 h-4" />
                        </a>
                    </div>
                </motion.div>
            </motion.div>

            {/* 5. Continuous Signal Datum Footer & Calibration Status */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="max-w-6xl w-full z-10 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
                {/* Calibration Status Telemetry */}
                <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] text-white/40">
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

                {/* Continuous Carrier Wave Cue */}
                <a
                    href="#about"
                    aria-label="Continue to Chapter 01"
                    className="group inline-flex items-center gap-3 font-mono text-xs text-white/50 hover:text-white transition-colors"
                >
                    <span className="tracking-widest uppercase text-[10px]">SCROLL INTO SIGNAL ANALYSIS</span>
                    <span className="text-blue-400 group-hover:translate-y-0.5 transition-transform">↓</span>
                </a>
            </motion.div>
        </section>
    );
}
