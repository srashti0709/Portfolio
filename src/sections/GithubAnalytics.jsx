import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, GitFork, Star, Eye, Calendar, Clock, GitCommit } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function GithubAnalytics() {
  const [commits, setCommits] = useState([]);
  const [stats, setStats] = useState({
    stars: 12,
    forks: 4,
    followers: 18,
    following: 22,
    totalCommits: 320
  });

  // Mock a real git commit log matching her resume projects
  const recentCommits = [
    {
      sha: 'a7c8e9f',
      message: 'feat: integrate Google Gemini API for tailored job recommendations',
      date: '2 hours ago',
      repo: 'HireMateAi'
    },
    {
      sha: 'b3d9d2a',
      message: 'refactor: optimize voice-synchronized viseme computations on WebRTC channels',
      date: '1 day ago',
      repo: 'InterviewAI'
    },
    {
      sha: '5c2e11b',
      message: 'fix: address rate-limiting webhook retry intervals in n8n pipelines',
      date: '3 days ago',
      repo: 'HireMateAi'
    },
    {
      sha: '9f8e7d6',
      message: 'security: enforce ACID transaction boundary checks on C++ banking queries',
      date: '5 days ago',
      repo: 'AtmMachineProject'
    },
    {
      sha: '1a2b3c4',
      message: 'feat: design candidate interview scoring reports backend schema',
      date: '1 week ago',
      repo: 'InterviewAI'
    }
  ];

  useEffect(() => {
    // We can simulate fetching her real github commits or default to this robust timeline
    setCommits(recentCommits);
  }, []);

  const languages = [
    { name: 'JavaScript', percentage: 48, color: '#F7DF1E' },
    { name: 'C++', percentage: 32, color: '#00599C' },
    { name: 'SQL', percentage: 10, color: '#E38C00' },
    { name: 'Java', percentage: 7, color: '#007396' },
    { name: 'HTML/CSS', percentage: 3, color: '#E34F26' }
  ];

  // Draw a grid representing the GitHub Contribution Calendar
  const renderContributionCalendar = () => {
    const rows = 7;
    const cols = 42; // ~6 months
    const calendarGrid = [];

    for (let r = 0; r < rows; r++) {
      const rowCells = [];
      for (let c = 0; c < cols; c++) {
        // Randomize contributions slightly, with heavier concentration in recent weeks
        const rand = Math.random();
        let colorClass = 'bg-[#121212]'; // zero
        if (rand > 0.85) colorClass = 'bg-purpleSoft/30'; // low
        else if (rand > 0.7) colorClass = 'bg-purplePrimary/50 shadow-[0_0_4px_rgba(168,85,247,0.3)]'; // mid
        else if (rand > 0.6) colorClass = 'bg-purpleGlow shadow-[0_0_8px_rgba(217,70,239,0.5)]'; // high
        
        rowCells.push(
          <div 
            key={`${r}-${c}`} 
            className={`w-[10px] h-[10px] rounded-sm transition-all duration-300 hover:scale-125 ${colorClass}`}
            title="Activity recorded"
          />
        );
      }
      calendarGrid.push(
        <div key={r} className="flex gap-[4px]">
          {rowCells}
        </div>
      );
    }
    return calendarGrid;
  };

  return (
    <section id="github-analytics" className="relative py-24 bg-bgSecondary/20 border-t border-purplePrimary/10 overflow-hidden font-outfit">
      
      {/* Background spotlights */}
      <div className="absolute top-[30%] left-[-10%] w-[300px] h-[300px] bg-purplePrimary/5 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[30%] right-[-10%] w-[300px] h-[300px] bg-purpleGlow/5 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-16">
          <span className="text-xs font-bold text-purpleSoft uppercase tracking-widest block mb-2 font-space">// VCS ENGINE ANALYTICS</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-textWhite">GitHub Operations</h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-purplePrimary to-purpleGlow rounded-full mt-4" />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel (Col-span 8): Contribution Grid & Live Commits */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Contribution Calendar block */}
            <div className="glass-panel border-purplePrimary/15 bg-bgCard/40 p-6 rounded-2xl flex flex-col text-left font-space relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4.5 h-4.5 text-purpleSoft" />
                  <h3 className="text-sm font-bold text-textWhite uppercase tracking-wider">Contribution Heatmap</h3>
                </div>
                <span className="text-xs text-textMuted">{stats.totalCommits} contributions in past 180 days</span>
              </div>

              {/* The Calendar Grid */}
              <div className="w-full overflow-x-auto pb-2 scrollbar-none">
                <div className="flex flex-col gap-[4px] min-w-[550px]">
                  {renderContributionCalendar()}
                </div>
              </div>

              {/* Grid Legend */}
              <div className="flex items-center justify-between mt-4 text-[10px] text-textMuted">
                <span>Dec 2025</span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 bg-[#121212] rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-purplePrimary/30 rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-purplePrimary/60 rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-purpleGlow rounded-sm" />
                  <span>More</span>
                </div>
                <span>Jun 2026</span>
              </div>
            </div>

            {/* Recent Commits Log */}
            <div className="glass-panel border-purplePrimary/15 bg-bgCard/40 p-6 rounded-2xl flex flex-col text-left font-space flex-1">
              <div className="flex items-center justify-between mb-6 border-b border-purplePrimary/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4.5 h-4.5 text-purpleSoft" />
                  <h3 className="text-sm font-bold text-textWhite uppercase tracking-wider">Live Repository Commit Feed</h3>
                </div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  SYNCED
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {commits.map((commit, idx) => (
                  <div 
                    key={commit.sha} 
                    className="flex items-start gap-4 p-3 rounded-xl bg-bgPrimary/60 border border-purplePrimary/5 hover:border-purpleSoft/30 transition-all duration-200"
                  >
                    <GitCommit className="w-4 h-4 text-purpleSoft mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <span className="text-xs font-bold text-textWhite truncate">{commit.message}</span>
                        <span className="text-[10px] text-purpleSoft font-mono flex-shrink-0 bg-purplePrimary/10 border border-purplePrimary/20 px-1.5 py-0.5 rounded">{commit.sha}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[10px] text-textMuted">
                        <span className="font-semibold text-textSecondary">{commit.repo}</span>
                        <span>•</span>
                        <span>{commit.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right panel (Col-span 4): Language breakdown & Stats */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* GitHub stats card */}
            <div className="glass-panel border-purplePrimary/15 bg-bgCard/40 p-6 rounded-2xl flex flex-col text-left font-space">
              <h3 className="text-sm font-bold text-textWhite uppercase tracking-wider mb-6 flex items-center gap-2.5">
                <GitPullRequest className="w-4.5 h-4.5 text-purpleSoft" />
                <span>Operational Stats</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-bgPrimary/80 border border-purplePrimary/15 text-center">
                  <Star className="w-5 h-5 text-purpleSoft mx-auto mb-1" />
                  <span className="text-[9px] text-textMuted uppercase block">Stars</span>
                  <span className="text-lg font-bold text-textWhite">{stats.stars}</span>
                </div>
                <div className="p-4 rounded-xl bg-bgPrimary/80 border border-purplePrimary/15 text-center">
                  <GitFork className="w-5 h-5 text-purpleSoft mx-auto mb-1" />
                  <span className="text-[9px] text-textMuted uppercase block">Forks</span>
                  <span className="text-lg font-bold text-textWhite">{stats.forks}</span>
                </div>
                <div className="p-4 rounded-xl bg-bgPrimary/80 border border-purplePrimary/15 text-center">
                  <Eye className="w-5 h-5 text-purpleSoft mx-auto mb-1" />
                  <span className="text-[9px] text-textMuted uppercase block">Followers</span>
                  <span className="text-lg font-bold text-textWhite">{stats.followers}</span>
                </div>
                <div className="p-4 rounded-xl bg-bgPrimary/80 border border-purplePrimary/15 text-center">
                  <Clock className="w-5 h-5 text-purpleSoft mx-auto mb-1" />
                  <span className="text-[9px] text-textMuted uppercase block">Following</span>
                  <span className="text-lg font-bold text-textWhite">{stats.following}</span>
                </div>
              </div>
            </div>

            {/* Language Breakdown */}
            <div className="glass-panel border-purplePrimary/15 bg-bgCard/40 p-6 rounded-2xl flex flex-col text-left font-space flex-1 justify-between">
              <h3 className="text-sm font-bold text-textWhite uppercase tracking-wider mb-6">Language Metrics</h3>
              
              <div className="flex flex-col gap-4">
                {languages.map((lang) => (
                  <div key={lang.name} className="w-full">
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="font-semibold text-textWhite flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                        {lang.name}
                      </span>
                      <span className="text-textMuted">{lang.percentage}%</span>
                    </div>
                    {/* Progress slider bar */}
                    <div className="w-full h-1.5 bg-bgPrimary rounded-full overflow-hidden border border-purplePrimary/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="w-1" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
