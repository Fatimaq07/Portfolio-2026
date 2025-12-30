import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Sparkles, Code2, Cpu, Briefcase } from 'lucide-react';

const techStack = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
];

const stats = [
  { number: '8+', label: 'Projects', icon: Code2, color: 'from-violet-500 to-purple-600' },
  { number: 'AI', label: 'Automations', icon: Cpu, color: 'from-cyan-400 to-blue-500' },
  { number: 'MERN', label: '+ React', icon: Sparkles, color: 'from-amber-400 to-orange-500' },
  { number: 'Open', label: 'to Opportunities', icon: Briefcase, color: 'from-emerald-400 to-teal-500' },
];

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Staggered card animations
      tl.fromTo('.bento-card', 
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.1 },
        0.2
      );

      // Text reveal
      tl.fromTo('.hero-title-word',
        { y: 100, opacity: 0, rotateX: -30 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.08 },
        0.4
      );

      // Stats animation
      tl.fromTo('.stat-card',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1 },
        0.8
      );

      // Tech icons
      tl.fromTo('.tech-icon',
        { scale: 0, rotate: -180 },
        { scale: 1, rotate: 0, duration: 0.6, stagger: 0.05 },
        1
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Fatima_Qureshi_Resume.pdf';
    link.download = 'Fatima_Qureshi_Resume.pdf';
    link.click();
  };

  return (
    <section ref={containerRef} id="hero" className="relative min-h-screen overflow-hidden py-8 lg:py-12">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      {/* Floating orbs with parallax */}
      <motion.div 
        className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        style={{ x: mousePosition.x * 2, y: mousePosition.y * 2 }}
      />
      <motion.div 
        className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
        style={{ x: mousePosition.x * -1.5, y: mousePosition.y * -1.5 }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-8 lg:mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground/70">About Me</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['About', 'Projects', 'Skills', 'Services', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="nav-item text-sm font-medium text-foreground/60 hover:text-primary transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </nav>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6 max-w-7xl mx-auto">
          
          {/* Main Profile Card - Left */}
          <motion.div 
            className="bento-card col-span-12 lg:col-span-5 row-span-2 relative overflow-hidden rounded-3xl p-8 lg:p-10"
            style={{ 
              background: 'linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--card)/0.8) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid hsl(var(--border)/0.5)',
              x: mousePosition.x * 0.5,
              y: mousePosition.y * 0.5,
            }}
          >
            {/* Decorative circle */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/20 blur-2xl" />
            
            {/* Profile image placeholder */}
            <div className="relative mb-8">
              <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-full mx-auto relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-accent/40" />
                <div className="absolute inset-2 rounded-full bg-card flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <span className="text-6xl lg:text-7xl font-serif text-foreground/30">F</span>
                  </div>
                </div>
                {/* Rotating badge */}
                <div className="absolute -bottom-2 -right-2 w-16 h-16 lg:w-20 lg:h-20">
                  <motion.div 
                    className="w-full h-full rounded-full bg-background border border-border flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <span className="text-[6px] lg:text-[8px] uppercase tracking-widest text-foreground/60">
                      Developer • 2024
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Name and info */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-primary mb-2 font-medium">I'm,</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2 font-serif">
                Fatima
                <br />
                Qureshi
              </h1>
              <p className="text-sm text-muted-foreground flex items-center justify-center lg:justify-start gap-2 mt-4">
                <span className="w-5 h-5 rounded bg-muted flex items-center justify-center">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </span>
                fatimaqureshi@email.com
              </p>
            </div>

            {/* Vertical nav on left side */}
            <div className="hidden lg:flex flex-col gap-3 absolute left-4 top-1/2 -translate-y-1/2">
              {['Clients', 'Research', 'Portfolio', 'Podcast'].map((item, i) => (
                <button 
                  key={item}
                  className="text-[10px] uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors writing-mode-vertical"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Portfolio Title Card */}
          <motion.div 
            className="bento-card col-span-12 lg:col-span-7 rounded-3xl p-8 lg:p-10 flex flex-col justify-center"
            style={{ 
              background: 'linear-gradient(145deg, hsl(var(--background)) 0%, hsl(var(--card)/0.5) 100%)',
              x: mousePosition.x * -0.3,
              y: mousePosition.y * -0.3,
            }}
          >
            <div className="overflow-hidden perspective-1000">
              <h2 className="text-5xl md:text-6xl lg:text-8xl font-bold text-foreground font-serif leading-none">
                <span className="hero-title-word inline-block">Portfolio</span>
                <span className="hero-title-word inline-block text-primary">'</span>
              </h2>
            </div>
            
            <div className="mt-6 lg:mt-8 space-y-4">
              <p className="text-lg lg:text-xl text-foreground font-medium">
                This is not just a portfolio.
                <br />
                <span className="text-muted-foreground">It's real projects, real code, and real skills.</span>
              </p>
              <p className="text-sm lg:text-base text-muted-foreground max-w-lg">
                I build animated frontends and AI-powered web systems using React, MERN, Firebase, and automation tools.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-8">
              <motion.button
                onClick={handleDownloadResume}
                className="group flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('projects')}
                className="group flex items-center gap-3 px-6 py-3 bg-card border border-border text-foreground rounded-full font-medium hover:bg-muted transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="col-span-12 lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className={`stat-card rounded-2xl p-4 lg:p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br ${stat.color} relative overflow-hidden group`}
                style={{ 
                  x: mousePosition.x * (0.2 + index * 0.1),
                  y: mousePosition.y * (0.2 + index * 0.1),
                }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="absolute inset-0 bg-background/80 group-hover:bg-background/70 transition-colors" />
                <div className="relative z-10">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <span className="text-2xl lg:text-3xl font-bold text-foreground">{stat.number}</span>
                  <p className="text-xs lg:text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack Card */}
          <motion.div 
            className="bento-card col-span-12 rounded-3xl p-6 lg:p-8"
            style={{ 
              background: 'linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--card)/0.6) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid hsl(var(--border)/0.5)',
            }}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Tech Stack</h3>
                <p className="text-sm text-muted-foreground">Tools I use to bring ideas to life</p>
              </div>
              
              <div className="flex items-center gap-4 lg:gap-6 flex-wrap justify-center">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className="tech-icon group relative"
                    whileHover={{ scale: 1.2, y: -5 }}
                  >
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <img 
                        src={tech.icon} 
                        alt={tech.name}
                        className="w-7 h-7 lg:w-8 lg:h-8 object-contain"
                      />
                    </div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
                
                {/* Extra tools indicator */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="px-3 py-1 rounded-full bg-muted/30 text-xs">+ n8n</span>
                  <span className="px-3 py-1 rounded-full bg-muted/30 text-xs">+ Zapier</span>
                  <span className="px-3 py-1 rounded-full bg-muted/30 text-xs">+ AI Agents</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
