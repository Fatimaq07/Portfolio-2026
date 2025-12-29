import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  tech: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'NutriGen Healthcare',
    description: 'A comprehensive healthcare platform for nutrition tracking and personalized diet plans.',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80',
    url: 'https://nutrigen-healthcare.netlify.app/',
    tech: ['React', 'Tailwind', 'Node.js'],
  },
  {
    id: 2,
    title: 'AI Voice Assistant',
    description: 'Intelligent voice-powered AI agent for customer support and automation.',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80',
    url: '#',
    tech: ['Python', 'OpenAI', 'FastAPI'],
  },
  {
    id: 3,
    title: 'Productivity Dashboard',
    description: 'Real-time analytics and task management for modern teams.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    url: '#',
    tech: ['React', 'D3.js', 'PostgreSQL'],
  },
  {
    id: 4,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration and inventory management.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    url: '#',
    tech: ['Next.js', 'Stripe', 'MongoDB'],
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`project-card block relative cursor-pointer ${index % 2 === 0 ? 'from-left' : 'from-right'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="relative group perspective-1000">
        {/* Main Card */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-card border border-border/30"
          animate={{
            scale: isHovered ? 1.05 : 1,
            y: isHovered ? -20 : 0,
            rotateX: isHovered ? 5 : 0,
            z: isHovered ? 50 : 0,
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 20,
            duration: 0.4 
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Project Image */}
          <div className="aspect-[16/10] overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            
            {/* Overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: isHovered ? 0.9 : 0.6 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-3">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 bg-primary/20 backdrop-blur-sm rounded text-xs text-primary font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
            
            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
              {project.title}
              <motion.span
                animate={{ 
                  x: isHovered ? 4 : 0,
                  y: isHovered ? -4 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <ExternalLink className="w-5 h-5 text-primary" />
              </motion.span>
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>

            {/* View Project Button - appears on hover */}
            <motion.div
              className="mt-4 flex items-center gap-2 text-primary font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.3 }}
            >
              <span>View Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.div>

        {/* Water Reflection Effect */}
        <motion.div
          className="absolute left-0 right-0 mt-2 overflow-hidden rounded-2xl pointer-events-none"
          style={{
            height: '40%',
            transform: 'scaleY(-1)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
          }}
          animate={{
            opacity: isHovered ? 0.4 : 0.2,
            y: isHovered ? 10 : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative overflow-hidden rounded-2xl blur-[2px]">
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={project.image}
                alt=""
                className="w-full h-full object-cover opacity-60"
              />
            </div>
          </div>
          
          {/* Water ripple effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"
            animate={{
              backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: 'linear',
            }}
          />
        </motion.div>
      </div>
    </motion.a>
  );
};

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
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
    <section ref={sectionRef} id="projects" className="relative py-32 lg:py-48 bg-background overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="projects-header mb-20 text-center">
          <span className="text-primary text-sm uppercase tracking-widest font-medium block mb-4">
            My Work
          </span>
          <h2 className="headline-lg">
            Featured Projects<span className="text-primary">.</span>
          </h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            A selection of projects I've built, from healthcare platforms to AI-powered solutions.
          </p>
        </div>

        {/* Projects Grid with Water Reflection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20 lg:gap-x-12 lg:gap-y-28">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* More Projects CTA */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg"
            whileHover={{ scale: 1.05, gap: '16px' }}
            whileTap={{ scale: 0.98 }}
          >
            View All Projects
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
