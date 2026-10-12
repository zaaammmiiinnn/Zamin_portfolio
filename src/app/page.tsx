"use client";

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import DiarySection from "@/components/DiarySection";
import ProjectsSection from "@/components/projects";
import GitHubCommits from "@/components/GitHubCommits";
import ExperienceSection from "@/components/experience";
import EducationSection from "@/components/education";
import CertificationsSection from "@/components/certifications";
import ContactSection from "@/components/contact";
import Footer from "@/components/footer";
import { Toaster } from "sonner";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#060608] text-[#F3F2EE] relative selection:bg-blue-600/35 selection:text-white">
            {/* 1. Global Ambient Engineering Atmosphere */}
            <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
                {/* Ultra-subtle deep indigo aura top */}
                <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1100px] h-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(0,102,255,0.08)_0%,_rgba(0,240,255,0.03)_40%,_transparent_70%)] blur-[140px]" />
                {/* Lower accent aura */}
                <div className="absolute top-[60%] -right-[10%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(0,102,255,0.05)_0%,_transparent_70%)] blur-[160px]" />
            </div>

            {/* 2. Persistent Vertical Signal Datum (Connects Hero through Monograph) */}
            <div
                className="pointer-events-none fixed left-6 sm:left-12 lg:left-20 top-0 bottom-0 w-[1px] bg-white/[0.04] z-20 hidden md:block"
                aria-hidden="true"
            >
                {/* Subtle telemetry notch */}
                <div className="absolute top-24 -left-[2px] w-[5px] h-[1px] bg-blue-500/60" />
                <div className="absolute top-1/2 -left-[2px] w-[5px] h-[1px] bg-cyan-500/40" />
            </div>

            <Navbar />

            {/* Phase 1 Reset: Monumental Signal Hero */}
            <Hero />

            {/* Section 2: Pinned Engineering Diary & Sticky Notes */}
            <DiarySection />

            {/* Downstream Production Sections (Preserved) */}
            <ProjectsSection />
            <GitHubCommits />
            <ExperienceSection />
            <EducationSection />
            <CertificationsSection />
            <ContactSection />

            <Footer />
            <Toaster position="bottom-right" theme="dark" />
        </div>
    );
}
