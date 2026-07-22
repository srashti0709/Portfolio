import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Compass } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Navbar({ onOpenPalette }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Coding Profiles', id: 'profiles' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Scrolled state for backdrop filter
      setScrolled(window.scrollY > 20);

      // Scroll Progress calculations
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Check current section
      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}>
        {/* Scroll Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purplePrimary via-purpleGlow to-purpleSoft transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Brand */}
          <button 
            onClick={() => scrollTo('hero')} 
            className="flex items-center gap-2 text-left font-outfit"
          >
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-purplePrimary to-purpleGlow flex items-center justify-center font-bold text-bgPrimary shadow-[0_0_12px_rgba(168,85,247,0.4)]">
              S
              <span className="absolute -inset-0.5 rounded-lg border border-purpleSoft/30 animate-pulse"></span>
            </div>
            <div>
              <span className="font-bold text-textWhite text-sm tracking-wide block">SRASHTI SHAKYA</span>
              <span className="text-[10px] text-purpleSoft uppercase tracking-widest block font-space">AI & Full Stack</span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-bgCard/40 border border-purplePrimary/10">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`relative px-4 py-1.5 rounded-full font-outfit text-sm font-semibold transition-all duration-300 ${
                      isActive ? 'text-bgPrimary' : 'text-textSecondary hover:text-textWhite'
                    }`}
                  >
                    {isActive && (
                      <motion.span 
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-gradient-to-r from-purpleSoft to-purplePrimary rounded-full -z-10 shadow-[0_0_10px_rgba(217,70,239,0.4)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Ctrl + K Shortcut Button */}
            <button
              onClick={onOpenPalette}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bgCard/60 border border-purplePrimary/15 hover:border-purpleSoft/40 text-textMuted hover:text-textWhite transition-all duration-300 font-space text-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
              <kbd className="bg-bgPrimary px-1.5 py-0.5 rounded border border-purplePrimary/10 text-[9px]">Ctrl+K</kbd>
            </button>
          </div>

          {/* Mobile menu and Palette buttons */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={onOpenPalette}
              className="p-2 rounded-lg bg-bgCard/80 border border-purplePrimary/10 text-textSecondary"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-bgCard/80 border border-purplePrimary/10 text-textSecondary"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[60px] z-30 bg-bgPrimary/95 backdrop-blur-lg flex flex-col items-center justify-center p-6 border-t border-purplePrimary/10 md:hidden"
          >
            <div className="flex flex-col gap-6 w-full max-w-sm text-center font-outfit">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-xl font-bold p-3 rounded-xl border transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'border-purpleGlow bg-purplePrimary/10 text-purpleSoft shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                      : 'border-transparent text-textSecondary hover:text-textWhite'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
