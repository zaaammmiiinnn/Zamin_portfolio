"use client";

import { useState, useEffect } from "react";
import { FaVolumeUp, FaVolumeMute, FaSubway, FaCreditCard } from "react-icons/fa";
import { metroSound } from "@/lib/metroSound";

interface JourneyHUDProps {
    onOpenSmartCard?: () => void;
}

export default function JourneyHUD({ onOpenSmartCard }: JourneyHUDProps) {
    const [scrollPercent, setScrollPercent] = useState(0);
    const [currentStation, setCurrentStation] = useState("TERMINAL // RAJIV CHOWK");
    const [soundEnabled, setSoundEnabled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            if (h <= 0) return;
            const pct = Math.min(100, Math.max(0, Math.round((window.scrollY / h) * 100)));
            setScrollPercent(pct);

            // Determine active station based on scroll percent
            if (pct < 18) {
                setCurrentStation("STN 00 // TERMINAL (HERO)");
            } else if (pct < 38) {
                setCurrentStation("STN 01 // LATENT SPACE (ORIGIN)");
            } else if (pct < 58) {
                setCurrentStation("STN 02 // CENTRAL PLATFORM (CAPABILITIES)");
            } else if (pct < 75) {
                setCurrentStation("STN 03 // DEPLOYMENTS (PROJECTS)");
            } else if (pct < 90) {
                setCurrentStation("STN 04 // TELEMETRY ARSENAL");
            } else {
                setCurrentStation("STN 05 // TERMINUS JUNCTION (CONTACT)");
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleChime = () => {
        metroSound.playChime();
        setSoundEnabled(true);
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
            {/* Top Micro-Telemetry Ribbon */}
            <div className="bg-[#050508]/85 backdrop-blur-md border-b border-white/[0.06] px-4 sm:px-8 py-1.5 flex items-center justify-between text-[11px] font-mono pointer-events-auto">
                {/* Left: DMRC Transit Line Indicator */}
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-blue-400 font-semibold tracking-wider">
                        <FaSubway className="w-3 h-3 text-cyan-400 animate-pulse" />
                        <span className="hidden sm:inline">DMRC BLUE LINE // </span>
                        <span>LINE 01</span>
                    </span>
                    <span className="h-3 w-[1px] bg-white/10 hidden sm:block" />
                    <span className="text-white/40 hidden md:inline truncate max-w-[280px]">
                        दिल्ली मेट्रो में आपका स्वागत है
                    </span>
                </div>

                {/* Center: Live Station Status */}
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-white/80 font-mono tracking-tight font-medium text-[10px] sm:text-[11px]">
                        {currentStation}
                    </span>
                </div>

                {/* Right: Journey Progress & Metro Chime */}
                <div className="flex items-center gap-3 sm:gap-4">
                    {/* Traveled % */}
                    <div className="flex items-center gap-1.5 text-white/70">
                        <span className="text-white/40 hidden sm:inline">TRAVELED:</span>
                        <span className="text-cyan-400 font-bold">{scrollPercent}%</span>
                    </div>

                    <span className="h-3 w-[1px] bg-white/10" />

                    {/* Metro Chime Sound Button */}
                    <button
                        onClick={toggleChime}
                        title="Play Delhi Metro station arrival chime"
                        className="group flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:text-white transition-all cursor-pointer"
                    >
                        <FaVolumeUp className="w-2.5 h-2.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] hidden sm:inline">CHIME</span>
                    </button>

                    {/* Smart Card Trigger */}
                    {onOpenSmartCard && (
                        <button
                            onClick={onOpenSmartCard}
                            title="Inspect Delhi Metro Smart Card"
                            className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:text-white transition-all cursor-pointer"
                        >
                            <FaCreditCard className="w-2.5 h-2.5" />
                            <span className="text-[10px]">METRO PASS</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
