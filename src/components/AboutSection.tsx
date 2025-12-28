import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line by line text reveal
      gsap.fromTo(
        '.about-line',
        {
          y: 80,
          opacity: 0,
          clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
        },
        {
          y: 0,
          opacity: 1,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        '.stat-item',
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: '3+', label: 'Years Experience' },
    { number: '50+', label: 'Projects Completed' },
    { number: '20+', label: 'AI Agents Built' },
    { number: '100%', label: 'Client Satisfaction' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 lg:py-48 bg-background overflow-hidden"
    >
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-primary/3 via-transparent to-transparent opacity-50" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl">
          {/* Section label */}
          <div className="overflow-hidden mb-8">
            <span className="about-line block text-primary text-sm uppercase tracking-widest font-medium">
              About Me
            </span>
          </div>

          {/* Main text - story-driven copy */}
          <div ref={textContainerRef} className="mb-20">
            <div className="overflow-hidden">
              <p className="about-line headline-lg text-foreground mb-6">
                I don't just write code.
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="about-line headline-lg text-foreground mb-6">
                I architect <span className="text-gradient">digital experiences</span>
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="about-line headline-lg text-foreground mb-6">
                that push boundaries.
              </p>
            </div>
            <div className="overflow-hidden mt-8">
              <p className="about-line body-lg max-w-3xl">
                From building AI agents that automate complex workflows to crafting pixel-perfect 
                interfaces that captivate users—I bring a unique blend of technical depth and 
                creative vision to every project.
              </p>
            </div>
            <div className="overflow-hidden mt-4">
              <p className="about-line body-lg max-w-3xl">
                My mission? To transform ambitious ideas into products that don't just work—they inspire.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-container grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="text-4xl lg:text-5xl font-display font-bold text-primary mb-2 glow-text">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
