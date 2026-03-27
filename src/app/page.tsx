"use client";

import Navbar from "@/components/navbar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import AboutSection from "@/components/about";
import ExpertiseGrid from "@/components/ExpertiseGrid";
import ProjectsSection from "@/components/projects";
import GitHubActivity from "@/components/github-activity";
import LeetCodeStats from "@/components/LeetCodeStats";
import ExperienceSection from "@/components/experience";
import CertificationsSection from "@/components/certifications";
import ContactSection from "@/components/contact";
import Footer from "@/components/footer";
import { Toaster } from "sonner";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-[#050505]">
            <Navbar />

            {/* Scrollytelling Hero */}
            <div className="relative">
                <ScrollyCanvas />
                <Overlay />
            </div>

            <AboutSection />
            <ExpertiseGrid />
            <ProjectsSection />
            <LeetCodeStats />
            <GitHubActivity />
            <ExperienceSection />
            <CertificationsSection />
            <ContactSection />
            <Footer />
            <Toaster position="bottom-right" theme="dark" />
        </div>
    );
}
