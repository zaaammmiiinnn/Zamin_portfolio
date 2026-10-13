"use client";

import { useState, useEffect } from "react";
import { metroSound } from "@/lib/metroSound";

interface Station {
    id: string;
    number: string;
    name: string;
    hindi: string;
    href: string;
    minPercent: number;
    maxPercent: number;
}

const STATIONS: Station[] = [
    {
        id: "hero",
        number: "00",
        name: "Terminus",
        hindi: "टर्मिनस",
        href: "#hero",
        minPercent: 0,
        maxPercent: 18,
    },
    {
        id: "diary",
        number: "01",
        name: "Origin",
        hindi: "डायरी",
        href: "#diary",
        minPercent: 18,
        maxPercent: 38,
    },
    {
        id: "metro",
        number: "02",
        name: "Platform",
        hindi: "प्लेटफ़ॉर्म",
        href: "#metro",
        minPercent: 38,
        maxPercent: 58,
    },
    {
        id: "projects",
        number: "03",
        name: "Deployments",
        hindi: "प्रोजेक्ट्स",
        href: "#projects",
        minPercent: 58,
        maxPercent: 75,
    },
    {
        id: "github",
        number: "04",
        name: "Telemetry",
        hindi: "टेलीमेट्री",
        href: "#github",
        minPercent: 75,
        maxPercent: 90,
    },
    {
        id: "contact",
        number: "05",
        name: "Junction",
        hindi: "संपर्क",
        href: "#contact",
        minPercent: 90,
        maxPercent: 100,
    },
];

export default function MetroDock() {
    const [activeStationIndex, setActiveStationIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            if (h <= 0) return;
            const pct = Math.min(100, Math.max(0, (window.scrollY / h) * 100));

            const idx = STATIONS.findIndex(
                (stn) => pct >= stn.minPercent && pct <= stn.maxPercent
            );
            if (idx !== -1) {
                setActiveStationIndex(idx);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToStation = (href: string) => {
        metroSound.playChime();
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            aria-label="Metro Line Navigation"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[94vw] pointer-events-auto hidden md:block"
        >
            <div className="relative px-3.5 sm:px-6 py-2.5 rounded-full bg-[#08080C]/90 backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.65),0_0_20px_rgba(0,102,255,0.15)] flex items-center gap-1.5 sm:gap-4">
                {/* Connecting Transit Line behind station nodes */}
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-white/[0.06] -z-10 hidden sm:block">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                        style={{
                            width: `${(activeStationIndex / (STATIONS.length - 1)) * 100}%`,
                        }}
                    />
                </div>

                {STATIONS.map((station, i) => {
                    const isActive = i === activeStationIndex;
                    return (
                        <button
                            key={station.id}
                            onClick={() => scrollToStation(station.href)}
                            className="group relative flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer text-left"
                            title={`${station.name} (${station.hindi})`}
                        >
                            {/* Station Node Indicator Dot */}
                            <div className="relative flex items-center justify-center">
                                <span
                                    className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                                        isActive
                                            ? "bg-cyan-400 border-white shadow-[0_0_12px_#00F0FF] scale-110"
                                            : "bg-[#111118] border-white/20 group-hover:border-cyan-400/60"
                                    }`}
                                />
                                {isActive && (
                                    <span className="absolute inset-0 rounded-full bg-cyan-400/40 animate-ping" />
                                )}
                            </div>

                            {/* Station Label */}
                            <div className="hidden md:flex flex-col">
                                <div className="flex items-center gap-1">
                                    <span
                                        className={`font-mono text-[10px] transition-colors ${
                                            isActive
                                                ? "text-cyan-400 font-bold"
                                                : "text-white/40 group-hover:text-white/70"
                                        }`}
                                    >
                                        {station.number}
                                    </span>
                                    <span
                                        className={`text-xs font-medium tracking-tight transition-colors ${
                                            isActive
                                                ? "text-white"
                                                : "text-white/50 group-hover:text-white/80"
                                        }`}
                                    >
                                        {station.name}
                                    </span>
                                </div>
                            </div>

                            {/* Active Station Hindi Micro-Pill (Desktop) */}
                            {isActive && (
                                <span className="hidden xl:inline font-mono text-[9px] px-1.5 py-0.2 rounded bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                                    {station.hindi}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
