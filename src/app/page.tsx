"use client";

import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero";
import AboutSection from "@/components/about";
import ProjectsSection from "@/components/projects";
import ExperienceSection from "@/components/experience";
import ContactSection from "@/components/contact";
import Footer from "@/components/footer";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
      <Toaster position="bottom-right" theme="system" />
    </div>
  );
}
