"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Overview", href: "#hero" },
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Telemetry", href: "#github" },
        { name: "Journey", href: "#experience" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? "py-3.5 bg-[#050507]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                    : "py-6 bg-transparent"
            }`}
        >
            <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-7xl flex items-center justify-between">
                {/* Brand / Monogram */}
                <a
                    href="#hero"
                    className="group flex items-center gap-2.5 text-white/90 hover:text-white transition-colors"
                >
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/25">
                        ZAR.01
                    </span>
                    <span className="text-sm font-semibold tracking-tight text-white/90 group-hover:text-blue-400 transition-colors">
                        ZAMIN ASKARI
                    </span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <ul className="flex items-center gap-7">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className="text-xs font-mono tracking-wider uppercase text-white/50 hover:text-blue-400 transition-colors duration-200"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Quick Action Button */}
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-blue-600/15 border border-white/[0.08] hover:border-blue-500/40 text-xs font-mono uppercase text-white/80 hover:text-blue-300 transition-all duration-300 shadow-sm"
                    >
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400" />
                        </span>
                        <span>INITIATE CONTACT</span>
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 -mr-2 text-white/70 hover:text-white md:hidden"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="md:hidden bg-[#050507]/95 backdrop-blur-2xl border-b border-white/[0.08] absolute top-full left-0 right-0 overflow-hidden shadow-2xl"
                    >
                        <div className="py-6 px-8 flex flex-col gap-4">
                            <ul className="flex flex-col gap-3">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block py-2 text-sm font-mono tracking-wider uppercase text-white/70 hover:text-blue-400 transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-4 border-t border-white/[0.06]">
                                <a
                                    href="#contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="inline-flex w-full justify-center items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs uppercase tracking-wider transition-colors shadow-[0_0_15px_rgba(0,102,255,0.4)]"
                                >
                                    INITIATE CONTACT
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
