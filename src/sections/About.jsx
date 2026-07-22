import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Cpu, Code2, Terminal, Shield } from 'lucide-react';

// Reusable Rolling Counter component
const RollingCounter = ({ value, duration = 1500, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, {
  once: true,
  amount: 0.3,
});

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end) || end === 0) {
      setCount(value);
      return;
    }

    const totalSteps = 50;
    const stepTime = Math.max(10, Math.floor(duration / totalSteps));
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-space font-bold text-2xl sm:text-3xl text-neon-glow">
      {count}{suffix}
    </span>
  );
};

export default function About() {
  const containerRef = useRef(null);

  const timeline = [
    {
      year: "2024 - 2027",
      title: "Bachelor’s of Computer Application",
      subtitle: "Dezyne École College",
      desc: "Deepening knowledge in database schemas, computational logic, object-oriented methodologies, data structures, and advanced front-end designs."
    },
    {
      year: "2023 - 2024",
      title: "Senior Secondary (12th Class) - Science Stream",
      subtitle: "St. Paul's School, Ajmer",
      desc: "Completed with an aggregate score of 85%, developing strong critical thinking and analytical foundations."
    },
    {
      year: "2021 - 2022",
      title: "Secondary (10th Class)",
      subtitle: "St. Paul's School, Ajmer",
      desc: "Graduated with 87.6% aggregate, establishing core mathematical and programming interest."
    }
  ];

  const highlights = [
    {
      icon: <Cpu className="w-5 h-5 text-purpleSoft" />,
      title: "AI & Workflow Automation",
      desc: "Autonomous n8n agents, Google Gemini API, resume parsers, and custom prompt workflows."
    },
    {
      icon: <Code2 className="w-5 h-5 text-purpleSoft" />,
      title: "Full-Stack Development",
      desc: "Interactive React.js web apps backed by secure Node.js/Express.js REST APIs."
    },
    {
      icon: <Terminal className="w-5 h-5 text-purpleSoft" />,
      title: "Relational & NoSQL Databases",
      desc: "ACID transactions in MySQL and document structures in MongoDB."
    },
    {
      icon: <Shield className="w-5 h-5 text-purpleSoft" />,
      title: "Core Programming",
      desc: "Strong Data Structures, Algorithms, and OOP fundamentals in C++ and Java."
    }
  ];

  // Editable meaningful statistics with animated counters
  const statsList = [
    { value: "10", suffix: "+", label: "Projects Built" },
    { value: "300", suffix: "+", label: "LeetCode Problems Solved" },
    { value: "500", suffix: "+", label: "GitHub Contributions" },
    { value: "3", suffix: " Awards", label: "College Programming Competition" }
  ];

  return (
    <section id="about" ref={containerRef} className="relative py-12 bg-bgSecondary/30 border-t border-purplePrimary/10 overflow-hidden font-outfit">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <span className="text-xs font-bold text-purpleSoft uppercase tracking-widest block mb-2 font-space">// PROFILE PROTOCOL</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-textWhite mb-4">About Me</h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-purplePrimary to-purpleGlow rounded-full" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left panel: Info highlights & rolling counters */}
          <div className="lg:col-span-6 flex flex-col gap-8 text-left">
            <div>
              <h3 className="text-xl font-bold mb-6 text-textWhite">Core Strengths</h3>
              
              {/* Grid of Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((item, idx) => (
                  <div key={idx} className="glass-panel border-purplePrimary/10 bg-bgCard/35 p-4 flex flex-col items-start rounded-xl">
                    <div className="p-2 rounded-lg bg-purplePrimary/10 border border-purplePrimary/20 mb-3 text-purpleSoft">
                      {item.icon}
                    </div>
                    <h4 className="text-sm font-bold text-textWhite mb-1">{item.title}</h4>
                    <p className="text-xs text-textSecondary leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Redesigned Meaningful Statistics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {statsList.map((stat, idx) => (
                <div key={idx} className="glass-panel rounded-xl p-4 border-purplePrimary/10 bg-bgCard/20 flex flex-col justify-center">
                  <div className="flex items-baseline gap-0.5 justify-start">
                    <RollingCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <span className="text-[10px] text-textMuted uppercase font-space tracking-wider mt-1.5">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel: Academic Timeline (Kept exactly as requested) */}
          <div className="lg:col-span-6">
            <h3 className="text-xl font-bold mb-6 text-textWhite flex items-center gap-2">
              <GraduationCap className="w-5.5 h-5.5 text-purpleSoft" />
              <span>Academic Timeline</span>
            </h3>
            
            <div className="relative border-l border-purplePrimary/20 pl-6 ml-2 flex flex-col gap-6">
              {timeline.map((item, index) => (
                <div key={index} className="relative">
                  {/* Timeline point dot */}
                  <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-bgPrimary border-2 border-purpleSoft shadow-[0_0_8px_rgba(217,70,239,0.5)] flex items-center justify-center" />
                  
                  <div className="glass-panel bg-bgCard/40 border-purplePrimary/10 p-5 rounded-2xl">
                    <span className="text-xs text-purpleSoft font-bold font-space uppercase tracking-widest">{item.year}</span>
                    <h4 className="text-sm font-bold text-textWhite mt-1">{item.title}</h4>
                    <h5 className="text-xs text-textMuted mb-2.5 font-semibold">{item.subtitle}</h5>
                    <p className="text-xs text-textSecondary leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
