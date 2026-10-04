"use client";

import { motion } from "framer-motion";
import { FaArrowRight, FaGithub, FaExternalLinkAlt, FaFolder } from "react-icons/fa";

// ============================================================================
// EDIT YOUR PROJECTS HERE
// Each project requires:
// - title: string
// - description: exactly 2 sentences describing the system & impact
// - technologies: array of strings rendered as small pill badges
// - link: URL for the "View Project" link (or GitHub/live demo)
// ============================================================================
export interface ProjectItem {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    link: string;
    github?: string;
    featuredTag?: string;
}

export const projectsData: ProjectItem[] = [
    {
        id: "ai-resume-analyzer",
        title: "AI Resume Analyzer",
        description:
            "An intelligent evaluation engine that parses candidate resumes and scores competencies against job requisitions. Utilizes semantic embeddings and automated NLP pipelines to pinpoint skill gaps with high precision.",
        technologies: ["Python", "NLP", "FastAPI", "LLMs & Embeddings", "Streamlit"],
        link: "https://github.com/zaaammmiiinnn/AI-resume-analyzer",
        github: "https://github.com/zaaammmiiinnn/AI-resume-analyzer",
        featuredTag: "AI / NLP",
    },
    {
        id: "sentiment-classification",
        title: "Sentiment Neural Embeddings",
        description:
            "A deep learning sentiment classifier engineered to process and categorize textual datasets at scale. Employs modern word vector architectures to deliver contextual predictions across complex reviews.",
        technologies: ["Python", "PyTorch", "NLP", "Word2Vec", "Scikit-Learn"],
        link: "https://github.com/zaaammmiiinnn/Sentiment_Classification_Embeddings",
        github: "https://github.com/zaaammmiiinnn/Sentiment_Classification_Embeddings",
        featuredTag: "Machine Learning",
    },
    {
        id: "ardupilot-vision",
        title: "GSOC ArduPilot Autonomous Vision",
        description:
            "A real-time optical tracking and telemetry processing pipeline developed for ArduPilot autonomous drone navigation. Integrates computer vision with sensor telemetry to maintain flight stability and obstacle awareness.",
        technologies: ["Python", "OpenCV", "ArduPilot", "Robotics", "Telemetry"],
        link: "https://github.com/zaaammmiiinnn/gsoc-ardupilot-vision",
        github: "https://github.com/zaaammmiiinnn/gsoc-ardupilot-vision",
        featuredTag: "Computer Vision",
    },
];

export default function ProjectsSection() {
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

    const cardVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 90,
                damping: 18,
            },
        },
    };

    return (
        <section id="projects" className="py-20 px-4 md:px-6 mx-auto max-w-6xl w-full">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={containerVariants}
                className="space-y-12"
            >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <motion.span
                            variants={cardVariants}
                            className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-blue-400/80 mb-2"
                        >
                            Selected Work
                        </motion.span>
                        <motion.h2
                            variants={cardVariants}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white/95"
                        >
                            Featured Projects
                        </motion.h2>
                        <motion.p
                            variants={cardVariants}
                            className="mt-2 text-white/50 text-xs sm:text-sm font-light max-w-lg"
                        >
                            Production-focused applications, machine learning architectures, and full-stack software systems.
                        </motion.p>
                    </div>

                    <motion.div variants={cardVariants}>
                        <a
                            href="https://github.com/zaaammmiiinnn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-mono text-white/60 hover:text-blue-400 transition-colors"
                        >
                            <FaGithub className="w-3.5 h-3.5" />
                            <span>github.com/zaaammmiiinnn →</span>
                        </a>
                    </motion.div>
                </div>

                {/* 3 Project Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectsData.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={cardVariants}
                            whileHover={{ y: -4, scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 250, damping: 20 }}
                            className="group relative flex flex-col justify-between rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-7 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_12px_40px_rgba(59,130,246,0.12)] transition-all duration-300"
                        >
                            {/* Ambient card top glow */}
                            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/10 blur-2xl group-hover:bg-blue-500/15 transition-all duration-500" />

                            <div>
                                {/* Top metadata */}
                                <div className="flex items-center justify-between gap-2 mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-blue-400 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-colors">
                                        <FaFolder className="w-4 h-4" />
                                    </div>

                                    {project.featuredTag && (
                                        <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono font-medium">
                                            {project.featuredTag}
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-white/90 group-hover:text-blue-400 transition-colors duration-200">
                                    {project.title}
                                </h3>

                                {/* 2-sentence description */}
                                <p className="mt-3 text-white/55 text-xs sm:text-sm leading-relaxed font-light">
                                    {project.description}
                                </p>

                                {/* Technologies as small pill badges */}
                                <div className="mt-5 flex flex-wrap gap-1.5">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.07] text-white/60 text-[11px] font-mono hover:border-white/20 hover:text-white transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* "View Project" Link */}
                            <div className="mt-7 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 group-hover:text-cyan-300 transition-colors"
                                >
                                    <span>View Project</span>
                                    <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                                </a>

                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/40 hover:text-white transition-colors p-1"
                                        aria-label={`View ${project.title} source code`}
                                    >
                                        <FaExternalLinkAlt className="w-3 h-3" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
