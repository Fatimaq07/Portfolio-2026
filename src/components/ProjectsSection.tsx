import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  image: string;
  url: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'WHITE WATERFALL',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&q=80',
    url: '#',
  },
  {
    id: 2,
    title: 'BLUE OCEAN',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    url: '#',
  },
  {
    id: 3,
    title: 'GREEN MEADOWS',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    url: '#',
  },
  {
    id: 4,
    title: 'NUTRIGEN',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&q=80',
    url: 'https://nutrigen-healthcare.netlify.app/',
  },
  {
    id: 5,
    title: 'BLUE DEEP',
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&q=80',
    url: '#',
  },
  {
    id: 6,
    title: 'ORANGE SUNSET',
    image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600&q=80',
    url: '#',
  },
  {
    id: 7,
    title: 'VIOLET DAWN',
    image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&q=80',
    url: '#',
  },
];

const ProjectCard = ({ project, index, total }: { project: Project; index: number; total: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate position in the arc
  const centerIndex = (total - 1) / 2;
  const offset = index - centerIndex;
  const rotateY = offset * 15; // Rotation angle for arc effect
  const translateZ = Math.abs(offset) * -50; // Push outer cards back
  const scale = 1 - Math.abs(offset) * 0.05; // Slightly smaller for outer cards

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card relative flex-shrink-0 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <motion.div
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: isHovered ? 0 : rotateY,
          translateZ: isHovered ? 100 : translateZ,
          scale: isHovered ? 1.15 : scale,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 200, 
          damping: 25,
        }}
      >
        {/* Title above card */}
        <motion.div
          className="absolute -top-8 left-0 right-0 text-center z-10"
          animate={{
            opacity: isHovered ? 1 : 0.7,
            y: isHovered ? -5 : 0,
          }}
        >
          <span className="text-xs md:text-sm font-medium tracking-widest text-foreground/80 uppercase">
            {project.title}
          </span>
        </motion.div>

        {/* Main Card */}
        <div className="relative overflow-hidden rounded-lg w-32 h-48 md:w-40 md:h-56 lg:w-48 lg:h-72">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
            }}
            animate={{
              boxShadow: isHovered 
                ? 'inset 0 0 20px rgba(0,0,0,0.3), 0 0 60px rgba(56, 189, 248, 0.3)'
                : 'inset 0 0 30px rgba(0,0,0,0.5)',
            }}
          />
        </div>

        {/* Water Reflection */}
        <div
          className="absolute top-full left-0 right-0 overflow-hidden pointer-events-none"
          style={{
            height: '100%',
            transform: 'scaleY(-1) translateY(0)',
            maskImage: 'linear-gradient(to top, transparent 20%, rgba(0,0,0,0.4) 100%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 20%, rgba(0,0,0,0.4) 100%)',
          }}
        >
          <motion.div 
            className="w-32 h-48 md:w-40 md:h-56 lg:w-48 lg:h-72 overflow-hidden rounded-lg"
            animate={{
              filter: isHovered ? 'blur(3px)' : 'blur(4px)',
            }}
          >
            <img
              src={project.image}
              alt=""
              className="w-full h-full object-cover opacity-40"
            />
          </motion.div>
          
          {/* Water ripple overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(0, 20, 40, 0.6) 50%, rgba(0, 30, 60, 0.8) 100%)',
            }}
            animate={{
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
    </motion.a>
  );
};

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="projects" 
      className="relative py-32 lg:py-48 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(210, 40%, 5%) 50%, hsl(210, 50%, 3%) 100%)',
      }}
    >
      {/* Water floor gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0, 30, 60, 0.3) 30%, rgba(0, 40, 80, 0.5) 60%, rgba(0, 50, 100, 0.4) 100%)',
        }}
      />
      
      {/* Ambient water reflections */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(56, 189, 248, 0.2) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="projects-header mb-16 lg:mb-24 text-center">
          <span className="text-primary text-sm uppercase tracking-widest font-medium block mb-4">
            My Work
          </span>
          <h2 className="headline-lg">
            Featured Projects<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Gallery - Curved Arc Layout */}
        <div 
          className="relative flex items-end justify-center gap-2 md:gap-4 lg:gap-6 pb-32"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              total={projects.length}
            />
          ))}
        </div>

        {/* Floating orb decoration */}
        <motion.div
          className="absolute bottom-20 left-1/4 w-8 h-8 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, rgba(251, 191, 36, 0.2) 70%, transparent 100%)',
            boxShadow: '0 0 30px rgba(251, 191, 36, 0.5)',
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </section>
  );
};
