"use client";

import Navbar from "@/components/navbar";
import BentoGrid from "@/components/BentoGrid";
import LiveAIDemo from "@/components/LiveAIDemo";
import AboutSection from "@/components/about";
import ExpertiseGrid from "@/components/ExpertiseGrid";
import ProjectsSection from "@/components/projects";
import LeetCodeStats from "@/components/LeetCodeStats";
import ExperienceSection from "@/components/experience";
import EducationSection from "@/components/education";
import CertificationsSection from "@/components/certifications";
import ContactSection from "@/components/contact";
import Footer from "@/components/footer";
import { Toaster } from "sonner";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-[#050505] relative selection:bg-purple-500/30 selection:text-white">
            {/* Dark blue and purple ambient background radial gradients */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                {/* Top Center: Deep Indigo / Blue Radial */}
                <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1200px] h-[700px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.18)_0%,_rgba(79,70,229,0.12)_45%,_transparent_75%)] blur-[120px]" />

                {/* Left Accent: Deep Purple Radial */}
                <div className="absolute top-[35%] -left-[15%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(147,51,234,0.14)_0%,_transparent_70%)] blur-[140px]" />

                {/* Right Accent: Rich Blue / Violet Radial */}
                <div className="absolute top-[65%] -right-[15%] w-[850px] h-[850px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.14)_0%,_rgba(124,58,237,0.10)_50%,_transparent_75%)] blur-[150px]" />

                {/* Global subtle vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,_rgba(67,56,202,0.12),_transparent)]" />
            </div>

            <Navbar />

            {/* Modern Bento Grid Hero & Overview */}
            <BentoGrid />

            {/* Live AI Demo Section */}
            <LiveAIDemo />

            {/* Projects Section */}
            <ProjectsSection />

            <AboutSection />
            <ExpertiseGrid />
            <LeetCodeStats />
            <ExperienceSection />
            <EducationSection />
            <CertificationsSection />
            <ContactSection />
            <Footer />
            <Toaster position="bottom-right" theme="dark" />
        </div>
    );
}
