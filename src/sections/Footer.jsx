import React from 'react';
import { ArrowUp, Mail, Heart, Download } from 'lucide-react';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = portfolioData.profile.resumeUrl;
    link.download = 'Srashti_Shakya_Resume.pdf';
    link.click();
  };

  const quickLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Achievements', id: 'certifications' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="relative bg-[#050505] border-t border-purplePrimary/10 pt-16 pb-8 overflow-hidden font-outfit text-left">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 relative z-10">
        
        {/* Left Column: Name, Title & Tagline (Col-span 5) */}
        <div className="md:col-span-5 flex flex-col items-start">
          <span className="font-bold text-textWhite tracking-wide text-lg block">{portfolioData.profile.name}</span>
          <span className="text-xs text-purpleSoft uppercase font-space tracking-wider block mt-1">
            {portfolioData.profile.title}
          </span>
          <p className="text-xs text-textSecondary leading-relaxed mt-4 max-w-sm">
            Building scalable AI-powered systems and clean full-stack web products with modular, performant architectures.
          </p>
        </div>

        {/* Middle Column: Quick Links (Col-span 3) */}
        <div className="md:col-span-3 flex flex-col items-start">
          <span className="text-[10px] uppercase font-space text-textMuted font-bold tracking-widest block mb-4">
            Navigation Node
          </span>
          <ul className="flex flex-col gap-2.5 text-xs font-semibold text-textSecondary font-space">
            {quickLinks.map((link) => (
              <li key={link.id}>
                <button 
                  onClick={() => scrollToSection(link.id)} 
                  className="hover:text-purpleSoft transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Social Channels & Resume Download (Col-span 4) */}
        <div className="md:col-span-4 flex flex-col items-start">
          <span className="text-[10px] uppercase font-space text-textMuted font-bold tracking-widest block mb-4">
            Communication channels
          </span>
          
          <div className="flex flex-wrap gap-2.5 mb-6">
            <a 
              href={portfolioData.profile.github}
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 rounded-lg bg-bgCard border border-purplePrimary/10 text-textSecondary hover:text-white transition-all"
              aria-label="GitHub Profile"
            >
              <FaGithub className="w-4.5 h-4.5" />
            </a>
            <a 
              href={portfolioData.profile.linkedin}
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 rounded-lg bg-bgCard border border-purplePrimary/10 text-textSecondary hover:text-white transition-all"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-4.5 h-4.5" />
            </a>
            <a 
              href={portfolioData.profile.leetcode}
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 rounded-lg bg-bgCard border border-purplePrimary/10 text-textSecondary hover:text-[#FFA116] transition-all"
              aria-label="LeetCode Profile"
            >
              <SiLeetcode className="w-4.5 h-4.5" />
            </a>
            <a 
              href={`mailto:${portfolioData.profile.email}`}
              className="p-2.5 rounded-lg bg-bgCard border border-purplePrimary/10 text-textSecondary hover:text-white transition-all"
              aria-label="Send Email"
            >
              <FaEnvelope className="w-4.5 h-4.5" />
            </a>
          </div>

          <button
            onClick={handleDownload}
            className="px-5 py-2.5 w-full rounded-xl bg-bgCard hover:bg-purplePrimary border border-purplePrimary/15 hover:border-transparent text-textWhite hover:text-bgPrimary text-xs font-bold font-space transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume PDF</span>
          </button>
        </div>

      </div>

      {/* Bottom Bar: Copyright, Back to top & Framework Sig */}
      <div className="max-w-6xl mx-auto px-6 border-t border-purplePrimary/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 text-[10px] font-space text-textMuted uppercase tracking-wider">
        <div>
          <span>© {new Date().getFullYear()} Srashti Shakya. All Systems Operational.</span>
        </div>

        <div className="flex items-center gap-1">
          <span>Made with React + Tailwind CSS + Framer Motion</span>
        </div>

        <button
          onClick={() => scrollToSection('hero')}
          className="p-2.5 rounded-lg bg-bgCard hover:bg-purplePrimary border border-purplePrimary/15 hover:border-transparent text-textSecondary hover:text-bgPrimary transition-all duration-300 flex items-center justify-center"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      {/* Subtle backlighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] h-[50px] bg-purplePrimary/10 rounded-full blur-[40px] pointer-events-none z-0" />
    </footer>
  );
}
