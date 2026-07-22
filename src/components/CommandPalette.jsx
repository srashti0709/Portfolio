import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, ArrowRight, CornerDownLeft, Volume2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function CommandPalette({ isOpen, onClose }) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Core list of action triggers
  const getActions = () => {
    const list = [
      { id: 'sec-hero', title: 'Go to Home Section', category: 'Navigation', action: () => scrollTo('hero') },
      { id: 'sec-about', title: 'Go to About Section', category: 'Navigation', action: () => scrollTo('about') },
      { id: 'sec-skills', title: 'Go to Skills Galaxy', category: 'Navigation', action: () => scrollTo('skills') },
      { id: 'sec-projects', title: 'Go to Projects Showcase', category: 'Navigation', action: () => scrollTo('projects') },
      { id: 'sec-profiles', title: 'Go to Coding Profiles', category: 'Navigation', action: () => scrollTo('profiles') },
      { id: 'sec-contact', title: 'Go to Contact Form', category: 'Navigation', action: () => scrollTo('contact') },
      
      // Projects jump
      { id: 'proj-interview-ai', title: 'View Project: Interview AI Platform', category: 'Projects', action: () => scrollTo('interview-ai') },
      { id: 'proj-hiremate-ai', title: 'View Project: HireMate AI Assistant', category: 'Projects', action: () => scrollTo('hiremate-ai') },
      { id: 'proj-atm-system', title: 'View Project: ATM Management System', category: 'Projects', action: () => scrollTo('atm-system') },

      // Utilities
      { id: 'util-resume', title: 'Download Professional Resume PDF', category: 'Utility', action: () => downloadResume() },
      { id: 'util-github', title: 'Open GitHub Profile', category: 'Social', action: () => window.open(portfolioData.profile.github, '_blank') },
      { id: 'util-linkedin', title: 'Open LinkedIn Profile', category: 'Social', action: () => window.open(portfolioData.profile.linkedin, '_blank') },
    ];

    if (!search) return list;
    return list.filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    );
  };

  const actions = getActions();

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Command palette hotkey handler (Ctrl+K and Esc)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // wait, handled in App.jsx but let's toggle safely
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => actions.length > 0 ? (prev + 1) % actions.length : 0);
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => actions.length > 0 ? (prev - 1 + actions.length) % actions.length : 0);
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        if (actions[selectedIndex]) {
          actions[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, actions]);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = portfolioData.profile.resumeUrl;
    link.download = 'Srashti_Shakya_Resume.pdf';
    link.click();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-bgPrimary/80 backdrop-blur-md"
        />

        {/* Command Panel modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl glass-panel bg-bgCard/95 border-purplePrimary/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.25)] font-outfit"
        >
          {/* Header Input box */}
          <div className="flex items-center gap-3.5 border-b border-purplePrimary/20 px-4 py-4">
            <Search className="w-5 h-5 text-purpleSoft" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search shortcuts, pages, and projects..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedIndex(0);
              }}
              className="w-full bg-transparent text-textWhite placeholder-textMuted outline-none text-base font-semibold"
            />
            <button 
              onClick={onClose}
              className="text-[10px] uppercase font-space bg-bgPrimary border border-purplePrimary/15 text-textMuted px-2 py-1 rounded"
            >
              ESC
            </button>
          </div>

          {/* Action listing */}
          <div className="max-h-[300px] overflow-y-auto p-2">
            {actions.length > 0 ? (
              actions.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.action();
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 text-left ${
                      isSelected 
                        ? 'bg-purplePrimary/15 border border-purpleSoft/40 text-textWhite shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
                        : 'border border-transparent text-textSecondary hover:text-textWhite'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg border ${
                        isSelected 
                          ? 'bg-purpleSoft/25 border-purpleSoft text-purpleSoft' 
                          : 'bg-bgPrimary border-purplePrimary/10 text-textMuted'
                      }`}>
                        {item.category === 'Utility' ? <Volume2 className="w-3.5 h-3.5" /> : <Terminal className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <span className="text-sm font-semibold">{item.title}</span>
                        <span className="text-[10px] uppercase font-space text-purpleSoft ml-2 px-1.5 py-0.5 rounded bg-purplePrimary/5 border border-purplePrimary/10">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="flex items-center gap-1 text-textMuted text-[10px] font-space">
                        <span>SELECT</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="text-center py-8 text-textMuted font-outfit text-sm">
                No matching shortcut actions found.
              </div>
            )}
          </div>

          {/* Footer Guide bar */}
          <div className="border-t border-purplePrimary/15 bg-bgPrimary/60 px-4 py-2.5 flex items-center justify-between text-[10px] font-space text-textMuted">
            <div className="flex items-center gap-3">
              <span>↑↓ Navigation</span>
              <span>[Enter] Select</span>
            </div>
            <span>Double click navbar to trigger Search</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
