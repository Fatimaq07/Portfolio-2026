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
];

const aiSkills: Skill[] = [
  { name: 'OpenAI', icon: 'https://www.svgrepo.com/show/306500/openai.svg', level: 'Production-level', usage: 'GPT-4 integrations, embeddings, and fine-tuning' },
  { name: 'Lovable', icon: 'https://lovable.dev/icon.svg', level: 'Power User', usage: 'AI-assisted full-stack app development' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', level: 'Production-level', usage: 'Auth, Firestore, Cloud Functions, AI extensions' },
  { name: 'n8n', icon: 'https://n8n.io/favicon.ico', level: 'Hands-on', usage: 'Complex workflow automation pipelines' },
  { name: 'Zapier', icon: 'https://www.svgrepo.com/show/353589/zapier-icon.svg', level: 'Hands-on', usage: 'No-code integrations for rapid prototyping' },
  { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', level: 'Production-level', usage: 'Edge deployments with AI-powered analytics' },
];

const SkillNode = ({ 
  skill, 
  index, 
  total, 
  radius, 
  isAI,
  hoveredSkill,
  setHoveredSkill,
  orbitOffset
}: { 
  skill: Skill; 
  index: number; 
  total: number; 
  radius: number;
  isAI: boolean;
  hoveredSkill: string | null;
  setHoveredSkill: (name: string | null) => void;
  orbitOffset: number;
}) => {
  // Calculate position on semi-circle (180 degrees spread)
  const startAngle = isAI ? -30 : -150;
  const endAngle = isAI ? 30 : -30;
  const angleStep = (endAngle - startAngle) / (total - 1);
  const baseAngle = startAngle + (index * angleStep);
  const angle = baseAngle + orbitOffset;
  const radians = (angle * Math.PI) / 180;
  
  const x = Math.cos(radians) * radius;
  const y = Math.sin(radians) * radius;
  
  const isHovered = hoveredSkill === skill.name;
  const isOtherHovered = hoveredSkill !== null && !isHovered;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: '50%',
        top: isAI ? '30%' : '60%',
        x: x,
        y: y,
      }}
      animate={{
        scale: isHovered ? 1.4 : isOtherHovered ? 0.85 : 1,
        opacity: isOtherHovered ? 0.4 : 1,
        filter: isHovered ? 'drop-shadow(0 0 20px hsl(var(--primary)))' : 'none',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onMouseEnter={() => setHoveredSkill(skill.name)}
      onMouseLeave={() => setHoveredSkill(null)}
    >
      <div className={`relative flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-background/80 backdrop-blur-sm border-2 transition-colors duration-300 ${isHovered ? 'border-primary' : 'border-border/50'}`}>
        <img 
          src={skill.icon} 
          alt={skill.name}
          className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
          style={{ filter: skill.name === 'Next.js' || skill.name === 'Vercel' ? 'invert(1)' : 'none' }}
        />
        
        {/* Glow ring on hover */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ 
            scale: isHovered ? 1.3 : 1, 
            opacity: isHovered ? 0.6 : 0 
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

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
                style={{ filter: skill.name === 'Next.js' || skill.name === 'Vercel' ? 'invert(1)' : 'none' }}
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
  const [orbitOffset, setOrbitOffset] = useState(0);

  // Smooth orbit animation
  useEffect(() => {
    if (hoveredSkill) return; // Pause animation on hover
    
    const interval = setInterval(() => {
      setOrbitOffset(prev => (prev + 0.15) % 360);
    }, 50);
    
    return () => clearInterval(interval);
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

      gsap.fromTo('.orbit-container', {
        opacity: 0,
        scale: 0.8
      }, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        }
      });

      gsap.fromTo('.category-label', {
        opacity: 0,
        x: -30
      }, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.5,
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

  return (
    <section ref={sectionRef} id="skills" className="relative py-24 lg:py-32 bg-background overflow-hidden min-h-screen">
      {/* Background ambient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 mb-12">
        <div className="skills-header text-center">
          <span className="text-primary text-sm uppercase tracking-widest font-medium block mb-4">
            Technical Expertise
          </span>
          <h2 className="headline-lg mb-4">
            Skills & Technologies<span className="text-primary">.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hover over any skill to explore my experience and real-world usage
          </p>
        </div>
      </div>

      {/* Orbit Container */}
      <div className="orbit-container relative w-full h-[600px] lg:h-[700px]">
        {/* Category Labels */}
        <div className="category-label absolute left-8 lg:left-16 top-1/4 text-sm text-muted-foreground uppercase tracking-widest -rotate-90 origin-left">
          AI & Automation
        </div>
        <div className="category-label absolute left-8 lg:left-16 top-2/3 text-sm text-muted-foreground uppercase tracking-widest -rotate-90 origin-left">
          Core Technologies
        </div>

        {/* Orbit paths (visual guides) */}
        <div className="absolute left-1/2 top-[30%] -translate-x-1/2 w-[500px] lg:w-[700px] h-[250px] lg:h-[350px] border border-dashed border-border/30 rounded-[50%] pointer-events-none" />
        <div className="absolute left-1/2 top-[60%] -translate-x-1/2 w-[600px] lg:w-[900px] h-[300px] lg:h-[450px] border border-dashed border-border/30 rounded-[50%] pointer-events-none" />

        {/* AI Skills Orbit */}
        {aiSkills.map((skill, index) => (
          <SkillNode
            key={skill.name}
            skill={skill}
            index={index}
            total={aiSkills.length}
            radius={window.innerWidth >= 1024 ? 320 : 220}
            isAI={true}
            hoveredSkill={hoveredSkill}
            setHoveredSkill={setHoveredSkill}
            orbitOffset={orbitOffset}
          />
        ))}

        {/* Core Skills Orbit */}
        {coreSkills.map((skill, index) => (
          <SkillNode
            key={skill.name}
            skill={skill}
            index={index}
            total={coreSkills.length}
            radius={window.innerWidth >= 1024 ? 420 : 280}
            isAI={false}
            hoveredSkill={hoveredSkill}
            setHoveredSkill={setHoveredSkill}
            orbitOffset={-orbitOffset * 0.7}
          />
        ))}

        {/* Center focal point */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 animate-pulse" />
        </div>
      </div>
    </section>
  );
};
