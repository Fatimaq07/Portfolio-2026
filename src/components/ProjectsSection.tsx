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
      className="relative h-screen flex flex-col justify-center px-6 overflow-hidden cursor-none bg-background" 
      onMouseMove={handleMouseMove}
    >
      {/* Background effects matching theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/15 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-primary/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Compact Header */}
        <div className="flex items-end justify-between mb-6 border-b border-border/30 pb-4">
          <div>
            <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium block mb-2">
              Selected Works
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground font-serif">
              WORK<span className="text-primary">.</span>
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1">
            <span className="text-muted-foreground text-sm">{projects.length} Projects</span>
          </div>
        </div>

        {/* Compact Project List */}
        <div className="flex flex-col">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative flex items-center justify-between border-b border-border/20 py-4 px-2 transition-all duration-500 cursor-pointer hover:bg-primary/5 rounded-lg"
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
              onClick={() => handleProjectClick(project.url)}
            >
              {/* Left Side: ID & Title */}
              <div className="flex items-baseline gap-6 md:gap-10 relative z-10">
                <span className="text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  0{project.id}
                </span>
                <div>
                  <h3 className="text-xl md:text-3xl font-semibold text-foreground group-hover:text-primary transition-all duration-500 font-serif">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {project.description}
                  </p>
                </div>
              </div>
              
              {/* Right Side: Meta Data */}
              <div className="flex flex-col items-end gap-1 relative z-10">
                <span className="text-xs font-medium uppercase tracking-widest text-primary">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
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
              className="relative -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg w-[300px] h-[200px] border border-primary/30 shadow-lg"
            >
              <img
                src={projects.find((p) => p.id === activeProject)?.image}
                alt="Project Preview"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent flex flex-col justify-end p-4">
                <div className="flex items-center gap-2">
                  <span className="text-foreground font-bold text-sm tracking-tight">View Project</span>
                  <ArrowUpRight className="text-primary w-4 h-4" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Custom Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-50 hidden md:block"
        style={{ x, y }}
      />
    </section>
  );
};
