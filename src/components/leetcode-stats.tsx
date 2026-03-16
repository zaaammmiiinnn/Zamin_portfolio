"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiLeetcode } from "react-icons/si";
import { FaTrophy, FaStar } from "react-icons/fa";

interface LeetCodeData {
    totalSolved: number;
    totalQuestions: number;
    easySolved: number;
    totalEasy: number;
    mediumSolved: number;
    totalMedium: number;
    hardSolved: number;
    totalHard: number;
    acceptanceRate: number;
    ranking: number;
    contributionPoints: number;
    reputation: number;
}

export default function LeetCodeStats() {
    const [data, setData] = useState<LeetCodeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const username = "zaaammmiiinnn";

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Try Fallback Alfa Leetcode API since direct GraphQL will fail due to CORS
                const solvedRes = await fetch(`https://alfa-leetcode-api.0x7b.workers.dev/${username}/solved`);
                const profileRes = await fetch(`https://alfa-leetcode-api.0x7b.workers.dev/${username}`);

                if (!solvedRes.ok || !profileRes.ok) {
                    throw new Error("Failed to fetch LeetCode stats");
                }

                const solvedData = await solvedRes.json();
                const profileData = await profileRes.json();

                setData({
                    totalSolved: solvedData.solvedProblem,
                    totalQuestions: 3000, // Approximation or fetch from API if available
                    easySolved: solvedData.easySolved,
                    totalEasy: solvedData.totalEasy,
                    mediumSolved: solvedData.mediumSolved,
                    totalMedium: solvedData.totalMedium,
                    hardSolved: solvedData.hardSolved,
                    totalHard: solvedData.totalHard,
                    acceptanceRate: profileData.contributionPoint || 0, // Using contribution point here as placeholder if acceptance rate not available
                    ranking: profileData.ranking,
                    contributionPoints: profileData.contributionPoint,
                    reputation: profileData.reputation
                });
            } catch (err) {
                console.error("Error fetching LeetCode stats:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [username]);

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

    if (error) {
        return null; // Gracefully hide the component if it fails to load
    }

    return (
        <section id="leetcode" className="py-24 bg-secondary/30 relative">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="space-y-12"
                >
                    <div className="text-center space-y-4">
                        <motion.div variants={itemVariants} className="flex items-center justify-center gap-3">
                            <SiLeetcode className="w-8 h-8 md:w-10 md:h-10 text-[#FFA116]" />
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                                LeetCode Stats
                            </h2>
                        </motion.div>
                        <motion.div variants={itemVariants} className="w-20 h-1 bg-[#FFA116] mx-auto rounded-full" />
                        <motion.p variants={itemVariants} className="text-muted-foreground text-lg max-w-2xl mx-auto pt-4">
                            Continuous learning and problem solving using Data Structures and Algorithms.
                        </motion.p>
                    </div>

                    <motion.div
                        variants={itemVariants}
                        className="bg-card shadow-lg border border-border rounded-3xl p-6 md:p-10 relative overflow-hidden group hover:border-[#FFA116]/30 transition-colors"
                    >
                        {/* Background subtle glow */}
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-[#FFA116]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-pulse">
                                {/* Skeleton for Circle */}
                                <div className="flex flex-col items-center justify-center space-y-4">
                                    <div className="w-48 h-48 rounded-full bg-secondary"></div>
                                    <div className="w-32 h-6 bg-secondary rounded"></div>
                                </div>

                                {/* Skeleton for Stats */}
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="space-y-2">
                                                <div className="flex justify-between">
                                                    <div className="w-16 h-4 bg-secondary rounded"></div>
                                                    <div className="w-12 h-4 bg-secondary rounded"></div>
                                                </div>
                                                <div className="w-full h-2 bg-secondary rounded-full"></div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                                        <div className="w-24 h-12 bg-secondary rounded"></div>
                                        <div className="w-24 h-12 bg-secondary rounded"></div>
                                    </div>
                                </div>
                            </div>
                        ) : data ? (
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center relative z-10">
                                {/* Left Column: Circular Progress */}
                                <div className="lg:col-span-2 flex flex-col items-center justify-center">
                                    <div className="relative flex items-center justify-center w-48 h-48 md:w-56 md:h-56">
                                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                            {/* Background circle */}
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="transparent"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                className="text-secondary"
                                            />
                                            {/* Progress circle */}
                                            <motion.circle
                                                initial={{ strokeDasharray: "0 1000" }}
                                                whileInView={{
                                                    strokeDasharray: `${(data.totalSolved / (data.totalSolved + 100)) * 283} 1000` // 283 is approx 2 * pi * 45
                                                }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="transparent"
                                                stroke="#FFA116"
                                                strokeWidth="4"
                                                strokeLinecap="round"
                                            />
                                        </svg>

                                        <div className="absolute flex flex-col items-center justify-center">
                                            <motion.span
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: 0.5 }}
                                                className="text-4xl md:text-5xl font-bold text-foreground"
                                            >
                                                {data.totalSolved}
                                            </motion.span>
                                            <span className="text-sm text-muted-foreground mt-1">Solved</span>
                                        </div>
                                    </div>
                                    <a
                                        href={`https://leetcode.com/u/${username}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-6 flex items-center gap-2 text-sm font-medium text-[#FFA116] hover:text-[#FFA116]/80 transition-colors"
                                    >
                                        View Profile <span>→</span>
                                    </a>
                                </div>

                                {/* Right Column: Difficulty Breakdown and Stats */}
                                <div className="lg:col-span-3 space-y-8">
                                    <div className="space-y-5">
                                        {/* Easy Progress */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-end text-sm">
                                                <span className="font-medium text-[#00b8a3]">Easy</span>
                                                <span className="text-muted-foreground"><strong className="text-foreground">{data.easySolved}</strong> / {data.totalEasy}</span>
                                            </div>
                                            <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${(data.easySolved / data.totalEasy) * 100}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.2 }}
                                                    className="h-full bg-[#00b8a3] rounded-full"
                                                />
                                            </div>
                                        </div>

                                        {/* Medium Progress */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-end text-sm">
                                                <span className="font-medium text-[#ffc01e]">Medium</span>
                                                <span className="text-muted-foreground"><strong className="text-foreground">{data.mediumSolved}</strong> / {data.totalMedium}</span>
                                            </div>
                                            <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${(data.mediumSolved / data.totalMedium) * 100}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.3 }}
                                                    className="h-full bg-[#ffc01e] rounded-full"
                                                />
                                            </div>
                                        </div>

                                        {/* Hard Progress */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-end text-sm">
                                                <span className="font-medium text-[#ef4743]">Hard</span>
                                                <span className="text-muted-foreground"><strong className="text-foreground">{data.hardSolved}</strong> / {data.totalHard}</span>
                                            </div>
                                            <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${(data.hardSolved / data.totalHard) * 100}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.4 }}
                                                    className="h-full bg-[#ef4743] rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Stats Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 text-sm border-t border-border">
                                        <div className="bg-secondary/50 p-4 rounded-xl border border-border flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                                <FaTrophy className="w-4 h-4 text-[#FFA116]" />
                                                <span>Ranking</span>
                                            </div>
                                            <span className="text-xl font-bold">{data.ranking.toLocaleString()}</span>
                                        </div>

                                        <div className="bg-secondary/50 p-4 rounded-xl border border-border flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                                <FaStar className="w-4 h-4 text-[#FFA116]" />
                                                <span>Points</span>
                                            </div>
                                            <span className="text-xl font-bold">{data.contributionPoints}</span>
                                        </div>

                                        <div className="bg-secondary/50 p-4 rounded-xl border border-border flex flex-col gap-1 col-span-2 md:col-span-1">
                                            <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                                <svg className="w-4 h-4 text-[#FFA116]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                                                <span>Reputation</span>
                                            </div>
                                            <span className="text-xl font-bold">{data.reputation || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
