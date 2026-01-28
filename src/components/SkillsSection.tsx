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
  isInner,
  onHover,
  onLeave,
  isDimmed
}: { 
  skill: Skill; 
  isHighlighted: boolean;
  isInner: boolean;
  onHover: () => void;
  onLeave: () => void;
  isDimmed: boolean;
}) => {
  const nodeSize = isInner ? 'w-12 h-12 md:w-14 md:h-14' : 'w-14 h-14 md:w-16 md:h-16';
  const iconSize = isInner ? 'w-6 h-6 md:w-7 md:h-7' : 'w-7 h-7 md:w-8 md:h-8';

  return (
    <motion.div
      className="relative cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={false}
      animate={{
        scale: isHighlighted ? 1.2 : 1,
        opacity: isDimmed ? 0.6 : 1,
      }}
      transition={{ 
        type: 'tween', 
        duration: 0.3,
        ease: 'easeOut'
      }}
      style={{ zIndex: isHighlighted ? 50 : 1, pointerEvents: isDimmed ? 'none' : 'auto' }}
    >
      <div 
        className={`flex items-center justify-center ${nodeSize} rounded-full bg-card border-2 transition-all duration-300`}
        style={{
          borderColor: isHighlighted ? 'hsl(var(--primary))' : 'hsl(var(--border))',
          boxShadow: isHighlighted ? '0 0 25px hsl(var(--primary) / 0.5)' : 'none',
        }}
      >
        <img 
          src={skill.icon} 
          alt={skill.name}
          className={`${iconSize} object-contain dark:invert-0`}
          style={{ 
            filter: (skill.name === 'Next.js' || skill.name === 'Vercel') ? 'var(--icon-filter, none)' : 'none',
          }}
        />
      </div>
    </motion.div>
  );
};

