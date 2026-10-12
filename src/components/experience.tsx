"use client";

import { motion } from "framer-motion";
import { FaBriefcase, FaRobot, FaShoppingBag, FaExternalLinkAlt, FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";

interface Experience {
    type: "startup" | "brand" | "work";
    title: string;
    organization: string;
    date: string;
    location: string;
    url?: string;
    badge?: string;
    description: string[];
    skills: string[];
    icon: typeof FaBriefcase;
}

const experiences: Experience[] = [
    {
        type: "startup",
        title: "Founder & AI Systems Architect",
        organization: "NeuralWaves",
        date: "2025 - Present",
        location: "India & UAE (Dubai)",
        url: "https://neuralwaves.in",
        badge: "Closed 2 Enterprise Clients in Dubai",
        description: [
            "Founded NeuralWaves, an AI engineering agency based in India delivering autonomous agent systems to high-growth businesses across India and UAE.",
            "Closed and successfully delivered production AI solutions for 2 enterprise clients in Dubai, architecting bespoke multi-agent business automation workflows.",
            "Designed and built multiple autonomous AI agents: including autonomous lead qualification, bilingual Arabic/English document parsing, automated CRM synchronization, and multi-tool orchestration.",
            "Engineered secure, low-latency RAG architectures with deterministic guardrails, sub-300ms vector retrieval, and zero-data-leakage compliance for international clients.",
        ],
        skills: ["Autonomous AI Agents", "Multi-Agent Systems", "LangChain", "FastAPI", "Next.js", "Enterprise RAG", "Client Acquisition"],
        icon: FaRobot,
    },
    {
        type: "brand",
        title: "Founder & Lead Full-Stack Architect",
        organization: "MENANCE Clothing",
        date: "2024 - Present",
        location: "India",
        url: "https://wearmenance.in",
        badge: "Live Brand & Custom CMS",
        description: [
            "Founded streetwear brand MENANCE, directing brand vision, aesthetic strategy, product manufacturing, and end-to-end technological execution.",
            "Engineered the full-stack production storefront (wearmenance.in) from scratch utilizing Next.js, TypeScript, and modern headless e-commerce architecture.",
            "Architected a comprehensive bespoke Admin Control Panel providing complete real-time governance over the live storefront: instant product catalog updates, inventory matrices, dynamic banner copy, promotional pricing tiers, and customer order fulfillment.",
            "Delivered sub-second database synchronization, optimized mobile checkout velocity (98/100 Lighthouse), and integrated secure payment pipelines.",
        ],
        skills: ["Next.js", "TypeScript", "Bespoke Admin Suite", "E-Commerce Architecture", "PostgreSQL", "Tailwind CSS", "Brand Building"],
        icon: FaShoppingBag,
    },
    {
        type: "work",
        title: "Data Analytics Intern",
        organization: "Auctech Marketing Communication Pvt. Ltd.",
        date: "Jan 2026 - Jun 2026",
        location: "India",
        description: [
            "Demonstrated dedication, analytical thinking, and professionalism while working on data analysis.",
            "Focused on data interpretation, reporting, and delivering insights for assigned analytical projects.",
        ],
        skills: ["Data Analytics", "Pandas", "SQL", "Reporting & Dashboards"],
        icon: FaBriefcase,
    },
];

export default function ExperienceSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring" as const, stiffness: 100 },
        },
    };

    return (
        <section id="experience" className="py-24 bg-[#05060A] relative overflow-hidden border-t border-white/[0.06]">
            {/* Ambient Background Aura */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/[0.03] blur-[140px] pointer-events-none -z-10" />

            <div className="container px-4 md:px-6 mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="space-y-14"
                >
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-cyan-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            <span>CAREER MILESTONES &amp; VENTURES</span>
                        </motion.div>
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl md:text-5xl font-bold tracking-tight text-white/95 font-mono"
                        >
                            FOUNDER &amp; ENGINEERING EXPERIENCE
                        </motion.h2>
                        <motion.div variants={itemVariants} className="w-16 h-0.5 bg-blue-500/40 mx-auto rounded-full" />
                        <motion.p variants={itemVariants} className="text-white/50 text-sm max-w-xl mx-auto pt-1 font-light">
                            Ventures founded, autonomous agent architectures shipped, and enterprise systems delivered across India &amp; UAE.
                        </motion.p>
                    </div>

                    {/* Timeline */}
                    <div className="relative border-l border-blue-500/20 pl-8 ml-4 md:ml-0 space-y-10">
                        {experiences.map((exp, index) => (
                            <motion.div key={index} variants={itemVariants} className="relative group">
                                {/* Timeline dot/icon */}
                                <div className="absolute -left-[45px] top-2 h-9 w-9 flex items-center justify-center rounded-full border border-blue-500/40 bg-[#0A0E1A] shadow-[0_0_15px_rgba(0,102,255,0.25)] group-hover:border-cyan-400 transition-colors">
                                    <exp.icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                                </div>

                                <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#0c1222] via-[#090d18] to-[#06080f] border border-white/10 hover:border-blue-500/40 shadow-[0_12px_35px_rgba(0,0,0,0.65)] transition-all duration-300">
                                    {/* Top Card Bar */}
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <h3 className="text-lg font-bold text-white tracking-tight">
                                                    {exp.title}
                                                </h3>
                                                {exp.badge && (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-semibold">
                                                        <FaCheckCircle className="w-2.5 h-2.5 text-emerald-400" />
                                                        {exp.badge}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                                                {exp.url ? (
                                                    <a
                                                        href={exp.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="font-semibold text-blue-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                                                    >
                                                        <span>{exp.organization}</span>
                                                        <FaExternalLinkAlt className="w-2.5 h-2.5" />
                                                    </a>
                                                ) : (
                                                    <span className="font-semibold text-blue-400">{exp.organization}</span>
                                                )}
                                                <span className="text-white/20">•</span>
                                                <span className="text-white/40 flex items-center gap-1">
                                                    <FaMapMarkerAlt className="w-2.5 h-2.5 text-white/30" />
                                                    {exp.location}
                                                </span>
                                            </div>
                                        </div>

                                        <span className="inline-flex items-center px-3 py-1 bg-white/[0.04] text-white/70 text-xs font-mono rounded-full border border-white/10 shrink-0 max-w-fit">
                                            {exp.date}
                                        </span>
                                    </div>

                                    {/* Bullet Descriptions */}
                                    <ul className="space-y-2 text-white/60 text-xs sm:text-sm font-light leading-relaxed">
                                        {exp.description.map((item, i) => (
                                            <li key={i} className="flex gap-2.5">
                                                <span className="text-cyan-400 mt-1 shrink-0">▹</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Technology / Skills Tags */}
                                    {exp.skills && exp.skills.length > 0 && (
                                        <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                                            {exp.skills.map((skill, sIdx) => (
                                                <span
                                                    key={sIdx}
                                                    className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-white/50"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
