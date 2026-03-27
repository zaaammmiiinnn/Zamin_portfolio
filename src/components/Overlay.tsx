"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function Overlay() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Section 1: 0% – 30% (center — main hero)
    const s1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.32], [0, 1, 1, 0]);
    const s1Y = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.32], [40, 0, 0, -60]);

    // Section 2: 30% – 60% (left — tagline)
    const s2Opacity = useTransform(scrollYProgress, [0.28, 0.36, 0.52, 0.58], [0, 1, 1, 0]);
    const s2Y = useTransform(scrollYProgress, [0.28, 0.36, 0.52, 0.58], [40, 0, 0, -60]);

    // Section 3: 60% – 90% (right — mission)
    const s3Opacity = useTransform(scrollYProgress, [0.56, 0.64, 0.82, 0.88], [0, 1, 1, 0]);
    const s3Y = useTransform(scrollYProgress, [0.56, 0.64, 0.82, 0.88], [40, 0, 0, -60]);

    // Social links
    const socialsOpacity = useTransform(scrollYProgress, [0, 0.05, 0.88, 0.95], [0, 0.8, 0.8, 0]);

    // Scroll indicator
    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.18], [0, 1, 1, 0]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ height: "500vh" }}
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Section 1: Name & "Building intelligent systems" — Center */}
                <motion.div
                    style={{ opacity: s1Opacity, y: s1Y }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="inline-block px-5 py-1.5 mb-8 text-[11px] font-semibold tracking-[0.25em] uppercase rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 backdrop-blur-sm pointer-events-auto"
                    >
                        Software Engineer & AI Developer
                    </motion.span>

                    <h1 className="text-glow-blue">
                        <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white/90 leading-[1.05]">
                            Building intelligent
                        </span>
                        <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mt-1">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400">
                                systems
                            </span>
                            <span className="text-white/90"> that</span>
                        </span>
                        <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white/90 leading-[1.05] mt-1">
                            feel alive.
                        </span>
                    </h1>

                    <p className="mt-6 text-sm sm:text-base md:text-lg text-white/40 font-light tracking-wide max-w-md">
                        Zamin Askari Rizvi
                    </p>

                    <div className="flex gap-3 mt-8 pointer-events-auto">
                        <a
                            href="#projects"
                            className="px-6 py-2.5 rounded-full bg-blue-500 text-white font-medium text-sm hover:bg-blue-400 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                        >
                            View Projects
                        </a>
                        <a
                            href="#contact"
                            className="px-6 py-2.5 rounded-full border border-white/10 text-white/70 font-medium text-sm hover:bg-white/5 hover:text-white transition-all backdrop-blur-sm"
                        >
                            Contact Me
                        </a>
                    </div>
                </motion.div>

                {/* Section 2: "I build digital experiences" — Left */}
                <motion.div
                    style={{ opacity: s2Opacity, y: s2Y }}
                    className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 md:px-24 lg:px-32"
                >
                    <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-blue-400/70 mb-4">
                        About Me
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white/90 leading-tight max-w-3xl text-glow-blue">
                        I build
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                            digital experiences.
                        </span>
                    </h2>
                    <p className="mt-6 text-sm sm:text-base md:text-lg text-white/35 max-w-lg leading-relaxed font-light">
                        Scalable web applications and intelligent systems
                        that turn complex problems into elegant solutions.
                    </p>
                </motion.div>

                {/* Section 3: "Bridging design & engineering" — Right */}
                <motion.div
                    style={{ opacity: s3Opacity, y: s3Y }}
                    className="absolute inset-0 flex flex-col justify-center items-end px-8 sm:px-12 md:px-24 lg:px-32 text-right"
                >
                    <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-blue-400/70 mb-4">
                        My Approach
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white/90 leading-tight max-w-3xl text-glow-blue">
                        Bridging
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                            design & engineering.
                        </span>
                    </h2>
                    <p className="mt-6 text-sm sm:text-base md:text-lg text-white/35 max-w-lg leading-relaxed font-light">
                        Clean, efficient code meets user-centered design.
                        Every project is an opportunity to create something exceptional.
                    </p>
                </motion.div>

                {/* Social Links — Bottom */}
                <motion.div
                    style={{ opacity: socialsOpacity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 pointer-events-auto"
                >
                    {[
                        { href: "https://github.com/zaaammmiiinnn", Icon: FaGithub, label: "GitHub" },
                        { href: "https://www.linkedin.com/in/zamin-askari-rizvi/", Icon: FaLinkedin, label: "LinkedIn" },
                        { href: "https://leetcode.com/u/zaaammmiiinnn/", Icon: SiLeetcode, label: "LeetCode" },
                        { href: "mailto:zaminaskari.work@gmail.com", Icon: FaEnvelope, label: "Email" },
                    ].map(({ href, Icon, label }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith("mailto") ? undefined : "_blank"}
                            rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                            className="p-2.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/40 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300"
                            aria-label={label}
                        >
                            <Icon className="w-4 h-4" />
                        </a>
                    ))}
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: scrollIndicatorOpacity }}
                    className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/30"
                >
                    <span className="text-[10px] font-medium uppercase tracking-[0.3em] mb-3">
                        Scroll
                    </span>
                    <div className="w-4 h-8 border border-white/15 rounded-full flex justify-center p-1">
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="w-0.5 h-0.5 bg-blue-400/60 rounded-full"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
