import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { MessageCircle, Download, ArrowDownRight } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.jpg';

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Staggered line reveals
      tl.fromTo('.hero-line', 
        { y: 120, opacity: 0, skewY: 7 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.2, stagger: 0.12 },
        0.3
      );

      // Profile image
      tl.fromTo('.profile-editorial',
        { scale: 0.8, opacity: 0, rotate: -8 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.4, ease: 'elastic.out(1, 0.5)' },
        0.5
      );

      // Scattered elements
      tl.fromTo('.scatter-element', 
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(2)' },
        0.8
      );

      // Info blocks
      tl.fromTo('.info-block',
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
        1.0
      );

      // CTA
      tl.fromTo('.cta-editorial',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        1.3
      );

      // Continuous float for image
      gsap.to('.profile-editorial', {
        y: -12,
        rotation: 2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      className="h-screen flex items-center px-6 lg:px-16 relative overflow-hidden bg-background"
    >
      {/* Editorial grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-0 bottom-0 w-px bg-border/30" />
        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-border/30" />
        <div className="absolute left-[90%] top-0 bottom-0 w-px bg-border/30" />
        <div className="absolute top-[20%] left-0 right-0 h-px bg-border/30" />
        <div className="absolute top-[80%] left-0 right-0 h-px bg-border/30" />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1800px] mx-auto relative z-10">
        
        {/* Top Row - Name & Photo */}
        <div className="relative">
          
          {/* Issue Number - Scattered */}
          <div className="scatter-element absolute -top-8 left-0 lg:left-[5%]">
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Portfolio</span>
            <span className="block text-4xl lg:text-5xl font-bold text-primary font-serif">01</span>
          </div>

          {/* Main Name - Editorial Typography */}
          <div className="pt-16 lg:pt-8">
            <div className="overflow-hidden">
              <h1 className="hero-line text-[12vw] lg:text-[10vw] font-bold text-foreground leading-[0.85] tracking-tighter font-serif">
                FATIMA
              </h1>
            </div>
            <div className="overflow-hidden flex items-end gap-4 lg:gap-8">
              <h1 className="hero-line text-[12vw] lg:text-[10vw] font-bold text-primary leading-[0.85] tracking-tighter font-serif">
                QURESHI
              </h1>
              <span className="hero-line text-2xl lg:text-4xl text-muted-foreground font-light mb-4 lg:mb-8">©2026</span>
            </div>
          </div>

          {/* Profile Photo - Asymmetric Position */}
          <div className="profile-editorial absolute -top-4 right-0 lg:right-[8%] w-32 h-40 md:w-48 md:h-60 lg:w-64 lg:h-80">
            <div className="relative w-full h-full">
              {/* Frame decoration */}
              <div className="absolute -inset-2 border border-primary/40 rounded-sm" style={{ transform: 'rotate(3deg)' }} />
              
              <div className="relative w-full h-full overflow-hidden rounded-sm shadow-2xl">
                <img 
                  src={profilePhoto} 
                  alt="Fatima Qureshi" 
                  className="w-full h-full object-cover"
                />
                {/* Halftone overlay effect */}
                <div className="absolute inset-0 mix-blend-overlay opacity-20" 
                  style={{
                    backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
                    backgroundSize: '4px 4px'
                  }}
                />
              </div>

              {/* Photo label */}
              <div className="scatter-element absolute -bottom-6 -left-4 bg-card border border-border px-3 py-1.5 rounded-sm">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Est. 2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Info & CTA */}
        <div className="mt-12 lg:mt-16 grid grid-cols-12 gap-4 lg:gap-8">
          
          {/* Role Tag */}
          <div className="col-span-12 lg:col-span-3">
            <div className="info-block flex items-center gap-3">
              <ArrowDownRight className="w-5 h-5 text-primary" />
              <span className="text-sm uppercase tracking-[0.2em] text-foreground">Full Stack Developer</span>
            </div>
          </div>

          {/* Description */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-5">
            <p className="info-block text-base lg:text-lg text-muted-foreground leading-relaxed">
              Building digital experiences for startups. Specializing in <span className="text-foreground font-medium">MERN Stack</span>, <span className="text-foreground font-medium">AI Automation</span> & UI/UX Design.
            </p>
          </div>

          {/* Stats - Scattered */}
          <div className="col-span-12 lg:col-span-3 lg:col-start-10">
            <div className="info-block flex gap-8 lg:justify-end">
              <div>
                <span className="block text-3xl lg:text-4xl font-bold text-foreground font-serif">8+</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Projects</span>
              </div>
              <div>
                <span className="block text-3xl lg:text-4xl font-bold text-foreground font-serif">2+</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Years</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Row */}
        <div className="mt-12 lg:mt-16 flex flex-wrap items-center gap-4 lg:gap-6">
          <motion.a
            href="https://wa.me/919399723080"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-editorial group flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full font-medium hover:bg-primary transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Hire Me</span>
          </motion.a>
          
          <motion.a
            href="/Fatima_Qureshi_Resume.pdf"
            download
            className="cta-editorial group flex items-center gap-3 border border-foreground/30 text-foreground px-8 py-4 rounded-full font-medium hover:border-primary hover:text-primary transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-5 h-5" />
            <span>Download CV</span>
          </motion.a>

          {/* Email floating */}
          <div className="cta-editorial ml-auto hidden lg:flex items-center gap-2 text-muted-foreground">
            <span className="w-8 h-px bg-muted-foreground" />
            <span className="text-sm">qfatima504@gmail.com</span>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="scatter-element absolute bottom-[15%] left-[5%] w-16 h-16 border border-primary/30 rounded-full" />
        <div className="scatter-element absolute top-[30%] right-[25%] w-3 h-3 bg-primary rounded-full" />
        <div className="scatter-element absolute bottom-[25%] right-[15%]">
          <span className="text-6xl lg:text-8xl font-bold text-muted/20 font-serif select-none">*</span>
        </div>
      </div>
    </section>
  );
};
