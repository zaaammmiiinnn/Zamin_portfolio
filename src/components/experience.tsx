"use client";

import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";

const experiences = [
    {
        type: "education",
        title: "Computer Science - AI & Data Science",
        organization: "Nxtwave Institute of Advanced Technologies, Noida",
        date: "2025 - 2029",
        description: [
            "Currently enrolled in computer science degree with specialization in Artificial intelligence and data science.",
            "Focus on software engineering.",
        ],
        icon: FaGraduationCap,
    },
    {
        type: "education",
        title: "Minor in CS - AI & Drone Specialization",
        organization: "Tihan IIT Hyderabad",
        date: "2025 - 2026",
        description: [
            "Currently enrolled in minor degree of computer science with specialization in Artificial intelligence and Drone Specialization.",
            "Focus on software engineering.",
        ],
        icon: FaGraduationCap,
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
        <section id="experience" className="py-24 bg-[#050505] relative overflow-hidden">
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
                        <motion.span
                            variants={itemVariants}
                            className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-blue-400/70"
                        >
                            Journey
                        </motion.span>
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl md:text-5xl font-bold tracking-tight text-white/90"
                        >
                            Experience
                        </motion.h2>
                        <motion.div variants={itemVariants} className="w-16 h-0.5 bg-blue-500/40 mx-auto rounded-full" />
                        <motion.p variants={itemVariants} className="text-white/40 text-base max-w-2xl mx-auto pt-2">
                            My academic and professional journey.
                        </motion.p>
                    </div>

                    {/* Timeline */}
                    <div className="relative border-l border-blue-500/20 pl-8 ml-4 md:ml-0 space-y-8">
                        {experiences.map((exp, index) => (
                            <motion.div key={index} variants={itemVariants} className="relative">
                                {/* Timeline dot/icon */}
                                <div className="absolute -left-[41px] top-2 h-8 w-8 flex items-center justify-center rounded-full border border-blue-500/30 bg-[#0a0a0a] shadow-[0_0_12px_rgba(59,130,246,0.15)]">
                                    <exp.icon className="w-3.5 h-3.5 text-blue-400" />
                                </div>

                                <div className="glass-card rounded-xl p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
                                        <div>
                                            <h3 className="text-base font-semibold text-white/90">
                                                {exp.title}
                                            </h3>
                                            <p className="text-sm font-medium text-blue-400/80 mt-0.5">
                                                {exp.organization}
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center px-3 py-1 bg-blue-500/10 text-blue-400/70 text-xs font-medium rounded-full border border-blue-500/15 max-w-fit">
                                            {exp.date}
                                        </span>
                                    </div>

                                    <ul className="space-y-1.5 mt-3 text-white/40 text-sm leading-relaxed">
                                        {exp.description.map((item, i) => (
                                            <li key={i} className="flex gap-2">
                                                <span className="text-blue-500/40 mt-1.5 shrink-0">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
