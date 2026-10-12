"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChartBar, FaBrain, FaDatabase, FaCode } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const BILLBOARDS = [
    {
        id: "01",
        code: "STN // 01",
        line: "BLUE LINE // INSIGHTS",
        title: "Data Analytics & Visualization",
        description:
            "Building interactive dashboards, analytics workflows, and clear metrics from complex datasets.",
        deliverables: "Executive Dashboards • Statistical Modeling • Multi-channel Ingestion",
        tools: ["Pandas", "SQL", "Streamlit", "Matplotlib", "Analytics"],
        Icon: FaChartBar,
        color: "#0066FF",
        glow: "rgba(0, 102, 255, 0.25)",
        revealAt: 0.18,
    },
    {
        id: "02",
        code: "STN // 02",
        line: "CYAN LINE // INFERENCE",
        title: "Machine Learning",
        description:
            "Designing, training, and deploying intelligent models and inference pipelines for production environments.",
        deliverables: "Custom Sentiment Models • Neural Embeddings • Real-Time Vision",
        tools: ["PyTorch", "Transformers", "NLP", "Word2Vec", "Scikit-Learn"],
        Icon: FaBrain,
        color: "#00F0FF",
        glow: "rgba(0, 240, 255, 0.25)",
        revealAt: 0.38,
    },
    {
        id: "03",
        code: "STN // 03",
        line: "INDIGO LINE // PIPELINES",
        title: "Data Engineering",
        description:
            "Designing and managing robust data pipelines and scalable database architectures.",
        deliverables: "Sub-Second Query Ingestion • Automated ETL • Schema Contracts",
        tools: ["PostgreSQL", "MongoDB", "Redis", "Docker", "ETL Pipelines"],
        Icon: FaDatabase,
        color: "#6366F1",
        glow: "rgba(99, 102, 241, 0.25)",
        revealAt: 0.58,
    },
    {
        id: "04",
        code: "STN // 04",
        line: "ELECTRIC LINE // RUNTIME",
        title: "Software Engineering",
        description:
            "Creating scalable, production-ready applications and end-to-end systems with modern frameworks.",
        deliverables: "Deterministic APIs • Async Microservices • Modern Next.js UI",
        tools: ["Next.js 16", "React 19", "TypeScript", "FastAPI", "Zod"],
        Icon: FaCode,
        color: "#3B82F6",
        glow: "rgba(59, 130, 246, 0.25)",
        revealAt: 0.78,
    },
];

