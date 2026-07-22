import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CommandPalette from './components/CommandPalette';
import AIAssistant from './components/AIAssistant';
import SubtleCanvasBg from './components/SubtleCanvasBg';

// Main Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import CodingProfiles from './sections/CodingProfiles';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Command palette toggle keyboard listener (Ctrl + K / Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTogglePalette = () => {
    setIsPaletteOpen(prev => !prev);
  };

  return (
    <>
      {/* Canvas Backdrop with Floating Particles & glowing dots */}
      <SubtleCanvasBg />

      {/* Background Noise Overlay */}
      <div className="noise-overlay" />

      {/* Main Page Layout Container */}
      <div className="relative min-h-screen bg-bgPrimary text-white overflow-hidden selection:bg-purplePrimary/35 selection:text-white">
        
        {/* Floating Navbar */}
        <Navbar onOpenPalette={handleTogglePalette} />

        {/* Moving Background Lights & Grid */}
        <div className="absolute inset-0 cyber-grid pointer-events-none z-0 opacity-20"></div>
        <div className="soft-light-orb-1"></div>
        <div className="soft-light-orb-2"></div>

        {/* Main Content Sections stack with clean, balanced spacing */}
        <main className="relative z-10 flex flex-col gap-16 md:gap-24">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <CodingProfiles />
          <Certifications />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Command Palette Modal */}
        <CommandPalette 
          isOpen={isPaletteOpen} 
          onClose={() => setIsPaletteOpen(false)}
        />

        {/* AI Neural Chat Assistant widget */}
        <AIAssistant />

      </div>
    </>
  );
}
