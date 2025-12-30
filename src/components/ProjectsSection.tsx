import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Nutrigen Healthcare',
    description: 'A healthcare platform focused on nutrition and wellness tracking with AI-powered recommendations.',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&q=80',
    url: 'https://nutrigen-healthcare.netlify.app/',
  },
  {
    id: 2,
    title: 'Productivity Dashboard',
    description: 'A comprehensive productivity dashboard with task management, analytics, and team collaboration.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    url: '#',
  },
  {
    id: 3,
    title: 'AI Voice Agent',
    description: 'An intelligent voice assistant built with natural language processing and automation tools.',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&q=80',
    url: '#',
  },
  {
    id: 4,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration, inventory management, and analytics.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    url: '#',
  },
  {
    id: 5,
    title: 'Portfolio Generator',
    description: 'An AI-powered portfolio builder that creates stunning websites from simple inputs.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&q=80',
    url: '#',
  },
];

const ProjectCard = ({ 
  project, 
  index,
}: { 
  project: Project; 
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="project-card relative flex-shrink-0 cursor-pointer group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Large number behind card */}
        <div 
          className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-10 select-none pointer-events-none"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          <span className="text-[100px] md:text-[150px] lg:text-[180px] font-bold text-foreground leading-none opacity-20">
            {index + 1}
          </span>
        </div>

        {/* Card container with wave effect */}
        <motion.a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative ml-10 md:ml-16 block rounded-3xl overflow-hidden bg-card shadow-lg"
          style={{
            width: '280px',
            height: '380px',
          }}
          animate={{
            y: isHovered ? -15 : [0, -8, 0],
            rotateZ: isHovered ? 0 : [0, -1, 0, 1, 0],
            scale: isHovered ? 1.03 : 1,
          }}
          transition={{
            y: isHovered 
              ? { type: 'spring', stiffness: 300, damping: 20 }
              : { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            rotateZ: isHovered
              ? { duration: 0.3 }
              : { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            scale: { type: 'spring', stiffness: 300, damping: 20 },
          }}
        >
          {/* Card background with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-card to-secondary/50" />
          
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative p-6">
            <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{project.description}</p>
            
            {/* View Project Link */}
            <motion.div 
              className="flex items-center gap-2 text-primary font-medium text-sm"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span>View Project</span>
              <ExternalLink className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Subtle shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
            initial={{ x: '-100%' }}
            animate={{ x: isHovered ? '100%' : '-100%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.a>
      </div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollToDirection = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 350;
      const newScrollLeft = carouselRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      carouselRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollability);
      checkScrollability();
      return () => carousel.removeEventListener('scroll', checkScrollability);
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.projects-header', {
        y: 60,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        }
      });

      gsap.fromTo('.projects-title-large', {
        y: 100,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-title-large',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="projects" 
      className="relative py-24 lg:py-32 overflow-hidden bg-background"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="projects-header mb-8 lg:mb-12">
          <span className="text-primary text-sm uppercase tracking-widest font-medium block mb-4">
            Featured Work
          </span>
        </div>

        {/* Carousel Navigation */}
        <div className="flex items-center justify-end gap-4 mb-8">
          <motion.button
            onClick={() => scrollToDirection('left')}
            className={`w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center transition-all ${
              canScrollLeft ? 'hover:bg-primary hover:border-primary hover:text-primary-foreground' : 'opacity-30 cursor-not-allowed'
            }`}
            whileHover={canScrollLeft ? { scale: 1.1 } : {}}
            whileTap={canScrollLeft ? { scale: 0.95 } : {}}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={() => scrollToDirection('right')}
            className={`w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center transition-all ${
              canScrollRight ? 'hover:bg-primary hover:border-primary hover:text-primary-foreground' : 'opacity-30 cursor-not-allowed'
            }`}
            whileHover={canScrollRight ? { scale: 1.1 } : {}}
            whileTap={canScrollRight ? { scale: 0.95 } : {}}
            disabled={!canScrollRight}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Projects Carousel */}
        <div 
          ref={carouselRef}
          className="flex gap-8 lg:gap-12 overflow-x-auto pb-8 scrollbar-hide"
          style={{ 
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {projects.map((project, index) => (
            <div key={project.id} style={{ scrollSnapAlign: 'start' }}>
              <ProjectCard 
                project={project} 
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Large "PROJECTS" title at bottom */}
        <div className="projects-title-large mt-16 lg:mt-24 overflow-hidden">
          <h2 
            className="text-[60px] md:text-[100px] lg:text-[150px] xl:text-[200px] font-bold tracking-tighter text-foreground/10 leading-none select-none"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            PROJECTS
          </h2>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
