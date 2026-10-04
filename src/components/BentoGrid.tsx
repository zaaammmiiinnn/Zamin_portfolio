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
    SiNvidia,
    SiPython,
    SiNextdotjs,
    SiTypescript,
    SiReact,
    SiPostgresql,
    SiDocker,
    SiTailwindcss,
} from "react-icons/si";

export default function BentoGrid() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.15,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 35 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 90,
                damping: 18,
                mass: 0.9,
            },
        },
    };

    const techPills = [
        { name: "Python", Icon: SiPython, color: "text-[#3776AB]" },
        { name: "Nemotron", Icon: SiNvidia, color: "text-[#76B900]" },
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
                className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6"
            >
                {/* 1. HERO CARD (Spans 2 columns on desktop) */}
                <motion.div
                    variants={cardVariants}
                    className="relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 sm:p-8 md:p-10 md:col-span-2 flex flex-col justify-between group transition-all duration-300 ease-out hover:scale-[1.01] hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_12px_40px_rgba(59,130,246,0.12)] min-h-[380px]"
                >
                    {/* Ambient Glow */}
                    <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/15 transition-all duration-500" />

                    <div>
                        {/* Status Badge */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                Available for opportunities
                            </span>
                            <span className="text-xs text-white/40 font-mono hidden sm:inline-block">
                                Software Engineer & AI Developer
                            </span>
                        </div>

                        {/* Confident Headline */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white/95 leading-[1.15]">
                            I build{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300">
                                AI-powered applications
                            </span>{" "}
                            that solve real-world problems.
                        </h1>

                        {/* First-person Bio */}
                        <p className="mt-5 text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
                            I&apos;m <strong className="text-white font-medium">Zamin Askari Rizvi</strong>. I specialize
                            in integrating modern AI models (like NVIDIA Nemotron) into full-stack applications, connecting
                            efficient inference pipelines with clean, intuitive user experiences.
                        </p>
                    </div>

                    {/* CTAs and Social Links */}
                    <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <a
                                href="#projects"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500 text-white font-medium text-sm hover:bg-blue-400 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
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
                                    className="p-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/40 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/10 transition-all duration-300"
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
                    className="relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 sm:p-7 md:col-span-1 flex flex-col justify-between group transition-all duration-300 ease-out hover:scale-[1.01] hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_12px_40px_rgba(59,130,246,0.12)] min-h-[380px]"
                >
                    {/* Ambient Glow */}
                    <div className="pointer-events-none absolute -left-20 -bottom-20 h-52 w-52 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/15 transition-all duration-500" />

                    <div>
                        {/* Header Badge */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-cyan-400/80">
                                <FaBolt className="w-3 h-3 text-cyan-400" />
                                Current Focus
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] text-white/50 font-mono">
                                Active R&D
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl sm:text-2xl font-bold text-white/90 tracking-tight">
                            Full-Stack AI & NVIDIA Nemotron
                        </h2>

                        {/* Description */}
                        <p className="mt-3 text-white/50 text-xs sm:text-sm leading-relaxed font-light">
                            Integrating advanced reasoning models and local inference architectures into responsive full-stack applications.
                        </p>

                        {/* Highlights List */}
                        <div className="mt-6 space-y-2.5">
                            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                <SiNvidia className="w-4 h-4 text-[#76B900] shrink-0" />
                                <span className="text-xs text-white/70 font-medium">
                                    NVIDIA Nemotron Integration
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                <FaBolt className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                <span className="text-xs text-white/70 font-medium">
                                    Agentic Workflow Automation
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                <SiNextdotjs className="w-3.5 h-3.5 text-white/80 shrink-0" />
                                <span className="text-xs text-white/70 font-medium">
                                    Next.js & Python Microservices
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-white/40 font-mono">
                        <span>Architecture</span>
                        <span className="text-cyan-400/80">API & Inference</span>
                    </div>
                </motion.div>

                {/* 3. TECH STACK (Smaller cell, 1 column on desktop) */}
                <motion.div
                    variants={cardVariants}
                    className="relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 sm:p-7 md:col-span-1 flex flex-col justify-between group transition-all duration-300 ease-out hover:scale-[1.01] hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_12px_40px_rgba(59,130,246,0.12)] min-h-[300px]"
                >
                    {/* Ambient Glow */}
                    <div className="pointer-events-none absolute -right-20 -bottom-20 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/15 transition-all duration-500" />

                    <div>
                        {/* Header Badge */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-400/80">
                                <FaLayerGroup className="w-3 h-3 text-blue-400" />
                                Tech Stack
                            </span>
                            <a
                                href="#about"
                                className="text-[11px] text-white/40 hover:text-blue-400 transition-colors"
                            >
                                View all →
                            </a>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl sm:text-2xl font-bold text-white/90 tracking-tight mb-2">
                            Core Technologies
                        </h2>
                        <p className="text-white/50 text-xs sm:text-sm font-light mb-5">
                            Tools and frameworks used across production codebases.
                        </p>

                        {/* Tech Pills Grid */}
                        <div className="grid grid-cols-3 gap-2">
                            {techPills.map(({ name, Icon, color }) => (
                                <div
                                    key={name}
                                    className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-200"
                                >
                                    <Icon className={`w-4 h-4 ${color}`} />
                                    <span className="text-[10px] text-white/60 font-medium tracking-tight truncate max-w-full">
                                        {name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-white/40">
                        <span>Frontend, Backend & AI</span>
                        <span className="text-blue-400 font-mono text-[11px]">Modern Stack</span>
                    </div>
                </motion.div>

                {/* 4. FEATURED PROJECT (Spanning 2 columns on desktop) */}
                <motion.div
                    variants={cardVariants}
                    className="relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 sm:p-8 md:col-span-2 flex flex-col justify-between group transition-all duration-300 ease-out hover:scale-[1.01] hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_12px_40px_rgba(59,130,246,0.12)] min-h-[300px]"
                >
                    {/* Ambient Glow */}
                    <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl group-hover:bg-teal-500/15 transition-all duration-500" />

                    <div>
                        {/* Header Badge */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-teal-400/80">
                                <FaRocket className="w-3 h-3 text-teal-400" />
                                Featured Project
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[11px] font-mono">
                                AI / NLP
                            </span>
                        </div>

                        {/* Title & Description */}
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white/90 tracking-tight">
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
                                    className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-white/60 text-xs font-mono"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
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
                            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-blue-400 transition-colors font-medium"
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
