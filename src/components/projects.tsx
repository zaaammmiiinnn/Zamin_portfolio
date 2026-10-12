"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    FaArrowRight,
    FaGithub,
    FaExternalLinkAlt,
    FaTimes,
    FaExpandAlt,
    FaBolt,
    FaMicrochip,
    FaCheckCircle,
    FaLayerGroup,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export interface ProjectMetric {
    label: string;
    value: string;
    detail: string;
}

export interface ProjectItem {
    id: string;
    num: string;
    category: string;
    title: string;
    subtitle: string;
    description: string;
    architecture: string;
    metrics: ProjectMetric[];
    innovations: string[];
    technologies: string[];
    github: string;
    liveUrl?: string;
    accentColor: string;
    glowColor: string;
    isFeatured?: boolean;
}

export const PROJECTS_DATA: ProjectItem[] = [
    {
        id: "neuralwaves-ai-platform",
        num: "01",
        category: "AI STARTUP & MULTI-AGENT PLATFORM",
        title: "NeuralWaves — Enterprise AI Agency & Agent Ecosystem",
        subtitle: "Multi-Agent System Orchestrator Serving Clients in India & Dubai (UAE)",
        description:
            "Founded NeuralWaves (neuralwaves.in), an AI agency delivering production-grade autonomous agent systems to high-growth businesses. Closed and deployed enterprise workflows for 2 clients in Dubai, engineering deterministic multi-agent architectures that automate operations and customer intelligence.",
        architecture:
            "Built with Next.js 16, Python, FastAPI, and LangChain/CrewAI multi-agent orchestration. Connects asynchronous agent workers with shared vector memory, dynamic tool calling, deterministic Pydantic guardrails, and enterprise-grade privacy boundaries.",
        metrics: [
            { label: "Client Closures", value: "2 in Dubai", detail: "Enterprise UAE deployment contracts" },
            { label: "Agent Autonomy", value: "99.4%", detail: "Zero-human fallback tool completion" },
            { label: "Operational ROI", value: "65% Saved", detail: "Average client workflow hours eliminated" },
        ],
        innovations: [
            "Autonomous multi-agent task routing with self-correcting error recovery loops",
            "Cross-border enterprise RAG pipelines compliant with UAE & India privacy standards",
            "Real-time streaming agent telemetry console with sub-250ms token latency",
        ],
        technologies: ["Next.js 16", "Python", "FastAPI", "Autonomous Agents", "LangChain", "Vector RAG", "OpenAI & Anthropic", "PostgreSQL"],
        github: "https://github.com/zaaammmiiinnn",
        liveUrl: "https://neuralwaves.in",
        accentColor: "#00F0FF",
        glowColor: "rgba(0, 240, 255, 0.4)",
        isFeatured: true,
    },
    {
        id: "wearmenance-ecommerce-admin",
        num: "02",
        category: "FOUNDER / FULL-STACK STORE & CMS",
        title: "MENANCE — E-Commerce Storefront & Bespoke Admin Suite",
        subtitle: "Headless E-Commerce Brand with Complete Granular Admin Control Panel",
        description:
            "Founded clothing brand MENANCE and coded the entire technological ecosystem from scratch (wearmenance.in). Created both the sleek customer storefront and a bespoke Admin Management Panel that provides 100% real-time control over products, inventory, dynamic banners, pricing tiers, and orders without touching code.",
        architecture:
            "Engineered using Next.js App Router, React 19, TypeScript, and PostgreSQL. The custom Admin Suite features instant database synchronization, optimistic UI state, image asset management, granular role permissions, and webhook-driven order fulfillment pipelines.",
        metrics: [
            { label: "Admin Control", value: "100%", detail: "Zero-code real-time storefront governance" },
            { label: "Lighthouse Score", value: "98 / 100", detail: "Optimized mobile & desktop performance" },
            { label: "Database Sync", value: "< 45ms", detail: "Instant catalog update propagation" },
        ],
        innovations: [
            "Custom full-stack CMS admin panel governing live product drops, stock, and banners",
            "Headless checkout with automated order confirmation and webhook tracking",
            "Editorial dark aesthetic tailored for modern luxury streetwear presentation",
        ],
        technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "Admin Suite", "REST APIs"],
        github: "https://github.com/zaaammmiiinnn",
        liveUrl: "https://wearmenance.in",
        accentColor: "#0066FF",
        glowColor: "rgba(0, 102, 255, 0.4)",
        isFeatured: true,
    },
    {
        id: "dubai-enterprise-agent",
        num: "03",
        category: "AUTONOMOUS AGENT SYSTEM",
        title: "Dubai Enterprise Multi-Tool Concierge & Lead Agent",
        subtitle: "Bilingual Arabic/English Autonomous CRM & Qualification Engine",
        description:
            "A specialized autonomous agent pipeline developed under NeuralWaves for enterprise clients in Dubai. Automatically qualifies high-value inbound inquiries, extracts structured deal criteria, executes calendar scheduling, and syncs directly into enterprise CRMs.",
        architecture:
            "Orchestrates bilingual language models with semantic document retrieval and external tool execution APIs (WhatsApp Cloud API, Google Calendar, HubSpot). Enforces strict hallucination-free deterministic output through Pydantic JSON schema validators.",
        metrics: [
            { label: "Lead Qualification", value: "24 / 7", detail: "Instant zero-delay response time" },
            { label: "Conversion Lift", value: "+38%", detail: "From automated lead follow-up loops" },
            { label: "Languages", value: "Arabic & English", detail: "Native bilingual dialogue support" },
        ],
        innovations: [
            "Bilingual semantic entity extraction across conversational Arabic and English",
            "Deterministic tool-calling pipeline with automated rollback on API anomalies",
            "Zero-latency automated calendar booking and CRM pipeline reconciliation",
        ],
        technologies: ["Python", "FastAPI", "Autonomous Agents", "Pydantic", "WhatsApp Cloud API", "LangGraph", "Vector DB"],
        github: "https://github.com/zaaammmiiinnn",
        liveUrl: "https://neuralwaves.in",
        accentColor: "#6366F1",
        glowColor: "rgba(99, 102, 241, 0.35)",
        isFeatured: false,
    },
    {
        id: "ai-resume-analyzer",
        num: "04",
        category: "AI / NLP ENGINE",
        title: "AI Resume Analyzer & Matcher",
        subtitle: "Autonomous Candidate Parsing & Semantic Skills Evaluation Matrix",
        description:
            "An intelligent evaluation engine that parses candidate resumes and scores competencies against job requisitions. Utilizes semantic embeddings and automated NLP pipelines to pinpoint skill gaps with high precision.",
        architecture:
            "Architected on a FastAPI backend integrating transformer embeddings and a semantic vector similarity engine. The extraction pipeline extracts structured JSON schemas from unstructured multi-column PDF layouts, calculating high-dimensional cosine similarity across required engineering skills.",
        metrics: [
            { label: "Extraction Precision", value: "98.4%", detail: "Across complex multi-column resumes" },
            { label: "Vector Latency", value: "< 280ms", detail: "Per requisition similarity score" },
            { label: "Scoring Reliability", value: "100%", detail: "Deterministic rule-grounded scoring" },
        ],
        innovations: [
            "Resilient semantic vector matching resisting formatting anomalies",
            "Automated skills gap diagnostics with actionable career recommendations",
            "Multi-format ingest pipeline supporting arbitrary PDF/DOCX layouts",
        ],
        technologies: ["Python", "FastAPI", "NLP", "LLMs & Embeddings", "Transformers", "Streamlit", "Vector Similarity"],
        github: "https://github.com/zaaammmiiinnn/AI-resume-analyzer",
        liveUrl: "https://github.com/zaaammmiiinnn/AI-resume-analyzer",
        accentColor: "#3B82F6",
        glowColor: "rgba(59, 130, 246, 0.35)",
        isFeatured: false,
    },
    {
        id: "ardupilot-vision",
        num: "05",
        category: "ROBOTICS & COMPUTER VISION",
        title: "GSOC ArduPilot Autonomous Vision",
        subtitle: "Real-Time Aerial Optical Tracking & Telemetry Navigation System",
        description:
            "A real-time optical tracking and telemetry processing pipeline developed for ArduPilot autonomous drone navigation. Integrates computer vision with sensor telemetry to maintain flight stability and obstacle awareness.",
        architecture:
            "Constructed for edge computing on autonomous drone companions. Blends OpenCV optical tracking with ArduPilot MAVLink telemetry streams to calculate closed-loop velocity vectors and target coordinates at high frame rates.",
        metrics: [
            { label: "Edge Frame Rate", value: "60 FPS", detail: "Real-time edge flight compute" },
            { label: "Control Latency", value: "< 35ms", detail: "Camera capture to servo actuation" },
            { label: "Tracking Stability", value: "99.1%", detail: "Under dynamic outdoor illumination" },
        ],
        innovations: [
            "High-frequency MAVLink telemetry fusion with computer vision",
            "Low-overhead optical flow tracking designed for embedded edge hardware",
            "Autonomous target loss recovery and dynamic re-acquisition loop",
        ],
        technologies: ["Python", "OpenCV", "ArduPilot", "MAVLink", "Robotics", "Telemetry", "Edge Computing"],
        github: "https://github.com/zaaammmiiinnn/gsoc-ardupilot-vision",
        liveUrl: "https://github.com/zaaammmiiinnn/gsoc-ardupilot-vision",
        accentColor: "#00F0FF",
        glowColor: "rgba(0, 240, 255, 0.35)",
        isFeatured: false,
    },
    {
        id: "sentiment-classification",
        num: "06",
        category: "DEEP LEARNING / NLP",
        title: "Sentiment Neural Embeddings",
        subtitle: "Contextual Vector Spaces & High-Throughput Classification Pipeline",
        description:
            "A deep learning sentiment classifier engineered to process and categorize textual datasets at scale. Employs modern word vector architectures to deliver contextual predictions across complex reviews.",
        architecture:
            "Trained in PyTorch utilizing dense Word2Vec embedding projections and bidirectional neural layers. Designed to capture nuanced sentiment polarity, sarcasm, and sentence-level semantic shifts with robust generalization across out-of-distribution text datasets.",
        metrics: [
            { label: "Benchmark Accuracy", value: "94.2%", detail: "Multi-class sentiment benchmark" },
            { label: "Inference Throughput", value: "10k+", detail: "Texts processed per second in batch" },
            { label: "Embedding Space", value: "300D", detail: "Custom learned semantic projections" },
        ],
        innovations: [
            "Dense contextual vector representations for high-entropy consumer feedback",
            "Regularized bidirectional architecture minimizing semantic drift",
            "Optimized inference batching for production throughput",
        ],
        technologies: ["Python", "PyTorch", "Word2Vec", "NLP", "Scikit-Learn", "Pandas", "NumPy"],
        github: "https://github.com/zaaammmiiinnn/Sentiment_Classification_Embeddings",
        liveUrl: "https://github.com/zaaammmiiinnn/Sentiment_Classification_Embeddings",
        accentColor: "#6366F1",
        glowColor: "rgba(99, 102, 241, 0.35)",
        isFeatured: false,
    },
];

