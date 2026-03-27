"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function HeroSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 10,
            },
        },
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
            {/* Background decoration */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000"></div>

            <div className="container px-4 md:px-6 relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center space-y-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    <motion.div variants={itemVariants} className="inline-block">
                        <span className="px-3 py-1 text-sm font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                            Open for opportunities
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold tracking-tighter"
                    >
                        Hi, I'm{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                            Zamin Askari Rizvi
                        </span>
                    </motion.h1>

                    <motion.h2
                        variants={itemVariants}
                        className="text-2xl md:text-3xl font-medium text-muted-foreground"
                    >
                        Software Engineer & AI Developer
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="max-w-[600px] mx-auto text-lg text-muted-foreground leading-relaxed"
                    >
                        I build scalable web applications and intelligent systems. Passionate
                        about turning complex problems into elegant, user-centric solutions.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    >
                        <a
                            href="#projects"
                            className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors inline-block w-full sm:w-auto shadow-lg hover:shadow-xl dark:shadow-none"
                        >
                            View Projects
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-3 rounded-md border border-input bg-background font-medium hover:bg-accent hover:text-accent-foreground transition-colors inline-block w-full sm:w-auto"
                        >
                            Contact Me
                        </a>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-center gap-6 pt-8 text-muted-foreground"
                    >
                        <a
                            href="https://github.com/ZaminAskari"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground transition-colors p-2"
                            aria-label="GitHub Profile"
                        >
                            <FaGithub className="w-6 h-6" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/zamin-askari-rizvi/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground transition-colors p-2"
                            aria-label="LinkedIn Profile"
                        >
                            <FaLinkedin className="w-6 h-6" />
                        </a>
                        <a
                            href="https://leetcode.com/u/zaaammmiiinnn/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground transition-colors p-2"
                            aria-label="LeetCode Profile"
                        >
                            <SiLeetcode className="w-6 h-6" />
                        </a>
                        <a
                            href="mailto:zaminaskari.work@gmail.com"
                            className="hover:text-foreground transition-colors p-2"
                            aria-label="Email Me"
                        >
                            <FaEnvelope className="w-6 h-6" />
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <span className="text-sm font-medium mb-2 uppercase tracking-widest hidden sm:block">Scroll</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center p-1"
                >
                    <motion.div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
