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
            transition: {
                staggerChildren: 0.1,
            },
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
        <section id="projects" className="py-24 bg-background relative">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="space-y-16"
                >
                    <div className="text-center space-y-4">
                        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold tracking-tight">
                            Featured Projects
                        </motion.h2>
                        <motion.div variants={itemVariants} className="w-20 h-1 bg-primary mx-auto rounded-full" />
                        <motion.p variants={itemVariants} className="text-muted-foreground text-lg max-w-2xl mx-auto pt-4">
                            Here are some of the cutting-edge applications and intelligent systems I've built to solve complex problems.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                className="group relative flex flex-col justify-between bg-card text-card-foreground rounded-2xl border border-border overflow-hidden isolate"
                            >
                                {/* Spotlight hover effect background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                                <div className="p-8 space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2">
                                            {project.featured && (
                                                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                                                    Featured Project
                                                </span>
                                            )}
                                            <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <div className="flex gap-4">
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-foreground transition-colors"
                                                aria-label={`View ${project.title} on GitHub`}
                                            >
                                                <FaGithub className="w-6 h-6" />
                                            </a>
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-foreground transition-colors"
                                                aria-label={`View live demo of ${project.title}`}
                                            >
                                                <FaExternalLinkAlt className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                            </a>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="p-8 pt-0 mt-auto">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div variants={itemVariants} className="flex justify-center pt-8">
                        <a
                            href="https://github.com/ZaminAskari"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                            View More on GitHub <FaGithub />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
