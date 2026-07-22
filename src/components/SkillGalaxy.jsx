import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { 
  Cpu, Code2, Database, Terminal, Workflow, Layout, Award, HelpCircle
} from 'lucide-react';

// Help helper to get category icons
const getCategoryIcon = (category) => {
  switch (category) {
    case 'Languages': return <Terminal className="w-5 h-5" />;
    case 'Frontend': return <Layout className="w-5 h-5" />;
    case 'Backend': return <Code2 className="w-5 h-5" />;
    case 'Databases': return <Database className="w-5 h-5" />;
    case 'Automation': return <Workflow className="w-5 h-5" />;
    case 'Tools': return <Cpu className="w-5 h-5" />;
    default: return <Award className="w-5 h-5" />;
  }
};

export default function SkillGalaxy() {
  const containerRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const animationFrameId = useRef(null);
  const time = useRef(0);

  // Initialize nodes with base positions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = Math.max(450, window.innerHeight * 0.55);
        setDimensions({ width, height });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0) return;

    // Distribute skills across layout
    const padding = 60;
    const skillsList = portfolioData.skills;
    const count = skillsList.length;
    
    const initializedNodes = skillsList.map((skill, index) => {
      // Semi-random layout grouped loosely by category
      let angle = (index / count) * Math.PI * 2;
      let radiusMultiplier = 0.25 + (index % 3) * 0.12;
      
      // Shift center based on category to group them visually
      let groupCenterX = dimensions.width / 2;
      let groupCenterY = dimensions.height / 2;

      if (skill.category === 'Languages') {
        groupCenterX = dimensions.width * 0.35;
        groupCenterY = dimensions.height * 0.35;
      } else if (skill.category === 'Frontend') {
        groupCenterX = dimensions.width * 0.7;
        groupCenterY = dimensions.height * 0.3;
      } else if (skill.category === 'Backend' || skill.category === 'Databases') {
        groupCenterX = dimensions.width * 0.65;
        groupCenterY = dimensions.height * 0.7;
      } else if (skill.category === 'Tools' || skill.category === 'Automation') {
        groupCenterX = dimensions.width * 0.3;
        groupCenterY = dimensions.height * 0.7;
      }

      const baseX = groupCenterX + Math.cos(angle) * (dimensions.width * 0.16);
      const baseY = groupCenterY + Math.sin(angle) * (dimensions.height * 0.16);

      return {
        ...skill,
        id: skill.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
        baseX: Math.max(padding, Math.min(dimensions.width - padding, baseX)),
        baseY: Math.max(padding, Math.min(dimensions.height - padding, baseY)),
        x: baseX,
        y: baseY,
        // Individual floating dynamics
        speed: 0.8 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        amplitudeX: 10 + Math.random() * 12,
        amplitudeY: 10 + Math.random() * 12,
      };
    });

    // Compute links between related skills
    const computedLinks = [];
    initializedNodes.forEach((sourceNode) => {
      if (sourceNode.related) {
        sourceNode.related.forEach((relName) => {
          const targetNode = initializedNodes.find(
            (n) => n.name.toLowerCase() === relName.toLowerCase()
          );
          if (targetNode && sourceNode.id !== targetNode.id) {
            // Avoid adding duplicates in reverse direction
            const linkExists = computedLinks.some(
              (l) => (l.source === targetNode.id && l.target === sourceNode.id)
            );
            if (!linkExists) {
              computedLinks.push({
                source: sourceNode.id,
                target: targetNode.id,
                id: `${sourceNode.id}-${targetNode.id}`
              });
            }
          }
        });
      }
    });

    setNodes(initializedNodes);
    setLinks(computedLinks);
  }, [dimensions]);

  // Gentle float loop
  useEffect(() => {
    if (nodes.length === 0) return;

    const animate = () => {
      time.current += 0.015;
      
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          const dx = Math.sin(time.current * node.speed + node.phase) * node.amplitudeX;
          const dy = Math.cos(time.current * node.speed + node.phase) * node.amplitudeY;
          return {
            ...node,
            x: node.baseX + dx,
            y: node.baseY + dy,
          };
        })
      );

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [nodes.length]);

  // Find dynamic node positions for line rendering
  const getNodePos = (nodeId) => {
    const node = nodes.find((n) => n.id === nodeId);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  // Find projects utilizing the hovered skill
  const getProjectsForSkill = (skillName) => {
    return portfolioData.projects.filter(proj => 
      proj.tech.some(t => t.toLowerCase() === skillName.toLowerCase())
    );
  };

  return (
    <div ref={containerRef} className="w-full relative glass-panel rounded-3xl overflow-hidden border-purplePrimary/15 bg-bgSecondary/60 p-4 min-h-[500px]">
      
      {/* HUD Header */}
      <div className="absolute top-4 left-6 z-10 font-outfit">
        <h4 className="text-sm uppercase tracking-widest text-purpleGlow font-bold">Network Schema</h4>
        <p className="text-xs text-textMuted">Interactive Tech Galaxy. Hover node to inspect.</p>
      </div>

      {/* SVG Canvas for Galaxy */}
      <svg 
        width={dimensions.width} 
        height={dimensions.height}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Glow Filters */}
        <defs>
          <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dynamic Connected Lines */}
        {links.map((link) => {
          const start = getNodePos(link.source);
          const end = getNodePos(link.target);
          const isHighlighted = hoveredSkill && 
            (hoveredSkill.id === link.source || hoveredSkill.id === link.target);

          return (
            <line
              key={link.id}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke={isHighlighted ? "#E879F9" : "rgba(168, 85, 247, 0.12)"}
              strokeWidth={isHighlighted ? 2.5 : 1}
              filter={isHighlighted ? "url(#line-glow)" : ""}
              className="transition-all duration-300"
            />
          );
        })}
      </svg>

      {/* Interactive floating nodes */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {nodes.map((node) => {
          const isHovered = hoveredSkill && hoveredSkill.id === node.id;
          const isConnected = hoveredSkill && (
            hoveredSkill.id === node.id || 
            (node.related && node.related.some(r => r.toLowerCase() === hoveredSkill.name.toLowerCase()))
          );

          return (
            <div
              key={node.id}
              style={{
                position: 'absolute',
                left: `${node.x}px`,
                top: `${node.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
              className="pointer-events-auto"
            >
              <button
                onMouseEnter={() => setHoveredSkill(node)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`relative flex items-center justify-center rounded-full p-2.5 transition-all duration-300 ${
                  isHovered 
                    ? 'bg-purpleGlow text-bgPrimary shadow-[0_0_20px_rgba(217,70,239,0.8)] scale-110 border-2 border-white' 
                    : isConnected 
                    ? 'bg-purplePrimary/30 text-white border border-purpleSoft/60 scale-105 shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                    : 'bg-bgCard/90 text-textSecondary border border-purplePrimary/15 hover:border-purpleSoft/50 hover:text-white'
                }`}
              >
                {/* Visual Category Dot indicator */}
                <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${
                  node.category === 'Languages' ? 'bg-amber-400' :
                  node.category === 'Frontend' ? 'bg-sky-400' :
                  node.category === 'Backend' ? 'bg-emerald-400' :
                  node.category === 'Databases' ? 'bg-blue-400' :
                  'bg-fuchsia-400'
                }`} />
                
                <span className="font-space text-xs font-semibold px-1 select-none">{node.name}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Details HUD Overlay Panel */}
      <AnimatePresence>
        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 right-4 left-4 md:left-auto md:w-96 z-20 glass-panel border-purpleSoft/40 bg-bgCard/95 p-5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] font-outfit"
          >
            <div className="flex items-center justify-between border-b border-purplePrimary/20 pb-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-purplePrimary/15 text-purpleSoft border border-purplePrimary/30">
                  {getCategoryIcon(hoveredSkill.category)}
                </div>
                <div>
                  <h4 className="font-bold text-textWhite text-lg tracking-wide">{hoveredSkill.name}</h4>
                  <span className="text-xs text-purpleSoft/80 font-space tracking-wider uppercase">{hoveredSkill.category}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-xs text-textMuted">Experience</div>
                <div className="text-sm font-semibold text-purpleGlow font-space">{hoveredSkill.experience}</div>
              </div>
            </div>

            <p className="text-xs text-textSecondary leading-relaxed mb-4">
              {hoveredSkill.desc}
            </p>

            {/* Related technologies list */}
            {hoveredSkill.related && (
              <div className="mb-4">
                <span className="text-[10px] uppercase text-textMuted tracking-widest block mb-1.5 font-bold">Related Tech</span>
                <div className="flex flex-wrap gap-1.5">
                  {hoveredSkill.related.map((t) => (
                    <span 
                      key={t}
                      className="text-[10px] font-space px-2 py-0.5 rounded bg-bgSecondary border border-purplePrimary/10 text-textSecondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects utilizing this skill */}
            <div>
              <span className="text-[10px] uppercase text-textMuted tracking-widest block mb-1.5 font-bold">Applied Projects</span>
              {getProjectsForSkill(hoveredSkill.name).length > 0 ? (
                <div className="flex flex-col gap-1.5">
                  {getProjectsForSkill(hoveredSkill.name).map((proj) => (
                    <div 
                      key={proj.id} 
                      className="text-xs flex items-center justify-between p-1.5 rounded bg-purplePrimary/5 border border-purplePrimary/10 text-textWhite font-medium"
                    >
                      <span>{proj.title}</span>
                      <span className="text-[10px] text-purpleSoft/80 uppercase tracking-widest font-space">{proj.duration.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-textMuted italic">Core conceptual base (applied across multiple system modules)</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background visual elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-bgPrimary via-transparent to-transparent opacity-80 pointer-events-none" />
      <div className="absolute bottom-4 left-6 z-10 pointer-events-none hidden md:block">
        <div className="flex gap-4 text-[10px] font-space tracking-wider">
          <div className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Languages
          </div>
          <div className="flex items-center gap-1.5 text-sky-400">
            <span className="w-2 h-2 rounded-full bg-sky-400" /> Frontend
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Backend
          </div>
          <div className="flex items-center gap-1.5 text-blue-400">
            <span className="w-2 h-2 rounded-full bg-blue-400" /> Databases
          </div>
          <div className="flex items-center gap-1.5 text-fuchsia-400">
            <span className="w-2 h-2 rounded-full bg-fuchsia-400" /> Automation & Tools
          </div>
        </div>
      </div>
    </div>
  );
}
