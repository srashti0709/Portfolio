import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

export default function Hero() {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const titles = [
    "Full Stack Developer",
    "AI Developer",
    "MERN Stack Developer",
    "AI Integration Specialist",
    "Problem Solver"
  ];

  useEffect(() => {
    let timer = setTimeout(() => {
      handleType();
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, typingSpeed, loopNum]);

  const handleType = () => {
    const i = loopNum % titles.length;
    const fullTxt = titles[i];

    if (isDeleting) {
      setCurrentText(fullTxt.substring(0, currentText.length - 1));
      setTypingSpeed(40); // Fast delete
    } else {
      setCurrentText(fullTxt.substring(0, currentText.length + 1));
      setTypingSpeed(100); // Natural typing speed
    }

    if (!isDeleting && currentText === fullTxt) {
      setTypingSpeed(2000); // Pause at end of text
      setIsDeleting(true);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(300); // Pause before next word
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = portfolioData.profile.resumeUrl;
    link.download = 'Srashti_Shakya_Resume.pdf';
    link.click();
  };

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center w-full relative z-10">
        
        {/* Left Side: Text and Actions */}
        <div className="md:col-span-7 flex flex-col items-start text-left font-outfit order-2 md:order-1">
          
          {/* Welcome Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purplePrimary/10 border border-purplePrimary/20 text-purpleSoft text-xs font-semibold mb-6 uppercase tracking-wider font-space"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to my workspace</span>
          </motion.div>

          {/* Name */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-textWhite tracking-tight mb-2"
          >
            {portfolioData.profile.name}
          </motion.h1>

          {/* Typewriter Subheading (No layout shifts) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="h-8 mb-6 flex items-center min-h-[2rem]"
          >
            <span className="text-lg sm:text-xl font-bold font-space text-purpleSoft typing-caret pr-1">
              {currentText}
            </span>
          </motion.div>

          {/* Short Intro */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-textSecondary text-base sm:text-lg leading-relaxed mb-10 max-w-xl text-left font-normal"
          >
            I build scalable, AI-powered web applications with React.js, Node.js, and n8n workflows. I design smart interfaces that turn complex backend tasks into clean, intuitive products.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-wrap gap-4 items-center w-full"
          >
            <button
              onClick={() => scrollTo('projects')}
              className="glow-btn px-6 py-3.5 rounded-xl bg-purplePrimary text-bgPrimary font-bold text-sm flex items-center gap-2 hover:bg-purpleSoft transition-all duration-300 shadow-[0_4px_20px_rgba(168,85,247,0.25)]"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleDownloadResume}
              className="px-6 py-3.5 rounded-xl bg-bgCard hover:bg-bgSecondary border border-purplePrimary/15 hover:border-purpleSoft text-textWhite font-bold text-sm flex items-center gap-2 transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </button>

            {/* Social Links */}
            <div className="flex items-center gap-2 sm:ml-2">
              <a 
                href={portfolioData.profile.github}
                target="_blank" 
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-bgCard hover:bg-bgSecondary border border-purplePrimary/15 hover:border-purpleSoft text-textSecondary hover:text-white transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <FaGithub className="w-4.5 h-4.5" />
              </a>
              <a 
                href={portfolioData.profile.linkedin}
                target="_blank" 
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-bgCard hover:bg-bgSecondary border border-purplePrimary/15 hover:border-purpleSoft text-textSecondary hover:text-white transition-all duration-300"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="w-4.5 h-4.5" />
              </a>
              <button
                onClick={() => scrollTo('contact')}
                className="p-3.5 rounded-xl bg-bgCard hover:bg-bgSecondary border border-purplePrimary/15 hover:border-purpleSoft text-textSecondary hover:text-white transition-all duration-300"
                aria-label="Contact Section"
              >
                <Mail className="w-4.5 h-4.5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Rectangular Colored Portrait with Hover Glow border */}
        <div className="md:col-span-5 flex items-center justify-center order-1 md:order-2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
            className="relative w-72 h-80 sm:w-80 sm:h-[360px] md:w-96 md:h-[400px] rounded-3xl  border border-purplePrimary/30 hover:border-purpleGlow shadow-[0_0_25px_rgba(168,85,247,0.08)] hover:shadow-[0_0_40px_rgba(217,70,239,0.35)] transition-all duration-500 flex items-center justify-center bg-bgSecondary group cursor-pointer"
          >
            {/* Portrait Image wrapper */}
            <div className="w-full h-full rounded-2xl overflow-hidden border border-purplePrimary/20">
              <img 
                src={portfolioData.profile.photoUrl} 
                alt={portfolioData.profile.name} 
                className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-102"
              />
            </div>
            {/* Subtle purple border glow overlay */}
            <div className="absolute -inset-1 rounded-3xl border border-purpleSoft/15 pointer-events-none group-hover:border-purpleSoft/35 transition-colors duration-500 animate-pulse" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
