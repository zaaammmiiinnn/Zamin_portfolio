"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { SiLeetcode } from "react-icons/si";
import { FaTrophy, FaStar, FaCalendarDay, FaCodeBranch, FaClock, FaCheckCircle } from "react-icons/fa";

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

interface CalendarData {
    [timestamp: string]: number;
}

interface Submission {
    title: string;
    titleSlug: string;
    timestamp: string;
    statusDisplay: string;
    lang: string;
}

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

const CACHE_KEY_PREFIX = "zar_leetcode_";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export default function LeetCodeStats() {
    const [data, setData] = useState<LeetCodeData | null>(null);
    const [heatmapData, setHeatmapData] = useState<ContributionDay[]>([]);
    const [recentActivity, setRecentActivity] = useState<Submission[]>([]);
    const [activeDaysCount, setActiveDaysCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const username = "zaaammmiiinnn";
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // 1. Check Cache
                const cachedProfile = localStorage.getItem(`${CACHE_KEY_PREFIX}profile`);
                const cachedCalendar = localStorage.getItem(`${CACHE_KEY_PREFIX}calendar`);
                const cachedSubmissions = localStorage.getItem(`${CACHE_KEY_PREFIX}submissions`);
                const cachedTime = localStorage.getItem(`${CACHE_KEY_PREFIX}timestamp`);

                const now = new Date().getTime();

                if (cachedProfile && cachedCalendar && cachedSubmissions && cachedTime && (now - parseInt(cachedTime)) < CACHE_TTL) {
                    setData(JSON.parse(cachedProfile));
                    processCalendarData(JSON.parse(cachedCalendar));
                    setRecentActivity(JSON.parse(cachedSubmissions));
                    setLoading(false);
                    return;
                }

                // 2. Fetch Fresh Data (Parallelize for speed)
                const [solvedRes, profileRes, calendarRes, submissionsRes] = await Promise.all([
                    fetch(`https://alfa-leetcode-api.0x7b.workers.dev/${username}/solved`),
                    fetch(`https://alfa-leetcode-api.0x7b.workers.dev/${username}`),
                    fetch(`https://alfa-leetcode-api.0x7b.workers.dev/${username}/calendar`),
                    fetch(`https://alfa-leetcode-api.0x7b.workers.dev/${username}/acSubmission`)
                ]);

                if (!solvedRes.ok || !profileRes.ok || !calendarRes.ok || !submissionsRes.ok) {
                    throw new Error("Failed to fetch LeetCode stats");
                }

                const solvedData = await solvedRes.json();
                const profileData = await profileRes.json();
                const calendarDataJSON = await calendarRes.json();
                const submissionsData = await submissionsRes.json();

                // 3. Process Data
                const leetCodeProfile: LeetCodeData = {
                    totalSolved: solvedData.solvedProblem,
                    totalQuestions: 3000, // Approximation
                    easySolved: solvedData.easySolved,
                    totalEasy: solvedData.totalEasy,
                    mediumSolved: solvedData.mediumSolved,
                    totalMedium: solvedData.totalMedium,
                    hardSolved: solvedData.hardSolved,
                    totalHard: solvedData.totalHard,
                    acceptanceRate: profileData.contributionPoint || 0,
                    ranking: profileData.ranking,
                    contributionPoints: profileData.contributionPoint,
                    reputation: profileData.reputation
                };

                let submissionsList: Submission[] = [];
                if (submissionsData && submissionsData.submission) {
                    // Extract recent 6 accepted submissions
                    submissionsList = submissionsData.submission.slice(0, 6);
                }

                // 4. Update State and Cache
                localStorage.setItem(`${CACHE_KEY_PREFIX}profile`, JSON.stringify(leetCodeProfile));

                // Note: The calendar API returns a string containing JSON mapping timestamp -> count
                let calendarObj: CalendarData = {};
                try {
                    calendarObj = JSON.parse(calendarDataJSON.submissionCalendar);
                } catch {
                    calendarObj = calendarDataJSON.submissionCalendar || {};
                }

                localStorage.setItem(`${CACHE_KEY_PREFIX}calendar`, JSON.stringify(calendarObj));
                localStorage.setItem(`${CACHE_KEY_PREFIX}submissions`, JSON.stringify(submissionsList));
                localStorage.setItem(`${CACHE_KEY_PREFIX}timestamp`, now.toString());

                setData(leetCodeProfile);
                processCalendarData(calendarObj);
                setRecentActivity(submissionsList);

            } catch (err) {
                console.error("Error fetching LeetCode activity:", err);
                setError(true);
            } finally {
                setLoading(false);
                setTimeout(() => {
                    if (scrollContainerRef.current) {
                        scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
                    }
                }, 100);
            }
        };

        fetchStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    const processCalendarData = (calendarData: CalendarData) => {
        const daysMap = new Map<string, number>();
        let activeDays = 0;

        // Populate map from timestamp keys
        for (const [timestampStr, count] of Object.entries(calendarData)) {
            const date = new Date(parseInt(timestampStr) * 1000);
            const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
            daysMap.set(dateString, count);
            if (count > 0) activeDays++;
        }

        setActiveDaysCount(activeDays);

        // Generate last 365 days
        const today = new Date();
        const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        const contributionDays: ContributionDay[] = [];

        for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
            const dateString = d.toISOString().split('T')[0];
            const count = daysMap.get(dateString) || 0;

            // Determine level (0-4) based on LeetCode's typical scale
            let level = 0;
            if (count > 0) level = 1;
            if (count >= 2) level = 2;
            if (count >= 4) level = 3;
            if (count >= 6) level = 4;

            contributionDays.push({
                date: dateString,
                count: count,
                level: level
            });
        }

        setHeatmapData(contributionDays);
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

    const getHeatmapColor = (level: number) => {
        switch (level) {
            case 1: return "bg-[#2c4021]"; // Muted LeetCode Green 1
            case 2: return "bg-[#456b2c]"; // Muted LeetCode Green 2
            case 3: return "bg-[#5c983a]"; // Moderate LeetCode Green
            case 4: return "bg-[#ffa116]"; // LeetCode Orange for high activity 
            default: return "bg-secondary";
        }
    };

    const timeAgo = (timestampStr: string) => {
        const date = new Date(parseInt(timestampStr) * 1000);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };

    if (error) {
        return null;
    }

    return (
        <section id="leetcode" className="py-24 bg-secondary/30 relative overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="space-y-12"
                >
                    <div className="text-center space-y-4 relative z-10">
                        <motion.div variants={itemVariants} className="flex items-center justify-center gap-3">
                            <SiLeetcode className="w-8 h-8 md:w-10 md:h-10 text-[#FFA116]" />
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                                LeetCode Activity
                            </h2>
                        </motion.div>
                        <motion.div variants={itemVariants} className="w-20 h-1 bg-[#FFA116] mx-auto rounded-full" />
                        <motion.p variants={itemVariants} className="text-muted-foreground text-lg max-w-2xl mx-auto pt-4">
                            Continuous learning and problem solving using Data Structures and Algorithms.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                        {/* Left/Top: Heatmap, Difficulty, and Stats */}
                        <motion.div
                            variants={itemVariants}
                            className="lg:col-span-2 space-y-8"
                        >
                            {/* Heatmap Card */}
                            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
                                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <FaCalendarDay className="text-muted-foreground" />
                                    Submissions (1 Year)
                                </h3>

                                {loading ? (
                                    <div className="w-full h-32 bg-secondary/50 animate-pulse rounded-xl"></div>
                                ) : (
                                    <div
                                        ref={scrollContainerRef}
                                        className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent custom-scrollbar"
                                        style={{ direction: 'ltr' }}
                                    >
                                        <div className="min-w-[750px] flex gap-1">
                                            {/* Chunking into columns (weeks) */}
                                            {Array.from({ length: Math.ceil(heatmapData.length / 7) }).map((_, colIndex) => (
                                                <div key={`col-${colIndex}`} className="flex flex-col gap-1">
                                                    {heatmapData.slice(colIndex * 7, (colIndex + 1) * 7).map((day, dayIndex) => (
                                                        <motion.div
                                                            key={day.date}
                                                            initial={{ opacity: 0, scale: 0.5 }}
                                                            whileInView={{ opacity: 1, scale: 1 }}
                                                            viewport={{ once: true, margin: "-50px" }}
                                                            transition={{ delay: (colIndex * 0.02) + (dayIndex * 0.01), duration: 0.2 }}
                                                            className={`w-3.5 h-3.5 rounded-sm ${getHeatmapColor(day.level)}`}
                                                            title={`${day.count} submissions on ${day.date}`}
                                                        />
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end items-center gap-2 mt-4 text-xs text-muted-foreground">
                                    <span>Less</span>
                                    <div className="w-3 h-3 rounded-sm bg-secondary"></div>
                                    <div className="w-3 h-3 rounded-sm bg-[#2c4021]"></div>
                                    <div className="w-3 h-3 rounded-sm bg-[#456b2c]"></div>
                                    <div className="w-3 h-3 rounded-sm bg-[#5c983a]"></div>
                                    <div className="w-3 h-3 rounded-sm bg-[#ffa116]"></div>
                                    <span>More</span>
                                </div>

                                {/* Difficulty Bars inside Heatmap Card for compact grid */}
                                <div className="mt-8 space-y-4 pt-8 border-t border-border">
                                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Difficulty Breakdown</h3>
                                    {loading ? (
                                        <div className="space-y-4">
                                            {[1, 2, 3].map(i => <div key={i} className="w-full h-4 bg-secondary animate-pulse rounded"></div>)}
                                        </div>
                                    ) : data ? (
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
                                    ) : null}
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-card border border-border p-5 rounded-2xl flex flex-col gap-1 shadow-sm group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                                        <FaCheckCircle className="text-[#00b8a3] w-6 h-6" />
                                    </div>
                                    <span className="text-sm text-muted-foreground">Total Solved</span>
                                    {loading ? (
                                        <div className="w-16 h-8 bg-secondary animate-pulse rounded"></div>
                                    ) : (
                                        <span className="text-2xl font-bold text-foreground">{data?.totalSolved}</span>
                                    )}
                                </div>
                                <div className="bg-card border border-border p-5 rounded-2xl flex flex-col gap-1 shadow-sm group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                                        <FaTrophy className="text-[#FFA116] w-6 h-6" />
                                    </div>
                                    <span className="text-sm text-muted-foreground">Global Rank</span>
                                    {loading ? (
                                        <div className="w-16 h-8 bg-secondary animate-pulse rounded"></div>
                                    ) : (
                                        <span className="text-2xl font-bold text-foreground">{data?.ranking.toLocaleString() || 'N/A'}</span>
                                    )}
                                </div>
                                <div className="bg-card border border-border p-5 rounded-2xl flex flex-col gap-1 shadow-sm group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                                        <FaStar className="text-[#ffc01e] w-6 h-6" />
                                    </div>
                                    <span className="text-sm text-muted-foreground">Points</span>
                                    {loading ? (
                                        <div className="w-16 h-8 bg-secondary animate-pulse rounded"></div>
                                    ) : (
                                        <span className="text-2xl font-bold text-foreground">{data?.contributionPoints}</span>
                                    )}
                                </div>
                                <div className="bg-card border border-border p-5 rounded-2xl flex flex-col gap-1 shadow-sm group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                                        <FaCalendarDay className="text-[#ef4743] w-6 h-6" />
                                    </div>
                                    <span className="text-sm text-muted-foreground">Active Days</span>
                                    {loading ? (
                                        <div className="w-16 h-8 bg-secondary animate-pulse rounded"></div>
                                    ) : (
                                        <span className="text-2xl font-bold text-foreground">{activeDaysCount}</span>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Recent Feed */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm h-full"
                        >
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <FaCodeBranch className="text-muted-foreground" />
                                Recent Submissions
                            </h3>

                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                                {loading ? (
                                    Array.from({ length: 4 }).map((_, i) => (
                                        <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-secondary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow animate-pulse"></div>
                                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-background animate-pulse h-20"></div>
                                        </div>
                                    ))
                                ) : (
                                    recentActivity.map((activity, idx) => (
                                        <div key={`${activity.titleSlug}-${activity.timestamp}-${idx}`} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                            {/* Icon */}
                                            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-card bg-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10`}>
                                                <SiLeetcode className="w-4 h-4 text-[#FFA116]" />
                                            </div>

                                            {/* Card */}
                                            <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-border bg-background hover:bg-secondary/30 transition-colors shadow-sm">
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground">
                                                            {activity.lang}
                                                        </span>
                                                        <time className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                                                            <FaClock className="w-3 h-3" />
                                                            {timeAgo(activity.timestamp)}
                                                        </time>
                                                    </div>
                                                    <p className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-[#FFA116] transition-colors">
                                                        {activity.title}
                                                    </p>
                                                    <p className="text-xs text-[#00b8a3]">
                                                        {activity.statusDisplay}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {!loading && (
                                <a
                                    href={`https://leetcode.com/u/${username}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-[#FFA116] hover:text-[#FFA116]/80 transition-colors"
                                >
                                    View Full Profile <span>→</span>
                                </a>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
