"use client";

import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaAward } from "react-icons/fa";

const certifications = [
    {
        title: "Full Stack Development",
        organization: "100xDevs",
        issueDate: "",
        credentialUrl: "https://drive.google.com/file/d/1fsGcY7wVvXr38EUeJvsTCkfu4MRSlWVY/view?usp=drive_link",
        image: ""
    },
    {
        title: "Applying Text Embedding in LLMs Systems",
        organization: "Flipkart x Nxtwave",
        issueDate: "",
        credentialUrl: "https://s3-ap-south-1.amazonaws.com/poster-generation-backend-nxtwave-media-static/ccbp_beta/NIAT_MASTERCLASS_CERTIFICATES/19O1F5KLDI.png",
        image: "https://s3-ap-south-1.amazonaws.com/poster-generation-backend-nxtwave-media-static/ccbp_beta/NIAT_MASTERCLASS_CERTIFICATES/19O1F5KLDI.png"
    },
    {
        title: "AWS Cloud Practitioner",
        organization: "Amazon Web Services",
        issueDate: "",
        credentialUrl: "",
        image: ""
    }
];

export default function CertificationsSection() {
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
        <section id="certifications" className="py-24 bg-[#050505] relative">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="space-y-16"
                >
                    <div className="text-center space-y-4">
                        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold tracking-tight">
                            Certifications
                        </motion.h2>
                        <motion.div variants={itemVariants} className="w-20 h-1 bg-primary mx-auto rounded-full" />
                        <motion.p variants={itemVariants} className="text-muted-foreground text-lg max-w-2xl mx-auto pt-4">
                            Professional credentials and achievements that validate my technical expertise.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                className="group relative flex flex-col bg-card text-card-foreground rounded-2xl border border-border overflow-hidden shadow-sm"
                            >
                                {/* Image container */}
                                <div className="relative w-full h-48 sm:h-56 bg-secondary/50 overflow-hidden flex items-center justify-center p-4">
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10" />
                                    {cert.image ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={cert.image}
                                            alt={cert.title}
                                            className="w-full h-full object-contain relative z-0 group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <FaAward className="w-16 h-16 text-muted-foreground opacity-20" />
                                    )}
                                </div>

                                <div className="p-6 flex flex-col flex-grow relative z-20 -mt-6">
                                    <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 backdrop-blur-md border border-primary/20 shadow-sm">
                                        <FaAward className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors mb-2">
                                        {cert.title}
                                    </h3>
                                    <p className="text-muted-foreground mb-4 font-medium">
                                        {cert.organization}
                                    </p>

                                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-border">
                                        {cert.issueDate ? (
                                            <span className="text-sm text-muted-foreground font-medium">
                                                Issued: {cert.issueDate}
                                            </span>
                                        ) : (
                                            <span className="text-sm text-muted-foreground font-medium">
                                                Verified Credential
                                            </span>
                                        )}

                                        {cert.credentialUrl && (
                                            <a
                                                href={cert.credentialUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                                            >
                                                View <FaExternalLinkAlt className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
