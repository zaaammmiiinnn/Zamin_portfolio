"use client";

import { motion } from "framer-motion";
import {
    FaReact, FaNodeJs, FaPython, FaDocker, FaAws
} from "react-icons/fa";
import {
    SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql
} from "react-icons/si";

export default function AboutSection() {
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

    const skills = [
        { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
        { name: "Backend", items: ["Node.js", "Express", "Python", "FastAPI", "GraphQL"] },
        { name: "Database", items: ["MongoDB", "PostgreSQL", "Redis", "Prisma"] },
        { name: "DevOps & Tools", items: ["Docker", "AWS", "Git", "Linux", "CI/CD"] },
        { name: "AI & ML", items: ["PyTorch", "TensorFlow", "Pandas", "LangChain", "OpenAI API"] },
    ];

    const floatingIcons = [
        { Icon: FaReact, color: "text-[#61DAFB]" },
        { Icon: SiNextdotjs, color: "text-foreground" },
        { Icon: SiTypescript, color: "text-[#3178C6]" },
        { Icon: FaNodeJs, color: "text-[#339933]" },
        { Icon: FaPython, color: "text-[#3776AB]" },
        { Icon: SiMongodb, color: "text-[#47A248]" },
        { Icon: SiTailwindcss, color: "text-[#06B6D4]" },
        { Icon: FaDocker, color: "text-[#2496ED]" },
    ];

    return (
        <section id="about" className="py-24 bg-secondary/50 relative overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="space-y-16"
                >
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold tracking-tight">
                            About Me
                        </motion.h2>
                        <motion.div variants={itemVariants} className="w-20 h-1 bg-primary mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Bio Text */}
                        <motion.div variants={itemVariants} className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                Hello! I'm <strong className="text-foreground">Zamin Askari Rizvi</strong>, a passionate Software Engineer and AI enthusiast dedicated to building remarkable digital experiences.
                            </p>
                            <p>
                                My journey began with a deep curiosity for how things work under the hood, leading me to explore full-stack development. Today, I specialize in architecting scalable backend systems, designing intuitive frontends, and integrating machine learning models into robust web applications.
                            </p>
                            <p>
                                When I'm not coding, you'll find me exploring the latest advancements in artificial intelligence, contributing to open-source projects, or optimizing my personal productivity workflows.
                            </p>
                        </motion.div>

                        {/* Floating Tech Stack Icons (Visual flair) */}
                        <motion.div
                            variants={itemVariants}
                            className="relative h-[300px] lg:h-[400px] w-full bg-background rounded-2xl shadow-xl border border-border flex items-center justify-center overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

                            <div className="relative w-full h-full">
                                {floatingIcons.map((item, index) => {
                                    // Distribute icons in a circle
                                    const angle = (index / floatingIcons.length) * Math.PI * 2;
                                    const radius = 100;
                                    const x = Math.cos(angle) * radius;
                                    const y = Math.sin(angle) * radius;

                                    return (
                                        <motion.div
                                            key={index}
                                            className="absolute left-1/2 top-1/2 -ml-6 -mt-6 p-3 bg-secondary rounded-xl shadow-md border border-border/50"
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1, x, y }}
                                            viewport={{ once: true }}
                                            transition={{
                                                type: "spring" as const,
                                                delay: 0.1 * index,
                                                duration: 1.5,
                                                bounce: 0.4
                                            }}
                                            whileHover={{ scale: 1.2, zIndex: 10 }}
                                        >
                                            <item.Icon className={`w-6 h-6 ${item.color}`} />
                                        </motion.div>
                                    )
                                })}

                                {/* Center logo */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20 z-10"
                                >
                                    ZAR
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Skills Grid */}
                    <motion.div variants={itemVariants} className="pt-8">
                        <h3 className="text-2xl font-semibold mb-8 text-center text-foreground">Technical Arsenal</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {skills.map((category, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    whileHover={{ y: -5 }}
                                    className="p-6 rounded-xl bg-background border border-border shadow-sm hover:shadow-md transition-all"
                                >
                                    <h4 className="text-lg font-medium mb-4 text-primary">{category.name}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {category.items.map((skill, sIdx) => (
                                            <span
                                                key={sIdx}
                                                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm font-medium"
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
