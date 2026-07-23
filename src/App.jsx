import React, { useState,  useEffect  } from "react";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import CommandPalette from "./components/CommandPalette";
import AIAssistant from "./components/AIAssistant";
import BackgroundScene from "./components/background/BackgroundScene";
import Loader from "./components/Loader";

// Main Sections
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import CodingProfiles from "./sections/CodingProfiles";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function App() {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Command Palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Loading Logic
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const loadEverything = async () => {
      try {
        // Start
        setProgress(10);

        // Fonts
        if (document.fonts) {
          await document.fonts.ready;
        }

        setProgress(35);

        // Browser finished loading
        if (document.readyState !== "complete") {
          await new Promise((resolve) =>
            window.addEventListener("load", resolve, { once: true })
          );
        }

        setProgress(70);

        // Small delay for smoothness
        await new Promise((resolve) => setTimeout(resolve, 300));

        setProgress(100);

        // Let user see 100%
        await new Promise((resolve) => setTimeout(resolve, 300));

        setLoading(false);
        document.body.style.overflow = "auto";
      } catch (err) {
        console.error(err);
        setLoading(false);
        document.body.style.overflow = "auto";
      }
    };

    loadEverything();
  }, []);

  const handleTogglePalette = () => {
    setIsPaletteOpen((prev) => !prev);
  };

  return (
    <>
      <BackgroundScene />

      <AnimatePresence mode="wait">
        {loading && <Loader progress={progress} />}
      </AnimatePresence>

      <div className="relative z-10">
        <div className="noise-overlay" />

        <div className="relative min-h-screen bg-transparent text-white overflow-hidden selection:bg-purplePrimary/35 selection:text-white">

          <Navbar onOpenPalette={handleTogglePalette} />

          <div className="absolute inset-0 cyber-grid pointer-events-none z-0 opacity-20"></div>
          <div className="soft-light-orb-1"></div>
          <div className="soft-light-orb-2"></div>

          <main className="relative z-10 flex flex-col gap-16 md:gap-24">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <CodingProfiles />
            <Certifications />
            <Contact />
          </main>

          <Footer />

          <CommandPalette
            isOpen={isPaletteOpen}
            onClose={() => setIsPaletteOpen(false)}
          />

          <AIAssistant />
        </div>
      </div>
    </>
  );
}