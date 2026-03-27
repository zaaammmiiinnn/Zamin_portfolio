"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Expertise", href: "#expertise" },
        { name: "Projects", href: "#projects" },
        { name: "LeetCode", href: "#leetcode" },
        { name: "GitHub", href: "#github" },
        { name: "Experience", href: "#experience" },
        { name: "Certifications", href: "#certifications" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled
                    ? "py-3 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.04]"
                    : "py-5 bg-transparent"
            }`}
        >
            <div className="container mx-auto px-4 md:px-6 max-w-6xl flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="text-xl font-bold tracking-tighter text-white/90">
                    ZAR<span className="text-blue-500">.</span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center">
                    <ul className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className="text-[13px] font-medium text-white/40 hover:text-blue-400 transition-colors duration-300"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Nav Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="block md:hidden p-2 -mr-2 text-white/60"
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#050505]/95 backdrop-blur-xl border-b border-white/[0.04] absolute top-full left-0 right-0 overflow-hidden"
                    >
                        <ul className="flex flex-col py-4 px-6 gap-1">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block py-2.5 text-base font-medium text-white/50 hover:text-blue-400 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
