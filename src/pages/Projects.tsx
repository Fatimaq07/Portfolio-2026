import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

const projectCategories = {
  ai: {
    label: 'AI Agents',
    projects: [
      { title: 'Voice Agent Pro', description: 'AI-powered call handling with natural conversation flow', tech: ['Vapi', 'OpenAI', 'Node.js'] },
      { title: 'Lead Bot', description: 'Intelligent lead qualification and booking automation', tech: ['LangChain', 'Python', 'FastAPI'] },
      { title: 'Support Genius', description: 'Multi-channel AI support with knowledge base integration', tech: ['RAG', 'Vector DB', 'React'] },
    ],
  },
  frontend: {
    label: 'Frontend',
    projects: [
      { title: 'Motion Studio', description: 'Award-winning animated portfolio with GSAP', tech: ['React', 'GSAP', 'Three.js'] },
      { title: 'Brand Landing', description: 'High-converting landing page with micro-interactions', tech: ['Next.js', 'Framer Motion', 'Tailwind'] },
      { title: 'Dashboard UI', description: 'Complex data visualization with real-time updates', tech: ['React', 'D3.js', 'WebSocket'] },
    ],
  },
  fullstack: {
    label: 'Full-Stack',
    projects: [
      { title: 'SaaS Platform', description: 'Complete subscription-based platform with auth & payments', tech: ['MERN', 'Stripe', 'AWS'] },
      { title: 'E-commerce Suite', description: 'Full-featured online store with inventory management', tech: ['Next.js', 'PostgreSQL', 'Redis'] },
      { title: 'Team Collab', description: 'Real-time collaboration tool for remote teams', tech: ['React', 'Firebase', 'WebRTC'] },
    ],
  },
};

type CategoryKey = keyof typeof projectCategories;

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('ai');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nav animation
      gsap.fromTo(
        '.page-nav',
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      // Title animation
      gsap.fromTo(
        '.page-title',
        { y: 60, opacity: 0, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
        { y: 0, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1, delay: 0.3 }
      );

      // Category tabs
      gsap.fromTo(
        '.category-tab',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.5, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Animate cards when category or index changes
    gsap.fromTo(
      '.project-card',
      { x: 100, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
    );
  }, [activeCategory, activeIndex]);

  const currentProjects = projectCategories[activeCategory].projects;

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % currentProjects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + currentProjects.length) % currentProjects.length);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="page-nav fixed top-0 left-0 right-0 z-50 py-6 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <Link 
              to="/" 
              className="text-xl font-display font-bold text-foreground"
            >
              Your Name
            </Link>
            <Link 
              to="/services" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Services →
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-20 container mx-auto px-6 lg:px-12">
        <div className="overflow-hidden mb-12">
          <h1 className="page-title text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground">
            Projects<span className="text-primary">.</span>
          </h1>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-4 mb-12 flex-wrap">
          {(Object.keys(projectCategories) as CategoryKey[]).map((key) => (
            <button
              key={key}
              onClick={() => { setActiveCategory(key); setActiveIndex(0); }}
              className={`category-tab px-6 py-3 rounded-full border text-sm font-medium transition-all duration-300
                ${activeCategory === key 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
            >
              {projectCategories[key].label}
            </button>
          ))}
        </div>

        {/* Projects Carousel */}
        <div className="relative">
          <div className="flex gap-6 overflow-hidden">
            {currentProjects.map((project, index) => (
              <div
                key={project.title}
                className={`project-card flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] 
                          glass-card p-8 transition-all duration-500
                          ${index === activeIndex ? 'border-primary/50 scale-100' : 'opacity-60 scale-95'}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-xs uppercase tracking-widest text-primary font-medium">
                    {projectCategories[activeCategory].label}
                  </span>
                  <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs bg-secondary/50 rounded-full text-foreground/70 border border-border/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={prevProject}
              className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center hover:border-primary hover:text-primary transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextProject}
              className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center hover:border-primary hover:text-primary transition-all"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <span className="ml-auto text-muted-foreground text-sm self-center">
              {activeIndex + 1} / {currentProjects.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
