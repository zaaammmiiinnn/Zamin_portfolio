"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
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
                headers: {
                    "Content-Type": "application/json",
                },
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
        } catch (error) {
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
        <section id="contact" className="py-24 bg-background relative">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="space-y-16"
                >
                    <div className="text-center space-y-4">
                        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold tracking-tight">
                            Get In Touch
                        </motion.h2>
                        <motion.div variants={itemVariants} className="w-20 h-1 bg-primary mx-auto rounded-full" />
                        <motion.p variants={itemVariants} className="text-muted-foreground text-lg max-w-2xl mx-auto pt-4">
                            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
                        {/* Contact Info */}
                        <motion.div variants={itemVariants} className="space-y-8 lg:pr-12">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Fill out the form and I will get back to you within 24 hours. Alternatively, you can reach out to me directly via email or connect on LinkedIn.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50 border border-border">
                                    <div className="p-3 bg-background rounded-full shrink-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-primary"
                                        >
                                            <rect width="20" height="16" x="2" y="4" rx="2" />
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground">Email</h4>
                                        <a href="mailto:contact@zaminaskari.com" className="text-primary hover:underline mt-1 block">
                                            contact@zaminaskari.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50 border border-border">
                                    <div className="p-3 bg-background rounded-full shrink-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-primary"
                                        >
                                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                            <rect width="4" height="12" x="2" y="9" />
                                            <circle cx="4" cy="4" r="2" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground">LinkedIn</h4>
                                        <a href="https://linkedin.com/in/zaminaskari" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline mt-1 block">
                                            linkedin.com/in/zaminaskari
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.div variants={itemVariants}>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="bg-card shadow-lg border border-border rounded-2xl p-8 space-y-6"
                            >
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        {...register("name")}
                                        className={`w-full p-3 rounded-md bg-secondary border focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.name ? "border-destructive text-destructive" : "border-border"
                                            }`}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && (
                                        <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        {...register("email")}
                                        className={`w-full p-3 rounded-md bg-secondary border focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.email ? "border-destructive text-destructive" : "border-border"
                                            }`}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        {...register("message")}
                                        rows={5}
                                        className={`w-full p-3 rounded-md bg-secondary border focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${errors.message ? "border-destructive text-destructive" : "border-border"
                                            }`}
                                        placeholder="How can I help you?"
                                    />
                                    {errors.message && (
                                        <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner className="animate-spin w-5 h-5" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <FaPaperPlane className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
