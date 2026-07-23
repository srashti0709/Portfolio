import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, X, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" className="relative py-12 bg-bgPrimary border-t border-purplePrimary/10 overflow-hidden font-outfit">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header - Styled to match design system */}
        <div className="text-left mb-12">
          <span className="text-xs font-bold text-purpleSoft uppercase tracking-widest block mb-2 font-space">// STANDARDS COMPLIANCE</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-textWhite mb-4">Certifications</h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-purplePrimary to-purpleGlow rounded-full" />
        </div>

        {/* Continuous Horizontal Marquee Slider */}
        <div className="w-full relative overflow-hidden py-4 select-none">
          {/* Fading side edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bgPrimary to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bgPrimary to-transparent z-10 pointer-events-none" />

          {/* Marquee Content */}
          <div className="marquee-content gap-6 flex">
            {[...portfolioData.certifications, ...portfolioData.certifications, ...portfolioData.certifications, ...portfolioData.certifications].map((cert, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedCert(cert)}
                className="w-72 sm:w-80 glass-panel bg-bgCard/35 border-purplePrimary/12 hover:border-purplePrimary/60 p-6 rounded-2xl flex flex-col justify-between items-start text-left cursor-pointer transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex-shrink-0"
              >
                <div>
                  <div className="p-2.5 rounded-xl bg-purplePrimary/10 border border-purplePrimary/20 text-purplePrimary mb-4 inline-block">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-textWhite mb-1.5 leading-snug">{cert.title}</h3>
                  <span className="text-xs text-purplePrimary uppercase font-space font-semibold tracking-wider">{cert.issuer}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-textMuted mt-5 font-space">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Timeline below slider */}
        <div className="mt-16 text-left">
          {/* Subsection Header */}
          <div className="mb-8">
            <span className="text-xs font-bold text-purpleSoft uppercase tracking-widest block mb-2 font-space">// HISTORICAL LOGS</span>
            <h3 className="text-xl font-bold text-textWhite flex items-center gap-2">
              <ShieldCheck className="w-5.5 h-5.5 text-purpleSoft animate-pulse" />
              <span>Key Achievements</span>
            </h3>
          </div>

          <div className="glass-panel border-purplePrimary/12 bg-bgCard/35 p-6 sm:p-8 rounded-2xl">
            <div className="relative border-l border-purplePrimary/25 pl-6 ml-2 flex flex-col gap-6 font-outfit">
              {portfolioData.achievements.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline bullet dot */}
                  <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-purpleSoft border-2 border-bgPrimary shadow-[0_0_6px_rgba(217,70,239,0.4)]" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h4 className="text-sm font-bold text-textWhite">{item.title}</h4>
                      <span className="text-xs text-textMuted uppercase font-space tracking-wide">{item.issuer}</span>
                    </div>
                    <span className="text-[10px] text-purpleSoft font-bold font-space bg-purplePrimary/15 border border-purplePrimary/25 px-2.5 py-0.5 rounded-lg self-start sm:self-center">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-xs text-textSecondary leading-relaxed mt-2 text-justify">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Certification Details Modal Dialog */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-bgPrimary/80 backdrop-blur-sm"
            />
            {/* Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md glass-panel bg-bgCard/95 border-purpleSoft/40 p-6 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] text-left font-outfit"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 text-textMuted hover:text-textWhite transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-3 rounded-xl bg-purplePrimary/15 border border-purplePrimary/25 text-purpleSoft mb-4 inline-block">
                <Award className="w-6 h-6 animate-pulse" />
              </div>

              <h3 className="text-lg font-bold text-textWhite mb-1 leading-snug">{selectedCert.title}</h3>
              <span className="text-xs font-semibold text-purpleSoft uppercase font-space block mb-4">{selectedCert.issuer}</span>

              <p className="text-xs text-textSecondary leading-relaxed text-justify mb-6">
                {selectedCert.description}
              </p>

              <div className="flex justify-between items-center text-[10px] font-space text-textMuted border-t border-purplePrimary/15 pt-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Verified: {selectedCert.date}
                </span>
                <span className="text-purpleSoft uppercase font-semibold">Credential Verified</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
