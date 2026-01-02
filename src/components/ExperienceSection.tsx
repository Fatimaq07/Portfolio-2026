import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Code } from 'lucide-react';

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
    highlights: ["Dean's List", 'Research', 'Projects'],
  },
  {
    type: 'achievement',
    title: 'AI Certification',
    company: 'OpenAI',
    period: '2024',
    description: 'Completed advanced AI and machine learning specialization.',
    highlights: ['GPT-4', 'Fine-tuning', 'Embeddings'],
  },
];

export const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

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

      // Horizontal scroll effect
      if (horizontalRef.current && containerRef.current) {
        const cards = horizontalRef.current.querySelectorAll('.experience-card');
        const totalWidth = horizontalRef.current.scrollWidth - window.innerWidth + 200;

        gsap.to(horizontalRef.current, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${totalWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        });

        // Animate cards as they come into view
        cards.forEach((card, i) => {
          gsap.fromTo(card, {
            opacity: 0.5,
            scale: 0.9,
          }, {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.to(horizontalRef.current, { x: -totalWidth }),
              start: 'left 80%',
              end: 'left 30%',
              scrub: true,
            }
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'work':
        return <Briefcase className="w-6 h-6" />;
      case 'education':
        return <GraduationCap className="w-6 h-6" />;
      case 'achievement':
        return <Award className="w-6 h-6" />;
      default:
        return <Code className="w-6 h-6" />;
    }
  };

  return (
    <section ref={sectionRef} id="experience" className="relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #0f172a 60%, #020617 100%)'
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl" />
      </div>

      {/* Sticky horizontal scroll container */}
      <div ref={containerRef} className="min-h-screen">
        <div className="h-screen flex flex-col justify-center overflow-hidden">
          
          {/* Header */}
          <div className="experience-header px-8 lg:px-16 mb-12">
            <span className="text-cyan-400 text-sm uppercase tracking-widest font-medium block mb-3">
              Journey
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight font-serif">
              Experience & Education<span className="text-cyan-400">.</span>
            </h2>
            <p className="text-slate-400 mt-3 text-lg">
              Scroll down to explore my journey →
            </p>
          </div>

          {/* Horizontal scrolling cards */}
          <div ref={horizontalRef} className="flex gap-8 px-8 lg:px-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                className="experience-card flex-shrink-0 w-[400px] md:w-[500px] p-8 rounded-3xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 relative overflow-hidden group"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Gradient border effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Number indicator */}
                <div className="absolute top-6 right-6 text-6xl font-bold text-slate-700/30 font-mono">
                  0{i + 1}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon and type */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                      {getIcon(exp.type)}
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                        {exp.type}
                      </span>
                      <p className="text-slate-400 text-sm">{exp.period}</p>
                    </div>
                  </div>

                  {/* Title & Company */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-serif">
                    {exp.title}
                  </h3>
                  <p className="text-cyan-400 font-medium text-lg mb-4">{exp.company}</p>
                  
                  {/* Description */}
                  <p className="text-slate-400 leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((h) => (
                      <span 
                        key={h}
                        className="px-4 py-2 bg-slate-700/50 rounded-full text-sm text-slate-300 border border-slate-600/50"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-50" />
              </motion.div>
            ))}

            {/* End spacer for scroll */}
            <div className="flex-shrink-0 w-[100px]" />
          </div>

          {/* Scroll indicator */}
          <div className="px-8 lg:px-16 mt-12">
            <div className="flex items-center gap-4 text-slate-500">
              <div className="w-16 h-px bg-gradient-to-r from-cyan-500 to-transparent" />
              <span className="text-sm uppercase tracking-widest">Scroll to explore</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};