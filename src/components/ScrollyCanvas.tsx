"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 89;

function getFramePath(index: number): string {
    return `/sequence/${String(index + 1).padStart(4, "0")}.webp`;
}

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [hasFrames, setHasFrames] = useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Preload all frames
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;
        let errorCount = 0;

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            img.src = getFramePath(i);

            img.onload = () => {
                loadedCount++;
                loadedImages[i] = img;
                if (loadedCount + errorCount === FRAME_COUNT) {
                    if (loadedCount > 0) {
                        setImages([...loadedImages]);
                    } else {
                        setHasFrames(false);
                    }
                }
            };

            img.onerror = () => {
                errorCount++;
                if (errorCount === FRAME_COUNT) {
                    setHasFrames(false);
                }
                if (loadedCount + errorCount === FRAME_COUNT && loadedCount > 0) {
                    setImages([...loadedImages]);
                }
            };
        }
    }, []);

    // Draw frame on canvas with cover-fit
    const drawFrame = useCallback(
        (index: number) => {
            const canvas = canvasRef.current;
            if (!canvas || images.length === 0) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const clampedIndex = Math.min(Math.max(Math.round(index), 0), images.length - 1);
            const img = images[clampedIndex];
            if (!img) return;

            const { width: cw, height: ch } = canvas;
            const { naturalWidth: iw, naturalHeight: ih } = img;

            const scale = Math.max(cw / iw, ch / ih);
            const sw = iw * scale;
            const sh = ih * scale;
            const sx = (cw - sw) / 2;
            const sy = (ch - sh) / 2;

            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(img, sx, sy, sw, sh);
        },
        [images]
    );

    useMotionValueEvent(frameIndex, "change", (latest) => {
        drawFrame(latest);
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawFrame(frameIndex.get());
        };

        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, [drawFrame, frameIndex]);

    useEffect(() => {
        if (images.length > 0) {
            drawFrame(0);
        }
    }, [images, drawFrame]);

    return (
        <div ref={containerRef} className="relative h-[500vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
                {/* Canvas for frame sequence */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                />

                {/* Fallback: Radar / Sonar Animation (shown when no frames) */}
                {!hasFrames && (
                    <div className="absolute inset-0">
                        {/* Base dark gradient */}
                        <div className="absolute inset-0 bg-[#050505]" />

                        {/* Subtle blue radial glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_60%)]" />

                        {/* Radar rings */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            {/* Pulsing concentric rings */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-blue-500/20 animate-radar-pulse" />
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-blue-500/15 animate-radar-pulse-delayed" />
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-blue-500/10 animate-radar-pulse-delayed-2" />

                            {/* Static rings */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-white/[0.04]" />
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-white/[0.03]" />
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[0.02]" />
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-white/[0.015]" />

                            {/* Rotating sweep line */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] animate-radar-rotate">
                                <div className="absolute left-1/2 top-0 w-[1px] h-1/2 bg-gradient-to-t from-blue-500/30 to-transparent origin-bottom" />
                            </div>

                            {/* Center dot */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500/60 shadow-[0_0_20px_5px_rgba(59,130,246,0.3)]" />
                        </div>

                        {/* Dot grid overlay for texture */}
                        <div
                            className="absolute inset-0 opacity-[0.02]"
                            style={{
                                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                                backgroundSize: '30px 30px',
                            }}
                        />
                    </div>
                )}

                {/* Vignette overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(5,5,5,0.7)_100%)] pointer-events-none" />
            </div>
        </div>
    );
}
