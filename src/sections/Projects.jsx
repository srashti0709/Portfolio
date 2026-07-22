import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, Layers, Bot, Code, Cpu } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const filterButtons = [
    { label: 'All', value: 'All' },
    { label: 'AI Projects', value: 'AI Projects' },
    { label: 'MERN Projects', value: 'MERN Projects' },
    { label: 'Frontend Projects', value: 'Frontend Projects' },
    { label: 'Desktop Projects', value: 'Desktop Projects' }
  ];

  // Helper to determine categories for Srashti's projects
  const getProjectCategories = (projectId) => {
    switch (projectId) {
      case 'interview-ai':
        return ['AI Projects', 'MERN Projects'];
      case 'hiremate-ai':
        return ['AI Projects', 'Frontend Projects'];
      case 'atm-system':
        return ['Desktop Projects'];
      case 'florenza':
        return ['Frontend Projects'];
      default:
        return [];
    }
  };

  const filteredProjects = portfolioData.projects.filter(project => {
    if (filter === 'All') return true;
    const cats = getProjectCategories(project.id);
    return cats.includes(filter);
  });

  const handleOpenLink = (url) => {
    if (url) window.open(url, '_blank');
  };

  const renderCardGraphic = (projectId) => {
    if (projectId === 'interview-ai') {
      return (
        <div className="w-full h-44 bg-gradient-to-tr from-[#120E2E] to-[#1F072D] relative overflow-hidden border-b border-purplePrimary/10">
          <img 
            src="/interview_ai.jpg" 
            alt="Interview AI Preview" 
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
          />
          {/* Decorative scanner line */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-purpleGlow/30 animate-pulse" />
        </div>
      );  
    }
    if (projectId === 'hiremate-ai') {
      return (
        <div className="w-full h-44 bg-gradient-to-tr from-[#0B1528] to-[#120E2E] relative overflow-hidden border-b border-purplePrimary/10">
          <img 
            src="/hiremate_ai.jpg" 
            alt="Hiremate AI Preview" 
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
          />
        </div>
      );
    }
    if (projectId === 'florenza') {
  return (
    <div className="w-full h-44 bg-gradient-to-tr from-[#120E2E] to-[#1A102F] relative overflow-hidden border-b border-purplePrimary/10">
      <img
        src="/florenza.png"
        alt="Florenza Preview"
        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
      />
    </div>
  );
}
if (projectId === 'discover-ajmer') {
  return (
    <div className="w-full h-44 bg-gradient-to-tr from-[#0B1528] to-[#120E2E] relative overflow-hidden border-b border-purplePrimary/10">
      <img
        src="/ajmer.png"
        alt="Discover Ajmer Preview"
        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
      />
    </div>
  );
}
    // ATM
    return (
      <div className="w-full h-44 bg-gradient-to-tr from-[#050B14] to-[#0A0D14] relative overflow-hidden border-b border-purplePrimary/10">
        <img 
          src="/atm_project.jpg" 
          alt="ATM Console System Preview" 
          className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
        />
      </div>
    );
  };

  return (
    <section id="projects" className="relative py-16 bg-bgSecondary/20 border-t border-purplePrimary/10 overflow-hidden font-outfit">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <span className="text-xs font-bold text-purpleSoft uppercase tracking-widest block mb-2 font-space">// PORTFOLIO DIRECTORY</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-textWhite">Featured Projects</h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-purplePrimary to-purpleGlow rounded-full mt-4" />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-purplePrimary/10">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-space transition-all duration-300 ${
                filter === btn.value
                  ? 'bg-purplePrimary text-bgPrimary shadow-[0_0_12px_rgba(168,85,247,0.35)]'
                  : 'bg-bgCard border border-purplePrimary/15 text-textSecondary hover:text-textWhite hover:border-purpleSoft/40'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const cats = getProjectCategories(project.id);
              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{boxShadow:"0px 0px 20px 4px rgba(124, 58, 237, 0.6)" }}
                  className="project-card-container flex flex-col justify-between glass-panel border-purplePrimary/12 bg-bgCard/35 rounded-2xl overflow-hidden shadow-lg h-full text-left border:1 hover:border-violet-600"
                >
                  <div className="w-full">
                    {/* Visual Card Image Graphic */}
                    <div className="project-card-image-container">
                      <div className="project-card-image">
                        {renderCardGraphic(project.id)}
                      </div>
                    </div>

                    {/* Card details */}
                    <div className="p-5">
                      {/* Categories Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-3.5">
                        {cats.map((c) => (
                          <span 
                            key={c}
                            className="text-[9px] font-bold font-space uppercase tracking-wider text-purpleSoft bg-purplePrimary/5 border border-purplePrimary/10 px-2 py-0.5 rounded"
                          >
                            {c}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-lg font-bold text-textWhite mb-2 tracking-tight leading-snug">{project.title}</h3>
                      <p className="text-textSecondary text-xs leading-relaxed mb-5 text-justify">
                        {project.description.slice(0, 140)}...
                      </p>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {project.tech.map((t) => (
                          <span 
                            key={t}
                            className="text-[10px] font-space px-2 py-1 rounded-lg bg-bgPrimary border border-purplePrimary/10 text-textMuted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="px-5 pb-5 pt-2 flex items-center gap-3">
                    <button
                      onClick={() => handleOpenLink(project.githubUrl)}
                      className="flex-1 py-2.5 rounded-xl bg-bgPrimary hover:bg-bgSecondary border border-purplePrimary/15 hover:border-purpleSoft text-textSecondary hover:text-white text-xs font-bold font-space transition-all duration-300 flex items-center justify-center gap-1.5"
                    >
                      <FaGithub className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </button>
                    {project.liveUrl && (
                      <button
                        onClick={() => handleOpenLink(project.liveUrl)}
                        className="glow-btn flex-1 py-2.5 rounded-xl bg-purplePrimary text-bgPrimary font-bold text-xs font-space transition-all duration-300 flex items-center justify-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live</span>
                      </button>
                    )}
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
