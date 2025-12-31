import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  // Handle wheel events for swipe
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;
      
      // Horizontal scroll or significant vertical scroll
      if (Math.abs(e.deltaX) > 30) {
        if (e.deltaX > 0) nextSection();
        else prevSection();
      } else if (Math.abs(e.deltaY) > 50) {
        if (e.deltaY > 0) nextSection();
        else prevSection();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
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
      className="relative h-screen w-screen overflow-hidden bg-background"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Section Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full overflow-y-auto"
        >
          <CurrentComponent />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => goToSection(index)}
            className={`group flex items-center gap-3 transition-all duration-300`}
          >
            <span className={`text-xs font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              currentSection === index ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {section.label}
            </span>
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? 'bg-primary w-3 h-3' 
                : 'bg-muted-foreground/40 hover:bg-primary/60'
            }`} />
          </button>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
        <motion.button
          onClick={prevSection}
          disabled={currentSection === 0 || isAnimating}
          className={`w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center transition-all ${
            currentSection === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary hover:border-primary hover:text-primary-foreground'
          }`}
          whileHover={currentSection !== 0 ? { scale: 1.1 } : {}}
          whileTap={currentSection !== 0 ? { scale: 0.95 } : {}}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <div className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border">
          <span className="text-sm font-medium text-primary">{String(currentSection + 1).padStart(2, '0')}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm text-muted-foreground">{String(sections.length).padStart(2, '0')}</span>
        </div>

        <motion.button
          onClick={nextSection}
          disabled={currentSection === sections.length - 1 || isAnimating}
          className={`w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center transition-all ${
            currentSection === sections.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary hover:border-primary hover:text-primary-foreground'
          }`}
          whileHover={currentSection !== sections.length - 1 ? { scale: 1.1 } : {}}
          whileTap={currentSection !== sections.length - 1 ? { scale: 0.95 } : {}}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Swipe hint on first section */}
      {currentSection === 0 && (
        <motion.div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 text-muted-foreground text-sm flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span>Swipe or use arrows to navigate</span>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Index;
