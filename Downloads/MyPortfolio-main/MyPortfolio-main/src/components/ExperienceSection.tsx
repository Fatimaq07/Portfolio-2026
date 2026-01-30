import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const experiences = [
  {
    type: 'work',
    title: 'Full-Stack Developer',
    company: 'Freelance',
    period: '2023 - Present',
    description: 'Building custom web applications and AI-powered solutions for clients worldwide.',
    highlights: ['50+ Projects', 'Remote', 'AI Focus'],
  },
  {
    type: 'work',
    title: 'Frontend Developer Intern',
    company: 'Tech Startup',
    period: '2022 - 2023',
    description: 'Developed responsive user interfaces and implemented complex animations.',
    highlights: ['React', 'TypeScript', 'GSAP'],
  },
  {
    type: 'education',
    title: 'Computer Science',
    company: 'University',
    period: '2020 - 2024',
    description: 'Specialized in software engineering with focus on web technologies.',
    highlights: ["Dean's List", 'Research', 'Projects'],
  },
  {
    type: 'achievement',
    title: 'AI Certification',
    company: 'OpenAI',
    period: '2024',
    description: 'Completed advanced AI and machine learning specialization.',
    highlights: ['GPT-4', 'Fine-tuning', 'Embeddings'],
  },
];

export const ExperienceSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-cycle through experiences
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % experiences.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'work':
        return <Briefcase className="w-5 h-5" />;
      case 'education':
        return <GraduationCap className="w-5 h-5" />;
      case 'achievement':
        return <Award className="w-5 h-5" />;
      default:
        return <Briefcase className="w-5 h-5" />;
    }
  };

  const currentExp = experiences[activeIndex];

  const goToNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % experiences.length);
  };

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  return (
    <section 
      id="experience" 
      className="h-screen w-full flex items-center justify-center relative overflow-hidden"
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground)) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Side - Timeline Navigation */}
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary text-xs uppercase tracking-widest font-medium block"
            >
              My Journey
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight font-serif"
            >
              Experience<span className="text-primary">.</span>
            </motion.h2>

            {/* Timeline Items */}
            <div className="mt-6 space-y-2">
              {experiences.map((exp, index) => (
                <motion.button
                  key={exp.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveIndex(index);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-left group ${
                    activeIndex === index 
                      ? 'bg-card border border-border' 
                      : 'hover:bg-card/50 border border-transparent'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    activeIndex === index 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground group-hover:text-foreground'
                  }`}>
                    {getIcon(exp.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate transition-colors ${
                      activeIndex === index ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    }`}>
                      {exp.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{exp.period}</p>
                  </div>
                  {activeIndex === index && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="w-1 h-8 bg-primary rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Side - Active Experience Details */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-6 lg:p-8 rounded-2xl bg-card border border-border"
              >
                {/* Number indicator */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-foreground flex items-center justify-center text-2xl font-bold text-background font-mono"
                >
                  0{activeIndex + 1}
                </motion.div>

                {/* Type badge */}
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs uppercase tracking-widest font-bold rounded-full mb-4"
                >
                  {currentExp.type}
                </motion.span>

                {/* Title with text reveal */}
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-2xl md:text-3xl font-bold text-foreground mb-1 font-serif"
                >
                  {currentExp.title}
                </motion.h3>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-foreground/80 font-medium mb-1"
                >
                  {currentExp.company}
                </motion.p>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-muted-foreground text-sm mb-4"
                >
                  {currentExp.period}
                </motion.p>

                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-muted-foreground leading-relaxed mb-5 text-sm lg:text-base"
                >
                  {currentExp.description}
                </motion.p>

                {/* Highlights */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="flex flex-wrap gap-2"
                >
                  {currentExp.highlights.map((h, i) => (
                    <motion.span 
                      key={h}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className="px-3 py-1.5 bg-muted rounded-full text-xs text-muted-foreground border border-border"
                    >
                      {h}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Navigation arrows */}
                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-border">
                  <button
                    onClick={goToPrev}
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex-1 flex justify-center gap-1.5">
                    {experiences.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setIsAutoPlaying(false);
                          setActiveIndex(i);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          activeIndex === i ? 'bg-primary w-6' : 'bg-border hover:bg-muted-foreground/50'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={goToNext}
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};