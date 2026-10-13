"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    FaPaperPlane,
    FaSpinner,
    FaEnvelope,
    FaLinkedin,
    FaGithub,
    FaCopy,
    FaCheck,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { toast } from "sonner";

const contactSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters"),
    email: z.string().email("Please provide a valid email address"),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message cannot exceed 1000 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Message dispatched successfully!", {
                    description: "Thank you for reaching out. I'll get back to you shortly.",
                });
                reset();
            } else {
                toast.error("Failed to send message", {
                    description: result.message || "An error occurred while sending your message.",
                });
            }
        } catch {
            toast.error("Something went wrong", {
                description: "Please reach out directly at zaminaskari.work@gmail.com",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("zaminaskari.work@gmail.com");
        setCopiedEmail(true);
        toast.info("Email copied to clipboard", {
            description: "zaminaskari.work@gmail.com",
        });
        setTimeout(() => setCopiedEmail(false), 2500);
    };

    return (
        <section
            id="contact"
            className="relative w-full bg-[#060608] text-[#F3F2EE] py-14 sm:py-24 px-4 sm:px-12 lg:px-20 z-20 border-t border-white/[0.06]"
            aria-label="Contact and Communication Channel"
        >
            {/* Calm Ambient Aura */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-blue-600/[0.04] blur-[160px] pointer-events-none -z-10" />

            <div className="max-w-6xl mx-auto space-y-14">
                {/* Section Header */}
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-blue-400 font-bold tracking-widest uppercase">
                                [06.CONTACT]
                            </span>
                            <span className="text-white/20">•</span>
                            <h2 className="font-mono text-xs text-white/70 tracking-widest uppercase">
                                DIRECT DISPATCH TERMINAL
                            </h2>
                        </div>

                        {/* Delhi Metro STN 05 Plaque */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 font-mono text-[11px] text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                            <span className="font-bold">STN 05</span>
                            <span className="text-white/30">|</span>
                            <span>संपर्क</span>
                            <span className="text-white/30">•</span>
                            <span className="text-white/80">TERMINUS JUNCTION</span>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
                        <div>
                            <span className="font-mono text-[11px] text-blue-400/80 tracking-[0.25em] uppercase block mb-1">
                                INITIATE COMMUNICATION
                            </span>
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-mono">
                                LET&apos;S BUILD THE EXTRAORDINARY.
                            </h3>
                        </div>

                        <p className="text-sm text-white/50 font-light max-w-md leading-relaxed">
                            Open for AI systems engineering, agentic workflow architectures, and full-stack technical engagements.
                        </p>
                    </div>
                </div>

                {/* Main 2-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column: Direct Coordinate Cards */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Status Beacon Card */}
                        <div className="p-6 rounded-2xl bg-[#090D18] border border-blue-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.6)] space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
                                    CURRENT STATUS: AVAILABLE
                                </span>
                            </div>
                            <p className="text-xs text-white/70 font-light leading-relaxed">
                                Actively evaluating new opportunities in AI/ML engineering, intelligent agents, and full-stack systems.
                            </p>
                            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/40">
                                <span>RESPONSE TIME: &lt; 24H</span>
                                <span>TIMEZONE: UTC+05:30</span>
                            </div>
                        </div>

                        {/* Direct Channel Links */}
                        <div className="space-y-3">
                            {/* Email Card with Copy Button */}
                            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/30 transition-all flex items-center justify-between gap-3 group">
                                <div className="flex items-center gap-3.5">
                                    <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                                        <FaEnvelope className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="font-mono text-[10px] text-white/40 uppercase block">
                                            PRIMARY EMAIL
                                        </span>
                                        <a
                                            href="mailto:zaminaskari.work@gmail.com"
                                            className="text-xs sm:text-sm text-white font-mono group-hover:text-blue-300 transition-colors"
                                        >
                                            zaminaskari.work@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleCopyEmail}
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer outline-none focus:ring-1 focus:ring-blue-400"
                                    aria-label="Copy email address"
                                    title="Copy email address"
                                >
                                    {copiedEmail ? (
                                        <FaCheck className="w-3.5 h-3.5 text-emerald-400" />
                                    ) : (
                                        <FaCopy className="w-3.5 h-3.5" />
                                    )}
                                </button>
                            </div>

                            {/* LinkedIn Card */}
                            <a
                                href="https://www.linkedin.com/in/zamin-askari-rizvi/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/30 transition-all flex items-center justify-between gap-3 group"
                            >
                                <div className="flex items-center gap-3.5">
                                    <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                                        <FaLinkedin className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="font-mono text-[10px] text-white/40 uppercase block">
                                            PROFESSIONAL NETWORK
                                        </span>
                                        <span className="text-xs sm:text-sm text-white font-mono group-hover:text-blue-300 transition-colors">
                                            linkedin.com/in/zamin-askari-rizvi
                                        </span>
                                    </div>
                                </div>
                                <span className="font-mono text-xs text-white/30 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
                                    →
                                </span>
                            </a>

                            {/* GitHub Card */}
                            <a
                                href="https://github.com/zaaammmiiinnn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/30 transition-all flex items-center justify-between gap-3 group"
                            >
                                <div className="flex items-center gap-3.5">
                                    <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                                        <FaGithub className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="font-mono text-[10px] text-white/40 uppercase block">
                                            SOURCE CODE REPOSITORIES
                                        </span>
                                        <span className="text-xs sm:text-sm text-white font-mono group-hover:text-blue-300 transition-colors">
                                            github.com/zaaammmiiinnn
                                        </span>
                                    </div>
                                </div>
                                <span className="font-mono text-xs text-white/30 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
                                    →
                                </span>
                            </a>

                            {/* LeetCode Card */}
                            <a
                                href="https://leetcode.com/u/zaaammmiiinnn/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-500/30 transition-all flex items-center justify-between gap-3 group"
                            >
                                <div className="flex items-center gap-3.5">
                                    <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
                                        <SiLeetcode className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="font-mono text-[10px] text-white/40 uppercase block">
                                            ALGORITHMIC PROFILE
                                        </span>
                                        <span className="text-xs sm:text-sm text-white font-mono group-hover:text-amber-300 transition-colors">
                                            leetcode.com/u/zaaammmiiinnn
                                        </span>
                                    </div>
                                </div>
                                <span className="font-mono text-xs text-white/30 group-hover:text-amber-400 group-hover:translate-x-1 transition-all">
                                    →
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Working Interactive Form */}
                    <div className="lg:col-span-7">
                        <div className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-[#090C16] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-6">
                            <div className="border-b border-white/[0.08] pb-4">
                                <h4 className="text-lg font-bold font-mono text-white">
                                    TRANSMIT DIRECT MESSAGE
                                </h4>
                                <p className="text-xs text-white/50 font-light mt-1">
                                    All transmissions are routed through secure authenticated endpoints.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                {/* Name Field */}
                                <div className="space-y-1.5">
                                    <label
                                        htmlFor="name"
                                        className="text-xs font-mono text-white/60 tracking-wider uppercase block"
                                    >
                                        Your Name // Organization
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        {...register("name")}
                                        className={`w-full p-3.5 rounded-xl bg-black/40 border text-white text-sm font-mono placeholder:text-white/20 transition-all outline-none focus:ring-2 focus:ring-blue-400 ${
                                            errors.name ? "border-red-500/60" : "border-white/10 focus:border-blue-500/50"
                                        }`}
                                        placeholder="Alex Rivera"
                                    />
                                    {errors.name && (
                                        <p className="text-red-400 text-xs font-mono mt-1">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div className="space-y-1.5">
                                    <label
                                        htmlFor="email"
                                        className="text-xs font-mono text-white/60 tracking-wider uppercase block"
                                    >
                                        Your Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        {...register("email")}
                                        className={`w-full p-3.5 rounded-xl bg-black/40 border text-white text-sm font-mono placeholder:text-white/20 transition-all outline-none focus:ring-2 focus:ring-blue-400 ${
                                            errors.email ? "border-red-500/60" : "border-white/10 focus:border-blue-500/50"
                                        }`}
                                        placeholder="alex@company.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-400 text-xs font-mono mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Message Field */}
                                <div className="space-y-1.5">
                                    <label
                                        htmlFor="message"
                                        className="text-xs font-mono text-white/60 tracking-wider uppercase block"
                                    >
                                        Message &amp; Project Scope
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        {...register("message")}
                                        className={`w-full p-3.5 rounded-xl bg-black/40 border text-white text-sm font-light placeholder:text-white/20 transition-all resize-none outline-none focus:ring-2 focus:ring-blue-400 ${
                                            errors.message ? "border-red-500/60" : "border-white/10 focus:border-blue-500/50"
                                        }`}
                                        placeholder="Tell me about your initiative, timeline, or engineering challenge..."
                                    />
                                    {errors.message && (
                                        <p className="text-red-400 text-xs font-mono mt-1">
                                            {errors.message.message}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,102,255,0.4)] hover:shadow-[0_4px_25px_rgba(0,102,255,0.6)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner className="animate-spin w-4 h-4" />
                                            <span>TRANSMITTING MESSAGE...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>DISPATCH TRANSMISSION</span>
                                            <FaPaperPlane className="w-3.5 h-3.5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
