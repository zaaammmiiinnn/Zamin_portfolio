"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
    {
        title: "GSOC ArduPilot Vision",
        description: "A Python-based project focusing on ArduPilot vision systems.",
        tags: ["Python", "Computer Vision", "ArduPilot"],
        github: "https://github.com/zaaammmiiinnn/gsoc-ardupilot-vision",
        demo: "",
        featured: true,
    },
    {
        title: "Ghost Mentor",
        description: "A mentorship platform built using HTML.",
        tags: ["HTML", "Web Development"],
        github: "https://github.com/zaaammmiiinnn/Ghost-Mentor",
        demo: "",
        featured: false,
    },
    {
        title: "Sentiment Classification Embeddings",
        description: "Machine learning application for sentiment analysis utilizing word embeddings.",
        tags: ["Jupyter Notebook", "Machine Learning", "NLP"],
        github: "https://github.com/zaaammmiiinnn/Sentiment_Classification_Embeddings",
        demo: "",
        featured: true,
    },
    {
        title: "Internship Portal",
        description: "A portal system designed for managing and tracking internships.",
        tags: ["Python", "Backend"],
        github: "https://github.com/zaaammmiiinnn/INTERNSHIP-PORTAL",
        demo: "",
        featured: true,
    },
    {
        title: "AI Resume Analyzer",
        description: "An AI tool that analyzes resumes to extract and evaluate key information.",
        tags: ["Python", "AI", "NLP"],
        github: "https://github.com/zaaammmiiinnn/AI-resume-analyzer",
        demo: "",
        featured: true,
    },
    {
        title: "Student Management System",
        description: "A backend system for managing student records and operations.",
        tags: ["Python", "Backend"],
        github: "https://github.com/zaaammmiiinnn/Student-Management-System-",
        demo: "",
        featured: false,
    },
];

export default function ProjectsSection() {
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

    return (
        <section id="projects" className="py-24 bg-[#050505] relative">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
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
                            Portfolio
                        </motion.span>
                        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold tracking-tight text-white/90">
                            Featured Projects
                        </motion.h2>
                        <motion.div variants={itemVariants} className="w-16 h-0.5 bg-blue-500/40 mx-auto rounded-full" />
                        <motion.p variants={itemVariants} className="text-white/40 text-base max-w-2xl mx-auto pt-2">
                            Cutting-edge applications and intelligent systems I&apos;ve built to solve complex problems.
                        </motion.p>
                    </div>

                    {/* Project Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -4, scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="group relative flex flex-col justify-between glass-card rounded-2xl overflow-hidden"
                            >
                                {/* Hover glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.06] via-transparent to-cyan-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

                                <div className="p-7 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1.5">
                                            {project.featured && (
                                                <span className="text-[10px] font-semibold text-blue-400/80 uppercase tracking-wider">
                                                    Featured
                                                </span>
                                            )}
                                            <h3 className="text-lg font-semibold text-white/90 group-hover:text-blue-400 transition-colors duration-300">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <div className="flex gap-3">
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white/30 hover:text-blue-400 transition-colors"
                                                aria-label={`View ${project.title} on GitHub`}
                                            >
                                                <FaGithub className="w-5 h-5" />
                                            </a>
                                            {project.demo && (
                                                <a
                                                    href={project.demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white/30 hover:text-blue-400 transition-colors"
                                                    aria-label={`View live demo of ${project.title}`}
                                                >
                                                    <FaExternalLinkAlt className="w-4 h-4 mt-0.5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-white/40 text-sm leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="p-7 pt-0 mt-auto">
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-2.5 py-1 bg-white/[0.04] text-white/45 text-[11px] font-medium rounded-md border border-white/[0.05]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div variants={itemVariants} className="flex justify-center pt-4">
                        <a
                            href="https://github.com/zaaammmiiinnn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 text-white/60 font-medium text-sm hover:bg-white/[0.03] hover:text-blue-400 hover:border-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                        >
                            View More on GitHub <FaGithub />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
