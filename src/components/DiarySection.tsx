"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    SiPython,
    SiPytorch,
    SiNextdotjs,
    SiTypescript,
    SiFastapi,
    SiDocker,
    SiPostgresql,
    SiMongodb,
    SiOpenai,
    SiCplusplus,
    SiScikitlearn,
    SiLinux,
} from "react-icons/si";
import { FaQuoteLeft, FaCoffee, FaMicrochip, FaBookOpen, FaCompass } from "react-icons/fa";
import { FaBrain } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

export default function DiarySection() {
    const diaryRef = useRef<HTMLDivElement>(null);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [activeScrollNote, setActiveScrollNote] = useState<number>(0);

    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Desktop (>= 768px): Pinned diary section for 250vh with sequential focus
            mm.add("(min-width: 768px)", () => {
                // Initial styling for scattered cards
                gsap.set(".diary-note", {
                    filter: "blur(4px)",
                    opacity: 0.35,
                    scale: 0.94,
                    zIndex: 1,
                });
                // Note 0 begins in sharp focus
                gsap.set(".diary-note-0", {
                    filter: "blur(0px)",
                    opacity: 1,
                    scale: 1.04,
                    zIndex: 20,
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: diaryRef.current,
                        start: "top top",
                        end: () => `+=${window.innerHeight * 2.5}`,
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        onUpdate: (self) => {
                            const p = self.progress;
                            const noteIndex = Math.min(4, Math.floor(p * 5));
                            setActiveScrollNote(noteIndex);
                        },
                    },
                });

                // Step 1: Note 0 blurs out -> Note 1 comes into focus
                tl.to(".diary-note-0", { filter: "blur(4px)", opacity: 0.35, scale: 0.94, zIndex: 1, duration: 1 }, 0.5)
                  .to(".diary-note-1", { filter: "blur(0px)", opacity: 1, scale: 1.04, zIndex: 25, duration: 1 }, 0.5)

                // Step 2: Note 1 blurs out -> Note 2 comes into focus
                  .to(".diary-note-1", { filter: "blur(4px)", opacity: 0.35, scale: 0.94, zIndex: 1, duration: 1 }, 1.5)
                  .to(".diary-note-2", { filter: "blur(0px)", opacity: 1, scale: 1.04, zIndex: 25, duration: 1 }, 1.5)

                // Step 3: Note 2 blurs out -> Note 3 comes into focus
                  .to(".diary-note-2", { filter: "blur(4px)", opacity: 0.35, scale: 0.94, zIndex: 1, duration: 1 }, 2.5)
                  .to(".diary-note-3", { filter: "blur(0px)", opacity: 1, scale: 1.04, zIndex: 25, duration: 1 }, 2.5)

                // Step 4: Note 3 blurs out -> Note 4 comes into focus
                  .to(".diary-note-3", { filter: "blur(4px)", opacity: 0.35, scale: 0.94, zIndex: 1, duration: 1 }, 3.5)
                  .to(".diary-note-4", { filter: "blur(0px)", opacity: 1, scale: 1.04, zIndex: 25, duration: 1 }, 3.5);
            });

            // Mobile (< 768px): Scroll-driven spotlight on active diary note + telemetry sync
            mm.add("(max-width: 767px)", () => {
                const notes = gsap.utils.toArray<HTMLElement>(".diary-note");

                notes.forEach((note, index) => {
                    ScrollTrigger.create({
                        trigger: note,
                        start: "top 60%",
                        end: "bottom 40%",
                        onEnter: () => setActiveScrollNote(index),
                        onEnterBack: () => setActiveScrollNote(index),
                    });

                    gsap.fromTo(
                        note,
                        { opacity: 0.5, scale: 0.96, y: 20 },
                        {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: note,
                                start: "top 88%",
                                end: "top 45%",
                                scrub: 0.6,
                            },
                        }
                    );
                });
            });
        }, diaryRef);

        return () => ctx.revert();
    }, []);

    const techStack = [
        { name: "Python", Icon: SiPython, color: "#3776AB" },
        { name: "PyTorch", Icon: SiPytorch, color: "#EE4C2C" },
        { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
        { name: "Next.js 16", Icon: SiNextdotjs, color: "#FFFFFF" },
        { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
        { name: "Scikit-Learn", Icon: SiScikitlearn, color: "#F7931E" },
        { name: "Docker", Icon: SiDocker, color: "#2496ED" },
        { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
        { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
        { name: "C++", Icon: SiCplusplus, color: "#00599C" },
        { name: "Linux", Icon: SiLinux, color: "#FCC624" },
    ];

    return (
        <section
            ref={diaryRef}
            id="diary"
            className="diary relative w-full min-h-screen bg-[#060608] text-[#F3F2EE] z-20 py-10 md:py-0 overflow-hidden flex flex-col justify-between"
            aria-label="Engineering Diary and Sticky Notes"
        >
            {/* Ambient desk background with subtle grid lines */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Top Header / Index Bar */}
            <div className="z-10 w-full max-w-6xl mx-auto px-4 sm:px-12 pt-6 pb-4 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-blue-400 font-semibold tracking-widest uppercase">
                        [02.DIARY]
                    </span>
                    <span className="text-white/20">•</span>
                    <h2 className="font-mono text-xs text-white/70 uppercase tracking-widest">
                        FIELD NOTES &amp; CORE REPERTOIRE
                    </h2>
                </div>

                {/* Delhi Metro STN 01 Plaque */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 font-mono text-[11px] text-cyan-300 shadow-[0_0_15px_rgba(0,102,255,0.15)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span className="font-bold">STN 01</span>
                    <span className="text-white/30">|</span>
                    <span>लेटेंट स्पेस</span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/80">LATENT SPACE ORIGIN</span>
                </div>

                {/* Active Note Indicator (Desktop) */}
                <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-white/40">
                    <span>ENTRY</span>
                    {[0, 1, 2, 3, 4].map((idx) => (
                        <span
                            key={idx}
                            className={`w-5 h-5 flex items-center justify-center border text-[10px] transition-colors ${
                                activeScrollNote === idx
                                    ? "border-blue-400 text-blue-400 bg-blue-500/10 font-bold"
                                    : "border-white/10 text-white/30"
                            }`}
                        >
                            {idx + 1}
                        </span>
                    ))}
                    <span className="text-white/20 ml-2">SCROLL TO DISCOVER</span>
                </div>
            </div>

            {/* Scattered Notes Container (Desktop: Pinned Canvas; Mobile: Stacked Vertical Flow) */}
            <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-12 py-6 md:py-10 md:my-auto md:h-[720px] flex flex-col md:block gap-6 md:gap-0">
                
                {/* NOTE 1: TECH STACK */}
                <div
                    tabIndex={0}
                    role="region"
                    aria-label="Tech Stack Note"
                    onFocus={() => setFocusedIndex(0)}
                    onBlur={() => setFocusedIndex(null)}
                    className={`diary-note diary-note-0 md:absolute md:top-6 md:left-4 lg:left-8 w-full md:w-[380px] p-5 sm:p-6 bg-[#0E1118]/95 border border-blue-500/30 shadow-[0_16px_36px_rgba(0,0,0,0.65),0_0_20px_rgba(0,102,255,0.12)] rounded-sm rotate-0 md:rotate-[-2deg] transition-all duration-300 outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer ${
                        focusedIndex === 0 ? "!opacity-100 !blur-0 !scale-105 !z-30 ring-1 ring-blue-400" : ""
                    }`}
                >
                    {/* Paper tape strip on top */}
                    <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-white/[0.08] backdrop-blur-md border border-white/20 rotate-[1deg]" />

                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400" />
                            <span className="font-mono text-[10px] text-blue-300 font-semibold tracking-wider uppercase">
                                NOTE 01 // PRODUCTION ARSENAL
                            </span>
                        </div>
                        <span className="font-mono text-[10px] text-white/30">CORE STACK</span>
                    </div>

                    <p className="text-xs text-white/60 mb-4 font-light leading-relaxed">
                        Technologies verified in production and autonomous flight testing pipelines:
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {techStack.map(({ name, Icon, color }) => (
                            <div
                                key={name}
                                className="flex items-center gap-1.5 p-2 rounded bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/40 transition-colors"
                            >
                                <Icon className="w-3.5 h-3.5 shrink-0" style={{ color }} />
                                <span className="font-mono text-[10px] text-white/80 whitespace-nowrap">{name}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-white/40">
                        <span>Runtime: Deterministic</span>
                        <span className="text-blue-400">Strict Typing</span>
                    </div>
                </div>

                {/* NOTE 2: ORIGIN STORY */}
                <div
                    tabIndex={0}
                    role="region"
                    aria-label="Origin Story Note"
                    onFocus={() => setFocusedIndex(1)}
                    onBlur={() => setFocusedIndex(null)}
                    className={`diary-note diary-note-1 md:absolute md:top-4 md:right-4 lg:right-10 w-full md:w-[410px] p-5 sm:p-6 bg-[#10141F]/95 border border-white/15 shadow-[0_18px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(59,130,246,0.1)] rounded-sm rotate-0 md:rotate-[2.5deg] transition-all duration-300 outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer ${
                        focusedIndex === 1 ? "!opacity-100 !blur-0 !scale-105 !z-30 ring-1 ring-blue-400" : ""
                    }`}
                >
                    {/* Paper tape strip on top */}
                    <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-white/[0.08] backdrop-blur-md border border-white/20 rotate-[-1deg]" />

                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400" />
                            <span className="font-mono text-[10px] text-cyan-300 font-semibold tracking-wider uppercase">
                                NOTE 02 // ORIGIN &amp; RIGOR
                            </span>
                        </div>
                        <span className="font-mono text-[10px] text-white/30">NXTWAVE &bull; TIHAN IIT-H</span>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-2 font-mono">
                        From Hardware Sensors to Latent Space
                    </h3>

                    <p className="text-xs text-white/75 leading-relaxed font-light space-y-2">
                        I entered computing through autonomous hardware. Pursuing CS with specialization in{" "}
                        <strong className="text-white font-medium">Artificial Intelligence &amp; Data Science</strong> at{" "}
                        <span className="text-cyan-300">Nxtwave (2025–2029)</span>, alongside a minor in{" "}
                        <strong className="text-white font-medium">AI &amp; Drone Technology at TiHAN, IIT Hyderabad</strong>.
                    </p>

                    <p className="text-xs text-white/60 leading-relaxed font-light mt-3">
                        Operating UAV optical telemetry taught me that real physical inputs have jitter, packet loss, and frame drops.
                        Theory breaks down without rigorous defensive engineering.
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-white/40">
                        <span>Field: UAV &bull; AI/DS</span>
                        <span className="text-cyan-300">Grounded in Hardware</span>
                    </div>
                </div>

                {/* NOTE 3: CURRENT FOCUS */}
                <div
                    tabIndex={0}
                    role="region"
                    aria-label="Current Focus Note"
                    onFocus={() => setFocusedIndex(2)}
                    onBlur={() => setFocusedIndex(null)}
                    className={`diary-note diary-note-2 md:absolute md:top-[28%] md:left-1/2 md:-translate-x-1/2 w-full md:w-[440px] p-5 sm:p-6 bg-[#0B1324]/95 border border-indigo-500/40 shadow-[0_20px_45px_rgba(0,0,0,0.75),0_0_25px_rgba(99,102,241,0.2)] rounded-sm rotate-0 md:rotate-[-1.5deg] transition-all duration-300 outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer ${
                        focusedIndex === 2 ? "!opacity-100 !blur-0 !scale-105 !z-30 ring-1 ring-indigo-400" : ""
                    }`}
                >
                    {/* Paper tape strip on top */}
                    <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-indigo-400/20 backdrop-blur-md border border-indigo-400/30 rotate-[0.5deg]" />

                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                            <span className="font-mono text-[10px] text-indigo-300 font-semibold tracking-wider uppercase">
                                NOTE 03 // CURRENT FOCUS
                            </span>
                        </div>
                        <span className="font-mono text-[10px] text-indigo-300/60 uppercase">ACTIVE R&amp;D</span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 font-mono">
                        Agentic Workflows &amp; Verifiable RAG
                    </h3>

                    <p className="text-xs text-white/70 leading-relaxed font-light mb-4">
                        Right now, I am engineering AI that doesn&apos;t just generate conversational tokens, but safely acts:
                    </p>

                    <div className="space-y-2.5">
                        <div className="p-2.5 rounded bg-white/[0.02] border border-white/[0.06] flex items-start gap-2.5">
                            <FaBrain className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                            <div>
                                <h4 className="text-xs text-white font-medium">Autonomous Tool Execution</h4>
                                <p className="text-[11px] text-white/50">Bounded agent loops with Pydantic/Zod schema enforcement.</p>
                            </div>
                        </div>

                        <div className="p-2.5 rounded bg-white/[0.02] border border-white/[0.06] flex items-start gap-2.5">
                            <FaCompass className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                            <div>
                                <h4 className="text-xs text-white font-medium">High-Recall RAG Pipelines</h4>
                                <p className="text-[11px] text-white/50">Dense vector projections + re-ranking to defeat hallucination.</p>
                            </div>
                        </div>

                        {/* Founder Venture Stamp Callout */}
                        <div className="p-2.5 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-between gap-2">
                            <div>
                                <span className="font-mono text-[9px] text-cyan-300 font-bold uppercase block tracking-wider">FOUNDER VENTURES</span>
                                <p className="text-[11px] text-white/85 font-medium">NeuralWaves &amp; MENANCE Clothing</p>
                            </div>
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0 font-semibold">
                                2 CLIENTS IN DUBAI
                            </span>
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-white/40">
                        <span>Architecture &bull; Ventures</span>
                        <span className="text-indigo-400">Enterprise Scale</span>
                    </div>
                </div>

                {/* NOTE 4: PERSONAL DETAIL */}
                <div
                    tabIndex={0}
                    role="region"
                    aria-label="Personal Ritual Note"
                    onFocus={() => setFocusedIndex(3)}
                    onBlur={() => setFocusedIndex(null)}
                    className={`diary-note diary-note-3 md:absolute md:bottom-6 md:left-6 lg:left-14 w-full md:w-[360px] p-5 sm:p-6 bg-[#121015]/95 border border-amber-500/25 shadow-[0_16px_36px_rgba(0,0,0,0.65),0_0_20px_rgba(245,158,11,0.1)] rounded-sm rotate-0 md:rotate-[1.8deg] transition-all duration-300 outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer ${
                        focusedIndex === 3 ? "!opacity-100 !blur-0 !scale-105 !z-30 ring-1 ring-amber-400" : ""
                    }`}
                >
                    {/* Paper tape strip on top */}
                    <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-amber-500/10 backdrop-blur-md border border-amber-500/20 rotate-[-1deg]" />

                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <span className="font-mono text-[10px] text-amber-300 font-semibold tracking-wider uppercase">
                                NOTE 04 // BEHIND THE TERMINAL
                            </span>
                        </div>
                        <FaCoffee className="w-3.5 h-3.5 text-amber-400/70" />
                    </div>

                    {/* Pull Statement */}
                    <div className="relative pl-4 border-l-2 border-amber-400/80 my-3">
                        <FaQuoteLeft className="absolute -top-1 left-1 w-2.5 h-2.5 text-amber-400/40" />
                        <p className="text-xs text-white/90 italic font-serif leading-relaxed">
                            &ldquo;The gap between a model producing interesting outputs in a Jupyter notebook and a system delivering verifiable utility in production is where actual engineering happens.&rdquo;
                        </p>
                    </div>

                    <p className="text-[11px] text-white/55 leading-relaxed font-light mt-3">
                        <strong className="text-amber-200/90 font-medium">Daily Fuel:</strong> Aeropress black coffee at 1:00 AM while dissecting raw sensor logs and fine-tuning embeddings.
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-white/40">
                        <span>Ritual: Midnight Coffee</span>
                        <span className="text-amber-300/80">Continuous Builder</span>
                    </div>
                </div>

                {/* NOTE 5: CURRENTLY LEARNING */}
                <div
                    tabIndex={0}
                    role="region"
                    aria-label="Currently Learning Note"
                    onFocus={() => setFocusedIndex(4)}
                    onBlur={() => setFocusedIndex(null)}
                    className={`diary-note diary-note-4 md:absolute md:bottom-4 md:right-6 lg:right-12 w-full md:w-[390px] p-5 sm:p-6 bg-[#08151D]/95 border border-emerald-500/30 shadow-[0_16px_36px_rgba(0,0,0,0.65),0_0_20px_rgba(16,185,129,0.12)] rounded-sm rotate-0 md:rotate-[-2.8deg] transition-all duration-300 outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer ${
                        focusedIndex === 4 ? "!opacity-100 !blur-0 !scale-105 !z-30 ring-1 ring-emerald-400" : ""
                    }`}
                >
                    {/* Paper tape strip on top */}
                    <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 rotate-[1.5deg]" />

                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span className="font-mono text-[10px] text-emerald-300 font-semibold tracking-wider uppercase">
                                NOTE 05 // CURRENTLY LEARNING
                            </span>
                        </div>
                        <FaMicrochip className="w-3.5 h-3.5 text-emerald-400/70" />
                    </div>

                    <h3 className="text-sm font-bold text-white mb-2 font-mono">
                        Hardware Kernels &amp; State Space Models
                    </h3>

                    <p className="text-xs text-white/70 leading-relaxed font-light mb-3">
                        Constantly sharpening the lower levels of the software stack:
                    </p>

                    <ul className="text-xs text-white/60 space-y-2 list-none">
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-400 font-mono text-[11px]">&bull;</span>
                            <span><strong>Mamba &amp; State Space Models (SSM):</strong> Sub-quadratic sequence modeling.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-400 font-mono text-[11px]">&bull;</span>
                            <span><strong>vLLM &amp; PagedAttention:</strong> GPU memory paging and high-throughput serving.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-400 font-mono text-[11px]">&bull;</span>
                            <span><strong>Multi-Agent Consensus:</strong> Deterministic task delegation protocols.</span>
                        </li>
                    </ul>

                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-white/40">
                        <span>Frontier Exploration</span>
                        <span className="text-emerald-400">Deepening Foundations</span>
                    </div>
                </div>

            </div>

            {/* Bottom Footer Telemetry */}
            <div className="z-10 w-full max-w-6xl mx-auto px-4 sm:px-12 pt-4 pb-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-white/40">
                <div className="flex items-center gap-3">
                    <span className="text-blue-400">STATUS:</span>
                    <span>DIARY ENTRIES SYNCHRONIZED</span>
                    <span className="text-white/20">•</span>
                    <span>5 ANNOTATIONS RECORDED</span>
                </div>

                <div className="flex items-center gap-2 text-white/50">
                    <span className="uppercase tracking-widest text-[10px]">SCROLL TOWARD SECTION 03: METRO EXPERTISE</span>
                    <span className="text-blue-400">↓</span>
                </div>
            </div>
        </section>
    );
}
