import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// Skill logos with their names
const skills = [
  { name: 'React', logo: '⚛️' },
  { name: 'Next.js', logo: '▲' },
  { name: 'TypeScript', logo: '🔷' },
  { name: 'Node.js', logo: '🟢' },
  { name: 'Python', logo: '🐍' },
  { name: 'Tailwind', logo: '🎨' },
  { name: 'GSAP', logo: '🟩' },
  { name: 'Firebase', logo: '🔥' },
  { name: 'MongoDB', logo: '🍃' },
  { name: 'PostgreSQL', logo: '🐘' },
  { name: 'OpenAI', logo: '🤖' },
  { name: 'Docker', logo: '🐳' },
  { name: 'AWS', logo: '☁️' },
  { name: 'Git', logo: '📦' },
  { name: 'Figma', logo: '🎭' },
  { name: 'Vercel', logo: '▲' },
];

const SkillLogo = ({ skill, index }: { skill: typeof skills[0]; index: number }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center px-8 py-6 min-w-[120px]"
      initial={{ y: 0 }}
      animate={{ 
        y: [0, -8, 0],
      }}
      transition={{
        duration: 2,
        delay: index * 0.1,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      whileHover={{ scale: 1.2, y: -12 }}
    >
      <span className="text-4xl lg:text-5xl mb-2">{skill.logo}</span>
      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
        {skill.name}
      </span>
    </motion.div>
  );
};

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
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

      // Marquee container fade in
      gsap.fromTo('.marquee-container', {
        opacity: 0,
        y: 40
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
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

  return (
    <section ref={sectionRef} id="skills" className="relative py-24 lg:py-32 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 mb-16">
        <div className="skills-header text-center">
          <span className="text-primary text-sm uppercase tracking-widest font-medium block mb-4">
            Skills & Technologies
          </span>
          <h2 className="headline-lg">
            Tech Stack<span className="text-primary">.</span>
          </h2>
        </div>
      </div>

      {/* Infinite Marquee */}
      <div className="marquee-container relative">
        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/30 to-transparent z-10 pointer-events-none" />

        {/* First marquee row - moves left */}
        <div className="flex overflow-hidden py-8 group">
          <motion.div 
            className="flex shrink-0"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 30,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {[...skills, ...skills].map((skill, i) => (
              <SkillLogo key={`row1-${i}`} skill={skill} index={i % skills.length} />
            ))}
          </motion.div>
        </div>

        {/* Second marquee row - moves right */}
        <div className="flex overflow-hidden py-8 group">
          <motion.div 
            className="flex shrink-0"
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              duration: 25,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {[...skills.slice().reverse(), ...skills.slice().reverse()].map((skill, i) => (
              <SkillLogo key={`row2-${i}`} skill={skill} index={i % skills.length} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
