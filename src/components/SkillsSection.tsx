import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Frontend',
    icon: '◆',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Three.js'],
  },
  {
    title: 'Backend',
    icon: '◇',
    skills: ['Node.js', 'Express', 'Python', 'FastAPI', 'MongoDB', 'PostgreSQL', 'Firebase'],
  },
  {
    title: 'AI & Automation',
    icon: '◈',
    skills: ['OpenAI API', 'LangChain', 'Vapi', 'n8n', 'Make.com', 'Vector DBs', 'RAG Systems'],
  },
  {
    title: 'Tools',
    icon: '◉',
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'VS Code', 'Postman'],
  },
];

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Category cards stagger
      gsap.fromTo(
        '.skill-category',
        {
          y: 60,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Skills tags stagger within each category
      document.querySelectorAll('.skill-category').forEach((category) => {
        const skills = category.querySelectorAll('.skill-tag');
        gsap.fromTo(
          skills,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: category,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-32 lg:py-48 bg-secondary/30 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <span className="text-primary text-sm uppercase tracking-widest font-medium block mb-4">
            Skills & Technologies
          </span>
          <h2 className="headline-lg">
            Tools I Master<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, i) => (
            <div
              key={category.title}
              className="skill-category glass-card p-8 lg:p-10 group hover:border-primary/50 transition-all duration-500"
            >
              {/* Category header */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl text-primary">{category.icon}</span>
                <h3 className="text-2xl font-display font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>

              {/* Skills tags */}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag px-4 py-2 bg-muted/50 rounded-full text-sm text-foreground/80 
                             border border-border/50 hover:border-primary/50 hover:text-primary 
                             hover:bg-primary/10 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
