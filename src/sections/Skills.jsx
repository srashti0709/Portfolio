import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiJavascript, 
  SiTailwindcss, SiGit, SiPostman, SiMysql, SiCplusplus, 
  SiHtml5
} from 'react-icons/si';
import { FaJava, FaCode, FaLink, FaBrain, FaLaptop, FaGithub, FaServer } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

// Skill Icon Selector mapping official tech logos
const getSkillIcon = (name) => {
  switch (name) {
    case 'React.js': return <SiReact className="w-5 h-5 text-purpleSoft" />;
    case 'HTML5': return <SiHtml5 className="w-5 h-5 text-purpleSoft" />;
    case 'CSS3': return <FaCode className="w-5 h-5 text-purpleSoft" />;
    case 'Tailwind CSS': return <SiTailwindcss className="w-5 h-5 text-purpleSoft" />;
    case 'Node.js': return <SiNodedotjs className="w-5 h-5 text-purpleSoft" />;
    case 'Express.js': return <SiExpress className="w-5 h-5 text-purpleSoft" />;
    case 'MongoDB': return <SiMongodb className="w-5 h-5 text-purpleSoft" />;
    case 'MySQL': return <SiMysql className="w-5 h-5 text-purpleSoft" />;
    case 'C++': return <SiCplusplus className="w-5 h-5 text-purpleSoft" />;
    case 'C': return <FaCode className="w-5 h-5 text-purpleSoft" />;
    case 'Java': return <FaJava className="w-5 h-5 text-purpleSoft" />;
    case 'VB.NET': return <FaCode className="w-5 h-5 text-purpleSoft" />;
    case 'Git': return <SiGit className="w-5 h-5 text-purpleSoft" />;
    case 'GitHub': return <FaGithub className="w-5 h-5 text-purpleSoft" />;
    case 'n8n': return <FaServer className="w-5 h-5 text-purpleSoft" />;
    case 'Postman': return <SiPostman className="w-5 h-5 text-purpleSoft" />;
    case 'REST APIs': return <FaLink className="w-5 h-5 text-purpleSoft" />;
    case 'Data Structures & Algorithms': return <FaBrain className="w-5 h-5 text-purpleSoft" />;
    case 'Object-Oriented Programming': return <FaCode className="w-5 h-5 text-purpleSoft" />;
    case 'Responsive Web Design': return <FaLaptop className="w-5 h-5 text-purpleSoft" />;
    default: return <FaCode className="w-5 h-5 text-purpleSoft" />;
  }
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { label: 'All', value: 'All' },
    { label: 'Programming Languages', value: 'Languages' },
    { label: 'Frontend', value: 'Frontend' },
    { label: 'Backend', value: 'Backend' },
    { label: 'Databases', value: 'Databases' },
    { label: 'AI & Automation', value: 'Automation' },
    { label: 'Tools & Platforms', value: 'Tools' },
    { label: 'Core Concepts', value: 'Concepts' }
  ];

  const filteredSkills = portfolioData.skills.filter((skill) => {
    if (activeCategory === 'All') return true;
    return skill.category === activeCategory;
  });

  return (
    <section id="skills" className="relative py-12 bg-bgPrimary border-t border-purplePrimary/10 overflow-hidden font-outfit">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <span className="text-xs font-bold text-purpleSoft uppercase tracking-widest block mb-2 font-space">// CAPABILITIES SCHEMA</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-textWhite mb-4">Core Skills</h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-purplePrimary to-purpleGlow rounded-full" />
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-purplePrimary/10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              
              className={`px-4 py-2 rounded-xl text-xs font-bold font-space transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-purplePrimary text-bgPrimary shadow-[0_0_12px_rgba(168,85,247,0.35)]'
                  : 'bg-bgCard border border-purplePrimary/15 text-textSecondary hover:text-textWhite hover:border-violet-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -3,border:"2px solid indigo"}}
                className="glass-panel p-4 rounded-xl flex items-center gap-3 text-left shadow-sm select-none border:3 hover:border-violet-600"
              >
                {/* Official Icon Wrapper */}
                <div className="p-2 rounded-lg bg-bgPrimary border border-purplePrimary/10 flex-shrink-0 flex items-center justify-center">
                  {getSkillIcon(skill.name)}
                </div>
                
                {/* Skill Name */}
                <div className="min-w-0">
                  <span className="text-xs font-bold text-textWhite font-space block truncate leading-tight">{skill.name}</span>
                  <span className="text-[9px] text-textMuted uppercase font-space tracking-wider block mt-0.5">{skill.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
