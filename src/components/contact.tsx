"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { toast } from "sonner";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name cannot exceed 50 characters"),
    email: z.string().email("Please provide a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message cannot exceed 1000 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                toast.success("Message sent successfully!", {
                    description: "Thank you for reaching out. I'll get back to you soon.",
                });
                reset();
            } else {
                toast.error("Failed to send message", {
                    description: result.message || "An error occurred while sending your message.",
                });
            }
        } catch {
            toast.error("Something went wrong", {
                description: "Please try again later or contact me directly via email.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

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
        <section id="contact" className="py-24 bg-[#050505] relative">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
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
                            Reach Out
                        </motion.span>
                        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold tracking-tight text-white/90">
                            Get In Touch
                        </motion.h2>
                        <motion.div variants={itemVariants} className="w-16 h-0.5 bg-blue-500/40 mx-auto rounded-full" />
                        <motion.p variants={itemVariants} className="text-white/40 text-base max-w-2xl mx-auto pt-2">
                            Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-4">
                        {/* Contact Info */}
                        <motion.div variants={itemVariants} className="space-y-5">
                            <div className="glass-card rounded-2xl p-7 space-y-3">
                                <h3 className="text-lg font-semibold text-white/90 mb-4">Contact Information</h3>
                                <p className="text-white/40 text-sm leading-relaxed">
                                    Fill out the form and I will get back to you within 24 hours. Alternatively, reach out directly.
                                </p>
                            </div>

                            <div className="space-y-3">
                                {[
                                    {
                                        label: "Email",
                                        value: "zaminaskari.work@gmail.com",
                                        href: "mailto:zaminaskari.work@gmail.com",
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                            </svg>
                                        ),
                                    },
                                    {
                                        label: "LinkedIn",
                                        value: "linkedin.com/in/zamin-askari-rizvi",
                                        href: "https://www.linkedin.com/in/zamin-askari-rizvi/",
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                                <rect width="4" height="12" x="2" y="9" />
                                                <circle cx="4" cy="4" r="2" />
                                            </svg>
                                        ),
                                    },
                                    {
                                        label: "LeetCode",
                                        value: "leetcode.com/u/zaaammmiiinnn",
                                        href: "https://leetcode.com/u/zaaammmiiinnn/",
                                        icon: <SiLeetcode className="w-[18px] h-[18px] text-blue-400" />,
                                    },
                                ].map((item) => (
                                    <div key={item.label} className="glass-card flex items-center gap-4 p-4 rounded-xl">
                                        <div className="p-2.5 bg-blue-500/10 rounded-lg border border-blue-500/15 shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-white/60">{item.label}</h4>
                                            <a
                                                href={item.href}
                                                target={item.href.startsWith("mailto") ? undefined : "_blank"}
                                                rel={item.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                                                className="text-sm text-blue-400/80 hover:text-blue-400 transition-colors mt-0.5 block"
                                            >
                                                {item.value}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.div variants={itemVariants}>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="glass-card rounded-2xl p-7 space-y-5"
                            >
                                <div className="space-y-1.5">
                                    <label htmlFor="name" className="text-sm font-medium text-white/60">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        {...register("name")}
                                        className={`w-full p-3 rounded-lg bg-white/[0.03] border focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white/80 placeholder:text-white/20 transition-all text-sm ${
                                            errors.name ? "border-red-500/50" : "border-white/[0.06]"
                                        }`}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && (
                                        <p className="text-red-400/80 text-xs mt-1">{errors.name.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="email" className="text-sm font-medium text-white/60">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        {...register("email")}
                                        className={`w-full p-3 rounded-lg bg-white/[0.03] border focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white/80 placeholder:text-white/20 transition-all text-sm ${
                                            errors.email ? "border-red-500/50" : "border-white/[0.06]"
                                        }`}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-400/80 text-xs mt-1">{errors.email.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="message" className="text-sm font-medium text-white/60">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        {...register("message")}
                                        rows={5}
                                        className={`w-full p-3 rounded-lg bg-white/[0.03] border focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white/80 placeholder:text-white/20 transition-all resize-none text-sm ${
                                            errors.message ? "border-red-500/50" : "border-white/[0.06]"
                                        }`}
                                        placeholder="How can I help you?"
                                    />
                                    {errors.message && (
                                        <p className="text-red-400/80 text-xs mt-1">{errors.message.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-400 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner className="animate-spin w-4 h-4" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <FaPaperPlane className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
