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
      style={{ 
        background: '#ffffff'
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl" />
        <motion.div 
          className="absolute top-1/4 left-1/4 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500/15 rounded-full blur-2xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Side - Timeline Navigation */}
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-cyan-600 text-xs uppercase tracking-widest font-medium block"
            >
              My Journey
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight font-serif"
            >
              Experience<span className="text-cyan-600">.</span>
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
                      ? 'bg-cyan-500/20 border border-cyan-500/30' 
                      : 'hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    activeIndex === index 
                      ? 'bg-cyan-600 text-white' 
                      : 'bg-slate-100 text-slate-500 group-hover:text-cyan-600'
                  }`}>
                    {getIcon(exp.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate transition-colors ${
                      activeIndex === index ? 'text-slate-800' : 'text-slate-500 group-hover:text-slate-800'
                    }`}>
                      {exp.title}
                    </p>
                    <p className="text-xs text-slate-400">{exp.period}</p>
                  </div>
                  {activeIndex === index && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="w-1 h-8 bg-cyan-500 rounded-full"
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
                className="relative p-6 lg:p-8 rounded-2xl bg-slate-50 backdrop-blur-xl border border-slate-200"
              >
                {/* Number indicator */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-2xl font-bold text-white font-mono shadow-lg shadow-cyan-500/30"
                >
                  0{activeIndex + 1}
                </motion.div>

                {/* Type badge */}
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-600 text-xs uppercase tracking-widest font-bold rounded-full mb-4"
                >
                  {currentExp.type}
                </motion.span>

                {/* Title with text reveal */}
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-2xl md:text-3xl font-bold text-slate-800 mb-1 font-serif"
                >
                  {currentExp.title}
                </motion.h3>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-cyan-600 font-medium mb-1"
                >
                  {currentExp.company}
                </motion.p>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-slate-400 text-sm mb-4"
                >
                  {currentExp.period}
                </motion.p>

                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-slate-500 leading-relaxed mb-5 text-sm lg:text-base"
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
                      className="px-3 py-1.5 bg-slate-100 rounded-full text-xs text-slate-600 border border-slate-200"
                    >
                      {h}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Navigation arrows */}
                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-200">
                  <button
                    onClick={goToPrev}
                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-cyan-500/20 transition-all"
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
                          activeIndex === i ? 'bg-cyan-500 w-6' : 'bg-slate-300 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={goToNext}
                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-cyan-500/20 transition-all"
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