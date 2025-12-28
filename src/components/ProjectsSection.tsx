import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: 'ai' | 'frontend' | 'fullstack';
  image?: string;
}

const projects: Record<string, Project[]> = {
  ai: [
    {
      id: 'ai-1',
      title: 'AI Voice Agent',
      description: 'Intelligent voice assistant that handles customer calls, books appointments, and answers queries 24/7 with natural conversation flow.',
      tech: ['Vapi', 'OpenAI', 'n8n', 'Twilio'],
      category: 'ai',
    },
    {
      id: 'ai-2',
      title: 'Lead Automation Bot',
      description: 'Multi-channel lead capture and qualification system that nurtures prospects through personalized AI-driven conversations.',
      tech: ['LangChain', 'GPT-4', 'Make.com', 'HubSpot'],
      category: 'ai',
    },
    {
      id: 'ai-3',
      title: 'AI Chatbot Platform',
      description: 'Custom knowledge-base chatbot builder with RAG architecture, enabling businesses to deploy context-aware AI assistants.',
      tech: ['Python', 'Pinecone', 'FastAPI', 'React'],
      category: 'ai',
    },
    {
      id: 'ai-4',
      title: 'Smart Booking Agent',
      description: 'Autonomous agent that manages scheduling, handles reschedules, and syncs across multiple calendar platforms.',
      tech: ['OpenAI', 'Cal.com API', 'Node.js', 'PostgreSQL'],
      category: 'ai',
    },
  ],
  frontend: [
    {
      id: 'fe-1',
      title: 'Motion Portfolio',
      description: 'Cinematic personal portfolio with scroll-driven animations, GSAP-powered transitions, and immersive visual storytelling.',
      tech: ['React', 'GSAP', 'Tailwind', 'Lenis'],
      category: 'frontend',
    },
    {
      id: 'fe-2',
      title: 'SaaS Landing Page',
      description: 'High-converting landing page with micro-interactions, animated statistics, and seamless user journey flow.',
      tech: ['Next.js', 'Framer Motion', 'TypeScript'],
      category: 'frontend',
    },
    {
      id: 'fe-3',
      title: 'Interactive Dashboard',
      description: 'Data visualization dashboard with real-time updates, animated charts, and intuitive filtering systems.',
      tech: ['React', 'D3.js', 'Tailwind', 'Recharts'],
      category: 'frontend',
    },
  ],
  fullstack: [
    {
      id: 'fs-1',
      title: 'E-Commerce Platform',
      description: 'Full-featured marketplace with payment processing, inventory management, and real-time order tracking.',
      tech: ['MERN Stack', 'Stripe', 'Redux', 'Socket.io'],
      category: 'fullstack',
    },
    {
      id: 'fs-2',
      title: 'Team Collaboration App',
      description: 'Real-time workspace with file sharing, task management, and video conferencing integration.',
      tech: ['Next.js', 'Firebase', 'WebRTC', 'Tailwind'],
      category: 'fullstack',
    },
    {
      id: 'fs-3',
      title: 'Learning Management System',
      description: 'Educational platform with course creation tools, progress tracking, and interactive assessments.',
      tech: ['Node.js', 'MongoDB', 'React', 'AWS S3'],
      category: 'fullstack',
    },
  ],
};

const categoryLabels = {
  ai: '🤖 AI Agent Projects',
  frontend: '🎨 Frontend Projects',
  fullstack: '⚡ Full-Stack Projects',
};

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<'ai' | 'frontend' | 'fullstack'>('ai');
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        '.projects-header',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Category tabs animation
      gsap.fromTo(
        '.category-tab',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.category-tabs',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Reset active index when category changes
    setActiveIndex(0);
    
    // Animate cards on category change
    gsap.fromTo(
      '.project-card',
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      }
    );
  }, [activeCategory]);

  const currentProjects = projects[activeCategory];

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 lg:py-48 bg-background overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="projects-header mb-12">
          <span className="text-primary text-sm uppercase tracking-widest font-medium block mb-4">
            Featured Work
          </span>
          <h2 className="headline-lg mb-6">
            Projects That Define Me<span className="text-primary">.</span>
          </h2>
          <p className="body-lg max-w-2xl">
            From AI agents that automate businesses to stunning web experiences—here's a curated 
            selection of my most impactful work.
          </p>
        </div>

        {/* Category tabs */}
        <div className="category-tabs flex flex-wrap gap-4 mb-12">
          {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`category-tab px-6 py-3 rounded-full font-display font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.4)]'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Projects slider */}
        <div ref={sliderRef} className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {currentProjects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => handleCardClick(index)}
                className={`project-card flex-shrink-0 w-[350px] md:w-[400px] snap-center cursor-pointer
                           glass-card p-8 transition-all duration-500 group
                           ${activeIndex === index 
                             ? 'scale-100 opacity-100 border-primary/50' 
                             : 'scale-95 opacity-60 hover:opacity-80'}`}
              >
                {/* Project number */}
                <span className="text-primary/30 text-6xl font-display font-bold absolute top-4 right-6">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-display font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full 
                                 border border-primary/20 group-hover:border-primary/40 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      View Project
                    </button>
                    <button className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                      <Github className="w-4 h-4" />
                      Source
                    </button>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/10 via-transparent to-transparent 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Slider indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {currentProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => handleCardClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'w-8 bg-primary' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
