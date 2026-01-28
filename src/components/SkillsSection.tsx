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
];

const aiSkills: Skill[] = [
  { name: 'OpenAI', icon: 'https://www.svgrepo.com/show/306500/openai.svg', level: 'Production-level', usage: 'GPT-4 integrations, embeddings, and fine-tuning' },
  { name: 'Lovable', icon: 'https://lovable.dev/icon.svg', level: 'Power User', usage: 'AI-assisted full-stack app development' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', level: 'Production-level', usage: 'Auth, Firestore, Cloud Functions, AI extensions' },
  { name: 'n8n', icon: 'https://n8n.io/favicon.ico', level: 'Hands-on', usage: 'Complex workflow automation pipelines' },
  { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', level: 'Production-level', usage: 'Edge deployments with AI-powered analytics' },
  { name: 'Supabase', icon: 'https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg', level: 'Production-level', usage: 'Backend as a service with real-time features' },
];

const SkillNode = ({ 
  skill, 
  isHighlighted,
  isInner
}: { 
  skill: Skill; 
  isHighlighted: boolean;
  isInner: boolean;
}) => {
  const nodeSize = isInner ? 'w-10 h-10 md:w-12 md:h-12' : 'w-12 h-12 md:w-14 md:h-14';
  const iconSize = isInner ? 'w-5 h-5 md:w-6 md:h-6' : 'w-6 h-6 md:w-7 md:h-7';

  return (
    <motion.div
      className="relative"
      animate={{
        scale: isHighlighted ? 1.3 : 1,
        zIndex: isHighlighted ? 50 : 1,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <motion.div 
        className={`flex items-center justify-center ${nodeSize} rounded-xl bg-white border transition-all duration-300`}
        style={{
          borderColor: isHighlighted ? 'rgb(244 63 94)' : 'rgba(214, 211, 209, 0.5)',
        }}
      >
        <img 
          src={skill.icon} 
          alt={skill.name}
          className={`${iconSize} object-contain`}
          style={{ filter: skill.name === 'Next.js' || skill.name === 'Vercel' ? 'invert(1)' : 'none' }}
        />
      </motion.div>
    </motion.div>
  );
};

const SkillCard = ({ skill, side }: { skill: Skill | null; side: 'left' | 'right' }) => {
  return (
    <AnimatePresence mode="wait">
      {skill && (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, x: side === 'left' ? -20 : 20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: side === 'left' ? -20 : 20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-56 p-4 rounded-2xl bg-white border border-stone-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center">
              <img 
                src={skill.icon} 
                alt={skill.name}
                className="w-6 h-6 object-contain"
              />
            </div>
            <div>
              <h4 className="font-semibold text-stone-800 text-sm">{skill.name}</h4>
              <span className={`text-xs ${
                skill.level === 'Production-level' 
                  ? 'text-rose-500' 
                  : 'text-stone-500'
              }`}>
                {skill.level}
              </span>
            </div>
          </div>
          <p className="text-xs text-stone-500 leading-relaxed">
            {skill.usage}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [rotation, setRotation] = useState({ inner: 0, outer: 0 });
  const [activeIndex, setActiveIndex] = useState({ left: 0, right: 0 });
  const [dimensions, setDimensions] = useState({ width: 420, height: 420 });

  const allSkills = [...coreSkills, ...aiSkills];
  const leftSkills = allSkills.slice(0, Math.ceil(allSkills.length / 2));
  const rightSkills = allSkills.slice(Math.ceil(allSkills.length / 2));

  // Handle responsive sizing - smaller orbits
  useEffect(() => {
    const updateDimensions = () => {
      const size = Math.min(window.innerWidth * 0.5, 420);
      setDimensions({ width: size, height: size });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Auto-cycle skills for left and right cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => ({
        left: (prev.left + 1) % leftSkills.length,
        right: (prev.right + 1) % rightSkills.length,
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, [leftSkills.length, rightSkills.length]);

  // Smooth continuous rotation
  useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      
      setRotation(prev => ({
        inner: (prev.inner + delta * 12) % 360,
        outer: (prev.outer - delta * 8) % 360,
      }));
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skills-header', {
        y: 40,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        }
      });

      gsap.fromTo('.orbit-visual', {
        opacity: 0,
        scale: 0.7,
      }, {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.2,
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
  const innerRadius = Math.min(dimensions.width, dimensions.height) * 0.22;
  const outerRadius = Math.min(dimensions.width, dimensions.height) * 0.42;

  const currentLeftSkill = leftSkills[activeIndex.left];
  const currentRightSkill = rightSkills[activeIndex.right];

  return (
    <section ref={sectionRef} id="skills" className="relative h-screen flex flex-col justify-center overflow-hidden bg-background"
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground)) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 mb-6">
        <div className="skills-header text-center">
          <span className="text-primary text-sm uppercase tracking-widest font-medium block mb-3">
            Technical Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight font-serif mb-2">
            Skills & Technologies<span className="text-primary">.</span>
          </h2>
        </div>
      </div>

      {/* Main content with side cards */}
      <div className="flex items-center justify-center gap-4 lg:gap-8">
        {/* Left skill card */}
        <div className="hidden md:flex flex-col items-end">
          <SkillCard skill={currentLeftSkill} side="left" />
        </div>

        {/* Orbit Container */}
        <div 
          className="orbit-visual relative flex-shrink-0"
          style={{ width: dimensions.width, height: dimensions.height }}
        >
          {/* Orbit rings */}
          <div 
            className="absolute rounded-full border border-primary/30"
            style={{
              left: centerX - innerRadius,
              top: centerY - innerRadius,
              width: innerRadius * 2,
              height: innerRadius * 2,
            }}
          />
          <div 
            className="absolute rounded-full border border-border"
            style={{
              left: centerX - outerRadius,
              top: centerY - outerRadius,
              width: outerRadius * 2,
              height: outerRadius * 2,
            }}
          />

          <div 
            className="absolute flex flex-col items-center justify-center text-center"
            style={{
              left: centerX,
              top: centerY,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <h3 className="text-lg md:text-xl font-bold text-foreground tracking-tight font-serif">
              FULL STACK
            </h3>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              Developer
            </span>
          </div>

          {/* Inner orbit - AI Skills */}
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
              const isHighlighted = skill.name === currentLeftSkill?.name || skill.name === currentRightSkill?.name;
              
              return (
                <div
                  key={skill.name}
                  className="absolute"
                  style={{
                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                  }}
                >
                  <SkillNode
                    skill={skill}
                    isHighlighted={isHighlighted}
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
              const isHighlighted = skill.name === currentLeftSkill?.name || skill.name === currentRightSkill?.name;
              
              return (
                <div
                  key={skill.name}
                  className="absolute"
                  style={{
                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                  }}
                >
                  <SkillNode
                    skill={skill}
                    isHighlighted={isHighlighted}
                    isInner={false}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right skill card */}
        <div className="hidden md:flex flex-col items-start">
          <SkillCard skill={currentRightSkill} side="right" />
        </div>
      </div>

      {/* Mobile skill cards */}
      <div className="md:hidden flex justify-center gap-4 mt-6 px-4">
        <SkillCard skill={currentLeftSkill} side="left" />
        <SkillCard skill={currentRightSkill} side="right" />
      </div>
    </section>
  );
};