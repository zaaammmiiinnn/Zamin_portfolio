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
        <div className="flex flex-col min-h-screen bg-[#050505]">
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
