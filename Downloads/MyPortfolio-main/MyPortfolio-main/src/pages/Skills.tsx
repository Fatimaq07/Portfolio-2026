import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Three.js', 'Vue.js'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'Python', 'FastAPI', 'MongoDB', 'PostgreSQL', 'Firebase', 'GraphQL'],
  },
  {
    title: 'AI & Automation',
    skills: ['OpenAI API', 'LangChain', 'Vapi', 'n8n', 'Make.com', 'Vector DBs', 'RAG Systems', 'Claude AI'],
  },
  {
    title: 'Tools',
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'VS Code', 'Postman', 'Jira'],
  },
];

export const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);

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

      // Wave animation for each skill row
      skillCategories.forEach((_, categoryIndex) => {
        const skills = document.querySelectorAll(`.skill-row-${categoryIndex} .wave-skill`);
        
        skills.forEach((skill, i) => {
          // Initial entrance with wave effect
          gsap.fromTo(
            skill,
            { 
              y: 100, 
              opacity: 0,
              rotateX: 45,
            },
            { 
              y: 0, 
              opacity: 1,
              rotateX: 0,
              duration: 0.8,
              delay: 0.5 + (categoryIndex * 0.2) + (i * 0.08),
              ease: 'power3.out',
            }
          );

          // Continuous wave animation
          gsap.to(skill, {
            y: -15,
            duration: 2,
            delay: i * 0.15,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });

        // Category title animation
        gsap.fromTo(
          `.category-title-${categoryIndex}`,
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, delay: 0.4 + (categoryIndex * 0.2), ease: 'power3.out' }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
              to="/projects" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Projects →
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-20 container mx-auto px-6 lg:px-12">
        <div className="overflow-hidden mb-16">
          <h1 className="page-title text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground">
            Skills & Tech<span className="text-primary">.</span>
          </h1>
        </div>

        {/* Skills with wave animation */}
        <div ref={waveRef} className="space-y-16 perspective-1000">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.title} className="space-y-6">
              <h2 className={`category-title-${categoryIndex} text-sm uppercase tracking-widest text-primary font-medium`}>
                {category.title}
              </h2>
              <div className={`skill-row-${categoryIndex} flex flex-wrap gap-4`}>
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="wave-skill px-6 py-4 bg-secondary/50 border border-border/50 rounded-2xl 
                             hover:border-primary/50 hover:bg-primary/10 transition-all duration-300
                             cursor-default group"
                  >
                    <span className="text-lg md:text-xl font-display font-medium text-foreground group-hover:text-primary transition-colors">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative wave lines */}
      <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            className="wave-line-1"
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z"
            fill="hsl(var(--primary) / 0.1)"
          />
          <path
            className="wave-line-2"
            d="M0,80 C360,40 720,100 1080,60 C1260,40 1380,80 1440,60 L1440,120 L0,120 Z"
            fill="hsl(var(--primary) / 0.05)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Skills;
