"use client";

import { motion } from "framer-motion";
import {
    FaReact,
    FaNodeJs,
    FaPython,
    FaDocker,
    FaGithub,
    FaLinkedin,
    FaEnvelope,
    FaArrowRight,
    FaBrain,
    FaDatabase,
    FaServer,
    FaCode,
} from "react-icons/fa";
import {
    SiTypescript,
    SiNextdotjs,
    SiTailwindcss,
    SiMongodb,
    SiPostgresql,
    SiPytorch,
    SiFastapi,
} from "react-icons/si";

export default function AboutSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 25, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 90,
                damping: 16,
            },
        },
    };

    const techIcons = [
        { Icon: FaPython, color: "text-[#3776AB]", name: "Python" },
        { Icon: SiPytorch, color: "text-[#EE4C2C]", name: "PyTorch" },
        { Icon: SiFastapi, color: "text-[#05998B]", name: "FastAPI" },
        { Icon: SiNextdotjs, color: "text-white", name: "Next.js" },
        { Icon: SiTypescript, color: "text-[#3178C6]", name: "TypeScript" },
        { Icon: FaReact, color: "text-[#61DAFB]", name: "React" },
        { Icon: FaNodeJs, color: "text-[#339933]", name: "Node.js" },
        { Icon: SiPostgresql, color: "text-[#4169E1]", name: "PostgreSQL" },
        { Icon: SiMongodb, color: "text-[#47A248]", name: "MongoDB" },
        { Icon: FaDocker, color: "text-[#2496ED]", name: "Docker" },
        { Icon: SiTailwindcss, color: "text-[#06B6D4]", name: "Tailwind" },
    ];

    const skillCategories = [
        {
            icon: FaBrain,
            name: "AI & Machine Learning",
            accent: "from-purple-500/20 to-indigo-500/10",
            iconColor: "text-purple-400",
            skills: ["PyTorch", "Transformers", "NLP", "LLM Pipelines", "Scikit-Learn", "Embeddings"],
        },
        {
            icon: FaServer,
            name: "Backend & Systems",
            accent: "from-blue-500/20 to-cyan-500/10",
            iconColor: "text-blue-400",
            skills: ["Python", "FastAPI", "Node.js", "REST APIs", "Microservices", "C++"],
        },
        {
            icon: FaCode,
            name: "Frontend & Full-Stack",
            accent: "from-cyan-500/20 to-blue-500/10",
            iconColor: "text-cyan-400",
            skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "UI/UX"],
        },
        {
            icon: FaDatabase,
            name: "Data & DevOps",
            accent: "from-emerald-500/20 to-teal-500/10",
            iconColor: "text-emerald-400",
            skills: ["PostgreSQL", "MongoDB", "MySQL", "Docker", "Git / GitHub", "Data Pipelines"],
        },
    ];

    return (
        <section id="about" className="pt-32 pb-24 px-4 md:px-6 mx-auto max-w-6xl w-full relative overflow-hidden">
            {/* Ambient Floating Orbs for extra dynamic motion */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 20, 0],
                    y: [0, -20, 0],
                    opacity: [0.35, 0.6, 0.35],
                }}
                transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
                className="pointer-events-none absolute -right-24 top-12 h-96 w-96 rounded-full bg-gradient-to-br from-purple-600/20 via-blue-600/15 to-transparent blur-3xl -z-10"
            />
            <motion.div
                animate={{
                    scale: [1, 1.25, 1],
                    x: [0, -15, 0],
                    y: [0, 15, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
                className="pointer-events-none absolute -left-24 top-48 h-80 w-80 rounded-full bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-transparent blur-3xl -z-10"
            />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-16"
            >
                {/* 1. Hero Intro Card: "Starting with About Me" */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -4, boxShadow: "0px 10px 30px rgba(0,0,0,0.5)" }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 sm:p-12 hover:border-white/20 transition-all duration-300"
                >
                    {/* Top Status & Role */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
                                </span>
                                Available for opportunities
                            </span>
                            <span className="text-xs text-white/40 font-mono hidden sm:inline-block">
                                Software Engineer &amp; AI Developer
                            </span>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-2">
                            {[
                                { href: "https://github.com/zaaammmiiinnn", Icon: FaGithub, label: "GitHub" },
                                { href: "https://www.linkedin.com/in/zamin-askari-rizvi/", Icon: FaLinkedin, label: "LinkedIn" },
                                { href: "mailto:zaminaskari.work@gmail.com", Icon: FaEnvelope, label: "Email" },
                            ].map(({ href, Icon, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith("mailto") ? undefined : "_blank"}
                                    rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                                    className="p-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/40 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all"
                                    aria-label={label}
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white/95 leading-[1.12]">
                        I build{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 font-extrabold drop-shadow-[0_0_25px_rgba(99,102,241,0.35)]">
                            AI-powered applications
                        </span>{" "}
                        that solve real-world problems.
                    </h1>

                    {/* First-person Bio */}
                    <div className="mt-6 space-y-4 max-w-3xl text-white/65 text-base sm:text-lg leading-relaxed font-light">
                        <p>
                            I&apos;m <strong className="text-white font-semibold">Zamin Askari Rizvi</strong>, a software
                            engineer and AI developer dedicated to architecting reliable, high-performance web systems and
                            deploying intelligent algorithms for real-world impact.
                        </p>
                        <p className="text-sm sm:text-base text-white/55">
                            I specialize in integrating modern machine learning models and data pipelines into scalable full-stack
                            applications, connecting efficient inference with clean, intuitive user experiences. From distributed
                            backends to interactive frontends, I focus on clean code, system stability, and pragmatic problem-solving.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-4">
                        <a
                            href="#projects"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-medium text-sm transition-all duration-300 shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(147,51,234,0.5)] active:scale-95"
                        >
                            View Projects
                            <FaArrowRight className="w-3.5 h-3.5" />
                        </a>
                        <a
                            href="#github"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] border border-white/10 text-white/80 hover:text-white hover:bg-white/[0.08] hover:border-white/20 font-medium text-sm transition-all"
                        >
                            <FaGithub className="w-4 h-4 text-emerald-400" />
                            GitHub Activity
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/20 font-medium text-sm transition-all"
                        >
                            Contact Me
                        </a>
                    </div>
                </motion.div>

                {/* 2. Interactive Tech Stack Grid */}
                <motion.div variants={itemVariants} className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-indigo-400/90 font-mono">
                                Core Technologies
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white/90 mt-1">
                                Languages, Frameworks &amp; Tools
                            </h2>
                        </div>
                        <span className="text-xs text-white/40 font-mono hidden sm:inline-block">
                            11+ Production Technologies
                        </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {techIcons.map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05, y: -4 }}
                                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                                className="flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300 group cursor-default"
                            >
                                <item.Icon className={`w-6 h-6 ${item.color} group-hover:scale-110 transition-transform`} />
                                <span className="text-xs text-white/60 group-hover:text-white font-medium transition-colors">
                                    {item.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* 3. Categorized Technical Arsenal */}
                <motion.div variants={itemVariants} className="space-y-6">
                    <div className="text-center space-y-2">
                        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-purple-400/90 font-mono">
                            Capabilities
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white/90">
                            Technical Arsenal &amp; Domains
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {skillCategories.map((category, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                whileHover={{ y: -4, scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                                className="group relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-7 hover:border-white/20 transition-all duration-300"
                            >
                                <div className="flex items-center gap-3.5 mb-5">
                                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] group-hover:border-purple-500/30 group-hover:bg-purple-500/10 transition-colors">
                                        <category.icon className={`w-5 h-5 ${category.iconColor}`} />
                                    </div>
                                    <h3 className="text-lg font-bold text-white/90 group-hover:text-white transition-colors">
                                        {category.name}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, sIdx) => (
                                        <span
                                            key={sIdx}
                                            className="px-3 py-1 bg-white/[0.03] text-white/60 rounded-full text-xs font-mono border border-white/[0.06] hover:border-white/20 hover:text-white transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
