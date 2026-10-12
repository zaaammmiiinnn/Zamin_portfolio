"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaWifi, FaBarcode, FaCheckCircle } from "react-icons/fa";
import { metroSound } from "@/lib/metroSound";

interface MetroSmartCardProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MetroSmartCard({ isOpen, onClose }: MetroSmartCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [tapCount, setTapCount] = useState(0);

    const handleTap = () => {
        metroSound.playCardTap();
        setIsFlipped(!isFlipped);
        setTapCount((prev) => prev + 1);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="relative max-w-lg w-full flex flex-col items-center"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors cursor-pointer"
                            aria-label="Close smart card"
                        >
                            <FaTimes className="w-5 h-5" />
                        </button>

                        {/* Instruction Pill */}
                        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                            <span>CLICK CARD TO TAP-IN & FLIP // AFC GATE VALIDATED</span>
                        </div>

                        {/* 3D Flippable Card Perspective Wrapper */}
                        <div
                            className="w-full max-w-[420px] h-[255px] cursor-pointer"
                            style={{ perspective: "1200px" }}
                            onClick={handleTap}
                        >
                            <motion.div
                                className="w-full h-full relative"
                                style={{ transformStyle: "preserve-3d" }}
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* ================= FRONT OF CARD ================= */}
                                <div
                                    className="absolute inset-0 rounded-2xl p-6 bg-gradient-to-br from-[#0c1a36] via-[#091124] to-[#04060c] border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,102,255,0.35),0_0_30px_rgba(0,240,255,0.2)] flex flex-col justify-between overflow-hidden"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        WebkitBackfaceVisibility: "hidden",
                                    }}
                                >
                                    {/* Hologram sheen diagonal */}
                                    <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent rotate-45 pointer-events-none" />

                                    {/* Card Header */}
                                    <div className="flex items-start justify-between relative z-10">
                                        <div>
                                            <div className="text-[10px] font-mono text-cyan-300 tracking-wider">
                                                दिल्ली मेट्रो रेल कॉरपोरेशन
                                            </div>
                                            <div className="text-xs font-bold text-white tracking-widest uppercase">
                                                DELHI METRO // AI COMMUTER PASS
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-cyan-400">
                                            <FaWifi className="w-4 h-4 rotate-90" />
                                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 border border-blue-500/40 text-blue-200">
                                                DMRC.01
                                            </span>
                                        </div>
                                    </div>

                                    {/* Gold Smart EMV Chip */}
                                    <div className="relative z-10 flex items-center justify-between">
                                        <div className="w-12 h-9 rounded-md bg-gradient-to-br from-[#e0b94d] via-[#d4a030] to-[#b3801a] border border-amber-300/40 p-1 flex flex-col justify-between shadow-inner">
                                            <div className="h-[1px] bg-black/30 w-full" />
                                            <div className="h-[1px] bg-black/30 w-full" />
                                            <div className="h-[1px] bg-black/30 w-full" />
                                        </div>

                                        <div className="text-right">
                                            <div className="text-[9px] font-mono text-white/50">SYSTEM ACCESS</div>
                                            <div className="text-xs font-mono font-semibold text-cyan-300 flex items-center gap-1">
                                                <FaCheckCircle className="w-3 h-3 text-emerald-400" />
                                                <span>TIER 1 ARCHITECT</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Number & Cardholder Name */}
                                    <div className="relative z-10">
                                        <div className="font-mono text-sm sm:text-base tracking-[0.2em] text-white/90 font-medium">
                                            0924 8812 0041 2026
                                        </div>
                                        <div className="flex items-end justify-between mt-1 text-[11px] font-mono">
                                            <div>
                                                <div className="text-[8px] text-white/40 uppercase">Cardholder</div>
                                                <div className="text-white font-semibold tracking-wide">
                                                    ZAMIN ASKARI RIZVI
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[8px] text-white/40 uppercase">Validity</div>
                                                <div className="text-cyan-300 font-semibold">PERPETUAL</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ================= BACK OF CARD ================= */}
                                <div
                                    className="absolute inset-0 rounded-2xl p-6 bg-gradient-to-br from-[#070b14] via-[#05080e] to-[#020306] border border-blue-500/30 shadow-[0_20px_50px_rgba(0,102,255,0.35)] flex flex-col justify-between overflow-hidden"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        WebkitBackfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)",
                                    }}
                                >
                                    {/* Magnetic Stripe */}
                                    <div className="-mx-6 -mt-2 h-10 bg-[#000000] border-y border-white/10" />

                                    {/* Guidelines & Terms */}
                                    <div className="text-[9px] font-mono text-white/60 space-y-1.5 leading-relaxed">
                                        <p>1. Valid for sub-280ms inference across all neural pipelines.</p>
                                        <p>2. Non-transferable. Authenticated via Next.js 16 & PyTorch.</p>
                                        <p>3. In case of lost credentials, contact: askarizamin3@gmail.com</p>
                                    </div>

                                    {/* Balance & Barcode */}
                                    <div className="flex items-center justify-between border-t border-white/10 pt-3">
                                        <div>
                                            <div className="text-[8px] font-mono text-white/40">AVAILABLE BANDWIDTH</div>
                                            <div className="text-xs font-mono font-bold text-emerald-400">
                                                ₹ ∞ (UNLIMITED PROD)
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-white/40 font-mono text-[10px]">
                                            <FaBarcode className="w-8 h-4 text-white/60" />
                                            <span>#ZAR-2026</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Status Note */}
                        <div className="mt-4 text-center">
                            <span className="text-xs font-mono text-white/50">
                                Gate Taps Registered: <span className="text-cyan-400 font-semibold">{tapCount}</span>
                            </span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
