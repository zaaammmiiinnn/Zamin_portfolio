"use client";

import { motion } from "framer-motion";
import { FaBrain, FaCode, FaLayerGroup, FaPaintBrush } from "react-icons/fa";

const expertiseItems = [
    {
        icon: FaBrain,
        title: "AI Engineering",
        description:
            "Building intelligent systems, GANs, and real-time AI integrations. Cutting-edge AI tools and automation.",
    },
    {
        icon: FaCode,
        title: "Full Stack Development",
        description:
            "Creating scalable, production-ready applications and end-to-end systems with modern frameworks.",
    },
    {
        icon: FaLayerGroup,
        title: "Frontend Architecture",
        description:
            "Crafting complex interfaces, modern React apps and micro-animations for state-of-the-art UIs.",
    },
    {
        icon: FaPaintBrush,
        title: "UI/UX Engineering",
        description:
            "Designing precise, pixel-perfect interfaces that bridge design and engineering seamlessly.",
    },
];

export default function ExpertiseGrid() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12 },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring" as const, stiffness: 80, damping: 15 },
        },
    };

    return (
        <section id="expertise" className="py-24 bg-[#050505] relative">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
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
                            What I Do
                        </motion.span>
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl md:text-5xl font-bold tracking-tight text-white/90"
                        >
                            Core Expertise
                        </motion.h2>
                        <motion.div variants={itemVariants} className="w-16 h-0.5 bg-blue-500/40 mx-auto rounded-full" />
                    </div>

                    {/* 2x2 Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {expertiseItems.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -4, scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="glass-card group rounded-2xl p-8 cursor-default"
                            >
                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5 group-hover:bg-blue-500/15 group-hover:border-blue-500/30 transition-all duration-300">
                                    <item.icon className="w-5 h-5 text-blue-400" />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-white/90 mb-3 group-hover:text-blue-400 transition-colors duration-300">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-white/40 leading-relaxed font-light">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
