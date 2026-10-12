"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { SiPython, SiPytorch, SiFastapi, SiNextdotjs, SiTypescript, SiDocker, SiPostgresql, SiMongodb } from "react-icons/si";

export default function AboutSection() {
    const shouldReduceMotion = useReducedMotion();
    const [activeLayer, setActiveLayer] = useState<number>(0);

    const architectureLayers = [
        {
            id: "01",
            name: "SENSORY ACQUISITION",
            domain: "REAL-TIME VISION & TELEMETRY",
            tech: "OpenCV • ArduPilot • Python • Sensor Streams",
            summary:
                "Capturing optical tracking telemetry on autonomous UAVs. Physical inputs are noisy and latency-sensitive; software cannot afford memory leaks or blocking I/O while tracking in real time.",
            verifiedArtifact: "GSOC ArduPilot Autonomous Vision Project",
            metricLabel: "LATENCY BUDGET",
            metricValue: "< 35ms Per Optical Frame",
        },
        {
            id: "02",
            name: "LATENT EXTRACTION",
            domain: "NEURAL VECTOR EMBEDDINGS",
            tech: "PyTorch • Transformers • NLP • Word2Vec",
            summary:
                "Transforming unstructured text and evaluation metrics into high-dimensional latent space. Trained custom sentiment classifiers and embedding projections to enable semantic search and skill-gap matching.",
            verifiedArtifact: "Sentiment Neural Embeddings & AI Resume Analyzer",
            metricLabel: "VECTOR ENCODING",
            metricValue: "Dense Contextual Embeddings",
        },
        {
            id: "03",
            name: "AGENT ORCHESTRATION",
            domain: "AUTONOMOUS EXECUTION LOOPS",
            tech: "Agentic Tool Calling • Pydantic • Context Hygiene",
            summary:
                "Orchestrating autonomous agents that don't just chat, but execute. Implemented structured tool-calling, verified JSON outputs, and guardrails to prevent hallucination in production workflows.",
            verifiedArtifact: "Autonomous Agent Tooling & Data Automation",
            metricLabel: "VALIDATION REGIME",
            metricValue: "Strict Schema Enforcement",
        },
        {
            id: "04",
            name: "PRODUCTION RUNTIME",
            domain: "DETERMINISTIC SYSTEMS & APIS",
            tech: "FastAPI • Next.js 16 • React 19 • Zod • MongoDB",
            summary:
                "Connecting probabilistic AI inference to rock-solid web infrastructure. Built automated data pipelines during the Auctech Data Analytics internship and architected type-safe full-stack backends.",
            verifiedArtifact: "Auctech Analytics Pipelines & Full-Stack Apps",
            metricLabel: "DATA CONTRACTS",
            metricValue: "End-to-End Type Safety",
        },
    ];

    const capabilityMatrix = [
        {
            code: "CAP.01",
            category: "AI & MACHINE LEARNING",
            tools: ["PyTorch", "Transformers", "NLP", "Semantic Embeddings", "Scikit-Learn"],
            verification: "Model training, fine-tuning, and embedding evaluation",
        },
        {
            code: "CAP.02",
            category: "AGENTIC & DATA PIPELINES",
            tools: ["Autonomous Agents", "RAG Systems", "Context Engineering", "ETL Automation"],
            verification: "Tool-calling loops and structured data extraction",
        },
        {
            code: "CAP.03",
            category: "HIGH-PERFORMANCE BACKEND",
            tools: ["FastAPI", "Python", "Node.js", "REST APIs", "Microservices", "C++"],
            verification: "Low-latency inference serving and asynchronous workers",
        },
        {
            code: "CAP.04",
            category: "MODERN WEB ARCHITECTURE",
            tools: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion"],
            verification: "Full-stack SSR/SSG apps and interactive engineering interfaces",
        },
        {
            code: "CAP.05",
            category: "INFRASTRUCTURE & SENSORS",
            tools: ["PostgreSQL", "MongoDB", "Docker", "Git / GitHub", "Computer Vision"],
            verification: "Containerized deployments and drone telemetry parsing",
        },
    ];

    return (
        <section
            id="about"
            className="relative z-20 py-28 sm:py-36 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full text-[#F3F2EE] overflow-hidden bg-[#060608]"
            aria-label="Engineering Monograph and About Section"
        >
            {/* Architectural Vertical Datum Spine continuing from Hero */}
            <div className="pointer-events-none absolute left-6 sm:left-12 lg:left-20 top-0 bottom-0 w-[1px] bg-white/[0.05] -z-10" />

            {/* 1. EDITORIAL CHAPTER OPENING */}
            <div className="space-y-4 mb-20 pb-8 border-b border-white/[0.08]">
                <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white/40">
                    <div className="flex items-center gap-3">
                        <span className="text-blue-400 font-semibold">[01.MONOGRAPH]</span>
                        <span>CHAPTER 01: THE CONVERGENCE OF SIGNAL AND SYSTEM</span>
                    </div>
                    <span className="tracking-wider uppercase text-[11px] text-white/30">
                        ZAMIN ASKARI RIZVI // ARCHIVE LOG
                    </span>
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.0] text-white max-w-4xl pt-2">
                    ENGINEERING WITHOUT HYPERBOLE:{" "}
                    <span className="text-white/60">
                        WHY REAL INTELLIGENCE REQUIRES DETERMINISTIC FOUNDATIONS.
                    </span>
                </h2>

                <p className="text-sm sm:text-base text-white/50 max-w-2xl font-light leading-relaxed">
                    A technical diary on building machine learning pipelines, drone telemetry, and agent architectures
                    grounded in real-world constraints.
                </p>
            </div>

            {/* 2. THE EDITORIAL ESSAY (BROADSHEET SETTING WITH MARGINALIA) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
                {/* PRIMARY ESSAY (Cols 1-7) */}
                <div className="lg:col-span-7 space-y-8 text-white/80 leading-relaxed font-light text-base">
                    {/* Pull Statement */}
                    <div className="border-l-2 border-blue-500 pl-6 py-2 text-lg sm:text-xl text-white/95 font-normal leading-snug">
                        &ldquo;The gap between a model producing interesting outputs in a Jupyter notebook and a system
                        delivering verifiable utility in production is where actual engineering happens.&rdquo;
                    </div>

                    <p>
                        My work as an engineer centers on bridging that exact gap. I am currently pursuing Computer Science
                        with specialization in <strong className="text-white font-medium">Artificial Intelligence &amp; Data Science</strong> at{" "}
                        <span className="text-white/90">Nxtwave</span>, alongside a minor in{" "}
                        <strong className="text-white font-medium">AI &amp; Drone Technology</strong> at{" "}
                        <span className="text-blue-300 font-mono text-xs">TiHAN, IIT Hyderabad</span>. This dual foundation
                        ingrained a deep respect for mathematical fundamentals tested directly against hardware reality.
                    </p>

                    <div className="pt-2 space-y-3">
                        <span className="font-mono text-xs tracking-widest uppercase text-white/40 block">
                            THE REALITY OF SENSORY DATA
                        </span>
                        <p>
                            Developing autonomous optical tracking for <strong className="text-white font-medium">ArduPilot drone systems</strong>{" "}
                            taught me that the real world does not adhere to pristine assumptions. Sensor telemetry has jitter; camera
                            frames drop under aerodynamic vibration; compute budgets on embedded platforms are strictly constrained.
                            An algorithm that fails to handle latency degrades immediately from an asset into a failure point.
                        </p>
                    </div>

                    <div className="pt-2 space-y-3">
                        <span className="font-mono text-xs tracking-widest uppercase text-white/40 block">
                            ENTERPRISE ANALYTICS &amp; AGENT AUTONOMY
                        </span>
                        <p>
                            During my <strong className="text-white font-medium">Data Analytics Internship at Auctech</strong>,
                            I engineered data pipelines to process multi-channel marketing datasets. The core lesson was identical:
                            statistical insights are meaningless without dependable ingestion pipelines and sub-second query access.
                        </p>
                        <p>
                            Today, I direct this perspective into <strong className="text-white font-medium">autonomous agent systems</strong>.
                            Rather than novelty conversational wrappers, I construct agents with bounded toolsets, deterministic validation
                            regimes, and structured data outputs.
                        </p>
                    </div>

                    {/* Verified Tooling Strip */}
                    <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs text-white/40">PRIMARY INSTRUMENTS:</span>
                        {[
                            { name: "Python", icon: SiPython },
                            { name: "PyTorch", icon: SiPytorch },
                            { name: "FastAPI", icon: SiFastapi },
                            { name: "Next.js", icon: SiNextdotjs },
                            { name: "TypeScript", icon: SiTypescript },
                            { name: "Docker", icon: SiDocker },
                            { name: "PostgreSQL", icon: SiPostgresql },
                            { name: "MongoDB", icon: SiMongodb },
                        ].map(({ name, icon: Icon }) => (
                            <span
                                key={name}
                                className="inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 border border-white/[0.08] text-white/70"
                            >
                                <Icon className="w-3 h-3 text-blue-400" />
                                {name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* MARGINALIA & ARCHITECTURAL ANNOTATIONS (Cols 8-12) */}
                <div className="lg:col-span-5 space-y-10 lg:pl-6 border-l border-white/[0.06]">
                    {/* Marginalia Note 01 */}
                    <div className="space-y-2 font-mono">
                        <div className="flex items-center justify-between text-xs text-blue-400">
                            <span>┌── ANNOTATION // 01</span>
                            <span className="text-white/30">UAV OPTICS</span>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed font-sans pl-3 border-l border-blue-500/30">
                            Sensor uncertainty is the default state of physical computing. Resilient software must be built
                            with graceful degradation and predictive state filtering rather than idealized optimism.
                        </p>
                        <div className="text-[11px] text-white/40 pl-3">
                            REF: ARDUPILOT_GSOC_TELEMETRY.PY
                        </div>
                    </div>

                    {/* Marginalia Note 02 */}
                    <div className="space-y-2 font-mono">
                        <div className="flex items-center justify-between text-xs text-cyan-400">
                            <span>┌── ANNOTATION // 02</span>
                            <span className="text-white/30">SCHEMA INTEGRITY</span>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed font-sans pl-3 border-l border-cyan-500/30">
                            LLMs and neural embeddings are probabilistic; production infrastructure must be strictly deterministic.
                            Never trust unstructured model output without schema validation at the gateway boundary.
                        </p>
                        <div className="text-[11px] text-white/40 pl-3">
                            REF: PYDANTIC_ZOD_PIPELINE.TS
                        </div>
                    </div>

                    {/* Marginalia Note 03 */}
                    <div className="space-y-2 font-mono">
                        <div className="flex items-center justify-between text-xs text-indigo-400">
                            <span>┌── ANNOTATION // 03</span>
                            <span className="text-white/30">ACADEMIC RIGOR</span>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed font-sans pl-3 border-l border-indigo-500/30">
                            Nxtwave CS (AI &amp; Data Science, 2025–2029) + TiHAN IIT Hyderabad Minor in AI &amp; Drone Tech.
                            Bridging university computer science research with real-world Git commits.
                        </p>
                        <div className="text-[11px] text-white/40 pl-3">
                            REF: ACADEMIC_CREDENTIALS_VERIFIED
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. SIGNATURE INTERACTION — THE 4-STAGE SYSTEMS ARCHITECTURE TRACE */}
            <div className="mb-24 space-y-6 pt-12 border-t border-white/[0.08]">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <span className="font-mono text-xs tracking-[0.25em] uppercase text-blue-400">
                            INTERACTIVE SYSTEM ARCHITECTURE
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                            The Signal-to-Intelligence Pipeline
                        </h3>
                    </div>
                    <span className="font-mono text-xs text-white/40">
                        SELECT A SYSTEM LAYER TO INSPECT TECHNICAL ARTIFACTS
                    </span>
                </div>

                {/* Pipeline Tabs Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4">
                    {architectureLayers.map((layer, index) => {
                        const isActive = activeLayer === index;
                        return (
                            <button
                                key={layer.id}
                                onClick={() => setActiveLayer(index)}
                                className={`text-left p-4 border transition-all duration-200 cursor-pointer ${
                                    isActive
                                        ? "bg-white/[0.06] border-blue-500 text-white shadow-[0_0_15px_rgba(0,102,255,0.2)]"
                                        : "bg-white/[0.01] border-white/[0.08] text-white/50 hover:border-white/20 hover:text-white/80"
                                }`}
                                aria-selected={isActive}
                                role="tab"
                            >
                                <div className="font-mono text-[10px] text-blue-400">LAYER {layer.id}</div>
                                <div className="font-bold text-xs sm:text-sm tracking-tight mt-1">{layer.name}</div>
                            </button>
                        );
                    })}
                </div>

                {/* Active Layer Deep-Dive Display */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeLayer}
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
                        transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
                        className="p-6 sm:p-8 border border-white/[0.08] bg-[#09090D] space-y-6"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
                            <div>
                                <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">
                                    {architectureLayers[activeLayer].domain}
                                </span>
                                <h4 className="text-xl sm:text-2xl font-bold text-white mt-1">
                                    {architectureLayers[activeLayer].name}
                                </h4>
                            </div>

                            <div className="text-right sm:text-right">
                                <span className="font-mono text-[10px] text-white/40 uppercase block">
                                    {architectureLayers[activeLayer].metricLabel}
                                </span>
                                <span className="font-mono text-xs text-cyan-400 font-semibold">
                                    {architectureLayers[activeLayer].metricValue}
                                </span>
                            </div>
                        </div>

                        <p className="text-sm sm:text-base text-white/75 leading-relaxed font-light">
                            {architectureLayers[activeLayer].summary}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/[0.06] font-mono text-xs">
                            <div>
                                <span className="text-white/40 block text-[10px] uppercase">TECHNOLOGIES &amp; PROTOCOLS</span>
                                <span className="text-white/90">{architectureLayers[activeLayer].tech}</span>
                            </div>
                            <div>
                                <span className="text-white/40 block text-[10px] uppercase">VERIFIED REPOSITORY ARTIFACT</span>
                                <span className="text-blue-400">{architectureLayers[activeLayer].verifiedArtifact}</span>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* 4. BROADSHEET CAPABILITY MATRIX (NO GENERIC CARDS) */}
            <div className="space-y-6 pt-12 border-t border-white/[0.08]">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4">
                    <div>
                        <span className="font-mono text-xs tracking-[0.25em] uppercase text-blue-400">
                            SYSTEM TAXONOMY
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                            Verified Engineering Competencies
                        </h3>
                    </div>
                    <span className="font-mono text-xs text-white/40">
                        VERIFIED CODEBASES &amp; CONTINUOUS COMMIT EVIDENCE
                    </span>
                </div>

                {/* Editorial Table / Horizontal Datum Lines */}
                <div className="divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
                    {capabilityMatrix.map((item) => (
                        <div
                            key={item.code}
                            className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline hover:bg-white/[0.015] transition-colors px-2"
                        >
                            <span className="font-mono text-xs text-blue-400 md:col-span-2">
                                {item.code}
                            </span>
                            <span className="font-semibold text-sm text-white md:col-span-3">
                                {item.category}
                            </span>
                            <div className="flex flex-wrap gap-2 md:col-span-4">
                                {item.tools.map((t) => (
                                    <span key={t} className="font-mono text-xs text-white/70">
                                        {t} <span className="text-white/20">•</span>
                                    </span>
                                ))}
                            </div>
                            <span className="font-mono text-xs text-white/40 md:col-span-3 md:text-right">
                                {item.verification}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 5. SEAMLESS TRANSITION TO NEXT CHAPTER (PROJECTS) */}
            <div className="mt-20 pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-mono text-xs">
                <div className="flex items-center gap-3 text-white/40">
                    <span className="text-blue-400 font-semibold">[01.MONOGRAPH]</span>
                    <span className="text-white/20">⟶</span>
                    <span className="text-white/80">[02.SYSTEM_ARCHITECTURES]</span>
                    <span className="text-white/20">•</span>
                    <span>ADVANCING TO PRODUCTION CASE STUDIES</span>
                </div>

                <a
                    href="#projects"
                    className="group inline-flex items-center gap-2.5 uppercase tracking-wider text-white/70 hover:text-blue-400 transition-colors"
                >
                    <span>ENTER CHAPTER 02 (PROJECTS)</span>
                    <FaArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
            </div>
        </section>
    );
}
