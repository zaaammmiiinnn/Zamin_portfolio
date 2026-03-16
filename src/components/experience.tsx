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
            transition: {
                staggerChildren: 0.15,
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
        <section id="experience" className="py-24 bg-secondary/30 relative overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="space-y-16"
                >
                    <div className="text-center space-y-4">
                        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold tracking-tight">
                            Experience & Education
                        </motion.h2>
                        <motion.div variants={itemVariants} className="w-20 h-1 bg-primary mx-auto rounded-full" />
                        <motion.p variants={itemVariants} className="text-muted-foreground text-lg max-w-2xl mx-auto pt-4">
                            My academic and professional journey.
                        </motion.p>
                    </div>

                    <div className="relative border-l-2 border-primary/30 pl-8 ml-4 md:ml-0 space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div key={index} variants={itemVariants} className="relative">
                                {/* Timeline dot/icon */}
                                <div
                                    className={`absolute -left-[49px] top-1 h-10 w-10 flex items-center justify-center rounded-full border-4 border-background ${exp.type === 'work' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                                        }`}
                                >
                                    <exp.icon className="w-4 h-4" />
                                </div>

                                <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                                {exp.title}
                                            </h3>
                                            <p className="text-lg font-medium text-primary mb-1">
                                                {exp.organization}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-full max-w-fit">
                                            {exp.date}
                                        </div>
                                    </div>

                                    <ul className="space-y-2 mt-4 text-muted-foreground list-disc list-inside marker:text-primary/50">
                                        {exp.description.map((item, i) => (
                                            <li key={i} className="leading-relaxed">
                                                <span className="text-muted-foreground">{item}</span>
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
