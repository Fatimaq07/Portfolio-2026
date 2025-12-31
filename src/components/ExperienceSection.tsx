import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    type: 'work',
    title: 'Full-Stack Developer',
    company: 'Freelance',
    period: '2023 - Present',
    description: 'Building custom web applications and AI-powered solutions for clients worldwide.',
    highlights: ['50+ Projects', 'Remote', 'AI Focus'],
  },
  {
    type: 'work',
    title: 'Frontend Developer Intern',
    company: 'Tech Startup',
    period: '2022 - 2023',
    description: 'Developed responsive user interfaces and implemented complex animations.',
    highlights: ['React', 'TypeScript', 'GSAP'],
  },
  {
    type: 'education',
    title: 'Computer Science',
    company: 'University',
    period: '2020 - 2024',
    description: 'Specialized in software engineering with focus on web technologies.',
    highlights: ['Dean\'s List', 'Research', 'Projects'],
  },
];

export const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.experience-header', {
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

      // Timeline line growing
      gsap.fromTo('.timeline-line', {
        scaleY: 0,
        transformOrigin: 'top'
      }, {
        scaleY: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        }
      });

      // Experience cards
      document.querySelectorAll('.experience-card').forEach((card, i) => {
        gsap.fromTo(card, {
          x: i % 2 === 0 ? -60 : 60,
          opacity: 0
        }, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative min-h-screen py-32 lg:py-48 overflow-hidden" style={{ background: 'hsl(197 93% 84%)' }}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="experience-header mb-20 text-center">
          <span className="text-primary text-sm uppercase tracking-widest font-medium block mb-4">
            Journey
          </span>
          <h2 className="headline-lg">
            Experience & Education<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="timeline-container relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="timeline-line absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-border/50 lg:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                className={`experience-card relative flex items-start gap-8 ${
                  i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 lg:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background lg:-translate-x-1/2 z-10" />

                {/* Card */}
                <div className={`flex-1 ml-12 lg:ml-0 ${i % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                  <div className="glass-card p-6 lg:p-8">
                    <div className={`flex items-center gap-3 mb-4 ${i % 2 === 0 ? 'lg:justify-end' : ''}`}>
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        {exp.type === 'work' ? (
                          <Briefcase className="w-5 h-5 text-primary" />
                        ) : (
                          <GraduationCap className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{exp.period}</span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-1">{exp.title}</h3>
                    <p className="text-primary font-medium mb-3">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mb-4">{exp.description}</p>

                    <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? 'lg:justify-end' : ''}`}>
                      {exp.highlights.map((h) => (
                        <span 
                          key={h}
                          className="px-3 py-1 bg-muted/30 rounded-full text-xs text-muted-foreground"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
