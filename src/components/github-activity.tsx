"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub, FaFire, FaCalendarDay, FaCodeBranch, FaClock } from "react-icons/fa";

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

interface GithubData {
    contributions: ContributionDay[];
    total: {
        [year: string]: number;
    };
}

interface GithubEvent {
    id: string;
    type: string;
    created_at: string;
    repo: {
        name: string;
    };
    payload: {
        commits?: {
            message: string;
            sha: string;
        }[];
        action?: string;
        ref_type?: string;
    };
}

interface ParsedActivity {
    id: string;
    repoName: string;
    message: string;
    date: string;
    type: string;
}

interface AggregatedStats {
    totalThisYear: number;
    currentStreak: number;
    bestDay: string;
    mostActiveMonth: string;
    topRepos: { name: string; count: number }[];
}

const CACHE_KEY_PREFIX = "zar_github_";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export default function GitHubActivity() {
    const [heatmapData, setHeatmapData] = useState<ContributionDay[]>([]);
    const [stats, setStats] = useState<AggregatedStats | null>(null);
    const [recentActivity, setRecentActivity] = useState<ParsedActivity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const username = "zaaammmiiinnn";
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                // 1. Check Cache
                const cachedHeatmap = localStorage.getItem(`${CACHE_KEY_PREFIX}heatmap`);
                const cachedActivity = localStorage.getItem(`${CACHE_KEY_PREFIX}activity`);
                const cachedTime = localStorage.getItem(`${CACHE_KEY_PREFIX}timestamp`);

                const now = new Date().getTime();

                if (cachedHeatmap && cachedActivity && cachedTime && (now - parseInt(cachedTime)) < CACHE_TTL) {
                    processHeatmapData(JSON.parse(cachedHeatmap));
                    setRecentActivity(JSON.parse(cachedActivity));
                    setLoading(false);
                    return;
                }

                // 2. Fetch fresh data
                const [contributionsRes, eventsRes] = await Promise.all([
                    fetch(`https://github-contributions-api.jogruber.de/v4/${username}`),
                    fetch(`https://api.github.com/users/${username}/events/public?per_page=30`)
                ]);

                if (!contributionsRes.ok || !eventsRes.ok) {
                    throw new Error("Failed to fetch Github Data");
                }

                const contributionsData: GithubData = await contributionsRes.json();
                const eventsData: GithubEvent[] = await eventsRes.json();

                // 3. Process Activity
                const processedActivity = eventsData
                    .filter(event => event.type === 'PushEvent' || event.type === 'CreateEvent' || event.type === 'PullRequestEvent')
                    .map(event => {
                        let msg = "";
                        if (event.type === 'PushEvent' && event.payload.commits && event.payload.commits.length > 0) {
                            msg = event.payload.commits[0].message.split('\n')[0];
                        } else if (event.type === 'CreateEvent') {
                            msg = `Created ${event.payload.ref_type || 'repository'}`;
                        } else if (event.type === 'PullRequestEvent') {
                            msg = `${event.payload.action === 'opened' ? 'Opened' : 'Merged/Closed'} pull request`;
                        }

                        return {
                            id: event.id,
                            repoName: event.repo.name.replace(`${username}/`, ''),
                            message: msg || "Update to repository",
                            date: event.created_at,
                            type: event.type
                        };
                    })
                    .slice(0, 5);

                // 4. Save to Cache & Set State
                localStorage.setItem(`${CACHE_KEY_PREFIX}heatmap`, JSON.stringify(contributionsData));
                localStorage.setItem(`${CACHE_KEY_PREFIX}activity`, JSON.stringify(processedActivity));
                localStorage.setItem(`${CACHE_KEY_PREFIX}timestamp`, now.toString());

                processHeatmapData(contributionsData);
                setRecentActivity(processedActivity);

            } catch (err) {
                console.error("Error fetching GitHub activity:", err);
                setError(true);
            } finally {
                setLoading(false);
                // Scroll heatmap to right automatically
                setTimeout(() => {
                    if (scrollContainerRef.current) {
                        scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
                    }
                }, 100);
            }
        };

        fetchGitHubData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    const processHeatmapData = (data: GithubData) => {
        // Get last 365 days
        const today = new Date();
        const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

        const lastYearContributions = data.contributions.filter(d => new Date(d.date) >= oneYearAgo);
        setHeatmapData(lastYearContributions);

        // Calculate Stats
        let currentStreak = 0;
        let maxCommitsDay = { date: '', count: -1 };
        const monthCounts: { [key: string]: number } = {};

        // To calculate streak accurately from recent past to today
        let tempStreak = 0;

        for (let i = lastYearContributions.length - 1; i >= 0; i--) {
            const day = lastYearContributions[i];

            // Streak
            if (day.count > 0) {
                tempStreak++;
            } else if (day.count === 0 && new Date(day.date).toDateString() !== new Date().toDateString()) {
                // Ignore today if no commits yet, but break streak otherwise
                if (tempStreak > currentStreak) currentStreak = tempStreak;
                tempStreak = 0;
            }

            // Max Commits
            if (day.count > maxCommitsDay.count) {
                maxCommitsDay = day;
            }

            // Month aggregation
            const month = new Date(day.date).toLocaleString('default', { month: 'long' });
            monthCounts[month] = (monthCounts[month] || 0) + day.count;
        }

        if (tempStreak > currentStreak) currentStreak = tempStreak; // Catch trailing streak

        let mostActiveMonth = '';
        let maxMonthCommits = 0;
        for (const [month, count] of Object.entries(monthCounts)) {
            if (count > maxMonthCommits) {
                maxMonthCommits = count;
                mostActiveMonth = month;
            }
        }

        const currentYearStr = today.getFullYear().toString();

        setStats({
            totalThisYear: data.total[currentYearStr] || 0,
            currentStreak,
            bestDay: maxCommitsDay.count > 0 ? new Date(maxCommitsDay.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'N/A',
            mostActiveMonth: mostActiveMonth || 'N/A',
            topRepos: [] // Note: Getting top repos requires a different API approach to loop through all repos which is expensive. Omitted for simplicity or use mocked if desperately needed, but using recent activity is better.
        });
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
            case 1: return "bg-[#0e4429]";
            case 2: return "bg-[#006d32]";
            case 3: return "bg-[#26a641]";
            case 4: return "bg-[#39d353]";
            default: return "bg-secondary";
        }
    };

    const timeAgo = (dateStr: string) => {
        const date = new Date(dateStr);
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

    if (error) return null;

    return (
        <section id="github" className="py-24 bg-[#050505] relative overflow-hidden">
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
                            <FaGithub className="w-8 h-8 md:w-10 md:h-10 text-foreground" />
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                                GitHub Activity
                            </h2>
                        </motion.div>
                        <motion.div variants={itemVariants} className="w-20 h-1 bg-foreground mx-auto rounded-full" />
                        <motion.p variants={itemVariants} className="text-muted-foreground text-lg max-w-2xl mx-auto pt-4">
                            Continuous integration, open source contributions, and personal projects.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                        {/* Left/Top: Heatmap and Stats */}
                        <motion.div
                            variants={itemVariants}
                            className="lg:col-span-2 space-y-8"
                        >
                            {/* Heatmap Card */}
                            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
                                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <FaCalendarDay className="text-muted-foreground" />
                                    Contributions (1 Year)
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
                                                            title={`${day.count} contributions on ${day.date}`}
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
                                    <div className="w-3 h-3 rounded-sm bg-[#0e4429]"></div>
                                    <div className="w-3 h-3 rounded-sm bg-[#006d32]"></div>
                                    <div className="w-3 h-3 rounded-sm bg-[#26a641]"></div>
                                    <div className="w-3 h-3 rounded-sm bg-[#39d353]"></div>
                                    <span>More</span>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-card border border-border p-5 rounded-2xl flex flex-col gap-1 shadow-sm">
                                    <span className="text-sm text-muted-foreground">Total (Year)</span>
                                    {loading ? (
                                        <div className="w-16 h-8 bg-secondary animate-pulse rounded"></div>
                                    ) : (
                                        <span className="text-2xl font-bold text-foreground">{stats?.totalThisYear}</span>
                                    )}
                                </div>
                                <div className="bg-card border border-border p-5 rounded-2xl flex flex-col gap-1 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                                        <FaFire className="text-[#e25555] w-6 h-6" />
                                    </div>
                                    <span className="text-sm text-muted-foreground">Current Streak</span>
                                    {loading ? (
                                        <div className="w-16 h-8 bg-secondary animate-pulse rounded"></div>
                                    ) : (
                                        <span className="text-2xl font-bold text-foreground">{stats?.currentStreak} days</span>
                                    )}
                                </div>
                                <div className="bg-card border border-border p-5 rounded-2xl flex flex-col gap-1 shadow-sm">
                                    <span className="text-sm text-muted-foreground">Best Day</span>
                                    {loading ? (
                                        <div className="w-16 h-8 bg-secondary animate-pulse rounded"></div>
                                    ) : (
                                        <span className="text-2xl font-bold text-foreground">{stats?.bestDay}</span>
                                    )}
                                </div>
                                <div className="bg-card border border-border p-5 rounded-2xl flex flex-col gap-1 shadow-sm">
                                    <span className="text-sm text-muted-foreground">Active Month</span>
                                    {loading ? (
                                        <div className="w-16 h-8 bg-secondary animate-pulse rounded"></div>
                                    ) : (
                                        <span className="text-2xl font-bold text-foreground truncate">{stats?.mostActiveMonth}</span>
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
                                Recent Activity
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
                                        <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                            {/* Icon */}
                                            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-card bg-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10`}>
                                                <FaGithub className="w-4 h-4 text-primary-foreground" />
                                            </div>

                                            {/* Card */}
                                            <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-border bg-background hover:bg-secondary/30 transition-colors shadow-sm">
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground">
                                                            {activity.repoName}
                                                        </span>
                                                        <time className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                                                            <FaClock className="w-3 h-3" />
                                                            {timeAgo(activity.date)}
                                                        </time>
                                                    </div>
                                                    <p className="text-sm text-foreground line-clamp-2">
                                                        {activity.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