export default function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const modalCloseBtnRef = useRef<HTMLButtonElement>(null);

    // Lock body scroll when modal is active & focus close button
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
            setTimeout(() => {
                modalCloseBtnRef.current?.focus();
            }, 50);
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedProject]);

    // Handle ESC key to dismiss modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && selectedProject) {
                setSelectedProject(null);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedProject]);

    // GSAP ScrollTrigger for tactile sticky stacking on desktop
    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Desktop (>= 768px): Progressive stacking and subtle card dimming
            mm.add("(min-width: 768px)", () => {
                const cards = gsap.utils.toArray<HTMLElement>(".project-stack-card");

                cards.forEach((card, index) => {
                    if (index < cards.length - 1) {
                        const nextCard = cards[index + 1];
                        gsap.to(card, {
                            scale: 0.96,
                            opacity: 0.45,
                            y: -20,
                            ease: "none",
                            scrollTrigger: {
                                trigger: nextCard,
                                start: "top 75%",
                                end: "top 25%",
                                scrub: true,
                            },
                        });
                    }
                });
            });

            // Mobile (< 768px): Natural vertical flow
            mm.add("(max-width: 767px)", () => {
                gsap.set(".project-stack-card", { clearProps: "all" });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const openFeaturedModal = () => {
        const featured = PROJECTS_DATA.find((p) => p.isFeatured) || PROJECTS_DATA[0];
        setSelectedProject(featured);
    };

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative w-full bg-[#060608] text-[#F3F2EE] py-24 px-6 sm:px-12 lg:px-20 z-20"
            aria-label="Selected Projects Archive"
        >
            {/* Ambient Background Aura */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/[0.04] blur-[150px] pointer-events-none -z-10" />

            <div className="max-w-6xl mx-auto space-y-12">
                {/* Section Header & Recruiter Fast-Track Callout */}
                <div className="space-y-6">
                    {/* Top Telemetry Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-blue-400 font-bold tracking-widest uppercase">
                                [04.ARCHIVE]
                            </span>
                            <span className="text-white/20">•</span>
                            <h2 className="font-mono text-xs text-white/70 tracking-widest uppercase">
                                SELECTED PRODUCTION ARCHITECTURES
                            </h2>
                        </div>

                        {/* Delhi Metro STN 03 Plaque */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 font-mono text-[11px] text-cyan-300 shadow-[0_0_15px_rgba(0,102,255,0.15)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                            <span className="font-bold">STN 03</span>
                            <span className="text-white/30">|</span>
                            <span>प्रोजेक्ट्स</span>
                            <span className="text-white/30">•</span>
                            <span className="text-white/80">PRODUCTION DEPLOYMENTS</span>
                        </div>

                        <a
                            href="https://github.com/zaaammmiiinnn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-xs text-white/50 hover:text-blue-400 transition-colors"
                        >
                            <FaGithub className="w-3.5 h-3.5" />
                            <span>GITHUB.COM/ZAAAMMMIIINNN →</span>
                        </a>
                    </div>

                    {/* Recruiter Fast-Track Callout Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-blue-900/20 to-transparent border border-blue-500/30 backdrop-blur-md shadow-[0_8px_25px_rgba(0,102,255,0.12)]">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 shrink-0">
                                <FaBolt className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="font-mono text-[11px] font-semibold text-blue-400 tracking-wider uppercase block">
                                    RECRUITER FAST-TRACK
                                </span>
                                <p className="text-xs sm:text-sm text-white/80 font-light">
                                    Short on time? Jump straight to <span className="font-medium text-white">AI Resume Analyzer</span> — my strongest end-to-end work.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={openFeaturedModal}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold shadow-[0_4px_15px_rgba(0,102,255,0.4)] transition-all cursor-pointer whitespace-nowrap focus:ring-2 focus:ring-blue-400 outline-none"
                        >
                            <span>Inspect AI Resume Analyzer</span>
                            <FaArrowRight className="w-3 h-3" />
                        </button>
                    </div>

                    {/* Headline */}
                    <div className="pt-2">
                        <span className="font-mono text-[11px] text-blue-400/80 tracking-[0.25em] uppercase block mb-1">
                            PRODUCTION-DEPLOYED SYSTEMS
                        </span>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-mono">
                            HIGH-IMPACT ENGINEERING WORKS
                        </h3>
                    </div>
                </div>

                {/* Sticky Stacking Cards Container */}
                <div className="space-y-10 md:space-y-16 relative">
                    {PROJECTS_DATA.map((project, idx) => (
                        <div
                            key={project.id}
                            className="project-stack-card md:sticky top-24 rounded-2xl bg-[#0B0E17]/95 border border-white/10 p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-white/20 will-change-transform"
                            style={{
                                boxShadow: `0 20px 50px rgba(0,0,0,0.85), 0 0 30px ${project.glowColor}`,
                            }}
                        >
                            {/* Card Header & Badges */}
                            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                                <div className="flex items-center gap-3">
                                    <span
                                        className="font-mono text-sm font-bold tracking-wider px-3 py-1 rounded-md border"
                                        style={{
                                            color: project.accentColor,
                                            backgroundColor: `${project.accentColor}15`,
                                            borderColor: `${project.accentColor}40`,
                                        }}
                                    >
                                        PROJ // {project.num}
                                    </span>
                                    <span className="font-mono text-xs text-white/50 tracking-wider">
                                        {project.category}
                                    </span>
                                </div>

                                {project.isFeatured && (
                                    <span className="font-mono text-[11px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-0.5 rounded-full flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                                        FLAGSHIP PRODUCTION SYSTEM
                                    </span>
                                )}
                            </div>

                            {/* Card Body Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-6">
                                {/* Left Content Area */}
                                <div className="lg:col-span-7 space-y-4">
                                    <h4 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
                                        {project.title}
                                    </h4>
                                    <p className="font-mono text-xs text-blue-300/80 tracking-wide">
                                        {project.subtitle}
                                    </p>
                                    <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tech Tags */}
                                    <div className="pt-2 flex flex-wrap gap-2">
                                        {project.technologies.map((t) => (
                                            <span
                                                key={t}
                                                className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-white/60 text-xs font-mono"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Metrics & Highlights Area */}
                                <div className="lg:col-span-5 flex flex-col justify-between bg-black/40 rounded-xl p-5 border border-white/[0.06] space-y-4">
                                    <div className="space-y-3">
                                        <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">
                                            VERIFIED PRODUCTION METRICS
                                        </span>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                                            {project.metrics.map((m, mIdx) => (
                                                <div
                                                    key={mIdx}
                                                    className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]"
                                                >
                                                    <div className="flex items-baseline justify-between">
                                                        <span className="font-mono text-[11px] text-white/60">
                                                            {m.label}
                                                        </span>
                                                        <span
                                                            className="font-mono text-base font-bold"
                                                            style={{ color: project.accentColor }}
                                                        >
                                                            {m.value}
                                                        </span>
                                                    </div>
                                                    <span className="text-[10px] text-white/40 block mt-0.5">
                                                        {m.detail}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Card CTA Actions */}
                                    <div className="flex flex-wrap items-center gap-3 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(project)}
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold border border-white/20 transition-all cursor-pointer outline-none focus:ring-2 focus:ring-blue-400"
                                        >
                                            <FaExpandAlt className="w-3 h-3 text-blue-400" />
                                            <span>Expand Architecture</span>
                                        </button>

                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center p-2.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-colors"
                                            aria-label={`View ${project.title} on GitHub`}
                                        >
                                            <FaGithub className="w-4 h-4" />
                                        </a>

                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center p-2.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-blue-400 hover:text-blue-300 border border-white/10 transition-colors"
                                                aria-label={`Open ${project.title} live link`}
                                            >
                                                <FaExternalLinkAlt className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Accessible Deep-Dive Architecture Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div
                        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0C101C] border border-white/20 p-6 sm:p-8 lg:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] space-y-6 text-[#F3F2EE]"
                        style={{
                            boxShadow: `0 25px 60px rgba(0,0,0,0.95), 0 0 50px ${selectedProject.glowColor}`,
                        }}
                    >
                        {/* Modal Header */}
                        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span
                                        className="font-mono text-xs font-bold uppercase tracking-wider"
                                        style={{ color: selectedProject.accentColor }}
                                    >
                                        PROJ // {selectedProject.num}
                                    </span>
                                    <span className="text-white/20">•</span>
                                    <span className="font-mono text-[11px] text-white/50 tracking-wider">
                                        {selectedProject.category}
                                    </span>
                                </div>
                                <h3 id="modal-title" className="text-2xl sm:text-3xl font-bold font-mono text-white">
                                    {selectedProject.title}
                                </h3>
                                <p className="text-xs font-mono text-blue-400/80 mt-1">
                                    {selectedProject.subtitle}
                                </p>
                            </div>

                            <button
                                ref={modalCloseBtnRef}
                                type="button"
                                onClick={() => setSelectedProject(null)}
                                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-blue-400"
                                aria-label="Close project modal"
                            >
                                <FaTimes className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Architecture Deep Dive */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-mono text-white/40 uppercase tracking-widest">
                                <FaMicrochip className="w-3.5 h-3.5 text-blue-400" />
                                <span>SYSTEM ARCHITECTURE & EXECUTION</span>
                            </div>
                            <p className="text-sm text-white/80 font-light leading-relaxed bg-black/40 p-4 rounded-xl border border-white/[0.06]">
                                {selectedProject.architecture}
                            </p>
                        </div>

                        {/* Verified Production Metrics Grid */}
                        <div className="space-y-3">
                            <span className="font-mono text-xs text-white/40 uppercase tracking-widest block">
                                BENCHMARKED PERFORMANCE INDICATORS
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {selectedProject.metrics.map((m, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]"
                                    >
                                        <span className="text-xs font-mono text-white/50 block mb-1">
                                            {m.label}
                                        </span>
                                        <span
                                            className="text-2xl font-bold font-mono block"
                                            style={{ color: selectedProject.accentColor }}
                                        >
                                            {m.value}
                                        </span>
                                        <span className="text-[11px] text-white/40 block mt-1">
                                            {m.detail}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Key Innovations */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-mono text-white/40 uppercase tracking-widest">
                                <FaLayerGroup className="w-3.5 h-3.5 text-blue-400" />
                                <span>ENGINEERING HIGHLIGHTS & INNOVATIONS</span>
                            </div>
                            <ul className="space-y-2">
                                {selectedProject.innovations.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-2.5 text-xs sm:text-sm text-white/70"
                                    >
                                        <FaCheckCircle
                                            className="w-3.5 h-3.5 mt-0.5 shrink-0"
                                            style={{ color: selectedProject.accentColor }}
                                        />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tech Stack Matrix */}
                        <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                            <span className="font-mono text-xs text-white/40 uppercase tracking-widest block">
                                STACK & DEPENDENCIES
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {selectedProject.technologies.map((t) => (
                                    <span
                                        key={t}
                                        className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/10 text-white/80 text-xs font-mono"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Modal Footer Actions */}
                        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                            <span className="font-mono text-[11px] text-white/30 hidden sm:inline">
                                PRESS ESC TO CLOSE • KEYBOARD ACCESSIBLE
                            </span>

                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <a
                                    href={selectedProject.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold shadow-[0_4px_15px_rgba(0,102,255,0.4)] transition-all cursor-pointer"
                                >
                                    <FaGithub className="w-3.5 h-3.5" />
                                    <span>View Repository</span>
                                </a>

                                <button
                                    type="button"
                                    onClick={() => setSelectedProject(null)}
                                    className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white/80 text-xs font-mono transition-colors cursor-pointer"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