const SkillCard = ({ skill, side }: { skill: Skill | null; side: 'left' | 'right' }) => {
  return (
    <AnimatePresence mode="wait">
      {skill && (
        <motion.div
          key={skill.name}
          // Avoid transform-based transitions (x/scale) to prevent text/icon blur while cycling
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-64 p-5 rounded-2xl bg-card border border-border shadow-lg will-change-[opacity]"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <img 
                src={skill.icon} 
                alt={skill.name}
                className="w-7 h-7 object-contain"
              />
            </div>
            <div>
              <h4 className="font-bold text-foreground text-base">{skill.name}</h4>
              <span className={`text-sm font-medium ${
                skill.level === 'Production-level' 
                  ? 'text-primary' 
                  : 'text-muted-foreground'
              }`}>
                {skill.level}
              </span>
            </div>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            {skill.usage}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leaveTimeoutRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState({ left: 0, right: 0 });
  const [dimensions, setDimensions] = useState({ width: 420, height: 420 });
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // GSAP-driven orbit rotation (prevents jitter from React re-renders)
  const innerOrbitRef = useRef<HTMLDivElement>(null);
  const outerOrbitRef = useRef<HTMLDivElement>(null);
  const innerTweenRef = useRef<gsap.core.Tween | null>(null);
  const outerTweenRef = useRef<gsap.core.Tween | null>(null);

  const allSkills = [...coreSkills, ...aiSkills];
  const leftSkills = allSkills.slice(0, Math.ceil(allSkills.length / 2));
  const rightSkills = allSkills.slice(Math.ceil(allSkills.length / 2));

  const handleSkillHover = (skill: Skill) => {
    if (leaveTimeoutRef.current) {
      window.clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setHoveredSkill(skill);
    setIsPaused(true);

    // Freeze orbit motion instantly so hover stays locked and clear.
    innerTweenRef.current?.pause();
    outerTweenRef.current?.pause();
  };

  const handleSkillLeave = () => {
    // Debounce leave to prevent flicker when hovering moving nodes.
    if (leaveTimeoutRef.current) window.clearTimeout(leaveTimeoutRef.current);
    leaveTimeoutRef.current = window.setTimeout(() => {
      setHoveredSkill(null);
      setIsPaused(false);
      leaveTimeoutRef.current = null;

      innerTweenRef.current?.play();
      outerTweenRef.current?.play();
    }, 140);
  };

  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) window.clearTimeout(leaveTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!innerOrbitRef.current || !outerOrbitRef.current) return;

    const innerUpright = gsap.utils.toArray<HTMLElement>(
      '[data-upright="inner"]',
      innerOrbitRef.current
    );
    const outerUpright = gsap.utils.toArray<HTMLElement>(
      '[data-upright="outer"]',
      outerOrbitRef.current
    );

    gsap.set(innerOrbitRef.current, { rotation: 0, transformOrigin: '50% 50%' });
    gsap.set(outerOrbitRef.current, { rotation: 0, transformOrigin: '50% 50%' });
    gsap.set(innerUpright, { rotation: 0, transformOrigin: '50% 50%' });
    gsap.set(outerUpright, { rotation: 0, transformOrigin: '50% 50%' });

    innerTweenRef.current = gsap.to(innerOrbitRef.current, {
      rotation: -360,
      duration: 28,
      repeat: -1,
      ease: 'none',
      onUpdate: () => {
        const r = Number(gsap.getProperty(innerOrbitRef.current!, 'rotation'));
        gsap.set(innerUpright, { rotation: -r });
      },
    });

    outerTweenRef.current = gsap.to(outerOrbitRef.current, {
      rotation: 360,
      duration: 40,
      repeat: -1,
      ease: 'none',
      onUpdate: () => {
        const r = Number(gsap.getProperty(outerOrbitRef.current!, 'rotation'));
        gsap.set(outerUpright, { rotation: -r });
      },
    });

    return () => {
      innerTweenRef.current?.kill();
      outerTweenRef.current?.kill();
      innerTweenRef.current = null;
      outerTweenRef.current = null;
    };
  }, []);

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

  // Auto-cycle skills for left and right cards (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex(prev => ({
        left: (prev.left + 1) % leftSkills.length,
        right: (prev.right + 1) % rightSkills.length,
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, leftSkills.length, rightSkills.length]);

  // Orbit rotation handled by GSAP refs (above).

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

  // When hovering, show hovered skill in cards; otherwise use auto-cycled skills
  const currentLeftSkill = hoveredSkill || leftSkills[activeIndex.left];
  const currentRightSkill = hoveredSkill || rightSkills[activeIndex.right];

  return (
    <section ref={sectionRef} id="skills" className="relative h-screen flex flex-col justify-center overflow-hidden bg-transparent dark:bg-background"
    >
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-muted/10 dark:from-background dark:via-background dark:to-muted/20" />

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
          <div ref={innerOrbitRef} className="absolute inset-0 will-change-transform">
            {aiSkills.map((skill, index) => {
              const baseAngle = (360 / aiSkills.length) * index;
              const isHighlighted = hoveredSkill
                ? skill.name === hoveredSkill.name
                : (skill.name === currentLeftSkill?.name || skill.name === currentRightSkill?.name);
              const isDimmed = hoveredSkill !== null && skill.name !== hoveredSkill.name;

              return (
                <div
                  key={skill.name}
                  className="absolute"
                  style={{
                    left: centerX,
                    top: centerY,
                    transform: `translate(-50%, -50%) rotate(${baseAngle}deg) translateX(${innerRadius}px)`,
                  }}
                >
                  <div data-upright="inner" className="will-change-transform">
                    <SkillNode
                      skill={skill}
                      isHighlighted={isHighlighted}
                      isInner={true}
                      onHover={() => handleSkillHover(skill)}
                      onLeave={handleSkillLeave}
                      isDimmed={isDimmed}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Outer orbit - Core Skills */}
          <div ref={outerOrbitRef} className="absolute inset-0 will-change-transform">
            {coreSkills.map((skill, index) => {
              const baseAngle = (360 / coreSkills.length) * index;
              const isHighlighted = hoveredSkill
                ? skill.name === hoveredSkill.name
                : (skill.name === currentLeftSkill?.name || skill.name === currentRightSkill?.name);
              const isDimmed = hoveredSkill !== null && skill.name !== hoveredSkill.name;

              return (
                <div
                  key={skill.name}
                  className="absolute"
                  style={{
                    left: centerX,
                    top: centerY,
                    transform: `translate(-50%, -50%) rotate(${baseAngle}deg) translateX(${outerRadius}px)`,
                  }}
                >
                  <div data-upright="outer" className="will-change-transform">
                    <SkillNode
                      skill={skill}
                      isHighlighted={isHighlighted}
                      isInner={false}
                      onHover={() => handleSkillHover(skill)}
                      onLeave={handleSkillLeave}
                      isDimmed={isDimmed}
                    />
                  </div>
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