import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    type: 'work',
    title: 'Freelance Full-Stack Developer & AI Specialist',
    company: 'Self-Employed',
    period: '2023 - Present',
    description: 'Building AI agents and custom web solutions for clients worldwide. Specialized in voice AI, automation systems, and high-performance web applications.',
    highlights: ['50+ Projects Delivered', 'AI Voice Agents', 'Global Clients'],
  },
  {
    type: 'work',
    title: 'Frontend Developer Intern',
    company: 'Tech Startup',
    period: '2022 - 2023',
    description: 'Developed responsive web interfaces and contributed to the main product dashboard. Collaborated with design and backend teams in agile environment.',
    highlights: ['React/TypeScript', 'UI/UX Implementation', 'Performance Optimization'],
  },
  {
    type: 'education',
    title: 'Bachelor in Computer Science',
    company: 'University',
    period: '2020 - 2024',
    description: 'Focused on software engineering, algorithms, and AI/ML fundamentals. Built multiple projects and participated in hackathons.',
    highlights: ['AI/ML Fundamentals', 'Software Engineering', 'Hackathon Winner'],
  },
];

export const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.experience-header',
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

      // Timeline items
      gsap.fromTo(
        '.timeline-item',
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline line grow
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-32 lg:py-48 bg-secondary/30 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="experience-header mb-16">
          <span className="text-primary text-sm uppercase tracking-widest font-medium block mb-4">
            Experience
          </span>
          <h2 className="headline-lg">
            My Journey<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="timeline-container relative max-w-4xl">
          {/* Timeline line */}
          <div className="timeline-line absolute left-8 lg:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent origin-top" />

          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div key={i} className="timeline-item relative pl-20 lg:pl-28">
                {/* Timeline dot */}
                <div className="absolute left-5 lg:left-9 w-6 h-6 rounded-full bg-background border-2 border-primary 
                              flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
                  {exp.type === 'work' ? (
                    <Briefcase className="w-3 h-3 text-primary" />
                  ) : (
                    <GraduationCap className="w-3 h-3 text-primary" />
                  )}
                </div>

                {/* Content card */}
                <div className="glass-card p-6 lg:p-8 hover:border-primary/50 transition-all duration-500">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-display font-semibold text-foreground">
                        {exp.title}
                      </h3>
                      <p className="text-muted-foreground">{exp.company}</p>
                    </div>
                    <span className="px-4 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/30">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-3 py-1 bg-muted/50 text-foreground/80 text-xs rounded-full 
                                 border border-border/50"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
