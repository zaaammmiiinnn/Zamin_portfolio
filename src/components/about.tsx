"use client";

import { motion } from "framer-motion";
import {
    FaReact, FaNodeJs, FaPython, FaDocker
} from "react-icons/fa";
import {
    SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql
} from "react-icons/si";

export default function AboutSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
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

    const skills = [
        { name: "Frontend", items: ["JavaScript", "HTML5", "CSS3", "TailwindCSS"] },
        { name: "Backend", items: ["Node.js", "Express.js", "Python", "C++", "REST APIs"] },
        { name: "Database", items: ["SQLite", "PostgreSQL", "MySQL"] },
        { name: "Tools & Others", items: ["Git", "GitHub"] },
    ];

    const techIcons = [
        { Icon: FaReact, color: "text-[#61DAFB]", name: "React" },
        { Icon: SiNextdotjs, color: "text-white/80", name: "Next.js" },
        { Icon: SiTypescript, color: "text-[#3178C6]", name: "TypeScript" },
        { Icon: FaNodeJs, color: "text-[#339933]", name: "Node.js" },
        { Icon: FaPython, color: "text-[#3776AB]", name: "Python" },
        { Icon: SiMongodb, color: "text-[#47A248]", name: "MongoDB" },
        { Icon: SiPostgresql, color: "text-[#4169E1]", name: "PostgreSQL" },
        { Icon: SiTailwindcss, color: "text-[#06B6D4]", name: "Tailwind" },
        { Icon: FaDocker, color: "text-[#2496ED]", name: "Docker" },
    ];

    return (
        <section id="about" className="py-24 bg-[#050505] relative">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={containerVariants}
                    className="space-y-14"
                >
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <motion.span
                            variants={itemVariants}
                            className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-blue-400/70"
                        >
                            Who I Am
                        </motion.span>
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl md:text-5xl font-bold tracking-tight text-white/90"
                        >
                            About Me
                        </motion.h2>
                        <motion.div variants={itemVariants} className="w-16 h-0.5 bg-blue-500/40 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                        {/* Bio */}
                        <motion.div variants={itemVariants} className="space-y-5">
                            <div className="glass-card rounded-2xl p-8 space-y-4">
                                <p className="text-white/60 leading-relaxed">
                                    Hello! I&apos;m <strong className="text-white/90">Zamin Askari Rizvi</strong>, a Data Science Engineer and tech enthusiast!
                                </p>
                                <p className="text-white/50 leading-relaxed text-sm">
                                    I&apos;ve been passionate about technology since childhood. What started as a hobby turned into a career that I absolutely love.
                                </p>
                                <p className="text-white/50 leading-relaxed text-sm">
                                    I believe in clean, efficient code and user-centered design. Every project is an opportunity to solve problems creatively. Honesty, quality, and continuous learning drive my work.
                                </p>
                            </div>
                        </motion.div>

                        {/* Tech Stack */}
                        <motion.div variants={itemVariants}>
                            <div className="glass-card rounded-2xl p-8">
                                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-6">Tech Stack</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {techIcons.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-blue-500/20 transition-all duration-300"
                                        >
                                            <item.Icon className={`w-5 h-5 ${item.color}`} />
                                            <span className="text-[10px] text-white/40 font-medium">{item.name}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Skills Grid */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-6 text-center">
                            Technical Arsenal
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {skills.map((category, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    whileHover={{ y: -3 }}
                                    className="glass-card rounded-xl p-5"
                                >
                                    <h4 className="text-sm font-medium mb-3 text-blue-400/80">{category.name}</h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {category.items.map((skill, sIdx) => (
                                            <span
                                                key={sIdx}
                                                className="px-2.5 py-1 bg-white/[0.04] text-white/50 rounded-md text-[11px] font-medium border border-white/[0.04]"
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
            </div>
        </section>
    );
}
