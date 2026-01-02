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

      {/* Left Back Arrow */}
      {currentSection > 0 && (
        <button
          onClick={prevSection}
          className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors group"
        >
          <motion.span
            animate={{ x: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-cyan-400 text-3xl"
          >
            ←
          </motion.span>
          <span className="text-sm font-medium uppercase tracking-wider">Back</span>
        </button>
      )}

      {/* Right Swipe Arrow */}
      {currentSection < sections.length - 1 && (
        <button
          onClick={nextSection}
          className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors group"
        >
          <span className="text-sm font-medium uppercase tracking-wider">Swipe</span>
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-cyan-400 text-3xl"
          >
            →
          </motion.span>
        </button>
      )}

      {/* Bottom Section dots indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSection(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? 'bg-cyan-400 w-8' 
                : 'bg-white/30 hover:bg-cyan-400/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
