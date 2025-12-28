import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from './MagneticButton';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial timeline for hero entrance
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Headline reveal with clip-path
      tl.fromTo(
        '.hero-line',
        {
          y: 120,
          opacity: 0,
          clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
        },
        {
          y: 0,
          opacity: 1,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.2,
          stagger: 0.15,
        },
        0.3
      );

      // Subtitle lines
      tl.fromTo(
        '.subtitle-line',
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
        },
        '-=0.6'
      );

      // CTA button
      tl.fromTo(
        ctaRef.current,
        {
          y: 30,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
        },
        '-=0.4'
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
        },
        '-=0.3'
      );

      // Parallax effect on scroll
      gsap.to('.hero-content', {
        y: 100,
        opacity: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50" />
      
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--muted-foreground) / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--muted-foreground) / 0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="hero-content container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Role badges */}
          <div className="flex flex-wrap gap-3 mb-8 overflow-hidden">
            {['Full-Stack Developer', 'AI Agent Builder', 'Freelancer'].map((role, i) => (
              <div
                key={role}
                className="subtitle-line px-4 py-2 rounded-full border border-primary/30 text-primary text-sm font-medium backdrop-blur-sm"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {role}
              </div>
            ))}
          </div>

          {/* Main headline */}
          <h1 ref={headlineRef} className="headline-xl mb-8">
            <div className="overflow-hidden">
              <span className="hero-line block">Building</span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-line block text-gradient">Digital Products</span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-line block">That Matter</span>
            </div>
          </h1>

          {/* Subtitle */}
          <div ref={subtitleRef} className="max-w-2xl mb-12">
            <p className="subtitle-line body-lg mb-2">
              I craft intelligent systems and stunning interfaces
            </p>
            <p className="subtitle-line body-lg">
              that transform ideas into impactful digital experiences.
            </p>
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <MagneticButton onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View My Work
            </MagneticButton>
            <MagneticButton 
              className="bg-transparent border-2 border-foreground/20 text-foreground hover:border-primary hover:text-primary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in Touch
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={scrollToAbout}
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce group-hover:text-primary transition-colors" />
      </div>
    </section>
  );
};
