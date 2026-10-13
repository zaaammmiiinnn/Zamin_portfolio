"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TransitLine() {
    const lineRef = useRef<SVGPathElement>(null);
    const glowLineRef = useRef<SVGPathElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollPercent, setScrollPercent] = useState(0);

    useEffect(() => {
        const path = lineRef.current;
        const glowPath = glowLineRef.current;
        if (!path || !glowPath) return;

        const pathLength = path.getTotalLength();

        // Setup stroke-dasharray for progressive drawing
        path.style.strokeDasharray = `${pathLength} ${pathLength}`;
        path.style.strokeDashoffset = `${pathLength}`;

        glowPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
        glowPath.style.strokeDashoffset = `${pathLength}`;

        const st = ScrollTrigger.create({
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            onUpdate: (self) => {
                const progress = self.progress;
                const drawLength = pathLength * (1 - progress);
                path.style.strokeDashoffset = `${drawLength}`;
                glowPath.style.strokeDashoffset = `${drawLength}`;
                setScrollPercent(Math.round(progress * 100));
            },
        });

        return () => {
            st.kill();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="pointer-events-none fixed inset-0 z-10 overflow-hidden opacity-35 md:opacity-100"
            aria-hidden="true"
        >
            <svg
                className="w-full h-full"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
                fill="none"
            >
                <defs>
                    <linearGradient id="metroLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0066FF" stopOpacity="0.9" />
                        <stop offset="30%" stopColor="#00F0FF" stopOpacity="1" />
                        <stop offset="65%" stopColor="#3B82F6" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#0066FF" stopOpacity="0.8" />
                    </linearGradient>

                    <filter id="metroGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Ghost Background Track Line (Dotted / Inactive) */}
                <path
                    d="M 60,0 
                       C 60,150 140,220 140,320 
                       C 140,420 50,490 50,600 
                       C 50,700 160,780 160,880 
                       C 160,940 90,970 90,1000"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="3"
                    strokeDasharray="6 6"
                    fill="none"
                />

                {/* Glowing Outer Bloom Track */}
                <path
                    ref={glowLineRef}
                    d="M 60,0 
                       C 60,150 140,220 140,320 
                       C 140,420 50,490 50,600 
                       C 50,700 160,780 160,880 
                       C 160,940 90,970 90,1000"
                    stroke="rgba(0, 240, 255, 0.4)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    filter="url(#metroGlow)"
                    fill="none"
                />

                {/* Primary Animated Metro Core Track */}
                <path
                    ref={lineRef}
                    d="M 60,0 
                       C 60,150 140,220 140,320 
                       C 140,420 50,490 50,600 
                       C 50,700 160,780 160,880 
                       C 160,940 90,970 90,1000"
                    stroke="url(#metroLineGradient)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                />
            </svg>

            {/* Mobile Rail Backup (Left rail on smaller devices) */}
            <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-blue-500/20 md:hidden" />
        </div>
    );
}
