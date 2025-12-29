import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import heroBg from '@/assets/hero-bg.jpg';
import { ArrowUpRight } from 'lucide-react';

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' }
      });

      // Navbar animation
      tl.fromTo('.nav-item', {
        y: -30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1
      }, 0.3);

      // Hero text animations
      tl.fromTo('.hero-intro', {
        y: 60,
        opacity: 0,
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
      }, {
        y: 0,
        opacity: 1,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1
      }, 0.5);

      tl.fromTo('.hero-name', {
        y: 100,
        opacity: 0,
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
      }, {
        y: 0,
        opacity: 1,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.2
      }, 0.7);

      tl.fromTo('.hero-tagline', {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8
      }, 1.2);

      // Contact button rotation
      gsap.to('.contact-text', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} id="hero" className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 py-6">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <button onClick={() => scrollToSection('about')} className="nav-item text-sm font-medium text-foreground/90 hover:text-primary transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('projects')} className="nav-item text-sm font-medium text-foreground/90 hover:text-primary transition-colors">
                Works
              </button>
            </div>

            <button onClick={() => scrollToSection('hero')} className="nav-item text-xl font-bold text-foreground font-serif text-center">
              Portfolio
            </button>

            <div className="flex items-center gap-8">
              <button onClick={() => scrollToSection('skills')} className="nav-item text-sm font-medium text-foreground/90 hover:text-primary transition-colors">
                Skills
              </button>
              <button onClick={() => scrollToSection('experience')} className="nav-item text-sm font-medium text-foreground/90 hover:text-primary transition-colors">
                Experience
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-20 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl">
            <div className="overflow-hidden mb-2">
              <p className="hero-intro text-lg md:text-xl text-foreground/90 font-medium">
                __ Hello! I'm
              </p>
            </div>
            <div className="overflow-hidden">
              <h1 className="hero-name md:text-8xl lg:text-[10rem] font-bold text-foreground leading-none tracking-tight font-serif text-6xl">
                Fatima Qureshi<span className="text-primary">.</span>
              </h1>
            </div>
            <p className="hero-tagline mt-6 text-lg md:text-xl text-foreground/80 max-w-xl">
              A Full-Stack Developer, AI Agent Builder & Freelancer.
            </p>
          </div>
        </div>

        {/* Floating Contact Button */}
        <div className="absolute right-8 lg:right-16 bottom-32 lg:bottom-40">
          <button onClick={() => scrollToSection('contact')} className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center group">
            <svg viewBox="0 0 100 100" className="contact-text absolute w-full h-full rounded-none">
              <defs>
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
              </defs>
              <text className="text-[10px] md:text-[11px] fill-foreground uppercase tracking-[0.3em]">
                <textPath href="#circlePath">
                  CONTACT ME • CONTACT ME •
                </textPath>
              </text>
            </svg>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-foreground/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
              <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-foreground group-hover:text-primary-foreground transition-colors" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
