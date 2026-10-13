"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import DiarySection from "@/components/DiarySection";
import MetroSection from "@/components/MetroSection";
import ProjectsSection from "@/components/projects";
import GitHubCommits from "@/components/GitHubCommits";
import ExperienceSection from "@/components/experience";
import EducationSection from "@/components/education";
import CertificationsSection from "@/components/certifications";
import ContactSection from "@/components/contact";
import Footer from "@/components/footer";
import JourneyHUD from "@/components/JourneyHUD";
import TransitLine from "@/components/TransitLine";
import MetroDock from "@/components/MetroDock";
import MetroSmartCard from "@/components/MetroSmartCard";
import { Toaster } from "sonner";

export default function Home() {
    const [isSmartCardOpen, setIsSmartCardOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#060608] text-[#F3F2EE] relative selection:bg-blue-600/35 selection:text-white pb-12 md:pb-24">
            {/* Top Delhi Metro Journey HUD */}
            <JourneyHUD onOpenSmartCard={() => setIsSmartCardOpen(true)} />

            {/* Continuous Glowing Metro Route Line */}
            <TransitLine />

            {/* 1. Global Ambient Engineering Atmosphere */}
            <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
                {/* Ultra-subtle deep indigo aura top */}
                <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1100px] h-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(0,102,255,0.08)_0%,_rgba(0,240,255,0.03)_40%,_transparent_70%)] blur-[140px]" />
                {/* Lower accent aura */}
                <div className="absolute top-[60%] -right-[10%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(0,102,255,0.05)_0%,_transparent_70%)] blur-[160px]" />
            </div>

            {/* 2. Persistent Vertical Signal Datum */}
            <div
                className="pointer-events-none fixed left-6 sm:left-12 lg:left-20 top-0 bottom-0 w-[1px] bg-white/[0.04] z-20 hidden md:block"
                aria-hidden="true"
            >
                {/* Subtle telemetry notch */}
                <div className="absolute top-24 -left-[2px] w-[5px] h-[1px] bg-blue-500/60" />
                <div className="absolute top-1/2 -left-[2px] w-[5px] h-[1px] bg-cyan-500/40" />
            </div>

            <Navbar />

            {/* Section 0: Monumental Signal Hero */}
            <Hero />

            {/* Section 1: Pinned Engineering Diary & Sticky Notes */}
            <DiarySection />

            {/* Section 2: Pinned Metro Station & Core Competencies Billboards */}
            <MetroSection />

            {/* Downstream Production Sections (Preserved) */}
            <ProjectsSection />
            <GitHubCommits />
            <ExperienceSection />
            <EducationSection />
            <CertificationsSection />
            <ContactSection />

            {/* Persistent Floating Metro Dock Navigation */}
            <MetroDock />

            {/* Interactive DMRC Smart Card Easter Egg Modal */}
            <MetroSmartCard
                isOpen={isSmartCardOpen}
                onClose={() => setIsSmartCardOpen(false)}
            />

            <Footer />
            <Toaster position="bottom-right" theme="dark" />
        </div>
    );
}
