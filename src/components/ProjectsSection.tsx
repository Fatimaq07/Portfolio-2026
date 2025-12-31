import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  url: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "NUTRIGEN AI",
    category: "Healthcare",
    year: "2024",
    description: "AI-powered personalized nutrition planning.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    url: "https://nutrigen-healthcare.netlify.app/",
  },
  {
    id: 2,
    title: "FLOWS LAB",
    category: "Productivity",
    year: "2024",
    description: "Workflow automation dashboard for teams.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    url: "#",
  },
  {
    id: 3,
    title: "VOCALIZE",
    category: "Automation",
    year: "2023",
    description: "Voice-activated customer support agent.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    url: "#",
  },
  {
    id: 4,
    title: "LUXE MARKET",
    category: "E-Commerce",
    year: "2023",
    description: "High-fashion retail platform with AR try-on.",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
    url: "#",
  },
  {
    id: 5,
    title: "HELIOS",
    category: "Architecture",
    year: "2022",
    description: "Sustainability tracking for modern buildings.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    url: "#",
  },
];

export const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the floating image
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  const handleProjectClick = (url: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section 
      className="relative bg-[#030014] py-32 px-6 overflow-hidden cursor-none min-h-screen" 
      onMouseMove={handleMouseMove}
    >
      {/* --- PREMIUM AURORA GRADIENT BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep Purple Blob (Top Left) */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]" />
        {/* Cyan Blob (Bottom Right) */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]" />
        {/* Subtle Center Glow */}
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-indigo-500/10 blur-[100px]" />
        
        {/* Grain Texture for that 'Film' look */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-24 border-b border-white/10 pb-8">
          <div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-xs font-mono uppercase tracking-[0.2em] font-medium block mb-3">
              Selected Works
            </span>
            {/* Gradient Text Title */}
            <h2 className="text-7xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
              WORK<span className="text-blue-500">.</span>
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1">
            <span className="text-white/40 font-mono text-sm">Case Studies</span>
            <span className="text-white text-lg font-medium">{projects.length} Projects</span>
          </div>
        </div>

        {/* Project List */}
        <div className="flex flex-col">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative flex items-center justify-between border-b border-white/5 py-12 px-4 transition-all duration-500 cursor-pointer"
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
              onClick={() => handleProjectClick(project.url)}
            >
              {/* --- HOLOGRAPHIC HOVER GRADIENT --- */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.05) 45%, rgba(147,51,234,0.05) 55%, transparent 100%)'
                }}
              />
              
              {/* Left Side: ID & Title */}
              <div className="flex items-baseline gap-12 relative z-10">
                <span className="text-lg font-mono text-white/20 group-hover:text-blue-400 transition-colors duration-300">
                  (0{project.id})
                </span>
                <div>
                  <h3 className="text-4xl md:text-7xl font-semibold text-slate-300 group-hover:text-white group-hover:tracking-wide transition-all duration-500">
                    {project.title}
                  </h3>
                  {/* Description reveals on hover */}
                  <p className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-2 text-blue-300/80 text-sm font-mono tracking-wide transition-all duration-500 delay-75 opacity-0 group-hover:opacity-100">
                    {project.description}
                  </p>
                </div>
              </div>
              
              {/* Right Side: Meta Data */}
              <div className="flex flex-col items-end gap-2 relative z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-blue-400 transition-colors duration-300">
                  {project.category}
                </span>
                <span className="text-sm font-mono text-white/20 group-hover:text-white transition-colors duration-300">
                  {project.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FLOATING IMAGE PREVIEW */}
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block"
      >
        <AnimatePresence mode="wait">
          {activeProject && (
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="relative -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg w-[400px] h-[280px] border border-white/20 shadow-[0_0_50px_rgba(59,130,246,0.3)]"
            >
              {/* Image */}
              <img
                src={projects.find((p) => p.id === activeProject)?.image}
                alt="Project Preview"
                className="h-full w-full object-cover"
              />
              
              {/* Glass Overlay Tag */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-lg tracking-tight">View Case Study</span>
                  <ArrowUpRight className="text-blue-400 w-5 h-5" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Custom Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-3 h-3 bg-blue-500 rounded-full pointer-events-none z-50 hidden md:block mix-blend-difference"
        style={{ x, y }}
      />
    </section>
  );
};
