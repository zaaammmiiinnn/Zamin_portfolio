"use client";

import { motion } from "framer-motion";
import {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
    FaArrowRight,
    FaExternalLinkAlt,
    FaBolt,
    FaLayerGroup,
    FaRocket,
    FaNodeJs,
} from "react-icons/fa";
import {
    SiLeetcode,
    SiPytorch,
    SiPython,
    SiNextdotjs,
    SiTypescript,
    SiReact,
    SiPostgresql,
    SiDocker,
    SiTailwindcss,
} from "react-icons/si";

export default function BentoGrid() {
    // Parent container with staggered child reveals
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    // Staggered slide-up and fade-in for each card
    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 85,
                damping: 16,
                mass: 0.9,
            },
        },
    };

    // Common card hover animation: lifts up y: -5 with glowing shadow
    const cardHoverAnimation = {
        y: -5,
        boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",
        transition: { duration: 0.25, ease: "easeOut" as const },
    };

    const techPills = [
        { name: "Python", Icon: SiPython, color: "text-[#3776AB]" },
        { name: "PyTorch", Icon: SiPytorch, color: "text-[#EE4C2C]" },
        { name: "Next.js", Icon: SiNextdotjs, color: "text-white" },
        { name: "TypeScript", Icon: SiTypescript, color: "text-[#3178C6]" },
        { name: "React", Icon: SiReact, color: "text-[#61DAFB]" },
        { name: "Node.js", Icon: FaNodeJs, color: "text-[#339933]" },
        { name: "PostgreSQL", Icon: SiPostgresql, color: "text-[#4169E1]" },
        { name: "Docker", Icon: SiDocker, color: "text-[#2496ED]" },
        { name: "Tailwind", Icon: SiTailwindcss, color: "text-[#06B6D4]" },
    ];

    const socials = [
        { href: "https://github.com/zaaammmiiinnn", Icon: FaGithub, label: "GitHub" },
        { href: "https://www.linkedin.com/in/zamin-askari-rizvi/", Icon: FaLinkedin, label: "LinkedIn" },
        { href: "https://leetcode.com/u/zaaammmiiinnn/", Icon: SiLeetcode, label: "LeetCode" },
        { href: "mailto:zaminaskari.work@gmail.com", Icon: FaEnvelope, label: "Email" },
    ];

    return (
        <section id="hero" className="pt-28 pb-12 px-4 md:px-6 mx-auto max-w-6xl w-full">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6"
            >
                {/* 1. HERO CARD (Spans 2 columns on desktop) */}
                <motion.div
                    variants={cardVariants}
                    whileHover={cardHoverAnimation}
                    className="relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 sm:p-10 md:col-span-2 flex flex-col justify-between group transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05] min-h-[420px]"
                >
                    {/* Animated Glowing Orb / Gradient Blob (Top-Right) */}
                    <motion.div
                        animate={{
                            scale: [1, 1.25, 1],
                            opacity: [0.45, 0.75, 0.45],
                            x: [0, 15, -10, 0],
                            y: [0, -15, 10, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 8,
                            ease: "easeInOut",
                        }}
                        className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(99,102,241,0.4)_0%,_rgba(168,85,247,0.35)_40%,_rgba(59,130,246,0.15)_70%,_transparent_100%)] blur-3xl"
                    />
                    {/* Inner core shimmer for extra depth */}
                    <motion.div
                        animate={{
                            scale: [0.9, 1.15, 0.9],
                            opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 5,
                            ease: "easeInOut",
                        }}
                        className="pointer-events-none absolute right-2 top-2 h-44 w-44 rounded-full bg-gradient-to-br from-blue-500/30 via-indigo-500/35 to-purple-600/40 blur-2xl"
                    />
                    <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

                    <div className="relative z-10">
                        {/* Status Badge with Pulsing Green Status Dot */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium backdrop-blur-md">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
                                </span>
                                Available for opportunities
                            </span>
                            <span className="text-xs text-white/40 font-mono hidden sm:inline-block">
                                Software Engineer &amp; AI Developer
                            </span>
                        </div>

                        {/* Confident Headline with Blue-to-Purple Gradient Accent */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white/95 leading-[1.15]">
                            I build{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 font-extrabold drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                                AI-powered applications
                            </span>{" "}
                            that solve real-world problems.
                        </h1>

                        {/* First-person Bio */}
                        <p className="mt-5 text-white/65 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
                            I&apos;m <strong className="text-white font-medium">Zamin Askari Rizvi</strong>. I specialize
                            in integrating modern machine learning models into full-stack applications, connecting
                            efficient inference pipelines with clean, intuitive user experiences.
                        </p>
                    </div>

                    {/* CTAs and Social Links */}
                    <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <a
                                href="#projects"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-medium text-sm transition-all duration-300 shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(147,51,234,0.5)] active:scale-95"
                            >
                                View Projects
                                <FaArrowRight className="w-3 h-3" />
                            </a>
                            <a
                                href="#contact"
                                className="px-5 py-2.5 rounded-full border border-white/10 text-white/70 font-medium text-sm hover:bg-white/5 hover:text-white hover:border-white/20 transition-all backdrop-blur-sm"
                            >
                                Contact Me
                            </a>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-2">
                            {socials.map(({ href, Icon, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith("mailto") ? undefined : "_blank"}
                                    rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                                    className="p-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/40 hover:text-purple-400 hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-300"
                                    aria-label={label}
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* 2. CURRENT FOCUS (Smaller cell, 1 column on desktop) */}
                <motion.div
                    variants={cardVariants}
                    whileHover={cardHoverAnimation}
                    className="relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:col-span-1 flex flex-col justify-between group transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05] min-h-[420px]"
                >
                    {/* Ambient Glow */}
                    <div className="pointer-events-none absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-gradient-to-tr from-purple-600/15 to-indigo-600/10 blur-3xl group-hover:scale-110 transition-transform duration-700" />

                    <div>
                        {/* Header Badge */}
                        <div className="flex items-center justify-between mb-5">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-purple-400/90">
                                <FaBolt className="w-3 h-3 text-purple-400" />
                                Current Focus
                            </span>
                            <span className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] text-white/50 font-mono">
                                Active R&amp;D
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl sm:text-2xl font-bold text-white/95 tracking-tight">
                            Full-Stack AI &amp; Modern Web
                        </h2>

                        {/* Description */}
                        <p className="mt-3 text-white/55 text-xs sm:text-sm leading-relaxed font-light">
                            Building scalable web applications and integrating machine learning models into production environments.
                        </p>

                        {/* Highlights List */}
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                                <SiPytorch className="w-4 h-4 text-[#EE4C2C] shrink-0" />
                                <span className="text-xs text-white/75 font-medium">
                                    Machine Learning Pipelines
                                </span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                                <FaBolt className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                                <span className="text-xs text-white/75 font-medium">
                                    Agentic Workflow Automation
                                </span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                                <SiNextdotjs className="w-3.5 h-3.5 text-white/80 shrink-0" />
                                <span className="text-xs text-white/75 font-medium">
                                    Next.js &amp; Python Microservices
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-white/40 font-mono">
                        <span>Architecture</span>
                        <span className="text-purple-400/90">API &amp; Inference</span>
                    </div>
                </motion.div>

                {/* 3. TECH STACK (Smaller cell, 1 column on desktop) */}
                <motion.div
                    variants={cardVariants}
                    whileHover={cardHoverAnimation}
                    className="relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:col-span-1 flex flex-col justify-between group transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05] min-h-[340px]"
                >
                    {/* Ambient Glow */}
                    <div className="pointer-events-none absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-gradient-to-tl from-indigo-600/15 to-blue-600/10 blur-3xl group-hover:scale-110 transition-transform duration-700" />

                    <div>
                        {/* Header Badge */}
                        <div className="flex items-center justify-between mb-5">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-indigo-400/90">
                                <FaLayerGroup className="w-3 h-3 text-indigo-400" />
                                Tech Stack
                            </span>
                            <a
                                href="#about"
                                className="text-[11px] text-white/40 hover:text-indigo-400 transition-colors"
                            >
                                View all →
                            </a>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl sm:text-2xl font-bold text-white/95 tracking-tight mb-2">
                            Core Technologies
                        </h2>
                        <p className="text-white/50 text-xs sm:text-sm font-light mb-5">
                            Tools and frameworks used across production codebases.
                        </p>

                        {/* Tech Pills Grid */}
                        <div className="grid grid-cols-3 gap-2.5">
                            {techPills.map(({ name, Icon, color }) => (
                                <div
                                    key={name}
                                    className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-200"
                                >
                                    <Icon className={`w-4 h-4 ${color}`} />
                                    <span className="text-[10px] text-white/60 font-medium tracking-tight truncate max-w-full">
                                        {name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-white/40">
                        <span>Frontend, Backend &amp; AI</span>
                        <span className="text-indigo-400 font-mono text-[11px]">Modern Stack</span>
                    </div>
                </motion.div>

                {/* 4. FEATURED PROJECT (Spanning 2 columns on desktop) */}
                <motion.div
                    variants={cardVariants}
                    whileHover={cardHoverAnimation}
                    className="relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 sm:p-9 md:col-span-2 flex flex-col justify-between group transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05] min-h-[340px]"
                >
                    {/* Ambient Glow */}
                    <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-purple-600/15 via-blue-600/10 to-teal-500/10 blur-3xl group-hover:scale-110 transition-transform duration-700" />

                    <div>
                        {/* Header Badge */}
                        <div className="flex items-center justify-between mb-5">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-purple-400/90">
                                <FaRocket className="w-3 h-3 text-purple-400" />
                                Featured Project
                            </span>
                            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-[11px] font-mono">
                                AI / NLP
                            </span>
                        </div>

                        {/* Title & Description */}
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white/95 tracking-tight">
                                AI Resume Analyzer
                            </h2>
                            <span className="text-xs text-white/40 font-mono">Python • NLP • Evaluation Engine</span>
                        </div>

                        <p className="mt-3 text-white/60 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
                            An intelligent system that analyzes and evaluates resumes against job descriptions, extracting
                            candidate competencies, evaluating semantic match quality, and pinpointing skill gaps using automated NLP pipelines.
                        </p>

                        {/* Tag Pills */}
                        <div className="mt-5 flex flex-wrap gap-2">
                            {["Python", "NLP", "Machine Learning", "Embeddings", "FastAPI", "Semantic Match"].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.07] text-white/65 text-xs font-mono"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-8 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <a
                                href="https://github.com/zaaammmiiinnn/AI-resume-analyzer"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-white text-xs font-medium hover:bg-white/10 hover:border-white/20 transition-all"
                            >
                                <FaGithub className="w-3.5 h-3.5" />
                                View Repository
                                <FaExternalLinkAlt className="w-2.5 h-2.5 text-white/40" />
                            </a>
                        </div>
                        <a
                            href="#projects"
                            className="inline-flex items-center gap-1.5 text-xs text-purple-400/90 hover:text-purple-300 transition-colors font-medium"
                        >
                            Explore all projects
                            <FaArrowRight className="w-3 h-3" />
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