export default function MetroSection() {
    const metroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Desktop (>= 768px): Pinned for 300vh with horizontal metro train and sequenced billboards
            mm.add("(min-width: 768px)", () => {
                // Initial billboard state (dimmed station signs before train arrives)
                gsap.set(".metro-billboard", {
                    opacity: 0.2,
                    y: 20,
                    scale: 0.96,
                });

                // Master scrub timeline pinned for 300vh
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: metroRef.current,
                        start: "top top",
                        end: () => `+=${window.innerHeight * 3}`,
                        scrub: true,
                        pin: true,
                        anticipatePin: 1,
                    },
                });

                // 1. Metro train moves left -> right across the platform
                tl.to(
                    ".metro-train",
                    {
                        xPercent: 200,
                        ease: "none",
                        duration: 1,
                    },
                    0
                );

                // 2. Billboards reveal at scroll progress 0.2, 0.4, 0.6, 0.8
                BILLBOARDS.forEach((b, i) => {
                    tl.to(
                        `.metro-billboard-${i}`,
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.12,
                            ease: "power2.out",
                        },
                        b.revealAt
                    );
                });
            });

            // Mobile (< 768px): No horizontal scroll, clean vertical stack
            mm.add("(max-width: 767px)", () => {
                gsap.set(".metro-billboard", {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    clearProps: "all",
                });
            });
        }, metroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={metroRef}
            id="expertise"
            className="metro relative w-full min-h-screen bg-[#05060A] text-[#F3F2EE] z-20 py-20 md:py-0 overflow-hidden flex flex-col justify-between"
            aria-label="Metro Station Core Expertise"
        >
            {/* Top Station Overhead Signage */}
            <div className="z-10 w-full max-w-6xl mx-auto px-6 sm:px-12 pt-8 pb-4 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-blue-400 font-bold tracking-widest uppercase">
                        [03.METRO]
                    </span>
                    <span className="text-white/20">•</span>
                    <h2 className="font-mono text-xs text-white/80 tracking-widest uppercase">
                        STATION PLATFORM // 4 CORE COMPETENCIES
                    </h2>
                </div>

                <div className="flex items-center gap-4 font-mono text-[11px] text-white/40">
                    <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span>TRANSIT LINE ACTIVE</span>
                    </span>
                    <span className="hidden sm:inline text-white/20">|</span>
                    <span className="hidden sm:inline">DIRECTION: TERMINAL TO PRODUCTION</span>
                </div>
            </div>

            {/* Center Area: 4 Station Billboards */}
            <div className="relative z-10 w-full max-w-6xl mx-auto my-auto px-6 sm:px-12 py-8">
                {/* Section Station Sub-Header */}
                <div className="mb-8">
                    <span className="font-mono text-[11px] text-blue-400/80 tracking-[0.25em] uppercase block mb-1">
                        CENTRAL PLATFORM BILLBOARDS
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white/95 font-mono">
                        ENGINEERING CAPABILITIES IN MOTION
                    </h3>
                </div>

                {/* The 4 Retro Metro Billboards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {BILLBOARDS.map((b, i) => (
                        <div
                            key={b.id}
                            tabIndex={0}
                            role="region"
                            aria-label={`${b.title} Billboard`}
                            className={`metro-billboard metro-billboard-${i} relative flex flex-col justify-between p-6 bg-[#0B0E17]/95 border border-white/10 rounded-sm shadow-[0_12px_30px_rgba(0,0,0,0.8)] transition-all duration-300 outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-500/50 group cursor-default`}
                            style={{
                                boxShadow: `0 14px 35px rgba(0,0,0,0.7), 0 0 20px ${b.glow}`,
                            }}
                        >
                            {/* Top Station Plaque Header */}
                            <div>
                                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                                    <span className="font-mono text-[10px] font-bold tracking-widest text-white/40 group-hover:text-white/70 transition-colors">
                                        {b.code}
                                    </span>
                                    <span
                                        className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10"
                                        style={{ color: b.color, borderColor: `${b.color}40` }}
                                    >
                                        {b.line}
                                    </span>
                                </div>

                                {/* Icon + Title */}
                                <div className="flex items-start gap-3 mb-3">
                                    <div
                                        className="p-2.5 rounded-sm border border-white/10 shrink-0"
                                        style={{ backgroundColor: `${b.color}15`, borderColor: `${b.color}35` }}
                                    >
                                        <b.Icon className="w-4 h-4" style={{ color: b.color }} />
                                    </div>
                                    <h4 className="text-sm font-bold text-white font-mono leading-snug pt-0.5 group-hover:text-blue-300 transition-colors">
                                        {b.title}
                                    </h4>
                                </div>

                                {/* Description */}
                                <p className="text-xs text-white/60 font-light leading-relaxed mb-4">
                                    {b.description}
                                </p>
                            </div>

                            {/* Bottom Deliverables & Tech Tags */}
                            <div className="pt-3 border-t border-white/[0.06] space-y-3">
                                <div>
                                    <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest block mb-1">
                                        KEY DELIVERABLES:
                                    </span>
                                    <span className="text-[11px] text-white/80 font-mono block leading-tight">
                                        {b.deliverables}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {b.tools.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-0.5 bg-white/[0.03] border border-white/[0.06] text-white/50 text-[10px] font-mono rounded-none"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Station Track & Moving Metro Train (Desktop Horizontal Motion) */}
            <div className="relative w-full z-10 pt-4 pb-8 overflow-hidden">
                {/* Yellow Platform Safety Stripe */}
                <div
                    className="w-full h-1.5 bg-amber-400/80 mb-2"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.4) 10px, rgba(0,0,0,0.4) 20px)",
                    }}
                    aria-hidden="true"
                />

                {/* Steel Rail Line */}
                <div className="w-full h-1 bg-white/20 relative" aria-hidden="true">
                    <div className="absolute inset-x-0 -top-1 h-3 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
                </div>

                {/* Metro Train (Moves left -> right across the platform track) */}
                <div
                    className="metro-train pointer-events-none absolute bottom-4 -left-[600px] w-[580px] h-20 will-change-transform hidden md:flex items-center z-20"
                    aria-hidden="true"
                >
                    <svg
                        className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,102,255,0.4)]"
                        viewBox="0 0 580 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id="trainBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#0B132B" />
                                <stop offset="70%" stopColor="#1C2541" />
                                <stop offset="90%" stopColor="#0066FF" />
                                <stop offset="100%" stopColor="#00F0FF" />
                            </linearGradient>
                            <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                                <stop offset="40%" stopColor="#00F0FF" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* Headlight Volumetric Beam */}
                        <polygon points="560,40 700,10 700,70" fill="url(#headlightBeam)" />

                        {/* Train Body Shell */}
                        <path
                            d="M 10 20 L 520 20 C 550 20, 565 35, 565 55 L 565 65 L 10 65 Z"
                            fill="url(#trainBodyGrad)"
                            stroke="#0066FF"
                            strokeWidth="1.5"
                        />

                        {/* Blue Speed Accent Stripe */}
                        <path d="M 10 50 L 565 50" stroke="#00F0FF" strokeWidth="2.5" />

                        {/* Passenger Windows (Warm Illuminated Cabins) */}
                        <rect x="40" y="28" width="55" height="16" rx="2" fill="#FFE57F" fillOpacity="0.85" />
                        <rect x="110" y="28" width="55" height="16" rx="2" fill="#FFE57F" fillOpacity="0.85" />
                        <rect x="180" y="28" width="55" height="16" rx="2" fill="#FFE57F" fillOpacity="0.85" />
                        <rect x="250" y="28" width="55" height="16" rx="2" fill="#FFE57F" fillOpacity="0.85" />
                        <rect x="320" y="28" width="55" height="16" rx="2" fill="#FFE57F" fillOpacity="0.85" />
                        <rect x="390" y="28" width="55" height="16" rx="2" fill="#FFE57F" fillOpacity="0.85" />

                        {/* Sloped Driver Windshield */}
                        <polygon points="465,28 535,28 550,45 465,45" fill="#001833" stroke="#00F0FF" strokeWidth="1" />

                        {/* Headlight Lamp */}
                        <circle cx="560" cy="52" r="4" fill="#FFFFFF" />
                        <circle cx="560" cy="52" r="8" fill="#00F0FF" fillOpacity="0.5" />

                        {/* Wheels & Undercarriage Bogies */}
                        <circle cx="70" cy="68" r="7" fill="#0A0E17" stroke="#374151" strokeWidth="2" />
                        <circle cx="100" cy="68" r="7" fill="#0A0E17" stroke="#374151" strokeWidth="2" />
                        <circle cx="210" cy="68" r="7" fill="#0A0E17" stroke="#374151" strokeWidth="2" />
                        <circle cx="240" cy="68" r="7" fill="#0A0E17" stroke="#374151" strokeWidth="2" />
                        <circle cx="430" cy="68" r="7" fill="#0A0E17" stroke="#374151" strokeWidth="2" />
                        <circle cx="460" cy="68" r="7" fill="#0A0E17" stroke="#374151" strokeWidth="2" />

                        {/* Route Destination Tag */}
                        <text
                            x="230"
                            y="14"
                            fill="#00F0FF"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                            letterSpacing="2"
                        >
                            LINE 01 // AUTONOMOUS SYSTEMS EXP
                        </text>
                    </svg>
                </div>

                {/* Trackside Platform Coordinate Label */}
                <div className="max-w-6xl mx-auto px-6 sm:px-12 pt-3 flex items-center justify-between font-mono text-[10px] text-white/30">
                    <span>TRACK 01 // SOUTHBOUND INFERENCE</span>
                    <span className="hidden sm:inline">SPEED: 120 KM/H SCRUBBED</span>
                    <span>NEXT STOP: PROJECTS ARCHIVE →</span>
                </div>
            </div>
        </section>
    );
}
