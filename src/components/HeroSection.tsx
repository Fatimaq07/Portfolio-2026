import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { MessageCircle, Download } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.jpg';

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Profile image reveal
      tl.fromTo('.profile-image',
        { scale: 1.2, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        { scale: 1, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1.2 },
        0.3
      );

      // Name letters fly in
      tl.fromTo('.name-letter', 
        { y: 150, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.04, ease: 'back.out(1.7)' },
        0.5
      );

      // Role tag
      tl.fromTo('.role-tag',
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        1.2
      );

      // About card slides in
      tl.fromTo('.about-card',
        { y: 80, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1 },
        1.0
      );

      // CTA buttons
      tl.fromTo('.cta-btn',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        1.4
      );

      // Year decoration
      tl.fromTo('.year-deco',
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        1.2
      );

      // Floating animation for profile
      gsap.to('.profile-float', {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const name = "FATIMA";
  const surname = "QURESHI";

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      className="h-screen flex items-center px-6 lg:px-12 relative overflow-hidden bg-background"
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" 
        style={{
          backgroundImage: 'linear-gradient(hsl(var(--muted-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--muted-foreground)) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Main Content Container */}
      <div className="w-full max-w-[1600px] mx-auto relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-4 items-center">
          
          {/* Left Side - Profile Image */}
          <div className="lg:col-span-5 relative">
            
            {/* Profile Photo - Award winning tilted frame */}
            <div className="profile-image profile-float relative mx-auto lg:mx-0 w-64 h-80 md:w-80 md:h-[420px] lg:w-[380px] lg:h-[480px]">
              
              {/* Tilted frame effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl"
                style={{ transform: 'rotate(-3deg)' }}
              />
              
              {/* Main image container */}
              <motion.div 
                className="relative w-full h-full rounded-2xl overflow-hidden border border-border/50 shadow-2xl"
                style={{ transform: 'rotate(2deg)' }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <img 
                  src={profilePhoto} 
                  alt="Fatima Qureshi" 
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </motion.div>

              {/* Role tag on image */}
              <div className="role-tag absolute -bottom-4 -right-4 md:bottom-8 md:-right-8 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                Software Developer
              </div>

              {/* Year badge */}
              <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 bg-card border border-border px-3 py-1.5 rounded-lg shadow-md">
                <span className="text-xs text-muted-foreground">Since</span>
                <span className="block text-lg font-bold text-foreground">2023</span>
              </div>
            </div>
          </div>

          {/* Right Side - Name & Content */}
          <div className="lg:col-span-7 relative">
            
            {/* Massive Name Typography - Overlapping */}
            <div className="relative" style={{ perspective: '1200px' }}>
              
              {/* First Name */}
              <h1 className="overflow-hidden -ml-2 lg:-ml-24">
                <span className="flex">
                  {name.split('').map((letter, i) => (
                    <span 
                      key={i} 
                      className="name-letter inline-block text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-bold text-foreground tracking-tighter leading-none font-serif"
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              </h1>
              
              {/* Last Name - Primary color */}
              <h1 className="overflow-hidden -mt-2 md:-mt-6 lg:-mt-12">
                <span className="flex">
                  {surname.split('').map((letter, i) => (
                    <span 
                      key={i} 
                      className="name-letter inline-block text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-bold text-primary tracking-tighter leading-none font-serif"
                    >
                      {letter}
                    </span>
                  ))}
                  <span className="name-letter inline-block text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-bold text-accent tracking-tighter leading-none font-serif">.</span>
                </span>
              </h1>
            </div>

            {/* About Card - Floating */}
            <div className="about-card relative mt-6 lg:mt-8 max-w-xl">
              
              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 lg:p-8 shadow-xl">
                
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-1 bg-primary mt-3" />
                  <div>
                    <p className="text-lg lg:text-xl text-foreground leading-relaxed">
                      A <span className="text-primary font-semibold">Full-Stack Developer</span>, AI Agent Builder & Freelancer crafting digital experiences.
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm lg:text-base leading-relaxed pl-16 mb-6">
                  MERN Stack • AI Automation • UI/UX Design
                </p>

                {/* Stats Row */}
                <div className="flex gap-8 pl-16 pt-4 border-t border-border">
                  <div>
                    <span className="block text-2xl lg:text-3xl font-bold text-foreground">8+</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Projects</span>
                  </div>
                  <div>
                    <span className="block text-2xl lg:text-3xl font-bold text-foreground">2+</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Years</span>
                  </div>
                  <div>
                    <span className="block text-2xl lg:text-3xl font-bold text-primary">AI</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Focused</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <motion.a
                href="https://wa.me/919399723080"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn group flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5" />
                Hire Me
              </motion.a>
              
              <motion.a
                href="/Fatima_Qureshi_Resume.pdf"
                download
                className="cta-btn group flex items-center gap-3 border-2 border-foreground/20 text-foreground px-8 py-4 rounded-full font-medium hover:border-primary hover:text-primary transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5" />
                Download CV
              </motion.a>
            </div>
          </div>
        </div>

        {/* Year Decoration - Background */}
        <div className="year-deco absolute -bottom-20 -right-10 lg:-right-20 select-none pointer-events-none hidden lg:block">
          <span className="text-[180px] xl:text-[220px] font-bold text-muted/20 leading-none font-serif">
            26
          </span>
        </div>
      </div>
    </section>
  );
};
