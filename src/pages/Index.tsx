import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection } from '@/components/HeroSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { VideosSection } from '@/components/VideosSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ContactSection } from '@/components/ContactSection';

const sections = [
  { id: 'hero', component: HeroSection, label: 'Home' },
  { id: 'skills', component: SkillsSection, label: 'Skills' },
  { id: 'projects', component: ProjectsSection, label: 'Work' },
  { id: 'videos', component: VideosSection, label: 'Videos' },
  { id: 'experience', component: ExperienceSection, label: 'Experience' },
  { id: 'contact', component: ContactSection, label: 'Contact' },
];

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToSection = (index: number) => {
    if (isAnimating || index < 0 || index >= sections.length) return;
    setIsAnimating(true);
    setCurrentSection(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const nextSection = () => goToSection(currentSection + 1);
  const prevSection = () => goToSection(currentSection - 1);

  // Handle wheel events for swipe (only on container edges)
  useEffect(() => {
    let accumulatedDelta = 0;
    let wheelTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;

      // Check if target is inside a scrollable section
      const target = e.target as HTMLElement;
      const scrollableParent = target.closest('.section-scroll-container');
      
      if (scrollableParent) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableParent;
        const atTop = scrollTop <= 0;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 5;
        
        // Only navigate if at scroll boundaries
        if (e.deltaY > 0 && !atBottom) return;
        if (e.deltaY < 0 && !atTop) return;
      }

      accumulatedDelta += e.deltaY;
      clearTimeout(wheelTimeout);
      
      wheelTimeout = setTimeout(() => {
        if (Math.abs(accumulatedDelta) > 80) {
          if (accumulatedDelta > 0) nextSection();
          else prevSection();
        }
        accumulatedDelta = 0;
      }, 50);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      clearTimeout(wheelTimeout);
    };
  }, [currentSection, isAnimating]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSection();
      else prevSection();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSection();
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevSection();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, isAnimating]);

  const CurrentComponent = sections[currentSection].component;

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-screen overflow-hidden"
      style={{ background: 'hsl(197 93% 84%)' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Section Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full section-scroll-container overflow-y-auto overflow-x-hidden"
        >
          <CurrentComponent />
        </motion.div>
      </AnimatePresence>

      {/* Circular Navigation on Right Side */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => goToSection(index)}
            className="group relative flex items-center justify-center"
          >
            {/* Outer ring animation for active */}
            {currentSection === index && (
              <motion.div
                layoutId="activeRing"
                className="absolute inset-0 w-10 h-10 rounded-full border-2 border-primary"
                style={{ margin: '-8px' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            
            {/* Progress circle animation */}
            {currentSection === index && (
              <svg className="absolute w-10 h-10 -rotate-90" style={{ margin: '-8px' }}>
                <motion.circle
                  cx="20"
                  cy="20"
                  r="18"
                  fill="none"
                  stroke="hsl(210 100% 50%)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
                  style={{ 
                    strokeDasharray: '113',
                    strokeDashoffset: '0'
                  }}
                />
              </svg>
            )}
            
            {/* Center dot */}
            <motion.div 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-primary scale-100' 
                  : 'bg-foreground/30 hover:bg-primary/60 scale-75 hover:scale-100'
              }`}
              whileHover={{ scale: 1.2 }}
            />
            
            {/* Label tooltip */}
            <span className={`absolute right-8 text-xs font-medium uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              currentSection === index ? 'text-primary' : 'text-foreground/60'
            }`}>
              {section.label}
            </span>
          </button>
        ))}
      </div>

      {/* Section Counter */}
      <div className="fixed bottom-8 left-8 z-50 flex items-center gap-3">
        <span className="text-2xl font-bold text-foreground">{String(currentSection + 1).padStart(2, '0')}</span>
        <div className="w-12 h-[2px] bg-foreground/20">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className="text-sm text-foreground/40">{String(sections.length).padStart(2, '0')}</span>
      </div>

      {/* Swipe hint on first section */}
      {currentSection === 0 && (
        <motion.div
          className="fixed bottom-8 right-8 z-40 text-foreground/60 text-sm flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span>Scroll or swipe to navigate</span>
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-primary"
          >
            →
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Index;
