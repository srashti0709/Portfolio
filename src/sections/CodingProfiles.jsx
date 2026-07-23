import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Award, Terminal } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks, SiCodechef } from 'react-icons/si';
import { portfolioData } from '../data/portfolioData';

// Platform Icon Helper with official logos
const getPlatformIcon = (platform) => {
  switch (platform) {
    case 'GitHub': return <FaGithub className="w-6 h-6 text-white" />;
    case 'LeetCode': return <SiLeetcode className="w-6 h-6 text-[#FFA116]" />;
    case 'GeeksforGeeks': return <SiGeeksforgeeks className="w-6 h-6 text-[#2F8D46]" />;
    case 'CodeChef': return <SiCodechef className="w-6 h-6 text-[#5B4636]" />;
    default: return <Award className="w-6 h-6 text-purpleSoft" />;
  }
};

// Platform Description Helper
const getPlatformDescription = (platform) => {
  switch (platform) {
    case 'GitHub':
      return "Explore my open-source projects, repositories, n8n automation workflows, and backend API repositories.";
    case 'LeetCode':
      return "View my solved coding problems, database query challenges, and overall DSA milestones.";
    case 'GeeksforGeeks':
      return "Check my solved problems, conceptual notes, and coding practice metrics.";
    case 'CodeChef':
      return "Inspect my competitive programming ratings, contest history, and algorithmic metrics.";
    default:
      return "Explore my programming journey and solved coding achievements.";
  }
};

export default function CodingProfiles() {
  const handleOpenProfile = (url) => {
    if (url) window.open(url, '_blank');
  };

  return (
    <section id="profiles" className="relative py-12 bg-bgPrimary border-t border-purplePrimary/10 overflow-hidden font-outfit">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-16">
          <span className="text-xs font-bold text-purpleSoft uppercase tracking-widest block mb-2 font-space">// PERFORMANCE METRICS</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-textWhite">Coding Profiles</h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-purplePrimary to-purpleGlow rounded-full mt-4" />
        </div>

        {/* Profiles Grid with higher cards and generous padding */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioData.codingProfiles.map((profile) => (
            <motion.div
              key={profile.platform}
              whileHover={{ y: -6 ,boxShadow: "0px 0px 10px 4px rgba(139, 92, 246, 0.5)",border:"2px solid rgba(139, 92, 246, 0.5)" }}
              transition={{ type: 'spring', damping: 20 }}
              className="glass-panel border-purplePrimary/12 bg-bgCard/35 p-8 min-h-[300px] rounded-2xl flex flex-col justify-between items-start text-left relative overflow-hidden shadow-md"
            >
              {/* Subtle background overlay */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-purplePrimary/5 rounded-full blur-2xl" />

              <div className="w-full">
                {/* Platform Header */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="p-3 rounded-xl bg-bgPrimary border border-purplePrimary/10 flex items-center justify-center">
                    {getPlatformIcon(profile.platform)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-textWhite leading-none">{profile.platform}</h3>
                    <span className="text-[10px] uppercase font-space tracking-wider text-purpleSoft mt-1.5 block">Active Node</span>
                  </div>
                </div>

                <span className="text-xs text-textMuted font-mono block mb-4">@{profile.username}</span>
                
                {/* Short Profile Description */}
                <p className="text-xs text-textSecondary leading-relaxed text-justify mb-6">
                  {getPlatformDescription(profile.platform)}
                </p>
              </div>

              {/* Visit Profile Button */}
              <button
                onClick={() => handleOpenProfile(profile.url)}
                className="w-full py-3 rounded-xl bg-bgPrimary hover:bg-purplePrimary border border-purplePrimary/15 hover:border-transparent text-textSecondary hover:text-bgPrimary text-xs font-bold font-space transition-all duration-300 flex items-center justify-center gap-1.5"
              >
                <span>Visit Profile</span>
                <span className="text-xs">➔</span>
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
