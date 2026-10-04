"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaSpinner, FaCopy, FaCheck, FaTrash, FaTerminal } from "react-icons/fa";
import { SiNvidia, SiFastapi } from "react-icons/si";

export default function LiveAIDemo() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const examplePrompts = [
        "What are Zamin's main skills in AI and engineering?",
        "Explain how NVIDIA Nemotron models differ in architecture.",
        "Write a concise Python script using FastAPI and Pydantic.",
    ];

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmed = prompt.trim();
        if (!trimmed || isLoading) return;

        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch("http://127.0.0.1:8000/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: trimmed }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => null);
                throw new Error(
                    errData?.detail || `Server error (${res.status}): ${res.statusText}`
                );
            }

            const data = await res.json();
            setResponse(data.reply || "No response received.");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to connect to backend.";
            setError(
                message.includes("Failed to fetch")
                    ? "Could not connect to FastAPI server at http://127.0.0.1:8000. Ensure the server is running."
                    : message
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        if (!response) return;
        navigator.clipboard.writeText(response);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        setPrompt("");
        setResponse(null);
        setError(null);
    };

    return (
        <section id="demo" className="py-16 px-4 md:px-6 mx-auto max-w-6xl w-full">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-white/20 hover:shadow-[0_12px_40px_rgba(118,185,0,0.08)]"
            >
                {/* Ambient glow in corner */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#76B900]/10 blur-3xl" />
                <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#76B900]/10 border border-[#76B900]/25 text-[#76B900] text-xs font-semibold tracking-wide uppercase mb-3">
                            <SiNvidia className="w-3.5 h-3.5" />
                            Live AI Demo
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white/95">
                            Test the Model Live
                        </h2>
                        <p className="mt-1.5 text-white/50 text-xs sm:text-sm font-light">
                            Send a real-time prompt through our FastAPI backend to NVIDIA Nemotron.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/40 text-xs font-mono">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#76B900] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#76B900]" />
                        </span>
                        API Endpoint: :8000/api/chat
                    </div>
                </div>

                {/* Quick Prompts */}
                <div className="mb-5 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-white/40 font-mono mr-1">Suggestions:</span>
                    {examplePrompts.map((sample) => (
                        <button
                            key={sample}
                            type="button"
                            onClick={() => setPrompt(sample)}
                            className="px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.06] text-white/60 hover:text-white hover:border-[#76B900]/40 hover:bg-[#76B900]/5 transition-all text-xs font-light text-left"
                        >
                            &ldquo;{sample}&rdquo;
                        </button>
                    ))}
                </div>

                {/* Sleek Input Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative rounded-2xl bg-black/40 border border-white/10 focus-within:border-[#76B900]/50 focus-within:ring-1 focus-within:ring-[#76B900]/30 transition-all p-2">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit();
                                }
                            }}
                            rows={3}
                            placeholder="Ask Nemotron anything or ask about my technical background... (Press Enter to send)"
                            className="w-full resize-none bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none font-sans"
                            disabled={isLoading}
                        />

                        <div className="flex items-center justify-between pt-2 px-2 border-t border-white/[0.05]">
                            <div className="flex items-center gap-2 text-[11px] text-white/40 font-mono">
                                <span>Shift+Enter for newline</span>
                            </div>

                            <div className="flex items-center gap-2">
                                {prompt && (
                                    <button
                                        type="button"
                                        onClick={handleClear}
                                        className="p-2 text-white/40 hover:text-white/80 transition-colors rounded-lg text-xs"
                                        title="Clear input"
                                    >
                                        <FaTrash className="w-3 h-3" />
                                    </button>
                                )}

                                <button
                                    type="submit"
                                    disabled={!prompt.trim() || isLoading}
                                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#76B900] to-[#5a9100] text-black font-semibold text-xs tracking-wide uppercase hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(118,185,0,0.3)]"
                                >
                                    {isLoading ? (
                                        <>
                                            <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                                            <span>Thinking...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Ask Nemotron</span>
                                            <FaPaperPlane className="w-3 h-3" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Error Banner */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2.5 font-mono"
                        >
                            <span className="font-bold">Error:</span>
                            <span className="flex-1">{error}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Response Display Box */}
                <AnimatePresence>
                    {(response || isLoading) && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6"
                        >
                            <div className="rounded-2xl bg-black/60 border border-white/10 overflow-hidden">
                                {/* Box Top Bar */}
                                <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06]">
                                    <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
                                        <FaTerminal className="w-3 h-3 text-[#76B900]" />
                                        <span>Nemotron Output</span>
                                    </div>

                                    {response && !isLoading && (
                                        <button
                                            type="button"
                                            onClick={handleCopy}
                                            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
                                        >
                                            {copied ? (
                                                <>
                                                    <FaCheck className="w-3 h-3 text-emerald-400" />
                                                    <span className="text-emerald-400">Copied</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaCopy className="w-3 h-3" />
                                                    <span>Copy</span>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>

                                {/* Box Scrollable Content */}
                                <div className="p-4 sm:p-5 max-h-80 overflow-y-auto font-mono text-xs sm:text-sm text-white/85 leading-relaxed whitespace-pre-wrap selection:bg-[#76B900]/30 selection:text-white">
                                    {isLoading ? (
                                        <div className="flex items-center gap-3 py-6 justify-center text-white/40">
                                            <FaSpinner className="w-4 h-4 animate-spin text-[#76B900]" />
                                            <span>Awaiting Nemotron inference from 127.0.0.1:8000...</span>
                                        </div>
                                    ) : (
                                        response
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer Note */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs text-white/40">
                    <div className="flex items-center gap-2">
                        <SiNvidia className="w-3.5 h-3.5 text-[#76B900]" />
                        <SiFastapi className="w-3.5 h-3.5 text-[#05998B]" />
                        <span className="font-light">
                            Powered by <strong className="text-white/70 font-medium">NVIDIA Nemotron</strong> &amp;{" "}
                            <strong className="text-white/70 font-medium">FastAPI</strong>
                        </span>
                    </div>

                    <span className="text-[11px] font-mono text-white/30">
                        Model: nvidia/nemotron-3-ultra-550b
                    </span>
                </div>
            </motion.div>
        </section>
    );
}
