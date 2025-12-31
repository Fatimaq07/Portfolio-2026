import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: string;
  level: string;
  usage: string;
}

const coreSkills: Skill[] = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', level: 'Production-level', usage: 'Built 20+ production apps with complex state management' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', level: 'Production-level', usage: 'SSR/SSG apps with API routes and edge functions' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', level: 'Production-level', usage: 'Type-safe codebases with advanced generics' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', level: 'Production-level', usage: 'RESTful APIs and real-time WebSocket servers' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 'Hands-on', usage: 'Automation scripts and AI/ML integrations' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', level: 'Production-level', usage: 'Responsive designs with custom design systems' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', level: 'Production-level', usage: 'Complex queries, migrations, and RLS policies' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', level: 'Hands-on', usage: 'NoSQL data modeling for flexible schemas' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', level: 'Hands-on', usage: 'Containerized deployments and dev environments' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', level: 'Production-level', usage: 'Git flow, rebasing, and CI/CD pipelines' },
  { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg', level: 'Production-level', usage: 'State management for complex applications' },
  { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', level: 'Hands-on', usage: 'API design with efficient data fetching' },
];

const aiSkills: Skill[] = [
  { name: 'OpenAI', icon: 'https://www.svgrepo.com/show/306500/openai.svg', level: 'Production-level', usage: 'GPT-4 integrations, embeddings, and fine-tuning' },
  { name: 'Lovable', icon: 'https://lovable.dev/icon.svg', level: 'Power User', usage: 'AI-assisted full-stack app development' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', level: 'Production-level', usage: 'Auth, Firestore, Cloud Functions, AI extensions' },
  { name: 'n8n', icon: 'https://n8n.io/favicon.ico', level: 'Hands-on', usage: 'Complex workflow automation pipelines' },
  { name: 'Zapier', icon: 'https://www.svgrepo.com/show/353589/zapier-icon.svg', level: 'Hands-on', usage: 'No-code integrations for rapid prototyping' },
  { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', level: 'Production-level', usage: 'Edge deployments with AI-powered analytics' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', level: 'Hands-on', usage: 'Cloud infrastructure and serverless functions' },
  { name: 'Supabase', icon: 'https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg', level: 'Production-level', usage: 'Backend as a service with real-time features' },
];

const SkillNode = ({ 
  skill, 
  hoveredSkill,
  setHoveredSkill,
  isInner
}: { 
  skill: Skill; 
  hoveredSkill: string | null;
  setHoveredSkill: (name: string | null) => void;
  isInner: boolean;
}) => {
  const isHovered = hoveredSkill === skill.name;
  const isOtherHovered = hoveredSkill !== null && !isHovered;

  const nodeSize = isInner ? 'w-14 h-14 md:w-16 md:h-16' : 'w-16 h-16 md:w-20 md:h-20';
  const iconSize = isInner ? 'w-7 h-7 md:w-8 md:h-8' : 'w-8 h-8 md:w-10 md:h-10';

  return (
    <motion.div
      className="cursor-pointer relative"
      animate={{
        scale: isHovered ? 1.4 : isOtherHovered ? 0.85 : 1,
        opacity: isOtherHovered ? 0.4 : 1,
        zIndex: isHovered ? 50 : 1,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onMouseEnter={() => setHoveredSkill(skill.name)}
      onMouseLeave={() => setHoveredSkill(null)}
    >
      <motion.div 
        className={`flex items-center justify-center ${nodeSize} rounded-xl bg-card/90 backdrop-blur-sm border transition-all duration-300`}
        style={{
          borderColor: isHovered ? 'hsl(var(--primary))' : 'hsl(var(--border) / 0.5)',
          boxShadow: isHovered ? '0 0 30px hsl(var(--primary) / 0.6), 0 0 60px hsl(var(--primary) / 0.3)' : 'none',
        }}
      >
        <img 
          src={skill.icon} 
          alt={skill.name}
          className={`${iconSize} object-contain`}
          style={{ filter: skill.name === 'Next.js' || skill.name === 'Vercel' || skill.name === 'AWS' ? 'invert(1)' : 'none' }}
        />
      </motion.div>

      {/* Tooltip Card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 mt-4 w-64 p-4 rounded-xl bg-card/95 backdrop-blur-md border border-border shadow-2xl z-50"
          >
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={skill.icon} 
                alt={skill.name}
                className="w-6 h-6 object-contain"
                style={{ filter: skill.name === 'Next.js' || skill.name === 'Vercel' || skill.name === 'AWS' ? 'invert(1)' : 'none' }}
              />
              <h4 className="font-semibold text-foreground">{skill.name}</h4>
            </div>
            <span className={`inline-block px-2 py-0.5 text-xs rounded-full mb-2 ${
              skill.level === 'Production-level' 
                ? 'bg-primary/20 text-primary' 
                : skill.level === 'Power User'
                ? 'bg-accent/20 text-accent-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {skill.level}
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {skill.usage}
            </p>
            
            {/* Tooltip arrow */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-card border-l border-t border-border" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [rotation, setRotation] = useState({ inner: 0, outer: 0 });
  const [dimensions, setDimensions] = useState({ width: 700, height: 700 });

  // Handle responsive sizing
  useEffect(() => {
    const updateDimensions = () => {
      const size = Math.min(window.innerWidth * 0.85, 700);
      setDimensions({ width: size, height: size });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Smooth continuous rotation
  useEffect(() => {
    if (hoveredSkill) return;
    
    let animationId: number;
    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      
      setRotation(prev => ({
        inner: (prev.inner + delta * 10) % 360,
        outer: (prev.outer - delta * 6) % 360,
      }));
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [hoveredSkill]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skills-header', {
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

      gsap.fromTo('.orbit-visual', {
        opacity: 0,
        scale: 0.6,
      }, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const innerRadius = Math.min(dimensions.width, dimensions.height) * 0.24;
  const outerRadius = Math.min(dimensions.width, dimensions.height) * 0.44;

  const marqueeItems = ['REACT', 'NODE.JS', 'TYPESCRIPT', 'NEXT.JS', 'MONGODB', 'TAILWIND', 'PYTHON', 'AI/ML', 'AUTOMATION', 'POSTGRESQL'];

  return (
    <section ref={sectionRef} id="skills" className="relative py-24 lg:py-32 bg-background overflow-hidden">
      {/* Marquee Banner */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden bg-foreground py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={index} className="mx-8 text-background text-xl md:text-2xl font-bold tracking-widest">
              {item} <span className="text-primary mx-4">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 mb-8 mt-16">
        <div className="skills-header text-center">
          <span className="text-primary text-sm uppercase tracking-widest font-medium block mb-4">
            Technical Expertise
          </span>
          <h2 className="headline-lg mb-4">
            Skills & Technologies<span className="text-primary">.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hover over any skill to explore my experience
          </p>
        </div>
      </div>

      {/* Orbit Container */}
      <div 
        className="orbit-visual relative mx-auto"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        {/* Orbit rings */}
        <div 
          className="absolute rounded-full border border-primary/20"
          style={{
            left: centerX - innerRadius,
            top: centerY - innerRadius,
            width: innerRadius * 2,
            height: innerRadius * 2,
          }}
        />
        <div 
          className="absolute rounded-full border border-border/30"
          style={{
            left: centerX - outerRadius,
            top: centerY - outerRadius,
            width: outerRadius * 2,
            height: outerRadius * 2,
          }}
        />

        {/* Center content */}
        <div 
          className="absolute flex flex-col items-center justify-center text-center"
          style={{
            left: centerX,
            top: centerY,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            FULL STACK
          </h3>
          <span className="text-sm text-muted-foreground uppercase tracking-widest">
            Developer
          </span>
        </div>

        {/* Inner orbit - AI Skills - rendered in a circle using CSS transform */}
        <div 
          className="absolute"
          style={{
            left: centerX,
            top: centerY,
            width: 0,
            height: 0,
          }}
        >
          {aiSkills.map((skill, index) => {
            const baseAngle = (360 / aiSkills.length) * index;
            const angle = baseAngle + rotation.inner;
            const radians = (angle * Math.PI) / 180;
            const x = Math.cos(radians) * innerRadius;
            const y = Math.sin(radians) * innerRadius;
            
            return (
              <div
                key={skill.name}
                className="absolute"
                style={{
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                  transition: hoveredSkill ? 'none' : undefined,
                }}
              >
                <SkillNode
                  skill={skill}
                  hoveredSkill={hoveredSkill}
                  setHoveredSkill={setHoveredSkill}
                  isInner={true}
                />
              </div>
            );
          })}
        </div>

        {/* Outer orbit - Core Skills */}
        <div 
          className="absolute"
          style={{
            left: centerX,
            top: centerY,
            width: 0,
            height: 0,
          }}
        >
          {coreSkills.map((skill, index) => {
            const baseAngle = (360 / coreSkills.length) * index;
            const angle = baseAngle + rotation.outer;
            const radians = (angle * Math.PI) / 180;
            const x = Math.cos(radians) * outerRadius;
            const y = Math.sin(radians) * outerRadius;
            
            return (
              <div
                key={skill.name}
                className="absolute"
                style={{
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                  transition: hoveredSkill ? 'none' : undefined,
                }}
              >
                <SkillNode
                  skill={skill}
                  hoveredSkill={hoveredSkill}
                  setHoveredSkill={setHoveredSkill}
                  isInner={false}
                />
              </div>
            );
          })}
        </div>

        {/* Category labels */}
        <div 
          className="absolute text-xs text-primary/60 uppercase tracking-widest pointer-events-none"
          style={{ left: centerX, top: centerY - innerRadius - 40, transform: 'translateX(-50%)' }}
        >
          AI & Automation
        </div>
        <div 
          className="absolute text-xs text-muted-foreground/60 uppercase tracking-widest pointer-events-none"
          style={{ left: centerX, top: centerY - outerRadius - 40, transform: 'translateX(-50%)' }}
        >
          Core Technologies
        </div>
      </div>
    </section>
  );
};
